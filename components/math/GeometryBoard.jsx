"use client";

import { useEffect, useId, useRef, useState } from "react";

const COLORS = {
  ink: "#141B36",
  honey: "#FFBE3D",
  honeyStroke: "#E59A00",
  grape: "#7A66F6",
  grapeStroke: "#6751DD",
  teal: "#2DB7A3",
  tealStroke: "#168F7F",
  white: "#FFFFFF",
};

const radians = (value) => (value * Math.PI) / 180;

function triangleCoordinates([angleA, angleB]) {
  const tangentA = Math.tan(radians(angleA));
  const tangentB = Math.tan(radians(angleB));
  const x = (5 * tangentB) / (tangentA + tangentB);
  return [[0, 0], [5, 0], [x, tangentA * x]];
}

function sceneBounds(visual) {
  if (visual.type === "single-angle") return [-4.8, 4.7, 4.8, -1.2];
  if (visual.type === "angle-pair") return [-4.8, 4.7, 4.8, -1.2];
  if (visual.type === "intersection") return [-4.6, 4.4, 4.6, -4.4];
  if (visual.type === "exterior-triangle") {
    const [, , c] = triangleCoordinates(visual.angles);
    return [-0.9, Math.max(4.9, c[1] + 0.75), 7.2, -0.75];
  }
  const [, , c] = triangleCoordinates(visual.angles);
  return [-0.8, Math.max(4.9, c[1] + 0.7), 5.8, -0.7];
}

