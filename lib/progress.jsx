"use client";

// Progreso real, persistido en el navegador + nube (Supabase).
//
// MODELO MULTIPERFIL (tipo Netflix):
//   La CUENTA (un usuario de Clerk) tiene:
//     - subscription  (a nivel de cuenta)
//     - profiles       { id -> perfil del niño }   (1 en Individual, hasta 3 en Familiar)
//     - activeProfileId (qué niño está usando la app ahora)
//   Cada PERFIL guarda su propio progreso (xp, racha, comprensión, cuentos,
//   reporte, etc.). El hook useProgress() expone el perfil ACTIVO "aplanado"
//   (p.name, p.xp, p.comp, ...) tal como antes, así que las pantallas que ya
//   existían no cambian: simplemente operan sobre el niño seleccionado.
//
// Compatibilidad: si en localStorage / la nube hay un estado VIEJO (un solo
// perfil plano), mergeAccount() lo envuelve en un perfil primario sin perder nada.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { computeMaxLevel, readingProgress } from "@/lib/data";
import {
  computeSessionXp,
  computeCaseXp,
  playerLevelFromXp,
} from "@/lib/leveling";

// Habilidades que rastrea Razonor (deben coincidir con SKILLS de lib/world.js).
// Se listan aquí para no importar el contenido (grande) en el estado.
const SKILL_IDS = [
  "deduccion",
  "patrones",
  "comprension",
  "computacional",
  "matematico",
  "criterio",
];
const emptySkills = () =>
  SKILL_IDS.reduce((o, id) => ((o[id] = { correct: 0, total: 0 }), o), {});

const MAX_PROFILES = 3; // máximo de niños en plan Familiar

// El cache local va POR USUARIO de Clerk para que, al cambiar de cuenta en el
// mismo navegador, no se mezclen los datos. "guest" = sin sesión.
const STORAGE_PREFIX = "leo:progress:v1";
function storageKey(userId) {
  return `${STORAGE_PREFIX}:${userId || "guest"}`;
}
function clearOtherCaches(userId) {
  if (typeof window === "undefined") return;
  try {
    const keep = storageKey(userId);
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX) && k !== keep) {
        window.localStorage.removeItem(k);
      }
    }
  } catch {
    /* ignorar */
  }
}

// ----- perfil (por niño) -----
const EMPTY_PROFILE = {
  id: null,
  name: "",
  isPrimary: false,
  createdAt: 0,
  avatar: "", // emoji elegido (vacío = se asigna por orden)
  color: "", // clase de color de fondo (vacío = se asigna por orden)
  xp: 0,
  streak: 0,
  lastActive: null, // "YYYY-MM-DD"
  onboarding: { ageBand: null, goals: [], interests: [], done: false },
  // --- Razonor (retos de misterio) ---
  skills: emptySkills(), // por habilidad: { correct, total }
  cases: {}, // { [caseId]: { completed, stars, plays, lastPlayed } }
  justChapterMedal: null, // transitorio: id de capítulo recién completado
  lastCase: null, // transitorio: desglose XP/monedas del último caso
  // --- legado del producto de lectura (no se usa en Razonor; se conserva para
  //     no romper cuentas viejas y por si se reactiva) ---
  comp: {
    literal: { correct: 0, total: 0 },
    inferencial: { correct: 0, total: 0 },
    critico: { correct: 0, total: 0 },
  },
  bands: {},
  maxLevel: 1,
  justLeveledTo: null, // transitorio
  justPlayerLeveledTo: null, // transitorio
  lastSession: null, // transitorio
  stories: {},
  minutes: {},
  report: { text: null, generatedAt: null },
};

