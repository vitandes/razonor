const family = (id, label, short) => ({ id, label, short });

export const ALGEBRA_SKILL_DEFINITIONS = [
  { id: "AL01", title: "Variables y expresiones", short: "Variables", symbol: "x", description: "Representa cantidades desconocidas y traduce relaciones a lenguaje algebraico.", families: [family("variable-meaning", "Significado de una variable", "Variables"), family("additive-language", "Expresiones aditivas", "Sumar y restar"), family("multiplicative-language", "Expresiones multiplicativas", "Multiplicar y dividir"), family("parts-expression", "Términos y coeficientes", "Partes"), family("context-expression", "Expresiones en contexto", "Contextos"), family("classify", "Expresión, ecuación o desigualdad", "Clasificar")] },
  { id: "AL02", title: "Evaluación de expresiones", short: "Evaluar", symbol: "f(x)", description: "Sustituye valores respetando agrupaciones, potencias y orden de operaciones.", families: [family("one-variable", "Sustitución de una variable", "Una variable"), family("two-variables", "Sustitución de dos variables", "Dos variables"), family("powers", "Potencias en expresiones", "Potencias"), family("formula", "Evaluación de fórmulas", "Fórmulas"), family("evaluation-error", "Análisis de errores", "Comprobar"), family("compare-values", "Comparación de resultados", "Comparar")] },
  { id: "AL03", title: "Expresiones equivalentes", short: "Equivalencia", symbol: "≡", description: "Combina términos semejantes, distribuye y factoriza sin cambiar el valor.", families: [family("like-terms", "Términos semejantes", "Combinar"), family("distribute", "Propiedad distributiva", "Distribuir"), family("factor", "Factor común", "Factorizar"), family("equivalent-check", "Comprobar equivalencia", "Comprobar"), family("mixed-simplify", "Simplificación de varios pasos", "Simplificar"), family("equivalence-error", "Errores de equivalencia", "Detectar errores")] },
  { id: "AL04", title: "Ecuaciones de un paso", short: "Un paso", symbol: "=", description: "Mantén el equilibrio y usa operaciones inversas para aislar la variable.", families: [family("addition-equation", "Ecuaciones con suma", "Suma"), family("subtraction-equation", "Ecuaciones con resta", "Resta"), family("multiplication-equation", "Ecuaciones con multiplicación", "Multiplicación"), family("division-equation", "Ecuaciones con división", "División"), family("one-step-context", "Problemas de un paso", "Contextos"), family("solution-check", "Comprobación de soluciones", "Comprobar")] },
  { id: "AL05", title: "Ecuaciones lineales de varios pasos", short: "Varios pasos", symbol: "2x+", description: "Simplifica, conserva la igualdad y comprueba ecuaciones de dos o más pasos.", families: [family("two-step", "Ecuaciones de dos pasos", "Dos pasos"), family("both-sides", "Variable en ambos lados", "Ambos lados"), family("parentheses", "Ecuaciones con paréntesis", "Paréntesis"), family("fraction-form", "Ecuaciones con cocientes", "Cocientes"), family("multi-context", "Problemas de varios pasos", "Contextos"), family("multi-error", "Auditoría de procedimientos", "Detectar errores")] },
  { id: "AL06", title: "Desigualdades de una variable", short: "Desigualdades", symbol: "≤", description: "Representa conjuntos de soluciones y justifica cuándo cambia el sentido del signo.", families: [family("write-inequality", "Traducir una condición", "Traducir"), family("add-sub-inequality", "Suma y resta", "Sumar y restar"), family("positive-multiply", "Multiplicar o dividir por positivo", "Factor positivo"), family("negative-multiply", "Multiplicar o dividir por negativo", "Factor negativo"), family("number-line", "Soluciones en la recta", "Recta"), family("inequality-context", "Restricciones en contexto", "Contextos")] },
  { id: "AL07", title: "Relaciones lineales", short: "Relaciones lineales", symbol: "y=", description: "Conecta tasa de cambio, valor inicial, tabla, ecuación, gráfica y contexto.", families: [family("slope", "Tasa de cambio", "Pendiente"), family("linear-table", "Tablas lineales", "Tablas"), family("linear-equation", "Ecuaciones y = mx + b", "Ecuaciones"), family("intercept", "Valor inicial", "Intercepto"), family("compare-lines", "Comparar relaciones", "Comparar"), family("linear-predict", "Predecir con un modelo lineal", "Predecir")] },
];

const fmt = (value) => `${value}`.replace(/^-/, "−");
const signed = (value) => value < 0 ? `− ${Math.abs(value)}` : `+ ${value}`;
const constant = (value) => value === 0 ? "" : ` ${signed(value)}`;
const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const fraction = (numerator, denominator) => { const divisor = gcd(numerator, denominator); return denominator / divisor === 1 ? fmt(numerator / divisor) : `${fmt(numerator / divisor)}/${fmt(denominator / divisor)}`; };
const reverseSign = (sign) => ({ ">": "<", "<": ">", "≥": "≤", "≤": "≥" }[sign]);
const changeBoundary = (sign) => ({ ">": "≥", "<": "≤", "≥": ">", "≤": "<" }[sign]);