function createScene(board, visual) {
  const known = [];
  const unknown = [];
  const shapes = [];
  const relations = [];
  const pointStyle = {
    fixed: true,
    size: 3,
    face: "o",
    fillColor: COLORS.ink,
    strokeColor: COLORS.white,
    strokeWidth: 2,
    highlight: false,
    label: { color: COLORS.ink, fontSize: 15, offset: [8, 5] },
  };
  const hiddenPoint = (coords) => board.create("point", coords, { fixed: true, visible: false, name: "" });
  const point = (coords, name, offset = [8, 5]) => board.create("point", coords, {
    ...pointStyle,
    name,
    label: { ...pointStyle.label, offset },
  });
  const segment = (from, to, attributes = {}) => board.create("segment", [from, to], {
    strokeColor: COLORS.ink,
    strokeWidth: 3,
    fixed: true,
    highlight: false,
    ...attributes,
  });
  const angle = (points, name, attributes = {}) => board.create("angle", points, {
    name,
    radius: 0.72,
    orthoType: "sector",
    fillColor: COLORS.honey,
    strokeColor: COLORS.honeyStroke,
    fillOpacity: 0.2,
    strokeWidth: 2,
    highlight: false,
    fixed: true,
    label: { fontSize: 16, color: COLORS.ink },
    ...attributes,
  });
  const addTick = (coordsA, coordsB) => {
    const dx = coordsB[0] - coordsA[0];
    const dy = coordsB[1] - coordsA[1];
    const length = Math.hypot(dx, dy);
    const middle = [(coordsA[0] + coordsB[0]) / 2, (coordsA[1] + coordsB[1]) / 2];
    const perpendicular = [-dy / length, dx / length];
    const start = hiddenPoint([middle[0] - perpendicular[0] * 0.16, middle[1] - perpendicular[1] * 0.16]);
    const end = hiddenPoint([middle[0] + perpendicular[0] * 0.16, middle[1] + perpendicular[1] * 0.16]);
    relations.push(segment(start, end, { strokeColor: COLORS.grapeStroke, strokeWidth: 4 }));
  };

  if (visual.type === "single-angle") {
    const O = point([0, 0], "O", [-18, -10]);
    const A = point([3.8, 0], "A", [9, -7]);
    const B = point([3.8 * Math.cos(radians(visual.degrees)), 3.8 * Math.sin(radians(visual.degrees))], "B", [8, 8]);
    segment(O, A);
    segment(O, B);
    const mainAngle = angle([A, O, B], "?", {
      radius: visual.degrees === 180 ? 1.05 : 0.9,
      fillColor: COLORS.grape,
      strokeColor: COLORS.grapeStroke,
    });
    unknown.push({ object: mainAngle, answer: `${visual.degrees}°` });
    if (visual.rightMark) {
      const p1 = hiddenPoint([0.62, 0]);
      const p2 = hiddenPoint([0.62, 0.62]);
      const p3 = hiddenPoint([0, 0.62]);
      relations.push(segment(p1, p2, { strokeColor: COLORS.honeyStroke, strokeWidth: 3 }));
      relations.push(segment(p2, p3, { strokeColor: COLORS.honeyStroke, strokeWidth: 3 }));
    }
  }

  if (visual.type === "triangle" || visual.type === "special-triangle") {
    const coords = triangleCoordinates(visual.angles);
    const A = point(coords[0], "A", [-22, -8]);
    const B = point(coords[1], "B", [10, -8]);
    const C = point(coords[2], "C", [8, 8]);
    const vertices = [A, B, C];
    const polygon = board.create("polygon", vertices, {
      fillColor: COLORS.grape,
      fillOpacity: 0.1,
      highlight: false,
      fixed: true,
      borders: { strokeColor: COLORS.ink, strokeWidth: 3, highlight: false, fixed: true },
      vertices: { visible: false },
    });
    shapes.push(polygon);
    const pointOrders = [[B, A, C], [C, B, A], [A, C, B]];
    visual.angles.forEach((measure, index) => {
      const isMissing = index === visual.missing;
      const item = angle(pointOrders[index], isMissing ? "?" : `${measure}°`, {
        radius: index === 2 ? 0.62 : 0.72,
        orthoType: measure === 90 ? "square" : "sector",
        fillColor: isMissing ? COLORS.grape : COLORS.honey,
        strokeColor: isMissing ? COLORS.grapeStroke : COLORS.honeyStroke,
      });
      if (isMissing) unknown.push({ object: item, answer: `${measure}°` });
      else known.push(item);
    });
    if (visual.type === "special-triangle") {
      addTick(coords[0], coords[2]);
      addTick(coords[1], coords[2]);
      if (visual.kind === "equilateral") addTick(coords[0], coords[1]);
    }
  }

  if (visual.type === "angle-pair") {
    const O = point([0, 0], "O", [-18, -10]);
    const outerA = point([3.9, 0], "A", [8, -7]);
    const outerB = point([3.9 * Math.cos(radians(visual.total)), 3.9 * Math.sin(radians(visual.total))], "B", [-18, 8]);
    const divider = point([3.35 * Math.cos(radians(visual.known)), 3.35 * Math.sin(radians(visual.known))], "C", [8, 8]);
    segment(O, outerA);
    segment(O, outerB);
    segment(O, divider);
    const knownAngle = angle([outerA, O, divider], `${visual.known}°`, { radius: 0.9 });
    const missingAngle = angle([divider, O, outerB], "?", {
      radius: visual.missing > 110 ? 1.2 : 0.82,
      fillColor: COLORS.grape,
      strokeColor: COLORS.grapeStroke,
    });
    known.push(knownAngle);
    unknown.push({ object: missingAngle, answer: `${visual.missing}°` });
    if (visual.total === 90) {
      const p1 = hiddenPoint([0.55, 0]);
      const p2 = hiddenPoint([0.55, 0.55]);
      const p3 = hiddenPoint([0, 0.55]);
      relations.push(segment(p1, p2, { strokeColor: COLORS.ink, strokeWidth: 2 }));
      relations.push(segment(p2, p3, { strokeColor: COLORS.ink, strokeWidth: 2 }));
    }
  }

  if (visual.type === "intersection") {
    const theta = visual.known;
    const O = point([0, 0], "O", [8, 8]);
    const R = hiddenPoint([4.15, 0]);
    const L = hiddenPoint([-4.15, 0]);
    const U = hiddenPoint([4.15 * Math.cos(radians(theta)), 4.15 * Math.sin(radians(theta))]);
    const D = hiddenPoint([-4.15 * Math.cos(radians(theta)), -4.15 * Math.sin(radians(theta))]);
    segment(L, R);
    segment(D, U);
    const knownAngle = angle([R, O, U], `${visual.known}°`, { radius: 1.05 });
    const missingPoints = visual.relation === "vertical"
      ? [L, O, D]
      : visual.relation === "opposite-adjacent"
        ? [D, O, R]
        : [U, O, L];
    const missingAngle = angle(missingPoints, "?", {
      radius: visual.missing > 110 ? 1.25 : 0.92,
      fillColor: COLORS.grape,
      strokeColor: COLORS.grapeStroke,
    });
    known.push(knownAngle);
    unknown.push({ object: missingAngle, answer: `${visual.missing}°` });
  }

  if (visual.type === "exterior-triangle") {
    const coords = triangleCoordinates(visual.angles);
    const A = point(coords[0], "A", [-22, -8]);
    const B = point(coords[1], "B", [8, -9]);
    const C = point(coords[2], "C", [8, 8]);
    const E = point([6.7, 0], "D", [8, -8]);
    const polygon = board.create("polygon", [A, B, C], {
      fillColor: COLORS.grape,
      fillOpacity: 0.1,
      highlight: false,
      fixed: true,
      borders: { strokeColor: COLORS.ink, strokeWidth: 3, highlight: false, fixed: true },
      vertices: { visible: false },
    });
    shapes.push(polygon);
    segment(B, E, { strokeColor: COLORS.ink, strokeWidth: 3 });
    const orders = [[B, A, C], [C, B, A], [A, C, B]];
    const visibleInterior = visual.missing === "exterior" ? [true, false, true] : visual.isosceles ? [false, false, true] : [true, false, true];
    visual.angles.forEach((measure, index) => {
      if (!visibleInterior[index]) return;
      const isMissing = visual.missing === index;
      const item = angle(orders[index], isMissing ? "?" : `${measure}°`, {
        radius: index === 2 ? 0.62 : 0.72,
        fillColor: isMissing ? COLORS.grape : COLORS.honey,
        strokeColor: isMissing ? COLORS.grapeStroke : COLORS.honeyStroke,
      });
      if (isMissing) unknown.push({ object: item, answer: `${measure}°` });
      else known.push(item);
    });
    const exteriorAngle = angle([E, B, C], visual.missing === "exterior" ? "?" : `${visual.exterior}°`, {
      radius: 0.9,
      fillColor: visual.missing === "exterior" ? COLORS.grape : COLORS.honey,
      strokeColor: visual.missing === "exterior" ? COLORS.grapeStroke : COLORS.honeyStroke,
    });
    if (visual.missing === "exterior") unknown.push({ object: exteriorAngle, answer: `${visual.exterior}°` });
    else known.push(exteriorAngle);
    if (visual.isosceles) {
      addTick(coords[0], coords[2]);
      addTick(coords[1], coords[2]);
    }
  }

  return { known, unknown, shapes, relations };
}

