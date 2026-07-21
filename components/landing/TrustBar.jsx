"use client";

import { useEffect, useRef, useState } from "react";

// Barra de confianza con contadores que suben cuando entra al viewport.
const STATS = [
  { end: 3000, label: "niños activos", fmt: (n) => "+" + n.toLocaleString("es-CO") },
  { end: 120000, label: "retos resueltos", fmt: (n) => "+" + n.toLocaleString("es-CO") },
  { end: 4.9, label: "calificación promedio", fmt: (n) => n.toFixed(1).replace(".", ",") + " ★", decimals: true },
  { end: 9, label: "papás ven mejora", fmt: (n) => n + " de 10" },
];

const DURATION = 1400;

export default function TrustBar() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / DURATION, 1);
          setProgress(1 - Math.pow(1 - p, 3)); // ease-out cúbico
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="border-b border-ink/5 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-7 sm:grid-cols-4">
        {STATS.map((s) => {
          const n = s.decimals
            ? Math.round(s.end * progress * 10) / 10
            : Math.round(s.end * progress);
          return (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {s.fmt(n)}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
