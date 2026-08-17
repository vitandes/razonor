"use client";

const ARROWS = ["↑", "→", "↓", "←"];

function clueText(reto) {
  return (reto.clues || []).join(" · ");
}

export function generatedVisualType(reto = {}) {
  if (reto.visual?.type) return reto.visual.type;
  if (!reto.clues?.length) return null;
  if (reto.mechanic === "patron") return "pattern";
  if (reto.mechanic !== "espacial") return null;

  const text = clueText(reto).toLowerCase();
  if (text.includes("movimientos:")) return "grid";
  if (text.includes("giro:") || text.includes("giros:") || text.includes("180°")) return "turn";
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
      {(type === "grid" || type === "route") && <GridRouteVisual clues={reto.clues} visual={reto.visual} />}
      {type === "turn" && <TurnVisual clues={reto.clues} visual={reto.visual} />}
      {type === "relations" && <RelationsVisual clues={reto.clues} visual={reto.visual} />}
      {type === "mirror" && <MirrorVisual visual={reto.visual} />}
      {type === "coordinates" && <CoordinateVisual visual={reto.visual} />}
      {type === "symmetry" && <SymmetryVisual visual={reto.visual} />}
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

function GridRouteVisual({ clues, visual }) {
  const text = clues.join(" ");
  const movementText = text.match(/Movimientos:\s*([↑↓←→\s]+)/i)?.[1] || "";
  const moves = visual?.moves || movementText.match(/[↑↓←→]/g) || [];
  const lowerRight = text.toLowerCase().includes("inferior derecha");
  let point = visual?.start ? { x: visual.start[0], y: visual.start[1] } : lowerRight ? { x: 4, y: 4 } : { x: 2, y: 2 };
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
        <polyline points={path} fill="none" stroke="#6f5ae8" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={scale(points[0].x)} cy={scale(points[0].y)} r="23" fill="#151d3b" stroke="white" strokeWidth="5" />
        {visual?.icon && <text x={scale(points[0].x)} y={scale(points[0].y) + 9} textAnchor="middle" fontSize="25">{visual.icon}</text>}
        <circle cx={scale(points.at(-1).x)} cy={scale(points.at(-1).y)} r="21" fill="#ffb629" stroke="white" strokeWidth="6" />
        <text x={scale(points.at(-1).x)} y={scale(points.at(-1).y) + 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#151d3b">?</text>
      </svg>
      <div className="flex justify-center gap-2 sm:flex-col">
        {moves.map((move, index) => <span key={`${move}-${index}`} className="grid h-11 w-11 place-items-center rounded-xl bg-night font-display text-xl font-bold text-white shadow-sm">{move}</span>)}
      </div>
    </div>
  );
}

function TurnVisual({ clues, visual }) {
  const text = clues.join(" ").toLowerCase();
  const initial = visual?.initial ?? (text.includes("este") ? 1 : text.includes("sur") ? 2 : text.includes("oeste") ? 3 : 0);
  const turns = visual?.turns ?? (text.includes("180°") ? 2 : text.includes("izquierda") ? -1 : 1);
  const turnMark = turns === -1 ? "↶" : turns === 1 ? "↷" : "↻";
  const turnText = Math.abs(turns) === 2 ? "180°" : "90°";

  return (
    <div className="flex min-h-48 flex-wrap items-center justify-center gap-5 sm:gap-8">
      <div className="relative">
        <CompassArrow direction={initial} muted />
        {visual?.icon && <span className="absolute -bottom-2 -right-2 grid h-11 w-11 place-items-center rounded-2xl bg-white text-2xl shadow-card ring-1 ring-ink/10">{visual.icon}</span>}
      </div>
      <div className="grid justify-items-center gap-1 rounded-2xl bg-grape-soft px-5 py-3 text-grape">
        <span className="font-display text-4xl font-bold leading-none">{turnMark}</span>
        <span className="text-xs font-extrabold uppercase tracking-wide">{turnText}</span>
      </div>
      <div className="grid h-32 w-32 place-items-center rounded-full border-8 border-dashed border-honey/55 bg-honey-soft font-display text-5xl font-bold text-honey-deep shadow-card">?</div>
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

function RelationsVisual({ clues, visual }) {
  const text = clues.join(" ").toLowerCase();
  const shapes = text.includes("triángulo") || text.includes("triangulo");
  const items = visual?.items || (shapes
    ? [{ icon: "●", x: 0, y: 1 }, { icon: "▲", x: 1, y: 1 }, { icon: "■", x: 1, y: 0 }]
    : [{ icon: "🗺️", x: 0, y: 1 }, { icon: "💡", x: 1, y: 1 }, { icon: "🔑", x: 0, y: 0 }]);

  return (
    <div className="mx-auto grid max-w-sm grid-cols-3 grid-rows-3 overflow-hidden rounded-3xl bg-white p-3 shadow-card ring-1 ring-ink/10">
      {Array.from({ length: 9 }).map((_, index) => {
        const x = index % 3;
        const y = Math.floor(index / 3);
        const item = items.find((candidate) => candidate.x === x && candidate.y === y);
        return <span key={index} className={`grid aspect-square place-items-center border border-ink/10 text-4xl ${item ? "bg-gradient-to-br from-white to-grape-soft/40" : ""}`}>{item?.icon || ""}</span>;
      })}
    </div>
  );
}

function MirrorVisual({ visual }) {
  const initial = visual?.initial || 0;
  const vertical = visual?.axis === "vertical";
  return (
    <div className={`mx-auto grid min-h-52 max-w-lg items-center gap-5 ${vertical ? "grid-cols-[1fr_auto_1fr]" : "grid-rows-[1fr_auto_1fr]"}`}>
      <div className="relative grid min-h-24 place-items-center rounded-3xl bg-white shadow-card ring-1 ring-ink/10">
        <span className="text-7xl font-bold text-night" style={{ transform: `rotate(${initial * 90}deg)` }}>↑</span>
        {visual?.icon && <span className="absolute bottom-2 right-3 text-2xl">{visual.icon}</span>}
      </div>
      <div className={`${vertical ? "h-36 w-1" : "h-1 w-full"} rounded-full border-2 border-dashed border-grape/60`} aria-hidden="true" />
      <div className="grid min-h-24 place-items-center rounded-3xl bg-honey-soft font-display text-5xl font-bold text-honey-deep shadow-card ring-2 ring-dashed ring-honey/50">?</div>
    </div>
  );
}

function CoordinateVisual({ visual }) {
  return (
    <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-2">
      <span />
      <div className="grid grid-cols-4 text-center text-xs font-extrabold text-muted">
        {[1, 2, 3, 4].map((value) => <span key={value}>C{value}</span>)}
      </div>
      <div className="grid grid-rows-4 place-items-center text-xs font-extrabold text-muted">
        {[1, 2, 3, 4].map((value) => <span key={value}>F{value}</span>)}
      </div>
      <div className="grid grid-cols-4 overflow-hidden rounded-3xl bg-white p-2 shadow-card ring-1 ring-ink/10">
        {Array.from({ length: 16 }).map((_, index) => {
          const row = Math.floor(index / 4) + 1;
          const column = (index % 4) + 1;
          const active = row === visual?.row && column === visual?.column;
          return <span key={index} className={`grid aspect-square place-items-center rounded-xl border-2 border-white text-3xl ${active ? "bg-teal-soft shadow-inner" : "bg-cream"}`}>{active ? visual?.icon : ""}</span>;
        })}
      </div>
    </div>
  );
}

function SymmetryVisual({ visual }) {
  return (
    <div className="relative mx-auto grid max-w-md grid-cols-3 overflow-hidden rounded-3xl bg-white p-3 shadow-card ring-1 ring-ink/10">
      <span className="pointer-events-none absolute bottom-3 left-1/2 top-3 z-10 border-l-4 border-dashed border-grape/55" aria-hidden="true" />
      {Array.from({ length: 9 }).map((_, index) => {
        const row = Math.floor(index / 3) + 1;
        const column = (index % 3) + 1;
        const source = row === visual?.row && column === visual?.column;
        const target = row === visual?.row && column === visual?.targetColumn;
        return (
          <span key={index} className={`grid aspect-square place-items-center border border-ink/10 text-4xl ${source ? "bg-teal-soft" : target ? "bg-honey-soft" : "bg-cream/55"}`}>
            {source ? visual?.icon : target ? <span className="font-display text-3xl font-bold text-honey-deep">?</span> : ""}
          </span>
        );
      })}
    </div>
  );
}
