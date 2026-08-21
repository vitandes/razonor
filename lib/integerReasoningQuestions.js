const STEP_TITLES = ["Representa la situación", "Resuelve con orden", "Comprueba el resultado"];

function q(id, family, level, title, prompt, hint, answer, choices, visual, models) {
  return {
    id, family, level, title, prompt, hint, answer, visual,
    options: choices.map((value) => ({
      value,
      feedback: value === answer ? null : `Revisa la representación: ${models[0]}. Después continúa con ${models[1]}.`,
    })),
    success: `${models[2]}. La respuesta conserva el sentido del signo y la magnitud.`,
    steps: models.map((equation, index) => ({
      eyebrow: `Paso ${index + 1} · ${index === 0 ? "interpreta" : index === 1 ? "calcula" : "verifica"}`,
      title: STEP_TITLES[index],
      equation,
      text: index === 0 ? hint : index === 1 ? "Haz una sola decisión y conserva el signo de cada número." : `El resultado esperado es ${answer}.`,
    })),
  };
}

export const INTEGER_LINE_FAMILIES = [
  { id: "opposites", label: "Signo, cero y números opuestos", short: "Signo y opuestos" },
  { id: "integer-compare", label: "Comparación y orden de enteros", short: "Comparar" },
  { id: "integer-location", label: "Ubicación en la recta numérica", short: "Ubicar" },
  { id: "absolute-value", label: "Valor absoluto", short: "Valor absoluto" },
  { id: "integer-context", label: "Enteros en contexto", short: "Contextos" },
  { id: "integer-distance", label: "Distancia entre enteros", short: "Distancia" },
];

