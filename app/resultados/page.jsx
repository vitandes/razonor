"use client";

import Link from "next/link";
import { Show, useAuth } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import { useProgress, isSubscribed } from "@/lib/progress";
import { DIAGNOSTIC_SKILLS, DIAGNOSTIC_VERSION, diagnosticInsight, lowestSkill } from "@/lib/diagnostic";
import { SKILL_BY_ID, skillStatus } from "@/lib/mathCatalog";

export default function ResultsPage() {
  const progress = useProgress();
  const { isLoaded, isSignedIn } = useAuth();
  if (!progress.hydrated) return <Loading />;

  const diagnostic = progress.diagnostic;
  const scores = diagnostic?.scores;
  if (!diagnostic?.completed || diagnostic.version !== DIAGNOSTIC_VERSION || !scores) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
        <div className="max-w-md">
          <h1 className="font-display text-3xl font-bold text-ink">Necesitamos el nuevo diagnóstico matemático</h1>
          <p className="mt-3 text-muted">Los resultados anteriores no miden las habilidades del nuevo plan.</p>
          <Link href="/diagnostico?start=1" className="mt-6 inline-flex rounded-full bg-honey px-6 py-3 font-bold text-night">Empezar diagnóstico</Link>
        </div>
      </main>
    );
  }

  const name = progress.name || "El estudiante";
  const opportunity = lowestSkill(scores);
  const opportunitySkill = SKILL_BY_ID[opportunity];
  const plan = (diagnostic.plan || []).map((id) => SKILL_BY_ID[id]).filter(Boolean);
  const average = Math.round(Object.values(scores).reduce((sum, score) => sum + score, 0) / Math.max(1, Object.keys(scores).length));
  const evidence = Math.round(Object.values(diagnostic.confidence || {}).reduce((sum, score) => sum + score, 0) / Math.max(1, Object.keys(diagnostic.confidence || {}).length));
  const subscribed = Boolean(isLoaded && isSignedIn && isSubscribed(progress.subscription));

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-16">
      <div className="mx-auto max-w-5xl px-5 py-6">
        <header className="flex items-center justify-between gap-3">
          <Link href="/"><LogoWordmark size={36} /></Link>
          <span className="rounded-full bg-teal-soft px-3 py-1.5 text-xs font-extrabold text-teal">Diagnóstico completado</span>
        </header>

        <section className="mt-9 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-teal">Punto de partida matemático</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">Ya encontramos por dónde empezar</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">Esta es una estimación inicial. La ruta se seguirá ajustando con cada sesión.</p>
        </section>

        <div className="mt-9 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]">
          <section className="min-w-0 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
              <div><p className="text-sm font-bold uppercase tracking-wide text-muted">Nivel observado</p><h2 className="mt-1 font-display text-2xl font-bold text-ink">Fundamentos matemáticos</h2></div>
              <div className="text-right"><strong className="font-display text-4xl text-ink">{average}</strong><span className="text-muted">/100</span><p className="text-xs text-muted">Evidencia {evidence}/100</p></div>
            </div>
            <div className="mt-7 space-y-5">
              {Object.entries(DIAGNOSTIC_SKILLS).map(([id, skill]) => {
                const score = scores[id] || 0;
                const status = skillStatus(score);
                return (
                  <div key={id}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-night font-display font-bold text-honey">{skill.symbol}</span><span className="truncate font-bold text-ink">{skill.label}</span></div>
                      <span className="shrink-0 text-sm font-bold text-muted">{status.label}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cloud"><div className="h-full rounded-full bg-grape" style={{ width: `${score}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="min-w-0 flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[2rem] bg-night p-6 text-white shadow-soft sm:p-8">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border-[28px] border-honey/10" />
              <p className="relative text-sm font-bold uppercase tracking-wide text-honey">Lo que encontramos</p>
              <p className="relative mt-3 text-lg leading-relaxed text-white/80">{diagnosticInsight(scores, name)}</p>
            </div>
            <div className="rounded-[2rem] border-2 border-honey/50 bg-honey-soft p-6">
              <p className="text-sm font-extrabold uppercase tracking-wide text-honey-deep">Primera oportunidad</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">{opportunitySkill?.title}</h2>
              <p className="mt-2 leading-relaxed text-ink/75">Trabajar esta base primero evita practicar temas más avanzados sobre un vacío todavía inestable.</p>
            </div>
          </aside>
        </div>

        <section className="mt-7 overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid lg:grid-cols-[1fr_340px]">
          <div className="p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-wide text-teal">Plan generado</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink">La ruta empieza por la causa, no por el último error</h2>
            <div className="mt-6 space-y-3">
              {plan.slice(0, 3).map((skill, index) => (
                <div key={skill.id} className={`flex items-center gap-4 rounded-2xl border p-4 ${index === 0 ? "border-honey bg-honey-soft" : "border-ink/10 bg-cream"}`}>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display font-bold ${index === 0 ? "bg-honey text-night" : "bg-ink/10 text-muted"}`}>{index + 1}</span>
                  <div className="min-w-0 flex-1"><p className="font-bold text-ink">{index === 0 || subscribed ? skill.title : "Siguiente habilidad del plan"}</p><p className="mt-0.5 text-sm text-muted">{index === 0 ? "Primera habilidad recomendada" : subscribed ? `Paso ${index + 1} de tu ruta inicial` : "Se revela con el plan completo"}</p></div>
                  {index > 0 && !subscribed && <span aria-hidden="true" className="text-muted">●●●</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center border-t border-ink/5 bg-night p-7 text-center text-white lg:border-l lg:border-t-0 lg:p-9">
            {subscribed ? (
              <>
                <p className="font-display text-2xl font-bold">Tu ruta ya está lista</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">La primera práctica quedó elegida con estas respuestas. Desde ahora, cada sesión seguirá ajustando el recorrido.</p>
                <Link href="/aprendo" className="mt-6 inline-flex w-full justify-center rounded-full bg-honey px-6 py-3.5 font-display font-bold text-night transition hover:bg-honey-deep hover:text-white">Ir a mi dashboard</Link>
                <Link href="/aprendo/sesion" className="mt-3 inline-flex w-full justify-center rounded-full border border-white/20 px-6 py-3.5 font-display font-bold text-white transition hover:bg-white/10">Empezar mi primera práctica</Link>
              </>
            ) : (
              <>
                <p className="font-display text-2xl font-bold">Desbloquea la ruta completa</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">Incluye sesiones diarias, repaso y seguimiento de dominio y confianza.</p>
                <Show when="signed-out">
                  <Link href="/sign-up" className="mt-6 inline-flex w-full justify-center rounded-full bg-honey px-6 py-3.5 font-display font-bold text-night transition hover:bg-honey-deep hover:text-white">Guardar resultado y continuar</Link>
                </Show>
                <Show when="signed-in">
                  <Link href="/planes" className="mt-6 inline-flex w-full justify-center rounded-full bg-honey px-6 py-3.5 font-display font-bold text-night transition hover:bg-honey-deep hover:text-white">Ver opciones del plan</Link>
                </Show>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
