// Precios y moneda según el mercado:
//   - Colombia: Mercado Pago cobra en COP (precios COP en lib/mercadopago.js).
//   - Resto del mundo: Lemon Squeezy cobra en DÓLARES (USD_PRICES de aquí);
//     la moneda local del visitante se muestra solo como REFERENCIA convertida
//     desde USD con tasas en vivo.

import { useEffect, useState } from "react";

// Precios internacionales en USD (viven en lib/lemonsqueezy.js, sin hooks,
// para que el webhook de LS también pueda importarlos).
export { USD_PRICES } from "@/lib/lemonsqueezy";

export const formatUsd = (n) =>
  "$" + (Number.isInteger(n) ? n : n.toFixed(2)) + " USD";

// Respaldo: COP que vale 1 unidad de cada moneda (aprox.). Solo se usa si la API
// de tasas en vivo (/api/rates) falla.
export const COP_PER_UNIT = {
  USD: 4000, EUR: 4350, MXN: 215, CLP: 4.3, ARS: 3.3, PEN: 1070, BRL: 700, UYU: 100,
};

// País (ISO-2) -> moneda de referencia. Países sin mapeo muestran solo COP.
export const COUNTRY_CURRENCY = {
  US: "USD", PR: "USD", EC: "USD", PA: "USD", SV: "USD",
  ES: "EUR", DE: "EUR", FR: "EUR", IT: "EUR", PT: "EUR", NL: "EUR", IE: "EUR",
  MX: "MXN", CL: "CLP", AR: "ARS", PE: "PEN", BR: "BRL", UY: "UYU",
};

const LOCALE = { USD: "en-US", EUR: "es-ES", BRL: "pt-BR" };

export const formatCop = (n) => "$" + Math.round(n).toLocaleString("es-CO");

// "$12 USD" — moneda local con su CÓDIGO para que no se confunda con el "$" de COP.
function formatLocal(amount, currency) {
  const num = new Intl.NumberFormat(LOCALE[currency] || "es", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
  return `${num} ${currency}`;
}

// Hook único: detecta la moneda del visitante (geo o ?cur=USD para pruebas) y
// trae las tasas en vivo. Expone localPrice(cop) -> "$12 USD" (o null si Colombia).
export function usePricing() {
  const [currency, setCurrency] = useState(null);
  const [rates, setRates] = useState(null); // base COP: unidades de X por 1 COP

  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("cur");
      if (q && COP_PER_UNIT[q.toUpperCase()]) {
        setCurrency(q.toUpperCase());
        return;
      }
    } catch {
      /* ignorar */
    }
    fetch("/api/geo")
      .then((r) => r.json())
      .then(({ country }) => {
        const cur = COUNTRY_CURRENCY[country];
        if (cur && cur !== "COP") setCurrency(cur);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!currency) return;
    fetch("/api/rates")
      .then((r) => r.json())
      .then((d) => setRates(d.rates || null))
      .catch(() => {});
  }, [currency]);

  function localPrice(copAmount) {
    if (!currency) return null;
    // tasa en vivo (X por 1 COP); si no hay, respaldo (1 / COP por unidad)
    const rate =
      (rates && rates[currency]) ||
      (COP_PER_UNIT[currency] ? 1 / COP_PER_UNIT[currency] : null);
    if (!rate) return null;
    return formatLocal(copAmount * rate, currency);
  }

  // Referencia local de un precio en USD (el cobro internacional ES en USD).
  // Si la moneda del visitante ya es USD, no hay nada que convertir.
  function localFromUsd(usdAmount) {
    if (!currency || currency === "USD") return null;
    // cruce vía COP con tasas en vivo: 1 USD = rates[cur] / rates.USD
    const live =
      rates && rates[currency] && rates.USD ? rates[currency] / rates.USD : null;
    const fallback =
      COP_PER_UNIT[currency] && COP_PER_UNIT.USD
        ? COP_PER_UNIT.USD / COP_PER_UNIT[currency]
        : null;
    const rate = live || fallback;
    if (!rate) return null;
    return formatLocal(usdAmount * rate, currency);
  }

  return { currency, localPrice, localFromUsd };
}
