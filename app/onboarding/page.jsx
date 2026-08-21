"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";

const AGES = Array.from({ length: 9 }, (_, index) => index + 10);
const ROLES = [
  { id: "self", symbol: "x", title: "Estoy creando mi propio plan", description: "Yo responderé el diagnóstico y haré las sesiones." },
  { id: "dependent", symbol: "+", title: "Soy madre, padre o tutor", description: "Estoy preparando el plan para un estudiante." },
];
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
const SELF_STEPS = ["role", "name", "age", "goal", "feeling", "minutes"];
const PARENT_STEPS = ["role", "presence", "name", "age", "goal", "feeling", "minutes"];

export default function Onboarding() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const progress = useProgress();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [studentPresentNow, setStudentPresentNow] = useState(null);
  const [learnerName, setLearnerName] = useState("");
  const [age, setAge] = useState(null);
  const [primaryGoal, setPrimaryGoal] = useState(null);
  const [mathFeeling, setMathFeeling] = useState(null);
  const [dailyMinutes, setDailyMinutes] = useState(15);

  useEffect(() => {
    if (!progress.hydrated) return;
    setRole((value) => value || progress.onboarding?.role || null);
    setStudentPresentNow((value) => value ?? progress.onboarding?.studentPresentNow ?? null);
    setLearnerName((value) => value || progress.name || "");
    setAge((value) => value ?? progress.onboarding?.age ?? null);
    setPrimaryGoal((value) => value ?? progress.onboarding?.primaryGoal ?? null);
    setMathFeeling((value) => value ?? progress.onboarding?.mathFeeling ?? null);
    setDailyMinutes((value) => progress.onboarding?.dailyMinutes ?? value);
  }, [progress.hydrated, progress.name, progress.onboarding]);

  if (!progress.serverLoaded) return <Loading />;

  const flowSteps = role === "dependent" ? PARENT_STEPS : SELF_STEPS;
  const currentStep = flowSteps[step] || flowSteps[0];
  const canContinue = {
    role: Boolean(role),
    presence: typeof studentPresentNow === "boolean",
    name: learnerName.trim().length > 0,
    age: Boolean(age),
    goal: Boolean(primaryGoal),
    feeling: Boolean(mathFeeling),
    minutes: Boolean(dailyMinutes),
  }[currentStep];

  const selectedGoal = GOALS.find((goal) => goal.id === primaryGoal);

  function finish() {
    const canDiagnoseNow = role === "self" || studentPresentNow === true;
    progress.saveOnboarding({
      name: learnerName,
      role,
      studentPresentNow: canDiagnoseNow,
      age,
      primaryGoal,
      mathFeeling,
      dailyMinutes,
      goals: primaryGoal ? [primaryGoal] : [],
      interests: [],
    });
    if (canDiagnoseNow) {
      router.push("/diagnostico");
      return;
    }
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
            {currentStep === "role" && (
              <ChoiceScreen eyebrow="Tu ruta matemática" title="¿Para quién es este plan?" description="Esto cambia el lenguaje del diagnóstico y la forma de mostrar el progreso.">
                <div className="mt-7 grid gap-3">
                  {ROLES.map((item) => (
                    <ChoiceButton key={item.id} selected={role === item.id} onClick={() => { setRole(item.id); setStudentPresentNow(item.id === "self" ? true : null); }}>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-night font-display text-xl font-bold text-honey">{item.symbol}</span>
                      <span><span className="block">{item.title}</span><span className="mt-1 block text-sm font-medium text-muted">{item.description}</span></span>
                    </ChoiceButton>
                  ))}
                </div>
              </ChoiceScreen>
            )}

            {currentStep === "presence" && (
              <ChoiceScreen eyebrow="Sin frenar el proceso" title="¿El estudiante está contigo ahora?" description="Puedes dejar listo el acceso aunque hagan el diagnóstico en otro momento.">
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <ChoiceButton selected={studentPresentNow === true} onClick={() => setStudentPresentNow(true)} compact>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal-soft text-xl font-bold text-teal">✓</span>
                    <span>Está conmigo</span>
                    <span className="text-sm font-medium text-muted">Haremos el diagnóstico al terminar.</span>
                  </ChoiceButton>
                  <ChoiceButton selected={studentPresentNow === false} onClick={() => setStudentPresentNow(false)} compact>
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-grape-soft text-xl font-bold text-grape">→</span>
                    <span>No está conmigo</span>
                    <span className="text-sm font-medium text-muted">Prepararé el acceso y podrá hacerlo después.</span>
                  </ChoiceButton>
                </div>
                <div className="mt-5 rounded-2xl bg-honey-soft p-4 text-sm leading-relaxed text-ink/75">
                  No usaremos las respuestas del adulto para inventar un nivel. El diagnóstico siempre lo responderá el estudiante.
                </div>
              </ChoiceScreen>
            )}

            {currentStep === "name" && (
              <ChoiceScreen title={role === "self" ? "¿Cómo quieres que te llamemos?" : "¿Cómo quieres que llamemos al estudiante?"} description="Puedes usar un nombre o apodo. Solo se utiliza dentro de la experiencia.">
                <label className="mt-7 block text-sm font-bold text-ink">
                  {role === "self" ? "Tu nombre o apodo" : "Nombre o apodo del estudiante"}
                  <input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} maxLength={24} autoFocus placeholder="Por ejemplo, Mateo" className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-4 text-lg font-medium outline-none transition focus:border-honey" />
                </label>
              </ChoiceScreen>
            )}

            {currentStep === "age" && (
              <ChoiceScreen title={role === "self" ? "¿Cuántos años tienes?" : `¿Cuántos años tiene ${learnerName.trim() || "el estudiante"}?`} description="La edad define el punto de entrada, pero el diagnóstico puede retroceder o avanzar según las respuestas.">
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
              <ChoiceScreen title={role === "dependent" ? "Según lo que has observado, ¿cómo se sienten hoy las matemáticas?" : "¿Cómo se sienten hoy las matemáticas?"} description={role === "dependent" ? "Esta percepción prepara la experiencia, pero no reemplaza las respuestas del estudiante." : "No es una calificación. Solo ajusta el tono y el punto de entrada del diagnóstico."}>
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
                  {role === "dependent" && studentPresentNow === false ? (
                    <><strong>Siguiente paso:</strong> dejarás listo el acceso y podrás pagar ahora. Cuando estén juntos, el estudiante hará el diagnóstico para generar su ruta.</>
                  ) : (
                    <><strong>Siguiente paso:</strong> un diagnóstico de 15 a 18 preguntas para encontrar la primera base que conviene fortalecer.</>
                  )}
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-muted">Objetivo: {selectedGoal?.label}</p>
              </ChoiceScreen>
            )}
          </div>
        </section>

        <div className="flex gap-3 pb-2">
          {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="rounded-full border-2 border-ink/10 bg-white px-5 py-3.5 font-bold text-ink transition hover:border-ink/25">← Atrás</button>}
          <button disabled={!canContinue} onClick={step === flowSteps.length - 1 ? finish : () => setStep((value) => value + 1)} className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night shadow-card transition enabled:hover:-translate-y-0.5 enabled:hover:bg-honey-deep enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            {step === flowSteps.length - 1 ? (role === "dependent" && studentPresentNow === false ? "Dejar listo el acceso →" : "Ir al diagnóstico →") : "Continuar"}
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
