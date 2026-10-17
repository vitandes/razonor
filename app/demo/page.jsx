"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoWordmark } from "@/components/Logo";
import FractionText from "@/components/math/FractionText";
import AccessButtons from "@/components/landing/AccessButtons";
import { TrialButton } from "@/components/landing/bits";
import { trackProductEvent } from "@/lib/analytics";
import { CTA_START, CTA_START_LONG, HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

// Demo pública y guiada (sin login y sin el niño). Cuatro retos siguen la misma
// historia de la landing: el error visible "20% de 80" hasta su posible raíz
// (equivalencia de fracciones), un problema nuevo y una situación real. Cada
// opción incorrecta tiene su propia explicación del error: eso es lo que
// demuestra el valor del producto. Termina con un ejemplo del panel de padres y
// la invitación a la prueba gratis. Es una muestra: NO estima el nivel del
// estudiante (eso lo hace el diagnóstico real dentro de Aprendo).

const RETOS = [
  {
    id: "porcentaje",
    role: "El error común",
    skill: "Porcentaje de una cantidad",
    prompt: "¿Cuánto es 20% de 80?",
    hint: "Piensa qué significa “20 de cada 100”.",
    visual: { type: "split", total: "80", parts: 5, take: 1, partLabel: "16" },
    answer: "16",
    options: [
      { value: "20", feedback: "Copiaste el 20. Pero 20% no son 20 unidades: son 20 de cada 100." },
      { value: "16" },
      { value: "60", feedback: "Restaste 80 − 20. El porcentaje no se resta: indica qué parte del total tomar." },
      { value: "4", feedback: "Dividiste 80 ÷ 20. Eso cuenta cuántas veces cabe 20 en 80, no qué parte es el 20%." },
    ],
    success: "20% es 20/100, que vale lo mismo que 1/5. Y 1/5 de 80 es 16.",
    steps: [
      { title: "Traduce el porcentaje", equation: "20% = 20/100", text: "“Por ciento” significa “de cada 100”." },
      { title: "Busca una fracción más simple", equation: "20/100 = 1/5", text: "Dividir arriba y abajo entre 20 no cambia el valor." },
      { title: "Aplícala al total", equation: "80 ÷ 5 = 16", text: "1/5 de 80 es una de cinco partes iguales." },
    ],
    bridge: "¿Viste el paso 2? Reconocer que dos fracciones valen lo mismo (20/100 = 1/5) es la base. Si no está firme, el porcentaje falla aunque se “sepa la regla”. Comprobémosla con otros números.",
  },
  {
    // Números distintos al reto 1 a propósito: su explicación ya mostró
    // 20/100 = 1/5, así que repetirlos no comprobaría nada.
    id: "equivalencia",
    role: "La posible raíz",
    skill: "Equivalencia de fracciones",
    prompt: "Otra cuadrícula: 40 de sus 100 cuadritos están pintados, o sea 40/100. ¿Qué fracción es equivalente?",
    hint: "Busca una fracción con menos partes que ocupe el mismo espacio.",
    visual: {
      type: "grid",
      paintedCols: 4,
      before: "40 de 100 cuadritos pintados = 40/100",
      after: "5 franjas iguales: lo pintado ocupa 2 de 5 = 2/5",
    },
    answer: "2/5",
    options: [
      { value: "2/10", feedback: "Dividiste arriba entre 20 y abajo entre 10. Para no cambiar el valor hay que dividir los dos por el mismo número." },
      { value: "5/2", feedback: "Pusiste la fracción al revés: 100/40 = 5/2, que es más de un entero. Y lo pintado es menos de la mitad de la cuadrícula." },
      { value: "2/5" },
      { value: "10/70", feedback: "Restaste 30 arriba y abajo. Sumar o restar lo mismo cambia el valor; multiplicar o dividir por lo mismo, no." },
    ],
    success: "40/100 = 2/5. Si agrupas la cuadrícula en 5 franjas iguales, lo pintado ocupa exactamente dos.",
    steps: [
      { title: "Mira el mismo espacio", equation: "40/100 = ?", text: "Lo pintado no cambia; solo cambia en cuántas partes divides la unidad." },
      { title: "Divide arriba y abajo por lo mismo", equation: "40 ÷ 20 = 2   ·   100 ÷ 20 = 5", text: "Por eso 40/100 se convierte en 2/5." },
      { title: "Comprueba con otros nombres", equation: "2/5 = 0,4 = 40%", text: "Tres formas de escribir la misma cantidad." },
    ],
    bridge: "Ahora veamos si la idea se transfiere a un problema nuevo, sin porcentajes.",
  },
  {
    id: "fraccion-de",
    role: "Un problema nuevo",
    skill: "Fracción de una cantidad",
    prompt: "En un curso hay 20 estudiantes y 3/4 de ellos van en bus. ¿Cuántos van en bus?",
    hint: "Primero reparte en partes iguales; después toma las que pide.",
    visual: { type: "dots", total: 20, groups: 4, take: 3 },
    answer: "15",
    options: [
      { value: "15" },
      { value: "5", feedback: "Encontraste 1/4 de 20 (20 ÷ 4 = 5). Faltó tomar 3 de esas partes: 3 × 5." },
      { value: "60", feedback: "Multiplicaste 20 × 3 sin repartir. El 4 indica en cuántas partes iguales dividir primero." },
      { value: "17", feedback: "Restaste 20 − 3. El 3/4 no quita 3 estudiantes: toma 3 de cada 4." },
    ],
    success: "20 ÷ 4 = 5 estudiantes por grupo, y 3 grupos son 15.",
    steps: [
      { title: "Reparte en 4 grupos iguales", equation: "20 ÷ 4 = 5", text: "El denominador (el número de abajo) dice en cuántas partes dividir." },
      { title: "Toma 3 grupos", equation: "3 × 5 = 15", text: "El numerador (el de arriba) dice cuántas partes tomar." },
      { title: "Comprueba", equation: "15/20 = 3/4", text: "15 de 20 es lo mismo que 3 de cada 4." },
    ],
    bridge: "Último reto: la misma idea en una situación de la vida real.",
  },
  {
    id: "descuento",
    role: "La vida real",
    skill: "Porcentaje en contexto",
    prompt: "Unos tenis cuestan $120.000 y tienen 25% de descuento. ¿Cuánto te descuentan?",
    hint: "¿A qué fracción simple equivale 25%?",
    visual: { type: "split", total: "$120.000", parts: 4, take: 1, partLabel: "$30.000" },
    answer: "$30.000",
    options: [
      { value: "$25.000", feedback: "Tomaste el 25% como si fueran $25.000. Pero 25% son 25 de cada 100: un cuarto del precio." },
      { value: "$90.000", feedback: "Calculaste el precio final ($120.000 − $30.000). ¡Ibas bien! Pero la pregunta es cuánto te descuentan: eso es el 25%." },
      { value: "$4.800", feedback: "Dividiste entre 25. El 25% equivale a 1/4, así que se divide entre 4." },
      { value: "$30.000" },
    ],
    success: "25% = 25/100 = 1/4, y un cuarto de $120.000 es $30.000.",
    steps: [
      { title: "Traduce el porcentaje", equation: "25% = 25/100", text: "25 de cada 100." },
      { title: "Simplifica", equation: "25/100 = 1/4", text: "Arriba y abajo entre 25." },
      { title: "Aplica al precio", equation: "$120.000 ÷ 4 = $30.000", text: "Un cuarto del precio es el descuento." },
    ],
  },
];

// Qué recomendaría la ruta según los errores (de la raíz hacia la aplicación).
// Con una pregunta por habilidad no se puede afirmar dominio: los textos
// hablan de "esta muestra", nunca de un nivel del estudiante.
const FOCUS_RULES = [
  {
    id: "equivalencia",
    when: (ok) => !ok.equivalencia,
    title: "Equivalencia de fracciones",
    text: "Reconocer que dos fracciones valen lo mismo —como 40/100 y 2/5— es la base que sostiene los porcentajes. Si no está firme, el porcentaje falla aunque se sepa la regla. La ruta la comprobaría y reforzaría antes de volver a porcentajes.",
  },
  {
    id: "fraccion-de",
    when: (ok) => !ok["fraccion-de"],
    title: "Fracción de una cantidad",
    text: "La equivalencia salió bien en esta muestra, pero falta llevarla a cantidades: repartir en partes iguales y después tomar las que se piden. Es el puente hacia los porcentajes.",
  },
  {
    id: "porcentajes",
    when: (ok) => !ok.porcentaje || !ok.descuento,
    title: "Traducir porcentajes a fracciones",
    text: "Las fracciones salieron bien en esta muestra; la ruta practicaría pasar de “25%” a 1/4 en situaciones reales, como descuentos.",
  },
];

function focusFor(results) {
  const ok = Object.fromEntries(results.map((result) => [result.id, result.correct]));
  return FOCUS_RULES.find((rule) => rule.when(ok)) || null;
}

export default function DemoPage() {
  const [stage, setStage] = useState("intro"); // intro | play | result
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const feedbackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    trackProductEvent("demo_viewed", {}, { once: "session", onceKey: "demo_viewed" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [stage, index, reduceMotion]);

  // Al responder, acerca la explicación solo si quedó fuera de la pantalla.
  useEffect(() => {
    const el = feedbackRef.current;
    if (selected == null || !el) return;
    if (el.getBoundingClientRect().top > window.innerHeight - 160) {
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }, [selected, reduceMotion]);

  function start() {
    trackProductEvent("demo_started");
    setResults([]);
    setSelected(null);
    setIndex(0);
    setStage("play");
  }

  function choose(value) {
    if (selected != null) return;
    const reto = RETOS[index];
    const correct = value === reto.answer;
    setSelected(value);
    setResults((previous) => [...previous, { id: reto.id, correct }]);
    trackProductEvent("demo_answered", { step: index + 1, reto: reto.id, correct });
  }

  function next() {
    if (index < RETOS.length - 1) {
      setSelected(null);
      setIndex((value) => value + 1);
      return;
    }
    const focus = focusFor(results);
    trackProductEvent(
      "demo_completed",
      {
        correct_count: results.filter((result) => result.correct).length,
        total: RETOS.length,
        focus: focus?.id || "none",
      },
      { metaEvent: "DemoCompleted" },
    );
    setStage("result");
  }

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-16">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-7">
        <header className="flex items-center justify-between gap-3">
          <Link href="/" aria-label="Volver al inicio">
            <LogoWordmark size={34} />
          </Link>
          <TrialButton size="sm" analyticsContext="demo_header">{CTA_START}</TrialButton>
        </header>

        {stage === "intro" && <Intro onStart={start} />}
        {stage === "play" && (
          <Play
            reto={RETOS[index]}
            index={index}
            total={RETOS.length}
            selected={selected}
            onChoose={choose}
            onNext={next}
            feedbackRef={feedbackRef}
            reduceMotion={reduceMotion}
          />
        )}
        {stage === "result" && <Result results={results} onRestart={start} />}
      </div>
    </main>
  );
}

function Intro({ onStart }) {
  return (
    <section className="mt-8 animate-pop">
      <div className="night-sky relative overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-soft sm:px-9 sm:py-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-honey">
          Demo gratis · 4 retos · 2 minutos
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
          Mira cómo Razonor encuentra la base que falla
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
          Empezamos con un error muy común —el 20% de 80— y seguimos la pista hasta
          su posible raíz. Puedes responder tú o pasarle el celular a tu hijo.
        </p>

        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RETOS.map((reto, i) => (
            <li key={reto.id} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
              <span className="font-display text-sm font-bold text-honey">{i + 1}</span>
              <span className="mt-0.5 block text-sm font-semibold leading-tight">{reto.role}</span>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={onStart}
          className="mt-7 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey sm:w-auto sm:px-10"
        >
          Empezar la demo →
        </button>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Sin registro. Consejo: equivócate a propósito en algún reto para ver cómo
          explica el error.
        </p>
      </div>
    </section>
  );
}

function Play({ reto, index, total, selected, onChoose, onNext, feedbackRef, reduceMotion }) {
  const answered = selected != null;
  const correct = selected === reto.answer;
  const picked = reto.options.find((option) => option.value === selected);
  const last = index === total - 1;

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-grape">
          Reto {index + 1} de {total}
        </p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-muted shadow-card">
          {reto.role}
        </span>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < index || (i === index && answered) ? "bg-honey" : i === index ? "bg-honey/40" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <motion.article
        key={reto.id}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-[2rem] bg-white p-5 shadow-soft sm:p-7"
      >
        <p className="text-sm font-bold text-teal">{reto.skill}</p>
        <h1 className="mt-1 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
          <FractionText>{reto.prompt}</FractionText>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{reto.hint}</p>

        <div className="mt-5">
          <Visual visual={reto.visual} solved={answered} reduceMotion={reduceMotion} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {reto.options.map((option, i) => {
            const isPicked = selected === option.value;
            const isAnswer = answered && option.value === reto.answer;
            // Las fracciones se apilan al 82% del tamaño: se agrandan para leerse bien.
            const size = option.value.includes("/") ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl";
            const tone = isAnswer
              ? "border-teal bg-teal-soft text-teal"
              : isPicked
                ? "border-coral bg-coral-soft text-coral"
                : answered
                  ? "border-ink/5 bg-cream text-ink/35"
                  : "border-ink/10 bg-cream text-ink hover:-translate-y-0.5 hover:border-honey";
            return (
              <button
                key={option.value}
                type="button"
                disabled={answered}
                onClick={() => onChoose(option.value)}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left font-display font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey sm:px-4 ${size} ${tone}`}
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/70 text-xs text-muted">
                  {String.fromCharCode(65 + i)}
                </span>
                <FractionText>{option.value}</FractionText>
              </button>
            );
          })}
        </div>
      </motion.article>

      <AnimatePresence>
        {answered && (
          <motion.div
            ref={feedbackRef}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 scroll-mt-4 space-y-4"
          >
            <div className={`rounded-[1.5rem] p-5 ${correct ? "bg-teal-soft" : "bg-coral-soft"}`}>
              <p className={`font-display text-lg font-bold ${correct ? "text-teal" : "text-coral"}`}>
                {correct ? (
                  "¡Correcto! Comprobemos por qué"
                ) : (
                  <>
                    Elegiste <FractionText>{selected}</FractionText>: así se explica el error
                  </>
                )}
              </p>
              <p className="mt-1.5 leading-relaxed text-ink/80">
                <FractionText>{correct ? reto.success : picked?.feedback}</FractionText>
              </p>
              {!correct && (
                <p className="mt-2 text-sm font-bold text-ink">
                  La respuesta es <FractionText>{reto.answer}</FractionText>.
                </p>
              )}
            </div>

            <div className="rounded-[1.5rem] bg-night p-5 text-white sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-honey">Cómo pensarlo</p>
              <ol className="mt-4 space-y-3">
                {reto.steps.map((step, i) => (
                  <motion.li
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.15 + i * 0.25 }}
                    className="grid grid-cols-[2rem_1fr] gap-3 rounded-2xl bg-white/5 p-3.5"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-honey font-display text-sm font-bold text-night">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold">{step.title}</p>
                      <p className="mt-1.5 whitespace-pre-wrap font-display text-xl font-bold text-honey">
                        <FractionText>{step.equation}</FractionText>
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">
                        <FractionText>{step.text}</FractionText>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {reto.bridge && (
              <p className="rounded-2xl border border-grape/20 bg-grape-soft p-4 text-sm font-semibold leading-relaxed text-grape">
                <FractionText>{reto.bridge}</FractionText>
              </p>
            )}

            <button
              type="button"
              onClick={onNext}
              className="w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
            >
              {last ? "Ver el resultado →" : "Siguiente reto →"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Result({ results, onRestart }) {
  const ok = Object.fromEntries(results.map((result) => [result.id, result.correct]));
  const focus = focusFor(results);
  const correctCount = results.filter((result) => result.correct).length;

  return (
    <section className="mt-6 animate-pop">
      <div className="rounded-[2rem] bg-white p-5 shadow-soft sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal">
            Así lo verías en tu panel de padres
          </p>
          <span className="rounded-full bg-honey-soft px-3 py-1 text-xs font-bold text-honey-deep">
            Ejemplo con tus respuestas
          </span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
          {correctCount} de {RETOS.length} retos resueltos
        </h1>

        <ul className="mt-5 space-y-2.5">
          {RETOS.map((reto) => (
            <li key={reto.id} className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
              <div className="min-w-0">
                <p className="font-bold leading-snug text-ink">{reto.skill}</p>
                <p className="text-xs text-muted">{reto.role}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                  ok[reto.id] ? "bg-teal-soft text-teal" : "bg-coral-soft text-coral"
                }`}
              >
                {ok[reto.id] ? "✓ Bien" : "Revisar"}
              </span>
            </li>
          ))}
        </ul>

        <div className="night-sky mt-5 rounded-[1.5rem] p-5 text-white">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-honey">
            {focus ? "Por dónde empezaría la ruta" : "Lo que haría el diagnóstico real"}
          </p>
          <p className="mt-2 font-display text-xl font-bold">
            {focus ? focus.title : "Buscar la base que todavía no está firme"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            <FractionText>
              {focus
                ? focus.text
                : "Todo salió bien en esta muestra. Con tu hijo, el diagnóstico hace 15–18 preguntas en números, fracciones, proporciones, álgebra, geometría y datos, y sigue comprobando en cada sesión."}
            </FractionText>
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Esta muestra de 4 retos sirve para conocer la experiencia; no es un diagnóstico.
          El diagnóstico real lo hace tu hijo, se adapta a sus respuestas y cubre 6 áreas.
        </p>
      </div>

      <div className="night-sky mt-5 rounded-[2rem] px-6 py-8 text-center text-white shadow-soft sm:px-10">
        <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
          ¿Quieres esto para tu hijo?
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/70">
          {HAS_TRIAL
            ? `Pruébalo ${TRIAL_LABEL} gratis. Tu hijo hace el diagnóstico cuando pueda y recibe su ruta personalizada.`
            : "Activa el acceso. Tu hijo hace el diagnóstico cuando pueda y recibe su ruta personalizada."}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <AccessButtons context="demo_result" dark trialLabel={CTA_START_LONG} />
        </div>
        {HAS_TRIAL && (
          <p className="mt-4 text-sm text-white/55">No se cobra hoy · cancela antes del cobro</p>
        )}
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 text-sm font-semibold text-white/60 underline-offset-4 transition hover:text-white hover:underline"
        >
          Repetir la demo
        </button>
      </div>
    </section>
  );
}

// ---------- Visuales ----------

function Visual({ visual, solved, reduceMotion }) {
  if (visual.type === "split") return <SplitBar {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "grid") return <GridModel {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "dots") return <DotGroups {...visual} solved={solved} reduceMotion={reduceMotion} />;
  return null;
}

function Frame({ label, ariaLabel, children }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-5" role="img" aria-label={ariaLabel}>
      {children}
      <p className="mt-3 text-center text-sm font-semibold text-muted">
        <FractionText>{label}</FractionText>
      </p>
    </div>
  );
}

// Una barra que representa el total; al responder se parte en partes iguales y
// se resalta la que responde la pregunta.
function SplitBar({ total, parts, take, partLabel, solved, reduceMotion }) {
  return (
    <Frame
      label={solved ? `${parts} partes iguales de ${partLabel}; la morada es la respuesta` : `El total completo: ${total}`}
      ariaLabel={solved ? `${total} en ${parts} partes iguales de ${partLabel}` : `Barra que representa ${total}`}
    >
      <div className="flex h-16 overflow-hidden rounded-2xl border-2 border-night bg-white">
        {solved ? (
          Array.from({ length: parts }).map((_, i) => (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : i * 0.08 }}
              className={`grid min-w-0 flex-1 place-items-center border-r-2 border-night/15 px-1 text-center font-display text-xs font-bold last:border-r-0 sm:text-sm ${
                i < take ? "bg-grape text-white" : "text-ink/45"
              }`}
            >
              {partLabel}
            </motion.span>
          ))
        ) : (
          <span className="grid flex-1 place-items-center font-display text-2xl font-bold text-ink">{total}</span>
        )}
      </div>
    </Frame>
  );
}

// Cuadrícula de 100 con `paintedCols` columnas pintadas. Al responder se
// superponen 5 franjas iguales (de 2 columnas) para ver la fracción equivalente.
function GridModel({ paintedCols, before, after, solved, reduceMotion }) {
  return (
    <Frame
      label={solved ? after : before}
      ariaLabel={`Cuadrícula de 100 cuadritos con ${paintedCols * 10} pintados`}
    >
      <div className="relative mx-auto w-full max-w-[240px]">
        <div className="grid aspect-square grid-cols-10 overflow-hidden rounded-2xl border-2 border-night bg-white">
          {Array.from({ length: 100 }).map((_, i) => (
            <span key={i} className={`border-b border-r border-night/10 ${i % 10 < paintedCols ? "bg-grape" : ""}`} />
          ))}
        </div>
        {solved && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-none absolute inset-0 flex overflow-hidden rounded-2xl border-2 border-night"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="flex-1 border-r-2 border-night last:border-r-0" />
            ))}
          </motion.div>
        )}
      </div>
    </Frame>
  );
}

