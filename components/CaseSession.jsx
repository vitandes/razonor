"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Detective from "@/components/Detective";
import { useProgress } from "@/lib/progress";
import {
  routeFromProfile,
  resolveReto,
  MECHANIC_LABEL,
  chapterCaseCount,
  PRODUCT_SKILLS,
} from "@/lib/world";
import { rankTitle } from "@/lib/leveling";
import { CountUp, Confetti, Glow, StaggerTitle } from "@/components/fx";
import { GeneratedChallengeVisual, generatedVisualType } from "@/components/case-visuals/GeneratedChallengeVisual";
import { reusableAssetsForCase, sharedCharacterForGroup } from "@/lib/visualCatalog";

const C1_ASSET_BASE = "/assets/cases/c1-noche/optimized";
const C1_CIPHER_ASSET_BASE = "/assets/cases/c1-cifrado/optimized";
const C2_ASSET_BASE = "/assets/cases/c2-robot/optimized";
const C3_ASSET_BASE = "/assets/cases/c3-faro/optimized";
const C4_ASSET_BASE = "/assets/cases/c4-train/optimized";

const C2_SHARED_ASSETS = {
  location: "Museo Razonor · Ala tecnológica",
  hero: `${C2_ASSET_BASE}/hero-robot-museum.webp`,
  mascot: {
    happy: `${C2_ASSET_BASE}/character-razobot-neutral.webp`,
    think: `${C2_ASSET_BASE}/character-razobot-warning.webp`,
    celebrate: `${C2_ASSET_BASE}/character-razobot-celebrating.webp`,
  },
  aiSpeaker: `${C2_ASSET_BASE}/character-razobot-warning.webp`,
  evidence: [
    { label: "Terminal de análisis", image: `${C2_ASSET_BASE}/evidence-analysis-terminal.webp` },
    { label: "Puerta de seguridad", image: `${C2_ASSET_BASE}/evidence-security-door.webp` },
    { label: "Reloj imposible", image: `${C2_ASSET_BASE}/evidence-impossible-clock.webp` },
    { label: "Congelador", image: `${C2_ASSET_BASE}/evidence-freezer.webp` },
  ],
  visualEvidence: {
    terminal: `${C2_ASSET_BASE}/evidence-analysis-terminal.webp`,
    door: `${C2_ASSET_BASE}/evidence-security-door.webp`,
    clock: `${C2_ASSET_BASE}/evidence-impossible-clock.webp`,
    freezer: `${C2_ASSET_BASE}/evidence-freezer.webp`,
    redCap: `${C2_ASSET_BASE}/evidence-red-cap.webp`,
    sequence: `${C2_ASSET_BASE}/sequence-squares-circle.webp`,
  },
  mechanics: {
    ia: `${C2_ASSET_BASE}/mechanic-ai-verification.webp`,
    error: `${C2_ASSET_BASE}/mechanic-ai-verification.webp`,
    matematico: `${C2_ASSET_BASE}/mechanic-math-check.webp`,
    espacial: `${C2_ASSET_BASE}/mechanic-spatial.webp`,
    patron: `${C2_ASSET_BASE}/sequence-squares-circle.webp`,
  },
  palette: "from-[#101A38] via-[#123B57] to-[#091326]",
};

const C4_SHARED_ASSETS = {
  location: "Tren de medianoche · Estación del reloj",
  hero: `${C4_ASSET_BASE}/hero-midnight-train.webp`,
  mascot: {
    happy: `${C1_ASSET_BASE}/razo-happy.webp`,
    think: `${C1_ASSET_BASE}/razo-thinking.webp`,
    celebrate: `${C1_ASSET_BASE}/razo-celebrating.webp`,
  },
  aiSpeaker: `${C2_ASSET_BASE}/character-razobot-warning.webp`,
  palette: "from-[#0B1533] via-[#183B52] to-[#241947]",
};

