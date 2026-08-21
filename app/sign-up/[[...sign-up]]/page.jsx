import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";

export default function SignUpPage({ searchParams }) {
  const parentFlow = searchParams?.flow === "parent";
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-10">
        <Link href="/" className="mb-3 flex items-center">
          <LogoWordmark size={46} />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          {parentFlow ? "Deja listo su acceso" : "Guarda tu resultado y tu plan"}
        </h1>
        <p className="mb-6 mt-1 text-center text-muted">
          {parentFlow
            ? "Crea tu cuenta para elegir el plan ahora. El estudiante hará el diagnóstico cuando estén juntos."
            : "Crea una cuenta para conservar el diagnóstico y continuar al plan personalizado."}
        </p>
        <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/planes" />
      </div>
    </main>
  );
}
