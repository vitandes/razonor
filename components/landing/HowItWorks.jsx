import Reveal from "@/components/landing/Reveal";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

const STEPS = [
  {
    title: "Prueba un ejemplo gratis",
    desc: "Juega una actividad real y mira cómo Razonor explica el porqué, no solo marca bien o mal. Sin registro.",
  },
  {
    title: HAS_TRIAL ? `Empieza tu prueba de ${TRIAL_LABEL}` : "Activa el acceso",
    desc: HAS_TRIAL
      ? "Crea la cuenta en 2 pasos y activa el plan. No se cobra hoy y no necesitas al estudiante contigo."
      : "Crea tu cuenta y elige el plan. No necesitas tener al estudiante contigo para completar la compra.",
  },
  {
    title: "El diagnóstico, cuando tu hijo pueda",
    desc: HAS_TRIAL
      ? "Dentro de la prueba, el estudiante responde 15–18 preguntas que cambian según sus respuestas."
      : "Con el acceso activo, el estudiante responde 15–18 preguntas que cambian según sus respuestas.",
  },
  {
    title: "Sigue una ruta que se ajusta",
    desc: "Razonor elige qué reforzar primero y adapta las siguientes sesiones con cada nueva evidencia.",
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
            Del ejemplo gratis a una ruta personalizada
          </h2>
          <p className="mt-4 text-lg text-muted">
            {HAS_TRIAL
              ? "Primero pruebas la experiencia. El estudiante hace el diagnóstico cuando pueda, dentro de la prueba."
              : "Tú activas el acceso primero. El estudiante hace el diagnóstico después, dentro de Aprendo."}
          </p>
        </Reveal>

        <div className="relative mt-12">
          {/* la "ruta del caso": línea punteada que conecta los pasos */}
          <div
            className="absolute left-0 right-0 top-10 hidden border-t-2 border-dashed border-ink/15 lg:block"
            aria-hidden="true"
          />
          <ol className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    {String(i + 1).padStart(2, "0")}
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
