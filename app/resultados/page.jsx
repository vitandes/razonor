"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";
import { DIAGNOSTIC_SKILLS, diagnosticInsight, lowestSkill } from "@/lib/diagnostic";

const OPPORTUNITY_COPY = {
  math: "Trabajaremos sentido numérico, operaciones y comprensión del porqué.",
  logic: "Trabajaremos patrones, relaciones, secuencias y deducción.",
  problemSolving: "Trabajaremos cómo interpretar información, elegir estrategias y resolver en varios pasos.",
  spatialReasoning: "Trabajaremos posiciones, figuras, giros y relaciones visuales.",
};

export default function ResultsPage() {
  const progress = useProgress();
  if (!progress.hydrated) return <Loading />;
  const scores = progress.diagnostic?.scores;
  if (!progress.diagnostic?.completed || !scores) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
        <div><h1 className="font-display text-2xl font-bold">Aún no tenemos su perfil</h1><p className="mt-2 text-muted">Completa los retos para descubrir su punto de partida.</p><Link href="/diagnostico" className="mt-5 inline-flex rounded-full bg-honey px-6 py-3 font-bold">Hacer diagnóstico</Link></div>
      </main>
    );
  }

  const name = progress.name || "Tu hijo";
  const opportunity = lowestSkill(scores);
  const minutes = progress.onboarding?.dailyMinutes || 15;

  return (
    <main className="min-h-screen bg-cream pb-16">
      <div className="mx-auto max-w-5xl px-5 py-6">
        <header className="flex items-center justify-between"><Link href="/"><LogoWordmark size={36} /></Link><span className="rounded-full bg-teal-soft px-3 py-1.5 text-xs font-extrabold text-teal">✓ Diagnóstico completado</span></header>

        <section className="mt-8 text-center">
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-honey-deep">Análisis personalizado</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">Perfil de {name}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">Este es su punto de partida. El plan irá cambiando a medida que aprenda.</p>
        </section>

        <div className="mt-9 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <section className="rounded-4xl bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Cómo piensa hoy</h2>
            <div className="mt-6 space-y-6">
              {Object.entries(DIAGNOSTIC_SKILLS).map(([id, skill]) => (
                <div key={id}>
                  <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2.5"><span className="text-xl">{skill.icon}</span><span className="font-bold text-ink">{skill.label}</span></div><span className="font-display text-xl font-extrabold text-ink">{scores[id]}%</span></div>
                  <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-cloud"><div className={`h-full rounded-full ${skill.color}`} style={{ width: `${scores[id]}%` }} /></div>
                </div>
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-5">
            <div className="rounded-4xl bg-night p-6 text-white shadow-soft sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wide text-honey">Lo que encontramos</p>
              <p className="mt-3 text-lg leading-relaxed text-white/80">{diagnosticInsight(scores, name)}</p>
            </div>
            <div className="rounded-4xl border-2 border-honey/50 bg-honey-soft p-6">
              <p className="text-sm font-extrabold uppercase tracking-wide text-honey-deep">Principal oportunidad</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">{DIAGNOSTIC_SKILLS[opportunity].label}</h2>
              <p className="mt-2 leading-relaxed text-ink/75">{OPPORTUNITY_COPY[opportunity]}</p>
            </div>
          </aside>
        </div>

        <section className="mt-7 overflow-hidden rounded-4xl bg-white shadow-card lg:grid lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="p-7 sm:p-9">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-teal">Plan creado</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">Hemos creado un plan para {name}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">Sesiones cortas que combinan matemáticas, lógica y resolución de problemas, con dificultad ajustada a este perfil.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PlanChip icon="⏱️" text={`${minutes} minutos al día`} />
              <PlanChip icon="🧮" text="Matemáticas" />
              <PlanChip icon="🧠" text="Lógica" />
              <PlanChip icon="🔎" text="Problemas" />
            </div>
          </div>
          <div className="border-t border-ink/5 bg-cloud p-7 text-center lg:h-full lg:w-80 lg:border-l lg:border-t-0 lg:p-9">
            <p className="font-display text-xl font-bold text-ink">El plan de {name} está listo</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">Guarda sus resultados y activa el entrenamiento completo.</p>
            <Show when="signed-out">
              <Link href="/sign-up" className="mt-5 inline-flex w-full justify-center rounded-full bg-honey px-6 py-3.5 font-display font-bold text-night transition hover:bg-honey-deep hover:text-white">Guardar y ver el plan</Link>
            </Show>
            <Show when="signed-in">
              <Link href="/planes" className="mt-5 inline-flex w-full justify-center rounded-full bg-honey px-6 py-3.5 font-display font-bold text-night transition hover:bg-honey-deep hover:text-white">Ver el plan de {name}</Link>
            </Show>
            <p className="mt-3 text-xs text-muted">Sin publicidad · Cancela cuando quieras</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function PlanChip({ icon, text }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-bold text-ink"><span>{icon}</span>{text}</span>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
