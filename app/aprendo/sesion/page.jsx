"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";
import AdaptiveQuestionBoard from "@/components/math/AdaptiveQuestionBoard";
import FractionText from "@/components/math/FractionText";
import { useProgress, isSubscribed } from "@/lib/progress";
import { DIAGNOSTIC_VERSION } from "@/lib/diagnosticMeta";
import { CATEGORY_BY_ID, SKILL_BY_ID, initialPlanFromDiagnostic } from "@/lib/mathCatalog";
import { PRACTICE_LESSONS } from "@/lib/mathPractice";
import { buildAdaptivePracticeSet } from "@/lib/mathQuestionBank";

export default function DailyMathSession() {
  const progress = useProgress();
  const router = useRouter();
  const [phase, setPhase] = useState("lesson");
  const [activeSkillId, setActiveSkillId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const startedAt = useRef(Date.now());

  const validDiagnostic = progress.diagnostic?.completed && progress.diagnostic?.version === DIAGNOSTIC_VERSION;
  const plan = validDiagnostic ? initialPlanFromDiagnostic(progress.diagnostic, progress.mathV1?.mastery) : [];
  const recommendation = plan[0];
  const skill = SKILL_BY_ID[activeSkillId] || recommendation?.skill;
  const lesson = skill ? PRACTICE_LESSONS[skill.id] : null;
  const category = skill ? CATEGORY_BY_ID[skill.category] : null;

  useEffect(() => {
    if (progress.serverLoaded && !isSubscribed(progress.subscription)) router.replace("/planes");
  }, [progress.serverLoaded, progress.subscription, router]);

  useEffect(() => {
    if (validDiagnostic && recommendation?.skill?.id && !activeSkillId) setActiveSkillId(recommendation.skill.id);
  }, [validDiagnostic, recommendation?.skill?.id, activeSkillId]);

  useEffect(() => {
    if (!activeSkillId) return;
    let active = true;
    const mastery = Number(progress.mathV1?.mastery?.[activeSkillId]?.mastery ?? progress.diagnostic?.scores?.[activeSkillId] ?? 0);
    const sessionNumber = (progress.mathV1?.sessions || []).filter((session) => session.skillId === activeSkillId).length;
    setLoadingQuestions(true);
    buildAdaptivePracticeSet(activeSkillId, { mastery, sessionNumber, size: 6 })
      .then((practice) => { if (active) setQuestions(practice); })
      .finally(() => { if (active) setLoadingQuestions(false); });
    return () => { active = false; };
    // The active skill is frozen for the session; new evidence is applied after completion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSkillId]);

  if (!progress.serverLoaded || !isSubscribed(progress.subscription)) return <Loading />;
  if (!validDiagnostic) return <MissingState title="Primero completa el diagnóstico" text="Así podremos elegir el punto de partida sin obligarte a revisar todos los temas." href="/diagnostico?start=1" action="Ir al diagnóstico" />;
  if (!recommendation && !activeSkillId) return <MissingState title="Tu ruta está al día" text="Ya alcanzaste el objetivo actual en todas las habilidades disponibles." href="/aprendo" action="Ver mi progreso" />;
  if (!skill || !lesson || !category) return <Loading />;

  const question = questions[index];
  const correct = selected != null && selected === question?.answer;
  const selectedOption = question?.options.find((option) => option.value === selected);

  function nextQuestion() {
    if (selected == null || !question) return;
    const nextResults = [...results, { questionId: question.id, level: question.level, answer: selected, correct }];
    if (index < questions.length - 1) {
      setResults(nextResults);
      setIndex((value) => value + 1);
      setSelected(null);
      return;
    }

    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60000));
    progress.finishMathSession({ skillId: skill.id, results: nextResults, minutes });
    setResults(nextResults);
    setPhase("complete");
  }

  if (phase === "complete") {
    const hits = results.filter((result) => result.correct).length;
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8f5ee] px-5 py-8">
        <section className="w-full max-w-xl rounded-[2rem] bg-white p-7 text-center shadow-soft sm:p-10">
          <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-night font-display text-3xl font-bold text-honey">{category.symbol}</span>
          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.16em] text-teal">Sesión completada</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ink">La ruta ya se ajustó</h1>
          <p className="mt-4 text-lg text-muted">Respondiste correctamente {hits} de {results.length}. Razonor usará esta evidencia para decidir tu siguiente práctica.</p>
          <div className="mt-7 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cream p-4"><strong className="font-display text-3xl text-ink">{hits}/{results.length}</strong><span className="mt-1 block text-xs font-bold text-muted">respuestas</span></div>
            <div className="rounded-2xl bg-cream p-4"><strong className="font-display text-3xl text-ink">+ evidencia</strong><span className="mt-1 block text-xs font-bold text-muted">para tu ruta</span></div>
          </div>
          <Link href="/aprendo" className="mt-7 inline-flex w-full justify-center rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night transition hover:bg-honey-deep hover:text-white">Continuar mi ruta</Link>
        </section>
      </main>
    );
  }

  if (phase === "lesson") {
    return (
      <main className="min-h-screen bg-[#f8f5ee] px-4 py-5 sm:px-5 sm:py-7">
        <div className="mx-auto max-w-3xl">
          <header className="flex items-center justify-between"><Link href="/aprendo"><LogoWordmark size={32} /></Link><span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-muted shadow-card">Paso recomendado</span></header>
          <section className="mt-7 overflow-hidden rounded-[2rem] bg-white shadow-soft">
            <div className="bg-night p-6 text-white sm:p-8">
              <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 font-display text-2xl font-bold text-honey">{category.symbol}</span><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-honey">{category.title}</p><h1 className="mt-1 font-display text-3xl font-bold">{lesson.title}</h1></div></div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-base leading-8 text-ink/80">{lesson.explanation}</p>
              <div className="mt-6 rounded-3xl bg-honey-soft p-5"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-honey-deep">Ejemplo</p><p className="mt-2 text-base font-semibold leading-relaxed text-ink"><FractionText>{lesson.example}</FractionText></p></div>
              <div className="mt-4 rounded-3xl bg-teal-soft p-5"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-teal">Idea clave</p><p className="mt-2 text-base font-semibold leading-relaxed text-ink">{lesson.summary}</p></div>
              <button disabled={loadingQuestions || !questions.length} onClick={() => { startedAt.current = Date.now(); setPhase("practice"); }} className="mt-7 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-50">{loadingQuestions ? "Preparando práctica…" : "Empezar práctica →"}</button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (!question) return <Loading />;

  const feedback = correct
    ? question.success || question.steps?.[2]?.text || "La respuesta coincide con el modelo."
    : selectedOption?.feedback || question.hint || "Vuelve a representar los datos antes de calcular.";

  return (
    <main className="min-h-screen bg-[#f8f5ee] px-4 py-5 sm:px-5 sm:py-7">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-3"><Link href="/aprendo"><LogoWordmark size={32} /></Link><span className="text-sm font-bold text-muted">Práctica {index + 1} de {questions.length}</span></header>
        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-ink/10"><div className="h-full rounded-full bg-honey transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
        <section className="mt-7 rounded-[2rem] bg-white p-5 shadow-card sm:p-8">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{category.symbol}</span><div><p className="text-xs font-extrabold uppercase tracking-wide text-muted">{question.familyLabel || lesson.title}</p><p className="text-sm text-muted">Nivel {question.level} · elegido para tu dominio actual</p></div></div>
          <h1 className="mt-7 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl"><FractionText>{question.prompt}</FractionText></h1>
          <div className="mt-6"><AdaptiveQuestionBoard question={question} reveal={selected != null} /></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {question.options.map((option, optionIndex) => {
              const picked = selected === option.value;
              const revealCorrect = selected != null && option.value === question.answer;
              return <button key={`${option.value}-${optionIndex}`} disabled={selected != null} onClick={() => setSelected(option.value)} className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition ${revealCorrect ? "border-teal bg-teal-soft text-teal" : picked ? "border-coral bg-coral-soft text-coral" : "border-ink/10 bg-cream text-ink enabled:hover:border-honey"}`}><span className="mr-3 text-sm text-muted">{String.fromCharCode(65 + optionIndex)}</span><FractionText>{option.value}</FractionText></button>;
            })}
          </div>
          {selected != null && <div className={`mt-6 rounded-2xl p-4 ${correct ? "bg-teal-soft" : "bg-honey-soft"}`}><p className="font-display text-lg font-bold text-ink">{correct ? "Correcto" : "Revisemos la idea"}</p><p className="mt-1 text-sm leading-relaxed text-ink/75"><FractionText>{feedback}</FractionText></p></div>}
        </section>
        <button disabled={selected == null} onClick={nextQuestion} className="mt-5 w-full rounded-full bg-honey px-7 py-4 font-display text-lg font-bold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40">{index === questions.length - 1 ? "Terminar sesión" : "Siguiente →"}</button>
      </div>
    </main>
  );
}

function MissingState({ title, text, href, action }) {
  return <main className="grid min-h-screen place-items-center bg-cream px-5 text-center"><div className="max-w-md"><h1 className="font-display text-3xl font-bold text-ink">{title}</h1><p className="mt-3 text-muted">{text}</p><Link href={href} className="mt-6 inline-flex rounded-full bg-honey px-6 py-3 font-bold text-night">{action}</Link></div></main>;
}

function Loading() {
  return <main className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" /></main>;
}
