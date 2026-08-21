"use client";

import FractionText from "@/components/math/FractionText";

const MathText = ({ children }) => <FractionText>{children}</FractionText>;

function TableModel({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Lee primero encabezados, filas y unidades</p><div className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border-2 border-night bg-white"><div className="grid grid-cols-2 bg-night text-center text-sm font-bold text-white">{visual.headers.map((header) => <span key={header} className="p-3">{header}</span>)}</div>{visual.rows.map((row, index) => <div key={index} className="grid grid-cols-2 border-t border-ink/10 text-center"><span className="p-3 font-bold text-muted">{row[0]}</span><span className="p-3 font-display text-xl font-bold text-ink"><MathText>{`${row[1]}`}</MathText></span></div>)}</div></div>;
}

function BarChart({ visual }) {
  const maximum = Math.max(...visual.items.map((item) => item[1]));
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">La altura se compara con una misma escala</p><div className="mx-auto mt-6 flex h-56 max-w-lg items-end justify-around gap-3 border-b-4 border-l-4 border-night bg-white px-4 pt-5">{visual.items.map(([label, value], index) => <div key={label} className="flex h-full flex-1 flex-col justify-end text-center"><span className="mb-2 font-display text-sm font-bold text-ink">{value}</span><span className={`mx-auto w-full max-w-20 rounded-t-xl ${index % 2 ? "bg-teal" : "bg-grape"}`} style={{ height: `${Math.max(12, value / maximum * 78)}%` }}/><span className="mt-2 min-h-8 text-xs font-bold text-muted">{label}</span></div>)}</div></div>;
}

function LineChart({ visual }) {
  const values = visual.points.map((point) => point[1]);
  const min = Math.min(...values), max = Math.max(...values);
  // Leave a real gutter between the y axis and the first point so short labels
  // such as 10 or 22 never sit under the axis on narrow screens.
  const px = (index) => 50 + index * (210 / Math.max(1, visual.points.length - 1));
  const py = (value) => 215 - ((value - min) / Math.max(1, max - min)) * 160;
  const points = visual.points.map((point, index) => `${px(index)},${py(point[1])}`).join(" ");
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Sigue los puntos en el orden del eje horizontal</p><svg className="mx-auto mt-5 w-full max-w-[440px] rounded-2xl border-2 border-night bg-white" viewBox="0 0 300 255" role="img" aria-label="Gráfica de líneas"><line x1="28" y1="220" x2="272" y2="220" stroke="#111936" strokeWidth="3"/><line x1="28" y1="220" x2="28" y2="30" stroke="#111936" strokeWidth="3"/><polyline points={points} fill="none" stroke="#7865ef" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>{visual.points.map(([label, value], index) => <g key={label}><circle cx={px(index)} cy={py(value)} r="7" fill="#ff6f61" stroke="white" strokeWidth="3"/><text x={px(index)} y={py(value) - 13} textAnchor="middle" fontSize="11" fontWeight="800" paintOrder="stroke" stroke="white" strokeWidth="4" strokeLinejoin="round" fill="#111936">{value}</text><text x={px(index)} y="240" textAnchor="middle" fontSize="10" fontWeight="700" fill="#68708a">{label}</text></g>)}</svg></div>;
}

function Pictogram({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Cada símbolo representa {visual.keyValue}</p><div className="mx-auto mt-5 max-w-lg space-y-3">{visual.items.map(([label, count]) => <div key={label} className="grid grid-cols-[80px_1fr] items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"><span className="text-sm font-bold text-muted">{label}</span><div className="flex flex-wrap gap-2">{Array.from({ length: count }).map((_, index) => <span key={index} className="block h-7 w-7 rotate-45 rounded-md border-2 border-grape bg-grape-soft"/>)}</div></div>)}</div><p className="mt-4 text-center text-sm font-bold text-ink">Clave: 1 símbolo = {visual.keyValue}</p></div>;
}

function Audit({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">No confíes solo en la primera impresión</p><div className="mx-auto mt-5 max-w-lg rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4 font-display text-lg font-bold text-ink">{visual.claim}</div><div className="mx-auto mt-4 max-w-lg rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 text-sm font-bold text-grape">Revisa: {visual.check}</div></div>;
}

function DataCards({ values, title }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">{title}</p><div className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-2">{values.map((value, index) => <span key={`${value}-${index}`} className="grid h-14 min-w-14 place-items-center rounded-2xl border-2 border-grape bg-white px-3 font-display text-xl font-bold text-ink">{value}</span>)}</div></div>;
}

function MeanModel({ visual }) {
  return <div className="text-center"><DataCards values={visual.values} title="Reparte el total en grupos iguales"/><div className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-3"><span className="font-display text-2xl font-bold text-grape">suma</span><span className="text-2xl font-black text-honey-deep">÷</span><span className="font-display text-2xl font-bold text-grape">{visual.values.length} datos</span><span className="text-2xl font-black text-honey-deep">=</span><span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-dashed border-teal bg-teal-soft font-display text-xl font-black text-teal">?</span></div></div>;
}

function Ordered({ visual }) {
  const ordered = [...visual.values].sort((a, b) => a - b);
  return <DataCards values={ordered} title="Ordena y busca el centro"/>;
}

function DotPlot({ visual }) {
  const min = Math.min(...visual.values), max = Math.max(...visual.values);
  const values = Array.from({ length: max - min + 1 }, (_, index) => min + index);
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Cada punto es una aparición</p><div className="mx-auto mt-6 flex max-w-lg items-end justify-center gap-3 border-b-4 border-night pb-2">{values.map((value) => { const count = visual.values.filter((item) => item === value).length; return <div key={value} className="flex w-12 flex-col items-center justify-end gap-1">{Array.from({ length: count }).map((_, index) => <span key={index} className="h-5 w-5 rounded-full bg-grape"/>)}<span className="mt-2 text-xs font-bold text-muted">{value}</span></div>; })}</div></div>;
}

function RangeModel({ visual }) {
  const ordered = [...visual.values].sort((a, b) => a - b);
  return <div className="text-center"><DataCards values={ordered} title="Busca los dos extremos"/><div className="mx-auto mt-5 flex max-w-sm items-center justify-center gap-3 font-display text-xl font-bold text-ink"><span className="rounded-xl bg-grape-soft px-3 py-2">máximo</span><span>−</span><span className="rounded-xl bg-honey-soft px-3 py-2">mínimo</span><span>= ?</span></div></div>;
}

function BeforeAfter({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Compara antes y después</p><div className="mx-auto mt-5 grid max-w-lg gap-3 sm:grid-cols-2"><div className="rounded-2xl border-2 border-grape bg-grape-soft p-4"><p className="text-xs font-bold uppercase text-grape">Antes</p><p className="mt-2 font-display text-lg font-bold text-ink">{visual.before.join(", ")}</p></div><div className="rounded-2xl border-2 border-coral bg-coral-soft p-4"><p className="text-xs font-bold uppercase text-coral">Después</p><p className="mt-2 font-display text-lg font-bold text-ink">{visual.after.join(", ")}</p></div></div></div>;
}

function CompareDistributions({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Compara centro y separación</p><div className="mx-auto mt-5 grid max-w-lg gap-3 sm:grid-cols-2"><DataCards values={visual.a} title="Conjunto A"/><DataCards values={visual.b} title="Conjunto B"/></div></div>;
}

function ProbabilityScale({ visual }) {
  const labels = ["Imposible", "Poco probable", "Igual posibilidad", "Muy probable", "Seguro"];
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Ubica el evento entre imposible y seguro</p><div className="mx-auto mt-7 max-w-xl"><div className="h-4 rounded-full bg-gradient-to-r from-coral via-honey to-teal"/><div className="mt-3 grid grid-cols-5 gap-1">{labels.map((label) => <span key={label} className="text-[9px] font-bold text-muted sm:text-xs">{label}</span>)}</div><div className="mx-auto mt-5 max-w-lg rounded-2xl border-2 border-dashed border-grape bg-white p-4 font-bold text-ink">{visual.label}</div></div></div>;
}

const tokenColor = (color) => ({ rojo: "bg-coral", azul: "bg-[#3b82f6]", verde: "bg-teal", amarillo: "bg-honey", morado: "bg-grape", blanco: "bg-white border-ink/30", negro: "bg-night", gris: "bg-[#9ca3af]", naranja: "bg-[#f97316]", celeste: "bg-[#38bdf8]", rosa: "bg-[#f472b6]" }[color] || "bg-grape");
function Bag({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Todos los objetos de la bolsa son casos posibles</p><div className="mx-auto mt-5 flex min-h-44 max-w-sm flex-wrap content-center justify-center gap-3 rounded-b-[3rem] rounded-t-2xl border-4 border-night bg-white p-5">{Object.entries(visual.colors).flatMap(([color, count]) => Array.from({ length: count }).map((_, index) => <span key={`${color}-${index}`} title={color} className={`h-9 w-9 rounded-full border-2 border-white shadow-sm ${tokenColor(color)}`}/>))}</div><p className="mt-4 text-sm font-bold text-muted">Cuenta el evento pedido y el total.</p></div>;
}

function Complement({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Un evento y su contrario completan 1</p><div className="mx-auto mt-6 grid max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="rounded-2xl border-2 border-grape bg-grape-soft p-4"><span className="text-xs font-bold text-muted">{visual.event}</span><strong className="mt-2 block font-display text-2xl text-ink"><MathText>{visual.probability}</MathText></strong></div><span className="font-display text-2xl font-black text-honey-deep">+</span><div className="rounded-2xl border-2 border-dashed border-teal bg-teal-soft p-4"><span className="text-xs font-bold text-muted">no ocurre</span><strong className="mt-2 block font-display text-2xl text-teal">?</strong></div></div></div>;
}

function Experiment({ visual }) {
  const shown = Math.min(visual.trials, 60);
  const successShown = Math.round(visual.success / visual.trials * shown);
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">La evidencia viene de ensayos observados</p><div className="mx-auto mt-5 grid max-w-md grid-cols-10 gap-1.5">{Array.from({ length: shown }).map((_, index) => <span key={index} className={`aspect-square rounded-md ${index < successShown ? "bg-grape" : "bg-ink/10"}`}/>)}</div><p className="mt-4 font-bold text-muted">{visual.success} éxitos en {visual.trials} intentos</p></div>;
}

function Tree({ visual, reveal = false }) {
  const stages = visual.stages || [["A", "B"], ["A", "B"]];
  const routes = visual.routes || [
    { label: `${stages[0][0]} + ${stages[1][0]}` },
    { label: `${stages[0][0]} + ${stages[1][1]}` },
    { label: `${stages[0][1]} + ${stages[1][0]}` },
    { label: `${stages[0][1]} + ${stages[1][1]}` },
  ];
  const firstY = [78, 222];
  const routeY = [42, 114, 186, 258];
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">Sigue cada rama: primera etapa y después segunda etapa</p><svg className="mx-auto mt-5 w-full max-w-xl" viewBox="0 0 560 300" role="img" aria-label="Árbol de resultados de dos etapas"><g fill="none" stroke="#c7c1f6" strokeWidth="5" strokeLinecap="round"><path d="M88 150 L174 78"/><path d="M88 150 L174 222"/><path d="M278 78 L366 42"/><path d="M278 78 L366 114"/><path d="M278 222 L366 186"/><path d="M278 222 L366 258"/></g><rect x="16" y="119" width="84" height="62" rx="18" fill="#111936"/><text x="58" y="156" textAnchor="middle" fontSize="17" fontWeight="800" fill="#ffbd3d">Inicio</text>{stages[0].map((label, index) => <g key={`stage-${label}`}><rect x="170" y={firstY[index] - 31} width="112" height="62" rx="18" fill="#ece9ff"/><text x="226" y={firstY[index] + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="#7865ef">{label}</text></g>)}{routes.map((route, index) => { const favorable = reveal && route.favorable; return <g key={route.label}><rect x="362" y={routeY[index] - 27} width="182" height="54" rx="16" fill={favorable ? "#d8f5ef" : "white"} stroke={favorable ? "#22b8a7" : "#d9d7df"} strokeWidth="3"/><text x="453" y={routeY[index] + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={favorable ? "#158579" : "#111936"}>{route.label}</text>{favorable && <text x="523" y={routeY[index] + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill="#158579">✓</text>}</g>; })}</svg><div className="mx-auto -mt-1 grid max-w-md grid-cols-2 gap-2 text-[11px] font-extrabold uppercase tracking-wide text-muted"><span>Primera etapa</span><span>Resultados posibles</span></div><p className="mx-auto mt-4 max-w-lg text-sm font-bold text-muted">Cada ruta completa cuenta una vez. {reveal ? "Las rutas favorables están resaltadas." : "Después identifica cuáles cumplen el evento."}</p></div>;
}

export default function DataReasoningBoard({ question, step = 0 }) {
  const visual = question.visual;
  let scene = null;
  if (visual.type === "table") scene = <TableModel visual={visual}/>;
  if (visual.type === "bar") scene = <BarChart visual={visual}/>;
  if (visual.type === "line") scene = <LineChart visual={visual}/>;
  if (visual.type === "pictogram") scene = <Pictogram visual={visual}/>;
  if (visual.type === "audit") scene = <Audit visual={visual}/>;
  if (visual.type === "balance-mean") scene = <MeanModel visual={visual}/>;
  if (visual.type === "ordered") scene = <Ordered visual={visual}/>;
  if (visual.type === "dotplot") scene = <DotPlot visual={visual}/>;
  if (visual.type === "range") scene = <RangeModel visual={visual}/>;
  if (visual.type === "before-after") scene = <BeforeAfter visual={visual}/>;
  if (visual.type === "compare-distributions") scene = <CompareDistributions visual={visual}/>;
  if (visual.type === "probability-scale") scene = <ProbabilityScale visual={visual}/>;
  if (visual.type === "bag") scene = <Bag visual={visual}/>;
  if (visual.type === "complement") scene = <Complement visual={visual}/>;
  if (visual.type === "experiment") scene = <Experiment visual={visual}/>;
  if (visual.type === "tree") scene = <Tree visual={visual} reveal={step >= 3}/>;
  return <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Representación de datos para: ${question.prompt}`}>{scene}{step >= 3 && <div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-xl font-bold text-teal"><MathText>{question.answer}</MathText></div>}</div>;
}
