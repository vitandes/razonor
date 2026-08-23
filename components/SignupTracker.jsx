"use client";

import { useEffect } from "react";
import { markSignupIntent, trackProductEvent } from "@/lib/analytics";

export default function SignupTracker({ flow = "diagnostic" }) {
  useEffect(() => {
    markSignupIntent();
    trackProductEvent("signup_started", { flow }, {
      once: "session",
      onceKey: `signup_started_${flow}`,
    });
  }, [flow]);
  return null;
}
