import LegalLayout, { LegalSection } from "@/components/landing/LegalLayout";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

export const metadata = {
  title: "Soporte — Astuto",
  description:
    "Ayuda con tu cuenta, tu suscripción de Mercado Pago y el uso de Astuto.",
};

export default function Soporte() {
  return (
    <LegalLayout
      title="Centro de ayuda"
      intro="Respuestas rápidas a lo que más nos preguntan. Si no encuentras lo que buscas, escríbenos a hola@astuto.app y te ayudamos."
    >
      <LegalSection heading="Empezar con Astuto">
        <p>
          {HAS_TRIAL
            ? `Crea tu cuenta, agrega el perfil de tu hijo (nombre o apodo y edad) y elige un plan: la prueba gratis de ${TRIAL_LABEL} empieza al registrar tu medio de pago, y el primer cobro solo ocurre cuando termina.`
            : "Crea tu cuenta, agrega el perfil de tu hijo (nombre o apodo y edad), elige un plan y empieza con el primer caso."}
        </p>
      </LegalSection>

      <LegalSection heading="Cómo veo el progreso de mi hijo">
        <p>
          En tu panel de padres ves sus retos resueltos, su racha, los capítulos
          completados, sus fortalezas y debilidades por habilidad, y una
          recomendación en lenguaje claro.
        </p>
      </LegalSection>

      <LegalSection heading="Manejar mi suscripción">
        <p>
          En Colombia tu plan se cobra a través de <strong>Mercado Pago</strong>.
          Desde tu cuenta de Astuto puedes ver tu plan actual y la fecha de la
          próxima renovación. Para cambiar el medio de pago o revisar un cobro,
          también puedes hacerlo desde tu cuenta de Mercado Pago.
        </p>
      </LegalSection>

      <LegalSection heading="Cambiar de plan o de medio de pago">
        <p>
          Puedes pasar del plan Individual al Familiar (o al revés) cuando
          quieras; el cambio aplica en tu siguiente renovación. Los medios de
          pago disponibles —Nequi, PSE y tarjeta— se gestionan dentro de Mercado
          Pago al momento de pagar.
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
          <a className="text-honey-deep underline" href="mailto:hola@astuto.app">
            hola@astuto.app
          </a>{" "}
          y te respondemos lo antes posible.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
