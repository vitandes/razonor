import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import SignupTracker from "@/components/SignupTracker";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-cream">
      <SignupTracker flow="parent_before_purchase" />
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-10">
        <Link href="/" className="mb-3 flex items-center">
          <LogoWordmark size={46} />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          Crea tu cuenta para activar el acceso
        </h1>
        <p className="mb-6 mt-1 text-center text-muted">
          Guardaremos los datos que acabas de completar. Después podrás elegir el plan y el estudiante hará el diagnóstico dentro de Aprendo.
        </p>
        <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/planes" />
      </div>
    </main>
  );
}
