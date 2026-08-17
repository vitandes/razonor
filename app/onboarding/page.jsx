"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Logo, { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";

const AGES = [6, 7, 8, 9, 10, 11, 12];
const GOALS = [
  { id: "math", emoji: "🧮", label: "Ganar seguridad en matemáticas" },
  { id: "problems", emoji: "🔎", label: "Aprender a resolver problemas" },
  { id: "understanding", emoji: "💡", label: "Comprender, no solo memorizar" },
  { id: "focus", emoji: "🎯", label: "Mejorar su atención y constancia" },
  { id: "logic", emoji: "🧠", label: "Fortalecer su lógica y criterio" },
  { id: "ahead", emoji: "🚀", label: "Construir bases para aprender tecnología" },
];
const FEELINGS = [
  { id: "loves", emoji: "😍", label: "Las disfruta y busca nuevos retos" },
  { id: "likes", emoji: "🙂", label: "Las hace con buena disposición" },
  { id: "frustrated", emoji: "😕", label: "A veces se frustra o se bloquea" },
  { id: "hard", emoji: "😣", label: "Le cuestan y necesita acompañamiento" },
  { id: "avoids", emoji: "🙈", label: "Suele evitarlas cuando puede" },
];
const INTERESTS = [
  { id: "mysteries", emoji: "🔎", label: "Misterios" },
  { id: "puzzles", emoji: "🧩", label: "Acertijos" },
  { id: "technology", emoji: "🤖", label: "Tecnología y robots" },
  { id: "science", emoji: "🚀", label: "Ciencia y espacio" },
  { id: "games", emoji: "🎮", label: "Juegos" },
  { id: "stories", emoji: "📚", label: "Historias" },
];
const MINUTES = [10, 15, 20];
const TOTAL_STEPS = 7;

