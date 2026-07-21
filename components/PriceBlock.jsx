// Bloque de precio. Con `trial` (ej. "7 días") resalta la prueba gratis: "$0
// hoy" grande y el precio real como "luego $X al terminar la prueba". En el
// plan semestral muestra el equivalente por mes y el mensaje de ahorro.
//
// Dos modos:
//   - Colombia (sin `usd`): precio en COP (Mercado Pago).
//   - Internacional (`usd` presente): precio en DÓLARES (Lemon Squeezy cobra
//     en USD) + referencia en la moneda local del visitante.

import { formatCop, formatUsd } from "@/lib/pricing";

export default function PriceBlock({
  amount,
  perMonthEq, // COP por mes (solo semestral); null en mensual
  period, // "/mes" | "/semestre"
  savings, // texto de ahorro o null
  currency,
  localPrice,
  trial, // etiqueta de la prueba ("7 días") o null para cobro inmediato
  usd, // precio en USD (solo visitantes internacionales) o null
  usdRef, // referencia local del precio USD ("13 € EUR") o null
}) {
  const local = currency ? localPrice(amount) : null;

  // ----- INTERNACIONAL: el cobro es en USD (Lemon Squeezy) -----
  if (usd != null) {
    const usdPerMonth = period === "/semestre" ? usd / 6 : null;
    return (
      <div className="mt-4">
        <div className="font-display text-3xl font-semibold text-ink">
          {formatUsd(usd)}
          <span className="text-base font-normal text-muted"> {period}</span>
        </div>
        {usdRef && (
          <p className="mt-1 text-sm text-muted">≈ {usdRef} {period}</p>
        )}
        <p className="mt-1 text-sm text-muted">Se cobra en dólares (USD)</p>
        {usdPerMonth && (
          <p className="mt-0.5 text-sm text-muted">
            equivale a {formatUsd(Math.round(usdPerMonth * 100) / 100)} /mes
          </p>
        )}
        {savings && (
          <span className="mt-2 inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
            {savings}
          </span>
        )}
      </div>
    );
  }

  if (trial) {
    return (
      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-semibold text-teal">$0</span>
          <span className="text-base font-medium text-muted">hoy</span>
        </div>
        <p className="mt-1 text-sm text-ink">
          Luego{" "}
          <span className="font-semibold">
            {formatCop(amount)} COP {period}
          </span>{" "}
          al terminar los {trial} de prueba
        </p>
        {local && (
          <p className="mt-0.5 text-sm text-muted">
            ≈ {local} {period}
          </p>
        )}
        {perMonthEq && (
          <p className="mt-0.5 text-sm text-muted">
            equivale a {formatCop(perMonthEq)} COP /mes
          </p>
        )}
        {savings && (
          <span className="mt-2 inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
            {savings}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4">
      {local ? (
        <>
          <div className="font-display text-3xl font-semibold text-ink">
            {local}
            <span className="text-base font-normal text-muted"> {period}</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Se cobra{" "}
            <span className="font-semibold text-ink">{formatCop(amount)} COP</span> {period}
          </p>
        </>
      ) : (
        <div className="font-display text-3xl font-semibold text-ink">
          {formatCop(amount)}
          <span className="text-base font-normal text-muted"> COP {period}</span>
        </div>
      )}

      {perMonthEq && (
        <p className="mt-1 text-sm text-muted">
          equivale a {formatCop(perMonthEq)} COP /mes
        </p>
      )}

      {savings && (
        <span className="mt-2 inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
          {savings}
        </span>
      )}
    </div>
  );
}
