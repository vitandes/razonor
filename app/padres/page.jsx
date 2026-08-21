"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import { useProgress, isSubscribed } from "@/lib/progress";
import { DIAGNOSTIC_VERSION, lowestSkill } from "@/lib/diagnostic";
import {
  CATEGORY_BY_ID,
  MATH_CATEGORIES,
  MATH_SKILLS,
  SKILL_BY_ID,
  initialPlanFromDiagnostic,
  skillStatus,
} from "@/lib/mathCatalog";

export default function ParentReport() {
  const progress = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (!progress.serverLoaded) return;
    if (isSubscribed(progress.subscription)) return;
    router.replace("/planes");
  }, [progress.serverLoaded, progress.subscription, router]);

  if (!progress.hydrated || !progress.serverLoaded || !isSubscribed(progress.subscription)) {
    return <Loading />;
  }

  const hasDiagnostic =
    progress.diagnostic?.completed && progress.diagnostic?.version === DIAGNOSTIC_VERSION;
  const mastery = progress.mathV1?.mastery || {};
  const sessions = progress.mathV1?.sessions || [];
  const plan = hasDiagnostic
    ? initialPlanFromDiagnostic(progress.diagnostic, mastery)
    : [];
  const name = progress.name || "El estudiante";
  const weekly = sessionStats(sessions);
  const chartValues = weekly.values;
  const labels = weekly.labels;
  const maxMinutes = Math.max(...chartValues, 1);
  const observed = Object.values(progress.diagnostic?.scores || {});
  const diagnosticAverage = observed.length
    ? Math.round(observed.reduce((sum, value) => sum + Number(value || 0), 0) / observed.length)
    : null;
  const practiced = Object.values(mastery);
  const currentAverage = practiced.length
    ? Math.round(practiced.reduce((sum, item) => sum + Number(item.mastery || 0), 0) / practiced.length)
    : diagnosticAverage;
  const opportunityId = plan[0]?.skill?.id || (hasDiagnostic ? lowestSkill(progress.diagnostic.scores) : null);
  const opportunity = SKILL_BY_ID[opportunityId];

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
        <header className="flex items-center justify-between gap-3">
          <Link href="/"><LogoWordmark size={34} /></Link>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-muted shadow-card sm:block">
              Panel para padres
            </span>
            <Link href="/aprendo" className="rounded-full bg-night px-4 py-2.5 text-sm font-bold text-white">
              Ir a aprender
            </Link>
            <UserButton />
          </div>
        </header>

        {progress.isFamiliar && <ProfileSwitcher label="Viendo el progreso de:" />}

        <section className="relative mt-6 overflow-hidden rounded-[2rem] bg-night p-6 text-white shadow-soft sm:p-9">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[42px] border-grape/20" />
          <div className="absolute -bottom-16 right-48 h-36 w-36 rounded-full bg-honey/10 blur-2xl" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-honey">Progreso matemático</p>
              <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold leading-tight sm:text-5xl">
                Entiende qué domina {name} y qué necesita trabajar ahora
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                El plan combina el diagnóstico con evidencia de cada práctica. No etiqueta al estudiante: muestra qué fundamento conviene fortalecer y por qué.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <HeroStat value={currentAverage == null ? "—" : currentAverage} label="dominio" suffix={currentAverage == null ? "" : "/100"} />
              <HeroStat value={weekly.count} label="sesiones" />
              <HeroStat value={progress.streak || 0} label="racha" suffix=" días" />
            </div>
          </div>
        </section>

        {!hasDiagnostic ? (
          <section className="mt-6 rounded-[2rem] border-2 border-dashed border-ink/10 bg-white p-7 text-center shadow-card sm:p-10">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-honey-soft font-display text-2xl font-bold text-honey-deep">01</span>
            <h2 className="mt-5 font-display text-2xl font-bold text-ink">Falta el punto de partida</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted">Cuando complete el diagnóstico adaptativo, aquí aparecerán sus fortalezas, prioridades y ruta por habilidades.</p>
            <Link href="/diagnostico?start=1" className="mt-6 inline-flex rounded-full bg-honey px-6 py-3 font-bold text-night">Empezar diagnóstico</Link>
          </section>
        ) : (
          <>
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <section className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-teal">Mapa de fundamentos</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-ink">Seis áreas matemáticas</h2>
                    <p className="mt-2 text-sm text-muted">La barra cambia con nueva evidencia; no depende solo del primer diagnóstico.</p>
                  </div>
                  <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-muted">30 habilidades conectadas</span>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {MATH_CATEGORIES.map((category) => (
                    <CategoryProgress
                      key={category.id}
                      category={category}
                      diagnostic={progress.diagnostic}
                      mastery={mastery}
                    />
                  ))}
                </div>
              </section>

              <aside className="space-y-5 lg:sticky lg:top-5">
                <section className="overflow-hidden rounded-[2rem] bg-honey-soft p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">
                      {opportunity ? CATEGORY_BY_ID[opportunity.category]?.symbol : "?"}
                    </span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-honey-deep">Prioridad actual</p>
                      <h2 className="font-display text-xl font-bold text-ink">{opportunity?.title || "Por definir"}</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/75">
                    Aparece primero porque su dominio estimado es bajo y otras habilidades dependen de esta base.
                  </p>
                  <Link href="/aprendo" className="mt-5 inline-flex w-full justify-center rounded-2xl bg-night px-5 py-3 font-bold text-white">Ver su plan</Link>
                </section>

                <section className="rounded-[2rem] bg-white p-6 shadow-card">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-grape">Cómo leer el reporte</p>
                  <div className="mt-4 space-y-3 text-sm text-muted">
                    <Legend color="bg-teal" label="Dominada: 85 o más" />
                    <Legend color="bg-honey" label="Casi dominada: 70–84" />
                    <Legend color="bg-grape" label="En aprendizaje: 40–69" />
                    <Legend color="bg-coral" label="Por fortalecer: menos de 40" />
                  </div>
                  <p className="mt-4 border-t border-ink/5 pt-4 text-xs leading-relaxed text-muted">La confianza indica cuánta evidencia tenemos. Un puntaje con poca evidencia puede cambiar rápido.</p>
                </section>
              </aside>
            </div>

            <section className="mt-6 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-grape">Próximas prioridades</p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-ink">La ruta recomendada</h2>
                  <ol className="mt-5 space-y-3">
                    {plan.slice(0, 4).map((item, index) => (
                      <PlanItem key={item.skill.id} item={item} index={index} />
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.15em] text-teal">Actividad</p>
                      <h2 className="mt-1 font-display text-2xl font-bold text-ink">Últimos 7 días</h2>
                    </div>
                    <p className="text-sm font-bold text-muted">{weekly.minutes} min · {weekly.correct}/{weekly.total} respuestas</p>
                  </div>
                  <div className="mt-6 flex h-40 items-end justify-between gap-2 rounded-3xl bg-cream px-4 pt-5">
                    {chartValues.map((minutes, index) => (
                      <div key={`${labels[index]}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <span className="text-[10px] font-bold text-muted">{minutes ? `${minutes}m` : ""}</span>
                        <div className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-grape to-teal" style={{ height: `${Math.max(minutes ? 12 : 3, (minutes / maxMinutes) * 100)}%` }} />
                        <span className="pb-3 text-xs font-bold text-muted">{labels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function sessionStats(sessions) {
  const limit = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = sessions.filter((session) => new Date(session.completedAt).getTime() >= limit);
  const byDay = new Map();
  for (const session of recent) {
    const key = new Date(session.completedAt).toDateString();
    byDay.set(key, (byDay.get(key) || 0) + Number(session.minutes || 0));
  }
  const values = [];
  const labels = [];
  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    values.push(byDay.get(date.toDateString()) || 0);
    labels.push(["D", "L", "M", "M", "J", "V", "S"][date.getDay()]);
  }
  return {
    count: recent.length,
    minutes: recent.reduce((sum, session) => sum + Number(session.minutes || 0), 0),
    correct: recent.reduce((sum, session) => sum + Number(session.correct || 0), 0),
    total: recent.reduce((sum, session) => sum + Number(session.total || 0), 0),
    values,
    labels,
  };
}

function categoryScore(categoryId, diagnostic, mastery) {
  const values = MATH_SKILLS.filter((skill) => skill.category === categoryId)
    .map((skill) => mastery[skill.id]?.mastery ?? diagnostic?.scores?.[skill.id])
    .filter(Number.isFinite);
  return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null;
}

function categoryConfidence(categoryId, diagnostic, mastery) {
  const values = MATH_SKILLS.filter((skill) => skill.category === categoryId)
    .map((skill) => mastery[skill.id]?.confidence ?? diagnostic?.confidence?.[skill.id])
    .filter(Number.isFinite);
  return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
}

function CategoryProgress({ category, diagnostic, mastery }) {
  const score = categoryScore(category.id, diagnostic, mastery);
  const confidence = categoryConfidence(category.id, diagnostic, mastery);
  const status = skillStatus(score || 0);
  const color = { teal: "bg-teal", honey: "bg-honey", grape: "bg-grape", coral: "bg-coral" }[status.color];
  return (
    <article className="rounded-3xl border border-ink/10 bg-cream p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{category.symbol}</span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold leading-tight text-ink">{category.title}</h3>
          <p className="mt-1 text-xs font-bold text-muted">{status.label} · evidencia {confidence}/100</p>
        </div>
        <strong className="font-display text-2xl text-ink">{score ?? "—"}</strong>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${color}`} style={{ width: `${score || 0}%` }} /></div>
    </article>
  );
}

function PlanItem({ item, index }) {
  const category = CATEGORY_BY_ID[item.skill.category];
  return (
    <li className={`flex items-center gap-3 rounded-2xl border p-4 ${index === 0 ? "border-honey bg-honey-soft" : "border-ink/10 bg-cream"}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display font-bold ${index === 0 ? "bg-night text-honey" : "bg-white text-grape"}`}>{category.symbol}</span>
      <div className="min-w-0 flex-1"><p className="font-bold leading-tight text-ink">{item.skill.title}</p><p className="mt-1 text-xs text-muted">Dominio {item.mastery}/100 · evidencia {item.confidence}/100</p></div>
      <span className="text-xs font-extrabold text-muted">0{index + 1}</span>
    </li>
  );
}

function HeroStat({ value, label, suffix = "" }) {
  return <div className="min-w-20 rounded-2xl bg-white/10 px-3 py-4 text-center sm:min-w-24"><strong className="block font-display text-2xl text-white">{value}<span className="text-xs text-white/50">{suffix}</span></strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wide text-white/55">{label}</span></div>;
}

function Legend({ color, label }) {
  return <div className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${color}`} /><span>{label}</span></div>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-[#f8f5ee]"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
