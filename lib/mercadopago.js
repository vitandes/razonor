// Helpers de Mercado Pago — Suscripciones (preapproval).
//
// Usamos la API REST directamente con fetch (sin dependencias). Si falta el
// token, las rutas responden "no configurado" y la app usa la prueba local.
//
// IMPORTANTE: creamos la suscripción SIN plan asociado (con auto_recurring en
// línea) para poder mandar `external_reference` = userId de Clerk. Los checkout
// basados en `preapproval_plan` ignoran el external_reference de la URL, así que
// no sirven para atar la suscripción a un usuario. Por eso los precios viven
// aquí, en código, y no dependemos de los planes del panel.

const MP_API = "https://api.mercadopago.com";

// Token principal: suscripciones con tarjeta (/preapproval). App tipo CheckoutAPI.
export function getMpToken() {
  return process.env.MP_ACCESS_TOKEN || null;
}

// Token para PAGOS ÚNICOS (Checkout Pro, /checkout/preferences) — donde PSE/Nequi
// aprueban. Va en una app SEPARADA de tipo "Checkout Pro". Si no está
// configurado, cae al token principal (para no romper nada).
export function getCheckoutToken() {
  return process.env.MP_CHECKOUT_TOKEN || process.env.MP_ACCESS_TOKEN || null;
}

// Precios y periodicidad por plan. Moneda: COP.
// El semestral se cobra cada 6 meses con ~50% de descuento frente a pagar
// mes a mes ($149.900 vs $299.400 en el individual).
const PLAN_DETAILS = {
  individual: {
    label: "Individual",
    monthly: { amount: 49900, frequency: 1 },
    semestral: { amount: 149900, frequency: 6 },
  },
  familiar: {
    label: "Familiar",
    monthly: { amount: 69900, frequency: 1 },
    semestral: { amount: 199900, frequency: 6 },
  },
};

// Devuelve { label, amount, frequency } para un plan + periodo (monthly|semestral).
// Si MP_TEST_AMOUNT está definido (ej. "2000"), usa ese monto para pruebas.
export function getPlanDetails(plan, billing) {
  const p = PLAN_DETAILS[plan] || PLAN_DETAILS.individual;
  const b = billing === "monthly" ? p.monthly : p.semestral;
  const testAmount = process.env.MP_TEST_AMOUNT ? Number(process.env.MP_TEST_AMOUNT) : null;
  return {
    label: p.label,
    frequency: b.frequency,
    amount: testAmount && testAmount > 0 ? testAmount : b.amount,
  };
}

// Llama a la API de Mercado Pago. `headers` permite extras (ej. X-meli-session-id
// para el Device ID). `token` permite usar otra app (ej. Checkout Pro para PSE);
// por defecto usa el token principal (suscripciones).
export async function mpFetch(path, { method = "GET", body, headers = {}, token } = {}) {
  const auth = token || getMpToken();
  if (!auth) throw new Error("mp_not_configured");
  const res = await fetch(`${MP_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || "mp_error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
