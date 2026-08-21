import { CATEGORY_BY_ID, SKILL_BY_ID } from "@/lib/mathCatalog";
import { NATURAL_OPERATION_QUESTIONS } from "@/lib/naturalOperationsQuestions";
import { INTEGER_OPERATION_QUESTIONS } from "@/lib/integerReasoningQuestions";
import { FRACTION_QUESTIONS } from "@/lib/fractionQuestions";
import { RATIO_QUESTIONS } from "@/lib/ratioQuestions";
import { ALGEBRA_QUESTIONS } from "@/lib/algebraQuestions";
import { DATA_QUESTIONS } from "@/lib/dataProbabilityQuestions";
import { DIAGNOSTIC_VERSION } from "@/lib/diagnosticMeta";

export { DIAGNOSTIC_VERSION };

const PILOT_IDS = ["NO02", "NO05", "FR02", "RP03", "AL04", "DP01"];

export const DIAGNOSTIC_SKILLS = Object.fromEntries(
  PILOT_IDS.map((id) => {
    const skill = SKILL_BY_ID[id];
    const category = CATEGORY_BY_ID[skill.category];
    return [id, {
      id,
      label: skill.title,
      short: category.short,
      category: skill.category,
      symbol: category.symbol,
      tone: category.tone,
    }];
  }),
);

const SOURCE_QUESTIONS = [
  ...NATURAL_OPERATION_QUESTIONS,
  ...INTEGER_OPERATION_QUESTIONS,
  ...FRACTION_QUESTIONS.filter((question) => question.skillId === "FR02"),
  ...RATIO_QUESTIONS.filter((question) => question.skillId === "RP03"),
  ...ALGEBRA_QUESTIONS.filter((question) => question.skillId === "AL04"),
  ...DATA_QUESTIONS.filter((question) => question.skillId === "DP01"),
];

const QUESTIONS = SOURCE_QUESTIONS.map(normalizeQuestion);
const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((question) => [question.id, question]));

function normalizeQuestion(question) {
  const correctAnswer = `${question.answer}`;
  const options = (question.options || []).map((option) => `${typeof option === "object" ? option.value : option}`);
  const errorMap = Object.fromEntries(options.filter((option) => option !== correctAnswer).map((option) => [option, errorCategory(question.family)]));
  return {
    ...question,
    skill: question.skillId,
    category: SKILL_BY_ID[question.skillId].category,
    difficulty: question.level,
    question: question.prompt,
    options,
    correctAnswer,
    explanation: question.success || question.steps?.[2]?.text || question.hint,
    errorMap,
  };
}

function errorCategory(family = "") {
  if (/problem|context|translate|application/.test(family)) return "E_TRANSLATE";
  if (/error|audit|check|estimate/.test(family)) return "E_STRATEGY";
  if (/operation|calculate|equation|solve/.test(family)) return "E_PROCEDURE";
  return "E_CONCEPT";
}

function questionsFor(skillId) {
  return QUESTIONS.filter((question) => question.skill === skillId);
}

function pickQuestion(skillId, targetLevel, answers, offset = 0) {
  const attempted = new Set(answers.map((answer) => answer.exerciseId));
  const usedFamilies = new Set(answers.filter((answer) => answer.skill === skillId).map((answer) => QUESTION_BY_ID[answer.exerciseId]?.family));
  const candidates = questionsFor(skillId)
    .filter((question) => !attempted.has(question.id))
    .sort((a, b) => {
      const aFresh = usedFamilies.has(a.family) ? 1 : 0;
      const bFresh = usedFamilies.has(b.family) ? 1 : 0;
      return aFresh - bFresh || Math.abs(a.level - targetLevel) - Math.abs(b.level - targetLevel) || a.number - b.number;
    });
  if (!candidates.length) return null;
  const bestDistance = Math.abs(candidates[0].level - targetLevel);
  const bestFreshness = usedFamilies.has(candidates[0].family) ? 1 : 0;
  const tied = candidates.filter((question) => Math.abs(question.level - targetLevel) === bestDistance && (usedFamilies.has(question.family) ? 1 : 0) === bestFreshness);
  return tied[offset % tied.length];
}

function targetLevel(evidence) {
  if (!evidence.length) return 2;
  const correct = evidence.filter((answer) => answer.correct).length;
  if (correct === evidence.length) return 3;
  if (correct === 0) return 1;
  return 2;
}

function isUnresolved(evidence) {
  if (evidence.length < 2) return true;
  const correct = evidence.filter((answer) => answer.correct).length;
  return correct > 0 && correct < evidence.length;
}

export function getDiagnosticExercises() {
  return QUESTIONS;
}

