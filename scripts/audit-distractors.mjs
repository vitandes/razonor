import { FRACTION_QUESTIONS } from "../lib/fractionQuestions.js";
import { RATIO_QUESTIONS } from "../lib/ratioQuestions.js";

// Audita los bancos de fracciones y proporciones: ninguna opción incorrecta
// puede valer lo mismo que la respuesta, no puede haber opciones repetidas por
// valor, cada error necesita su propia explicación y los textos visibles usan
// coma decimal, «¿…?» y respuestas que no se repiten en toda una familia.

const BANKS = { FRACTION_QUESTIONS, RATIO_QUESTIONS };
const EXPECTED_OPTIONS = 4;
const MAX_FEEDBACK_WORDS = 30;
const GENERIC_FEEDBACK = /^(Vuelve al modelo:|Revisa la relación:)/;
const BROKEN_TEXT = /undefined|NaN|Infinity|\[object/;
const TOLERANCE = 1e-4;

const errors = [];
const warnings = [];
const familyAnswers = new Map();
let distractorCount = 0;

function parseNumber(token) {
  const text = `${token}`.trim().replace(/^\$/, "");
  let match;
  if ((match = text.match(/^(-?\d+)\s+(\d+)\/(\d+)$/))) return Number(match[1]) + Number(match[2]) / Number(match[3]);
  if ((match = text.match(/^(-?\d+)\/(-?\d+)$/))) return Number(match[1]) / Number(match[2]);
  if ((match = text.match(/^(-?\d+):(\d+)$/))) return Number(match[1]) / Number(match[2]);
  if ((match = text.match(/^(-?\d+(?:[.,]\d+)?)%$/))) return Number(match[1].replace(",", ".")) / 100;
  if ((match = text.match(/^-?\d+(?:[.,]\d+)?$/))) return Number(text.replace(",", "."));
  return null;
}

// Convierte una opción en una forma comparable por valor: número (con o sin
// unidad), comparación normalizada, lista ordenada de valores o texto.
function canonical(raw) {
  const text = `${raw}`.trim();
  const comparison = text.match(/^(.+?)\s+([<>=])\s+(.+)$/);
  if (comparison) {
    let [, left, op, right] = comparison;
    let a = parseNumber(left);
    let b = parseNumber(right);
    if (a != null && b != null) {
      if (op === "<") [a, b, op] = [b, a, ">"];
      if (op === "=" && a > b) [a, b] = [b, a];
      return { kind: "comparison", op, values: [a, b] };
    }
  }
  const separator = text.includes("; ") ? "; " : text.includes(", ") ? ", " : null;
  if (separator) {
    const values = text.split(separator).map(parseNumber);
    if (values.every((value) => value != null)) return { kind: "list", values };
  }
  const number = parseNumber(text);
  if (number != null) return { kind: "number", value: number };
  const withUnit = text.match(/^(\$?-?\d+(?:[.,]\d+)?(?:\/\d+)?)\s+([^\d\s].*)$/);
  if (withUnit) {
    const value = parseNumber(withUnit[1]);
    if (value != null) return { kind: "number", value, unit: withUnit[2] };
  }
  return { kind: "text", key: text.toLowerCase() };
}

const close = (a, b) => Math.abs(a - b) < TOLERANCE;

function equivalent(a, b) {
  if (a.kind !== b.kind) return false;
  if (a.kind === "number") return close(a.value, b.value);
  if (a.kind === "comparison") return a.op === b.op && close(a.values[0], b.values[0]) && close(a.values[1], b.values[1]);
  if (a.kind === "list") return a.values.length === b.values.length && a.values.every((value, index) => close(value, b.values[index]));
  return a.key === b.key;
}

const decimalStyle = (value) => (/\d\.\d/.test(value) ? "punto" : /\d,\d/.test(value) ? "coma" : null);
const wordCount = (text) => text.trim().split(/\s+/).length;
// "1.000" o "120.000" son miles; "2.5" o "0.625" son decimales con punto.
const hasDotDecimal = (text) => /\d\.\d/.test(text.replace(/\b[1-9]\d{0,2}(?:\.\d{3})+\b/g, ""));
// Un "?" que ocupa el lugar de un número ("?/12", "+ ? =") no es una pregunta.
const asksWithoutOpening = (prompt) => prompt.replace(/\?\/\d+|[+=] \? [=+]/g, "").includes("?") && !prompt.includes("¿");

// Todos los textos que el estudiante puede ver: enunciado, opciones, explicaciones, pasos y visual.
function visibleTexts(question) {
  const texts = [question.prompt, question.hint, question.answer, question.success];
  for (const option of question.options || []) texts.push(option.value, option.feedback);
  for (const step of question.steps || []) texts.push(step.eyebrow, step.title, step.text, step.equation);
  const walk = (node) => {
    if (typeof node === "string") texts.push(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  };
  walk(question.visual);
  return texts.filter((text) => typeof text === "string" && text);
}

for (const [bankName, questions] of Object.entries(BANKS)) {
  const ids = new Set();
  for (const question of questions) {
    const where = `${bankName} ${question.id}`;
    const fail = (message) => errors.push(`${where}: ${message}`);
    const answer = `${question.answer}`;
    const options = question.options || [];

    if (ids.has(question.id)) fail("id repetido.");
    ids.add(question.id);
    if (options.length !== EXPECTED_OPTIONS) fail(`tiene ${options.length} opciones (se esperan ${EXPECTED_OPTIONS}).`);
    const answerCount = options.filter((option) => option.value === answer).length;
    if (answerCount !== 1) fail(`la respuesta «${answer}» aparece ${answerCount} veces entre las opciones.`);

    const parsed = options.map((option) => ({ option, value: canonical(option.value) }));
    const answerValue = canonical(answer);
    const answerStyle = decimalStyle(answer);
    const feedbacks = new Set();

    parsed.forEach(({ option, value }, index) => {
      const label = `opción «${option.value}»`;
      if (BROKEN_TEXT.test(option.value)) fail(`${label} contiene un valor roto.`);
      if (/-/.test(option.value)) fail(`${label} es negativa; en este banco todas las cantidades son positivas.`);
      if (/\d[.,]\d{5,}/.test(option.value)) fail(`${label} tiene demasiados decimales.`);

      // La equivalencia con la respuesta se reporta aparte; aquí solo se comparan distractores entre sí.
      for (let other = index + 1; other < parsed.length; other += 1) {
        if (option.value === answer || parsed[other].option.value === answer) continue;
        if (equivalent(value, parsed[other].value)) fail(`${label} y «${parsed[other].option.value}» valen lo mismo.`);
      }

      if (option.value === answer) {
        if (option.feedback) fail("la opción correcta no debería tener feedback de error.");
        return;
      }

      distractorCount += 1;
      if (equivalent(value, answerValue)) fail(`${label} es equivalente a la respuesta «${answer}».`);
      const style = decimalStyle(option.value);
      if (answerStyle && style && style !== answerStyle) fail(`${label} usa decimal con ${style} y la respuesta con ${answerStyle}; delata la respuesta.`);

      const feedback = typeof option.feedback === "string" ? option.feedback.trim() : "";
      if (!feedback) {
        fail(`${label} no tiene feedback.`);
        return;
      }
      if (GENERIC_FEEDBACK.test(feedback)) fail(`${label} conserva el feedback genérico.`);
      if (BROKEN_TEXT.test(feedback)) fail(`${label} tiene un feedback con texto roto: «${feedback}».`);
      if (feedbacks.has(feedback)) fail(`${label} repite el feedback de otra opción.`);
      feedbacks.add(feedback);
      const words = wordCount(feedback);
      if (words > MAX_FEEDBACK_WORDS) fail(`${label} tiene un feedback de ${words} palabras (máx. ${MAX_FEEDBACK_WORDS}).`);
      else if (words > 25) warnings.push(`${where}: ${label} tiene un feedback de ${words} palabras.`);
    });

    if (!question.success || BROKEN_TEXT.test(question.success)) fail("falta un mensaje de acierto válido.");
    for (const step of question.steps || []) {
      if (BROKEN_TEXT.test(`${step.title} ${step.text} ${step.equation}`)) fail(`el paso «${step.eyebrow}» tiene texto roto.`);
    }

    // Formato visible: en español el decimal va con coma y sin ruido de coma flotante.
    for (const text of new Set(visibleTexts(question))) {
      if (hasDotDecimal(text)) fail(`usa punto decimal en «${text}».`);
      if (/\d[.,]\d{5,}/.test(text)) fail(`tiene demasiados decimales en «${text}».`);
    }
    // Cuatro cifras decimales en la respuesta suelen ser un periódico redondeado (6,6667 = 20/3).
    if (/\d,\d{4}/.test(answer)) fail(`la respuesta «${answer}» parece un decimal periódico redondeado; elige datos que den un valor exacto.`);
    if (asksWithoutOpening(question.prompt)) fail(`al enunciado le falta «¿»: «${question.prompt}».`);
    if (/\d,\d/.test(answer) && answer.split(", ").length > 1) fail(`la lista «${answer}» mezcla la coma decimal con la coma separadora; usa «; ».`);

    const family = `${question.skillId}/${question.family}`;
    familyAnswers.set(family, [...(familyAnswers.get(family) || []), answer]);
  }
}

// Una familia cuya respuesta es siempre la misma se puede contestar sin pensar.
for (const [family, answers] of familyAnswers) {
  if (answers.length >= 3 && new Set(answers).size === 1) errors.push(`${family}: la respuesta es siempre «${answers[0]}».`);
}

const total = Object.values(BANKS).reduce((sum, questions) => sum + questions.length, 0);
console.log(`Distractores auditados: ${distractorCount} en ${total} preguntas.`);
if (warnings.length) console.log(`\nAvisos (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`\nErrores (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Todas las opciones incorrectas tienen una explicación propia y ningún distractor equivale a la respuesta.");
