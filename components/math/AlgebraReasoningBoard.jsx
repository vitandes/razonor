"use client";

import FractionText from "@/components/math/FractionText";

const MathText = ({ children }) => <FractionText>{children}</FractionText>;

function MathCard({ children, tone = "grape", label }) {
  const classes = tone === "coral" ? "border-coral bg-coral-soft" : tone === "honey" ? "border-honey bg-honey-soft" : tone === "teal" ? "border-teal bg-teal-soft" : "border-grape bg-grape-soft";
  return <div className={`rounded-2xl border-2 px-4 py-4 text-center ${classes}`}>{label && <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-wide text-muted">{label}</span>}<strong className="font-display text-xl font-bold text-ink sm:text-2xl"><MathText>{children}</MathText></strong></div>;
}

function Variable({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Una letra representa una cantidad</p><div className="mx-auto mt-5 grid h-24 w-24 place-items-center rounded-[1.75rem] border-2 border-coral bg-coral-soft font-display text-5xl font-black text-coral">{visual.variable}</div><p className="mx-auto mt-4 max-w-md font-display text-xl font-bold text-ink">¿Qué cantidad puede cambiar?</p></div>;
}

function HiddenRelation({ kind = "expresión" }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Construye la {kind} sin saltarte la relación</p><div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-3"><MathCard tone="grape">x</MathCard><span className="font-display text-4xl font-black text-coral">?</span><MathCard tone="honey">cantidad</MathCard></div><p className="mt-4 text-sm font-bold text-muted">Decide qué operación o signo conecta las cantidades.</p></div>;
}

function Expression({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Lee la estructura, no solo los símbolos</p><div className="mx-auto mt-5 max-w-lg rounded-2xl border-2 border-night bg-white px-5 py-6 font-display text-3xl font-bold text-ink sm:text-4xl"><MathText>{visual.expression}</MathText></div>{visual.focus && <p className="mt-4 text-sm font-bold text-coral">Busca: {visual.focus}</p>}</div>;
}

function Parts({ visual }) {
  const terms = visual.expression.split(/(?=\s[+−-]\s)/);
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Cada término cumple una función</p><div className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-3">{terms.map((term, index) => <MathCard key={`${term}-${index}`} tone={index ? "honey" : "coral"} label={`término ${index + 1}`}>{term.trim()}</MathCard>)}</div><p className="mt-4 text-sm font-bold text-muted">Identifica: {visual.focus}</p></div>;
}

function Classify({ visual }) {
  return <div className="text-center"><Expression visual={visual} /><span className="mt-4 inline-flex rounded-full bg-night px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">¿Expresión, ecuación o desigualdad?</span></div>;
}

function Substitute({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Sustituye cada letra por su valor</p><div className="mx-auto mt-5 flex max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"><MathCard tone="honey">{visual.expression}</MathCard><span className="rotate-90 text-2xl font-black text-coral sm:rotate-0">→</span><div className="flex flex-wrap justify-center gap-2">{visual.values?.map((value) => <MathCard key={value} tone="grape">{value}</MathCard>)}</div><span className="rotate-90 text-2xl font-black text-coral sm:rotate-0">→</span><MathCard tone="teal">?</MathCard></div></div>;
}

function Compare({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-coral">Compara con la misma regla</p><div className="mx-auto mt-5 grid max-w-lg gap-3 sm:grid-cols-2">{visual.items.map((item, index) => <MathCard key={`${item.label}-${index}`} tone={index ? "teal" : "grape"} label={item.label}>{item.value}</MathCard>)}</div></div>;
}

function Tiles({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Solo se reúnen términos semejantes</p><div className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-2">{visual.terms.map((amount, group) => Array.from({ length: Math.min(Math.abs(amount), 9) }).map((_, index) => <span key={`${group}-${index}`} className={`grid h-14 w-10 place-items-center rounded-lg border-2 font-display text-lg font-bold ${amount < 0 ? "border-coral bg-coral-soft text-coral" : "border-grape bg-grape-soft text-grape"}`}>{amount < 0 ? "−" : ""}{visual.variable}</span>))}</div><p className="mt-4 text-sm font-bold text-muted">Cada ficha representa un término con {visual.variable}</p></div>;
}

function Balance({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Los dos lados deben conservar el mismo valor</p><div className="mx-auto mt-5 max-w-lg"><div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3"><MathCard tone="grape" label="lado izquierdo">{visual.left}</MathCard><span className="pb-4 font-display text-3xl font-black text-honey-deep">=</span><MathCard tone="teal" label="lado derecho">{visual.right}</MathCard></div><div className="mx-auto mt-3 h-2 w-4/5 rounded-full bg-night"/><div className="mx-auto h-12 w-2 bg-night"/><div className="mx-auto h-2 w-24 rounded-full bg-night"/>{visual.candidate && <p className="mt-4 font-bold text-coral">Comprueba con {visual.candidate}</p>}</div></div>;
}

function Progression({ visual, question, step }) {
  const stages = question.steps.map((item) => item.equation).filter((value) => value !== question.answer && value !== visual.expression);
  const visible = stages.slice(0, step);
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Una transformación válida por paso</p><div className="mx-auto mt-5 flex max-w-xl flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center"><MathCard tone="honey">{visual.expression}</MathCard>{visible.map((value, index) => <div className="contents" key={`${value}-${index}`}><span className="rotate-90 text-2xl font-black text-coral sm:rotate-0">→</span><MathCard tone="grape">{value}</MathCard></div>)}{step < 3 && <div className="contents"><span className="rotate-90 text-2xl font-black text-coral sm:rotate-0">→</span><MathCard tone="teal">?</MathCard></div>}</div></div>;
}

function ErrorModel({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Encuentra el primer paso que rompe la relación</p><div className="mx-auto mt-5 max-w-lg rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4 font-display text-xl font-bold text-ink line-through decoration-coral"><MathText>{visual.claim}</MathText></div><div className="mx-auto mt-4 max-w-lg rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-bold text-grape"><MathText>{visual.check}</MathText></div></div>;
}

function Inequality({ visual }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">La solución puede contener muchos valores</p><div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-night bg-white px-5 py-6 font-display text-4xl font-bold text-ink"><MathText>{visual.expression}</MathText></div></div>;
}

function NumberLine({ visual }) {
  const values = Array.from({ length: 9 }, (_, index) => visual.boundary - 4 + index);
  const right = visual.sign === ">" || visual.sign === "≥";
  const closed = visual.sign === "≤" || visual.sign === "≥";
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">El punto marca el límite; la flecha, las soluciones</p><div className="no-scrollbar mx-auto mt-7 max-w-2xl overflow-x-auto px-4 pb-5"><div className="relative mx-auto flex min-w-[520px] justify-between"><div className="absolute left-2 right-2 top-3 h-1 rounded-full bg-ink/20"/><div className={`absolute top-3 h-1 bg-coral ${right ? "left-1/2 right-2" : "left-2 right-1/2"}`}/><span className={`absolute top-[5px] z-20 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] border-coral ${closed ? "bg-coral" : "bg-white"}`} style={{ left: "50%" }}/><span className={`absolute top-[1px] z-20 font-display text-xl font-black leading-none text-coral ${right ? "right-0" : "left-0"}`}>{right ? "▶" : "◀"}</span>{values.map((value) => <div key={value} className="relative z-10 w-12 text-center"><span className="mx-auto block h-7 w-1 bg-ink/35"/><span className={`mt-2 block text-xs font-bold ${value === visual.boundary ? "text-coral" : "text-muted"}`}>{value}</span></div>)}</div></div></div>;
}

function Table({ visual }) {
  return <div><p className="text-center text-sm font-extrabold uppercase tracking-wide text-coral">Busca un cambio constante entre filas</p><div className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border-2 border-night bg-white"><div className="grid grid-cols-2 bg-night text-center text-sm font-bold text-white">{visual.headers.map((header) => <span key={header} className="p-3">{header}</span>)}</div>{visual.rows.map((row, index) => <div key={index} className="grid grid-cols-2 border-t border-ink/10 text-center font-display text-xl font-bold text-ink">{row.map((value, cell) => <span key={cell} className="p-3">{value}</span>)}</div>)}</div></div>;
}

function Graph({ visual }) {
  const xs = visual.points.map((point) => point[0]);
  const ys = visual.points.map((point) => point[1]);
  const minX = Math.min(0, ...xs), maxX = Math.max(1, ...xs), minY = Math.min(0, ...ys), maxY = Math.max(1, ...ys);
  const px = (x) => 28 + ((x - minX) / Math.max(1, maxX - minX)) * 224;
  const py = (y) => 242 - ((y - minY) / Math.max(1, maxY - minY)) * 204;
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">La inclinación representa la tasa de cambio</p><svg className="mx-auto mt-5 aspect-square w-full max-w-[290px] rounded-2xl border-2 border-night bg-white" viewBox="0 0 280 270" role="img" aria-label="Plano cartesiano con dos puntos de una relación lineal"><line x1="28" y1={py(0)} x2="258" y2={py(0)} stroke="#111936" strokeWidth="3"/><line x1={px(0)} y1="242" x2={px(0)} y2="22" stroke="#111936" strokeWidth="3"/><line x1={px(xs[0])} y1={py(ys[0])} x2={px(xs[1])} y2={py(ys[1])} stroke="#7865ef" strokeWidth="5" strokeLinecap="round"/>{visual.points.map(([x, y]) => <g key={`${x}-${y}`}><circle cx={px(x)} cy={py(y)} r="8" fill="#ff6f61" stroke="white" strokeWidth="3"/><text x={px(x)} y={py(y) - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill="#111936">({x}, {y})</text></g>)}</svg></div>;
}

export default function AlgebraReasoningBoard({ question, step = 0 }) {
  const visual = question.visual;
  let scene = null;
  if (visual.type === "variable") scene = <Variable visual={visual}/>;
  if (visual.type === "expression") scene = step === 0 && visual.expression === question.answer ? <HiddenRelation/> : <Expression visual={visual}/>;
  if (visual.type === "parts") scene = <Parts visual={visual}/>;
  if (visual.type === "classify") scene = <Classify visual={visual}/>;
  if (visual.type === "substitute") scene = <Substitute visual={visual}/>;
  if (visual.type === "compare") scene = <Compare visual={visual}/>;
  if (visual.type === "tiles") scene = <Tiles visual={visual}/>;
  if (visual.type === "balance") scene = <Balance visual={visual}/>;
  if (visual.type === "steps") scene = <Progression visual={visual} question={question} step={step}/>;
  if (visual.type === "error") scene = <ErrorModel visual={visual}/>;
  if (visual.type === "inequality") scene = step === 0 && visual.expression === question.answer ? <HiddenRelation kind="desigualdad"/> : <Inequality visual={visual}/>;
  if (visual.type === "number-line") scene = visual.given || step > 0 ? <NumberLine visual={visual}/> : <Inequality visual={{ expression: visual.expression }}/>;
  if (visual.type === "table") scene = <Table visual={visual}/>;
  if (visual.type === "graph") scene = <Graph visual={visual}/>;
  if (visual.type === "equation") scene = step === 0 && visual.expression === question.answer ? <HiddenRelation kind="ecuación"/> : <Expression visual={visual}/>;
  return <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Modelo algebraico para: ${question.prompt}`}>{scene}{step >= 3 && <div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-xl font-bold text-teal"><MathText>{question.answer}</MathText></div>}</div>;
}
