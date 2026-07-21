"use client";

// Efectos visuales compartidos (celebraciones, Wrapped, momentos de juego):
// contadores animados, confeti, orbes de luz, chispas y títulos escalonados.
// Todo CSS + rAF, sin dependencias.

import { useEffect, useMemo, useRef, useState } from "react";

// Número que cuenta de 0 al objetivo (efecto contador de Wrapped).
export function CountUp({ to, duration = 1400, className = "" }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico
      setVal(Math.round(to * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, duration]);
  return <span className={className}>{val.toLocaleString("es-CO")}</span>;
}

// Lluvia de confeti en CSS (sin dependencias).
export function Confetti({ count = 34 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 1.6,
        duration: 2.4 + Math.random() * 1.6,
        size: 8 + Math.random() * 8,
        color: ["#FF9A2E", "#7B5BE0", "#2BB3C0", "#FF6B6B", "#FFE7C7"][i % 5],
        emoji: i % 6 === 0 ? ["⭐", "📚", "🎉", "🦁"][i % 4] : null,
        tilt: Math.random() * 60 - 30,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((c, i) => (
        <span
          key={i}
          className="absolute top-0 animate-confetti"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            fontSize: c.emoji ? `${c.size + 8}px` : undefined,
          }}
        >
          {c.emoji ? (
            c.emoji
          ) : (
            <span
              className="block rounded-sm"
              style={{
                width: c.size,
                height: c.size * 0.55,
                background: c.color,
                transform: `rotate(${c.tilt}deg)`,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

// Orbes de luz difuminados que se mueven lento: dan profundidad al gradiente.
export function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-24 top-1/4 h-72 w-72 animate-drift rounded-full bg-white/15 blur-3xl" />
      <div
        className="absolute -right-20 bottom-1/4 h-80 w-80 animate-drift rounded-full bg-white/10 blur-3xl"
        style={{ animationDelay: "2.2s" }}
      />
      <div
        className="absolute left-1/3 -top-16 h-56 w-56 animate-drift rounded-full bg-white/10 blur-3xl"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

// Chispas que suben (fuego vivo de fondo, p.ej. para rachas).
export function RisingEmbers({ count = 14 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: 4 + (i * 37) % 92,
        delay: (i * 0.47) % 3.2,
        duration: 2.6 + (i % 4) * 0.5,
        size: 13 + (i % 3) * 8,
        emoji: ["🔥", "✨", "⭐"][i % 3],
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-8%] animate-rise"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

// Título que aparece palabra por palabra (efecto Wrapped).
export function StaggerTitle({ text, className = "" }) {
  return (
    <h2 className={className}>
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="mr-[0.28em] inline-block animate-slidein"
          style={{ animationDelay: `${0.14 * i + 0.08}s` }}
        >
          {w}
        </span>
      ))}
    </h2>
  );
}

// Emojis flotando de fondo (sutiles, dan vida sin distraer).
export function FloatingEmojis({ emojis }) {
  const items = useMemo(
    () =>
      emojis.flatMap((e, gi) =>
        Array.from({ length: 3 }, (_, i) => ({
          emoji: e,
          left: 8 + ((gi * 3 + i) * 29) % 84,
          top: 10 + ((gi * 5 + i * 7) * 13) % 72,
          delay: (gi + i) * 0.9,
          size: 22 + ((gi + i) % 3) * 10,
        })),
      ),
    [emojis],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute animate-floaty"
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            fontSize: it.size,
            animationDelay: `${it.delay}s`,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
