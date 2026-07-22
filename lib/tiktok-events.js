// Events API de TikTok (server-side). Envía la compra confirmada
// (CompletePayment) desde el webhook de Mercado Pago, sin depender de que el
// usuario vuelva a la app — igual que la CAPI de Meta.
//
// Requiere:
//   NEXT_PUBLIC_TIKTOK_PIXEL_ID  (id del pixel/web event source)
//   TIKTOK_ACCESS_TOKEN          (token de la Events API, secreto, solo server)
// Sin alguno de los dos, no hace nada.

import crypto from "crypto";

// Uno o VARIOS pixels separados por coma: la compra se reporta a todos (cada
// campaña puede optimizar con el suyo). Deben pertenecer a la misma cuenta de
// TikTok Ads que el TIKTOK_ACCESS_TOKEN.
const PIXEL_IDS = (
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ||
  "D94KEOBC77UARCKAVC70,D94JU4JC77UDRLSQBQAG"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const API = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

function sha256(value) {
  return crypto
    .createHash("sha256")
    .update(String(value).trim().toLowerCase())
    .digest("hex");
}

// fb = señales del navegador guardadas al hacer checkout (mismo blob que Meta:
// ahí también guardamos ttclid/ttp de TikTok). eventId estable para dedup.
export async function sendTikTokPurchase({
  email,
  value,
  currency = "COP",
  eventId,
  externalId,
  contentId = "subscription",
  fb,
}) {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token || PIXEL_IDS.length === 0) return; // TikTok no configurado

  const user = {};
  if (email) user.email = sha256(email);
  if (externalId) user.external_id = sha256(externalId);
  if (fb?.ttclid) user.ttclid = fb.ttclid;
  if (fb?.ttp) user.ttp = fb.ttp;
  if (fb?.ip) user.ip = fb.ip;
  if (fb?.ua) user.user_agent = fb.ua;
  // teléfono en formato E.164 (+57...) hasheado, como pide TikTok
  if (fb?.ph) {
    const digits = String(fb.ph).replace(/\D/g, "");
    if (digits) user.phone = sha256("+" + digits);
  }

  const event = {
    event: "CompletePayment",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    user,
    properties: {
      currency,
      value: Number(value) || 0,
      content_type: "product",
      contents: [{ content_id: contentId, content_type: "product" }],
    },
    page: { url: "https://www.razonor.com/aprendo" },
  };

  // Mismo evento a cada pixel (event_id igual: la dedup de TikTok es por pixel).
  await Promise.all(
    PIXEL_IDS.map(async (pixelId) => {
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Access-Token": token, "Content-Type": "application/json" },
          body: JSON.stringify({ event_source: "web", event_source_id: pixelId, data: [event] }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || (data && data.code !== 0)) {
          console.error("[tiktok]", pixelId, "error", res.status, JSON.stringify(data).slice(0, 300));
        } else {
          console.log("[tiktok]", pixelId, "CompletePayment enviado", eventId, value, currency);
        }
      } catch (e) {
        console.error("[tiktok]", pixelId, "fetch error", e?.message);
      }
    }),
  );
}
