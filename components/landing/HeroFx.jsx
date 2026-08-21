"use client";

import { useRef } from "react";

// Capa de ambiente del hero: un halo ámbar que sigue el mouse,
// puntos que titilan y símbolos matemáticos flotando. Todo es decorativo
// none) — el contenido real va encima con z-10.
const STARS = [
  { top: "12%", left: "8%", d: "0s" },
  { top: "22%", left: "28%", d: "0.9s" },
  { top: "8%", left: "55%", d: "1.6s" },
  { top: "18%", left: "78%", d: "0.4s" },
  { top: "38%", left: "92%", d: "2s" },
  { top: "62%", left: "5%", d: "1.2s" },
  { top: "78%", left: "18%", d: "0.6s" },
  { top: "85%", left: "62%", d: "1.8s" },
  { top: "70%", left: "88%", d: "0.2s" },
  { top: "45%", left: "45%", d: "2.3s" },
];

const CLUES = [
  { emoji: "½", top: "16%", left: "4%", cls: "animate-floaty font-display text-3xl", d: "0s" },
  { emoji: "%", top: "70%", left: "10%", cls: "animate-floaty font-display text-2xl", d: "1.1s" },
  { emoji: "x", top: "24%", right: "6%", cls: "animate-floaty font-display text-3xl", d: "0.6s" },
  { emoji: "△", bottom: "12%", right: "10%", cls: "animate-floaty font-display text-3xl", d: "1.7s" },
];

export default function HeroFx() {
  const ref = useRef(null);

  // El halo se mueve directo al DOM (sin estado) para que sea fluido.
  function onMove(e) {
    const layer = ref.current;
    if (!layer) return;
    const rect = layer.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    layer.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(255,190,61,0.12), transparent 65%)`;
  }

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={onMove}
      aria-hidden="true"
    >
      {/* halo */}
      <div ref={ref} className="pointer-events-none absolute inset-0" />

      {/* estrellas que titilan */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1 w-1 animate-twinkle rounded-full bg-white"
          style={{ top: s.top, left: s.left, animationDelay: s.d }}
        />
      ))}

      {/* símbolos matemáticos */}
      {CLUES.map((c, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute opacity-20 ${c.cls}`}
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            animationDelay: c.d,
          }}
        >
          {c.emoji}
        </span>
      ))}
    </div>
  );
}
