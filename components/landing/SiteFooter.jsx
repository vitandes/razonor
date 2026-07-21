import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";

export default function SiteFooter() {
  return (
    <footer className="bg-night">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center">
            <LogoWordmark size={32} dark />
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/60">
            <Link href="/privacidad" className="transition hover:text-white">
              Privacidad
            </Link>
            <Link href="/terminos" className="transition hover:text-white">
              Términos
            </Link>
            <Link href="/contacto" className="transition hover:text-white">
              Contacto
            </Link>
            <Link href="/soporte" className="transition hover:text-white">
              Soporte
            </Link>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            🔒 Sin publicidad, sin compras dentro del juego, sin chats con
            desconocidos.
          </p>
          <p>© {new Date().getFullYear()} Astuto · Entrena la mente, no la memoria.</p>
        </div>
      </div>
    </footer>
  );
}
