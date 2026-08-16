export const DIAGNOSTIC_SKILLS = {
  math: { label: "Matemáticas", short: "Matemáticas", color: "bg-teal", icon: "🧮" },
  logic: { label: "Lógica", short: "Lógica", color: "bg-grape", icon: "🧠" },
  problemSolving: { label: "Resolución de problemas", short: "Problemas", color: "bg-honey", icon: "🔎" },
  spatialReasoning: { label: "Razonamiento espacial", short: "Espacial", color: "bg-coral", icon: "🧭" },
};

// Banco inicial separado de la UI. El mismo contrato servirá luego para las
// sesiones diarias y para reemplazar las reglas por un motor adaptativo.
const QUESTIONS = [
  q("m1", "math", [6, 8], 1, "¿Cuánto es 8 + 5?", ["11", "12", "13", "14"], "13", "Junta 8 y 5: obtienes 13."),
  q("m2", "math", [6, 8], 1, "¿Qué número es mayor?", ["27", "72", "22", "17"], "72", "72 tiene 7 decenas; los demás tienen menos."),
  q("m3", "math", [6, 8], 2, "Tienes 18 fichas y regalas 7. ¿Cuántas quedan?", ["9", "10", "11", "12"], "11", "18 − 7 = 11."),
  q("l1", "logic", [6, 8], 1, "Completa la secuencia: 2, 4, 6, __", ["7", "8", "9", "10"], "8", "La secuencia aumenta de 2 en 2."),
  q("l2", "logic", [6, 8], 1, "¿Cuál no pertenece al grupo?", ["Perro", "Gato", "Mesa", "Conejo"], "Mesa", "Los otros tres son animales."),
  q("l3", "logic", [6, 8], 2, "Si todas las estrellas son amarillas y esto es una estrella, ¿de qué color es?", ["Azul", "Amarilla", "Verde", "No se sabe"], "Amarilla", "La regla dice que todas las estrellas son amarillas."),
  q("p1", "problemSolving", [6, 8], 1, "En una caja hay 9 lápices. Ana pone 4 más. ¿Qué operación ayuda a saber cuántos hay?", ["9 + 4", "9 − 4", "9 × 4", "9 ÷ 4"], "9 + 4", "Como llegan más lápices, debemos sumar."),
  q("p2", "problemSolving", [6, 8], 2, "Hay 3 bolsas con 4 canicas cada una. ¿Cuántas canicas hay?", ["7", "10", "12", "14"], "12", "Son 3 grupos de 4: 4 + 4 + 4 = 12."),
  q("p3", "problemSolving", [6, 8], 2, "Sara tiene 15 pegatinas. Regala 3 y luego gana 2. ¿Cuántas tiene?", ["10", "12", "14", "20"], "14", "15 − 3 + 2 = 14."),
  q("s1", "spatialReasoning", [6, 8], 1, "Miras hacia arriba ↑ y giras a la derecha. ¿Hacia dónde miras?", ["←", "→", "↑", "↓"], "→", "Al girar a la derecha desde arriba quedas mirando a la derecha."),
  q("s2", "spatialReasoning", [6, 8], 1, "¿Qué figura tiene exactamente 3 lados?", ["Círculo", "Cuadrado", "Triángulo", "Rectángulo"], "Triángulo", "Un triángulo tiene tres lados."),
  q("s3", "spatialReasoning", [6, 8], 2, "El libro está debajo de la lámpara. ¿Dónde está la lámpara respecto al libro?", ["Debajo", "Encima", "Dentro", "A la izquierda"], "Encima", "Si el libro está debajo, la lámpara está encima."),

  q("m4", "math", [9, 12], 2, "¿Cuánto es 7 × 8?", ["48", "54", "56", "64"], "56", "7 grupos de 8 suman 56."),
  q("m5", "math", [9, 12], 2, "¿Qué fracción equivale a la mitad?", ["1/3", "2/4", "3/4", "2/3"], "2/4", "Dos de cuatro partes iguales representan la mitad."),
  q("m6", "math", [9, 12], 3, "Un libro cuesta $24 y tiene 25% de descuento. ¿Cuánto se descuenta?", ["$4", "$6", "$8", "$12"], "$6", "25% es la cuarta parte; 24 ÷ 4 = 6."),
  q("l4", "logic", [9, 12], 2, "Completa: 3, 6, 12, 24, __", ["30", "36", "42", "48"], "48", "Cada número es el doble del anterior."),
  q("l5", "logic", [9, 12], 2, "Pájaro es a nido como abeja es a…", ["Flor", "Miel", "Colmena", "Ala"], "Colmena", "El nido y la colmena son los hogares de esos animales."),
  q("l6", "logic", [9, 12], 3, "Nora llegó antes que Luis. Luis llegó antes que Eva. ¿Quién llegó de último?", ["Nora", "Luis", "Eva", "No se sabe"], "Eva", "El orden es Nora, Luis y después Eva."),
  q("p4", "problemSolving", [9, 12], 2, "Hay 4 corrales con 6 gallinas cada uno. Si salen 5, ¿cuántas quedan?", ["19", "20", "24", "29"], "19", "4 × 6 = 24; luego 24 − 5 = 19."),
  q("p5", "problemSolving", [9, 12], 3, "Un bus lleva 36 personas. Bajan 8 y suben 5. ¿Cuántas quedan?", ["23", "31", "33", "49"], "33", "36 − 8 + 5 = 33."),
  q("p6", "problemSolving", [9, 12], 3, "Para una receta se usan 3 huevos por torta. ¿Cuántos huevos hacen falta para 5 tortas?", ["8", "12", "15", "18"], "15", "5 grupos de 3 huevos son 15."),
  q("s4", "spatialReasoning", [9, 12], 2, "Una flecha → gira 180°. ¿Cómo queda?", ["↑", "↓", "←", "→"], "←", "Un giro de 180° apunta en la dirección contraria."),
  q("s5", "spatialReasoning", [9, 12], 2, "Estás mirando al norte. Giras a la derecha dos veces. ¿Hacia dónde miras?", ["Norte", "Sur", "Este", "Oeste"], "Sur", "Dos giros a la derecha equivalen a media vuelta."),
  q("s6", "spatialReasoning", [9, 12], 3, "Un cubo tiene 6 caras. Si ves 3 a la vez, ¿cuántas quedan ocultas?", ["2", "3", "4", "6"], "3", "6 caras en total menos 3 visibles dejan 3 ocultas."),
];

