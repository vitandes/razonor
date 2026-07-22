// Genera /robots.txt. Permite indexar las páginas públicas (landing + legales)
// y bloquea las de la app/login (que de todos modos requieren sesión y no
// aportan SEO). Apunta al sitemap.

const base = (process.env.NEXT_PUBLIC_APP_URL || "https://www.razonor.com").replace(
  /\/+$/,
  "",
);

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/aprendo",
        "/padres",
        "/onboarding",
        "/planes",
        "/sign-in",
        "/sign-up",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