export function nextDiagnosticQuestion(answers = []) {
  // Primera vuelta: una pregunta intermedia por cada fundamento observado.
  if (answers.length < PILOT_IDS.length) {
    const skillId = PILOT_IDS[answers.length];
    return pickQuestion(skillId, 2, answers, answers.length);
  }

  // Segunda vuelta: baja a base tras un error o sube a razonamiento tras un acierto.
  if (answers.length < PILOT_IDS.length * 2) {
    for (let index = 0; index < PILOT_IDS.length; index += 1) {
      const skillId = PILOT_IDS[index];
      const evidence = answers.filter((answer) => answer.skill === skillId);
      if (evidence.length === 1) return pickQuestion(skillId, evidence[0].correct ? 3 : 1, answers, index + 1);
    }
  }

  // Hasta 15 preguntas priorizamos habilidades con poca o contradictoria evidencia.
  if (answers.length < 15) {
    const ranked = PILOT_IDS.map((skillId, index) => {
      const evidence = answers.filter((answer) => answer.skill === skillId);
      const mixed = isUnresolved(evidence) ? 1 : 0;
      return { skillId, evidence, index, priority: Math.max(0, 3 - evidence.length) * 10 + mixed * 4 };
    }).sort((a, b) => b.priority - a.priority || a.index - b.index);
    for (const item of ranked) {
      const candidate = pickQuestion(item.skillId, targetLevel(item.evidence), answers, answers.length + item.index);
      if (candidate) return candidate;
    }
  }

  // Solo extendemos a 16–18 cuando dos respuestas de una habilidad se contradicen.
  if (answers.length < 18) {
    const unresolved = PILOT_IDS.map((skillId, index) => ({ skillId, index, evidence: answers.filter((answer) => answer.skill === skillId) }))
      .filter((item) => isUnresolved(item.evidence))
      .sort((a, b) => a.evidence.length - b.evidence.length || a.index - b.index);
    for (const item of unresolved) {
      const candidate = pickQuestion(item.skillId, targetLevel(item.evidence), answers, answers.length + item.index);
      if (candidate) return candidate;
    }
  }

  return null;
}

export function scoreDiagnostic(_exercises, answersInput) {
  const answers = Array.isArray(answersInput)
    ? answersInput
    : Object.entries(answersInput || {}).map(([exerciseId, answer]) => {
        const question = QUESTION_BY_ID[exerciseId];
        return question ? { exerciseId, skill: question.skill, level: question.level, answer, correct: answer === question.correctAnswer } : null;
      }).filter(Boolean);

  const scores = {};
  const confidence = {};

  for (const skillId of PILOT_IDS) {
    const evidence = answers.filter((answer) => answer.skill === skillId);
    const estimates = evidence.map(answerEstimate);
    scores[skillId] = estimates.length ? Math.round(estimates.reduce((sum, value) => sum + value, 0) / estimates.length) : 0;
    confidence[skillId] = estimates.length ? Math.round(100 * (1 - Math.exp(-evidence.length / 3))) : 0;
  }

  return { scores, confidence, plan: buildInitialPlan(scores) };
}

function answerEstimate(answer) {
  if (answer.correct) return { 1: 62, 2: 78, 3: 92 }[answer.level] || 70;
  return { 1: 8, 2: 28, 3: 45 }[answer.level] || 25;
}

export function buildInitialPlan(scores = {}) {
  return [...PILOT_IDS]
    .sort((a, b) => (scores[a] ?? 0) - (scores[b] ?? 0) || PILOT_IDS.indexOf(a) - PILOT_IDS.indexOf(b))
    .slice(0, 4);
}

export function diagnosticInsight(scores, name = "El estudiante") {
  const ids = Object.keys(scores || {}).filter((id) => DIAGNOSTIC_SKILLS[id]);
  if (!ids.length) return `${name} está listo para encontrar su punto de partida matemático.`;
  const strongest = [...ids].sort((a, b) => scores[b] - scores[a])[0];
  const opportunity = [...ids].sort((a, b) => scores[a] - scores[b])[0];
  return `${name} mostró su base más sólida en ${DIAGNOSTIC_SKILLS[strongest].label.toLowerCase()}. La primera oportunidad está en ${DIAGNOSTIC_SKILLS[opportunity].label.toLowerCase()}, porque puede bloquear habilidades posteriores.`;
}

export function lowestSkill(scores = {}) {
  return Object.keys(scores).filter((id) => DIAGNOSTIC_SKILLS[id]).sort((a, b) => scores[a] - scores[b])[0] || "NO02";
}

export function diagnosticQuestionById(id) {
  return QUESTION_BY_ID[id] || null;
}