// ----- cuenta (un usuario de Clerk) -----
const EMPTY_ACCOUNT = {
  // none|active|canceled; cancelAtPeriodEnd = canceló pero conserva acceso hasta
  // currentPeriodEnd. La suscripción SIEMPRE manda desde el servidor (columnas).
  subscription: {
    status: "none",
    plan: null,
    since: null,
    cancelAtPeriodEnd: false,
    currentPeriodEnd: null,
  },
  activeProfileId: null,
  profiles: {},
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function genId() {
  return "p_" + Math.random().toString(36).slice(2, 10);
}

// ----- utilidades de fecha (en hora local) -----
function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function daysBetween(aKey, bKey) {
  const a = new Date(aKey + "T00:00:00");
  const b = new Date(bKey + "T00:00:00");
  return Math.round((b - a) / 86400000);
}

// ----- (de)serialización -----
function mergeProfile(parsed, id) {
  const base = parsed && typeof parsed === "object" ? parsed : {};
  return {
    ...EMPTY_PROFILE,
    ...base,
    id: id || base.id || genId(),
    isPrimary: !!base.isPrimary,
    createdAt: base.createdAt || 0,
    comp: { ...EMPTY_PROFILE.comp, ...base.comp },
    onboarding: { ...EMPTY_PROFILE.onboarding, ...(base.onboarding || {}) },
    bands: base.bands || {},
    maxLevel: Math.max(1, base.maxLevel || 1),
    report: { ...EMPTY_PROFILE.report, ...(base.report || {}) },
    // Razonor
    skills: { ...emptySkills(), ...(base.skills || {}) },
    cases: base.cases || {},
    // los transitorios nunca persisten
    justLeveledTo: null,
    justPlayerLeveledTo: null,
    lastSession: null,
    justChapterMedal: null,
    lastCase: null,
  };
}

// Acepta el formato NUEVO (con profiles) y el VIEJO (un solo perfil plano).
function mergeAccount(parsed) {
  // formato nuevo
  if (
    parsed &&
    typeof parsed === "object" &&
    parsed.profiles &&
    typeof parsed.profiles === "object" &&
    !Array.isArray(parsed.profiles)
  ) {
    const profiles = {};
    for (const [id, prof] of Object.entries(parsed.profiles)) {
      profiles[id] = mergeProfile(prof, id);
    }
    let ids = Object.keys(profiles);
    if (ids.length === 0) {
      const id = genId();
      profiles[id] = { ...mergeProfile({}, id), isPrimary: true };
      ids = [id];
    }
    // asegura que exista exactamente un primario
    if (!Object.values(profiles).some((p) => p.isPrimary)) {
      profiles[ids[0]].isPrimary = true;
    }
    const activeProfileId =
      parsed.activeProfileId && profiles[parsed.activeProfileId]
        ? parsed.activeProfileId
        : ids[0];
    return {
      subscription: { ...EMPTY_ACCOUNT.subscription, ...(parsed.subscription || {}) },
      activeProfileId,
      profiles,
    };
  }

  // formato viejo (un solo perfil plano) o vacío -> envolver en perfil primario
  const id = genId();
  const profile = {
    ...mergeProfile(parsed || {}, id),
    isPrimary: true,
  };
  return {
    subscription: {
      ...EMPTY_ACCOUNT.subscription,
      ...((parsed && parsed.subscription) || {}),
    },
    activeProfileId: id,
    profiles: { [id]: profile },
  };
}

function loadAccount(userId) {
  if (typeof window === "undefined") return mergeAccount(null);
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return mergeAccount(null);
    return mergeAccount(JSON.parse(raw));
  } catch {
    return mergeAccount(null);
  }
}
function persist(account, userId) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(userId), JSON.stringify(account));
  } catch {
    /* almacenamiento lleno o bloqueado: lo ignoramos en el MVP */
  }
}

// Lista de perfiles ordenada: el primario primero, luego por creación.
function profileList(account) {
  return Object.values(account.profiles).sort(
    (a, b) =>
      (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0) ||
      (a.createdAt || 0) - (b.createdAt || 0),
  );
}

// ----- valores derivados (lo que muestran las pantallas) -----
export function compPercent(bucket) {
  if (!bucket || bucket.total === 0) return 0;
  return Math.round((bucket.correct / bucket.total) * 100);
}

export function comprehensionPercents(comp) {
  return {
    literal: compPercent(comp.literal),
    inferencial: compPercent(comp.inferencial),
    critico: compPercent(comp.critico),
  };
}

