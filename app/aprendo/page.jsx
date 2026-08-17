"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
import { reusableAssetsForCase } from "@/lib/visualCatalog";

const CHAPTER_ART = {
  1: "/assets/cases/c1-noche/optimized/hero-museum-night.webp",
  2: "/assets/cases/c2-robot/optimized/hero-robot-museum.webp",
  3: "/assets/cases/c3-faro/optimized/hero-coded-lighthouse.webp",
  4: "/assets/cases/c4-train/optimized/hero-midnight-train.webp",
};

function artworkForCase(caseData) {
  if (!caseData?.chapter) return null;
  return CHAPTER_ART[caseData.chapter] || reusableAssetsForCase(caseData).hero;
}

export default function KidHome() {
  const p = useProgress();
  const router = useRouter();
  const [picking, setPicking] = useState(true);
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      if (active) setVerifying(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returningFromCheckout, p.serverLoaded]);

  useEffect(() => {
    if (!p.serverLoaded || isSubscribed(p.subscription) || verifying) return;
    if (!p.onboarding?.done) router.replace("/onboarding");
    else router.replace(returningFromCheckout ? "/planes?pago=fallido" : "/planes");
  }, [p.serverLoaded, p.subscription, p.onboarding?.done, verifying, returningFromCheckout, router]);

  const { worlds } = worldProgress(p);
  const next = recommendedCase(p);
  const player = playerLevelFromXp(p.xp);
  const rank = rankTitle(player.level);
  const playerPct = Math.round((player.intoLevel / player.xpToNext) * 100);
  const casesDone = casesCompletedCount(p);
  const chaptersDone = chaptersCompletedCount(p);
  const retos = retosSolvedTotal(p);
  const badges = medals({ casesDone, chaptersDone, streak: p.streak, playerLevel: player.level });
  const nextArtwork = artworkForCase(next);
  const playableWorlds = worlds.filter((world) => !world.comingSoon);
  const currentWorld = playableWorlds.find((world) => !world.worldDone) || playableWorlds.at(-1);
  const activeWorlds = playableWorlds.filter((world) => world.worldDone || world.id === currentWorld?.id);
  const activeWorldIds = new Set(activeWorlds.map((world) => world.id));
  const futureWorlds = worlds.filter((world) => !activeWorldIds.has(world.id));

  const ctaRef = useRef(null);
  const [showFab, setShowFab] = useState(false);
  useEffect(() => {
    const element = ctaRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [next?.id, picking]);

  if (!p.serverLoaded || !isSubscribed(p.subscription)) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-5 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
        {verifying && <p className="text-sm font-medium text-muted">Verificando tu pago… esto puede tardar unos segundos.</p>}
      </main>
    );
  }

  if (p.isFamiliar && picking) return <KidProfileGate onEnter={() => setPicking(false)} />;

  return (
    <main className="min-h-screen bg-[#f8f5ee] pb-24 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
        <header className="flex items-center justify-between gap-3">
          <Link href="/" className="flex shrink-0 items-center"><LogoWordmark size={34} /></Link>
          <div className="flex items-center gap-2">
            {p.isFamiliar && (
              <button type="button" onClick={() => setPicking(true)} className="hidden rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-muted shadow-card transition hover:text-ink sm:block">
                Cambiar detective
              </button>
            )}
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-honey-soft ring-2 ring-white shadow-card" title={`Perfil de ${p.name || "detective"}`}>
              <Image src="/assets/ui/avatars/optimized/avatar-child-detective.webp" alt="Perfil del niño detective" width={44} height={44} className="h-full w-full object-contain" />
            </span>
            <Link href="/padres" className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold text-ink shadow-card transition hover:border-honey sm:pr-4 sm:text-sm">
              <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-teal-soft">
                <Image src="/assets/ui/avatars/optimized/avatar-parent-guide.webp" alt="" width={32} height={32} className="h-full w-full object-contain" aria-hidden="true" />
              </span>
              <span>Para papás</span> <span aria-hidden="true">→</span>
            </Link>
          </div>
        </header>

        {p.hydrated && !p.name && <NamePrompt onSave={p.setName} />}

        {next && (
          <section className="relative mt-5 min-h-[470px] overflow-hidden rounded-[2rem] bg-night shadow-soft sm:min-h-[430px] lg:min-h-[350px]">
            {nextArtwork ? (
              <Image src={nextArtwork} alt="Escena del siguiente caso" fill priority sizes="(max-width: 768px) 100vw, 1152px" className="object-cover object-center lg:object-[68%_center]" />
            ) : (
              <span className="absolute inset-y-0 right-0 grid w-full place-items-center bg-gradient-to-br from-grape/60 to-night text-[10rem] opacity-70 lg:w-1/2" aria-hidden="true">{next.emoji}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/25 lg:bg-gradient-to-r lg:from-night lg:via-night/90 lg:to-night/10" />
            <div className="relative flex min-h-[470px] max-w-2xl flex-col justify-end p-5 text-white sm:min-h-[430px] sm:p-8 lg:min-h-[350px] lg:justify-center lg:p-10">
              <p className="text-sm font-semibold text-white/70">¡Hola{p.name ? `, ${p.name}` : ""}, detective!</p>
              <p className="mt-5 font-display text-sm font-extrabold uppercase tracking-[0.16em] text-honey lg:mt-4">Tu siguiente misión</p>
              <h1 className="mt-1 font-display text-4xl font-bold leading-none sm:text-5xl">{next.title}</h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">Capítulo {next.chapter} · {next.minutes} min · Resuelve pistas y demuestra tu criterio.</p>
              <Link ref={ctaRef} href={`/aprendo/caso/${next.id}`} className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:-translate-y-0.5 hover:bg-honey-deep hover:text-white sm:w-fit">
                <span aria-hidden="true">{next.emoji}</span>
                {casesDone === 0 ? "Empezar caso" : "Continuar caso"}
                <span aria-hidden="true">→</span>
              </Link>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4">
                <HeroStat emoji="🔥" value={p.streak} label="de racha" />
                <HeroStat emoji="🗂️" value={casesDone} label="casos" />
                <HeroStat emoji="🧩" value={retos} label="retos" />
              </div>
            </div>
          </section>
        )}

        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_310px]">
          <section className="min-w-0 rounded-[2rem] border border-ink/5 bg-white/70 p-3 shadow-card sm:p-5">
            <div className="flex items-center gap-3 px-2 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-night text-xl" aria-hidden="true">🧭</span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">Tu ruta de detective</h2>
                <p className="text-sm text-muted">Continúa tu expediente o vuelve a practicar un caso.</p>
              </div>
            </div>

            <div className="space-y-6">
              {activeWorlds.map((world) => <WorldBlock key={world.id} world={world} />)}
            </div>

            {futureWorlds.length > 0 && <FutureWorlds worlds={futureWorlds} />}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-5">
            <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-grape via-[#7760de] to-honey-deep p-5 text-white shadow-soft">
              <div className="flex items-start gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 font-display text-2xl font-bold">{player.level}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white/75">{rank.emoji} {rank.name}</p>
                  <h2 className="font-display text-lg font-bold">Detective nivel {player.level}</h2>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold">⭐ {p.xp.toLocaleString("es-CO")}</span>
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-white/85"><span>{player.intoLevel} / {player.xpToNext} ⭐</span><span>nivel {player.level + 1}</span></div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${playerPct}%` }} /></div>
              <p className="mt-3 text-xs leading-relaxed text-white/75">Completa retos y usa menos pistas para avanzar más rápido.</p>
            </section>

            <section className="grid grid-cols-3 divide-x divide-ink/10 rounded-[2rem] bg-white p-4 shadow-card">
              <MiniStat emoji="🔥" value={p.streak} label="racha" />
              <MiniStat emoji="🗂️" value={casesDone} label="casos" />
              <MiniStat emoji="🧩" value={retos} label="retos" />
            </section>

            <section className="rounded-[2rem] bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-ink">Medallas</h2>
                <span className="rounded-full bg-cloud px-2.5 py-1 text-xs font-bold text-muted">{badges.filter((badge) => badge.earned).length}/{badges.length}</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 lg:grid-cols-3">
                {badges.slice(0, 6).map((badge) => (
                  <div key={badge.id} className="text-center">
                    <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl text-2xl ${badge.earned ? "bg-honey-soft shadow-card" : "bg-cloud opacity-45 grayscale"}`} title={badge.label}>{badge.earned ? badge.emoji : "🔒"}</span>
                    <span className="mt-1.5 block text-[10px] font-semibold leading-tight text-muted">{badge.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {next && (
        <Link href={`/aprendo/caso/${next.id}`} aria-hidden={!showFab} tabIndex={showFab ? 0 : -1} className={`fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-night p-2 pr-3 text-white shadow-soft transition-all duration-300 sm:hidden ${showFab ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-honey text-2xl">{next.emoji}</span>
          <span className="min-w-0 flex-1"><span className="block text-[11px] text-white/65">Tu siguiente misión</span><span className="block truncate font-display font-bold">{next.title}</span></span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey font-bold text-night">→</span>
        </Link>
      )}
    </main>
  );
}

function HeroStat({ emoji, value, label }) {
  return <span className="inline-flex items-center gap-1.5 text-sm text-white/70"><span aria-hidden="true">{emoji}</span><strong className="font-display text-white">{value}</strong>{label}</span>;
}

function MiniStat({ emoji, value, label }) {
  return <div className="px-2 text-center"><span className="text-2xl" aria-hidden="true">{emoji}</span><strong className="mt-1 block font-display text-lg text-ink">{value}</strong><span className="block text-[11px] text-muted">{label}</span></div>;
}

function WorldBlock({ world }) {
  const chapters = world.chapters;

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-night via-[#242457] to-grape p-4 text-white shadow-card sm:p-5">
        <span className="pointer-events-none absolute -right-3 -top-8 text-8xl opacity-10" aria-hidden="true">{world.emoji}</span>
        <div className="relative flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl">{world.emoji}</span>
          <div className="min-w-0 flex-1"><p className="text-xs font-bold uppercase tracking-[0.16em] text-honey">Mundo {world.id}</p><h3 className="font-display text-lg font-bold">{world.title}</h3><p className="text-xs text-white/65">{world.chaptersDone}/{world.chaptersTotal} capítulos · {world.subtitle}</p></div>
          {world.worldDone && <span className="hidden rounded-full bg-teal px-3 py-1 text-xs font-bold sm:block">✓ Completado</span>}
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {chapters.map((chapter) => <ChapterBlock key={chapter.id} chapter={chapter} />)}
      </div>
    </div>
  );
}

function ChapterBlock({ chapter }) {
  const artwork = artworkForCase({ chapter: chapter.id });

  return (
    <article className={`grid overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card ${chapter.unlocked ? "md:grid-cols-[260px_1fr]" : "sm:grid-cols-[190px_1fr]"}`}>
      <ChapterVisual artwork={artwork} emoji={chapter.emoji} chapter={chapter.id} title={chapter.title} alt={`Escena de ${chapter.title}`} compact={!chapter.unlocked} />
      <div className="min-w-0">
        <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-4 sm:px-5">
          <div className="min-w-0 flex-1"><p className={`text-xs font-bold uppercase tracking-wide ${chapter.unlocked ? "text-honey-deep" : "text-grape"}`}>{chapter.unlocked ? `Expediente ${chapter.id}` : "Expediente bloqueado"}</p><h3 className="font-display text-lg font-bold leading-tight text-ink">Capítulo {chapter.id} · {chapter.title}</h3><p className="mt-1 text-xs text-muted">{chapter.unlocked ? `${chapter.done}/${chapter.total} casos resueltos` : "Completa el capítulo anterior para desbloquear"}</p></div>
          {chapter.medal && <span className="rounded-full bg-honey-soft px-3 py-1 text-xs font-bold text-honey-deep">🏅 Medalla</span>}
          {!chapter.unlocked && <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cloud" aria-label="Capítulo bloqueado">🔒</span>}
        </div>

        <ol className="divide-y divide-ink/10 px-3 sm:px-4">
          {chapter.cases.map((caseItem) => <CaseRow key={caseItem.id} caseItem={caseItem} />)}
        </ol>
      </div>
    </article>
  );
}

function ChapterVisual({ artwork, emoji, chapter, title, alt, compact = false }) {
  return (
    <div className={`relative min-h-40 overflow-hidden bg-gradient-to-br from-night to-grape ${compact ? "sm:min-h-full" : "md:min-h-full"}`}>
      {artwork ? <Image src={artwork} alt={alt} fill sizes="(max-width: 768px) 100vw, 260px" className="object-cover" /> : <span className="absolute inset-0 grid place-items-center text-7xl opacity-80" aria-hidden="true">{emoji}</span>}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
      <span className="absolute -right-3 -top-5 text-8xl opacity-25 drop-shadow-lg" aria-hidden="true">{emoji}</span>
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-night/78 p-2.5 text-white shadow-card ring-1 ring-white/15 backdrop-blur-sm">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey text-xl shadow-sm" aria-hidden="true">{emoji}</span>
        <span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-honey">Capítulo {chapter}</span><span className="block font-display text-sm font-bold leading-tight">{title}</span></span>
      </div>
    </div>
  );
}

function CaseRow({ caseItem }) {
  if (!caseItem.unlocked) {
    return (
      <li className="flex items-center gap-3 py-4 opacity-55">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cloud text-xl grayscale">{caseItem.emoji}</span>
        <div className="min-w-0 flex-1"><p className="font-display font-bold text-muted">{caseItem.title}</p><p className="text-xs text-muted">🔒 Resuelve el caso anterior</p></div>
      </li>
    );
  }

  return (
    <li>
      <Link href={`/aprendo/caso/${caseItem.id}`} className="group flex items-center gap-3 rounded-2xl py-4 transition hover:bg-cream sm:px-2">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-honey-soft text-xl shadow-card">{caseItem.emoji}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-display font-bold leading-tight text-ink">{caseItem.title}</span>
          <span className="mt-1 flex items-center gap-1" aria-label={`${caseItem.partial} de ${caseItem.retosTotal} retos`}>{Array.from({ length: caseItem.retosTotal }).map((_, index) => <span key={index} className={`h-1.5 w-1.5 rounded-full ${index < caseItem.partial ? (caseItem.completed ? "bg-teal" : "bg-honey") : "bg-ink/15"}`} />)}</span>
          <span className={`mt-1 block text-xs ${caseItem.completed ? "font-semibold text-teal" : "text-muted"}`}>{caseItem.completed ? "Resuelto · jugar otra vez" : caseItem.partial > 0 ? `Continuar · ${caseItem.partial}/${caseItem.retosTotal} retos` : `${caseItem.retosTotal} retos · ${caseItem.minutes} min`}</span>
        </span>
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold shadow-card transition group-hover:translate-x-1 ${caseItem.completed ? "bg-teal text-white" : "bg-honey text-night"}`}>{caseItem.completed ? "✓" : "▶"}</span>
      </Link>
    </li>
  );
}

function FutureWorlds({ worlds }) {
  return (
    <section className="mt-8 border-t border-ink/10 pt-6">
      <div className="px-2"><h2 className="font-display text-lg font-bold text-ink">Próximos mundos</h2><p className="text-sm text-muted">Nuevos tipos de casos se desbloquean con tu progreso.</p></div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {worlds.map((world) => (
          <div key={world.id} className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-4">
            <span className="pointer-events-none absolute -bottom-4 -right-2 text-6xl opacity-10" aria-hidden="true">{world.emoji}</span>
            <div className="relative flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cloud text-xl grayscale">{world.comingSoon ? "✨" : "🔒"}</span><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-wide text-muted">Mundo {world.id}</p><h3 className="truncate font-display font-bold text-ink">{world.title}</h3><p className="truncate text-xs text-muted">{world.subtitle}</p></div></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function NamePrompt({ onSave }) {
  const [value, setValue] = useState("");
  return (
    <form onSubmit={(event) => { event.preventDefault(); if (value.trim()) onSave(value); }} className="mt-5 flex flex-col items-start gap-3 rounded-3xl bg-white p-5 shadow-card sm:flex-row sm:items-center">
      <Detective size={52} className="shrink-0" />
      <div className="flex-1"><p className="font-display text-lg font-bold text-ink">¡Hola! Soy Razo, tu detective. ¿Cómo te llamas?</p><p className="text-sm text-muted">Así te saludo cada vez que entres.</p></div>
      <div className="flex w-full gap-2 sm:w-auto"><input value={value} onChange={(event) => setValue(event.target.value)} maxLength={24} placeholder="Tu nombre" aria-label="Tu nombre" className="w-full rounded-full border-2 border-ink/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-honey sm:w-44" /><button type="submit" disabled={!value.trim()} className="shrink-0 rounded-full bg-honey px-5 py-2.5 font-bold text-night transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40">Listo</button></div>
    </form>
  );
}