export default function Onboarding() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const p = useProgress();
  const [step, setStep] = useState(0);
  const [kidName, setKidName] = useState("");
  const [age, setAge] = useState(null);
  const [primaryGoal, setPrimaryGoal] = useState(null);
  const [mathFeeling, setMathFeeling] = useState(null);
  const [interests, setInterests] = useState([]);
  const [dailyMinutes, setDailyMinutes] = useState(15);

  useEffect(() => {
    if (!p.hydrated) return;
    setKidName((value) => value || p.name || "");
    setAge((value) => value ?? p.onboarding?.age ?? null);
    setPrimaryGoal((value) => value ?? p.onboarding?.primaryGoal ?? null);
    setMathFeeling((value) => value ?? p.onboarding?.mathFeeling ?? null);
    setInterests((value) => value.length ? value : p.onboarding?.interests || []);
    setDailyMinutes((value) => p.onboarding?.dailyMinutes ?? value);
  }, [p.hydrated, p.name, p.onboarding]);

  if (!p.serverLoaded) return <Loading />;

  const canContinue = [
    kidName.trim().length > 0,
    Boolean(age),
    Boolean(primaryGoal),
    Boolean(mathFeeling),
    interests.length > 0,
    Boolean(dailyMinutes),
    true,
  ][step];

  const selectedGoal = GOALS.find((goal) => goal.id === primaryGoal);
  const selectedFeeling = FEELINGS.find((feeling) => feeling.id === mathFeeling);

  function toggleInterest(id) {
    setInterests((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );
  }

  function finish() {
    p.saveOnboarding({
      name: kidName,
      age,
      primaryGoal,
      mathFeeling,
      dailyMinutes,
      goals: primaryGoal ? [primaryGoal] : [],
      interests,
    });
    router.push(isSignedIn ? "/planes" : "/sign-up");
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

        <section className="flex flex-1 items-center py-4 sm:py-6">
          <div className="w-full rounded-4xl bg-white p-6 shadow-card sm:p-7">
            {step === 0 && (
              <div className="animate-pop text-center">
                <Logo size={78} className="mx-auto animate-floaty" />
                <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-honey-deep">Configuración para padres</p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">Crea su plan sin que tenga que estar presente</h1>
                <p className="mx-auto mt-3 max-w-lg text-lg leading-relaxed text-muted">Tú respondes unas preguntas sencillas. Con eso preparamos una ruta inicial que luego se adapta mientras aprende.</p>
                <div className="mx-auto mt-5 max-w-md rounded-2xl bg-teal-soft px-4 py-3 text-sm font-semibold text-teal">✓ Solo necesitas conocer sus gustos y cómo vive el aprendizaje</div>
                <label className="mx-auto mt-6 block max-w-md text-left text-sm font-bold text-ink">
                  ¿Cómo quieres que llamemos a tu hijo o hija?
                  <input value={kidName} onChange={(event) => setKidName(event.target.value)} maxLength={24} autoFocus placeholder="Nombre o apodo, por ejemplo Mateo" className="mt-2 w-full rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3.5 text-base font-medium outline-none transition focus:border-honey" />
                </label>
              </div>
            )}

            {step === 1 && (
              <ChoiceScreen eyebrow={`Plan de ${kidName.trim() || "tu hijo"}`} title="¿Qué edad tiene?" description="La edad define el punto de partida y el tipo de lenguaje de los casos.">
                <div className="mt-7 grid grid-cols-4 gap-3 sm:grid-cols-7">
                  {AGES.map((value) => <ChoiceButton key={value} selected={age === value} onClick={() => setAge(value)} compact><span className="font-display text-2xl font-bold">{value}</span><span className="text-xs">años</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 2 && (
              <ChoiceScreen title="¿Qué te gustaría lograr primero?" description="Elige la prioridad más importante para tu familia en este momento.">
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((goal) => <ChoiceButton key={goal.id} selected={primaryGoal === goal.id} onClick={() => setPrimaryGoal(goal.id)}><span className="text-2xl" aria-hidden="true">{goal.emoji}</span><span>{goal.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 3 && (
              <ChoiceScreen title="¿Cómo vive hoy las matemáticas?" description="Responde según lo que tú observas. No necesitas preguntarle ni hacerle una prueba.">
                <div className="mt-7 grid gap-3">
                  {FEELINGS.map((feeling) => <ChoiceButton key={feeling.id} selected={mathFeeling === feeling.id} onClick={() => setMathFeeling(feeling.id)}><span className="text-2xl" aria-hidden="true">{feeling.emoji}</span><span>{feeling.label}</span></ChoiceButton>)}
                </div>
              </ChoiceScreen>
            )}

            {step === 4 && (
              <ChoiceScreen title="¿Qué temas despiertan su curiosidad?" description="Elige hasta 3. Los usaremos para hacer que sus primeros retos se sientan cercanos.">
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {INTERESTS.map((interest) => <ChoiceButton key={interest.id} selected={interests.includes(interest.id)} onClick={() => toggleInterest(interest.id)} compact><span className="text-3xl" aria-hidden="true">{interest.emoji}</span><span>{interest.label}</span></ChoiceButton>)}
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-muted">{interests.length} de 3 seleccionados</p>
              </ChoiceScreen>
            )}

            {step === 5 && (
              <ChoiceScreen title="¿Qué rutina sería realista para ustedes?" description="Una meta alcanzable ayuda a construir el hábito sin convertirlo en otra tarea pesada.">
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {MINUTES.map((value) => <ChoiceButton key={value} selected={dailyMinutes === value} onClick={() => setDailyMinutes(value)} compact>{value === 15 && <span className="text-xs font-extrabold uppercase tracking-wide text-honey-deep">Recomendado</span>}<span className="font-display text-3xl font-bold">{value}</span><span className="text-sm text-muted">minutos al día</span></ChoiceButton>)}
                </div>
                <div className="mt-6 rounded-2xl bg-teal-soft px-4 py-3 text-center text-sm font-semibold text-teal">✓ Puede comenzar cuando estén listos; no tiene que hacerlo ahora</div>
              </ChoiceScreen>
            )}

            {step === 6 && (
              <div className="animate-pop text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-honey-soft text-4xl">✨</div>
                <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.16em] text-teal">Ruta inicial preparada</p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-ink">El plan de {kidName.trim()} puede empezar cuando ustedes quieran</h1>
                <p className="mx-auto mt-3 max-w-lg leading-relaxed text-muted">No hace falta completar una prueba antes de elegir el plan. Razonor aprenderá de su progreso y ajustará los retos gradualmente.</p>
                <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
                  <SummaryItem icon="🎯" label="Objetivo inicial" value={selectedGoal?.label} />
                  <SummaryItem icon="🧠" label="Punto de partida" value={selectedFeeling?.label} />
                  <SummaryItem icon="⏱️" label="Rutina elegida" value={`${dailyMinutes} minutos al día`} />
                  <SummaryItem icon="🧩" label="Formato" value="Casos, pistas y desafíos" />
                </div>
                <p className="mt-6 text-sm font-semibold text-muted">Siguiente paso: crear tu cuenta y elegir la suscripción.</p>
              </div>
            )}
          </div>
        </section>

        <div className="flex gap-3 pb-2">
          {step > 0 && <button onClick={() => setStep((value) => value - 1)} className="rounded-full border-2 border-ink/10 bg-white px-5 py-3.5 font-bold text-ink transition hover:border-ink/25">← Atrás</button>}
          <button disabled={!canContinue} onClick={step === TOTAL_STEPS - 1 ? finish : () => setStep((value) => value + 1)} className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night shadow-card transition enabled:hover:-translate-y-0.5 enabled:hover:bg-honey-deep enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            {step === 0 ? "Crear su plan" : step === TOTAL_STEPS - 1 ? (isSignedIn ? "Ver planes y continuar →" : "Crear cuenta y ver planes →") : "Continuar"}
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

function SummaryItem({ icon, label, value }) {
  return <div className="rounded-2xl bg-cream p-4"><div className="flex items-center gap-2"><span className="text-xl" aria-hidden="true">{icon}</span><span className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</span></div><p className="mt-2 font-bold leading-snug text-ink">{value}</p></div>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