function AngleBoard({ question, step = 0 }) {
  const rawId = useId();
  const boardId = `geometry-${rawId.replace(/:/g, "")}`;
  const boardRef = useRef(null);
  const sceneRef = useRef(null);
  const graphRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let board;
    setReady(false);
    async function createBoard() {
      const module = await import("jsxgraph");
      if (disposed) return;
      const JXG = module.default || module;
      graphRef.current = JXG;
      board = JXG.JSXGraph.initBoard(boardId, {
        boundingbox: sceneBounds(question.visual),
        keepaspectratio: true,
        axis: false,
        showNavigation: false,
        showCopyright: false,
        renderer: "svg",
        pan: { enabled: false },
        zoom: { enabled: false },
        keyboard: { enabled: false },
      });
      board.suspendUpdate();
      const scene = createScene(board, question.visual);
      board.unsuspendUpdate();
      boardRef.current = board;
      sceneRef.current = scene;
      setReady(true);
    }
    createBoard();
    return () => {
      disposed = true;
      if (board) {
        try {
          graphRef.current?.JSXGraph?.freeBoard(board);
        } catch {
          /* El contenedor también desaparece al cambiar de pregunta. */
        }
      }
      boardRef.current = null;
      sceneRef.current = null;
      graphRef.current = null;
    };
  }, [boardId, question.id, question.visual]);

  useEffect(() => {
    const board = boardRef.current;
    const scene = sceneRef.current;
    if (!board || !scene) return;
    const knownActive = step === 1;
    const ruleActive = step === 2;
    const answerActive = step >= 3;
    scene.known.forEach((item) => item.setAttribute({
      fillOpacity: knownActive ? 0.55 : 0.2,
      strokeWidth: knownActive ? 4 : 2,
    }));
    scene.unknown.forEach(({ object, answer }) => object.setAttribute({
      name: answerActive ? answer : "?",
      fillColor: answerActive ? COLORS.teal : COLORS.grape,
      strokeColor: answerActive ? COLORS.tealStroke : COLORS.grapeStroke,
      fillOpacity: answerActive ? 0.55 : ruleActive ? 0.36 : 0.2,
      strokeWidth: answerActive ? 4 : 2,
    }));
    scene.shapes.forEach((item) => item.setAttribute({ fillOpacity: ruleActive ? 0.23 : 0.1 }));
    scene.relations.forEach((item) => item.setAttribute({
      strokeColor: ruleActive ? COLORS.honeyStroke : COLORS.grapeStroke,
      strokeWidth: ruleActive ? 5 : 4,
    }));
    board.update();
  }, [step, ready, question.id]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[#fbfaf6]">
      {!ready && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-[#fbfaf6]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-ink/10 border-t-grape" />
        </div>
      )}
      <div
        id={boardId}
        className="jxgbox h-[270px] w-full border-0 sm:h-[330px]"
        role="img"
        aria-label={`Figura para la pregunta: ${question.prompt}`}
      />
    </div>
  );
}

