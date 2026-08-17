import Reveal from "@/components/landing/Reveal";

// Las habilidades que entrena Razonor (informe, sección 5: mecánicas de juego).
// Reemplaza a la sección de "niveles de comprensión" del producto anterior.

const SKILLS = [
  {
    emoji: "🧮",
    name: "Matemáticas",
    dot: "bg-teal",
    parent: "¿Entiende los números o solo repite el procedimiento?",
    desc: "Conceptos, operaciones y sentido numérico aplicados a situaciones que exigen comprender el porqué.",
  },
  {
    emoji: "🧩",
    name: "Lógica",
    dot: "bg-grape",
    parent: "¿Puede detectar la regla y explicar su estrategia?",
    desc: "Patrones, secuencias, relaciones, clasificación, analogías y deducciones.",
  },
  {
    emoji: "🔎",
    name: "Resolución de problemas",
    dot: "bg-honey",
    parent: "¿Sabe convertir la información en una estrategia?",
    desc: "Interpretar datos, elegir operaciones, descartar información y resolver problemas de varios pasos.",
  },
  {
    emoji: "🧭",
    name: "Razonamiento espacial",
    dot: "bg-coral",
    parent: "¿Puede imaginar giros, posiciones y relaciones visuales?",
    desc: "Figuras, orientación, rotaciones y composición espacial para comprender el mundo visualmente.",
  },
];

export default function Skills() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
            Las cuatro habilidades centrales
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Aprende a entender, razonar y resolver
          </h2>
          <p className="mt-4 text-lg text-muted">
            Cada sesión combina habilidades distintas según el perfil de tu hijo.
            Los misterios y desafíos conservan la esencia especial de Razonor.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 120}>
              <li className="group h-full rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-3xl transition group-hover:animate-wiggle"
                    aria-hidden="true"
                  >
                    {s.emoji}
                  </span>
                  <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.name}
                  </h3>
                </div>
                <p className="mt-2 font-medium text-ink">{s.parent}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
