"use client";

import { isSubscribed, useProgress } from "@/lib/progress";

// Muestra su contenido solo a quien todavía no es suscriptor: textos de venta
// ("activa el acceso", "no se cobra hoy"…) que no aplican a quien ya pagó.
// Mientras el progreso se hidrata se muestra, para no mover la página a los
// visitantes nuevos, que son el público que tiene que convertir.
export default function ProspectOnly({ children }) {
  const progress = useProgress();
  if (progress.hydrated && isSubscribed(progress.subscription)) return null;
  return children;
}
