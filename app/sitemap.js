// Genera /sitemap.xml con las páginas públicas indexables (landing + legales).
// Las páginas de la app y login no van aquí porque requieren sesión.

const base = (process.env.NEXT_PUBLIC_APP_URL || "https://www.razonor.com").replace(
  /\/+$/,
  "",
);

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/privacidad", priority: 0.5, changeFrequency: "yearly" },
    { path: "/terminos", priority: 0.5, changeFrequency: "yearly" },
    { path: "/contacto", priority: 0.6, changeFrequency: "monthly" },
    { path: "/soporte", priority: 0.6, changeFrequency: "monthly" },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
