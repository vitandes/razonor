// Retos de la demo pública por tema (sin login y sin el niño). Cada tema tiene
// 4 retos que siguen una historia: el error común → su posible raíz → un
// problema nuevo → una situación real. Cada opción incorrecta lleva su propia
// explicación del error, que es lo que demuestra el valor del producto. Es una
// muestra: NO estima el nivel del estudiante (eso lo hace el diagnóstico real).
//
// Visuales: split (barra que se parte), grid (cuadrícula de 100), dots (puntos
// que se agrupan), bars (barras de fracción antes/después) y balance (ecuación
// como balanza). Ver components/demo/DemoExperience.jsx.

// ---------- Porcentajes (el caso de la landing: "20% de 80") ----------

const PORCENTAJES_RETOS = [
  {
    id: "porcentaje",
    role: "El error común",
    skill: "Porcentaje de una cantidad",
    prompt: "¿Cuánto es 20% de 80?",
    hint: "Piensa qué significa “20 de cada 100”.",
    visual: { type: "split", total: "80", parts: 5, take: 1, partLabel: "16" },
    answer: "16",
    options: [
      { value: "20", feedback: "Copiaste el 20. Pero 20% no son 20 unidades: son 20 de cada 100." },
      { value: "16" },
      { value: "60", feedback: "Restaste 80 − 20. El porcentaje no se resta: indica qué parte del total tomar." },
      { value: "4", feedback: "Dividiste 80 ÷ 20. Eso cuenta cuántas veces cabe 20 en 80, no qué parte es el 20%." },
    ],
    success: "20% es 20/100, que vale lo mismo que 1/5. Y 1/5 de 80 es 16.",
    steps: [
      { title: "Traduce el porcentaje", equation: "20% = 20/100", text: "“Por ciento” significa “de cada 100”." },
      { title: "Busca una fracción más simple", equation: "20/100 = 1/5", text: "Dividir arriba y abajo entre 20 no cambia el valor." },
      { title: "Aplícala al total", equation: "80 ÷ 5 = 16", text: "1/5 de 80 es una de cinco partes iguales." },
    ],
    bridge: "¿Viste el paso 2? Reconocer que dos fracciones valen lo mismo (20/100 = 1/5) es la base. Si no está firme, el porcentaje falla aunque se “sepa la regla”. Comprobémosla con otros números.",
  },
  {
    // Números distintos al reto 1 a propósito: su explicación ya mostró
    // 20/100 = 1/5, así que repetirlos no comprobaría nada.
    id: "equivalencia",
    role: "La posible raíz",
    skill: "Equivalencia de fracciones",
    prompt: "Otra cuadrícula: 40 de sus 100 cuadritos están pintados, o sea 40/100. ¿Qué fracción es equivalente?",
    hint: "Busca una fracción con menos partes que ocupe el mismo espacio.",
    visual: {
      type: "grid",
      paintedCols: 4,
      before: "40 de 100 cuadritos pintados = 40/100",
      after: "5 franjas iguales: lo pintado ocupa 2 de 5 = 2/5",
    },
    answer: "2/5",
    options: [
      { value: "2/10", feedback: "Dividiste arriba entre 20 y abajo entre 10. Para no cambiar el valor hay que dividir los dos por el mismo número." },
      { value: "5/2", feedback: "Pusiste la fracción al revés: 100/40 = 5/2, que es más de un entero. Y lo pintado es menos de la mitad de la cuadrícula." },
      { value: "2/5" },
      { value: "10/70", feedback: "Restaste 30 arriba y abajo. Sumar o restar lo mismo cambia el valor; multiplicar o dividir por lo mismo, no." },
    ],
    success: "40/100 = 2/5. Si agrupas la cuadrícula en 5 franjas iguales, lo pintado ocupa exactamente dos.",
    steps: [
      { title: "Mira el mismo espacio", equation: "40/100 = ?", text: "Lo pintado no cambia; solo cambia en cuántas partes divides la unidad." },
      { title: "Divide arriba y abajo por lo mismo", equation: "40 ÷ 20 = 2   ·   100 ÷ 20 = 5", text: "Por eso 40/100 se convierte en 2/5." },
      { title: "Comprueba con otros nombres", equation: "2/5 = 0,4 = 40%", text: "Tres formas de escribir la misma cantidad." },
    ],
    bridge: "Ahora veamos si la idea se transfiere a un problema nuevo, sin porcentajes.",
  },
  {
    id: "fraccion-de",
    role: "Un problema nuevo",
    skill: "Fracción de una cantidad",
    prompt: "En un curso hay 20 estudiantes y 3/4 de ellos van en bus. ¿Cuántos van en bus?",
    hint: "Primero reparte en partes iguales; después toma las que pide.",
    visual: { type: "dots", total: 20, groups: 4, take: 3 },
    answer: "15",
    options: [
      { value: "15" },
      { value: "5", feedback: "Encontraste 1/4 de 20 (20 ÷ 4 = 5). Faltó tomar 3 de esas partes: 3 × 5." },
      { value: "60", feedback: "Multiplicaste 20 × 3 sin repartir. El 4 indica en cuántas partes iguales dividir primero." },
      { value: "17", feedback: "Restaste 20 − 3. El 3/4 no quita 3 estudiantes: toma 3 de cada 4." },
    ],
    success: "20 ÷ 4 = 5 estudiantes por grupo, y 3 grupos son 15.",
    steps: [
      { title: "Reparte en 4 grupos iguales", equation: "20 ÷ 4 = 5", text: "El denominador (el número de abajo) dice en cuántas partes dividir." },
      { title: "Toma 3 grupos", equation: "3 × 5 = 15", text: "El numerador (el de arriba) dice cuántas partes tomar." },
      { title: "Comprueba", equation: "15/20 = 3/4", text: "15 de 20 es lo mismo que 3 de cada 4." },
    ],
    bridge: "Último reto: la misma idea en una situación de la vida real.",
  },
  {
    id: "descuento",
    role: "La vida real",
    skill: "Porcentaje en contexto",
    prompt: "Unos tenis cuestan $120.000 y tienen 25% de descuento. ¿Cuánto te descuentan?",
    hint: "¿A qué fracción simple equivale 25%?",
    visual: { type: "split", total: "$120.000", parts: 4, take: 1, partLabel: "$30.000" },
    answer: "$30.000",
    options: [
      { value: "$25.000", feedback: "Tomaste el 25% como si fueran $25.000. Pero 25% son 25 de cada 100: un cuarto del precio." },
      { value: "$90.000", feedback: "Calculaste el precio final ($120.000 − $30.000). ¡Ibas bien! Pero la pregunta es cuánto te descuentan: eso es el 25%." },
      { value: "$4.800", feedback: "Dividiste entre 25. El 25% equivale a 1/4, así que se divide entre 4." },
      { value: "$30.000" },
    ],
    success: "25% = 25/100 = 1/4, y un cuarto de $120.000 es $30.000.",
    steps: [
      { title: "Traduce el porcentaje", equation: "25% = 25/100", text: "25 de cada 100." },
      { title: "Simplifica", equation: "25/100 = 1/4", text: "Arriba y abajo entre 25." },
      { title: "Aplica al precio", equation: "$120.000 ÷ 4 = $30.000", text: "Un cuarto del precio es el descuento." },
    ],
  },
];

