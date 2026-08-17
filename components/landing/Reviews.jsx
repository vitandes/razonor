import Reveal from "@/components/landing/Reveal";

const SIGNALS = [
  {
    icon: "💬",
    title: "Explica cómo llegó a la respuesta",
    text: "No solo dice un número: empieza a contar qué datos usó y por qué eligió esa estrategia.",
    color: "bg-teal-soft text-teal",
  },
  {
    icon: "🔎",
    title: "Lee el problema antes de calcular",
    text: "Identifica lo importante, descarta información que distrae y piensa qué necesita descubrir.",
    color: "bg-honey-soft text-honey-deep",
  },
  {
    icon: "🧠",
    title: "Prueba otra estrategia",
    text: "Cuando se equivoca, recibe una pista y vuelve a intentarlo sin sentir que el error es un castigo.",
    color: "bg-grape-soft text-grape",
  },
  {
    icon: "📈",
    title: "Avanza en habilidades concretas",
    text: "El panel muestra matemáticas, lógica, resolución de problemas y razonamiento espacial por separado.",
    color: "bg-coral-soft text-coral",
  },
];

export default function Reviews() {
  return (
    <section id="opiniones" className="scroll-mt-20 bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
            Progreso que puedes reconocer
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Cambios pequeños que muestran que está aprendiendo a pensar
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Razonor mide respuestas y estrategias para mostrarte avances reales,
            no una cifra inflada de ejercicios completados.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNALS.map((signal, index) => (
            <Reveal key={signal.title} delay={index * 100} className="h-full">
              <article className="flex h-full flex-col rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${signal.color}`} aria-hidden="true">
                  {signal.icon}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-tight text-ink">
                  {signal.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{signal.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-4xl border border-ink/5 bg-white p-6 text-center shadow-card sm:p-8">
            <p className="font-display text-xl font-bold text-ink">
              Las historias reales vendrán de familias reales
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Estamos construyendo una primera comunidad de familias. Publicaremos
              testimonios únicamente con su permiso y con cambios que puedan describir
              de forma concreta.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
