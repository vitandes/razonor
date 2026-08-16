// Prueba gratis: ÚNICA fuente de verdad para el cobro (Mercado Pago) y para
// todos los textos de la app. Controlada por NEXT_PUBLIC_FREE_TRIAL_DAYS:
//
//   - sin definir o "0"  -> SIN prueba gratis (cobro inmediato al suscribirse)
//   - "7" (o 3, 5, ...)  -> prueba gratis de esos días (tarjeta hoy, cobro al final)
//
// Al ser NEXT_PUBLIC_, el valor llega también al cliente para que los textos
// coincidan con el cobro real. Las variables se aplican al desplegar (rebuild):
// cambia el valor en Vercel y haz redeploy.

export const FREE_TRIAL_DAYS = (() => {
  const n = parseInt(process.env.NEXT_PUBLIC_FREE_TRIAL_DAYS || "0", 10);
  return Number.isFinite(n) && n >= 1 ? n : 0;
})();

// ¿Hay prueba gratis activa?
export const HAS_TRIAL = FREE_TRIAL_DAYS >= 1;

// "7 días" / "1 día" (vacío si no hay prueba).
export const TRIAL_LABEL = HAS_TRIAL
  ? `${FREE_TRIAL_DAYS} ${FREE_TRIAL_DAYS === 1 ? "día" : "días"}`
  : "";

// Textos de CTA centralizados: cambian solos según haya prueba o no.
export const CTA_START = "Descubrir su nivel";
export const CTA_START_LONG = "Descubrir su nivel";
export const CTA_PLAN = HAS_TRIAL ? `Empezar prueba de ${TRIAL_LABEL}` : "Suscribirme";
