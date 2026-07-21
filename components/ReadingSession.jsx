"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Mascot from "@/components/Mascot";
import { getSocraticHint, getCriticReply } from "@/lib/ai";
import { useProgress } from "@/lib/progress";
import { storyReadingLevel, READING_LEVELS, READING_LABEL } from "@/lib/data";
import { playerLevelFromXp, rankTitle } from "@/lib/leveling";
import { CountUp, Confetti, Glow, StaggerTitle } from "@/components/fx";
import ReadAloud from "@/components/ReadAloud";

const LEVEL_CHIP = {
  literal: { label: "Nivel literal", cls: "bg-teal-soft text-teal" },
  inferencial: { label: "Nivel inferencial", cls: "bg-grape-soft text-grape" },
  critico: { label: "Nivel crítico", cls: "bg-coral-soft text-coral" },
};

// Turnos máximos del niño en una pregunta abierta (1 respuesta + 1 elaboración).
// En el último turno Leo cierra con una felicitación, sin hacer otra pregunta.
const MAX_CRITIC_TURNS = 2;

// Baraja las opciones (Fisher-Yates) para que la respuesta correcta no quede
// siempre en la misma posición. Devuelve las opciones revueltas y el nuevo
// índice de la correcta.
function shuffleOptions(q) {
  const arr = q.options.map((text, i) => ({ text, correct: i === q.correct }));
  for (let k = arr.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [arr[k], arr[j]] = [arr[j], arr[k]];
  }
  return {
    options: arr.map((o) => o.text),
    correct: arr.findIndex((o) => o.correct),
  };
}

function Bubble({ children, mood = "happy", thinking = false }) {
  return (
    <div className="mt-5 flex items-start gap-3">
      <Mascot size={52} mood={mood} className="shrink-0" />
      <div className="relative rounded-3xl rounded-tl-md bg-grape-soft px-4 py-3 text-ink">
        {thinking ? (
          <span className="flex gap-1 py-1">
            <span className="h-2 w-2 animate-pop rounded-full bg-grape" />
            <span className="h-2 w-2 animate-pop rounded-full bg-grape [animation-delay:120ms]" />
            <span className="h-2 w-2 animate-pop rounded-full bg-grape [animation-delay:240ms]" />
          </span>
        ) : (
          <p className="text-[15px] leading-snug">{children}</p>
        )}
      </div>
    </div>
  );
}

function KidBubble({ children }) {
  return (
    <div className="mt-5 flex items-start justify-end gap-3">
      <div className="max-w-[80%] rounded-3xl rounded-tr-md bg-cloud px-4 py-3 text-ink">
        <p className="text-[15px] leading-snug">{children}</p>
      </div>
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey-soft text-lg"
        aria-hidden="true"
      >
        🧒
      </span>
    </div>
  );
}

