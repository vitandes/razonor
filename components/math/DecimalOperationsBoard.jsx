"use client";

function Result({ answer, visible }) {
  if (!visible) return null;
  return <div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-xl font-bold text-teal">{answer}</div>;
}

function DecimalColumn({ visual }) {
  return (
    <div className="mx-auto max-w-xs">
      <p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Coma debajo de coma</p>
      <div className="mt-4 rounded-2xl bg-white px-6 py-4 shadow-sm">
        {visual.rows.map((row, index) => (
          <div key={`${row}-${index}`} className={`grid grid-cols-[28px_1fr] items-center border-ink font-mono text-3xl font-bold tabular-nums text-ink sm:text-4xl ${index === visual.rows.length - 1 ? "border-b-4 pb-2" : "pb-1"}`}>
            <span className="text-center text-grape">{index === visual.rows.length - 1 ? visual.operation : ""}</span>
            <span className="text-right tracking-[0.08em]">{row}</span>
          </div>
        ))}
        <div className="mt-2 grid grid-cols-[28px_1fr] font-mono text-4xl font-bold text-grape"><span /><span className="text-right">?</span></div>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-muted">Completa con ceros cuando ayude a ver la misma posición.</p>
    </div>
  );
}

function DecimalProduct({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Producto con sentido de magnitud</p>
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="rounded-2xl border-2 border-honey bg-honey-soft px-4 py-4 font-display text-3xl font-bold text-ink">{visual.factors[0]}</span>
        <span className="font-display text-3xl font-black text-grape">×</span>
        <span className="rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-display text-3xl font-bold text-ink">{visual.factors[1]}</span>
      </div>
      <div className="mx-auto mt-5 grid max-w-md gap-2 sm:grid-cols-2">
        {visual.parts.map((part) => <div key={part} className="rounded-xl bg-white px-3 py-3 text-sm font-extrabold text-ink shadow-sm">{part}</div>)}
      </div>
      <p className="mt-4 text-sm font-bold text-muted">Estima primero para saber dónde debe quedar la coma.</p>
    </div>
  );
}

function DecimalDivision({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">División y operación inversa</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        <span className="rounded-2xl bg-honey-soft px-4 py-4">{visual.dividend}</span>
        <span className="text-grape">÷</span>
        <span className="rounded-2xl bg-grape-soft px-4 py-4">{visual.divisor}</span>
        <span>=</span>
        <span className="grid h-16 min-w-16 place-items-center rounded-2xl border-2 border-dashed border-teal bg-teal-soft px-3 text-teal">{visual.quotient}</span>
      </div>
      <div className="mx-auto mt-5 max-w-sm rounded-2xl bg-white px-4 py-3 font-display text-lg font-bold text-ink shadow-sm">Comprueba: {visual.check}</div>
    </div>
  );
}

function DecimalShift({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Cada factor de 10 cambia una posición</p>
      <div className="mt-5 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        <span className="rounded-2xl border-2 border-ink/10 bg-white px-4 py-4 font-display text-3xl font-bold text-ink">{visual.start}</span>
        <span className="font-display text-xl font-black text-grape sm:text-2xl">{visual.operation}</span>
        <span className="rotate-90 text-3xl font-black text-honey-deep sm:rotate-0">→</span>
        <span className="rounded-2xl border-2 border-teal bg-teal-soft px-4 py-4 font-display text-3xl font-bold text-teal">{visual.result}</span>
      </div>
      <div className="mx-auto mt-5 max-w-xs rounded-full bg-grape-soft px-4 py-2 text-sm font-extrabold text-grape">{visual.places} {visual.places === 1 ? "posición" : "posiciones"} hacia valores más {visual.direction === "izquierda" ? "grandes" : "pequeños"}</div>
    </div>
  );
}

function DecimalStory({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Traduce la historia a una operación</p>
      <div className="mx-auto mt-5 flex max-w-sm flex-col items-stretch gap-2 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        {visual.labels.map((label, index) => <span key={`${label}-${index}`} className={index === 1 ? "font-display text-3xl font-black text-grape" : "rounded-2xl border-2 border-ink/10 bg-white px-4 py-4 font-display text-2xl font-bold text-ink"}>{label}</span>)}
        <span className="font-display text-3xl font-black text-grape">=</span>
        <span className="rounded-2xl border-2 border-dashed border-teal bg-teal-soft px-4 py-4 font-display text-2xl font-bold text-teal">{visual.result}</span>
      </div>
      <p className="mt-5 text-sm font-bold text-muted">La unidad y el cambio de la historia ayudan a elegir la operación.</p>
    </div>
  );
}

function DecimalEstimate({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Comprueba la magnitud antes de aceptar</p>
      <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-ink/10 bg-white px-4 py-4 font-display text-3xl font-bold text-ink">{visual.exact}</div>
      <span className="my-2 block text-3xl font-black text-honey-deep">↓</span>
      <div className="mx-auto max-w-md rounded-2xl border-2 border-honey bg-honey-soft px-4 py-4 font-display text-3xl font-bold text-night">{visual.rounded} = {visual.estimate}</div>
    </div>
  );
}

function DecimalError({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-coral">Encuentra el error de posición</p>
      <div className="mx-auto mt-5 max-w-md rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4">
        <p className="font-display text-2xl font-bold text-ink line-through decoration-coral sm:text-3xl">{visual.claim}</p>
      </div>
      <div className="mx-auto mt-4 max-w-md rounded-2xl border-2 border-grape bg-grape-soft px-4 py-4 font-display text-xl font-bold text-grape sm:text-2xl">Revisa: {visual.correction}</div>
    </div>
  );
}

export default function DecimalOperationsBoard({ question, step = 0 }) {
  const visual = question.visual;
  let scene = null;
  if (visual.type === "decimal-column") scene = <DecimalColumn visual={visual} />;
  if (visual.type === "decimal-product") scene = <DecimalProduct visual={visual} />;
  if (visual.type === "decimal-division") scene = <DecimalDivision visual={visual} />;
  if (visual.type === "decimal-shift") scene = <DecimalShift visual={visual} />;
  if (visual.type === "decimal-story") scene = <DecimalStory visual={visual} />;
  if (visual.type === "decimal-estimate") scene = <DecimalEstimate visual={visual} />;
  if (visual.type === "decimal-error") scene = <DecimalError visual={visual} />;

  return (
    <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Modelo visual para la pregunta: ${question.prompt}`}>
      {scene}
      <Result answer={question.answer} visible={step >= 3} />
    </div>
  );
}
