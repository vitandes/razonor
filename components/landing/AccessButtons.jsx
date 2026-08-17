"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { TrialButton } from "@/components/landing/bits";
import { CTA_START } from "@/lib/trial";
import { isSubscribed, useProgress } from "@/lib/progress";

// Botones de la landing según el estado de sesión (Clerk):
// - sin sesión  -> CTA para empezar (lleva a registro) + reversa de riesgo
// - con sesión  -> accesos a la app (estudiante / padre) + cuenta
// `dark`: estilos para fondos noche (header y hero oscuros).
export default function AccessButtons({
  context = "hero",
  dark = false,
  trialLabel = CTA_START,
}) {
  const progress = useProgress();
  const subscribed = progress.hydrated && isSubscribed(progress.subscription);
  const memberHref = subscribed
    ? "/aprendo"
    : progress.onboarding?.done
      ? "/planes"
      : "/onboarding";
  const memberLabel = subscribed
    ? "Entrar a la app"
    : progress.onboarding?.done
      ? "Elegir plan"
      : "Configurar su plan";
  // ---------- HEADER ----------
  if (context === "header") {
    return (
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <Link
            href="/sign-in"
            className={`hidden text-sm font-semibold transition sm:block ${
              dark ? "text-white/60 hover:text-white" : "text-muted hover:text-ink"
            }`}
          >
            Iniciar sesión
          </Link>
          <TrialButton size="sm">{trialLabel}</TrialButton>
        </Show>
        <Show when="signed-in">
          <Link
            href={memberHref}
            className="rounded-full bg-honey px-4 py-2.5 text-sm font-bold text-night shadow-card transition hover:bg-honey-deep hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
          >
            {memberLabel}
          </Link>
          <UserButton />
        </Show>
      </div>
    );
  }

  // ---------- HERO / CIERRE ----------
  const parentCls = dark
    ? "border-2 border-white/25 text-white hover:border-white/50"
    : "border-2 border-ink/15 text-ink hover:border-ink/30";

  return (
    <>
      <Show when="signed-out">
        <TrialButton size="lg">{trialLabel}</TrialButton>
      </Show>
      <Show when="signed-in">
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={memberHref}
            className="inline-flex items-center justify-center rounded-full bg-honey px-7 py-3.5 font-display text-base font-bold text-night shadow-card transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey"
          >
            {subscribed ? "Entrar como estudiante" : memberLabel}
          </Link>
          {subscribed && (
            <Link
              href="/padres"
              className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 font-display text-base font-bold transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey ${parentCls}`}
            >
              Entrar como padre
            </Link>
          )}
        </div>
      </Show>
    </>
  );
}
