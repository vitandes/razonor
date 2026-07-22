"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo, { LogoWordmark } from "@/components/Logo";
import { useProgress, isSubscribed } from "@/lib/progress";
import { CTA_START } from "@/lib/trial";
import { trackMeta } from "@/lib/meta";
import { trackTikTok } from "@/lib/tiktok";

// Edades del informe: 7-12, en las dos rutas del producto (7-9 y 10-12).
// La ruta sale directa de esta elección (lib/world.js → routeFromProfile).
const AGE_BANDS = ["7-9", "10-12"];

const GOALS = [
  { id: "colegio", emoji: "🎓", label: "Le vaya mejor en el colegio" },
  { id: "razonar", emoji: "🧠", label: "Razone y deduzca mejor" },
  { id: "lectura", emoji: "📖", label: "Entienda mejor lo que lee" },
  { id: "ia", emoji: "🤖", label: "Esté listo para el mundo de la IA" },
  { id: "pantalla", emoji: "📱", label: "Use la pantalla en algo que sume" },
];

const GOAL_PHRASE = {
  colegio: "ir mejor en el colegio",
  razonar: "razonar y deducir mejor",
  lectura: "entender mejor lo que lee",
  ia: "estar listo para el mundo de la IA",
  pantalla: "usar la pantalla en algo que sume",
};

const INTERESTS = [
  { id: "detectives", emoji: "🕵️", label: "Detectives y espías" },
  { id: "codigos", emoji: "🔐", label: "Códigos secretos" },
  { id: "acertijos", emoji: "🧩", label: "Acertijos y rompecabezas" },
  { id: "aventura", emoji: "🗺️", label: "Aventura" },
  { id: "ciencia", emoji: "🔬", label: "Ciencia e inventos" },
  { id: "espacio", emoji: "🚀", label: "Espacio" },
  { id: "animales", emoji: "🐾", label: "Animales" },
  { id: "deporte", emoji: "⚽", label: "Deporte" },
];

const TOTAL_STEPS = 4;