// Un conjunto de puntos; al responder se agrupa en partes iguales y se
// resaltan las que se toman.
function DotGroups({ total, groups, take, solved, reduceMotion }) {
  const per = total / groups;
  if (!solved) {
    return (
      <Frame label={`${total} estudiantes`} ariaLabel={`${total} puntos`}>
        <div className="mx-auto grid max-w-[260px] grid-cols-5 gap-2.5">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className="aspect-square rounded-full bg-ink/20" />
          ))}
        </div>
      </Frame>
    );
  }
  return (
    <Frame
      label={`${groups} grupos iguales de ${per} · ${take} grupos = ${per * take}`}
      ariaLabel={`${total} puntos en ${groups} grupos de ${per}, ${take} resaltados`}
    >
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {Array.from({ length: groups }).map((_, g) => (
          <motion.div
            key={g}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduceMotion ? 0 : g * 0.1 }}
            className={`rounded-2xl border-2 p-2.5 ${g < take ? "border-grape bg-grape-soft" : "border-ink/10 bg-white"}`}
          >
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: per }).map((_, i) => (
                <span key={i} className={`aspect-square rounded-full ${g < take ? "bg-grape" : "bg-ink/20"}`} />
              ))}
            </div>
            <p className={`mt-2 text-center text-xs font-bold ${g < take ? "text-grape" : "text-muted"}`}>{per}</p>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}
