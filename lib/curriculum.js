// Capa curricular de Razonor: conserva mecánicas concretas, pero resume todo
// en cuatro habilidades y equilibra capítulos sin cambiar ids de progreso.

export const PRODUCT_SKILL_ORDER = ["math", "logic", "problemSolving", "spatialReasoning"];

export const PRODUCT_SKILL_NAMES = {
  math: "Matemáticas",
  logic: "Lógica",
  problemSolving: "Resolución de problemas",
  spatialReasoning: "Razonamiento espacial",
};

const INTERNAL_SKILL_BY_MECHANIC = {
  deduccion: "deduccion",
  patron: "patrones",
  error: "comprension",
  comprension: "comprension",
  orden: "computacional",
  matematico: "matematico",
  ia: "criterio",
  espacial: "espacial",
};

const PRODUCT_SKILL_BY_INTERNAL = {
  matematico: "math",
  deduccion: "logic",
  patrones: "logic",
  comprension: "problemSolving",
  computacional: "problemSolving",
  criterio: "problemSolving",
  espacial: "spatialReasoning",
};

export function internalSkillForReto(reto = {}) {
  return reto.skillOverride || INTERNAL_SKILL_BY_MECHANIC[reto.mechanic] || null;
}

export function productSkillIdForReto(reto = {}) {
  return PRODUCT_SKILL_BY_INTERNAL[internalSkillForReto(reto)] || null;
}

export function productSkillsForCase(caseData = {}) {
  const practiced = new Set((caseData.retos || []).map(productSkillIdForReto).filter(Boolean));
  return PRODUCT_SKILL_ORDER.filter((id) => practiced.has(id));
}

function numericOptions(answer, spread, seed) {
  const values = [answer, answer + spread, Math.max(0, answer - spread)];
  const shift = seed % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)].map(String);
}

const MATH_CONTEXTS = [
  { unit: "señales", container: "rondas" },
  { unit: "pistas", container: "sobres" },
  { unit: "muestras", container: "cajas" },
  { unit: "fichas", container: "tableros" },
  { unit: "marcas", container: "mapas" },
  { unit: "códigos", container: "carpetas" },
];

function mathVariant({ seed, route, caseTitle }) {
  const context = MATH_CONTEXTS[seed % MATH_CONTEXTS.length];
  const older = route === "10-12";
  const groups = older ? 5 + (seed % 4) : 3 + (seed % 3);
  const perGroup = older ? 6 + ((seed * 3) % 5) : 2 + ((seed * 2) % 4);
  const removed = older ? 2 + (seed % 4) : 0;
  const total = groups * perGroup - removed;
  const operation = removed
    ? `${groups} × ${perGroup} − ${removed} = ${total}`
    : `${groups} × ${perGroup} = ${total}`;

  return {
    prompt: `Para avanzar en “${caseTitle}”, debes comprobar el conteo del expediente.`,
    clues: removed
      ? [
          `Hay ${groups} ${context.container} con ${perGroup} ${context.unit} en cada uno.`,
          `${removed} ${context.unit} estaban repetidas y se retiran.`,
        ]
      : [`Hay ${groups} ${context.container} con ${perGroup} ${context.unit} en cada uno.`],
    question: `¿Cuántas ${context.unit} válidas quedan en total?`,
    options: numericOptions(total, older ? groups : 2, seed),
    answer: String(total),
    hint: removed
      ? `Multiplica primero ${groups} × ${perGroup} y después resta ${removed}.`
      : `Son ${groups} grupos iguales de ${perGroup}. Puedes sumar o multiplicar.`,
    explicacion: `El conteo correcto es ${operation}. Comprobar cantidades ayuda a tomar decisiones con datos reales.`,
  };
}

function buildMathReto({ original, seed, caseTitle }) {
  return {
    id: original.id,
    mechanic: "matematico",
    byRoute: {
      "7-9": mathVariant({ seed, route: "7-9", caseTitle }),
      "10-12": mathVariant({ seed: seed + 7, route: "10-12", caseTitle }),
    },
  };
}

const DIRECTIONS = [
  { name: "norte", label: "Norte ↑", arrow: "↑" },
  { name: "este", label: "Este →", arrow: "→" },
  { name: "sur", label: "Sur ↓", arrow: "↓" },
  { name: "oeste", label: "Oeste ←", arrow: "←" },
];

