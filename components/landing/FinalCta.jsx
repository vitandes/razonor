import AccessButtons from "@/components/landing/AccessButtons";
import Reveal from "@/components/landing/Reveal";
import { CTA_START_LONG } from "@/lib/trial";

export default function FinalCta({ market = "co" }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
        <div className="night-sky relative overflow-hidden rounded-4xl px-6 py-12 text-center shadow-soft sm:px-10 sm:py-14">
          <div className="animate-floaty text-6xl" aria-hidden="true">
            🔍
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Descubre cómo piensa tu hijo y qué necesita reforzar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            El diagnóstico inicial convierte sus respuestas en un plan de 15
            minutos al día para matemáticas, lógica y resolución de problemas.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <AccessButtons context="final" dark trialLabel={CTA_START_LONG} />
          </div>

          <p className="mt-6 text-sm text-white/60">
            Diagnóstico inicial · Plan personalizado · Progreso visible para padres
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
