import AccessButtons from "@/components/landing/AccessButtons";
import Reveal from "@/components/landing/Reveal";
import { CTA_START_LONG } from "@/lib/trial";

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
            Encuentra qué base matemática conviene fortalecer primero
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Completa el onboarding ahora. Si el estudiante está contigo, recibirá
            su primera oportunidad; si no, puedes dejar listo el acceso y hacer el diagnóstico después.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <AccessButtons context="final" dark trialLabel={CTA_START_LONG} />
          </div>

          <p className="mt-6 text-sm text-white/60">
            10 a 18 años · 15–18 preguntas · resultado inicial
          </p>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
