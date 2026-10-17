import { DemoButton } from "@/components/landing/bits";
import Reveal from "@/components/landing/Reveal";

// Invitación a probar la demo guiada ANTES de pedir datos o pago. Resuelve el
// mayor freno de conversión: el padre quiere ver cómo enseña Razonor sin pagar
// ni tener al estudiante al lado. La vista previa muestra una respuesta
// incorrecta con su explicación propia, que es lo que nos diferencia.
const HIGHLIGHTS = [
  {
    mark: "1",
    title: "Empieza por un error común",
    text: "El clásico “20% de 80”, que muchos estudiantes fallan aunque sepan la regla.",
  },
  {
    mark: "?",
    title: "Explica por qué te equivocaste",
    text: "Cada respuesta incorrecta tiene su propia explicación, no un “inténtalo de nuevo”.",
  },
  {
    mark: "✓",
    title: "Termina con un ejemplo del panel",
    text: "Ves lo que recibirías como padre: qué está firme y por dónde empezaría la ruta.",
  },
];

export default function DemoCta() {
  return (
    <section id="ejemplo" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-4xl bg-white shadow-soft">
            <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-grape">
                  Demo gratis · 4 retos · 2 minutos
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  No te pedimos que confíes. Juega 4 retos y decide.
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
                  Sin registro y sin tener a tu hijo al lado. Vas a ver cómo Razonor
                  sigue la pista desde un error común hasta la base que lo causa.
                </p>

                <ul className="mt-7 space-y-3">
                  {HIGHLIGHTS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-night font-display text-base font-bold text-honey">
                        {item.mark}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold leading-snug text-ink">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <DemoButton analyticsContext="section_demo" />
                </div>
              </div>

              <div className="relative">
                <div className="night-sky relative overflow-hidden rounded-4xl p-6 shadow-card sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-honey">
                    Reto 1 de 4 · El error común
                  </p>
                  <p className="mt-3 font-display text-2xl font-bold leading-snug text-white">
                    ¿Cuánto es 20% de 80?
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <DemoOption label="A" value="20" state="picked" />
                    <DemoOption label="B" value="16" state="correct" />
                    <DemoOption label="C" value="60" />
                    <DemoOption label="D" value="4" />
                  </div>

                  <div className="mt-4 rounded-2xl bg-coral-soft p-3.5 text-sm leading-relaxed text-ink/80">
                    <span className="font-bold text-coral">Elegiste 20:</span> copiaste el 20.
                    Pero 20% no son 20 unidades: son 20 de cada 100. Y 20 de cada 100 es
                    lo mismo que 1 de cada 5 → 80 ÷ 5 = 16.
                  </div>
                </div>
                <span
                  className="absolute -right-3 -top-3 rounded-full bg-honey px-3 py-1 text-xs font-bold text-night shadow-card"
                  aria-hidden="true"
                >
                  Interactivo
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DemoOption({ label, value, state }) {
  const tone =
    state === "correct"
      ? "border-teal bg-teal-soft text-teal"
      : state === "picked"
        ? "border-coral bg-coral-soft text-coral"
        : "border-white/10 bg-white/5 text-white/60";
  return (
    <div className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-3 font-display text-lg font-bold ${tone}`}>
      <span className="text-xs opacity-60">{label}</span>
      {value}
    </div>
  );
}