// Qué recomendaría la ruta según los errores (de la raíz hacia la aplicación).
// Con una pregunta por habilidad no se puede afirmar dominio: los textos
// hablan de "esta muestra", nunca de un nivel del estudiante.
const PORCENTAJES_FOCUS = [
  {
    id: "equivalencia",
    when: (ok) => !ok.equivalencia,
    title: "Equivalencia de fracciones",
    text: "Reconocer que dos fracciones valen lo mismo —como 40/100 y 2/5— es la base que sostiene los porcentajes. Si no está firme, el porcentaje falla aunque se sepa la regla. La ruta la comprobaría y reforzaría antes de volver a porcentajes.",
  },
  {
    id: "fraccion-de",
    when: (ok) => !ok["fraccion-de"],
    title: "Fracción de una cantidad",
    text: "La equivalencia salió bien en esta muestra, pero falta llevarla a cantidades: repartir en partes iguales y después tomar las que se piden. Es el puente hacia los porcentajes.",
  },
  {
    id: "porcentajes",
    when: (ok) => !ok.porcentaje || !ok.descuento,
    title: "Traducir porcentajes a fracciones",
    text: "Las fracciones salieron bien en esta muestra; la ruta practicaría pasar de “25%” a 1/4 en situaciones reales, como descuentos.",
  },
];

// ---------- Fracciones (el caso de la pizza: "1/3 es más que 1/2") ----------

