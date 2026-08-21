"use client";

const COLORS = {
  ink: "#141B36",
  honey: "#FFBE3D",
  honeyStroke: "#D98B00",
  grape: "#7A66F6",
  grapeSoft: "#F0ECFF",
  teal: "#2DB7A3",
  tealSoft: "#DDF5F0",
  coral: "#FF8177",
  coralSoft: "#FFE5E1",
  cream: "#FBFAF6",
};

function AnswerBadge({ answer, visible }) {
  if (!visible) return null;
  const fontSize = answer.length > 18 ? 14 : answer.length > 11 ? 16 : 20;
  return (
    <g>
      <rect x="410" y="300" width="205" height="44" rx="18" fill={COLORS.tealSoft} stroke={COLORS.teal} strokeWidth="2" />
      <text x="512" y="328" textAnchor="middle" fontSize={fontSize} fontWeight="900" fill="#168F7F">{answer}</text>
    </g>
  );
}

function ColumnOperation({ visual, accent }) {
  return (
    <g>
      <text x="360" y="100" textAnchor="end" fontSize="48" fontWeight="800" fill={COLORS.ink}>{visual.top.toLocaleString("es-CO")}</text>
      <text x="260" y="165" textAnchor="middle" fontSize="42" fontWeight="900" fill={accent}>{visual.operation}</text>
      <text x="360" y="165" textAnchor="end" fontSize="48" fontWeight="800" fill={COLORS.ink}>{visual.bottom.toLocaleString("es-CO")}</text>
      <line x1="230" y1="188" x2="385" y2="188" stroke={COLORS.ink} strokeWidth="5" />
      <text x="360" y="250" textAnchor="end" fontSize="52" fontWeight="900" fill={accent}>?</text>
      <g opacity="0.72">
        <text x="440" y="93" fontSize="15" fontWeight="800" fill={COLORS.grape}>C</text>
        <text x="474" y="93" fontSize="15" fontWeight="800" fill={COLORS.grape}>D</text>
        <text x="508" y="93" fontSize="15" fontWeight="800" fill={COLORS.grape}>U</text>
        {[440, 474, 508].map((x) => <line key={x} x1={x} y1="108" x2={x} y2="250" stroke="#D8D2C8" strokeWidth="1" />)}
      </g>
    </g>
  );
}

function MissingNumber({ visual, accent }) {
  return (
    <g>
      <g transform="translate(48 82)">
        {visual.equation.map((part, index) => {
          const unknown = part === "?";
          return (
            <g key={`${part}-${index}`} transform={`translate(${index * 108} 0)`}>
              {unknown && <rect x="0" y="0" width="92" height="72" rx="18" fill={COLORS.grapeSoft} stroke={accent} strokeWidth="4" />}
              <text x="46" y="49" textAnchor="middle" fontSize={part.length > 3 ? 25 : 34} fontWeight="900" fill={unknown ? accent : COLORS.ink}>{part}</text>
            </g>
          );
        })}
      </g>
      <path d="M160 245 C250 190 390 190 480 245" fill="none" stroke={accent} strokeWidth="4" strokeDasharray="9 7" />
      <polygon points="480,245 463,232 460,254" fill={accent} />
      <text x="320" y="282" textAnchor="middle" fontSize="19" fontWeight="800" fill={COLORS.ink}>Usa la operación inversa para recuperar lo desconocido</text>
    </g>
  );
}

function ChangeBar({ visual, accent }) {
  const nodes = [visual.start, ...visual.changes, visual.end];
  return (
    <g>
      <line x1="95" y1="180" x2="545" y2="180" stroke="#D8D2C8" strokeWidth="10" strokeLinecap="round" />
      {nodes.map((label, index) => {
        const x = 95 + (450 * index) / (nodes.length - 1);
        const isEnd = index === nodes.length - 1;
        return (
          <g key={`${label}-${index}`}>
            <circle cx={x} cy="180" r={isEnd ? 30 : 22} fill={isEnd ? COLORS.grapeSoft : index === 0 ? COLORS.honey : COLORS.cream} stroke={isEnd ? accent : COLORS.ink} strokeWidth="4" />
            <text x={x} y={index % 2 ? 245 : 125} textAnchor="middle" fontSize={isEnd ? 24 : 20} fontWeight="900" fill={isEnd ? accent : COLORS.ink}>{label}</text>
          </g>
        );
      })}
      <text x="320" y="318" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.grape}>Sigue los cambios en el orden de la historia</text>
    </g>
  );
}

