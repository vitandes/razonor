// Tasas de cambio en vivo con base COP (cuántas unidades de cada moneda equivale
// 1 COP). Fuente: open.er-api.com (gratis, sin API key). Se cachea 12h. Si falla,
// devolvemos null y el cliente usa una tabla aproximada de respaldo.
// Es solo para el PRECIO DE REFERENCIA; el cobro real siempre es en COP.

export const runtime = "edge";

export async function GET() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/COP", {
      next: { revalidate: 43200 }, // 12 horas
    });
    const data = await res.json();
    if (data && data.result === "success" && data.rates) {
      return Response.json({ rates: data.rates, updated: data.time_last_update_utc || null });
    }
  } catch {
    /* sin red / proveedor caído: respaldo en el cliente */
  }
  return Response.json({ rates: null });
}
