import { getSupabaseAdmin } from "@/lib/supabase-server";

export const ANALYTICS_EVENTS = new Set([
  "landing_viewed",
  "cta_clicked",
  "demo_viewed",
  "demo_started",
  "demo_answered",
  "demo_completed",
  "onboarding_started",
  "onboarding_step_completed",
  "onboarding_completed",
  "signup_started",
  "signup_completed",
  "diagnostic_started",
  "diagnostic_completed",
  "diagnostic_result_viewed",
  "plan_generated",
  "paywall_viewed",
  "checkout_started",
  "checkout_failed",
  "subscription_purchased",
  "first_practice_started",
  "first_practice_completed",
]);

export function sanitizeAnalyticsContext(value) {
  const context = value && typeof value === "object" ? value : {};
  const attribution = context.attribution && typeof context.attribution === "object"
    ? context.attribution
    : {};
  const short = (input, max = 160) => typeof input === "string" ? input.slice(0, max) : null;
  return {
    visitor_id: short(context.visitor_id, 100),
    session_id: short(context.session_id, 100),
    journey: ["diagnostic_now", "diagnostic_later", "self"].includes(context.journey)
      ? context.journey
      : null,
    path: short(context.path, 500),
    device_type: ["mobile", "tablet", "desktop"].includes(context.device_type)
      ? context.device_type
      : null,
    attribution: {
      utm_source: short(attribution.utm_source),
      utm_medium: short(attribution.utm_medium),
      utm_campaign: short(attribution.utm_campaign),
      utm_content: short(attribution.utm_content),
      utm_term: short(attribution.utm_term),
      fbclid: short(attribution.fbclid, 300),
      ttclid: short(attribution.ttclid, 300),
      landing_path: short(attribution.landing_path, 500),
      captured_at: short(attribution.captured_at, 40),
    },
  };
}

function sanitizeProperties(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) =>
        /^[a-z][a-z0-9_]{0,39}$/i.test(key) &&
        (item == null || ["string", "number", "boolean"].includes(typeof item)),
      )
      .slice(0, 30)
      .map(([key, item]) => [key, typeof item === "string" ? item.slice(0, 160) : item]),
  );
}

export async function recordAnalyticsEvent({
  eventId,
  eventName,
  userId = null,
  context = {},
  properties = {},
  country = null,
  userAgent = null,
  occurredAt = null,
}) {
  if (!ANALYTICS_EVENTS.has(eventName)) return { ok: false, reason: "invalid_event" };
  const supabase = getSupabaseAdmin();
  if (!supabase) return { ok: false, reason: "not_configured" };
  const safe = sanitizeAnalyticsContext(context);
  const attribution = safe.attribution || {};
  const row = {
    event_id: typeof eventId === "string" ? eventId.slice(0, 180) : `server_${crypto.randomUUID()}`,
    event_name: eventName,
    occurred_at: occurredAt || new Date().toISOString(),
    visitor_id: safe.visitor_id,
    session_id: safe.session_id,
    user_id: typeof userId === "string" ? userId.slice(0, 100) : null,
    journey: safe.journey,
    path: safe.path,
    device_type: safe.device_type,
    country: typeof country === "string" ? country.slice(0, 8) : null,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    fbclid: attribution.fbclid,
    user_agent: typeof userAgent === "string" ? userAgent.slice(0, 500) : null,
    product_version: "math_v1",
    properties: sanitizeProperties(properties),
  };
  const { error } = await supabase
    .from("analytics_events")
    .upsert(row, { onConflict: "event_id", ignoreDuplicates: true });
  if (error) {
    console.error("[analytics] no se pudo guardar", eventName, error.code || error.message);
    return { ok: false, reason: error.code || "db" };
  }
  return { ok: true };
}
