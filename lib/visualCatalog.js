// Catálogo visual reutilizable de Razonor.
// Los capítulos eligen un tema existente; no crean un paquete de imágenes nuevo.

const BASE = {
  mystery: "/assets/cases/c1-noche/optimized",
  vault: "/assets/cases/c1-cifrado/optimized",
  technology: "/assets/cases/c2-robot/optimized",
  coast: "/assets/cases/c3-faro/optimized",
  journey: "/assets/cases/c4-train/optimized",
};

const RAZO = {
  happy: `${BASE.mystery}/razo-happy.webp`,
  think: `${BASE.mystery}/razo-thinking.webp`,
  celebrate: `${BASE.mystery}/razo-celebrating.webp`,
};

const RAZOBOT = `${BASE.technology}/character-razobot-warning.webp`;

export const VISUAL_THEMES = {
  mystery: {
    name: "Cuartel de misterio",
    location: "Archivo central de Razonor",
    hero: `${BASE.mystery}/hero-museum-night.webp`,
    mascot: RAZO,
    aiSpeaker: RAZOBOT,
    evidence: [
      { label: "Cámara", image: `${BASE.mystery}/evidence-security-camera.webp` },
      { label: "Linterna", image: `${BASE.mystery}/evidence-flashlight.webp` },
      { label: "Informe", image: `${BASE.mystery}/evidence-guard-report.webp` },
      { label: "Puerta", image: `${BASE.mystery}/evidence-back-door.webp` },
    ],
    palette: "from-[#141B36] via-[#2C2258] to-[#0E1530]",
  },
  vault: {
    name: "Archivo cifrado",
    location: "Bóveda de evidencias",
    hero: `${BASE.vault}/hero-secret-vault.webp`,
    mascot: RAZO,
    aiSpeaker: RAZOBOT,
    evidence: [
      { label: "Nota", image: `${BASE.vault}/evidence-encrypted-note.webp` },
      { label: "Llave", image: `${BASE.vault}/evidence-golden-key.webp` },
      { label: "Caja fuerte", image: `${BASE.vault}/evidence-mechanical-safe.webp` },
      { label: "Fotografía", image: `${BASE.vault}/evidence-hidden-photo.webp` },
    ],
    palette: "from-[#141B36] via-[#47346D] to-[#0E1530]",
  },
  technology: {
    name: "Laboratorio digital",
    location: "Laboratorio de Razobot",
    hero: `${BASE.technology}/hero-robot-museum.webp`,
    mascot: {
      happy: `${BASE.technology}/character-razobot-neutral.webp`,
      think: `${BASE.technology}/character-razobot-warning.webp`,
      celebrate: `${BASE.technology}/character-razobot-celebrating.webp`,
    },
    aiSpeaker: RAZOBOT,
    evidence: [
      { label: "Terminal", image: `${BASE.technology}/evidence-analysis-terminal.webp` },
      { label: "Puerta segura", image: `${BASE.technology}/evidence-security-door.webp` },
      { label: "Registro", image: `${BASE.technology}/evidence-impossible-clock.webp` },
      { label: "Objeto de prueba", image: `${BASE.technology}/evidence-red-cap.webp` },
    ],
    palette: "from-[#101A38] via-[#123B57] to-[#091326]",
  },
  coast: {
    name: "Estación costera",
    location: "Faro de las señales",
    hero: `${BASE.coast}/hero-coded-lighthouse.webp`,
    mascot: RAZO,
    aiSpeaker: RAZOBOT,
    evidence: [
      { label: "Panel", image: `${BASE.coast}/evidence-signal-panel.webp` },
      { label: "Libreta", image: `${BASE.coast}/evidence-morse-notebook.webp` },
      { label: "Ruta", image: `${BASE.coast}/route-lighthouse-panel.webp` },
      { label: "Señal", image: `${BASE.coast}/sequence-lighthouse-flashes.webp` },
    ],
    palette: "from-[#101A38] via-[#12445B] to-[#081629]",
  },
  journey: {
    name: "Central de viajes",
    location: "Estación del reloj",
    hero: `${BASE.journey}/hero-midnight-train.webp`,
    mascot: RAZO,
    aiSpeaker: RAZOBOT,
    evidence: [
      { label: "Boleto", image: `${BASE.journey}/evidence-suspicious-ticket.webp` },
      { label: "Llave", image: `${BASE.journey}/evidence-master-key.webp` },
      { label: "Equipaje", image: `${BASE.journey}/evidence-cargo-crates.webp` },
      { label: "Cámara", image: `${BASE.journey}/evidence-station-camera.webp` },
    ],
    palette: "from-[#0B1533] via-[#183B52] to-[#241947]",
  },
};

// Veinte capítulos pueden compartir cinco ambientes. Cambiar esta tabla no
// obliga a tocar la lógica de los retos ni a generar imágenes nuevas.
export const CHAPTER_VISUAL_THEME = {
  5: "mystery",
  6: "coast",
  7: "technology",
  8: "mystery",
  9: "technology",
  10: "vault",
  11: "mystery",
  12: "technology",
  13: "technology",
  14: "technology",
  15: "technology",
  16: "coast",
  17: "mystery",
  18: "journey",
  19: "vault",
  20: "journey",
};

const THEME_CYCLE = ["mystery", "technology", "coast", "journey", "vault"];

export function reusableAssetsForCase(caseData = {}) {
  const chapter = Number(caseData.chapter || 1);
  const themeId = CHAPTER_VISUAL_THEME[chapter] || THEME_CYCLE[(chapter - 1) % THEME_CYCLE.length];
  return VISUAL_THEMES[themeId] || VISUAL_THEMES.mystery;
}

export const SHARED_CAST = [
  `${BASE.mystery}/suspect-rosa.webp`,
  `${BASE.mystery}/suspect-beto.webp`,
  `${BASE.mystery}/suspect-cata.webp`,
  `${BASE.vault}/suspect-tall-red-cap.webp`,
  `${BASE.vault}/suspect-short-blue-cap-glasses.webp`,
  `${BASE.vault}/suspect-woman-red-cap-glasses.webp`,
  `${BASE.coast}/sailor-sam.webp`,
  `${BASE.coast}/sailor-lia.webp`,
  `${BASE.coast}/sailor-pol.webp`,
  `${BASE.journey}/passenger-ana.webp`,
  `${BASE.journey}/passenger-ben.webp`,
  `${BASE.journey}/passenger-coa.webp`,
];

export function normalizeVisualKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function sharedCharacterForLabel(label) {
  const key = normalizeVisualKey(String(label).split(":")[0]);
  if (!key || key.length > 24 || /\d/.test(key)) return null;
  let hash = 0;
  for (let index = 0; index < key.length; index += 1) hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  return SHARED_CAST[hash % SHARED_CAST.length];
}

export function sharedCharacterForGroup(label, labels = []) {
  const key = normalizeVisualKey(String(label).split(":")[0]);
  const group = [...new Set(labels.map((item) => normalizeVisualKey(String(item).split(":")[0])).filter(Boolean))];
  const index = group.indexOf(key);
  if (index < 0) return sharedCharacterForLabel(label);
  const seed = group.join("|");
  let hash = 0;
  for (let cursor = 0; cursor < seed.length; cursor += 1) hash = (hash * 31 + seed.charCodeAt(cursor)) >>> 0;
  return SHARED_CAST[(hash + index) % SHARED_CAST.length];
}
