const family = (id, label, short) => ({ id, label, short });

export const DATA_SKILL_DEFINITIONS = [
  { id: "DP01", title: "Lectura de tablas y gráficas", short: "Tablas y gráficas", symbol: "▥", description: "Lee escalas, unidades y relaciones antes de comparar o calcular.", families: [family("table-read", "Lectura directa de tablas", "Leer tablas"), family("table-reason", "Comparación y cálculo en tablas", "Razonar con tablas"), family("bar-chart", "Gráficas de barras", "Barras"), family("line-chart", "Gráficas de líneas", "Líneas"), family("pictogram", "Pictogramas y claves", "Pictogramas"), family("graph-audit", "Escalas y gráficas engañosas", "Auditar gráficas")] },
  { id: "DP02", title: "Centro y variabilidad", short: "Centro y variabilidad", symbol: "x̄", description: "Resume conjuntos de datos sin ocultar su distribución ni sus valores extremos.", families: [family("mean", "Media aritmética", "Media"), family("median", "Mediana", "Mediana"), family("mode", "Moda", "Moda"), family("range", "Rango", "Rango"), family("outlier", "Efecto de valores atípicos", "Valores atípicos"), family("distribution", "Comparación de distribuciones", "Comparar datos")] },
  { id: "DP03", title: "Probabilidad básica", short: "Probabilidad", symbol: "P", description: "Cuantifica posibilidades, usa complementos y contrasta modelos con resultados reales.", families: [family("probability-language", "Lenguaje de probabilidad", "Interpretar"), family("simple-event", "Probabilidad de un evento simple", "Evento simple"), family("complement", "Evento complementario", "Complemento"), family("experimental", "Probabilidad experimental", "Experimentos"), family("compound", "Eventos compuestos", "Dos etapas"), family("fairness", "Juegos justos y errores", "Justicia y errores")] },
];

const sum = (values) => values.reduce((total, value) => total + value, 0);
const mean = (values) => sum(values) / values.length;
const median = (values) => { const ordered = [...values].sort((a, b) => a - b); const middle = Math.floor(ordered.length / 2); return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2; };
const mode = (values) => { const counts = new Map(); values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)); const highest = Math.max(...counts.values()); const modes = [...counts.entries()].filter(([, count]) => count === highest).map(([value]) => value); return highest === 1 ? "No hay moda" : modes.join(" y "); };
const fmt = (value) => typeof value !== "number" ? `${value}` : Number.isInteger(value) ? `${value}` : `${Number(value.toFixed(2))}`.replace(".", ",");
const fraction = (numerator, denominator) => `${numerator}/${denominator}`;

function q(skillId, number, familyId, level, title, prompt, hint, answer, distractors, visual, models) {
  const skill = DATA_SKILL_DEFINITIONS.find((item) => item.id === skillId);
  const choices = [...new Set([`${answer}`, ...distractors.map(String)])];
  const fallback = ["No se puede determinar", "Todos son iguales", "Ninguna de las anteriores"];
  for (const value of fallback) if (choices.length < 4 && !choices.includes(value)) choices.push(value);
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
    options: ordered.map((value) => ({ value, feedback: value === `${answer}` ? null : `Vuelve a los datos: ${models[0]}. Después, ${models[1]}.` })),
    success: `${models[2]}. La conclusión coincide con los datos.`,
    steps: models.map((equation, index) => ({
      eyebrow: `Paso ${index + 1} · ${index === 0 ? "lee" : index === 1 ? "calcula" : "concluye"}`,
      title: index === 0 ? "Identifica los datos relevantes" : index === 1 ? "Relaciona las cantidades" : "Responde con evidencia",
      equation,
      text: index === 0 ? hint : index === 1 ? "Usa únicamente los datos y la escala que muestra la representación." : `El resultado esperado es ${answer}.`,
    })),
  };
}

