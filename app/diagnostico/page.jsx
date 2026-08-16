"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";
import { useProgress } from "@/lib/progress";
import { DIAGNOSTIC_SKILLS, getDiagnosticExercises, scoreDiagnostic } from "@/lib/diagnostic";

export default function DiagnosticPage() {
  const router = useRouter();
  const progress = useProgress();
  const age = progress.onboarding?.age;
  const exercises = useMemo(() => getDiagnosticExercises(age), [age]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const current = exercises[index];

  if (!progress.hydrated) return <Loading />;
  if (!age) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
        <div><p className="text-muted">Primero necesitamos conocer su edad.</p><Link href="/onboarding" className="mt-4 inline-flex rounded-full bg-honey px-6 py-3 font-bold">Completar datos</Link></div>
      </main>
    );
  }

  function choose(option) {
    if (selected) return;
    setSelected(option);
    setAnswers((value) => ({ ...value, [current.id]: option }));
  }

  function next() {
    if (index < exercises.length - 1) {
      setIndex((value) => value + 1);
      setSelected(null);
      return;
    }
    const finalAnswers = { ...answers, [current.id]: selected };
    const scores = scoreDiagnostic(exercises, finalAnswers);
    progress.saveDiagnostic({
      scores,
      answers: exercises.map((exercise) => ({
        exerciseId: exercise.id,
        skill: exercise.skill,
        answer: finalAnswers[exercise.id],
        correct: finalAnswers[exercise.id] === exercise.correctAnswer,
      })),
    });
    router.push("/resultados");
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-cream px-5 py-6">
        <div className="mx-auto max-w-3xl">
          <Link href="/"><LogoWordmark size={36} /></Link>
          <section className="mt-8 overflow-hidden rounded-4xl bg-white shadow-soft sm:grid sm:grid-cols-[1.05fr_.95fr]">
            <div className="p-7 sm:p-10">
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-honey-deep">Diagnóstico inicial</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-ink">Descubramos cómo piensa {progress.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">No es un examen. Son {exercises.length} retos cortos que nos ayudarán a adaptar su plan.</p>
              <button onClick={() => setStarted(true)} className="mt-7 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white sm:w-auto">Empezar diagnóstico</button>
            </div>
            <div className="night-sky flex items-center justify-center p-8 text-white">
              <div className="grid w-full max-w-xs grid-cols-2 gap-3">
                {Object.values(DIAGNOSTIC_SKILLS).map((skill) => <div key={skill.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center"><div className="text-3xl">{skill.icon}</div><div className="mt-2 text-sm font-bold">{skill.short}</div></div>)}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const skill = DIAGNOSTIC_SKILLS[current.skill];
  const correct = selected === current.correctAnswer;
  return (
    <main className="min-h-screen bg-cream px-5 py-5 sm:py-7">
      <div className="mx-auto max-w-2xl">
        <header className="flex items-center justify-between"><LogoWordmark size={32} /><span className="text-sm font-bold text-muted">Reto {index + 1} de {exercises.length}</span></header>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-honey transition-all" style={{ width: `${((index + 1) / exercises.length) * 100}%` }} /></div>

        <section className="mt-7 rounded-4xl bg-white p-6 shadow-card sm:p-9">
          <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cloud text-2xl">{skill.icon}</span><div><p className="text-xs font-extrabold uppercase tracking-wide text-muted">{skill.label}</p><p className="text-sm text-muted">Piensa con calma. Puedes hacerlo.</p></div></div>
          <h1 className="mt-7 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">{current.question}</h1>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {current.options.map((option, optionIndex) => {
              const picked = selected === option;
              const revealCorrect = selected && option === current.correctAnswer;
              return <button key={option} disabled={Boolean(selected)} onClick={() => choose(option)} className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition ${revealCorrect ? "border-teal bg-teal-soft text-teal" : picked ? "border-coral bg-coral-soft text-coral" : "border-ink/10 bg-cream text-ink enabled:hover:border-honey"}`}><span className="mr-3 text-sm text-muted">{String.fromCharCode(65 + optionIndex)}</span>{option}</button>;
            })}
          </div>

          {selected && (
            <div className={`mt-6 animate-pop rounded-2xl p-4 ${correct ? "bg-teal-soft" : "bg-honey-soft"}`}>
              <p className="font-display text-lg font-bold text-ink">{correct ? "✓ ¡Muy bien!" : "Casi. Mira esta pista."}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/75">{current.explanation}</p>
            </div>
          )}
        </section>

        <button disabled={!selected} onClick={next} className="mt-5 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40">{index === exercises.length - 1 ? "Ver mi perfil" : "Siguiente reto →"}</button>
      </div>
    </main>
  );
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