export default function Onboarding() {
  const router = useRouter();
  const p = useProgress();

  const [step, setStep] = useState(0);
  const [kidName, setKidName] = useState("");
  const [ageBand, setAgeBand] = useState(null);
  const [goals, setGoals] = useState([]);
  const [interests, setInterests] = useState([]);

  // prefill si el papá ya había hecho el onboarding antes
  useEffect(() => {
    if (!p.hydrated) return;
    if (p.name) setKidName((n) => n || p.name);
    if (p.onboarding?.ageBand) setAgeBand((a) => a ?? p.onboarding.ageBand);
    if (p.onboarding?.goals?.length) setGoals((g) => (g.length ? g : p.onboarding.goals));
    if (p.onboarding?.interests?.length)
      setInterests((i) => (i.length ? i : p.onboarding.interests));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.hydrated]);

  // Si ya tiene suscripción o ya hizo el onboarding, redirigirlo donde corresponde
  useEffect(() => {
    if (p.serverLoaded) {
      if (isSubscribed(p.subscription)) {
        router.replace("/aprendo");
      } else if (p.onboarding?.done) {
        router.replace("/planes");
      }
    }
  }, [p.serverLoaded, p.subscription, p.onboarding?.done, router]);

  // Spinner de carga para evitar que destelle la UI de onboarding si vamos a redirigir
  if (!p.serverLoaded || isSubscribed(p.subscription) || p.onboarding?.done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
      </main>
    );
  }

  const name = kidName.trim() || "tu hijo";
  const toggle = (list, set, id) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  function finish() {
    p.saveOnboarding({ name: kidName, ageBand, goals, interests });
    trackMeta("CompleteRegistration"); // evento de Meta: registro/onboarding listo
    trackTikTok("CompleteRegistration"); // mismo evento para TikTok
    router.push("/planes");
  }

  const canContinue = step !== 0 || kidName.trim().length > 0;

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
        {/* barra superior */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <LogoWordmark size={34} />
          </Link>
          <span className="text-sm font-medium text-muted">
            Paso {step + 1} de {TOTAL_STEPS}
          </span>
        </header>

        {/* progreso */}
        <div className="mt-4 flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-honey" : "bg-ink/10"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          {/* PASO 1: nombre + edad */}
          {step === 0 && (
            <div className="animate-pop">
              <Logo size={72} className="animate-floaty" />
              <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink">
                Abramos su expediente 🕵️
              </h1>
              <p className="mt-2 text-lg text-muted">
                Personalicemos los casos. ¿Cómo se llama tu hijo o hija?
              </p>

              <input
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                maxLength={24}
                autoFocus
                placeholder="Nombre del niño o niña"
                aria-label="Nombre del niño o niña"
                className="mt-6 w-full rounded-2xl border-2 border-ink/10 bg-white px-4 py-3.5 text-[17px] text-ink outline-none transition focus:border-honey"
              />

              <p className="mt-6 text-sm font-medium text-muted">¿Qué edad tiene?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {AGE_BANDS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAgeBand(a)}
                    className={`rounded-full border-2 px-5 py-2.5 font-semibold transition ${
                      ageBand === a
                        ? "border-honey bg-honey-soft text-honey-deep"
                        : "border-ink/10 bg-white text-ink hover:border-ink/25"
                    }`}
                  >
                    {a} años
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 2: objetivos */}
          {step === 1 && (
            <div className="animate-pop">
              <h1 className="font-display text-3xl font-semibold leading-tight text-ink">
                ¿Qué te gustaría lograr con {kidName.trim() || "tu hijo"}?
              </h1>
              <p className="mt-2 text-muted">Elige las que quieras.</p>
              <div className="mt-6 grid gap-3">
                {GOALS.map((g) => {
                  const on = goals.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggle(goals, setGoals, g.id)}
                      className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left font-medium transition ${
                        on
                          ? "border-honey bg-honey-soft text-ink"
                          : "border-ink/10 bg-white text-ink hover:border-ink/25"
                      }`}
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {g.emoji}
                      </span>
                      <span className="flex-1">{g.label}</span>
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full text-sm ${
                          on ? "bg-honey text-ink" : "bg-cloud text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3: intereses */}
          {step === 2 && (
            <div className="animate-pop">
              <h1 className="font-display text-3xl font-semibold leading-tight text-ink">
                ¿Qué temas le encantan a {kidName.trim() || "tu hijo"}?
              </h1>
              <p className="mt-2 text-muted">
                Los casos y las historias priorizarán lo que más le gusta.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {INTERESTS.map((t) => {
                  const on = interests.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggle(interests, setInterests, t.id)}
                      className={`flex items-center gap-2 rounded-2xl border-2 px-4 py-3 text-left font-medium transition ${
                        on
                          ? "border-grape bg-grape-soft text-ink"
                          : "border-ink/10 bg-white text-ink hover:border-ink/25"
                      }`}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {t.emoji}
                      </span>
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 4: recap */}
          {step === 3 && (
            <div className="animate-pop text-center">
              <Logo size={88} className="mx-auto animate-floaty" />
              <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink">
                ¡El caso de {name} está abierto!
              </h1>
              <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-muted">
                Razonor va a entrenar a {name} para{" "}
                <span className="font-semibold text-ink">{goalsPhrase(goals)}</span>
                , con retos de {interestsPhrase(interests)} dentro de una
                historia de misterio. En tu panel verás su progreso real.
              </p>
              <div className="mx-auto mt-6 flex max-w-xs flex-col gap-2 rounded-4xl bg-white p-5 text-left shadow-card">
                <Recap label="Niño o niña" value={kidName.trim() || "—"} />
                {ageBand && <Recap label="Edad" value={`${ageBand} años`} />}
                <Recap
                  label="Metas"
                  value={goals.length ? `${goals.length} elegidas` : "—"}
                />
                <Recap
                  label="Intereses"
                  value={interests.length ? `${interests.length} elegidos` : "—"}
                />
              </div>
            </div>
          )}
        </div>

        {/* navegación */}
        <div className="flex items-center gap-3 pb-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border border-ink/15 bg-white px-5 py-3.5 font-medium text-ink transition hover:border-ink/30"
            >
              ← Atrás
            </button>
          )}
          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue}
              className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-semibold text-ink shadow-card transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40"
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="flex-1 rounded-full bg-honey px-6 py-3.5 font-display text-lg font-semibold text-ink shadow-card transition hover:bg-honey-deep hover:text-white"
            >
              {CTA_START} →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function goalsPhrase(goals) {
  const picked = goals.map((g) => GOAL_PHRASE[g]).filter(Boolean).slice(0, 2);
  if (picked.length === 0) return "razonar y deducir mejor";
  return picked.join(" y ");
}

function interestsPhrase(interests) {
  const labels = INTERESTS.filter((t) => interests.includes(t.id)).map((t) =>
    t.label.toLowerCase(),
  );
  if (labels.length === 0) return "sus temas favoritos";
  return labels.slice(0, 3).join(", ");
}

function Recap({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