function ArrayModel({ visual, accent }) {
  const shown = Math.min(8, visual.groups);
  return (
    <g>
      <text x="320" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.ink}>{visual.groups} grupos iguales</text>
      {Array.from({ length: shown }).map((_, index) => {
        const row = index >= 4 ? 1 : 0;
        const col = index % 4;
        const x = 82 + col * 125;
        const y = 82 + row * 92;
        return (
          <g key={index}>
            <rect x={x} y={y} width="100" height="68" rx="16" fill={index % 2 ? COLORS.grapeSoft : "#FFF2CE"} stroke={accent} strokeWidth="2" />
            <text x={x + 50} y={y + 43} textAnchor="middle" fontSize="21" fontWeight="900" fill={COLORS.ink}>{visual.size}</text>
          </g>
        );
      })}
      {visual.groups > shown && <text x="585" y="168" fontSize="28" fontWeight="900" fill={COLORS.ink}>…</text>}
      <rect x="175" y="283" width="290" height="42" rx="18" fill={COLORS.tealSoft} />
      <text x="320" y="310" textAnchor="middle" fontSize="18" fontWeight="900" fill="#168F7F">{visual.size} = {visual.decomposition.join(" + ")}</text>
    </g>
  );
}

function AreaProduct({ visual, accent }) {
  const [first, second] = visual.split;
  const splitX = 150 + (350 * first) / (first + second);
  return (
    <g>
      <text x="320" y="42" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.ink}>{visual.factors[0]} × {visual.factors[1]}</text>
      <rect x="150" y="85" width="350" height="185" fill={COLORS.grapeSoft} stroke={COLORS.ink} strokeWidth="4" />
      <rect x="150" y="85" width={splitX - 150} height="185" fill="#FFF2CE" opacity="0.9" />
      <line x1={splitX} y1="85" x2={splitX} y2="270" stroke={accent} strokeWidth="4" />
      <text x={(150 + splitX) / 2} y="175" textAnchor="middle" fontSize="25" fontWeight="900" fill={COLORS.honeyStroke}>{first}</text>
      <text x={(splitX + 500) / 2} y="175" textAnchor="middle" fontSize="25" fontWeight="900" fill={COLORS.grape}>{second}</text>
      <text x="120" y="183" textAnchor="middle" fontSize="22" fontWeight="900" fill={accent} transform="rotate(-90 120 183)">{visual.factors[0]}</text>
      <text x="320" y="312" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>Multiplica cada parte y reúne los productos</text>
    </g>
  );
}

function DivisionGroups({ visual, accent }) {
  const shown = Math.min(13, visual.groups);
  return (
    <g>
      <text x="320" y="42" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.ink}>{visual.total} repartidos en grupos de {visual.groupSize}</text>
      {Array.from({ length: shown }).map((_, index) => {
        const row = index >= 7 ? 1 : 0;
        const col = index % 7;
        const x = 72 + col * 78;
        const y = 88 + row * 90;
        return (
          <g key={index}>
            <circle cx={x} cy={y} r="29" fill={index % 2 ? COLORS.grapeSoft : "#FFF2CE"} stroke={accent} strokeWidth="2" />
            <text x={x} y={y + 7} textAnchor="middle" fontSize="17" fontWeight="900" fill={COLORS.ink}>{visual.groupSize}</text>
          </g>
        );
      })}
      {visual.groups > shown && <text x="600" y="145" fontSize="28" fontWeight="900">…</text>}
      <rect x="185" y="270" width="270" height="46" rx="18" fill={visual.remainder ? COLORS.coralSoft : COLORS.tealSoft} />
      <text x="320" y="299" textAnchor="middle" fontSize="19" fontWeight="900" fill={visual.remainder ? "#D75249" : "#168F7F"}>{visual.groups} grupos{visual.remainder ? ` y sobra ${visual.remainder}` : " exactos"}</text>
    </g>
  );
}

