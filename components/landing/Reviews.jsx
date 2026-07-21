import { Stars } from "@/components/landing/bits";
import Reveal from "@/components/landing/Reveal";

// PLACEHOLDER: reseñas de ejemplo para maquetar.
// Reemplazar por testimonios reales con permiso de las familias antes de publicar.
const REVIEWS = [
  {
    name: "Laura G.",
    city: "Medellín",
    child: "hijo de 8",
    stars: 5,
    text: "Antes había que rogarle para hacer tareas. Ahora me pide el celular “para resolver su caso”. No se da cuenta de que está razonando.",
  },
  {
    name: "Andrés M.",
    city: "Bogotá",
    child: "hija de 10",
    stars: 5,
    text: "En el panel vi que le costaban los patrones. Dos semanas después la profesora me dijo que mejoró en los problemas de matemáticas.",
  },
  {
    name: "Diana R.",
    city: "Cali",
    child: "hijo de 9",
    stars: 5,
    text: "Se acabó la culpa por la pantalla: son 15 minutos de misterios en vez de una hora de videos.",
  },
  {
    name: "Carolina T.",
    city: "Barranquilla",
    child: "hija de 7",
    stars: 5,
    text: "Le encanta la historia. Y a mí me encanta que para avanzar tiene que leer con cuidado — se le nota en el colegio.",
  },
  {
    name: "Julián P.",
    city: "Bucaramanga",
    child: "hijo de 11",
    stars: 5,
    text: "Cuesta menos que una sola hora de refuerzo y lo usa todos los días. Ahora hasta le discute al chat de IA cuando dice bobadas.",
  },
  {
    name: "Marcela V.",
    city: "Pereira",
    child: "hija de 8",
    stars: 4,
    text: "La racha la tiene obsesionada. Ojalá saquen pronto el siguiente mundo.",
  },
];

const AVATAR = ["bg-honey-soft", "bg-grape-soft", "bg-teal-soft", "bg-coral-soft"];

export default function Reviews() {
  return (
    <section id="opiniones" className="scroll-mt-20 bg-cloud">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey-deep">
            Opiniones
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Papás que ya ven a sus hijos pensar distinto
          </h2>
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-card">
            <span className="font-display text-2xl font-bold text-ink">
              4,9
            </span>
            <Stars value={5} />
            <span className="text-sm text-muted">+3.000 familias</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 120} className="h-full">
            <figure
              className="flex h-full flex-col rounded-4xl bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <Stars value={r.stars} className="text-base" />
              <blockquote className="mt-3 flex-1 leading-relaxed text-ink">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full font-display font-semibold text-ink ${
                    AVATAR[i % AVATAR.length]
                  }`}
                  aria-hidden="true"
                >
                  {r.name.charAt(0)}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-ink">{r.name}</span>
                  <span className="block text-muted">
                    {r.city} · {r.child}
                  </span>
                </span>
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