const no04 = [
  q("NO04-N1-01", "opposites", 1, "El reflejo de siete", "¿Cuál es el opuesto de 7?", "Los opuestos están a igual distancia de cero, en lados distintos.", "−7", ["−7", "0", "7", "1/7"], { type: "number-line", min: -7, max: 7, points: [-7, 7], label: "Dos puntos reflejados alrededor de cero" }, ["7 está a 7 unidades de 0", "refleja 7 al otro lado", "opuesto de 7 = −7"]),
  q("NO04-N1-02", "opposites", 1, "El opuesto de un negativo", "¿Cuál es el opuesto de −12?", "Cambia el lado de la recta, no la distancia al cero.", "12", ["−12", "−1/12", "0", "12"], { type: "compare", values: ["−12", "0", "12"], signs: ["←", "→"] }, ["−12 está a la izquierda de 0", "conserva la distancia 12", "opuesto de −12 = 12"]),
  q("NO04-N1-03", "opposites", 1, "Un caso especial", "¿Cuál es el opuesto de 0?", "Busca otro número que esté a la misma distancia de cero.", "0", ["−1", "0", "1", "No existe"], { type: "number-line", min: -4, max: 4, points: [0], label: "El cero coincide con su reflejo" }, ["distancia de 0 a 0 = 0", "su reflejo no cambia de lugar", "opuesto de 0 = 0"]),
  q("NO04-N2-04", "opposites", 2, "Reconocer una pareja", "¿Qué pareja está formada por números opuestos?", "Deben tener igual valor absoluto y signos contrarios.", "−9 y 9", ["−9 y 9", "−9 y −9", "0 y 9", "8 y 9"], { type: "compare", values: ["−9", "0", "9"], signs: ["↔", "↔"] }, ["|−9| = |9|", "los signos son contrarios", "−9 y 9 son opuestos"]),

  q("NO04-N1-05", "integer-compare", 1, "Positivo frente a negativo", "¿Cuál número es mayor: −3 o 2?", "El número más a la derecha en la recta es el mayor.", "2", ["−3", "−2", "2", "Son iguales"], { type: "number-line", min: -5, max: 5, points: [-3, 2] }, ["−3 queda a la izquierda de 0", "2 queda a la derecha de 0", "2 > −3"]),
  q("NO04-N2-06", "integer-compare", 2, "Dos números negativos", "Completa: −8 ___ −5.", "Entre negativos, el que está más cerca de cero es mayor.", "<", ["<", ">", "=", "No se puede comparar"], { type: "compare", values: ["−8", "−5"], signs: ["?"] }, ["−8 está más a la izquierda", "−5 está más cerca de 0", "−8 < −5"]),
  q("NO04-N2-07", "integer-compare", 2, "Orden ascendente", "¿Qué lista va de menor a mayor?", "Recorre la recta desde la izquierda hacia la derecha.", "−6, −1, 0, 4", ["−6, −1, 0, 4", "4, 0, −1, −6", "−1, −6, 0, 4", "−6, 0, −1, 4"], { type: "number-line", min: -6, max: 4, points: [-6, -1, 0, 4], label: "Lee los puntos de izquierda a derecha" }, ["primero aparece −6", "después −1, 0 y 4", "−6 < −1 < 0 < 4"]),
  q("NO04-N3-08", "integer-compare", 3, "Mayor aunque parezca pequeño", "¿Cuál es el mayor de −14, −2, −9 y −20?", "No compares solo las cifras; ubica cada número respecto de cero.", "−2", ["−20", "−14", "−9", "−2"], { type: "compare", values: ["−20", "−14", "−9", "−2"], signs: ["<", "<", "<"] }, ["todos están a la izquierda de 0", "−2 es el más cercano a 0", "−2 es el mayor"]),

  q("NO04-N1-09", "integer-location", 1, "Cinco pasos a la izquierda", "¿Qué número está 5 unidades a la izquierda de 0?", "Moverse a la izquierda desde cero produce un entero negativo.", "−5", ["−5", "0", "5", "10"], { type: "number-line", min: -6, max: 6, start: 0, end: -5, move: "Desde 0, avanza 5 unidades hacia la izquierda." }, ["inicio = 0", "0 − 5 = −5", "el punto final es −5"]),
  q("NO04-N1-10", "integer-location", 1, "Desde un punto negativo", "Empiezas en −4 y avanzas 3 unidades a la derecha. ¿Dónde terminas?", "Cada paso a la derecha aumenta una unidad.", "−1", ["−7", "−1", "1", "7"], { type: "number-line", min: -7, max: 3, start: -4, end: -1, move: "−4 → −3 → −2 → −1" }, ["inicio = −4", "avanza +3", "−4 + 3 = −1"]),
  q("NO04-N2-11", "integer-location", 2, "Un punto entre dos enteros", "¿Qué entero queda exactamente entre −6 y 2?", "La distancia desde el punto medio debe ser igual hacia ambos extremos.", "−2", ["−4", "−2", "0", "4"], { type: "number-line", min: -6, max: 2, points: [-6, -2, 2], label: "Busca el punto medio" }, ["distancia total = 8", "la mitad de 8 es 4", "−6 + 4 = −2"]),
  q("NO04-N3-12", "integer-location", 3, "Coordenada desconocida", "Un punto está 7 unidades a la izquierda de 3. ¿Cuál es su coordenada?", "Partir de 3 y moverse a la izquierda equivale a restar 7.", "−4", ["−10", "−4", "4", "10"], { type: "number-line", min: -5, max: 4, start: 3, end: -4, move: "Desde 3, resta 7 unidades." }, ["inicio = 3", "3 − 7", "3 − 7 = −4"]),

  q("NO04-N1-13", "absolute-value", 1, "Distancia al cero", "¿Cuánto vale |−9|?", "El valor absoluto mide distancia y por eso no es negativo.", "9", ["−9", "0", "9", "18"], { type: "distance", a: -9, b: 0 }, ["−9 está a 9 unidades de 0", "la distancia es positiva", "|−9| = 9"]),
  q("NO04-N1-14", "absolute-value", 1, "Dos distancias iguales", "¿Qué afirmación es correcta?", "Compara la distancia de cada número al cero.", "|−6| = |6|", ["|−6| < |6|", "|−6| = |6|", "|−6| > |6|", "|−6| = −6"], { type: "number-line", min: -6, max: 6, points: [-6, 0, 6], label: "Misma distancia, lados distintos" }, ["distancia de −6 a 0 = 6", "distancia de 6 a 0 = 6", "|−6| = |6|"]),
  q("NO04-N2-15", "absolute-value", 2, "Dos soluciones posibles", "Si |x| = 4, ¿qué valores puede tener x?", "Hay un punto a cada lado del cero con distancia cuatro.", "−4 y 4", ["Solo −4", "Solo 4", "−4 y 4", "0 y 4"], { type: "number-line", min: -5, max: 5, points: [-4, 4], label: "Dos puntos a cuatro unidades de cero" }, ["distancia pedida = 4", "busca ambos lados de 0", "x = −4 o x = 4"]),
  q("NO04-N3-16", "absolute-value", 3, "Comparar magnitudes", "¿Cuál expresión tiene el valor mayor?", "Calcula primero cada valor absoluto.", "|−11|", ["|−11|", "|8|", "|−6|", "|3|"], { type: "compare", values: ["|−11|", "|8|", "|−6|", "|3|"] }, ["11, 8, 6 y 3 son las distancias", "11 es la mayor distancia", "|−11| = 11"]),

  q("NO04-N1-17", "integer-context", 1, "Temperatura bajo cero", "Una temperatura de 6 °C bajo cero se representa como…", "La expresión bajo cero indica un signo negativo.", "−6 °C", ["−6 °C", "0 °C", "6 °C", "12 °C"], { type: "story", labels: ["nivel 0 °C", "6 grados abajo"] }, ["referencia = 0 °C", "bajar 6 = −6", "temperatura = −6 °C"]),
  q("NO04-N1-18", "integer-context", 1, "Altura respecto al mar", "Un buzo está 18 m bajo el nivel del mar. ¿Qué entero describe su posición?", "Usa cero para el nivel del mar y negativo para posiciones inferiores.", "−18", ["−18", "−1", "18", "36"], { type: "story", labels: ["nivel del mar: 0", "buzo: 18 m abajo"] }, ["referencia = 0", "posición inferior = negativa", "coordenada = −18"]),
  q("NO04-N2-19", "integer-context", 2, "Saldo y deuda", "¿Cuál situación representa mejor −$35?", "Un saldo negativo significa que se debe dinero.", "Una deuda de $35", ["Un ahorro de $35", "Una deuda de $35", "Un ingreso de $35", "Una cuenta en cero"], { type: "story", labels: ["saldo 0", "35 por debajo"] }, ["cero = sin deuda", "saldo negativo = deuda", "−$35 representa deber $35"]),
  q("NO04-N2-20", "integer-context", 2, "Pisos de un edificio", "Si la planta baja es 0, ¿qué entero representa el tercer sótano?", "Los sótanos están debajo del nivel de referencia.", "−3", ["−3", "0", "3", "30"], { type: "number-line", min: -4, max: 4, start: 0, end: -3, label: "Pisos respecto a la planta baja" }, ["planta baja = 0", "tres niveles abajo", "tercer sótano = −3"]),

  q("NO04-N1-21", "integer-distance", 1, "Cruzar el cero", "¿Qué distancia hay entre −3 y 4?", "Cuenta las unidades desde −3 hasta cero y después hasta 4.", "7", ["1", "3", "7", "12"], { type: "distance", a: -3, b: 4 }, ["de −3 a 0 hay 3", "de 0 a 4 hay 4", "3 + 4 = 7"]),
  q("NO04-N2-22", "integer-distance", 2, "Dos puntos negativos", "¿Qué distancia hay entre −8 y −2?", "La distancia es la diferencia positiva entre las coordenadas.", "6", ["−10", "−6", "6", "10"], { type: "distance", a: -8, b: -2 }, ["resta las coordenadas", "|−8 − (−2)| = |−6|", "distancia = 6"]),
  q("NO04-N2-23", "integer-distance", 2, "Extremos simétricos", "¿Qué distancia separa −12 de 12?", "Cada extremo está a doce unidades del cero.", "24", ["0", "12", "24", "144"], { type: "distance", a: -12, b: 12 }, ["de −12 a 0 hay 12", "de 0 a 12 hay 12", "12 + 12 = 24"]),
  q("NO04-N3-24", "integer-distance", 3, "Encontrar el otro extremo", "Un punto está en −5 y otro queda 9 unidades a su derecha. ¿Cuál es el segundo punto?", "Moverse a la derecha equivale a sumar la distancia.", "4", ["−14", "−4", "4", "14"], { type: "number-line", min: -6, max: 5, start: -5, end: 4, move: "Suma 9 a la coordenada inicial." }, ["inicio = −5", "−5 + 9", "segundo punto = 4"]),
];

