// Dispara eventos del TikTok Pixel (si está cargado). Seguro si no hay pixel:
// simplemente no hace nada. Úsalo en componentes de cliente.
//
// Eventos estándar de TikTok que usamos (nombres oficiales de TikTok):
//   - InitiateCheckout: al iniciar el checkout de pago
//   - CompleteRegistration: al terminar el registro/onboarding
//   - CompletePayment: compra confirmada (se envía server-side desde el webhook)

export function trackTikTok(event, params) {
  if (typeof window !== "undefined" && window.ttq && typeof window.ttq.track === "function") {
    window.ttq.track(event, params || {});
  }
}
