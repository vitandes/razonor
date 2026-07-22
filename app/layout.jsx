import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import Script from "next/script";
import "./globals.css";
import { Baloo_2, Nunito } from "next/font/google";
import { ProgressProvider } from "@/lib/progress";
import PixelIdentify from "@/components/PixelIdentify";

// Google Analytics (gtag.js). Configurable con NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-MP62DB3R71";

// Meta Pixel (Facebook/Instagram Ads). Configurable con NEXT_PUBLIC_META_PIXEL_ID.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1038053602238449";

// TikTok Pixel (TikTok Ads). Acepta VARIOS ids separados por coma (cada
// campaña puede tener su pixel): todos los eventos van a todos los pixels.
// Configurable con NEXT_PUBLIC_TIKTOK_PIXEL_ID.
const TIKTOK_PIXEL_IDS = (
  process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ||
  "D94KEOBC77UARCKAVC70,D94JU4JC77UDRLSQBQAG"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Razonor — retos de misterio que entrenan la mente de tu hijo",
  description:
    "Retos cortos de lógica y deducción dentro de una historia de misterio, para niños de 7 a 12 años. 15 minutos al día: mejor en matemáticas, mejor leyendo y listo para el mundo de la IA.",
};

// Marca de Razonor aplicada a los componentes de Clerk (login/registro).
const clerkAppearance = {
  variables: {
    colorPrimary: "#FFBE3D", // honey
    colorText: "#141B36", // ink
    colorTextSecondary: "#5A6180", // muted
    colorBackground: "#FFFFFF",
    colorInputBackground: "#F7F5F0", // cream
    colorInputText: "#141B36",
    borderRadius: "0.9rem",
    fontFamily: "var(--font-body)",
  },
  elements: {
    headerTitle: { fontFamily: "var(--font-display)" },
    formButtonPrimary: { fontFamily: "var(--font-display)", fontWeight: "600" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans text-ink antialiased">
        {/* Device ID de Mercado Pago: mejora la aprobación (antifraude). Genera
            window.MP_DEVICE_SESSION_ID, que enviamos al crear el pago. */}
        <Script
          src="https://www.mercadopago.com/v2/security.js"
          strategy="afterInteractive"
          view="home"
        />
        <ClerkProvider localization={esES} appearance={clerkAppearance}>
          <PixelIdentify />
          <ProgressProvider>{children}</ProgressProvider>
        </ClerkProvider>

        {/* Google Analytics (gtag.js) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel (Facebook/Instagram) */}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          </>
        )}

        {/* TikTok Pixel (uno o varios: los eventos van a todos los cargados) */}
        {TIKTOK_PIXEL_IDS.length > 0 && (
          <Script id="tiktok-pixel" strategy="afterInteractive">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ${TIKTOK_PIXEL_IDS.map((id) => `ttq.load('${id}');`).join("\n                ")}
                ttq.page();
              }(window, document, 'ttq');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
