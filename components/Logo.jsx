// Marca de Astuto: una lupa con destello, dibujada por código (sin imágenes).
// Reemplaza a la mascota en landing y funnel; Mascot.jsx queda solo para el
// producto viejo. `Logo` = símbolo solo; `LogoWordmark` = símbolo + nombre
// (`dark` para usarlo sobre fondos noche).

export default function Logo({ size = 34, className = "" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Astuto"
    >
      {/* fondo redondeado azul medianoche con borde tenue */}
      <rect
        x="4"
        y="4"
        width="112"
        height="112"
        rx="26"
        fill="#141B36"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2"
      />
      {/* lupa: aro ámbar + mango */}
      <circle cx="53" cy="51" r="26" fill="none" stroke="#FFBE3D" strokeWidth="10" />
      <line
        x1="73"
        y1="71"
        x2="94"
        y2="92"
        stroke="#FFBE3D"
        strokeWidth="12"
        strokeLinecap="round"
      />
      {/* cristal con destello */}
      <circle cx="53" cy="51" r="21" fill="#1C2547" />
      <path
        d="M45 42 q4 -5 10 -5"
        stroke="#F7F5F0"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* chispa: la pista encontrada */}
      <path
        d="M53 44 l2.6 5.4 5.4 2.6 -5.4 2.6 -2.6 5.4 -2.6 -5.4 -5.4 -2.6 5.4 -2.6 z"
        fill="#FFBE3D"
      />
    </svg>
  );
}

export function LogoWordmark({ size = 34, dark = false, className = "" }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Logo size={size} />
      <span
        className={`font-display text-xl font-bold ${dark ? "text-white" : "text-ink"}`}
      >
        Astuto
      </span>
    </span>
  );
}
