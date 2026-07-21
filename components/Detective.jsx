// Mascota de la app del niño: un detective simpático dibujado por código (sin
// imágenes). Reemplaza al león viejo (Mascot.jsx). Acompaña, da pistas y celebra.
// `mood`: "happy" (sonríe) | "think" (ceja levantada + burbuja). `size` en px.

export default function Detective({ size = 96, mood = "happy", className = "" }) {
  const think = mood === "think";
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Astu, tu detective"
    >
      {/* sombra suave */}
      <ellipse cx="60" cy="112" rx="26" ry="5" fill="#141B36" opacity="0.12" />

      {/* gorra de detective (deerstalker) */}
      <path
        d="M30 44 Q60 8 90 44 Q92 50 86 52 L34 52 Q28 50 30 44 Z"
        fill="#8A5A2B"
      />
      <path d="M30 44 Q60 22 90 44 Q60 34 30 44 Z" fill="#764B22" />
      <rect x="34" y="49" width="52" height="7" rx="3.5" fill="#5E3B1A" />
      <circle cx="60" cy="24" r="4" fill="#5E3B1A" />

      {/* cara */}
      <circle cx="60" cy="70" r="30" fill="#FFE0B8" />
      {/* orejas */}
      <circle cx="31" cy="70" r="6" fill="#FFE0B8" />
      <circle cx="89" cy="70" r="6" fill="#FFE0B8" />

      {/* ojos */}
      <circle cx="50" cy="68" r="4.4" fill="#141B36" />
      <circle cx="70" cy="68" r="4.4" fill="#141B36" />
      <circle cx="51.4" cy="66.4" r="1.4" fill="#fff" />
      <circle cx="71.4" cy="66.4" r="1.4" fill="#fff" />

      {/* cejas: en modo pensar, una levantada */}
      {think ? (
        <>
          <path d="M44 60 q6 -4 12 -1" stroke="#8A5A2B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M64 58 q6 -1 12 2" stroke="#8A5A2B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M44 61 q6 -3 12 0" stroke="#8A5A2B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M64 61 q6 -3 12 0" stroke="#8A5A2B" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* boca */}
      {think ? (
        <path d="M54 84 h12" stroke="#141B36" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M52 82 q8 8 16 0" stroke="#141B36" strokeWidth="3" fill="none" strokeLinecap="round" />
      )}

      {/* mejillas */}
      <circle cx="42" cy="78" r="4" fill="#FF7A6B" opacity="0.45" />
      <circle cx="78" cy="78" r="4" fill="#FF7A6B" opacity="0.45" />

      {/* lupa junto a la cara */}
      <g transform="translate(2 2)">
        <circle cx="96" cy="92" r="10" fill="none" stroke="#141B36" strokeWidth="4" />
        <circle cx="96" cy="92" r="7" fill="#7C6CF2" opacity="0.25" />
        <line x1="103" y1="99" x2="112" y2="108" stroke="#141B36" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* burbuja de pensar */}
      {think && (
        <g fill="#FFBE3D">
          <circle cx="96" cy="44" r="3.4" />
          <circle cx="104" cy="37" r="2.4" />
          <circle cx="110" cy="31" r="1.6" />
        </g>
      )}
    </svg>
  );
}
