"use client";

import { useState } from "react";
import { TrialButton } from "@/components/landing/bits";

// El reto jugable del hero: la demo del producto. Dos retos cortos (deducción y
// patrón) autocontenidos; al resolverlos, el CTA cierra hacia el registro.
const RETOS = [
  {
    id: "mentiroso",
    tipo: "Deducción",
    historia:
      "Alguien se comió la última galleta del salón. Solo UNO de los tres miente:",
    pistas: [
      "Nico: “Yo no fui.”",
      "Sara: “Fue Nico.”",
      "Tomás: “Sara dice la verdad.”",
    ],
    pregunta: "¿Quién se comió la galleta?",
    opciones: ["Nico", "Sara", "Tomás"],
    correcta: "Nico",
    explicacion:
      "Si Nico dijera la verdad, Sara y Tomás estarían mintiendo a la vez… y solo uno miente. El que miente es Nico.",
    pistaError: "Ojo: si esa persona miente, ¿cuántos más quedarían mintiendo?",
  },
  {
    id: "patron",
    tipo: "Patrones",
    historia:
      "La clave de la caja fuerte sigue un patrón secreto:",
    pistas: ["3 → 6 → 12 → 24 → ?"],
    pregunta: "¿Qué número abre la caja?",
    opciones: ["30", "36", "48"],
    correcta: "48",
    explicacion: "Cada número es el doble del anterior: 24 × 2 = 48.",
    pistaError: "Mira qué le pasa a cada número para convertirse en el siguiente.",
  },
];

export default function HeroReto() {
  const [paso, setPaso] = useState(0); // índice del reto actual
  const [eleccion, setEleccion] = useState(null);
  const [resuelto, setResuelto] = useState(false);
  const [terminado, setTerminado] = useState(false);

  const reto = RETOS[paso];
  const fallo = eleccion !== null && !resuelto;

  function elegir(op) {
    if (resuelto) return;
    setEleccion(op);
    if (op === reto.correcta) setResuelto(true);
  }

  function siguiente() {
    if (paso + 1 < RETOS.length) {
      setPaso(paso + 1);
      setEleccion(null);
      setResuelto(false);
    } else {
      setTerminado(true);
    }
  }

  if (terminado) {
    return (
      <div className="w-full max-w-md animate-pop rounded-4xl bg-white p-7 text-center shadow-soft">
        <div className="text-5xl" aria-hidden="true">
          🕵️
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-ink">
          ¡Caso resuelto!
        </h3>
        <p className="mt-2 text-muted">
          Así se siente cada reto: tu hijo cree que juega al detective, pero está
          entrenando su mente.
        </p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <TrialButton>Quiero esto para mi hijo</TrialButton>
          <p className="text-sm text-muted">Más de 60 casos lo esperan</p>
        </div>
      </div>
    );
  }

  return (
    <div
      key={fallo ? `shake-${eleccion}` : "steady"}
      className={`w-full max-w-md rounded-4xl bg-white p-6 shadow-soft sm:p-7 ${
        fallo ? "animate-shake" : ""
      }`}
    >
      {/* encabezado tipo expediente */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-honey-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-honey-deep">
          🔍 Reto {paso + 1} de {RETOS.length} · {reto.tipo}
        </span>
        <span className="flex gap-1.5" aria-hidden="true">
          {RETOS.map((r, i) => (
            <span
              key={r.id}
              className={`h-2 w-2 rounded-full ${
                i < paso || (i === paso && resuelto) ? "bg-teal" : "bg-ink/10"
              }`}
            />
          ))}
        </span>
      </div>

      <p className="mt-4 font-medium text-ink">{reto.historia}</p>
      <ul className="mt-3 space-y-2 rounded-2xl bg-cloud p-4 text-sm text-ink">
        {reto.pistas.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <p className="mt-4 font-display font-semibold text-ink">{reto.pregunta}</p>

      <div className="mt-3 grid gap-2">
        {reto.opciones.map((op) => {
          const esCorrecta = resuelto && op === reto.correcta;
          const esError = fallo && op === eleccion;
          return (
            <button
              key={op}
              type="button"
              onClick={() => elegir(op)}
              disabled={resuelto}
              className={`rounded-2xl border-2 px-4 py-3 text-left font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep ${
                esCorrecta
                  ? "animate-pop border-teal bg-teal-soft text-ink"
                  : esError
                    ? "border-coral bg-coral-soft text-ink"
                    : "border-ink/10 bg-white text-ink transition-transform hover:-translate-y-0.5 hover:border-honey hover:shadow-card"
              }`}
            >
              {op}
            </button>
          );
        })}
      </div>

      {/* feedback: pista si falla, explicación si acierta */}
      {fallo && (
        <p className="mt-3 animate-pop text-sm font-medium text-coral">
          Todavía no… {reto.pistaError}
        </p>
      )}
      {resuelto && (
        <div className="mt-3 animate-pop">
          <p className="text-sm font-semibold text-teal">¡Exacto! 🎉</p>
          <p className="mt-1 text-sm text-muted">{reto.explicacion}</p>
          <button
            type="button"
            onClick={siguiente}
            className="mt-3 w-full rounded-full bg-ink px-5 py-3 font-display font-semibold text-cream transition hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep"
          >
            {paso + 1 < RETOS.length ? "Siguiente pista →" : "Cerrar el caso →"}
          </button>
        </div>
      )}
    </div>
  );
}