function q(id, skill, age, difficulty, question, options, correctAnswer, explanation) {
  return { id, category: skill, skill, age, difficulty, question, options, correctAnswer, explanation };
}

export function getDiagnosticExercises(age = 9) {
  const numericAge = Math.min(12, Math.max(6, Number(age) || 9));
  return QUESTIONS.filter((question) => numericAge >= question.age[0] && numericAge <= question.age[1]);
}

export function scoreDiagnostic(exercises, answers) {
  const totals = {};
  const correct = {};
  for (const exercise of exercises) {
    totals[exercise.skill] = (totals[exercise.skill] || 0) + 1;
    if (answers[exercise.id] === exercise.correctAnswer) {
      correct[exercise.skill] = (correct[exercise.skill] || 0) + 1;
    }
  }
  return Object.keys(DIAGNOSTIC_SKILLS).reduce((scores, skill) => {
    scores[skill] = Math.round(((correct[skill] || 0) / Math.max(1, totals[skill] || 0)) * 100);
    return scores;
  }, {});
}

export function diagnosticInsight(scores, name = "Tu hijo") {
  const entries = Object.entries(scores || {});
  if (!entries.length) return `${name} está listo para descubrir su punto de partida.`;
  const strongest = [...entries].sort((a, b) => b[1] - a[1])[0][0];
  const opportunity = [...entries].sort((a, b) => a[1] - b[1])[0][0];
  return `${name} muestra una buena base en ${DIAGNOSTIC_SKILLS[strongest].label.toLowerCase()}. Su principal oportunidad está en ${DIAGNOSTIC_SKILLS[opportunity].label.toLowerCase()}; trabajaremos esa habilidad con actividades cortas y progresivas.`;
}

export function lowestSkill(scores = {}) {
  return Object.entries(scores).sort((a, b) => a[1] - b[1])[0]?.[0] || "problemSolving";
}
