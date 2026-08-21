import AccessButtons from "@/components/landing/AccessButtons";
import Reveal from "@/components/landing/Reveal";
import { CTA_PROBLEM } from "@/lib/trial";

const SITUATIONS = [
  {
    mark: "01",
    title: "Entiende el ejemplo, pero se bloquea cuando el problema cambia",
    text: "Puede repetir un procedimiento sin tener claro por qué funciona ni cuándo utilizarlo.",
    color: "text-coral",
  },
  {
    mark: "02",
    title: "Practica bastante, pero los mismos errores regresan",
    text: "Más ejercicios del tema actual no siempre reparan una base que quedó débil antes.",
    color: "text-grape",
  },
  {
    mark: "03",
    title: "Recibe una nota, pero tú no sabes qué reforzar primero",
    text: "Un porcentaje resume el resultado, pero no explica la causa ni el siguiente paso.",
    color: "text-teal",
  },
];

export default function Problem() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
        <div>
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-coral">
              ¿Te suena familiar?
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Practica, pero los mismos errores vuelven
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Tal vez no necesita más ejercicios. Necesita descubrir qué fundamento
              anterior todavía no está firme.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            {SITUATIONS.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="grid grid-cols-[3.25rem_1fr] gap-4 rounded-3xl border border-ink/5 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft sm:p-5">
                  <span className={`font-display text-xl font-bold ${item.color}`} aria-hidden="true">
                    {item.mark}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-7 flex flex-col items-start gap-3">
              <AccessButtons context="problem" trialLabel={CTA_PROBLEM} />
              <p className="text-sm text-muted">Puedes hacer el onboarding aunque tu hijo no esté contigo.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="night-sky relative overflow-hidden rounded-4xl p-6 shadow-soft sm:p-8">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-honey/10" aria-hidden="true" />
            <p className="relative font-display text-sm font-bold uppercase tracking-wide text-honey">
              No siempre falta práctica
            </p>
            <h3 className="relative mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              El error que ves puede empezar en una habilidad anterior
            </h3>

            <div className="relative mt-7 space-y-3">
              <ReasonStep number="1" label="Error visible" value="Se bloquea con 20% de 80" tone="coral" />
              <Connector />
              <ReasonStep number="2" label="Posible raíz" value="No conecta fracción, decimal y porcentaje" tone="grape" />
              <Connector />
              <ReasonStep number="3" label="Primera acción" value="Reforzar equivalencias antes de repetir porcentajes" tone="teal" />
            </div>

            <p className="relative mt-7 rounded-2xl border border-honey/20 bg-honey/10 p-4 text-sm leading-relaxed text-white/80">
              Razonor convierte esas señales en un punto de partida concreto y explica por qué conviene comenzar allí.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TONES = {
  coral: "bg-coral-soft text-coral",
  grape: "bg-grape-soft text-grape",
  teal: "bg-teal-soft text-teal",
};

function ReasonStep({ number, label, value, tone }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold ${TONES[tone]}`}>
        {number}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-white/45">{label}</p>
        <p className="mt-1 font-display text-base font-semibold leading-snug text-white">{value}</p>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="ml-[2.15rem] h-4 border-l-2 border-dashed border-honey/40" aria-hidden="true" />;
}
