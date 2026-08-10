import Reveal from "@/components/landing/Reveal";

// Los tres nervios del padre (informe, sección 2): rendimiento escolar (abre la
// billetera), preparación para la era de la IA (diferenciador) y culpa por las
// pantallas (cierre). La variante US pivota al ángulo de la diáspora latina.

const NERVIOS = [
  {
    emoji: "🧠",
    title: "Encuentra una respuesta, pero no sabe explicarla",
    desc: "Memorizar una fórmula o copiar un resultado no es comprender. Cuando aprende a explicar el porqué, mejora la raíz de su desempeño en lectura, matemáticas y ciencias.",
    color: "text-coral",
  },
  {
    emoji: "🤖",
    title: "La IA responde con seguridad, incluso cuando se equivoca",
    desc: "Saber usar una herramienta no basta. Tu hijo necesita hacer buenas preguntas, detectar incoherencias y comprobar antes de aceptar una respuesta como cierta.",
    color: "text-grape",
  },
  {
    emoji: "🧩",
    title: "Usa tecnología, pero ¿sabe resolver problemas?",
    desc: "Programar y trabajar con IA empiezan mucho antes del código: dividir un problema, reconocer patrones, ordenar instrucciones y encontrar qué salió mal.",
    color: "text-teal",
  },
];

export default function Problem({ market = "co" }) {
  const us = market === "us";
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-coral">
            La habilidad que no puede delegar
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Antes de usar la IA, necesita criterio propio
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {us
              ? "La IA puede ayudarle a aprender o acostumbrarlo a aceptar respuestas sin entenderlas. La diferencia está en las bases mentales con las que la usa — y Razonor las entrena en español."
              : "La IA puede ayudarle a aprender o acostumbrarlo a aceptar respuestas sin entenderlas. La diferencia no está en saber qué botón tocar, sino en las bases mentales con las que la usa."}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {NERVIOS.map((n, i) => (
            <Reveal key={n.title} delay={i * 120}>
              <div className="h-full rounded-4xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="text-4xl" aria-hidden="true">
                  {n.emoji}
                </div>
                <h3 className={`mt-4 font-display text-lg font-semibold ${n.color}`}>
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{n.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-semibold text-ink">
            {us
              ? "Razonor entrena en español el pensamiento que luego aplicará en el colegio, al programar y cada vez que use una IA."
              : "Razonor entrena el pensamiento que luego aplicará en el colegio, al programar y cada vez que use una IA."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
