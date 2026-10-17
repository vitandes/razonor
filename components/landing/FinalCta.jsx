import AccessButtons from "@/components/landing/AccessButtons";
import { DemoButton } from "@/components/landing/bits";
import Reveal from "@/components/landing/Reveal";
import { CTA_START_LONG, HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

export default function FinalCta({ market = "co" }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
        <div className="night-sky relative overflow-hidden rounded-4xl px-6 py-12 text-center shadow-soft sm:px-10 sm:py-14">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white/10 font-display text-3xl font-bold text-honey" aria-hidden="true">
            x
          </div>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Deja de adivinar qué debería practicar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {HAS_TRIAL
              ? `Pruébalo ${TRIAL_LABEL} gratis. El estudiante hará el diagnóstico cuando pueda, dentro de la prueba, para saber por dónde empezar.`
              : "Deja listos sus datos y activa el acceso hoy. Después, el estudiante hará el diagnóstico dentro de Aprendo para saber por dónde empezar."}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <AccessButtons context="final" dark trialLabel={CTA_START_LONG} />
            <DemoButton dark analyticsContext="final_demo" />
          </div>

          <p className="mt-6 text-sm text-white/60">
            {HAS_TRIAL
              ? "No se cobra hoy · cancela antes del cobro · no necesitas a tu hijo contigo para empezar."
              : "La compra no depende de que tu hijo esté contigo en este momento."}
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