const ANGLE_VISUALS = new Set(["single-angle", "triangle", "special-triangle", "angle-pair", "intersection", "exterior-triangle"]);

function AnswerBadge({ answer, visible }) {
  if (!visible) return null;
  const fontSize = answer.length > 14 ? 15 : answer.length > 9 ? 17 : 20;
  return (
    <g>
      <rect x="438" y="302" width="176" height="42" rx="18" fill="#DDF5F0" stroke={COLORS.teal} strokeWidth="2" />
      <text x="526" y="329" textAnchor="middle" fontSize={fontSize} fontWeight="800" fill={COLORS.tealStroke}>{answer}</text>
    </g>
  );
}

function Dimension({ x1, y1, x2, y2, label, color = COLORS.ink, dy = -10 }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />
      <line x1={x1} y1={y1 - 6} x2={x1} y2={y1 + 6} stroke={color} strokeWidth="2" />
      <line x1={x2} y1={y2 - 6} x2={x2} y2={y2 + 6} stroke={color} strokeWidth="2" />
      <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 + dy} textAnchor="middle" fontSize="22" fontWeight="800" fill={color}>{label}</text>
    </g>
  );
}

function MeasurementCard({ visual, accent }) {
  const common = { stroke: COLORS.ink, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return (
    <g>
      <text x="320" y="45" textAnchor="middle" fontSize="21" fontWeight="800" fill={COLORS.ink}>{visual.caption}</text>
      {visual.kind === "pencil" && (
        <g transform="rotate(-12 320 180)">
          <line x1="145" y1="180" x2="465" y2="180" stroke={accent} strokeWidth="30" strokeLinecap="round" />
          <polygon points="465,165 520,180 465,195" fill="#F2D2A2" stroke={COLORS.ink} strokeWidth="3" />
          <circle cx="145" cy="180" r="15" fill="#FF8177" />
          <line x1="170" y1="165" x2="170" y2="195" stroke={COLORS.ink} strokeWidth="3" />
        </g>
      )}
      {visual.kind === "room" && (
        <g>
          <rect x="130" y="85" width="380" height="185" rx="10" fill="#F0ECFF" stroke={COLORS.ink} strokeWidth="5" />
          <rect x="165" y="115" width="95" height="70" fill="#DDF5F0" stroke={COLORS.ink} strokeWidth="3" />
          <path d="M430 270 V205 A65 65 0 0 1 495 270" {...common} stroke={accent} />
          <line x1="160" y1="295" x2="480" y2="295" stroke={accent} strokeWidth="4" />
        </g>
      )}
      {visual.kind === "cities" && (
        <g>
          <circle cx="150" cy="190" r="24" fill={COLORS.honey} stroke={COLORS.ink} strokeWidth="4" />
          <circle cx="490" cy="120" r="24" fill={COLORS.grape} stroke={COLORS.ink} strokeWidth="4" />
          <path d="M175 185 C260 80 365 255 465 130" fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeDasharray="12 10" />
          <text x="150" y="235" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>Ciudad A</text>
          <text x="490" y="80" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>Ciudad B</text>
        </g>
      )}
      {visual.kind === "coin" && (
        <g>
          <ellipse cx="320" cy="145" rx="105" ry="40" fill={COLORS.honey} stroke={COLORS.ink} strokeWidth="4" />
          <path d="M215 145 V195 C215 217 262 235 320 235 C378 235 425 217 425 195 V145" fill="#E6A92D" stroke={COLORS.ink} strokeWidth="4" />
          <ellipse cx="320" cy="145" rx="58" ry="21" fill="#FFD978" opacity="0.8" />
          <Dimension x1={455} y1={145} x2={455} y2={205} label="grosor" color={accent} dy={-12} />
        </g>
      )}
      <rect x="230" y="292" width="180" height="42" rx="18" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
      <text x="320" y="319" textAnchor="middle" fontSize="19" fontWeight="800" fill={COLORS.ink}>{visual.estimate}</text>
    </g>
  );
}

function ConversionBar({ visual, accent }) {
  return (
    <g>
      <rect x="72" y="105" width="190" height="105" rx="22" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="3" />
      <rect x="378" y="105" width="190" height="105" rx="22" fill={visual.error ? "#FFE5E1" : "#FFFFFF"} stroke={visual.error ? "#FF8177" : COLORS.ink} strokeWidth="3" />
      <text x="167" y="168" textAnchor="middle" fontSize="28" fontWeight="800" fill={COLORS.ink}>{visual.from}</text>
      <text x="473" y="168" textAnchor="middle" fontSize="27" fontWeight="800" fill={visual.error ? "#D75249" : COLORS.ink}>{visual.to}</text>
      <line x1="275" y1="157" x2="360" y2="157" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      <polygon points="360,157 342,145 342,169" fill={accent} />
      <rect x="245" y="244" width="150" height="45" rx="18" fill="#FFF2CE" />
      <text x="320" y="273" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.honeyStroke}>{visual.factor}</text>
    </g>
  );
}

