// Webhook de Mercado Pago. Maneja DOS flujos:
//   1) Suscripciones (preapproval): tarjeta con cobro recurrente.
//   2) Pagos únicos (payment): Checkout Pro con PSE/Nequi/Efecty/etc. — para
//      Colombia, donde la suscripción automática (solo tarjeta) deja fuera a
//      quien no tiene tarjeta. El pago único da acceso por el periodo, sin
//      renovar (cancel_at_period_end = true + current_period_end).
//
// Configúralo en el panel de MP -> Webhooks: https://www.razonor.com/api/mp/webhook
//   Eventos: "Pagos" + "Planes y suscripciones".
//
// Es la fuente de verdad de la suscripción: el cliente nunca se marca "active".

import crypto from "crypto";
import { mpFetch, getPlanDetails, getCheckoutToken } from "@/lib/mercadopago";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendCapiPurchase } from "@/lib/meta-capi";
import { sendTikTokPurchase } from "@/lib/tiktok-events";

export const runtime = "nodejs";

// Estado de MP (preapproval) -> { status, cancelAtPeriodEnd } de nuestra cuenta.
function mapStatus(mpStatus) {
  switch (mpStatus) {
    case "authorized":
      return { status: "active", cancelAtPeriodEnd: false };
    case "paused":
    case "cancelled":
    case "canceled":
      return { status: "active", cancelAtPeriodEnd: true };
    default:
      return null; // "pending" u otros: no tocan el acceso
  }
}

function checkSignature(req, signatureId) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return { ok: true, skipped: true };
  const sig = req.headers.get("x-signature") || "";
  const requestId = req.headers.get("x-request-id") || "";
  const parts = Object.fromEntries(
    sig.split(",").map((p) => p.split("=").map((s) => s.trim())),
  );
  const ts = parts.ts;
  const received = parts.v1;
  if (!ts || !received) return { ok: false, reason: "no x-signature" };
  const idForManifest = String(signatureId || "").toLowerCase();
  const manifest = `id:${idForManifest};request-id:${requestId};ts:${ts};`;
  const computed = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  return { ok: computed === received, computed, received, manifest };
}

// Envía la compra a Meta (CAPI) y TikTok (Events API). event_id estable = dedup.
async function fireConversions({ email, value, currency, eventId, externalId, contentId, country, fb }) {
  const conversion = { email, value, currency, eventId, externalId, contentId, country, fb };
  await sendCapiPurchase(conversion);
  await sendTikTokPurchase(conversion);
}

// ---------- Suscripción (tarjeta, recurrente) ----------
async function handlePreapproval(dataId, supabase) {
  const pre = await mpFetch(`/preapproval/${dataId}`);
  const ref = pre.external_reference || "";
  const [userId, plan] = ref.split("::");
  const mapped = mapStatus(pre.status);
  console.log("[mp/webhook] preapproval", {
    id: pre.id,
    mpStatus: pre.status,
    mapped,
    next_payment_date: pre.next_payment_date,
    userId,
    plan,
  });

  if (!userId) return Response.json({ ignored: "no_external_reference" });
  if (!mapped) return Response.json({ ignored: "status" });

  const { data: existing } = await supabase
    .from("profiles")
    .select("subscription_status, subscribed_at, canceled_at, email, fb_data, country")
    .eq("user_id", userId)
    .maybeSingle();

  // Un cancel/pause SOLO conserva el acceso hasta fin de periodo si el usuario
  // YA era suscriptor activo (pagó). Si nunca se activó (ej. abrió el checkout,
  // la tarjeta fue rechazada y MP canceló el preapproval), se ignora: nadie se
  // vuelve "active" por una cancelación.
  if (mapped.cancelAtPeriodEnd && existing?.subscription_status !== "active") {
    console.log("[mp/webhook] cancel de un preapproval que nunca se activó -> ignorado", userId);
    return Response.json({ ignored: "cancel_without_active" });
  }

  const row = {
    user_id: userId,
    subscription_status: mapped.status,
    cancel_at_period_end: mapped.cancelAtPeriodEnd,
    mp_preapproval_id: pre.id,
    updated_at: new Date().toISOString(),
  };
  if (plan) row.subscription_plan = plan;
  if (pre.next_payment_date) row.current_period_end = pre.next_payment_date;
  if (!existing?.subscribed_at) row.subscribed_at = new Date().toISOString();
  if (mapped.cancelAtPeriodEnd) {
    if (!existing?.canceled_at) row.canceled_at = new Date().toISOString();
  } else {
    row.canceled_at = null;
  }

  const { error } = await supabase.from("profiles").upsert(row, { onConflict: "user_id" });
  if (error) {
    console.error("[mp/webhook] error guardando (preapproval)", error);
    return Response.json({ error: "db" }, { status: 502 });
  }

  if (row.subscribed_at && mapped.status === "active" && !mapped.cancelAtPeriodEnd) {
    const billing = pre.auto_recurring?.frequency === 6 ? "semestral" : "monthly";
    const details = getPlanDetails(plan || "individual", billing);
    await fireConversions({
      email: existing?.email || null,
      value: details.amount,
      currency: "COP",
      eventId: pre.id,
      externalId: userId,
      contentId: `${plan || "individual"}-${billing}`,
      country: existing?.country || null,
      fb: existing?.fb_data || null,
    });
  }

  console.log("[mp/webhook] OK preapproval", userId, mapped.status);
  return Response.json({ ok: true });
}

