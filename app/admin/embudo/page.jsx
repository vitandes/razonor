import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const COMMERCIAL_STAGES = [
  ["landing_viewed", "Llegó a la landing", "Anuncio y carga de la página"],
  ["onboarding_started", "Inició el onboarding", "Promesa y llamada a la acción"],
  ["onboarding_completed", "Completó el onboarding", "Claridad y fricción de las preguntas"],
  ["paywall_viewed", "Vio la oferta", "Transición hacia el plan"],
  ["checkout_started", "Abrió el checkout", "Precio, confianza y valor percibido"],
  ["subscription_purchased", "Compra confirmada", "Pago aprobado por el proveedor"],
];

const number = new Intl.NumberFormat("es-CO");

function pct(value, total) {
  if (!total) return "—";
  return `${Math.round((value / total) * 100)}%`;
}

function eventIdentity(event, visitorOwners) {
  return event.user_id || visitorOwners.get(event.visitor_id) || event.visitor_id || event.session_id || event.event_id;
}

async function fetchEvents(supabase, since, campaign) {
  const rows = [];
  for (let from = 0; from < 50000; from += 1000) {
    let query = supabase
      .from("analytics_events")
      .select("event_id,event_name,occurred_at,visitor_id,session_id,user_id,journey,device_type,country,utm_source,utm_campaign,utm_content,properties")
      .gte("occurred_at", since)
      .order("occurred_at", { ascending: true })
      .range(from, from + 999);
    if (campaign && campaign !== "all") query = query.eq("utm_campaign", campaign);
    const result = await query;
    if (result.error) return { rows: [], error: result.error };
    rows.push(...(result.data || []));
    if (!result.data || result.data.length < 1000) break;
  }
  return { rows, error: null };
}

function uniqueByEvent(events, name, identity) {
  return new Set(events.filter((event) => event.event_name === name).map(identity));
}

function campaignRows(events, identity) {
  const groups = new Map();
  for (const event of events) {
    const campaign = event.utm_campaign || "Sin UTM";
    if (!groups.has(campaign)) groups.set(campaign, { campaign, landing: new Set(), onboarding: new Set(), checkout: new Set(), purchase: new Set() });
    const group = groups.get(campaign);
    const id = identity(event);
    if (event.event_name === "landing_viewed") group.landing.add(id);
    if (event.event_name === "onboarding_completed") group.onboarding.add(id);
    if (event.event_name === "checkout_started") group.checkout.add(id);
    if (event.event_name === "subscription_purchased") group.purchase.add(id);
  }
  return [...groups.values()]
    .map((group) => ({
      campaign: group.campaign,
      landing: group.landing.size,
      onboarding: group.onboarding.size,
      checkout: group.checkout.size,
      purchase: group.purchase.size,
    }))
    .sort((a, b) => b.landing - a.landing || b.purchase - a.purchase);
}

