"use client";

import { useEffect, useMemo, useState } from "react";
import { SignIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoWordmark } from "@/components/Logo";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useAuth();
  const [takingLong, setTakingLong] = useState(false);
  const redirectTo = useMemo(
    () => safeRedirect(searchParams.get("redirect_url") || searchParams.get("redirectUrl")),
    [searchParams],
  );

  useEffect(() => {
    if (isLoaded) return undefined;
    const timer = window.setTimeout(() => setTakingLong(true), 6000);
    return () => window.clearTimeout(timer);
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace(redirectTo);
  }, [isLoaded, isSignedIn, redirectTo, router]);

  return (
    <main className="min-h-screen bg-cream">
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 py-10">
        <Link href="/" className="mb-3 flex items-center">
          <LogoWordmark size={46} />
        </Link>
        <h1 className="text-center font-display text-2xl font-semibold text-ink">
          ¡Hola de nuevo!
        </h1>
        <p className="mb-6 mt-1 text-center text-muted">
          {isLoaded && isSignedIn
            ? "Sesión iniciada. Abriendo tu ruta matemática…"
            : "Inicia sesión para continuar tu ruta matemática."}
        </p>
        {isLoaded && isSignedIn ? (
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white px-10 py-7 shadow-card" role="status">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
            <p className="text-sm font-semibold text-muted">Entrando al dashboard…</p>
          </div>
        ) : (
          <>
            <SignIn signUpUrl="/sign-up" forceRedirectUrl={redirectTo} fallbackRedirectUrl={redirectTo} />
            {!isLoaded && (
              <div className="mt-5 text-center" role="status">
                <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
                <p className="mt-3 text-sm font-semibold text-muted">Cargando acceso…</p>
                {takingLong && (
                  <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-muted">
                    Está tardando más de lo esperado. Recarga la página; si usas un bloqueador de contenido, permite Clerk para iniciar sesión.
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function safeRedirect(value) {
  if (!value) return "/aprendo";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (typeof window === "undefined") return "/aprendo";
  try {
    const target = new URL(value);
    if (target.origin !== window.location.origin) return "/aprendo";
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return "/aprendo";
  }
}