const FRACCIONES_RETOS = [
  {
    id: "comparar-unitarias",
    role: "El error común",
    skill: "Comparar fracciones",
    prompt: "Sofía dice que 1/3 de pizza es más que 1/2 porque 3 es mayor que 2. Si las dos porciones son de la misma pizza, ¿cuál es más pizza?",
    hint: "Piensa en qué indica el número de abajo.",
    visual: {
      type: "bars",
      before: [{ label: "1/3 de pizza" }, { label: "1/2 de pizza" }],
      after: [
        { label: "1/3 de pizza", parts: 3, take: 1 },
        { label: "1/2 de pizza", parts: 2, take: 1 },
      ],
      captionBefore: "La misma pizza, dos porciones",
      captionAfter: "Cortada en 3, cada trozo es más pequeño que cortada en 2",
    },
    answer: "1/2",
    options: [
      { value: "1/3", feedback: "Comparaste el 3 con el 2 como si fueran números enteros. Pero el de abajo dice en cuántas partes se corta: en 3 partes, cada una es más pequeña que en 2." },
      { value: "1/2" },
      { value: "Son iguales", feedback: "Las dos son “una parte”, pero no del mismo tamaño: cortar en 3 deja trozos más pequeños que cortar en 2." },
      { value: "No se puede saber", feedback: "Como es la misma pizza, sí se puede: 1/2 es la mitad, y 1/3 es menos que la mitad." },
    ],
    success: "1/2 es la mitad de la pizza; 1/3 es una de tres partes, más pequeña. Mientras más partes, más pequeño cada trozo.",
    steps: [
      { title: "Mira el número de abajo", equation: "1/3 → 3 partes   ·   1/2 → 2 partes", text: "El denominador dice en cuántas partes iguales se corta la pizza." },
      { title: "Más partes, trozos más pequeños", equation: "1/3 < 1/2", text: "Repartir la misma pizza en más partes deja menos para cada una." },
      { title: "Compruébalo con trozos iguales", equation: "1/2 = 3/6   ·   1/3 = 2/6", text: "En sextos: 3 trozos ganan a 2." },
    ],
    bridge: "¿Viste el paso 3? Para comparar, pasamos a trozos del mismo tamaño: fracciones equivalentes. Esa es la base. Comprobémosla.",
  },
  {
    id: "equivalentes",
    role: "La posible raíz",
    skill: "Fracciones equivalentes",
    prompt: "¿Qué fracción representa la misma cantidad de pizza que 2/3?",
    hint: "Imagina que cortas cada trozo en partes más pequeñas.",
    visual: {
      type: "bars",
      before: [{ label: "2/3", parts: 3, take: 2 }],
      after: [
        { label: "2/3", parts: 3, take: 2 },
        { label: "4/6", parts: 6, take: 4 },
      ],
      captionBefore: "2 de 3 trozos iguales",
      captionAfter: "Cada tercio cortado en 2: 4 de 6 trozos, la misma cantidad",
    },
    answer: "4/6",
    options: [
      { value: "3/4", feedback: "Sumaste 1 arriba y abajo. Sumar lo mismo cambia el valor; multiplicar arriba y abajo por lo mismo, no." },
      { value: "2/6", feedback: "Multiplicaste solo el de abajo. Así los trozos se achican pero no tomas más: 2/6 es menos que 2/3." },
      { value: "4/6" },
      { value: "4/3", feedback: "Multiplicaste solo el de arriba. 4/3 es más de una pizza entera, y 2/3 es menos de una." },
    ],
    success: "2/3 = 4/6: si cortas cada tercio en 2, tienes 6 trozos y 4 son tuyos. La misma cantidad de pizza.",
    steps: [
      { title: "Corta cada trozo en 2", equation: "3 × 2 = 6 trozos", text: "Ahora la pizza tiene 6 trozos más pequeños." },
      { title: "Lo que tenías también se duplica", equation: "2 × 2 = 4 trozos", text: "Tus 2 trozos se volvieron 4 trozos más pequeños." },
      { title: "Mismo valor, otro nombre", equation: "2/3 = 4/6", text: "Multiplicar arriba y abajo por lo mismo no cambia la cantidad." },
    ],
    bridge: "Ahora usemos esa idea para comparar dos fracciones que no son tan obvias.",
  },
  {
    id: "comparar",
    role: "Un problema nuevo",
    skill: "Comparar con distinto denominador",
    prompt: "¿Qué es mayor: 2/3 o 3/4?",
    hint: "Pásalas a trozos del mismo tamaño antes de comparar.",
    visual: {
      type: "bars",
      before: [{ label: "2/3" }, { label: "3/4" }],
      after: [
        { label: "2/3 = 8/12", parts: 3, take: 2 },
        { label: "3/4 = 9/12", parts: 4, take: 3 },
      ],
      captionBefore: "Dos fracciones de la misma unidad",
      captionAfter: "En doceavos: 8/12 contra 9/12",
    },
    answer: "3/4",
    options: [
      { value: "2/3", feedback: "Se ven parecidas, pero hay que comparar con trozos iguales: 2/3 = 8/12 y 3/4 = 9/12. Gana 3/4." },
      { value: "Son iguales", feedback: "A las dos les falta “una parte” para el entero, pero no la misma: a 2/3 le falta 1/3 y a 3/4 solo 1/4, que es más pequeño." },
      { value: "No se puede comparar", feedback: "Sí se puede: con un denominador común (12) quedan 8/12 y 9/12." },
      { value: "3/4" },
    ],
    success: "2/3 = 8/12 y 3/4 = 9/12. Con trozos iguales, 9 gana a 8.",
    steps: [
      { title: "Busca trozos del mismo tamaño", equation: "3 × 4 = 12", text: "Los doceavos sirven para las dos fracciones." },
      { title: "Convierte las dos", equation: "2/3 = 8/12   ·   3/4 = 9/12", text: "Multiplica arriba y abajo por el mismo número." },
      { title: "Ahora sí, compara", equation: "9/12 > 8/12", text: "Con trozos iguales, gana la que tiene más." },
    ],
    bridge: "Último reto: sumar porciones de pizza, donde este mismo error es muy común.",
  },
  {
    id: "sumar",
    role: "La vida real",
    skill: "Sumar fracciones",
    prompt: "Ana se come 1/2 de una pizza y Luis 1/4 de la misma pizza. ¿Cuánta pizza se comieron entre los dos?",
    hint: "Antes de sumar, los trozos tienen que ser del mismo tamaño.",
    visual: {
      type: "bars",
      before: [
        { label: "Ana: 1/2", parts: 2, take: 1 },
        { label: "Luis: 1/4", parts: 4, take: 1, colors: ["honey"] },
      ],
      after: [
        { label: "Ana: 1/2 = 2/4", parts: 4, take: 2 },
        { label: "Luis: 1/4", parts: 4, take: 1, colors: ["honey"] },
        { label: "Juntos: 3/4", parts: 4, take: 3, colors: ["grape", "grape", "honey"] },
      ],
      captionBefore: "Trozos de distinto tamaño",
      captionAfter: "En cuartos: 2/4 + 1/4 = 3/4",
    },
    answer: "3/4",
    options: [
      { value: "3/4" },
      { value: "2/6", feedback: "Sumaste arriba con arriba y abajo con abajo. ¡Daría 2/6, menos de lo que comió Ana sola (1/2)! Primero hay que tener trozos del mismo tamaño." },
      { value: "2/4", feedback: "Sumaste 1 + 1 trozos, pero no eran del mismo tamaño: 1/2 son 2 cuartos. Entonces 2/4 + 1/4 = 3/4." },
      { value: "1/8", feedback: "Multiplicaste. “Entre los dos” es juntar, o sea sumar: 1/2 + 1/4." },
    ],
    success: "1/2 = 2/4, y 2/4 + 1/4 = 3/4. Se comieron tres cuartos de la pizza.",
    steps: [
      { title: "Trozos del mismo tamaño", equation: "1/2 = 2/4", text: "La mitad de Ana son 2 cuartos." },
      { title: "Ahora sí, suma", equation: "2/4 + 1/4 = 3/4", text: "Con el mismo denominador se suman los de arriba." },
      { title: "Comprueba si tiene sentido", equation: "3/4 < 1", text: "No se comieron la pizza entera: es razonable." },
    ],
  },
];

