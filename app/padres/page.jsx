"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { LogoWordmark } from "@/components/Logo";
import Detective from "@/components/Detective";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import WeeklyWrapped from "@/components/WeeklyWrapped";
import { CountUp } from "@/components/fx";
import {
  PRODUCT_SKILLS,
  productSkillPercents,
  summarizeProductSkills,
  retosSolvedTotal,
  casesCompletedCount,
  chaptersCompletedCount,
} from "@/lib/world";
import { useProgress, weeklyMinutes, isSubscribed } from "@/lib/progress";
import { playerLevelFromXp, rankTitle } from "@/lib/leveling";

const BAR = { teal: "bg-teal", grape: "bg-grape", coral: "bg-coral", honey: "bg-honey" };
const SKILL_IDS = Object.keys(PRODUCT_SKILLS);

export default function ParentReport() {
  const p = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (p.serverLoaded) {
      if (isSubscribed(p.subscription)) return;
      if (!p.onboarding?.done) {
        router.replace("/onboarding");
      } else {
        router.replace("/planes");
      }
    }
  }, [p.serverLoaded, p.subscription, p.onboarding?.done, router]);

  // Derivados
  const percents = productSkillPercents(p.skills);
  const { values, labels } = weeklyMinutes(p.minutes);
  const totalMin = values.reduce((a, b) => a + b, 0);
  const maxMin = Math.max(...values, 1);
  const retos = retosSolvedTotal(p);
  const casesDone = casesCompletedCount(p);
  const chaptersDone = chaptersCompletedCount(p);
  const player = playerLevelFromXp(p.xp);
  const rank = rankTitle(player.level);
  const name = p.name || "Tu hijo";
  const hasActivity = casesDone > 0 || totalMin > 0;

  const [wrappedOpen, setWrappedOpen] = useState(false);

  if (!p.hydrated) {
    return (
      <main className="grid min-h-screen place-items-center bg-cloud">
        <Detective size={72} className="animate-floaty" />
      </main>
    );
  }

  if (!p.serverLoaded || !isSubscribed(p.subscription)) {
    return (
      <main className="grid min-h-screen place-items-center bg-cloud">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-grape" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cloud pb-16">
      <div className="mx-auto max-w-2xl px-5 pt-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <LogoWordmark size={34} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-semibold text-muted sm:block">Área de padres</span>
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-teal-soft ring-2 ring-white shadow-card">
              <Image src="/assets/ui/avatars/optimized/avatar-parent-guide.webp" alt="Guía del área de padres" width={40} height={40} className="h-full w-full object-contain" />
            </span>
            <UserButton />
          </div>
        </header>

        <ProfileSwitcher label="Panel de:" />

        {!hasActivity && (
          <div className="mt-5 rounded-4xl border border-honey/30 bg-honey-soft px-6 py-5 text-center text-sm text-ink">
            Aún no hay actividad. Cuando {name} resuelva su primer caso, aquí verás
            su progreso real por habilidad.
          </div>
        )}

        {hasActivity && (
          <button
            onClick={() => setWrappedOpen(true)}
            className="group relative mt-5 block w-full overflow-hidden rounded-4xl bg-gradient-to-r from-grape via-coral to-honey p-[2px] shadow-soft transition hover:scale-[1.01]"
          >
            <span className="flex items-center justify-between gap-3 rounded-[calc(1.25rem-2px)] bg-night px-6 py-4 text-left">
              <span className="flex items-center gap-3">
                <Detective size={40} className="shrink-0 transition group-hover:rotate-6" />
                <span>
                  <span className="block font-display text-lg font-semibold text-white">
                    ✨ Ver la semana de {name}
                  </span>
                  <span className="block text-sm text-white/60">
                    Su resumen animado · 30 segundos
                  </span>
                </span>
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </button>
        )}

        {/* tarjeta-panel (diseñada para captura de pantalla) */}
        <section className="mt-5 overflow-hidden rounded-4xl bg-white shadow-soft">
          <div className="border-b border-ink/5 px-6 py-5 sm:px-8">
            <p className="flex items-center gap-2 text-sm text-muted"><span className="h-2 w-2 rounded-full bg-teal" />Panel de padres · esta semana</p>
            <h1 className="font-display text-2xl font-bold text-ink">
              {name} · {retos} {retos === 1 ? "reto resuelto" : "retos resueltos"}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-grape-soft px-3 py-1 text-sm font-semibold text-grape">
                {rank.emoji} {rank.name}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-honey-soft px-3 py-1 text-sm font-semibold text-honey-deep">
                🏅 {chaptersDone} {chaptersDone === 1 ? "capítulo" : "capítulos"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-soft px-3 py-1 text-sm font-semibold text-coral">
                🔥 {p.streak} {p.streak === 1 ? "día" : "días"} de racha
              </span>
            </div>
          </div>

          {/* stats rápidas */}
          <div className="grid grid-cols-3 gap-3 px-6 py-6 sm:px-8">
            <BigStat value={retos} label="retos resueltos" />
            <BigStat value={casesDone} label="casos cerrados" />
            <BigStat value={p.streak} label="racha (días)" />
          </div>

          {/* recomendación en lenguaje claro */}
          <div className="border-t border-ink/5 px-6 py-6 sm:px-8">
            <p className="font-display text-lg font-semibold leading-snug text-ink">
              {summarizeProductSkills(percents, p.name)}
            </p>
          </div>

          {/* habilidades */}
          <div className="space-y-5 border-t border-ink/5 px-6 py-7 sm:px-8">
            <h2 className="font-display text-base font-semibold text-ink">
              Fortalezas por habilidad
            </h2>
            {SKILL_IDS.map((id) => {
              const info = PRODUCT_SKILLS[id];
              const val = percents[id];
              return (
                <div key={id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${BAR[info.color]}`} />
                      <span className="font-semibold text-ink">{info.name}</span>
                    </div>
                    <span className="font-display font-semibold text-ink">{val}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-cloud">
                    <div
                      className={`h-full rounded-full ${BAR[info.color]} transition-all`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-sm text-muted">{info.desc}</p>
                </div>
              );
            })}

          </div>

          {/* actividad semanal */}
          <div className="border-t border-ink/5 px-6 py-7 sm:px-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Actividad esta semana
              </h2>
              <span className="text-sm text-muted">
                {totalMin} min · {p.streak} días seguidos 🔥
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-2">
              {values.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end">
                    <div
                      className="w-full rounded-t-lg bg-honey"
                      style={{ height: `${Math.max((m / maxMin) * 100, m > 0 ? 8 : 3)}%` }}
                      title={`${m} min`}
                    />
                  </div>
                  <span className="text-xs text-muted">{labels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream px-6 py-4 text-center text-sm text-muted sm:px-8">
            Con Razonor · {p.xp.toLocaleString("es-CO")} ⭐ en total
          </div>
        </section>
      </div>

      <WeeklyWrapped
        open={wrappedOpen}
        onClose={() => setWrappedOpen(false)}
        data={{
          name: p.name || null,
          retos,
          casesDone,
          totalMin,
          weekValues: values,
          weekLabels: labels,
          streak: p.streak,
          percents,
          playerLevel: player.level,
          rank,
          xp: p.xp,
        }}
      />
    </main>
  );
}

function BigStat({ value, label }) {
  return (
    <div className="rounded-3xl bg-cloud px-3 py-4 text-center">
      <div className="font-display text-2xl font-bold text-ink">
        <CountUp to={value} duration={1000} />
      </div>
      <div className="mt-0.5 text-xs text-muted">{label}</div>
    </div>
  );
}
