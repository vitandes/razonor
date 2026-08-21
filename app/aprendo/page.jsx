"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";
import KidProfileGate from "@/components/KidProfileGate";
import { useProgress, isSubscribed } from "@/lib/progress";
import { DIAGNOSTIC_VERSION } from "@/lib/diagnosticMeta";
import { CATEGORY_BY_ID, MATH_CATEGORIES, MATH_SKILLS, initialPlanFromDiagnostic, skillStatus } from "@/lib/mathCatalog";

export default function LearnHome() {
  const progress = useProgress();
  const router = useRouter();
  const [picking, setPicking] = useState(true);
  const [returningFromCheckout] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("checkout") === "return";
  });
  const [verifying, setVerifying] = useState(returningFromCheckout);

  useEffect(() => {
    if (!returningFromCheckout || !progress.serverLoaded) return;
    let active = true;
    (async () => {
      for (let attempt = 0; attempt < 6 && active; attempt++) {
        const status = await progress.refreshSubscription();
        if (status === "active") break;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (active) setVerifying(false);
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returningFromCheckout, progress.serverLoaded]);

  useEffect(() => {
    if (!progress.serverLoaded || isSubscribed(progress.subscription) || verifying) return;
    router.replace(returningFromCheckout ? "/planes?pago=fallido" : "/planes");
  }, [progress.serverLoaded, progress.subscription, verifying, returningFromCheckout, router]);

  if (!progress.serverLoaded || !isSubscribed(progress.subscription)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-5 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
        {verifying && <p className="text-sm font-medium text-muted">Verificando tu pago…</p>}
      </main>
    );
  }

  if (progress.isFamiliar && picking) return <KidProfileGate onEnter={() => setPicking(false)} />;

  const hasMathDiagnostic = progress.diagnostic?.completed && progress.diagnostic?.version === DIAGNOSTIC_VERSION;
  const plan = hasMathDiagnostic ? initialPlanFromDiagnostic(progress.diagnostic, progress.mathV1?.mastery) : [];
  const current = plan[0];
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const weeklySessions = (progress.mathV1?.sessions || []).filter((session) => new Date(session.completedAt).getTime() >= weekAgo).length;
  const initials = (progress.name || "R").trim().slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-24 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
        <header className="flex items-center justify-between gap-3">
          <Link href="/"><LogoWordmark size={34} /></Link>
          <nav className="hidden items-center gap-1 rounded-full bg-white p-1 shadow-card md:flex" aria-label="Navegación de aprendizaje">
            <a href="#hoy" className="rounded-full bg-night px-4 py-2 text-sm font-bold text-white">Hoy</a>
            <a href="#plan" className="rounded-full px-4 py-2 text-sm font-bold text-muted hover:text-ink">Mi plan</a>
            <a href="#habilidades" className="rounded-full px-4 py-2 text-sm font-bold text-muted hover:text-ink">Habilidades</a>
          </nav>
          <div className="flex items-center gap-2">
            {progress.isFamiliar && <button type="button" onClick={() => setPicking(true)} className="hidden rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-muted shadow-card sm:block">Cambiar perfil</button>}
            <span className="grid h-11 w-11 place-items-center rounded-full bg-grape font-display text-sm font-bold text-white shadow-card" title={`Perfil de ${progress.name || "estudiante"}`}>{initials}</span>
            <Link href="/padres" className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-card">Progreso</Link>
          </div>
        </header>

        <section id="hoy" className="mt-6 overflow-hidden rounded-[2rem] bg-night text-white shadow-soft">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative p-6 sm:p-9 lg:p-10">
              <div className="absolute -left-12 -top-20 h-52 w-52 rounded-full border-[34px] border-grape/20" />
              <div className="relative">
                <p className="text-sm font-semibold text-white/65">Hola{progress.name ? `, ${progress.name}` : ""}</p>
                <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.16em] text-honey">Tu sesión de hoy</p>
                <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
                  {hasMathDiagnostic ? current?.skill.title : "Primero encontremos tu punto de partida"}
                </h1>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                  {hasMathDiagnostic
                    ? "No tienes que escoger entre todos los temas. Razonor eligió este paso con tu diagnóstico y lo irá ajustando con cada sesión."
                    : "El diagnóstico adapta la dificultad y encuentra qué fundamento conviene trabajar antes de avanzar."}
                </p>
                <Link href={hasMathDiagnostic ? "/aprendo/sesion" : "/diagnostico?start=1"} className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-honey px-6 py-4 font-display text-lg font-bold text-night transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white sm:w-auto">
                  {hasMathDiagnostic ? "Empezar práctica" : "Hacer diagnóstico"}<span aria-hidden="true">→</span>
                </Link>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/65">
                  <span className="rounded-full bg-white/10 px-3 py-1.5">{progress.onboarding?.dailyMinutes || 15} min</span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5">Explicación + práctica</span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5">Ruta por habilidades</span>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-grape via-[#6f5ad8] to-honey-deep p-7">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[30px] border-white/10" />
              <div className="relative w-full max-w-sm rounded-[2rem] bg-white p-5 text-ink shadow-soft">
                <div className="flex items-center justify-between"><span className="text-xs font-extrabold uppercase tracking-wide text-muted">Objetivo actual</span><span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-bold text-teal">{hasMathDiagnostic ? "Personalizado" : "Pendiente"}</span></div>
                <div className="mt-5 flex items-center gap-4">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-night font-display text-2xl font-bold text-honey">{hasMathDiagnostic ? CATEGORY_BY_ID[current?.skill.category]?.symbol : "?"}</span>
                  <div><p className="font-display text-xl font-bold">{hasMathDiagnostic ? current?.skill.title : "Diagnóstico inicial"}</p><p className="mt-1 text-sm text-muted">{hasMathDiagnostic ? `Dominio estimado ${current?.mastery}/100` : "15–18 preguntas adaptativas"}</p></div>
                </div>
                <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-cloud"><div className="h-full rounded-full bg-honey" style={{ width: `${hasMathDiagnostic ? Math.max(8, current?.mastery || 0) : 0}%` }} /></div>
                <p className="mt-3 text-xs leading-relaxed text-muted">{hasMathDiagnostic ? "El plan seguirá comprobando esta estimación mientras practicas." : "Tu edad define el inicio; tus respuestas deciden el recorrido."}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_330px]">
          <section id="plan" className="rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-sm font-bold uppercase tracking-[0.15em] text-teal">Mi plan</p><h2 className="mt-1 font-display text-2xl font-bold text-ink">El orden importa</h2><p className="mt-2 text-sm text-muted">Primero reparamos prerrequisitos; después desbloqueamos lo que depende de ellos.</p></div>
              <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-muted">{hasMathDiagnostic ? `${Math.min(plan.length, 4)} próximos pasos` : "Sin generar"}</span>
            </div>

            {hasMathDiagnostic ? (
              <ol className="mt-7 space-y-3">
                {plan.slice(0, 4).map((item, index) => <PlanRow key={item.skill.id} item={item} index={index} />)}
              </ol>
            ) : (
              <div className="mt-7 rounded-3xl border-2 border-dashed border-ink/10 bg-cream p-7 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white font-display text-2xl font-bold text-grape">01</span><h3 className="mt-4 font-display text-xl font-bold text-ink">Tu ruta aparecerá aquí</h3><p className="mt-2 text-sm text-muted">No mostraremos una secuencia genérica: primero necesitamos evidencia del diagnóstico.</p></div>
            )}
          </section>

          <aside className="space-y-5 lg:sticky lg:top-5">
            <section className="rounded-[2rem] bg-honey-soft p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-honey-deep">Por qué esto ahora</p>
              <h2 className="mt-2 font-display text-xl font-bold text-ink">{hasMathDiagnostic ? current?.skill.title : "Diagnóstico pendiente"}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{hasMathDiagnostic ? "Esta habilidad tiene una estimación baja y funciona como base de otros temas. Fortalecerla reduce errores posteriores." : "Sin observar respuestas reales no sería honesto inventar una debilidad ni una ruta."}</p>
            </section>
            <section className="rounded-[2rem] bg-white p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-muted">Esta semana</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <WeekStat value={`${weeklySessions}`} label="sesiones" />
                <WeekStat value={hasMathDiagnostic ? "1" : "0"} label="diagnóstico" />
                <WeekStat value={hasMathDiagnostic && current ? `${current.mastery}` : "—"} label="dominio" />
              </div>
            </section>
          </aside>
        </div>

        <section id="habilidades" className="mt-6 rounded-[2rem] bg-white p-5 shadow-card sm:p-7">
          <div><p className="text-sm font-bold uppercase tracking-[0.15em] text-grape">Vista del avance</p><h2 className="mt-1 font-display text-2xl font-bold text-ink">Seis áreas, una sola ruta</h2><p className="mt-2 text-sm text-muted">No tienes que elegir una categoría. Esta vista solo explica qué está midiendo Razonor mientras el botón de arriba te lleva siempre al siguiente paso recomendado.</p></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MATH_CATEGORIES.map((category) => <CategoryCard key={category.id} category={category} diagnostic={hasMathDiagnostic ? progress.diagnostic : null} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

function PlanRow({ item, index }) {
  const status = skillStatus(item.mastery);
  const category = CATEGORY_BY_ID[item.skill.category];
  return (
    <li className={`flex items-center gap-4 rounded-3xl border p-4 sm:p-5 ${index === 0 ? "border-honey bg-honey-soft" : "border-ink/10 bg-cream"}`}>
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold ${index === 0 ? "bg-night text-honey" : "bg-white text-grape"}`}>{category.symbol}</span>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="font-display font-bold text-ink">{item.skill.title}</p>{index === 0 && <span className="rounded-full bg-honey px-2 py-0.5 text-[10px] font-bold uppercase text-night">Ahora</span>}</div><p className="mt-1 text-xs text-muted">{status.label} · confianza {item.confidence}/100</p></div>
      <span className="font-display text-xl font-bold text-ink">{item.mastery}</span>
    </li>
  );
}

function CategoryCard({ category, diagnostic }) {
  const skills = MATH_SKILLS.filter((skill) => skill.category === category.id);
  const observed = skills.map((skill) => diagnostic?.scores?.[skill.id]).filter((score) => Number.isFinite(score));
  const average = observed.length ? Math.round(observed.reduce((sum, score) => sum + score, 0) / observed.length) : null;
  return (
    <article className="rounded-3xl border border-ink/10 bg-cream p-5">
      <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{category.symbol}</span><div><h3 className="font-display font-bold text-ink">{category.title}</h3><p className="text-xs text-muted">{skills.length} habilidades</p></div></div>
      <div className="mt-5 flex items-end justify-between"><span className="text-xs font-bold uppercase tracking-wide text-muted">{average == null ? "Pendiente" : "Estimación inicial"}</span><strong className="font-display text-2xl text-ink">{average == null ? "—" : average}</strong></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-grape" style={{ width: `${average || 0}%` }} /></div>
    </article>
  );
}

function WeekStat({ value, label }) {
  return <div className="rounded-2xl bg-cream px-2 py-3 text-center"><strong className="block font-display text-xl text-ink">{value}</strong><span className="mt-1 block text-[10px] font-bold text-muted">{label}</span></div>;
}
