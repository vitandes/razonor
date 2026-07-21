import SiteHeader from "@/components/landing/SiteHeader";
import SiteFooter from "@/components/landing/SiteFooter";

// Envoltorio para páginas de texto: privacidad, términos, contacto, soporte.
export default function LegalLayout({ title, intro, updated, children }) {
  return (
    <main className="bg-cream">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
        {updated && (
          <p className="mt-3 text-sm text-muted">Última actualización: {updated}</p>
        )}
        <div className="legal mt-10 space-y-7">{children}</div>
      </div>
      <SiteFooter />
    </main>
  );
}

// Bloque de sección reutilizable dentro de una página legal.
export function LegalSection({ heading, children }) {
  return (
    <section>
      {heading && (
        <h2 className="font-display text-xl font-semibold text-ink">{heading}</h2>
      )}
      <div className="mt-3 space-y-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}
