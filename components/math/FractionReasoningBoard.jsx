"use client";

import FractionText, { StackedFraction } from "@/components/math/FractionText";

function FractionBar({ numerator, denominator, label }) {
  return (
    <div className="text-center">
      {label && <p className="mb-3 text-sm font-extrabold text-grape">{label}</p>}
      <div className="mx-auto flex min-h-20 max-w-lg overflow-hidden rounded-2xl border-2 border-night bg-white">
        {Array.from({ length: denominator }).map((_, index) => <span key={index} className={`min-w-0 flex-1 border-r border-night/20 last:border-r-0 ${index < numerator ? "bg-grape" : "bg-white"}`} />)}
      </div>
      <p className="mt-3 font-display text-xl font-bold text-ink">{numerator} de {denominator} partes iguales</p>
    </div>
  );
}

function FractionLine({ numerator, denominator }) {
  const wholeCount = Math.max(1, Math.ceil(numerator / denominator));
  const marks = wholeCount * denominator;
  return (
    <div>
      <p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Cada intervalo mide <StackedFraction numerator="1" denominator={denominator} /></p>
      <div className="no-scrollbar mt-6 overflow-x-auto pb-3">
        <div className="relative mx-auto flex min-w-max px-5 pt-7">
          <div className="absolute left-5 right-5 top-[37px] h-1 rounded-full bg-ink/20" />
          {Array.from({ length: marks + 1 }).map((_, index) => {
            const active = index === numerator;
            return <div key={index} className="relative z-10 w-12 text-center"><span className={`mx-auto block h-4 w-4 rounded-full border-2 border-white ${active ? "scale-125 bg-honey shadow-[0_0_0_3px_#7865ef]" : "bg-ink/35"}`} /><span className={`mt-3 block text-xs font-bold ${active ? "text-grape" : "text-muted"}`}>{index % denominator === 0 ? index / denominator : <StackedFraction numerator={index} denominator={denominator} />}</span></div>;
          })}
        </div>
      </div>
    </div>
  );
}

function FractionSet({ selected, total }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">El conjunto completo es la unidad</p>
      <div className="mx-auto mt-5 grid max-w-sm grid-cols-5 gap-2 sm:grid-cols-8">
        {Array.from({ length: total }).map((_, index) => <span key={index} className={`aspect-square rounded-xl border-2 ${index < selected ? "border-grape bg-grape" : "border-ink/10 bg-white"}`} />)}
      </div>
      <p className="mt-4 font-display text-xl font-bold text-ink">{selected} seleccionadas de {total}</p>
    </div>
  );
}

function CompareBars({ fractions }) {
  return <div className="space-y-5">{fractions.map(([n,d],index)=><FractionBar key={`${n}-${d}-${index}`} numerator={n} denominator={d} label={<StackedFraction numerator={n} denominator={d} />} />)}</div>;
}

function MultiBars({ fractions }) {
  return <div className="grid gap-4 sm:grid-cols-3">{fractions.map(([n,d],index)=><div key={`${n}-${d}-${index}`} className="rounded-2xl bg-white p-3 shadow-sm"><FractionBar numerator={n} denominator={d} label={<StackedFraction numerator={n} denominator={d} />} /></div>)}</div>;
}

function Operation({ visual, step, answer }) {
  const stages = [...new Set(visual.stages)].filter((stage) => stage !== answer);
  const visibleStages = stages.slice(0, step);
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Una transformación por paso</p>
      <div className="mx-auto mt-5 flex max-w-lg flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
        <span className="rounded-2xl border-2 border-honey bg-honey-soft px-4 py-4 font-display text-2xl font-bold text-night"><FractionText>{visual.expression}</FractionText></span>
        {visibleStages.map((stage,index)=><div className="contents" key={`${stage}-${index}`}><span className="rotate-90 text-2xl font-black text-grape sm:rotate-0">→</span><span className="rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-display text-xl font-bold text-ink"><FractionText>{stage}</FractionText></span></div>)}
        {step < 3 && <div className="contents"><span className="rotate-90 text-2xl font-black text-grape sm:rotate-0">→</span><span className="rounded-2xl border-2 border-dashed border-teal bg-teal-soft px-5 py-4 font-display text-2xl font-bold text-teal">?</span></div>}
      </div>
    </div>
  );
}

