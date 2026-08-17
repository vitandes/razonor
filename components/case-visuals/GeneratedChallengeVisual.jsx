"use client";

const ARROWS = ["↑", "→", "↓", "←"];

function clueText(reto) {
  return (reto.clues || []).join(" · ");
}

export function generatedVisualType(reto = {}) {
  if (!reto.clues?.length) return null;
  if (reto.mechanic === "patron") return "pattern";
  if (reto.mechanic !== "espacial") return null;

  const text = clueText(reto).toLowerCase();
  if (text.includes("movimientos:")) return "grid";
  if (text.includes("giro:") || text.includes("giros:") || text.includes("180°")) return "turn";
  if (text.includes("detrás del vehículo") || text.includes("detras del vehiculo")) return "behind";
  if (text.includes("a la izquierda") || text.includes("a la derecha") || text.includes("encima")) return "relations";
  return null;
}

export function GeneratedChallengeVisual({ reto }) {
  const type = generatedVisualType(reto);
  if (!type) return null;

  const label = `Pista visual: ${clueText(reto)}`;
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-ink/5 bg-gradient-to-br from-cream via-white to-grape-soft/45 p-4 shadow-card" role="img" aria-label={label}>
      {type === "pattern" && <PatternVisual clues={reto.clues} />}
      {type === "grid" && <GridRouteVisual clues={reto.clues} />}
      {type === "turn" && <TurnVisual clues={reto.clues} />}
      {type === "behind" && <BehindVisual />}
      {type === "relations" && <RelationsVisual clues={reto.clues} />}
    </div>
  );
}

function PatternVisual({ clues }) {
  const source = clues.join(" ").replaceAll("❓", "?");
  const tokens = source.includes("→")
    ? source.split(/\s*→\s*/).flatMap((segment, index, all) => index < all.length - 1 ? [segment, "→"] : [segment])
    : source.split(/\s+/).filter(Boolean);

  return (
    <div className="flex min-h-28 flex-wrap items-center justify-center gap-2 sm:gap-3">
      {tokens.map((token, index) => {
        if (token === "→") return <span key={`${token}-${index}`} className="font-display text-2xl font-bold text-honey-deep" aria-hidden="true">→</span>;
        const question = token === "?";
        return (
          <span key={`${token}-${index}`} className={`grid min-h-12 min-w-12 place-items-center rounded-2xl px-3 font-display text-xl font-bold shadow-sm ring-1 ${question ? "bg-honey text-night ring-honey-deep/20" : "bg-white text-ink ring-ink/10"}`}>
            {token}
          </span>
        );
      })}
    </div>
  );
}

function GridRouteVisual({ clues }) {
  const text = clues.join(" ");
  const movementText = text.match(/Movimientos:\s*([↑↓←→\s]+)/i)?.[1] || "";
  const moves = movementText.match(/[↑↓←→]/g) || [];
  const lowerRight = text.toLowerCase().includes("inferior derecha");
  let point = lowerRight ? { x: 4, y: 4 } : { x: 2, y: 2 };
  const points = [{ ...point }];
  moves.forEach((move) => {
    if (move === "↑") point = { ...point, y: Math.max(0, point.y - 1) };
    if (move === "↓") point = { ...point, y: Math.min(4, point.y + 1) };
    if (move === "←") point = { ...point, x: Math.max(0, point.x - 1) };
    if (move === "→") point = { ...point, x: Math.min(4, point.x + 1) };
    points.push({ ...point });
  });
  const scale = (value) => 40 + value * 56;
  const path = points.map((item) => `${scale(item.x)},${scale(item.y)}`).join(" ");

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <svg viewBox="0 0 304 304" className="mx-auto h-52 w-52" aria-hidden="true">
        <rect x="12" y="12" width="280" height="280" rx="28" fill="white" stroke="#151d3b" strokeOpacity=".1" strokeWidth="4" />
        {[68, 124, 180, 236].map((value) => <path key={`v-${value}`} d={`M${value} 12V292`} stroke="#151d3b" strokeOpacity=".12" strokeWidth="3" />)}
        {[68, 124, 180, 236].map((value) => <path key={`h-${value}`} d={`M12 ${value}H292`} stroke="#151d3b" strokeOpacity=".12" strokeWidth="3" />)}
        <polyline points={path} fill="none" stroke="#6f5ae8" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 17" />
        <circle cx={scale(points[0].x)} cy={scale(points[0].y)} r="15" fill="#151d3b" />
        <circle cx={scale(points.at(-1).x)} cy={scale(points.at(-1).y)} r="18" fill="#ffb629" stroke="white" strokeWidth="6" />
      </svg>
      <div className="flex justify-center gap-2 sm:flex-col">
        {moves.map((move, index) => <span key={`${move}-${index}`} className="grid h-11 w-11 place-items-center rounded-xl bg-night font-display text-xl font-bold text-white shadow-sm">{move}</span>)}
      </div>
    </div>
  );
}