const WEEK_LABELS = ["D", "L", "M", "M", "J", "V", "S"];
export function weeklyMinutes(minutes) {
  const today = new Date();
  const values = [];
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    values.push(minutes[dayKey(d)] || 0);
    labels.push(WEEK_LABELS[d.getDay()]);
  }
  return { values, labels };
}

export function storiesCompletedCount(stories) {
  return Object.values(stories).filter((s) => s.completed).length;
}

// Conjunto de los dayKeys de los últimos 7 días (la misma ventana que
// weeklyMinutes). Sirve para saber qué actividad cae "esta semana".
function last7DayKeys() {
  const today = new Date();
  const keys = new Set();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    keys.add(dayKey(d));
  }
  return keys;
}

// Cuentos leídos EN LOS ÚLTIMOS 7 DÍAS (no el total histórico). Usa lastPlayed
// para el reporte semanal / Wrapped, donde la etiqueta dice "esta semana".
export function storiesReadThisWeek(stories) {
  const week = last7DayKeys();
  return Object.values(stories).filter(
    (s) => s.completed && s.lastPlayed && week.has(s.lastPlayed),
  ).length;
}

// ¿Tiene acceso a la app? Solo "active" da acceso. Si el usuario CANCELÓ pero ya
// había pagado el periodo (ej. semestral = 6 meses), queda "active" con
// cancelAtPeriodEnd=true y conserva el acceso hasta current_period_end; pasada
// esa fecha, deja de tener acceso (la suscripción no se renovó).
export function isSubscribed(subscription) {
  // Bypass SOLO para desarrollo local: permite entrar a /aprendo (y demás
  // pantallas con paywall) sin pasar por Mercado Pago, para revisar la app.
  // Se activa con NEXT_PUBLIC_DEV_UNLOCK=1 en .env.local y NUNCA en producción.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_DEV_UNLOCK === "1"
  ) {
    return true;
  }
  if (subscription?.status !== "active") return false;
  if (subscription?.cancelAtPeriodEnd) {
    const end = subscription?.currentPeriodEnd;
    if (!end) return true; // sin fecha (no debería pasar): no cortamos el acceso
    return new Date(end).getTime() > Date.now();
  }
  return true;
}

