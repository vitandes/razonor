import Reveal from "@/components/landing/Reveal";

const SKILLS = [
  {
    emoji: "N₁",
    name: "Números y operaciones",
    dot: "bg-teal",
    parent: "6 habilidades",
    desc: "Valor posicional, naturales, decimales, enteros y orden de operaciones.",
  },
  {
    emoji: "½",
    name: "Fracciones",
    dot: "bg-grape",
    parent: "6 habilidades",
    desc: "Significado, equivalencia, comparación, operaciones y conversión a decimales.",
  },
  {
    emoji: "%",
    name: "Razones y porcentajes",
    dot: "bg-honey",
    parent: "5 habilidades",
    desc: "Tasas, proporciones, representaciones y aplicaciones de porcentajes.",
  },
  {
    emoji: "x",
    name: "Álgebra",
    dot: "bg-coral",
    parent: "7 habilidades",
    desc: "Expresiones, ecuaciones, desigualdades y relaciones lineales.",
  },
  {
    emoji: "△",
    name: "Geometría y medición",
    dot: "bg-teal",
    parent: "3 habilidades",
    desc: "Unidades, escala, área, volumen, ángulos y triángulos.",
  },
  {
    emoji: "▥",
    name: "Datos y probabilidad",
    dot: "bg-grape",
    parent: "3 habilidades",
    desc: "Tablas, gráficas, centro, variabilidad y probabilidad básica.",
  },
];

export default function Skills() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
            El mapa curricular
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            30 habilidades conectadas por prerrequisitos
          </h2>
          <p className="mt-4 text-lg text-muted">
            Cada resultado apunta a un fundamento específico. El razonamiento se
            practica dentro de todas las áreas, no como una categoría separada.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 120}>
              <li className="group h-full rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl bg-night font-display text-xl font-bold text-honey transition group-hover:-translate-y-1"
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