function q(skillId, number, familyId, level, title, prompt, hint, answer, distractors, visual, models) {
  const skill = ALGEBRA_SKILL_DEFINITIONS.find((item) => item.id === skillId);
  const choices = [...new Set([`${answer}`, ...distractors.map(String)])];
  let filler = 2;
  while (choices.length < 4) {
    const candidate = `${filler++}`;
    if (!choices.includes(candidate)) choices.push(candidate);
  }
  const selected = choices.slice(0, 4);
  const shift = number % 4;
  const ordered = [...selected.slice(shift), ...selected.slice(0, shift)];
  return {
    id: `${skillId}-N${level}-${String(number).padStart(2, "0")}`,
    number,
    skillId,
    skillLabel: skill.title,
    family: familyId,
    familyLabel: skill.families.find((item) => item.id === familyId)?.label,
    level,
    title,
    prompt,
    hint,
    answer: `${answer}`,
    visual,
    options: ordered.map((value) => ({ value, feedback: value === `${answer}` ? null : `Vuelve a la relación: ${models[0]}. Después, ${models[1]}.` })),
    success: `${models[2]}. La igualdad o relación se conserva.`,
    steps: models.map((equation, index) => ({
      eyebrow: `Paso ${index + 1} · ${index === 0 ? "representa" : index === 1 ? "transforma" : "comprueba"}`,
      title: index === 0 ? "Traduce la relación" : index === 1 ? "Haz una transformación válida" : "Verifica el resultado",
      equation,
      text: index === 0 ? hint : index === 1 ? "Cambia la expresión sin perder la relación original." : `El resultado esperado es ${answer}.`,
    })),
  };
}

function buildAL01() {
  const result = [];
  [
    ["En una caja hay x cuadernos.", "la cantidad de cuadernos", "el tamaño de la caja"],
    ["Ana tiene a años.", "la edad de Ana", "el nombre de Ana"],
    ["Un ciclista recorrió k kilómetros.", "los kilómetros recorridos", "la velocidad exacta"],
    ["Cada entrada cuesta p pesos.", "el precio de una entrada", "la cantidad de entradas"],
  ].forEach(([statement, answer, wrong], index) => result.push(q("AL01", index + 1, "variable-meaning", index < 2 ? 1 : 2, "Nombrar una cantidad que puede cambiar", `${statement} ¿Qué representa la variable?`, "Una variable debe nombrar una cantidad, no un objeto ni una operación.", answer, [wrong, "una operación", "un valor necesariamente igual a cero"], { type: "variable", variable: statement.match(/\b[xakp]\b/)?.[0] || "x", label: answer }, [statement, `variable → ${answer}`, `significado = ${answer}`])));

  [["un número aumentado en", 7, "+"], ["un número disminuido en", 5, "−"], ["la suma de un número y", 12, "+"], ["la diferencia entre un número y", 9, "−"]].forEach(([phrase, value, op], index) => {
    const answer = op === "+" ? `x + ${value}` : `x − ${value}`;
    result.push(q("AL01", index + 5, "additive-language", index < 2 ? 1 : 2, "Traducir una relación aditiva", `¿Qué expresión representa «${phrase} ${value}»?`, "Identifica qué cantidad cambia y qué cantidad se suma o se resta.", answer, [`${value} − x`, `${value}x`, `x ÷ ${value}`], { type: "expression", expression: answer, focus: "operación aditiva" }, ["un número → x", `${phrase} ${value} → ${op} ${value}`, `expresión = ${answer}`]));
  });

  [["el triple de un número", 3, "multiply"], ["la mitad de un número", 2, "divide"], ["cinco veces un número", 5, "multiply"], ["un número repartido entre cuatro", 4, "divide"]].forEach(([phrase, value, kind], index) => {
    const answer = kind === "multiply" ? `${value}x` : `x/${value}`;
    result.push(q("AL01", index + 9, "multiplicative-language", index < 2 ? 1 : 2, "Traducir una relación multiplicativa", `¿Qué expresión representa «${phrase}»?`, "Multiplicar forma grupos iguales; dividir reparte la cantidad variable.", answer, [kind === "multiply" ? `x + ${value}` : `${value}/x`, kind === "multiply" ? `x/${value}` : `${value}x`, `${value} − x`], { type: "expression", expression: answer, focus: kind === "multiply" ? "producto" : "cociente" }, ["cantidad desconocida → x", `${phrase} → ${answer}`, `expresión = ${answer}`]));
  });

  [["5x + 3", "el coeficiente de x", "5"], ["7y − 4", "el término constante", "−4"], ["9 + 2m", "el coeficiente de m", "2"], ["6a − 11", "la cantidad de términos", "2"]].forEach(([expression, request, answer], index) => result.push(q("AL01", index + 13, "parts-expression", index < 2 ? 1 : 2, "Reconocer las partes de una expresión", `En ${expression}, ¿cuál es ${request}?`, "Los términos se separan por suma o resta; el coeficiente multiplica la variable.", answer, [answer === "2" ? "3" : "1", answer === "5" ? "3" : "6", answer === "−4" ? "4" : "11"], { type: "parts", expression, focus: request }, [`expresión = ${expression}`, `busca ${request}`, `${request} = ${answer}`])));

  [[3, 5, "n", "cuadernos"], [4, 7, "b", "boletos"], [6, 2, "h", "horas"], [8, 10, "c", "cajas"]].forEach(([rate, fixed, variable, unit], index) => {
    const answer = `${rate}${variable} + ${fixed}`;
    result.push(q("AL01", index + 17, "context-expression", index < 2 ? 2 : 3, "Modelar un costo variable", `Un servicio cobra ${fixed} pesos fijos y ${rate} pesos por cada ${unit.slice(0, -1)}. Si se usan ${variable} ${unit}, ¿qué expresión da el costo total?`, "Separa el costo fijo del costo que depende de la cantidad.", answer, [`${rate} + ${fixed}${variable}`, `${rate + fixed}${variable}`, `${rate}${variable} − ${fixed}`], { type: "expression", expression: answer, focus: "costo variable + costo fijo" }, [`costo variable = ${rate}${variable}`, `costo fijo = ${fixed}`, `total = ${answer}`]));
  });

  [["4x + 7", "Expresión algebraica"], ["3x = 18", "Ecuación"], ["2x + 1 > 9", "Desigualdad"], ["y − 5", "Expresión algebraica"]].forEach(([statement, answer], index) => { const types = ["Expresión algebraica", "Ecuación", "Desigualdad", "Número natural"].filter((type) => type !== answer); result.push(q("AL01", index + 21, "classify", index < 2 ? 1 : 2, "Distinguir el tipo de relación", `¿Cómo se clasifica ${statement}?`, "Una ecuación tiene igualdad; una desigualdad usa <, >, ≤ o ≥; una expresión no afirma una comparación.", answer, types, { type: "classify", expression: statement, label: answer }, [`observa ${statement}`, "busca un signo de relación", `clasificación = ${answer}`])); });
  return result;
}

