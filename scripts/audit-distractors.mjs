import { FRACTION_QUESTIONS } from "../lib/fractionQuestions.js";
import { RATIO_QUESTIONS } from "../lib/ratioQuestions.js";

// Audita los distractores de los bancos de fracciones y proporciones:
// ninguna opción incorrecta puede valer lo mismo que la respuesta, no puede
// haber opciones repetidas por valor y cada error necesita su propia explicación.

const BANKS = { FRACTION_QUESTIONS, RATIO_QUESTIONS };
const EXPECTED_OPTIONS = 4;
const MAX_FEEDBACK_WORDS = 30;
const GENERIC_FEEDBACK = /^(Vuelve al modelo:|Revisa la relación:)/;
const BROKEN_TEXT = /undefined|NaN|Infinity|\[object/;
const TOLERANCE = 1e-4;

const errors = [];
const warnings = [];
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
  if (text.includes(", ")) {
    const values = text.split(", ").map(parseNumber);
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
  }
}

const total = Object.values(BANKS).reduce((sum, questions) => sum + questions.length, 0);
console.log(`Distractores auditados: ${distractorCount} en ${total} preguntas.`);
if (warnings.length) console.log(`\nAvisos (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (errors.length) {
  console.error(`\nErrores (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Todas las opciones incorrectas tienen una explicación propia y ningún distractor equivale a la respuesta.");
