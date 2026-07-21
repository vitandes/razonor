import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { LogoWordmark } from "@/components/Logo";
import { HAS_TRIAL, TRIAL_LABEL } from "@/lib/trial";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-10">
        <Link href="/" className="mb-3 flex items-center">
          <LogoWordmark size={46} />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          Crea tu cuenta de papá o mamá
        </h1>
        <p className="mb-6 mt-1 text-center text-muted">
          {HAS_TRIAL
            ? `Es el primer paso de la prueba gratis de ${TRIAL_LABEL}.`
            : "Es el primer paso para abrir el primer caso de tu hijo."}
        </p>
        <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/onboarding" />
      </div>
    </main>
  );
}