function buildDP01() {
  const result = [];
  [
    [["Lunes", 12], ["Martes", 18], ["Miércoles", 15], "Martes", 18],
    [["Rojo", 9], ["Azul", 14], ["Verde", 11], "Azul", 14],
    [["Equipo A", 24], ["Equipo B", 21], ["Equipo C", 27], "Equipo C", 27],
    [["Enero", 32], ["Febrero", 28], ["Marzo", 35], "Febrero", 28],
  ].forEach(([...parts], index) => { const answer = parts.pop(), category = parts.pop(), rows = parts; result.push(q("DP01", index + 1, "table-read", index < 2 ? 1 : 2, "Encontrar un valor exacto", `La tabla muestra ${rows.map(([label, value]) => `${label}: ${value}`).join(", ")}. ¿Qué valor corresponde a ${category}?`, "Ubica primero la fila y después lee la columna del valor.", fmt(answer), rows.filter(([label]) => label !== category).map(([, value]) => fmt(value)).concat([fmt(answer + 3)]), { type: "table", headers: ["Categoría", "Valor"], rows }, [`fila = ${category}`, `valor en esa fila = ${answer}`, `respuesta = ${answer}`])); });

  [
    { rows: [["A", 16], ["B", 23], ["C", 19]], prompt: "¿Cuál es la diferencia entre el valor mayor y el menor?", answer: 7, models: ["mayor = 23", "menor = 16", "23 − 16 = 7"] },
    { rows: [["Norte", 12], ["Sur", 17], ["Este", 14]], prompt: "¿Cuál es el total de las tres regiones?", answer: 43, models: ["12, 17 y 14", "12 + 17 + 14", "total = 43"] },
    { rows: [["Mañana", 30], ["Tarde", 45], ["Noche", 25]], prompt: "¿Qué fracción del total corresponde a la tarde?", answer: "45/100", models: ["total = 100", "tarde = 45", "fracción = 45/100"] },
    { rows: [["Nivel 1", 8], ["Nivel 2", 13], ["Nivel 3", 18]], prompt: "¿Cuánto aumenta del nivel 1 al nivel 3?", answer: 10, models: ["nivel 1 = 8", "nivel 3 = 18", "18 − 8 = 10"] },
  ].forEach((item, index) => { const distractors = typeof item.answer === "number" ? [fmt(item.answer + 5), fmt(Math.abs(item.answer - 3)), fmt(Math.max(...item.rows.map((row) => row[1])))] : ["55/100", "45/55", "100/45"]; result.push(q("DP01", index + 5, "table-reason", index < 2 ? 1 : 2, "Calcular desde una tabla", item.prompt, "Decide si se busca un valor, una diferencia, una suma o una parte del total.", fmt(item.answer), distractors, { type: "table", headers: ["Categoría", "Cantidad"], rows: item.rows }, item.models)); });

  [
    { items: [["A", 6], ["B", 10], ["C", 8]], prompt: "¿Qué barra tiene el valor mayor?", answer: "B", models: ["A = 6, B = 10, C = 8", "compara las alturas con la escala", "la mayor es B"] },
    { items: [["Lun", 14], ["Mar", 20], ["Mié", 17]], prompt: "¿Cuánto mayor es martes que lunes?", answer: "6", models: ["martes = 20", "lunes = 14", "20 − 14 = 6"] },
    { items: [["Sol", 18], ["Lluvia", 7], ["Nubes", 5]], prompt: "¿Cuántos días no fueron soleados?", answer: "12", models: ["lluvia = 7", "nubes = 5", "7 + 5 = 12"] },
    { items: [["Libro", 24], ["Juego", 18], ["Deporte", 30]], prompt: "¿Cuál es la diferencia entre deporte y juego?", answer: "12", models: ["deporte = 30", "juego = 18", "30 − 18 = 12"] },
  ].forEach((item, index) => result.push(q("DP01", index + 9, "bar-chart", index < 2 ? 1 : 2, "Leer altura y escala", item.prompt, "Lee la etiqueta y el valor de cada barra antes de comparar.", item.answer, [item.answer === "B" ? "A" : `${Number(item.answer) + 4}`, item.answer === "B" ? "C" : `${Math.max(1, Number(item.answer) - 4)}`, item.answer === "B" ? "Todas" : `${Number(item.answer) * 2}`], { type: "bar", items: item.items, unit: "cantidad" }, item.models)));

  [
    { points: [["1", 10], ["2", 14], ["3", 13], ["4", 18]], prompt: "¿Cuánto cambia el valor del momento 1 al 4?", answer: "Aumenta 8", models: ["inicio = 10", "final = 18", "18 − 10 = 8"] },
    { points: [["Ene", 22], ["Feb", 19], ["Mar", 15], ["Abr", 17]], prompt: "¿Entre qué meses ocurre la mayor disminución?", answer: "Febrero y marzo", models: ["22→19: baja 3", "19→15: baja 4", "mayor disminución: febrero a marzo"] },
    { points: [["0", 5], ["1", 9], ["2", 13], ["3", 17]], prompt: "¿Cuál es el cambio constante por paso?", answer: "4", models: ["9 − 5 = 4", "13 − 9 = 4", "cambio constante = 4"] },
    { points: [["Lun", 8], ["Mar", 12], ["Mié", 12], ["Jue", 15]], prompt: "¿En qué tramo no hubo cambio?", answer: "Martes a miércoles", models: ["martes = 12", "miércoles = 12", "la diferencia es 0"] },
  ].forEach((item, index) => result.push(q("DP01", index + 13, "line-chart", index < 2 ? 2 : 3, "Leer cambios en el tiempo", item.prompt, "Compara puntos consecutivos y conserva el orden temporal.", item.answer, item.answer.startsWith("Aumenta") ? ["Disminuye 8", "Aumenta 18", "No cambia"] : item.answer === "4" ? ["3", "5", "12"] : item.answer.includes("Febrero") ? ["Enero y febrero", "Marzo y abril", "Todos por igual"] : ["Lunes a martes", "Miércoles a jueves", "Todos los tramos"], { type: "line", points: item.points }, item.models)));

  [
    { items: [["Ana", 3], ["Beto", 5], ["Cata", 4]], key: 2, prompt: "¿Cuántos libros representa Beto?", answer: "10", models: ["Beto tiene 5 símbolos", "cada símbolo vale 2", "5 × 2 = 10"] },
    { items: [["Rojo", 4], ["Azul", 2], ["Verde", 3]], key: 5, prompt: "¿Cuántos objetos más representa rojo que azul?", answer: "10", models: ["diferencia de símbolos = 2", "cada símbolo vale 5", "2 × 5 = 10"] },
    { items: [["Lun", 2], ["Mar", 4], ["Mié", 3]], key: 3, prompt: "¿Cuál es el total de los tres días?", answer: "27", models: ["símbolos: 2 + 4 + 3 = 9", "cada símbolo vale 3", "9 × 3 = 27"] },
    { items: [["A", 6], ["B", 3], ["C", 5]], key: 4, prompt: "¿Qué valor representa la categoría C?", answer: "20", models: ["C tiene 5 símbolos", "cada símbolo vale 4", "5 × 4 = 20"] },
  ].forEach((item, index) => result.push(q("DP01", index + 17, "pictogram", index < 2 ? 1 : 2, "Usar la clave del pictograma", item.prompt, "Cuenta los símbolos y multiplica por el valor indicado en la clave.", item.answer, [`${Number(item.answer) + item.key}`, `${Math.max(1, Number(item.answer) - item.key)}`, `${item.items.find((entry) => item.prompt.includes(entry[0]))?.[1] || item.key}`], { type: "pictogram", items: item.items, keyValue: item.key }, item.models)));

  [
    { title: "Eje recortado", claim: "Una barra de 92 parece el doble de una de 88 porque el eje empieza en 85.", answer: "La imagen exagera una diferencia de 4", check: "92 − 88 = 4" },
    { title: "Escala de 5", claim: "El eje avanza de 5 en 5 y una barra llega a la cuarta marca después de cero.", answer: "Representa 20", check: "4 marcas × 5" },
    { title: "Escala irregular", claim: "Las marcas dicen 0, 10, 30 y 40 con espacios iguales.", answer: "La escala es inconsistente", check: "los intervalos no tienen el mismo valor" },
    { title: "Área decorativa", claim: "Dos círculos representan 10 y 20, pero el segundo tiene cuatro veces el área.", answer: "El tamaño visual exagera el doble real", check: "20 es dos veces 10" },
  ].forEach((item, index) => result.push(q("DP01", index + 21, "graph-audit", index < 2 ? 2 : 3, item.title, `${item.claim} ¿Cuál es la conclusión correcta?`, "Revisa origen, intervalos, unidades y proporción visual antes de creer la impresión.", item.answer, ["La gráfica es completamente proporcional", "Los valores son iguales", "No se necesita revisar la escala"], { type: "audit", claim: item.claim, check: item.check }, [item.claim, item.check, item.answer])));
  return result;
}

