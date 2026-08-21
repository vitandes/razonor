// Checkout INTERNACIONAL (Lemon Squeezy, en USD) para usuarios fuera de
// Colombia. Colombia sigue con Mercado Pago (COP) en /api/mp/subscribe.
//
//   POST /api/ls/checkout { plan: "individual", billing: "monthly"|"semestral" }
//   -> { url }  (checkout hosteado de Lemon Squeezy)
//
// Sin las env de LS responde 503. El acceso lo activa SOLO el webhook de LS.

import { auth, currentUser } from "@clerk/nextjs/server";
import { lsConfigured, getLsVariant, lsCreateCheckout } from "@/lib/lemonsqueezy";
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
  if (!lsConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });

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
  const variantId = getLsVariant(plan, billing);
  if (!variantId) return Response.json({ error: "no_variant" }, { status: 503 });

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!email) return Response.json({ error: "no_email" }, { status: 400 });

  // País + periodo + señales de ads (igual que en el flujo de MP), para que el
  // webhook pueda atribuir la compra con la CAPI. No frena el pago si falla.
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
      /* no debe frenar el pago */
    }
  }

  try {
    const url = await lsCreateCheckout({
      variantId,
      email,
      userId,
      plan,
      billing,
      redirectUrl: `${baseUrl(req)}/aprendo?checkout=return`,
    });
    if (!url) return Response.json({ error: "no_url" }, { status: 502 });
    return Response.json({ url });
  } catch (e) {
    console.error("[ls/checkout] error", e?.status, JSON.stringify(e?.data || e?.message));
    return Response.json({ error: "ls_error" }, { status: 502 });
  }
}
