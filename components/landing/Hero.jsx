import AccessButtons from "@/components/landing/AccessButtons";
import HeroReto from "@/components/landing/HeroReto";
import HeroFx from "@/components/landing/HeroFx";
import Torn from "@/components/landing/Torn";
import { CTA_START_LONG } from "@/lib/trial";

export default function Hero({ market = "co" }) {
  return (
    <section className="night-sky relative overflow-hidden">
      {/* linterna que sigue el mouse, estrellas y pistas flotando */}
      <HeroFx />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-12 sm:pt-16 md:grid-cols-2">
        <div className="text-center md:text-left">
          <div className="animate-slidein">
            <span className="inline-flex items-center gap-2 rounded-full border border-honey/30 bg-honey/10 px-3 py-1 text-sm font-semibold text-honey">
              🧠 Entrenamiento personalizado · 6 a 12 años
            </span>
          </div>

          <h1
            className="mt-4 animate-slidein font-display text-4xl font-bold leading-tight text-white sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            Matemáticas que{" "}
            <span className="relative whitespace-nowrap text-honey">
              enseñan a pensar
              {/* subrayado a mano alzada */}
              <svg
                viewBox="0 0 220 14"
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full"
              >
                <path
                  d="M4 10 C 60 2, 150 2, 216 8"
                  fill="none"
                  stroke="#FFBE3D"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </svg>
            </span>
          </h1>

          <p
            className="mx-auto mt-5 max-w-xl animate-slidein text-lg leading-relaxed text-white/70 md:mx-0"
            style={{ animationDelay: "240ms" }}
          >
            15 minutos al día para mejorar matemáticas, lógica y resolución de
            problemas con un plan adaptado a tu hijo.
          </p>

          <div
            className="mt-7 flex animate-slidein flex-col items-center gap-3 md:items-start"
            style={{ animationDelay: "360ms" }}
          >
            <AccessButtons context="hero" dark trialLabel={CTA_START_LONG} />
          </div>

          <div
            className="mt-7 flex animate-slidein items-center justify-center gap-2 md:justify-start"
            style={{ animationDelay: "480ms" }}
          >
            <span className="text-sm text-white/60">
              ✓ Configura su ruta ahora; tu hijo puede empezar después
            </span>
          </div>
        </div>

        {/* La demo ES el producto: un reto jugable en vez de una ilustración.
            La tarjeta brilla como pista bajo la linterna. */}
        <div
          className="flex animate-slidein justify-center md:justify-end"
          style={{ animationDelay: "300ms" }}
        >
          <div className="rounded-4xl shadow-glow">
            <HeroReto />
          </div>
        </div>
      </div>

      {/* borde de papel rasgado hacia la barra de confianza (blanca) */}
      <Torn color="#ffffff" />
    </section>
  );
}
