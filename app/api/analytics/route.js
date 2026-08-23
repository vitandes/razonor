import { auth } from "@clerk/nextjs/server";
import {
  ANALYTICS_EVENTS,
  recordAnalyticsEvent,
  sanitizeAnalyticsContext,
} from "@/lib/analytics-server";

export const runtime = "nodejs";

export async function POST(req) {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > 12_000) return Response.json({ error: "too_large" }, { status: 413 });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  if (!ANALYTICS_EVENTS.has(body?.event_name)) {
    return Response.json({ error: "invalid_event" }, { status: 400 });
  }
  const { userId } = await auth();
  const context = sanitizeAnalyticsContext(body);
  const result = await recordAnalyticsEvent({
    eventId: body.event_id,
    eventName: body.event_name,
    userId,
    context,
    properties: body.properties,
    country: req.headers.get("x-vercel-ip-country") || null,
    userAgent: req.headers.get("user-agent") || null,
  });
  // La analítica nunca bloquea el recorrido. Si falta aplicar el esquema se
  // informa en la respuesta y el panel admin mostrará el mismo aviso.
  return Response.json(result, { status: result.reason === "invalid_event" ? 400 : 202 });
}
