"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Detective from "@/components/Detective";
import { useProgress } from "@/lib/progress";
import { routeFromProfile, resolveReto, MECHANIC_LABEL, chapterCaseCount } from "@/lib/world";
import { playerLevelFromXp, rankTitle } from "@/lib/leveling";
import { CountUp, Confetti, Glow, StaggerTitle } from "@/components/fx";

// Baraja un arreglo (Fisher-Yates). Se usa para las opciones y para los pasos.
function shuffle(arr) {
  const a = [...arr];
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

function Bubble({ children, mood = "happy" }) {
  return (
    <div className="mt-5 flex items-start gap-3">
      <Detective size={52} mood={mood} className="shrink-0" />
      <div className="rounded-3xl rounded-tl-md bg-grape-soft px-4 py-3 text-ink">
        <p className="text-[15px] leading-snug">{children}</p>
      </div>
    </div>
  );
}

export default function CaseSession({ caseData }) {
  const progress = useProgress();
  const route = routeFromProfile(progress);

  // Retos resueltos a su forma concreta según la ruta de edad.
  const retos = useMemo(
    () => (caseData.retos || []).map((r) => resolveReto(r, route)),
    [caseData, route],
  );

  const [phase, setPhase] = useState("intro"); // intro | retos | done
  const [qi, setQi] = useState(0);
  const [solved, setSolved] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [picked, setPicked] = useState(null); // opción elegida (choice)
  const [wrong, setWrong] = useState(false); // para el shake
  const [seq, setSeq] = useState([]); // pasos elegidos (mecánica orden)

  const startRef = useRef(Date.now());
  const resultsRef = useRef([]); // [{ skill, firstTry }]
  const committedRef = useRef(false);
  const [splashSeen, setSplashSeen] = useState(false);

  // ¿Hay progreso parcial guardado? El hook hidrata desde localStorage tras el
  // primer render, así que revisamos cuando `hydrated` cambia a true, una sola
  // vez, antes de que el niño haya interactuado.
  const resumedRef = useRef(false);
  useEffect(() => {
    if (resumedRef.current || !progress.hydrated) return;
    const saved = progress.cases?.[caseData.id]?.inProgress?.results;
    if (Array.isArray(saved) && saved.length > 0) {
      resumedRef.current = true;
      resultsRef.current = [...saved];
      setQi(Math.min(saved.length, (caseData.retos || []).length - 1));
      setPhase("retos");
    } else {
      resumedRef.current = true; // no hay nada que retomar; marcamos igual
    }
  }, [progress.hydrated, progress.cases, caseData]);

  const reto = retos[qi];
  const isOrder = reto?.mechanic === "orden";

  // Opciones / pasos barajados: se recalculan solo al cambiar de reto.
  const options = useMemo(
    () => (reto && !isOrder ? shuffle(reto.options) : []),
    [reto, isOrder],
  );
  const stepPool = useMemo(
    () => (reto && isOrder ? shuffle(reto.steps) : []),
    [reto, isOrder],
  );

  function recordSolved() {
    resultsRef.current.push({ skill: reto.skill, firstTry: !usedHint });
  }

  // --- Mecánicas de opción (deducción, patrón, error, matemático) ---
  function choose(opt) {
    if (solved) return;
    setPicked(opt);
    if (opt === reto.answer) {
      setSolved(true);
      recordSolved();
    } else {
      setUsedHint(true);
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
    }
  }

  // --- Mecánica de ordenar los pasos ---
  function tapStep(step) {
    if (solved || seq.includes(step)) return;
    const nextSeq = [...seq, step];
    setSeq(nextSeq);
    if (nextSeq.length === reto.steps.length) {
      const ok = nextSeq.every((s, i) => s === reto.steps[i]);
      if (ok) {
        setSolved(true);
        recordSolved();
      } else {
        setUsedHint(true);
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSeq([]); // reinicia el orden para reintentar
        }, 600);
      }
    }
  }

  function next() {
    if (qi + 1 < retos.length) {
      // Persistimos el progreso parcial: si sale ahora, retoma en el siguiente.
      progress.saveCaseProgress({
        caseId: caseData.id,
        chapter: caseData.chapter,
        results: [...resultsRef.current],
      });
      setQi(qi + 1);
      setSolved(false);
      setUsedHint(false);
      setPicked(null);
      setWrong(false);
      setSeq([]);
    } else {
      setPhase("done");
    }
  }

  // Al llegar al resumen, guardamos el progreso real una sola vez.
  useEffect(() => {
    if (phase !== "done" || committedRef.current) return;
    committedRef.current = true;
    const results = resultsRef.current;
    const minutes = Math.min(
      30,
      Math.max(1, Math.round((Date.now() - startRef.current) / 60000)),
    );
    const firstTries = results.filter((r) => r.firstTry).length;
    const ratio = results.length ? firstTries / results.length : 1;
    const stars = Math.max(1, Math.ceil(ratio * 3));
    progress.finishCase({
      caseId: caseData.id,
      chapter: caseData.chapter,
      chapterCaseCount: chapterCaseCount(caseData.chapter),
      route,
      results,
      minutes,
      stars,
    });
  }, [phase, progress, caseData, route]);

  /* ---------- INTRO (expediente del caso) ---------- */
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-6">
        <TopLink />
        <div className="mt-4 rounded-4xl bg-white p-6 shadow-card sm:p-8">
          <span className="text-5xl">{caseData.emoji}</span>
          <p className="mt-3 font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
            Caso · Capítulo {caseData.chapter}
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-ink">
            {caseData.title}
          </h1>
          <Bubble>{caseData.brief}</Bubble>
        </div>
        <button
          onClick={() => setPhase("retos")}
          className="mt-6 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:bg-honey-deep hover:text-white"
        >
          Abrir el caso 🔍
        </button>
      </div>
    );
  }

  /* ---------- RESUMEN (caso resuelto) ---------- */
  if (phase === "done") {
    const firstTries = resultsRef.current.filter((r) => r.firstTry).length;
    const session = progress.lastCase;
    const xpGained = session?.total ?? 0;

    const playerLeveledTo = progress.justPlayerLeveledTo;
    const rank = playerLeveledTo ? rankTitle(playerLeveledTo) : null;
    const medalChapter = progress.justChapterMedal;

    // Splash de subida de nivel o de medalla de capítulo (momento videojuego).
    if ((playerLeveledTo || medalChapter) && !splashSeen) {
      const isMedal = Boolean(medalChapter) && !playerLeveledTo;
      return (
        <div className="fixed inset-0 z-[70] night-sky">
          <Glow />
          <Confetti count={44} />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center px-8 text-center text-white">
            <div className="animate-shine text-8xl drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
              {isMedal ? "🏅" : rank.emoji}
            </div>
            <StaggerTitle
              text={isMedal ? "¡Capítulo resuelto!" : "¡Subiste de nivel!"}
              className="mt-6 font-display text-5xl font-bold leading-tight"
            />
            {isMedal ? (
              <p className="mt-4 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.6s" }}>
                Ganaste la medalla del Capítulo {medalChapter} 🏅
              </p>
            ) : (
              <>
                <p className="mt-4 animate-slidein font-display text-2xl font-semibold" style={{ animationDelay: "0.6s" }}>
                  Nivel <CountUp to={playerLeveledTo} duration={900} />
                </p>
                <p className="mt-2 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.8s" }}>
                  Ahora eres “{rank.name}” {rank.emoji}
                </p>
              </>
            )}
            <button
              onClick={() => setSplashSeen(true)}
              className="mt-10 animate-slidein rounded-full bg-honey px-8 py-4 font-display text-lg font-bold text-night shadow-card transition hover:scale-105"
              style={{ animationDelay: "1.1s" }}
            >
              Seguir 🎉
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-2xl px-5 py-10">
        <div className="pointer-events-none fixed inset-0 z-10">
          <Confetti count={30} />
        </div>
        <TopLink />
        <div className="mt-6 animate-pop rounded-4xl bg-white p-8 text-center shadow-soft">
          <Detective size={96} className="mx-auto animate-floaty" />
          <h1 className="mt-4 font-display text-3xl font-bold text-ink">
            ¡Caso resuelto{progress.name ? `, ${progress.name}` : ""}! 🕵️
          </h1>
          <p className="mt-2 text-muted">Cerraste “{caseData.title}”.</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat top={<>+<CountUp to={xpGained} duration={1200} /></>} bottom="XP" tone="bg-honey-soft text-honey-deep" />
            <Stat top={`${firstTries}/${retos.length}`} bottom="sin pista" tone="bg-teal-soft text-teal" />
            <Stat top={`🔥 ${progress.streak}`} bottom={progress.streak === 1 ? "día de racha" : "días de racha"} tone="bg-coral-soft text-coral" />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/aprendo"
              onClick={() => progress.clearLevelUp()}
              className="flex-1 rounded-full bg-night px-6 py-3.5 font-semibold text-white transition hover:bg-night-soft"
            >
              Volver al cuartel
            </Link>
            <Link
              href="/padres"
              className="flex-1 rounded-full border border-ink/15 bg-white px-6 py-3.5 font-semibold text-ink transition hover:border-ink/30"
            >
              Ver panel de papás
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- RETOS ---------- */
  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      <TopLink />

      {/* progreso */}
      <div className="mt-4 flex items-center gap-2">
        {retos.map((_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < qi ? "bg-honey" : i === qi ? "bg-honey/50" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <div
        key={wrong ? `shake-${qi}` : `reto-${qi}`}
        className={`mt-4 rounded-4xl bg-white p-6 shadow-card sm:p-7 ${wrong ? "animate-shake" : ""}`}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-cloud px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          🔍 Reto {qi + 1} de {retos.length} · {MECHANIC_LABEL[reto.mechanic]}
        </span>

        <p className="mt-4 font-medium text-ink">{reto.prompt}</p>

        {/* lo que "dice" la IA: el niño debe evaluarlo con criterio */}
        {reto.aiSays && (
          <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-grape/25 bg-grape-soft p-4">
            <span className="text-2xl" aria-hidden="true">🤖</span>
            <p className="text-sm leading-snug text-ink">
              <span className="font-bold">Astubot dice:</span> “{reto.aiSays}”
            </p>
          </div>
        )}

        {reto.clues && (
          <ul className="mt-3 space-y-2 rounded-2xl bg-cloud p-4 text-sm text-ink">
            {reto.clues.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}

        <p className="mt-4 font-display text-lg font-semibold text-ink">
          {reto.question}
        </p>

        {/* ---- UI por mecánica ---- */}
        {!isOrder ? (
          <div className="mt-4 grid gap-2.5">
            {options.map((opt) => {
              const isAnswer = solved && opt === reto.answer;
              const isWrongPick = !solved && wrong && opt === picked;
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  disabled={solved}
                  className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey ${
                    isAnswer
                      ? "animate-pop border-teal bg-teal-soft text-ink"
                      : isWrongPick
                        ? "border-coral bg-coral-soft text-ink"
                        : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-honey hover:shadow-card"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4">
            {/* secuencia armada */}
            <ol className="mb-3 space-y-2">
              {seq.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-2.5 font-semibold text-ink"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-sm text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
              {Array.from({ length: reto.steps.length - seq.length }).map((_, i) => (
                <li
                  key={`empty-${i}`}
                  className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-ink/15 px-4 py-2.5 text-muted"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cloud text-sm">
                    {seq.length + i + 1}
                  </span>
                  Toca un paso…
                </li>
              ))}
            </ol>
            {/* pasos disponibles */}
            <div className="flex flex-wrap gap-2">
              {stepPool
                .filter((s) => !seq.includes(s))
                .map((step) => (
                  <button
                    key={step}
                    onClick={() => tapStep(step)}
                    disabled={solved}
                    className="rounded-full border-2 border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-honey hover:shadow-card"
                  >
                    {step}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* feedback */}
        {!solved && usedHint && (
          <Bubble mood="think">Todavía no… {reto.hint}</Bubble>
        )}
        {solved && (
          <div className="mt-4 animate-pop rounded-2xl bg-teal-soft p-4">
            <p className="text-sm font-semibold text-teal">
              {usedHint ? "¡Ahí está! Lo lograste. 🔎" : "¡Exacto! A la primera. 🎉"}
            </p>
            <p className="mt-1 text-sm text-ink/80">{reto.explicacion}</p>
          </div>
        )}

        {solved && (
          <button
            onClick={next}
            className="mt-6 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:bg-honey-deep hover:text-white"
          >
            {qi + 1 < retos.length ? "Siguiente pista →" : "Cerrar el caso"}
          </button>
        )}
      </div>
    </div>
  );
}

function TopLink() {
  return (
    <Link
      href="/aprendo"
      className="inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-ink"
    >
      ← Mi cuartel
    </Link>
  );
}

function Stat({ top, bottom, tone }) {
  return (
    <div className={`rounded-3xl px-3 py-4 ${tone}`}>
      <div className="font-display text-2xl font-bold">{top}</div>
      <div className="text-xs">{bottom}</div>
    </div>
  );
}
