import DemoExperience from "@/components/demo/DemoExperience";

export const metadata = {
  title: "Primeras ecuaciones: 4 retos gratis que explican cada error — Razonor",
  description:
    "¿x + 5 = 12 es 17? Practica despejar la x, ecuaciones de dos pasos y problemas reales con 4 retos que explican cada error. Gratis y sin registro.",
};

export default function EcuacionesPage() {
  return <DemoExperience trackId="ecuaciones" />;
}
