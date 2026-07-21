import { notFound } from "next/navigation";
import CaseSession from "@/components/CaseSession";
import { getCase, CASES } from "@/lib/world";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export default function CasoPage({ params }) {
  const caseData = getCase(params.id);
  if (!caseData) notFound();
  return (
    <main className="min-h-screen bg-cream">
      <CaseSession caseData={caseData} />
    </main>
  );
}