export default function ReadingSession({ story }) {
  const progress = useProgress();
  const questions = story.questions || [];

  const [phase, setPhase] = useState("reading"); // reading | quiz | done
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [solved, setSolved] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [leo, setLeo] = useState(null); // {text, mood}
  const [thinking, setThinking] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showText, setShowText] = useState(false); // panel "releer el cuento"
  const [chat, setChat] = useState([]); // hilo de la pregunta abierta: [{who,text}]
  const [kidTurns, setKidTurns] = useState(0);
  const [splashSeen, setSplashSeen] = useState(false); // splash de subida de nivel

  const startRef = useRef(Date.now()); // para medir minutos leídos
  const resultsRef = useRef([]); // [{ level, correct }]
  const committedRef = useRef(false); // evita guardar dos veces

  const q = questions[qi];

  // Opciones barajadas para la pregunta actual. Se recalcula solo cuando cambia
  // la pregunta (no en cada render), así el orden se mantiene mientras el niño
  // responde, pero cambia en cada pregunta y en cada nueva sesión.
  const shuffled = useMemo(
    () => (q && q.type === "choice" ? shuffleOptions(q) : null),
    [q],
  );

  // graded: correct=true (lo resolvió), firstTry=acertó sin pista.
  // critico: correct=participó con respuesta razonada.
  function recordResult(level, { firstTry = false, correct = true } = {}) {
    resultsRef.current.push({ level, firstTry, correct });
  }

  async function choose(i) {
    if (solved) return;
    setPicked(i);
    if (i === shuffled.correct) {
      const firstTry = attempt === 0;
      setSolved(true);
      recordResult(q.level, { firstTry, correct: true });
      const gain = firstTry ? 10 : 5; // puntos base (el total con bono y reto sale al final)
      setLeo({
        text: firstTry
          ? `¡Eso es! Lo encontraste en el texto. +${gain} ⭐`
          : `¡Ahí está! Lo lograste releyendo. +${gain} ⭐`,
        mood: "happy",
      });
    } else {
      setThinking(true);
      setLeo(null);
      setShowText(true); // invita a volver al texto y buscar la prueba
      const hint = await getSocraticHint({
        story,
        question: q,
        attempt,
        choiceText: shuffled.options?.[i],
      });
      setThinking(false);
      setAttempt((a) => a + 1);
      setLeo({ text: hint, mood: "think" });
    }
  }

  async function sendOpen() {
    const kidText = answer.trim();
    if (!kidText || thinking) return;

    const turn = kidTurns + 1;
    const isFinal = turn >= MAX_CRITIC_TURNS;
    const withKid = [...chat, { who: "kid", text: kidText }];

    setChat(withKid);
    setAnswer("");
    setKidTurns(turn);
    setThinking(true);

    if (turn === 1) {
      // la primera respuesta cuenta para la maestría/XP y desbloquea "Siguiente"
      setSolved(true);
      recordResult(q.level, { firstTry: false, correct: kidText.length >= 12 });
    }

    const reply = await getCriticReply({
      story,
      question: q,
      messages: withKid.map((m) => ({ role: m.who, text: m.text })),
      final: isFinal,
    });
    setThinking(false);
    setChat((c) => [...c, { who: "leo", text: reply }]);
  }

  function next() {
    if (qi + 1 < questions.length) {
      setQi(qi + 1);
      setPicked(null);
      setSolved(false);
      setAttempt(0);
      setLeo(null);
      setAnswer("");
      setShowText(false);
      setChat([]);
      setKidTurns(0);
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
      60,
      Math.max(1, Math.round((Date.now() - startRef.current) / 60000)),
    );
    const graded = results.filter((r) => r.level !== "critico");
    const correct = graded.filter((r) => r.firstTry).length;
    const ratio = graded.length ? correct / graded.length : 1;
    const stars = Math.max(1, Math.ceil(ratio * 3));

    progress.finishSession({
      storyId: story.id,
      readingLevel: storyReadingLevel(story),
      difficulty: story.difficulty,
      results,
      minutes,
      stars,
    });
  }, [phase, progress, story]);

  /* ---------- LECTURA ---------- */
  if (phase === "reading") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-6">
        <TopLink />
        <article className="mt-4 rounded-4xl bg-white p-6 shadow-card sm:p-8">
          <span className="text-4xl">{story.emoji}</span>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink">
            {story.title}
          </h1>
          {/* audio + texto resaltado mientras suena (apoyo para decodificar y repaso) */}
          <ReadAloud paragraphs={story.paragraphs} />
        </article>

        <Bubble>
          Léelo con calma. Después te haré preguntas y podrás volver al cuento
          cuando quieras. 🦁
        </Bubble>

        <button
          onClick={() => setPhase("quiz")}
          className="mt-6 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-semibold text-ink shadow-card transition hover:bg-honey-deep hover:text-white"
        >
          Terminé de leer →
        </button>
      </div>
    );
  }

  /* ---------- RESUMEN ---------- */
  if (phase === "done") {
    const graded = resultsRef.current.filter((r) => r.level !== "critico");
    const correct = graded.filter((r) => r.firstTry).length;

    const session = progress.lastSession;
    const xpGained = session?.total ?? 0;

    const playerLeveledTo = progress.justPlayerLeveledTo;
    const rank = playerLeveledTo ? rankTitle(playerLeveledTo) : null;

    const leveledTo = progress.justLeveledTo; // nivel de lectura
    const levelName = leveledTo
      ? READING_LEVELS.find((l) => l.level === leveledTo)?.name
      : null;

    // texto del desglose de XP (multiplicador / reducción)
    let xpNote = null;
    if (session) {
      if (session.outgrown) xpNote = `${session.base} base · ½ ya dominado`;
      else if (session.multiplier > 1)
        xpNote = `${session.base} base × ${session.multiplier} reto ⚡`;
    }

    // Splash de SUBIDA DE NIVEL: momento de videojuego a pantalla completa,
    // antes del resumen (el momento estrella para filmar la reacción del niño).
    if ((playerLeveledTo || leveledTo) && !splashSeen) {
      const isPlayer = Boolean(playerLeveledTo);
      return (
        <div
          className={`fixed inset-0 z-[70] ${
            isPlayer
              ? "bg-gradient-to-b from-[#5a3fb8] via-[#7B5BE0] to-[#3c2887]"
              : "bg-gradient-to-b from-[#0f7d88] via-[#2BB3C0] to-[#0a5a63]"
          }`}
        >
          <Glow />
          <Confetti count={40} />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center px-8 text-center text-white">
            <div className="animate-shine text-8xl drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
              {isPlayer ? rank.emoji : "📚"}
            </div>
            <StaggerTitle
              text={isPlayer ? "¡Subiste de nivel!" : "¡Nuevo nivel de lectura!"}
              className="mt-6 font-display text-5xl font-bold leading-tight"
            />
            {isPlayer ? (
              <>
                <p className="mt-4 animate-slidein font-display text-2xl font-semibold" style={{ animationDelay: "0.6s" }}>
                  Nivel <CountUp to={playerLeveledTo} duration={900} />
                </p>
                <p className="mt-2 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.8s" }}>
                  Ahora eres “{rank.name}” {rank.emoji}
                </p>
              </>
            ) : (
              <p className="mt-4 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.6s" }}>
                Ya eres lector de nivel {READING_LABEL[leveledTo]} · “{levelName}”
              </p>
            )}
            <button
              onClick={() => setSplashSeen(true)}
              className="mt-10 animate-slidein rounded-full bg-white px-8 py-4 font-display text-lg font-semibold text-ink shadow-card transition hover:scale-105"
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
        {/* lluvia de confeti sobre toda la pantalla: ¡terminó un cuento! */}
        <div className="pointer-events-none fixed inset-0 z-10">
          <Confetti count={30} />
        </div>

        <TopLink />
        <div className="mt-6 animate-pop rounded-4xl bg-white p-8 text-center shadow-soft">
          <Mascot size={96} className="mx-auto animate-floaty drop-shadow-[0_10px_20px_rgba(42,35,66,0.18)]" />
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
            ¡Lo lograste{progress.name ? `, ${progress.name}` : ""}! 🎉
          </h1>
          <p className="mt-2 text-muted">Terminaste “{story.title}”.</p>

          {/* subida de NIVEL DE JUGADOR (XP) — el titular de juego */}
          {playerLeveledTo && (
            <div className="mt-5 animate-pop rounded-4xl bg-gradient-to-r from-grape to-honey-deep px-5 py-4 text-white shadow-card">
              <p className="font-display text-xl font-semibold">
                ⭐ ¡Subiste al nivel {playerLeveledTo}!
              </p>
              <p className="text-sm text-white/90">
                {rank.emoji} Ahora eres “{rank.name}”.
              </p>
            </div>
          )}

          {/* subida de NIVEL DE LECTURA (habilidad) */}
          {leveledTo && (
            <div className="mt-3 animate-pop rounded-4xl bg-gradient-to-r from-teal to-grape px-5 py-4 text-white shadow-card">
              <p className="font-display text-lg font-semibold">
                📚 ¡Ya eres lector de nivel {READING_LABEL[leveledTo]}!
              </p>
              <p className="text-sm text-white/90">
                Subiste a “{levelName}”. ¡Tu comprensión está creciendo!
              </p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat
              top={
                <>
                  +<CountUp to={xpGained} duration={1300} />
                </>
              }
              bottom="estrellas"
              tone="bg-honey-soft text-honey-deep"
            />
            <Stat
              top={`🔥 ${progress.streak}`}
              bottom={progress.streak === 1 ? "día de racha" : "días de racha"}
              tone="bg-coral-soft text-coral"
            />
            <Stat
              top={`${correct}/${graded.length}`}
              bottom="aciertos"
              tone="bg-grape-soft text-grape"
            />
          </div>
          {xpNote && <p className="mt-3 text-xs text-muted">XP: {xpNote}</p>}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/aprendo"
              onClick={() => progress.clearLevelUp()}
              className="flex-1 rounded-full bg-ink px-6 py-3.5 font-medium text-cream transition hover:opacity-90"
            >
              Volver a mi mundo
            </Link>
            <Link
              href="/padres"
              className="flex-1 rounded-full border border-ink/15 bg-white px-6 py-3.5 font-medium text-ink transition hover:border-ink/30"
            >
              Ver reporte de papás
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- QUIZ ---------- */
  const chip = LEVEL_CHIP[q.level];
  // La pista del texto se resalta cuando el niño ya se equivocó (o ya acertó),
  // para enseñarle a volver al cuento y encontrar la prueba por sí mismo.
  const highlightIndex =
    q.type === "choice" && q.evidence != null && (attempt > 0 || solved)
      ? q.evidence
      : null;

  // Cuándo se puede avanzar:
  // - opción: al acertar.
  // - abierta: cuando la conversación con Leo terminó (todos los turnos) y ya
  //   respondió la última, para que no la corten a la mitad.
  const canAdvance =
    q.type === "choice"
      ? solved
      : kidTurns >= MAX_CRITIC_TURNS && !thinking;

  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      <TopLink />

      {/* progreso */}
      <div className="mt-4 flex items-center gap-2">
        {questions.map((qq, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < qi ? "bg-honey" : i === qi ? "bg-honey/50" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      {/* releer el cuento (siempre disponible) */}
      <RereadPanel
        paragraphs={story.paragraphs}
        open={showText}
        onToggle={() => setShowText((v) => !v)}
        highlightIndex={highlightIndex}
      />

      <div className="mt-4 rounded-4xl bg-white p-6 shadow-card sm:p-7">
        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${chip.cls}`}>
          {chip.label}
        </span>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
          {q.prompt}
        </h2>

        {q.type === "choice" ? (
          <div className="mt-5 space-y-3">
            {shuffled.options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === shuffled.correct;
              let cls = "border-ink/10 bg-white hover:border-ink/30";
              if (solved && isCorrect) cls = "border-teal bg-teal-soft text-teal";
              else if (isPicked && !isCorrect) cls = "border-coral bg-coral-soft text-coral";
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={solved}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left font-medium transition ${cls}`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-sm font-semibold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-5">
            {/* hilo de conversación con Leo */}
            {chat.length > 0 && (
              <div className="mb-4 space-y-3">
                {chat.map((m, i) =>
                  m.who === "kid" ? (
                    <KidBubble key={i}>{m.text}</KidBubble>
                  ) : (
                    <Bubble key={i} mood="happy">
                      {m.text}
                    </Bubble>
                  ),
                )}
                {thinking && <Bubble thinking />}
              </div>
            )}

            {/* input: visible mientras queden turnos */}
            {kidTurns < MAX_CRITIC_TURNS && (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={thinking}
                  rows={3}
                  placeholder={
                    chat.length === 0
                      ? "Escribe lo que piensas… no hay respuesta mala si lo explicas."
                      : "Responde a Leo para terminar la conversación…"
                  }
                  className="w-full resize-none rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3 text-[16px] text-ink outline-none transition focus:border-grape"
                />
                <button
                  onClick={sendOpen}
                  disabled={!answer.trim() || thinking}
                  className="mt-3 rounded-full bg-grape px-6 py-3 font-medium text-white transition enabled:hover:opacity-90 disabled:opacity-40"
                >
                  {chat.length === 0 ? "Enviar a Leo" : "Responder a Leo"}
                </button>
              </>
            )}
          </div>
        )}

        {/* pista de Leo (solo en preguntas de opción) */}
        {q.type === "choice" && (leo || thinking) && (
          <Bubble mood={leo?.mood || "think"} thinking={thinking}>
            {leo?.text}
          </Bubble>
        )}

        {canAdvance && (
          <button
            onClick={next}
            className="mt-6 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-semibold text-ink shadow-card transition hover:bg-honey-deep hover:text-white"
          >
            {qi + 1 < questions.length ? "Siguiente →" : "Terminar"}
          </button>
        )}
      </div>
    </div>
  );
}

function RereadPanel({ paragraphs, open, onToggle, highlightIndex }) {
  const hasHint = highlightIndex != null;
  return (
    <div className="mt-4 overflow-hidden rounded-4xl bg-white shadow-card">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep"
      >
        <span className="flex items-center gap-2 font-display font-semibold text-ink">
          📖 {open ? "Ocultar el cuento" : "Releer el cuento"}
        </span>
        <span className="flex items-center gap-2">
          {hasHint && !open && (
            <span className="rounded-full bg-honey-soft px-2.5 py-0.5 text-xs font-semibold text-honey-deep">
              pista aquí
            </span>
          )}
          <span
            className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            ▾
          </span>
        </span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-ink/5 px-5 py-4 text-[16px] leading-relaxed text-ink/90">
          {hasHint && (
            <p className="text-sm font-medium text-honey-deep">
              🔎 La respuesta se esconde en el párrafo resaltado. Léelo otra vez.
            </p>
          )}
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={
                highlightIndex === i
                  ? "rounded-2xl bg-honey-soft px-3 py-2 ring-2 ring-honey"
                  : ""
              }
            >
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function TopLink() {
  return (
    <Link
      href="/aprendo"
      className="inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-ink"
    >
      ← Mi mundo
    </Link>
  );
}

function Stat({ top, bottom, tone }) {
  return (
    <div className={`rounded-3xl px-3 py-4 ${tone}`}>
      <div className="font-display text-2xl font-semibold">{top}</div>
      <div className="text-xs">{bottom}</div>
    </div>
  );
}