export const INTEGER_OPERATION_FAMILIES = [
  { id: "integer-add", label: "Suma de enteros", short: "Sumar" },
  { id: "integer-subtract", label: "Resta de enteros", short: "Restar" },
  { id: "integer-product", label: "Multiplicación y división de enteros", short: "× y ÷" },
  { id: "integer-mixed", label: "Operaciones combinadas con enteros", short: "Combinar" },
  { id: "integer-problems", label: "Problemas con cambios enteros", short: "Problemas" },
  { id: "integer-errors", label: "Estimación y análisis de errores", short: "Comprobar" },
];

const no05 = [
  q("NO05-N1-01", "integer-add", 1, "Avanzar desde un negativo", "Calcula −4 + 9.", "Empieza en −4 y avanza nueve unidades a la derecha.", "5", ["−13", "−5", "5", "13"], { type: "number-line", min: -5, max: 6, start: -4, end: 5, move: "−4 + 9: nueve pasos a la derecha." }, ["inicio = −4", "avanza +9", "−4 + 9 = 5"]),
  q("NO05-N1-02", "integer-add", 1, "Dos cambios negativos", "¿Cuánto es −6 + (−3)?", "Dos sumandos negativos mueven en la misma dirección.", "−9", ["−9", "−3", "3", "9"], { type: "number-line", min: -10, max: 2, start: -6, end: -9, move: "Desde −6, avanza 3 más hacia la izquierda." }, ["inicio = −6", "suma −3", "−6 + (−3) = −9"]),
  q("NO05-N2-03", "integer-add", 2, "Signos diferentes", "Calcula 15 + (−22).", "Compara las magnitudes 15 y 22; domina la mayor.", "−7", ["−37", "−7", "7", "37"], { type: "expression", parts: ["15 + (−22)", "22 − 15", "signo de −22"], note: "Con signos diferentes, resta magnitudes y conserva el signo de la mayor." }, ["|−22| > |15|", "22 − 15 = 7", "15 + (−22) = −7"]),
  q("NO05-N3-04", "integer-add", 3, "Tres sumandos", "¿Cuánto es −8 + 13 + (−6)?", "Puedes reunir primero los términos negativos.", "−1", ["−27", "−1", "1", "11"], { type: "expression", parts: ["−8 + (−6)", "−14 + 13", "?"], note: "Agrupar sumandos no cambia su valor." }, ["−8 + (−6) = −14", "−14 + 13 = −1", "resultado = −1"]),

  q("NO05-N1-05", "integer-subtract", 1, "Quitar un positivo", "Calcula 7 − 10.", "Restar diez mueve diez unidades a la izquierda.", "−3", ["−17", "−3", "3", "17"], { type: "number-line", min: -4, max: 8, start: 7, end: -3, move: "Desde 7, retrocede 10 unidades." }, ["inicio = 7", "movimiento = −10", "7 − 10 = −3"]),
  q("NO05-N1-06", "integer-subtract", 1, "Restar un negativo", "¿Cuánto es 5 − (−4)?", "Restar un negativo equivale a sumar su opuesto.", "9", ["−9", "1", "9", "20"], { type: "expression", parts: ["5 − (−4)", "5 + 4", "?"], note: "Dos signos consecutivos representan operaciones distintas." }, ["opuesto de −4 = 4", "5 + 4", "5 − (−4) = 9"]),
  q("NO05-N2-07", "integer-subtract", 2, "Negativo menos positivo", "Calcula −3 − 8.", "Desde −3, restar ocho significa avanzar a la izquierda.", "−11", ["−11", "−5", "5", "11"], { type: "number-line", min: -12, max: 1, start: -3, end: -11, move: "−3 − 8: ocho pasos a la izquierda." }, ["inicio = −3", "movimiento = −8", "−3 − 8 = −11"]),
  q("NO05-N2-08", "integer-subtract", 2, "Negativo menos negativo", "¿Cuánto es −12 − (−7)?", "Convierte la resta del negativo en suma de siete.", "−5", ["−19", "−5", "5", "19"], { type: "expression", parts: ["−12 − (−7)", "−12 + 7", "?"], note: "Restar un número es sumar su opuesto." }, ["opuesto de −7 = 7", "−12 + 7", "resultado = −5"]),

  q("NO05-N1-09", "integer-product", 1, "Producto con signos distintos", "Calcula −6 × 4.", "Signos diferentes producen un producto negativo.", "−24", ["−24", "−10", "10", "24"], { type: "expression", parts: ["signos: − × +", "6 × 4 = 24", "?"], note: "Decide el signo y la magnitud por separado." }, ["− × + = −", "6 × 4 = 24", "−6 × 4 = −24"]),
  q("NO05-N1-10", "integer-product", 1, "Dos negativos", "¿Cuánto es (−7) × (−3)?", "Dos signos negativos producen un producto positivo.", "21", ["−21", "−10", "10", "21"], { type: "expression", parts: ["signos: − × −", "7 × 3 = 21", "?"], note: "Dos cambios de sentido recuperan el sentido positivo." }, ["− × − = +", "7 × 3 = 21", "producto = 21"]),
  q("NO05-N2-11", "integer-product", 2, "División con signo", "Calcula −56 ÷ 8.", "Signos diferentes producen un cociente negativo.", "−7", ["−8", "−7", "7", "8"], { type: "expression", parts: ["signos: − ÷ +", "56 ÷ 8 = 7", "?"], note: "Comprueba multiplicando cociente por divisor." }, ["− ÷ + = −", "56 ÷ 8 = 7", "−56 ÷ 8 = −7"]),
  q("NO05-N2-12", "integer-product", 2, "Cociente positivo", "¿Cuánto es (−72) ÷ (−9)?", "Dos signos iguales producen un cociente positivo.", "8", ["−8", "−7", "7", "8"], { type: "expression", parts: ["signos: − ÷ −", "72 ÷ 9 = 8", "?"], note: "La comprobación es 8 × (−9) = −72." }, ["− ÷ − = +", "72 ÷ 9 = 8", "cociente = 8"]),

  q("NO05-N2-13", "integer-mixed", 2, "Dos operaciones", "Calcula −5 + 3 × 4.", "La multiplicación se resuelve antes que la suma.", "7", ["−8", "7", "−7", "28"], { type: "expression", parts: ["3 × 4", "−5 + 12", "?"], note: "La jerarquía evita leer la expresión solo de izquierda a derecha." }, ["3 × 4 = 12", "−5 + 12 = 7", "resultado = 7"]),
  q("NO05-N2-14", "integer-mixed", 2, "Paréntesis primero", "¿Cuánto es (−8 + 3) × 2?", "Resuelve primero el cambio dentro del paréntesis.", "−10", ["−13", "−10", "−2", "10"], { type: "expression", parts: ["−8 + 3", "−5 × 2", "?"], note: "El paréntesis forma una sola cantidad antes de multiplicar." }, ["−8 + 3 = −5", "−5 × 2 = −10", "resultado = −10"]),
  q("NO05-N3-15", "integer-mixed", 3, "Producto y resta", "Calcula 18 ÷ (−3) − 5.", "Primero divide; después resta cinco.", "−11", ["−11", "−1", "1", "11"], { type: "expression", parts: ["18 ÷ (−3)", "−6 − 5", "?"], note: "Conserva el signo del cociente en el segundo paso." }, ["18 ÷ (−3) = −6", "−6 − 5 = −11", "resultado = −11"]),
  q("NO05-N3-16", "integer-mixed", 3, "Tres decisiones", "¿Cuánto es −24 ÷ 6 + 2 × (−3)?", "Resuelve división y multiplicación antes de sumar.", "−10", ["−18", "−10", "2", "10"], { type: "expression", parts: ["−24 ÷ 6 = −4", "2 × (−3) = −6", "−4 + (−6)"], note: "Las dos operaciones de mayor prioridad pueden resolverse por separado." }, ["−24 ÷ 6 = −4", "2 × (−3) = −6", "−4 + (−6) = −10"]),

  q("NO05-N1-17", "integer-problems", 1, "Temperatura que sube", "La temperatura está en −5 °C y sube 9 grados. ¿Cuál es la nueva temperatura?", "Subir representa sumar un cambio positivo.", "4 °C", ["−14 °C", "−4 °C", "4 °C", "14 °C"], { type: "story", labels: ["inicio: −5 °C", "cambio: +9 °C"] }, ["inicio = −5", "−5 + 9", "temperatura final = 4 °C"]),
  q("NO05-N2-18", "integer-problems", 2, "Ascensor entre pisos", "Un ascensor está en el piso 4, baja 9 pisos y luego sube 2. ¿Dónde termina?", "Representa bajar con signo negativo y subir con positivo.", "−3", ["−7", "−3", "3", "15"], { type: "story", labels: ["piso 4", "−9 pisos", "+2 pisos"] }, ["4 − 9 = −5", "−5 + 2 = −3", "piso final = −3"]),
  q("NO05-N2-19", "integer-problems", 2, "Saldo después de un pago", "Una cuenta tiene saldo de −$28 y recibe un pago de $45. ¿Cuál es el nuevo saldo?", "El pago aumenta el saldo.", "$17", ["−$73", "−$17", "$17", "$73"], { type: "story", labels: ["saldo: −$28", "pago: +$45"] }, ["−28 + 45", "45 − 28 = 17", "saldo nuevo = $17"]),
  q("NO05-N3-20", "integer-problems", 3, "Cambio de altitud", "Un dron está a 12 m, desciende 20 m y luego asciende 5 m. ¿A qué altura queda?", "Cada cambio se suma con su signo.", "−3 m", ["−13 m", "−3 m", "3 m", "37 m"], { type: "story", labels: ["12 m", "−20 m", "+5 m"] }, ["12 − 20 = −8", "−8 + 5 = −3", "altura final = −3 m"]),

  q("NO05-N1-21", "integer-errors", 1, "Un signo ignorado", "Ana escribió −7 + (−4) = −3. ¿Qué resultado corrige su cálculo?", "Ambos cambios van hacia la izquierda.", "−11", ["−11", "−3", "3", "11"], { type: "error", claim: "−7 + (−4) = −3", check: "suma las magnitudes y conserva el signo negativo" }, ["ambos sumandos son negativos", "7 + 4 = 11", "resultado correcto = −11"]),
  q("NO05-N2-22", "integer-errors", 2, "Restar no siempre disminuye", "Luis afirma que 6 − (−8) debe ser menor que 6. ¿Cuál es el resultado real?", "Restar un negativo equivale a sumar.", "14", ["−14", "−2", "2", "14"], { type: "error", claim: "6 − (−8) < 6", check: "transforma la resta en 6 + 8" }, ["opuesto de −8 = 8", "6 + 8 = 14", "6 − (−8) = 14"]),
  q("NO05-N2-23", "integer-errors", 2, "Regla de signos incompleta", "Alguien calculó (−5) × (−6) = −30. ¿Cuál es la corrección?", "Signos iguales producen un producto positivo.", "30", ["−30", "−11", "11", "30"], { type: "error", claim: "(−5) × (−6) = −30", check: "dos signos negativos producen positivo" }, ["− × − = +", "5 × 6 = 30", "producto correcto = 30"]),
  q("NO05-N3-24", "integer-errors", 3, "Comprobar por magnitud", "¿Qué resultado es imposible para −9 + 4?", "El movimiento de cuatro unidades no puede cruzar el cero desde −9.", "5", ["−13", "−5", "5", "−9"], { type: "number-line", min: -10, max: 2, start: -9, end: -5, move: "Desde −9, cuatro pasos a la derecha terminan en −5." }, ["inicio = −9", "−9 + 4 = −5", "5 es imposible para esa suma"]),
];

