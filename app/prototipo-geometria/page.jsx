"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoWordmark } from "@/components/Logo";
import GeometryBoard from "@/components/math/GeometryBoard";
import { GEOMETRY_MVP_FAMILIES, GEOMETRY_MVP_QUESTIONS, GEOMETRY_SKILLS } from "@/lib/geometryMvpQuestions";

export default function GeometryPrototypePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const question = GEOMETRY_MVP_QUESTIONS[questionIndex];
  const currentSkill = GEOMETRY_SKILLS.find((skill) => skill.id === question.skillId);
  const visibleFamilies = GEOMETRY_MVP_FAMILIES.filter((family) => family.skillId === question.skillId);
  const current = step > 0 ? question.steps[step - 1] : null;
  const selectedOption = question.options.find((option) => option.value === selected);
  const correct = selected === question.answer;

  function choose(option) {
    if (selected) return;
    setSelected(option);
    setStep(1);
  }

  function goToQuestion(index) {
    const normalized = (index + GEOMETRY_MVP_QUESTIONS.length) % GEOMETRY_MVP_QUESTIONS.length;
    setQuestionIndex(normalized);
    setSelected(null);
    setStep(0);
  }

  function goToFamily(familyId) {
    const index = GEOMETRY_MVP_QUESTIONS.findIndex((item) => item.family === familyId);
    if (index >= 0) goToQuestion(index);
  }

  function goToSkill(skillId) {
    const index = GEOMETRY_MVP_QUESTIONS.findIndex((item) => item.skillId === skillId);
    if (index >= 0) goToQuestion(index);
  }

  function advance() {
    if (step < 3) {
      setStep((value) => value + 1);
      return;
    }
    goToQuestion(questionIndex + 1);
  }

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-16">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        <header className="flex items-center justify-between gap-3">
          <Link href="/"><LogoWordmark size={34} /></Link>
          <span className="rounded-full bg-grape-soft px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-grape sm:px-4 sm:text-xs">
            Banco de 72 ejercicios
          </span>
        </header>

        <nav className="mt-6 grid gap-2 sm:grid-cols-3" aria-label="Habilidades de geometría">
          {GEOMETRY_SKILLS.map((skill) => {
            const active = question.skillId === skill.id;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => goToSkill(skill.id)}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  active
                    ? "border-grape bg-grape text-white shadow-soft"
                    : "border-ink/10 bg-white text-ink hover:border-grape/40"
                }`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl font-black ${active ? "bg-white/15 text-honey" : "bg-cream text-grape"}`}>{skill.symbol}</span>
                <span>
                  <span className={`block text-[10px] font-extrabold uppercase tracking-wide ${active ? "text-white/65" : "text-muted"}`}>{skill.id} · 24 preguntas</span>
                  <span className="block text-sm font-extrabold leading-tight">{skill.short}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <nav className="mt-6" aria-label="Familias de ejercicios">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {visibleFamilies.map((family) => {
              const active = question.family === family.id;
              return (
                <button
                  key={family.id}
                  type="button"
                  onClick={() => goToFamily(family.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                    active
                      ? "border-night bg-night text-white shadow-sm"
                      : "border-ink/10 bg-white text-muted hover:border-grape/40 hover:text-grape"
                  }`}
                >
                  {family.short}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-3 flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-3 py-2 shadow-sm sm:px-4">
          <button
            type="button"
            onClick={() => goToQuestion(questionIndex - 1)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-xl font-bold text-ink transition hover:bg-honey-soft"
            aria-label="Pregunta anterior"
          >
            ←
          </button>
          <div className="min-w-0 px-3 text-center">
            <p className="text-xs font-extrabold uppercase tracking-wide text-grape">Pregunta {question.number} de {GEOMETRY_MVP_QUESTIONS.length}</p>
            <p className="truncate text-sm font-bold text-ink">{question.familyLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => goToQuestion(questionIndex + 1)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-xl font-bold text-ink transition hover:bg-honey-soft"
            aria-label="Pregunta siguiente"
          >
            →
          </button>
        </div>

        <section className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,.96fr)]">
          <motion.article
            key={question.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{currentSkill?.symbol}</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-extrabold uppercase tracking-wide text-muted">{question.familyLabel}</p>
                <p className="text-sm text-muted">{question.skillLabel} · Nivel {question.level}</p>
              </div>
            </div>

            <p className="mt-6 text-sm font-bold text-grape">{question.title}</p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {question.prompt}
            </h1>
            <p className="mt-2 leading-relaxed text-muted">{question.hint}</p>

            <div className="mt-6"><GeometryBoard question={question} step={step} /></div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {question.options.map((option, index) => {
                const picked = selected === option.value;
                const revealCorrect = selected && option.value === question.answer;
                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    disabled={Boolean(selected)}
                    whileTap={selected ? undefined : { scale: 0.98 }}
                    onClick={() => choose(option.value)}
                    className={`min-h-16 rounded-2xl border-2 px-3 py-4 text-left font-display text-base font-bold transition sm:px-4 sm:text-lg ${
                      revealCorrect
                        ? "border-teal bg-teal-soft text-teal"
                        : picked
                          ? "border-coral bg-coral-soft text-coral"
                          : "border-ink/10 bg-cream text-ink enabled:hover:border-honey"
                    }`}
                  >
                    <span className="mr-2 text-xs text-muted sm:mr-3 sm:text-sm">{String.fromCharCode(65 + index)}</span>{option.value}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  className={`mt-5 rounded-2xl p-4 ${correct ? "bg-teal-soft" : "bg-honey-soft"}`}
                >
                  <p className="font-display text-lg font-bold text-ink">
                    {correct ? "Correcto: comprobemos por qué" : "Revisemos la decisión"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">
                    {correct ? question.success : selectedOption?.feedback}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>

          <aside className="rounded-[2rem] bg-night p-5 text-white shadow-soft sm:p-7 lg:sticky lg:top-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-honey">Explicación animada</p>
                <h2 className="mt-1 font-display text-2xl font-bold">Comprende antes de memorizar</h2>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 font-display text-lg font-bold text-honey">{step}/3</span>
            </div>

            <div className="mt-6 flex gap-2" aria-label={`Paso ${step} de 3`}>
              {[1, 2, 3].map((value) => (
                <span key={value} className={`h-2 flex-1 rounded-full transition-colors ${step >= value ? "bg-honey" : "bg-white/15"}`} />
              ))}
            </div>

            <div className="mt-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                {!current ? (
                  <motion.div key={`${question.id}-empty`} initial={false} exit={reduceMotion ? undefined : { opacity: 0 }} className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-2xl">△</span>
                    <p className="mt-4 font-display text-xl font-bold">Elige una respuesta</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">La figura señalará los datos, mostrará la propiedad correcta y comprobará el resultado.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${question.id}-${step}`}
                    initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, x: -18 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28 }}
                    className="rounded-3xl bg-white p-6 text-ink"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-grape">{current.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold">{current.title}</h3>
                    <motion.div
                      initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: reduceMotion ? 0 : 0.12 }}
                      className="mt-5 rounded-2xl bg-honey-soft px-3 py-5 text-center font-display text-2xl font-bold text-night sm:px-4 sm:text-3xl"
                    >
                      {current.equation}
                    </motion.div>
                    <p className="mt-4 leading-relaxed text-muted">{current.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selected && (
              <button
                type="button"
                onClick={advance}
                className="mt-5 w-full rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night transition hover:bg-honey-deep hover:text-white"
              >
                {step < 3 ? "Ver siguiente paso →" : questionIndex === GEOMETRY_MVP_QUESTIONS.length - 1 ? "Volver a la primera →" : "Siguiente pregunta →"}
              </button>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