function CompareBars({ visual, accent }) {
  return (
    <g>
      {visual.bars.map((bar, index) => {
        const y = 115 + index * 115;
        const width = 390 * bar.ratio;
        return (
          <g key={`${bar.label}-${index}`}>
            <text x="100" y={y - 22} fontSize="19" fontWeight="800" fill={COLORS.ink}>{bar.label}</text>
            <rect x="100" y={y} width="410" height="34" rx="16" fill="#ECE8E1" />
            <rect x="100" y={y} width={width} height="34" rx="16" fill={index === 0 ? accent : COLORS.grape} opacity="0.88" />
          </g>
        );
      })}
      {visual.mode && <text x="540" y="184" textAnchor="middle" fontSize="34" fontWeight="900" fill={COLORS.ink}>{visual.mode === "sum" ? "+" : visual.mode === "difference" || visual.mode === "cut" ? "−" : ""}</text>}
    </g>
  );
}

function ScalePlan({ visual, accent }) {
  const isRectangle = visual.mode === "rectangle" || visual.mode === "square-units";
  return (
    <g>
      <rect x="218" y="18" width="204" height="38" rx="16" fill="#FFF2CE" />
      <text x="320" y="43" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.honeyStroke}>{visual.scale}</text>
      {visual.mode === "segment" && (
        <g>
          <line x1="115" y1="175" x2="525" y2="175" stroke={COLORS.ink} strokeWidth="8" strokeLinecap="round" />
          {Array.from({ length: 8 }).map((_, i) => <line key={i} x1={115 + i * 58.5} y1="160" x2={115 + i * 58.5} y2="190" stroke={accent} strokeWidth="3" />)}
          <text x="320" y="235" textAnchor="middle" fontSize="22" fontWeight="800" fill={COLORS.ink}>{visual.labels.join("  →  ")}</text>
        </g>
      )}
      {isRectangle && (
        <g>
          <rect x="165" y="90" width="310" height="180" fill={visual.mode === "square-units" ? "#DDF5F0" : "#F0ECFF"} stroke={COLORS.ink} strokeWidth="4" />
          {visual.mode === "square-units" && Array.from({ length: 9 }).map((_, i) => (
            <g key={i} opacity="0.55">
              <line x1={196 + i * 31} y1="90" x2={196 + i * 31} y2="270" stroke={COLORS.teal} />
              <line x1="165" y1={108 + i * 18} x2="475" y2={108 + i * 18} stroke={COLORS.teal} />
            </g>
          ))}
          <Dimension x1={165} y1={290} x2={475} y2={290} label={visual.labels[0]} color={accent} />
          <text x="500" y="185" fontSize="18" fontWeight="800" fill={accent} transform="rotate(90 500 185)">{visual.labels[1]}</text>
        </g>
      )}
      {visual.mode === "model" && (
        <g>
          <rect x="235" y="105" width="170" height="175" fill="#F0ECFF" stroke={COLORS.ink} strokeWidth="4" />
          <rect x="285" y="205" width="70" height="75" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="3" />
          <line x1="205" y1="105" x2="205" y2="280" stroke={accent} strokeWidth="3" />
          <text x="180" y="195" textAnchor="middle" fontSize="18" fontWeight="800" fill={accent} transform="rotate(-90 180 195)">{visual.labels.join(" → ")}</text>
        </g>
      )}
    </g>
  );
}