function buildAL02() {
  const result = [];
  [[3, 4, 2], [5, 2, 7], [4, 6, -1], [7, -3, 5]].forEach(([a, x, b], index) => {
    const value = a * x + b;
    const expression = `${a}x ${signed(b)}`;
    result.push(q("AL02", index + 1, "one-variable", index < 2 ? 1 : 2, "Sustituir una variable", `Evalúa ${expression} cuando x = ${fmt(x)}.`, "Sustituye x entre paréntesis antes de calcular.", fmt(value), [fmt(a + x + b), fmt(a * (x + b)), fmt(value + a)], { type: "substitute", expression, values: [`x = ${fmt(x)}`] }, [`x = ${fmt(x)}`, `${a}(${fmt(x)}) ${signed(b)}`, `valor = ${fmt(value)}`]));
  });

  [[2, 3, 4, 1], [5, 1, 2, 6], [3, -2, 4, 5], [6, 2, -1, 3]].forEach(([a, x, b, y], index) => {
    const value = a * x + b * y;
    const expression = b === -1 ? `${a}x − y` : `${a}x + ${b}y`;
    result.push(q("AL02", index + 5, "two-variables", index < 2 ? 1 : 2, "Sustituir dos variables", `Evalúa ${expression} si x = ${fmt(x)} y y = ${fmt(y)}.`, "Sustituye cada letra por su propio valor.", fmt(value), [fmt(a * x + b + y), fmt(a + x + b * y), fmt(value + a + b)], { type: "substitute", expression, values: [`x = ${fmt(x)}`, `y = ${fmt(y)}`] }, [`x = ${fmt(x)}, y = ${fmt(y)}`, `${a}(${fmt(x)}) + ${b}(${fmt(y)})`, `valor = ${fmt(value)}`]));
  });

  [[2, 3, 1], [3, 2, 4], [-2, 2, 2], [4, 2, 1]].forEach(([x, power, add], index) => {
    const value = x ** power + add;
    const expression = `x${power === 2 ? "²" : "³"} ${signed(add)}`;
    result.push(q("AL02", index + 9, "powers", index < 2 ? 2 : 3, "Respetar una potencia", `Evalúa ${expression} cuando x = ${fmt(x)}.`, "La potencia se calcula después de sustituir y antes de sumar o restar.", fmt(value), [fmt(x * power + add), fmt(Math.abs(x) ** power - add), fmt(value + power)], { type: "substitute", expression, values: [`x = ${fmt(x)}`] }, [`x = ${fmt(x)}`, `${fmt(x)}${power === 2 ? "²" : "³"} = ${fmt(x ** power)}`, `valor = ${fmt(value)}`]));
  });

  [
    ["P = 2l + 2a", { l: 6, a: 3 }, 18],
    ["d = vt", { v: 8, t: 5 }, 40],
    ["A = bh", { b: 7, h: 4 }, 28],
    ["C = 3n + 12", { n: 9 }, 39],
  ].forEach(([expression, values, answer], index) => result.push(q("AL02", index + 13, "formula", index < 2 ? 2 : 3, "Usar una fórmula", `Usa ${expression} con ${Object.entries(values).map(([key, value]) => `${key} = ${value}`).join(" y ")}.`, "Sustituye todas las variables antes de seguir el orden de operaciones.", fmt(answer), [fmt(answer + 4), fmt(answer - 3), fmt(answer * 2)], { type: "substitute", expression, values: Object.entries(values).map(([key, value]) => `${key} = ${value}`) }, [Object.entries(values).map(([key, value]) => `${key} = ${value}`).join(", "), "sustituye en la fórmula", `resultado = ${fmt(answer)}`])));

  [
    ["2x + 5 con x = 4", "2 + 4 + 5 = 11", "13"],
    ["x² + 1 con x = 3", "3 × 2 + 1 = 7", "10"],
    ["3a − b con a = 5 y b = 2", "3(5 − 2) = 9", "13"],
    ["4m/2 con m = 6", "4 + 6 ÷ 2 = 7", "12"],
  ].forEach(([task, claim, answer], index) => result.push(q("AL02", index + 17, "evaluation-error", index < 2 ? 2 : 3, "Revisar una sustitución", `Se evaluó ${task} así: ${claim}. ¿Cuál es el valor correcto?`, "Comprueba la sustitución y el orden de operaciones desde el inicio.", answer, [claim.split(" = ").pop(), `${Number(answer) + 3}`, `${Number(answer) - 3}`], { type: "error", claim, check: task }, [task, "sustituye con paréntesis", `valor correcto = ${answer}`])));

  [["2x + 1", 3, 5], ["x²", -2, 3], ["5 − x", 1, 6], ["3x − 4", 0, 4]].forEach(([expression, a, b], index) => {
    const evaluate = (x) => expression === "x²" ? x ** 2 : expression === "5 − x" ? 5 - x : expression === "3x − 4" ? 3 * x - 4 : 2 * x + 1;
    const va = evaluate(a), vb = evaluate(b), answer = va > vb ? `x = ${fmt(a)}` : vb > va ? `x = ${fmt(b)}` : "Producen el mismo valor";
    result.push(q("AL02", index + 21, "compare-values", index < 2 ? 2 : 3, "Comparar dos evaluaciones", `¿Qué valor de x produce un resultado mayor en ${expression}: x = ${fmt(a)} o x = ${fmt(b)}?`, "Evalúa la misma expresión dos veces y compara los resultados, no los valores de x.", answer, [answer === `x = ${fmt(a)}` ? `x = ${fmt(b)}` : `x = ${fmt(a)}`, "Producen el mismo valor", "No se puede comparar"], { type: "compare", items: [{ label: `x = ${fmt(a)}`, value: fmt(va) }, { label: `x = ${fmt(b)}`, value: fmt(vb) }] }, [`con x = ${fmt(a)} → ${fmt(va)}`, `con x = ${fmt(b)} → ${fmt(vb)}`, `mayor resultado: ${answer}`]));
  });
  return result;
}