const SPATIAL_SCENES = [
  { subject: "telescopio", label: "el telescopio", icon: "🔭", placeLabel: "el observatorio" },
  { subject: "robot explorador", label: "el robot explorador", icon: "🤖", placeLabel: "el laboratorio" },
  { subject: "submarino", label: "el submarino", icon: "🛟", placeLabel: "la estación oceánica" },
  { subject: "abeja exploradora", label: "la abeja exploradora", icon: "🐝", placeLabel: "el jardín científico" },
  { subject: "dron de rescate", label: "el dron de rescate", icon: "🚁", placeLabel: "el centro de operaciones" },
  { subject: "linterna", label: "la linterna", icon: "🔦", placeLabel: "el archivo secreto" },
  { subject: "satélite", label: "el satélite", icon: "🛰️", placeLabel: "la base espacial" },
  { subject: "cámara de campo", label: "la cámara de campo", icon: "📷", placeLabel: "la reserva natural" },
  { subject: "brújula", label: "la brújula", icon: "🧭", placeLabel: "el campamento" },
  { subject: "lupa", label: "la lupa", icon: "🔎", placeLabel: "el museo" },
];

const ROUTES = [
  { start: [2, 3], moves: ["↑", "↑", "→"], answer: "Arriba y a la derecha" },
  { start: [3, 1], moves: ["↓", "←", "←"], answer: "Abajo y a la izquierda" },
  { start: [1, 3], moves: ["↑", "→", "→"], answer: "Arriba y a la derecha" },
  { start: [3, 3], moves: ["←", "↑", "↑"], answer: "Arriba y a la izquierda" },
  { start: [1, 1], moves: ["→", "↓", "↓"], answer: "Abajo y a la derecha" },
  { start: [3, 2], moves: ["←", "←", "↓"], answer: "Abajo y a la izquierda" },
];

const RELATION_SETS = [
  [{ name: "cristal", label: "el cristal", icon: "💎" }, { name: "microscopio", label: "el microscopio", icon: "🔬" }, { name: "muestra", label: "la muestra", icon: "🧫" }],
  [{ name: "planeta", label: "el planeta", icon: "🪐" }, { name: "cohete", label: "el cohete", icon: "🚀" }, { name: "estrella", label: "la estrella", icon: "⭐" }],
  [{ name: "hoja", label: "la hoja", icon: "🍃" }, { name: "flor", label: "la flor", icon: "🌻" }, { name: "semilla", label: "la semilla", icon: "🫘" }],
  [{ name: "engranaje", label: "el engranaje", icon: "⚙️" }, { name: "imán", label: "el imán", icon: "🧲" }, { name: "bombillo", label: "el bombillo", icon: "💡" }],
  [{ name: "fósil", label: "el fósil", icon: "🦴" }, { name: "huella", label: "la huella", icon: "🐾" }, { name: "libreta", label: "la libreta", icon: "📒" }],
];

