import Reveal from "@/components/landing/Reveal";

// Los tres nervios del padre (informe, sección 2): rendimiento escolar (abre la
// billetera), preparación para la era de la IA (diferenciador) y culpa por las
// pantallas (cierre). La variante US pivota al ángulo de la diáspora latina.

const NERVIOS = [
  {
    emoji: "🧠",
    title: "Memoriza, pero no siempre entiende",
    desc: "Recordar una fórmula no basta cuando el problema cambia. Razonor trabaja el porqué para que pueda aplicar lo aprendido en situaciones nuevas.",
    color: "text-coral",
  },
  {
    emoji: "🔎",
    title: "Las operaciones sueltas no enseñan a resolver",
    desc: "Aprender a identificar datos, descartar información y elegir una estrategia es lo que convierte las matemáticas en una herramienta para pensar.",
    color: "text-grape",
  },
  {
    emoji: "🧩",
    title: "Necesita un reto a su nivel",
    desc: "Si todo es demasiado fácil, se aburre. Si todo es muy difícil, se frustra. La práctica debe avanzar con él y reforzar lo que realmente necesita.",
    color: "text-teal",
  },
];

export default function Problem({ market = "co" }) {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-coral">
            Progreso que empieza por comprender
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            No se trata de hacer más ejercicios
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Se trata de darle desafíos adecuados y dejar que la plataforma aprenda
            de su progreso para fortalecer cómo razona, elige estrategias y explica.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {NERVIOS.map((n, i) => (
            <Reveal key={n.title} delay={i * 120}>
              <div className="h-full rounded-4xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="text-4xl" aria-hidden="true">
                  {n.emoji}
                </div>
                <h3 className={`mt-4 font-display text-lg font-semibold ${n.color}`}>
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-semibold text-ink">
            Razonor no vende una colección de ejercicios. Construye progreso académico medible.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
