"use client";

import Link from "next/link";
import { usePricing, USD_PRICES } from "@/lib/pricing";
import { useProgress } from "@/lib/progress";
import { HAS_TRIAL, TRIAL_LABEL, CTA_PLAN } from "@/lib/trial";
import PriceBlock from "@/components/PriceBlock";
import Reveal from "@/components/landing/Reveal";

const PLAN = {
  id: "individual",
  sub: "Un plan personalizado para un estudiante",
  monthly: 29900,
  semestral: 119900,
  perks: [
    "Diagnóstico de fortalezas y vacíos matemáticos",
    "Plan ordenado por habilidades y prerrequisitos",
    "Sesiones cortas adaptadas al progreso",
    "Dominio y confianza visibles por habilidad",
    "Repasos para no olvidar lo aprendido",
  ],
};

const BILLINGS = [
  { id: "semestral", label: "Semestral", period: "/semestre", featured: true },
  { id: "monthly", label: "Mensual", period: "/mes", featured: false },
];

export default function Pricing() {
  const { currency, localPrice, localFromUsd } = usePricing();
  const progress = useProgress();
  const ctaHref = progress.onboarding?.done ? "/planes" : "/onboarding";

  return (
    <section id="precios" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-teal">
            Un plan individual, dos formas de pago
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Elige cómo acompañar su progreso
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
            {HAS_TRIAL
              ? `Empieza con ${TRIAL_LABEL} gratis y conserva el progreso del diagnóstico.`
              : "Ambas opciones incluyen diagnóstico, ruta personalizada, práctica y seguimiento."}
          </p>
          <p className="mt-3 text-sm font-semibold text-muted">{PLAN.sub}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {BILLINGS.map((billing, index) => {
            const amount = billing.id === "monthly" ? PLAN.monthly : PLAN.semestral;
            const perMonthEq = billing.id === "semestral" ? Math.round(PLAN.semestral / 6) : null;
            const savings = billing.id === "semestral" ? "Ahorras 33%" : null;

            return (
              <Reveal key={billing.id} delay={index * 140} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft ${
                    billing.featured ? "ring-2 ring-honey" : "border border-ink/5"
                  }`}
                >
                  {billing.featured && (
                    <span className="absolute -top-3 left-6 rounded-full bg-honey px-3 py-1 text-xs font-semibold text-ink">
                      Mejor valor
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-ink">{billing.label}</h3>
                  <p className="text-sm text-muted">Plan individual</p>

                  <PriceBlock
                    amount={amount}
                    perMonthEq={perMonthEq}
                    period={billing.period}
                    savings={savings}
                    currency={currency}
                    localPrice={localPrice}
                    trial={HAS_TRIAL ? TRIAL_LABEL : null}
                    usd={currency ? USD_PRICES.individual[billing.id] : null}
                    usdRef={currency ? localFromUsd(USD_PRICES.individual[billing.id]) : null}
                  />

                  <ul className="mt-5 space-y-2.5 text-sm text-ink">
                    {PLAN.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={ctaHref}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep ${
                      billing.featured
                        ? "bg-honey text-ink hover:bg-honey-deep hover:text-white"
                        : "border border-ink/15 text-ink hover:border-ink/30"
                    }`}
                  >
                    {HAS_TRIAL ? CTA_PLAN : `Elegir plan ${billing.label.toLowerCase()}`}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted">Sin permanencia · Sin publicidad</p>
        {currency && (
          <p className="mt-1 text-center text-xs text-muted">
            {currency === "USD"
              ? "Los precios están en dólares estadounidenses (USD)."
              : "Referencia en tu moneda; el cobro internacional se realiza en dólares (USD)."}
          </p>
        )}
      </div>
    </section>
  );
}