function shifted(values, seed) {
  const shift = seed % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

function upperFirst(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function withA(value) {
  return value.startsWith("el ") ? `al ${value.slice(3)}` : `a ${value}`;
}

function withDe(value) {
  return value.startsWith("el ") ? `del ${value.slice(3)}` : `de ${value}`;
}

function routeSpatialVariant(seed, caseTitle, scene) {
  const route = ROUTES[seed % ROUTES.length];
  const options = shifted(
    [route.answer, "Arriba y a la izquierda", "Abajo y a la derecha", "Abajo y a la izquierda"].filter(
      (value, index, all) => all.indexOf(value) === index,
    ).slice(0, 3),
    seed,
  );
  return {
    prompt: `En “${caseTitle}”, ${scene.label} debe seguir una ruta corta por ${scene.placeLabel}.`,
    clues: [`Punto de partida marcado con ${scene.icon}`, `Recorrido: ${route.moves.join(" ")}`],
    question: `Después de recorrer “${caseTitle}”, ¿dónde termina ${scene.label} respecto al inicio?`,
    options,
    answer: route.answer,
    hint: "Sigue las flechas una por una; compara únicamente el punto inicial con el punto final.",
    explicacion: `El recorrido ${route.moves.join(" ")} deja ${withA(scene.label)} ${route.answer.toLowerCase()} del inicio.`,
    visual: { type: "route", start: route.start, moves: route.moves, icon: scene.icon },
  };
}

function turnSpatialVariant(seed, caseTitle, scene) {
  const initial = seed % 4;
  const turns = [-1, 1, 2][Math.floor(seed / 3) % 3];
  const final = (initial + turns + 4) % 4;
  const turnLabel = turns === -1 ? "un cuarto de vuelta a la izquierda" : turns === 1 ? "un cuarto de vuelta a la derecha" : "media vuelta";
  const answer = DIRECTIONS[final].label;
  return {
    prompt: `En “${caseTitle}”, ${scene.label} cambia de orientación antes de continuar.`,
    clues: [`Orientación inicial: ${DIRECTIONS[initial].label}`, `Movimiento: ${turnLabel}`],
    question: `¿Hacia dónde queda orientado ${scene.label} en “${caseTitle}”?`,
    options: shifted([answer, DIRECTIONS[(final + 1) % 4].label, DIRECTIONS[(final + 3) % 4].label], seed),
    answer,
    hint: turns === 2 ? "Media vuelta significa mirar hacia el lado opuesto." : "Haz el giro desde el punto de vista del objeto, no desde el tuyo.",
    explicacion: `Desde el ${DIRECTIONS[initial].name}, ${turnLabel} deja ${withA(scene.label)} mirando hacia el ${DIRECTIONS[final].name}.`,
    visual: { type: "turn", initial, turns, icon: scene.icon },
  };
}

function relationsSpatialVariant(seed, caseTitle) {
  const items = RELATION_SETS[seed % RELATION_SETS.length];
  const layout = seed % 2 === 0
    ? [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }]
    : [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }];
  const answer = seed % 2 === 0 ? "Arriba y a la derecha" : "Abajo y a la izquierda";
  const clues = seed % 2 === 0
    ? [`${upperFirst(items[1].label)} está a la derecha ${withDe(items[0].label)}.`, `${upperFirst(items[2].label)} está encima ${withDe(items[1].label)}.`]
    : [`${upperFirst(items[1].label)} está a la izquierda ${withDe(items[0].label)}.`, `${upperFirst(items[2].label)} está debajo ${withDe(items[1].label)}.`];
  return {
    prompt: `Organiza el tablero de evidencias de “${caseTitle}” usando las dos pistas.`,
    clues,
    question: `En el tablero de “${caseTitle}”, ¿dónde queda ${items[2].label} respecto ${withA(items[0].label)}?`,
    options: shifted(
      [answer, "Arriba y a la izquierda", "Abajo y a la derecha", "Arriba y a la derecha", "Abajo y a la izquierda"]
        .filter((value, index, all) => all.indexOf(value) === index)
        .slice(0, 3),
      seed,
    ),
    answer,
    hint: `Coloca primero ${items[1].label} respecto ${withA(items[0].label)}; después ubica ${items[2].label}.`,
    explicacion: `Al combinar las dos pistas, ${items[2].label} queda ${answer.toLowerCase()} ${withDe(items[0].label)}.`,
    visual: { type: "relations", items: items.map((item, index) => ({ ...item, ...layout[index] })) },
  };
}

function mirrorSpatialVariant(seed, caseTitle, scene) {
  const initial = seed % 4;
  const vertical = Math.floor(seed / 2) % 2 === 0;
  const final = vertical ? [0, 3, 2, 1][initial] : [2, 1, 0, 3][initial];
  const axis = vertical ? "vertical" : "horizontal";
  const answer = DIRECTIONS[final].arrow;
  return {
    prompt: `El símbolo ${withDe(scene.label)} en “${caseTitle}” se refleja como en un espejo ${axis}.`,
    clues: [`Símbolo original: ${DIRECTIONS[initial].arrow}`, `Eje del espejo: ${axis}`],
    question: `¿Qué flecha completa el reflejo de “${caseTitle}”?`,
    options: shifted([answer, DIRECTIONS[(final + 1) % 4].arrow, DIRECTIONS[(final + 2) % 4].arrow], seed),
    answer,
    hint: vertical ? "Un espejo vertical cambia izquierda por derecha, pero conserva arriba y abajo." : "Un espejo horizontal cambia arriba por abajo, pero conserva izquierda y derecha.",
    explicacion: `Al reflejar ${DIRECTIONS[initial].arrow} sobre un eje ${axis}, el resultado es ${answer}.`,
    visual: { type: "mirror", initial, axis, icon: scene.icon },
  };
}

function coordinateSpatialVariant(seed, caseTitle, scene) {
  const row = (seed % 4) + 1;
  const column = (Math.floor(seed / 3) % 4) + 1;
  const answer = `Fila ${row}, columna ${column}`;
  const alternatives = [
    answer,
    `Fila ${column}, columna ${row}`,
    `Fila ${row === 4 ? 3 : row + 1}, columna ${column}`,
  ].filter((value, index, all) => all.indexOf(value) === index);
  if (alternatives.length < 3) alternatives.push(`Fila ${row}, columna ${column === 4 ? 3 : column + 1}`);
  return {
    prompt: `El panel de “${caseTitle}” divide ${scene.placeLabel} en filas y columnas.`,
    clues: ["Las filas se cuentan de arriba hacia abajo.", "Las columnas se cuentan de izquierda a derecha."],
    question: `¿Qué coordenada ocupa ${scene.label} en el panel de “${caseTitle}”?`,
    options: shifted(alternatives.slice(0, 3), seed),
    answer,
    hint: "Cuenta primero la fila y luego la columna; no intercambies el orden.",
    explicacion: `${upperFirst(scene.label)} está en la fila ${row} y la columna ${column}.`,
    visual: { type: "coordinates", row, column, icon: scene.icon },
  };
}

