"use client";

// Mejora la "calidad de coincidencias" de Meta y TikTok: cuando el usuario está
// logueado (Clerk), le pasa su correo + id a los pixels (advanced matching), así
// TODOS los eventos del navegador (PageView, InitiateCheckout, Registro) llevan
// el correo — no solo IP/navegador. Meta y TikTok hashean el correo por su lado.

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const META = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export default function PixelIdentify() {
  const { isLoaded, user } = useUser();

  // Persistir los CLICK IDS de los anuncios como cookies. El fbc es el dato
  // que más sube la calidad de coincidencias del Purchase (+22% según Meta):
  // si el usuario llegó con ?fbclid=... y el pixel aún no creó la cookie _fbc,
  // la creamos nosotros con el formato oficial (fb.1.<ts>.<fbclid>). TikTok no
  // persiste su ttclid por sí solo, así que también lo guardamos.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const has = (name) =>
        document.cookie.split("; ").some((c) => c.startsWith(name + "="));
      const set = (name, value) => {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax`;
      };
      const fbclid = params.get("fbclid");
      if (fbclid && !has("_fbc")) set("_fbc", `fb.1.${Date.now()}.${fbclid}`);
      const ttclid = params.get("ttclid");
      if (ttclid && !has("ttclid")) set("ttclid", ttclid);
    } catch {
      /* sin acceso a cookies: nada que hacer */
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !user || typeof window === "undefined") return;
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) return;

    // Meta: re-init con advanced matching (el pixel hashea el correo solo).
    if (typeof window.fbq === "function") {
      window.fbq("init", META, { em: email, external_id: user.id });
    }
    // TikTok: identify (hashea internamente el correo).
    if (window.ttq && typeof window.ttq.identify === "function") {
      window.ttq.identify({ email, external_id: user.id });
    }
  }, [isLoaded, user]);

  return null;
}
