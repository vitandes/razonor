import Reveal from "@/components/landing/Reveal";
import Torn from "@/components/landing/Torn";

export default function Differentiator() {
  return (
    <section id="resultado" className="night-sky relative scroll-mt-20">
      {/* papel rasgado hacia las secciones vecinas (crema arriba, nube abajo) */}
      <Torn color="#F7F5F0" position="top" />
      <Torn color="#EDEFF6" />
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wide text-honey">
            Del resultado a la decisión
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
            De un error visible a una decisión clara
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Razonor no se limita a marcar una respuesta. La conecta con una habilidad,
            una posible causa y el fundamento que conviene comprobar antes de avanzar.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-xl">
          <div className="rounded-4xl bg-white p-5 shadow-soft sm:p-7">
            <p className="text-sm font-bold uppercase tracking-wide text-teal">Ejemplo de una decisión del plan</p>
            <p className="mt-3 rounded-2xl bg-cloud p-4 text-sm leading-relaxed text-ink">
              Un estudiante falla “20% de 80”. Antes de repetir porcentajes, Razonor
              comprueba si entiende que 20% equivale a 20/100 y si puede conectar
              fracción, decimal y porcentaje.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Error visible: porcentaje</Tag>
              <Tag>Posible raíz: equivalencia de representaciones</Tag>
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
                <Cross>Mismo orden para todos.</Cross>
                <Cross>Porcentaje de aciertos sin nivel de confianza.</Cross>
                <Cross>Más práctica del síntoma, no de la causa.</Cross>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="h-full rounded-4xl bg-honey p-6 shadow-glow">
              <p className="font-display text-lg font-semibold text-ink">Razonor</p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                <Check>Diagnóstico que cambia según las respuestas.</Check>
                <Check>Plan ordenado por prerrequisitos.</Check>
                <Check>Dominio y confianza por separado.</Check>
                <Check>Sesiones con explicación, práctica y repaso.</Check>
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
