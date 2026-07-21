// Devuelve el país (ISO-2) del visitante usando el header de geolocalización que
// Vercel agrega automáticamente. En local no existe el header -> null -> la app
// muestra solo COP. Es solo para mostrar un precio de referencia; el cobro real
// siempre es en COP por Mercado Pago.

export const runtime = "edge";

export async function GET(req) {
  const country =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    null;
  return Response.json({ country });
}
