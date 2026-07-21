"use client";

// "La semana de {niño}" — resumen semanal estilo Wrapped/stories, a pantalla
// completa. Diseñado para verse ESPECTACULAR en video vertical (TikTok/Reels):
// tarjetas que avanzan solas con barras arriba, números gigantes que cuentan,
// confeti y el detective de protagonista.
//
//   <WeeklyWrapped open={bool} onClose={fn} data={{...}} />
//
// data: { name, retos, casesDone, totalMin, weekValues, weekLabels, streak,
//         percents, playerLevel, rank, xp }

import { useEffect, useMemo, useState } from "react";
import Detective from "@/components/Detective";
import { LogoWordmark } from "@/components/Logo";
import { SKILLS } from "@/lib/world";
import {
  CountUp,
  Confetti,
  Glow,
  RisingEmbers,
  StaggerTitle,
  FloatingEmojis,
} from "@/components/fx";

const SLIDE_MS = 5000;

export default function WeeklyWrapped({ open, onClose, data }) {
  const [index, setIndex] = useState(0);

  // Mejor habilidad de la semana.
  const best = useMemo(() => {
    if (!data?.percents) return null;
    const entries = Object.entries(data.percents).filter(([, v]) => v > 0);
    if (entries.length === 0) return null;
    const [id, value] = entries.sort((a, b) => b[1] - a[1])[0];
    return { id, value };
  }, [data]);

  const slides = useMemo(() => {
    if (!data) return [];
    const s = [{ id: "intro" }];
    if (data.casesDone > 0) s.push({ id: "cases" });
    if (data.retos > 0) s.push({ id: "retos" });
    if (data.totalMin > 0) s.push({ id: "minutes" });
    if (data.streak >= 2) s.push({ id: "streak" });
    if (best) s.push({ id: "power" });
    s.push({ id: "rank" });
    s.push({ id: "final" });
    return s;
  }, [data, best]);

  const last = index >= slides.length - 1;

  useEffect(() => {
    if (!open || last) return;
    const t = setTimeout(() => setIndex((i) => i + 1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [open, index, last]);

  useEffect(() => {
    if (open) {
      setIndex(0);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open || !data) return null;

  const slide = slides[index];
  const name = data.name || "Tu peque";

  function next() {
    if (!last) setIndex(index + 1);
  }
  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  async function share() {
    const text = `${name} resolvió ${data.retos} retos de lógica esta semana con Astuto 🕵️🔍 y ya es ${data.rank.name} (nivel ${data.playerLevel}). `;
    try {
      if (navigator.share) {
        await navigator.share({ text, url: "https://www.astuto.app" });
      } else {
        await navigator.clipboard.writeText(text + "https://www.astuto.app");
      }
    } catch {
      /* usuario canceló */
    }
  }

  const BG = {
    intro: "bg-gradient-to-b from-[#1c2547] via-[#141B36] to-[#0e1530]",
    cases: "bg-gradient-to-b from-[#c98a05] via-[#FFBE3D] to-[#a06d04]",
    retos: "bg-gradient-to-b from-[#5a3fb8] via-[#7C6CF2] to-[#3c2887]",
    minutes: "bg-gradient-to-b from-[#0f7d88] via-[#2FB7A6] to-[#0a5a63]",
    streak: "bg-gradient-to-b from-[#d94141] via-[#FF7A6B] to-[#a32626]",
    power: "bg-gradient-to-b from-[#5a3fb8] via-[#7C6CF2] to-[#3c2887]",
    rank: "bg-gradient-to-b from-[#141B36] via-[#3b2d73] to-[#141B36]",
    final: "bg-gradient-to-b from-[#FFBE3D] via-[#FF7A6B] to-[#7C6CF2]",
  };

  const SKILL_EMOJI = {
    deduccion: "🕵️",
    patrones: "🧩",
    comprension: "📖",
    computacional: "🪜",
    matematico: "➗",
    criterio: "🤖",
  };

  return (
    <div className={`fixed inset-0 z-[80] ${BG[slide.id]} transition-colors duration-700`}>
      {/* barras de progreso tipo stories */}
      <div className="absolute inset-x-0 top-0 z-20 flex gap-1.5 px-4 pt-4">
        {slides.map((s, i) => (
          <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            {i < index && <div className="h-full w-full bg-white" />}
            {i === index && !last && (
              <div
                key={index}
                className="h-full animate-storybar bg-white"
                style={{ animationDuration: `${SLIDE_MS}ms` }}
              />
            )}
            {i === index && last && <div className="h-full w-full bg-white" />}
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-8 z-30 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-lg font-semibold text-white backdrop-blur transition hover:bg-white/30"
      >
        ✕
      </button>

      <button aria-label="Anterior" onClick={prev} className="absolute inset-y-0 left-0 z-10 w-1/3" />
      <button aria-label="Siguiente" onClick={next} className="absolute inset-y-0 right-0 z-10 w-2/3" />

      <Glow />

      {slide.id !== "final" && (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center text-sm font-semibold tracking-wide text-white/60">
          🔍 astuto.app
        </div>
      )}

      <div className="pointer-events-none relative z-20 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center px-8 text-center text-white">
        {slide.id === "intro" && (
          <div key="intro" className="animate-slidein">
            <FloatingEmojis emojis={["🔍", "🕵️", "✨"]} />
            <Detective size={130} className="mx-auto animate-floaty drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]" />
            <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Resumen de la semana
            </p>
            <StaggerTitle
              text={`La semana de ${name}`}
              className="mt-2 font-display text-5xl font-bold leading-tight"
            />
            <p className="mt-4 animate-slidein text-white/80" style={{ animationDelay: "0.7s" }}>
              como detective de Astuto 🕵️
            </p>
          </div>
        )}

        {slide.id === "cases" && (
          <div key="cases" className="animate-slidein">
            <FloatingEmojis emojis={["🗂️", "🔦", "🗝️"]} />
            <p className="font-display text-lg font-semibold text-white/85">Esta semana {name} cerró</p>
            <div className="my-2 font-display text-[7rem] font-bold leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <CountUp to={data.casesDone} />
            </div>
            <p className="font-display text-3xl font-semibold">
              {data.casesDone === 1 ? "caso resuelto" : "casos resueltos"} 🕵️
            </p>
          </div>
        )}

        {slide.id === "retos" && (
          <div key="retos" className="animate-slidein">
            <FloatingEmojis emojis={["🧩", "💡", "⭐"]} />
            <p className="font-display text-lg font-semibold text-white/85">Y superó</p>
            <div className="my-2 font-display text-[7rem] font-bold leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <CountUp to={data.retos} />
            </div>
            <p className="font-display text-3xl font-semibold">retos de lógica 🧠</p>
            <p className="mt-4 text-white/85">deducción, patrones, secuencias y más</p>
          </div>
        )}

        {slide.id === "minutes" && (
          <div key="minutes" className="w-full animate-slidein">
            <p className="font-display text-lg font-semibold text-white/85">Tiempo entrenando su mente</p>
            <div className="my-2 font-display text-[6rem] font-bold leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
              <CountUp to={data.totalMin} />
            </div>
            <p className="font-display text-3xl font-semibold">minutos investigando 🧠</p>
            <div className="mx-auto mt-8 flex w-full max-w-xs items-end justify-between gap-2">
              {data.weekValues.map((m, i) => {
                const max = Math.max(...data.weekValues, 1);
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-24 w-full items-end">
                      <div
                        className="w-full origin-bottom animate-growup rounded-t-lg bg-white/90"
                        style={{
                          height: `${Math.max((m / max) * 100, m > 0 ? 10 : 4)}%`,
                          animationDelay: `${0.15 * i + 0.3}s`,
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-white/70">{data.weekLabels[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {slide.id === "streak" && (
          <div key="streak" className="animate-slidein">
            <RisingEmbers />
            <div className="animate-wiggle text-8xl drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]">🔥</div>
            <div className="my-2 font-display text-[7rem] font-bold leading-none">
              <CountUp to={data.streak} />
            </div>
            <p className="font-display text-3xl font-semibold">días seguidos investigando</p>
            <p className="mt-4 text-white/85">La constancia es el superpoder secreto de los grandes detectives 💪</p>
          </div>
        )}

        {slide.id === "power" && best && (
          <div key="power" className="animate-slidein">
            <FloatingEmojis emojis={["🕵️", "💡", "⭐"]} />
            <p className="font-display text-lg font-semibold text-white/85">El superpoder de {name}</p>
            <div className="my-4 animate-shine text-8xl">{SKILL_EMOJI[best.id]}</div>
            <h2 className="font-display text-4xl font-bold leading-tight">
              {SKILLS[best.id].name}
            </h2>
            <div className="mt-3 font-display text-6xl font-bold">
              <CountUp to={best.value} />%
            </div>
            <p className="mt-4 text-white/85">{SKILLS[best.id].desc}</p>
          </div>
        )}

        {slide.id === "rank" && (
          <div key="rank" className="animate-slidein">
            <FloatingEmojis emojis={["⭐", "🌟", "✨"]} />
            <p className="font-display text-lg font-semibold text-white/85">{name} ya es</p>
            <div className="my-4 animate-shine text-8xl">{data.rank.emoji}</div>
            <h2 className="font-display text-4xl font-bold">{data.rank.name}</h2>
            <p className="mt-2 font-display text-2xl font-semibold text-white/90">
              Nivel {data.playerLevel}
            </p>
            <p className="mt-4 text-white/85">
              con <CountUp to={data.xp} className="font-semibold text-white" /> ⭐ ganadas resolviendo casos
            </p>
          </div>
        )}

        {slide.id === "final" && (
          <div key="final" className="w-full animate-slidein">
            <Confetti />
            <div className="rounded-4xl bg-white p-6 text-ink shadow-soft">
              <div className="flex items-center justify-center">
                <LogoWordmark size={34} />
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                La semana de {name} 🎉
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                <div className="rounded-2xl bg-honey-soft px-4 py-3">
                  <div className="font-display text-3xl font-bold text-honey-deep">{data.casesDone}</div>
                  <div className="text-xs font-semibold text-ink/70">casos resueltos</div>
                </div>
                <div className="rounded-2xl bg-teal-soft px-4 py-3">
                  <div className="font-display text-3xl font-bold text-teal">{data.retos}</div>
                  <div className="text-xs font-semibold text-ink/70">retos superados</div>
                </div>
                <div className="rounded-2xl bg-coral-soft px-4 py-3">
                  <div className="font-display text-3xl font-bold text-coral">{data.streak} 🔥</div>
                  <div className="text-xs font-semibold text-ink/70">días de racha</div>
                </div>
                <div className="rounded-2xl bg-grape-soft px-4 py-3">
                  <div className="font-display text-3xl font-bold text-grape">Nv. {data.playerLevel}</div>
                  <div className="text-xs font-semibold text-ink/70">{data.rank.name}</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted">astuto.app · retos de misterio que entrenan la mente 🔍</p>
            </div>
            <div className="pointer-events-auto mt-5 flex justify-center gap-3">
              <button
                onClick={share}
                className="rounded-full bg-white px-6 py-3 font-display font-semibold text-ink shadow-card transition hover:scale-105"
              >
                Compartir 📤
              </button>
              <button
                onClick={onClose}
                className="rounded-full bg-white/20 px-6 py-3 font-display font-semibold text-white backdrop-blur transition hover:bg-white/30"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
