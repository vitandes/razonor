// Analítica de producto del navegador.
//
// Conserva un identificador anónimo y la primera atribución publicitaria para
// poder unir landing -> registro -> pago sin guardar nombres, correos ni las
// respuestas del estudiante. Los eventos se envían a nuestra API, GA4 y, solo
// cuando se solicita explícitamente, como eventos comerciales seguros a Meta.

const VISITOR_KEY = "razonor_visitor_v1";
const SESSION_KEY = "razonor_session_v1";
const ATTRIBUTION_KEY = "razonor_attribution_v1";
const JOURNEY_KEY = "razonor_journey_v1";
const ONCE_PREFIX = "razonor_event_once_v1:";

function randomId(prefix) {
  const value = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${value}`;
}

function read(storage, key) {
  try {
    return storage?.getItem(key) || null;
  } catch {
    return null;
  }
}

function write(storage, key, value) {
  try {
    storage?.setItem(key, value);
  } catch {
    // La medición nunca debe interrumpir el producto.
  }
}

function safeJson(value, fallback = {}) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function scalarProperties(properties = {}) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([key, value]) =>
        /^[a-z][a-z0-9_]{0,39}$/i.test(key) &&
        (value == null || ["string", "number", "boolean"].includes(typeof value)),
      )
      .slice(0, 30)
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 160) : value]),
  );
}

export function captureAttribution() {
  if (typeof window === "undefined") return {};
  const existing = safeJson(read(window.localStorage, ATTRIBUTION_KEY));
  const params = new URLSearchParams(window.location.search);
  const incoming = {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    fbclid: params.get("fbclid"),
    ttclid: params.get("ttclid"),
  };
  const hasIncoming = Object.values(incoming).some(Boolean);
  if (hasIncoming && !existing.captured_at) {
    const next = {
      ...Object.fromEntries(Object.entries(incoming).filter(([, value]) => value)),
      landing_path: `${window.location.pathname}${window.location.search}`.slice(0, 500),
      captured_at: new Date().toISOString(),
    };
    write(window.localStorage, ATTRIBUTION_KEY, JSON.stringify(next));
    return next;
  }
  return existing;
}

export function setAnalyticsJourney(journey) {
  if (typeof window === "undefined") return;
  if (["diagnostic_now", "diagnostic_later", "self"].includes(journey)) {
    write(window.localStorage, JOURNEY_KEY, journey);
  }
}

export function getAnalyticsContext() {
  if (typeof window === "undefined") return {};
  let visitorId = read(window.localStorage, VISITOR_KEY);
  if (!visitorId) {
    visitorId = randomId("v");
    write(window.localStorage, VISITOR_KEY, visitorId);
  }
  let sessionId = read(window.sessionStorage, SESSION_KEY);
  if (!sessionId) {
    sessionId = randomId("s");
    write(window.sessionStorage, SESSION_KEY, sessionId);
  }
  return {
    visitor_id: visitorId,
    session_id: sessionId,
    journey: read(window.localStorage, JOURNEY_KEY),
    attribution: captureAttribution(),
    path: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    device_type: window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop",
  };
}

export function trackMetaCustom(event, params = {}) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", event, scalarProperties(params));
  }
}

export function trackProductEvent(eventName, properties = {}, options = {}) {
  if (typeof window === "undefined") return;
  const context = getAnalyticsContext();
  const eventId = randomId("e");
  const safeProperties = scalarProperties(properties);

  if (options.once) {
    const scope = options.once === "session" ? window.sessionStorage : window.localStorage;
    const key = `${ONCE_PREFIX}${options.onceKey || eventName}`;
    if (read(scope, key)) return;
    write(scope, key, eventId);
  }

  const payload = {
    event_id: eventId,
    event_name: eventName,
    ...context,
    properties: safeProperties,
  };

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      ...safeProperties,
      journey: context.journey || undefined,
    });
  }
  if (options.metaEvent) trackMetaCustom(options.metaEvent, safeProperties);
}

export function markSignupIntent() {
  if (typeof window === "undefined") return;
  write(window.localStorage, "razonor_signup_pending_v1", new Date().toISOString());
}

export function consumeSignupIntent() {
  if (typeof window === "undefined") return false;
  const key = "razonor_signup_pending_v1";
  const pending = read(window.localStorage, key);
  if (!pending) return false;
  try {
    window.localStorage.removeItem(key);
  } catch {}
  return true;
}
