import Reveal from "@/components/landing/Reveal";

const STEPS = [
  {
    emoji: "01",
    title: "Configura el punto de partida",
    desc: "Indica quién aprende, su edad, objetivo y cómo vive hoy las matemáticas.",
  },
  {
    emoji: "02",
    title: "Hazlo hoy o déjalo pendiente",
    desc: "Si el estudiante está contigo, responde 15–18 preguntas. Si no, deja listo el acceso y completen el diagnóstico cuando estén juntos.",
  },
  {
    emoji: "03",
    title: "Recibe una ruta ordenada",
    desc: "Conoce una fortaleza, una oportunidad y la primera habilidad que conviene reparar antes de avanzar.",
  },
  {
    emoji: "04",
    title: "Practica y comprueba",
    desc: "Las sesiones diarias combinan explicación, aplicación, razonamiento y repaso; el plan cambia con nueva evidencia.",
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
            Del diagnóstico a una acción concreta
          </h2>
          <p className="mt-4 text-lg text-muted">
            No mostramos un nivel genérico: buscamos la causa y explicamos por qué se trabaja primero.
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
                    className="relative grid h-14 w-14 place-items-center rounded-2xl bg-night font-display text-lg font-bold text-honey shadow-card transition group-hover:-translate-y-1"
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
