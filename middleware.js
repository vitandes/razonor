import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rutas públicas (no requieren login): landing de marketing, páginas legales,
// las pantallas de login y los endpoints. El onboarding parental es público
// para reducir fricción antes de pedir el correo. Planes, la app del
// niño y el reporte de padres siguen protegidos por Clerk.
const isPublicRoute = createRouteMatcher([
  "/",
  "/onboarding",
  "/diagnostico",
  "/resultados",
  "/prototipo-geometria",
  "/prototipo-numeros",
  "/prototipo-fracciones",
  "/prototipo-proporciones",
  "/prototipo-algebra",
  "/prototipo-datos",
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

const isSignInRoute = createRouteMatcher(["/sign-in(.*)"]);

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
  if (isSignInRoute(request)) {
    const { userId } = await auth();
    if (userId) {
      return NextResponse.redirect(new URL(safeSignInRedirect(request), request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const denied = adminGate(request);
    if (denied) return denied;
    return; // autorizado: NO aplicar el login de Clerk
  }
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

function safeSignInRedirect(request) {
  const fallback = "/aprendo";
  const value = request.nextUrl.searchParams.get("redirect_url") || request.nextUrl.searchParams.get("redirectUrl");
  if (!value) return fallback;
  try {
    const target = new URL(value, request.url);
    if (target.origin !== request.nextUrl.origin || target.pathname.startsWith("/sign-in")) return fallback;
    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return fallback;
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