function RouteMap({ visual, accent }) {
  const xs = visual.points.map((point) => point[0]);
  const ys = visual.points.map((point) => point[1]);
  const minX = Math.min(...xs); const maxX = Math.max(...xs);
  const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const projected = visual.points.map(([x, y]) => [105 + ((x - minX) / Math.max(1, maxX - minX)) * 430, 245 - ((y - minY) / Math.max(1, maxY - minY)) * 145]);
  return (
    <g>
      {Array.from({ length: 9 }).map((_, i) => <line key={`v${i}`} x1={90 + i * 57} y1="75" x2={90 + i * 57} y2="275" stroke="#DED9CF" strokeWidth="1" />)}
      {Array.from({ length: 5 }).map((_, i) => <line key={`h${i}`} x1="90" y1={75 + i * 50} x2="550" y2={75 + i * 50} stroke="#DED9CF" strokeWidth="1" />)}
      <polyline points={projected.map((point) => point.join(",")).join(" ")} fill="none" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {projected.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill={i === 0 ? COLORS.honey : i === projected.length - 1 ? COLORS.teal : COLORS.white} stroke={COLORS.ink} strokeWidth="3" />)}
      <rect x="215" y="18" width="210" height="38" rx="16" fill="#FFF2CE" />
      <text x="320" y="43" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.honeyStroke}>{visual.scale}</text>
      <text x="320" y="315" textAnchor="middle" fontSize="19" fontWeight="800" fill={COLORS.ink}>{visual.labels.join("  ·  ")}</text>
    </g>
  );
}

function RectangleMeasure({ visual, accent, ruleActive }) {
  const ratio = Math.min(2.2, Math.max(1, visual.width / visual.height));
  const height = ratio > 1.5 ? 150 : 190;
  const width = height * ratio;
  const x = 320 - width / 2; const y = 170 - height / 2;
  const cols = Math.min(12, Math.max(4, Math.round(visual.width)));
  const rows = Math.min(8, Math.max(3, Math.round(visual.height)));
  return (
    <g>
      {visual.total && <text x="320" y="38" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.grapeStroke}>{visual.total}</text>}
      <rect x={x} y={y} width={width} height={height} rx={visual.square ? 3 : 8} fill={ruleActive ? "#DDF5F0" : "#F0ECFF"} stroke={visual.focus === "perimeter" || visual.focus === "both" ? accent : COLORS.ink} strokeWidth={visual.focus === "perimeter" ? 7 : 4} />
      {visual.grid && Array.from({ length: cols - 1 }).map((_, i) => <line key={`c${i}`} x1={x + ((i + 1) * width) / cols} y1={y} x2={x + ((i + 1) * width) / cols} y2={y + height} stroke="#B9AFE8" strokeWidth="1" />)}
      {visual.grid && Array.from({ length: rows - 1 }).map((_, i) => <line key={`r${i}`} x1={x} y1={y + ((i + 1) * height) / rows} x2={x + width} y2={y + ((i + 1) * height) / rows} stroke="#B9AFE8" strokeWidth="1" />)}
      <Dimension x1={x} y1={y + height + 32} x2={x + width} y2={y + height + 32} label={visual.labels[0]} color={accent} />
      <text x={x - 32} y={y + height / 2} textAnchor="middle" fontSize="22" fontWeight="800" fill={accent} transform={`rotate(-90 ${x - 32} ${y + height / 2})`}>{visual.labels[1]}</text>
      {visual.gap && <g><line x1={x + width * 0.42} y1={y + height} x2={x + width * 0.62} y2={y + height} stroke="#FBFAF6" strokeWidth="11" /><text x={x + width * 0.52} y={y + height - 12} textAnchor="middle" fontSize="16" fontWeight="800" fill="#D75249">entrada {visual.gap}</text></g>}
    </g>
  );
}