export function reportStatus(report) {
  const gen = report?.generatedAt ? new Date(report.generatedAt).getTime() : null;
  const now = Date.now();
  const nextAt = gen ? gen + WEEK_MS : now;
  return {
    has: !!report?.text,
    text: report?.text || null,
    generatedAt: gen,
    nextAt,
    due: !gen || now >= nextAt,
  };
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const [account, setAccount] = useState(EMPTY_ACCOUNT);
  const [hydrated, setHydrated] = useState(false);
  const [serverLoaded, setServerLoaded] = useState(false);
  const accountRef = useRef(account);
  accountRef.current = account;
  const userRef = useRef(undefined); // usuario al que pertenece el estado actual
  const saveTimer = useRef(null);

  // Carga/recarga el estado cuando cambia el usuario de Clerk (login, logout o
  // cambio de cuenta). Así NUNCA se mezclan dos cuentas.
  useEffect(() => {
    if (!isLoaded) return;
    if (userRef.current === userId) return;
    userRef.current = userId;

    clearOtherCaches(userId);

    // 1) pintar al instante el cache local DE ESTA cuenta (o vacío)
    setAccount(loadAccount(userId));
    setHydrated(true);
    setServerLoaded(false);

    if (!isSignedIn || !userId) {
      setServerLoaded(true);
      return;
    }

    // 2) traer el estado autoritativo de la nube. La SUSCRIPCIÓN siempre manda
    //    desde el servidor (columnas), no la fija el cliente.
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/state", { cache: "no-store" });
        if (!cancelled && res.ok) {
          const { state: serverState, subscription } = await res.json();
          setAccount((prev) => {
            const base = serverState ? mergeAccount(serverState) : prev;
            if (!subscription) return base;
            return {
              ...base,
              subscription: {
                status: subscription.status || "none",
                plan: subscription.plan ?? null,
                since: base.subscription?.since ?? null,
                cancelAtPeriodEnd: !!subscription.cancelAtPeriodEnd,
                currentPeriodEnd: subscription.currentPeriodEnd ?? null,
              },
            };
          });
        }
      } catch {
        /* sin DB / offline: seguimos con el cache local */
      } finally {
        if (!cancelled) setServerLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, userId]);

  // persistir en localStorage en cada cambio
  useEffect(() => {
    if (hydrated) persist(account, userRef.current);
  }, [account, hydrated]);

  // guardar en la nube con debounce cuando hay sesión y ya se cargó
  useEffect(() => {
    if (!serverLoaded || !isSignedIn) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch("/api/state", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: accountRef.current }),
      }).catch(() => {});
    }, 1500);
    return () => clearTimeout(saveTimer.current);
  }, [account, serverLoaded, isSignedIn]);

  const actions = useMemo(() => {
    // Modifica SOLO el perfil activo (el niño seleccionado).
    function updateActive(updater) {
      setAccount((a) => {
        const id = a.activeProfileId;
        const prof = a.profiles[id];
        if (!prof) return a;
        return { ...a, profiles: { ...a.profiles, [id]: updater(prof) } };
      });
    }

    function touchStreak(s) {
      const today = dayKey();
      if (s.lastActive === today) return s;
      let streak = 1;
      if (s.lastActive) {
        const diff = daysBetween(s.lastActive, today);
        if (diff === 1) streak = s.streak + 1;
        else if (diff <= 0) streak = s.streak || 1;
      }
      return { ...s, streak, lastActive: today };
    }

    return {
      // ---------- PERFIL ACTIVO ----------
      setName(name) {
        updateActive((s) => ({ ...s, name: name.trim().slice(0, 24) }));
      },

      saveOnboarding({ name, ageBand, goals, interests }) {
        updateActive((s) => ({
          ...s,
          name: name ? name.trim().slice(0, 24) : s.name,
          onboarding: {
            ageBand: ageBand ?? s.onboarding.ageBand,
            goals: goals ?? s.onboarding.goals,
            interests: interests ?? s.onboarding.interests,
            done: true,
          },
        }));
      },

      finishSession({
        storyId,
        readingLevel = 1,
        difficulty = "Fácil",
        results = [],
        minutes = 0,
        stars = 0,
      }) {
        updateActive((prev) => {
          let s = touchStreak(prev);

          const compHit = (r) => (r.level === "critico" ? !!r.correct : !!r.firstTry);

          const comp = {
            literal: { ...s.comp.literal },
            inferencial: { ...s.comp.inferencial },
            critico: { ...s.comp.critico },
          };
          for (const r of results) {
            if (!comp[r.level]) continue;
            comp[r.level].total += 1;
            if (compHit(r)) comp[r.level].correct += 1;
          }

          const bandPrev = s.bands[readingLevel] || { history: [], critico: 0 };
          const gradedResults = results.filter((r) => r.level !== "critico");
          const criticoCount = results.filter((r) => r.level === "critico").length;
          const history = [
            ...bandPrev.history,
            ...gradedResults.map((r) => !!r.firstTry),
          ].slice(-40);
          const bands = {
            ...s.bands,
            [readingLevel]: { history, critico: bandPrev.critico + criticoCount },
          };

          const detectedBefore = readingProgress(s).currentLevel;
          const outgrown = readingLevel < detectedBefore;
          const session = computeSessionXp({ results, difficulty, outgrown });
          const newXp = s.xp + session.total;

          const today = dayKey();
          const minutesMap = { ...s.minutes, [today]: (s.minutes[today] || 0) + minutes };

          const prevStory = s.stories[storyId] || { completed: false, stars: 0, plays: 0 };
          const stories = {
            ...s.stories,
            [storyId]: {
              completed: true,
              stars: Math.max(prevStory.stars, stars),
              plays: prevStory.plays + 1,
              lastPlayed: today,
            },
          };

          const prevMax = Math.max(1, s.maxLevel || 1);
          const maxLevel = computeMaxLevel(bands, prevMax);
          const justLeveledTo = maxLevel > prevMax ? maxLevel : null;

          const prevPlayer = playerLevelFromXp(s.xp).level;
          const newPlayer = playerLevelFromXp(newXp).level;
          const justPlayerLeveledTo = newPlayer > prevPlayer ? newPlayer : null;

          return {
            ...s,
            xp: newXp,
            comp,
            bands,
            stories,
            minutes: minutesMap,
            maxLevel,
            justLeveledTo,
            justPlayerLeveledTo,
            lastSession: { ...session, readingLevel },
          };
        });
      },

      // Guarda progreso parcial dentro de un caso, para poder retomarlo si el
      // niño sale a mitad. NO cierra el caso ni suma XP: eso lo hace finishCase
      // al final. `results` es la lista acumulada hasta ahora.
      saveCaseProgress({ caseId, chapter = 1, results = [] }) {
        updateActive((s) => {
          const prev = s.cases[caseId] || {};
          // si ya está completo, no lo tocamos (para no perder plays/stars)
          if (prev.completed) return s;
          return {
            ...s,
            cases: {
              ...s.cases,
              [caseId]: {
                ...prev,
                chapter,
                completed: false,
                inProgress: { results, savedAt: Date.now() },
              },
            },
          };
        });
      },

      // Cierra un caso de Razonor: acumula habilidades, marca el caso, suma XP,
      // actualiza la racha y detecta subidas de nivel y medalla de capítulo.
      // results: [{ skill, firstTry }].
      finishCase({
        caseId,
        chapter = 1,
        chapterCaseCount = 1,
        route = "7-9",
        results = [],
        minutes = 0,
        stars = 0,
      }) {
        updateActive((prev) => {
          let s = touchStreak(prev);

          const skills = {};
          for (const id of SKILL_IDS) skills[id] = { ...(s.skills[id] || { correct: 0, total: 0 }) };
          for (const r of results) {
            if (!skills[r.skill]) continue;
            skills[r.skill].total += 1;
            if (r.firstTry) skills[r.skill].correct += 1; // acierto sin pista
          }

          const session = computeCaseXp({ results, route });
          const newXp = s.xp + session.total;

          const today = dayKey();
          const minutesMap = {
            ...s.minutes,
            [today]: (s.minutes[today] || 0) + minutes,
          };

          const prevCase = s.cases[caseId] || { completed: false, stars: 0, plays: 0 };
          const cases = {
            ...s.cases,
            [caseId]: {
              completed: true,
              chapter,
              stars: Math.max(prevCase.stars, stars),
              plays: prevCase.plays + 1,
              lastPlayed: today,
              // limpia el progreso parcial: el caso ya se cerró completo
              inProgress: null,
            },
          };

          // ¿Se completó el capítulo con este caso? (medalla)
          const doneInChapter = Object.values(cases).filter(
            (c) => c.chapter === chapter && c.completed,
          ).length;
          const wasChapterDone =
            Object.values(s.cases).filter(
              (c) => c.chapter === chapter && c.completed,
            ).length >= chapterCaseCount;
          const chapterNowDone = doneInChapter >= chapterCaseCount;
          const justChapterMedal =
            chapterNowDone && !wasChapterDone ? chapter : null;

          const prevPlayer = playerLevelFromXp(s.xp).level;
          const newPlayer = playerLevelFromXp(newXp).level;
          const justPlayerLeveledTo = newPlayer > prevPlayer ? newPlayer : null;

          return {
            ...s,
            xp: newXp,
            skills,
            cases,
            minutes: minutesMap,
            justPlayerLeveledTo,
            justChapterMedal,
            lastCase: session,
          };
        });
      },

      saveReport(text) {
        if (!text) return;
        updateActive((s) => ({
          ...s,
          report: { text, generatedAt: new Date().toISOString() },
        }));
      },

      clearLevelUp() {
        updateActive((s) =>
          s.justLeveledTo || s.justPlayerLeveledTo || s.justChapterMedal
            ? {
                ...s,
                justLeveledTo: null,
                justPlayerLeveledTo: null,
                justChapterMedal: null,
              }
            : s,
        );
      },

      // ---------- CUENTA ----------
      // NOTA: el cliente NO tiene acciones para cambiar la suscripción. El
      // estado (trialing/active/canceled) lo fija únicamente el webhook de
      // Mercado Pago o el dueño desde la base de datos. La suscripción que ve
      // el cliente siempre llega del servidor (columnas) al cargar.

      // Re-consulta la suscripción al servidor (columnas autoritativas) y la
      // aplica. La usa /aprendo tras volver del checkout, para esperar a que el
      // webhook de Mercado Pago confirme el pago. Devuelve el estado ("active",
      // "trialing", "none", ...) o null si no se pudo consultar.
      async refreshSubscription() {
        try {
          const res = await fetch("/api/state", { cache: "no-store" });
          if (!res.ok) return null;
          const { subscription } = await res.json();
          if (!subscription) return null;
          setAccount((a) => ({
            ...a,
            subscription: {
              status: subscription.status || "none",
              plan: subscription.plan ?? null,
              since: a.subscription?.since ?? null,
              cancelAtPeriodEnd: !!subscription.cancelAtPeriodEnd,
              currentPeriodEnd: subscription.currentPeriodEnd ?? null,
            },
          }));
          return subscription.status || "none";
        } catch {
          return null;
        }
      },

      reset() {
        setAccount(mergeAccount(null));
      },

      // ---------- PERFILES (solo plan Familiar) ----------
      // Agrega un niño nuevo (si es Familiar y hay cupo). NO cambia el perfil
      // activo ni entra a la app: el niño se queda en la pantalla de selección
      // para poder configurar varios y elegir al final.
      addProfile(name = "", { avatar = "", color = "" } = {}) {
        setAccount((a) => {
          const isFamiliar = a.subscription?.plan === "familiar";
          const count = Object.keys(a.profiles).length;
          if (!isFamiliar || count >= MAX_PROFILES) return a;
          const id = genId();
          const prof = {
            ...EMPTY_PROFILE,
            id,
            name: name.trim().slice(0, 24),
            avatar,
            color,
            createdAt: Date.now(),
            // un niño agregado no pasa por el onboarding inicial
            onboarding: { ...EMPTY_PROFILE.onboarding, done: true },
          };
          return {
            ...a,
            profiles: { ...a.profiles, [id]: prof },
          };
        });
      },

      switchProfile(id) {
        setAccount((a) => (a.profiles[id] ? { ...a, activeProfileId: id } : a));
      },

      // Actualiza nombre / avatar / color de un perfil.
      updateProfile(id, patch = {}) {
        setAccount((a) => {
          const prof = a.profiles[id];
          if (!prof) return a;
          const next = { ...prof };
          if (typeof patch.name === "string") next.name = patch.name.trim().slice(0, 24);
          if (typeof patch.avatar === "string") next.avatar = patch.avatar;
          if (typeof patch.color === "string") next.color = patch.color;
          return { ...a, profiles: { ...a.profiles, [id]: next } };
        });
      },

      // Elimina un niño (no se puede el primario). Si era el activo, vuelve al primario.
      removeProfile(id) {
        setAccount((a) => {
          const prof = a.profiles[id];
          if (!prof || prof.isPrimary) return a;
          const { [id]: _removed, ...rest } = a.profiles;
          const primary =
            Object.values(rest).find((p) => p.isPrimary) || Object.values(rest)[0];
          return {
            ...a,
            profiles: rest,
            activeProfileId:
              a.activeProfileId === id ? primary?.id || null : a.activeProfileId,
          };
        });
      },
    };
  }, []);

  const value = useMemo(() => {
    const list = profileList(account);
    const active = account.profiles[account.activeProfileId] || EMPTY_PROFILE;
    const isFamiliar = account.subscription?.plan === "familiar";
    return {
      // perfil activo aplanado (compatibilidad con las pantallas existentes)
      ...active,
      // cuenta
      subscription: account.subscription,
      hydrated,
      serverLoaded,
      // multiperfil
      profiles: list,
      activeProfileId: account.activeProfileId,
      isFamiliar,
      canAddProfile: isFamiliar && list.length < MAX_PROFILES,
      maxProfiles: MAX_PROFILES,
      ...actions,
    };
  }, [account, hydrated, serverLoaded, actions]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress debe usarse dentro de <ProgressProvider>");
  }
  return ctx;
}
