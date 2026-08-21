import LegalLayout, { LegalSection } from "@/components/landing/LegalLayout";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

export const metadata = {
  title: "Términos y condiciones — Razonor",
  description:
    "Las reglas para usar Razonor, incluyendo los pagos y las cancelaciones.",
};

export default function Terminos() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      intro={
        HAS_TRIAL
          ? "Estas son las reglas para usar Razonor. Al crear una cuenta o iniciar la prueba gratis, aceptas estos términos."
          : "Estas son las reglas para usar Razonor. Al crear una cuenta o suscribirte, aceptas estos términos."
      }
      updated="21 de agosto de 2026"
    >
      <LegalSection heading="Qué es Razonor">
        <p>
          Razonor es una plataforma de aprendizaje matemático personalizado para
          estudiantes de 10 a 18 años. Usa un diagnóstico adaptativo y práctica
          breve para estimar el dominio de habilidades, detectar vacíos y
          recomendar una ruta. Un adulto administra la cuenta cuando el
          estudiante es menor de edad.
        </p>
      </LegalSection>

      <LegalSection heading="Tu cuenta">
        <p>
          Debes ser mayor de edad para crear una cuenta y dar tus datos
          verdaderos. Eres responsable de cuidar tu contraseña y de la actividad
          que ocurra en tu cuenta.
        </p>
      </LegalSection>

      {HAS_TRIAL ? (
        <LegalSection heading={`Prueba gratis de ${TRIAL_LABEL}`}>
          <p>
            La prueba dura {TRIAL_LABEL}. Para iniciarla registras un medio de
            pago a través de Mercado Pago; durante la prueba no se cobra el plan
            (Mercado Pago puede hacer una validación temporal de la tarjeta que
            se reembolsa). Al terminar la prueba se cobra automáticamente el plan
            que elegiste —mensual o semestral— y la suscripción se renueva cada
            periodo, salvo que canceles antes. Si cancelas durante la prueba, no
            se te cobra nada.
          </p>
        </LegalSection>
      ) : (
        <LegalSection heading="Suscripción y cobro">
          <p>
            Al suscribirte se cobra de inmediato el plan que elijas. La
            suscripción se renueva automáticamente cada periodo —mensual o
            semestral— hasta que la canceles. Puedes cancelar cuando quieras:
            dejas de renovar y conservas el acceso hasta que termine el periodo
            ya pagado.
          </p>
        </LegalSection>
      )}

      <LegalSection heading="Planes, pagos y renovación">
        <p>
          Los planes y precios aparecen en la página de planes. En Colombia los
          pagos se procesan a través de <strong>Mercado Pago</strong>; fuera de
          Colombia, en dólares con tarjeta. Al contratar un plan, autorizas el
          cobro recurrente (mensual o semestral, según el plan) hasta que
          canceles.
        </p>
      </LegalSection>

      <LegalSection heading="Cancelación">
        <p>
          Puedes cancelar cuando quieras, sin permanencia. La cancelación
          detiene las renovaciones futuras y conservas el acceso hasta que
          termine el período que ya pagaste.
        </p>
      </LegalSection>

      <LegalSection heading="Uso correcto">
        <p>
          Razonor es para uso personal. No puedes revender el acceso, copiar el
          contenido educativo ni intentar dañar o vulnerar el servicio. Los
          resultados son estimaciones educativas y no sustituyen una evaluación
          profesional o escolar formal.
        </p>
      </LegalSection>

      <LegalSection heading="Cambios y contacto">
        <p>
          Podemos actualizar estos términos; si el cambio es importante, te
          avisaremos. Para cualquier duda, escríbenos a{" "}
          <a className="text-honey-deep underline" href="mailto:hola@razonor.com">
            hola@razonor.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