export default async function FunnelDashboard({ searchParams }) {
  const days = [7, 30, 90].includes(Number(searchParams?.days)) ? Number(searchParams.days) : 7;
  const selectedCampaign = typeof searchParams?.campaign === "string" ? searchParams.campaign : "all";
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const supabase = getSupabaseAdmin();

  if (!supabase) return <AdminShell><Notice>Supabase no está configurado.</Notice></AdminShell>;

  // Las campañas del selector se obtienen sin el filtro actual.
  const [eventResult, campaignResult] = await Promise.all([
    fetchEvents(supabase, sinceDate.toISOString(), selectedCampaign),
    fetchEvents(supabase, sinceDate.toISOString(), "all"),
  ]);

  if (eventResult.error) {
    const missingTable = eventResult.error.code === "42P01" || /analytics_events/i.test(eventResult.error.message || "");
    return (
      <AdminShell>
        <Notice tone="error">
          {missingTable
            ? "Falta crear la tabla de analítica en Supabase. Ejecuta la sección analytics_events de supabase/schema.sql y recarga esta página."
            : `No pudimos consultar el embudo: ${eventResult.error.message}`}
        </Notice>
      </AdminShell>
    );
  }

  const events = eventResult.rows;
  const visitorOwners = new Map();
  for (const event of campaignResult.rows) {
    if (event.visitor_id && event.user_id) visitorOwners.set(event.visitor_id, event.user_id);
  }
  const identity = (event) => eventIdentity(event, visitorOwners);
  const stageSets = Object.fromEntries(COMMERCIAL_STAGES.map(([name]) => [name, uniqueByEvent(events, name, identity)]));
  const landingTotal = stageSets.landing_viewed.size;
  const campaigns = [...new Set(campaignResult.rows.map((event) => event.utm_campaign).filter(Boolean))].sort();
  const campaignStats = campaignRows(events, identity);

  const completedOnboarding = events.filter((event) => event.event_name === "onboarding_completed");
  const journeySets = {
    diagnostic_now: new Set(completedOnboarding.filter((event) => event.journey === "diagnostic_now").map(identity)),
    diagnostic_later: new Set(completedOnboarding.filter((event) => event.journey === "diagnostic_later").map(identity)),
    self: new Set(completedOnboarding.filter((event) => event.journey === "self").map(identity)),
  };

  const purchases = events.filter((event) => event.event_name === "subscription_purchased");
  const purchaseAt = new Map(purchases.map((event) => [identity(event), new Date(event.occurred_at).getTime()]));
  const afterPurchase = (eventName, journey = null) => new Set(
    events
      .filter((event) => event.event_name === eventName && (!journey || event.journey === journey))
      .filter((event) => {
        const boughtAt = purchaseAt.get(identity(event));
        return boughtAt && new Date(event.occurred_at).getTime() >= boughtAt;
      })
      .map(identity),
  );
  const practiceStarted = afterPurchase("first_practice_started");
  const practiceCompleted = afterPurchase("first_practice_completed");
  const laterBuyers = new Set(purchases.filter((event) => event.journey === "diagnostic_later").map(identity));
  const diagnosticAfterPurchase = afterPurchase("diagnostic_completed", "diagnostic_later");
  const checkoutFailures = uniqueByEvent(events, "checkout_failed", identity).size;

  const devices = ["mobile", "tablet", "desktop"].map((device) => {
    const related = events.filter((event) => event.device_type === device);
    return {
      device,
      landing: uniqueByEvent(related, "landing_viewed", identity).size,
      purchase: uniqueByEvent(related, "subscription_purchased", identity).size,
    };
  });

  return (
    <AdminShell>
      <form className="rounded-3xl bg-white p-4 shadow-card sm:flex sm:items-end sm:gap-3" method="get">
        <label className="block flex-1 text-sm font-bold text-ink">
          Periodo
          <select name="days" defaultValue={days} className="mt-1.5 w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 font-medium">
            <option value="7">Últimos 7 días</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 90 días</option>
          </select>
        </label>
        <label className="mt-3 block flex-[2] text-sm font-bold text-ink sm:mt-0">
          Campaña
          <select name="campaign" defaultValue={selectedCampaign} className="mt-1.5 w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 font-medium">
            <option value="all">Todas las campañas</option>
            {campaigns.map((campaign) => <option key={campaign} value={campaign}>{campaign}</option>)}
          </select>
        </label>
        <button className="mt-3 w-full rounded-xl bg-night px-5 py-2.5 font-bold text-white sm:mt-0 sm:w-auto">Aplicar</button>
      </form>

      <section className="mt-5 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><p className="text-xs font-extrabold uppercase tracking-[.16em] text-teal">Conversión comercial</p><h2 className="mt-1 font-display text-2xl font-bold text-ink">De la visita a la compra</h2></div>
          <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-muted">Personas únicas · {days} días</span>
        </div>
        {events.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-cream p-5 text-sm text-muted">Aún no hay eventos en este periodo. Haz un recorrido de prueba o espera las primeras visitas de la campaña.</p>
        ) : (
          <div className="mt-6 space-y-3">
            {COMMERCIAL_STAGES.map(([name, label, diagnosis], index) => {
              const count = stageSets[name].size;
              const previous = index === 0 ? count : stageSets[COMMERCIAL_STAGES[index - 1][0]].size;
              const width = landingTotal ? Math.max(5, Math.round((count / landingTotal) * 100)) : 0;
              return (
                <div key={name} className="grid gap-2 rounded-2xl border border-ink/5 bg-cream p-4 sm:grid-cols-[190px_1fr_120px] sm:items-center">
                  <div><p className="font-bold text-ink">{label}</p><p className="text-xs text-muted">{diagnosis}</p></div>
                  <div className="h-3 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-grape" style={{ width: `${width}%` }} /></div>
                  <div className="flex items-baseline justify-between gap-3 sm:block sm:text-right"><strong className="font-display text-2xl text-ink">{number.format(count)}</strong><span className="text-xs font-bold text-muted sm:ml-2">{index === 0 ? "100%" : `${pct(count, previous)} del anterior`}</span></div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-night p-6 text-white shadow-card">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-honey">Dos recorridos correctos</p>
          <h2 className="mt-1 font-display text-2xl font-bold">Cómo continuó cada familia</h2>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <DarkMetric value={journeySets.diagnostic_now.size} label="diagnóstico ahora" />
            <DarkMetric value={journeySets.diagnostic_later.size} label="diagnóstico después" />
            <DarkMetric value={journeySets.self.size} label="plan propio" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/60">Quien elige hacerlo después no cuenta como abandono del diagnóstico antes de pagar.</p>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-card">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-teal">Activación después del pago</p>
          <h2 className="mt-1 font-display text-2xl font-bold text-ink">¿Recibieron valor?</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <LightMetric value={purchases.length ? purchaseAt.size : 0} label="compradores" />
            <LightMetric value={practiceStarted.size} label="inició práctica" />
            <LightMetric value={practiceCompleted.size} label="completó práctica" />
            <LightMetric value={`${diagnosticAfterPurchase.size}/${laterBuyers.size}`} label="diagnóstico pendiente completado" />
          </div>
        </section>
      </div>

      {checkoutFailures > 0 && <Notice tone="error">{checkoutFailures} personas encontraron un error al intentar abrir el checkout en este periodo.</Notice>}

      <section className="mt-5 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
        <h2 className="font-display text-xl font-bold text-ink">Resultados por campaña</h2>
        <p className="mt-1 text-sm text-muted">Usa UTM en cada anuncio para que aparezca separado aquí.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead><tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-muted"><th className="py-2">Campaña</th><th className="py-2 text-right">Landing</th><th className="py-2 text-right">Onboarding</th><th className="py-2 text-right">Checkout</th><th className="py-2 text-right">Compras</th><th className="py-2 text-right">Conv.</th></tr></thead>
            <tbody>{campaignStats.map((row) => <tr key={row.campaign} className="border-b border-ink/5"><td className="max-w-52 truncate py-3 font-bold text-ink">{row.campaign}</td><td className="py-3 text-right">{row.landing}</td><td className="py-3 text-right">{row.onboarding}</td><td className="py-3 text-right">{row.checkout}</td><td className="py-3 text-right font-bold text-teal">{row.purchase}</td><td className="py-3 text-right">{pct(row.purchase, row.landing)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-5 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
        <h2 className="font-display text-xl font-bold text-ink">Comportamiento por dispositivo</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {devices.map((row) => <div key={row.device} className="rounded-2xl bg-cream p-4"><p className="text-sm font-bold capitalize text-ink">{row.device === "mobile" ? "Móvil" : row.device === "tablet" ? "Tableta" : "Escritorio"}</p><p className="mt-2 text-2xl font-display font-bold text-ink">{row.landing}</p><p className="text-xs text-muted">visitas · {row.purchase} compras · {pct(row.purchase, row.landing)}</p></div>)}
        </div>
      </section>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">Las tasas usan personas identificadas, no número bruto de eventos. El gasto, CPA y ROAS se consultan en Meta hasta conectar su API de anuncios.</p>
    </AdminShell>
  );
}

function AdminShell({ children }) {
  return (
    <main className="min-h-screen bg-cream pb-16">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="font-display text-3xl font-bold text-ink">Embudo · Razonor</h1><p className="text-sm text-muted">Adquisición, compra y primera activación.</p></div>
          <nav className="flex rounded-full bg-white p-1 shadow-card"><Link href="/admin" className="rounded-full px-4 py-2 text-sm font-bold text-muted">Suscripciones</Link><Link href="/admin/embudo" className="rounded-full bg-night px-4 py-2 text-sm font-bold text-white">Embudo</Link></nav>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}

function Notice({ children, tone = "neutral" }) {
  return <div className={`mt-5 rounded-2xl px-5 py-4 text-sm font-semibold ${tone === "error" ? "border border-coral/30 bg-coral/10 text-coral" : "bg-white text-muted shadow-card"}`}>{children}</div>;
}

function DarkMetric({ value, label }) {
  return <div className="rounded-2xl bg-white/10 p-3"><strong className="font-display text-2xl text-honey">{value}</strong><span className="mt-1 block text-[11px] leading-tight text-white/60">{label}</span></div>;
}

function LightMetric({ value, label }) {
  return <div className="rounded-2xl bg-cream p-4"><strong className="font-display text-2xl text-ink">{value}</strong><span className="mt-1 block text-xs leading-tight text-muted">{label}</span></div>;
}
