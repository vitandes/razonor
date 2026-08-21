import Reveal from "@/components/landing/Reveal";

const NERVIOS = [
  {
    emoji: "01",
    title: "El error visible puede no ser la causa",
    desc: "Fallar porcentajes puede empezar en fracciones, decimales o proporciones. Practicar más porcentajes no repara necesariamente esa base.",
    color: "text-coral",
  },
  {
    emoji: "02",
    title: "La edad no muestra el nivel real",
    desc: "Dos estudiantes de la misma edad pueden necesitar puntos de partida distintos. Una ruta fija deja vacíos atrás o repite lo que ya dominan.",
    color: "text-grape",
  },
  {
    emoji: "03",
    title: "Una nota no explica qué hacer después",
    desc: "Saber que obtuvo 60% no indica qué fundamento estudiar primero. El plan debe convertir resultados en una secuencia concreta.",
    color: "text-teal",
  },
];

export default function Problem({ market = "co" }) {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-coral">
            La necesidad real
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Muchos estudiantes avanzan sin saber qué base les falta
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Razonor observa habilidades concretas, encuentra vacíos raíz y organiza
            una ruta que empieza por lo que desbloquea el resto.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {NERVIOS.map((n, i) => (
            <Reveal key={n.title} delay={i * 120}>
              <div className="h-full rounded-4xl bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="font-display text-2xl font-bold text-ink/20" aria-hidden="true">
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
            Diagnosticar bien evita practicar mucho en el lugar equivocado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
