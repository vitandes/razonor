"use client";

function Result({ answer, visible }) {
  if (!visible) return null;
  return (
    <div className="mt-5 rounded-2xl border-2 border-teal bg-teal-soft px-4 py-3 text-center font-display text-lg font-bold text-teal">
      {answer}
    </div>
  );
}

function PlaceChart({ visual }) {
  return (
    <div>
      <p className="text-center text-sm font-extrabold uppercase tracking-wide text-grape">Tabla de valor posicional</p>
      <div className="mt-4 grid overflow-hidden rounded-2xl border-2 border-ink/10" style={{ gridTemplateColumns: `repeat(${visual.columns.length}, minmax(0, 1fr))` }}>
        {visual.columns.map((column) => <div key={column} className="border-r border-ink/10 bg-night px-1 py-2 text-center text-[10px] font-extrabold text-honey last:border-r-0 sm:text-xs">{column}</div>)}
        {visual.digits.map((digit, index) => <div key={`${digit}-${index}`} className={`border-r border-t border-ink/10 px-1 py-4 text-center font-display text-3xl font-bold text-ink last:border-r-0 sm:py-5 sm:text-4xl ${digit === "0" ? "bg-honey-soft" : "bg-white"}`}>{digit}</div>)}
      </div>
      <p className="mt-4 text-center text-sm font-bold text-muted">Cada cifra conserva una posición, incluso cuando es cero.</p>
    </div>
  );
}

function HighlightDigit({ visual }) {
  let highlighted = false;
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">¿Qué cambia por la posición?</p>
      <div className="mt-5 flex flex-wrap justify-center font-display text-5xl font-bold tracking-[0.08em] text-ink sm:text-6xl">
        {Array.from(visual.number).map((character, index) => {
          const active = !highlighted && character === visual.highlight;
          if (active) highlighted = true;
          return <span key={`${character}-${index}`} className={active ? "rounded-xl bg-honey px-1 text-night shadow-sm" : "px-0.5"}>{character}</span>;
        })}
      </div>
      <div className="mx-auto mt-6 max-w-xs rounded-2xl bg-grape-soft px-4 py-3 font-display text-xl font-bold text-grape">{visual.place}</div>
    </div>
  );
}

function ExpandedForm({ visual }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold text-ink sm:text-5xl">{visual.number}</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {visual.parts.map((part, index) => (
          <div key={`${part}-${index}`} className="contents">
            {index > 0 && <span className="font-display text-2xl font-bold text-grape">+</span>}
            <span className="rounded-2xl border-2 border-honey/60 bg-honey-soft px-3 py-3 font-display text-lg font-bold text-ink sm:px-4 sm:text-xl">{part}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold text-muted">Cada parte muestra el aporte real de una cifra.</p>
    </div>
  );
}

function Comparison({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Compara la primera posición diferente</p>
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
        <div className="rounded-2xl border-2 border-ink/10 bg-white px-2 py-5 font-display text-2xl font-bold text-ink sm:text-3xl">{visual.left}</div>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-honey font-display text-2xl font-black text-night">{visual.symbol}</span>
        <div className="rounded-2xl border-2 border-ink/10 bg-white px-2 py-5 font-display text-2xl font-bold text-ink sm:text-3xl">{visual.right}</div>
      </div>
      <div className="mx-auto mt-5 max-w-xs rounded-full bg-grape-soft px-4 py-2 text-sm font-extrabold text-grape">Observa: {visual.focus}</div>
    </div>
  );
}

function Ordering({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">{visual.direction}</p>
      <div className="mt-5 flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
        {visual.items.map((item, index) => (
          <div key={`${item}-${index}`} className="contents">
            {index > 0 && <span className="rotate-90 font-display text-2xl font-black text-grape sm:rotate-0">→</span>}
            <span className="rounded-2xl border-2 border-ink/10 bg-white px-3 py-3 font-display text-xl font-bold text-ink">{item}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold text-muted">Alinea las posiciones antes de decidir el orden.</p>
    </div>
  );
}

function NumberLine({ visual }) {
  return (
    <div className="px-1 text-center sm:px-4">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Ubica la magnitud</p>
      <div className="relative mx-auto mt-16 h-20 max-w-lg">
        <div className="absolute left-3 right-3 top-6 h-2 rounded-full bg-ink/15" />
        <div className="absolute top-[13px] h-8 w-1 -translate-x-1/2 rounded-full bg-grape" style={{ left: `${visual.position}%` }} />
        <div className="absolute -top-8 -translate-x-1/2 rounded-xl bg-honey px-3 py-2 font-display text-lg font-bold text-night shadow-sm" style={{ left: `${visual.position}%` }}>{visual.marker}</div>
        <span className="absolute left-0 top-11 font-display text-lg font-bold text-ink">{visual.min}</span>
        <span className="absolute right-0 top-11 font-display text-lg font-bold text-ink">{visual.max}</span>
      </div>
      <p className="mt-3 text-sm font-bold text-muted">La ubicación muestra entre qué valores se encuentra.</p>
    </div>
  );
}

function Clues({ visual }) {
  return (
    <div className="text-center">
      <p className="text-sm font-extrabold uppercase tracking-wide text-grape">Pistas del número</p>
      <div className="mx-auto mt-5 grid max-w-md gap-3">
        {visual.clues.map((clue, index) => <div key={clue} className={`rounded-2xl border-2 px-4 py-3 font-display text-lg font-bold ${index === 2 ? "border-teal bg-teal-soft text-teal" : "border-honey bg-honey-soft text-ink"}`}>{clue}</div>)}
      </div>
    </div>
  );
}

function ComparisonError({ visual }) {
  return (
    <div className="text-center">
      <div className="mx-auto max-w-sm rounded-2xl border-2 border-coral bg-coral-soft px-4 py-4">
        <p className="text-xs font-extrabold uppercase tracking-wide text-coral">Comparación incorrecta</p>
        <p className="mt-2 font-display text-3xl font-bold text-ink line-through decoration-coral">{visual.claim}</p>
      </div>
      <div className="mx-auto mt-4 grid max-w-xs gap-2 rounded-2xl bg-white px-4 py-3 font-display text-2xl font-bold text-ink shadow-sm">
        {visual.aligned.map((value) => <span key={value}>{value}</span>)}
      </div>
      <p className="mt-4 text-sm font-bold text-grape">Alinea la coma y compara posición por posición.</p>
    </div>
  );
}

export default function PlaceValueBoard({ question, step = 0 }) {
  const visual = question.visual;
  let scene = null;
  if (visual.type === "place-chart") scene = <PlaceChart visual={visual} />;
  if (visual.type === "highlight-digit") scene = <HighlightDigit visual={visual} />;
  if (visual.type === "expanded-form") scene = <ExpandedForm visual={visual} />;
  if (visual.type === "comparison") scene = <Comparison visual={visual} />;
  if (visual.type === "ordering") scene = <Ordering visual={visual} />;
  if (visual.type === "number-line") scene = <NumberLine visual={visual} />;
  if (visual.type === "clues") scene = <Clues visual={visual} />;
  if (visual.type === "comparison-error") scene = <ComparisonError visual={visual} />;

  return (
    <div className="rounded-3xl border border-ink/10 bg-[#fbfaf6] px-4 py-6 sm:px-6 sm:py-8" role="img" aria-label={`Modelo visual para la pregunta: ${question.prompt}`}>
      {scene}
      <Result answer={question.answer} visible={step >= 3} />
    </div>
  );
}
