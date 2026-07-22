import Reveal from "@/components/landing/Reveal";

// Los tres nervios del padre (informe, sección 2): rendimiento escolar (abre la
// billetera), preparación para la era de la IA (diferenciador) y culpa por las
// pantallas (cierre). La variante US pivota al ángulo de la diáspora latina.

const NERVIOS = [
  {
    emoji: "📉",
    title: "“Se sabe la fórmula, pero no entiende el problema”",
    desc: "El problema casi nunca es falta de estudio: es razonamiento y comprensión. Y eso se entrena con repetición corta y diaria, no con más tareas.",
    color: "text-coral",
  },
  {
    emoji: "🤖",
    title: "“Todo va a cambiar con la IA… ¿mi hijo está listo?”",
    desc: "No le enseñamos a programar: la IA ya escribe código. Le entrenamos lo que sube de valor — pensar, deducir y tener criterio frente a lo que una máquina responde.",
    color: "text-grape",
  },
  {
    emoji: "📱",
    title: "“Pasa horas en el celular y me siento culpable”",
    desc: "El mismo celular, haciendo algo distinto: 15 minutos al día, sin publicidad, sin compras dentro del juego, sin videos infinitos.",
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
            Por qué importa
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {us
              ? "Tres preocupaciones que conoces bien"
              : "Tres cosas que te quitan el sueño"}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {us
              ? "Que le vaya bien en la escuela, que no pierda el español y que la pantalla sume en vez de restar. Razonor ataca las tres a la vez."
              : "Un profesor particular cuesta $40.000–$70.000 la hora y ataca el síntoma. Razonor entrena la raíz: la forma de pensar."}
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
              ? "Retos pensados y escritos en español — no traducidos — para que razone, lea y calcule mejor en sus dos idiomas."
              : "Entender, deducir y razonar es la base de todas las materias. Eso es lo que Razonor entrena todos los días."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