const CASE_ASSETS = {
  "c1-noche": {
    location: "Museo Razonor",
    hero: `${C1_ASSET_BASE}/hero-museum-night.webp`,
    mascot: {
      happy: `${C1_ASSET_BASE}/razo-happy.webp`,
      think: `${C1_ASSET_BASE}/razo-thinking.webp`,
      celebrate: `${C1_ASSET_BASE}/razo-celebrating.webp`,
    },
    evidence: [
      { label: "Vitrina vacía", image: `${C1_ASSET_BASE}/evidence-empty-display-case.webp` },
      { label: "Linterna", image: `${C1_ASSET_BASE}/evidence-flashlight.webp` },
      { label: "Cámara 03", image: `${C1_ASSET_BASE}/evidence-security-camera.webp` },
      { label: "Código de alarma", image: `${C1_ASSET_BASE}/evidence-alarm-keypad.webp` },
    ],
    visualEvidence: {
      diamond: `${C1_ASSET_BASE}/evidence-diamond.webp`,
      report: `${C1_ASSET_BASE}/evidence-guard-report.webp`,
      roofWindow: `${C1_ASSET_BASE}/evidence-roof-window.webp`,
      backDoor: `${C1_ASSET_BASE}/evidence-back-door.webp`,
    },
    suspects: {
      rosa: `${C1_ASSET_BASE}/suspect-rosa.webp`,
      beto: `${C1_ASSET_BASE}/suspect-beto.webp`,
      cata: `${C1_ASSET_BASE}/suspect-cata.webp`,
    },
    mechanics: {
      deduccion: `${C1_ASSET_BASE}/mechanic-deduction.webp`,
      error: `${C1_ASSET_BASE}/mechanic-error.webp`,
      patron: `${C1_ASSET_BASE}/mechanic-pattern.webp`,
      matematico: `${C1_ASSET_BASE}/mechanic-math.webp`,
      orden: `${C1_ASSET_BASE}/mechanic-order.webp`,
    },
    palette: "from-[#141B36] via-[#2C2258] to-[#0E1530]",
  },
  "c1-cifrado": {
    location: "Bóveda secreta",
    hero: `${C1_CIPHER_ASSET_BASE}/hero-secret-vault.webp`,
    mascot: {
      happy: `${C1_ASSET_BASE}/razo-happy.webp`,
      think: `${C1_ASSET_BASE}/razo-thinking.webp`,
      celebrate: `${C1_ASSET_BASE}/razo-celebrating.webp`,
    },
    evidence: [
      { label: "Nota cifrada", image: `${C1_CIPHER_ASSET_BASE}/evidence-encrypted-note.webp` },
      { label: "Llave dorada", image: `${C1_CIPHER_ASSET_BASE}/evidence-golden-key.webp` },
      { label: "Caja fuerte", image: `${C1_CIPHER_ASSET_BASE}/evidence-mechanical-safe.webp` },
      { label: "Foto oculta", image: `${C1_CIPHER_ASSET_BASE}/evidence-hidden-photo.webp` },
    ],
    visualEvidence: {
      sequence: `${C1_CIPHER_ASSET_BASE}/sequence-triangles-circles.webp`,
      numbers: `${C1_CIPHER_ASSET_BASE}/sequence-safe-numbers.webp`,
      numbersDouble: `${C1_CIPHER_ASSET_BASE}/sequence-safe-numbers-double.webp`,
      grid: `${C1_CIPHER_ASSET_BASE}/grid-golden-key.webp`,
      photo: `${C1_CIPHER_ASSET_BASE}/evidence-hidden-photo.webp`,
      key: `${C1_CIPHER_ASSET_BASE}/evidence-golden-key.webp`,
      safe: `${C1_CIPHER_ASSET_BASE}/evidence-mechanical-safe.webp`,
    },
    suspects: {
      tallRedCap: `${C1_CIPHER_ASSET_BASE}/suspect-tall-red-cap.webp`,
      shortBlueCap: `${C1_CIPHER_ASSET_BASE}/suspect-short-blue-cap-glasses.webp`,
      womanRedCap: `${C1_CIPHER_ASSET_BASE}/suspect-woman-red-cap-glasses.webp`,
    },
    mechanics: {
      deduccion: `${C1_ASSET_BASE}/mechanic-deduction.webp`,
      error: `${C1_ASSET_BASE}/mechanic-error.webp`,
      patron: `${C1_CIPHER_ASSET_BASE}/sequence-triangles-circles.webp`,
      matematico: `${C1_ASSET_BASE}/mechanic-math.webp`,
      espacial: `${C1_CIPHER_ASSET_BASE}/grid-golden-key.webp`,
    },
    palette: "from-[#141B36] via-[#47346D] to-[#0E1530]",
  },
  "c2-nocreas": C2_SHARED_ASSETS,
  "c2-pensar": {
    ...C2_SHARED_ASSETS,
    location: "Laboratorio de Razobot",
    evidence: [
      { label: "Gorra roja", image: `${C2_ASSET_BASE}/evidence-red-cap.webp` },
      { label: "Congelador", image: `${C2_ASSET_BASE}/evidence-freezer.webp` },
      { label: "Secuencia visual", image: `${C2_ASSET_BASE}/sequence-squares-circle.webp` },
      { label: "Terminal de análisis", image: `${C2_ASSET_BASE}/evidence-analysis-terminal.webp` },
    ],
  },
  "c3-luces": {
    location: "Faro de las señales",
    hero: `${C3_ASSET_BASE}/hero-coded-lighthouse.webp`,
    mascot: {
      happy: `${C1_ASSET_BASE}/razo-happy.webp`,
      think: `${C1_ASSET_BASE}/razo-thinking.webp`,
      celebrate: `${C1_ASSET_BASE}/razo-celebrating.webp`,
    },
    aiSpeaker: `${C2_ASSET_BASE}/character-razobot-warning.webp`,
    evidence: [
      { label: "Señal luminosa", image: `${C3_ASSET_BASE}/evidence-signal-panel.webp` },
      { label: "Panel del faro", image: `${C3_ASSET_BASE}/route-lighthouse-panel.webp` },
      { label: "Registro morse", image: `${C3_ASSET_BASE}/evidence-morse-notebook.webp` },
      { label: "Faro codificado", image: `${C3_ASSET_BASE}/hero-coded-lighthouse.webp` },
    ],
    visualEvidence: {
      sequence: `${C3_ASSET_BASE}/sequence-lighthouse-flashes.webp`,
      route: `${C3_ASSET_BASE}/route-lighthouse-panel.webp`,
      signal: `${C3_ASSET_BASE}/evidence-signal-panel.webp`,
      notebook: `${C3_ASSET_BASE}/evidence-morse-notebook.webp`,
    },
    suspects: {
      sam: `${C3_ASSET_BASE}/sailor-sam.webp`,
      lia: `${C3_ASSET_BASE}/sailor-lia.webp`,
      pol: `${C3_ASSET_BASE}/sailor-pol.webp`,
    },
    mechanics: {
      deduccion: `${C1_ASSET_BASE}/mechanic-deduction.webp`,
      patron: `${C3_ASSET_BASE}/sequence-lighthouse-flashes.webp`,
      matematico: `${C1_ASSET_BASE}/mechanic-math.webp`,
      espacial: `${C3_ASSET_BASE}/route-lighthouse-panel.webp`,
      ia: `${C2_ASSET_BASE}/mechanic-ai-verification.webp`,
    },
    palette: "from-[#101A38] via-[#12445B] to-[#081629]",
  },
  "c3-morse": {
    location: "Sala de radio del faro",
    hero: `${C3_ASSET_BASE}/hero-coded-lighthouse.webp`,
    mascot: {
      happy: `${C1_ASSET_BASE}/razo-happy.webp`,
      think: `${C1_ASSET_BASE}/razo-thinking.webp`,
      celebrate: `${C1_ASSET_BASE}/razo-celebrating.webp`,
    },
    evidence: [
      { label: "Libreta morse", image: `${C3_ASSET_BASE}/evidence-morse-notebook.webp` },
      { label: "Señal del faro", image: `${C3_ASSET_BASE}/evidence-signal-panel.webp` },
      { label: "Cita en la playa", image: `${C3_ASSET_BASE}/evidence-beach-sunset.webp` },
      { label: "Ruta cifrada", image: `${C3_ASSET_BASE}/sequence-morse-dots-dashes.webp` },
    ],
    visualEvidence: {
      sequence: `${C3_ASSET_BASE}/sequence-morse-dots-dashes.webp`,
      morse: `${C3_ASSET_BASE}/evidence-morse-notebook.webp`,
      beach: `${C3_ASSET_BASE}/evidence-beach-sunset.webp`,
      signal: `${C3_ASSET_BASE}/evidence-signal-panel.webp`,
    },
    suspects: {
      radioElder: `${C3_ASSET_BASE}/accomplice-radio-elder.webp`,
      youngSailor: `${C3_ASSET_BASE}/accomplice-young-sailor.webp`,
      telegraphist: `${C3_ASSET_BASE}/accomplice-telegraphist.webp`,
    },
    mechanics: {
      deduccion: `${C1_ASSET_BASE}/mechanic-deduction.webp`,
      error: `${C1_ASSET_BASE}/mechanic-error.webp`,
      patron: `${C3_ASSET_BASE}/sequence-morse-dots-dashes.webp`,
      comprension: `${C3_ASSET_BASE}/evidence-beach-sunset.webp`,
      orden: `${C3_ASSET_BASE}/evidence-morse-notebook.webp`,
    },
    palette: "from-[#101A38] via-[#244A61] to-[#081629]",
  },
  "c4-boleto": {
    ...C4_SHARED_ASSETS,
    evidence: [
      { label: "Boleto sospechoso", image: `${C4_ASSET_BASE}/evidence-suspicious-ticket.webp` },
      { label: "Abrigo negro", image: `${C4_ASSET_BASE}/evidence-black-coat.webp` },
      { label: "Cámara de estación", image: `${C4_ASSET_BASE}/evidence-station-camera.webp` },
      { label: "Tren de medianoche", image: `${C4_ASSET_BASE}/evidence-locked-wagon.webp` },
    ],
    visualEvidence: {
      ticket: `${C4_ASSET_BASE}/evidence-suspicious-ticket.webp`,
      coat: `${C4_ASSET_BASE}/evidence-black-coat.webp`,
      camera: `${C4_ASSET_BASE}/evidence-station-camera.webp`,
      wagon: `${C4_ASSET_BASE}/evidence-locked-wagon.webp`,
      sequence: `${C4_ASSET_BASE}/sequence-ticket-numbers.webp`,
      cargo: `${C4_ASSET_BASE}/evidence-cargo-crates.webp`,
    },
    suspects: {
      ana: `${C4_ASSET_BASE}/passenger-ana.webp`,
      ben: `${C4_ASSET_BASE}/passenger-ben.webp`,
      coa: `${C4_ASSET_BASE}/passenger-coa.webp`,
    },
    mechanics: {
      matematico: `${C4_ASSET_BASE}/evidence-cargo-crates.webp`,
      comprension: `${C4_ASSET_BASE}/evidence-suspicious-ticket.webp`,
      deduccion: `${C4_ASSET_BASE}/evidence-black-coat.webp`,
      patron: `${C4_ASSET_BASE}/sequence-ticket-numbers.webp`,
      ia: `${C4_ASSET_BASE}/evidence-station-camera.webp`,
    },
  },
  "c4-vagon": {
    ...C4_SHARED_ASSETS,
    location: "Último vagón · Tren de medianoche",
    evidence: [
      { label: "Vagón cerrado", image: `${C4_ASSET_BASE}/evidence-locked-wagon.webp` },
      { label: "Llave maestra", image: `${C4_ASSET_BASE}/evidence-master-key.webp` },
      { label: "Guantes grises", image: `${C4_ASSET_BASE}/evidence-gray-gloves.webp` },
      { label: "Carga del vagón", image: `${C4_ASSET_BASE}/evidence-cargo-crates.webp` },
    ],
    visualEvidence: {
      wagon: `${C4_ASSET_BASE}/evidence-locked-wagon.webp`,
      key: `${C4_ASSET_BASE}/evidence-master-key.webp`,
      gloves: `${C4_ASSET_BASE}/evidence-gray-gloves.webp`,
      cargo: `${C4_ASSET_BASE}/evidence-cargo-crates.webp`,
      route: `${C4_ASSET_BASE}/diagram-map-lamp-key.webp`,
      sequence: `${C4_ASSET_BASE}/sequence-master-key-teeth.webp`,
    },
    suspects: {
      guardBlackNight: `${C4_ASSET_BASE}/guard-black-gloves-night-far.webp`,
      guardGrayNight: `${C4_ASSET_BASE}/guard-gray-gloves-night-near.webp`,
      guardGrayDay: `${C4_ASSET_BASE}/guard-gray-gloves-day-near.webp`,
    },
    mechanics: {
      espacial: `${C4_ASSET_BASE}/diagram-map-lamp-key.webp`,
      error: `${C4_ASSET_BASE}/evidence-locked-wagon.webp`,
      orden: `${C4_ASSET_BASE}/evidence-master-key.webp`,
      patron: `${C4_ASSET_BASE}/sequence-master-key-teeth.webp`,
      deduccion: `${C4_ASSET_BASE}/evidence-gray-gloves.webp`,
      matematico: `${C4_ASSET_BASE}/evidence-cargo-crates.webp`,
    },
  },
};