function buildAL03() {
  const result = [];
  [[3, 5, "x"], [7, -2, "y"], [4, 9, "m"], [-3, -6, "a"]].forEach(([a, b, variable], index) => {
    const total = a + b, expression = `${fmt(a)}${variable} ${signed(b)}${variable}`, answer = `${fmt(total)}${variable}`;
    result.push(q("AL03", index + 1, "like-terms", index < 2 ? 1 : 2, "Combinar términos semejantes", `Simplifica ${expression}.`, "Solo se combinan términos con la misma parte variable.", answer, [`${fmt(a * b)}${variable}`, `${fmt(total)}${variable}²`, `${fmt(a)}${variable} ${signed(b)}`], { type: "tiles", terms: [a, b], variable }, [`coeficientes: ${fmt(a)} y ${fmt(b)}`, `${fmt(a)} ${signed(b)} = ${fmt(total)}`, `resultado = ${answer}`]));
  });

  [[3, "x", 4], [5, "y", -2], [-2, "m", 6], [4, "a", 3]].forEach(([factor, variable, constant], index) => {
    const expression = `${fmt(factor)}(${variable} ${signed(constant)})`, answer = `${fmt(factor)}${variable} ${signed(factor * constant)}`;
    result.push(q("AL03", index + 5, "distribute", index < 2 ? 1 : 2, "Aplicar la distributiva", `Desarrolla ${expression}.`, "Multiplica el factor exterior por cada término dentro del paréntesis.", answer, [`${fmt(factor)}${variable} ${signed(constant)}`, `${fmt(factor)}${variable} ${signed(factor + constant)}`, `${fmt(factor * factor)}${variable} ${signed(factor * constant)}`], { type: "expression", expression, focus: "distribuir a cada término" }, [`${fmt(factor)} · ${variable}`, `${fmt(factor)} · (${fmt(constant)})`, `resultado = ${answer}`]));
  });

  [[6, 12, "x", 6], [8, 20, "y", 4], [15, -10, "m", 5], [14, 21, "a", 7]].forEach(([coefficient, constant, variable, factor], index) => {
    const insideConstant = constant / factor, insideCoefficient = coefficient / factor, variablePart = insideCoefficient === 1 ? variable : `${insideCoefficient}${variable}`, answer = `${factor}(${variablePart} ${signed(insideConstant)})`, expression = `${coefficient}${variable} ${signed(constant)}`;
    result.push(q("AL03", index + 9, "factor", index < 2 ? 2 : 3, "Extraer un factor común", `Factoriza ${expression} usando factor común ${factor}.`, "Divide cada término entre el factor que sale del paréntesis.", answer, [`${factor}(${coefficient}${variable} ${signed(constant)})`, `${coefficient / factor}(${factor}${variable} ${signed(insideConstant)})`, `${factor}(${coefficient / factor}${variable} ${signed(constant)})`], { type: "expression", expression, focus: `factor común ${factor}` }, [`factor común = ${factor}`, `${expression} ÷ ${factor}`, `forma factorizada = ${answer}`]));
  });

  [["2(x + 3)", "2x + 6", true], ["4x + 8", "4(x + 2)", true], ["3(x + 5)", "3x + 5", false], ["5x + 10", "5(x + 5)", false]].forEach(([left, right, equal], index) => result.push(q("AL03", index + 13, "equivalent-check", index < 2 ? 2 : 3, "Comprobar dos formas", `¿${left} y ${right} son equivalentes para todo x?`, "Desarrolla o factoriza una de las expresiones y compara término por término.", equal ? "Sí, son equivalentes" : "No son equivalentes", [equal ? "No son equivalentes" : "Sí, son equivalentes", "Solo cuando x = 0", "No se puede determinar"], { type: "compare", items: [{ label: "Forma A", value: left }, { label: "Forma B", value: right }] }, [`forma A: ${left}`, `forma B: ${right}`, equal ? "representan el mismo valor" : "no coinciden para todo x"])));

  [[3, 2, 2, "x"], [4, -1, 3, "y"], [2, 5, -3, "m"], [-3, 4, 5, "a"]].forEach(([factor, constant, extra, variable], index) => {
    const coefficient = factor + extra, totalConstant = factor * constant, expression = `${fmt(factor)}(${variable} ${signed(constant)}) ${signed(extra)}${variable}`, coefficientPart = coefficient === -1 ? `−${variable}` : coefficient === 1 ? variable : `${fmt(coefficient)}${variable}`, answer = `${coefficientPart} ${signed(totalConstant)}`;
    result.push(q("AL03", index + 17, "mixed-simplify", index < 2 ? 2 : 3, "Simplificar en dos etapas", `Simplifica ${expression}.`, "Distribuye primero y combina después los términos semejantes.", answer, [`${fmt(factor * extra)}${variable} ${signed(totalConstant)}`, `${fmt(coefficient)}${variable} ${signed(constant)}`, `${fmt(factor)}${variable} ${signed(totalConstant + extra)}`], { type: "steps", expression }, [`distribuye ${fmt(factor)}`, `${fmt(factor)}${variable} ${signed(totalConstant)} ${signed(extra)}${variable}`, `resultado = ${answer}`]));
  });

  [["3(x + 4) = 3x + 4", "3x + 12", ["3x + 4", "7x", "12x"]], ["5x + 2x = 7x²", "7x", ["7x²", "5x", "10x"]], ["8x − 3x = 5", "5x", ["5", "11x", "24x"]], ["2(x − 6) = 2x − 6", "2x − 12", ["2x − 6", "8x", "2x + 12"]]].forEach(([claim, answer, distractors], index) => result.push(q("AL03", index + 21, "equivalence-error", index < 2 ? 2 : 3, "Detectar una transformación inválida", `Se afirmó que ${claim}. ¿Cuál es la forma correcta del lado simplificado?`, "Revisa si la operación se aplicó a todos los términos y si las partes variables coinciden.", answer, distractors, { type: "error", claim, check: "comprueba con un valor de x" }, [claim, "aplica la propiedad correcta", `corrección = ${answer}`])));
  return result;
}