function buildDP02() {
  const result = [];
  [[4, 6, 8, 10], [5, 7, 8, 12], [12, 15, 18, 15], [3, 6, 9, 12, 15]].forEach((values, index) => { const answer = fmt(mean(values)); result.push(q("DP02", index + 1, "mean", index < 2 ? 1 : 2, "Repartir el total por igual", `¿Cuál es la media de ${values.join(", ")}?`, "Suma todos los valores y divide entre la cantidad de datos.", answer, [fmt(sum(values)), fmt(median(values)), fmt(mean(values) + 2)], { type: "balance-mean", values }, [`suma = ${sum(values)}`, `cantidad de datos = ${values.length}`, `media = ${sum(values)}/${values.length} = ${answer}`])); });

  [[2, 5, 9], [7, 1, 4, 10], [12, 6, 8, 20, 14], [3, 11, 7, 5, 9, 13]].forEach((values, index) => { const ordered = [...values].sort((a, b) => a - b), answer = fmt(median(values)); result.push(q("DP02", index + 5, "median", index < 2 ? 1 : 2, "Encontrar el centro ordenado", `¿Cuál es la mediana de ${values.join(", ")}?`, "Ordena los datos; si hay dos valores centrales, calcula su media.", answer, [fmt(mean(values)), fmt(ordered[0]), fmt(ordered[ordered.length - 1])], { type: "ordered", values }, [`orden: ${ordered.join(", ")}`, ordered.length % 2 ? `centro = ${answer}` : `centros = ${ordered[ordered.length / 2 - 1]} y ${ordered[ordered.length / 2]}`, `mediana = ${answer}`])); });

  [[2, 4, 4, 5, 7], [3, 3, 6, 6, 6, 8], [1, 2, 3, 4], [5, 7, 5, 8, 7, 5]].forEach((values, index) => { const answer = mode(values); result.push(q("DP02", index + 9, "mode", index < 2 ? 1 : 2, "Identificar el valor más frecuente", `¿Cuál es la moda de ${values.join(", ")}?`, "Cuenta cuántas veces aparece cada valor.", answer, [fmt(median(values)), fmt(mean(values)), answer === "No hay moda" ? "Todos son moda" : "No hay moda"], { type: "dotplot", values }, [`cuenta cada aparición`, `mayor frecuencia = ${Math.max(...values.map((value) => values.filter((item) => item === value).length))}`, `moda = ${answer}`])); });

  [[4, 9, 12, 6], [18, 7, 21, 15], [-3, 2, 5, -1], [30, 30, 30, 30]].forEach((values, index) => { const answer = Math.max(...values) - Math.min(...values); result.push(q("DP02", index + 13, "range", index < 2 ? 1 : 2, "Medir la amplitud", `¿Cuál es el rango de ${values.join(", ")}?`, "Rango significa máximo menos mínimo.", fmt(answer), [fmt(Math.max(...values)), fmt(Math.min(...values)), fmt(sum(values))], { type: "range", values }, [`máximo = ${Math.max(...values)}`, `mínimo = ${Math.min(...values)}`, `rango = ${answer}`])); });

  [
    { before: [8, 9, 9, 10, 10], outlier: 40, answer: "La media aumenta mucho más que la mediana" },
    { before: [20, 21, 22, 23, 24], outlier: 2, answer: "La media disminuye más que la mediana" },
    { before: [5, 5, 6, 6, 7], outlier: 7, answer: "Ninguna medida cambia de forma extrema" },
    { before: [12, 13, 14, 15, 16], outlier: 60, answer: "La mediana representa mejor el centro típico" },
  ].forEach((item, index) => { const after = [...item.before, item.outlier]; result.push(q("DP02", index + 17, "outlier", index < 2 ? 2 : 3, "Analizar un valor atípico", `Al conjunto ${item.before.join(", ")} se agrega ${item.outlier}. ¿Qué conclusión es más adecuada?`, "Compara media y mediana antes y después; la media utiliza todos los valores directamente.", item.answer, ["La mediana siempre cambia más", "Ambas medidas se vuelven iguales", "El nuevo valor no afecta ninguna medida"], { type: "before-after", before: item.before, after }, [`antes: media ${fmt(mean(item.before))}, mediana ${fmt(median(item.before))}`, `después: media ${fmt(mean(after))}, mediana ${fmt(median(after))}`, item.answer])); });

  [
    { a: [4, 5, 6], b: [1, 5, 9], answer: "Tienen la misma media, pero B tiene mayor rango" },
    { a: [8, 8, 8, 8], b: [6, 7, 9, 10], answer: "A no varía y B sí" },
    { a: [2, 4, 6, 8], b: [2, 3, 4, 8], answer: "Tienen el mismo rango, pero distinta media" },
    { a: [10, 11, 12], b: [20, 21, 22], answer: "Tienen igual variabilidad, pero distinto centro" },
  ].forEach((item, index) => result.push(q("DP02", index + 21, "distribution", index < 2 ? 2 : 3, "Comparar centro y dispersión", `Compara A: ${item.a.join(", ")} y B: ${item.b.join(", ")}.`, "No describas un conjunto con una sola medida: compara centro y variabilidad.", item.answer, ["Son exactamente iguales", "A siempre tiene mayor media y rango", "No se pueden comparar"], { type: "compare-distributions", a: item.a, b: item.b }, [`A: media ${fmt(mean(item.a))}, rango ${Math.max(...item.a) - Math.min(...item.a)}`, `B: media ${fmt(mean(item.b))}, rango ${Math.max(...item.b) - Math.min(...item.b)}`, item.answer])));
  return result;
}