export const ORDER_OPERATION_FAMILIES = [
  { id: "grouping", label: "Agrupación y paréntesis", short: "Paréntesis" },
  { id: "multiply-first", label: "Multiplicación y división primero", short: "× y ÷ primero" },
  { id: "left-to-right", label: "Operaciones de igual prioridad", short: "Izquierda a derecha" },
  { id: "order-mixed", label: "Jerarquía completa", short: "Jerarquía" },
  { id: "missing-grouping", label: "Construcción de expresiones", short: "Construir" },
  { id: "order-errors", label: "Análisis de procedimientos", short: "Detectar errores" },
];

const no06 = [
  q("NO06-N1-01", "grouping", 1, "El paréntesis cambia todo", "Calcula (6 + 4) × 3.", "Resuelve primero lo que está agrupado.", "30", ["18", "22", "30", "42"], { type: "expression", parts: ["(6 + 4)", "10 × 3", "?"], note: "El paréntesis convierte 6 + 4 en una sola cantidad." }, ["6 + 4 = 10", "10 × 3 = 30", "resultado = 30"]),
  q("NO06-N1-02", "grouping", 1, "Dividir después de agrupar", "¿Cuánto es 36 ÷ (8 − 2)?", "El divisor completo está dentro del paréntesis.", "6", ["3", "6", "10", "16"], { type: "expression", parts: ["(8 − 2)", "36 ÷ 6", "?"], note: "No dividas entre 8 antes de resolver la agrupación." }, ["8 − 2 = 6", "36 ÷ 6 = 6", "resultado = 6"]),
  q("NO06-N2-03", "grouping", 2, "Dos grupos", "Calcula (15 − 7) + (3 × 4).", "Resuelve cada paréntesis de forma independiente.", "20", ["8", "12", "20", "32"], { type: "expression", parts: ["15 − 7 = 8", "3 × 4 = 12", "8 + 12"], note: "Los dos grupos producen cantidades que luego se suman." }, ["primer grupo = 8", "segundo grupo = 12", "8 + 12 = 20"]),
  q("NO06-N3-04", "grouping", 3, "Paréntesis anidados", "¿Cuánto es 4 × [9 − (2 + 3)]?", "Comienza por la agrupación más interna.", "16", ["4", "16", "20", "28"], { type: "expression", parts: ["2 + 3 = 5", "9 − 5 = 4", "4 × 4"], note: "Trabaja desde el interior hacia el exterior." }, ["2 + 3 = 5", "9 − 5 = 4", "4 × 4 = 16"]),

  q("NO06-N1-05", "multiply-first", 1, "Multiplicar antes de sumar", "Calcula 5 + 3 × 4.", "La multiplicación tiene prioridad sobre la suma.", "17", ["17", "20", "32", "60"], { type: "expression", parts: ["3 × 4", "5 + 12", "?"], note: "No resuelvas 5 + 3 primero porque no está agrupado." }, ["3 × 4 = 12", "5 + 12 = 17", "resultado = 17"]),
  q("NO06-N1-06", "multiply-first", 1, "Dividir antes de restar", "¿Cuánto es 20 − 12 ÷ 3?", "La división se resuelve antes que la resta.", "16", ["8/3", "4", "16", "24"], { type: "expression", parts: ["12 ÷ 3", "20 − 4", "?"], note: "El cociente forma el término que se resta." }, ["12 ÷ 3 = 4", "20 − 4 = 16", "resultado = 16"]),
  q("NO06-N2-07", "multiply-first", 2, "Dos productos", "Calcula 2 × 7 + 3 × 5.", "Resuelve ambos productos antes de sumarlos.", "29", ["24", "29", "35", "49"], { type: "expression", parts: ["2 × 7 = 14", "3 × 5 = 15", "14 + 15"], note: "Las multiplicaciones tienen la misma prioridad." }, ["primer producto = 14", "segundo producto = 15", "14 + 15 = 29"]),
  q("NO06-N2-08", "multiply-first", 2, "División y producto", "¿Cuánto es 48 ÷ 6 + 4 × 3?", "Calcula división y multiplicación antes de sumar.", "20", ["14", "20", "28", "36"], { type: "expression", parts: ["48 ÷ 6 = 8", "4 × 3 = 12", "8 + 12"], note: "Las dos operaciones prioritarias pueden resolverse por separado." }, ["48 ÷ 6 = 8", "4 × 3 = 12", "8 + 12 = 20"]),

  q("NO06-N1-09", "left-to-right", 1, "Sumar y restar en orden", "Calcula 18 − 7 + 4.", "Suma y resta tienen la misma prioridad: avanza de izquierda a derecha.", "15", ["7", "11", "15", "19"], { type: "expression", parts: ["18 − 7", "11 + 4", "?"], note: "No se hace siempre la suma antes que la resta." }, ["18 − 7 = 11", "11 + 4 = 15", "resultado = 15"]),
  q("NO06-N1-10", "left-to-right", 1, "Dividir y multiplicar en orden", "¿Cuánto es 24 ÷ 6 × 5?", "División y multiplicación tienen igual prioridad.", "20", ["0,8", "4", "20", "120"], { type: "expression", parts: ["24 ÷ 6", "4 × 5", "?"], note: "Resuelve de izquierda a derecha, no la multiplicación primero." }, ["24 ÷ 6 = 4", "4 × 5 = 20", "resultado = 20"]),
  q("NO06-N2-11", "left-to-right", 2, "Cadena de cocientes", "Calcula 72 ÷ 9 ÷ 2.", "Las divisiones consecutivas se resuelven de izquierda a derecha.", "4", ["1", "4", "16", "36"], { type: "expression", parts: ["72 ÷ 9", "8 ÷ 2", "?"], note: "Agrupar 9 ÷ 2 cambiaría la expresión." }, ["72 ÷ 9 = 8", "8 ÷ 2 = 4", "resultado = 4"]),
  q("NO06-N2-12", "left-to-right", 2, "Tres cambios aditivos", "¿Cuánto es 30 − 12 − 5 + 2?", "Avanza de izquierda a derecha porque todas tienen la misma prioridad.", "15", ["11", "15", "21", "25"], { type: "expression", parts: ["30 − 12 = 18", "18 − 5 = 13", "13 + 2"], note: "Conserva el resultado parcial en cada paso." }, ["30 − 12 = 18", "18 − 5 = 13", "13 + 2 = 15"]),

  q("NO06-N2-13", "order-mixed", 2, "Jerarquía completa", "Calcula 7 + 2 × (9 − 5).", "Paréntesis, multiplicación y suma: en ese orden.", "15", ["15", "28", "36", "45"], { type: "expression", parts: ["9 − 5 = 4", "2 × 4 = 8", "7 + 8"], note: "Cada paso elimina un nivel de la jerarquía." }, ["9 − 5 = 4", "2 × 4 = 8", "7 + 8 = 15"]),
  q("NO06-N2-14", "order-mixed", 2, "Potencia antes del producto", "¿Cuánto es 3 + 2² × 5?", "Calcula la potencia antes de multiplicar.", "23", ["23", "25", "35", "100"], { type: "expression", parts: ["2² = 4", "4 × 5 = 20", "3 + 20"], note: "Las potencias se resuelven antes que ×, ÷, + y −." }, ["2² = 4", "4 × 5 = 20", "3 + 20 = 23"]),
  q("NO06-N3-15", "order-mixed", 3, "Dos niveles de prioridad", "Calcula 40 ÷ (3 + 2) + 6 × 2.", "Resuelve primero el paréntesis; después división y producto.", "20", ["10", "16", "20", "28"], { type: "expression", parts: ["3 + 2 = 5", "40 ÷ 5 = 8; 6 × 2 = 12", "8 + 12"], note: "Las operaciones del mismo nivel pueden resolverse antes de la suma final." }, ["3 + 2 = 5", "8 y 12 son los términos", "8 + 12 = 20"]),
  q("NO06-N3-16", "order-mixed", 3, "Expresión con exponente", "¿Cuánto es 5 × [2³ − (6 ÷ 3)]?", "Resuelve la potencia y el paréntesis interior antes de restar.", "30", ["10", "20", "30", "70"], { type: "expression", parts: ["2³ = 8; 6 ÷ 3 = 2", "8 − 2 = 6", "5 × 6"], note: "Simplifica el corchete antes del producto exterior." }, ["los valores internos son 8 y 2", "8 − 2 = 6", "5 × 6 = 30"]),

  q("NO06-N2-17", "missing-grouping", 2, "Obtener veintiocho", "¿Dónde deben ir los paréntesis para que 4 + 3 × 4 sea igual a 28?", "Necesitas sumar antes de multiplicar.", "(4 + 3) × 4", ["4 + (3 × 4)", "(4 + 3) × 4", "4 + 3 × (4)", "4 + (3 + 4)"], { type: "expression", parts: ["objetivo: 28", "28 = 7 × 4", "7 = 4 + 3"], note: "Los paréntesis cambian la operación que se ejecuta primero." }, ["28 se forma como 7 × 4", "agrupa 4 + 3", "(4 + 3) × 4 = 28"]),
  q("NO06-N2-18", "missing-grouping", 2, "Obtener cinco", "¿Qué expresión vale 5?", "Compara el efecto de agrupar la suma en el divisor.", "30 ÷ (4 + 2)", ["30 ÷ 4 + 2", "30 ÷ (4 + 2)", "(30 ÷ 4) + 2", "30 ÷ 4 × 2"], { type: "expression", parts: ["objetivo: 5", "30 ÷ 6 = 5", "6 = 4 + 2"], note: "El divisor debe ser todo el grupo 4 + 2." }, ["busca divisor 6", "4 + 2 = 6", "30 ÷ (4 + 2) = 5"]),
  q("NO06-N3-19", "missing-grouping", 3, "Traducir una instrucción", "¿Qué expresión representa «resta 5 del doble de 9»?", "Primero se obtiene el doble de nueve y luego se resta cinco.", "2 × 9 − 5", ["2 × (9 − 5)", "2 × 9 − 5", "9 − 5 × 2", "5 − 2 × 9"], { type: "expression", parts: ["doble de 9", "2 × 9", "18 − 5"], note: "La estructura de la frase decide qué cantidad cambia." }, ["doble de 9 = 2 × 9", "después resta 5", "expresión = 2 × 9 − 5"]),
  q("NO06-N3-20", "missing-grouping", 3, "Dos grupos equivalentes", "¿Qué expresión representa «la mitad de la suma de 14 y 6»?", "La suma completa debe dividirse entre dos.", "(14 + 6) ÷ 2", ["14 + 6 ÷ 2", "(14 + 6) ÷ 2", "14 ÷ 2 + 6", "14 + (6 ÷ 2)"], { type: "expression", parts: ["suma: 14 + 6", "total: 20", "mitad: 20 ÷ 2"], note: "Agrupa la suma para tomar la mitad del total." }, ["14 + 6 = 20", "divide el total entre 2", "(14 + 6) ÷ 2 = 10"]),

  q("NO06-N1-21", "order-errors", 1, "Leer solo de izquierda a derecha", "Sofía calculó 8 + 2 × 5 = 50. ¿Cuál es el resultado correcto?", "La multiplicación debe resolverse antes de sumar.", "18", ["18", "40", "50", "80"], { type: "error", claim: "8 + 2 × 5 = 50", check: "calcula 2 × 5 antes de sumar 8" }, ["2 × 5 = 10", "8 + 10 = 18", "resultado correcto = 18"]),
  q("NO06-N2-22", "order-errors", 2, "Inventar una prioridad", "Tomás resolvió 24 ÷ 6 × 2 como 24 ÷ 12. ¿Cuál es el resultado correcto?", "División y multiplicación tienen igual prioridad.", "8", ["2", "4", "8", "12"], { type: "error", claim: "24 ÷ 6 × 2 = 24 ÷ 12", check: "avanza de izquierda a derecha" }, ["24 ÷ 6 = 4", "4 × 2 = 8", "resultado correcto = 8"]),
  q("NO06-N2-23", "order-errors", 2, "Ignorar la agrupación", "Alguien escribió 18 ÷ (3 + 3) = 9. ¿Cuál es la corrección?", "El paréntesis completo forma el divisor.", "3", ["1", "3", "6", "9"], { type: "error", claim: "18 ÷ (3 + 3) = 9", check: "resuelve primero 3 + 3" }, ["3 + 3 = 6", "18 ÷ 6 = 3", "resultado correcto = 3"]),
  q("NO06-N3-24", "order-errors", 3, "Auditar un procedimiento", "Para 4 + 3² × 2, ¿cuál es el primer paso correcto?", "La potencia tiene la mayor prioridad.", "Calcular 3²", ["Sumar 4 + 3", "Calcular 3²", "Multiplicar 3 × 2", "Multiplicar 4 × 3"], { type: "error", claim: "primer paso: 4 + 3", check: "localiza primero la potencia" }, ["identifica 3²", "3² = 9", "el primer paso es calcular 3²"]),
];

function labelQuestions(questions, families, skillId, skillLabel) {
  return questions.map((item, index) => ({
    ...item,
    number: index + 1,
    skillId,
    skillLabel,
    familyLabel: families.find((family) => family.id === item.family)?.label || item.family,
  }));
}

export const INTEGER_LINE_QUESTIONS = labelQuestions(no04, INTEGER_LINE_FAMILIES, "NO04", "Enteros y recta numérica");
export const INTEGER_OPERATION_QUESTIONS = labelQuestions(no05, INTEGER_OPERATION_FAMILIES, "NO05", "Operaciones con enteros");
export const ORDER_OPERATION_QUESTIONS = labelQuestions(no06, ORDER_OPERATION_FAMILIES, "NO06", "Orden de operaciones");
