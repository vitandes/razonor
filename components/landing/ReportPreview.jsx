import Reveal from "@/components/landing/Reveal";

// Mockup del panel de padres (informe, sección 5): retos resueltos, racha,
// capítulos, fortalezas/debilidades por habilidad y una recomendación en
// lenguaje claro. Datos de ejemplo autocontenidos.

const DEMO = {
  name: "Martina",
  age: 9,
  retos: 148,
  racha: 12,
  capitulos: "4 de 10",
  habilidades: [
    { name: "Matemáticas", val: 72, bar: "bg-teal" },
    { name: "Lógica", val: 86, bar: "bg-grape" },
    { name: "Resolución de problemas", val: 68, bar: "bg-honey" },
    { name: "Razonamiento espacial", val: 61, bar: "bg-coral" },
  ],
  recomendacion:
    "Martina muestra una fortaleza en lógica 🧩. Esta semana practicará recorridos y giros visuales para fortalecer su razonamiento espacial.",
};

export default function ReportPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
              El panel de padres
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Tú ves exactamente qué está entrenando y cómo va
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Mientras tu hijo resuelve el misterio, tu panel traduce el juego a
              lo que te importa: qué habilidades domina, cuáles le cuestan y qué
              va a trabajar después.
            </p>
            <ul className="mt-6 space-y-3 text-ink">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Fortalezas y debilidades por habilidad, no solo minutos de uso.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Recomendaciones en lenguaje claro, sin jerga pedagógica.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Hasta 3 hijos por cuenta, cada uno con su propio progreso.
              </li>
            </ul>
          </Reveal>

          {/* Mockup de la tarjeta del panel, girado como expediente */}
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-4xl bg-cream shadow-soft transition duration-300 lg:rotate-1 lg:hover:rotate-0">
            <div className="border-b border-ink/5 px-6 py-5">
              <p className="text-sm text-muted">Panel de padres · esta semana</p>
              <h3 className="font-display text-xl font-semibold text-ink">
                {DEMO.name}, {DEMO.age} años
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 px-6 py-6">
              <Stat value={DEMO.retos} label="retos resueltos" />
              <Stat value={`${DEMO.racha} días`} label="racha 🔥" />
              <Stat value={DEMO.capitulos} label="capítulos" />
            </div>

            <div className="space-y-4 border-t border-ink/5 px-6 py-6">
              {DEMO.habilidades.map((h) => (
                <div key={h.name}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${h.bar}`} />
                      <span className="font-semibold text-ink">{h.name}</span>
                    </div>
                    <span className="font-display font-semibold text-ink">
                      {h.val}%
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full rounded-full ${h.bar}`}
                      style={{ width: `${h.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/5 px-6 py-6">
              <h4 className="font-display text-base font-semibold text-ink">
                Recomendación de la semana
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {DEMO.recomendacion}
              </p>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-white p-3 text-center shadow-card">
      <div className="font-display text-xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 text-xs text-muted">{label}</div>
    </div>
  );
}
