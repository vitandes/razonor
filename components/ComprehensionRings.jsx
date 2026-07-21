const LEVELS = [
  { key: "literal", color: "#2BB3C0", track: "#D6F1F4" },
  { key: "inferencial", color: "#7B5BE0", track: "#E9E2FB" },
  { key: "critico", color: "#FF6B6B", track: "#FFE1DE" },
];

export default function ComprehensionRings({
  values = { literal: 0, inferencial: 0, critico: 0 },
  size = 180,
  stroke = 13,
  gap = 7,
  centerTop = "",
  centerBottom = "",
}) {
  const c = size / 2;
  const rings = LEVELS.map((lvl, i) => {
    const r = c - stroke / 2 - 3 - i * (stroke + gap);
    const circ = 2 * Math.PI * r;
    const val = Math.max(0, Math.min(100, values[lvl.key] ?? 0));
    return { ...lvl, r, circ, dash: (circ * val) / 100 };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Comprensión: literal ${values.literal}%, inferencial ${values.inferencial}%, crítica ${values.critico}%`}
    >
      <g transform={`rotate(-90 ${c} ${c})`}>
        {rings.map((rg) => (
          <g key={rg.key}>
            <circle
              cx={c}
              cy={c}
              r={rg.r}
              fill="none"
              stroke={rg.track}
              strokeWidth={stroke}
            />
            <circle
              cx={c}
              cy={c}
              r={rg.r}
              fill="none"
              stroke={rg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${rg.dash} ${rg.circ}`}
            />
          </g>
        ))}
      </g>
      {(centerTop || centerBottom) && (
        <text x={c} y={c} textAnchor="middle" fontFamily="var(--font-display)">
          {centerTop && (
            <tspan x={c} dy="-2" fontSize={size * 0.2} fontWeight="600" fill="#2A2342">
              {centerTop}
            </tspan>
          )}
          {centerBottom && (
            <tspan x={c} dy={size * 0.14} fontSize={size * 0.075} fill="#6B6580">
              {centerBottom}
            </tspan>
          )}
        </text>
      )}
    </svg>
  );
}