function MultiStepBar({ visual, accent }) {
  return (
    <g>
      <text x="320" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill={COLORS.ink}>Resuelve una decisión a la vez</text>
      <line x1="90" y1="175" x2="550" y2="175" stroke="#D8D2C8" strokeWidth="8" />
      {visual.parts.map((part, index) => {
        const x = 90 + (300 * index) / Math.max(1, visual.parts.length - 1);
        return (
          <g key={`${part}-${index}`}>
            <rect x={x - 50} y="125" width="100" height="100" rx="20" fill={index % 2 ? COLORS.grapeSoft : "#FFF2CE"} stroke={accent} strokeWidth="3" />
            <text x={x} y="183" textAnchor="middle" fontSize={part.length > 12 ? 14 : 18} fontWeight="900" fill={COLORS.ink}>{part}</text>
          </g>
        );
      })}
      <polygon points="505,175 485,162 485,188" fill={accent} />
      <rect x="480" y="125" width="130" height="100" rx="20" fill={COLORS.tealSoft} stroke={accent} strokeWidth="3" />
      <text x="545" y="183" textAnchor="middle" fontSize="18" fontWeight="900" fill={accent}>{visual.result}</text>
      <text x="320" y="298" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.grape}>El resultado del primer paso alimenta el siguiente</text>
    </g>
  );
}

function MobileMultiStepBar({ visual, step, answer }) {
  return (
    <div className="px-5 py-6 sm:hidden" role="img" aria-label="Modelo de resolución por pasos">
      <p className="text-center font-display text-lg font-bold text-ink">Resuelve una decisión a la vez</p>
      <div className="mx-auto mt-5 flex max-w-[250px] flex-col items-center gap-2">
        {visual.parts.map((part, index) => (
          <div key={`${part}-${index}`} className="contents">
            <div className={`grid min-h-16 w-full place-items-center rounded-2xl border-2 px-4 text-center font-display text-xl font-bold text-ink ${index % 2 ? "border-grape bg-grape-soft" : "border-honey bg-honey-soft"}`}>
              {part}
            </div>
            <span className="text-2xl font-black leading-none text-grape" aria-hidden="true">↓</span>
          </div>
        ))}
        <div className="grid min-h-16 w-full place-items-center rounded-2xl border-2 border-teal bg-teal-soft px-4 text-center font-display text-xl font-bold text-teal">
          {step >= 3 ? answer : visual.result}
        </div>
      </div>
      <p className="mt-5 text-center text-sm font-bold leading-relaxed text-grape">Cada resultado permite tomar la siguiente decisión.</p>
    </div>
  );
}

function Estimation({ visual, accent }) {
  const expression = (items) => items.join(" ");
  return (
    <g>
      <rect x="105" y="76" width="430" height="84" rx="22" fill="#FFFFFF" stroke={COLORS.ink} strokeWidth="3" />
      <text x="320" y="128" textAnchor="middle" fontSize="31" fontWeight="900" fill={COLORS.ink}>{expression(visual.exact)}</text>
      <line x1="320" y1="170" x2="320" y2="210" stroke={accent} strokeWidth="5" />
      <polygon points="320,218 307,198 333,198" fill={accent} />
      <rect x="105" y="226" width="430" height="84" rx="22" fill="#FFF2CE" stroke={accent} strokeWidth="3" />
      <text x="320" y="278" textAnchor="middle" fontSize="31" fontWeight="900" fill={COLORS.honeyStroke}>{expression(visual.rounded)}</text>
    </g>
  );
}

