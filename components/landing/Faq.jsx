"use client";

import { useState } from "react";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";
import Reveal from "@/components/landing/Reveal";

const FAQS_US = [
  { q: "¿Puede usarlo si estudia matemáticas en inglés?", a: "Sí. Los conceptos matemáticos se mantienen y Razonor usa español latinoamericano neutral. La notación, las operaciones y los diagramas no dependen del idioma escolar." },
  { q: "¿Qué español utiliza?", a: "Español latinoamericano claro y neutral. Evitamos regionalismos que cambien el significado de un problema." },
];

const FAQS = [
  { q: "¿Para qué edades es Razonor?", a: "Para estudiantes de 10 a 18 años. La primera versión enseña fundamentos frecuentes de 10 a 14 y detecta vacíos de esas bases en estudiantes mayores." },
  { q: "¿Qué mide el diagnóstico?", a: "Observa nodos importantes de números, fracciones, proporciones, álgebra, geometría y datos. No pretende certificar las 30 habilidades en 15 preguntas: entrega una estimación inicial y sigue comprobándola durante las sesiones." },
  { q: "¿El diagnóstico debe responderlo el estudiante?", a: "Sí. Si no está contigo, puedes completar el onboarding, crear la cuenta y elegir el plan ahora. El diagnóstico quedará pendiente hasta que el estudiante pueda responderlo; nunca estimamos su nivel con percepciones del adulto." },
  { q: "¿Por qué algunas habilidades aparecen antes que otras?", a: "Porque están conectadas por prerrequisitos. Si una dificultad con porcentajes empieza en fracciones o proporciones, el plan fortalece primero esa base." },
  { q: "¿Qué significa dominio y confianza?", a: "Dominio es la estimación de cuánto comprende una habilidad. Confianza indica cuánta evidencia respalda esa estimación. Un solo acierto puede subir el dominio, pero mantiene baja la confianza." },
  { q: "¿La inteligencia artificial decide las respuestas?", a: "No. Las preguntas, respuestas y validaciones matemáticas son deterministas. La IA puede ayudar a variar una presentación revisada, pero no calcula ni califica." },
  { q: "¿Cuánto tiempo necesita al día?", a: "Entre 10 y 15 minutos. Cada sesión combina una explicación breve, práctica, razonamiento y repaso." },
  { q: "¿Con qué puedo pagar?", a: "En Colombia, con Mercado Pago en pesos colombianos. Fuera de Colombia, el cobro se procesa en dólares mediante Lemon Squeezy." },
  { q: "¿Cuáles son los precios?", a: "El plan individual cuesta $29.900 COP mensual o $119.900 COP semestral en Colombia. Internacionalmente cuesta USD 9,99 mensual o USD 39,99 semestral." },
  { q: "¿Puedo cancelar la renovación?", a: HAS_TRIAL ? `Sí. Si hay una prueba activa de ${TRIAL_LABEL}, puedes cancelarla antes del primer cobro. Después, puedes evitar la renovación del siguiente periodo desde tu cuenta.` : "Sí. Puedes cancelar la renovación del siguiente periodo desde tu cuenta." },
  { q: "¿En qué dispositivos funciona?", a: "En celular, tableta y computador desde el navegador, con un diseño adaptable a cada tamaño." },
];

export default function Faq({ market = "co" }) {
  const [open, setOpen] = useState(0);
  const faqs = market === "us" ? [...FAQS_US, ...FAQS] : FAQS;

  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <Reveal className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">Preguntas frecuentes</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">Lo importante antes de empezar</h2>
        </Reveal>
        <ul className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={Math.min(index, 4) * 70}>
                <li className="rounded-4xl bg-white shadow-card">
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-deep">
                    <span className="font-display text-lg font-semibold text-ink">{item.q}</span>
                    <span className={`shrink-0 text-2xl text-honey-deep transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                  </button>
                  {isOpen && <p className="animate-pop px-6 pb-5 leading-relaxed text-muted">{item.a}</p>}
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