// ---------- Pago único (PSE/Nequi/etc., no renueva) ----------
async function handlePayment(dataId, supabase) {
  // El pago único vive en la app Checkout Pro -> su token.
  const pay = await mpFetch(`/v1/payments/${dataId}`, { token: getCheckoutToken() });
  const ref = pay.external_reference || "";
  const parts = ref.split("::");
  // Nuestros pagos únicos llevan "userId::plan::billing" (3 partes). Los pagos de
  // renovación de una suscripción NO -> los ignoramos aquí (van por preapproval).
  if (parts.length !== 3) {
    console.log("[mp/webhook] payment sin ref de checkout único -> ignorado");
    return Response.json({ ignored: "not_one_time" });
  }
  const [userId, plan, billing] = parts;
  console.log("[mp/webhook] payment", { id: pay.id, status: pay.status, userId, plan, billing });

  if (pay.status !== "approved") {
    return Response.json({ ignored: pay.status || "not_approved" });
  }

  const months = billing === "semestral" ? 6 : 1;
  const end = new Date();
  end.setMonth(end.getMonth() + months);

  const { data: existing } = await supabase
    .from("profiles")
    .select("subscribed_at, email, fb_data, country")
    .eq("user_id", userId)
    .maybeSingle();

  const row = {
    user_id: userId,
    subscription_status: "active",
    subscription_plan: plan,
    billing,
    // Pago único: no renueva -> acceso hasta current_period_end y luego se corta.
    cancel_at_period_end: true,
    current_period_end: end.toISOString(),
    mp_preapproval_id: `pay_${pay.id}`,
    updated_at: new Date().toISOString(),
  };
  const firstTime = !existing?.subscribed_at;
  if (firstTime) row.subscribed_at = new Date().toISOString();

  const { error } = await supabase.from("profiles").upsert(row, { onConflict: "user_id" });
  if (error) {
    console.error("[mp/webhook] error guardando (payment)", error);
    return Response.json({ error: "db" }, { status: 502 });
  }

  // Compra aprobada -> conversión (dedup por id de pago).
  await fireConversions({
    email: existing?.email || pay.payer?.email || null,
    value: pay.transaction_amount,
    currency: "COP",
    eventId: String(pay.id),
    externalId: userId,
    contentId: `${plan}-${billing}`,
    country: existing?.country || null,
    fb: existing?.fb_data || null,
  });

  console.log("[mp/webhook] OK pago único ->", userId, plan, billing, "hasta", end.toISOString().slice(0, 10));
  return Response.json({ ok: true });
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const url = new URL(req.url);
  const type =
    body?.type || url.searchParams.get("type") || url.searchParams.get("topic") || "";
  const queryId = url.searchParams.get("data.id") || url.searchParams.get("id");
  const dataId = body?.data?.id || queryId;

  console.log("[mp/webhook] IN", { type, action: body?.action, dataId });

  const isPreapproval = String(type).includes("preapproval");
  const isPayment = String(type).includes("payment") && !isPreapproval;
  if (!dataId || (!isPreapproval && !isPayment)) {
    return Response.json({ ignored: true });
  }

  const sig = checkSignature(req, queryId || dataId);
  if (!sig.ok) console.warn("[mp/webhook] FIRMA no coincide (se procesa igual)", sig.reason || "");

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[mp/webhook] Supabase NO configurado");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    return isPreapproval
      ? await handlePreapproval(dataId, supabase)
      : await handlePayment(dataId, supabase);
  } catch (e) {
    // 404 = el recurso no existe (ej. el pago de prueba "123456" del simulador de
    // MP, o un id que no aplica). No hay nada que hacer -> 200 para que MP no
    // reintente. Otros errores sí devuelven 502 para que MP reintente.
    if (e?.status === 404) {
      console.warn("[mp/webhook] recurso 404 (probablemente prueba) -> ignorado");
      return Response.json({ ignored: "not_found" });
    }
    console.error("[mp/webhook] error", e?.status, JSON.stringify(e?.data || e?.message));
    return Response.json({ error: "mp_error" }, { status: 502 });
  }
}

// MP hace un GET de prueba al guardar la URL del webhook.
export async function GET() {
  return Response.json({ ok: true });
}