function ErrorWork({ visual, accent }) {
  return (
    <g>
      <rect x="92" y="56" width="456" height="222" rx="26" fill={COLORS.coralSoft} stroke={COLORS.coral} strokeWidth="4" />
      <circle cx="505" cy="94" r="24" fill={COLORS.coral} />
      <text x="505" y="103" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF">×</text>
      <text x="320" y="118" textAnchor="middle" fontSize="29" fontWeight="900" fill={COLORS.ink}>{visual.expression}</text>
      <text x="320" y="179" textAnchor="middle" fontSize={visual.claimed.length > 16 ? 21 : 30} fontWeight="900" fill="#D75249">{visual.claimed}</text>
      <line x1="175" y1="199" x2="465" y2="199" stroke="#D75249" strokeWidth="3" strokeDasharray="8 5" />
      <text x="320" y="242" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.ink}>{visual.note}</text>
      <text x="320" y="317" textAnchor="middle" fontSize="18" fontWeight="900" fill={accent}>Comprueba con la operación inversa o una estimación</text>
    </g>
  );
}

function OperationChoice({ visual, accent }) {
  return (
    <g>
      <text x="320" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.ink}>{visual.labels[0]}</text>
      {Array.from({ length: 6 }).map((_, index) => {
        const x = 75 + index * 96;
        return (
          <g key={index}>
            <rect x={x} y="90" width="72" height="92" rx="16" fill={index % 2 ? COLORS.grapeSoft : "#FFF2CE"} stroke={accent} strokeWidth="2" />
            <circle cx={x + 23} cy="120" r="6" fill={COLORS.ink} />
            <circle cx={x + 48} cy="120" r="6" fill={COLORS.ink} />
            <circle cx={x + 23} cy="148" r="6" fill={COLORS.ink} />
            <circle cx={x + 48} cy="148" r="6" fill={COLORS.ink} />
          </g>
        );
      })}
      <text x="320" y="220" textAnchor="middle" fontSize="22" fontWeight="900" fill={COLORS.ink}>…</text>
      <rect x="205" y="250" width="230" height="52" rx="20" fill={COLORS.tealSoft} />
      <text x="320" y="282" textAnchor="middle" fontSize="20" fontWeight="900" fill="#168F7F">{visual.labels[1]}</text>
    </g>
  );
}

export default function NumberOperationsBoard({ question, step = 0 }) {
  const visual = question.visual;
  const accent = step === 1 ? COLORS.honeyStroke : step >= 3 ? COLORS.teal : COLORS.grape;
  let scene = null;
  if (visual.type === "column-operation") scene = <ColumnOperation visual={visual} accent={accent} />;
  if (visual.type === "missing-number") scene = <MissingNumber visual={visual} accent={accent} />;
  if (visual.type === "change-bar") scene = <ChangeBar visual={visual} accent={accent} />;
  if (visual.type === "array-model") scene = <ArrayModel visual={visual} accent={accent} />;
  if (visual.type === "area-product") scene = <AreaProduct visual={visual} accent={accent} />;
  if (visual.type === "division-groups") scene = <DivisionGroups visual={visual} accent={accent} />;
  if (visual.type === "multi-step-bar") scene = <MultiStepBar visual={visual} accent={accent} />;
  if (visual.type === "estimation") scene = <Estimation visual={visual} accent={accent} />;
  if (visual.type === "error-work") scene = <ErrorWork visual={visual} accent={accent} />;
  if (visual.type === "operation-choice") scene = <OperationChoice visual={visual} accent={accent} />;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-[#fbfaf6]">
      {visual.type === "multi-step-bar" && <MobileMultiStepBar visual={visual} step={step} answer={question.answer} />}
      <svg className={`${visual.type === "multi-step-bar" ? "hidden sm:block" : "block"} h-[270px] w-full sm:h-[330px]`} viewBox="0 0 640 360" role="img" aria-label={`Modelo visual para la pregunta: ${question.prompt}`}>
        {scene}
        <AnswerBadge answer={question.answer} visible={step >= 3} />
      </svg>
    </div>
  );
}
