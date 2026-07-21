// Dispara eventos del Meta Pixel (si está cargado). Seguro si no hay pixel:
// simplemente no hace nada. Úsalo en componentes de cliente.
//
// Eventos estándar que usamos para optimizar campañas en Meta Ads:
//   - InitiateCheckout: al iniciar el checkout de pago
//   - Purchase: al confirmarse la suscripción
//   - CompleteRegistration: al terminar el registro/onboarding

export function trackMeta(event, params) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params || {});
  }
}
