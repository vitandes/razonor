// Pago ÚNICO por el periodo (Checkout Pro de Mercado Pago). Abre TODOS los
// métodos de Colombia: PSE, Nequi, Efecty, tarjeta, etc. — a diferencia de la
// suscripción automática, que es solo tarjeta. No renueva: el webhook da acceso
// hasta current_period_end (1 mes o 6 meses).
//
//   POST /api/mp/checkout { plan, billing } -> { init_point }
//
// Sin MP_ACCESS_TOKEN responde 503.

import { auth, currentUser } from "@clerk/nextjs/server";
import { getCheckoutToken, getPlanDetails, mpFetch } from "@/lib/mercadopago";
import { getSupabaseAdmin } from "@/lib/supabase-server";

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
  if (!getCheckoutToken()) return Response.json({ error: "not_configured" }, { status: 503 });

  let body;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  if (body?.plan && body.plan !== "individual") {
    return Response.json({ error: "plan_unavailable" }, { status: 400 });
  }
  const plan = "individual";
  const billing = body?.billing === "semestral" ? "semestral" : "monthly";
  const details = getPlanDetails(plan, billing);
  // Device ID (antifraude de MP) para mejorar la aprobación.
  const deviceId = typeof body?.deviceId === "string" ? body.deviceId : null;
  // Cédula del pagador (clave para PSE): tipo (CC/CE/NIT) + número.
  const docTypes = ["CC", "CE", "NIT"];
  const docType = docTypes.includes(body?.docType) ? body.docType : "CC";
  const docNumber =
    typeof body?.docNumber === "string" ? body.docNumber.replace(/\D/g, "") : "";
  const identification = docNumber ? { type: docType, number: docNumber } : null;

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!email) return Response.json({ error: "no_email" }, { status: 400 });

  // Teléfono del pagador (va en el payer de la preferencia).
  const phone =
    user?.primaryPhoneNumber?.phoneNumber ||
    user?.phoneNumbers?.[0]?.phoneNumber ||
    null;

  // Guardamos país + periodo + señales de ads (igual que en subscribe).
  const country = req.headers.get("x-vercel-ip-country") || null;
  const cookieHeader = req.headers.get("cookie") || "";
  const getCookie = (name) => {
    const m = cookieHeader.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[1]) : null;
  };
  const fb_data = {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    ttclid: getCookie("ttclid"),
    ttp: getCookie("_ttp"),
    ip:
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      null,
    ua: req.headers.get("user-agent") || null,
    // datos del comprador: suben la calidad de coincidencias del Purchase
    fn: user?.firstName || null,
    ln: user?.lastName || null,
    ph: phone,
  };
  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from("profiles").upsert(
        { user_id: userId, country, billing, fb_data, updated_at: new Date().toISOString() },
        { onConflict: "user_id" },
      );
    } catch {
      /* no debe frenar el pago */
    }
  }

  const base = baseUrl(req);
  try {
    const pref = await mpFetch("/checkout/preferences", {
      method: "POST",
      token: getCheckoutToken(),
      headers: deviceId ? { "X-meli-session-id": deviceId } : {},
      body: {
        items: [
          {
            id: `${plan}-${billing}`,
            title: `Razonor ${details.label} (${billing === "semestral" ? "semestral" : "mensual"})`,
            description:
              "Acceso a Razonor, diagnóstico matemático y plan personalizado.",
            category_id: "learnings",
            quantity: 1,
            unit_price: details.amount,
            currency_id: "COP",
          },
        ],
        // En Checkout Pro (preferencias), lo que lee el antifraude es el `payer`
        // de nivel superior (NO un objeto additional_info, que aquí es solo texto
        // libre). La identificación (cédula) es clave para aprobar PSE.
        payer: {
          email,
          name: user?.firstName || undefined,
          surname: user?.lastName || undefined,
          ...(identification ? { identification } : {}),
          ...(phone ? { phone: { area_code: "", number: phone } } : {}),
        },
        external_reference: `${userId}::${plan}::${billing}`,
        back_urls: {
          success: `${base}/aprendo?checkout=return`,
          pending: `${base}/aprendo?checkout=return`,
          failure: `${base}/planes?pago=fallido`,
        },
        auto_return: "approved",
        notification_url: `${base}/api/mp/webhook`,
        statement_descriptor: "RAZONOR",
        metadata: { user_id: userId, plan, billing },
      },
    });
    const initPoint = pref.init_point || pref.sandbox_init_point || null;
    if (!initPoint) return Response.json({ error: "no_init_point" }, { status: 502 });
    return Response.json({ init_point: initPoint, id: pref.id });
  } catch (e) {
    console.error("[mp/checkout] error", e?.status, JSON.stringify(e?.data || e?.message));
    return Response.json({ error: "mp_error", detail: e?.data || e?.message || null }, { status: 502 });
  }
}