function PolygonPerimeter({ visual, accent }) {
  const xs = visual.points.map((p) => p[0]); const ys = visual.points.map((p) => p[1]);
  const minX = Math.min(...xs); const maxX = Math.max(...xs); const minY = Math.min(...ys); const maxY = Math.max(...ys);
  const points = visual.points.map(([x,y]) => [150 + ((x-minX)/(maxX-minX))*340, 265 - ((y-minY)/(maxY-minY))*190]);
  return (
    <g>
      <polygon points={points.map((p)=>p.join(",")).join(" ")} fill="#F0ECFF" stroke={accent} strokeWidth="6" strokeLinejoin="round" />
      {points.map(([x,y],i) => {
        const next = points[(i+1)%points.length];
        return <text key={i} x={(x+next[0])/2} y={(y+next[1])/2 - 10} textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.ink}>{visual.labels[i]}</text>;
      })}
    </g>
  );
}

function TriangleMeasure({ visual, accent, ruleActive }) {
  const triangle = visual.shape === "triangle";
  return (
    <g>
      {visual.total && <text x="320" y="38" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.grapeStroke}>{visual.total}</text>}
      {triangle ? <polygon points="135,265 505,265 390,78" fill={ruleActive ? "#DDF5F0" : "#F0ECFF"} stroke={COLORS.ink} strokeWidth="4" /> : <polygon points="165,265 485,265 420,80 100,80" fill={ruleActive ? "#DDF5F0" : "#F0ECFF"} stroke={COLORS.ink} strokeWidth="4" />}
      <line x1={triangle ? 390 : 420} y1="80" x2={triangle ? 390 : 420} y2="265" stroke={accent} strokeWidth="3" strokeDasharray="8 6" />
      <rect x={(triangle ? 390 : 420) - 18} y="247" width="18" height="18" fill="none" stroke={accent} strokeWidth="2" />
      <Dimension x1={135} y1={298} x2={505} y2={298} label={visual.labels[0]} color={accent} />
      <text x={triangle ? 410 : 445} y="180" fontSize="21" fontWeight="800" fill={accent}>{visual.labels[1]}</text>
    </g>
  );
}

function CompositeShape({ visual, accent, ruleActive }) {
  const fill = ruleActive ? "#DDF5F0" : "#F0ECFF";
  return (
    <g>
      {visual.kind === "cutout" && <g>
        <path d="M135 75 H500 V265 H315 V205 H135 Z" fill={fill} stroke={COLORS.ink} strokeWidth="4" />
        <text x="318" y="55" textAnchor="middle" fontSize="22" fontWeight="800" fill={accent}>{visual.labels[0]}</text>
        <text x="525" y="172" textAnchor="middle" fontSize="22" fontWeight="800" fill={accent} transform="rotate(90 525 172)">{visual.labels[1]}</text>
        <text x="225" y="193" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent}>{visual.labels[2]}</text>
        <text x="340" y="238" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent} transform="rotate(90 340 238)">{visual.labels[3]}</text>
      </g>}
      {visual.kind === "joined" && <g>
        <rect x="125" y="85" width="300" height="190" fill={fill} stroke={COLORS.ink} strokeWidth="4" />
        <rect x="425" y="180" width="110" height="95" fill="#FFF2CE" stroke={COLORS.ink} strokeWidth="4" />
        <text x="275" y="188" textAnchor="middle" fontSize="22" fontWeight="800" fill={accent}>{visual.labels[0]}</text>
        <text x="480" y="235" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.honeyStroke}>{visual.labels[1]}</text>
      </g>}
      {visual.kind === "frame" && <g>
        <rect x="115" y="65" width="410" height="230" fill={accent} opacity="0.28" stroke={COLORS.ink} strokeWidth="4" />
        <rect x="205" y="115" width="230" height="130" fill="#FBFAF6" stroke={COLORS.ink} strokeWidth="4" />
        <text x="320" y="46" textAnchor="middle" fontSize="21" fontWeight="800" fill={accent}>{visual.labels[0]}</text>
        <text x="320" y="186" textAnchor="middle" fontSize="21" fontWeight="800" fill={COLORS.ink}>{visual.labels[1]}</text>
      </g>}
      {visual.kind === "rect-triangle" && <g>
        <rect x="135" y="145" width="370" height="145" fill={fill} stroke={COLORS.ink} strokeWidth="4" />
        <polygon points="270,145 455,145 365,55" fill="#FFF2CE" stroke={COLORS.ink} strokeWidth="4" />
        <line x1="365" y1="55" x2="365" y2="145" stroke={accent} strokeWidth="2" strokeDasharray="7 5" />
        <text x="320" y="225" textAnchor="middle" fontSize="21" fontWeight="800" fill={accent}>{visual.labels[0]}</text>
        <text x="365" y="135" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.honeyStroke}>{visual.labels[1]}</text>
        <text x="390" y="102" fontSize="20" fontWeight="800" fill={COLORS.honeyStroke}>{visual.labels[2]}</text>
      </g>}
    </g>
  );
}

