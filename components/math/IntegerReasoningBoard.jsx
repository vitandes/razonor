"use client";

function Result({ answer, visible }) {
  if (!visible) return null;
  return <div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-xl font-bold text-teal">{answer}</div>;
}

function NumberLine({ visual }) {
  const values = Array.from({ length: visual.max - visual.min + 1 }, (_, index) => visual.min + index);
  return (
    <div>
      <p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">{visual.label || "Ubica y recorre la recta"}</p>
      <div className="no-scrollbar mt-5 overflow-x-auto pb-3">
        <div className="relative mx-auto flex min-w-max justify-center px-5 pt-8">
          <div className="absolute left-5 right-5 top-[45px] h-1 rounded-full bg-ink/20" />
          {values.map((value) => {
            const active = visual.points?.includes(value) || value === visual.start || value === visual.end;
            return (
              <div key={value} className="relative z-10 w-11 shrink-0 text-center">
                {value === visual.start && value !== visual.end && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-extrabold text-grape">inicio</span>}
                {value === visual.end && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-extrabold text-teal">final</span>}
                <span className={`mx-auto block h-4 w-4 rounded-full border-2 ${active ? "scale-125 border-white bg-honey shadow-[0_0_0_3px_#7865ef]" : "border-white bg-ink/35"}`} />
                <span className={`mt-3 block font-display text-sm font-bold ${active ? "text-ink" : "text-muted"}`}>{value}</span>
              </div>
            );
          })}
        </div>
      </div>
      {visual.move && <p className="mx-auto mt-2 max-w-md rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-ink shadow-sm">{visual.move}</p>}
    </div>
  );
}

function Compare({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Compara su posición respecto a cero</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {visual.values.map((value, index) => (
          <div key={`${value}-${index}`} className="contents">
            {index > 0 && <span className="font-display text-2xl font-black text-honey-deep">{visual.signs?.[index - 1] || "?"}</span>}
            <span className="grid min-h-16 min-w-20 place-items-center rounded-2xl border-2 border-grape bg-grape-soft px-4 font-display text-3xl font-bold text-ink">{value}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold text-muted">En la recta, el número ubicado más a la derecha es mayor.</p>
    </div>
  );
}

function Distance({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Distancia: cuenta unidades, no signos</p>
      <div className="mx-auto mt-5 grid max-w-sm grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className="rounded-2xl border-2 border-grape bg-grape-soft px-3 py-5 font-display text-3xl font-bold text-ink">{visual.a}</span>
        <span className="text-3xl font-black text-honey-deep">↔</span>
        <span className="rounded-2xl border-2 border-teal bg-teal-soft px-3 py-5 font-display text-3xl font-bold text-ink">{visual.b}</span>
      </div>
      <p className="mx-auto mt-5 max-w-sm rounded-2xl bg-white px-4 py-3 font-display text-lg font-bold text-ink shadow-sm">|{visual.a} − ({visual.b})| = ?</p>
    </div>
  );
}

function Expression({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">{visual.label || "Resuelve una decisión a la vez"}</p>
      <div className="mx-auto mt-5 flex max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
        {visual.parts.map((part, index) => (
          <div key={`${part}-${index}`} className="contents">
            {index > 0 && <span className="rotate-90 font-display text-2xl font-black text-honey-deep sm:rotate-0">→</span>}
            <span className={`grid min-h-16 place-items-center rounded-2xl border-2 px-4 font-display text-xl font-bold text-ink ${index % 2 ? "border-grape bg-grape-soft" : "border-honey bg-honey-soft"}`}>{part}</span>
          </div>
        ))}
      </div>
      {visual.note && <p className="mt-5 text-sm font-bold leading-relaxed text-muted">{visual.note}</p>}
    </div>
  );
}

function Story({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Traduce cada cambio sin perder el signo</p>
      <div className="mx-auto mt-5 flex max-w-md flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center">
        {visual.labels.map((label, index) => <span key={`${label}-${index}`} className={`rounded-2xl border-2 px-4 py-4 font-display text-xl font-bold ${index === 0 ? "border-honey bg-honey-soft text-night" : "border-grape bg-grape-soft text-ink"}`}>{label}</span>)}
      </div>
      <div className="mx-auto mt-4 max-w-xs rounded-2xl border-2 border-dashed border-teal bg-teal-soft px-4 py-4 font-display text-2xl font-bold text-teal">resultado: ?</div>
    </div>
  );
}

function ErrorModel({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-coral">Analiza antes de aceptar</p>
      <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4">
        <p className="font-display text-xl font-bold text-ink line-through decoration-coral sm:text-2xl">{visual.claim}</p>
      </div>
      <div className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-display text-lg font-bold text-grape sm:text-xl">Revisa: {visual.check}</div>
    </div>
  );
}

export default function IntegerReasoningBoard({ question, step = 0 }) {
  const visual = question.visual;
  let scene = null;
  if (visual.type === "number-line") scene = <NumberLine visual={visual} />;
  if (visual.type === "compare") scene = <Compare visual={visual} />;
  if (visual.type === "distance") scene = <Distance visual={visual} />;
  if (visual.type === "expression") scene = <Expression visual={visual} />;
  if (visual.type === "story") scene = <Story visual={visual} />;
  if (visual.type === "error") scene = <ErrorModel visual={visual} />;

  return (
    <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Modelo visual para la pregunta: ${question.prompt}`}>
      {scene}
      <Result answer={question.answer} visible={step >= 3} />
    </div>
  );
}
