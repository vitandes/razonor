import LegalLayout, { LegalSection } from "@/components/landing/LegalLayout";

export const metadata = {
  title: "Privacidad — Razonor",
  description:
    "Cómo Razonor cuida los datos de tu familia y la privacidad infantil.",
};

export default function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      intro="En Razonor cuidamos los datos de tu familia, en especial los de los niños. Esta página explica en lenguaje claro qué información usamos y para qué."
      updated="18 de julio de 2026"
    >
      <LegalSection heading="Quién es responsable de tus datos">
        <p>
          Razonor es el responsable del tratamiento de los datos personales que
          nos compartes, conforme a la Ley 1581 de 2012 de protección de datos
          personales en Colombia. Si tienes dudas, escríbenos a{" "}
          <a className="text-honey-deep underline" href="mailto:hola@razonor.com">
            hola@razonor.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Qué información recogemos">
        <p>
          Del papá o la mamá: nombre, correo y los datos necesarios para tu
          cuenta y tu suscripción. Del niño: un nombre o apodo, la edad y su
          actividad en la app (retos resueltos, respuestas y progreso por
          habilidad). Pedimos lo mínimo para que Razonor funcione y para armar tu
          panel de padres.
        </p>
      </LegalSection>

      <LegalSection heading="Para qué la usamos">
        <p>
          Para ajustar los retos a la edad y al nivel del niño, medir su
          progreso, generar el panel de padres y mejorar el producto. No
          vendemos tus datos ni los de tu hijo, y no los usamos para publicidad
          de terceros.
        </p>
      </LegalSection>

      <LegalSection heading="Pagos y suscripciones">
        <p>
          En Colombia los pagos se procesan a través de{" "}
          <strong>Mercado Pago</strong>; fuera de Colombia, con nuestro
          procesador internacional en dólares. No almacenamos los datos
          completos de tu tarjeta en nuestros servidores: los gestiona el
          procesador de pago bajo sus propios estándares de seguridad y su
          política de privacidad.
        </p>
      </LegalSection>

      <LegalSection heading="Privacidad infantil">
        <p>
          La cuenta la crea y la controla un adulto. Dentro de Razonor no hay
          publicidad, ni compras dentro de la app, ni chats con desconocidos ni
          contenido generado por otros usuarios: el niño solo resuelve los retos
          de la historia. La cuenta del niño está siempre bajo la supervisión
          del papá o la mamá.
        </p>
      </LegalSection>

      <LegalSection heading="Tus derechos">
        <p>
          Puedes acceder, corregir o eliminar los datos de tu familia cuando
          quieras, como lo establece la Ley 1581. Si cierras tu cuenta, borramos
          los datos personales salvo lo que la ley nos obligue a conservar. Para
          ejercer cualquiera de estos derechos, escríbenos a{" "}
          <a className="text-honey-deep underline" href="mailto:hola@razonor.com">
            hola@razonor.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Cambios a esta política">
        <p>
          Si actualizamos esta política, cambiaremos la fecha de arriba y, si el
          cambio es importante, te avisaremos por correo.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
