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

function spatialVariant(seed, caseTitle) {
  const variants = [
    {
      prompt: `El plano de “${caseTitle}” marca un recorrido desde el centro.`,
      clues: ["Inicio: centro", "Movimientos: ↑ ↑ →"],
      question: "¿Dónde terminas respecto al inicio?",
      options: ["Arriba y a la derecha", "Abajo y a la derecha", "Arriba y a la izquierda"],
      answer: "Arriba y a la derecha",
      hint: "Primero subes dos veces y luego avanzas hacia la derecha.",
      explicacion: "El recorrido combina dos movimientos hacia arriba y uno hacia la derecha: terminas arriba y a la derecha.",
    },
    {
      prompt: `Una cámara del caso “${caseTitle}” apunta al este → y gira a la izquierda.`,
      clues: ["Dirección inicial: este →", "Giro: izquierda ↶"],
      question: "¿Hacia dónde apunta ahora?",
      options: ["Norte ↑", "Sur ↓", "Oeste ←"],
      answer: "Norte ↑",
      hint: "Imagina que miras hacia la derecha de la pantalla: tu izquierda queda arriba.",
      explicacion: "Al mirar al este, un giro a la izquierda deja la cámara apuntando al norte.",
    },
    {
      prompt: `Una flecha del expediente “${caseTitle}” apunta hacia arriba ↑. Debes girarla media vuelta.`,
      clues: ["Posición inicial: ↑", "Giro: 180°"],
      question: "¿Cómo queda la flecha?",
      options: ["↓", "→", "←"],
      answer: "↓",
      hint: "Media vuelta deja cualquier figura apuntando al lado opuesto.",
      explicacion: "Una rotación de 180° cambia arriba por abajo, así que la flecha queda ↓.",
    },
    {
      prompt: `Organiza las evidencias de “${caseTitle}” según el plano.`,
      clues: ["El mapa está a la izquierda de la lámpara.", "La llave está encima del mapa."],
      question: "¿Dónde queda la llave respecto a la lámpara?",
      options: ["Arriba y a la izquierda", "Abajo y a la izquierda", "Arriba y a la derecha"],
      answer: "Arriba y a la izquierda",
      hint: "Ubica primero el mapa a la izquierda; después coloca la llave encima.",
      explicacion: "Si el mapa está a la izquierda y la llave encima del mapa, la llave queda arriba y a la izquierda de la lámpara.",
    },
    {
      prompt: `La cuadrícula de “${caseTitle}” empieza abajo a la derecha.`,
      clues: ["Inicio: esquina inferior derecha", "Movimientos: ↑ ↑ ←"],
      question: "¿Dónde terminas respecto al inicio?",
      options: ["Arriba y a la izquierda", "Abajo y a la izquierda", "Arriba y a la derecha"],
      answer: "Arriba y a la izquierda",
      hint: "Subes dos posiciones y después te mueves una a la izquierda.",
      explicacion: "Los movimientos llevan hacia arriba y luego hacia la izquierda.",
    },
    {
      prompt: `El detective de “${caseTitle}” mira al norte y hace dos giros a la derecha.`,
      clues: ["Dirección inicial: norte ↑", "Giros: derecha, derecha"],
      question: "¿Hacia dónde mira al final?",
      options: ["Sur ↓", "Este →", "Oeste ←"],
      answer: "Sur ↓",
      hint: "Dos giros de 90° forman una media vuelta.",
      explicacion: "Norte → este → sur. Después de dos giros a la derecha mira al sur.",
    },
    {
      prompt: `Un vehículo del caso “${caseTitle}” avanza hacia el este →. La señal queda justo detrás.`,
      clues: ["Avance: este →", "La señal está detrás del vehículo."],
      question: "¿En qué dirección está la señal?",
      options: ["Oeste ←", "Norte ↑", "Este →"],
      answer: "Oeste ←",
      hint: "Detrás es la dirección contraria a la que avanza.",
      explicacion: "La dirección opuesta al este es el oeste, así que la señal queda al oeste.",
    },
    {
      prompt: `En el tablero de “${caseTitle}” hay tres símbolos.`,
      clues: ["El triángulo está a la derecha del círculo.", "El cuadrado está encima del triángulo."],
      question: "¿Dónde está el cuadrado respecto al círculo?",
      options: ["Arriba y a la derecha", "Arriba y a la izquierda", "Abajo y a la derecha"],
      answer: "Arriba y a la derecha",
      hint: "Coloca el triángulo a la derecha y luego el cuadrado encima de él.",
      explicacion: "El cuadrado queda encima de un triángulo que ya estaba a la derecha: está arriba y a la derecha del círculo.",
    },
  ];
  return variants[seed % variants.length];
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
