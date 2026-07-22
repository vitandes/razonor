"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";
import { useProgress, isSubscribed } from "@/lib/progress";
import { usePricing, formatCop, formatUsd, USD_PRICES } from "@/lib/pricing";
import { HAS_TRIAL, TRIAL_LABEL, CTA_PLAN } from "@/lib/trial";
import { trackMeta } from "@/lib/meta";
import { trackTikTok } from "@/lib/tiktok";
import PriceBlock from "@/components/PriceBlock";

// El toggle elige el TIPO de plan; dentro de cada uno se muestran dos opciones
// de cobro: Mensual y Semestral (cada 6 meses, con el mensaje de ahorro).
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

// El mensual va destacado: su monto (49.900) aprueba mucho más fácil en
// tarjetas débito que el semestral (149.900), que venía fallando por fondos.
const BILLINGS = [
  { id: "monthly", label: "Mensual", period: "/mes", featured: true },
  { id: "semestral", label: "Semestral", period: "/semestre" },
];

export default function Planes() {
  const [planType, setPlanType] = useState("individual");
  const [loading, setLoading] = useState(null); // id del cobro en proceso
  const [error, setError] = useState(null);
  // Modal de confirmación de moneda (solo para usuarios de otros países).
  const [confirming, setConfirming] = useState(null); // { planId, billing, amount } | null
  // ¿Viene de un pago que el banco rechazó? (checkout failure / verificación sin éxito)
  const [paymentFailed] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("pago") === "fallido";
  });
  const { currency, localPrice, localFromUsd } = usePricing();
  const router = useRouter();
  const { hydrated, subscription, name } = useProgress();
  const subscribed = hydrated && isSubscribed(subscription);
  const kid = hydrated && name ? name : null;
  const plan = PLANS[planType];

  // Checkout INTERNACIONAL: Lemon Squeezy en dólares (USD). El acceso lo
  // activa solo el webhook de LS.
  async function handleStartIntl(planId, billing) {
    setLoading(billing);
    setError(null);
    const usdAmount = USD_PRICES[planId][billing];
    try {
      const res = await fetch("/api/ls/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, billing }),
      });
      if (res.ok) {
        const { url } = await res.json();
        if (url) {
          trackMeta("InitiateCheckout", {
            value: usdAmount,
            currency: "USD",
            content_name: `${planId}-${billing}`,
          });
          trackTikTok("InitiateCheckout", {
            value: usdAmount,
            currency: "USD",
            content_type: "product",
            content_id: `${planId}-${billing}`,
            content_name: `${planId}-${billing}`,
          });
          window.location.href = url; // a Lemon Squeezy
          return;
        }
      }
      setError("No pudimos abrir el checkout. Inténtalo de nuevo.");
    } catch {
      setError("No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.");
    }
    setLoading(null);
  }

  // Abre el checkout de suscripción de Mercado Pago (tarjeta + prueba gratis;
  // el primer cobro ocurre al terminar la prueba).
  // El acceso NUNCA se otorga desde el cliente: solo el webhook de MP (tras
  // pagar) o el dueño desde la base de datos cambian la suscripción.
  async function handleStart(planId, billing) {
    // Fuera de Colombia el cobro va por Lemon Squeezy en USD.
    if (currency) return handleStartIntl(planId, billing);
    setLoading(billing);
    setError(null);
    const amount = billing === "monthly" ? PLANS[planId].monthly : PLANS[planId].semestral;
    try {
      const res = await fetch("/api/mp/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId,
          billing,
          deviceId: typeof window !== "undefined" ? window.MP_DEVICE_SESSION_ID : undefined,
        }),
      });
      if (res.ok) {
        const { init_point } = await res.json();
        if (init_point) {
          // Disparamos InitiateCheckout SOLO cuando MP de verdad abre (no en el
          // clic), para que la métrica y la optimización de ads sean fieles.
          trackMeta("InitiateCheckout", {
            value: amount,
            currency: "COP",
            content_name: `${planId}-${billing}`,
          });
          trackTikTok("InitiateCheckout", {
            value: amount,
            currency: "COP",
            content_type: "product",
            content_id: `${planId}-${billing}`,
            content_name: `${planId}-${billing}`,
          });
          window.location.href = init_point; // a Mercado Pago
          return;
        }
      }
      setError("No pudimos abrir el checkout de Mercado Pago. Inténtalo de nuevo.");
    } catch {
      setError("No pudimos conectar con Mercado Pago. Revisa tu conexión e inténtalo de nuevo.");
    }
    setLoading(null);
  }

  return (
    <main className="min-h-screen bg-cream pb-16">
      <div className="mx-auto max-w-3xl px-5 pt-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <LogoWordmark size={36} />
          </Link>
          <Link href="/padres" className="text-sm font-medium text-muted hover:text-ink">
            ← Volver
          </Link>
        </header>

        {/* aviso tras un pago que el banco no aprobó */}
        {paymentFailed && !subscribed && (
          <div className="mx-auto mt-6 max-w-md animate-pop rounded-3xl border border-coral/30 bg-coral-soft px-5 py-4 text-center">
            <p className="font-display font-semibold text-ink">
              Tu banco no aprobó el pago 😕
            </p>
            <p className="mt-1 text-sm text-ink/80">
              Suele pasar por saldo o límites de la tarjeta. Prueba con otra
              tarjeta, o empieza con el <strong>plan mensual</strong>: es el que
              más fácil aprueba.
            </p>
          </div>
        )}

        <section className="mt-8 text-center">
          {kid && (
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
              El plan ideal para {kid}
            </p>
          )}
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {kid
              ? HAS_TRIAL
                ? `Empieza la prueba gratis de ${kid}`
                : `Elige el plan de ${kid}`
              : "Un caso nuevo para su mente, todos los días"}
          </h1>
          {HAS_TRIAL && (
            <p className="mt-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-soft px-4 py-2 text-sm font-semibold text-teal">
                🎁 {TRIAL_LABEL} gratis — hoy pagas $0
              </span>
            </p>
          )}
          <p className="mx-auto mt-3 max-w-md text-muted">
            Menos de lo que cuesta una hora de refuerzo escolar · cancela cuando
            quieras.
          </p>

          {/* toggle: tipo de plan */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-white p-1 shadow-card">
            {Object.values(PLANS).map((pl) => (
              <button
                key={pl.id}
                onClick={() => setPlanType(pl.id)}
                className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                  planType === pl.id ? "bg-ink text-cream" : "text-muted"
                }`}
              >
                {pl.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">{plan.sub}</p>
        </section>

        {/* dos opciones de cobro del plan elegido */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          {BILLINGS.map((b) => {
            const amount = b.id === "monthly" ? plan.monthly : plan.semestral;
            const perMonthEq = b.id === "semestral" ? Math.round(plan.semestral / 6) : null;
            const savings = b.id === "semestral" ? "Ahorras 50%" : null;
            return (
              <div
                key={b.id}
                className={`relative flex flex-col rounded-4xl bg-white p-6 shadow-card ${
                  b.featured ? "ring-2 ring-honey" : "border border-ink/5"
                }`}
              >
                {b.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-honey px-3 py-1 text-xs font-semibold text-ink">
                    Recomendado
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold text-ink">{b.label}</h2>
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
                      <span className="mt-0.5 text-teal">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={loading === b.id}
                  onClick={() => {
                    if (subscribed) {
                      router.push("/aprendo");
                    } else if (currency && currency !== "USD") {
                      // Extranjero con OTRA moneda: confirmamos que el cobro es
                      // en USD antes de ir al checkout. Si su moneda ya es USD
                      // (EE.UU., Ecuador, Panamá…) no hay nada que aclarar.
                      setConfirming({ planId: plan.id, billing: b.id, amount });
                    } else {
                      // Colombia -> Mercado Pago (COP) · país USD -> Lemon Squeezy directo.
                      handleStart(plan.id, b.id);
                    }
                  }}
                  className={`mt-6 w-full rounded-full px-6 py-3.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                    b.featured
                      ? "bg-honey text-ink hover:bg-honey-deep hover:text-white"
                      : "border border-ink/15 text-ink hover:border-ink/30"
                  }`}
                >
                  {loading === b.id
                    ? "Redirigiendo…"
                    : subscribed
                      ? "Entrar a la app"
                      : CTA_PLAN}
                </button>
                {!subscribed && HAS_TRIAL && (
                  <p className="mt-2 text-center text-xs text-muted">
                    Hoy no pagas nada · si cancelas durante la prueba, no se te
                    cobra
                  </p>
                )}
              </div>
            );
          })}
        </section>

        {error && (
          <p className="mx-auto mt-6 max-w-md rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-center text-sm font-medium text-coral">
            {error}
          </p>
        )}

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-2 text-center">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            <span aria-hidden="true">🔒</span> Pago 100% seguro con{" "}
            {currency ? "Lemon Squeezy" : "Mercado Pago"}
          </p>
          <p className="text-xs leading-relaxed text-muted">
            Aceptamos tarjeta de crédito y débito. Sin permanencia ni cláusulas:
            cancela cuando quieras, sin llamadas ni letra pequeña.
          </p>
          <p className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted">
            <span>🛡️ Sin publicidad</span>
            <span>🚫 Sin chats con desconocidos</span>
            <span>🧒 Privacidad infantil</span>
          </p>
        </div>
        {currency && (
          <p className="mt-1 text-center text-xs text-muted">
            {currency === "USD"
              ? "Los precios están en dólares estadounidenses (USD)."
              : "Precio de referencia en tu moneda · el cobro se realiza en dólares (USD); tu banco hace la conversión."}
          </p>
        )}
      </div>

      {/* Confirmación de moneda para usuarios de otros países (antes de ir a MP) */}
      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-5"
          onClick={() => loading || setConfirming(null)}
        >
          <div
            className="w-full max-w-sm rounded-4xl bg-white p-6 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-semibold text-ink">
              Tu pago se procesa en dólares (USD)
            </h3>
            <p className="mt-1 text-sm text-muted">
              Plan {PLANS[confirming.planId].name} ·{" "}
              {confirming.billing === "monthly" ? "mensual" : "semestral"}
            </p>

            <div className="mt-4 rounded-2xl bg-cream p-4 text-center">
              <div className="font-display text-2xl font-semibold text-ink">
                {formatUsd(USD_PRICES[confirming.planId][confirming.billing])}
              </div>
              {localFromUsd(USD_PRICES[confirming.planId][confirming.billing]) && (
                <div className="text-sm text-muted">
                  ≈ {localFromUsd(USD_PRICES[confirming.planId][confirming.billing])}
                </div>
              )}
            </div>

            <p className="mt-3 text-sm text-muted">
              El cobro es en dólares estadounidenses (USD) y tu banco hace la
              conversión automática a tu moneda. Pago seguro procesado por Lemon
              Squeezy; cancela cuando quieras.
            </p>

            {error && (
              <p className="mt-3 rounded-2xl border border-coral/30 bg-coral/10 px-3 py-2 text-center text-sm font-medium text-coral">
                {error}
              </p>
            )}

            <div className="mt-5 flex gap-2">
              <button
                disabled={loading === confirming.billing}
                onClick={() => handleStart(confirming.planId, confirming.billing)}
                className="flex-1 rounded-full bg-honey px-5 py-3 font-semibold text-ink transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading === confirming.billing ? "Redirigiendo…" : "Continuar al pago"}
              </button>
              <button
                disabled={loading === confirming.billing}
                onClick={() => setConfirming(null)}
                className="rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-muted transition hover:text-ink disabled:opacity-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