function Area({ fractions }) {
  const [[a,b],[c,d]]=fractions;
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">La superposición representa el producto</p>
      <div className="mx-auto mt-5 grid aspect-square max-w-[280px] overflow-hidden rounded-2xl border-2 border-night" style={{gridTemplateColumns:`repeat(${d}, minmax(0,1fr))`}}>
        {Array.from({length:b*d}).map((_,index)=>{const row=Math.floor(index/d),col=index%d;const vertical=row<a;const horizontal=col<c;return <span key={index} className={`border-b border-r border-night/15 ${vertical&&horizontal?"bg-teal":vertical?"bg-grape/55":horizontal?"bg-honey/70":"bg-white"}`} />})}
      </div>
      <p className="mt-4 font-display text-lg font-bold text-ink"><StackedFraction numerator={a} denominator={b} /> en una dirección y <StackedFraction numerator={c} denominator={d} /> en la otra</p>
    </div>
  );
}

function DecimalModel({ value, label }) {
  const cells=value<=1?Math.round(value*100):Math.round((value%1)*100);
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-grape">La cuadrícula completa representa 1</p><div className="mx-auto mt-5 grid aspect-square max-w-[250px] grid-cols-10 overflow-hidden rounded-2xl border-2 border-night">{Array.from({length:100}).map((_,index)=><span key={index} className={`border-b border-r border-night/10 ${index<cells?"bg-grape":"bg-white"}`} />)}</div><p className="mt-4 font-display text-xl font-bold text-ink"><FractionText>{label}</FractionText> · {cells} centésimas</p></div>;
}

function ErrorModel({ claim, check }) {
  return <div className="text-center"><p className="text-sm font-extrabold uppercase tracking-wide text-coral">Comprueba la afirmación</p><div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4 font-display text-xl font-bold text-ink line-through decoration-coral"><FractionText>{claim}</FractionText></div><div className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-bold text-grape"><FractionText>{check}</FractionText></div></div>;
}

export default function FractionReasoningBoard({question,step=0}){
  const v=question.visual;
  let scene=null;
  if(v.type==="bar") scene=<FractionBar numerator={v.numerator} denominator={v.denominator}/>;
  if(v.type==="line") scene=<FractionLine numerator={v.numerator} denominator={v.denominator}/>;
  if(v.type==="set") scene=<FractionSet selected={v.selected} total={v.total}/>;
  if(v.type==="compare-bars") scene=<CompareBars fractions={v.fractions}/>;
  if(v.type==="multi-bars") scene=<MultiBars fractions={v.fractions}/>;
  if(v.type==="operation") scene=<Operation visual={v} step={step} answer={question.answer}/>;
  if(v.type==="area") scene=<Area fractions={v.fractions}/>;
  if(v.type==="decimal") scene=<DecimalModel value={v.value} label={v.label}/>;
  if(v.type==="compare-mixed") scene=<CompareBars fractions={[v.fraction,[Math.round(v.decimal*100),100]]}/>;
  if(v.type==="multi-mixed") scene=<div className="grid gap-3 sm:grid-cols-3">{v.values.map((item,index)=><div key={index} className="rounded-2xl bg-white p-4 text-center font-display text-2xl font-bold text-ink shadow-sm"><FractionText>{item.s}</FractionText></div>)}</div>;
  if(v.type==="error") scene=<ErrorModel claim={v.claim} check={v.check}/>;
  return <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Modelo visual para la pregunta: ${question.prompt}`}>{scene}{step>=3&&<div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-xl font-bold text-teal"><FractionText>{question.answer}</FractionText></div>}</div>;
}