const MECHANIC_TONE = {
  deduccion: {
    icon: "🧭",
    ring: "ring-teal/25",
    chip: "bg-teal-soft text-teal",
    accent: "bg-teal",
  },
  patron: {
    icon: "🧩",
    ring: "ring-grape/25",
    chip: "bg-grape-soft text-grape",
    accent: "bg-grape",
  },
  error: {
    icon: "⚠️",
    ring: "ring-coral/25",
    chip: "bg-coral-soft text-coral",
    accent: "bg-coral",
  },
  comprension: {
    icon: "📖",
    ring: "ring-coral/25",
    chip: "bg-coral-soft text-coral",
    accent: "bg-coral",
  },
  orden: {
    icon: "🧠",
    ring: "ring-honey/30",
    chip: "bg-honey-soft text-honey-deep",
    accent: "bg-honey",
  },
  matematico: {
    icon: "🔢",
    ring: "ring-teal/25",
    chip: "bg-teal-soft text-teal",
    accent: "bg-teal",
  },
  ia: {
    icon: "🤖",
    ring: "ring-grape/25",
    chip: "bg-grape-soft text-grape",
    accent: "bg-grape",
  },
  espacial: {
    icon: "🧭",
    ring: "ring-coral/25",
    chip: "bg-coral-soft text-coral",
    accent: "bg-coral",
  },
};

function shuffle(arr) {
  const a = [...arr];
  for (let k = a.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [a[k], a[j]] = [a[j], a[k]];
  }
  return a;
}

function assetFor(caseData) {
  return CASE_ASSETS[caseData.id] || reusableAssetsForCase(caseData);
}

function evidenceLabel(item) {
  return typeof item === "string" ? item : item.label;
}

function evidenceImage(item) {
  return typeof item === "string" ? null : item.image || null;
}

function normalizeAssetKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mechanicAssetFor(caseData, mechanic) {
  return assetFor(caseData).mechanics?.[mechanic] || null;
}

function productSkillFor(skillId) {
  return Object.values(PRODUCT_SKILLS).find((skill) => skill.source.includes(skillId));
}

