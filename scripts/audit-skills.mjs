import {
  CASES,
  CHAPTERS,
  PRODUCT_SKILLS,
  productSkillIdForReto,
  productSkillsForCase,
  resolveReto,
} from "../lib/world.js";
import { AI_CONTEXT_CHAPTERS } from "../lib/curriculum.js";

const errors = [];
const skillIds = Object.keys(PRODUCT_SKILLS);
const skillCounts = Object.fromEntries(skillIds.map((id) => [id, 0]));
const mechanicCounts = {};
const retoIds = new Set();

function check(condition, message) {
  if (!condition) errors.push(message);
}

for (const chapter of CHAPTERS) {
  const chapterSkills = new Set();
  for (const caseData of chapter.cases || []) {
    const derived = productSkillsForCase(caseData);
    const expectedFocus = derived.map((id) => PRODUCT_SKILLS[id].name);
    check(
      JSON.stringify(caseData.focus) === JSON.stringify(expectedFocus),
      `${caseData.id}: las etiquetas focus no coinciden con sus retos.`,
    );

    for (const reto of caseData.retos || []) {
      check(!retoIds.has(reto.id), `Id de reto duplicado: ${reto.id}`);
      retoIds.add(reto.id);
      const skillId = productSkillIdForReto(reto);
      check(Boolean(skillId), `${reto.id}: no pertenece a una habilidad de producto.`);
      if (skillId) {
        skillCounts[skillId] += 1;
        chapterSkills.add(skillId);
      }
      mechanicCounts[reto.mechanic] = (mechanicCounts[reto.mechanic] || 0) + 1;
      if (!AI_CONTEXT_CHAPTERS.has(Number(chapter.id))) {
        check(reto.mechanic !== "ia", `${reto.id}: IA fuera de un capítulo tecnológico.`);
        check(!reto.aiSays, `${reto.id}: conserva una tarjeta de IA fuera de un capítulo tecnológico.`);
      }

      for (const route of ["7-9", "10-12"]) {
        const resolved = resolveReto(reto, route);
        check(Boolean(resolved.prompt), `${reto.id}/${route}: falta prompt.`);
        check(Boolean(resolved.question), `${reto.id}/${route}: falta question.`);
        check(Boolean(resolved.hint), `${reto.id}/${route}: falta hint.`);
        check(Boolean(resolved.explicacion), `${reto.id}/${route}: falta explicación.`);
        if (resolved.mechanic === "orden") {
          check((resolved.steps || []).length >= 2, `${reto.id}/${route}: faltan pasos.`);
        } else {
          check((resolved.options || []).length >= 3, `${reto.id}/${route}: faltan opciones.`);
          check(
            new Set(resolved.options || []).size === (resolved.options || []).length,
            `${reto.id}/${route}: hay opciones repetidas.`,
          );
          check(
            (resolved.options || []).includes(resolved.answer),
            `${reto.id}/${route}: la respuesta no aparece en las opciones.`,
          );
        }
      }
    }
  }
  for (const skillId of skillIds) {
    check(chapterSkills.has(skillId), `Capítulo ${chapter.id}: falta ${PRODUCT_SKILLS[skillId].name}.`);
  }
}

const totalRetos = Object.values(skillCounts).reduce((sum, count) => sum + count, 0);
const ranges = {
  math: [15, 25],
  logic: [20, 35],
  problemSolving: [30, 45],
  spatialReasoning: [10, 20],
};

for (const [skillId, count] of Object.entries(skillCounts)) {
  const percent = (count / totalRetos) * 100;
  const [min, max] = ranges[skillId];
  check(
    percent >= min && percent <= max,
    `${PRODUCT_SKILLS[skillId].name}: ${percent.toFixed(1)}% está fuera del rango ${min}-${max}%.`,
  );
}

check(CASES.length === 130, `Se esperaban 130 casos y hay ${CASES.length}.`);
check(totalRetos === 650, `Se esperaban 650 retos y hay ${totalRetos}.`);
check(mechanicCounts.ia >= 25 && mechanicCounts.ia <= 40, `Los retos explícitos de IA deben quedar entre 25 y 40; hay ${mechanicCounts.ia || 0}.`);
check(mechanicCounts.orden >= 65, "Debe quedar al menos un reto de instrucciones por capítulo en promedio.");

console.log("Auditoría curricular de Razonor");
console.table(
  skillIds.map((id) => ({
    habilidad: PRODUCT_SKILLS[id].name,
    retos: skillCounts[id],
    porcentaje: `${((skillCounts[id] / totalRetos) * 100).toFixed(1)}%`,
  })),
);
console.log("Mecánicas:", mechanicCounts);
console.log(`Capítulos: ${CHAPTERS.length} · Casos: ${CASES.length} · Retos: ${totalRetos}`);

if (errors.length) {
  console.error(`\n${errors.length} errores encontrados:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("\n✓ Todos los capítulos cubren las cuatro habilidades y todos los retos son válidos.");
