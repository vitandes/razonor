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
import { DEMO_TRACKS, TRACK_IDS, focusFor } from "@/lib/demoTracks";

// Demo pública y guiada por tema (/fracciones, /porcentajes, /ecuaciones y
// /demo). Los retos viven en lib/demoTracks.js. Termina con un ejemplo del
// panel de padres y la invitación a la prueba gratis. Los eventos llevan el
// tema para saber qué video o anuncio convierte.
export default function DemoExperience({ trackId = "porcentajes" }) {
  const track = DEMO_TRACKS[trackId] || DEMO_TRACKS.porcentajes;
  const RETOS = track.retos;
  const [stage, setStage] = useState("intro"); // intro | play | result
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const feedbackRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    trackProductEvent("demo_viewed", { track: track.id }, { once: "session", onceKey: `demo_viewed_${track.id}` });
  }, [track.id]);

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
    trackProductEvent("demo_started", { track: track.id });
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
    trackProductEvent("demo_answered", { track: track.id, step: index + 1, reto: reto.id, correct });
  }

  function next() {
    if (index < RETOS.length - 1) {
      setSelected(null);
      setIndex((value) => value + 1);
      return;
    }
    const focus = focusFor(track, results);
    trackProductEvent(
      "demo_completed",
      {
        track: track.id,
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

        {stage === "intro" && <Intro track={track} onStart={start} />}
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
        {stage === "result" && <Result track={track} results={results} onRestart={start} />}
      </div>
    </main>
  );
}

function Intro({ track, onStart }) {
  return (
    <section className="mt-8 animate-pop">
      <TrackSwitcher current={track.id} />
      <div className="night-sky relative mt-4 overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-soft sm:px-9 sm:py-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-honey">
          {track.label} · demo gratis · 4 retos · 2 minutos
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
          Mira cómo Razonor encuentra la base que falla
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
          <FractionText>{track.intro}</FractionText> Puedes responder tú o pasarle el
          celular a tu hijo.
        </p>

        <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {track.retos.map((reto, i) => (
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

function Result({ track, results, onRestart }) {
  const RETOS = track.retos;
  const ok = Object.fromEntries(results.map((result) => [result.id, result.correct]));
  const focus = focusFor(track, results);
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

      <div className="mt-5 text-center">
        <p className="text-sm font-semibold text-muted">¿Probar otro tema?</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {TRACK_IDS.filter((id) => id !== track.id).map((id) => (
            <Link
              key={id}
              href={DEMO_TRACKS[id].path}
              className="rounded-full border-2 border-ink/10 bg-white px-4 py-2 text-sm font-bold text-ink transition hover:border-grape/40 hover:text-grape"
            >
              {DEMO_TRACKS[id].label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pestañas para cambiar de tema sin volver a la landing.
function TrackSwitcher({ current }) {
  return (
    <nav aria-label="Temas de la demo" className="flex flex-wrap gap-2">
      {TRACK_IDS.map((id) => {
        const active = id === current;
        return (
          <Link
            key={id}
            href={DEMO_TRACKS[id].path}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              active ? "bg-night text-white shadow-card" : "border-2 border-ink/10 bg-white text-muted hover:border-grape/40 hover:text-grape"
            }`}
          >
            {DEMO_TRACKS[id].label}
          </Link>
        );
      })}
    </nav>
  );
}

// ---------- Visuales ----------

function Visual({ visual, solved, reduceMotion }) {
  if (visual.type === "split") return <SplitBar {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "grid") return <GridModel {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "dots") return <DotGroups {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "bars") return <BarsModel {...visual} solved={solved} reduceMotion={reduceMotion} />;
  if (visual.type === "balance") return <Balance {...visual} solved={solved} reduceMotion={reduceMotion} />;
  return null;
}

// Barras de fracción del mismo ancho (la misma unidad). Antes de responder se
// muestran `before`; al responder, `after`. Una fila sin `parts` es una barra
// entera sin cortar. `colors` pinta cada trozo tomado (por defecto, morado).
function BarsModel({ before, after, captionBefore, captionAfter, solved, reduceMotion }) {
  const rows = solved ? after : before;
  const fill = { grape: "bg-grape", honey: "bg-honey" };
  return (
    <Frame label={solved ? captionAfter : captionBefore} ariaLabel={rows.map((row) => row.label).join(", ")}>
      <div className="mx-auto max-w-md space-y-3.5">
        {rows.map((row, r) => (
          <div key={`${row.label}-${r}`}>
            <p className="mb-1.5 text-sm font-bold text-ink">
              <FractionText>{row.label}</FractionText>
            </p>
            <div className="flex h-11 overflow-hidden rounded-xl border-2 border-night bg-white">
              {Array.from({ length: row.parts || 0 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : r * 0.12 + i * 0.04 }}
                  className={`flex-1 border-r-2 border-night/20 last:border-r-0 ${
                    i < (row.take || 0) ? fill[row.colors?.[i] || "grape"] : ""
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// La ecuación como balanza: los dos lados pesan lo mismo. Al responder se
// muestra la x despejada.
function Balance({ left, right, solvedLeft, solvedRight, solved, reduceMotion }) {
  const l = solved ? solvedLeft : left;
  const r = solved ? solvedRight : right;
  const pan = "min-w-0 flex-1 rounded-2xl border-2 border-night bg-white px-2 py-4 text-center font-display text-lg font-bold text-ink sm:text-2xl";
  return (
    <Frame
      label={solved ? "Despejada: los dos lados siguen pesando lo mismo" : "Los dos lados de la balanza pesan lo mismo"}
      ariaLabel={`Balanza: ${l} = ${r}`}
    >
      <div className="mx-auto max-w-sm">
        <div className="flex items-center gap-3">
          <motion.div key={`l-${l}`} initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className={pan}>
            {l}
          </motion.div>
          <span className="font-display text-2xl font-bold text-grape">=</span>
          <motion.div key={`r-${r}`} initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className={`${pan} ${solved ? "border-teal bg-teal-soft text-teal" : ""}`}>
            {r}
          </motion.div>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-night" aria-hidden="true" />
        <div className="mx-auto h-7 w-1.5 bg-night" aria-hidden="true" />
        <div className="mx-auto h-1.5 w-24 rounded-full bg-night" aria-hidden="true" />
      </div>
    </Frame>
  );
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
