import Reveal from "@/components/landing/Reveal";

const STEPS = [
  {
    emoji: "🧭",
    title: "Un test disfrazado de juego",
    desc: "5 retos iniciales ubican a tu hijo en su ruta: 7–9 o 10–12 años. Para él fue un juego; para nosotros, su punto de partida.",
  },
  {
    emoji: "🔍",
    title: "El caso del día",
    desc: "Cada lección dura 3–5 minutos: 4–6 retos de deducción, patrones y lógica escondidos dentro de una historia de misterio.",
  },
  {
    emoji: "🗺️",
    title: "Avanza por el mapa",
    desc: "Cada caso resuelto desbloquea el siguiente capítulo. Rachas, medallas y su mascota acompañante hacen que quiera volver solo.",
  },
  {
    emoji: "📈",
    title: "Tú ves el progreso",
    desc: "En tu panel de padres: retos resueltos, racha, fortalezas y debilidades por habilidad, y una recomendación en lenguaje claro.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-teal">
            Cómo funciona
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Él resuelve un misterio. Tú ves el resultado.
          </h2>
          <p className="mt-4 text-lg text-muted">
            15 minutos al día bastan. Sin profesores, sin horarios, sin peleas.
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* la "ruta del caso": línea punteada que conecta los pasos */}
          <div
            className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-ink/15 lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 140}>
                <li className="group relative flex h-full flex-col rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                  <span
                    className="absolute right-4 top-2 font-display text-6xl font-bold text-cloud transition group-hover:text-honey-soft"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span
                    className="relative grid h-14 w-14 place-items-center rounded-2xl bg-night text-3xl shadow-card transition group-hover:rotate-6"
                    aria-hidden="true"
                  >
                    {step.emoji}
                  </span>
                  <h3 className="relative mt-4 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