function buildAL04() {
  const result = [];
  [[7, 19], [12, 31], [-5, 8], [9, -4]].forEach(([add, total], index) => { const solution = total - add; result.push(q("AL04", index + 1, "addition-equation", index < 2 ? 1 : 2, "Deshacer una suma", `Resuelve x ${signed(add)} = ${fmt(total)}.`, "Usa la operación inversa en ambos lados.", `x = ${fmt(solution)}`, [`x = ${fmt(total + add)}`, `x = ${fmt(add - total)}`, `x = ${fmt(total)}`], { type: "balance", left: `x ${signed(add)}`, right: fmt(total) }, [`x ${signed(add)} = ${fmt(total)}`, `${fmt(add)} se elimina con su opuesto`, `x = ${fmt(solution)}`])); });
  [[6, 14], [11, 20], [4, -3], [-7, 9]].forEach(([subtract, total], index) => { const solution = total + subtract; result.push(q("AL04", index + 5, "subtraction-equation", index < 2 ? 1 : 2, "Deshacer una resta", `Resuelve x − (${fmt(subtract)}) = ${fmt(total)}.`, "Suma la cantidad restada a ambos lados, respetando su signo.", `x = ${fmt(solution)}`, [`x = ${fmt(total - subtract)}`, `x = ${fmt(subtract - total)}`, `x = ${fmt(total)}`], { type: "balance", left: `x − (${fmt(subtract)})`, right: fmt(total) }, [`x − (${fmt(subtract)}) = ${fmt(total)}`, `suma ${fmt(subtract)} a ambos lados`, `x = ${fmt(solution)}`])); });
  [[4, 28], [7, -35], [-3, 18], [-6, -42]].forEach(([factor, total], index) => { const solution = total / factor; result.push(q("AL04", index + 9, "multiplication-equation", index < 2 ? 1 : 2, "Deshacer una multiplicación", `Resuelve ${fmt(factor)}x = ${fmt(total)}.`, "Divide ambos lados entre el coeficiente de x.", `x = ${fmt(solution)}`, [`x = ${fmt(total - factor)}`, `x = ${fmt(total * factor)}`, `x = ${fmt(factor / total)}`], { type: "balance", left: `${fmt(factor)}x`, right: fmt(total) }, [`${fmt(factor)}x = ${fmt(total)}`, `divide entre ${fmt(factor)}`, `x = ${fmt(solution)}`])); });
  [[5, 7], [4, -6], [-3, 8], [-2, -9]].forEach(([divisor, quotient], index) => { const solution = divisor * quotient; result.push(q("AL04", index + 13, "division-equation", index < 2 ? 1 : 2, "Deshacer una división", `Resuelve x/${fmt(divisor)} = ${fmt(quotient)}.`, "Multiplica ambos lados por el divisor.", `x = ${fmt(solution)}`, [`x = ${fmt(quotient / divisor)}`, `x = ${fmt(quotient - divisor)}`, `x = ${fmt(quotient + divisor)}`], { type: "balance", left: `x/${fmt(divisor)}`, right: fmt(quotient) }, [`x/${fmt(divisor)} = ${fmt(quotient)}`, `multiplica por ${fmt(divisor)}`, `x = ${fmt(solution)}`])); });
  [["Después de gastar 18 pesos quedan 27.", "x − 18 = 27", 45], ["Con 9 puntos adicionales se llega a 34.", "x + 9 = 34", 25], ["Cinco entradas iguales cuestan 60 pesos.", "5x = 60", 12], ["Una cantidad repartida entre 4 da 11.", "x/4 = 11", 44]].forEach(([context, equation, solution], index) => result.push(q("AL04", index + 17, "one-step-context", index < 2 ? 2 : 3, "Resolver desde una situación", `${context} ¿Cuál era la cantidad x?`, "Escribe primero la ecuación que representa exactamente la historia.", `x = ${fmt(solution)}`, [`x = ${fmt(solution + 9)}`, `x = ${fmt(Math.abs(solution - 9))}`, `x = ${fmt(solution * 2)}`], { type: "balance", left: equation.split(" = ")[0], right: equation.split(" = ")[1] }, [context, equation, `x = ${fmt(solution)}`])));
  [["x + 8 = 21", 13, true], ["6x = 42", 8, false], ["x/5 = −3", -15, true], ["x − 12 = 4", -8, false]].forEach(([equation, candidate, correct], index) => result.push(q("AL04", index + 21, "solution-check", index < 2 ? 2 : 3, "Comprobar por sustitución", `¿x = ${fmt(candidate)} es solución de ${equation}?`, "Sustituye el candidato y verifica si ambos lados quedan iguales.", correct ? "Sí, mantiene la igualdad" : "No, no mantiene la igualdad", [correct ? "No, no mantiene la igualdad" : "Sí, mantiene la igualdad", "Solo si x es positivo", "No se puede comprobar"], { type: "balance", left: equation.split(" = ")[0], right: equation.split(" = ")[1], candidate: `x = ${fmt(candidate)}` }, [`sustituye x = ${fmt(candidate)}`, equation, correct ? "ambos lados coinciden" : "los lados no coinciden"])));
  return result;
}

