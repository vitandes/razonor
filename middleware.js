import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Rutas públicas (no requieren login): landing de marketing, páginas legales,
// las pantallas de login y los endpoints de IA. El resto (onboarding, planes y
// la app del niño / reporte de papás) queda detrás del login: así el login es
// la puerta de entrada a la prueba gratis.
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/privacidad",
  "/terminos",
  "/contacto",
  "/soporte",
  "/robots.txt",
  "/sitemap.xml",
  "/api/(.*)",
]);

// Dashboard privado /admin: protegido con HTTP Basic Auth (usuario/clave en
// variables de entorno ADMIN_USER / ADMIN_PASSWORD). Separado del login normal.
function adminGate(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    return new Response("Dashboard no configurado.", { status: 503 });
  }
  const header = request.headers.get("authorization") || "";
  const expected = "Basic " + btoa(`${user}:${pass}`);
  if (header !== expected) {
    return new Response("Autenticación requerida.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Astuto admin"' },
    });
  }
  return null; // autorizado
}

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const denied = adminGate(request);
    if (denied) return denied;
    return; // autorizado: NO aplicar el login de Clerk
  }
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