function PrismVolume({ visual, accent, ruleActive }) {
  return (
    <g>
      {visual.total && <text x="320" y="34" textAnchor="middle" fontSize="20" fontWeight="800" fill={COLORS.grapeStroke}>{visual.total}</text>}
      <polygon points="165,120 420,120 500,70 245,70" fill="#FFF2CE" stroke={COLORS.ink} strokeWidth="4" />
      <polygon points="420,120 500,70 500,245 420,295" fill="#D6CFFF" stroke={COLORS.ink} strokeWidth="4" />
      <rect x="165" y="120" width="255" height="175" fill={ruleActive ? "#DDF5F0" : "#F0ECFF"} stroke={COLORS.ink} strokeWidth="4" />
      {visual.halfFull && <rect x="168" y="208" width="249" height="84" fill={COLORS.teal} opacity="0.48" />}
      {visual.stacked && <line x1="165" y1="208" x2="420" y2="208" stroke={accent} strokeWidth="4" strokeDasharray="8 6" />}
      <text x="292" y="325" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent}>{visual.labels[0]}</text>
      <text x="468" y="284" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent}>{visual.labels[1]}</text>
      <text x="135" y="210" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent} transform="rotate(-90 135 210)">{visual.labels[2]}</text>
    </g>
  );
}

function ShapeComparison({ visual, accent }) {
  return (
    <g>
      <rect x="75" y="105" width="260" height="130" fill="#F0ECFF" stroke={accent} strokeWidth="6" />
      <rect x="405" y="90" width="160" height="160" fill="#DDF5F0" stroke={COLORS.teal} strokeWidth="6" />
      <text x="205" y="280" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>{visual.labels[0]}</text>
      <text x="485" y="280" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>{visual.labels[1]}</text>
      <text x="370" y="178" textAnchor="middle" fontSize="28" fontWeight="900" fill={COLORS.ink}>?</text>
    </g>
  );
}

function MeasurementBoard({ question, step = 0 }) {
  const visual = question.visual;
  const accent = step === 1 ? COLORS.honeyStroke : step >= 3 ? COLORS.teal : COLORS.grapeStroke;
  const ruleActive = step === 2;
  let scene = null;
  if (visual.type === "measurement-card") scene = <MeasurementCard visual={visual} accent={accent} />;
  if (visual.type === "conversion-bar") scene = <ConversionBar visual={visual} accent={accent} />;
  if (visual.type === "compare-bars") scene = <CompareBars visual={visual} accent={accent} />;
  if (visual.type === "scale-plan") scene = <ScalePlan visual={visual} accent={accent} />;
  if (visual.type === "route-map") scene = <RouteMap visual={visual} accent={accent} />;
  if (visual.type === "rectangle-measure") scene = <RectangleMeasure visual={visual} accent={accent} ruleActive={ruleActive} />;
  if (visual.type === "polygon-perimeter") scene = <PolygonPerimeter visual={visual} accent={accent} />;
  if (visual.type === "triangle-measure") scene = <TriangleMeasure visual={visual} accent={accent} ruleActive={ruleActive} />;
  if (visual.type === "composite-shape") scene = <CompositeShape visual={visual} accent={accent} ruleActive={ruleActive} />;
  if (visual.type === "prism-volume") scene = <PrismVolume visual={visual} accent={accent} ruleActive={ruleActive} />;
  if (visual.type === "shape-comparison") scene = <ShapeComparison visual={visual} accent={accent} />;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[#fbfaf6]">
      <svg className="h-[270px] w-full sm:h-[330px]" viewBox="0 0 640 360" role="img" aria-label={`Figura para la pregunta: ${question.prompt}`}>
        {scene}
        <AnswerBadge answer={question.answer} visible={step >= 3} />
      </svg>
    </div>
  );
}

export default function GeometryBoard(props) {
  return ANGLE_VISUALS.has(props.question.visual.type)
    ? <AngleBoard {...props} />
    : <MeasurementBoard {...props} />;
}