const FRACCIONES_FOCUS = [
  {
    id: "equivalentes",
    when: (ok) => !ok.equivalentes,
    title: "Fracciones equivalentes",
    text: "Reconocer que 2/3 y 4/6 son la misma cantidad es la base para comparar y sumar fracciones. Si no está firme, se comparan los números de abajo como si fueran enteros. La ruta la reforzaría primero.",
  },
  {
    id: "comparar",
    when: (ok) => !ok["comparar-unitarias"] || !ok.comparar,
    title: "Comparar fracciones",
    text: "La equivalencia salió bien en esta muestra, pero falta usarla para comparar: pasar a trozos del mismo tamaño antes de decidir cuál es mayor.",
  },
  {
    id: "sumar",
    when: (ok) => !ok.sumar,
    title: "Sumar con distinto denominador",
    text: "Comparar salió bien en esta muestra; la ruta practicaría sumar con trozos del mismo tamaño, sin sumar los números de abajo.",
  },
];

// ---------- Primeras ecuaciones (el caso de "x + 5 = 12 → 17") ----------

const ECUACIONES_RETOS = [
  {
    id: "suma-inversa",
    role: "El error común",
    skill: "Ecuaciones con suma",
    prompt: "Resuelve: x + 5 = 12. ¿Cuánto vale x?",
    hint: "¿Qué número más 5 da 12?",
    visual: { type: "balance", left: "x + 5", right: "12", solvedLeft: "x", solvedRight: "7" },
    answer: "7",
    options: [
      { value: "17", feedback: "Sumaste 5 a 12. Pero el 5 ya está dentro de los 12: para dejar sola la x hay que quitarlo de los dos lados, 12 − 5." },
      { value: "7" },
      { value: "12", feedback: "12 es el total con el 5 incluido. La x es lo que le falta al 5 para llegar a 12." },
      { value: "60", feedback: "Multiplicaste 5 × 12. La ecuación suma: busca qué número más 5 da 12." },
    ],
    success: "x = 7, porque 7 + 5 = 12.",
    steps: [
      { title: "Piensa en una balanza", equation: "x + 5 = 12", text: "Los dos lados pesan lo mismo." },
      { title: "Quita 5 de los dos lados", equation: "x + 5 − 5 = 12 − 5", text: "Lo que haces en un lado, lo haces en el otro." },
      { title: "Comprueba", equation: "7 + 5 = 12 ✓", text: "Reemplaza la x y mira si se cumple." },
    ],
    bridge: "La base es la operación inversa: deshacer lo que le hicieron a la x. Comprobémosla con una multiplicación.",
  },
  {
    id: "multiplicacion-inversa",
    role: "La posible raíz",
    skill: "Operaciones inversas",
    prompt: "Resuelve: 3x = 18. ¿Cuánto vale x?",
    hint: "3x significa 3 veces x.",
    visual: { type: "balance", left: "3x", right: "18", solvedLeft: "x", solvedRight: "6" },
    answer: "6",
    options: [
      { value: "15", feedback: "Restaste 3. Pero 3x es 3 × x: lo inverso de multiplicar por 3 es dividir entre 3." },
      { value: "54", feedback: "Multiplicaste 18 × 3. Para deshacer “por 3” se divide: 18 ÷ 3." },
      { value: "6" },
      { value: "21", feedback: "Sumaste 3. Pero 3x no es 3 + x: es 3 × x." },
    ],
    success: "x = 6, porque 3 × 6 = 18.",
    steps: [
      { title: "Lee 3x como 3 × x", equation: "3x = 3 × x", text: "El número pegado a la x la multiplica." },
      { title: "Haz lo inverso en los dos lados", equation: "18 ÷ 3 = 6", text: "Deshacer “por 3” es dividir entre 3." },
      { title: "Comprueba", equation: "3 × 6 = 18 ✓", text: "Reemplaza la x y mira si se cumple." },
    ],
    bridge: "Ahora una ecuación de dos pasos, donde hay que deshacer en orden.",
  },
  {
    id: "dos-pasos",
    role: "Un problema nuevo",
    skill: "Ecuaciones de dos pasos",
    prompt: "Resuelve: 2x + 3 = 11. ¿Cuánto vale x?",
    hint: "Primero deshaz la suma; después, la multiplicación.",
    visual: { type: "balance", left: "2x + 3", right: "11", solvedLeft: "x", solvedRight: "4" },
    answer: "4",
    options: [
      { value: "8", feedback: "Quitaste el 3 (11 − 3 = 8) y eso estaba bien, pero quedó 2x = 8. Falta dividir entre 2." },
      { value: "7", feedback: "Sumaste 3 a 11. Para deshacer “+ 3” hay que restar: 11 − 3 = 8, y luego 8 ÷ 2." },
      { value: "6", feedback: "Restaste el 2. Pero 2x es 2 × x: después de quitar el 3, se divide entre 2." },
      { value: "4" },
    ],
    success: "x = 4, porque 2 × 4 + 3 = 11.",
    steps: [
      { title: "Deshaz primero la suma", equation: "2x + 3 − 3 = 11 − 3", text: "Queda 2x = 8." },
      { title: "Luego deshaz la multiplicación", equation: "8 ÷ 2 = 4", text: "2x = 8 significa 2 × x = 8." },
      { title: "Comprueba", equation: "2 × 4 + 3 = 11 ✓", text: "Reemplaza la x en la ecuación original." },
    ],
    bridge: "Último reto: la misma idea en una situación real.",
  },
  {
    id: "plantear",
    role: "La vida real",
    skill: "Plantear y resolver",
    prompt: "Un taxi cobra $4.000 por subirte y $2.000 por cada kilómetro. Pagaste $14.000. ¿Cuántos kilómetros recorriste?",
    hint: "Primero quita lo que cuesta subirte.",
    visual: { type: "balance", left: "4.000 + 2.000x", right: "14.000", solvedLeft: "x", solvedRight: "5 km" },
    answer: "5 km",
    options: [
      { value: "5 km" },
      { value: "7 km", feedback: "Dividiste $14.000 entre $2.000, pero ahí también están los $4.000 de subirte. Primero quítalos: 14.000 − 4.000." },
      { value: "9 km", feedback: "Sumaste los $4.000. Ese cobro ya está dentro de los $14.000: hay que restarlo." },
      { value: "10 km", feedback: "Quitaste los $4.000 y quedaron $10.000, ¡bien! Pero cada kilómetro cuesta $2.000: 10.000 ÷ 2.000." },
    ],
    success: "4.000 + 2.000x = 14.000 → 2.000x = 10.000 → x = 5 km.",
    steps: [
      { title: "Escribe la ecuación", equation: "4.000 + 2.000x = 14.000", text: "x es la cantidad de kilómetros." },
      { title: "Quita el cobro de subirte", equation: "14.000 − 4.000 = 10.000", text: "Eso es lo que costaron los kilómetros." },
      { title: "Reparte por kilómetro", equation: "10.000 ÷ 2.000 = 5", text: "Comprueba: 4.000 + 5 × 2.000 = 14.000 ✓" },
    ],
  },
];

