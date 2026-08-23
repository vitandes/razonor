"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  captureAttribution,
  consumeSignupIntent,
  trackProductEvent,
} from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    captureAttribution();
    if (pathname === "/") {
      trackProductEvent("landing_viewed", {}, { once: "session" });
    }
  }, [pathname]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !consumeSignupIntent()) return;
    trackProductEvent("signup_completed", {}, {
      metaEvent: "CompleteRegistration",
      once: "local",
    });
  }, [isLoaded, isSignedIn]);

  return null;
}
