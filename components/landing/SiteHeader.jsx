import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import AccessButtons from "@/components/landing/AccessButtons";
import { CTA_START } from "@/lib/trial";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link href="/" className="flex items-center">
          <LogoWordmark size={34} dark />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-semibold text-white/60 md:flex">
          <a href="#resultado" className="transition hover:text-white">
            Resultado
          </a>
          <a href="#como-funciona" className="transition hover:text-white">
            Cómo funciona
          </a>
          <a href="#precios" className="transition hover:text-white">
            Precios
          </a>
        </nav>

        <AccessButtons context="header" dark trialLabel={CTA_START} />
      </div>
    </header>
  );
}
