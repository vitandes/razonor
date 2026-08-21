"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoWordmark } from "@/components/Logo";
import NumberOperationsBoard from "@/components/math/NumberOperationsBoard";
import PlaceValueBoard from "@/components/math/PlaceValueBoard";
import DecimalOperationsBoard from "@/components/math/DecimalOperationsBoard";
import IntegerReasoningBoard from "@/components/math/IntegerReasoningBoard";
import { NATURAL_OPERATION_FAMILIES, NATURAL_OPERATION_QUESTIONS } from "@/lib/naturalOperationsQuestions";
import { PLACE_VALUE_FAMILIES, PLACE_VALUE_QUESTIONS } from "@/lib/placeValueQuestions";
import { DECIMAL_OPERATION_FAMILIES, DECIMAL_OPERATION_QUESTIONS } from "@/lib/decimalOperationsQuestions";
import {
  INTEGER_LINE_FAMILIES,
  INTEGER_LINE_QUESTIONS,
  INTEGER_OPERATION_FAMILIES,
  INTEGER_OPERATION_QUESTIONS,
  ORDER_OPERATION_FAMILIES,
  ORDER_OPERATION_QUESTIONS,
} from "@/lib/integerReasoningQuestions";

const NUMBER_SKILLS = [
  {
    id: "NO01",
    title: "Valor posicional y comparación",
    short: "Valor posicional",
    symbol: "N₁",
    description: "Lee, representa, compara y ordena números con sentido de magnitud.",
    families: PLACE_VALUE_FAMILIES,
    questions: PLACE_VALUE_QUESTIONS,
  },
  {
    id: "NO02",
    title: "Operaciones con números naturales",
    short: "Operaciones naturales",
    symbol: "×",
    description: "Calcula, estima y explica por qué una operación funciona.",
    families: NATURAL_OPERATION_FAMILIES,
    questions: NATURAL_OPERATION_QUESTIONS,
  },
  {
    id: "NO03",
    title: "Operaciones con decimales",
    short: "Operaciones decimales",
    symbol: "0,1",
    description: "Opera con decimales comprendiendo posiciones, escala y magnitud.",
    families: DECIMAL_OPERATION_FAMILIES,
    questions: DECIMAL_OPERATION_QUESTIONS,
  },
  {
    id: "NO04",
    title: "Enteros y recta numérica",
    short: "Recta numérica",
    symbol: "↔",
    description: "Interpreta signo, orden, valor absoluto y distancia respecto de cero.",
    families: INTEGER_LINE_FAMILIES,
    questions: INTEGER_LINE_QUESTIONS,
  },
  {
    id: "NO05",
    title: "Operaciones con enteros",
    short: "Operaciones enteras",
    symbol: "±",
    description: "Suma, resta, multiplica y divide enteros comprendiendo cada cambio de signo.",
    families: INTEGER_OPERATION_FAMILIES,
    questions: INTEGER_OPERATION_QUESTIONS,
  },
  {
    id: "NO06",
    title: "Orden de operaciones",
    short: "Orden de operaciones",
    symbol: "( )",
    description: "Decide qué resolver primero y explica cómo cambia una expresión.",
    families: ORDER_OPERATION_FAMILIES,
    questions: ORDER_OPERATION_QUESTIONS,
  },
];

const NUMBER_QUESTIONS = NUMBER_SKILLS.flatMap((skill) => skill.questions);

