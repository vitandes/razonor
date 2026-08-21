export const MATH_CATEGORIES = [
  { id: "numbers", title: "Números y operaciones", short: "Números", symbol: "N₁", tone: "teal" },
  { id: "fractions", title: "Fracciones", short: "Fracciones", symbol: "½", tone: "grape" },
  { id: "ratios", title: "Razones y porcentajes", short: "Proporciones", symbol: "%", tone: "honey" },
  { id: "algebra", title: "Álgebra", short: "Álgebra", symbol: "x", tone: "coral" },
  { id: "geometry", title: "Geometría y medición", short: "Geometría", symbol: "△", tone: "teal" },
  { id: "data", title: "Datos y probabilidad", short: "Datos", symbol: "▥", tone: "grape" },
];

export const MATH_SKILLS = [
  skill("NO01", "Valor posicional y comparación", "numbers", 1, []),
  skill("NO02", "Operaciones con números naturales", "numbers", 1, ["NO01"]),
  skill("NO03", "Operaciones con decimales", "numbers", 2, ["NO01", "NO02"]),
  skill("NO04", "Enteros y recta numérica", "numbers", 1, ["NO01"]),
  skill("NO05", "Operaciones con enteros", "numbers", 2, ["NO02", "NO04"]),
  skill("NO06", "Orden de operaciones", "numbers", 2, ["NO02", "NO05"]),
  skill("FR01", "Significado de las fracciones", "fractions", 1, ["NO02"]),
  skill("FR02", "Equivalencia y comparación", "fractions", 2, ["FR01"]),
  skill("FR03", "Suma y resta de fracciones", "fractions", 2, ["FR02"]),
  skill("FR04", "Multiplicación de fracciones", "fractions", 2, ["FR01", "NO02"]),
  skill("FR05", "División de fracciones", "fractions", 3, ["FR04"]),
  skill("FR06", "Fracciones y decimales", "fractions", 2, ["FR02", "NO03"]),
  skill("RP01", "Razones y tasas unitarias", "ratios", 2, ["NO02", "FR02"]),
  skill("RP02", "Razones equivalentes", "ratios", 2, ["RP01"]),
  skill("RP03", "Relaciones proporcionales", "ratios", 3, ["RP02", "FR05"]),
  skill("RP04", "Fracción, decimal y porcentaje", "ratios", 2, ["FR06", "NO03"]),
  skill("RP05", "Aplicaciones de porcentajes", "ratios", 3, ["RP03", "RP04"]),
  skill("AL01", "Variables y expresiones", "algebra", 1, ["NO02"]),
  skill("AL02", "Evaluación de expresiones", "algebra", 2, ["AL01", "NO05", "NO06"]),
  skill("AL03", "Expresiones equivalentes", "algebra", 2, ["AL02"]),
  skill("AL04", "Ecuaciones de un paso", "algebra", 2, ["AL01", "NO05"]),
  skill("AL05", "Ecuaciones lineales de varios pasos", "algebra", 3, ["AL03", "AL04"]),
  skill("AL06", "Desigualdades de una variable", "algebra", 3, ["AL04", "NO04"]),
  skill("AL07", "Relaciones lineales", "algebra", 3, ["RP03", "AL05"]),
  skill("GM01", "Unidades, conversiones y escala", "geometry", 2, ["NO03", "RP01"]),
  skill("GM02", "Perímetro, área y volumen", "geometry", 2, ["NO03", "FR03", "GM01"]),
  skill("GM03", "Ángulos y triángulos", "geometry", 3, ["NO02"]),
  skill("DP01", "Lectura de tablas y gráficas", "data", 1, ["NO01", "NO03"]),
  skill("DP02", "Centro y variabilidad", "data", 2, ["DP01", "NO03"]),
  skill("DP03", "Probabilidad básica", "data", 2, ["FR02", "RP04"]),
];

function skill(id, title, category, difficulty, prerequisites) {
  return { id, title, category, difficulty, prerequisites };
}

export const SKILL_BY_ID = Object.fromEntries(MATH_SKILLS.map((item) => [item.id, item]));
export const CATEGORY_BY_ID = Object.fromEntries(MATH_CATEGORIES.map((item) => [item.id, item]));

export function skillStatus(mastery = 0) {
  if (mastery >= 85) return { id: "mastered", label: "Dominada", color: "teal" };
  if (mastery >= 70) return { id: "almost", label: "Casi dominada", color: "honey" };
  if (mastery >= 40) return { id: "learning", label: "En aprendizaje", color: "grape" };
  return { id: "not_mastered", label: "Por fortalecer", color: "coral" };
}

export function initialPlanFromDiagnostic(diagnostic = {}, masteryState = {}) {
  const diagnosticScores = diagnostic.scores || {};
  const observedIds = Object.keys(diagnosticScores).filter((id) => SKILL_BY_ID[id]);
  const explicit = (Array.isArray(diagnostic.plan) && diagnostic.plan.length ? diagnostic.plan : ["NO02", "FR02", "RP01", "AL04"])
    .filter((id) => SKILL_BY_ID[id]);

  const masteryFor = (id) => {
    const practiced = masteryState?.[id]?.mastery;
    if (Number.isFinite(Number(practiced))) return Number(practiced);
    const diagnosed = diagnosticScores?.[id];
    return Number.isFinite(Number(diagnosed)) ? Number(diagnosed) : null;
  };
  const confidenceFor = (id) => Number(masteryState?.[id]?.confidence ?? diagnostic.confidence?.[id] ?? 0);
  const byNeed = (a, b) => (masteryFor(a) ?? 101) - (masteryFor(b) ?? 101) || MATH_SKILLS.findIndex((skill) => skill.id === a) - MATH_SKILLS.findIndex((skill) => skill.id === b);
  const priorityIds = [...new Set([...explicit.sort(byNeed), ...observedIds.sort(byNeed)])];
  const ordered = [];
  const added = new Set();

  function addWithKnownGaps(id) {
    if (!SKILL_BY_ID[id] || added.has(id)) return;
    for (const prerequisite of SKILL_BY_ID[id].prerequisites) {
      const prerequisiteMastery = masteryFor(prerequisite);
      if (prerequisiteMastery != null && prerequisiteMastery < 60) addWithKnownGaps(prerequisite);
    }
    if ((masteryFor(id) ?? 0) < 85) {
      ordered.push(id);
      added.add(id);
    }
  }

  priorityIds.forEach(addWithKnownGaps);
  MATH_SKILLS.forEach((skill) => addWithKnownGaps(skill.id));

  return ordered.map((id, index) => ({
    skill: SKILL_BY_ID[id],
    mastery: masteryFor(id) ?? 0,
    confidence: confidenceFor(id),
    evidence: masteryState?.[id] ? "practice" : diagnosticScores?.[id] != null ? "diagnostic" : "pending",
    position: index + 1,
  }));
}
