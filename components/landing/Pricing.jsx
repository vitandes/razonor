"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { usePricing, USD_PRICES } from "@/lib/pricing";
import { HAS_TRIAL, TRIAL_LABEL, CTA_PLAN } from "@/lib/trial";
import PriceBlock from "@/components/PriceBlock";
import Reveal from "@/components/landing/Reveal";

// El toggle elige el TIPO de plan; dentro se muestran dos cobros: Mensual y
// Semestral (el semestral con el mensaje de ahorro).
const PLANS = {
  individual: {
    id: "individual",
    name: "Individual",
    sub: "Para un niño o niña",
    monthly: 49900,
    semestral: 149900,
    perks: [
      "Todos los casos y capítulos del misterio",
      "Panel de padres con progreso por habilidad",
      "Rachas, medallas y mascota acompañante",
    ],
  },
  familiar: {
    id: "familiar",
    name: "Familiar",
    sub: "Hasta 3 hijos",
    monthly: 69900,
    semestral: 199900,
    perks: [
      "Todo lo del plan Individual",
      "Hasta 3 perfiles de niños",
      "Progreso separado por cada hijo",
    ],
  },
};

// El mensual va destacado (igual que /planes): monto de entrada más fácil.
const BILLINGS = [
  { id: "monthly", label: "Mensual", period: "/mes", featured: true },
  { id: "semestral", label: "Semestral", period: "/semestre" },
];

export default function Pricing() {
  const [planType, setPlanType] = useState("individual");
  const { currency, localPrice, localFromUsd } = usePricing();
  const { isSignedIn } = useAuth();
  // sin sesión -> registro (prueba gratis); con sesión -> página de planes
  const ctaHref = isSignedIn ? "/planes" : "/sign-up";
  const plan = PLANS[planType];

  return (
    <section id="precios" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-teal">
            Precios
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Menos que una hora de refuerzo, todos los días
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-muted">
            {HAS_TRIAL
              ? `Empieza con ${TRIAL_LABEL} gratis y cancela cuando quieras.`
              : "Elige tu plan y cancela cuando quieras."}
          </p>

          {/* toggle: tipo de plan */}
          <div className="mt-7 inline-flex items-center gap-1 rounded-full bg-white p-1 shadow-card">
            {Object.values(PLANS).map((pl) => (
              <button
                key={pl.id}
                type="button"
                onClick={() => setPlanType(pl.id)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep ${
                  planType === pl.id ? "bg-ink text-cream" : "text-muted"
                }`}
              >
                {pl.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">{plan.sub}</p>
        </Reveal>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {BILLINGS.map((b, bi) => {
            const amount = b.id === "monthly" ? plan.monthly : plan.semestral;
            const perMonthEq = b.id === "semestral" ? Math.round(plan.semestral / 6) : null;
            const savings = b.id === "semestral" ? "Ahorras 50%" : null;
            return (
              <Reveal key={b.id} delay={bi * 140} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft ${
                  b.featured ? "ring-2 ring-honey" : "border border-ink/5"
                }`}
              >
                {b.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-honey px-3 py-1 text-xs font-semibold text-ink">
                    Recomendado
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold text-ink">{b.label}</h3>
                <p className="text-sm text-muted">Plan {plan.name}</p>

                <PriceBlock
                  amount={amount}
                  perMonthEq={perMonthEq}
                  period={b.period}
                  savings={savings}
                  currency={currency}
                  localPrice={localPrice}
                  trial={HAS_TRIAL ? TRIAL_LABEL : null}
                  usd={currency ? USD_PRICES[plan.id][b.id] : null}
                  usdRef={currency ? localFromUsd(USD_PRICES[plan.id][b.id]) : null}
                />

                <ul className="mt-5 space-y-2.5 text-sm text-ink">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal" aria-hidden="true">
                        ✓
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <Link
                  href={ctaHref}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep ${
                    b.featured
                      ? "bg-honey text-ink hover:bg-honey-deep hover:text-white"
                      : "border border-ink/15 text-ink hover:border-ink/30"
                  }`}
                >
                  {CTA_PLAN}
                </Link>
              </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Sin permanencia
        </p>
        {currency && (
          <p className="mt-1 text-center text-xs text-muted">
            {currency === "USD"
              ? "Los precios están en dólares estadounidenses (USD)."
              : "Precio de referencia en tu moneda · el cobro se realiza en dólares (USD); tu banco hace la conversión."}
          </p>
        )}
      </div>
    </section>
  );
}
