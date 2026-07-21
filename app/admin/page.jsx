// Dashboard privado de métricas (suscriptores, MRR, países, etc.).
// Protegido con Basic Auth en el middleware (ADMIN_USER / ADMIN_PASSWORD).
// Es un Server Component: consulta Supabase con la service_role y calcula todo
// en el servidor. No se cachea (datos siempre frescos).

import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Ingreso mensual normalizado por plan + periodo (semestral = total / 6).
const MONTHLY_REV = {
  individual: { monthly: 49900, semestral: Math.round(149500 / 6) },
  familiar: { monthly: 69900, semestral: Math.round(199500 / 6) },
};
const cop = (n) => "$" + Math.round(n).toLocaleString("es-CO");

function monthlyRev(plan, billing) {
  const p = MONTHLY_REV[plan] || MONTHLY_REV.individual;
  return billing === "semestral" ? p.semestral : p.monthly;
}

// Mismo criterio de acceso que isSubscribed (incluye cancelados con periodo vigente).
function hasAccess(r) {
  if (r.subscription_status !== "active") return false;
  if (r.cancel_at_period_end) {
    return r.current_period_end
      ? new Date(r.current_period_end).getTime() > Date.now()
      : true;
  }
  return true;
}

let regionNames;
try {
  regionNames = new Intl.DisplayNames(["es"], { type: "region" });
} catch {
  regionNames = null;
}
function countryLabel(cc) {
  if (!cc) return "🏳️ Desconocido";
  let name = cc;
  try {
    name = regionNames?.of(cc.toUpperCase()) || cc;
  } catch {
    name = cc;
  }
  const flag =
    cc.length === 2
      ? String.fromCodePoint(
          ...[...cc.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)),
        )
      : "🏳️";
  return `${flag} ${name}`;
}

function monthKey(d) {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(key) {
  const [y, m] = key.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("es-CO", {
    month: "long",
    year: "numeric",
  });
}
function dateLabel(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function lastMonths(n) {
  const out = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    out.push(monthKey(new Date(d.getFullYear(), d.getMonth() - i, 1)));
  }
  return out;
}
// Churn de un mes: cancelaciones del mes / activos al inicio del mes.
function churnForMonth(rows, key) {
  const [y, m] = key.split("-").map(Number);
  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);
  const activeAtStart = rows.filter(
    (r) =>
      r.subscribed_at &&
      new Date(r.subscribed_at) < start &&
      (!r.canceled_at || new Date(r.canceled_at) >= start),
  ).length;
  const churned = rows.filter(
    (r) =>
      r.canceled_at &&
      new Date(r.canceled_at) >= start &&
      new Date(r.canceled_at) < end,
  ).length;
  return {
    activeAtStart,
    churned,
    pct: activeAtStart ? Math.round((churned / activeAtStart) * 100) : 0,
  };
}

// Reconstruye métricas mes a mes (nuevos, churn, activos y MRR al fin de mes).
function monthlyStats(rows, monthKeys) {
  const activeAt = (r, when) =>
    r.subscribed_at &&
    new Date(r.subscribed_at) < when &&
    (!r.canceled_at || new Date(r.canceled_at) >= when);
  return monthKeys.map((key) => {
    const [y, m] = key.split("-").map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 1);
    const activeStart = rows.filter((r) => activeAt(r, start)).length;
    const activeEndRows = rows.filter((r) => activeAt(r, end));
    const news = rows.filter(
      (r) =>
        r.subscribed_at &&
        new Date(r.subscribed_at) >= start &&
        new Date(r.subscribed_at) < end,
    ).length;
    const churned = rows.filter(
      (r) =>
        r.canceled_at &&
        new Date(r.canceled_at) >= start &&
        new Date(r.canceled_at) < end,
    ).length;
    const mrr = activeEndRows.reduce(
      (s, r) => s + monthlyRev(r.subscription_plan, r.billing),
      0,
    );
    return {
      key,
      news,
      churned,
      activeStart,
      activeEnd: activeEndRows.length,
      mrr,
      churnPct: activeStart ? Math.round((churned / activeStart) * 100) : 0,
    };
  });
}
function shortMonth(key) {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("es-CO", { month: "short" });
}

