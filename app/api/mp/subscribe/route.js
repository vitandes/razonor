// Abre el checkout de suscripción de Mercado Pago para el usuario logueado.
//
//   POST /api/mp/subscribe { plan: "individual"|"familiar", billing: "monthly"|"annual" }
//   -> { init_point }  (URL del checkout de MP a la que redirigimos al usuario)
//
// Creamos la suscripción por API SIN plan asociado (auto_recurring en línea) y
// con `status: "pending"`. Así MP devuelve un init_point para que el usuario
// ponga su tarjeta en su página (no requiere card_token_id), y el
// `external_reference` = userId de Clerk SÍ queda guardado en la suscripción
// (cosa que NO pasa con los checkout basados en plan). El webhook lo usa para
// activar la cuenta correcta. Si NEXT_PUBLIC_FREE_TRIAL_DAYS >= 1 hay prueba
// gratis (tarjeta hoy, primer cobro al terminarla); si es 0 o no está, se cobra
// de inmediato. Luego renueva cada periodo (mes o semestre).
//
// Sin MP_ACCESS_TOKEN responde 503.

import { auth, currentUser } from "@clerk/nextjs/server";
import { getMpToken, getPlanDetails, mpFetch } from "@/lib/mercadopago";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { FREE_TRIAL_DAYS, HAS_TRIAL } from "@/lib/trial";

export const runtime = "nodejs";

function baseUrl(req) {
  const env = process.env.NEXT_PUBLIC_APP_URL;
  if (env) return env.replace(/\/+$/, "");
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "unauthenticated" }, { status: 401 });
  if (!getMpToken()) return Response.json({ error: "not_configured" }, { status: 503 });

  let body;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const plan = body?.plan === "familiar" ? "familiar" : "individual";
  const billing = body?.billing === "semestral" ? "semestral" : "monthly";
  const details = getPlanDetails(plan, billing);
  // Device ID (antifraude de MP) para mejorar la aprobación.
  const deviceId = typeof body?.deviceId === "string" ? body.deviceId : null;

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!email) return Response.json({ error: "no_email" }, { status: 400 });

  // Guardamos país + periodo (dashboard) y las señales de Meta (_fbp/_fbc + IP +
  // user-agent) para poder atribuir la compra al anuncio vía la API de
  // Conversiones desde el webhook. No bloquea el checkout si falla.
  const country = req.headers.get("x-vercel-ip-country") || null;
  const cookieHeader = req.headers.get("cookie") || "";
  const getCookie = (name) => {
    const m = cookieHeader.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[1]) : null;
  };
  // Señales de atribución de Meta (_fbp/_fbc) y TikTok (ttclid/_ttp) + IP,
  // user-agent y datos del COMPRADOR (nombre/teléfono de Clerk, para subir la
  // calidad de coincidencias del Purchase). Van en el blob fb_data y las usan
  // las APIs de conversiones de ambas plataformas desde el webhook.
  const fb_data = {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ttclid: getCookie("ttclid"),
    ttp: getCookie("_ttp"),
    ip: (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      null,
    ua: req.headers.get("user-agent") || null,
    fn: user?.firstName || null,
    ln: user?.lastName || null,
    ph:
      user?.primaryPhoneNumber?.phoneNumber ||
      user?.phoneNumbers?.[0]?.phoneNumber ||
      null,
  };
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("profiles").upsert(
        { user_id: userId, country, billing, fb_data, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    } catch {
      /* ignorar: no debe frenar el pago */
    }
  }

  try {
    const pre = await mpFetch("/preapproval", {
      method: "POST",
      headers: deviceId ? { "X-meli-session-id": deviceId } : {},
      body: {
        reason: `Razonor ${details.label} (${billing === "semestral" ? "semestral" : "mensual"})`,
        // Guardamos userId + plan para que el webhook sepa a quién y qué activar.
        external_reference: `${userId}::${plan}`,
        payer_email: email,
        auto_recurring: {
          frequency: details.frequency,
          frequency_type: "months",
          transaction_amount: details.amount,
          currency_id: "COP",
          // Con HAS_TRIAL: tarjeta hoy, primer cobro al terminar la prueba.
          // Sin trial: MP cobra de inmediato al autorizar la suscripción.
          ...(HAS_TRIAL
            ? { free_trial: { frequency: FREE_TRIAL_DAYS, frequency_type: "days" } }
            : {}),
        },
        back_url: `${baseUrl(req)}/aprendo?checkout=return`,
        status: "pending",
      },
    });
    const initPoint = pre.init_point || pre.sandbox_init_point || null;
    if (!initPoint) return Response.json({ error: "no_init_point" }, { status: 502 });
    return Response.json({ init_point: initPoint, id: pre.id });
  } catch (e) {
    console.error("[mp/subscribe] error", e?.status, JSON.stringify(e?.data || e?.message));
    return Response.json(
      { error: "mp_error", detail: e?.data || e?.message || null },
      { status: 502 },
    );
  }
}
