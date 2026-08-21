import LegalLayout, { LegalSection } from "@/components/landing/LegalLayout";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

export const metadata = {
  title: "Soporte — Razonor",
  description:
    "Ayuda con tu cuenta, tu diagnóstico matemático, tu plan y tu suscripción de Razonor.",
};

export default function Soporte() {
  return (
    <LegalLayout
      title="Centro de ayuda"
      intro="Respuestas rápidas a lo que más nos preguntan. Si no encuentras lo que buscas, escríbenos a hola@razonor.com y te ayudamos."
    >
      <LegalSection heading="Empezar con Razonor">
        <p>
          {HAS_TRIAL
            ? `Completa el onboarding y crea tu cuenta. Puedes elegir el plan aunque el estudiante no esté contigo; el diagnóstico matemático se puede hacer después. La prueba gratis de ${TRIAL_LABEL} empieza al registrar tu medio de pago, y el primer cobro solo ocurre cuando termina.`
            : "Completa el onboarding y crea tu cuenta. Puedes elegir el plan aunque el estudiante no esté contigo; cuando estén juntos, hará el diagnóstico para generar su ruta personalizada."}
        </p>
      </LegalSection>

      <LegalSection heading="Cómo veo el progreso de mi hijo">
        <p>
          En tu panel de padres ves el dominio y la evidencia por área, la
          actividad reciente y el orden de habilidades recomendado. Las
          estimaciones se actualizan con cada sesión.
        </p>
      </LegalSection>

      <LegalSection heading="Manejar mi suscripción">
        <p>
          En Colombia tu plan se cobra a través de <strong>Mercado Pago</strong>.
          Desde tu cuenta de Razonor puedes ver tu plan actual y la fecha de la
          próxima renovación. Para cambiar el medio de pago o revisar un cobro,
          también puedes hacerlo desde tu cuenta de Mercado Pago.
        </p>
      </LegalSection>

      <LegalSection heading="Cambiar el periodo o el medio de pago">
        <p>
          Puedes elegir facturación mensual o semestral. El cambio se aplica en
          la siguiente renovación. El pago con tarjeta se gestiona de forma
          segura con el proveedor de pagos disponible en tu país.
        </p>
      </LegalSection>

      <LegalSection heading="Cancelar">
        <p>
          Puedes cancelar cuando quieras, sin permanencia. La cancelación
          detiene las renovaciones futuras y conservas el acceso hasta que
          termine el período que ya pagaste.
        </p>
      </LegalSection>

      <LegalSection heading="¿En qué dispositivos funciona?">
        <p>
          En celular, tablet y computador, directamente desde el navegador. No
          necesitas instalar nada.
        </p>
      </LegalSection>

      <LegalSection heading="¿Sigues con dudas?">
        <p>
          Escríbenos a{" "}
          <a className="text-honey-deep underline" href="mailto:hola@razonor.com">
            hola@razonor.com
          </a>{" "}
          y te respondemos lo antes posible.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
