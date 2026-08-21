"use client";

import PlaceValueBoard from "@/components/math/PlaceValueBoard";
import NumberOperationsBoard from "@/components/math/NumberOperationsBoard";
import DecimalOperationsBoard from "@/components/math/DecimalOperationsBoard";
import IntegerReasoningBoard from "@/components/math/IntegerReasoningBoard";
import FractionReasoningBoard from "@/components/math/FractionReasoningBoard";
import RatioReasoningBoard from "@/components/math/RatioReasoningBoard";
import AlgebraReasoningBoard from "@/components/math/AlgebraReasoningBoard";
import GeometryBoard from "@/components/math/GeometryBoard";
import DataReasoningBoard from "@/components/math/DataReasoningBoard";

export default function AdaptiveQuestionBoard({ question, reveal = false }) {
  if (!question?.visual) return null;
  const step = reveal ? 3 : 0;
  const skillId = question.skillId || "";

  if (skillId === "NO01") return <PlaceValueBoard question={question} step={step} />;
  if (skillId === "NO02") return <NumberOperationsBoard question={question} step={step} />;
  if (skillId === "NO03") return <DecimalOperationsBoard question={question} step={step} />;
  if (["NO04", "NO05", "NO06"].includes(skillId)) return <IntegerReasoningBoard question={question} step={step} />;
  if (skillId.startsWith("FR")) return <FractionReasoningBoard question={question} step={step} />;
  if (skillId.startsWith("RP")) return <RatioReasoningBoard question={question} step={step} />;
  if (skillId.startsWith("AL")) return <AlgebraReasoningBoard question={question} step={step} />;
  if (skillId.startsWith("GM")) return <GeometryBoard question={question} step={step} />;
  if (skillId.startsWith("DP")) return <DataReasoningBoard question={question} step={step} />;
  return null;
}
