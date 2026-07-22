import Reveal from "@/components/landing/Reveal";
import Torn from "@/components/landing/Torn";

export default function Differentiator() {
  return (
    <section className="night-sky relative">
      {/* papel rasgado hacia las secciones vecinas (crema arriba, nube abajo) */}
      <Torn color="#F7F5F0" position="top" />
      <Torn color="#EDEFF6" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey">
            Lo que hace distinto a Razonor
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Razonamiento con disfraz de misterio, no ejercicios con disfraz de
            juego
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Tu hijo no ve una guía de ejercicios con puntos de colores. Ve un
            caso que solo él puede resolver. La historia es lo que lo hace
            volver — y de paso mete comprensión de lectura sin anunciarla.
          </p>
        </Reveal>

        {/* Un reto visto por dentro, ligeramente girado como un expediente
            sobre el escritorio del detective */}
        <Reveal className="mx-auto mt-12 max-w-xl">
          <div className="-rotate-1 rounded-4xl bg-white p-5 shadow-soft transition duration-300 hover:rotate-0 sm:p-7">
            <p className="text-sm font-medium text-muted">
              Capítulo 3 · “El mensaje cifrado del museo”
            </p>
            <p className="mt-3 rounded-2xl bg-cloud p-4 text-sm leading-relaxed text-ink">
              “El guardia anotó los pasos del ladrón en desorden. Ordénalos para
              descubrir por dónde escapó: <em>salió por la ventana · apagó la
              cámara · entró a la sala · guardó la estatua</em>”
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Lo que él siente: resolver un caso 🕵️</Tag>
              <Tag>Lo que entrena: ordenar pasos = lógica de programación</Tag>
            </div>
          </div>
        </Reveal>

        {/* Comparación */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-4xl border border-white/10 bg-white/5 p-6">
              <p className="font-display text-lg font-semibold text-white/60">
                Apps de ejercicios y videos
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <Cross>Ejercicios sueltos que aburren a la semana.</Cross>
                <Cross>Contenido traducido, pensado en otro idioma.</Cross>
                <Cross>El papá no sabe qué está pasando ahí adentro.</Cross>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="h-full rounded-4xl bg-honey p-6 shadow-glow">
              <p className="font-display text-lg font-semibold text-ink">Razonor</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                <Check>Una historia que pide el siguiente capítulo.</Check>
                <Check>Escrito en español, pensado en español.</Check>
                <Check>Panel de padres con progreso y recomendaciones.</Check>
                <Check>Criterio frente a la IA, no moda de programación.</Check>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full bg-honey-soft px-3 py-1.5 text-xs font-semibold text-honey-deep">
      {children}
    </span>
  );
}

function Check({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden="true">✓</span>
      <span>{children}</span>
    </li>
  );
}

function Cross({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span aria-hidden="true">✕</span>
      <span>{children}</span>
    </li>
  );
}