export default async function AdminDashboard() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return (
      <Shell>
        <p className="text-sm text-muted">Supabase no está configurado.</p>
      </Shell>
    );
  }

  // OJO: Supabase corta los select en 1.000 filas. Con miles de cuentas, traer
  // toda la tabla dejaba suscriptores por fuera (el conteo salía bajito). Por
  // eso: (1) solo las filas que alguna vez se suscribieron o están activas
  // (son pocas y es lo único que usan las métricas), y (2) el total de cuentas
  // como COUNT aparte, sin traer filas.
  const [subsRes, countRes] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "email, subscription_status, subscription_plan, billing, cancel_at_period_end, current_period_end, country, subscribed_at, canceled_at, updated_at",
      )
      .or("subscription_status.eq.active,subscribed_at.not.is.null"),
    supabase.from("profiles").select("user_id", { count: "exact", head: true }),
  ]);

  if (subsRes.error) {
    return (
      <Shell>
        <p className="text-sm text-coral">
          Error consultando la base: {subsRes.error.message}
        </p>
      </Shell>
    );
  }

  const rows = subsRes.data || [];
  const totalAccounts = countRes.count ?? rows.length;
  const subs = rows.filter(hasAccess);
  const renewing = subs.filter((r) => !r.cancel_at_period_end);
  const canceling = subs.length - renewing.length;

  // MRR = solo los que renuevan (los cancelados no van a recurrir).
  const mrr = renewing.reduce(
    (s, r) => s + monthlyRev(r.subscription_plan, r.billing),
    0,
  );
  const arr = mrr * 12;

  const countIf = (fn) => subs.filter(fn).length;
  const monthly = countIf((r) => (r.billing || "monthly") === "monthly");
  const semestral = countIf((r) => r.billing === "semestral");
  const individual = countIf((r) => (r.subscription_plan || "individual") === "individual");
  const familiar = countIf((r) => r.subscription_plan === "familiar");

  const byCountry = {};
  for (const r of subs) {
    const k = r.country || "—";
    byCountry[k] = (byCountry[k] || 0) + 1;
  }
  const countries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]);

  // Nuevos suscriptores por mes (según subscribed_at).
  const thisMonth = monthKey(new Date());
  const byMonth = {};
  for (const r of subs) {
    if (!r.subscribed_at) continue;
    const k = monthKey(r.subscribed_at);
    byMonth[k] = (byMonth[k] || 0) + 1;
  }
  const newThisMonth = byMonth[thisMonth] || 0;
  const churnThisMonth = churnForMonth(rows, thisMonth).pct;

  // Serie mes a mes (más antiguo -> más nuevo) para gráficas y comparación.
  const stats = monthlyStats(rows, lastMonths(6).reverse());

  // Últimos suscriptores.
  const lastSubs = subs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.subscribed_at || b.updated_at || 0) -
        new Date(a.subscribed_at || a.updated_at || 0),
    )
    .slice(0, 10);

  return (
    <Shell>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Suscriptores activos" value={subs.length} />
        <Metric label="MRR (ingreso mensual)" value={cop(mrr)} accent />
        <Metric label="ARR (anualizado)" value={cop(arr)} />
        <Metric
          label="Cuentas totales"
          value={totalAccounts}
          sub={`${subs.length} pagando`}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Mensual" value={monthly} />
        <Metric label="Semestral" value={semestral} />
        <Metric label="Plan Individual" value={individual} />
        <Metric label="Plan Familiar" value={familiar} />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Nuevos este mes" value={newThisMonth} />
        <Metric label="Churn este mes" value={`${churnThisMonth}%`} sub="cancelaciones / activos" />
        <Metric label="Cancelando ahora" value={canceling} />
      </div>

      {canceling > 0 && (
        <p className="mt-3 rounded-2xl bg-coral/10 px-4 py-2 text-sm font-medium text-coral">
          {canceling} cancelando — conservan acceso hasta fin de periodo, no renuevan.
        </p>
      )}

      <section className="mt-6 rounded-4xl bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Suscriptores por país
          </h2>
          <span className="text-sm text-muted">{countries.length} países</span>
        </div>
        {countries.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Aún no hay suscriptores activos.</p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <tbody>
              {countries.map(([cc, n]) => (
                <tr key={cc} className="border-t border-ink/5">
                  <td className="py-2 text-ink">
                    {countryLabel(cc === "—" ? null : cc)}
                  </td>
                  <td className="py-2 text-right font-display font-semibold text-ink">
                    {n}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mt-4 rounded-4xl bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">Evolución mensual</h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Chart
            title="Nuevos suscriptores"
            data={stats.map((s) => ({ label: shortMonth(s.key), value: s.news }))}
            color="bg-honey"
          />
          <Chart
            title="MRR (fin de mes)"
            data={stats.map((s) => ({ label: shortMonth(s.key), value: s.mrr }))}
            color="bg-teal"
            format={(v) => "$" + Math.round(v / 1000) + "k"}
          />
          <Chart
            title="Activos (fin de mes)"
            data={stats.map((s) => ({ label: shortMonth(s.key), value: s.activeEnd }))}
            color="bg-grape"
          />
          <Chart
            title="Churn %"
            data={stats.map((s) => ({ label: shortMonth(s.key), value: s.churnPct }))}
            color="bg-coral"
            format={(v) => v + "%"}
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-muted">
                <th className="py-2 font-medium">Mes</th>
                <th className="py-2 text-right font-medium">Nuevos</th>
                <th className="py-2 text-right font-medium">Activos</th>
                <th className="py-2 text-right font-medium">MRR</th>
                <th className="py-2 text-right font-medium">Churn</th>
              </tr>
            </thead>
            <tbody>
              {[...stats].reverse().map((s) => (
                <tr key={s.key} className="border-t border-ink/5">
                  <td className="py-2 capitalize text-ink">{monthLabel(s.key)}</td>
                  <td className="py-2 text-right text-ink">{s.news}</td>
                  <td className="py-2 text-right text-ink">{s.activeEnd}</td>
                  <td className="py-2 text-right font-display font-semibold text-ink">
                    {cop(s.mrr)}
                  </td>
                  <td className="py-2 text-right text-ink">{s.churnPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 rounded-4xl bg-white p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">Últimos suscriptores</h2>
        {lastSubs.length === 0 ? (
          <p className="mt-2 text-sm text-muted">Aún no hay suscriptores activos.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 font-medium">Correo</th>
                  <th className="py-2 font-medium">País</th>
                  <th className="py-2 font-medium">Plan</th>
                  <th className="py-2 font-medium">Periodo</th>
                  <th className="py-2 font-medium">Desde</th>
                </tr>
              </thead>
              <tbody>
                {lastSubs.map((r, i) => (
                  <tr key={i} className="border-t border-ink/5">
                    <td className="py-2 text-ink">{r.email || "—"}</td>
                    <td className="py-2">{countryLabel(r.country)}</td>
                    <td className="py-2 capitalize">{r.subscription_plan || "—"}</td>
                    <td className="py-2">
                      {r.billing === "semestral"
                        ? "Semestral"
                        : r.billing === "monthly"
                          ? "Mensual"
                          : "—"}
                      {r.cancel_at_period_end && (
                        <span className="ml-1 text-xs text-coral">(cancelando)</span>
                      )}
                    </td>
                    <td className="py-2 text-muted">{dateLabel(r.subscribed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-6 text-center text-xs text-muted">
        MRR = ingreso recurrente mensual (semestral normalizado a /mes). Solo
        cuenta suscripciones que renuevan.
      </p>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <main className="min-h-screen bg-cream pb-16">
      <div className="mx-auto max-w-3xl px-5 pt-8">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Dashboard · Leotutor
        </h1>
        <p className="text-sm text-muted">Métricas de suscripción (privado).</p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}

function Metric({ label, value, sub, accent }) {
  return (
    <div className={`rounded-3xl p-5 shadow-card ${accent ? "bg-honey" : "bg-white"}`}>
      <p className={`text-sm ${accent ? "text-ink/70" : "text-muted"}`}>{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}

// Gráfica de barras verticales (renderizada en el servidor, sin librerías).
function Chart({ title, data, color = "bg-honey", format = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <p className="text-sm font-medium text-muted">{title}</p>
      <div className="mt-3 flex items-end justify-between gap-1.5" style={{ height: 120 }}>
        {data.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[11px] font-semibold text-ink">{format(d.value)}</span>
            <div className="flex w-full items-end" style={{ height: 80 }}>
              <div
                className={`w-full rounded-t-md ${color}`}
                style={{
                  height: `${Math.max((d.value / max) * 100, d.value > 0 ? 6 : 0)}%`,
                }}
                title={`${d.label}: ${format(d.value)}`}
              />
            </div>
            <span className="text-[11px] capitalize text-muted">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
