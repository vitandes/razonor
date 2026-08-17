import Link from "next/link";
import { CTA_START } from "@/lib/trial";

// Estrellas de calificación. value = cuántas estrellas llenas (0–5).
export function Stars({ value = 5, className = "" }) {
  const rounded = Math.round(value);
  return (
    <span
      className={`inline-flex text-honey ${className}`}
      role="img"
      aria-label={`${value} de 5 estrellas`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden="true">
          {i < rounded ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

// CTA primario único de toda la página. El texto por defecto cambia solo según
// haya prueba gratis o no (lib/trial). Lleva al onboarding parental -> registro -> planes.
// variant: "honey" (botón miel, por defecto) o "ink" (botón oscuro, para
// usar sobre fondos miel donde el botón miel no contrastaría).
export function TrialButton({
  children = CTA_START,
  size = "md",
  variant = "honey",
  className = "",
}) {
  // El CTA grande late con un halo ámbar para atraer la mirada.
  const pad =
    size === "lg"
      ? "animate-glowpulse px-8 py-4 text-lg"
      : size === "sm"
        ? "px-4 py-2.5 text-sm"
        : "px-6 py-3.5 text-base";
  const color =
    variant === "ink"
      ? "bg-night text-white hover:bg-night-soft"
      : "bg-honey text-night hover:bg-honey-deep hover:text-white";
  return (
    <Link
      href="/onboarding"
      className={`inline-flex items-center justify-center rounded-full font-display font-bold shadow-card transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey ${color} ${pad} ${className}`}
    >
      {children}
    </Link>
  );
}

// Reversa de riesgo: siempre acompaña al CTA.
export function RiskReversal({ className = "" }) {
  return (
    <p className={`text-sm text-muted ${className}`}>
     Cancela cuando quieras
    </p>
  );
}
