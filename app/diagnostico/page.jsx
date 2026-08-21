"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";
import AdaptiveQuestionBoard from "@/components/math/AdaptiveQuestionBoard";
import FractionText from "@/components/math/FractionText";
import { useProgress } from "@/lib/progress";
import {
  DIAGNOSTIC_SKILLS,
  DIAGNOSTIC_VERSION,
  nextDiagnosticQuestion,
  scoreDiagnostic,
} from "@/lib/diagnostic";

export default function DiagnosticPage() {
  const router = useRouter();
  const progress = useProgress();
  const age = Number(progress.onboarding?.age);
  const [directStart] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("start") === "1");
  const [started, setStarted] = useState(directStart);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(() => directStart ? nextDiagnosticQuestion([]) : null);
  const [selected, setSelected] = useState(null);

  if (!progress.hydrated) return <Loading />;
  if ((!age || age < 10 || age > 18) && !directStart) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Primero necesitamos tu punto de partida</h1>
          <p className="mt-2 text-muted">Completa el onboarding con una edad entre 10 y 18 años.</p>
          <Link href="/onboarding" className="mt-5 inline-flex rounded-full bg-honey px-6 py-3 font-bold text-night">Completar datos</Link>
        </div>
      </main>
    );
  }

  function start() {
    setAnswers([]);
    setSelected(null);
    setCurrent(nextDiagnosticQuestion([]));
    setStarted(true);
  }

  function choose(option) {
    if (selected) return;
    setSelected(option);
  }

  function next() {
    if (!selected || !current) return;
    const answer = {
      exerciseId: current.id,
      skill: current.skill,
      level: current.level,
      answer: selected,
      correct: selected === current.correctAnswer,
      errorCategory: selected === current.correctAnswer ? null : current.errorMap?.[selected] || "E_CONCEPT",
    };
    const finalAnswers = [...answers, answer];
    const upcoming = nextDiagnosticQuestion(finalAnswers);

    if (upcoming) {
      setAnswers(finalAnswers);
      setCurrent(upcoming);
      setSelected(null);
      return;
    }

    const result = scoreDiagnostic(null, finalAnswers);
    progress.saveDiagnostic({
      version: DIAGNOSTIC_VERSION,
      scores: result.scores,
      confidence: result.confidence,
      plan: result.plan,
      answers: finalAnswers,
    });
    router.push("/resultados");
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[#f8f5ee] px-5 py-6">
        <div className="mx-auto max-w-4xl">
          <Link href="/"><LogoWordmark size={36} /></Link>
          <section className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid lg:grid-cols-[1.08fr_.92fr]">
            <div className="p-7 sm:p-10">
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-teal">Diagnóstico matemático</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
                Encuentra la base que está frenando tu avance
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Responderás entre 15 y 18 preguntas. La dificultad cambia según tus respuestas para comprobar fundamentos, no para ponerte una nota.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-ink">
                <span className="rounded-full bg-teal-soft px-4 py-2">12–15 minutos</span>
                <span className="rounded-full bg-grape/10 px-4 py-2">Sin calculadora</span>
                <span className="rounded-full bg-honey-soft px-4 py-2">Puedes pausar</span>
              </div>
              <button onClick={start} className="mt-7 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white sm:w-auto">
                Empezar diagnóstico
              </button>
              <Link href="/" className="mt-4 block text-sm font-semibold text-muted hover:text-ink sm:ml-5 sm:inline-block">Continuar después</Link>
            </div>
            <div className="relative overflow-hidden bg-night p-7 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-honey/15" />
              <p className="relative text-sm font-bold uppercase tracking-[0.16em] text-honey">Lo que observaremos</p>
              <div className="relative mt-5 grid grid-cols-2 gap-3">
                {Object.values(DIAGNOSTIC_SKILLS).map((skill) => (
                  <div key={skill.id} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 font-display text-xl font-bold text-honey">{skill.symbol}</span>
                    <p className="mt-3 text-sm font-bold leading-tight">{skill.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const skill = DIAGNOSTIC_SKILLS[current.skill];
  const correct = selected === current.correctAnswer;
  const count = answers.length + 1;

  return (
    <main className="min-h-screen bg-[#f8f5ee] px-4 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto max-w-2xl">
        <header className="flex items-center justify-between gap-4">
          <LogoWordmark size={32} />
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-muted shadow-card">Pregunta {count}</span>
        </header>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-honey transition-all" style={{ width: `${Math.min(100, (count / 15) * 100)}%` }} />
        </div>

        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-card sm:p-9">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{skill.symbol}</span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{skill.label}</p>
              <p className="text-sm text-muted">Nivel {current.level} · responde sin adivinar</p>
            </div>
          </div>

          <h1 className="mt-7 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl"><FractionText>{current.question}</FractionText></h1>
          {current.visual && <div className="mt-6"><AdaptiveQuestionBoard question={current} reveal={Boolean(selected)} /></div>}

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {current.options.map((option, optionIndex) => {
              const picked = selected === option;
              const revealCorrect = selected && option === current.correctAnswer;
              return (
                <button
                  key={option}
                  disabled={Boolean(selected)}
                  onClick={() => choose(option)}
                  className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition ${
                    revealCorrect
                      ? "border-teal bg-teal-soft text-teal"
                      : picked
                        ? "border-coral bg-coral-soft text-coral"
                        : "border-ink/10 bg-cream text-ink enabled:hover:border-honey"
                  }`}
                >
                  <span className="mr-3 text-sm text-muted">{String.fromCharCode(65 + optionIndex)}</span><FractionText>{option}</FractionText>
                </button>
              );
            })}
          </div>

          {selected && (
            <div className={`mt-6 animate-pop rounded-2xl p-4 ${correct ? "bg-teal-soft" : "bg-honey-soft"}`}>
              <p className="font-display text-lg font-bold text-ink">{correct ? "Correcto" : "Revisemos la idea"}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/75"><FractionText>{current.explanation}</FractionText></p>
            </div>
          )}
        </section>

        <button disabled={!selected} onClick={next} className="mt-5 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40">
          {count >= 15 ? "Continuar o ver resultado" : "Siguiente pregunta →"}
        </button>
      </div>
    </main>
  );
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
