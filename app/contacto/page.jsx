import LegalLayout, { LegalSection } from "@/components/landing/LegalLayout";
import { TrialButton } from "@/components/landing/bits";
import { HAS_TRIAL, TRIAL_LABEL, CTA_START } from "@/lib/trial";

export const metadata = {
  title: "Contacto — Razonor",
  description: "Habla con el equipo de Razonor. Te respondemos por correo.",
};

const CHANNELS = [
  {
    emoji: "✉️",
    title: "Correo",
    desc: "Para cualquier duda sobre Razonor, tu cuenta o tu suscripción.",
    action: "hola@razonor.com",
    href: "mailto:hola@razonor.com",
  },
];

export default function Contacto() {
  return (
    <LegalLayout
      title="Hablemos"
      intro="¿Tienes una pregunta antes de empezar, o quieres contarnos cómo le va a tu hijo con Razonor? Estamos para ayudarte."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <div key={c.title} className="rounded-4xl bg-white p-6 shadow-card">
            <span className="text-3xl" aria-hidden="true">
              {c.emoji}
            </span>
            <h2 className="mt-3 font-display text-lg font-semibold text-ink">
              {c.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            <a
              href={c.href}
              className="mt-4 inline-block font-medium text-honey-deep underline"
            >
              {c.action}
            </a>
          </div>
        ))}
      </div>

      <LegalSection heading="Sobre pagos y suscripciones">
        <p>
          En Colombia los cobros se gestionan a través de{" "}
          <strong>Mercado Pago</strong>; fuera de Colombia, con tarjeta en
          dólares. Si necesitas cambiar tu medio de pago, revisar un cobro o
          cancelar, escríbenos y te guiamos paso a paso.
        </p>
      </LegalSection>

      <div className="rounded-4xl bg-honey p-7 text-center shadow-card">
        <p className="font-display text-xl font-semibold text-ink">
          ¿Aún no has probado Razonor?
        </p>
        <p className="mx-auto mt-2 max-w-md text-ink/80">
          {HAS_TRIAL
            ? `Empieza la prueba gratis de ${TRIAL_LABEL}.`
            : "Crea tu cuenta y abre el primer caso hoy."}
        </p>
        <TrialButton variant="ink" className="mt-5">
          {CTA_START}
        </TrialButton>
      </div>
    </LegalLayout>
  );
}