const ECUACIONES_FOCUS = [
  {
    id: "inversas",
    when: (ok) => !ok["suma-inversa"] || !ok["multiplicacion-inversa"],
    title: "Operaciones inversas",
    text: "Para despejar la x hay que deshacer lo que le hicieron: una suma se deshace restando y una multiplicación, dividiendo. Es la base de todas las ecuaciones; la ruta la reforzaría primero.",
  },
  {
    id: "dos-pasos",
    when: (ok) => !ok["dos-pasos"],
    title: "Ecuaciones de dos pasos",
    text: "Las operaciones inversas salieron bien en esta muestra; falta aplicarlas en orden: primero se deshace la suma y después la multiplicación.",
  },
  {
    id: "plantear",
    when: (ok) => !ok.plantear,
    title: "Plantear la ecuación",
    text: "Resolver salió bien en esta muestra; la ruta practicaría convertir una situación real en una ecuación antes de resolverla.",
  },
];

// ---------- Temas publicados ----------

export const DEMO_TRACKS = {
  fracciones: {
    id: "fracciones",
    path: "/fracciones",
    label: "Fracciones",
    intro: "Empezamos con un error muy común —creer que 1/3 es más que 1/2 porque 3 es mayor que 2— y seguimos la pista hasta su posible raíz.",
    retos: FRACCIONES_RETOS,
    focus: FRACCIONES_FOCUS,
  },
  porcentajes: {
    id: "porcentajes",
    path: "/porcentajes",
    label: "Porcentajes",
    intro: "Empezamos con un error muy común —el 20% de 80— y seguimos la pista hasta su posible raíz.",
    retos: PORCENTAJES_RETOS,
    focus: PORCENTAJES_FOCUS,
  },
  ecuaciones: {
    id: "ecuaciones",
    path: "/ecuaciones",
    label: "Ecuaciones",
    intro: "Empezamos con un error muy común —resolver x + 5 = 12 sumando el 5— y seguimos la pista hasta su posible raíz.",
    retos: ECUACIONES_RETOS,
    focus: ECUACIONES_FOCUS,
  },
};

export const TRACK_IDS = Object.keys(DEMO_TRACKS);

// Qué recomendaría la ruta según los errores (la primera regla que aplica).
export function focusFor(track, results) {
  const ok = Object.fromEntries(results.map((result) => [result.id, result.correct]));
  return track.focus.find((rule) => rule.when(ok)) || null;
}
