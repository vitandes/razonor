"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";
import { setAnalyticsJourney, trackProductEvent } from "@/lib/analytics";

const AGES = Array.from({ length: 9 }, (_, index) => index + 10);
const GOALS = [
  { id: "school", symbol: "01", label: "Mejorar el rendimiento escolar" },
  { id: "gaps", symbol: "02", label: "Recuperar bases que no quedaron claras" },
  { id: "confidence", symbol: "03", label: "Ganar seguridad con las matemáticas" },
  { id: "advanced", symbol: "04", label: "Prepararse para temas más avanzados" },
];
const FEELINGS = [
  { id: "easy", label: "La mayoría de temas se sienten fáciles" },
  { id: "mixed", label: "Depende mucho del tema" },
  { id: "stuck", label: "A veces no sé por dónde empezar" },
  { id: "gaps", label: "Siento que faltan varias bases" },
  { id: "unknown", label: "Todavía no lo sé" },
];
const MINUTES = [10, 15];
const PARENT_STEPS = ["name", "age", "goal", "feeling", "minutes"];

export default function Onboarding() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const progress = useProgress();
  const [step, setStep] = useState(0);
  const [learnerName, setLearnerName] = useState("");
  const [age, setAge] = useState(null);
  const [primaryGoal, setPrimaryGoal] = useState(null);
  const [mathFeeling, setMathFeeling] = useState(null);
  const [dailyMinutes, setDailyMinutes] = useState(15);

  useEffect(() => {
    if (!progress.hydrated) return;
    setLearnerName((value) => value || progress.name || "");
    setAge((value) => value ?? progress.onboarding?.age ?? null);
    setPrimaryGoal((value) => value ?? progress.onboarding?.primaryGoal ?? null);
    setMathFeeling((value) => value ?? progress.onboarding?.mathFeeling ?? null);
    setDailyMinutes((value) => progress.onboarding?.dailyMinutes ?? value);
  }, [progress.hydrated, progress.name, progress.onboarding]);

  useEffect(() => {
    if (!progress.serverLoaded) return;
    trackProductEvent(
      "onboarding_started",
      { role: "dependent" },
      { once: "session", onceKey: "onboarding_started", metaEvent: "OnboardingStarted" },
    );
  }, [progress.serverLoaded]);

  if (!progress.serverLoaded) return <Loading />;

  const flowSteps = PARENT_STEPS;
  const currentStep = flowSteps[step] || flowSteps[0];
  const canContinue = {
    name: learnerName.trim().length > 0,
    age: Boolean(age),
    goal: Boolean(primaryGoal),
    feeling: Boolean(mathFeeling),
    minutes: Boolean(dailyMinutes),
  }[currentStep];

  const selectedGoal = GOALS.find((goal) => goal.id === primaryGoal);

  function continueFlow() {
    trackProductEvent("onboarding_step_completed", {
      step_id: currentStep,
      step_index: step + 1,
      role: "dependent",
    });
    setStep((value) => value + 1);
  }

  function finish() {
    const journey = "diagnostic_later";
    const ageBand = age <= 12 ? "10-12" : age <= 15 ? "13-15" : "16-18";
    setAnalyticsJourney(journey);
    trackProductEvent("onboarding_step_completed", {
      step_id: currentStep,
      step_index: step + 1,
      role: "dependent",
    });
    trackProductEvent(
      "onboarding_completed",
      {
        role: "dependent",
        journey,
        age_band: ageBand,
        goal: primaryGoal,
        daily_minutes: dailyMinutes,
      },
      { metaEvent: "OnboardingCompleted" },
    );
    progress.saveOnboarding({
      name: learnerName,
      role: "dependent",
      studentPresentNow: false,
      age,
      primaryGoal,
      mathFeeling,
      dailyMinutes,
      goals: primaryGoal ? [primaryGoal] : [],
      interests: [],
    });
    router.push(isSignedIn ? "/planes" : "/sign-up?flow=parent");
  }

  return (
    <main className="min-h-screen bg-[#f8f5ee]">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-5 sm:py-7">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Volver al inicio"><LogoWordmark size={34} /></Link>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-muted shadow-card">{step + 1} de {flowSteps.length}</span>
        </header>

        <div className="mt-5 flex gap-2" aria-label={`Paso ${step + 1} de ${flowSteps.length}`}>
          {Array.from({ length: flowSteps.length }).map((_, index) => (
            <span key={index} className={`h-2 flex-1 rounded-full transition-colors ${index <= step ? "bg-honey" : "bg-ink/10"}`} />
          ))}
        </div>

        <section className="flex flex-1 items-center py-5 sm:py-7">
          <div className="w-full rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            {currentStep === "name" && (
              <ChoiceScreen eyebrow="Cuéntanos sobre tu hijo" title="¿Cómo quieres que llamemos al estudiante?" description="Puedes usar su nombre o un apodo. No necesitas que esté contigo para completar estos datos.">
                <label className="mt-7 block text-sm font-bold text-ink">
                  Nombre o apodo del estudiante
                  <input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} maxLength={24} autoFocus placeholder="Por ejemplo, Mateo" className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-4 text-lg font-medium outline-none transition focus:border-honey" />
                </label>
              </ChoiceScreen>
            )}

            {currentStep === "age" && (
              <ChoiceScreen title={`¿Cuántos años tiene ${learnerName.trim() || "el estudiante"}?`} description="Usaremos la edad para preparar el diagnóstico que hará después de activar el acceso.">
                <div className="mt-7 grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {AGES.map((value) => <ChoiceButton key={value} selected={age === value} onClick={() => setAge(value)} compact><span className="font-display text-2xl font-bold">{value}</span><span className="text-xs text-muted">años</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {currentStep === "goal" && (
              <ChoiceScreen title="¿Qué te gustaría lograr primero?" description="El objetivo ayuda a explicar el plan, pero no cambia los prerrequisitos matemáticos.">
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((goal) => <ChoiceButton key={goal.id} selected={primaryGoal === goal.id} onClick={() => setPrimaryGoal(goal.id)}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cream font-display text-sm font-bold text-grape">{goal.symbol}</span><span>{goal.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {currentStep === "feeling" && (
              <ChoiceScreen title="Según lo que has observado, ¿cómo se sienten hoy las matemáticas?" description="Tu percepción prepara la experiencia, pero no define el nivel ni reemplaza las respuestas del estudiante.">
                <div className="mt-7 grid gap-3">
                  {FEELINGS.map((feeling) => <ChoiceButton key={feeling.id} selected={mathFeeling === feeling.id} onClick={() => setMathFeeling(feeling.id)}><span>{feeling.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {currentStep === "minutes" && (
              <ChoiceScreen title="Elige una rutina realista" description="Razonor organizará explicación, práctica, razonamiento y repaso dentro de este tiempo.">
                <div className="mt-7 grid grid-cols-2 gap-3">
                  {MINUTES.map((value) => <ChoiceButton key={value} selected={dailyMinutes === value} onClick={() => setDailyMinutes(value)} compact>{value === 15 && <span className="text-xs font-extrabold uppercase tracking-wide text-honey-deep">Recomendado</span>}<span className="font-display text-3xl font-bold">{value}</span><span className="text-sm text-muted">minutos al día</span></ChoiceButton>)}
                </div>
                <div className="mt-6 rounded-2xl bg-teal-soft p-4 text-sm leading-relaxed text-teal">
                  <strong>Siguiente paso:</strong> crearás tu cuenta y elegirás el plan. Después de activar el acceso, el estudiante hará el diagnóstico desde Aprendo para generar su ruta.
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-muted">Objetivo: {selectedGoal?.label}</p>
              </ChoiceScreen>
            )}
          </div>
        </section>

        <div className="flex gap-3 pb-2">
          {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="rounded-full border-2 border-ink/10 bg-white px-5 py-3.5 font-bold text-ink transition hover:border-ink/25">← Atrás</button>}
          <button disabled={!canContinue} onClick={step === flowSteps.length - 1 ? finish : continueFlow} className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night shadow-card transition enabled:hover:-translate-y-0.5 enabled:hover:bg-honey-deep enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            Continuar
          </button>
        </div>
      </div>
    </main>
  );
}

function ChoiceScreen({ eyebrow, title, description, children }) {
  return <div className="animate-pop">{eyebrow && <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">{eyebrow}</p>}<h1 className="mt-1 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{title}</h1><p className="mt-3 text-base leading-relaxed text-muted">{description}</p>{children}</div>;
}

function ChoiceButton({ selected, onClick, compact = false, children }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`relative flex min-h-16 items-center gap-3 rounded-2xl border-2 p-4 text-left font-bold transition ${compact ? "flex-col justify-center text-center" : ""} ${selected ? "border-honey bg-honey-soft text-ink shadow-card" : "border-ink/10 bg-cream text-ink hover:border-ink/25"}`}>{children}{selected && !compact && <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey text-sm">✓</span>}</button>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