export default function NumberOperationsPrototypePage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0);
  const reduceMotion = useReducedMotion();
  const question = NUMBER_QUESTIONS[questionIndex];
  const currentSkill = NUMBER_SKILLS.find((skill) => skill.id === question.skillId);
  const current = step > 0 ? question.steps[step - 1] : null;
  const selectedOption = question.options.find((option) => option.value === selected);
  const correct = selected === question.answer;

  function choose(option) {
    if (selected) return;
    setSelected(option);
    setStep(1);
  }

  function goToQuestion(index) {
    const normalized = (index + NUMBER_QUESTIONS.length) % NUMBER_QUESTIONS.length;
    setQuestionIndex(normalized);
    setSelected(null);
    setStep(0);
  }

  function goToFamily(familyId) {
    const index = NUMBER_QUESTIONS.findIndex((item) => item.skillId === question.skillId && item.family === familyId);
    if (index >= 0) goToQuestion(index);
  }

  function goToSkill(skillId) {
    const index = NUMBER_QUESTIONS.findIndex((item) => item.skillId === skillId);
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
            Banco de {NUMBER_QUESTIONS.length} ejercicios
          </span>
        </header>

        <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Temas de números y operaciones">
          {NUMBER_SKILLS.map((skill) => {
            const active = skill.id === question.skillId;
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => goToSkill(skill.id)}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${active ? "border-grape bg-grape text-white shadow-soft" : "border-ink/10 bg-white text-ink hover:border-grape/40"}`}
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-lg font-black ${active ? "bg-white/15 text-honey" : "bg-cream text-grape"}`}>{skill.symbol}</span>
                <span>
                  <span className={`block text-[10px] font-extrabold uppercase tracking-wide ${active ? "text-white/65" : "text-muted"}`}>{skill.id} · 24 preguntas</span>
                  <span className="block text-sm font-extrabold leading-tight">{skill.title}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <section className="mt-6 overflow-hidden rounded-[2rem] bg-night px-5 py-5 text-white shadow-soft sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-7">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 font-display text-2xl font-black text-honey">{currentSkill.symbol}</span>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-honey">Números y operaciones · {currentSkill.id}</p>
              <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{currentSkill.title}</h1>
              <p className="mt-1 text-sm text-white/65">{currentSkill.description}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-0 sm:min-w-64">
            {[
              ["6", "base"],
              ["10", "aplicación"],
              ["8", "razonamiento"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white/10 px-2 py-3 text-center">
                <strong className="block font-display text-xl text-honey">{value}</strong>
                <span className="text-[10px] font-bold uppercase tracking-wide text-white/60">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <nav className="mt-6" aria-label="Familias de operaciones">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {currentSkill.families.map((family) => {
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
          <button type="button" onClick={() => goToQuestion(questionIndex - 1)} className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-xl font-bold text-ink transition hover:bg-honey-soft" aria-label="Pregunta anterior">←</button>
          <div className="min-w-0 px-3 text-center">
            <p className="text-xs font-extrabold uppercase tracking-wide text-grape">Pregunta {question.number} de {currentSkill.questions.length}</p>
            <p className="truncate text-sm font-bold text-ink">{question.familyLabel}</p>
          </div>
          <button type="button" onClick={() => goToQuestion(questionIndex + 1)} className="grid h-10 w-10 place-items-center rounded-xl bg-cream text-xl font-bold text-ink transition hover:bg-honey-soft" aria-label="Pregunta siguiente">→</button>
        </div>

        <section className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,.96fr)]">
          <motion.article
            key={question.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">{currentSkill.symbol}</span>
              <div className="min-w-0">
                <p className="truncate text-xs font-extrabold uppercase tracking-wide text-muted">{question.familyLabel}</p>
                <p className="text-sm text-muted">{question.skillLabel} · Nivel {question.level}</p>
              </div>
            </div>

            <p className="mt-6 text-sm font-bold text-grape">{question.title}</p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{question.prompt}</h2>
            <p className="mt-2 leading-relaxed text-muted">{question.hint}</p>

            <div className="mt-6">
              {question.skillId === "NO01" && <PlaceValueBoard question={question} step={step} />}
              {question.skillId === "NO02" && <NumberOperationsBoard question={question} step={step} />}
              {question.skillId === "NO03" && <DecimalOperationsBoard question={question} step={step} />}
              {["NO04", "NO05", "NO06"].includes(question.skillId) && <IntegerReasoningBoard question={question} step={step} />}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0 }} className={`mt-5 rounded-2xl p-4 ${correct ? "bg-teal-soft" : "bg-honey-soft"}`}>
                  <p className="font-display text-lg font-bold text-ink">{correct ? "Correcto: comprobemos por qué" : "Revisemos la decisión"}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{correct ? question.success : selectedOption?.feedback}</p>
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
              {[1, 2, 3].map((value) => <span key={value} className={`h-2 flex-1 rounded-full transition-colors ${step >= value ? "bg-honey" : "bg-white/15"}`} />)}
            </div>

            <div className="mt-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                {!current ? (
                  <motion.div key={`${question.id}-empty`} initial={false} exit={reduceMotion ? undefined : { opacity: 0 }} className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/10 font-display text-2xl font-black text-honey">?</span>
                    <p className="mt-4 font-display text-xl font-bold">Elige una respuesta</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">El modelo mostrará cómo representar, resolver y comprobar la operación.</p>
                  </motion.div>
                ) : (
                  <motion.div key={`${question.id}-${step}`} initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: reduceMotion ? 0 : 0.28 }} className="rounded-3xl bg-white p-6 text-ink">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-grape">{current.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold">{current.title}</h3>
                    <motion.div initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.12 }} className="mt-5 rounded-2xl bg-honey-soft px-3 py-5 text-center font-display text-2xl font-bold text-night sm:px-4 sm:text-3xl">{current.equation}</motion.div>
                    <p className="mt-4 leading-relaxed text-muted">{current.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selected && (
              <button type="button" onClick={advance} className="mt-5 w-full rounded-full bg-honey px-6 py-3.5 font-display text-lg font-bold text-night transition hover:bg-honey-deep hover:text-white">
                {step < 3 ? "Ver siguiente paso →" : questionIndex === NUMBER_QUESTIONS.length - 1 ? "Volver a la primera →" : "Siguiente pregunta →"}
              </button>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