function optionAssetFor(caseData, option, clues = []) {
  const assets = assetFor(caseData);
  const suspects = assets.suspects || {};
  const key = normalizeAssetKey(option);
  if (key.includes("hombre alto") && key.includes("gorra roja") && key.includes("sin gafas")) return suspects.tallRedCap;
  if (key.includes("hombre bajo") && key.includes("gorra azul")) return suspects.shortBlueCap;
  if (key.includes("mujer alta") && key.includes("gorra roja")) return suspects.womanRedCap;
  if (key === "sam") return suspects.sam;
  if (key === "lia") return suspects.lia;
  if (key === "pol") return suspects.pol;
  if (key === "ana") return suspects.ana;
  if (key === "ben") return suspects.ben;
  if (key === "coa") return suspects.coa;
  if (key.includes("guantes negros") && key.includes("noche") && key.includes("lejos")) return suspects.guardBlackNight;
  if (key.includes("guantes grises") && key.includes("noche") && key.includes("cerca")) return suspects.guardGrayNight;
  if (key.includes("guantes grises") && key.includes("dia") && key.includes("cerca")) return suspects.guardGrayDay;
  if (key.includes("anciana") && key.includes("radioaficionada")) return suspects.radioElder;
  if (key.includes("joven") && key.includes("marinero")) return suspects.youngSailor;
  if (key.includes("telegrafista")) return suspects.telegraphist;
  if (key.includes("rosa")) return suspects.rosa;
  if (key.includes("beto")) return suspects.beto;
  if (key.includes("cata")) return suspects.cata;
  if (key.includes("razobot") || key.includes("maquina")) return assets.aiSpeaker || null;
  if (key.includes("25:00")) return assets.visualEvidence?.clock || null;
  if (key.includes("congelador") || key.includes("helado")) return assets.visualEvidence?.freezer || null;
  if (key.includes("gorra roja")) return assets.visualEvidence?.redCap || assets.visualEvidence?.photo || null;
  if (key.includes("3 → 6") || key.includes("3 -> 6")) return assets.visualEvidence?.numbersDouble || null;
  if (key.includes("2 → 4") || key.includes("2 -> 4")) return assets.visualEvidence?.numbers || null;
  const speakers = clues
    .filter((clue) => /^[^:]{1,24}:\s*[“"]/u.test(String(clue)))
    .map((clue) => normalizeAssetKey(String(clue).split(":")[0]));
  if (speakers.includes(key)) return sharedCharacterForGroup(option, speakers);
  return null;
}

function clueAssetFor(caseData, clue, siblingClues = []) {
  const assets = assetFor(caseData);
  const key = normalizeAssetKey(clue);
  const speaker = normalizeAssetKey(String(clue).split(":")[0]);

  if (speaker === "sam") return assets.suspects?.sam || null;
  if (speaker === "lia") return assets.suspects?.lia || null;
  if (speaker === "pol") return assets.suspects?.pol || null;
  if (speaker === "ana") return assets.suspects?.ana || null;
  if (speaker === "ben") return assets.suspects?.ben || null;
  if (speaker === "coa") return assets.suspects?.coa || null;

  if (speaker.includes("rosa")) return assets.suspects?.rosa || null;
  if (speaker.includes("beto")) return assets.suspects?.beto || null;
  if (speaker.includes("cata")) return assets.suspects?.cata || null;

  if (key.includes("rosa")) return assets.suspects?.rosa || null;
  if (key.includes("beto")) return assets.suspects?.beto || null;
  if (key.includes("cata")) return assets.suspects?.cata || null;
  if (key.includes("reporte") || key.includes("guardia")) return assets.visualEvidence?.report || null;
  if (key.includes("ventana") || key.includes("techo")) return assets.visualEvidence?.roofWindow || null;
  if (key.includes("diamante")) return assets.visualEvidence?.diamond || null;
  if (key.includes("puerta")) return assets.visualEvidence?.backDoor || assets.visualEvidence?.door || assets.visualEvidence?.wagon || null;
  if (key.includes("25:00") || key.includes("reloj")) return assets.visualEvidence?.clock || null;
  if (key.includes("congelador") || key.includes("helado") || key.includes("frio")) return assets.visualEvidence?.freezer || null;
  if (key.includes("gorra roja")) return assets.visualEvidence?.redCap || null;
  if (key.includes("5 → 10") || key.includes("5 -> 10")) return assets.visualEvidence?.sequence || null;
  if (key.includes("▂") || key.includes("▄")) return assets.visualEvidence?.sequence || null;
  if ((key.includes("mapa") && key.includes("lampara")) || (key.includes("llave") && key.includes("encima") && key.includes("mapa"))) return assets.visualEvidence?.route || null;
  if (key.includes("reloj gigante") || key.includes("cruzar el rio") || key.includes("estacion siguiente")) return assets.visualEvidence?.ticket || null;
  if (key.includes("guantes grises") || key.includes("turno") || key.includes("estacion final")) return assets.visualEvidence?.gloves || null;
  if (key.includes("▲") || key.includes("■") || key.includes("●") || key.includes("💡") || key.includes("•") || key.includes("cuadrado")) return assets.visualEvidence?.sequence || null;
  if (key.includes("🔑") || (key.includes("escalera") && key.includes("panel"))) return assets.visualEvidence?.grid || assets.visualEvidence?.route || null;
  if (key.includes("norte") || key.includes("izquierda")) return assets.visualEvidence?.route || null;
  if (key.includes("agua se junta") || key.includes("sol ya no") || key.includes("ultimo dia")) return assets.visualEvidence?.beach || null;
  if (key.includes("sin gafas") || key.includes("mas alto")) return assets.visualEvidence?.photo || null;
  if (key.includes("razobot")) return assets.aiSpeaker || null;
  if (key.includes("grabacion") || key.includes("camara")) return assets.visualEvidence?.camera || null;
  if (/^[^:]{1,24}:\s*[“"]/u.test(String(clue))) {
    const speakers = siblingClues
      .filter((item) => /^[^:]{1,24}:\s*[“"]/u.test(String(item)))
      .map((item) => String(item).split(":")[0]);
    return sharedCharacterForGroup(clue, speakers);
  }
  return null;
}

function stepAssetFor(caseData, step) {
  const assets = assetFor(caseData);
  const key = normalizeAssetKey(step);
  if (key.includes("ventana") || key.includes("techo")) return assets.visualEvidence?.roofWindow || null;
  if (key.includes("alarma") || key.includes("codigo")) {
    return assets.evidence?.find((item) => normalizeAssetKey(evidenceLabel(item)).includes("alarma") || normalizeAssetKey(evidenceLabel(item)).includes("codigo"))?.image || null;
  }
  if (key.includes("diamante") || key.includes("vitrina")) return assets.visualEvidence?.diamond || assets.evidence?.[0]?.image || null;
  if (key.includes("puerta")) return assets.visualEvidence?.backDoor || assets.visualEvidence?.door || assets.visualEvidence?.wagon || null;
  if (key.includes("pistas") || key.includes("inventos")) return assets.visualEvidence?.terminal || null;
  if (key.includes("escondite")) return assets.visualEvidence?.freezer || null;
  if (key.includes("atrapar")) return assets.visualEvidence?.door || null;
  if (key.includes("simbolo") || key.includes("reemplazar") || key.includes("mensaje completo")) return assets.visualEvidence?.morse || assets.visualEvidence?.notebook || null;
  if (key.includes("permiso")) return assets.visualEvidence?.key || null;
  if (key.includes("detener el tren") || key.includes("abrir la puerta")) return assets.visualEvidence?.wagon || null;
  if (key.includes("llave maestra")) return assets.visualEvidence?.key || null;
  return null;
}

function Mascot({ caseData, mood = "happy", size = 52, className = "" }) {
  const assets = assetFor(caseData);
  const key = mood === "think" ? "think" : mood === "celebrate" ? "celebrate" : "happy";
  const src = assets.mascot?.[key];

  if (!src) {
    return <Detective size={size} mood={mood === "think" ? "think" : "happy"} className={className} />;
  }

  return (
    <img
      src={src}
      alt="Razo, tu detective"
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function Bubble({ children, caseData, mood = "happy", dark = false }) {
  return (
    <div className="mt-5 flex items-start gap-3">
      <Mascot
        caseData={caseData}
        size={58}
        mood={mood}
        className="shrink-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.22)]"
      />
      <div
        className={`rounded-3xl rounded-tl-md px-4 py-3 ${
          dark ? "bg-white/12 text-white ring-1 ring-white/15" : "bg-grape-soft text-ink"
        }`}
      >
        <p className="text-[15px] leading-snug">{children}</p>
      </div>
    </div>
  );
}

export default function CaseSession({ caseData }) {
  const progress = useProgress();
  const route = routeFromProfile(progress);

  const retos = useMemo(
    () => (caseData.retos || []).map((r) => resolveReto(r, route)),
    [caseData, route],
  );

  const [phase, setPhase] = useState("intro");
  const [qi, setQi] = useState(0);
  const [solved, setSolved] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [picked, setPicked] = useState(null);
  const [wrong, setWrong] = useState(false);
  const [seq, setSeq] = useState([]);

  const startRef = useRef(Date.now());
  const resultsRef = useRef([]);
  const committedRef = useRef(false);
  const [splashSeen, setSplashSeen] = useState(false);

  const resumedRef = useRef(false);
  useEffect(() => {
    if (resumedRef.current || !progress.hydrated) return;
    const saved = progress.cases?.[caseData.id]?.inProgress?.results;
    if (Array.isArray(saved) && saved.length > 0) {
      resumedRef.current = true;
      resultsRef.current = [...saved];
      setQi(Math.min(saved.length, (caseData.retos || []).length - 1));
      setPhase("retos");
    } else {
      resumedRef.current = true;
    }
  }, [progress.hydrated, progress.cases, caseData]);

  const reto = retos[qi];
  const isOrder = reto?.mechanic === "orden";
  const options = useMemo(
    () => (reto && !isOrder ? shuffle(reto.options) : []),
    [reto, isOrder],
  );
  const stepPool = useMemo(
    () => (reto && isOrder ? shuffle(reto.steps) : []),
    [reto, isOrder],
  );

  function recordSolved() {
    resultsRef.current.push({ skill: reto.skill, firstTry: !usedHint });
  }

  function choose(opt) {
    if (solved) return;
    setPicked(opt);
    if (opt === reto.answer) {
      setSolved(true);
      recordSolved();
    } else {
      setUsedHint(true);
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
    }
  }

  function tapStep(step) {
    if (solved || seq.includes(step)) return;
    const nextSeq = [...seq, step];
    setSeq(nextSeq);
    if (nextSeq.length === reto.steps.length) {
      const ok = nextSeq.every((s, i) => s === reto.steps[i]);
      if (ok) {
        setSolved(true);
        recordSolved();
      } else {
        setUsedHint(true);
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
          setSeq([]);
        }, 600);
      }
    }
  }

  function next() {
    if (qi + 1 < retos.length) {
      progress.saveCaseProgress({
        caseId: caseData.id,
        chapter: caseData.chapter,
        results: [...resultsRef.current],
      });
      setQi(qi + 1);
      setSolved(false);
      setUsedHint(false);
      setPicked(null);
      setWrong(false);
      setSeq([]);
    } else {
      setPhase("done");
    }
  }

  useEffect(() => {
    if (phase !== "done" || committedRef.current) return;
    committedRef.current = true;
    const results = resultsRef.current;
    const minutes = Math.min(
      30,
      Math.max(1, Math.round((Date.now() - startRef.current) / 60000)),
    );
    const firstTries = results.filter((r) => r.firstTry).length;
    const ratio = results.length ? firstTries / results.length : 1;
    const stars = Math.max(1, Math.ceil(ratio * 3));
    progress.finishCase({
      caseId: caseData.id,
      chapter: caseData.chapter,
      chapterCaseCount: chapterCaseCount(caseData.chapter),
      route,
      results,
      minutes,
      stars,
    });
  }, [phase, progress, caseData, route]);

  if (phase === "intro") {
    return (
      <CaseBackdrop caseData={caseData}>
        <div className="mx-auto max-w-5xl px-5 py-6 sm:py-8">
          <TopLink light />
          <section className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-white">
              <span className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase text-white/75 ring-1 ring-white/15">
                Desafío Razonor · Capítulo {caseData.chapter}
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
                {caseData.title}
              </h1>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/78">
                {caseData.brief}
              </p>
              {caseData.focus?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {caseData.focus.map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 ring-1 ring-white/15">
                      {item}
                    </span>
                  ))}
                </div>
              )}
              <Bubble caseData={caseData} dark>{caseData.brief}</Bubble>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {assetFor(caseData).evidence.map((item, i) => (
                  <EvidenceToken key={evidenceLabel(item)} index={i + 1} item={item} />
                ))}
              </div>
              <button
                onClick={() => setPhase("retos")}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-glow transition hover:bg-honey-deep hover:text-white sm:w-auto"
              >
                Abrir expediente <span aria-hidden="true">→</span>
              </button>
            </div>
            <CaseScene caseData={caseData} />
          </section>
        </div>
      </CaseBackdrop>
    );
  }

  if (phase === "done") {
    const firstTries = resultsRef.current.filter((r) => r.firstTry).length;
    const session = progress.lastCase;
    const xpGained = session?.total ?? 0;

    const playerLeveledTo = progress.justPlayerLeveledTo;
    const rank = playerLeveledTo ? rankTitle(playerLeveledTo) : null;
    const medalChapter = progress.justChapterMedal;

    if ((playerLeveledTo || medalChapter) && !splashSeen) {
      const isMedal = Boolean(medalChapter) && !playerLeveledTo;
      return (
        <div className="fixed inset-0 z-[70] night-sky">
          <Glow />
          <Confetti count={44} />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col items-center justify-center px-8 text-center text-white">
            <div className="animate-shine text-8xl drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]">
              {isMedal ? "🏅" : rank.emoji}
            </div>
            <StaggerTitle
              text={isMedal ? "¡Capítulo resuelto!" : "¡Subiste de nivel!"}
              className="mt-6 font-display text-5xl font-bold leading-tight"
            />
            {isMedal ? (
              <p className="mt-4 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.6s" }}>
                Ganaste la medalla del Capítulo {medalChapter} 🏅
              </p>
            ) : (
              <>
                <p className="mt-4 animate-slidein font-display text-2xl font-semibold" style={{ animationDelay: "0.6s" }}>
                  Nivel <CountUp to={playerLeveledTo} duration={900} />
                </p>
                <p className="mt-2 animate-slidein text-lg text-white/90" style={{ animationDelay: "0.8s" }}>
                  Ahora eres “{rank.name}” {rank.emoji}
                </p>
              </>
            )}
            <button
              onClick={() => setSplashSeen(true)}
              className="mt-10 animate-slidein rounded-full bg-honey px-8 py-4 font-display text-lg font-bold text-night shadow-card transition hover:scale-105"
              style={{ animationDelay: "1.1s" }}
            >
              Seguir 🎉
            </button>
          </div>
        </div>
      );
    }

    return (
      <CaseBackdrop caseData={caseData}>
        <div className="pointer-events-none fixed inset-0 z-10">
          <Confetti count={30} />
        </div>
        <div className="relative z-20 mx-auto max-w-2xl px-5 py-10">
          <TopLink light />
          <div className="mt-6 animate-pop overflow-hidden rounded-[1.5rem] bg-white text-center shadow-soft ring-1 ring-white/60">
            <div className="bg-gradient-to-br from-honey-soft via-white to-teal-soft px-7 py-8">
              <Mascot
                caseData={caseData}
                size={124}
                mood="celebrate"
                className="mx-auto animate-floaty drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)]"
              />
              <p className="mt-4 text-sm font-semibold uppercase text-honey-deep">
                Expediente cerrado
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-ink">
                ¡Caso resuelto{progress.name ? `, ${progress.name}` : ""}!
              </h1>
              <p className="mt-2 text-muted">Cerraste “{caseData.title}”.</p>
            </div>

            <div className="grid grid-cols-3 gap-3 px-6 py-6">
              <Stat top={<>+<CountUp to={xpGained} duration={1200} /></>} bottom="XP" tone="bg-honey-soft text-honey-deep" />
              <Stat top={`${firstTries}/${retos.length}`} bottom="sin pista" tone="bg-teal-soft text-teal" />
              <Stat top={`🔥 ${progress.streak}`} bottom={progress.streak === 1 ? "día de racha" : "días de racha"} tone="bg-coral-soft text-coral" />
            </div>

            <div className="flex flex-col gap-3 border-t border-ink/5 px-6 pb-6 sm:flex-row">
              <Link
                href="/aprendo"
                onClick={() => progress.clearLevelUp()}
                className="flex-1 rounded-full bg-night px-6 py-3.5 font-semibold text-white transition hover:bg-night-soft"
              >
                Volver al cuartel
              </Link>
              <Link
                href="/padres"
                className="flex-1 rounded-full border border-ink/15 bg-white px-6 py-3.5 font-semibold text-ink transition hover:border-ink/30"
              >
                Ver panel de papás
              </Link>
            </div>
          </div>
        </div>
      </CaseBackdrop>
    );
  }

  const tone = MECHANIC_TONE[reto.mechanic] || MECHANIC_TONE.deduccion;
  const skill = productSkillFor(reto.skill);

  return (
    <CaseBackdrop caseData={caseData}>
      <div className="mx-auto max-w-6xl px-5 py-6 sm:py-8">
        <TopLink light />
        <ProgressRail total={retos.length} current={qi} />

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <aside className="order-2 space-y-4 lg:order-1">
            <CaseMiniFile caseData={caseData} current={qi + 1} total={retos.length} />
            <RetoVisual reto={reto} caseData={caseData} tone={tone} />
            {skill && (
              <div className="rounded-[1.25rem] bg-white/10 p-4 text-white ring-1 ring-white/15 backdrop-blur">
                <p className="text-xs font-semibold uppercase text-white/55">
                  Habilidad en juego
                </p>
                <p className="mt-1 font-display text-lg font-semibold">
                  {skill.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {skill.desc}
                </p>
              </div>
            )}
          </aside>

          <div
            key={wrong ? `shake-${qi}` : `reto-${qi}`}
            className={`order-1 overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-white/70 lg:order-2 ${wrong ? "animate-shake" : ""}`}
          >
            <div className="border-b border-ink/5 bg-gradient-to-r from-cream to-white px-5 py-4 sm:px-7">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase ${tone.chip}`}>
                <MechanicMark caseData={caseData} mechanic={reto.mechanic} tone={tone} size="sm" />
                Reto {qi + 1} de {retos.length} · {MECHANIC_LABEL[reto.mechanic]}
              </span>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-ink">
                {reto.prompt}
              </p>
            </div>

            <div className="px-5 py-5 sm:px-7 sm:py-6">
              {reto.aiSays && <AiCard text={reto.aiSays} caseData={caseData} />}
              {reto.clues && (
                generatedVisualType(reto)
                  ? <GeneratedChallengeVisual reto={reto} />
                  : <EvidenceList clues={reto.clues} tone={tone} caseData={caseData} />
              )}
              {isOrder && <OrderGuide steps={reto.steps} />}

              <div className="mt-5 rounded-[1.25rem] bg-night p-4 text-white shadow-card">
                <p className="text-xs font-semibold uppercase text-honey">
                  {isOrder ? "Tu misión" : "Pregunta clave"}
                </p>
                <p className="mt-1 font-display text-xl font-bold leading-snug">
                  {isOrder ? "Ordena los pasos respetando las reglas." : reto.question}
                </p>
              </div>

              {!isOrder ? (
                <div className="mt-4 grid gap-3">
                  {options.map((opt, index) => {
                    const isAnswer = solved && opt === reto.answer;
                    const isWrongPick = !solved && wrong && opt === picked;
                    return (
                      <OptionButton
                        key={opt}
                        option={opt}
                        index={index}
                        solved={solved}
                        isAnswer={isAnswer}
                        isWrongPick={isWrongPick}
                        caseData={caseData}
                        clues={reto.clues}
                        onClick={() => choose(opt)}
                      />
                    );
                  })}
                </div>
              ) : (
                <OrderBoard
                  steps={reto.steps}
                  selected={seq}
                  pool={stepPool}
                  solved={solved}
                  caseData={caseData}
                  onPick={tapStep}
                />
              )}

              {!solved && usedHint && (
                <Bubble caseData={caseData} mood="think">Todavía no... {reto.hint}</Bubble>
              )}

              {solved && (
                <div className="mt-5 animate-pop overflow-hidden rounded-[1.25rem] border border-teal/20 bg-teal-soft">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal text-white">
                      ✓
                    </span>
                    <div>
                      <p className="font-display font-bold text-teal">
                        {usedHint ? "¡Ahí está! Lo lograste." : "¡Exacto! A la primera."}
                      </p>
                      <p className="text-sm leading-relaxed text-ink/80">{reto.explicacion}</p>
                    </div>
                  </div>
                </div>
              )}

              {solved && (
                <button
                  onClick={next}
                  className="mt-6 w-full rounded-full bg-honey px-6 py-4 font-display text-lg font-bold text-night shadow-card transition hover:bg-honey-deep hover:text-white"
                >
                  {qi + 1 < retos.length ? "Siguiente pista →" : "Cerrar el caso"}
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </CaseBackdrop>
  );
}

function CaseBackdrop({ caseData, children }) {
  const assets = assetFor(caseData);
  return (
    <div className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${assets.palette}`}>
      <div className="absolute inset-0 night-sky opacity-70" />
      <div className="absolute left-0 top-24 h-44 w-44 rounded-full bg-honey/18 blur-3xl" />
      <div className="absolute bottom-12 right-0 h-56 w-56 rounded-full bg-teal/14 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CaseScene({ caseData }) {
  const assets = assetFor(caseData);
  if (assets.hero) {
    return (
      <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-night/70 shadow-soft ring-1 ring-white/15">
        <img
          src={assets.hero}
          alt={`Escena ilustrada de ${caseData.title}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/20 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase text-white/80 ring-1 ring-white/20 backdrop-blur">
          Escena del misterio
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] bg-night/72 p-4 text-white shadow-card ring-1 ring-white/12 backdrop-blur">
          <p className="text-xs font-semibold uppercase text-honey">{assets.location}</p>
          <p className="mt-1 font-display text-xl font-bold">{caseData.title}</p>
          <p className="mt-1 text-sm text-white/70">{caseData.minutes} min · {caseData.retos.length} retos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[1.75rem] bg-white/10 p-5 shadow-soft ring-1 ring-white/15 backdrop-blur">
      <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-honey/25 blur-2xl" />
      <div className="relative mx-auto mt-8 flex h-64 max-w-sm items-end justify-center">
        <div className="absolute bottom-0 h-24 w-72 rounded-t-[3rem] bg-night/70 ring-1 ring-white/10" />
        <div className="relative z-10 grid h-56 w-48 place-items-center rounded-t-[5rem] border-4 border-honey/70 bg-gradient-to-b from-white/22 to-white/5 shadow-glow">
          <span className="absolute top-6 text-6xl">{caseData.emoji}</span>
          <span className="absolute bottom-12 grid h-16 w-16 place-items-center rounded-2xl bg-honey text-4xl shadow-card">
            💎
          </span>
          <span className="absolute bottom-4 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white/70">
            Evidencia central
          </span>
        </div>
        <div className="absolute left-4 top-9 h-16 w-28 -rotate-12 rounded-full bg-honey/35 blur-xl" />
        <div className="absolute right-0 top-20 h-16 w-32 rotate-12 rounded-full bg-grape/30 blur-xl" />
      </div>
      <div className="relative mt-4 rounded-[1.25rem] bg-night/60 p-4 text-white ring-1 ring-white/10">
        <p className="text-xs font-semibold uppercase text-honey">{assets.location}</p>
        <p className="mt-1 font-display text-xl font-bold">{caseData.title}</p>
        <p className="mt-1 text-sm text-white/65">{caseData.minutes} min · {caseData.retos.length} retos</p>
      </div>
    </div>
  );
}

function EvidenceToken({ index, item }) {
  const label = evidenceLabel(item);
  const image = evidenceImage(item);

  return (
    <div className="group overflow-hidden rounded-[1.1rem] bg-white/10 p-3 text-white ring-1 ring-white/15 backdrop-blur">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-honey font-display text-sm font-bold text-night shadow-card">
        {index}
      </span>
      {image ? (
        <img
          src={image}
          alt=""
          className="mx-auto mt-1 h-16 w-full object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.22)] transition group-hover:scale-105"
          aria-hidden="true"
        />
      ) : (
        <p className="mt-2 text-2xl" aria-hidden="true">{itemIcon(label)}</p>
      )}
      <p className="mt-2 text-sm font-semibold leading-tight">{label}</p>
    </div>
  );
}

function CaseMiniFile({ caseData, current, total }) {
  const assets = assetFor(caseData);
  const cover = assets.evidence?.[1]?.image || assets.evidence?.[0]?.image || null;

  return (
    <div className="overflow-hidden rounded-[1.25rem] bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-white/10 p-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-honey-soft shadow-card">
          {cover ? (
            <img src={cover} alt="" className="h-12 w-12 object-contain drop-shadow-sm" aria-hidden="true" />
          ) : (
            <span className="text-2xl">{caseData.emoji}</span>
          )}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-white/55">{assets.location}</p>
          <p className="truncate font-display text-lg font-bold">{caseData.title}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4 text-sm">
        <MiniMetric label="Pista actual" value={`${current}/${total}`} />
        <MiniMetric label="Tiempo" value={`${caseData.minutes} min`} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3">
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function RetoVisual({ reto, caseData, tone }) {
  const mechanicImage = mechanicAssetFor(caseData, reto.mechanic);

  return (
    <div className={`relative overflow-hidden rounded-[1.25rem] bg-white p-5 shadow-soft ring-4 ${tone.ring}`}>
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-honey-soft" />
      <div className="relative flex items-center gap-4">
        <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-3xl ${tone.chip} text-3xl`}>
          {mechanicImage ? (
            <img src={mechanicImage} alt="" className="h-14 w-14 object-contain drop-shadow-sm" aria-hidden="true" />
          ) : (
            tone.icon
          )}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase text-muted">Tipo de reto</p>
          <p className="font-display text-xl font-bold leading-tight text-ink">
            {MECHANIC_LABEL[reto.mechanic]}
          </p>
        </div>
      </div>
    </div>
  );
}

// Fallback para expedientes que todavía no tienen ilustraciones propias.
// En cuanto existe un asset, EvidenceToken muestra la imagen y omite el emoji.
function itemIcon(item) {
  const text = normalizeAssetKey(evidenceLabel(item));
  if (text.includes("camara")) return "📹";
  if (text.includes("codigo")) return "🔐";
  if (text.includes("linterna")) return "🔦";
  if (text.includes("llave")) return "🗝️";
  if (text.includes("caja") || text.includes("boveda")) return "🔒";
  if (text.includes("nota")) return "📝";
  if (text.includes("foto")) return "📸";
  return "🗂️";
}

function ProgressRail({ total, current }) {
  return (
    <div className="mt-5 rounded-full bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full transition ${
              i < current ? "bg-honey" : i === current ? "bg-honey/70" : "bg-white/18"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function AiCard({ text, caseData }) {
  const speaker = assetFor(caseData).aiSpeaker;
  return (
    <div className="mb-4 flex items-start gap-3 rounded-[1.25rem] border-2 border-grape/20 bg-grape-soft p-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white text-xl text-white shadow-card" aria-hidden="true">
        {speaker ? <img src={speaker} alt="" className="h-14 w-14 object-contain" /> : "🤖"}
      </span>
      <p className="text-sm leading-relaxed text-ink">
        <span className="font-bold">Razobot dice:</span> “{text}”
      </p>
    </div>
  );
}

function MechanicMark({ caseData, mechanic, tone, size = "md" }) {
  const image = mechanicAssetFor(caseData, mechanic);
  const box = size === "sm" ? "h-5 w-5" : "h-9 w-9";

  if (!image) return <span aria-hidden="true">{tone.icon}</span>;

  return (
    <img
      src={image}
      alt=""
      className={`${box} object-contain drop-shadow-sm`}
      aria-hidden="true"
    />
  );
}

function EvidenceList({ clues, tone, caseData }) {
  const assets = assetFor(caseData);
  const selfContainedAssets = new Set(
    [
      assets.visualEvidence?.sequence,
      assets.visualEvidence?.numbers,
      assets.visualEvidence?.numbersDouble,
      assets.visualEvidence?.grid,
      assets.visualEvidence?.route,
    ].filter(Boolean),
  );
  const completeVisuals = [
    ...new Set(
      clues
        .map((clue) => clueAssetFor(caseData, clue, clues))
        .filter((image) => image && selfContainedAssets.has(image)),
    ),
  ];

  // Una secuencia, cuadrícula o ruta ilustrada sustituye al conjunto completo
  // de símbolos. No dejamos filas huérfanas debajo de la imagen.
  if (completeVisuals.length > 0) {
    return (
      <ul className="grid gap-2.5">
        {completeVisuals.map((image) => (
          <li key={image} className="rounded-[1rem] bg-cream p-4 ring-1 ring-ink/5">
            <img
              src={image}
              alt={`Pista visual: ${clues.join(" ")}`}
              className="mx-auto h-24 w-full object-contain drop-shadow-sm sm:h-28"
            />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid gap-2.5">
      {clues.map((clue, index) => {
        const image = clueAssetFor(caseData, clue, clues);
        return (
          <li
            key={clue}
            className="flex items-start gap-3 rounded-[1rem] bg-cream px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-ink/5"
          >
            <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl ${image ? "bg-white" : tone.accent} text-xs font-bold text-white shadow-sm`}>
              {image ? (
                <img src={image} alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span className="pt-1">{clue}</span>
          </li>
        );
      })}
    </ul>
  );
}

function OptionButton({ option, index, solved, isAnswer, isWrongPick, caseData, clues, onClick }) {
  const marker = String.fromCharCode(65 + index);
  const image = optionAssetFor(caseData, option, clues);

  return (
    <button
      onClick={onClick}
      disabled={solved}
      className={`group flex items-center gap-3 rounded-[1.15rem] border-2 px-4 py-3 text-left font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey ${
        isAnswer
          ? "animate-pop border-teal bg-teal-soft text-ink"
          : isWrongPick
            ? "border-coral bg-coral-soft text-ink"
            : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-honey hover:shadow-card"
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold ${
          isAnswer
            ? "bg-teal text-white"
            : isWrongPick
              ? "bg-coral text-white"
              : "bg-cream text-muted group-hover:bg-honey group-hover:text-night"
        }`}
      >
        {isAnswer ? "✓" : isWrongPick ? "×" : marker}
      </span>
      {image && (
        <span className="grid h-14 w-14 shrink-0 place-items-end overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5 transition group-hover:scale-105">
          <img
            src={image}
            alt=""
            className="h-14 w-14 object-contain object-bottom drop-shadow-sm"
            aria-hidden="true"
          />
        </span>
      )}
      <span className="min-w-0 flex-1">{option}</span>
    </button>
  );
}

function OrderBoard({ steps, selected, pool, solved, caseData, onPick }) {
  return (
    <div className="mt-4">
      <ol className="space-y-2.5">
        {selected.map((step, i) => {
          const image = stepAssetFor(caseData, step);
          return (
            <li
              key={step}
              className="flex items-center gap-3 rounded-[1rem] border-2 border-teal bg-teal-soft px-4 py-3 font-semibold text-ink"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal text-sm text-white">
                {i + 1}
              </span>
              {image && <img src={image} alt="" className="h-10 w-10 shrink-0 object-contain drop-shadow-sm" aria-hidden="true" />}
              <span>{step}</span>
            </li>
          );
        })}
        {Array.from({ length: steps.length - selected.length }).map((_, i) => (
          <li
            key={`empty-${i}`}
            className="flex items-center gap-3 rounded-[1rem] border-2 border-dashed border-ink/15 bg-white px-4 py-3 text-muted"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cloud text-sm">
              {selected.length + i + 1}
            </span>
            Toca un paso para ponerlo aquí
          </li>
        ))}
      </ol>

      <div className="mt-4 rounded-[1.25rem] bg-cream p-3">
        <p className="mb-2 px-1 text-xs font-semibold uppercase text-muted">
          Pasos disponibles
        </p>
        <div className="flex flex-wrap gap-2">
          {pool
            .filter((s) => !selected.includes(s))
            .map((step) => {
              const image = stepAssetFor(caseData, step);
              return (
              <button
                key={step}
                onClick={() => onPick(step)}
                disabled={solved}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white py-2 pl-2 pr-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-honey hover:shadow-card"
              >
                {image && <img src={image} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />}
                <span>{step}</span>
              </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function OrderGuide({ steps = [] }) {
  const rules = steps.slice(0, -1).map((step, index) => ({ before: step, after: steps[index + 1] }));
  const displayRules = rules.length === 3 ? [rules[1], rules[2], rules[0]] : rules;
  return (
    <section className="mt-4 rounded-[1.25rem] border border-grape/15 bg-grape-soft p-4 text-ink">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-grape font-display text-lg font-bold text-white" aria-hidden="true">1→2</span>
        <div>
          <p className="font-display font-bold">Reglas para encontrar el orden</p>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">No tienes que adivinar. Cada regla explica qué paso necesita que otro ocurra primero.</p>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {displayRules.map((rule) => (
          <li key={`${rule.before}-${rule.after}`} className="flex items-start gap-3 rounded-2xl bg-white px-3 py-2.5 text-sm leading-relaxed shadow-sm ring-1 ring-ink/5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-honey-soft font-display text-sm font-bold text-honey-deep" aria-hidden="true">↳</span>
            <span><strong>“{rule.after}”</strong> ocurre después de <strong>“{rule.before}”</strong>.</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TopLink({ light = false }) {
  return (
    <Link
      href="/aprendo"
      className={`inline-flex items-center gap-1 text-sm font-medium transition ${
        light ? "text-white/65 hover:text-white" : "text-muted hover:text-ink"
      }`}
    >
      ← Mi cuartel
    </Link>
  );
}

function Stat({ top, bottom, tone }) {
  return (
    <div className={`rounded-3xl px-3 py-4 ${tone}`}>
      <div className="font-display text-2xl font-bold">{top}</div>
      <div className="text-xs">{bottom}</div>
    </div>
  );
}
