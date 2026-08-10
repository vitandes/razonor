import Reveal from "@/components/landing/Reveal";

// Las habilidades que entrena Razonor (informe, sección 5: mecánicas de juego).
// Reemplaza a la sección de "niveles de comprensión" del producto anterior.

const SKILLS = [
  {
    emoji: "🕵️",
    name: "Deducción",
    dot: "bg-teal",
    parent: "¿Quién miente? ¿Qué pista no encaja?",
    desc: "Sacar conclusiones a partir de pistas: la base del razonamiento lógico y de los problemas de matemáticas.",
  },
  {
    emoji: "🧩",
    name: "Patrones y secuencias",
    dot: "bg-grape",
    parent: "¿Qué sigue? ¿Qué se repite?",
    desc: "Descubrir la regla escondida detrás de números, figuras y códigos secretos.",
  },
  {
    emoji: "📖",
    name: "Comprensión de lectura",
    dot: "bg-coral",
    parent: "¿Entendió de verdad lo que leyó?",
    desc: "Cada caso se lee. Para resolverlo hay que entender la historia — la comprensión entra sin anunciarse.",
  },
  {
    emoji: "🪜",
    name: "Pensamiento computacional",
    dot: "bg-honey",
    parent: "¿Puede ordenar los pasos de un plan?",
    desc: "Ordenar instrucciones, detectar el error, pensar en secuencias: la lógica detrás de la programación, sin pantallas de código.",
  },
  {
    emoji: "➗",
    name: "Ingenio matemático",
    dot: "bg-teal",
    parent: "¿Usa los números para resolver, no para memorizar?",
    desc: "Acertijos numéricos dentro de la historia: el niño calcula porque quiere abrir la caja fuerte, no porque toca.",
  },
  {
    emoji: "🤖",
    name: "Criterio frente a la IA",
    dot: "bg-grape",
    parent: "¿Sabe cuándo una respuesta no tiene sentido?",
    desc: "La habilidad que más sube de valor: dudar, verificar y pensar por sí mismo frente a lo que responde una máquina.",
  },
];

export default function Skills() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
            Lo que entrena cada caso
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Las bases que vienen antes del código y de la IA
          </h2>
          <p className="mt-4 text-lg text-muted">
            Cada misterio convierte una habilidad abstracta en algo que tu hijo
            practica y tú puedes ver. En el panel de padres descubres cuáles
            domina y cuáles necesita reforzar.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
