"use client";

import { useState } from "react";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";
import Reveal from "@/components/landing/Reveal";

// Dudas propias de familias latinas en EE.UU. (van de primeras: la objeción
// que más frena es el idioma y la escuela en inglés).
const FAQS_US = [
  {
    q: "Mi hijo entiende español pero contesta en inglés, ¿le sirve?",
    a: "Es el caso más común y justo para eso funciona. Los retos se leen en español claro y se resuelven tocando y eligiendo: tu hijo entrena la lógica mientras mantiene vivo el idioma, sin sentir que está en clase de español.",
  },
  {
    q: "¿Si lo usa en español se atrasa con la escuela en inglés?",
    a: "Al contrario. La lógica, los patrones y la comprensión se transfieren entre idiomas: un niño que razona y entiende mejor en español también lo hace mejor en inglés. Y de paso conserva el idioma de la familia.",
  },
  {
    q: "¿Qué español usan los retos?",
    a: "Español neutro y claro, pensado y escrito en español — no traducido de otro idioma.",
  },
];

const FAQS = [
  {
    q: "¿Para qué edades es Razonor?",
    a: "Para niños de 7 a 12 años. Un test inicial de 5 retos — que para tu hijo es solo un juego — lo ubica en su ruta: 7–9 o 10–12 años.",
  },
  {
    q: "¿Mi hijo necesita saber leer ya?",
    a: "Sí, conviene una lectura básica: los casos se leen para resolverse. Justo por eso cada misterio entrena comprensión de lectura sin que el niño lo note.",
  },
  {
    q: "¿Esto es para aprender a programar?",
    a: "No exactamente, y es a propósito. La IA ya escribe código; lo que sube de valor es pensar con lógica, ordenar pasos, deducir y tener criterio frente a lo que responde una máquina. Eso es lo que entrenan los retos.",
  },
  {
    q: "¿No es una pantalla más?",
    a: "Es el mismo celular haciendo algo distinto: 15 minutos al día, sin publicidad, sin compras dentro del juego, sin videos infinitos y sin chats con desconocidos.",
  },
  {
    q: "¿Cómo veo el progreso de mi hijo?",
    a: "En tu panel de padres: retos resueltos, racha, capítulos completados, fortalezas y debilidades por habilidad, y una recomendación en lenguaje claro. Hasta 3 hijos por cuenta.",
  },
  {
    q: "¿Con qué puedo pagar?",
    a: "Con tarjeta de crédito o débito, PSE y Nequi si estás en Colombia. Fuera de Colombia, con tarjeta en dólares.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: HAS_TRIAL
      ? `Cuando quieras, sin permanencia y sin llamadas. Empiezas con ${TRIAL_LABEL} gratis: si cancelas antes de que termine la prueba, no se te cobra nada.`
      : "Cuando quieras, sin permanencia y sin llamadas. Cancelas desde tu cuenta y no se renueva el siguiente periodo.",
  },
  {
    q: "¿En qué dispositivos funciona?",
    a: "En el celular, la tablet y el computador, desde el navegador. No hay que instalar nada de las tiendas de apps.",
  },
  {
    q: "¿Cuánto tiempo al día necesita?",
    a: "Cada caso dura 3–5 minutos; con 15 minutos al día es suficiente. La constancia importa más que las sesiones largas, y las rachas ayudan a sostener el hábito.",
  },
];

export default function Faq({ market = "co" }) {
  const [open, setOpen] = useState(0);
  const faqs = market === "us" ? [...FAQS_US, ...FAQS] : FAQS;

  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Resolvemos tus dudas
          </h2>
        </Reveal>

        <ul className="mt-10 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={Math.min(i, 4) * 70}>
              <li className="rounded-4xl bg-white shadow-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep"
                >
                  <span className="font-display text-lg font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-honey-deep transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="animate-pop px-6 pb-5 leading-relaxed text-muted">
                    {item.a}
                  </p>
                )}
              </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