function symmetrySpatialVariant(seed, caseTitle, scene) {
  const sourceRow = (seed % 3) + 1;
  const sourceColumn = seed % 2 === 0 ? 1 : 3;
  const targetColumn = 4 - sourceColumn;
  const answer = `Fila ${sourceRow}, columna ${targetColumn}`;
  return {
    prompt: `El mosaico de “${caseTitle}” debe quedar simétrico a ambos lados de la línea central.`,
    clues: [`${upperFirst(scene.label)} está en la fila ${sourceRow}, columna ${sourceColumn}.`, "La línea de simetría pasa por el centro del tablero."],
    question: `¿En qué casilla debes colocar la copia ${withDe(scene.label)} para completar la simetría?`,
    options: shifted([answer, `Fila ${4 - sourceRow}, columna ${targetColumn}`, `Fila ${sourceRow}, columna ${sourceColumn}`], seed),
    answer,
    hint: "Conserva la misma fila y cuenta la misma distancia al otro lado de la línea.",
    explicacion: `La casilla espejo conserva la fila ${sourceRow} y cambia a la columna ${targetColumn}.`,
    visual: { type: "symmetry", row: sourceRow, column: sourceColumn, targetColumn, icon: scene.icon },
  };
}

function spatialVariant(seed, caseTitle) {
  const scene = SPATIAL_SCENES[seed % SPATIAL_SCENES.length];
  const builders = [
    routeSpatialVariant,
    turnSpatialVariant,
    relationsSpatialVariant,
    mirrorSpatialVariant,
    coordinateSpatialVariant,
    symmetrySpatialVariant,
  ];
  return builders[seed % builders.length](seed, caseTitle, scene);
}

function buildSpatialReto({ original, seed, caseTitle }) {
  return { id: original.id, mechanic: "espacial", ...spatialVariant(seed, caseTitle) };
}

const REPLACEMENT_PRIORITY = { error: 0, comprension: 1, orden: 2, ia: 9 };

function chapterSkillCount(chapter, skillId) {
  return (chapter.cases || []).reduce(
    (sum, caseData) => sum + (caseData.retos || []).filter((reto) => productSkillIdForReto(reto) === skillId).length,
    0,
  );
}

function replacementCandidates(chapter, usedByCase) {
  return (chapter.cases || [])
    .flatMap((caseData, caseIndex) =>
      (caseData.retos || []).map((reto, retoIndex) => ({ caseData, caseIndex, reto, retoIndex })),
    )
    .filter(({ reto }) => productSkillIdForReto(reto) === "problemSolving" && reto.mechanic !== "ia")
    .sort(
      (a, b) =>
        (usedByCase[a.caseData.id] || 0) - (usedByCase[b.caseData.id] || 0) ||
        (REPLACEMENT_PRIORITY[a.reto.mechanic] ?? 5) - (REPLACEMENT_PRIORITY[b.reto.mechanic] ?? 5) ||
        a.retoIndex - b.retoIndex,
    );
}

function fillChapterSkill(chapter, skillId, target, usedByCase) {
  while (chapterSkillCount(chapter, skillId) < target) {
    const candidate = replacementCandidates(chapter, usedByCase)[0];
    if (!candidate) throw new Error(`No hay un reto reemplazable en el capítulo ${chapter.id} para completar ${skillId}.`);
    const seed = Number(chapter.id) * 17 + candidate.caseIndex * 7 + candidate.retoIndex;
    candidate.caseData.retos[candidate.retoIndex] =
      skillId === "math"
        ? buildMathReto({ original: candidate.reto, seed, caseTitle: candidate.caseData.title })
        : buildSpatialReto({ original: candidate.reto, seed, caseTitle: candidate.caseData.title });
    usedByCase[candidate.caseData.id] = (usedByCase[candidate.caseData.id] || 0) + 1;
  }
}

export function rebalanceCurriculum(chapters = []) {
  for (const chapter of chapters) {
    // Los capítulos 1-3 ya tienen retos y assets hechos a medida.
    if (Number(chapter.id) >= 4) {
      const usedByCase = {};
      fillChapterSkill(chapter, "math", 2, usedByCase);
      fillChapterSkill(chapter, "spatialReasoning", Number(chapter.id) % 2 === 1 ? 2 : 1, usedByCase);
    }
    for (const caseData of chapter.cases || []) {
      caseData.focus = productSkillsForCase(caseData).map((id) => PRODUCT_SKILL_NAMES[id]);
    }
  }
  return chapters;
}
