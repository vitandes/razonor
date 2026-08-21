import Reveal from "@/components/landing/Reveal";

const DEMO = {
  name: "Martina",
  age: 13,
  retos: 5,
  racha: 4,
  capitulos: "2 de 4",
  habilidades: [
    { name: "Operaciones con enteros", val: 82, bar: "bg-teal" },
    { name: "Equivalencia de fracciones", val: 58, bar: "bg-grape" },
    { name: "Relaciones proporcionales", val: 46, bar: "bg-honey" },
    { name: "Ecuaciones de un paso", val: 71, bar: "bg-coral" },
  ],
  recomendacion:
    "Martina trabajará equivalencia de fracciones antes de continuar con relaciones proporcionales. Esa base explica dos de sus errores recientes.",
};

export default function ReportPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
              Progreso explicable
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Ves qué domina, qué falta comprobar y qué sigue
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              El panel no confunde actividad con aprendizaje. Separa dominio,
              cantidad de evidencia, errores recurrentes y prioridad del plan.
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
                Explicación de por qué una habilidad aparece antes que otra.
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
              <Stat value={DEMO.retos} label="sesiones" />
              <Stat value={`${DEMO.racha} días`} label="racha 🔥" />
              <Stat value={DEMO.capitulos} label="prioridades revisadas" />
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