function buildAL05() {
  const result = [];
  [[3, 5, 26], [4, -7, 17], [-2, 9, 1], [6, 11, 65]].forEach(([a, b, total], index) => { const solution = (total - b) / a, expression = `${fmt(a)}x ${signed(b)} = ${fmt(total)}`; result.push(q("AL05", index + 1, "two-step", index < 2 ? 2 : 3, "Aislar en dos pasos", `Resuelve ${expression}.`, "Deshaz primero la suma o resta y después la multiplicación.", `x = ${fmt(solution)}`, [`x = ${fmt(solution + 2)}`, `x = ${fmt(solution - 2)}`, `x = ${fmt(-solution)}`], { type: "steps", expression }, [`${fmt(a)}x = ${fmt(total - b)}`, `x = ${fmt(total - b)}/${fmt(a)}`, `x = ${fmt(solution)}`])); });
  [[5, 3, 2, 12], [7, -4, 3, 12], [4, 9, 2, 19], [6, 5, 4, 17]].forEach(([a, b, c, d], index) => { const solution = (d - b) / (a - c), expression = `${a}x ${signed(b)} = ${c}x ${signed(d)}`; result.push(q("AL05", index + 5, "both-sides", index < 2 ? 2 : 3, "Reunir la variable en un lado", `Resuelve ${expression}.`, "Resta el mismo término con variable en ambos lados antes de aislar x.", `x = ${fmt(solution)}`, [`x = ${fmt(solution + 2)}`, `x = ${fmt(solution - 2)}`, `x = ${fmt(-solution)}`], { type: "balance", left: `${a}x ${signed(b)}`, right: `${c}x ${signed(d)}` }, [`${a - c}x ${signed(b)} = ${d}`, `${a - c}x = ${d - b}`, `x = ${fmt(solution)}`])); });
  [[3, 4, 27], [5, -2, 30], [-2, 5, -6], [4, 3, 44]].forEach(([factor, inside, total], index) => { const solution = total / factor - inside, expression = `${fmt(factor)}(x ${signed(inside)}) = ${fmt(total)}`; result.push(q("AL05", index + 9, "parentheses", index < 2 ? 2 : 3, "Resolver con agrupación", `Resuelve ${expression}.`, "Puedes dividir primero entre el factor exterior o distribuir correctamente.", `x = ${fmt(solution)}`, [`x = ${fmt(solution + 3)}`, `x = ${fmt(solution - 3)}`, `x = ${fmt(-solution)}`], { type: "steps", expression }, [`x ${signed(inside)} = ${fmt(total / factor)}`, `x = ${fmt(total / factor)} ${signed(-inside)}`, `x = ${fmt(solution)}`])); });
  [[3, 5, 6], [-2, 4, 3], [7, 2, 5], [1, 6, -2]].forEach(([inside, divisor, quotient], index) => { const solution = divisor * quotient - inside, expression = `(x ${signed(inside)})/${fmt(divisor)} = ${fmt(quotient)}`; result.push(q("AL05", index + 13, "fraction-form", index < 2 ? 2 : 3, "Eliminar un cociente", `Resuelve ${expression}.`, "Multiplica ambos lados por el denominador antes de aislar x.", `x = ${fmt(solution)}`, [`x = ${fmt(quotient * divisor)}`, `x = ${fmt(quotient / divisor - inside)}`, `x = ${fmt(quotient - inside)}`], { type: "steps", expression }, [`x ${signed(inside)} = ${fmt(divisor * quotient)}`, `x = ${fmt(divisor * quotient)} ${signed(-inside)}`, `x = ${fmt(solution)}`])); });
  [[12, 4, 40, "viajes", "Cuántos"], [8, 6, 50, "clases", "Cuántas"], [15, 5, 65, "paquetes", "Cuántos"], [20, 7, 76, "horas", "Cuántas"]].forEach(([fixed, rate, total, unit, questionWord], index) => { const amount = (total - fixed) / rate; result.push(q("AL05", index + 17, "multi-context", index < 2 ? 2 : 3, "Separar costo fijo y variable", `Un plan cobra ${fixed} pesos fijos y ${rate} por cada ${unit.slice(0, -1)}. El total fue ${total}. ¿${questionWord} ${unit} se usaron?`, "Representa total = costo fijo + tarifa por cantidad.", `${fmt(amount)} ${unit}`, [`${fmt(total / rate)} ${unit}`, `${fmt(total - fixed)} ${unit}`, `${fmt((total + fixed) / rate)} ${unit}`], { type: "steps", expression: `${fixed} + ${rate}x = ${total}` }, [`${fixed} + ${rate}x = ${total}`, `${rate}x = ${total - fixed}`, `x = ${fmt(amount)}`])); });
  [["3x + 6 = 24", "3x = 18, x = 6", "x = 6"], ["4(x + 2) = 32", "4x + 2 = 32, 4x = 30, x = 7,5", "x = 6"], ["5x − 7 = 2x + 8", "3x = 15, x = 5", "x = 5"], ["(x − 3)/4 = 5", "x − 3 = 20, x = 17", "x = 23"]].forEach(([equation, work, answer], index) => { const stated = work.split("x = ").pop().replace(",", "."); const correct = work.endsWith(answer.replace("x = ", "")); result.push(q("AL05", index + 21, "multi-error", index < 2 ? 2 : 3, "Auditar una solución", `Para ${equation} se escribió: ${work}. ¿Cuál es la conclusión correcta?`, "Comprueba el último valor en la ecuación original.", correct ? "El procedimiento es correcto" : answer, [correct ? `x = ${fmt(Number(stated) + 2)}` : "El procedimiento es correcto", `x = ${fmt(Number(answer.replace("x = ", "")) - 2)}`, "No tiene solución"], { type: "error", claim: work, check: equation }, [equation, work, correct ? "la sustitución confirma la igualdad" : `corrección: ${answer}`])); });
  return result;
}

