export default function Mascot({ size = 96, mood = "happy", className = "" }) {
  const manePieces = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return { x: 60 + Math.cos(a) * 41, y: 60 + Math.sin(a) * 41 };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Leo, el león lector"
    >
      {manePieces.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="13" fill="#E07B16" />
      ))}
      <circle cx="33" cy="33" r="9" fill="#FF9A2E" />
      <circle cx="87" cy="33" r="9" fill="#FF9A2E" />
      <circle cx="33" cy="33" r="4" fill="#FFE7C7" />
      <circle cx="87" cy="33" r="4" fill="#FFE7C7" />
      <circle cx="60" cy="60" r="40" fill="#FF9A2E" />
      <circle cx="60" cy="63" r="31" fill="#FFE7C7" />

      {mood === "think" ? (
        <>
          <circle cx="50" cy="58" r="4" fill="#2A2342" />
          <circle cx="70" cy="56" r="4" fill="#2A2342" />
          <circle cx="51.4" cy="56.6" r="1.3" fill="#fff" />
          <circle cx="71.4" cy="54.6" r="1.3" fill="#fff" />
          <circle cx="60" cy="80" r="3.4" fill="none" stroke="#2A2342" strokeWidth="3" />
          <circle cx="92" cy="40" r="2.6" fill="#7B5BE0" />
          <circle cx="100" cy="32" r="3.6" fill="#7B5BE0" />
        </>
      ) : (
        <>
          <circle cx="50" cy="58" r="4.6" fill="#2A2342" />
          <circle cx="70" cy="58" r="4.6" fill="#2A2342" />
          <circle cx="51.6" cy="56.3" r="1.5" fill="#fff" />
          <circle cx="71.6" cy="56.3" r="1.5" fill="#fff" />
          <path
            d="M48 76 Q60 87 72 76"
            stroke="#2A2342"
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}

      <path d="M54 66 h12 l-6 7 z" fill="#2A2342" />
      <circle cx="40" cy="68" r="4.5" fill="#FF6B6B" opacity="0.5" />
      <circle cx="80" cy="68" r="4.5" fill="#FF6B6B" opacity="0.5" />
    </svg>
  );
}
