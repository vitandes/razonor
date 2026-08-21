"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isSubscribed, useProgress } from "@/lib/progress";

export default function SubscriptionGuard({ children }) {
  const progress = useProgress();
  const router = useRouter();
  const allowed = progress.serverLoaded && isSubscribed(progress.subscription);

  useEffect(() => {
    if (progress.serverLoaded && !allowed) router.replace("/planes");
  }, [progress.serverLoaded, allowed, router]);

  if (!allowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream" aria-label="Verificando acceso">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink/10 border-t-honey" />
      </main>
    );
  }

  return children;
}
