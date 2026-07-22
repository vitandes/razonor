// Sistema de NIVEL DE JUGADOR (gamificación, estilo videojuego).
//
// Es independiente del NIVEL DE LECTURA (la dificultad/habilidad, que vive en
// lib/data.js). Aquí solo manejamos la experiencia (XP):
//   - una curva infinita en la que cada nivel cuesta un poco más,
//   - rangos/títulos por tramos para que el número signifique algo,
//   - el cálculo de cuánta XP da una sesión, con más XP por cuentos difíciles
//     y XP reducida por cuentos de un nivel que el niño ya domina.

// Multiplicador de XP según la dificultad del cuento.
export const DIFFICULTY_XP = { "Fácil": 1, "Medio": 1.5, "Difícil": 2 };

// Puntos base de la sesión (antes de multiplicadores).
const PTS_FIRST_TRY = 10; // respuesta calificable correcta al primer intento
const PTS_WITH_HINT = 5; // correcta pero usó pista
const PTS_CRITICO = 10; // participó en una pregunta crítica
const PTS_COMPLETE = 20; // bono por terminar el cuento
const OUTGROWN_FACTOR = 0.5; // XP reducida en cuentos ya dominados

const CURVE_BASE = 100;
const CURVE_GROWTH = 1.4;

// XP necesaria para pasar del nivel `level` al siguiente. Crece con el nivel:
// L1→2 = 100, L2→3 ≈ 264, L3→4 ≈ 466, L5→6 ≈ 951… Nunca termina.
export function xpToNext(level) {
  return Math.round(CURVE_BASE * Math.pow(Math.max(1, level), CURVE_GROWTH));
}

// Nivel de jugador a partir de la XP total acumulada.
// Devuelve el nivel, cuánta XP lleva dentro del nivel y cuánta falta.
export function playerLevelFromXp(totalXp = 0) {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXp));
  let need = xpToNext(level);
  while (remaining >= need) {
    remaining -= need;
    level += 1;
    need = xpToNext(level);
  }
  return { level, intoLevel: remaining, xpToNext: need };
}

// Rango/título de detective según el nivel de jugador (cosmético y motivacional).
const RANKS = [
  { min: 30, name: "Detective legendario", emoji: "👑" },
  { min: 20, name: "Detective maestro", emoji: "🏆" },
  { min: 15, name: "Detective estrella", emoji: "🌟" },
  { min: 10, name: "Detective veloz", emoji: "⚡" },
  { min: 5, name: "Detective junior", emoji: "🧭" },
  { min: 1, name: "Aprendiz de detective", emoji: "🔍" },
];

export function rankTitle(level = 1) {
  return RANKS.find((r) => level >= r.min) || RANKS[RANKS.length - 1];
}

// XP que gana una sesión de lectura.
//   results: [{ level: "literal"|"inferencial"|"critico", correct, firstTry }]
//   difficulty: dificultad del cuento ("Fácil"|"Medio"|"Difícil")
//   outgrown: true si el cuento es de un nivel que el niño ya domina
// Devuelve { total, base, multiplier, outgrown } para poder mostrar el desglose.
export function computeSessionXp({ results = [], difficulty = "Fácil", outgrown = false }) {
  let base = PTS_COMPLETE;
  for (const r of results) {
    if (r.level === "critico") {
      if (r.correct) base += PTS_CRITICO;
    } else if (r.correct) {
      base += r.firstTry ? PTS_FIRST_TRY : PTS_WITH_HINT;
    }
  }
  const multiplier = DIFFICULTY_XP[difficulty] ?? 1;
  const factor = multiplier * (outgrown ? OUTGROWN_FACTOR : 1);
  return {
    base,
    multiplier,
    outgrown,
    total: Math.round(base * factor),
  };
}

// --- Retos de Razonor (casos de misterio) ---
// XP que gana un caso. results: [{ skill, firstTry }] (cada reto se resuelve
// para avanzar; `firstTry` = sin usar la pista). La ruta 10-12 da un pequeño
// extra. Devuelve el desglose para el resumen del caso.
const PTS_RETO_FIRST = 10; // reto resuelto al primer intento
const PTS_RETO_HINT = 5; // resuelto usando la pista
const PTS_CASE_COMPLETE = 20; // bono por cerrar el caso
const ROUTE_MULTIPLIER = { "7-9": 1, "10-12": 1.2 };

export function computeCaseXp({ results = [], route = "7-9" }) {
  let base = PTS_CASE_COMPLETE;
  for (const r of results) {
    base += r.firstTry ? PTS_RETO_FIRST : PTS_RETO_HINT;
  }
  const multiplier = ROUTE_MULTIPLIER[route] ?? 1;
  return {
    base,
    multiplier,
    total: Math.round(base * multiplier),
  };
}
