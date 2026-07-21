// Helpers de Lemon Squeezy — cobros INTERNACIONALES (fuera de Colombia).
//
// Colombia paga con Mercado Pago en COP; el resto del mundo paga con Lemon
// Squeezy en USD (tarjetas internacionales, PayPal si está activo en la
// tienda). Los precios en USD viven en lib/pricing.js (USD_PRICES) y DEBEN
// coincidir con los de las variantes creadas en el panel de Lemon Squeezy.
//
// Env necesarias (todas del panel de LS):
//   LEMONSQUEEZY_API_KEY      Settings -> API
//   LEMONSQUEEZY_STORE_ID     Settings -> Stores (id numérico)
//   LS_VARIANT_INDIVIDUAL_MONTHLY / LS_VARIANT_INDIVIDUAL_SEMESTRAL
//   LS_VARIANT_FAMILIAR_MONTHLY  / LS_VARIANT_FAMILIAR_SEMESTRAL
//   LEMONSQUEEZY_WEBHOOK_SECRET  Settings -> Webhooks (firma X-Signature)

const LS_API = "https://api.lemonsqueezy.com/v1";

// Precios internacionales en USD. DEBEN coincidir con las variantes creadas en
// el panel de Lemon Squeezy (el cobro real usa el precio de la variante; esto
// es lo que se muestra en /planes y lo que reportamos a Meta/TikTok).
export const USD_PRICES = {
  individual: { monthly: 14.99, semestral: 44.99 },
  familiar: { monthly: 19.99, semestral: 59.99 },
};

export function lsConfigured() {
  return !!(process.env.LEMONSQUEEZY_API_KEY && process.env.LEMONSQUEEZY_STORE_ID);
}

// Id de la variante de LS para un plan + periodo.
export function getLsVariant(plan, billing) {
  const key = `LS_VARIANT_${plan.toUpperCase()}_${billing === "semestral" ? "SEMESTRAL" : "MONTHLY"}`;
  return process.env[key] || null;
}

// Crea un checkout de LS con el email prellenado y custom_data para que el
// webhook sepa a quién activar. Devuelve la URL del checkout hosteado.
export async function lsCreateCheckout({ variantId, email, userId, plan, billing, redirectUrl }) {
  const res = await fetch(`${LS_API}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email,
            // LS exige strings en custom
            custom: { user_id: String(userId), plan: String(plan), billing: String(billing) },
          },
          product_options: {
            redirect_url: redirectUrl,
          },
        },
        relationships: {
          store: { data: { type: "stores", id: String(process.env.LEMONSQUEEZY_STORE_ID) } },
          variant: { data: { type: "variants", id: String(variantId) } },
        },
      },
    }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.errors?.[0]?.detail || "ls_error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data?.data?.attributes?.url || null;
}
