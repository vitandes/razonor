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
// Con prueba activa, el CTA principal lidera con "gratis" para quitar el miedo
// a pagar antes de ver el valor.
export const CTA_START = HAS_TRIAL ? "Empezar gratis" : "Empezar";
// En el hero/cierre va junto al botón secundario "Ver un ejemplo gratis":
// se mantiene corto (una sola línea) para que ambos queden a la misma altura.
// El detalle "3 días gratis" vive en la línea de apoyo bajo los botones.
export const CTA_START_LONG = HAS_TRIAL ? "Empezar gratis" : "Saber por dónde empezar";
export const CTA_PROBLEM = HAS_TRIAL
  ? `Probar gratis ${TRIAL_LABEL}`
  : "Descubrir qué necesita reforzar";
export const CTA_PLAN = HAS_TRIAL ? `Empezar prueba de ${TRIAL_LABEL}` : "Elegir este plan";

// CTA secundario: el padre prueba la experiencia real (sin login, sin el niño)
// antes de decidir. Lleva a la demo guiada de 4 retos (no al banco completo).
export const CTA_DEMO = "Ver un ejemplo gratis";
export const DEMO_HREF = "/demo";
