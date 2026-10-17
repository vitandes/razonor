import DemoExperience from "@/components/demo/DemoExperience";

const base = (process.env.NEXT_PUBLIC_APP_URL || "https://www.razonor.com").replace(/\/+$/, "");

// /demo es el enlace de la landing y de los anuncios ya publicados: muestra el
// tema de porcentajes (la historia del "20% de 80") y declara /porcentajes como
// página canónica para no duplicar contenido en buscadores.
export const metadata = {
  title: "Demo gratis: 4 retos de matemáticas — Razonor",
  description:
    "Mira cómo Razonor encuentra la base matemática que está frenando a tu hijo: 4 retos, 2 minutos, sin registro.",
  alternates: { canonical: `${base}/porcentajes` },
};

export default function DemoPage() {
  return <DemoExperience trackId="porcentajes" />;
}
