"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Detective from "@/components/Detective";
import { LogoWordmark } from "@/components/Logo";
import KidProfileGate from "@/components/KidProfileGate";
import { useProgress, isSubscribed } from "@/lib/progress";
import {
  worldProgress,
  recommendedCase,
  medals,
  retosSolvedTotal,
  casesCompletedCount,
  chaptersCompletedCount,
} from "@/lib/world";
import { playerLevelFromXp, rankTitle } from "@/lib/leveling";

export default function KidHome() {
  const p = useProgress();
  const router = useRouter();

  // Pantalla de selección de perfil (solo plan Familiar).
  const [picking, setPicking] = useState(true);
  function enterApp() {
    setPicking(false);
  }

  // ¿Volvemos del checkout de Mercado Pago? Esperamos al webhook antes del paywall.
  const [returningFromCheckout] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("checkout") === "return";
  });
  const [verifying, setVerifying] = useState(returningFromCheckout);

  useEffect(() => {
    if (!returningFromCheckout || !p.serverLoaded) return;
    let active = true;
    (async () => {
      for (let i = 0; i < 6 && active; i++) {
        const status = await p.refreshSubscription();
        if (status === "active") break;
        await new Promise((r) => setTimeout(r, 2000));
      }
      if (active) setVerifying(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returningFromCheckout, p.serverLoaded]);

  // Rutas: con suscripción se queda; sin onboarding → /onboarding; con
  // onboarding pero sin suscripción → /planes (paywall).
  useEffect(() => {
    if (p.serverLoaded) {
      if (isSubscribed(p.subscription)) return;
      if (verifying) return;
      if (!p.onboarding?.done) {
        router.replace("/onboarding");
      } else {
        router.replace(returningFromCheckout ? "/planes?pago=fallido" : "/planes");
      }
    }
  }, [p.serverLoaded, p.subscription, p.onboarding?.done, verifying, returningFromCheckout, router]);

  // Derivados del mundo
  const { worlds } = worldProgress(p);
  const next = recommendedCase(p);
  const player = playerLevelFromXp(p.xp);
  const rank = rankTitle(player.level);
  const playerPct = Math.round((player.intoLevel / player.xpToNext) * 100);
  const casesDone = casesCompletedCount(p);
  const chaptersDone = chaptersCompletedCount(p);
  const retos = retosSolvedTotal(p);
  const badges = medals({
    casesDone,
    chaptersDone,
    streak: p.streak,
    playerLevel: player.level,
  });

  // FAB móvil: aparece cuando el CTA principal sale de la vista.
  const ctaRef = useRef(null);
  const [showFab, setShowFab] = useState(false);
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [next?.id, picking]);

  if (!p.serverLoaded || !isSubscribed(p.subscription)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-5 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
        {verifying && (
          <p className="text-sm font-medium text-muted">
            Verificando tu pago… esto puede tardar unos segundos.
          </p>
        )}
      </main>
    );
  }

  if (p.isFamiliar && picking) {
    return <KidProfileGate onEnter={enterApp} />;
  }

  return (
    <main className="min-h-screen bg-cream pb-24 sm:pb-16">
      <div className="mx-auto max-w-3xl px-5 pt-6">
        {/* barra superior */}
        <header className="flex items-center justify-between gap-2">
          <Link href="/" className="flex shrink-0 items-center">
            <LogoWordmark size={32} />
          </Link>
          <div className="flex items-center gap-2">
            {p.isFamiliar && (
              <button
                type="button"
                onClick={() => setPicking(true)}
                className="whitespace-nowrap rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-muted shadow-card transition hover:text-ink sm:px-4 sm:py-2 sm:text-sm"
              >
                Cambiar de detective
              </button>
            )}
            <Link
              href="/padres"
              className="whitespace-nowrap rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-muted shadow-card transition hover:text-ink sm:px-4 sm:py-2 sm:text-sm"
            >
              Para papás →
            </Link>
          </div>
        </header>

        {p.hydrated && !p.name && <NamePrompt onSave={p.setName} />}

        {/* HERO: saludo del detective + racha/monedas */}
        <section className="night-sky relative mt-6 overflow-hidden rounded-4xl p-6 shadow-card sm:p-8">
          <div className="relative flex items-center gap-4">
            <Detective size={78} className="shrink-0 animate-floaty" />
            <div className="flex-1">
              <p className="text-sm font-medium text-white/60">
                ¡Hola{p.name ? `, ${p.name}` : ""}, detective!
              </p>
              <h1 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                {casesDone === 0 ? "Tu primer caso te espera" : "¿Resolvemos un caso hoy?"}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                <HeroChip emoji="🔥" value={p.streak} label="de racha" />
                <HeroChip emoji="🗂️" value={casesDone} label="casos" />
                <HeroChip emoji="🧩" value={retos} label="retos" />
              </div>
            </div>
          </div>
        </section>

        {/* NIVEL DE DETECTIVE (XP) */}
        <section className="relative mt-4 overflow-hidden rounded-4xl bg-gradient-to-r from-grape to-honey-deep p-6 text-white shadow-card">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 font-display text-3xl font-bold">
              {player.level}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white/85">
                {rank.emoji} {rank.name}
              </p>
              <p className="font-display text-xl font-semibold leading-tight">
                Detective nivel {player.level}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              ⭐ {p.xp.toLocaleString("es-CO")}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-white/85">
              <span>{player.intoLevel} / {player.xpToNext} ⭐</span>
              <span>faltan {player.xpToNext - player.intoLevel} para el nivel {player.level + 1}</span>
            </div>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${playerPct}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-white/75">
              Ganas ⭐ con cada reto; sin usar pistas ganas más.
            </p>
          </div>
        </section>

        {/* CTA continuar el caso */}
        {next && (
          <Link
            ref={ctaRef}
            href={`/aprendo/caso/${next.id}`}
            className="group mt-4 flex items-center gap-4 rounded-4xl bg-gradient-to-r from-ink to-grape p-5 text-white shadow-soft transition hover:-translate-y-0.5"
          >
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-honey text-3xl shadow-card">
              {next.emoji}
            </span>
            <span className="flex-1">
              <span className="block text-sm text-white/70">
                {casesDone === 0 ? "Empezar a investigar" : "Tu siguiente caso"}
              </span>
              <span className="block font-display text-xl font-semibold">
                {next.title}
              </span>
              <span className="block text-sm text-white/70">
                Capítulo {next.chapter} · {next.minutes} min
              </span>
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-honey text-xl text-night transition group-hover:translate-x-1">
              ▶
            </span>
          </Link>
        )}

        {/* MAPA — organizado por MUNDOS */}
        <section className="mt-8 space-y-8">
          {worlds.map((w) => (
            <WorldBlock key={w.id} world={w} />
          ))}
        </section>

        {/* MEDALLAS */}
        <section className="mt-8 rounded-4xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Medallas</h2>
            <span className="text-sm text-muted">
              {badges.filter((b) => b.earned).length}/{badges.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {badges.map((b) => (
              <div key={b.id} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl transition ${
                    b.earned ? "bg-honey-soft shadow-card" : "bg-cloud opacity-50 grayscale"
                  }`}
                  title={b.label}
                >
                  {b.emoji}
                </span>
                <span className={`text-[10px] leading-tight ${b.earned ? "font-semibold text-ink" : "text-muted"}`}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FAB móvil */}
      {next && (
        <Link
          href={`/aprendo/caso/${next.id}`}
          aria-hidden={!showFab}
          tabIndex={showFab ? 0 : -1}
          className={`fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-night p-2 pr-4 text-white shadow-soft transition-all duration-300 sm:hidden ${
            showFab ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
          }`}
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-honey text-2xl">
            {next.emoji}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] text-white/70">
              {casesDone === 0 ? "Empezar a investigar" : "Tu siguiente caso"}
            </span>
            <span className="block truncate font-display font-semibold">{next.title}</span>
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey text-night">▶</span>
        </Link>
      )}
    </main>
  );
}

function HeroChip({ emoji, value, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur">
      <span aria-hidden="true">{emoji}</span>
      <span className="font-display font-semibold text-white">{value}</span>
      <span className="text-white/60">{label}</span>
    </span>
  );
}

// Un capítulo en el mapa: si está desbloqueado, muestra sus casos como nodos de
// una ruta; si está bloqueado, un teaser "próximamente".
// Sección de un mundo: 3 estados posibles.
//   - unlocked:   con contenido y disponible → banner morado + capítulos
//   - bloqueado:  con contenido pero requiere terminar el anterior → gris
//   - comingSoon: sin contenido aún → teaser especial "próximamente"
function WorldBlock({ world }) {
  if (world.comingSoon) {
    return (
      <div className="relative overflow-hidden rounded-4xl border-2 border-dashed border-grape/30 bg-gradient-to-br from-grape/5 via-honey/5 to-teal/5 p-5">
        <span
          className="pointer-events-none absolute -right-4 -bottom-6 text-8xl opacity-10"
          aria-hidden="true"
        >
          {world.emoji}
        </span>
        <div className="relative flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl shadow-card">
            {world.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-grape">
                Mundo {world.id}
              </p>
              <span className="rounded-full bg-grape px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                ✨ Próximamente
              </span>
            </div>
            <p className="font-display text-lg font-bold leading-tight text-ink">
              {world.title}
            </p>
            <p className="text-xs text-muted">{world.subtitle}</p>
          </div>
        </div>
        <p className="relative mt-3 text-sm leading-relaxed text-muted">
          {world.intro}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex items-center gap-3 rounded-4xl p-4 ${
          world.unlocked
            ? "bg-gradient-to-r from-ink to-grape text-white shadow-card"
            : "border-2 border-dashed border-ink/15 bg-white/40 text-muted"
        }`}
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-3xl">
          {world.unlocked ? world.emoji : "🔒"}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              world.unlocked ? "text-white/60" : "text-muted"
            }`}
          >
            Mundo {world.id}
          </p>
          <p className="font-display text-lg font-bold leading-tight">
            {world.title}
          </p>
          <p
            className={`text-xs ${
              world.unlocked ? "text-white/70" : "text-muted"
            }`}
          >
            {world.unlocked
              ? `${world.chaptersDone}/${world.chaptersTotal} capítulos · ${world.subtitle}`
              : "Termina el mundo anterior para desbloquear"}
          </p>
        </div>
        {world.worldDone && (
          <span className="shrink-0 rounded-full bg-honey px-3 py-1 text-xs font-bold text-night">
            ✓ Completado
          </span>
        )}
      </div>

      {world.unlocked && (
        <div className="mt-3 space-y-3">
          {world.chapters.map((ch) => (
            <ChapterBlock key={ch.id} chapter={ch} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChapterBlock({ chapter }) {
  if (chapter.locked || chapter.total === 0) {
    return (
      <div className="flex items-center gap-4 rounded-4xl border-2 border-dashed border-ink/10 bg-white/50 p-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cloud text-2xl opacity-60 grayscale">
          {chapter.emoji}
        </span>
        <div className="flex-1">
          <p className="font-display font-semibold text-muted">
            Capítulo {chapter.id} · {chapter.title}
          </p>
          <p className="text-sm text-muted">🔒 Próximamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-4xl bg-white p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-honey-soft text-xl">
          {chapter.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold leading-tight text-ink">
            Capítulo {chapter.id} · {chapter.title}
          </p>
          <p className="text-xs text-muted">{chapter.done}/{chapter.total} casos resueltos</p>
        </div>
        {chapter.medal && (
          <span className="shrink-0 rounded-full bg-honey px-3 py-1 text-xs font-bold text-night" title="Capítulo resuelto">
            🏅 Medalla
          </span>
        )}
      </div>

      {/* casos como pasos de una ruta */}
      <ol className="mt-4 space-y-2.5">
        {chapter.cases.map((cs) => (
          <li key={cs.id}>
            {cs.unlocked ? (
              <Link
                href={`/aprendo/caso/${cs.id}`}
                className="group flex items-center gap-3 rounded-3xl bg-cream p-3 ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-card">
                  {cs.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-semibold leading-tight text-ink">
                    {cs.title}
                  </span>
                  {/* puntitos de progreso dentro del caso: ● ● ○ ○ ○ */}
                  <span
                    className="mt-1 flex items-center gap-1"
                    aria-label={`${cs.partial} de ${cs.retosTotal} retos`}
                  >
                    {Array.from({ length: cs.retosTotal }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${
                          i < cs.partial
                            ? cs.completed
                              ? "bg-teal"
                              : "bg-honey"
                            : "bg-ink/15"
                        }`}
                      />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-muted">
                    {cs.completed
                      ? "Resuelto · jugar otra vez ↻"
                      : cs.partial > 0
                        ? `Continuar · ${cs.partial}/${cs.retosTotal} retos`
                        : `${cs.retosTotal} retos · ${cs.minutes} min`}
                  </span>
                </span>
                {cs.completed ? (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal text-sm text-white shadow-card">✓</span>
                ) : (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey text-night transition group-hover:translate-x-1">▶</span>
                )}
              </Link>
            ) : (
              <div className="flex items-center gap-3 rounded-3xl bg-cloud/60 p-3 opacity-70">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/70 text-2xl grayscale">
                  {cs.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-semibold leading-tight text-muted">
                    {cs.title}
                  </span>
                  <span className="block text-xs text-muted">🔒 Resuelve el caso anterior</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function NamePrompt({ onSave }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSave(value);
      }}
      className="mt-6 flex flex-col items-start gap-3 rounded-4xl bg-white p-6 shadow-card sm:flex-row sm:items-center"
    >
      <Detective size={56} className="shrink-0" />
      <div className="flex-1">
        <p className="font-display text-lg font-semibold text-ink">
          ¡Hola! Soy Razo, tu detective. ¿Cómo te llamas?
        </p>
        <p className="text-sm text-muted">Así te saludo cada vez que entres.</p>
      </div>
      <div className="flex w-full gap-2 sm:w-auto">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={24}
          placeholder="Tu nombre"
          aria-label="Tu nombre"
          className="w-full rounded-full border-2 border-ink/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-honey sm:w-44"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="shrink-0 rounded-full bg-honey px-5 py-2.5 font-semibold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40"
        >
          Listo
        </button>
      </div>
    </form>
  );
}
