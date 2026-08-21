// Webhook de Lemon Squeezy (cobros internacionales en USD).
//
// Configúralo en el panel de LS -> Settings -> Webhooks:
//   URL: https://www.razonor.com/api/ls/webhook
//   Eventos: subscription_created, subscription_updated, subscription_cancelled,
//            subscription_resumed, subscription_expired
//   Signing secret -> LEMONSQUEEZY_WEBHOOK_SECRET
//
// Mismas reglas que el webhook de MP (fuente de verdad de la suscripción):
//   - Solo "active" da acceso; on_trial/past_due/unpaid/paused se ignoran.
//   - cancelled conserva el acceso hasta ends_at SOLO si el usuario ya era
//     suscriptor activo (pagó); si no, se ignora.
//   - expired corta el acceso (status "none").
//   - El cliente NUNCA cambia el estado: solo este webhook o el dueño en la DB.

import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sendCapiPurchase } from "@/lib/meta-capi";
import { sendTikTokPurchase } from "@/lib/tiktok-events";
import { USD_PRICES } from "@/lib/lemonsqueezy";

export const runtime = "nodejs";

function checkSignature(rawBody, signature) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return { ok: false, reason: "missing webhook secret" };
  if (!signature) return { ok: false, reason: "no x-signature" };
  const computed = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return { ok: crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature)) };
  } catch {
    return { ok: false, reason: "bad signature format" };
  }
}

export async function POST(req) {
  const rawBody = await req.text();
  const sig = checkSignature(rawBody, req.headers.get("x-signature"));
  if (!sig.ok) {
    console.warn("[ls/webhook] FIRMA no coincide -> rechazado", sig.reason || "");
    return Response.json({ error: "bad_signature" }, { status: 401 });
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "bad_json" }, { status: 400 });
  }

  const event = body?.meta?.event_name || "";
  const custom = body?.meta?.custom_data || {};
  const attrs = body?.data?.attributes || {};
  const subId = body?.data?.id || null;
  const userId = custom.user_id || null;
  const plan = custom.plan === "familiar" ? "familiar" : "individual";
  const billing = custom.billing === "semestral" ? "semestral" : "monthly";

  console.log("[ls/webhook] IN", { event, subId, userId, status: attrs.status });

  if (!event.startsWith("subscription_")) return Response.json({ ignored: "event" });
  if (!userId) return Response.json({ ignored: "no_user_id" });

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[ls/webhook] Supabase NO configurado");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("subscription_status, subscribed_at, email, fb_data, country")
    .eq("user_id", userId)
    .maybeSingle();

  if (existingError) {
    console.error("[ls/webhook] error leyendo perfil", existingError);
    return Response.json({ error: "db" }, { status: 502 });
  }

  const now = new Date().toISOString();
  const row = { user_id: userId, mp_preapproval_id: `ls_${subId}`, updated_at: now };

  if (attrs.status === "active") {
    // Suscripción cobrada y al día.
    row.subscription_status = "active";
    row.subscription_plan = plan;
    row.billing = billing;
    row.cancel_at_period_end = false;
    row.canceled_at = null;
    if (attrs.renews_at) row.current_period_end = attrs.renews_at;
    const firstTime = !existing?.subscribed_at;
    if (firstTime) row.subscribed_at = now;

    const { error } = await supabase.from("profiles").upsert(row, { onConflict: "user_id" });
    if (error) {
      console.error("[ls/webhook] error guardando (active)", error);
      return Response.json({ error: "db" }, { status: 502 });
    }

    if (firstTime) {
      // Compra internacional -> conversión en USD (dedup por id de suscripción).
      const value = USD_PRICES[plan]?.[billing] || null;
      const conversion = {
        email: existing?.email || attrs.user_email || null,
        value,
        currency: "USD",
        eventId: `ls_${subId}`,
        externalId: userId,
        contentId: `${plan}-${billing}`,
        country: existing?.country || null,
        fb: existing?.fb_data || null,
      };
      await sendCapiPurchase(conversion);
      await sendTikTokPurchase(conversion);
    }

    console.log("[ls/webhook] OK active", userId, plan, billing);
    return Response.json({ ok: true });
  }

  if (attrs.status === "cancelled") {
    // Canceló: conserva acceso hasta fin de periodo SOLO si ya era activo.
    if (existing?.subscription_status !== "active") {
      console.log("[ls/webhook] cancel de una suscripción nunca activa -> ignorado", userId);
      return Response.json({ ignored: "cancel_without_active" });
    }
    row.subscription_status = "active";
    row.cancel_at_period_end = true;
    row.canceled_at = now;
    if (attrs.ends_at || attrs.renews_at) {
      row.current_period_end = attrs.ends_at || attrs.renews_at;
    }
    const { error } = await supabase.from("profiles").upsert(row, { onConflict: "user_id" });
    if (error) {
      console.error("[ls/webhook] error guardando (cancelled)", error);
      return Response.json({ error: "db" }, { status: 502 });
    }
    console.log("[ls/webhook] OK cancelled (acceso hasta fin de periodo)", userId);
    return Response.json({ ok: true });
  }

  if (attrs.status === "expired") {
    // Terminó de verdad (fin de periodo tras cancelar, o falló el cobro y agotó
    // los reintentos): se corta el acceso.
    if (existing?.subscription_status !== "active") {
      return Response.json({ ignored: "expired_without_active" });
    }
    row.subscription_status = "none";
    row.cancel_at_period_end = false;
    const { error } = await supabase.from("profiles").upsert(row, { onConflict: "user_id" });
    if (error) {
      console.error("[ls/webhook] error guardando (expired)", error);
      return Response.json({ error: "db" }, { status: 502 });
    }
    console.log("[ls/webhook] OK expired -> acceso cortado", userId);
    return Response.json({ ok: true });
  }

  // on_trial / past_due / unpaid / paused: no tocan el acceso.
  return Response.json({ ignored: attrs.status || "status" });
}

// Ping de prueba al configurar la URL.
export async function GET() {
  return Response.json({ ok: true });
}
