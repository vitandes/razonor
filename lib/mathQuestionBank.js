async function loadBank(skillId) {
  if (skillId === "NO01") return (await import("./placeValueQuestions.js")).PLACE_VALUE_QUESTIONS;
  if (skillId === "NO02") return (await import("./naturalOperationsQuestions.js")).NATURAL_OPERATION_QUESTIONS;
  if (skillId === "NO03") return (await import("./decimalOperationsQuestions.js")).DECIMAL_OPERATION_QUESTIONS;
  if (["NO04", "NO05", "NO06"].includes(skillId)) {
    const bank = await import("./integerReasoningQuestions.js");
    if (skillId === "NO04") return bank.INTEGER_LINE_QUESTIONS;
    if (skillId === "NO05") return bank.INTEGER_OPERATION_QUESTIONS;
    return bank.ORDER_OPERATION_QUESTIONS;
  }
  if (skillId.startsWith("FR")) return (await import("./fractionQuestions.js")).FRACTION_QUESTIONS.filter((question) => question.skillId === skillId);
  if (skillId.startsWith("RP")) return (await import("./ratioQuestions.js")).RATIO_QUESTIONS.filter((question) => question.skillId === skillId);
  if (skillId.startsWith("AL")) return (await import("./algebraQuestions.js")).ALGEBRA_QUESTIONS.filter((question) => question.skillId === skillId);
  if (skillId.startsWith("GM")) return (await import("./geometryMvpQuestions.js")).GEOMETRY_MVP_QUESTIONS.filter((question) => question.skillId === skillId);
  if (skillId.startsWith("DP")) return (await import("./dataProbabilityQuestions.js")).DATA_QUESTIONS.filter((question) => question.skillId === skillId);
  return [];
}

function normalize(question) {
  const answer = `${question.answer}`;
  return {
    ...question,
    prompt: question.prompt || question.question,
    answer,
    options: (question.options || []).map((option) => {
      const value = typeof option === "object" ? option.value : option;
      return {
        value: `${value}`,
        feedback: typeof option === "object" ? option.feedback : null,
      };
    }),
  };
}

function levelPattern(mastery) {
  if (mastery < 35) return [1, 1, 1, 2, 2, 1];
  if (mastery < 70) return [1, 2, 2, 2, 3, 2];
  return [2, 2, 3, 3, 3, 2];
}

function rotate(values, offset) {
  if (!values.length) return values;
  const position = offset % values.length;
  return [...values.slice(position), ...values.slice(0, position)];
}

export async function buildAdaptivePracticeSet(skillId, { mastery = 0, sessionNumber = 0, size = 6 } = {}) {
  const bank = (await loadBank(skillId)).map(normalize);
  if (!bank.length) return [];

  const levels = levelPattern(Number(mastery) || 0);
  const families = rotate([...new Set(bank.map((question) => question.family))], sessionNumber);
  const selected = [];

  for (let index = 0; index < Math.min(size, families.length); index += 1) {
    const targetLevel = levels[index % levels.length];
    const candidates = bank
      .filter((question) => question.family === families[index])
      .sort((a, b) => Math.abs(a.level - targetLevel) - Math.abs(b.level - targetLevel) || a.number - b.number);
    if (candidates.length) selected.push(candidates[sessionNumber % candidates.length]);
  }

  for (const question of rotate(bank, sessionNumber * size)) {
    if (selected.length >= size) break;
    if (!selected.some((item) => item.id === question.id)) selected.push(question);
  }

  return selected;
}