function buildDP03() {
  const result = [];
  [
    ["Al lanzar un dado común, obtener un número del 1 al 6", "Seguro"],
    ["Al lanzar un dado común, obtener 9", "Imposible"],
    ["En una bolsa con 9 fichas azules y 1 roja, sacar azul", "Muy probable"],
    ["En una bolsa con 1 ficha verde y 9 amarillas, sacar verde", "Poco probable"],
  ].forEach(([event, answer], index) => result.push(q("DP03", index + 1, "probability-language", index < 2 ? 1 : 2, "Describir una posibilidad", `¿Cómo describirías este evento: ${event}?`, "Compara los resultados favorables con todos los resultados posibles.", answer, ["Imposible", "Poco probable", "Seguro"], { type: "probability-scale", label: event, position: answer }, [event, "compara casos favorables y posibles", `descripción = ${answer}`])));

  [
    { colors: { rojo: 3, azul: 5, verde: 2 }, target: "rojo", answer: "3/10" },
    { colors: { amarillo: 4, morado: 4 }, target: "morado", answer: "4/8" },
    { colors: { blanco: 1, negro: 6, gris: 3 }, target: "blanco", answer: "1/10" },
    { colors: { naranja: 5, celeste: 3, rosa: 2 }, target: "no naranja", answer: "5/10" },
  ].forEach((item, index) => { const total = sum(Object.values(item.colors)); const favorable = item.target.startsWith("no ") ? total - item.colors[item.target.slice(3)] : item.colors[item.target]; const targetText = item.target.startsWith("no ") ? `una ficha que no sea de color ${item.target.slice(3)}` : `una ficha de color ${item.target}`; result.push(q("DP03", index + 5, "simple-event", index < 2 ? 1 : 2, "Contar casos favorables", `Una bolsa contiene ${Object.entries(item.colors).map(([color, count]) => `${count} ${count === 1 ? "ficha" : "fichas"} de color ${color}`).join(", ")}. ¿Cuál es la probabilidad de sacar ${targetText}?`, "Probabilidad = casos favorables entre casos posibles.", item.answer, [fraction(total - favorable, total), fraction(favorable, Math.max(1, total - favorable)), fraction(total, favorable)], { type: "bag", colors: item.colors, target: item.target }, [`casos posibles = ${total}`, `casos favorables = ${favorable}`, `P = ${favorable}/${total}`])); });

  [
    ["lluvia", "0,3", "0,7"],
    ["ganar", "1/4", "3/4"],
    ["sacar rojo", "2/5", "3/5"],
    ["llegar tarde", "0,12", "0,88"],
  ].forEach(([event, probability, answer], index) => result.push(q("DP03", index + 9, "complement", index < 2 ? 1 : 2, "Completar hasta uno", `Si P(${event}) = ${probability}, ¿cuál es la probabilidad de que no ocurra?`, "Un evento y su complemento suman 1.", answer, [probability, "1", "0"], { type: "complement", event, probability }, [`P(evento) = ${probability}`, `P(no evento) = 1 − ${probability}`, `complemento = ${answer}`])));

  [
    { success: 18, trials: 30, event: "obtener cara", answer: "18/30" },
    { success: 12, trials: 50, event: "sacar azul", answer: "12/50" },
    { success: 42, trials: 60, event: "encestar", answer: "42/60" },
    { success: 9, trials: 20, event: "ganar", answer: "9/20" },
  ].forEach((item, index) => result.push(q("DP03", index + 13, "experimental", index < 2 ? 2 : 3, "Usar resultados observados", `En ${item.trials} intentos se registró ${item.event} ${item.success} veces. ¿Cuál es la probabilidad experimental?`, "Usa frecuencia observada entre número total de ensayos.", item.answer, [fraction(item.trials - item.success, item.trials), fraction(item.success, item.trials - item.success), fraction(item.trials, item.success)], { type: "experiment", success: item.success, trials: item.trials }, [`éxitos = ${item.success}`, `ensayos = ${item.trials}`, `P experimental = ${item.answer}`])));

  [
    { event: "obtener cara dos veces al lanzar dos monedas", favorable: 1, total: 4, answer: "1/4", branches: [["Cara", "Sello"], ["Cara", "Sello"]], favorableRoutes: [0], stages: ["2 × 2 = 4 resultados", "solo cara-cara es favorable", "P = 1/4"] },
    { event: "obtener un número par al lanzar un dado y luego rojo en una ruleta con dos sectores iguales, rojo y azul", favorable: 1, total: 4, answer: "1/4", branches: [["Par", "Impar"], ["Rojo", "Azul"]], favorableRoutes: [0], stages: ["P(par) = 1/2", "P(rojo) = 1/2", "1/2 × 1/2 = 1/4"] },
    { event: "obtener al menos una cara en dos monedas", favorable: 3, total: 4, answer: "3/4", branches: [["Cara", "Sello"], ["Cara", "Sello"]], favorableRoutes: [0, 1, 2], stages: ["resultados: CC, CS, SC, SS", "tres contienen cara", "P = 3/4"] },
    { event: "sacar dos fichas azules con reemplazo de una bolsa mitad azul", favorable: 1, total: 4, answer: "1/4", branches: [["Azul", "No azul"], ["Azul", "No azul"]], favorableRoutes: [0], stages: ["P(azul) = 1/2 cada vez", "los ensayos son independientes", "1/2 × 1/2 = 1/4"] },
  ].forEach((item, index) => {
    const routes = [
      `${item.branches[0][0]} + ${item.branches[1][0]}`,
      `${item.branches[0][0]} + ${item.branches[1][1]}`,
      `${item.branches[0][1]} + ${item.branches[1][0]}`,
      `${item.branches[0][1]} + ${item.branches[1][1]}`,
    ].map((label, routeIndex) => ({ label, favorable: item.favorableRoutes.includes(routeIndex) }));
    result.push(q("DP03", index + 17, "compound", index < 2 ? 2 : 3, "Combinar dos etapas", `¿Cuál es la probabilidad de ${item.event}?`, "Enumera los resultados o multiplica probabilidades cuando las etapas son independientes.", item.answer, [fraction(item.total - item.favorable, item.total), fraction(item.favorable, item.total * 2), "1/2"], { type: "tree", event: item.event, favorable: item.favorable, total: item.total, stages: item.branches, routes }, item.stages));
  });

  [
    { claim: "Una ruleta tiene 3 sectores rojos y 1 azul del mismo tamaño; ambos colores tienen la misma probabilidad.", answer: "No es justa: rojo tiene probabilidad 3/4", check: "cuenta sectores iguales" },
    { claim: "Una moneda cayó cara 7 veces seguidas; la próxima tiene que ser sello.", answer: "Es falso: la próxima sigue teniendo probabilidad 1/2", check: "los lanzamientos son independientes" },
    { claim: "En 20 lanzamientos salieron 14 caras; por eso la moneda necesariamente está cargada.", answer: "No basta: una muestra pequeña puede variar", check: "repite más ensayos antes de concluir" },
    { claim: "Un juego paga si sale 6 en un dado y cobra lo mismo si no sale 6.", answer: "No es justo: ganar ocurre 1/6 y perder 5/6", check: "compara todos los resultados posibles" },
  ].forEach((item, index) => result.push(q("DP03", index + 21, "fairness", index < 2 ? 2 : 3, "Cuestionar una conclusión", `${item.claim} ¿Cuál es la evaluación correcta?`, "Una conclusión probabilística debe respetar el espacio muestral y la independencia.", item.answer, ["La afirmación es correcta", "Todos los resultados dejan de ser aleatorios", "No se puede usar probabilidad"], { type: "audit", claim: item.claim, check: item.check }, [item.claim, item.check, item.answer])));
  return result;
}

const builders = [buildDP01, buildDP02, buildDP03];
export const DATA_SKILLS = DATA_SKILL_DEFINITIONS.map((skill, index) => ({ ...skill, questions: builders[index]() }));
export const DATA_QUESTIONS = DATA_SKILLS.flatMap((skill) => skill.questions);
