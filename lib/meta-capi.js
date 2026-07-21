// API de Conversiones de Meta (server-side). Envía el evento Purchase desde el
// servidor (webhook de Mercado Pago), sin depender de que el usuario vuelva a la
// app. Así la atribución de compras a los anuncios es confiable (no la afectan
// iOS ni los bloqueadores).
//
// Requiere el token en META_CAPI_TOKEN (se genera en Events Manager -> dataset
// -> Configuración -> API de conversiones). Sin token, no hace nada.

import crypto from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1038053602238449";
const GRAPH = "https://graph.facebook.com/v21.0";

function sha256(value) {
  return crypto
    .createHash("sha256")
    .update(String(value).trim().toLowerCase())
    .digest("hex");
}

// Envía un Purchase. fb = señales guardadas al hacer checkout: { fbp, fbc, ip,
// ua, fn, ln, ph } (click ids + datos del comprador). eventId debe ser estable
// (usamos el id de la suscripción) para que Meta no lo cuente dos veces.
// Cuantos más parámetros de coincidencia, mejor atribución (fbc es el que más
// pesa; fn/ln/ph/country también suman según Meta).
export async function sendCapiPurchase({ email, value, currency = "COP", eventId, externalId, country, fb }) {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) return; // CAPI no configurada

  const user_data = {};
  if (email) user_data.em = [sha256(email)];
  if (externalId) user_data.external_id = [sha256(externalId)];
  if (fb?.fbp) user_data.fbp = fb.fbp;
  if (fb?.fbc) user_data.fbc = fb.fbc;
  if (fb?.ip) user_data.client_ip_address = fb.ip;
  if (fb?.ua) user_data.client_user_agent = fb.ua;
  // Datos del comprador (normalizados y hasheados, como pide Meta):
  if (fb?.fn) user_data.fn = [sha256(fb.fn)];
  if (fb?.ln) user_data.ln = [sha256(fb.ln)];
  if (fb?.ph) {
    const digits = String(fb.ph).replace(/\D/g, ""); // solo dígitos con indicativo
    if (digits) user_data.ph = [sha256(digits)];
  }
  if (country) user_data.country = [sha256(country)];

  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: "https://www.leotutor.com/aprendo",
        user_data,
        custom_data: { currency, value: Number(value) || 0 },
      },
    ],
  };

  try {
    const res = await fetch(`${GRAPH}/${PIXEL_ID}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error("[capi] error", res.status, t.slice(0, 300));
    } else {
      console.log("[capi] Purchase enviado", eventId, value, currency);
    }
  } catch (e) {
    console.error("[capi] fetch error", e?.message);
  }
}