function buildAL06() {
  const result = [];
  [["una edad mínima de 12 años", "e", "≥", 12], ["menos de 20 cupos ocupados", "c", "<", 20], ["como máximo 8 intentos", "i", "≤", 8], ["más de 50 puntos", "p", ">", 50]].forEach(([phrase, variable, sign, boundary], index) => { const answer = `${variable} ${sign} ${boundary}`; result.push(q("AL06", index + 1, "write-inequality", index < 2 ? 1 : 2, "Traducir una restricción", `¿Qué desigualdad representa «${phrase}»?`, "Mínimo incluye el límite; menos de no lo incluye.", answer, [`${variable} ${reverseSign(sign)} ${boundary}`, `${variable} ${changeBoundary(sign)} ${boundary}`, `${variable} = ${boundary}`], { type: "inequality", expression: answer }, [phrase, "identifica si el límite se incluye", `desigualdad = ${answer}`])); });
  [["x + 7 > 15", ">", 8], ["x − 5 ≤ 9", "≤", 14], ["x + 12 ≥ 4", "≥", -8], ["x − 3 < −10", "<", -7]].forEach(([expression, sign, boundary], index) => { const answer = `x ${sign} ${fmt(boundary)}`; result.push(q("AL06", index + 5, "add-sub-inequality", index < 2 ? 1 : 2, "Aislar sumando o restando", `Resuelve ${expression}.`, "La suma y la resta no cambian el sentido del signo.", answer, [answer.replace(sign, sign.includes(">") ? "<" : ">"), `x ${sign} ${fmt(boundary + 5)}`, `x = ${fmt(boundary)}`], { type: "number-line", boundary, sign, expression }, [expression, "deshaz el término constante", `solución: ${answer}`])); });
  [["3x > 18", ">", 6], ["5x ≤ 35", "≤", 7], ["2x ≥ −10", "≥", -5], ["4x < −12", "<", -3]].forEach(([expression, sign, boundary], index) => { const answer = `x ${sign} ${fmt(boundary)}`; result.push(q("AL06", index + 9, "positive-multiply", index < 2 ? 2 : 3, "Dividir por un número positivo", `Resuelve ${expression}.`, "Dividir entre un número positivo conserva el sentido del signo.", answer, [answer.replace(sign, sign.includes(">") ? "<" : ">"), `x ${sign} ${fmt(boundary * 2)}`, `x = ${fmt(boundary)}`], { type: "number-line", boundary, sign, expression }, [expression, "divide ambos lados por el coeficiente positivo", `solución: ${answer}`])); });
  [["−2x < 8", ">", -4], ["−3x ≥ 12", "≤", -4], ["−5x > −20", "<", 4], ["−4x ≤ −24", "≥", 6]].forEach(([expression, sign, boundary], index) => { const answer = `x ${sign} ${fmt(boundary)}`; result.push(q("AL06", index + 13, "negative-multiply", index < 2 ? 2 : 3, "Invertir el signo con un factor negativo", `Resuelve ${expression}.`, "Al dividir por un número negativo, el orden se invierte.", answer, [answer.replace(sign, sign.includes(">") ? "<" : ">"), `x ${sign} ${fmt(-boundary)}`, `x = ${fmt(boundary)}`], { type: "number-line", boundary, sign, expression }, [expression, "divide por el coeficiente negativo e invierte el signo", `solución: ${answer}`])); });
  [[3, ">", "círculo abierto y flecha a la derecha"], [-2, "≤", "círculo cerrado y flecha a la izquierda"], [5, "≥", "círculo cerrado y flecha a la derecha"], [0, "<", "círculo abierto y flecha a la izquierda"]].forEach(([boundary, sign, description], index) => { const answer = `x ${sign} ${fmt(boundary)}`; result.push(q("AL06", index + 17, "number-line", index < 2 ? 1 : 2, "Leer una recta de soluciones", `Una recta muestra ${description} desde ${fmt(boundary)}. ¿Qué desigualdad representa?`, "Un punto cerrado incluye el límite; la flecha indica hacia dónde continúan las soluciones.", answer, [answer.replace(sign, sign.includes(">") ? "<" : ">"), answer.replace(/[<>≤≥]/, "="), `x ${sign} ${fmt(boundary + 1)}`], { type: "number-line", boundary, sign, given: true }, [description, `límite = ${fmt(boundary)}`, `desigualdad = ${answer}`])); });
  [["Una maleta admite como máximo 23 kg.", "m", "≤", 23], ["Se necesitan más de 80 puntos para avanzar.", "p", ">", 80], ["El presupuesto debe ser al menos 150 pesos.", "b", "≥", 150], ["La temperatura debe mantenerse por debajo de 5 °C.", "t", "<", 5]].forEach(([context, variable, sign, boundary], index) => { const answer = `${variable} ${sign} ${boundary}`; result.push(q("AL06", index + 21, "inequality-context", index < 2 ? 2 : 3, "Modelar un límite real", `${context} ¿Qué desigualdad lo representa?`, "Decide si el valor límite está permitido y hacia qué lado están los valores válidos.", answer, [`${variable} ${reverseSign(sign)} ${boundary}`, `${variable} ${changeBoundary(sign)} ${boundary}`, `${variable} = ${boundary}`], { type: "inequality", expression: answer }, [context, "identifica el límite y si se incluye", `modelo = ${answer}`])); });
  return result;
}

