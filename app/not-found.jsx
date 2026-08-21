import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-6 text-center">
      <div>
        <Logo size={110} className="mx-auto" />
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
          Esta página no existe
        </h1>
        <p className="mt-2 text-muted">Volvamos a tu ruta de aprendizaje.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-honey px-6 py-3 font-semibold text-ink transition hover:bg-honey-deep hover:text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
