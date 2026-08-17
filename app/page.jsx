import { headers } from "next/headers";
import SiteHeader from "@/components/landing/SiteHeader";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Differentiator from "@/components/landing/Differentiator";
import Skills from "@/components/landing/Skills";
import ReportPreview from "@/components/landing/ReportPreview";
import Reviews from "@/components/landing/Reviews";
import Pricing from "@/components/landing/Pricing";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import SiteFooter from "@/components/landing/SiteFooter";

// El home habla distinto según el mercado:
//   - "co" (Colombia/LatAm): matemáticas y habilidades para resolver problemas.
//   - "us" (latinos en EE.UU.): lo mismo + retos pensados en español (el idioma
//     de la familia). Se detecta por geo en el server (sin parpadeo);
//     ?mkt=us|co fuerza la variante para pruebas.
export default function Home({ searchParams }) {
  const forced = searchParams?.mkt;
  const country = headers().get("x-vercel-ip-country") || "";
  const market = forced === "us" || (forced !== "co" && country === "US") ? "us" : "co";

  return (
    <main className="bg-cream">
      <SiteHeader />
      <Hero market={market} />
      <TrustBar />
      <Problem market={market} />
      <HowItWorks />
      <Differentiator />
      <Skills />
      <ReportPreview />
      <Reviews />
      <Pricing />
      <Faq market={market} />
      <FinalCta market={market} />
      <SiteFooter />
    </main>
  );
}
