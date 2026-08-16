"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo, { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";

const AGES = [6, 7, 8, 9, 10, 11, 12];
const GOALS = [
  { id: "math", emoji: "🧮", label: "Le cuestan las matemáticas" },
  { id: "problems", emoji: "🔎", label: "Le cuesta resolver problemas" },
  { id: "understanding", emoji: "💡", label: "Memoriza, pero no siempre entiende" },
  { id: "focus", emoji: "🎯", label: "Se distrae fácilmente" },
  { id: "logic", emoji: "🧠", label: "Quiero fortalecer su lógica" },
  { id: "ahead", emoji: "🚀", label: "Quiero que vaya por delante de su clase" },
];
const FEELINGS = [
  { id: "loves", emoji: "😍", label: "Le encantan" },
  { id: "likes", emoji: "🙂", label: "Le gustan" },
  { id: "frustrated", emoji: "😕", label: "A veces se frustra" },
  { id: "hard", emoji: "😣", label: "Le cuestan bastante" },
  { id: "avoids", emoji: "🙈", label: "Evita hacer matemáticas" },
];
const MINUTES = [10, 15, 20];
const TOTAL_STEPS = 5;

export default function Onboarding() {
  const router = useRouter();
  const p = useProgress();
  const [step, setStep] = useState(0);
  const [kidName, setKidName] = useState("");
  const [age, setAge] = useState(null);
  const [primaryGoal, setPrimaryGoal] = useState(null);
  const [mathFeeling, setMathFeeling] = useState(null);
  const [dailyMinutes, setDailyMinutes] = useState(15);

  useEffect(() => {
    if (!p.hydrated) return;
    setKidName((value) => value || p.name || "");
    setAge((value) => value ?? p.onboarding?.age ?? null);
    setPrimaryGoal((value) => value ?? p.onboarding?.primaryGoal ?? null);
    setMathFeeling((value) => value ?? p.onboarding?.mathFeeling ?? null);
    setDailyMinutes((value) => p.onboarding?.dailyMinutes ?? value);
  }, [p.hydrated, p.name, p.onboarding]);

  if (!p.serverLoaded) return <Loading />;

  const canContinue = [
    kidName.trim().length > 0,
    Boolean(age),
    Boolean(primaryGoal),
    Boolean(mathFeeling),
    Boolean(dailyMinutes),
  ][step];

  function finish() {
    p.saveOnboarding({
      name: kidName,
      age,
      primaryGoal,
      mathFeeling,
      dailyMinutes,
      goals: primaryGoal ? [primaryGoal] : [],
    });
    router.push("/diagnostico");
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-5 sm:py-7">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" aria-label="Volver al inicio"><LogoWordmark size={34} /></Link>
          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-muted shadow-card">{step + 1} de {TOTAL_STEPS}</span>
        </header>

        <div className="mt-5 flex gap-2" aria-label={`Paso ${step + 1} de ${TOTAL_STEPS}`}>
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <span key={index} className={`h-2 flex-1 rounded-full transition-colors ${index <= step ? "bg-honey" : "bg-ink/10"}`} />
          ))}
        </div>

        <section className="flex flex-1 items-center py-8 sm:py-12">
          <div className="w-full rounded-4xl bg-white p-6 shadow-card sm:p-9">
            {step === 0 && (
              <div className="animate-pop text-center">
                <Logo size={78} className="mx-auto animate-floaty" />
                <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-honey-deep">Evaluación personalizada</p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">Creemos el plan ideal para tu hijo</h1>
                <p className="mx-auto mt-3 max-w-lg text-lg leading-relaxed text-muted">Responde unas preguntas y Razonor adaptará las actividades a su edad y nivel.</p>
                <label className="mx-auto mt-7 block max-w-md text-left text-sm font-bold text-ink">
                  ¿Cómo se llama tu hijo o hija?
                  <input value={kidName} onChange={(event) => setKidName(event.target.value)} maxLength={24} autoFocus placeholder="Por ejemplo, Mateo" className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-base font-medium outline-none transition focus:border-honey" />
                </label>
              </div>
            )}

            {step === 1 && (
              <ChoiceScreen eyebrow={`Plan de ${kidName.trim() || "tu hijo"}`} title="¿Qué edad tiene tu hijo?" description="Usaremos su edad para elegir preguntas con el nivel adecuado.">
                <div className="mt-7 grid grid-cols-4 gap-3 sm:grid-cols-7">
                  {AGES.map((value) => <ChoiceButton key={value} selected={age === value} onClick={() => setAge(value)} compact><span className="font-display text-2xl font-bold">{value}</span><span className="text-xs">años</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 2 && (
              <ChoiceScreen title="¿Qué te gustaría mejorar principalmente?" description="Elige la necesidad que más te preocupa hoy.">
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((goal) => <ChoiceButton key={goal.id} selected={primaryGoal === goal.id} onClick={() => setPrimaryGoal(goal.id)}><span className="text-2xl" aria-hidden="true">{goal.emoji}</span><span>{goal.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 3 && (
              <ChoiceScreen title="¿Cómo se siente normalmente con las matemáticas?" description="No hay respuestas buenas o malas. Esto nos ayuda a cuidar su confianza.">
                <div className="mt-7 grid gap-3">
                  {FEELINGS.map((feeling) => <ChoiceButton key={feeling.id} selected={mathFeeling === feeling.id} onClick={() => setMathFeeling(feeling.id)}><span className="text-2xl" aria-hidden="true">{feeling.emoji}</span><span>{feeling.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 4 && (
              <ChoiceScreen title="¿Cuántos minutos podría practicar al día?" description="Las sesiones cortas y constantes producen mejores hábitos.">
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {MINUTES.map((value) => <ChoiceButton key={value} selected={dailyMinutes === value} onClick={() => setDailyMinutes(value)} compact>{value === 15 && <span className="text-xs font-extrabold uppercase tracking-wide text-honey-deep">Recomendado</span>}<span className="font-display text-3xl font-bold">{value}</span><span className="text-sm text-muted">minutos al día</span></ChoiceButton>)}
                </div>
                <div className="mt-6 rounded-2xl bg-teal-soft px-4 py-3 text-center text-sm font-semibold text-teal">✓ Una rutina que cabe incluso en días ocupados</div>
              </ChoiceScreen>
            )}
          </div>
        </section>

        <div className="flex gap-3 pb-2">
          {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="rounded-full border-2 border-ink/10 bg-white px-5 py-3.5 font-bold text-ink transition hover:border-ink/25">← Atrás</button>}
          <button disabled={!canContinue} onClick={step === TOTAL_STEPS - 1 ? finish : () => setStep((value) => value + 1)} className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night shadow-card transition enabled:hover:-translate-y-0.5 enabled:hover:bg-honey-deep enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            {step === 0 ? "Comenzar" : step === TOTAL_STEPS - 1 ? "Descubrir cómo piensa →" : "Continuar"}
          </button>
        </div>
      </div>
    </main>
  );
}

function ChoiceScreen({ eyebrow, title, description, children }) {
  return <div className="animate-pop">{eyebrow && <p className="font-display text-sm font-bold uppercase tracking-wide text-honey-deep">{eyebrow}</p>}<h1 className="mt-1 font-display text-3xl font-bold leading-tight text-ink">{title}</h1><p className="mt-2 text-base leading-relaxed text-muted">{description}</p>{children}</div>;
}

function ChoiceButton({ selected, onClick, compact = false, children }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`relative flex min-h-16 items-center gap-3 rounded-2xl border-2 p-4 text-left font-bold transition ${compact ? "flex-col justify-center text-center" : ""} ${selected ? "border-honey bg-honey-soft text-ink shadow-card" : "border-ink/10 bg-cream text-ink hover:border-ink/25"}`}>{children}{selected && !compact && <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full bg-honey text-sm">✓</span>}</button>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