function TurnVisual({ clues }) {
  const text = clues.join(" ").toLowerCase();
  let direction = text.includes("este") ? 1 : text.includes("sur") ? 2 : text.includes("oeste") ? 3 : 0;
  if (text.includes("180°")) direction = (direction + 2) % 4;
  else {
    const rightTurns = (text.match(/derecha/g) || []).length;
    const leftTurns = (text.match(/izquierda/g) || []).length;
    direction = (direction + rightTurns - leftTurns + 8) % 4;
  }

  return (
    <div className="flex min-h-48 items-center justify-center gap-7">
      <CompassArrow direction={text.includes("este") ? 1 : 0} muted />
      <span className="grid h-12 w-12 place-items-center rounded-full bg-honey font-display text-2xl font-bold text-night">→</span>
      <CompassArrow direction={direction} />
    </div>
  );
}

function CompassArrow({ direction, muted = false }) {
  return (
    <div className={`relative grid h-32 w-32 place-items-center rounded-full border-8 bg-white shadow-card ${muted ? "border-ink/10" : "border-teal/25"}`}>
      <span className="absolute top-1 text-[10px] font-bold text-muted">N</span>
      <span className="text-7xl font-bold text-night transition" style={{ transform: `rotate(${direction * 90}deg)` }}>{ARROWS[0]}</span>
    </div>
  );
}

function BehindVisual() {
  return (
    <div className="relative mx-auto flex min-h-40 max-w-md items-center justify-center gap-5">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-coral-soft text-3xl shadow-sm">🚩</span>
      <div className="flex items-center gap-2"><span className="h-1 w-16 rounded-full bg-honey" /><span className="text-5xl text-night">→</span></div>
      <span className="grid h-24 w-32 place-items-center rounded-[2rem] bg-night text-5xl shadow-card">🚙</span>
    </div>
  );
}

function RelationsVisual({ clues }) {
  const text = clues.join(" ").toLowerCase();
  const shapes = text.includes("triángulo") || text.includes("triangulo");
  const items = shapes
    ? [{ icon: "●", x: 0, y: 1 }, { icon: "▲", x: 1, y: 1 }, { icon: "■", x: 1, y: 0 }]
    : [{ icon: "🗺️", x: 0, y: 1 }, { icon: "💡", x: 1, y: 1 }, { icon: "🔑", x: 0, y: 0 }];

  return (
    <div className="mx-auto grid max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded-3xl bg-white p-3 shadow-card ring-1 ring-ink/10">
      {Array.from({ length: 9 }).map((_, index) => {
        const x = index % 3;
        const y = Math.floor(index / 3);
        const item = items.find((candidate) => candidate.x === x && candidate.y === y);
        return <span key={index} className="grid aspect-square place-items-center border border-ink/10 text-4xl">{item?.icon || ""}</span>;
      })}
    </div>
  );
}
