import { Stars } from "@/components/landing/bits";
import AccessButtons from "@/components/landing/AccessButtons";
import Reveal from "@/components/landing/Reveal";
import { HAS_TRIAL, TRIAL_LABEL, CTA_START_LONG } from "@/lib/trial";

export default function FinalCta({ market = "co" }) {
  const us = market === "us";
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
        <div className="night-sky relative overflow-hidden rounded-4xl px-6 py-12 text-center shadow-soft sm:px-10 sm:py-14">
          <div className="animate-floaty text-6xl" aria-hidden="true">
            🔍
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Dale una ventaja que no caduca cuando cambia la tecnología
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {us
              ? HAS_TRIAL
                ? `Empieza hoy la prueba gratis de ${TRIAL_LABEL}: misterios en español que entrenan lógica, lectura y matemáticas.`
                : "Empieza hoy: misterios en español que entrenan lógica, lectura y matemáticas."
              : HAS_TRIAL
                ? `Empieza hoy la prueba gratis de ${TRIAL_LABEL}: 15 minutos de misterios para aprender a comprender, razonar y verificar antes de depender de una respuesta.`
                : "Empieza hoy: 15 minutos de misterios para aprender a comprender, razonar y verificar antes de depender de una respuesta."}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <AccessButtons context="final" dark trialLabel={CTA_START_LONG} />
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <Stars value={5} />
            <span className="text-sm text-white/60">
              A +3.000 familias les encanta
            </span>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