function buildAL07() {
  const result = [];
  [[1, 4, 3, 10], [2, 7, 5, 19], [0, -2, 4, 6], [3, 12, 7, 32]].forEach(([x1, y1, x2, y2], index) => { const slope = (y2 - y1) / (x2 - x1); result.push(q("AL07", index + 1, "slope", index < 2 ? 2 : 3, "Calcular una tasa de cambio", `Una relación lineal pasa por (${x1}, ${fmt(y1)}) y (${x2}, ${fmt(y2)}). ¿Cuál es su tasa de cambio?`, "Compara el cambio de y con el cambio de x.", fmt(slope), [fmt(y2 - y1), fmt(x2 - x1), fraction(x2 - x1, y2 - y1)], { type: "graph", points: [[x1, y1], [x2, y2]] }, [`Δy = ${fmt(y2 - y1)}`, `Δx = ${fmt(x2 - x1)}`, `m = Δy/Δx = ${fmt(slope)}`])); });
  [[2, 1, 3], [3, -2, 4], [-1, 5, 2], [4, 0, -3]].forEach(([slope, intercept, start], index) => { const rows = [start, start + 1, start + 2].map((x) => [x, slope * x + intercept]); const answer = fmt(slope); result.push(q("AL07", index + 5, "linear-table", index < 2 ? 1 : 2, "Detectar un cambio constante", `En la tabla x: ${rows.map((row) => fmt(row[0])).join(", ")} y y: ${rows.map((row) => fmt(row[1])).join(", ")}. ¿Cuánto cambia y cuando x aumenta 1?`, "Resta valores consecutivos de y.", answer, [fmt(intercept), fmt(slope + 1), fmt(rows[2][1])], { type: "table", headers: ["x", "y"], rows: rows.map((row) => row.map(fmt)) }, [`cambios en x = 1`, `cambios en y = ${answer}`, `tasa = ${answer}`])); });
  [[3, 5], [6, -2], [-2, 8], [4, 0]].forEach(([slope, intercept], index) => { const answer = `y = ${fmt(slope)}x${constant(intercept)}`; result.push(q("AL07", index + 9, "linear-equation", index < 2 ? 2 : 3, "Construir una ecuación lineal", `Una relación tiene tasa de cambio ${fmt(slope)} y valor inicial ${fmt(intercept)}. ¿Cuál es su ecuación?`, "En y = mx + b, m es la tasa y b es el valor cuando x = 0.", answer, [`y = ${fmt(intercept)}x${constant(slope)}`, `y = x${constant(slope)}`, `x = ${fmt(slope)}y${constant(intercept)}`], { type: "equation", expression: answer }, [`m = ${fmt(slope)}`, `b = ${fmt(intercept)}`, `ecuación = ${answer}`])); });
  [["y = 4x + 7", 7], ["y = −3x + 12", 12], ["y = 6x − 5", -5], ["y = 2x", 0]].forEach(([equation, intercept], index) => result.push(q("AL07", index + 13, "intercept", index < 2 ? 1 : 2, "Interpretar el valor inicial", `En ${equation}, ¿cuánto vale y cuando x = 0?`, "El valor inicial es el término que no multiplica a x.", fmt(intercept), [fmt(intercept + 2), fmt(Number(equation.match(/[−-]?\d+/)?.[0]?.replace("−", "-") || 0)), fmt(-intercept)], { type: "equation", expression: equation }, ["sustituye x = 0", "el término con x se vuelve 0", `valor inicial = ${fmt(intercept)}`])));
  [[2, 5, 3, 1], [4, -2, 1, 9], [-1, 10, 2, -4], [3, 0, 3, 7]].forEach(([m1, b1, m2, b2], index) => { const answer = m1 > m2 ? "La relación A" : m2 > m1 ? "La relación B" : "Tienen la misma tasa"; const distractors = ["La relación A", "La relación B", "Tienen la misma tasa", "Depende únicamente del valor inicial"].filter((value) => value !== answer); const term = (coefficient) => coefficient === 1 ? "x" : coefficient === -1 ? "−x" : `${fmt(coefficient)}x`; result.push(q("AL07", index + 17, "compare-lines", index < 2 ? 2 : 3, "Comparar tasas lineales", `A: y = ${term(m1)}${constant(b1)}. B: y = ${term(m2)}${constant(b2)}. ¿Cuál cambia más rápido por cada unidad de x?`, "Compara los coeficientes de x; el valor inicial no es la tasa.", answer, distractors, { type: "compare", items: [{ label: "Relación A", value: `m = ${fmt(m1)}` }, { label: "Relación B", value: `m = ${fmt(m2)}` }] }, [`mA = ${fmt(m1)}`, `mB = ${fmt(m2)}`, `mayor tasa: ${answer}`])); });
  [[3, 4, 8, "puntos", "Cuántos"], [5, 10, 6, "pesos", "Cuántos"], [2, -3, 12, "kilómetros", "Cuántos"], [7, 1, 5, "fichas", "Cuántas"]].forEach(([slope, intercept, x, unit, questionWord], index) => { const value = slope * x + intercept; result.push(q("AL07", index + 21, "linear-predict", index < 2 ? 2 : 3, "Predecir con un modelo", `El modelo es y = ${fmt(slope)}x ${signed(intercept)}. ¿${questionWord} ${unit} predice cuando x = ${x}?`, "Sustituye x y conserva tanto la tasa como el valor inicial.", `${fmt(value)} ${unit}`, [`${fmt(slope * x)} ${unit}`, `${fmt(x + intercept)} ${unit}`, `${fmt(slope + intercept + x)} ${unit}`], { type: "substitute", expression: `y = ${fmt(slope)}x ${signed(intercept)}`, values: [`x = ${x}`] }, [`x = ${x}`, `y = ${fmt(slope)}(${x}) ${signed(intercept)}`, `y = ${fmt(value)} ${unit}`])); });
  return result;
}

const builders = [buildAL01, buildAL02, buildAL03, buildAL04, buildAL05, buildAL06, buildAL07];
export const ALGEBRA_SKILLS = ALGEBRA_SKILL_DEFINITIONS.map((skill, index) => ({ ...skill, questions: builders[index]() }));
export const ALGEBRA_QUESTIONS = ALGEBRA_SKILLS.flatMap((skill) => skill.questions);
