import { existsSync } from "node:fs";
import { join } from "node:path";
import { CHAPTERS, resolveReto } from "../lib/world.js";
import { CHAPTER_VISUAL_THEME, VISUAL_THEMES, sharedCharacterForGroup } from "../lib/visualCatalog.js";

function spatialType(reto) {
  const text = (reto.clues || []).join(" ").toLowerCase();
  if (text.includes("movimientos:")) return "grid";
  if (text.includes("giro:") || text.includes("giros:") || text.includes("180°")) return "turn";
  if (text.includes("detrás del vehículo") || text.includes("detras del vehiculo")) return "behind";
  if (text.includes("a la izquierda") || text.includes("a la derecha") || text.includes("encima")) return "relations";
  return null;
}

const chapters = CHAPTERS.filter((chapter) => chapter.id >= 5 && chapter.id <= 20);
const counts = { pattern: 0, grid: 0, turn: 0, behind: 0, relations: 0, order: 0 };
const uncovered = [];

for (const chapter of chapters) {
  if (!CHAPTER_VISUAL_THEME[chapter.id]) uncovered.push(`Capítulo ${chapter.id}: sin tema visual`);
  for (const caseData of chapter.cases) {
    for (const raw of caseData.retos) {
      for (const route of ["7-9", "10-12"]) {
        const reto = resolveReto(raw, route);
        const speakers = (reto.clues || [])
          .filter((clue) => String(clue).includes(":") && String(clue).includes("“"))
          .map((clue) => String(clue).split(":")[0]);
        const cast = speakers.map((speaker) => sharedCharacterForGroup(speaker, speakers));
        if (cast.length && new Set(cast).size !== cast.length) {
          uncovered.push(`${caseData.id}/${reto.id}/${route}: personajes visuales repetidos`);
        }
        if (reto.mechanic === "patron" && reto.clues?.length) counts.pattern += 1;
        if (reto.mechanic === "orden") {
          counts.order += 1;
          if (!reto.steps?.length || reto.steps.length < 3 || new Set(reto.steps).size !== reto.steps.length) {
            uncovered.push(`${caseData.id}/${reto.id}/${route}: secuencia sin pasos claros y únicos`);
          }
        }
        if (reto.mechanic === "espacial" && reto.clues?.length) {
          const type = spatialType(reto);
          if (type) counts[type] += 1;
          else uncovered.push(`${caseData.id}/${reto.id}/${route}: espacial sin visual`);
        }
      }
    }
  }
}

const missingAssets = [];
for (const [themeId, theme] of Object.entries(VISUAL_THEMES)) {
  const paths = [theme.hero, theme.aiSpeaker, ...Object.values(theme.mascot || {}), ...theme.evidence.map((item) => item.image)];
  for (const publicPath of paths) {
    if (!existsSync(join(process.cwd(), "public", publicPath))) missingAssets.push(`${themeId}: ${publicPath}`);
  }
}

console.log("Auditoría del sistema visual reutilizable");
console.table(counts);
console.log(`Capítulos cubiertos: ${chapters.length} · Temas: ${Object.keys(VISUAL_THEMES).length}`);

if (uncovered.length || missingAssets.length) {
  if (uncovered.length) console.error("Sin cobertura:", uncovered);
  if (missingAssets.length) console.error("Assets ausentes:", missingAssets);
  process.exit(1);
}

console.log("✓ Capítulos 5–20 cubiertos sin assets exclusivos por capítulo.");
