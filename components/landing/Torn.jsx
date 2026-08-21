// Separador orgánico entre secciones. Se coloca dentro de una sección
// `relative`, pegado arriba o abajo, con el color de la sección vecina.
const JAGGED =
  "M0,28 L0,14 L36,20 L74,8 L118,17 L164,6 L204,15 L252,9 L296,18 L342,7 L390,16 L438,10 L482,19 L528,6 L574,15 L620,9 L666,17 L710,7 L756,16 L802,10 L848,18 L894,8 L938,15 L986,6 L1030,17 L1076,9 L1122,16 L1164,11 L1200,15 L1200,28 Z";

export default function Torn({ color = "#F7F5F0", position = "bottom" }) {
  const flip = position === "top";
  return (
    <svg
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 h-5 w-full sm:h-7 ${
        flip ? "top-0 rotate-180" : "bottom-0"
      }`}
    >
      <path d={JAGGED} fill={color} />
    </svg>
  );
}
