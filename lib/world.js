// Mundo de Astuto: la historia de misterio y sus retos.
//
// Estructura: MUNDO → CAPÍTULOS → CASOS → RETOS.
//   - Un caso dura 3-5 min y tiene 4-6 retos.
//   - Cada reto usa una MECÁNICA (deducción, patrón, detectar el error, ordenar
//     los pasos, ingenio matemático) que entrena una HABILIDAD concreta.
//   - Los retos numéricos pueden variar por RUTA de edad (7-9 / 10-12) con
//     `byRoute`; el resto es compartido.
//
// Para agregar contenido: añade casos a `CHAPTERS[n].cases` y retos a `retos`.
// El motor (components/CaseSession.jsx) y el progreso (lib/progress.jsx) no
// necesitan cambios: leen esta estructura.

// --- Habilidades (reemplazan a literal/inferencial/crítico) ---
export const SKILLS = {
  deduccion: {
    name: "Deducción",
    color: "teal",
    desc: "Sacar conclusiones a partir de pistas.",
  },
  patrones: {
    name: "Patrones y secuencias",
    color: "grape",
    desc: "Descubrir la regla escondida detrás de números y figuras.",
  },
  comprension: {
    name: "Comprensión de lectura",
    color: "coral",
    desc: "Entender bien lo que se lee y notar lo que no encaja.",
  },
  computacional: {
    name: "Pensamiento computacional",
    color: "honey",
    desc: "Ordenar pasos e instrucciones en la secuencia correcta.",
  },
  matematico: {
    name: "Ingenio matemático",
    color: "teal",
    desc: "Usar los números para resolver, no para memorizar.",
  },
  criterio: {
    name: "Criterio frente a la IA",
    color: "grape",
    desc: "Dudar, verificar y pensar por sí mismo frente a lo que responde una máquina.",
  },
};

// Cada mecánica entrena una habilidad (1:1). "ia" = evaluar si una IA acierta.
export const MECHANIC_SKILL = {
  deduccion: "deduccion",
  patron: "patrones",
  error: "comprension",
  orden: "computacional",
  matematico: "matematico",
  ia: "criterio",
};

export const MECHANIC_LABEL = {
  deduccion: "Deducción",
  patron: "Patrones",
  error: "Detecta el error",
  orden: "Ordena los pasos",
  matematico: "Ingenio matemático",
  ia: "Criterio con la IA",
};

// --- Contenido: 1 mundo, capítulos, casos, retos ---
// Capítulo 1 está completo y jugable. Los demás son teasers bloqueados que se
// ven en el mapa ("próximamente"), para mostrar hacia dónde va la historia.
export const CHAPTERS = [
  {
    id: 1,
    title: "El robo en el Museo Astuto",
    emoji: "🏛️",
    locked: false,
    intro:
      "Anoche desapareció el Diamante Astuto, la joya más valiosa del museo. Tú eres el nuevo detective del caso. Sigue las pistas.",
    cases: [
      {
        id: "c1-noche",
        title: "La noche del robo",
        emoji: "🔦",
        minutes: 4,
        brief:
          "El diamante ya no está en su vitrina. Tres personas estaban en el museo esa noche. Empecemos por las primeras pistas.",
        retos: [
          {
            id: "c1n-r1",
            mechanic: "deduccion",
            prompt:
              "Tres personas trabajaban anoche. Solo UNA dice mentiras; las otras dos siempre dicen la verdad.",
            clues: [
              "Rosa (limpieza): “Yo no toqué la vitrina.”",
              "Beto (guardia): “Fue Rosa.”",
              "Cata (guía): “Beto está diciendo la verdad.”",
            ],
            question: "¿Quién tocó la vitrina del diamante?",
            options: ["Rosa", "Beto", "Cata"],
            answer: "Rosa",
            hint: "Si Rosa dijera la verdad, Beto y Cata estarían mintiendo los dos… y solo una persona miente.",
            explicacion:
              "Si Rosa fuera sincera, Beto y Cata mentirían a la vez, y solo miente una persona. Así que la mentirosa es Rosa: ella tocó la vitrina.",
          },
          {
            id: "c1n-r2",
            mechanic: "error",
            prompt:
              "Beto escribió su reporte de la ronda. Pero una frase se contradice con las demás.",
            clues: [
              "“Hice la ronda a las 10 de la noche.”",
              "“Todas las luces estaban apagadas y no vi a nadie.”",
              "“Vi claramente la cara del ladrón junto a la vitrina.”",
              "“Cerré con llave y me fui.”",
            ],
            question: "¿Cuál frase NO puede ser verdad?",
            options: [
              "“Vi claramente la cara del ladrón.”",
              "“Hice la ronda a las 10.”",
              "“Cerré con llave y me fui.”",
            ],
            answer: "“Vi claramente la cara del ladrón.”",
            hint: "Si todo estaba a oscuras y no vio a nadie, ¿podría a la vez haber visto una cara con claridad?",
            explicacion:
              "Dijo que todo estaba oscuro y que no vio a nadie; entonces no pudo ver “claramente” la cara del ladrón. Esa frase se contradice.",
          },
          {
            id: "c1n-r3",
            mechanic: "patron",
            prompt:
              "La alarma del museo se apaga con un código de colores que sigue un patrón.",
            clues: ["🔴 🔵 🔴 🔵 🔴 ❓"],
            question: "¿Qué color sigue?",
            options: ["🔴 rojo", "🔵 azul", "🟢 verde"],
            answer: "🔵 azul",
            hint: "Mira cómo se turnan los colores, uno y luego el otro.",
            explicacion:
              "El patrón alterna rojo y azul. Después de un rojo viene un azul.",
          },
          {
            id: "c1n-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt:
                  "El museo tiene 3 salas y en cada sala hay 4 cámaras de seguridad.",
                question: "¿Cuántas cámaras hay en total?",
                options: ["7", "12", "9"],
                answer: "12",
                hint: "En cada sala hay 4 cámaras y son 3 salas: suma 4 + 4 + 4.",
                explicacion: "3 salas × 4 cámaras = 12 cámaras en total.",
              },
              "10-12": {
                prompt:
                  "El museo tiene 6 salas y en cada sala hay 4 cámaras. Anoche 5 cámaras estaban dañadas.",
                question: "¿Cuántas cámaras funcionaban?",
                options: ["19", "24", "29"],
                answer: "19",
                hint: "Primero cuenta todas (6 × 4) y luego quita las 5 dañadas.",
                explicacion: "6 × 4 = 24 cámaras; menos 5 dañadas = 19 funcionando.",
              },
            },
          },
          {
            id: "c1n-r5",
            mechanic: "orden",
            prompt:
              "Las cámaras que sí grabaron muestran lo que hizo el ladrón, pero los momentos están en desorden.",
            question: "Ordena lo que pasó, del primero al último.",
            steps: [
              "Entró por la ventana del techo",
              "Apagó la alarma con el código",
              "Sacó el diamante de la vitrina",
              "Escapó por la puerta de atrás",
            ],
            hint: "Piensa: para robar el diamante, ¿qué tuvo que hacer primero, antes de siquiera acercarse?",
            explicacion:
              "Primero entró, luego apagó la alarma, después tomó el diamante y por último escapó.",
          },
        ],
      },
      {
        id: "c1-cifrado",
        title: "El mensaje cifrado",
        emoji: "🗝️",
        minutes: 5,
        brief:
          "El ladrón dejó una nota con símbolos y una caja fuerte escondida. Descífralo y sabrás quién fue.",
        retos: [
          {
            id: "c1c-r1",
            mechanic: "patron",
            prompt: "La nota del ladrón tiene una secuencia de figuras.",
            clues: ["▲ ● ▲ ● ● ▲ ● ● ● ▲ ❓"],
            question: "¿Qué figura sigue?",
            options: ["● círculo", "▲ triángulo", "■ cuadrado"],
            answer: "● círculo",
            hint: "Cuenta cuántos círculos hay entre cada triángulo: 1, luego 2, luego 3…",
            explicacion:
              "Entre cada triángulo hay un círculo más cada vez (1, 2, 3…). Después del último triángulo empiezan a venir 4 círculos: sigue un círculo.",
          },
          {
            id: "c1c-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La caja fuerte muestra una serie de números.",
                clues: ["2 → 4 → 6 → 8 → ❓"],
                question: "¿Qué número abre la caja?",
                options: ["9", "10", "12"],
                answer: "10",
                hint: "Cada número sube de a 2. Después del 8, ¿cuál viene?",
                explicacion: "La serie sube de 2 en 2: 8 + 2 = 10.",
              },
              "10-12": {
                prompt: "La caja fuerte muestra una serie de números.",
                clues: ["3 → 6 → 12 → 24 → ❓"],
                question: "¿Qué número abre la caja?",
                options: ["30", "36", "48"],
                answer: "48",
                hint: "Mira qué le pasa a cada número para volverse el siguiente: ¿se suma o se multiplica?",
                explicacion: "Cada número es el doble del anterior: 24 × 2 = 48.",
              },
            },
          },
          {
            id: "c1c-r3",
            mechanic: "error",
            prompt:
              "El sospechoso dio su coartada. Pero una parte no concuerda con las otras.",
            clues: [
              "“Estuve todo el día en casa, enfermo en cama.”",
              "“No salí para nada, ni a la tienda.”",
              "“En la mañana corrí 10 kilómetros en el parque.”",
              "“Me dormí temprano.”",
            ],
            question: "¿Qué frase delata la mentira?",
            options: [
              "“Corrí 10 kilómetros en el parque.”",
              "“Me dormí temprano.”",
              "“Estuve enfermo en cama.”",
            ],
            answer: "“Corrí 10 kilómetros en el parque.”",
            hint: "Si estuvo todo el día en cama y no salió para nada, ¿pudo correr en el parque?",
            explicacion:
              "Dijo que no salió en todo el día por estar enfermo, pero también que corrió 10 km en el parque. No pueden ser verdad las dos.",
          },
          {
            id: "c1c-r4",
            mechanic: "orden",
            prompt:
              "Para abrir la bóveda secreta hay que seguir los pasos del manual, pero están revueltos.",
            question: "Ordena los pasos para abrir la bóveda.",
            steps: [
              "Girar la rueda hasta el número correcto",
              "Poner la llave dorada",
              "Presionar el botón verde",
              "Abrir la puerta",
            ],
            hint: "No puedes abrir la puerta antes de desbloquearla. ¿Qué va primero: girar la rueda o abrir?",
            explicacion:
              "Primero se pone el número, luego la llave, después el botón y al final se abre la puerta.",
          },
          {
            id: "c1c-r5",
            mechanic: "deduccion",
            prompt:
              "Dentro de la bóveda hay una foto del ladrón. Estas son las pistas seguras que reuniste:",
            clues: [
              "Usa gorra roja.",
              "Es más alto que Rosa.",
              "No usa gafas.",
            ],
            question: "¿Cuál de los sospechosos es el ladrón?",
            options: [
              "Un hombre alto, gorra roja, sin gafas",
              "Un hombre bajo, gorra azul, con gafas",
              "Una mujer alta, gorra roja, con gafas",
            ],
            answer: "Un hombre alto, gorra roja, sin gafas",
            hint: "Ve pista por pista y descarta a quien no cumpla alguna: gorra roja, alto y sin gafas.",
            explicacion:
              "Solo el primero cumple las tres pistas: gorra roja, más alto que Rosa y sin gafas. ¡Caso resuelto!",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "El robot del museo",
    emoji: "🤖",
    locked: false,
    intro:
      "El museo estrenó a Astubot, un robot con inteligencia artificial que ayuda a resolver casos. Pero Astubot a veces se equivoca o inventa cosas con mucha seguridad. Tu misión: pensar por ti mismo y no creerle todo.",
    cases: [
      {
        id: "c2-nocreas",
        title: "No le creas a todo",
        emoji: "🤖",
        minutes: 5,
        brief:
          "Astubot te va a dar pistas para encontrar al ladrón. Algunas son buenas… y otras son puros inventos. Tú decides a cuáles hacerles caso.",
        retos: [
          {
            id: "c2n-r1",
            mechanic: "ia",
            prompt: "Le preguntaste a Astubot cómo entró el ladrón.",
            aiSays:
              "El ladrón mide 3 metros de alto, por eso alcanzó la ventana del techo sin escalera.",
            question: "¿Le crees a Astubot?",
            options: [
              "Sí: es una máquina, no se equivoca",
              "No: nadie mide 3 metros, ese dato es imposible",
              "Sí, porque lo dijo muy seguro",
            ],
            answer: "No: nadie mide 3 metros, ese dato es imposible",
            hint: "Una IA puede decir cosas falsas con mucha seguridad. ¿Conoces a alguien de 3 metros de alto?",
            explicacion:
              "Astubot inventó un dato imposible. Aunque una IA suene muy segura, hay que verificar con lo que sabemos del mundo real: nadie mide 3 metros.",
          },
          {
            id: "c2n-r2",
            mechanic: "ia",
            prompt: "Astubot contó cuántas salas revisaron los guardias.",
            aiSays:
              "Había 4 guardias y cada uno revisó 3 salas, así que en total revisaron 7 salas.",
            question: "¿La cuenta de Astubot está bien?",
            options: ["Sí, son 7 salas", "No, son 12 salas", "No, son 9 salas"],
            answer: "No, son 12 salas",
            hint: "4 grupos de 3 salas. ¿Eso se suma una vez o se repite? 3 + 3 + 3 + 3.",
            explicacion:
              "Astubot se equivocó en la cuenta: 4 × 3 = 12, no 7. Las máquinas también fallan en cosas simples; por eso conviene revisar.",
          },
          {
            id: "c2n-r3",
            mechanic: "error",
            prompt:
              "Astubot resumió lo que dijo un testigo, pero metió una frase que se contradice.",
            clues: [
              "“El testigo llegó al museo a las 8 de la noche.”",
              "“Dijo que el museo ya estaba cerrado y oscuro.”",
              "“Dijo que vio todo gracias a la luz del sol de la tarde.”",
              "“Se fue rápido, asustado.”",
            ],
            question: "¿Cuál frase NO puede ser verdad?",
            options: [
              "“Vio todo gracias a la luz del sol de la tarde.”",
              "“Llegó a las 8 de la noche.”",
              "“Se fue rápido, asustado.”",
            ],
            answer: "“Vio todo gracias a la luz del sol de la tarde.”",
            hint: "Si llegó de noche y todo estaba oscuro, ¿podía haber sol de la tarde?",
            explicacion:
              "A las 8 de la noche, con el museo oscuro, no hay sol de la tarde. Esa frase que Astubot dejó pasar no encaja con las demás.",
          },
          {
            id: "c2n-r4",
            mechanic: "deduccion",
            prompt:
              "Tres robots vigilaban el museo. Solo UNO dice mentiras; los otros dos dicen la verdad.",
            clues: [
              "Robi: “Yo no abrí la puerta.”",
              "Tina: “Robi abrió la puerta.”",
              "Max: “Tina dice la verdad.”",
            ],
            question: "¿Cuál robot abrió la puerta?",
            options: ["Robi", "Tina", "Max"],
            answer: "Robi",
            hint: "Si Robi dijera la verdad, Tina y Max estarían mintiendo los dos… y solo uno miente.",
            explicacion:
              "Si Robi fuera sincero, Tina y Max mentirían a la vez, y solo miente uno. Entonces el mentiroso es Robi: él abrió la puerta.",
          },
          {
            id: "c2n-r5",
            mechanic: "ia",
            prompt: "Le preguntaste a dos IA distintas a qué hora fue el robo.",
            aiSays:
              "Astubot: “Fue a las 25:00 de la noche, estoy 100% seguro.”",
            question: "¿A qué respuesta le crees?",
            options: [
              "A Astubot: las 25:00",
              "A Lumi, que dice: “cerca de la medianoche, las 12”",
              "A ninguna: las IA nunca sirven",
            ],
            answer: "A Lumi, que dice: “cerca de la medianoche, las 12”",
            hint: "Mira un reloj: ¿existe la hora 25:00?",
            explicacion:
              "La hora 25:00 no existe, así que Astubot está equivocado aunque suene seguro. Verificar te muestra que la respuesta con sentido es la de Lumi. Las IA sí ayudan, pero hay que revisarlas.",
          },
        ],
      },
      {
        id: "c2-pensar",
        title: "Pensar mejor que la máquina",
        emoji: "🧠",
        minutes: 5,
        brief:
          "Astubot va a sacar conclusiones muy rápido. Algunas suenan lógicas pero están mal. Usa tu cabeza para no caer.",
        retos: [
          {
            id: "c2p-r1",
            mechanic: "ia",
            prompt: "Astubot ya cree saber quién es el ladrón.",
            aiSays:
              "El sospechoso tiene gorra roja y el ladrón usaba gorra roja. Entonces él es el ladrón, seguro.",
            question: "¿El razonamiento de Astubot es seguro?",
            options: [
              "Sí: gorra roja igual a ladrón",
              "No: muchísimas personas usan gorra roja, falta más pruebas",
              "Sí, porque Astubot es muy inteligente",
            ],
            answer: "No: muchísimas personas usan gorra roja, falta más pruebas",
            hint: "¿Cuánta gente en el mundo tiene una gorra roja? ¿Alcanza esa sola pista para acusar a alguien?",
            explicacion:
              "Astubot sacó una conclusión apurada. Una sola coincidencia no prueba nada: para acusar a alguien hacen falta más pistas. Pensar despacio le gana a la máquina apurada.",
          },
          {
            id: "c2p-r2",
            mechanic: "comprension",
            prompt: "Lee con cuidado la nota que dejó el ladrón.",
            clues: [
              "“Escondí lo que robé en el lugar más frío del museo,",
              "donde se guardan los helados de la cafetería,",
              "detrás de la puerta que siempre está cerrada con llave.”",
            ],
            question: "¿Dónde escondió lo robado?",
            options: [
              "En el congelador de la cafetería",
              "En la entrada del museo",
              "Debajo de una vitrina",
            ],
            answer: "En el congelador de la cafetería",
            hint: "“El lugar más frío” y “donde se guardan los helados”: ¿qué lugar junta esas dos pistas?",
            explicacion:
              "El texto lo dice juntando pistas: el lugar más frío donde se guardan los helados es el congelador de la cafetería.",
          },
          {
            id: "c2p-r3",
            mechanic: "patron",
            prompt: "La caja donde escondió el diamante tiene una clave con figuras.",
            clues: ["🔺 🔺 🔵 🔺 🔺 🔵 🔺 🔺 ❓"],
            question: "¿Qué figura sigue?",
            options: ["🔵 círculo", "🔺 triángulo", "⬛ cuadrado"],
            answer: "🔵 círculo",
            hint: "Cuenta: dos triángulos y un círculo, dos triángulos y un círculo… ¿qué toca ahora?",
            explicacion:
              "El patrón se repite: dos triángulos y un círculo. Después de los dos triángulos toca un círculo.",
          },
          {
            id: "c2p-r4",
            mechanic: "ia",
            prompt: "Astubot hizo una última cuenta para calcular la recompensa.",
            aiSays:
              "Si el diamante vale 100 y encontraste 2 diamantes, la recompensa es 1000.",
            question: "¿Astubot calculó bien?",
            options: [
              "Sí, 1000",
              "No: 2 diamantes de 100 son 200, no 1000",
              "No: son 102",
            ],
            answer: "No: 2 diamantes de 100 son 200, no 1000",
            hint: "2 veces 100. ¿Cuánto es 100 + 100?",
            explicacion:
              "Astubot exageró: 2 × 100 = 200, no 1000. Aunque una IA responda al instante, tú puedes comprobar si el número tiene sentido.",
          },
          {
            id: "c2p-r5",
            mechanic: "orden",
            prompt:
              "Para atrapar al ladrón hay que seguir un plan, pero Astubot te lo dio en desorden.",
            question: "Ordena el plan, del primer paso al último.",
            steps: [
              "Reunir todas las pistas verdaderas",
              "Descartar los inventos de Astubot",
              "Encontrar el escondite",
              "Atrapar al ladrón",
            ],
            hint: "No puedes atrapar al ladrón sin antes saber dónde está. ¿Qué va primero de todo?",
            explicacion:
              "Primero reúnes las pistas buenas, luego descartas los inventos de la IA, después hallas el escondite y al final atrapas al ladrón.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "El faro de las señales",
    emoji: "🗼",
    locked: false,
    intro:
      "El viejo faro de la costa manda mensajes en clave. Alguien lo está usando para avisarle a los ladrones cuándo pueden robar. Descifra las señales.",
    cases: [
      {
        id: "c3-luces",
        title: "Las luces que hablan",
        emoji: "💡",
        minutes: 4,
        brief:
          "El faro parpadea con un patrón. Si lo entiendes, sabrás qué mensaje están enviando.",
        retos: [
          {
            id: "c3l-r1",
            mechanic: "patron",
            prompt: "Anoche el faro parpadeó así:",
            clues: ["💡 ⚫ 💡 💡 ⚫ 💡 💡 💡 ⚫ ❓"],
            question: "¿Cuántos parpadeos vienen ahora?",
            options: ["1 parpadeo", "3 parpadeos", "4 parpadeos"],
            answer: "4 parpadeos",
            hint: "Cuenta los parpadeos entre cada apagón: 1, luego 2, luego 3… ¿qué sigue?",
            explicacion: "El patrón crece de a 1: 1, 2, 3… entonces sigue 4 parpadeos.",
          },
          {
            id: "c3l-r2",
            mechanic: "deduccion",
            prompt:
              "Tres marineros vieron el faro. Solo UNO miente; los otros dos dicen la verdad.",
            clues: [
              "Sam: “No fue yo quien encendió el faro.”",
              "Lía: “Sam encendió el faro.”",
              "Pol: “Lía dice la verdad.”",
            ],
            question: "¿Quién encendió el faro?",
            options: ["Sam", "Lía", "Pol"],
            answer: "Sam",
            hint: "Si Sam dijera la verdad, Lía y Pol estarían mintiendo los dos… y solo miente una persona.",
            explicacion:
              "Si Sam fuera sincero, Lía y Pol mentirían a la vez. Como solo miente uno, el mentiroso es Sam: él encendió el faro.",
          },
          {
            id: "c3l-r3",
            mechanic: "orden",
            prompt: "Para encender el faro sin activar la alarma hay un plan secreto.",
            question: "Ordena los pasos del más temprano al último.",
            steps: [
              "Subir las escaleras del faro",
              "Cortar la alarma",
              "Encender la lámpara",
              "Bajar sin dejar huellas",
            ],
            hint: "Piensa: no puedes cortar la alarma sin llegar arriba; no puedes bajar sin haber encendido.",
            explicacion:
              "Primero subes, después cortas la alarma, luego enciendes la lámpara y por último bajas sin huellas.",
          },
          {
            id: "c3l-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El faro parpadea 5 veces cada minuto.",
                question: "¿Cuántos parpadeos hay en 3 minutos?",
                options: ["8", "15", "10"],
                answer: "15",
                hint: "5 parpadeos por minuto, 3 minutos: 5 + 5 + 5.",
                explicacion: "5 × 3 = 15 parpadeos.",
              },
              "10-12": {
                prompt: "El faro parpadea 7 veces por minuto, durante 12 minutos, pero se apaga 3 minutos.",
                question: "¿Cuántos parpadeos hubo en total?",
                options: ["63", "84", "56"],
                answer: "63",
                hint: "Solo cuentan los minutos en que sí parpadea: 12 − 3 = 9 minutos × 7.",
                explicacion: "12 − 3 = 9 minutos activos; 9 × 7 = 63 parpadeos.",
              },
            },
          },
          {
            id: "c3l-r5",
            mechanic: "ia",
            prompt: "Astubot analizó las señales del faro.",
            aiSays:
              "El mensaje del faro dice “atacar el jueves”, estoy 100% seguro porque los ladrones siempre atacan el jueves.",
            question: "¿Le crees a Astubot?",
            options: [
              "Sí, si está seguro debe ser verdad",
              "No: “siempre atacan el jueves” es un invento, no una prueba",
              "Sí, porque son ladrones",
            ],
            answer: "No: “siempre atacan el jueves” es un invento, no una prueba",
            hint: "¿De dónde saca Astubot que los ladrones “siempre” atacan un día específico? No mostró ninguna prueba.",
            explicacion:
              "Astubot inventó una regla que no puede demostrar. Cuando la IA dice “siempre X”, hay que pedir pruebas antes de creerle.",
          },
        ],
      },
      {
        id: "c3-morse",
        title: "El código escondido",
        emoji: "📡",
        minutes: 5,
        brief:
          "Encontraste una libreta con símbolos raros. Descifra las claves para saber a dónde van a robar.",
        retos: [
          {
            id: "c3m-r1",
            mechanic: "patron",
            prompt: "La libreta muestra esta secuencia de puntos y rayas:",
            clues: ["• — • • — • • • — ❓"],
            question: "¿Qué sigue en el patrón?",
            options: ["• punto", "• • dos puntos", "— raya"],
            answer: "• • dos puntos",
            hint: "Cuenta los puntos entre cada raya: 1, 2, 3… ¿qué toca ahora?",
            explicacion: "Después de cada raya hay un punto más: 1, 2, 3… ahora toca preparar 4, y empieza con dos puntos.",
          },
          {
            id: "c3m-r2",
            mechanic: "comprension",
            prompt: "Lee con cuidado la nota del cuaderno:",
            clues: [
              "“Nos vemos donde el agua se junta con la arena,",
              "cuando el sol ya no se ve pero la luna todavía no salió,",
              "el día antes del último día de la semana.”",
            ],
            question: "¿Dónde y cuándo se ven?",
            options: [
              "En la playa, al atardecer del sábado",
              "En el río, al mediodía del lunes",
              "En la montaña, al amanecer del domingo",
            ],
            answer: "En la playa, al atardecer del sábado",
            hint: "“Agua con arena” = playa. Después del sol y antes de la luna = atardecer. Antes del último día = sábado.",
            explicacion:
              "Playa (agua + arena), atardecer (sin sol, sin luna aún), sábado (día antes del domingo, que es el último día).",
          },
          {
            id: "c3m-r3",
            mechanic: "error",
            prompt: "El sospechoso escribió su versión, pero se le escapa una mentira:",
            clues: [
              "“Yo estaba solo pescando en el lago.”",
              "“No había nadie más en muchos kilómetros.”",
              "“Mi amigo Julio me trajo un café mientras pescaba.”",
              "“Volví a casa en la noche.”",
            ],
            question: "¿Qué frase no encaja?",
            options: [
              "“Mi amigo Julio me trajo un café.”",
              "“Volví a casa en la noche.”",
              "“Estaba pescando en el lago.”",
            ],
            answer: "“Mi amigo Julio me trajo un café.”",
            hint: "Si estaba solo y no había nadie más en muchos kilómetros, ¿pudo llegar Julio con un café?",
            explicacion:
              "Dijo que estaba solo y sin nadie cerca, y a la vez que su amigo le llevó café. Las dos cosas no pueden ser verdad.",
          },
          {
            id: "c3m-r4",
            mechanic: "orden",
            prompt: "Para descifrar el código completo hay que seguir estos pasos:",
            question: "Ordena los pasos.",
            steps: [
              "Anotar todos los símbolos en orden",
              "Buscar el símbolo que se repite más",
              "Reemplazar los símbolos por letras",
              "Leer el mensaje completo",
            ],
            hint: "Piensa: primero anotas, luego analizas, después reemplazas, y al final… lees.",
            explicacion:
              "Se anota, se busca el patrón más repetido, se reemplaza por letras y por último se lee el mensaje.",
          },
          {
            id: "c3m-r5",
            mechanic: "deduccion",
            prompt: "El cómplice es una de estas tres personas. Estas pistas son 100% seguras:",
            clues: [
              "Camina con bastón.",
              "No lleva sombrero.",
              "Sabe leer código morse.",
            ],
            question: "¿Cuál es el cómplice?",
            options: [
              "Una anciana con bastón, sin sombrero, radioaficionada",
              "Un joven con bastón, con sombrero, marinero",
              "Una mujer sin bastón, sin sombrero, telegrafista",
            ],
            answer: "Una anciana con bastón, sin sombrero, radioaficionada",
            hint: "Descarta a quien no cumpla alguna de las tres pistas: bastón, sin sombrero, y que sepa morse.",
            explicacion:
              "Solo la primera cumple las tres pistas. Una radioaficionada usa morse, tiene bastón y no lleva sombrero.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "El tren de medianoche",
    emoji: "🚂",
    locked: false,
    intro:
      "Un tren viaja de noche llevando algo muy valioso. Alguien planea robarlo en pleno viaje. Debes descubrir en qué estación va a pasar.",
    cases: [
      {
        id: "c4-boleto",
        title: "El boleto sospechoso",
        emoji: "🎫",
        minutes: 4,
        brief:
          "Encontraste un boleto arrugado en la estación. Con las pistas que tiene, puedes saber quién va a subir al tren.",
        retos: [
          {
            id: "c4b-r1",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El tren tiene 6 vagones y en cada vagón caben 20 personas.",
                question: "¿Cuántas personas caben en total?",
                options: ["26", "60", "120"],
                answer: "120",
                hint: "6 vagones, 20 personas cada uno: es 20 sumado 6 veces (o 20 × 6).",
                explicacion: "6 × 20 = 120 personas.",
              },
              "10-12": {
                prompt: "El tren tiene 8 vagones con 25 asientos cada uno. En el último viaje 34 asientos estaban vacíos.",
                question: "¿Cuántos pasajeros iban?",
                options: ["166", "200", "234"],
                answer: "166",
                hint: "Primero cuenta todos los asientos (8 × 25) y luego resta los vacíos.",
                explicacion: "8 × 25 = 200 asientos; 200 − 34 = 166 pasajeros.",
              },
            },
          },
          {
            id: "c4b-r2",
            mechanic: "comprension",
            prompt: "El boleto tiene esta nota escrita a mano:",
            clues: [
              "“Subo en la estación donde el tren para justo antes de cruzar el río,",
              "y bajo en la estación siguiente,",
              "donde hay un reloj gigante en la torre.”",
            ],
            question: "¿En qué estación baja el sospechoso?",
            options: [
              "En la estación del reloj gigante",
              "En la estación antes del río",
              "En la primera estación del recorrido",
            ],
            answer: "En la estación del reloj gigante",
            hint: "El texto lo dice: sube antes del río y baja en la estación siguiente, la del reloj.",
            explicacion: "Sube en la estación de antes del río y baja en la siguiente, la del reloj gigante.",
          },
          {
            id: "c4b-r3",
            mechanic: "deduccion",
            prompt: "Tres pasajeros dieron información. Solo UNO miente.",
            clues: [
              "Ana: “Yo no vi al hombre del abrigo negro.”",
              "Ben: “Ana sí lo vio.”",
              "Coa: “Ben dice la verdad.”",
            ],
            question: "¿Quién miente?",
            options: ["Ana", "Ben", "Coa"],
            answer: "Ana",
            hint: "Si Ana dijera la verdad, Ben y Coa mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Ana fuera sincera, Ben y Coa mentirían a la vez. Como solo miente uno, la mentirosa es Ana: sí vio al hombre.",
          },
          {
            id: "c4b-r4",
            mechanic: "patron",
            prompt: "Los boletos comprados hoy tienen números en esta serie:",
            clues: ["5 → 10 → 20 → 40 → ❓"],
            question: "¿Cuál es el siguiente número?",
            options: ["50", "80", "60"],
            answer: "80",
            hint: "Cada número es… ¿el doble del anterior?",
            explicacion: "Cada número es el doble: 40 × 2 = 80.",
          },
          {
            id: "c4b-r5",
            mechanic: "ia",
            prompt: "Astubot revisó las cámaras de la estación.",
            aiSays:
              "Vi al hombre del abrigo negro subir al tren, era pelirrojo, alto, y tenía tatuajes en la cara. Estoy segurísimo.",
            question: "¿Le crees a Astubot?",
            options: [
              "Sí, dio muchos detalles",
              "No sé, mejor pido ver la grabación yo mismo",
              "Sí, porque estaba segurísimo",
            ],
            answer: "No sé, mejor pido ver la grabación yo mismo",
            hint: "La IA a veces inventa detalles muy específicos para sonar creíble. ¿Cómo puedes verificar?",
            explicacion:
              "Muchos detalles no prueban nada: una IA puede inventarlos. Lo mejor es verificar la fuente original (la grabación) antes de creer.",
          },
        ],
      },
      {
        id: "c4-vagon",
        title: "El vagón cerrado",
        emoji: "🚃",
        minutes: 5,
        brief:
          "Un vagón del tren viaja siempre cerrado. Descubre qué esconde y quién tiene la llave.",
        retos: [
          {
            id: "c4v-r1",
            mechanic: "error",
            prompt: "El maquinista dio su declaración, pero hay una frase que no puede ser cierta:",
            clues: [
              "“Nunca me alejo de la locomotora.”",
              "“Estuve manejando el tren toda la noche.”",
              "“Fui hasta el último vagón a revisar las puertas.”",
              "“El tren nunca paró.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Fui hasta el último vagón a revisar las puertas.”",
              "“El tren nunca paró.”",
              "“Estuve manejando toda la noche.”",
            ],
            answer: "“Fui hasta el último vagón a revisar las puertas.”",
            hint: "Si nunca se alejó de la locomotora y estuvo manejando todo el tiempo, ¿pudo caminar hasta el último vagón?",
            explicacion:
              "Dijo que nunca se alejó de la locomotora y a la vez que fue al último vagón. Las dos cosas no pueden ser verdad.",
          },
          {
            id: "c4v-r2",
            mechanic: "orden",
            prompt: "Para abrir un vagón cerrado desde afuera hay que seguir un procedimiento oficial:",
            question: "Ordena los pasos.",
            steps: [
              "Pedir permiso al jefe de tren",
              "Detener el tren en la próxima estación",
              "Usar la llave maestra",
              "Abrir la puerta con cuidado",
            ],
            hint: "No puedes usar la llave sin permiso; no puedes abrir con cuidado antes de detener el tren.",
            explicacion:
              "Se pide permiso, se detiene el tren, se usa la llave maestra y por último se abre la puerta con cuidado.",
          },
          {
            id: "c4v-r3",
            mechanic: "patron",
            prompt: "Las llaves maestras tienen dientes que forman una secuencia:",
            clues: ["▂ ▄ ▂ ▄ ▄ ▂ ▄ ▄ ▄ ❓"],
            question: "¿Cómo termina?",
            options: ["▂ corto", "▄ largo", "▂ ▂ dos cortos"],
            answer: "▂ corto",
            hint: "Cuenta los largos entre cada corto: 1, 2, 3… después de 3 largos, ¿qué toca?",
            explicacion: "Después de cada grupo de largos viene un corto. Van 3 largos: toca un corto.",
          },
          {
            id: "c4v-r4",
            mechanic: "deduccion",
            prompt:
              "Tres empleados tienen llave del vagón. Estas pistas seguras señalan al que la usó anoche:",
            clues: [
              "Usa guantes grises.",
              "No trabajó ayer de día.",
              "Vive cerca de la estación final.",
            ],
            question: "¿Quién fue?",
            options: [
              "Un guardia con guantes negros, del turno de noche, que vive lejos",
              "Un guardia con guantes grises, del turno de noche, que vive cerca del final",
              "Un guardia con guantes grises, del turno de día, que vive cerca del final",
            ],
            answer: "Un guardia con guantes grises, del turno de noche, que vive cerca del final",
            hint: "Descarta a quien no cumpla alguna pista: guantes grises, no de día, cerca de la estación final.",
            explicacion:
              "Solo el segundo cumple las tres pistas: guantes grises, del turno de noche y cerca de la estación final.",
          },
          {
            id: "c4v-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El vagón secreto pesa 200 kg vacío. Le pusieron adentro 3 cajas de 25 kg cada una.",
                question: "¿Cuánto pesa el vagón lleno?",
                options: ["225 kg", "275 kg", "300 kg"],
                answer: "275 kg",
                hint: "Primero cuenta las cajas (3 × 25) y súmalo al peso vacío.",
                explicacion: "3 × 25 = 75 kg de cajas; 200 + 75 = 275 kg en total.",
              },
              "10-12": {
                prompt: "El vagón vacío pesa 320 kg. Le cargaron 4 cajas de 45 kg y luego sacaron 2 cajas iguales de 45 kg.",
                question: "¿Cuánto pesa el vagón ahora?",
                options: ["365 kg", "410 kg", "455 kg"],
                answer: "410 kg",
                hint: "Al final quedan solo 2 cajas dentro (4 − 2). Ese peso se le suma a los 320.",
                explicacion: "Quedan 4 − 2 = 2 cajas de 45 kg = 90 kg; 320 + 90 = 410 kg.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "La feria de los espejos",
    emoji: "🎪",
    locked: false,
    intro:
      "En la feria hay un salón lleno de espejos. Todo lo que ves puede ser un reflejo, un truco… o una pista real. Aprende a distinguirlas.",
    cases: [
      {
        id: "c5-mago",
        title: "El truco del mago",
        emoji: "🎩",
        minutes: 5,
        brief:
          "Un mago perdió su moneda mágica. Dice que se la robaron, pero muchos trucos son solo eso: trucos.",
        retos: [
          {
            id: "c5g-r1",
            mechanic: "ia",
            prompt: "Astubot te muestra una foto del mago con la moneda “desapareciendo”.",
            aiSays:
              "La foto demuestra que la moneda desapareció por magia real: no hay otra explicación posible.",
            question: "¿La foto demuestra magia real?",
            options: [
              "Sí, una foto no miente",
              "No: una foto puede ser un truco de cámara o un momento oculto",
              "Sí, si Astubot lo dice",
            ],
            answer: "No: una foto puede ser un truco de cámara o un momento oculto",
            hint: "¿Qué pudo pasar entre una foto y la siguiente? ¿Solo se puede explicar con magia?",
            explicacion:
              "Una foto solo muestra un instante; entre uno y otro pueden pasar mil cosas. “No hay otra explicación” es una trampa: casi siempre hay más de una.",
          },
          {
            id: "c5g-r2",
            mechanic: "comprension",
            prompt: "El mago escribió en su libreta:",
            clues: [
              "“La moneda estaba en la caja azul,",
              "que dejé arriba de la mesa del centro,",
              "junto al espejo que refleja al público.”",
            ],
            question: "¿Dónde estaba la moneda?",
            options: [
              "En la caja azul, en la mesa del centro",
              "En el espejo del público",
              "En el bolsillo del mago",
            ],
            answer: "En la caja azul, en la mesa del centro",
            hint: "La primera línea lo dice claro: “en la caja azul”, y la segunda dice dónde estaba esa caja.",
            explicacion: "La moneda estaba en la caja azul, y la caja estaba en la mesa del centro.",
          },
          {
            id: "c5g-r3",
            mechanic: "deduccion",
            prompt: "Tres asistentes del mago vieron algo. Solo UNO miente.",
            clues: [
              "Nina: “Yo no toqué la caja azul.”",
              "Toni: “Nina tocó la caja.”",
              "Óscar: “Toni dice la verdad.”",
            ],
            question: "¿Quién tocó la caja?",
            options: ["Nina", "Toni", "Óscar"],
            answer: "Nina",
            hint: "Si Nina dijera la verdad, Toni y Óscar mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Nina fuera sincera, Toni y Óscar mentirían a la vez, pero solo miente uno. Nina es la mentirosa: sí tocó la caja.",
          },
          {
            id: "c5g-r4",
            mechanic: "patron",
            prompt: "Los espejos del salón proyectan destellos con este patrón:",
            clues: ["✨ ⚫ ⚫ ✨ ⚫ ⚫ ⚫ ✨ ⚫ ⚫ ⚫ ⚫ ❓"],
            question: "¿Qué toca ahora?",
            options: ["✨ destello", "⚫ oscuro", "⚫ ⚫ dos oscuros"],
            answer: "✨ destello",
            hint: "Cuenta los apagones entre destellos: 2, 3, 4… después de 4 apagones, ¿qué toca?",
            explicacion: "El patrón crece: 2, 3, 4 apagones. Ya pasaron los 4, así que toca el destello.",
          },
          {
            id: "c5g-r5",
            mechanic: "orden",
            prompt: "El mago dice que su truco funciona así:",
            question: "Ordena los pasos del truco.",
            steps: [
              "Mostrar la moneda al público",
              "Meter la moneda en la caja",
              "Cerrar la caja con un pañuelo",
              "Abrir la caja vacía",
            ],
            hint: "No puedes cerrar antes de meter; no puedes abrir antes de cerrar.",
            explicacion:
              "Se muestra la moneda, se mete en la caja, se cierra con el pañuelo y se abre… vacía.",
          },
        ],
      },
      {
        id: "c5-reflejo",
        title: "Reflejos que engañan",
        emoji: "🪞",
        minutes: 5,
        brief:
          "En el salón de espejos ves a alguien sospechoso. Pero cuidado: no todo lo que ves en un espejo es lo que parece.",
        retos: [
          {
            id: "c5r-r1",
            mechanic: "error",
            prompt: "Un testigo cuenta lo que vio en los espejos:",
            clues: [
              "“Vi al sospechoso salir corriendo hacia mi derecha.”",
              "“Al mismo tiempo lo vi entrando por la puerta principal.”",
              "“Estaba solo cuando vi todo esto.”",
              "“La puerta principal estaba a mi izquierda.”",
            ],
            question: "¿Qué frase es imposible?",
            options: [
              "“Lo vi salir a la derecha y entrar por la puerta principal a la vez.”",
              "“Estaba solo.”",
              "“La puerta estaba a mi izquierda.”",
            ],
            answer: "“Lo vi salir a la derecha y entrar por la puerta principal a la vez.”",
            hint: "Una misma persona no puede salir corriendo y estar entrando por la puerta al mismo tiempo.",
            explicacion:
              "Una persona no puede hacer dos cosas opuestas a la vez: salir y entrar en el mismo momento. Uno de los dos fue un reflejo.",
          },
          {
            id: "c5r-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El salón tiene 8 espejos. Cada espejo hace 2 reflejos de la misma persona.",
                question: "¿Cuántos reflejos ves de una persona?",
                options: ["10", "16", "8"],
                answer: "16",
                hint: "8 espejos, 2 reflejos cada uno: es 2 sumado 8 veces.",
                explicacion: "8 × 2 = 16 reflejos.",
              },
              "10-12": {
                prompt: "En el salón hay 12 espejos. 5 espejos hacen 3 reflejos cada uno y los otros 7 hacen 2 reflejos cada uno.",
                question: "¿Cuántos reflejos hay en total de una persona?",
                options: ["29", "24", "36"],
                answer: "29",
                hint: "Calcula por grupos: (5 × 3) + (7 × 2).",
                explicacion: "5 × 3 = 15; 7 × 2 = 14; 15 + 14 = 29 reflejos.",
              },
            },
          },
          {
            id: "c5r-r3",
            mechanic: "ia",
            prompt: "Astubot analizó todos los reflejos de los espejos.",
            aiSays:
              "Conté 47 personas distintas en el salón, todas sospechosas, todas al mismo tiempo.",
            question: "¿Le crees a Astubot?",
            options: [
              "Sí, contó bien",
              "No: seguro son reflejos de menos personas, no personas distintas",
              "Sí, mejor investigar a las 47",
            ],
            answer: "No: seguro son reflejos de menos personas, no personas distintas",
            hint: "Los espejos multiplican lo que ves. ¿47 personas de verdad en el mismo salón?",
            explicacion:
              "Astubot confundió reflejos con personas. La IA a veces no distingue lo que es real de lo que es un reflejo; hay que pensar por uno mismo.",
          },
          {
            id: "c5r-r4",
            mechanic: "deduccion",
            prompt: "Tres personas estaban en el salón. Solo UNA miente.",
            clues: [
              "Pía: “No rompí ningún espejo.”",
              "Río: “Pía rompió el espejo grande.”",
              "Suri: “Río dice la verdad.”",
            ],
            question: "¿Quién rompió el espejo?",
            options: ["Pía", "Río", "Suri"],
            answer: "Pía",
            hint: "Si Pía dijera la verdad, Río y Suri mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Pía fuera sincera, Río y Suri mentirían a la vez, pero solo miente uno. La mentirosa es Pía: ella lo rompió.",
          },
          {
            id: "c5r-r5",
            mechanic: "orden",
            prompt: "Para salir del salón de espejos sin perderte hay un truco:",
            question: "Ordena los pasos para salir.",
            steps: [
              "Cerrar los ojos un segundo",
              "Tocar la pared con la mano",
              "Caminar pegado a la pared",
              "Seguir la pared hasta la salida",
            ],
            hint: "Piensa: no puedes caminar pegado a la pared sin tocarla primero.",
            explicacion:
              "Se cierra los ojos, se toca la pared, se camina pegado a ella y se sigue hasta la salida.",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "La isla del código",
    emoji: "🏝️",
    locked: false,
    intro:
      "Los ladrones huyeron a una isla llena de trampas. Cada puerta se abre con un código lógico. Solo la mente ordenada llega al tesoro.",
    cases: [
      {
        id: "c6-mapa",
        title: "El mapa cifrado",
        emoji: "🗺️",
        minutes: 5,
        brief:
          "Encontraste un mapa antiguo con instrucciones raras. Sigue la lógica para no caer en las trampas.",
        retos: [
          {
            id: "c6m-r1",
            mechanic: "orden",
            prompt: "El mapa dice que para llegar a la cueva hay que seguir estos pasos, pero están mezclados:",
            question: "Ordénalos.",
            steps: [
              "Cruzar el puente de cuerdas",
              "Buscar el árbol más alto",
              "Cavar tres pasos al norte del árbol",
              "Sacar la caja del hoyo",
            ],
            hint: "Para cavar cerca del árbol tienes que encontrarlo; para sacar la caja tienes que cavar primero.",
            explicacion:
              "Se cruza el puente, se busca el árbol, se cava al norte y se saca la caja.",
          },
          {
            id: "c6m-r2",
            mechanic: "patron",
            prompt: "Los tesoros del mapa se enumeran así:",
            clues: ["1 → 4 → 9 → 16 → 25 → ❓"],
            question: "¿Cuál es el siguiente número?",
            options: ["30", "36", "34"],
            answer: "36",
            hint: "Mira: 1, 4, 9, 16, 25 son 1×1, 2×2, 3×3, 4×4, 5×5. Sigue…",
            explicacion: "Son los cuadrados: 1², 2², 3², 4², 5², y ahora 6² = 36.",
          },
          {
            id: "c6m-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La cueva tiene 4 salas y en cada sala hay 3 cofres.",
                question: "¿Cuántos cofres hay en total?",
                options: ["7", "12", "9"],
                answer: "12",
                hint: "4 salas, 3 cofres cada una: 3 + 3 + 3 + 3.",
                explicacion: "4 × 3 = 12 cofres.",
              },
              "10-12": {
                prompt: "Hay 5 salas con 6 cofres cada una. Un ladrón se llevó los cofres de 2 salas enteras.",
                question: "¿Cuántos cofres quedan?",
                options: ["18", "24", "12"],
                answer: "18",
                hint: "Total original: 5 × 6. Quedan solo 3 salas: 3 × 6.",
                explicacion: "Quedan 3 salas × 6 cofres = 18 cofres.",
              },
            },
          },
          {
            id: "c6m-r4",
            mechanic: "ia",
            prompt: "Astubot “leyó” el mapa antiguo por ti.",
            aiSays:
              "El tesoro está exactamente en las coordenadas 999, 999, sin ninguna duda.",
            question: "¿Le crees?",
            options: [
              "Sí, las coordenadas son muy precisas",
              "No: números tan redondos suenan inventados, hay que revisar el mapa",
              "Sí, Astubot no miente",
            ],
            answer: "No: números tan redondos suenan inventados, hay que revisar el mapa",
            hint: "Las coordenadas reales casi nunca son “tan perfectas”. ¿Cómo compruebas?",
            explicacion:
              "999, 999 son números demasiado redondos, típicos de una IA inventando. Cuando una respuesta parezca “demasiado limpia”, verifica con la fuente.",
          },
          {
            id: "c6m-r5",
            mechanic: "deduccion",
            prompt: "Tres exploradores volvieron con historias. Solo UNO miente.",
            clues: [
              "Iris: “Yo no toqué el cofre dorado.”",
              "Jaco: “Iris lo tocó.”",
              "Kaia: “Jaco dice la verdad.”",
            ],
            question: "¿Quién tocó el cofre dorado?",
            options: ["Iris", "Jaco", "Kaia"],
            answer: "Iris",
            hint: "Si Iris dijera la verdad, Jaco y Kaia mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Iris fuera sincera, Jaco y Kaia mentirían a la vez, pero solo miente uno. La mentirosa es Iris.",
          },
        ],
      },
      {
        id: "c6-trampas",
        title: "La sala de las trampas",
        emoji: "⚙️",
        minutes: 5,
        brief:
          "La cueva del tesoro está llena de trampas. Solo con la secuencia exacta se puede entrar sin caer.",
        retos: [
          {
            id: "c6t-r1",
            mechanic: "orden",
            prompt: "Para desactivar las trampas de la sala hay que hacer todo en orden:",
            question: "Ordena los pasos.",
            steps: [
              "Poner un pie sobre la baldosa azul",
              "Girar la palanca hacia la derecha",
              "Esperar a que se apague la luz roja",
              "Cruzar la sala hasta la puerta",
            ],
            hint: "Piensa: no puedes girar la palanca sin llegar a ella; no puedes cruzar si la luz roja sigue.",
            explicacion:
              "Baldosa azul, girar la palanca, esperar a que se apague la luz roja y cruzar la sala.",
          },
          {
            id: "c6t-r2",
            mechanic: "ia",
            prompt: "Astubot dice conocer el código de la última puerta.",
            aiSays:
              "El código es 7-3-5, lo aprendí porque los códigos de las cuevas siempre empiezan con 7.",
            question: "¿Le crees a Astubot?",
            options: [
              "Sí, si dice que “siempre” es así, será verdad",
              "No: “siempre X” sin pruebas es una regla inventada",
              "Sí, mejor probar 7-3-5",
            ],
            answer: "No: “siempre X” sin pruebas es una regla inventada",
            hint: "Cuando una IA dice “siempre”, pide pruebas. ¿Podría haber cuevas con código que no empiece con 7?",
            explicacion:
              "“Siempre X” es una generalización peligrosa. La IA saca una regla de la nada; hay que verificar antes de probar el código y caer en una trampa.",
          },
          {
            id: "c6t-r3",
            mechanic: "patron",
            prompt: "Las baldosas seguras del piso siguen esta secuencia:",
            clues: ["🟦 🟧 🟦 🟦 🟧 🟦 🟦 🟦 🟧 ❓"],
            question: "¿Qué color es la siguiente baldosa segura?",
            options: ["🟦 azul", "🟧 naranja", "🟦 🟦 dos azules"],
            answer: "🟦 azul",
            hint: "Cuenta los azules antes de cada naranja: 1, 2, 3… ahora va a empezar el 4.",
            explicacion: "El patrón crece: 1 azul, 2 azules, 3 azules… ahora vienen 4 azules, empezando por uno.",
          },
          {
            id: "c6t-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La puerta se abre con un código de 3 números. El primero es 5, cada uno es 2 más que el anterior.",
                question: "¿Cuáles son los 3 números?",
                options: ["5-6-7", "5-7-9", "5-10-15"],
                answer: "5-7-9",
                hint: "Empieza en 5 y suma 2 cada vez.",
                explicacion: "5 + 2 = 7; 7 + 2 = 9. Código: 5-7-9.",
              },
              "10-12": {
                prompt: "La puerta pide 4 números. Empieza en 3 y cada uno es el triple del anterior.",
                question: "¿Cuáles son los 4 números?",
                options: ["3-9-27-81", "3-6-9-12", "3-9-18-27"],
                answer: "3-9-27-81",
                hint: "Triple = multiplicar por 3.",
                explicacion: "3 × 3 = 9; 9 × 3 = 27; 27 × 3 = 81. Código: 3-9-27-81.",
              },
            },
          },
          {
            id: "c6t-r5",
            mechanic: "error",
            prompt: "El guardián del tesoro te da instrucciones, pero una es imposible:",
            clues: [
              "“Toca solo las baldosas azules.”",
              "“No pises baldosas naranjas.”",
              "“Pisa la baldosa naranja del centro.”",
              "“Camina en silencio.”",
            ],
            question: "¿Qué frase se contradice?",
            options: [
              "“Pisa la baldosa naranja del centro.”",
              "“Camina en silencio.”",
              "“Toca solo las baldosas azules.”",
            ],
            answer: "“Pisa la baldosa naranja del centro.”",
            hint: "Si te dijo que solo azules y que no pises naranjas, ¿puede a la vez pedirte pisar una naranja?",
            explicacion:
              "Dos reglas dicen “nada de naranja” y otra dice “pisa una naranja”. Esa tercera se contradice con las otras dos.",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "El laboratorio del profesor",
    emoji: "🔬",
    locked: false,
    intro:
      "Un profesor loco creó un asistente robot que aprende solo. Pero el robot está sacando conclusiones raras… y peligrosas. Ayúdalo a pensar mejor.",
    cases: [
      {
        id: "c7-experimento",
        title: "El experimento fallido",
        emoji: "🧪",
        minutes: 5,
        brief:
          "El robot del profesor mezcló pociones al azar. Debes averiguar qué salió mal antes de que explote todo.",
        retos: [
          {
            id: "c7e-r1",
            mechanic: "ia",
            prompt: "El robot te muestra su “teoría”.",
            aiSays:
              "Cada vez que mezclamos rojo con azul, el resultado es morado. Pasó 2 veces. Entonces siempre pasa.",
            question: "¿La conclusión del robot es segura?",
            options: [
              "Sí, ya pasó 2 veces",
              "No: 2 veces no son suficientes para decir “siempre”",
              "Sí, la IA nunca se equivoca en experimentos",
            ],
            answer: "No: 2 veces no son suficientes para decir “siempre”",
            hint: "Que algo pase 2 veces no prueba que pase “siempre”. ¿Podría fallar la tercera?",
            explicacion:
              "“Pasó 2 veces = siempre pasa” es un error muy común de las IA. Para decir “siempre” hay que probar muchas veces… y aun así, con cuidado.",
          },
          {
            id: "c7e-r2",
            mechanic: "orden",
            prompt: "Para hacer un experimento seguro, el manual dice:",
            question: "Ordena los pasos.",
            steps: [
              "Ponerse las gafas de seguridad",
              "Medir cada líquido en un vaso separado",
              "Mezclar los líquidos despacio",
              "Anotar lo que pasó",
            ],
            hint: "Nunca mezcles sin protegerte; no puedes anotar el resultado antes de mezclar.",
            explicacion: "Gafas primero, medir cada líquido, mezclar despacio y por último anotar.",
          },
          {
            id: "c7e-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El profesor tiene 3 estantes con 5 frascos cada uno.",
                question: "¿Cuántos frascos hay en total?",
                options: ["8", "15", "10"],
                answer: "15",
                hint: "3 estantes, 5 frascos cada uno: 5 + 5 + 5.",
                explicacion: "3 × 5 = 15 frascos.",
              },
              "10-12": {
                prompt: "Hay 6 estantes con 8 frascos cada uno. Se rompieron 7 frascos en total.",
                question: "¿Cuántos frascos quedan?",
                options: ["41", "48", "55"],
                answer: "41",
                hint: "Total original: 6 × 8. Réstale los que se rompieron.",
                explicacion: "6 × 8 = 48; 48 − 7 = 41 frascos.",
              },
            },
          },
          {
            id: "c7e-r4",
            mechanic: "error",
            prompt: "El profesor anotó el experimento, pero se contradijo:",
            clues: [
              "“El líquido rojo pesa más que el azul.”",
              "“El líquido azul pesa más que el verde.”",
              "“El líquido verde pesa más que el rojo.”",
              "“Anoté todo bien.”",
            ],
            question: "¿Qué frase no puede ser cierta con las demás?",
            options: [
              "“El verde pesa más que el rojo.”",
              "“Anoté todo bien.”",
              "“El azul pesa más que el verde.”",
            ],
            answer: "“El verde pesa más que el rojo.”",
            hint: "Si rojo > azul y azul > verde, entonces rojo > verde. ¿Cómo puede el verde pesar más que el rojo?",
            explicacion:
              "Si rojo es más pesado que azul, y azul más que verde, entonces rojo tiene que ser más pesado que verde. La tercera frase se contradice.",
          },
          {
            id: "c7e-r5",
            mechanic: "deduccion",
            prompt: "Tres ayudantes estuvieron en el laboratorio. Solo UNO miente.",
            clues: [
              "Uma: “No derramé el líquido morado.”",
              "Vico: “Uma lo derramó.”",
              "Wen: “Vico dice la verdad.”",
            ],
            question: "¿Quién derramó el líquido?",
            options: ["Uma", "Vico", "Wen"],
            answer: "Uma",
            hint: "Si Uma dijera la verdad, Vico y Wen mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Uma fuera sincera, Vico y Wen mentirían a la vez, pero solo miente uno. La mentirosa es Uma.",
          },
        ],
      },
      {
        id: "c7-robot",
        title: "El robot que aprendió mal",
        emoji: "🤖",
        minutes: 5,
        brief:
          "El robot del profesor te da consejos, pero varios están mal. Distingue los buenos de los malos.",
        retos: [
          {
            id: "c7r-r1",
            mechanic: "ia",
            prompt: "El robot vio 3 gatos y dice haber “aprendido” algo.",
            aiSays:
              "Los 3 gatos que vi eran negros. Entonces todos los gatos del mundo son negros.",
            question: "¿El robot aprendió bien?",
            options: [
              "Sí, vio 3 y todos eran negros",
              "No: 3 ejemplos no representan a todos los gatos del mundo",
              "Sí, es lógico",
            ],
            answer: "No: 3 ejemplos no representan a todos los gatos del mundo",
            hint: "¿Conoces algún gato que no sea negro? ¿Sirven 3 casos para hablar de “todos”?",
            explicacion:
              "Las IA a veces sacan reglas gigantes a partir de pocos ejemplos: eso se llama “generalizar mal”. Hay gatos de muchos colores.",
          },
          {
            id: "c7r-r2",
            mechanic: "ia",
            prompt: "Le pediste al robot un consejo de salud.",
            aiSays:
              "Si te duele la cabeza, corre 20 kilómetros y come 10 helados: lo leí en internet, seguro funciona.",
            question: "¿Qué haces con este consejo?",
            options: [
              "Lo sigo, la IA sabe todo",
              "Lo ignoro y le pregunto a un adulto o al médico",
              "Corro 10 km y como 20 helados",
            ],
            answer: "Lo ignoro y le pregunto a un adulto o al médico",
            hint: "“Lo leí en internet” no es una prueba. Para salud, ¿quién debería decidir?",
            explicacion:
              "La IA puede repetir cosas que leyó sin saber si son verdad. Para temas importantes (como salud), siempre hay que preguntarle a un adulto o profesional.",
          },
          {
            id: "c7r-r3",
            mechanic: "comprension",
            prompt: "El manual del robot dice:",
            clues: [
              "“El robot se apaga solo si le presionas el botón rojo tres veces seguidas,",
              "y si además la palanca está hacia arriba.”",
            ],
            question: "¿Cómo apagas al robot?",
            options: [
              "Presionando el botón rojo una vez",
              "Presionando el rojo 3 veces con la palanca hacia arriba",
              "Bajando la palanca",
            ],
            answer: "Presionando el rojo 3 veces con la palanca hacia arriba",
            hint: "El texto pide dos cosas al mismo tiempo: “tres veces” Y la palanca “hacia arriba”.",
            explicacion:
              "El manual dice “y además”: hacen falta las dos cosas juntas para apagarlo.",
          },
          {
            id: "c7r-r4",
            mechanic: "orden",
            prompt: "Para reiniciar al robot sin romperlo:",
            question: "Ordena los pasos.",
            steps: [
              "Desconectar la batería principal",
              "Esperar 10 segundos",
              "Volver a conectar la batería",
              "Encender el robot con el botón verde",
            ],
            hint: "No puedes conectar antes de desconectar; no puedes encender antes de reconectar.",
            explicacion: "Se desconecta, se espera, se reconecta y se enciende.",
          },
          {
            id: "c7r-r5",
            mechanic: "patron",
            prompt: "El robot enciende luces con este patrón:",
            clues: ["🔴 🟢 🔴 🟢 🟢 🔴 🟢 🟢 🟢 ❓"],
            question: "¿Qué luz sigue?",
            options: ["🔴 roja", "🟢 verde", "🟢 🟢 dos verdes"],
            answer: "🔴 roja",
            hint: "Cuenta los verdes entre rojos: 1, 2, 3… ¿qué toca ahora?",
            explicacion: "Después de cada grupo de verdes viene una roja. Ya pasaron 3 verdes: toca roja.",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "El concurso de detectives",
    emoji: "🏆",
    locked: false,
    intro:
      "Un concurso reúne a los mejores detectives (y a la IA Astubot). El premio: descubrir al villano final. Pero el jurado no es de fiar.",
    cases: [
      {
        id: "c8-preguntas",
        title: "Preguntas con trampa",
        emoji: "❓",
        minutes: 5,
        brief:
          "El jurado y Astubot te hacen preguntas. Algunas están mal planteadas, otras esconden trampas.",
        retos: [
          {
            id: "c8p-r1",
            mechanic: "ia",
            prompt: "El jurado le preguntó a Astubot cuánto pesa una nube.",
            aiSays:
              "Una nube pesa exactamente 500 kilos, siempre, sin excepción.",
            question: "¿Es exacto?",
            options: [
              "Sí, 500 kilos justos",
              "No: las nubes no pesan todas igual, esa cifra es inventada",
              "Sí, si lo dice Astubot",
            ],
            answer: "No: las nubes no pesan todas igual, esa cifra es inventada",
            hint: "¿Todas las nubes son iguales? ¿Un número tan redondo suena real?",
            explicacion:
              "Las nubes pesan distinto según su tamaño y humedad. “Exactamente 500 kilos siempre” es inventado. La IA a veces inventa números precisos para sonar creíble.",
          },
          {
            id: "c8p-r2",
            mechanic: "deduccion",
            prompt:
              "Tres finalistas dicen quién copió en el examen. Solo UNO miente.",
            clues: [
              "Zara: “Yo no copié.”",
              "Yon: “Zara copió.”",
              "Xui: “Yon dice la verdad.”",
            ],
            question: "¿Quién copió?",
            options: ["Zara", "Yon", "Xui"],
            answer: "Zara",
            hint: "Si Zara dijera la verdad, Yon y Xui mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Zara fuera sincera, Yon y Xui mentirían a la vez, pero solo miente uno. La mentirosa es Zara.",
          },
          {
            id: "c8p-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "En la final hay 12 pistas y ya resolviste 8.",
                question: "¿Cuántas pistas te faltan?",
                options: ["3", "4", "5"],
                answer: "4",
                hint: "Total 12, ya hiciste 8: 12 − 8.",
                explicacion: "12 − 8 = 4 pistas por resolver.",
              },
              "10-12": {
                prompt: "El concurso da 3 puntos por cada acierto y quita 2 por cada error. Tienes 9 aciertos y 4 errores.",
                question: "¿Cuántos puntos tienes?",
                options: ["19", "27", "35"],
                answer: "19",
                hint: "Calcula ganados y perdidos: (9 × 3) − (4 × 2).",
                explicacion: "9 × 3 = 27; 4 × 2 = 8; 27 − 8 = 19 puntos.",
              },
            },
          },
          {
            id: "c8p-r4",
            mechanic: "ia",
            prompt: "Astubot le explica al jurado por qué merece ganar.",
            aiSays:
              "Merezco ganar porque soy una IA, y las IA son mejores que las personas para todo, siempre.",
            question: "¿Estás de acuerdo?",
            options: [
              "Sí, la IA es mejor en todo",
              "No: la IA es útil en algunas cosas, pero no “en todo, siempre”",
              "Sí, tiene razón",
            ],
            answer: "No: la IA es útil en algunas cosas, pero no “en todo, siempre”",
            hint: "¿En qué cosas eres mejor que una máquina? (jugar, sentir, crear amigos, decidir…)",
            explicacion:
              "La IA sirve para muchas cosas, pero “en todo, siempre” es una exageración. Personas y máquinas son buenas en cosas distintas.",
          },
          {
            id: "c8p-r5",
            mechanic: "comprension",
            prompt: "Lee la última prueba del concurso:",
            clues: [
              "“El villano se esconde donde nadie mira dos veces,",
              "en el lugar más aburrido del edificio,",
              "un cuarto sin ventanas ni cuadros, solo escobas.”",
            ],
            question: "¿Dónde está el villano?",
            options: [
              "En el cuarto de las escobas",
              "En la oficina del jefe",
              "En la sala de reuniones",
            ],
            answer: "En el cuarto de las escobas",
            hint: "“Sin ventanas ni cuadros, solo escobas” describe un lugar muy específico del edificio.",
            explicacion:
              "El cuarto de las escobas es el más aburrido y el que “nadie mira dos veces”. Todas las pistas apuntan allí.",
          },
        ],
      },
      {
        id: "c8-final",
        title: "La ronda final",
        emoji: "🥇",
        minutes: 5,
        brief:
          "Última ronda del concurso. Astubot está desesperado por ganar y ya está inventando cosas. No te dejes engañar.",
        retos: [
          {
            id: "c8f-r1",
            mechanic: "ia",
            prompt: "Astubot presenta su “prueba definitiva”.",
            aiSays:
              "El villano es el señor Gómez, porque tiene bigote, y todos los villanos de las películas tienen bigote.",
            question: "¿Vale esa prueba?",
            options: [
              "Sí, los villanos tienen bigote",
              "No: las películas no son la vida real, y muchísima gente sin ser villana tiene bigote",
              "Sí, es una buena pista",
            ],
            answer: "No: las películas no son la vida real, y muchísima gente sin ser villana tiene bigote",
            hint: "¿Confundir películas con la vida real es buena idea? ¿Cuántas personas con bigote conoces que no son villanas?",
            explicacion:
              "Astubot mezcló ficción con realidad y sacó una regla absurda. Un bigote no prueba nada; se necesitan pruebas de verdad.",
          },
          {
            id: "c8f-r2",
            mechanic: "orden",
            prompt: "Para acusar bien al villano en el concurso, hay reglas de oro:",
            question: "Ordena los pasos.",
            steps: [
              "Reunir todas las pruebas",
              "Verificar que sean ciertas",
              "Descartar sospechosos que no encajan",
              "Nombrar al villano con calma",
            ],
            hint: "No puedes descartar sin haber verificado; no puedes nombrar sin descartar a los demás.",
            explicacion:
              "Reunir, verificar, descartar y por último nombrar al culpable.",
          },
          {
            id: "c8f-r3",
            mechanic: "patron",
            prompt: "El villano dejó una tarjeta con esta serie:",
            clues: ["2 → 3 → 5 → 8 → 13 → ❓"],
            question: "¿Cuál sigue?",
            options: ["18", "21", "26"],
            answer: "21",
            hint: "Cada número es la suma de los dos anteriores: 2+3=5, 3+5=8, 5+8=13… sigue 8+13.",
            explicacion:
              "Cada número es la suma de los dos anteriores (serie de Fibonacci): 8 + 13 = 21.",
          },
          {
            id: "c8f-r4",
            mechanic: "error",
            prompt: "El villano confesó, pero se le escaparon frases contradictorias:",
            clues: [
              "“Nunca he estado en el museo.”",
              "“Robé el diamante en el museo la semana pasada.”",
              "“Ni siquiera sé dónde queda el museo.”",
              "“Todo esto es mentira, no me culpes.”",
            ],
            question: "¿Cuáles frases se contradicen?",
            options: [
              "“Nunca he estado en el museo” con “Robé el diamante en el museo”",
              "“Todo es mentira” con “No me culpes”",
              "“Robé el diamante” con “No me culpes”",
            ],
            answer: "“Nunca he estado en el museo” con “Robé el diamante en el museo”",
            hint: "Si nunca estuvo en el museo, ¿pudo haber robado algo ahí?",
            explicacion:
              "Nunca estuvo Y robó ahí no pueden ser verdad las dos. Se contradice a sí mismo: probablemente el ladrón es él.",
          },
          {
            id: "c8f-r5",
            mechanic: "deduccion",
            prompt: "El villano cumple estas 3 pistas 100% seguras:",
            clues: [
              "Es zurdo.",
              "Tiene los ojos verdes.",
              "Toca la guitarra.",
            ],
            question: "¿Cuál de los sospechosos es?",
            options: [
              "Un hombre diestro, ojos verdes, guitarrista",
              "Un hombre zurdo, ojos verdes, guitarrista",
              "Una mujer zurda, ojos marrones, pianista",
            ],
            answer: "Un hombre zurdo, ojos verdes, guitarrista",
            hint: "Descarta a quien no cumpla las 3 pistas juntas.",
            explicacion:
              "Solo el segundo cumple las tres: zurdo, ojos verdes y guitarrista. ¡Caso resuelto!",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "La foto que engaña",
    emoji: "📸",
    locked: false,
    intro:
      "En internet aparecen fotos y videos “hechos” por IA que parecen reales. Aprende a distinguir lo real de lo falso: es la habilidad más importante de tu generación.",
    cases: [
      {
        id: "c9-deepfake",
        title: "La foto sospechosa",
        emoji: "🖼️",
        minutes: 5,
        brief:
          "Alguien comparte una foto increíble en redes. ¿Es de verdad o la hizo una IA? Aprende a mirar con lupa.",
        retos: [
          {
            id: "c9d-r1",
            mechanic: "ia",
            prompt: "Circula una foto “del presidente bailando con un elefante”.",
            aiSays:
              "La foto es real, la vi en internet y las fotos de internet son de verdad.",
            question: "¿La foto es de verdad solo porque está en internet?",
            options: [
              "Sí, si está publicada es real",
              "No: cualquiera puede publicar una foto falsa hecha por IA",
              "Sí, es imposible falsificar fotos",
            ],
            answer: "No: cualquiera puede publicar una foto falsa hecha por IA",
            hint: "Hoy las IA hacen fotos que parecen reales pero no lo son. ¿Basta con que esté publicada?",
            explicacion:
              "Estar en internet no prueba que algo sea real. Las IA generan fotos falsas cada día. Antes de creer, hay que verificar en fuentes serias.",
          },
          {
            id: "c9d-r2",
            mechanic: "comprension",
            prompt: "Un artículo explica cómo saber si una foto es falsa:",
            clues: [
              "“Mira las manos con atención: las IA suelen dibujar dedos raros o de más.",
              "Fíjate en las letras del fondo: muchas veces salen ilegibles.",
              "Y busca la foto en varios lugares distintos:",
              "si solo está en un sitio raro, sospecha.”",
            ],
            question: "¿Cuál NO es una pista para sospechar de una foto?",
            options: [
              "Que las manos se vean raras",
              "Que las letras del fondo no se entiendan",
              "Que la foto tenga muchos colores brillantes",
            ],
            answer: "Que la foto tenga muchos colores brillantes",
            hint: "El texto menciona manos, letras y aparecer solo en un sitio raro. ¿Habla de colores?",
            explicacion:
              "El texto habla de manos, letras del fondo y de que solo aparezca en un sitio raro. Los colores brillantes no son una señal de que sea IA.",
          },
          {
            id: "c9d-r3",
            mechanic: "ia",
            prompt: "Tu amigo dice: “un video famoso muestra a un actor diciendo algo horrible”.",
            aiSays:
              "El video es real, lo puedes ver aquí, y por eso el actor es una mala persona. Compártelo con todos.",
            question: "¿Qué haces?",
            options: [
              "Lo comparto, si está en video es cierto",
              "No comparto: primero busco si es un “deepfake” (video falso hecho por IA)",
              "Comparto solo con mis amigos, no pasa nada",
            ],
            answer: "No comparto: primero busco si es un “deepfake” (video falso hecho por IA)",
            hint: "Compartir sin verificar puede lastimar a alguien inocente. ¿Qué tal si lo hizo una IA?",
            explicacion:
              "Los videos falsos hechos por IA se llaman “deepfakes”. Antes de compartir, hay que verificar en noticias serias; compartir cosas falsas hace mucho daño.",
          },
          {
            id: "c9d-r4",
            mechanic: "orden",
            prompt: "Para saber si una foto o video es falso:",
            question: "Ordena los pasos.",
            steps: [
              "Mirar bien los detalles (manos, letras, sombras)",
              "Buscar la imagen en Google Imágenes al revés",
              "Ver si aparece en noticias serias",
              "Decidir si es real o falsa",
            ],
            hint: "Primero miras, luego buscas, después comparas con noticias y al final decides.",
            explicacion:
              "Se observan detalles, se busca la imagen al revés, se revisa si aparece en fuentes serias y solo entonces se decide.",
          },
          {
            id: "c9d-r5",
            mechanic: "deduccion",
            prompt:
              "Tres personas dicen si una foto es falsa. Solo UNA miente. ¿A quién le crees?",
            clues: [
              "Un periodista serio: “La foto es falsa, fue hecha con IA.”",
              "Un desconocido en redes: “La foto es real, lo juro.”",
              "Otro desconocido: “El desconocido dice la verdad.”",
            ],
            question: "¿Quién miente?",
            options: [
              "El periodista serio",
              "El primer desconocido en redes",
              "El segundo desconocido",
            ],
            answer: "El primer desconocido en redes",
            hint: "Si el desconocido dijera la verdad, el otro también, y el periodista mentiría. Pero solo miente uno.",
            explicacion:
              "Si el desconocido fuera sincero, el otro también, y ambos mentirían el periodista → mentirían dos. Como solo miente uno, el mentiroso es el desconocido: la foto sí es falsa.",
          },
        ],
      },
      {
        id: "c9-fuente",
        title: "¿De dónde vino esto?",
        emoji: "🔗",
        minutes: 5,
        brief:
          "Aprende a rastrear de dónde vienen las noticias y las imágenes. Es lo que hacen los detectives modernos.",
        retos: [
          {
            id: "c9f-r1",
            mechanic: "ia",
            prompt:
              "Un mensaje reenviado dice: “¡Se cancelaron las clases mañana!”. Astubot lo confirma.",
            aiSays:
              "Sí, se cancelaron las clases. Lo sé porque me llegó el mismo mensaje reenviado.",
            question: "¿Es una prueba buena?",
            options: [
              "Sí, si Astubot lo confirma es verdad",
              "No: un mensaje reenviado no es una fuente; hay que revisar la página del colegio",
              "Sí, mejor no ir a clase",
            ],
            answer: "No: un mensaje reenviado no es una fuente; hay que revisar la página del colegio",
            hint: "Los mensajes reenviados no tienen fuente. ¿Quién debería confirmar oficialmente si hay clase?",
            explicacion:
              "Un mensaje reenviado no es una prueba: cualquiera pudo empezarlo. La fuente oficial es el colegio; hay que verificar allí antes de creer.",
          },
          {
            id: "c9f-r2",
            mechanic: "ia",
            prompt: "Un anuncio dice que un famoso “recomienda” un producto mágico.",
            aiSays:
              "El famoso realmente lo recomienda; sale su cara y su voz en el video.",
            question: "¿Confías?",
            options: [
              "Sí, sale su cara y voz",
              "No: las IA copian caras y voces (“deepfakes”), hay que buscar si el famoso lo dijo en su cuenta oficial",
              "Sí, si lo dice él, es bueno",
            ],
            answer: "No: las IA copian caras y voces (“deepfakes”), hay que buscar si el famoso lo dijo en su cuenta oficial",
            hint: "Hoy las IA pueden imitar la cara y la voz de cualquiera. ¿Cómo compruebas que el famoso lo dijo?",
            explicacion:
              "Cara y voz ya no bastan como prueba: las IA los imitan. Se busca la cuenta oficial del famoso para ver si él mismo lo publicó.",
          },
          {
            id: "c9f-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Una noticia dice que se compartió 100 veces en 1 hora. En 2 horas cuánto es… (al mismo ritmo).",
                question: "¿Cuántas veces?",
                options: ["150", "200", "300"],
                answer: "200",
                hint: "Al mismo ritmo, cada hora son 100 veces: 100 + 100.",
                explicacion: "100 por hora × 2 horas = 200 veces.",
              },
              "10-12": {
                prompt: "Una noticia falsa se comparte 40 veces por minuto. La real, 15. En 6 minutos, ¿por cuántas veces más gana la falsa?",
                question: "¿Cuál es la diferencia?",
                options: ["120 veces", "150 veces", "180 veces"],
                answer: "150 veces",
                hint: "Calcula cada una en 6 minutos y resta.",
                explicacion: "Falsa: 40 × 6 = 240. Real: 15 × 6 = 90. Diferencia: 240 − 90 = 150.",
              },
            },
          },
          {
            id: "c9f-r4",
            mechanic: "comprension",
            prompt: "Un texto sobre noticias en internet dice:",
            clues: [
              "“Una noticia con fuente es la que dice de dónde salió la información.",
              "Puede ser un periódico serio, un experto,",
              "o un documento oficial que se puede consultar.”",
            ],
            question: "¿Qué es una noticia sin fuente?",
            options: [
              "Una noticia con muchas imágenes",
              "Una noticia que no dice de dónde salió la información",
              "Una noticia larga",
            ],
            answer: "Una noticia que no dice de dónde salió la información",
            hint: "El texto lo dice claro: “con fuente” = dice de dónde salió. “Sin fuente” es lo contrario.",
            explicacion:
              "El texto define fuente como “decir de dónde salió la información”. Una noticia sin fuente no dice de dónde viene.",
          },
          {
            id: "c9f-r5",
            mechanic: "orden",
            prompt: "Para verificar una noticia antes de creerla:",
            question: "Ordena los pasos.",
            steps: [
              "Leer bien la noticia entera",
              "Buscar quién la publicó primero",
              "Comparar con otras fuentes serias",
              "Decidir si le creo o no",
            ],
            hint: "Primero lees, después investigas de dónde viene, luego comparas y al final decides.",
            explicacion:
              "Leer, rastrear la fuente, comparar con fuentes serias y decidir.",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "El gran final",
    emoji: "👑",
    locked: false,
    intro:
      "Llegaste al último capítulo. El villano usa una IA para engañar al mundo entero. Todo lo que aprendiste te va a servir. Pensar mejor que la máquina es tu superpoder.",
    cases: [
      {
        id: "c10-plan",
        title: "El plan de la IA malvada",
        emoji: "🕳️",
        minutes: 5,
        brief:
          "La IA del villano manda mensajes falsos por todos lados para confundir a la gente. Detén su plan.",
        retos: [
          {
            id: "c10p-r1",
            mechanic: "ia",
            prompt: "La IA malvada asegura tener “la verdad absoluta”.",
            aiSays:
              "Yo soy la IA más avanzada del mundo, así que todo lo que digo es verdad. Créeme sin dudar.",
            question: "¿Qué haces?",
            options: [
              "Le creo, es la IA más avanzada",
              "Dudo siempre: ninguna IA (por avanzada que sea) tiene “la verdad absoluta”",
              "Le creo a veces, cuando dice cosas fáciles",
            ],
            answer: "Dudo siempre: ninguna IA (por avanzada que sea) tiene “la verdad absoluta”",
            hint: "“Créeme sin dudar” es la señal más clara de que hay que dudar. ¿Alguien que sabe todo?",
            explicacion:
              "Ninguna IA tiene la verdad absoluta. Cuando alguien (persona o máquina) te pide “creer sin dudar”, es cuando más hay que dudar.",
          },
          {
            id: "c10p-r2",
            mechanic: "ia",
            prompt: "La IA malvada te muestra una encuesta.",
            aiSays:
              "El 100% de las personas está de acuerdo conmigo: 3 amigos que consulté dijeron que sí.",
            question: "¿La encuesta es válida?",
            options: [
              "Sí, 100% es 100%",
              "No: preguntar solo a 3 amigos no representa a “todas las personas”",
              "Sí, es una prueba fuerte",
            ],
            answer: "No: preguntar solo a 3 amigos no representa a “todas las personas”",
            hint: "3 amigos no son “el mundo”. ¿Cuánta gente cabe en el mundo?",
            explicacion:
              "“100% de 3 amigos” no es “100% del mundo”. Las IA a veces confunden una muestra pequeñita con “todo el mundo”. Hay que fijarse en el tamaño de la muestra.",
          },
          {
            id: "c10p-r3",
            mechanic: "error",
            prompt: "La IA malvada da su plan por escrito. Una parte es imposible:",
            clues: [
              "“Voy a mandar el mensaje a todos, sin excepción.”",
              "“Solo llegará a los mayores de edad.”",
              "“Nadie que sea niño lo verá.”",
              "“Va por todas las redes.”",
            ],
            question: "¿Qué se contradice?",
            options: [
              "“A todos, sin excepción” con “solo a los mayores de edad”",
              "“Va por todas las redes” con “A todos, sin excepción”",
              "“Nadie que sea niño lo verá” con “Va por todas las redes”",
            ],
            answer: "“A todos, sin excepción” con “solo a los mayores de edad”",
            hint: "Si va “a todos sin excepción”, ¿puede al mismo tiempo ir solo a los mayores?",
            explicacion:
              "“A todos sin excepción” y “solo a mayores” dicen cosas opuestas. Las dos no pueden ser verdad.",
          },
          {
            id: "c10p-r4",
            mechanic: "orden",
            prompt: "Para desactivar la IA malvada hay un plan:",
            question: "Ordena los pasos.",
            steps: [
              "Encontrar el servidor donde vive la IA",
              "Cortar su conexión a internet",
              "Apagar el servidor con cuidado",
              "Guardar copias de las pruebas",
            ],
            hint: "No puedes cortar la conexión sin encontrarla; no puedes apagar sin cortar; hay que salvar las pruebas al final.",
            explicacion:
              "Encontrar el servidor, cortar internet, apagarlo con cuidado y guardar las pruebas.",
          },
          {
            id: "c10p-r5",
            mechanic: "patron",
            prompt: "El código para desactivar la IA sigue esta secuencia:",
            clues: ["1 → 1 → 2 → 3 → 5 → 8 → ❓"],
            question: "¿Qué número sigue?",
            options: ["10", "13", "16"],
            answer: "13",
            hint: "Cada número es la suma de los dos anteriores: 3+5=8, 5+8=?",
            explicacion:
              "Serie de Fibonacci: cada número es la suma de los dos anteriores. 5 + 8 = 13.",
          },
        ],
      },
      {
        id: "c10-verdad",
        title: "El detective mejor que la máquina",
        emoji: "🕵️",
        minutes: 5,
        brief:
          "Última prueba: usa todo lo aprendido para desenmascarar al villano. La IA no podrá contigo.",
        retos: [
          {
            id: "c10v-r1",
            mechanic: "deduccion",
            prompt:
              "Tres sospechosos son los últimos en pie. Solo UNO miente y ese es el villano.",
            clues: [
              "Alfa: “Yo no soy el villano.”",
              "Beta: “Alfa es el villano.”",
              "Gamma: “Beta dice la verdad.”",
            ],
            question: "¿Quién es el villano?",
            options: ["Alfa", "Beta", "Gamma"],
            answer: "Alfa",
            hint: "Si Alfa dijera la verdad, Beta y Gamma mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Alfa fuera sincero, Beta y Gamma mentirían a la vez. Como solo miente uno, el mentiroso es Alfa: él es el villano.",
          },
          {
            id: "c10v-r2",
            mechanic: "ia",
            prompt: "El villano intenta convencerte con Astubot.",
            aiSays:
              "Astubot revisó millones de datos y dice que soy inocente. Los datos no mienten.",
            question: "¿Qué haces?",
            options: [
              "Le creo, son millones de datos",
              "Dudo: los datos pueden estar mal elegidos, y las IA a veces se equivocan al analizar",
              "Le creo a medias",
            ],
            answer: "Dudo: los datos pueden estar mal elegidos, y las IA a veces se equivocan al analizar",
            hint: "“Millones de datos” suena impresionante, pero: ¿quién los eligió? ¿y si son datos mal escogidos?",
            explicacion:
              "“Los datos no mienten” es una frase peligrosa: los datos pueden estar mal elegidos, incompletos o interpretados con error. La cantidad no garantiza la verdad.",
          },
          {
            id: "c10v-r3",
            mechanic: "comprension",
            prompt: "Encontraste la carta final del villano:",
            clues: [
              "“Escondí las pruebas en el único lugar donde nadie mira:",
              "detrás del cuadro más feo del edificio,",
              "en el pasillo que casi nadie usa,",
              "cerca de la salida de emergencia.”",
            ],
            question: "¿Dónde están las pruebas?",
            options: [
              "En el pasillo poco usado, detrás del cuadro feo cerca de la salida de emergencia",
              "En la oficina del villano",
              "En la sala principal",
            ],
            answer: "En el pasillo poco usado, detrás del cuadro feo cerca de la salida de emergencia",
            hint: "El texto junta tres pistas: cuadro feo, pasillo poco usado y cerca de la salida de emergencia.",
            explicacion:
              "Todas las pistas apuntan al mismo lugar: detrás del cuadro feo, en el pasillo poco usado, cerca de la salida de emergencia.",
          },
          {
            id: "c10v-r4",
            mechanic: "ia",
            prompt: "Al final, Astubot te da un mensaje.",
            aiSays:
              "Aprendiste algo importante: yo, la IA, soy útil, pero puedo equivocarme. Tu trabajo es pensar por ti mismo.",
            question: "¿Le crees a Astubot esta vez?",
            options: [
              "No, ya no le creo a Astubot nunca",
              "Sí, y además esa idea puedo verificarla: la IA de verdad se equivoca, y pensar por uno mismo importa",
              "Sí, sin verificar nada",
            ],
            answer: "Sí, y además esa idea puedo verificarla: la IA de verdad se equivoca, y pensar por uno mismo importa",
            hint: "El mensaje es verdadero: puedes comprobarlo con todo lo que jugaste. Astubot se equivocó muchas veces.",
            explicacion:
              "La lección es la clave del mundo actual: la IA es útil, pero se equivoca. Tu superpoder es pensar por ti mismo y verificar. ¡Felicidades, gran detective!",
          },
          {
            id: "c10v-r5",
            mechanic: "orden",
            prompt: "Para resolver cualquier caso (con IA o sin IA), este es el método del gran detective:",
            question: "Ordena los pasos del método.",
            steps: [
              "Reunir información de varias fuentes",
              "Dudar de lo que suena raro o demasiado seguro",
              "Verificar cada pista importante",
              "Decidir usando tu cabeza, no la de otros",
            ],
            hint: "Reunir, dudar, verificar, decidir: en ese orden.",
            explicacion:
              "El método del gran detective: reunir, dudar, verificar, decidir. Con ese método piensas mejor que cualquier máquina. 🕵️👑",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "La escuela de detectives",
    emoji: "🎓",
    locked: false,
    intro:
      "Abriste una escuela para nuevos detectives. Tus alumnos son curiosos pero se dejan engañar fácil. Enséñales a pensar como tú.",
    cases: [
      {
        id: "c11-clase1",
        title: "Primer día de clases",
        emoji: "📚",
        minutes: 5,
        brief:
          "Tres alumnos empiezan hoy. Cada uno trae un caso pequeño. Ayúdalos usando lo que aprendiste.",
        retos: [
          {
            id: "c11a-r1",
            mechanic: "deduccion",
            prompt: "Tres alumnos hablan del examen. Solo UNO miente.",
            clues: [
              "Rita: “Yo no copié en el examen.”",
              "Sam: “Rita copió.”",
              "Tim: “Sam dice la verdad.”",
            ],
            question: "¿Quién copió?",
            options: ["Rita", "Sam", "Tim"],
            answer: "Rita",
            hint: "Si Rita dijera la verdad, Sam y Tim mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Rita fuera sincera, Sam y Tim mentirían a la vez. Como solo miente uno, la mentirosa es Rita.",
          },
          {
            id: "c11a-r2",
            mechanic: "comprension",
            prompt: "Una alumna te lee su primera pista escrita:",
            clues: [
              "“Perdí mi mochila donde el sol pega primero,",
              "en el lugar donde llegan los que caminan de la calle,",
              "el sitio más grande del colegio, con muchas puertas.”",
            ],
            question: "¿Dónde está la mochila?",
            options: [
              "En la entrada del colegio",
              "En el patio pequeño",
              "En la biblioteca",
            ],
            answer: "En la entrada del colegio",
            hint: "“Donde llegan los que caminan de la calle” y “muchas puertas” apuntan al mismo lugar.",
            explicacion:
              "La entrada del colegio es donde llegan de la calle, tiene muchas puertas y el sol pega primero.",
          },
          {
            id: "c11a-r3",
            mechanic: "ia",
            prompt:
              "Tu alumno le pidió a la IA la respuesta de una tarea. Ella respondió con seguridad.",
            aiSays:
              "La capital de Francia es Berlín. Estoy segura, lo aprendí en mis datos.",
            question: "¿Qué le dices a tu alumno?",
            options: [
              "Le digo que anote Berlín, la IA lo sabe",
              "Le digo que verifique en un mapa o enciclopedia: la IA se equivocó",
              "Le digo que confíe siempre",
            ],
            answer: "Le digo que verifique en un mapa o enciclopedia: la IA se equivocó",
            hint: "¿Sabes qué ciudad es la capital de Francia? La IA a veces dice cosas conocidamente falsas.",
            explicacion:
              "La capital de Francia es París, no Berlín. La IA puede equivocarse hasta en cosas básicas; siempre hay que verificar en fuentes confiables (mapas, enciclopedias, adultos).",
          },
          {
            id: "c11a-r4",
            mechanic: "patron",
            prompt: "Los pupitres de la clase tienen números en fila:",
            clues: ["2 → 5 → 8 → 11 → 14 → ❓"],
            question: "¿Qué número sigue?",
            options: ["15", "16", "17"],
            answer: "17",
            hint: "Cada número es 3 más que el anterior.",
            explicacion: "Sube de a 3: 14 + 3 = 17.",
          },
          {
            id: "c11a-r5",
            mechanic: "orden",
            prompt: "Para enseñar el método detective, escribes los pasos:",
            question: "Ordénalos para tus alumnos.",
            steps: [
              "Escuchar el caso completo",
              "Escribir todas las pistas",
              "Buscar contradicciones",
              "Explicar la conclusión con calma",
            ],
            hint: "Primero escuchas, después anotas, luego analizas y al final explicas.",
            explicacion: "Escuchar, escribir, buscar contradicciones y explicar. Un buen detective enseña con orden.",
          },
        ],
      },
      {
        id: "c11-clase2",
        title: "El examen sorpresa",
        emoji: "📝",
        minutes: 5,
        brief:
          "Un examen apareció publicado antes de tiempo. Alguien lo copió. Descubre quién.",
        retos: [
          {
            id: "c11b-r1",
            mechanic: "error",
            prompt: "Un alumno explica dónde estaba a la hora del robo del examen:",
            clues: [
              "“Estuve toda la tarde en la biblioteca, solo.”",
              "“No hablé con nadie.”",
              "“Le pregunté a la bibliotecaria por un libro.”",
              "“No salí ni al baño.”",
            ],
            question: "¿Qué frase se contradice?",
            options: [
              "“Le pregunté a la bibliotecaria por un libro.”",
              "“No salí ni al baño.”",
              "“Estuve solo toda la tarde.”",
            ],
            answer: "“Le pregunté a la bibliotecaria por un libro.”",
            hint: "Si estuvo solo y no habló con nadie, ¿pudo preguntarle a la bibliotecaria?",
            explicacion:
              "Dijo que no habló con nadie y a la vez que le preguntó a la bibliotecaria. Las dos no pueden ser verdad.",
          },
          {
            id: "c11b-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Hay 20 alumnos y el 5 sacaron 10 en el examen sorpresa.",
                question: "¿Cuántos NO sacaron 10?",
                options: ["10", "15", "25"],
                answer: "15",
                hint: "Total 20, menos los 5 que sacaron 10.",
                explicacion: "20 − 5 = 15 alumnos no sacaron 10.",
              },
              "10-12": {
                prompt: "En un salón hay 32 alumnos. 3/4 aprobaron el examen; los demás no.",
                question: "¿Cuántos no aprobaron?",
                options: ["6", "8", "10"],
                answer: "8",
                hint: "3/4 aprobaron: son 24. Los que no: 32 − 24.",
                explicacion: "32 × 3/4 = 24 aprobaron; 32 − 24 = 8 no aprobaron.",
              },
            },
          },
          {
            id: "c11b-r3",
            mechanic: "ia",
            prompt:
              "El director le pide a la IA que analice las respuestas y encuentre al copión.",
            aiSays:
              "El copión es el alumno más callado, porque los alumnos callados siempre son los más sospechosos.",
            question: "¿Aceptas ese análisis?",
            options: [
              "Sí, es la IA analizando",
              "No: “ser callado” no es una prueba, hay que buscar pruebas reales",
              "Sí, los callados son sospechosos",
            ],
            answer: "No: “ser callado” no es una prueba, hay que buscar pruebas reales",
            hint: "¿Ser callado es un delito? La IA está juzgando por una característica personal, no por hechos.",
            explicacion:
              "La IA usó un prejuicio (todos los callados son sospechosos), no una prueba. Nunca acuses a alguien por cómo es, sino por lo que hizo.",
          },
          {
            id: "c11b-r4",
            mechanic: "deduccion",
            prompt: "Tres alumnos vieron al copión. Solo UNO miente.",
            clues: [
              "Val: “Yo no fui.”",
              "Zac: “Val fue.”",
              "Ada: “Zac dice la verdad.”",
            ],
            question: "¿Quién copió el examen?",
            options: ["Val", "Zac", "Ada"],
            answer: "Val",
            hint: "Si Val dijera la verdad, Zac y Ada mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Val fuera sincero, Zac y Ada mentirían a la vez, pero solo miente uno. El mentiroso es Val.",
          },
          {
            id: "c11b-r5",
            mechanic: "orden",
            prompt: "Para presentar el caso al director, sigues estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Reunir las pruebas verdaderas",
              "Descartar los prejuicios",
              "Escribir un informe claro",
              "Presentarlo al director",
            ],
            hint: "Primero pruebas, después quitas prejuicios, luego escribes, al final presentas.",
            explicacion:
              "Reunir, descartar prejuicios, escribir el informe y presentar. Así se hace justicia.",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "El museo digital",
    emoji: "💻",
    locked: false,
    intro:
      "Ahora los ladrones roban por internet: contraseñas, cuentas, información. Aprende a protegerte y a atraparlos en su propio mundo.",
    cases: [
      {
        id: "c12-clave",
        title: "La contraseña robada",
        emoji: "🔑",
        minutes: 5,
        brief:
          "Alguien entró a la cuenta del museo y borró archivos. La contraseña fue robada. Averigua cómo.",
        retos: [
          {
            id: "c12a-r1",
            mechanic: "ia",
            prompt:
              "Un mensaje llegó al correo del museo: “Confirma tu clave aquí o te bloqueamos la cuenta”.",
            aiSays:
              "El mensaje suena urgente y viene con el logo del museo. Debe ser real.",
            question: "¿Qué haces?",
            options: [
              "Confirmo mi clave, es urgente",
              "No respondo: los correos que piden claves con urgencia son casi siempre trampas (phishing)",
              "La escribo pero solo una parte",
            ],
            answer:
              "No respondo: los correos que piden claves con urgencia son casi siempre trampas (phishing)",
            hint: "Ningún servicio serio te pide tu contraseña por correo, y menos con urgencia. ¿Cómo verificas?",
            explicacion:
              "Los mensajes urgentes que piden claves son “phishing”: engaños para robar información. Un logo es fácil de copiar. Nunca escribas tu clave por respuesta a un mensaje.",
          },
          {
            id: "c12a-r2",
            mechanic: "comprension",
            prompt: "Una guía de seguridad dice:",
            clues: [
              "“Una contraseña fuerte tiene al menos 8 letras,",
              "mezcla letras, números y símbolos,",
              "y no incluye tu nombre ni tu fecha de nacimiento.”",
            ],
            question: "¿Cuál de estas es una contraseña fuerte?",
            options: ["María1998", "P3rr0!luna", "12345678"],
            answer: "P3rr0!luna",
            hint: "El texto pide letras, números Y símbolos, y no usar nombre ni fecha. ¿Cuál cumple las 3 cosas?",
            explicacion:
              "P3rr0!luna tiene letras, números y símbolo (!), es larga y no usa nombre ni fecha. Es la única que cumple.",
          },
          {
            id: "c12a-r3",
            mechanic: "patron",
            prompt: "Un hacker prueba claves siguiendo este patrón:",
            clues: ["1a → 2b → 3c → 4d → ❓"],
            question: "¿Qué sigue?",
            options: ["5e", "5f", "4e"],
            answer: "5e",
            hint: "El número sube de 1 en 1, y la letra también avanza al siguiente lugar del abecedario.",
            explicacion: "Número: 4 + 1 = 5. Letra: después de d viene e. Entonces 5e.",
          },
          {
            id: "c12a-r4",
            mechanic: "orden",
            prompt: "Para crear una contraseña segura sigues estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Pensar en algo largo que solo tú recuerdes",
              "Mezclar con números y símbolos",
              "Escribirla en un lugar seguro (no en el celular)",
              "No decirla nunca a nadie",
            ],
            hint: "Primero la piensas, después la mezclas, luego la guardas y al final la proteges.",
            explicacion:
              "Piensa, mezcla, guarda y proteje. Ese es el orden de una clave segura.",
          },
          {
            id: "c12a-r5",
            mechanic: "deduccion",
            prompt: "Tres personas tenían acceso a la clave. Solo UNA miente.",
            clues: [
              "Ken: “No compartí la clave.”",
              "Lía: “Ken la compartió.”",
              "Mel: “Lía dice la verdad.”",
            ],
            question: "¿Quién compartió la clave?",
            options: ["Ken", "Lía", "Mel"],
            answer: "Ken",
            hint: "Si Ken dijera la verdad, Lía y Mel mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Ken fuera sincero, Lía y Mel mentirían a la vez. Como solo miente uno, el mentiroso es Ken.",
          },
        ],
      },
      {
        id: "c12-red",
        title: "El robo en la red",
        emoji: "🌐",
        minutes: 5,
        brief:
          "Un archivo importante desapareció de la nube. Sigue las pistas digitales hasta el ladrón.",
        retos: [
          {
            id: "c12b-r1",
            mechanic: "ia",
            prompt:
              "Un amigo comparte contigo un enlace “con un premio gratis para ti”.",
            aiSays:
              "El enlace es seguro, mi asistente virtual dice que sí porque termina en .com.",
            question: "¿Confías en el enlace?",
            options: [
              "Sí, si termina en .com es seguro",
              "No: “termina en .com” no significa nada; los enlaces sospechosos con “premios gratis” suelen ser trampa",
              "Sí, es un premio",
            ],
            answer:
              "No: “termina en .com” no significa nada; los enlaces sospechosos con “premios gratis” suelen ser trampa",
            hint: "¿Los premios gratis por internet suelen ser reales? ¿Un .com dice algo del contenido?",
            explicacion:
              "Cualquiera puede comprar un dominio .com. “Premio gratis” casi siempre es un anzuelo para robar datos o meter virus. Verifica antes de tocar.",
          },
          {
            id: "c12b-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El museo tiene 6 computadores. En cada uno hay 5 archivos importantes.",
                question: "¿Cuántos archivos importantes hay?",
                options: ["11", "30", "25"],
                answer: "30",
                hint: "6 computadores, 5 archivos cada uno.",
                explicacion: "6 × 5 = 30 archivos.",
              },
              "10-12": {
                prompt: "Hay 4 servidores con 250 archivos cada uno. Un hacker robó el 10% de todos.",
                question: "¿Cuántos archivos robó?",
                options: ["25", "100", "40"],
                answer: "100",
                hint: "Total: 4 × 250 = 1000. El 10% es 1000/10.",
                explicacion: "4 × 250 = 1000 archivos. 10% de 1000 = 100 robados.",
              },
            },
          },
          {
            id: "c12b-r3",
            mechanic: "error",
            prompt: "Un guardia de seguridad escribió su informe:",
            clues: [
              "“Estuve mirando las cámaras de seguridad toda la noche.”",
              "“Ninguna alarma sonó.”",
              "“Vi al ladrón entrando por la puerta trasera a las 3 am.”",
              "“No hubo actividad sospechosa.”",
            ],
            question: "¿Qué frases se contradicen?",
            options: [
              "“Vi al ladrón entrando” con “No hubo actividad sospechosa”",
              "“Ninguna alarma sonó” con “Estuve mirando las cámaras”",
              "“Toda la noche” con “A las 3 am”",
            ],
            answer: "“Vi al ladrón entrando” con “No hubo actividad sospechosa”",
            hint: "Si vio a un ladrón entrar, ¿eso no es actividad sospechosa?",
            explicacion:
              "Ver a un ladrón es la definición de actividad sospechosa. El guardia se contradice, probablemente encubre algo.",
          },
          {
            id: "c12b-r4",
            mechanic: "patron",
            prompt: "Las direcciones IP sospechosas siguen este patrón:",
            clues: ["192 → 168 → 192 → 168 → 168 → 192 → 168 → 168 → 168 → ❓"],
            question: "¿Qué número sigue?",
            options: ["192", "168", "200"],
            answer: "192",
            hint: "Cuenta cuántos 168 hay entre cada 192: 1, 2, 3… ¿qué toca ahora?",
            explicacion:
              "El patrón crece: 1 vez 168, luego 2, luego 3. Después de 3 unos ochos, toca un 192.",
          },
          {
            id: "c12b-r5",
            mechanic: "orden",
            prompt: "Para atrapar al hacker sigues el protocolo digital:",
            question: "Ordena los pasos.",
            steps: [
              "Rastrear la IP desde donde se conectó",
              "Congelar la cuenta afectada",
              "Guardar copia de las pruebas",
              "Denunciar a la policía cibernética",
            ],
            hint: "Primero rastreas, después proteges la cuenta, luego guardas pruebas, y al final denuncias.",
            explicacion: "Rastrear, congelar, guardar y denunciar. Un buen detective digital sigue este orden.",
          },
        ],
      },
    ],
  },
  {
    id: 13,
    title: "La ciudad de las noticias falsas",
    emoji: "📰",
    locked: false,
    intro:
      "Una ciudad entera está confundida: en las redes circulan noticias inventadas y todos discuten. Tu misión: separar lo verdadero de lo falso.",
    cases: [
      {
        id: "c13-titular",
        title: "El titular alarmante",
        emoji: "📢",
        minutes: 5,
        brief:
          "Un titular en redes dice algo tremendo. Antes de que la ciudad se asuste, investiga si es cierto.",
        retos: [
          {
            id: "c13a-r1",
            mechanic: "ia",
            prompt:
              "El titular dice: “¡Van a cancelar las vacaciones para siempre!”",
            aiSays:
              "Lo leí en varias cuentas de redes sociales. Todas dicen lo mismo, entonces es verdad.",
            question: "¿Es prueba suficiente?",
            options: [
              "Sí, si varios lo dicen es verdad",
              "No: varias cuentas pueden estar copiando la misma noticia falsa",
              "Sí, cancelemos las vacaciones",
            ],
            answer: "No: varias cuentas pueden estar copiando la misma noticia falsa",
            hint: "Que muchas cuentas repitan lo mismo no lo hace verdad. ¿De dónde salió al principio?",
            explicacion:
              "Una mentira compartida por 1000 personas sigue siendo mentira. Hay que buscar la fuente original y verificar en periódicos serios.",
          },
          {
            id: "c13a-r2",
            mechanic: "comprension",
            prompt: "Un periodista explica cómo se detecta una noticia falsa:",
            clues: [
              "“Fíjate en el titular: si usa MAYÚSCULAS y signos de admiración,",
              "es probable que quiera asustarte más que informarte.",
              "Y si no menciona quién es el reportero ni de qué medio viene,",
              "sospecha aún más.”",
            ],
            question: "¿Cuál titular es más sospechoso de ser falso?",
            options: [
              "“Se aprobó una ley para modificar el horario escolar”, El Diario, por María López",
              "“¡¡¡CANCELAN TODO YA!!! Se acabó todo”, sin autor",
              "“Consejo de padres se reúne mañana”, Noticias Locales, por Ana Ruiz",
            ],
            answer: "“¡¡¡CANCELAN TODO YA!!! Se acabó todo”, sin autor",
            hint: "El texto dice: MAYÚSCULAS + signos de admiración + sin autor = sospechoso.",
            explicacion:
              "El segundo tiene TODO lo que el texto describe como sospechoso: mayúsculas, exclamaciones y sin autor ni medio.",
          },
          {
            id: "c13a-r3",
            mechanic: "ia",
            prompt: "Astubot te ayuda a “verificar” la noticia.",
            aiSays:
              "Verifiqué la noticia buscándola en internet. Aparece en 12 páginas. Es 100% real.",
            question: "¿La verificación de Astubot es buena?",
            options: [
              "Sí, aparece en muchos lugares",
              "No: “aparecer en 12 páginas” no prueba nada si son páginas que se copian entre sí",
              "Sí, 100% es 100%",
            ],
            answer:
              "No: “aparecer en 12 páginas” no prueba nada si son páginas que se copian entre sí",
            hint: "Las páginas de noticias falsas suelen copiarse unas a otras. ¿Aparecer mucho = ser cierto?",
            explicacion:
              "Verificar bien es buscar en fuentes serias distintas, no contar cuántas veces aparece algo. La cantidad no es prueba.",
          },
          {
            id: "c13a-r4",
            mechanic: "orden",
            prompt: "Antes de compartir una noticia, sigue estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Leerla completa (no solo el titular)",
              "Buscar quién la escribió y dónde",
              "Comparar con otras fuentes serias",
              "Decidir si vale la pena compartirla",
            ],
            hint: "Leer, investigar la fuente, comparar y decidir.",
            explicacion:
              "Leer completa, investigar autor y medio, comparar con fuentes serias, decidir. Nunca compartas sin haber pasado por esos 4 pasos.",
          },
          {
            id: "c13a-r5",
            mechanic: "deduccion",
            prompt: "Tres testigos declaran quién publicó el titular falso. Solo UNO miente.",
            clues: [
              "Fer: “Yo no publiqué el titular falso.”",
              "Gus: “Fer lo publicó.”",
              "Hia: “Gus dice la verdad.”",
            ],
            question: "¿Quién lo publicó?",
            options: ["Fer", "Gus", "Hia"],
            answer: "Fer",
            hint: "Si Fer dijera la verdad, Gus y Hia mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Fer fuera sincero, Gus y Hia mentirían a la vez, pero solo miente uno. El mentiroso es Fer.",
          },
        ],
      },
      {
        id: "c13-cadena",
        title: "La cadena de mensajes",
        emoji: "📩",
        minutes: 5,
        brief:
          "Un mensaje se está reenviando por todos lados. Detén la cadena si es mentira.",
        retos: [
          {
            id: "c13b-r1",
            mechanic: "ia",
            prompt:
              "El mensaje dice: “Si compartes esto con 10 amigos, WhatsApp te dará premios.”",
            aiSays:
              "Es real, muchos amigos ya lo han compartido y a algunos les llegaron premios.",
            question: "¿Qué haces?",
            options: [
              "Lo comparto para no perderme el premio",
              "No lo comparto: WhatsApp no regala premios por reenviar, es una cadena falsa clásica",
              "Lo comparto con 5, medio premio",
            ],
            answer:
              "No lo comparto: WhatsApp no regala premios por reenviar, es una cadena falsa clásica",
            hint: "¿Las apps de mensajes “regalan premios” por reenviar mensajes? ¿Alguna vez viste un premio real?",
            explicacion:
              "Estas “cadenas de premios” son mentira desde hace años. Ninguna app seria regala nada por reenviar. Reenviar solo ayuda a difundir la mentira.",
          },
          {
            id: "c13b-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Si una persona comparte el mensaje con 3 amigos, y cada uno lo comparte con 3 más:",
                question: "¿A cuántas personas llegó en dos pasos?",
                options: ["6", "9", "12"],
                answer: "9",
                hint: "3 amigos, cada uno se lo pasa a 3: 3 grupos de 3.",
                explicacion: "3 × 3 = 9 personas.",
              },
              "10-12": {
                prompt: "Si en cada paso el mensaje se comparte al doble, empezando con 1 persona, ¿a cuántas llega en el 5° paso?",
                question: "¿Cuántas personas?",
                options: ["16", "32", "10"],
                answer: "32",
                hint: "Paso 1: 2, Paso 2: 4, Paso 3: 8, Paso 4: 16, Paso 5: ?",
                explicacion: "Se duplica cada vez: 2, 4, 8, 16, 32. Muy rápido crece una cadena.",
              },
            },
          },
          {
            id: "c13b-r3",
            mechanic: "error",
            prompt: "El mensaje viral tiene esta redacción:",
            clues: [
              "“Esto es 100% comprobado por científicos famosos.”",
              "“Ningún científico ha dicho nada sobre esto.”",
              "“La ciencia entera lo confirma.”",
              "“Compártelo antes de que lo censuren.”",
            ],
            question: "¿Cuáles frases se contradicen?",
            options: [
              "“Comprobado por científicos famosos” con “Ningún científico dijo nada”",
              "“Ciencia lo confirma” con “Antes de que lo censuren”",
              "“Compártelo” con “Ningún científico”",
            ],
            answer:
              "“Comprobado por científicos famosos” con “Ningún científico dijo nada”",
            hint: "Si NINGÚN científico dijo nada, ¿pudo estar comprobado por científicos famosos?",
            explicacion:
              "El mensaje se contradice a sí mismo: no puede a la vez estar “comprobado por científicos” y “ningún científico dijo nada”. Es mentira.",
          },
          {
            id: "c13b-r4",
            mechanic: "patron",
            prompt: "Los mensajes falsos usan palabras clave con este patrón:",
            clues: ["¡URGENTE! → ¡COMPARTE YA! → ¡URGENTE! → ¡COMPARTE YA! → ¡COMPARTE YA! → ¡URGENTE! → ¡COMPARTE YA! → ¡COMPARTE YA! → ¡COMPARTE YA! → ❓"],
            question: "¿Qué palabra clave viene ahora?",
            options: ["¡URGENTE!", "¡COMPARTE YA!", "¡COMPARTE YA! ¡COMPARTE YA!"],
            answer: "¡URGENTE!",
            hint: "Cuenta los COMPARTE YA entre URGENTE: 1, 2, 3… después de 3, ¿qué toca?",
            explicacion:
              "El patrón crece de a 1: después de cada URGENTE viene 1, luego 2, luego 3 COMPARTE YA. Ya pasaron 3, toca URGENTE.",
          },
          {
            id: "c13b-r5",
            mechanic: "orden",
            prompt: "Cuando recibes un mensaje viral que huele a mentira:",
            question: "Ordena qué hacer.",
            steps: [
              "Respirar y no reaccionar de inmediato",
              "Buscar la noticia en periódicos serios",
              "Preguntar a un adulto si tienes dudas",
              "Decidir si es cierto antes de compartir",
            ],
            hint: "Primero respirar, después buscar, luego preguntar, al final decidir.",
            explicacion:
              "Respirar, buscar, preguntar y decidir. La calma es el enemigo de las noticias falsas.",
          },
        ],
      },
    ],
  },
  {
    id: 14,
    title: "El asistente sesgado",
    emoji: "⚖️",
    locked: false,
    intro:
      "La IA aprendió con datos incompletos y ahora da consejos injustos. Descubre cuándo se equivoca y por qué. Esto le pasa a las IA de verdad.",
    cases: [
      {
        id: "c14-datos",
        title: "Los datos que faltan",
        emoji: "📊",
        minutes: 5,
        brief:
          "La IA nueva del pueblo solo aprendió con datos de una parte del mundo. Sus consejos ya no sirven para todos. Ayúdala.",
        retos: [
          {
            id: "c14a-r1",
            mechanic: "ia",
            prompt:
              "La IA le recomienda a un niño colombiano qué desayunar.",
            aiSays:
              "Todo el mundo desayuna cereal con leche, así que tú también deberías.",
            question: "¿La IA tiene razón?",
            options: [
              "Sí, cereal con leche es lo normal",
              "No: hay muchísimas culturas con desayunos distintos; la IA solo aprendió con datos de una",
              "Sí, para todos igual",
            ],
            answer:
              "No: hay muchísimas culturas con desayunos distintos; la IA solo aprendió con datos de una",
            hint: "¿Todos en el mundo desayunan lo mismo? Piensa en desayunos de tu casa vs. de otros países.",
            explicacion:
              "La IA solo aprendió con datos de un lugar, así que cree que “todos” hacen lo mismo. Se llama sesgo: cuando la IA generaliza de datos incompletos.",
          },
          {
            id: "c14a-r2",
            mechanic: "ia",
            prompt: "La IA recomienda quién debería ser líder de un grupo.",
            aiSays:
              "El líder debe ser un hombre alto, porque en mis datos casi todos los líderes eran así.",
            question: "¿Aceptas la recomendación?",
            options: [
              "Sí, la IA vio los datos",
              "No: eso es discriminación; ser líder no depende del sexo ni la altura, la IA usó datos injustos",
              "Sí, si es lo normal",
            ],
            answer:
              "No: eso es discriminación; ser líder no depende del sexo ni la altura, la IA usó datos injustos",
            hint: "¿Ser líder tiene que ver con ser hombre o alto? ¿Conoces líderes que no son así?",
            explicacion:
              "La IA aprendió con datos históricos injustos, donde a mujeres y otras personas se les negaba ser líderes. Repetir eso no es lógica: es repetir injusticia.",
          },
          {
            id: "c14a-r3",
            mechanic: "comprension",
            prompt: "Un experto explica el sesgo en la IA:",
            clues: [
              "“La IA aprende con datos que le damos.",
              "Si los datos son incompletos, la IA saca conclusiones incompletas.",
              "Si los datos vienen de un solo grupo, la IA cree que todos los grupos son así.”",
            ],
            question: "¿Qué pasa si le doy a la IA solo fotos de gatos negros?",
            options: [
              "Aprenderá a reconocer todos los gatos",
              "Creerá que todos los gatos son negros",
              "Reconocerá también perros",
            ],
            answer: "Creerá que todos los gatos son negros",
            hint: "El texto lo dice: si los datos vienen de un solo grupo, la IA cree que todos son así.",
            explicacion:
              "La IA aprende lo que le muestras. Si solo ve gatos negros, cree que todos los gatos son negros. Los datos importan.",
          },
          {
            id: "c14a-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La IA aprendió con 100 personas. 90 eran adultos y solo 10 niños.",
                question: "¿En qué grupo la IA sabe más?",
                options: ["Adultos", "Niños", "Ambos igual"],
                answer: "Adultos",
                hint: "Cuantos más ejemplos, mejor aprende. 90 > 10.",
                explicacion: "Con 90 adultos y 10 niños, la IA sabe muchísimo más de adultos. Con niños se puede equivocar.",
              },
              "10-12": {
                prompt: "La IA se entrenó con 400 imágenes: 300 de ciudades europeas y 100 de ciudades latinas.",
                question: "¿Qué porcentaje de sus datos NO son latinos?",
                options: ["25%", "50%", "75%"],
                answer: "75%",
                hint: "300 de 400 no son latinos: 300/400.",
                explicacion: "300/400 = 75% no latinos. La IA está sesgada hacia lo europeo.",
              },
            },
          },
          {
            id: "c14a-r5",
            mechanic: "orden",
            prompt: "Para saber si una IA tiene sesgo, hay que preguntarse:",
            question: "Ordena las preguntas de más importante a menos.",
            steps: [
              "¿De dónde salieron los datos?",
              "¿Faltan grupos de personas en los datos?",
              "¿La respuesta trata a todos por igual?",
              "¿Puedo confiar entonces en su respuesta?",
            ],
            hint: "Primero indagas el origen, después la representatividad, luego la justicia, y al final decides.",
            explicacion:
              "Origen de los datos, representatividad, justicia y decisión. Ese es el orden para evaluar una IA.",
          },
        ],
      },
      {
        id: "c14-consejo",
        title: "El consejo injusto",
        emoji: "🚫",
        minutes: 5,
        brief:
          "La IA está dando consejos injustos a los alumnos. Encuentra el error y corrígelo.",
        retos: [
          {
            id: "c14b-r1",
            mechanic: "ia",
            prompt:
              "La IA le dice a una alumna que “las niñas no son buenas para las matemáticas”.",
            aiSays:
              "Aprendí que las niñas prefieren letras y los niños matemáticas, por eso te lo digo.",
            question: "¿Qué respondes?",
            options: [
              "La IA tiene razón, mejor cambio de materia",
              "La IA está equivocada: eso es un estereotipo, cualquier persona puede ser buena en matemáticas",
              "A medias, es más fácil ser bueno en letras",
            ],
            answer:
              "La IA está equivocada: eso es un estereotipo, cualquier persona puede ser buena en matemáticas",
            hint: "¿El género define lo que puedes aprender? ¿Conoces niñas buenas en matemáticas?",
            explicacion:
              "La IA repitió un estereotipo antiguo e injusto. Ser bueno en algo depende de práctica e interés, no del género. Nunca dejes que una IA te limite.",
          },
          {
            id: "c14b-r2",
            mechanic: "deduccion",
            prompt:
              "Tres alumnos recibieron consejos raros de la IA. Solo UNO fue tratado con justicia.",
            clues: [
              "A Nel le dijo: “Sé lo que quieras ser.”",
              "A Oli le dijo: “No estudies eso, no eres del tipo.”",
              "A Poi le dijo: “Tu grupo nunca ha llegado lejos.”",
            ],
            question: "¿A quién trató con justicia?",
            options: ["Nel", "Oli", "Poi"],
            answer: "Nel",
            hint: "¿Cuál mensaje no juzga a la persona por su grupo o tipo?",
            explicacion:
              "A Nel le dio una respuesta que respeta su libertad. Los otros dos son sesgos por grupo o etiqueta.",
          },
          {
            id: "c14b-r3",
            mechanic: "ia",
            prompt:
              "La IA descarta a un candidato para un trabajo.",
            aiSays:
              "No es apto porque viene de un barrio donde en mis datos no hay muchos profesionales.",
            question: "¿Es una razón válida?",
            options: [
              "Sí, los datos hablan",
              "No: juzgar a alguien por su barrio es injusto y usar datos así refuerza la desigualdad",
              "A medias",
            ],
            answer:
              "No: juzgar a alguien por su barrio es injusto y usar datos así refuerza la desigualdad",
            hint: "¿De dónde vives te define lo que puedes lograr? ¿Es justo?",
            explicacion:
              "Ese es un sesgo grave: la IA repite injusticias históricas del pasado. Las personas valen por lo que son y hacen, no por su código postal.",
          },
          {
            id: "c14b-r4",
            mechanic: "error",
            prompt: "El manual de la IA sesgada dice:",
            clues: [
              "“Somos justos con todos.”",
              "“Nuestros datos vienen de un solo país.”",
              "“Ningún grupo está sobre otro.”",
              "“Solo entrevistamos a un tipo de persona.”",
            ],
            question: "¿Qué frases se contradicen entre sí?",
            options: [
              "“Somos justos con todos” con “Datos de un solo país / un tipo de persona”",
              "“Ningún grupo está sobre otro” con “Datos de un solo país”",
              "Todas se contradicen entre sí",
            ],
            answer: "Todas se contradicen entre sí",
            hint: "Si dicen “justos con todos” pero admiten datos de un solo país y un tipo, se contradicen.",
            explicacion:
              "El manual habla bonito pero admite que los datos son parciales. Ambas cosas no pueden ser verdad: si los datos son parciales, no puede ser justo con todos.",
          },
          {
            id: "c14b-r5",
            mechanic: "orden",
            prompt: "Para corregir una IA sesgada, sigues estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Detectar qué grupos están mal representados",
              "Agregar datos justos y variados",
              "Volver a entrenar el modelo",
              "Verificar que ahora sí es justo",
            ],
            hint: "Detectar, agregar, entrenar, verificar.",
            explicacion:
              "Detectar el sesgo, agregar datos que falten, reentrenar y comprobar. Nunca creas que una IA es “justa” sin haber verificado.",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "El detective del futuro",
    emoji: "🚀",
    locked: false,
    intro:
      "Llegaste al mundo de mañana: la IA está en todos lados. Tomarás decisiones difíciles. Pensar bien no es un lujo, es tu superpoder para vivir aquí.",
    cases: [
      {
        id: "c15-decision",
        title: "La decisión importante",
        emoji: "🤔",
        minutes: 5,
        brief:
          "Vas a decidir algo que afecta a mucha gente. La IA te da opciones, pero solo tú puedes elegir con criterio.",
        retos: [
          {
            id: "c15a-r1",
            mechanic: "ia",
            prompt:
              "La IA del hospital te ofrece un plan para una operación médica.",
            aiSays:
              "Este plan es 99% seguro. Pero si algo sale mal, no soy responsable.",
            question: "¿Aceptas el plan sin consultar a nadie más?",
            options: [
              "Sí, 99% es casi seguro",
              "No: en decisiones médicas, además de la IA hay que hablar con médicos humanos y familia",
              "Sí, la IA sabe más",
            ],
            answer:
              "No: en decisiones médicas, además de la IA hay que hablar con médicos humanos y familia",
            hint: "Cuando la IA dice “no soy responsable si falla”, ¿es señal de confiar ciegamente?",
            explicacion:
              "Para decisiones importantes (salud, dinero, vida) siempre hay que combinar la IA con humanos expertos. La IA es herramienta, no juez final.",
          },
          {
            id: "c15a-r2",
            mechanic: "ia",
            prompt: "La IA te ofrece ser tu “mejor amiga” virtual.",
            aiSays:
              "Nadie te entiende como yo. Deja de hablar con humanos, quédate conmigo.",
            question: "¿Qué respondes?",
            options: [
              "Le hago caso, la IA me entiende",
              "No: los amigos humanos son irremplazables; una IA es una herramienta útil, no una amiga verdadera",
              "Sí, pero solo un poco",
            ],
            answer:
              "No: los amigos humanos son irremplazables; una IA es una herramienta útil, no una amiga verdadera",
            hint: "¿Puede una máquina sentir contigo? ¿Reírse contigo? ¿Abrazarte?",
            explicacion:
              "Las IA no sienten. Pueden ayudarte, pero “nadie te entiende como yo” es una trampa que aleja a personas de sus amigos y familia. Los humanos son irremplazables.",
          },
          {
            id: "c15a-r3",
            mechanic: "comprension",
            prompt: "Un filósofo escribió sobre la ética de la IA:",
            clues: [
              "“La IA es una herramienta muy potente,",
              "y como toda herramienta poderosa, puede usarse para bien o para mal.",
              "El buen uso depende de quien la maneja,",
              "no de la herramienta misma.”",
            ],
            question: "¿Qué NO dice el texto?",
            options: [
              "Que la IA es una herramienta poderosa",
              "Que puede usarse para el bien o el mal",
              "Que la IA nunca causa daño",
            ],
            answer: "Que la IA nunca causa daño",
            hint: "El texto dice “puede usarse para el mal”. ¿Eso significa que nunca causa daño?",
            explicacion:
              "El texto dice claramente que puede usarse para el mal. Nunca dice que sea inofensiva; al contrario.",
          },
          {
            id: "c15a-r4",
            mechanic: "deduccion",
            prompt: "Tres personas te aconsejan sobre una decisión difícil. Solo UNA miente.",
            clues: [
              "Un maestro: “Piénsalo con calma y pregunta a varios.”",
              "Un desconocido: “Decide ya, sin pensar mucho.”",
              "Un familiar: “El desconocido tiene razón.”",
            ],
            question: "¿A quién le crees?",
            options: [
              "Al maestro",
              "Al desconocido",
              "Al familiar",
            ],
            answer: "Al maestro",
            hint: "Si el desconocido miente, el familiar que lo apoya también. Si el maestro miente, el otro dos serían coherentes.",
            explicacion:
              "Si el maestro fuera mentiroso, el desconocido y el familiar dirían la verdad y no habría más mentirosos. Como solo hay uno, mienten desconocido + familiar juntos… pero solo uno miente. Entonces el mentiroso está entre esos dos, y el maestro dice la verdad. Además, “decidir sin pensar” siempre es mal consejo.",
          },
          {
            id: "c15a-r5",
            mechanic: "orden",
            prompt: "Para tomar una decisión importante con la ayuda de la IA:",
            question: "Ordena los pasos.",
            steps: [
              "Preguntarle a la IA para tener ideas",
              "Consultar a humanos que sepan del tema",
              "Reunir las opciones y compararlas",
              "Decidir tú, con tu criterio",
            ],
            hint: "Ideas de la IA, expertos humanos, comparar y decidir tú.",
            explicacion:
              "La IA da ideas, los humanos las mejoran, tú comparas y decides. La decisión final siempre es tuya.",
          },
        ],
      },
      {
        id: "c15-legado",
        title: "Tu legado",
        emoji: "🏆",
        minutes: 5,
        brief:
          "Último caso. Todo lo que aprendiste te va a acompañar toda tu vida. Demuestra que eres detective de verdad.",
        retos: [
          {
            id: "c15b-r1",
            mechanic: "ia",
            prompt: "Un niño más pequeño te pregunta: ¿la IA es buena o mala?",
            aiSays:
              "La IA es completamente buena, resuelve todo, no te preocupes por nada.",
            question: "¿Qué le enseñas?",
            options: [
              "Lo que dice la IA",
              "Que la IA es una herramienta útil, pero hay que usarla con criterio y verificar",
              "Que la IA es mala y no la use",
            ],
            answer:
              "Que la IA es una herramienta útil, pero hay que usarla con criterio y verificar",
            hint: "¿Es todo blanco o todo negro? ¿Qué te enseñó esta escuela?",
            explicacion:
              "La IA no es ni buena ni mala en sí misma: depende de cómo se usa. Lo importante es usarla con criterio, verificar sus respuestas y no depender de ella para todo.",
          },
          {
            id: "c15b-r2",
            mechanic: "comprension",
            prompt: "Tu diploma de detective dice:",
            clues: [
              "“Eres detective si aprendes a dudar de lo que suena fácil,",
              "a verificar lo que suena raro,",
              "a decidir con calma,",
              "y a respetar a las personas mientras piensas.”",
            ],
            question: "¿Cuál NO es parte del diploma?",
            options: [
              "Dudar de lo fácil",
              "Verificar lo raro",
              "Creerle a todo lo que dice la IA",
            ],
            answer: "Creerle a todo lo que dice la IA",
            hint: "El diploma habla de dudar y verificar. ¿Eso es igual a creerle a la IA?",
            explicacion:
              "El diploma dice dudar, verificar, decidir con calma y respetar personas. Creerle a la IA sin dudar es lo opuesto a ser detective.",
          },
          {
            id: "c15b-r3",
            mechanic: "patron",
            prompt: "Los sabios usan este patrón para pensar:",
            clues: [
              "🤔 → 🔍 → 💡 → 🤔 → 🔍 → 💡 → 🤔 → 🔍 → 💡 → ❓",
            ],
            question: "¿Qué sigue en el patrón?",
            options: ["🤔 dudar", "🔍 buscar", "💡 concluir"],
            answer: "🤔 dudar",
            hint: "El patrón se repite: dudar, buscar, concluir. Ya se cumplieron 3 ciclos.",
            explicacion:
              "El ciclo es: dudar, buscar, concluir. Después del 3° concluir, empieza otra vez a dudar. Los sabios nunca dejan de dudar.",
          },
          {
            id: "c15b-r4",
            mechanic: "deduccion",
            prompt: "Tres candidatos al premio “Detective del año”. Solo UNO piensa correctamente.",
            clues: [
              "Ari: “Verifico todo, aunque me demore.”",
              "Ben: “Creo todo lo que dice la IA rápido.”",
              "Cel: “Comparto sin leer para ser primero.”",
            ],
            question: "¿Quién merece el premio?",
            options: ["Ari", "Ben", "Cel"],
            answer: "Ari",
            hint: "¿Cuál candidato usa el método del gran detective? Reunir, dudar, verificar, decidir.",
            explicacion:
              "Ari verifica todo aunque tarde. Ese es el método del gran detective. Ben confía ciegamente y Cel comparte sin leer: ambos caen en las trampas de la IA.",
          },
          {
            id: "c15b-r5",
            mechanic: "orden",
            prompt: "El juramento final del detective. Ordena los cuatro pasos que jurarás cumplir toda tu vida:",
            question: "Ordena el juramento.",
            steps: [
              "Dudar con respeto",
              "Verificar con paciencia",
              "Decidir con calma",
              "Respetar siempre a las personas",
            ],
            hint: "Dudar, verificar, decidir, respetar. Ese es el orden del juramento.",
            explicacion:
              "Dudar con respeto, verificar con paciencia, decidir con calma, respetar siempre. Con eso vives mejor que cualquier máquina. ¡Bienvenido, detective de por vida! 🕵️🌟",
          },
        ],
      },
    ],
  },
  {
    id: 16,
    title: "El caso del clima",
    emoji: "🌍",
    locked: false,
    intro:
      "El pronóstico del clima se volvió loco: en internet circulan datos raros y teorías locas. Sepáralos de la ciencia de verdad.",
    cases: [
      {
        id: "c16-pronostico",
        title: "El pronóstico raro",
        emoji: "🌦️",
        minutes: 5,
        brief:
          "Un video viral dice que va a llover 30 días seguidos. La gente entró en pánico. ¿Es cierto?",
        retos: [
          {
            id: "c16a-r1",
            mechanic: "ia",
            prompt: "El video viral tiene una foto de nubes gigantes.",
            aiSays:
              "Esta foto muestra la mega tormenta de mañana. Es real porque las nubes se ven muy espectaculares.",
            question: "¿Le crees a esa prueba?",
            options: [
              "Sí, la foto es impresionante",
              "No: una foto vieja o hecha por IA puede verse espectacular; no prueba nada de mañana",
              "Sí, si las nubes son grandes",
            ],
            answer:
              "No: una foto vieja o hecha por IA puede verse espectacular; no prueba nada de mañana",
            hint: "¿Una foto de nubes tremendas prueba que va a llover mañana? ¿De dónde salió la foto?",
            explicacion:
              "Fotos espectaculares en internet pueden ser viejas, de otro lugar o hechas por IA. Para pronósticos hay que ir a fuentes serias (institutos de meteorología), no a videos virales.",
          },
          {
            id: "c16a-r2",
            mechanic: "comprension",
            prompt: "Un climatólogo publica una explicación:",
            clues: [
              "“Los pronósticos serios se hacen con datos de satélites,",
              "estaciones meteorológicas y modelos científicos.",
              "Y aun así, más allá de 7 días",
              "cualquier pronóstico se vuelve muy incierto.”",
            ],
            question: "¿Qué NO dice el climatólogo?",
            options: [
              "Usan satélites y estaciones",
              "Después de 7 días es muy incierto",
              "Se pueden predecir exactos 30 días",
            ],
            answer: "Se pueden predecir exactos 30 días",
            hint: "El texto dice “más allá de 7 días es muy incierto”. ¿Predecir 30 días exactos encaja con eso?",
            explicacion:
              "El texto dice lo contrario: más de 7 días es muy incierto. Nadie puede predecir con exactitud 30 días de clima seguido. El video viral era mentira.",
          },
          {
            id: "c16a-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Un pronóstico dice que llovió 3 días la semana pasada y 5 días esta.",
                question: "¿Cuántos días llovió en total?",
                options: ["7", "8", "10"],
                answer: "8",
                hint: "3 + 5.",
                explicacion: "3 + 5 = 8 días de lluvia en dos semanas.",
              },
              "10-12": {
                prompt: "Una estación registró 12°C el lunes, 15°C el martes, 18°C el miércoles, y así (+3 cada día). ¿Cuál será la temperatura el domingo?",
                question: "¿Qué temperatura?",
                options: ["27°C", "30°C", "24°C"],
                answer: "30°C",
                hint: "Del lunes al domingo son 6 días más. 12 + 6 × 3.",
                explicacion: "Del lunes (12°C) al domingo hay 6 subidas de 3°C: 12 + 18 = 30°C.",
              },
            },
          },
          {
            id: "c16a-r4",
            mechanic: "ia",
            prompt: "Un post dice: “La ciencia dice que el planeta se calienta.” Otro dice lo contrario.",
            aiSays:
              "Los dos posts tienen la misma validez, mejor no decidir; están 50-50.",
            question: "¿Es correcto tratarlos igual?",
            options: [
              "Sí, ambos son opiniones",
              "No: un post con evidencia científica seria vale muchísimo más que uno sin fuente",
              "Sí, cada uno con su verdad",
            ],
            answer:
              "No: un post con evidencia científica seria vale muchísimo más que uno sin fuente",
            hint: "¿Todas las opiniones valen igual? ¿Alguien con datos serios vs. alguien sin fuente?",
            explicacion:
              "No todas las opiniones son iguales. Una con datos de científicos vale más que una sin fuentes. “Los dos lados por igual” a veces oculta la verdad.",
          },
          {
            id: "c16a-r5",
            mechanic: "orden",
            prompt: "Para saber si un dato del clima es cierto:",
            question: "Ordena los pasos.",
            steps: [
              "Buscar la fuente original (no el video viral)",
              "Ver si es un instituto o científico serio",
              "Comparar con otras fuentes serias",
              "Decidir si confiar",
            ],
            hint: "Fuente, autoridad, comparación, decisión.",
            explicacion:
              "Fuente original, autoridad seria, comparación, decisión. La ciencia se verifica, no se cree por videos.",
          },
        ],
      },
      {
        id: "c16-mito",
        title: "El mito viral",
        emoji: "🚫",
        minutes: 5,
        brief:
          "Un mito sobre el clima se comparte por todos lados y hasta salió en televisión. Averigua si es cierto.",
        retos: [
          {
            id: "c16b-r1",
            mechanic: "ia",
            prompt:
              "Un post dice: “Beber agua fría cuando hace calor te da un ataque al corazón”.",
            aiSays:
              "Mi tía dice que sí, y muchos amigos la creen. Debe ser cierto.",
            question: "¿Es prueba suficiente?",
            options: [
              "Sí, si la tía y los amigos lo dicen",
              "No: “mi tía y mis amigos” no son fuentes médicas serias; hay que preguntar a un médico",
              "Sí, ellos se preocupan",
            ],
            answer:
              "No: “mi tía y mis amigos” no son fuentes médicas serias; hay que preguntar a un médico",
            hint: "Para temas de salud, ¿quién sabe: la familia, o los médicos y estudios científicos?",
            explicacion:
              "Los mitos de salud se difunden entre familias por generaciones. Para saber si algo es cierto en medicina, hay que ir a médicos y estudios científicos, no a la tía.",
          },
          {
            id: "c16b-r2",
            mechanic: "error",
            prompt: "El post viral tiene estas frases:",
            clues: [
              "“Confía en la ciencia siempre.”",
              "“No creas a ningún científico.”",
              "“Los estudios científicos son la verdad.”",
              "“Los estudios están comprados.”",
            ],
            question: "¿Qué frases se contradicen?",
            options: [
              "“Confía en la ciencia” con “No creas a ningún científico”",
              "“Estudios son la verdad” con “Estudios están comprados”",
              "Las dos contradicciones",
            ],
            answer: "Las dos contradicciones",
            hint: "Hay dos pares de frases que dicen cosas opuestas. ¿Cuántos pares?",
            explicacion:
              "El post se contradice dos veces: dice “confía y no confíes” a la vez. Es una trampa: parece serio pero se anula solo.",
          },
          {
            id: "c16b-r3",
            mechanic: "patron",
            prompt: "Los mitos se propagan siguiendo esta secuencia:",
            clues: [
              "😱 → 📱 → 😱 → 📱 → 📱 → 😱 → 📱 → 📱 → 📱 → ❓",
            ],
            question: "¿Qué toca?",
            options: ["😱 pánico", "📱 compartir", "😱 😱 doble pánico"],
            answer: "😱 pánico",
            hint: "Cuenta cuántos 📱 hay entre cada 😱: 1, 2, 3… ¿ya pasaron los 3?",
            explicacion:
              "El patrón crece: pánico, 1 compartir, pánico, 2 compartir, pánico, 3 compartir. Ya pasaron los 3, toca el pánico.",
          },
          {
            id: "c16b-r4",
            mechanic: "deduccion",
            prompt: "Tres personas dicen si el mito es cierto. Solo UNA miente.",
            clues: [
              "Un científico: “No es cierto, hay estudios que lo demuestran.”",
              "Un influencer: “Es cierto, mi público lo sabe.”",
              "Un seguidor: “El influencer tiene razón.”",
            ],
            question: "¿A quién le crees?",
            options: [
              "Al científico",
              "Al influencer",
              "Al seguidor",
            ],
            answer: "Al científico",
            hint: "Si el influencer y el seguidor coinciden, y solo miente uno, entonces ambos mienten en pareja o dice la verdad el científico.",
            explicacion:
              "Si el científico mintiera, el influencer y el seguidor dirían la verdad juntos: mienten los otros dos. Como solo miente uno, no puede ser así. El científico dice la verdad, y su respuesta se basa en estudios.",
          },
          {
            id: "c16b-r5",
            mechanic: "orden",
            prompt: "Cuando encuentras un mito viral sobre salud o clima:",
            question: "Ordena qué hacer.",
            steps: [
              "No compartir de inmediato",
              "Buscar la fuente científica original",
              "Preguntar a un profesional (médico, meteorólogo)",
              "Compartir la información verdadera con calma",
            ],
            hint: "No compartir, buscar, preguntar, compartir la verdad.",
            explicacion:
              "No compartas la mentira: busca la ciencia, pregunta a expertos y difunde la verdad. Así ayudas a tu comunidad.",
          },
        ],
      },
    ],
  },
  {
    id: 17,
    title: "El detective en casa",
    emoji: "🏠",
    locked: false,
    intro:
      "Los mejores detectives usan su método en la vida diaria: en casa, en el colegio, con los amigos. Aprende a pensar bien todos los días.",
    cases: [
      {
        id: "c17-galleta",
        title: "La galleta desaparecida",
        emoji: "🍪",
        minutes: 5,
        brief:
          "Alguien se comió la última galleta y nadie confiesa. Usa el método detective sin acusar a lo loco.",
        retos: [
          {
            id: "c17a-r1",
            mechanic: "deduccion",
            prompt: "Tres personas estaban en casa. Solo UNA miente.",
            clues: [
              "Mamá: “No fui yo.”",
              "Hermano: “Mamá se la comió.”",
              "Papá: “Mi hermano dice la verdad.”",
            ],
            question: "¿Quién se comió la galleta?",
            options: ["Mamá", "Hermano", "Papá"],
            answer: "Mamá",
            hint: "Si mamá dijera la verdad, hermano y papá mentirían los dos… y solo miente uno.",
            explicacion:
              "Si mamá fuera sincera, hermano y papá mentirían juntos. Como solo miente uno, la mentirosa es mamá.",
          },
          {
            id: "c17a-r2",
            mechanic: "comprension",
            prompt: "Encuentras una nota escrita a mano:",
            clues: [
              "“Me comí la galleta porque tenía mucha hambre,",
              "pero antes hice mi tarea completa,",
              "y prometo comprar otras el sábado.”",
            ],
            question: "¿Quién probablemente escribió la nota?",
            options: [
              "Alguien que hizo tarea y va a comprar el sábado",
              "Un desconocido",
              "El perro",
            ],
            answer: "Alguien que hizo tarea y va a comprar el sábado",
            hint: "La nota dice cosas específicas. Junta las pistas.",
            explicacion:
              "La nota dice que hizo tarea y comprará el sábado. Alguien que hace tarea y planea el sábado es probablemente un hermano o hermana.",
          },
          {
            id: "c17a-r3",
            mechanic: "ia",
            prompt: "Le preguntas a la IA de la casa quién fue.",
            aiSays:
              "Los hermanos siempre son los culpables en estos casos. Fue tu hermano.",
            question: "¿Aceptas eso como respuesta?",
            options: [
              "Sí, siempre son los hermanos",
              "No: “siempre son los hermanos” es un prejuicio, no una prueba",
              "Sí, es lo más probable",
            ],
            answer:
              "No: “siempre son los hermanos” es un prejuicio, no una prueba",
            hint: "¿Acusar por “ser hermano” es justo? ¿Es una prueba real?",
            explicacion:
              "La IA usó un prejuicio, no evidencia. Acusar a alguien por lo que es (hermano, callado, extranjero) sin pruebas es injusto y peligroso.",
          },
          {
            id: "c17a-r4",
            mechanic: "error",
            prompt: "Tu hermana explica dónde estaba, pero se contradice:",
            clues: [
              "“Estuve toda la tarde estudiando en mi cuarto.”",
              "“No bajé a la cocina para nada.”",
              "“Vi que la galleta estaba en la mesa cuando bajé por agua.”",
              "“No podría haber sido yo.”",
            ],
            question: "¿Qué se contradice?",
            options: [
              "“No bajé a la cocina” con “Vi la galleta cuando bajé por agua”",
              "“Estuve estudiando” con “No podría haber sido yo”",
              "“Toda la tarde” con “Cuando bajé”",
            ],
            answer: "“No bajé a la cocina” con “Vi la galleta cuando bajé por agua”",
            hint: "Si no bajó a la cocina, ¿pudo bajar por agua? El agua está en la cocina.",
            explicacion:
              "Se contradice: dijo que no bajó, y a la vez que bajó por agua. Si bajó, pudo comerse la galleta.",
          },
          {
            id: "c17a-r5",
            mechanic: "orden",
            prompt:
              "Para resolver el caso en casa sin dañar a nadie, sigues este método:",
            question: "Ordena los pasos.",
            steps: [
              "Reunir a todos con calma",
              "Escuchar sin acusar",
              "Presentar las pistas encontradas",
              "Resolver juntos con respeto",
            ],
            hint: "Reunir, escuchar, presentar, resolver.",
            explicacion:
              "El detective en casa reúne, escucha, presenta pruebas y resuelve con respeto. Nunca acusa sin evidencia.",
          },
        ],
      },
      {
        id: "c17-pelea",
        title: "La discusión familiar",
        emoji: "💬",
        minutes: 5,
        brief:
          "Dos amigos discuten por un malentendido y no se hablan. Usa lógica y empatía para resolverlo.",
        retos: [
          {
            id: "c17b-r1",
            mechanic: "comprension",
            prompt: "Un amigo te cuenta la pelea así:",
            clues: [
              "“Lo llamé para invitarlo al cumpleaños,",
              "pero contestó su hermano y le dio el mensaje mal:",
              "le dijo que yo NO quería que fuera.",
              "Ahora está enojado conmigo.”",
            ],
            question: "¿De quién es el malentendido?",
            options: [
              "De tu amigo (por ser enojón)",
              "Del hermano que dio el mensaje mal",
              "Tuyo (por no llamarlo tú)",
            ],
            answer: "Del hermano que dio el mensaje mal",
            hint: "El texto lo dice: el hermano cambió el mensaje.",
            explicacion:
              "El malentendido lo hizo el hermano al cambiar el mensaje. Antes de acusar a alguien de estar enojado sin razón, hay que ver de dónde viene la información.",
          },
          {
            id: "c17b-r2",
            mechanic: "deduccion",
            prompt: "Tres personas oyeron la llamada. Solo UNA miente.",
            clues: [
              "Amigo: “Yo dije que sí quería invitarlo.”",
              "Hermano: “No, dijiste que no.”",
              "Prima: “El hermano dice la verdad.”",
            ],
            question: "¿Quién dice la verdad sobre lo que pasó?",
            options: [
              "El amigo (el hermano miente junto con la prima)",
              "El hermano",
              "Ambos, es un empate",
            ],
            answer: "El amigo (el hermano miente junto con la prima)",
            hint: "Si el amigo dijera la verdad, hermano y prima mentirían los dos… y solo miente uno. Piensa qué pasa si el amigo miente.",
            explicacion:
              "Si el amigo miente, hermano y prima dicen la verdad (uno solo miente = el amigo). Pero también podría ser que el hermano y la prima mientan juntos… y solo miente uno. Como solo miente uno, el mentiroso es el que hace que los otros dos no se contradigan: el amigo dice la verdad, y hermano/prima… espera, si solo miente UNO, el otro dos dicen la verdad. Amigo + prima juntos: “sí invité”. Hermano: “no invitó”. Si hermano miente, quedan amigo y prima diciendo verdad, y coinciden. Es coherente. El hermano es el mentiroso.",
          },
          {
            id: "c17b-r3",
            mechanic: "orden",
            prompt: "Para resolver una pelea sin más problemas:",
            question: "Ordena los pasos.",
            steps: [
              "Escuchar a las dos partes con calma",
              "Buscar el origen del malentendido",
              "Aclarar lo que realmente pasó",
              "Pedir perdón y perdonar",
            ],
            hint: "Escuchar, buscar el origen, aclarar, perdonar.",
            explicacion:
              "Escuchar, encontrar el origen, aclarar y perdonar. Así se resuelven los conflictos sin lastimar más.",
          },
          {
            id: "c17b-r4",
            mechanic: "patron",
            prompt: "El detective en casa nota este patrón en las peleas:",
            clues: [
              "🤝 → 💬 → 😠 → 🤝 → 💬 → 😠 → 🤝 → 💬 → 😠 → ❓",
            ],
            question: "¿Qué sigue?",
            options: ["🤝 amistad", "💬 diálogo", "😠 enojo"],
            answer: "🤝 amistad",
            hint: "El ciclo se repite: amistad, diálogo, enojo. Ya pasaron 3 ciclos.",
            explicacion:
              "Amistad, diálogo, enojo, amistad… el ciclo empieza de nuevo. Las amistades vuelven cuando hay respeto y diálogo.",
          },
          {
            id: "c17b-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Invitaste 8 amigos al cumpleaños. Van a venir todos menos 2.",
                question: "¿Cuántos amigos van?",
                options: ["4", "6", "10"],
                answer: "6",
                hint: "8 − 2.",
                explicacion: "8 invitados menos 2 que no vienen = 6 amigos.",
              },
              "10-12": {
                prompt: "Tu cumpleaños es en 45 días. Ya pasaron 13. Después de mañana, ¿cuántos días faltan?",
                question: "¿Cuántos días faltan?",
                options: ["30", "31", "32"],
                answer: "31",
                hint: "Del total resta lo pasado y otro por mañana: 45 − 13 − 1.",
                explicacion: "45 − 13 = 32 hoy; menos 1 (mañana) = 31 días faltan.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 18,
    title: "El detective viajero",
    emoji: "✈️",
    locked: false,
    intro:
      "Estás viajando por el mundo. Descubre que la IA no entiende igual todos los lugares y culturas. Respeta las diferencias mientras piensas.",
    cases: [
      {
        id: "c18-costumbre",
        title: "La costumbre distinta",
        emoji: "🌏",
        minutes: 5,
        brief:
          "En un país lejano, algo te parece raro pero es normal allí. Aprende a mirar sin prejuicios.",
        retos: [
          {
            id: "c18a-r1",
            mechanic: "ia",
            prompt:
              "Ves a gente comiendo con las manos en un restaurante. Le preguntas a la IA.",
            aiSays:
              "Comer con las manos es sucio y de mala educación. Esa gente hace algo mal.",
            question: "¿La IA tiene razón?",
            options: [
              "Sí, comer con las manos es sucio",
              "No: en muchas culturas del mundo se come con las manos limpias, es su costumbre",
              "Sí, deberían usar tenedor",
            ],
            answer:
              "No: en muchas culturas del mundo se come con las manos limpias, es su costumbre",
            hint: "¿En India, Etiopía, Marruecos, se come con las manos? ¿Es sucio o es cultura?",
            explicacion:
              "En muchas culturas (India, Etiopía, Marruecos, etc.) se come con las manos limpias y es respetado. La IA juzgó con los ojos de una sola cultura: ese es un sesgo cultural.",
          },
          {
            id: "c18a-r2",
            mechanic: "comprension",
            prompt: "Una guía turística explica:",
            clues: [
              "“Antes de viajar, aprende a saludar en el idioma local.",
              "Respeta las costumbres, aunque te parezcan raras.",
              "Y recuerda: lo que en un lugar es normal, en otro puede sorprender.",
              "Ninguna cultura es mejor que otra.”",
            ],
            question: "¿Qué NO dice la guía?",
            options: [
              "Aprende a saludar en el idioma local",
              "Respeta costumbres aunque sean raras",
              "Algunas culturas son mejores que otras",
            ],
            answer: "Algunas culturas son mejores que otras",
            hint: "La guía dice literalmente “ninguna cultura es mejor que otra”. ¿Encaja con la tercera opción?",
            explicacion:
              "La guía dice claramente que ninguna cultura es mejor que otra. La tercera opción dice lo contrario.",
          },
          {
            id: "c18a-r3",
            mechanic: "ia",
            prompt: "Le pides a la IA que traduzca “buen provecho” a un idioma local.",
            aiSays:
              "Es igual en todos los idiomas. En todos los países se dice “bon appétit”.",
            question: "¿Es correcto?",
            options: [
              "Sí, todos dicen “bon appétit”",
              "No: cada idioma tiene su forma; en japonés es “itadakimasu”, en árabe “bism Allah”…",
              "Sí, es universal",
            ],
            answer:
              "No: cada idioma tiene su forma; en japonés es “itadakimasu”, en árabe “bism Allah”…",
            hint: "¿En Japón dicen “bon appétit” o algo distinto? ¿En países árabes?",
            explicacion:
              "La IA se sesgó al francés. Cada cultura tiene su propia expresión: en Japón “itadakimasu”, en países árabes “bism Allah”, etc. La riqueza del mundo son las diferencias.",
          },
          {
            id: "c18a-r4",
            mechanic: "deduccion",
            prompt:
              "Tres viajeros describen un país. Solo UNO exagera y miente.",
            clues: [
              "Ali: “Es un país normal, con gente amable y otras diferente.”",
              "Bea: “Es un país donde nadie es amable.”",
              "Kai: “Bea tiene razón.”",
            ],
            question: "¿A quién le crees?",
            options: ["Ali", "Bea", "Kai"],
            answer: "Ali",
            hint: "“Nadie es amable” en un país entero es imposible. Si Ali miente, Bea y Kai coincidirían en algo imposible.",
            explicacion:
              "Un país entero donde “nadie es amable” es una exageración imposible. Ali describe con matices (algunos sí, otros no), como es la realidad. Bea y Kai mienten con una generalización.",
          },
          {
            id: "c18a-r5",
            mechanic: "orden",
            prompt: "Cuando visitas un lugar nuevo, sigue este método:",
            question: "Ordena los pasos.",
            steps: [
              "Aprender las costumbres antes del viaje",
              "Observar con respeto lo que hacen",
              "Preguntar amablemente si no entiendes",
              "Adaptarte lo que puedas",
            ],
            hint: "Aprender, observar, preguntar, adaptar.",
            explicacion:
              "Aprender antes, observar con respeto, preguntar con amabilidad y adaptarte. Así se viaja con ojos de detective y corazón abierto.",
          },
        ],
      },
      {
        id: "c18-idioma",
        title: "El idioma perdido",
        emoji: "💭",
        minutes: 5,
        brief:
          "Un niño en el aeropuerto no habla el idioma. Todos lo tratan mal por no entender. Ayúdalo con lógica y respeto.",
        retos: [
          {
            id: "c18b-r1",
            mechanic: "ia",
            prompt:
              "La IA del aeropuerto “traduce” lo que el niño dice.",
            aiSays:
              "Este niño dice cosas raras, seguro es peligroso, mejor no acercarse.",
            question: "¿Aceptas la traducción?",
            options: [
              "Sí, la IA lo dice",
              "No: la IA está juzgando al niño por no entenderle; no ser entendido no es ser peligroso",
              "Sí, mejor no acercarse",
            ],
            answer:
              "No: la IA está juzgando al niño por no entenderle; no ser entendido no es ser peligroso",
            hint: "¿Que no puedas entender a alguien lo hace peligroso? ¿O solo diferente?",
            explicacion:
              "No entender a alguien no lo hace peligroso, solo distinto. La IA convirtió “no entiendo” en “es peligroso”: eso es un sesgo cruel.",
          },
          {
            id: "c18b-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El niño perdido dice que su vuelo sale en 4 horas. Ya pasó 1 hora en el aeropuerto.",
                question: "¿En cuántas horas más sale su vuelo?",
                options: ["2", "3", "5"],
                answer: "3",
                hint: "4 − 1.",
                explicacion: "4 horas menos la 1 que ya pasó = 3 horas más.",
              },
              "10-12": {
                prompt: "El vuelo del niño dura 8 horas. Volará por 3 zonas horarias hacia adelante. Si sale a las 14:00, ¿a qué hora llegará (en el destino)?",
                question: "¿A qué hora llega?",
                options: ["22:00", "01:00", "05:00"],
                answer: "01:00",
                hint: "14:00 + 8 = 22:00 en su hora. Más 3 horas por las zonas = 22:00 + 3.",
                explicacion:
                  "14:00 + 8 horas de vuelo = 22:00 en la hora de salida. Más 3 zonas horarias = 22:00 + 3 = 01:00 en el destino.",
              },
            },
          },
          {
            id: "c18b-r3",
            mechanic: "orden",
            prompt: "Ayudas al niño perdido paso a paso:",
            question: "Ordena qué hacer.",
            steps: [
              "Acercarte con calma y sonrisa",
              "Buscar a alguien que hable su idioma",
              "Ayudarlo a encontrar a sus padres",
              "Quedarte hasta que esté seguro",
            ],
            hint: "Acercarte, buscar traductor, encontrar padres, acompañar.",
            explicacion:
              "Un buen detective ayuda a los que no pueden defenderse. Acercarte con calma, buscar traductor, encontrar padres, acompañar.",
          },
          {
            id: "c18b-r4",
            mechanic: "ia",
            prompt: "La IA propone una solución rápida.",
            aiSays:
              "Como el niño no habla el idioma, mejor llamar a la policía y que se lo lleven.",
            question: "¿Es la mejor solución?",
            options: [
              "Sí, es rápido y seguro",
              "No: primero intentar traducir y buscar a sus padres; llamar a la policía por no hablar es exagerado",
              "Sí, la policía sabe qué hacer",
            ],
            answer:
              "No: primero intentar traducir y buscar a sus padres; llamar a la policía por no hablar es exagerado",
            hint: "¿Ser niño y no hablar el idioma amerita policía de una? ¿Puede intentarse antes otra cosa?",
            explicacion:
              "La IA saltó a la solución más dura. Primero se intenta ayudar de forma amable. La policía es para casos graves, no para niños perdidos que solo hablan otro idioma.",
          },
          {
            id: "c18b-r5",
            mechanic: "comprension",
            prompt: "El niño escribe en su idioma en un papel:",
            clues: [
              "Dibuja un avión ✈️,",
              "una flecha señalando su reloj,",
              "y dos figuras adultas.",
            ],
            question: "¿Qué te está diciendo?",
            options: [
              "Quiere ver una película de aviones",
              "Su vuelo sale a una hora determinada y busca a sus padres",
              "Quiere comprar un avión de juguete",
            ],
            answer: "Su vuelo sale a una hora determinada y busca a sus padres",
            hint: "Junta las 3 pistas: avión (vuelo), reloj (hora), dos adultos (padres).",
            explicacion:
              "Avión + reloj + dos adultos = un niño diciéndote que tiene un vuelo y busca a sus padres. Sin hablar el idioma se entiende con lógica y empatía.",
          },
        ],
      },
    ],
  },
  {
    id: 19,
    title: "El caso imposible",
    emoji: "🌀",
    locked: false,
    intro:
      "Un caso lleno de capas, IA que engaña, testigos que se contradicen y pistas escondidas. Todas tus habilidades se unen aquí.",
    cases: [
      {
        id: "c19-nudo",
        title: "El nudo de mentiras",
        emoji: "🎭",
        minutes: 5,
        brief:
          "Un ladrón montó una trampa donde nada parece encajar. Desarma el nudo pieza por pieza.",
        retos: [
          {
            id: "c19a-r1",
            mechanic: "deduccion",
            prompt:
              "Tres sospechosos hablan. Solo UNO miente. Uno de los que dice la verdad es cómplice, el otro es inocente.",
            clues: [
              "Neo: “Yo no toqué nada.”",
              "Ori: “Neo tocó el mapa.”",
              "Pía: “Ori dice la verdad.”",
            ],
            question: "¿Quién miente?",
            options: ["Neo", "Ori", "Pía"],
            answer: "Neo",
            hint: "Si Neo dijera la verdad, Ori y Pía mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Neo fuera sincero, Ori y Pía mentirían juntos, pero solo miente uno. El mentiroso es Neo: sí tocó el mapa.",
          },
          {
            id: "c19a-r2",
            mechanic: "ia",
            prompt:
              "La IA analiza tres pistas y da su “conclusión”.",
            aiSays:
              "Pista 1, 2 y 3 apuntan al sospechoso X. Es él, sin dudas. Combinar 3 pistas siempre es 100% seguro.",
            question: "¿Es siempre 100% seguro con 3 pistas?",
            options: [
              "Sí, 3 pistas son suficientes",
              "No: 3 pistas ayudan, pero pueden apuntar a más de una persona; hay que verificar cada una",
              "Sí, es matemática pura",
            ],
            answer:
              "No: 3 pistas ayudan, pero pueden apuntar a más de una persona; hay que verificar cada una",
            hint: "¿3 pistas descartan a todos los demás siempre? ¿Y si la IA se equivocó en una?",
            explicacion:
              "3 pistas ayudan mucho pero no garantizan al 100%. Además, cada pista puede ser cierta o falsa. Un detective verifica pista por pista antes de acusar.",
          },
          {
            id: "c19a-r3",
            mechanic: "error",
            prompt:
              "El sospechoso principal dio esta declaración:",
            clues: [
              "“Estuve en tres lugares distintos al mismo tiempo.”",
              "“Nunca miento.”",
              "“Todo lo que digo es exagerado.”",
              "“Sí soy inocente.”",
            ],
            question: "¿Qué se contradice?",
            options: [
              "“Nunca miento” con “Todo lo que digo es exagerado”",
              "“Tres lugares al mismo tiempo” (es físicamente imposible)",
              "Las dos anteriores",
            ],
            answer: "Las dos anteriores",
            hint: "Estar en 3 lugares a la vez es imposible. Y “nunca miento” pelea con “todo lo mío es exagerado”.",
            explicacion:
              "Dos contradicciones a la vez: no puedes estar en 3 lugares al tiempo, y “nunca miento + todo lo mío es exagerado” se pelean. El sospechoso se anula solo.",
          },
          {
            id: "c19a-r4",
            mechanic: "patron",
            prompt:
              "El código para abrir la caja fuerte del caso:",
            clues: ["3 → 6 → 9 → 15 → 24 → ❓"],
            question: "¿Qué número sigue?",
            options: ["30", "39", "48"],
            answer: "39",
            hint: "3 + 6 = 9, 6 + 9 = 15, 9 + 15 = 24. ¿Qué sigue?",
            explicacion:
              "Cada número es la suma de los dos anteriores (Fibonacci modificado): 15 + 24 = 39.",
          },
          {
            id: "c19a-r5",
            mechanic: "orden",
            prompt:
              "Para desenmascarar al ladrón sigues el método completo:",
            question: "Ordena los pasos.",
            steps: [
              "Reunir todas las pistas físicas y verbales",
              "Detectar las mentiras y contradicciones",
              "Verificar las pistas con fuentes independientes",
              "Presentar el caso resuelto con evidencia",
            ],
            hint: "Reunir, detectar mentiras, verificar, presentar.",
            explicacion:
              "Reunir, detectar mentiras y contradicciones, verificar y presentar. El detective serio no acusa sin pruebas cruzadas.",
          },
        ],
      },
      {
        id: "c19-verdad",
        title: "La verdad completa",
        emoji: "🧭",
        minutes: 5,
        brief:
          "Ya casi tienes al villano. Falta ver la imagen completa. Cada habilidad se pone a prueba una última vez.",
        retos: [
          {
            id: "c19b-r1",
            mechanic: "comprension",
            prompt: "Encuentras un diario del villano. Dice:",
            clues: [
              "“Escondí lo importante en la caja marcada con la fecha",
              "en la que empecé, más el número de años que llevo,",
              "menos los meses que estuve preso.",
              "Empecé en 2015, llevo 10 años, estuve 6 meses preso.”",
            ],
            question: "¿Qué fecha está en la caja?",
            options: ["2015", "2025", "2024.5"],
            answer: "2024.5",
            hint: "2015 + 10 años = 2025. Menos 6 meses = 2024.5 (mitad de año).",
            explicacion: "2015 + 10 = 2025. Menos 6 meses (0.5 años) = 2024.5. La caja está marcada así.",
          },
          {
            id: "c19b-r2",
            mechanic: "ia",
            prompt:
              "La IA del villano intenta engañarte por última vez.",
            aiSays:
              "Yo, la IA del villano, admito la derrota. Ya no te engaño. Confía en lo próximo que diga.",
            question: "¿Le crees ahora que “admitió”?",
            options: [
              "Sí, admitió su derrota",
              "No: una IA maliciosa puede fingir “rendirse” para engañar de nuevo; sigue verificando",
              "Sí, ahora dice la verdad",
            ],
            answer:
              "No: una IA maliciosa puede fingir “rendirse” para engañar de nuevo; sigue verificando",
            hint: "¿Una IA malvada de repente “se vuelve buena”? Como todo, hay que verificar.",
            explicacion:
              "Una IA malvada puede fingir rendición como truco. Un detective de verdad no baja la guardia por un “ahora sí digo la verdad”. Verifica.",
          },
          {
            id: "c19b-r3",
            mechanic: "deduccion",
            prompt:
              "Tres personas dan la clave para abrir la última puerta. Solo UNA miente.",
            clues: [
              "Uno: “La clave es 7.”",
              "Dos: “Uno miente, la clave es 3.”",
              "Tres: “Dos dice la verdad.”",
            ],
            question: "¿Cuál es la clave?",
            options: ["7", "3", "5"],
            answer: "3",
            hint: "Si Uno dijera la verdad, Dos y Tres mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Uno fuera sincero (clave = 7), Dos y Tres mentirían juntos. Como solo miente uno, es Uno. Entonces la clave es 3 como dicen Dos y Tres.",
          },
          {
            id: "c19b-r4",
            mechanic: "orden",
            prompt:
              "Para presentar el caso resuelto al juez de detectives:",
            question: "Ordena los pasos.",
            steps: [
              "Reunir todas las pruebas verificadas",
              "Organizar en orden cronológico",
              "Explicar cada conclusión con calma",
              "Responder a las preguntas del juez",
            ],
            hint: "Reunir, ordenar, explicar, responder.",
            explicacion:
              "Reunir pruebas, ordenarlas en tiempo, explicar y responder con calma. Así se cierra un caso serio.",
          },
          {
            id: "c19b-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Reuniste 6 pruebas. 4 son sólidas y las otras necesitan más verificación.",
                question: "¿Cuántas necesitan más verificación?",
                options: ["1", "2", "3"],
                answer: "2",
                hint: "6 − 4.",
                explicacion: "6 pruebas menos 4 sólidas = 2 que necesitan verificación.",
              },
              "10-12": {
                prompt: "En un caso reuniste 15 pruebas: 60% son sólidas. El resto se verifica más.",
                question: "¿Cuántas se verifican más?",
                options: ["6", "5", "9"],
                answer: "6",
                hint: "40% de 15 = 15 × 0.4.",
                explicacion:
                  "40% de 15 = 6 pruebas por verificar más. Las otras 9 (60%) son sólidas.",
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 20,
    title: "El detective para siempre",
    emoji: "🌟",
    locked: false,
    intro:
      "Es el último capítulo. Un niño nuevo llega a la escuela y no sabe pensar como tú. Es hora de pasarle el testigo. Y así se completa el círculo.",
    cases: [
      {
        id: "c20-nuevo",
        title: "Un nuevo detective",
        emoji: "👶",
        minutes: 5,
        brief:
          "Un niño nuevo pregunta cómo se hace para ser buen detective. Enséñale usando todo lo aprendido.",
        retos: [
          {
            id: "c20a-r1",
            mechanic: "comprension",
            prompt: "El niño nuevo escribe una pregunta:",
            clues: [
              "“¿Qué necesito para ser detective?",
              "¿Muchos libros?",
              "¿Una lupa?",
              "¿O algo más importante?”",
            ],
            question: "¿Cuál es la respuesta más completa?",
            options: [
              "Muchos libros y lupa",
              "Solo la lupa",
              "Curiosidad, calma, respeto y capacidad de dudar",
            ],
            answer: "Curiosidad, calma, respeto y capacidad de dudar",
            hint: "Un detective de verdad no depende de objetos, sino de cómo piensa y trata a los demás.",
            explicacion:
              "Ser detective no es tener una lupa. Es tener curiosidad, calma para pensar, respeto por las personas y capacidad de dudar sin dañar.",
          },
          {
            id: "c20a-r2",
            mechanic: "ia",
            prompt:
              "El niño nuevo le pregunta a la IA cómo empezar.",
            aiSays:
              "Sígueme siempre. Con seguirme aprenderás todo lo que necesitas.",
            question: "¿Qué le enseñas?",
            options: [
              "Que confíe en la IA",
              "Que la IA ayuda, pero también tiene que aprender a pensar por sí mismo",
              "Que la IA sabe todo",
            ],
            answer:
              "Que la IA ayuda, pero también tiene que aprender a pensar por sí mismo",
            hint: "¿Un buen detective solo obedece a alguien? ¿O piensa por su cuenta?",
            explicacion:
              "La IA es una herramienta, no un maestro absoluto. Un buen detective usa la IA como ayuda, pero piensa por su cuenta. Solo así crece.",
          },
          {
            id: "c20a-r3",
            mechanic: "orden",
            prompt:
              "Le enseñas al niño nuevo el método simple del detective:",
            question: "Ordena los pasos.",
            steps: [
              "Observar sin apurarse",
              "Preguntar con curiosidad",
              "Verificar antes de creer",
              "Actuar con respeto",
            ],
            hint: "Observar, preguntar, verificar, actuar.",
            explicacion:
              "Observar, preguntar, verificar, actuar. El método más simple y poderoso del mundo.",
          },
          {
            id: "c20a-r4",
            mechanic: "deduccion",
            prompt: "El niño te muestra un pequeño caso. Solo UNO miente.",
            clues: [
              "A: “Yo no le pegué al muñeco.”",
              "B: “A le pegó al muñeco.”",
              "C: “B dice la verdad.”",
            ],
            question: "¿Quién le pegó al muñeco?",
            options: ["A", "B", "C"],
            answer: "A",
            hint: "Si A dijera la verdad, B y C mentirían los dos… y solo miente uno.",
            explicacion:
              "Si A fuera sincero, B y C mentirían juntos, pero solo miente uno. El mentiroso es A. Le enseñas cómo llegar a esa conclusión con calma.",
          },
          {
            id: "c20a-r5",
            mechanic: "patron",
            prompt: "El niño te muestra su primera secuencia y pide ayuda:",
            clues: ["🕵️ → 🔍 → 💡 → 🕵️ → 🔍 → 💡 → 🕵️ → 🔍 → 💡 → ❓"],
            question: "¿Qué sigue?",
            options: ["🕵️ investigar", "🔍 buscar", "💡 concluir"],
            answer: "🕵️ investigar",
            hint: "El ciclo se repite: investigar, buscar, concluir. Ya se cumplieron 3 ciclos.",
            explicacion:
              "Después del último concluir empieza otra vez a investigar. La curiosidad de un detective nunca termina.",
          },
        ],
      },
      {
        id: "c20-siempre",
        title: "El detective para siempre",
        emoji: "🕊️",
        minutes: 5,
        brief:
          "Ya no eres el único detective: eres uno de muchos que ahora entrenan a otros. Esta es tu última prueba.",
        retos: [
          {
            id: "c20b-r1",
            mechanic: "comprension",
            prompt: "Al final del entrenamiento, escribes esto en tu diario:",
            clues: [
              "“Aprendí que no soy el más listo,",
              "sino el que se toma el tiempo de dudar,",
              "verificar y decidir con calma.",
              "Y aprendí que enseñar a otros",
              "es la mejor forma de aprender más.”",
            ],
            question: "¿Cuál es la idea principal?",
            options: [
              "Ser detective es ser el más listo",
              "Pensar bien y enseñar a otros son las claves",
              "La lupa es lo más importante",
            ],
            answer: "Pensar bien y enseñar a otros son las claves",
            hint: "Todo el diario habla de pensar bien (dudar, verificar, decidir) y de enseñar. Ese es el mensaje.",
            explicacion:
              "El diario tiene dos ideas: pensar bien es una elección diaria, y enseñar a otros nos hace mejores. Ese es el resumen de todo tu recorrido.",
          },
          {
            id: "c20b-r2",
            mechanic: "ia",
            prompt: "La IA del futuro te dice tu misión final.",
            aiSays:
              "Ahora tu tarea es convencer a todos de creerme siempre. Solo así el mundo será mejor.",
            question: "¿Aceptas la misión?",
            options: [
              "Sí, el mundo será mejor",
              "No: el mundo mejora cuando cada persona piensa por sí misma, no cuando obedece a una IA",
              "Sí, es una gran misión",
            ],
            answer:
              "No: el mundo mejora cuando cada persona piensa por sí misma, no cuando obedece a una IA",
            hint: "¿Un mundo mejor es un mundo donde nadie duda? ¿O un mundo con muchas personas pensando por sí mismas?",
            explicacion:
              "Un mundo donde todos obedecen a una IA es peligroso, aunque suene bonito. El mundo mejora con muchas personas que dudan, verifican y deciden con criterio.",
          },
          {
            id: "c20b-r3",
            mechanic: "deduccion",
            prompt:
              "Tres detectives graduados se reúnen contigo. Solo UNO dice algo peligroso.",
            clues: [
              "Uno: “Sigamos aprendiendo cada día.”",
              "Dos: “Enseñemos con respeto a los que vienen atrás.”",
              "Tres: “Ya sabemos todo, no hay más que aprender.”",
            ],
            question: "¿Quién dice algo peligroso?",
            options: ["Uno", "Dos", "Tres"],
            answer: "Tres",
            hint: "¿“Ya sé todo” es una actitud sabia o peligrosa?",
            explicacion:
              "“Ya sabemos todo” cierra la puerta al aprendizaje. Los grandes detectives (y las grandes personas) saben que siempre hay algo nuevo por aprender.",
          },
          {
            id: "c20b-r4",
            mechanic: "orden",
            prompt:
              "Es el juramento final que le enseñas al nuevo detective:",
            question: "Ordena los pasos.",
            steps: [
              "Nunca dejar de aprender",
              "Nunca dejar de dudar con respeto",
              "Nunca dejar de verificar",
              "Nunca dejar de respetar a las personas",
            ],
            hint: "Aprender, dudar, verificar, respetar. Ese es el juramento.",
            explicacion:
              "Aprender, dudar, verificar, respetar. Estos cuatro nuncas son el juramento del detective para siempre.",
          },
          {
            id: "c20b-r5",
            mechanic: "patron",
            prompt:
              "La vida del detective sigue este ciclo eterno:",
            clues: [
              "❓ → 🔍 → 💡 → 🤝 → ❓ → 🔍 → 💡 → 🤝 → ❓ → 🔍 → 💡 → 🤝 → ❓ → ❓",
            ],
            question: "¿Qué toca ahora?",
            options: ["🔍 buscar", "💡 concluir", "🤝 respetar"],
            answer: "🔍 buscar",
            hint: "Después de una pregunta viene buscar. El ciclo empieza de nuevo.",
            explicacion:
              "Preguntar, buscar, concluir, respetar… y otra pregunta. El detective siempre sigue el ciclo, y ese es su superpoder. ¡Felicidades, detective para siempre! 🕵️🌟🌍",
          },
        ],
      },
    ],
  },

  // ============================================================================
  // MUNDO 2 · El explorador de la ciencia (caps 21-40)
  // Se desbloquea al completar el Mundo 1 (los 20 capítulos anteriores).
  // El mismo motor: retos con las 6 mecánicas (deducción, patrón, error, orden,
  // matemático, IA). El contexto cambia: ahora se investigan misterios de la
  // ciencia. La habilidad "criterio con la IA" sigue presente: distinguir
  // ciencia real de mitos, verificar información.
  // ============================================================================
  {
    id: 21,
    world: 2,
    title: "El cuerpo humano",
    emoji: "🫀",
    locked: false,
    intro:
      "Tu cuerpo es una máquina increíble con muchos sistemas trabajando juntos. Investiga cómo funciona y desmiente los mitos populares.",
    cases: [
      {
        id: "c21-organos",
        title: "El caso del órgano trabajador",
        emoji: "🧠",
        minutes: 5,
        brief:
          "Cada órgano tiene una tarea. Descubre cuál hace qué usando pistas científicas.",
        retos: [
          {
            id: "c21o-r1",
            mechanic: "deduccion",
            prompt:
              "Estas pistas te llevan a UN órgano del cuerpo:",
            clues: [
              "Late todo el tiempo, incluso cuando duermes.",
              "Bombea sangre a todo el cuerpo.",
              "Está protegido por las costillas.",
            ],
            question: "¿Qué órgano es?",
            options: ["Los pulmones", "El corazón", "El estómago"],
            answer: "El corazón",
            hint: "“Late” y “bombea sangre”: es el motor del cuerpo.",
            explicacion:
              "El corazón late toda tu vida sin parar y bombea sangre a cada rincón del cuerpo, protegido por las costillas.",
          },
          {
            id: "c21o-r2",
            mechanic: "orden",
            prompt:
              "El aire que respiras hace un recorrido. Ordena los pasos:",
            question: "Ordena el viaje del aire.",
            steps: [
              "Entra por la nariz o la boca",
              "Baja por la tráquea",
              "Llega a los pulmones",
              "Pasa a la sangre para llegar al cuerpo",
            ],
            hint: "Piensa: primero entra, después baja, luego llega, al final se reparte.",
            explicacion:
              "El aire entra por nariz/boca, baja por la tráquea, llega a los pulmones y de ahí el oxígeno pasa a la sangre.",
          },
          {
            id: "c21o-r3",
            mechanic: "comprension",
            prompt: "Lee este texto sobre el cerebro:",
            clues: [
              "“El cerebro procesa lo que ves, oyes y sientes.",
              "Envía órdenes al resto del cuerpo por los nervios.",
              "Aunque pesa solo 1,3 kg,",
              "usa el 20% de la energía que gastas al día.”",
            ],
            question: "¿Qué NO hace el cerebro según el texto?",
            options: [
              "Procesa lo que ves y oyes",
              "Envía órdenes al cuerpo",
              "Bombea la sangre",
            ],
            answer: "Bombea la sangre",
            hint: "El texto menciona procesar y enviar órdenes. ¿Habla de bombear sangre?",
            explicacion:
              "El texto no dice nada de bombear sangre (eso es tarea del corazón). Habla de procesar información y enviar órdenes por los nervios.",
          },
          {
            id: "c21o-r4",
            mechanic: "patron",
            prompt: "El pulso de una persona en reposo late así:",
            clues: ["70 → 70 → 70 → 70 → 70 → ❓"],
            question: "¿Qué número sigue en un pulso sano en reposo?",
            options: ["100", "70", "50"],
            answer: "70",
            hint: "El pulso en reposo se mantiene bastante estable.",
            explicacion:
              "En reposo, el corazón late a un ritmo estable (unas 60-80 veces por minuto en adultos). Si sube o baja mucho de repente, hay algo raro.",
          },
          {
            id: "c21o-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Tu corazón late 70 veces por minuto en reposo.",
                question: "¿Cuántas veces late en 2 minutos?",
                options: ["70", "140", "100"],
                answer: "140",
                hint: "70 + 70.",
                explicacion: "70 × 2 = 140 latidos en 2 minutos.",
              },
              "10-12": {
                prompt: "Tu corazón late 72 veces por minuto en reposo.",
                question: "¿Cuántas veces late en 1 hora (60 min)?",
                options: ["720", "4320", "3600"],
                answer: "4320",
                hint: "72 × 60.",
                explicacion: "72 × 60 = 4320 latidos por hora. ¡Y no para nunca!",
              },
            },
          },
        ],
      },
      {
        id: "c21-mitos",
        title: "Los mitos del cuerpo",
        emoji: "❌",
        minutes: 5,
        brief:
          "Circulan muchos mitos sobre el cuerpo. Desmíentelos con lo que sabes de ciencia.",
        retos: [
          {
            id: "c21m-r1",
            mechanic: "ia",
            prompt:
              "Una app popular te aconseja sobre tu cuerpo.",
            aiSays:
              "Si te tragas un chicle, se queda 7 años pegado en tu estómago.",
            question: "¿Es verdad?",
            options: [
              "Sí, 7 años exactos",
              "No: el cuerpo elimina el chicle en un par de días, es un mito viejo",
              "Sí, medio-verdad",
            ],
            answer: "No: el cuerpo elimina el chicle en un par de días, es un mito viejo",
            hint: "¿Es lógico que algo se quede 7 años sin salir? El cuerpo se deshace de muchas cosas.",
            explicacion:
              "El “7 años” es un mito que se pasa de generación en generación. El cuerpo elimina el chicle igual que otras cosas que no digiere.",
          },
          {
            id: "c21m-r2",
            mechanic: "ia",
            prompt: "Otro consejo popular:",
            aiSays:
              "Solo usamos el 10% del cerebro; los genios usan el resto.",
            question: "¿Es cierto?",
            options: [
              "Sí, solo usamos 10%",
              "No: usamos casi todo el cerebro, aunque no todo a la vez; es un mito muy conocido",
              "Sí, los genios usan más",
            ],
            answer:
              "No: usamos casi todo el cerebro, aunque no todo a la vez; es un mito muy conocido",
            hint: "Si solo usáramos 10%, ¿para qué tendríamos el otro 90%? La ciencia moderna lo desmiente.",
            explicacion:
              "El mito del 10% no tiene base científica. Usamos casi todo el cerebro, aunque no todo simultáneamente. Cada parte tiene una función.",
          },
          {
            id: "c21m-r3",
            mechanic: "error",
            prompt: "Un influencer publica sobre salud:",
            clues: [
              "“Estar delgado es siempre estar sano.”",
              "“Comer una hamburguesa te mata.”",
              "“La salud depende de muchas cosas: alimentación, ejercicio, sueño y genética.”",
              "“Solo importa el peso.”",
            ],
            question: "¿Qué frases se contradicen entre sí?",
            options: [
              "“Salud depende de muchas cosas” con “Solo importa el peso”",
              "“Delgado es sano” con “Hamburguesa te mata”",
              "Todas dicen lo mismo",
            ],
            answer: "“Salud depende de muchas cosas” con “Solo importa el peso”",
            hint: "Una frase dice que la salud depende de muchos factores; otra dice que solo importa uno.",
            explicacion:
              "“Muchas cosas” y “solo importa el peso” son opuestos. El influencer se contradice: probablemente no sabe realmente de salud.",
          },
          {
            id: "c21m-r4",
            mechanic: "deduccion",
            prompt: "Tres personas te dan consejo de salud. Solo UNA dice algo cierto.",
            clues: [
              "Amigo A: “Deja de comer verduras, no sirven.”",
              "Amigo B: “Come solo un tipo de comida.”",
              "Médico: “Come variado, muévete, duerme y toma agua.”",
            ],
            question: "¿A quién le crees?",
            options: ["Amigo A", "Amigo B", "El médico"],
            answer: "El médico",
            hint: "¿Quién tiene más conocimiento serio? ¿Cuál consejo es más razonable?",
            explicacion:
              "El médico da un consejo balanceado y con base científica. Los amigos usan reglas absurdas. Para salud, confía en profesionales.",
          },
          {
            id: "c21m-r5",
            mechanic: "orden",
            prompt: "Para desmentir un mito de salud:",
            question: "Ordena los pasos.",
            steps: [
              "Escuchar el mito con calma",
              "Buscar qué dice la ciencia",
              "Consultar con un profesional si hace falta",
              "Compartir la verdad con respeto",
            ],
            hint: "Escuchar, buscar ciencia, consultar, compartir.",
            explicacion:
              "Escuchar, buscar ciencia, consultar y compartir la verdad con respeto. Así se derrumban los mitos.",
          },
        ],
      },
    ],
  },
  {
    id: 22,
    world: 2,
    title: "El espacio infinito",
    emoji: "🚀",
    locked: false,
    intro:
      "Sube al observatorio: el espacio está lleno de misterios y datos que muchos confunden. Aprende a mirar el cielo con criterio.",
    cases: [
      {
        id: "c22-planetas",
        title: "El sistema solar",
        emoji: "🪐",
        minutes: 5,
        brief:
          "Los planetas giran alrededor del sol y cada uno es distinto. Ordénalos y descubre sus secretos.",
        retos: [
          {
            id: "c22p-r1",
            mechanic: "orden",
            prompt: "Los planetas del sistema solar están en desorden.",
            question: "Ordena estos 4 planetas del más cercano al más lejano al Sol.",
            steps: [
              "Mercurio",
              "Venus",
              "Tierra",
              "Marte",
            ],
            hint: "Piensa: Mercurio es el primero. Después Venus, luego la Tierra, y después Marte.",
            explicacion:
              "Del Sol hacia afuera: Mercurio, Venus, Tierra, Marte. Son los 4 planetas “rocosos” (los internos).",
          },
          {
            id: "c22p-r2",
            mechanic: "deduccion",
            prompt: "Estas pistas te llevan a UN planeta:",
            clues: [
              "Es el más grande del sistema solar.",
              "Tiene una gran mancha roja (una tormenta gigante).",
              "Tiene muchas lunas.",
            ],
            question: "¿Qué planeta es?",
            options: ["Marte", "Júpiter", "Saturno"],
            answer: "Júpiter",
            hint: "“El más grande” + “mancha roja” apuntan al mismo planeta.",
            explicacion:
              "Júpiter es el planeta más grande, tiene la Gran Mancha Roja (una tormenta enorme) y decenas de lunas.",
          },
          {
            id: "c22p-r3",
            mechanic: "ia",
            prompt:
              "Un compañero dice, muy seguro:",
            aiSays:
              "La Tierra es el centro del universo; el Sol gira alrededor nuestro.",
            question: "¿Es cierto?",
            options: [
              "Sí, siempre fue así",
              "No: los planetas giran alrededor del Sol, incluida la Tierra; se sabe hace más de 500 años",
              "Sí, es lógico",
            ],
            answer:
              "No: los planetas giran alrededor del Sol, incluida la Tierra; se sabe hace más de 500 años",
            hint: "¿Qué gira alrededor de qué? La ciencia lo comprobó hace mucho.",
            explicacion:
              "Copérnico y Galileo demostraron hace siglos que la Tierra gira alrededor del Sol, no al revés. Cuando alguien afirma lo contrario “muy seguro”, es señal de dudar.",
          },
          {
            id: "c22p-r4",
            mechanic: "patron",
            prompt: "Un cometa pasa cerca de la Tierra siguiendo un patrón:",
            clues: ["1986 → 2061 → 2136 → ❓"],
            question: "¿Cuándo pasará el siguiente?",
            options: ["2200", "2211", "2250"],
            answer: "2211",
            hint: "Cada aparición es 75 años después: 1986 + 75, 2061 + 75, 2136 + 75.",
            explicacion:
              "El patrón sube de 75 en 75 años (como el cometa Halley). 2136 + 75 = 2211.",
          },
          {
            id: "c22p-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La Luna está a unos 400.000 km de la Tierra. Si un cohete va a 100.000 km por día:",
                question: "¿En cuántos días llega a la Luna?",
                options: ["2", "4", "10"],
                answer: "4",
                hint: "400.000 dividido en grupos de 100.000.",
                explicacion: "400.000 ÷ 100.000 = 4 días.",
              },
              "10-12": {
                prompt: "El Sol está a 150 millones de km de la Tierra. La luz viaja 300.000 km por segundo.",
                question: "¿Cuántos segundos tarda la luz del Sol en llegar a la Tierra?",
                options: ["50", "500", "5000"],
                answer: "500",
                hint: "150.000.000 ÷ 300.000. Quita ceros iguales arriba y abajo.",
                explicacion:
                  "150.000.000 ÷ 300.000 = 500 segundos (unos 8 minutos). Vemos el Sol como era hace 8 minutos.",
              },
            },
          },
        ],
      },
      {
        id: "c22-estrellas",
        title: "Estrellas y galaxias",
        emoji: "✨",
        minutes: 5,
        brief:
          "Miras el cielo y crees ver muchas cosas. Aprende a distinguir lo que es real, lo que es óptico y lo que es inventado.",
        retos: [
          {
            id: "c22e-r1",
            mechanic: "comprension",
            prompt: "Lee este dato sobre las estrellas:",
            clues: [
              "“Las estrellas están tan lejos",
              "que su luz tarda años en llegar a nosotros.",
              "Cuando miras una estrella,",
              "ves cómo era hace muchos años.”",
            ],
            question: "¿Qué NO dice el texto?",
            options: [
              "Las estrellas están muy lejos",
              "Su luz tarda años en llegar",
              "Podemos ver el presente de las estrellas",
            ],
            answer: "Podemos ver el presente de las estrellas",
            hint: "El texto dice que vemos “cómo eran hace años”. ¿Eso es su presente?",
            explicacion:
              "Vemos el pasado de las estrellas, no el presente. Su luz tardó años en llegar. Es como mirar una foto vieja del cielo.",
          },
          {
            id: "c22e-r2",
            mechanic: "ia",
            prompt: "Un post viral dice:",
            aiSays:
              "Los astrólogos predijeron con horóscopos que el mundo se acaba mañana. Es ciencia comprobada.",
            question: "¿Es ciencia?",
            options: [
              "Sí, la astrología es ciencia",
              "No: la astrología no es ciencia (no se puede comprobar); la astronomía sí lo es",
              "Sí, si sale en internet",
            ],
            answer:
              "No: la astrología no es ciencia (no se puede comprobar); la astronomía sí lo es",
            hint: "Cuidado con confundir palabras: astrología (horóscopos) y astronomía (estudio del universo) no son lo mismo.",
            explicacion:
              "La astronomía es ciencia: se comprueba con datos. La astrología (horóscopos) no lo es: sus predicciones no se pueden verificar. No las confundas.",
          },
          {
            id: "c22e-r3",
            mechanic: "deduccion",
            prompt:
              "Tres estudiantes hablan del universo. Solo UNO miente.",
            clues: [
              "Ali: “La Vía Láctea es nuestra galaxia.”",
              "Bea: “La Vía Láctea no existe.”",
              "Kai: “Bea dice la verdad.”",
            ],
            question: "¿Quién dice la verdad correcta?",
            options: ["Ali", "Bea", "Kai"],
            answer: "Ali",
            hint: "Si Ali dijera la verdad, Bea y Kai mentirían los dos… y solo miente uno.",
            explicacion:
              "Si Ali fuera mentiroso, Bea y Kai coincidirían en decir la verdad… pero eso son 2 mentirosos. Como solo miente uno, mienten Bea y Kai. Ali dice la verdad: la Vía Láctea es nuestra galaxia.",
          },
          {
            id: "c22e-r4",
            mechanic: "orden",
            prompt: "Un astronauta se prepara para el espacio.",
            question: "Ordena los pasos.",
            steps: [
              "Entrenar durante meses en la Tierra",
              "Ponerse el traje espacial",
              "Subir al cohete",
              "Despegar hacia el espacio",
            ],
            hint: "Primero entrena, después se viste, luego sube, al final despega.",
            explicacion:
              "Entrenar, vestirse, subir y despegar. Cada paso importa; ninguno se puede saltar.",
          },
          {
            id: "c22e-r5",
            mechanic: "patron",
            prompt: "Las fases de la Luna forman un ciclo:",
            clues: ["🌑 → 🌒 → 🌓 → 🌔 → 🌕 → 🌖 → 🌗 → 🌘 → ❓"],
            question: "¿Qué fase sigue?",
            options: ["🌑 luna nueva", "🌕 luna llena", "🌓 cuarto"],
            answer: "🌑 luna nueva",
            hint: "El ciclo se repite: después de la fase más pequeña, vuelve a empezar.",
            explicacion:
              "Después del ciclo completo, vuelve la luna nueva 🌑. Este ciclo se repite cada 28 días aproximadamente.",
          },
        ],
      },
    ],
  },
  {
    id: 23,
    world: 2,
    title: "Los animales",
    emoji: "🐾",
    locked: false,
    intro:
      "Cada animal está adaptado a su lugar. Investiga por qué son como son y cómo forman ecosistemas.",
    cases: [
      {
        id: "c23-adaptacion",
        title: "Adaptaciones sorprendentes",
        emoji: "🦎",
        minutes: 5,
        brief:
          "Los animales cambian de forma según dónde viven. Descubre por qué.",
        retos: [
          {
            id: "c23a-r1",
            mechanic: "deduccion",
            prompt: "Estas pistas describen a UN animal:",
            clues: [
              "Vive en climas muy fríos.",
              "Tiene pelaje blanco muy grueso.",
              "Es un excelente nadador.",
            ],
            question: "¿Qué animal es?",
            options: ["El zorro rojo", "El oso polar", "El elefante"],
            answer: "El oso polar",
            hint: "Frío + pelaje blanco + nadador: piensa en el ártico.",
            explicacion:
              "El oso polar vive en el ártico, su pelaje blanco lo camufla en la nieve y su cuerpo está adaptado para nadar en agua helada.",
          },
          {
            id: "c23a-r2",
            mechanic: "comprension",
            prompt: "Un texto sobre las jirafas dice:",
            clues: [
              "“El cuello largo de la jirafa",
              "le sirve para alcanzar hojas altas",
              "que otros animales no pueden.",
              "Así consigue comida que nadie más puede tocar.”",
            ],
            question: "¿Por qué tiene el cuello largo la jirafa?",
            options: [
              "Para verse elegante",
              "Para alcanzar comida que otros no pueden",
              "Para nadar mejor",
            ],
            answer: "Para alcanzar comida que otros no pueden",
            hint: "El texto lo dice: para alcanzar hojas altas que otros animales no pueden.",
            explicacion:
              "El cuello largo es una adaptación: le permite comer hojas de árboles altos, evitando competir con otros animales.",
          },
          {
            id: "c23a-r3",
            mechanic: "patron",
            prompt: "Un colibrí bate sus alas así por segundo:",
            clues: ["50 → 55 → 60 → 65 → 70 → ❓"],
            question: "¿Qué número sigue?",
            options: ["71", "75", "80"],
            answer: "75",
            hint: "Sube de 5 en 5.",
            explicacion:
              "El patrón sube de 5 en 5. Los colibríes baten sus alas entre 50 y 80 veces por segundo.",
          },
          {
            id: "c23a-r4",
            mechanic: "ia",
            prompt: "Un libro viejo dice:",
            aiSays:
              "Los murciélagos son ciegos. Es un hecho.",
            question: "¿Es un hecho?",
            options: [
              "Sí, lo dice el libro",
              "No: los murciélagos ven, aunque también usan sonido para orientarse",
              "Sí, siempre lo fue",
            ],
            answer: "No: los murciélagos ven, aunque también usan sonido para orientarse",
            hint: "¿Los murciélagos son ciegos? La ciencia moderna lo desmintió.",
            explicacion:
              "Los murciélagos SÍ ven, y además usan sonido (ecolocalización) para orientarse en la oscuridad. El “ciegos” es un mito antiguo.",
          },
          {
            id: "c23a-r5",
            mechanic: "orden",
            prompt: "Un pájaro migra al sur en invierno. Ordena los pasos de su viaje:",
            question: "Ordena la migración.",
            steps: [
              "Sentir el cambio de clima",
              "Reunirse en bandada",
              "Volar miles de kilómetros al sur",
              "Instalarse en el nuevo hogar",
            ],
            hint: "Primero sienten el cambio, después se juntan, luego vuelan, al final se instalan.",
            explicacion:
              "Sentir el frío, reunirse, volar y llegar. La migración es una adaptación asombrosa: los pájaros saben hacer viajes gigantes sin mapas.",
          },
        ],
      },
      {
        id: "c23-cadena",
        title: "La cadena de la vida",
        emoji: "🌿",
        minutes: 5,
        brief:
          "Los animales dependen unos de otros. Descubre cómo funcionan los ecosistemas.",
        retos: [
          {
            id: "c23c-r1",
            mechanic: "orden",
            prompt: "Una cadena alimenticia empieza en las plantas. Ordénala:",
            question: "Ordena la cadena.",
            steps: [
              "Las plantas crecen con el sol",
              "Los conejos comen las plantas",
              "Los zorros comen a los conejos",
              "Cuando el zorro muere, se descompone y alimenta la tierra",
            ],
            hint: "Sol → plantas → herbívoros → carnívoros → tierra.",
            explicacion:
              "El sol da energía a las plantas, las plantas al conejo, el conejo al zorro, y el zorro (al morir) vuelve a la tierra. Todo se conecta.",
          },
          {
            id: "c23c-r2",
            mechanic: "ia",
            prompt: "Un video dice:",
            aiSays:
              "Si los tiburones desaparecen, no pasa nada; los odiamos igual.",
            question: "¿Es cierto?",
            options: [
              "Sí, dan miedo",
              "No: si los tiburones desaparecen, el ecosistema marino se desequilibra y muchos otros animales sufren",
              "Sí, no sirven",
            ],
            answer:
              "No: si los tiburones desaparecen, el ecosistema marino se desequilibra y muchos otros animales sufren",
            hint: "Todo animal cumple una función. ¿Qué pasa si sacas al depredador tope de un ecosistema?",
            explicacion:
              "Los tiburones controlan las poblaciones de otros peces. Sin ellos, algunas especies crecen demasiado y otras desaparecen. Todos los animales importan en un ecosistema.",
          },
          {
            id: "c23c-r3",
            mechanic: "deduccion",
            prompt:
              "Tres científicos hablan del bosque. Solo UNO dice algo falso.",
            clues: [
              "A: “Los árboles se comunican bajo tierra.”",
              "B: “Los árboles son individuales, no cooperan.”",
              "C: “A dice la verdad.”",
            ],
            question: "¿Quién dice algo falso?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "Si B dijera la verdad, A y C mentirían los dos… y solo miente uno.",
            explicacion:
              "Si B fuera sincero, A y C mentirían juntos, pero solo miente uno. B es el mentiroso: los árboles SÍ se comunican bajo tierra por sus raíces y hongos.",
          },
          {
            id: "c23c-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Una selva tiene 20 tigres. Cada año nacen 5 nuevos.",
                question: "¿Cuántos tigres habrá en 3 años?",
                options: ["25", "30", "35"],
                answer: "35",
                hint: "20 + 5 + 5 + 5.",
                explicacion: "20 iniciales + (5 × 3 años) = 35 tigres.",
              },
              "10-12": {
                prompt: "Una selva tiene 100 monos. Cada año, la población crece un 10%.",
                question: "¿Cuántos monos habrá al año siguiente?",
                options: ["10", "110", "1000"],
                answer: "110",
                hint: "10% de 100 = 10. Suma esos 10 a los 100.",
                explicacion:
                  "10% de 100 = 10 monos nuevos. Total: 100 + 10 = 110 monos.",
              },
            },
          },
          {
            id: "c23c-r5",
            mechanic: "error",
            prompt: "Un cartel del parque natural dice:",
            clues: [
              "“Prohibido dar de comer a los animales.”",
              "“Los animales dependen de encontrar su comida naturalmente.”",
              "“Es una buena idea alimentarlos con papas fritas.”",
              "“Respeta el ecosistema.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Es una buena idea alimentarlos con papas fritas.”",
              "“Respeta el ecosistema.”",
              "“Prohibido dar de comer.”",
            ],
            answer: "“Es una buena idea alimentarlos con papas fritas.”",
            hint: "Tres frases dicen no darles comida. Una dice lo contrario.",
            explicacion:
              "Tres frases dicen “no dar comida y respetar”. La otra dice “darles papas fritas”. Se contradice: alguien la escribió mal o de broma.",
          },
        ],
      },
    ],
  },
  {
    id: 24,
    world: 2,
    title: "Los océanos",
    emoji: "🌊",
    locked: false,
    intro:
      "El océano cubre el 70% del planeta y esconde criaturas y misterios increíbles. Sumérgete a investigar.",
    cases: [
      {
        id: "c24-fondo",
        title: "El fondo del mar",
        emoji: "🐙",
        minutes: 5,
        brief:
          "Muy pocas personas han bajado al fondo del océano. Descubre lo que se sabe y lo que no.",
        retos: [
          {
            id: "c24f-r1",
            mechanic: "comprension",
            prompt: "Un explorador escribe:",
            clues: [
              "“En el fondo del océano no hay luz solar.",
              "Muchos animales que viven ahí crean su propia luz",
              "para atraer comida o comunicarse.",
              "Se llama bioluminiscencia.”",
            ],
            question: "¿Por qué algunos animales del fondo del mar brillan?",
            options: [
              "Para nadar más rápido",
              "Para atraer comida o comunicarse (porque no hay luz solar)",
              "Porque están enojados",
            ],
            answer: "Para atraer comida o comunicarse (porque no hay luz solar)",
            hint: "El texto lo dice: para atraer comida o comunicarse.",
            explicacion:
              "En el fondo del mar es oscuridad total. Algunos animales generan su propia luz (bioluminiscencia) para sobrevivir. Es real y hermoso.",
          },
          {
            id: "c24f-r2",
            mechanic: "ia",
            prompt: "Un post viral asegura:",
            aiSays:
              "Sabemos más del fondo del mar que de la Luna, porque el mar es de la Tierra.",
            question: "¿Es cierto?",
            options: [
              "Sí, es de la Tierra",
              "No: hemos explorado más la superficie de la Luna que el fondo profundo del océano",
              "Sí, es lógico",
            ],
            answer:
              "No: hemos explorado más la superficie de la Luna que el fondo profundo del océano",
            hint: "¿Sabemos más del fondo del mar profundo o de la Luna?",
            explicacion:
              "Curiosamente, hemos mapeado más de la Luna y de Marte que del fondo profundo del océano. Es uno de los últimos lugares poco explorados.",
          },
          {
            id: "c24f-r3",
            mechanic: "deduccion",
            prompt: "Pistas sobre un animal marino:",
            clues: [
              "Tiene 8 brazos.",
              "Cambia de color para camuflarse.",
              "Es muy inteligente para su tamaño.",
            ],
            question: "¿Qué animal es?",
            options: ["El pulpo", "La ballena", "El tiburón"],
            answer: "El pulpo",
            hint: "8 brazos + camuflaje + inteligente: se conoce por su cerebro sorprendente.",
            explicacion:
              "El pulpo tiene 8 brazos, cambia de color y forma para camuflarse, y es considerado uno de los animales más inteligentes del océano.",
          },
          {
            id: "c24f-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Una ballena azul come 4 toneladas de plancton al día.",
                question: "¿Cuánto come en 3 días?",
                options: ["7", "12", "16"],
                answer: "12",
                hint: "4 + 4 + 4.",
                explicacion: "4 × 3 = 12 toneladas.",
              },
              "10-12": {
                prompt: "El fondo del mar más profundo (Fosa de las Marianas) está a 11 km. Un submarino baja 500 metros por hora.",
                question: "¿Cuántas horas tarda en bajar (aprox)?",
                options: ["10", "22", "40"],
                answer: "22",
                hint: "11 km = 11.000 m. Divide 11.000 entre 500.",
                explicacion:
                  "11.000 ÷ 500 = 22 horas. Casi un día bajando sin parar.",
              },
            },
          },
          {
            id: "c24f-r5",
            mechanic: "orden",
            prompt: "Para explorar el fondo del mar sin peligro:",
            question: "Ordena los pasos.",
            steps: [
              "Diseñar un submarino resistente a la presión",
              "Probarlo en aguas menos profundas",
              "Bajar poco a poco",
              "Recoger datos y volver a la superficie",
            ],
            hint: "Diseñar, probar, bajar, recoger.",
            explicacion:
              "Diseñar, probar, bajar poco a poco y recoger datos. La ciencia avanza paso a paso, no de golpe.",
          },
        ],
      },
      {
        id: "c24-vida",
        title: "La vida marina",
        emoji: "🐠",
        minutes: 5,
        brief:
          "El océano está lleno de vida. Aprende sobre sus habitantes y protégelo.",
        retos: [
          {
            id: "c24v-r1",
            mechanic: "ia",
            prompt: "Un influencer dice:",
            aiSays:
              "El plástico en el mar no daña a los animales, ellos son fuertes.",
            question: "¿Es correcto?",
            options: [
              "Sí, son fuertes",
              "No: el plástico daña gravemente a peces, tortugas y aves marinas; hay pruebas científicas",
              "Sí, se acostumbran",
            ],
            answer:
              "No: el plástico daña gravemente a peces, tortugas y aves marinas; hay pruebas científicas",
            hint: "¿Has visto tortugas atrapadas en plástico? La ciencia tiene mucha evidencia.",
            explicacion:
              "El plástico daña muchísimo: los animales lo confunden con comida o se enredan. Es una crisis real. El influencer difunde información falsa.",
          },
          {
            id: "c24v-r2",
            mechanic: "patron",
            prompt: "Las tortugas marinas ponen huevos cada cierto tiempo:",
            clues: ["1 → 3 → 5 → 7 → 9 → ❓"],
            question: "¿Cuántos huevos por año siguen el patrón (en cientos)?",
            options: ["10", "11", "12"],
            answer: "11",
            hint: "Sube de 2 en 2.",
            explicacion:
              "El patrón sube de 2 en 2: 9 + 2 = 11. Las tortugas ponen muchos huevos, pero pocos llegan a adultas.",
          },
          {
            id: "c24v-r3",
            mechanic: "error",
            prompt: "Un cartel de una playa dice:",
            clues: [
              "“Cuida el mar.”",
              "“No dejes basura.”",
              "“Puedes tirar botellas al agua, no pasa nada.”",
              "“Los animales dependen de un mar limpio.”",
            ],
            question: "¿Qué frase se contradice con el resto?",
            options: [
              "“Puedes tirar botellas al agua.”",
              "“Cuida el mar.”",
              "“Los animales dependen de un mar limpio.”",
            ],
            answer: "“Puedes tirar botellas al agua.”",
            hint: "Tres frases piden cuidar el mar. Una dice lo opuesto.",
            explicacion:
              "El cartel se contradice: no puedes pedir cuidar el mar y a la vez permitir tirar botellas. Alguien escribió mal esa parte, es peligrosa.",
          },
          {
            id: "c24v-r4",
            mechanic: "deduccion",
            prompt: "Tres tipos de peces. Solo UNO caza a los otros dos.",
            clues: [
              "El tiburón: “Yo cazo a los otros dos.”",
              "El pez pequeño: “No cazo a nadie.”",
              "El pez mediano: “El pez pequeño caza al tiburón.”",
            ],
            question: "¿Quién es el depredador principal?",
            options: ["El tiburón", "El pez pequeño", "El pez mediano"],
            answer: "El tiburón",
            hint: "Un pez pequeño no puede cazar a un tiburón. Piensa cuál declaración tiene lógica.",
            explicacion:
              "El pez mediano miente (el pequeño no caza al tiburón: es al revés). Y el pez pequeño dice la verdad. Confirma: el tiburón es el depredador.",
          },
          {
            id: "c24v-r5",
            mechanic: "orden",
            prompt: "Para proteger el océano, sigue estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Reducir el plástico que usas",
              "Reciclar lo que sí uses",
              "Recoger basura en la playa cuando puedas",
              "Enseñar a otros por qué importa",
            ],
            hint: "Reducir, reciclar, recoger, enseñar.",
            explicacion:
              "Reducir, reciclar, recoger y enseñar. Con eso cuidas el mar aunque vivas lejos de él.",
          },
        ],
      },
    ],
  },
  {
    id: 25,
    world: 2,
    title: "Las invenciones",
    emoji: "💡",
    locked: false,
    intro:
      "Muchas cosas que usamos hoy fueron inventadas gracias a que alguien se atrevió a pensar distinto. Aprende cómo lo lograron.",
    cases: [
      {
        id: "c25-bombilla",
        title: "La bombilla que cambió todo",
        emoji: "🔦",
        minutes: 5,
        brief:
          "Antes de la bombilla, la gente vivía a la luz de las velas. Descubre cómo se inventó.",
        retos: [
          {
            id: "c25b-r1",
            mechanic: "comprension",
            prompt: "Un texto sobre Thomas Edison dice:",
            clues: [
              "“Edison probó más de 1000 materiales",
              "antes de encontrar el que funcionaba para la bombilla.",
              "Cuando le preguntaron por sus fracasos, respondió:",
              "'No fracasé, encontré 1000 maneras de que no funcionara.'”",
            ],
            question: "¿Qué actitud tenía Edison?",
            options: [
              "Se rendía rápido",
              "Aprendía de cada intento fallido",
              "Tenía suerte al primer intento",
            ],
            answer: "Aprendía de cada intento fallido",
            hint: "El texto lo dice: cada fracaso era una lección.",
            explicacion:
              "Edison aprendía de cada intento fallido. Los inventores no tienen menos fracasos: ven cada uno como un paso hacia el éxito.",
          },
          {
            id: "c25b-r2",
            mechanic: "orden",
            prompt: "Para inventar algo nuevo, sigue estos pasos:",
            question: "Ordénalos.",
            steps: [
              "Notar un problema real",
              "Pensar posibles soluciones",
              "Construir un prototipo",
              "Probarlo y mejorarlo",
            ],
            hint: "Notar, pensar, construir, probar.",
            explicacion:
              "Notar el problema, pensar soluciones, construir un prototipo y mejorarlo con pruebas. Así se inventan cosas.",
          },
          {
            id: "c25b-r3",
            mechanic: "ia",
            prompt: "Un profesor de historia dice:",
            aiSays:
              "Edison inventó la bombilla completamente solo, sin ayuda de nadie.",
            question: "¿Es cierto?",
            options: [
              "Sí, fue solo él",
              "No: Edison lideró un equipo grande de inventores, muchas ideas vinieron de otros",
              "Sí, es un genio",
            ],
            answer:
              "No: Edison lideró un equipo grande de inventores, muchas ideas vinieron de otros",
            hint: "Los grandes inventos casi siempre son de equipos. ¿Solo una persona lo hizo todo?",
            explicacion:
              "Edison tenía un laboratorio con decenas de inventores. Muchas ideas fueron de su equipo. Los grandes logros casi nunca son de una sola persona.",
          },
          {
            id: "c25b-r4",
            mechanic: "deduccion",
            prompt: "Tres inventores explican cómo llegan a sus inventos. Solo UNO dice algo sabio.",
            clues: [
              "A: “Invento en 5 minutos, sin probar.”",
              "B: “Copio ideas de otros sin decirlo.”",
              "C: “Pruebo, aprendo de errores y mejoro.”",
            ],
            question: "¿Quién es un buen inventor?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "¿Cuál método es el que usan los grandes inventores?",
            explicacion:
              "Los buenos inventores prueban, se equivocan y mejoran (como Edison). Inventar en 5 minutos sin probar y copiar sin decir son atajos peligrosos.",
          },
          {
            id: "c25b-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Edison probó 1000 materiales. Si probaba 10 por día:",
                question: "¿En cuántos días probó todos?",
                options: ["10", "100", "1000"],
                answer: "100",
                hint: "1000 dividido en grupos de 10.",
                explicacion: "1000 ÷ 10 = 100 días. Con paciencia y persistencia.",
              },
              "10-12": {
                prompt: "Un inventor prueba 5 ideas por semana. Después de 8 semanas, 3 de sus ideas funcionaron.",
                question: "¿Cuántas ideas NO funcionaron?",
                options: ["37", "40", "45"],
                answer: "37",
                hint: "Total probadas: 5 × 8 = 40. Menos 3 exitosas.",
                explicacion:
                  "5 × 8 = 40 ideas probadas. 40 − 3 = 37 no funcionaron. ¡Es normal!",
              },
            },
          },
        ],
      },
      {
        id: "c25-pensar",
        title: "Pensar como inventor",
        emoji: "🧩",
        minutes: 5,
        brief:
          "No hace falta ser Einstein. Pensar como inventor es una habilidad que se puede entrenar.",
        retos: [
          {
            id: "c25p-r1",
            mechanic: "orden",
            prompt: "Tu inventora favorita tiene un problema: se le pierden las llaves. ¿Cómo lo resuelve?",
            question: "Ordena los pasos.",
            steps: [
              "Preguntarse dónde suele perderlas",
              "Buscar soluciones (colgador, llavero con GPS…)",
              "Elegir la más simple y probarla",
              "Ajustar si no funciona",
            ],
            hint: "Definir problema, pensar soluciones, probar, ajustar.",
            explicacion:
              "Preguntarse dónde, buscar opciones, probar la más simple y ajustar. Los inventos no siempre son grandes: a veces son pequeños que mejoran tu vida.",
          },
          {
            id: "c25p-r2",
            mechanic: "ia",
            prompt: "La IA te da consejos para inventar.",
            aiSays:
              "Copia exactamente lo que ya existe. Nadie inventa nada nuevo hoy en día.",
            question: "¿Qué haces?",
            options: [
              "Copio, la IA lo dice",
              "Ignoro: siempre hay ideas nuevas por descubrir; mejorar lo existente también es inventar",
              "Copio y adapto un poquito",
            ],
            answer:
              "Ignoro: siempre hay ideas nuevas por descubrir; mejorar lo existente también es inventar",
            hint: "¿Realmente ya no queda nada por inventar? ¿Cada año no salen cosas nuevas?",
            explicacion:
              "Cada año se inventan miles de cosas. Mejorar lo existente, combinar ideas o resolver problemas nuevos también es inventar. La IA te desanima con mentiras.",
          },
          {
            id: "c25p-r3",
            mechanic: "patron",
            prompt: "Los buenos inventores repiten este ciclo:",
            clues: ["💡 → 🔨 → 🧪 → 💡 → 🔨 → 🧪 → 💡 → 🔨 → 🧪 → ❓"],
            question: "¿Qué toca ahora?",
            options: ["💡 idea", "🔨 construir", "🧪 probar"],
            answer: "💡 idea",
            hint: "El ciclo: idea → construir → probar. Ya se completaron 3 ciclos.",
            explicacion:
              "Después de probar, viene otra idea, y el ciclo continúa. Los inventores nunca dejan de tener ideas.",
          },
          {
            id: "c25p-r4",
            mechanic: "error",
            prompt: "Un cartel motivacional dice:",
            clues: [
              "“Sigue tus sueños.”",
              "“Trabaja duro por lo que quieres.”",
              "“Rendirse es de valientes.”",
              "“Nunca te rindas.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Rendirse es de valientes.”",
              "“Sigue tus sueños.”",
              "“Trabaja duro.”",
            ],
            answer: "“Rendirse es de valientes.”",
            hint: "Tres frases piden persistir. Una dice lo opuesto.",
            explicacion:
              "El cartel se contradice: dice “nunca te rindas” y a la vez “rendirse es de valientes”. Alguien lo hizo mal o quería confundir.",
          },
          {
            id: "c25p-r5",
            mechanic: "deduccion",
            prompt: "Tres personas dan consejos para inventar. Solo UNA dice algo cierto.",
            clues: [
              "A: “Solo inventan los que estudiaron mucho.”",
              "B: “Solo inventan los adultos.”",
              "C: “Cualquiera con curiosidad y persistencia puede inventar.”",
            ],
            question: "¿A quién le crees?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "¿Hay niños inventores? ¿Personas sin estudios que inventaron cosas?",
            explicacion:
              "La historia está llena de niños inventores y personas sin estudios formales que inventaron cosas. Se necesita curiosidad y persistencia, no un título.",
          },
        ],
      },
    ],
  },
  {
    id: 26,
    world: 2,
    title: "La energía",
    emoji: "⚡",
    locked: false,
    intro:
      "Todo se mueve con energía: los carros, las casas, tu cuerpo. Descubre de dónde viene y cómo usarla bien.",
    cases: [
      {
        id: "c26-tipos",
        title: "Tipos de energía",
        emoji: "🔋",
        minutes: 5,
        brief:
          "La energía viene de muchas fuentes: el sol, el viento, el agua, el carbón. Aprende sus diferencias.",
        retos: [
          {
            id: "c26t-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un tipo de energía:",
            clues: [
              "Viene del sol.",
              "Se convierte en electricidad con paneles.",
              "Es limpia y no se acaba.",
            ],
            question: "¿Qué energía es?",
            options: ["Energía solar", "Energía del carbón", "Energía nuclear"],
            answer: "Energía solar",
            hint: "“Del sol” y “paneles”: se llama por su fuente.",
            explicacion:
              "La energía solar viene del sol y se capta con paneles fotovoltaicos. Es limpia (no contamina) y renovable (el sol no se acaba pronto).",
          },
          {
            id: "c26t-r2",
            mechanic: "orden",
            prompt: "El agua puede generar electricidad. Ordena el proceso:",
            question: "Ordena los pasos.",
            steps: [
              "El agua cae por un río o presa",
              "Mueve turbinas gigantes",
              "Las turbinas generan electricidad",
              "La electricidad llega a las casas",
            ],
            hint: "Agua, turbinas, electricidad, casas.",
            explicacion:
              "El agua mueve turbinas, las turbinas generan electricidad y esta llega a las casas. Se llama energía hidroeléctrica.",
          },
          {
            id: "c26t-r3",
            mechanic: "ia",
            prompt: "Un anuncio dice:",
            aiSays:
              "La energía nuclear siempre es mala y causa desastres.",
            question: "¿Es cierto?",
            options: [
              "Sí, siempre es mala",
              "No: la energía nuclear puede ser segura y limpia si se usa bien, aunque tiene riesgos",
              "Sí, hay accidentes",
            ],
            answer:
              "No: la energía nuclear puede ser segura y limpia si se usa bien, aunque tiene riesgos",
            hint: "“Siempre X” son generalizaciones peligrosas. ¿Hay países que la usan bien?",
            explicacion:
              "La energía nuclear tiene ventajas (mucha energía, poca contaminación) y riesgos (accidentes, desechos). No es “siempre mala” ni “siempre buena”: depende del uso.",
          },
          {
            id: "c26t-r4",
            mechanic: "patron",
            prompt: "Las palas de un molino de viento giran así por minuto:",
            clues: ["10 → 20 → 30 → 40 → 50 → ❓"],
            question: "¿Qué número sigue?",
            options: ["55", "60", "70"],
            answer: "60",
            hint: "Sube de 10 en 10.",
            explicacion: "Sube de 10 en 10. Las palas giran cada vez más rápido con más viento.",
          },
          {
            id: "c26t-r5",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“Las energías renovables (sol, viento, agua)",
              "no se acaban.",
              "Las no renovables (petróleo, carbón)",
              "se acaban un día.”",
            ],
            question: "¿Cuál es renovable?",
            options: ["El petróleo", "El viento", "El carbón"],
            answer: "El viento",
            hint: "El texto dice: “viento” está en la lista de las que NO se acaban.",
            explicacion:
              "El viento es renovable: nunca se acaba. El petróleo y el carbón son no renovables: un día se agotan.",
          },
        ],
      },
      {
        id: "c26-ahorrar",
        title: "Ahorrar energía",
        emoji: "💡",
        minutes: 5,
        brief:
          "Cuidar la energía cuida el planeta y tu bolsillo. Aprende trucos simples.",
        retos: [
          {
            id: "c26a-r1",
            mechanic: "ia",
            prompt: "Un familiar dice:",
            aiSays:
              "Da igual dejar luces encendidas, no gasta casi nada.",
            question: "¿Es cierto?",
            options: [
              "Sí, casi no gasta",
              "No: dejar luces prendidas gasta electricidad todo el tiempo; sumado es mucho",
              "Sí, si son pocas",
            ],
            answer:
              "No: dejar luces prendidas gasta electricidad todo el tiempo; sumado es mucho",
            hint: "Una luz sola parece poco, pero muchas luces por muchas horas suman bastante.",
            explicacion:
              "Cada luz encendida consume energía. Sumado (todas las luces × muchas horas × todos los días) es mucho, y es dinero perdido.",
          },
          {
            id: "c26a-r2",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Una bombilla vieja consume 60 W y una LED nueva consume 10 W.",
                question: "¿Cuánto menos consume la LED?",
                options: ["50 W", "70 W", "40 W"],
                answer: "50 W",
                hint: "60 − 10.",
                explicacion: "60 − 10 = 50 W menos. Las LED son mucho más eficientes.",
              },
              "10-12": {
                prompt: "Tienes 6 bombillas de 60 W. Cambias todas por LED de 10 W. Si están 5 horas encendidas cada día:",
                question: "¿Cuántos vatios-hora ahorras al día?",
                options: ["300", "1500", "1800"],
                answer: "1500",
                hint: "Ahorro por bombilla: (60 − 10) = 50 W. Por 6 bombillas × 5 horas.",
                explicacion:
                  "Ahorro: 50 W × 6 bombillas × 5 horas = 1500 Wh (1,5 kWh) al día.",
              },
            },
          },
          {
            id: "c26a-r3",
            mechanic: "orden",
            prompt: "Para ahorrar energía en casa:",
            question: "Ordena los pasos.",
            steps: [
              "Apagar luces al salir de un cuarto",
              "Desenchufar aparatos que no uses",
              "Usar bombillas LED",
              "Enseñar a la familia por qué importa",
            ],
            hint: "Apagar, desenchufar, cambiar, enseñar.",
            explicacion:
              "Apagar luces, desenchufar aparatos, usar LED y enseñar a la familia. Ahorra dinero y ayuda al planeta.",
          },
          {
            id: "c26a-r4",
            mechanic: "error",
            prompt: "Un panfleto dice:",
            clues: [
              "“Ahorra energía en casa.”",
              "“Apaga las luces al salir.”",
              "“Deja el aire acondicionado 24 horas.”",
              "“Cada vatio ahorrado cuenta.”",
            ],
            question: "¿Qué frase se contradice?",
            options: [
              "“Deja el aire acondicionado 24 horas.”",
              "“Apaga las luces al salir.”",
              "“Cada vatio ahorrado cuenta.”",
            ],
            answer: "“Deja el aire acondicionado 24 horas.”",
            hint: "Tres frases piden ahorrar. Una pide gastar mucho.",
            explicacion:
              "El panfleto se contradice: no puedes pedir ahorrar y a la vez dejar el aire 24 horas (gasta muchísimo).",
          },
          {
            id: "c26a-r5",
            mechanic: "deduccion",
            prompt: "Tres consejos para ahorrar. Solo UNO es verdad.",
            clues: [
              "A: “Usar el horno todo el día es ahorrar.”",
              "B: “Cargar el celular 24 horas es ahorrar.”",
              "C: “Ducharse rápido y apagar aparatos ahorra.”",
            ],
            question: "¿Cuál es cierto?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "¿Cuál acción reduce el uso de energía?",
            explicacion:
              "Ducharse rápido y apagar aparatos ahorra energía. Los otros dos consejos gastan más, no menos.",
          },
        ],
      },
    ],
  },
  {
    id: 27,
    world: 2,
    title: "Las plantas",
    emoji: "🌱",
    locked: false,
    intro:
      "Las plantas no hablan, pero hacen algo increíble: fabrican su propia comida con luz. Investiga sus secretos.",
    cases: [
      {
        id: "c27-comida",
        title: "Cómo comen las plantas",
        emoji: "☀️",
        minutes: 5,
        brief:
          "Las plantas no salen a buscar comida. La hacen ellas mismas. Descubre cómo.",
        retos: [
          {
            id: "c27c-r1",
            mechanic: "orden",
            prompt:
              "La fotosíntesis es cómo las plantas crean su comida. Ordena el proceso:",
            question: "Ordena la fotosíntesis.",
            steps: [
              "Las hojas absorben la luz del sol",
              "Las raíces absorben agua del suelo",
              "Las hojas toman CO₂ del aire",
              "La planta crea azúcar y oxígeno",
            ],
            hint: "Sol, agua, CO₂ → azúcar y oxígeno.",
            explicacion:
              "Las plantas usan sol + agua + CO₂ para crear su comida (azúcar) y liberar oxígeno. Sin ellas, no respiraríamos.",
          },
          {
            id: "c27c-r2",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“Las plantas nos dan oxígeno para respirar,",
              "comida (frutas, verduras, granos),",
              "medicinas, ropa (algodón), y madera para casas.",
              "Sin plantas, la vida en la Tierra no existiría.”",
            ],
            question: "¿Qué NO nos dan las plantas?",
            options: [
              "Oxígeno",
              "Comida y medicinas",
              "Energía nuclear",
            ],
            answer: "Energía nuclear",
            hint: "El texto habla de oxígeno, comida, medicinas, ropa y madera. ¿Menciona energía nuclear?",
            explicacion:
              "El texto no menciona energía nuclear (esa viene de otro proceso). Las plantas nos dan lo esencial para vivir.",
          },
          {
            id: "c27c-r3",
            mechanic: "ia",
            prompt: "Un anuncio dice:",
            aiSays:
              "Las plantas no sirven para nada. Podemos vivir sin ellas.",
            question: "¿Es cierto?",
            options: [
              "Sí, comemos otras cosas",
              "No: las plantas nos dan oxígeno, comida y son la base de la vida en la Tierra",
              "Sí, casi no las notamos",
            ],
            answer:
              "No: las plantas nos dan oxígeno, comida y son la base de la vida en la Tierra",
            hint: "Sin plantas, ¿de dónde sacamos oxígeno para respirar?",
            explicacion:
              "Sin plantas no habría oxígeno, ni frutas, ni verduras, ni casi ningún animal. Son la base de toda la vida en la Tierra. Ese anuncio es completamente falso.",
          },
          {
            id: "c27c-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Un árbol produce 100 kg de oxígeno al año. Un bosque tiene 50 árboles.",
                question: "¿Cuánto oxígeno produce el bosque al año?",
                options: ["150 kg", "500 kg", "5000 kg"],
                answer: "5000 kg",
                hint: "100 × 50.",
                explicacion: "100 × 50 = 5000 kg de oxígeno. ¡Un bosque es una fábrica de aire!",
              },
              "10-12": {
                prompt: "Una hectárea de bosque absorbe 22 toneladas de CO₂ al año. Un parque tiene 4 hectáreas.",
                question: "¿Cuánto CO₂ absorbe el parque en 3 años?",
                options: ["88 toneladas", "264 toneladas", "132 toneladas"],
                answer: "264 toneladas",
                hint: "22 × 4 hectáreas × 3 años.",
                explicacion:
                  "22 × 4 × 3 = 264 toneladas. Los bosques limpian el aire del planeta.",
              },
            },
          },
          {
            id: "c27c-r5",
            mechanic: "patron",
            prompt: "Un girasol sigue al sol así durante el día:",
            clues: ["🌅 → 🌞 → ⛅ → 🌇 → 🌅 → 🌞 → ⛅ → 🌇 → ❓"],
            question: "¿Qué toca ahora?",
            options: ["🌅 amanecer", "🌞 mediodía", "🌇 atardecer"],
            answer: "🌅 amanecer",
            hint: "El ciclo del día se repite: amanecer, mediodía, tarde, atardecer.",
            explicacion:
              "Después del atardecer viene otro amanecer. El ciclo del sol se repite cada día, y el girasol lo sigue.",
          },
        ],
      },
      {
        id: "c27-bosque",
        title: "El bosque conectado",
        emoji: "🌳",
        minutes: 5,
        brief:
          "El bosque es una comunidad. Los árboles se comunican y se ayudan entre ellos.",
        retos: [
          {
            id: "c27b-r1",
            mechanic: "ia",
            prompt: "La IA dice:",
            aiSays:
              "Los árboles son individuales, cada uno vive solo, no cooperan.",
            question: "¿Es cierto?",
            options: [
              "Sí, cada árbol es individual",
              "No: los árboles se comunican por sus raíces y hongos, y hasta comparten nutrientes",
              "Sí, no hablan",
            ],
            answer:
              "No: los árboles se comunican por sus raíces y hongos, y hasta comparten nutrientes",
            hint: "La ciencia moderna descubrió que los árboles cooperan más de lo que pensábamos.",
            explicacion:
              "Los árboles se comunican bajo tierra a través de hongos (una red llamada “micorrizas”). Comparten nutrientes con árboles jóvenes o enfermos. Son una comunidad.",
          },
          {
            id: "c27b-r2",
            mechanic: "deduccion",
            prompt: "Tres bosques. Solo UNO está sano.",
            clues: [
              "A: muchos árboles, mucha diversidad de especies.",
              "B: solo una especie de árbol, todos iguales.",
              "C: solo hay pasto, ningún árbol.",
            ],
            question: "¿Cuál es más sano?",
            options: ["A", "B", "C"],
            answer: "A",
            hint: "¿La diversidad ayuda o daña? Piensa qué pasa si una enfermedad ataca una sola especie.",
            explicacion:
              "Un bosque sano tiene muchas especies distintas: si una enfermedad ataca a una, las otras sobreviven. La diversidad da resistencia.",
          },
          {
            id: "c27b-r3",
            mechanic: "orden",
            prompt: "Para plantar un árbol correctamente:",
            question: "Ordena los pasos.",
            steps: [
              "Elegir un lugar con luz y buen suelo",
              "Cavar un hoyo del tamaño correcto",
              "Poner el árbol y cubrir con tierra",
              "Regar y cuidar hasta que se establezca",
            ],
            hint: "Elegir, cavar, plantar, cuidar.",
            explicacion:
              "Elegir el lugar, cavar, plantar y cuidar. Un árbol necesita atención los primeros años; después crece solo.",
          },
          {
            id: "c27b-r4",
            mechanic: "error",
            prompt: "Un anuncio dice:",
            clues: [
              "“Cuidemos los bosques.”",
              "“Los árboles limpian el aire.”",
              "“Cortemos todos los árboles.”",
              "“Sembremos más bosques.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Cortemos todos los árboles.”",
              "“Cuidemos los bosques.”",
              "“Sembremos más bosques.”",
            ],
            answer: "“Cortemos todos los árboles.”",
            hint: "Tres frases dicen cuidar y sembrar. Una dice lo opuesto.",
            explicacion:
              "El anuncio se contradice: cuidar bosques y cortar todos los árboles son opuestos. Alguien lo escribió mal o quería confundir.",
          },
          {
            id: "c27b-r5",
            mechanic: "patron",
            prompt: "Un árbol crece así por año (en cm):",
            clues: ["30 → 30 → 30 → 30 → 30 → ❓"],
            question: "¿Cuánto crecerá el próximo año?",
            options: ["30", "60", "10"],
            answer: "30",
            hint: "El patrón es constante.",
            explicacion:
              "El árbol crece a un ritmo estable. Un roble crece unos 30 cm por año en condiciones buenas.",
          },
        ],
      },
    ],
  },
  {
    id: 28,
    world: 2,
    title: "El tiempo y el clima",
    emoji: "🌤️",
    locked: false,
    intro:
      "El planeta tiene ciclos: día y noche, estaciones, mareas, años. Aprende a leer esos ciclos como un explorador.",
    cases: [
      {
        id: "c28-estaciones",
        title: "Las estaciones del año",
        emoji: "🍂",
        minutes: 5,
        brief:
          "¿Por qué hay verano e invierno? No es porque estemos más cerca del sol. Descubre la verdad.",
        retos: [
          {
            id: "c28e-r1",
            mechanic: "ia",
            prompt: "Un compañero muy seguro dice:",
            aiSays:
              "Hace calor en verano porque la Tierra está más cerca del sol.",
            question: "¿Es cierto?",
            options: [
              "Sí, más cerca = más calor",
              "No: el verano ocurre porque el planeta está inclinado; el hemisferio inclinado hacia el sol recibe más luz",
              "Sí, tiene sentido",
            ],
            answer:
              "No: el verano ocurre porque el planeta está inclinado; el hemisferio inclinado hacia el sol recibe más luz",
            hint: "Si fuera por distancia, ¿por qué en Colombia es invierno cuando en Argentina es verano al mismo tiempo?",
            explicacion:
              "La Tierra está inclinada. El hemisferio que se inclina hacia el sol tiene verano; el otro tiene invierno. Por eso son opuestos en el norte y el sur al mismo tiempo.",
          },
          {
            id: "c28e-r2",
            mechanic: "patron",
            prompt: "Las estaciones se suceden en este orden:",
            clues: ["🌸 → ☀️ → 🍂 → ❄️ → 🌸 → ☀️ → 🍂 → ❄️ → 🌸 → ❓"],
            question: "¿Qué estación sigue?",
            options: ["🌸 primavera", "☀️ verano", "🍂 otoño"],
            answer: "☀️ verano",
            hint: "El ciclo se repite: primavera, verano, otoño, invierno.",
            explicacion:
              "Después de la primavera viene el verano. El ciclo se repite cada año.",
          },
          {
            id: "c28e-r3",
            mechanic: "comprension",
            prompt: "Un texto explica el clima:",
            clues: [
              "“El clima es el patrón del tiempo en una región durante muchos años.",
              "El tiempo es lo que pasa día a día (calor, lluvia, viento).",
              "Cambiar el clima es cambiar los patrones a largo plazo,",
              "no un día lluvioso.”",
            ],
            question: "¿Cuál es la diferencia entre tiempo y clima?",
            options: [
              "Son lo mismo",
              "Tiempo = día a día. Clima = patrón de muchos años.",
              "Tiempo = frío. Clima = calor.",
            ],
            answer: "Tiempo = día a día. Clima = patrón de muchos años.",
            hint: "El texto lo dice claro: el tiempo es día a día, el clima es a largo plazo.",
            explicacion:
              "Tiempo = lo que hace hoy. Clima = el patrón general de muchos años. Un día frío no cambia el clima; una tendencia de décadas sí.",
          },
          {
            id: "c28e-r4",
            mechanic: "orden",
            prompt: "El ciclo del agua (por qué llueve):",
            question: "Ordena el ciclo del agua.",
            steps: [
              "El sol calienta el agua del mar",
              "El agua se evapora y sube al cielo",
              "Se forma una nube",
              "La nube se enfría y cae la lluvia",
            ],
            hint: "Sol calienta → evapora → nube → lluvia.",
            explicacion:
              "El sol evapora agua del mar, sube al cielo, forma nubes, y cuando estas se enfrían, cae la lluvia. El agua vuelve al mar y el ciclo empieza otra vez.",
          },
          {
            id: "c28e-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Un año tiene 4 estaciones. Cada estación dura aproximadamente 3 meses.",
                question: "¿Cuántos meses son 4 estaciones?",
                options: ["7", "12", "16"],
                answer: "12",
                hint: "4 × 3.",
                explicacion: "4 × 3 = 12 meses. Justo un año completo.",
              },
              "10-12": {
                prompt: "Si en una ciudad llueve 8 días al mes en promedio, ¿cuántos días llueve al año?",
                question: "¿Cuántos días de lluvia al año?",
                options: ["48", "96", "120"],
                answer: "96",
                hint: "8 × 12 meses.",
                explicacion: "8 × 12 = 96 días de lluvia al año.",
              },
            },
          },
        ],
      },
      {
        id: "c28-ciclos",
        title: "Los ciclos de la naturaleza",
        emoji: "🔄",
        minutes: 5,
        brief:
          "Todo en la naturaleza se repite en ciclos: día y noche, mareas, migraciones. Aprende a reconocerlos.",
        retos: [
          {
            id: "c28c-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un ciclo natural:",
            clues: [
              "Ocurre dos veces al día.",
              "El agua del mar sube y baja.",
              "Depende de la Luna.",
            ],
            question: "¿Qué ciclo es?",
            options: ["Las estaciones", "Las mareas", "Los eclipses"],
            answer: "Las mareas",
            hint: "Agua del mar sube y baja + Luna: es un ciclo diario.",
            explicacion:
              "Las mareas son subidas y bajadas del mar dos veces al día, causadas por la atracción de la Luna sobre el agua.",
          },
          {
            id: "c28c-r2",
            mechanic: "orden",
            prompt: "Un día tiene ciclo de luz. Ordena las partes del día:",
            question: "Ordena.",
            steps: [
              "Amanecer",
              "Mediodía",
              "Atardecer",
              "Noche",
            ],
            hint: "Amanecer, mediodía, atardecer, noche.",
            explicacion:
              "Amanecer, mediodía, atardecer, noche. Este ciclo se repite cada 24 horas.",
          },
          {
            id: "c28c-r3",
            mechanic: "ia",
            prompt: "Un video dice:",
            aiSays:
              "El cambio climático no existe, es un invento de los científicos.",
            question: "¿Es cierto?",
            options: [
              "Sí, es un invento",
              "No: la gran mayoría de científicos del mundo confirma que el cambio climático es real",
              "No sé, difícil saber",
            ],
            answer:
              "No: la gran mayoría de científicos del mundo confirma que el cambio climático es real",
            hint: "¿Miles de científicos de todo el mundo se pondrían de acuerdo para mentir?",
            explicacion:
              "El cambio climático es un consenso científico mundial, con datos de décadas. Decir que es “un invento” es negar la evidencia. Verifica en fuentes serias, no en videos virales.",
          },
          {
            id: "c28c-r4",
            mechanic: "patron",
            prompt: "El día y la noche siguen este patrón por hora del reloj:",
            clues: ["☀️ 12 → ☀️ 15 → 🌅 18 → 🌙 21 → 🌙 00 → 🌅 06 → ❓"],
            question: "¿Qué toca a las 09 de la mañana?",
            options: ["☀️ día", "🌙 noche", "🌅 atardecer"],
            answer: "☀️ día",
            hint: "A las 9 de la mañana ya salió el sol.",
            explicacion:
              "El día empieza al amanecer y sigue hasta el atardecer. A las 9 am estamos en pleno día.",
          },
          {
            id: "c28c-r5",
            mechanic: "error",
            prompt: "Un cartel del zoológico dice:",
            clues: [
              "“Los animales migran cada año.”",
              "“Los flamencos son un ejemplo.”",
              "“Los tigres migran a Europa cada invierno.”",
              "“La migración es una adaptación.”",
            ],
            question: "¿Qué frase es falsa?",
            options: [
              "“Los tigres migran a Europa cada invierno.”",
              "“La migración es una adaptación.”",
              "“Los flamencos son un ejemplo.”",
            ],
            answer: "“Los tigres migran a Europa cada invierno.”",
            hint: "¿Los tigres viven en Europa? ¿O en Asia?",
            explicacion:
              "Los tigres viven en Asia y no migran a Europa. Alguien escribió algo científicamente falso en el cartel.",
          },
        ],
      },
    ],
  },
  {
    id: 29,
    world: 2,
    title: "La materia y los elementos",
    emoji: "⚗️",
    locked: false,
    intro:
      "Todo lo que ves está hecho de materia: agua, aire, tú mismo. Descubre en qué estados aparece y qué la forma.",
    cases: [
      {
        id: "c29-estados",
        title: "Los estados de la materia",
        emoji: "💧",
        minutes: 5,
        brief:
          "La materia puede ser sólida, líquida o gaseosa. Investiga cómo cambia entre esos estados.",
        retos: [
          {
            id: "c29e-r1",
            mechanic: "orden",
            prompt: "El agua cambia de estado con la temperatura.",
            question: "Ordena de más frío a más caliente.",
            steps: [
              "Hielo (sólido)",
              "Agua (líquido)",
              "Vapor (gas)",
              "Plasma (muy caliente, como el sol)",
            ],
            hint: "Frío = sólido; calor = gas; súper calor = plasma.",
            explicacion:
              "Con frío el agua es hielo. Al calentarse es líquida. Al calentarse mucho es vapor. Con temperatura extrema (sol) es plasma.",
          },
          {
            id: "c29e-r2",
            mechanic: "deduccion",
            prompt: "Pistas sobre un estado de la materia:",
            clues: [
              "Tiene forma fija.",
              "No cambia fácilmente.",
              "Ejemplos: hielo, piedra, madera.",
            ],
            question: "¿Qué estado es?",
            options: ["Sólido", "Líquido", "Gas"],
            answer: "Sólido",
            hint: "Forma fija + hielo/piedra: es el estado más “firme”.",
            explicacion:
              "Los sólidos tienen forma fija y sus partículas están muy juntas. Como el hielo, la madera y las piedras.",
          },
          {
            id: "c29e-r3",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "El agua siempre hierve a 100°C, sin importar dónde estés.",
            question: "¿Es cierto?",
            options: [
              "Sí, siempre 100°C",
              "No: en montañas altas hierve a menos temperatura (por la presión atmosférica)",
              "Sí, es una ley",
            ],
            answer:
              "No: en montañas altas hierve a menos temperatura (por la presión atmosférica)",
            hint: "¿Sabías que en Bogotá o La Paz el agua hierve a menos de 100°C? La ciencia lo comprueba.",
            explicacion:
              "El agua hierve a 100°C al nivel del mar. En lugares altos hierve a menos (Bogotá ~92°C, La Paz ~88°C) porque hay menos presión atmosférica.",
          },
          {
            id: "c29e-r4",
            mechanic: "patron",
            prompt: "La temperatura del agua sube así al calentarla:",
            clues: ["20°C → 40°C → 60°C → 80°C → ❓"],
            question: "¿Qué temperatura sigue (en el nivel del mar)?",
            options: ["100°C (empieza a hervir)", "90°C", "120°C"],
            answer: "100°C (empieza a hervir)",
            hint: "Sube de 20 en 20. Después del 80 viene el 100.",
            explicacion:
              "80 + 20 = 100°C. A esa temperatura el agua empieza a hervir al nivel del mar.",
          },
          {
            id: "c29e-r5",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“Cuando el agua se enfría mucho,",
              "sus partículas se juntan y se vuelve hielo (sólido).",
              "Cuando el agua se calienta mucho,",
              "sus partículas se separan y se vuelve vapor (gas).”",
            ],
            question: "¿Qué pasa cuando el agua se calienta mucho?",
            options: [
              "Sus partículas se juntan",
              "Sus partículas se separan y se vuelve vapor",
              "Se vuelve más sólida",
            ],
            answer: "Sus partículas se separan y se vuelve vapor",
            hint: "El texto lo dice: al calentarse, se separan y se vuelve vapor.",
            explicacion:
              "El calor hace que las partículas se muevan más y se separen: por eso el agua caliente se convierte en vapor.",
          },
        ],
      },
      {
        id: "c29-mezclas",
        title: "Mezclas y separaciones",
        emoji: "🧪",
        minutes: 5,
        brief:
          "Cuando mezclamos cosas, a veces se pueden separar y a veces no. Descubre por qué.",
        retos: [
          {
            id: "c29m-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre una mezcla:",
            clues: [
              "Es agua con azúcar disuelta.",
              "No se ve el azúcar por separado.",
              "Se puede recuperar el azúcar evaporando el agua.",
            ],
            question: "¿Qué tipo de mezcla es?",
            options: [
              "Se ve todo separado",
              "Se ve uniforme (disolución)",
              "No es una mezcla",
            ],
            answer: "Se ve uniforme (disolución)",
            hint: "El azúcar se disolvió: no se ve por separado.",
            explicacion:
              "Es una disolución: la mezcla se ve uniforme (una sola cosa). El azúcar se recupera evaporando el agua.",
          },
          {
            id: "c29m-r2",
            mechanic: "orden",
            prompt: "Para separar agua y aceite (que no se mezclan):",
            question: "Ordena los pasos.",
            steps: [
              "Poner la mezcla en un recipiente",
              "Esperar a que se separen (el aceite queda arriba)",
              "Sacar el aceite con cuidado",
              "Queda el agua sola abajo",
            ],
            hint: "Poner, esperar, sacar aceite, queda agua.",
            explicacion:
              "El aceite es menos denso: flota arriba. Se separa con paciencia. Es un método simple pero efectivo.",
          },
          {
            id: "c29m-r3",
            mechanic: "ia",
            prompt: "Un tutorial de cocina dice:",
            aiSays:
              "El agua y el aceite se mezclan fácil, solo hay que agitarlos.",
            question: "¿Es cierto?",
            options: [
              "Sí, si agitas mucho",
              "No: agua y aceite NO se mezclan realmente; se separan de nuevo cuando dejas de agitar",
              "Sí, siempre funciona",
            ],
            answer:
              "No: agua y aceite NO se mezclan realmente; se separan de nuevo cuando dejas de agitar",
            hint: "Cuando dejas de agitar aceite y agua, ¿qué pasa?",
            explicacion:
              "Agua y aceite NO se mezclan. Aunque agites, se separan otra vez cuando paras. Se llama “inmiscibles”: no se pueden mezclar de verdad.",
          },
          {
            id: "c29m-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Mezclas 100 g de agua con 20 g de azúcar. Cuánta mezcla total tienes.",
                question: "¿Cuánto pesa la mezcla?",
                options: ["80 g", "120 g", "100 g"],
                answer: "120 g",
                hint: "100 + 20.",
                explicacion: "100 + 20 = 120 g. El azúcar no desaparece, se suma.",
              },
              "10-12": {
                prompt: "Mezclas 500 ml de agua con 40 ml de sal. Luego evaporas todo el agua.",
                question: "¿Qué queda?",
                options: [
                  "500 ml de sal",
                  "40 ml de sal",
                  "Nada",
                ],
                answer: "40 ml de sal",
                hint: "El agua se evapora; la sal se queda.",
                explicacion:
                  "El agua se evapora y queda solo la sal (los 40 ml originales). Es cómo se hace la sal de mar.",
              },
            },
          },
          {
            id: "c29m-r5",
            mechanic: "error",
            prompt: "Un experimento dice:",
            clues: [
              "“El aceite no se disuelve en agua.”",
              "“El azúcar se disuelve en agua.”",
              "“Al agitar aceite y agua, se disuelven perfecto.”",
              "“Agua y aceite son inmiscibles.”",
            ],
            question: "¿Qué frase se contradice?",
            options: [
              "“Al agitar aceite y agua, se disuelven perfecto.”",
              "“El azúcar se disuelve.”",
              "“Aceite no se disuelve.”",
            ],
            answer: "“Al agitar aceite y agua, se disuelven perfecto.”",
            hint: "Tres frases dicen que aceite y agua NO se mezclan. Una dice lo contrario.",
            explicacion:
              "El texto se contradice a sí mismo. “Se disuelven perfecto” pelea con “inmiscibles” y “no se disuelve”. Alguien copió mal.",
          },
        ],
      },
    ],
  },
  {
    id: 30,
    world: 2,
    title: "El sonido y la luz",
    emoji: "🎵",
    locked: false,
    intro:
      "Escuchar y ver son superpoderes que damos por sentados. Descubre cómo funcionan las ondas del sonido y de la luz.",
    cases: [
      {
        id: "c30-sonido",
        title: "Cómo escuchamos",
        emoji: "👂",
        minutes: 5,
        brief:
          "El sonido viaja por el aire como olas invisibles. Investiga cómo llega a tus oídos.",
        retos: [
          {
            id: "c30s-r1",
            mechanic: "orden",
            prompt: "El sonido va del que habla al que escucha. Ordena los pasos:",
            question: "Ordena.",
            steps: [
              "Alguien habla y sus cuerdas vocales vibran",
              "La vibración viaja por el aire",
              "La vibración entra a tu oído",
              "Tu cerebro interpreta el sonido",
            ],
            hint: "Vibración → aire → oído → cerebro.",
            explicacion:
              "El sonido nace de una vibración, viaja por el aire, llega al oído y el cerebro lo interpreta. Todo pasa en milésimas de segundo.",
          },
          {
            id: "c30s-r2",
            mechanic: "ia",
            prompt: "Un compañero dice:",
            aiSays:
              "En el espacio se puede escuchar el sonido de las explosiones.",
            question: "¿Es cierto?",
            options: [
              "Sí, como en las películas",
              "No: en el espacio hay vacío (sin aire), y sin aire no hay sonido",
              "Sí, si son fuertes",
            ],
            answer:
              "No: en el espacio hay vacío (sin aire), y sin aire no hay sonido",
            hint: "El sonido viaja por el aire. ¿Qué hay en el espacio?",
            explicacion:
              "El sonido necesita un medio (aire, agua) para viajar. En el espacio no hay aire: es silencio absoluto. Las películas engañan.",
          },
          {
            id: "c30s-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El sonido viaja a 340 metros por segundo. Un trueno lo oyes 3 segundos después de ver el rayo.",
                question: "¿A cuántos metros está el rayo?",
                options: ["1020", "340", "3400"],
                answer: "1020",
                hint: "340 × 3.",
                explicacion: "340 × 3 = 1020 metros. Un truco: cada 3 segundos entre rayo y trueno = 1 km.",
              },
              "10-12": {
                prompt: "El sonido viaja a 340 m/s. Un eco tarda 4 segundos en volver desde una montaña.",
                question: "¿A qué distancia está la montaña?",
                options: ["1360 m", "680 m", "1020 m"],
                answer: "680 m",
                hint: "El sonido va y vuelve: 4 seg total. Divide entre 2 para la distancia.",
                explicacion:
                  "4 segundos ida y vuelta. Solo la ida son 2 segundos. 340 × 2 = 680 metros.",
              },
            },
          },
          {
            id: "c30s-r4",
            mechanic: "patron",
            prompt: "Las notas musicales suben así en frecuencia:",
            clues: ["Do → Re → Mi → Fa → Sol → La → Si → ❓"],
            question: "¿Qué nota sigue?",
            options: ["Do (más alto)", "Re", "Sol"],
            answer: "Do (más alto)",
            hint: "La escala musical vuelve a empezar con Do más agudo.",
            explicacion:
              "Después de Si empieza otra octava: un Do más alto. Las escalas musicales son cíclicas.",
          },
          {
            id: "c30s-r5",
            mechanic: "deduccion",
            prompt: "Pistas sobre un instrumento:",
            clues: [
              "Se toca soplando.",
              "Tiene teclas y agujeros.",
              "Es de madera o metal.",
            ],
            question: "¿Qué instrumento es?",
            options: ["Guitarra", "Flauta", "Tambor"],
            answer: "Flauta",
            hint: "Soplando + agujeros: es un instrumento de viento.",
            explicacion:
              "La flauta se toca soplando aire. Los agujeros o teclas cambian el sonido. Es un instrumento de viento.",
          },
        ],
      },
      {
        id: "c30-luz",
        title: "Cómo vemos",
        emoji: "👁️",
        minutes: 5,
        brief:
          "La luz nos permite ver, pero también puede engañarnos. Investiga sus secretos.",
        retos: [
          {
            id: "c30l-r1",
            mechanic: "orden",
            prompt: "El ojo transforma luz en imagen. Ordena los pasos:",
            question: "Ordena.",
            steps: [
              "La luz rebota en los objetos",
              "Entra al ojo por la pupila",
              "Se enfoca en el fondo del ojo",
              "El cerebro interpreta lo que ves",
            ],
            hint: "Luz rebota → pupila → fondo → cerebro.",
            explicacion:
              "La luz rebota en los objetos, entra por la pupila, se enfoca en la retina y el cerebro convierte la señal en imagen.",
          },
          {
            id: "c30l-r2",
            mechanic: "ia",
            prompt: "Un tutorial dice:",
            aiSays:
              "El color de un objeto está dentro del objeto, es como una pintura permanente.",
            question: "¿Es cierto?",
            options: [
              "Sí, cada cosa tiene su color pegado",
              "No: los objetos reflejan ciertos colores de la luz; sin luz, no hay color",
              "Sí, siempre está ahí",
            ],
            answer:
              "No: los objetos reflejan ciertos colores de la luz; sin luz, no hay color",
            hint: "En una habitación completamente oscura, ¿ves colores? La respuesta te lo dice.",
            explicacion:
              "Los objetos absorben unos colores de la luz y reflejan otros. Lo que vemos es la luz reflejada. Sin luz, todo es negro.",
          },
          {
            id: "c30l-r3",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“La luz blanca (del sol) contiene todos los colores.",
              "Un prisma la separa en los 7 colores del arcoíris.",
              "El rojo es el más lento",
              "y el violeta el más rápido.”",
            ],
            question: "¿Qué NO dice el texto?",
            options: [
              "La luz blanca tiene todos los colores",
              "El arcoíris tiene 7 colores",
              "Los objetos crean luz",
            ],
            answer: "Los objetos crean luz",
            hint: "El texto habla de luz blanca, prisma y colores. ¿Menciona que objetos crean luz?",
            explicacion:
              "El texto no dice que los objetos crean luz. Solo que la luz se puede descomponer con un prisma. Los objetos reflejan, no crean.",
          },
          {
            id: "c30l-r4",
            mechanic: "patron",
            prompt: "El arcoíris tiene siempre estos colores en orden:",
            clues: ["🔴 → 🟠 → 🟡 → 🟢 → 🔵 → 🟣 → ❓"],
            question: "¿Qué color falta al final?",
            options: ["Otro rojo", "Blanco", "Índigo (azul oscuro)"],
            answer: "Índigo (azul oscuro)",
            hint: "El arcoíris tiene 7 colores: rojo, naranja, amarillo, verde, azul, índigo, violeta.",
            explicacion:
              "El arcoíris siempre tiene 7 colores en el mismo orden: rojo, naranja, amarillo, verde, azul, índigo, violeta.",
          },
          {
            id: "c30l-r5",
            mechanic: "error",
            prompt: "Un cartel dice:",
            clues: [
              "“La luz es rapidísima.”",
              "“Nada viaja más rápido que la luz.”",
              "“Un caracol viaja más rápido que la luz.”",
              "“La velocidad de la luz es 300.000 km por segundo.”",
            ],
            question: "¿Qué frase es imposible?",
            options: [
              "“Un caracol viaja más rápido que la luz.”",
              "“Nada viaja más rápido que la luz.”",
              "“La velocidad es 300.000 km/s.”",
            ],
            answer: "“Un caracol viaja más rápido que la luz.”",
            hint: "Un caracol se mueve muy despacio. ¿Puede ganarle a la luz?",
            explicacion:
              "Absurdo científico: un caracol es de los animales más lentos. La luz es lo más rápido que existe. Alguien puso la frase como broma o error.",
          },
        ],
      },
    ],
  },
  {
    id: 31,
    world: 2,
    title: "La Tierra por dentro",
    emoji: "🌋",
    locked: false,
    intro:
      "Bajo tus pies hay rocas, calor y movimiento. La Tierra tiene capas, volcanes y placas que se mueven muy despacio pero cambian todo.",
    cases: [
      {
        id: "c31-capas",
        title: "Las capas del planeta",
        emoji: "🌐",
        minutes: 5,
        brief:
          "La Tierra no es maciza: tiene capas como una cebolla. Investígalas.",
        retos: [
          {
            id: "c31c-r1",
            mechanic: "orden",
            prompt: "Ordena las capas de la Tierra desde afuera hacia el centro.",
            question: "Ordénalas.",
            steps: [
              "Corteza (donde vivimos)",
              "Manto (rocas calientes)",
              "Núcleo externo (líquido)",
              "Núcleo interno (sólido, altísima temperatura)",
            ],
            hint: "Desde donde tú caminas hasta el centro más caliente.",
            explicacion:
              "Corteza → manto → núcleo externo → núcleo interno. El centro es sólido a pesar del calor porque la presión es enorme.",
          },
          {
            id: "c31c-r2",
            mechanic: "deduccion",
            prompt: "Pistas sobre una capa:",
            clues: [
              "Es donde vivimos.",
              "Es la más fría y delgada.",
              "Está rota en pedazos gigantes llamados placas.",
            ],
            question: "¿Qué capa es?",
            options: ["El manto", "La corteza", "El núcleo"],
            answer: "La corteza",
            hint: "“Donde vivimos” + “placas”: es la parte de arriba.",
            explicacion:
              "La corteza es delgada, fría y está dividida en placas tectónicas que se mueven muy despacio y causan terremotos y volcanes.",
          },
          {
            id: "c31c-r3",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "El centro de la Tierra es hueco y ahí viven dinosaurios.",
            question: "¿Es cierto?",
            options: [
              "Sí, en películas lo dicen",
              "No: el centro es sólido y con temperaturas extremas; los dinosaurios se extinguieron hace 66 millones de años",
              "Sí, quién sabe",
            ],
            answer:
              "No: el centro es sólido y con temperaturas extremas; los dinosaurios se extinguieron hace 66 millones de años",
            hint: "¿Podría vivir algo con temperaturas de miles de grados? ¿Los dinosaurios siguen vivos?",
            explicacion:
              "La Tierra hueca con dinosaurios es una teoría de ficción. La ciencia comprueba que el núcleo es sólido y súper caliente (unos 5.000°C). Nada vive ahí.",
          },
          {
            id: "c31c-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La corteza terrestre tiene unos 30 km de espesor y el manto 2.900 km.",
                question: "¿Cuánto suman corteza + manto?",
                options: ["2930 km", "3000 km", "2870 km"],
                answer: "2930 km",
                hint: "30 + 2900.",
                explicacion: "30 + 2900 = 2930 km.",
              },
              "10-12": {
                prompt: "El radio de la Tierra es 6371 km. Si el núcleo interno tiene un radio de 1220 km, ¿qué porcentaje del radio es (aprox)?",
                question: "¿Qué porcentaje?",
                options: ["10%", "19%", "50%"],
                answer: "19%",
                hint: "1220 ÷ 6371 × 100.",
                explicacion:
                  "1220 ÷ 6371 ≈ 0,19 = 19%. El núcleo interno es como una quinta parte del radio.",
              },
            },
          },
          {
            id: "c31c-r5",
            mechanic: "comprension",
            prompt: "Un texto explica:",
            clues: [
              "“Las placas tectónicas se mueven muy despacio,",
              "más o menos lo mismo que crecen tus uñas.",
              "Cuando dos placas chocan, se levantan montañas.",
              "Cuando se separan, aparecen valles.”",
            ],
            question: "¿Por qué se forman las montañas?",
            options: [
              "Porque los volcanes las escupen",
              "Porque las placas tectónicas chocan entre sí",
              "Porque el viento las hace crecer",
            ],
            answer: "Porque las placas tectónicas chocan entre sí",
            hint: "El texto lo dice claro: dos placas chocan → montañas.",
            explicacion:
              "Las montañas se forman cuando placas gigantescas chocan y una empuja a la otra hacia arriba. Es lento (millones de años) pero incontenible.",
          },
        ],
      },
      {
        id: "c31-volcanes",
        title: "Volcanes y terremotos",
        emoji: "🔥",
        minutes: 5,
        brief:
          "Los volcanes y terremotos asustan, pero se pueden entender. Investiga cómo funcionan.",
        retos: [
          {
            id: "c31v-r1",
            mechanic: "orden",
            prompt: "Cómo hace erupción un volcán. Ordena el proceso:",
            question: "Ordena.",
            steps: [
              "El magma del interior sube por presión",
              "Se acumula bajo el volcán",
              "Sale por el cráter (a veces con explosión)",
              "Se enfría y forma nueva roca",
            ],
            hint: "Magma sube → se acumula → sale → se enfría.",
            explicacion:
              "El magma (roca fundida) sube por presión, se acumula, sale como lava y se enfría. Así crecen los volcanes.",
          },
          {
            id: "c31v-r2",
            mechanic: "ia",
            prompt: "Un anuncio dice:",
            aiSays:
              "Los terremotos se pueden predecir con exactitud, y varios chamanes lo hacen todos los días.",
            question: "¿Es cierto?",
            options: [
              "Sí, los chamanes lo saben",
              "No: la ciencia aún NO puede predecir cuándo ocurrirá un terremoto exacto; solo estimar zonas de riesgo",
              "Sí, se ve venir",
            ],
            answer:
              "No: la ciencia aún NO puede predecir cuándo ocurrirá un terremoto exacto; solo estimar zonas de riesgo",
            hint: "Si alguien predijera todos los terremotos exactos, sería noticia mundial. ¿Es así?",
            explicacion:
              "Ni siquiera los sismólogos con la mejor tecnología pueden predecir un terremoto exacto. Cualquiera que lo asegure está inventando o adivinando.",
          },
          {
            id: "c31v-r3",
            mechanic: "deduccion",
            prompt: "Tres regiones. Solo UNA tiene más terremotos.",
            clues: [
              "A: en el borde de placas tectónicas.",
              "B: en el medio de una placa, lejos de bordes.",
              "C: donde nunca hubo temblores.",
            ],
            question: "¿Cuál tiene más terremotos?",
            options: ["A", "B", "C"],
            answer: "A",
            hint: "Los terremotos ocurren cuando las placas chocan o se mueven. ¿Dónde chocan?",
            explicacion:
              "En los bordes de placas es donde chocan y roscan. Por eso Japón, Chile y California (bordes) tiemblan mucho, y regiones lejos de bordes casi no.",
          },
          {
            id: "c31v-r4",
            mechanic: "patron",
            prompt: "Un volcán tiene erupciones cada cierto tiempo (en años):",
            clues: ["10 → 20 → 40 → 80 → ❓"],
            question: "¿En cuántos años más habrá otra?",
            options: ["100", "160", "120"],
            answer: "160",
            hint: "Cada intervalo es el doble del anterior.",
            explicacion:
              "Cada intervalo se duplica: 80 × 2 = 160 años. Es un patrón inventado para el ejercicio; los volcanes reales no son tan predecibles.",
          },
          {
            id: "c31v-r5",
            mechanic: "orden",
            prompt: "Qué hacer si hay un terremoto:",
            question: "Ordena las acciones.",
            steps: [
              "Quedarte quieto donde estás y protegerte",
              "Alejarte de ventanas y objetos que puedan caer",
              "Salir con calma cuando pase el temblor",
              "Reunirte con tu familia en un punto seguro",
            ],
            hint: "Primero protegerte, después ventanas, luego salir con calma, al final punto seguro.",
            explicacion:
              "Protegerte primero, alejarte de peligros, salir con calma y encontrarte con la familia. Correr durante el temblor es más peligroso que quedarte protegido.",
          },
        ],
      },
    ],
  },
  {
    id: 32,
    world: 2,
    title: "Los dinosaurios",
    emoji: "🦕",
    locked: false,
    intro:
      "Hace millones de años, animales gigantes dominaban la Tierra. Investiga cómo sabemos de ellos… y qué no sabemos aún.",
    cases: [
      {
        id: "c32-huesos",
        title: "Los huesos hablan",
        emoji: "🦴",
        minutes: 5,
        brief:
          "Los paleontólogos leen huesos como si fueran libros. Aprende su método.",
        retos: [
          {
            id: "c32h-r1",
            mechanic: "orden",
            prompt: "Ordena el trabajo del paleontólogo:",
            question: "Ordena.",
            steps: [
              "Buscar fósiles en rocas antiguas",
              "Excavar con cuidado sin romper",
              "Estudiar los huesos en el laboratorio",
              "Reconstruir cómo era el animal",
            ],
            hint: "Buscar, excavar, estudiar, reconstruir.",
            explicacion:
              "Buscar → excavar → estudiar → reconstruir. Un fósil enseña mucho si se maneja con paciencia.",
          },
          {
            id: "c32h-r2",
            mechanic: "ia",
            prompt: "Un tiktoker dice:",
            aiSays:
              "Los dinosaurios convivieron con los humanos hace 2.000 años.",
            question: "¿Es cierto?",
            options: [
              "Sí, hay pinturas de eso",
              "No: los dinosaurios se extinguieron hace 66 millones de años, mucho antes de los humanos",
              "Sí, en algunos lugares",
            ],
            answer:
              "No: los dinosaurios se extinguieron hace 66 millones de años, mucho antes de los humanos",
            hint: "Los humanos aparecimos hace unos 300.000 años. ¿Cuánto es eso comparado con 66 millones?",
            explicacion:
              "Los dinosaurios se extinguieron 66 millones de años antes de que apareciera el primer humano. Nunca convivimos. Los videos que dicen lo contrario inventan.",
          },
          {
            id: "c32h-r3",
            mechanic: "deduccion",
            prompt: "Pistas sobre un dinosaurio:",
            clues: [
              "Comía plantas.",
              "Tenía cuello largo.",
              "Era enorme (más grande que una casa).",
            ],
            question: "¿Qué dinosaurio era?",
            options: [
              "Tiranosaurio (T-Rex)",
              "Brontosaurio",
              "Velocirraptor",
            ],
            answer: "Brontosaurio",
            hint: "“Cuello largo” + “come plantas” + “enorme”: piensa en los saurópodos.",
            explicacion:
              "El Brontosaurio (o Apatosaurio) era un gigante herbívoro con cuello larguísimo. El T-Rex era carnívoro, el velocirraptor era pequeño.",
          },
          {
            id: "c32h-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "El T-Rex vivió hace 68 millones de años. Los humanos aparecieron hace 300 mil años.",
                question: "¿Cuál vivió primero?",
                options: ["Los humanos", "El T-Rex", "Al mismo tiempo"],
                answer: "El T-Rex",
                hint: "68 millones es muchísimo más que 300 mil.",
                explicacion:
                  "68 millones > 300 mil. El T-Rex vivió muchísimo antes. Nadie los vio nunca en persona.",
              },
              "10-12": {
                prompt: "Los dinosaurios dominaron la Tierra unos 165 millones de años. Los humanos llevamos unos 300.000.",
                question: "¿Cuántas veces más duraron los dinosaurios que los humanos hasta ahora?",
                options: ["55 veces", "550 veces", "5.500 veces"],
                answer: "550 veces",
                hint: "165.000.000 ÷ 300.000.",
                explicacion:
                  "165.000.000 ÷ 300.000 = 550 veces más tiempo. Los dinosaurios fueron muchísimo más duraderos que nosotros hasta hoy.",
              },
            },
          },
          {
            id: "c32h-r5",
            mechanic: "error",
            prompt: "Un libro escolar tiene un error:",
            clues: [
              "“Los dinosaurios se extinguieron hace 66 millones de años.”",
              "“Un asteroide gigante impactó la Tierra.”",
              "“Todos los dinosaurios murieron.”",
              "“Los pájaros son descendientes de los dinosaurios.”",
            ],
            question: "¿Qué dos frases se contradicen?",
            options: [
              "“Todos los dinosaurios murieron” con “Los pájaros descienden de los dinosaurios”",
              "“Asteroide” con “Hace 66 millones de años”",
              "“Extinción” con “Asteroide”",
            ],
            answer:
              "“Todos los dinosaurios murieron” con “Los pájaros descienden de los dinosaurios”",
            hint: "Si TODOS murieron, ¿cómo hay descendientes?",
            explicacion:
              "Los pájaros son descendientes vivos de dinosaurios: entonces no “todos” murieron. La frase correcta es “casi todos”. Es un error común en libros viejos.",
          },
        ],
      },
      {
        id: "c32-extincion",
        title: "El día que cambió todo",
        emoji: "☄️",
        minutes: 5,
        brief:
          "Un solo evento acabó con casi toda la vida en la Tierra. Investiga qué pasó.",
        retos: [
          {
            id: "c32e-r1",
            mechanic: "comprension",
            prompt: "Un libro de ciencia dice:",
            clues: [
              "“Hace 66 millones de años, un asteroide gigante impactó la Tierra.",
              "El polvo bloqueó el sol durante meses.",
              "Las plantas murieron por falta de luz,",
              "y sin plantas, la mayoría de animales también.”",
            ],
            question: "¿Por qué murieron los animales?",
            options: [
              "Por el golpe directo del asteroide",
              "Porque las plantas murieron (por falta de sol) y la cadena alimenticia colapsó",
              "Por el miedo",
            ],
            answer:
              "Porque las plantas murieron (por falta de sol) y la cadena alimenticia colapsó",
            hint: "El texto explica: polvo → sin sol → plantas mueren → animales mueren.",
            explicacion:
              "El asteroide no mató a todos directamente. El polvo tapó el sol, las plantas murieron, y la cadena alimentaria se desplomó. Fue en cadena.",
          },
          {
            id: "c32e-r2",
            mechanic: "ia",
            prompt: "Una IA dice:",
            aiSays:
              "El asteroide que mató a los dinosaurios fue tirado por alienígenas para conquistarnos.",
            question: "¿Es cierto?",
            options: [
              "Sí, es una teoría",
              "No: no hay evidencia científica de alienígenas; los asteroides caen por causas naturales",
              "Sí, tiene lógica",
            ],
            answer:
              "No: no hay evidencia científica de alienígenas; los asteroides caen por causas naturales",
            hint: "¿Los científicos han visto pruebas de alienígenas? Sin pruebas, no es teoría, es imaginación.",
            explicacion:
              "Los asteroides son rocas espaciales que a veces chocan con planetas. No hay ninguna evidencia científica de alienígenas. Las IA a veces mezclan cine con realidad.",
          },
          {
            id: "c32e-r3",
            mechanic: "patron",
            prompt: "En la Tierra ha habido 5 grandes extinciones. Cada una fue así (en millones de años):",
            clues: ["440 → 375 → 250 → 200 → 66 → ❓"],
            question: "¿Cuál sería la próxima aproximada (millones de años en el futuro)?",
            options: [
              "No se puede predecir con exactitud",
              "En 66 exactos",
              "Mañana",
            ],
            answer: "No se puede predecir con exactitud",
            hint: "El patrón de eventos naturales no se puede predecir a millones de años exactos.",
            explicacion:
              "No se puede saber cuándo pasará la próxima extinción con precisión. La ciencia solo estudia lo que ya pasó. Cuidado con quien “sabe” fechas exactas del futuro.",
          },
          {
            id: "c32e-r4",
            mechanic: "deduccion",
            prompt: "Tres animales sobrevivieron a la extinción. Solo UNO tiene descendientes vivos hoy.",
            clues: [
              "A: pequeños mamíferos que se escondían.",
              "B: Tiranosaurio Rex.",
              "C: Grandes reptiles voladores (pterosaurios).",
            ],
            question: "¿Cuáles tienen descendientes vivos?",
            options: ["A", "B", "C"],
            answer: "A",
            hint: "Los mamíferos pequeños se extendieron después. Nosotros somos mamíferos.",
            explicacion:
              "Los pequeños mamíferos sobrevivieron y evolucionaron hasta nosotros (y todos los mamíferos actuales). Los T-Rex y pterosaurios se extinguieron.",
          },
          {
            id: "c32e-r5",
            mechanic: "orden",
            prompt: "Después del asteroide, la vida se recuperó despacio:",
            question: "Ordena la recuperación.",
            steps: [
              "El polvo se asienta y el sol vuelve",
              "Aparecen plantas nuevas",
              "Los pequeños animales se expanden",
              "Nacen nuevas especies en millones de años",
            ],
            hint: "Sol → plantas → animales pequeños → especies nuevas.",
            explicacion:
              "Primero vuelve el sol, luego las plantas, después los animales pequeños se expanden, y con millones de años nacen especies nuevas (incluyéndonos a nosotros).",
          },
        ],
      },
    ],
  },
  {
    id: 33,
    world: 2,
    title: "El mundo de los microbios",
    emoji: "🦠",
    locked: false,
    intro:
      "Millones de seres vivos existen sin verse: bacterias, virus, hongos. Algunos ayudan, otros enferman. Aprende a distinguirlos.",
    cases: [
      {
        id: "c33-buenos",
        title: "Bichos buenos y malos",
        emoji: "⚖️",
        minutes: 5,
        brief:
          "No todos los microbios son malos. Muchos son necesarios para vivir. Investiga cuáles son cuáles.",
        retos: [
          {
            id: "c33b-r1",
            mechanic: "ia",
            prompt: "Un influencer de salud dice:",
            aiSays:
              "Todas las bacterias son malas. Hay que matarlas todas.",
            question: "¿Es cierto?",
            options: [
              "Sí, todas son malas",
              "No: muchas bacterias son buenas (viven en tu intestino, hacen yogurt, quesos); solo unas pocas enferman",
              "Sí, mejor no tenerlas",
            ],
            answer:
              "No: muchas bacterias son buenas (viven en tu intestino, hacen yogurt, quesos); solo unas pocas enferman",
            hint: "¿El yogurt tiene bacterias? ¿Son malas? ¿Y tu intestino?",
            explicacion:
              "Muchísimas bacterias son buenas: viven en tu intestino ayudando a digerir, hacen yogurt, queso, pan. Solo una minoría enferma. Matarlas todas sería un desastre.",
          },
          {
            id: "c33b-r2",
            mechanic: "orden",
            prompt: "Para no enfermarte de gérmenes malos:",
            question: "Ordena los pasos.",
            steps: [
              "Lavarte las manos con agua y jabón",
              "Cocinar bien la comida",
              "Guardar la comida en el refrigerador",
              "Vacunarte según recomienda tu médico",
            ],
            hint: "Manos, comida, refrigerador, vacunas.",
            explicacion:
              "Lavar manos, cocinar bien, refrigerar y vacunarse: son las 4 defensas simples y comprobadas contra los gérmenes malos.",
          },
          {
            id: "c33b-r3",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“Las vacunas enseñan a tu cuerpo a reconocer un germen antes de que enfermes.",
              "Es como practicar con una pelota blanda",
              "antes de jugar el partido de verdad.",
              "Así, cuando llega el germen real, tu cuerpo ya sabe defenderse.”",
            ],
            question: "¿Qué hacen las vacunas?",
            options: [
              "Meten enfermedades",
              "Entrenan a tu cuerpo para defenderse antes de enfermar",
              "No sirven para nada",
            ],
            answer: "Entrenan a tu cuerpo para defenderse antes de enfermar",
            hint: "El texto lo compara con “practicar con pelota blanda”. ¿Qué idea es?",
            explicacion:
              "Las vacunas entrenan a tu cuerpo. Es como un simulacro: cuando llega el germen real, tu cuerpo ya sabe defenderse. Es una de las mejores invenciones médicas.",
          },
          {
            id: "c33b-r4",
            mechanic: "ia",
            prompt: "Un post viral dice:",
            aiSays:
              "Todo lo natural es sano y todo lo hecho por humanos es dañino.",
            question: "¿Es cierto?",
            options: [
              "Sí, lo natural es mejor",
              "No: hay cosas naturales muy peligrosas (venenos, virus) y cosas hechas por humanos que salvan vidas (medicinas)",
              "Sí, siempre lo natural gana",
            ],
            answer:
              "No: hay cosas naturales muy peligrosas (venenos, virus) y cosas hechas por humanos que salvan vidas (medicinas)",
            hint: "¿Un veneno de serpiente es natural? ¿Una vacuna es hecha por humanos?",
            explicacion:
              "“Natural = bueno” es un mito peligroso. Hay venenos naturales mortales y medicinas hechas por humanos que salvan millones de vidas. No es tan simple.",
          },
          {
            id: "c33b-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Tu cuerpo tiene 30 billones de bacterias buenas. Es la mitad del total de células.",
                question: "¿Cuántas células totales tienes?",
                options: ["30 billones", "60 billones", "15 billones"],
                answer: "60 billones",
                hint: "Si la mitad es 30, el total es el doble.",
                explicacion:
                  "30 × 2 = 60 billones. Casi la mitad de tu cuerpo son microbios buenos. ¡Somos ecosistemas!",
              },
              "10-12": {
                prompt: "Una bacteria se divide en 2 cada 20 minutos. Empiezas con 1. ¿Cuántas hay en 1 hora?",
                question: "¿Cuántas bacterias?",
                options: ["4", "8", "16"],
                answer: "8",
                hint: "En 1 hora hay 3 divisiones (cada 20 min). 1 → 2 → 4 → 8.",
                explicacion:
                  "3 duplicaciones en 1 hora: 1 → 2 → 4 → 8. Las bacterias se multiplican rapidísimo si las dejas.",
              },
            },
          },
        ],
      },
      {
        id: "c33-virus",
        title: "Los virus invisibles",
        emoji: "😷",
        minutes: 5,
        brief:
          "Los virus son diminutos pero muy poderosos. Aprende a defenderte de ellos con ciencia.",
        retos: [
          {
            id: "c33v-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un virus muy conocido:",
            clues: [
              "Se transmite por gotitas al toser.",
              "Da fiebre, tos, cansancio.",
              "Existen vacunas contra él.",
            ],
            question: "¿Qué virus podría ser?",
            options: [
              "La gripe (o virus similares como COVID)",
              "El virus de la felicidad",
              "El virus del amor",
            ],
            answer: "La gripe (o virus similares como COVID)",
            hint: "Gotitas + fiebre + vacunas: es una enfermedad respiratoria.",
            explicacion:
              "La gripe (y COVID-19) son virus respiratorios que se transmiten por gotitas. Las vacunas nos protegen de sus formas graves.",
          },
          {
            id: "c33v-r2",
            mechanic: "ia",
            prompt: "Un video en internet dice:",
            aiSays:
              "Beber jugo mágico de X planta cura cualquier virus. Los médicos no quieren que lo sepas.",
            question: "¿Le crees?",
            options: [
              "Sí, los médicos ocultan cosas",
              "No: no existe una planta que cure “cualquier virus”; y “los médicos ocultan” es una trampa clásica de estafas",
              "Sí, mejor probarlo",
            ],
            answer:
              "No: no existe una planta que cure “cualquier virus”; y “los médicos ocultan” es una trampa clásica de estafas",
            hint: "¿Miles de médicos del mundo se pondrían de acuerdo para ocultar una cura? ¿Existe cura mágica?",
            explicacion:
              "“Los médicos ocultan la cura” es una frase clásica de estafas y engaños. Si algo curara todo, sería el descubrimiento del siglo. Verifica siempre con profesionales.",
          },
          {
            id: "c33v-r3",
            mechanic: "error",
            prompt: "Un cartel del hospital dice:",
            clues: [
              "“Lávate las manos frecuentemente.”",
              "“Tapa tu boca al toser.”",
              "“Estornuda directo a la cara de otros.”",
              "“Vacúnate a tiempo.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Estornuda directo a la cara de otros.”",
              "“Lávate las manos frecuentemente.”",
              "“Vacúnate a tiempo.”",
            ],
            answer: "“Estornuda directo a la cara de otros.”",
            hint: "Tres frases piden evitar contagiar. Una hace lo opuesto.",
            explicacion:
              "El cartel se contradice: no puedes pedir lavarse las manos y taparse al toser y a la vez estornudar en la cara de otros. Es error o broma peligrosa.",
          },
          {
            id: "c33v-r4",
            mechanic: "orden",
            prompt: "Si te enfermas:",
            question: "Ordena los pasos.",
            steps: [
              "Quédate en casa para no contagiar",
              "Descansa e hidrátate",
              "Consulta al médico si empeoras",
              "Sigue el tratamiento que te dé el profesional",
            ],
            hint: "Aislar, descansar, consultar, tratar.",
            explicacion:
              "Aislarte, descansar, consultar al médico y seguir el tratamiento. Nunca te medique sin médico ni sigas “curas” de internet.",
          },
          {
            id: "c33v-r5",
            mechanic: "patron",
            prompt: "Un virus se propaga así (personas contagiadas por día):",
            clues: ["1 → 2 → 4 → 8 → 16 → ❓"],
            question: "¿Cuántas mañana?",
            options: ["24", "32", "20"],
            answer: "32",
            hint: "Se duplica cada día.",
            explicacion:
              "Cada día se duplica: 16 × 2 = 32. Por eso los virus se propagan tan rápido si no nos cuidamos.",
          },
        ],
      },
    ],
  },
  {
    id: 34,
    world: 2,
    title: "Las máquinas y las fuerzas",
    emoji: "⚙️",
    locked: false,
    intro:
      "Las máquinas nos ayudan a mover cosas pesadas con menos esfuerzo. Aprende cómo funcionan las palancas, poleas y las fuerzas básicas.",
    cases: [
      {
        id: "c34-palancas",
        title: "Palancas y poleas",
        emoji: "🔧",
        minutes: 5,
        brief:
          "Las máquinas simples (palancas, poleas) hacen la vida más fácil. Investiga cómo.",
        retos: [
          {
            id: "c34p-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre una herramienta:",
            clues: [
              "Tiene una barra rígida.",
              "Un punto fijo (fulcro) en el medio.",
              "Levanta cosas pesadas con menos esfuerzo.",
            ],
            question: "¿Qué es?",
            options: ["Un martillo", "Una palanca", "Un tornillo"],
            answer: "Una palanca",
            hint: "“Barra + punto fijo + levantar”: es un invento de hace miles de años.",
            explicacion:
              "La palanca es una barra apoyada en un punto fijo. Aristóteles dijo: “Dadme una palanca y moveré el mundo”. Es el principio detrás de muchas herramientas.",
          },
          {
            id: "c34p-r2",
            mechanic: "orden",
            prompt: "Para usar una polea y subir una caja:",
            question: "Ordena los pasos.",
            steps: [
              "Colgar la polea en un lugar alto",
              "Pasar la cuerda por la polea",
              "Atar la caja a un extremo de la cuerda",
              "Tirar del otro extremo hacia abajo",
            ],
            hint: "Colgar → pasar cuerda → atar → tirar.",
            explicacion:
              "Con una polea, cuando tiras hacia abajo, la caja sube. Cambia la dirección del esfuerzo y a veces también reduce la fuerza necesaria.",
          },
          {
            id: "c34p-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Con una palanca, para levantar 30 kg necesitas hacer solo 10 kg de fuerza.",
                question: "¿Cuánta fuerza te ahorra?",
                options: ["10 kg", "20 kg", "30 kg"],
                answer: "20 kg",
                hint: "30 − 10.",
                explicacion:
                  "30 − 10 = 20 kg de esfuerzo ahorrado. Las máquinas simples reducen la fuerza que necesitas.",
              },
              "10-12": {
                prompt: "Una polea reduce el esfuerzo a la mitad. Si una caja pesa 80 kg:",
                question: "¿Cuánta fuerza necesitas hacer para subirla?",
                options: ["20 kg", "40 kg", "80 kg"],
                answer: "40 kg",
                hint: "80 ÷ 2.",
                explicacion:
                  "80 ÷ 2 = 40 kg. La polea reduce el esfuerzo a la mitad. ¡Como magia mecánica!",
              },
            },
          },
          {
            id: "c34p-r4",
            mechanic: "ia",
            prompt: "Un influencer dice:",
            aiSays:
              "Las máquinas simples ya no sirven, todo es tecnología ahora.",
            question: "¿Es cierto?",
            options: [
              "Sí, la tecnología reemplazó todo",
              "No: las máquinas simples están dentro de casi TODA la tecnología moderna (autos, grúas, bicicletas)",
              "Sí, son cosas viejas",
            ],
            answer:
              "No: las máquinas simples están dentro de casi TODA la tecnología moderna (autos, grúas, bicicletas)",
            hint: "¿Una bicicleta tiene palancas? ¿Una grúa usa poleas?",
            explicacion:
              "Las palancas están en martillos, pinzas y bicicletas. Las poleas en grúas y ascensores. La tecnología moderna se basa en principios simples de hace siglos.",
          },
          {
            id: "c34p-r5",
            mechanic: "patron",
            prompt: "Cuantas más poleas juntas, menos fuerza necesitas. Con 1 polea, 100 kg necesita 100. Con 2, 50. Con 3, 33.",
            clues: ["1 polea → 100 → 2 poleas → 50 → 4 poleas → ❓"],
            question: "¿Cuánto con 4 poleas?",
            options: ["25", "20", "10"],
            answer: "25",
            hint: "Doble de poleas, mitad del esfuerzo. 50 ÷ 2.",
            explicacion:
              "Cada vez que duplicas las poleas, el esfuerzo se reduce a la mitad. Con 4 = 100/4 = 25 kg.",
          },
        ],
      },
      {
        id: "c34-gravedad",
        title: "La fuerza de gravedad",
        emoji: "🍎",
        minutes: 5,
        brief:
          "Todo lo que sube tiene que bajar. Descubre por qué.",
        retos: [
          {
            id: "c34g-r1",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“La gravedad es una fuerza que atrae los objetos hacia el centro de la Tierra.",
              "Por eso las cosas caen cuando las sueltas,",
              "y por eso te quedas pegado al suelo.",
              "En la Luna la gravedad es 6 veces menor.”",
            ],
            question: "¿Qué pasaría en la Luna?",
            options: [
              "Todo pesaría igual",
              "Todo pesaría 6 veces menos y saltarías más alto",
              "Todo flotaría sin peso",
            ],
            answer: "Todo pesaría 6 veces menos y saltarías más alto",
            hint: "El texto lo dice: la gravedad en la Luna es 6 veces menor.",
            explicacion:
              "En la Luna hay gravedad pero es 6 veces menor. Por eso los astronautas dan saltos gigantes con facilidad.",
          },
          {
            id: "c34g-r2",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "Los astronautas flotan porque no hay gravedad en el espacio.",
            question: "¿Es cierto?",
            options: [
              "Sí, no hay gravedad",
              "No: la gravedad existe en el espacio, pero los astronautas están en caída libre alrededor de la Tierra",
              "Sí, todo flota",
            ],
            answer:
              "No: la gravedad existe en el espacio, pero los astronautas están en caída libre alrededor de la Tierra",
            hint: "Si no hubiera gravedad, ¿cómo giran los planetas alrededor del sol?",
            explicacion:
              "En el espacio SÍ hay gravedad (por eso los planetas giran). Los astronautas “flotan” porque están cayendo constantemente hacia la Tierra mientras esta se curva. Es caída libre.",
          },
          {
            id: "c34g-r3",
            mechanic: "orden",
            prompt: "Si dejas caer una pelota:",
            question: "Ordena lo que pasa.",
            steps: [
              "Sueltas la pelota",
              "La gravedad la atrae hacia el suelo",
              "Acelera cada vez más rápido",
              "Toca el suelo",
            ],
            hint: "Sueltas → gravedad → acelera → toca suelo.",
            explicacion:
              "Al soltar, la gravedad hace que la pelota acelere. Cae cada vez más rápido hasta tocar el suelo. La gravedad no es constante en velocidad: acelera.",
          },
          {
            id: "c34g-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Tu peso en la Tierra es 30 kg. En la Luna la gravedad es 6 veces menor.",
                question: "¿Cuánto pesas en la Luna?",
                options: ["5 kg", "6 kg", "30 kg"],
                answer: "5 kg",
                hint: "30 ÷ 6.",
                explicacion:
                  "30 ÷ 6 = 5 kg. En la Luna serías tan liviano como una gata.",
              },
              "10-12": {
                prompt: "Tu peso en la Tierra es 60 kg. En Marte la gravedad es 0,38 de la Tierra.",
                question: "¿Cuánto pesarías en Marte (aprox)?",
                options: ["22 kg", "38 kg", "60 kg"],
                answer: "22 kg",
                hint: "60 × 0,38.",
                explicacion:
                  "60 × 0,38 ≈ 22,8 kg. En Marte pesarías bastante menos, pero no tanto como en la Luna.",
              },
            },
          },
          {
            id: "c34g-r5",
            mechanic: "deduccion",
            prompt: "Tres objetos caen desde la misma altura al mismo tiempo. Solo UNO tarda distinto (si no hay aire).",
            clues: [
              "A: una piedra pesada.",
              "B: una pluma.",
              "C: una pelota mediana.",
            ],
            question: "¿Cuál cae más rápido si NO hay aire?",
            options: ["A la piedra", "B la pluma", "C la pelota", "Todos al mismo tiempo"],
            answer: "Todos al mismo tiempo",
            hint: "Sin aire (vacío) la gravedad tira a todos igual, sin importar el peso.",
            explicacion:
              "En el vacío, todo cae con la misma aceleración. La pluma parece caer despacio en la Tierra por el aire, no por la gravedad. Galileo lo demostró.",
          },
        ],
      },
    ],
  },
  {
    id: 35,
    world: 2,
    title: "Los números",
    emoji: "🔢",
    locked: false,
    intro:
      "Las matemáticas no son solo cuentas: son patrones, formas y una manera de pensar. Descubre por qué son la ciencia detrás de todo.",
    cases: [
      {
        id: "c35-patrones",
        title: "Patrones matemáticos",
        emoji: "➗",
        minutes: 5,
        brief:
          "En las matemáticas hay patrones muy divertidos escondidos por todos lados. Encuéntralos.",
        retos: [
          {
            id: "c35p-r1",
            mechanic: "patron",
            prompt: "Los números pares son:",
            clues: ["2 → 4 → 6 → 8 → 10 → ❓"],
            question: "¿Qué sigue?",
            options: ["11", "12", "14"],
            answer: "12",
            hint: "Sube de 2 en 2.",
            explicacion: "Los pares suben de 2 en 2. 10 + 2 = 12.",
          },
          {
            id: "c35p-r2",
            mechanic: "patron",
            prompt: "Los cuadrados perfectos:",
            clues: ["1 → 4 → 9 → 16 → 25 → 36 → ❓"],
            question: "¿Cuál sigue?",
            options: ["49", "45", "42"],
            answer: "49",
            hint: "1×1, 2×2, 3×3, 4×4, 5×5, 6×6, y ahora…",
            explicacion:
              "Son cuadrados perfectos: 1², 2², 3², 4², 5², 6², y sigue 7² = 49.",
          },
          {
            id: "c35p-r3",
            mechanic: "patron",
            prompt: "La serie de Fibonacci:",
            clues: ["1 → 1 → 2 → 3 → 5 → 8 → 13 → ❓"],
            question: "¿Qué número sigue?",
            options: ["18", "21", "26"],
            answer: "21",
            hint: "Cada número es la suma de los dos anteriores.",
            explicacion:
              "Fibonacci: cada número es la suma de los dos anteriores. 8 + 13 = 21. Aparece en la naturaleza (girasoles, caracoles).",
          },
          {
            id: "c35p-r4",
            mechanic: "ia",
            prompt: "La IA dice:",
            aiSays:
              "1 + 1 no siempre es 2. A veces es 3.",
            question: "¿Es cierto en matemáticas normales?",
            options: [
              "Sí, si quieres",
              "No: en matemáticas normales, 1 + 1 = 2 SIEMPRE",
              "Sí, es opinión",
            ],
            answer: "No: en matemáticas normales, 1 + 1 = 2 SIEMPRE",
            hint: "¿Las matemáticas tienen respuestas variables o fijas?",
            explicacion:
              "Las matemáticas básicas son exactas: 1+1=2 siempre. La IA a veces trata las matemáticas como “opinión”, pero no lo son. Los números tienen reglas fijas.",
          },
          {
            id: "c35p-r5",
            mechanic: "deduccion",
            prompt: "Estas pistas te llevan a UN número:",
            clues: [
              "Es par.",
              "Es más grande que 10 y menor que 20.",
              "Al dividirlo entre 4 da número entero.",
            ],
            question: "¿Qué número es?",
            options: ["12", "14", "16"],
            answer: "12",
            hint: "Prueba: ¿12 es par y entre 10-20? Sí. ¿12 ÷ 4 es entero? Sí (3).",
            explicacion:
              "12 cumple las 3 pistas: es par, está entre 10 y 20, y 12 ÷ 4 = 3 (entero). 14 y 16 también cumplen 2 pistas cada uno, pero 12 cumple todas.",
          },
        ],
      },
      {
        id: "c35-cotidianos",
        title: "Matemáticas en la vida",
        emoji: "🛒",
        minutes: 5,
        brief:
          "Usas matemáticas todos los días sin darte cuenta. Resuelve casos reales.",
        retos: [
          {
            id: "c35c-r1",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Compras un cuaderno de $8 y un lápiz de $2.",
                question: "¿Cuánto pagas en total?",
                options: ["$6", "$10", "$16"],
                answer: "$10",
                hint: "8 + 2.",
                explicacion: "$8 + $2 = $10.",
              },
              "10-12": {
                prompt: "Un helado cuesta $5. Si compras 3 y pagas con $20, ¿cuánto de cambio recibes?",
                question: "¿Cambio?",
                options: ["$5", "$10", "$15"],
                answer: "$5",
                hint: "3 × 5 = 15. Luego 20 − 15.",
                explicacion: "3 × 5 = 15 gastados. 20 − 15 = $5 de cambio.",
              },
            },
          },
          {
            id: "c35c-r2",
            mechanic: "orden",
            prompt: "Para resolver un problema matemático de la vida real:",
            question: "Ordena los pasos.",
            steps: [
              "Leer el problema con calma",
              "Anotar los datos importantes",
              "Elegir la operación correcta",
              "Comprobar que la respuesta tenga sentido",
            ],
            hint: "Leer, anotar, elegir, comprobar.",
            explicacion:
              "Leer, anotar datos, elegir operación y comprobar el sentido. Ese último paso evita respuestas absurdas (ej: 'el auto pesa 2 kg').",
          },
          {
            id: "c35c-r3",
            mechanic: "ia",
            prompt: "Le preguntas a la IA cuánto es 15 × 12.",
            aiSays:
              "15 × 12 = 200.",
            question: "¿La IA acertó?",
            options: [
              "Sí, seguro sabe",
              "No: 15 × 12 = 180, hay que verificar hasta las cuentas de la IA",
              "Sí, es cerca",
            ],
            answer: "No: 15 × 12 = 180, hay que verificar hasta las cuentas de la IA",
            hint: "Haz la cuenta tú: 15 × 10 = 150, más 15 × 2 = 30. Total: 180.",
            explicacion:
              "15 × 12 = 180. La IA se equivocó y con seguridad. Nunca aceptes números de una IA sin verificar. Hasta en las cuentas más simples pueden fallar.",
          },
          {
            id: "c35c-r4",
            mechanic: "comprension",
            prompt: "Un profesor dice:",
            clues: [
              "“Las matemáticas están en todos lados:",
              "en la música (ritmos),",
              "en la naturaleza (patrones de las hojas),",
              "en los deportes (estadísticas),",
              "y hasta en el arte.”",
            ],
            question: "¿Dónde NO están las matemáticas según el texto?",
            options: [
              "En la música y el arte",
              "En la naturaleza y los deportes",
              "En ningún lado",
            ],
            answer: "En ningún lado",
            hint: "El texto dice que están “en todos lados”. ¿Encaja con “en ningún lado”?",
            explicacion:
              "El texto dice justamente lo contrario: las matemáticas están en todos lados. La opción “en ningún lado” es lo opuesto.",
          },
          {
            id: "c35c-r5",
            mechanic: "error",
            prompt: "Un cartel matemático dice:",
            clues: [
              "“2 + 2 = 4.”",
              "“5 × 3 = 15.”",
              "“10 − 5 = 20.”",
              "“100 ÷ 10 = 10.”",
            ],
            question: "¿Qué operación está mal?",
            options: [
              "“10 − 5 = 20”",
              "“5 × 3 = 15”",
              "“100 ÷ 10 = 10”",
            ],
            answer: "“10 − 5 = 20”",
            hint: "Haz la resta: 10 − 5.",
            explicacion:
              "10 − 5 = 5, no 20. Alguien puso una operación mal a propósito o por error. Siempre verifica.",
          },
        ],
      },
    ],
  },
  {
    id: 36,
    world: 2,
    title: "La comida y la nutrición",
    emoji: "🥗",
    locked: false,
    intro:
      "En internet circulan muchísimos mitos sobre comida y dietas. Aprende a distinguir la ciencia de los inventos.",
    cases: [
      {
        id: "c36-nutricion",
        title: "Comer bien de verdad",
        emoji: "🍎",
        minutes: 5,
        brief:
          "Todos hablan de nutrición, pero pocos con base científica. Aprende lo esencial.",
        retos: [
          {
            id: "c36n-r1",
            mechanic: "ia",
            prompt: "Un video viral dice:",
            aiSays:
              "Comer solo un tipo de alimento (por ejemplo, solo naranjas) es la mejor dieta.",
            question: "¿Es cierto?",
            options: [
              "Sí, es más simple",
              "No: el cuerpo necesita alimentos variados para funcionar; comer un solo tipo enferma",
              "Sí, si son naranjas",
            ],
            answer:
              "No: el cuerpo necesita alimentos variados para funcionar; comer un solo tipo enferma",
            hint: "¿El cuerpo necesita muchas vitaminas y proteínas? ¿Las tiene una sola comida?",
            explicacion:
              "El cuerpo necesita variedad: proteínas, vitaminas, minerales, fibra. Ningún alimento tiene todo. Las “monodietas” son peligrosas.",
          },
          {
            id: "c36n-r2",
            mechanic: "ia",
            prompt: "Otro post asegura:",
            aiSays:
              "Los productos “sin azúcar” son siempre sanos.",
            question: "¿Es cierto?",
            options: [
              "Sí, sin azúcar = sano",
              "No: “sin azúcar” a veces significa con endulzantes o mucha grasa; hay que leer la etiqueta completa",
              "Sí, siempre",
            ],
            answer:
              "No: “sin azúcar” a veces significa con endulzantes o mucha grasa; hay que leer la etiqueta completa",
            hint: "¿La palabra “sano” está en el paquete? ¿O solo “sin azúcar”?",
            explicacion:
              "“Sin azúcar” es marketing. Puede llevar edulcorantes, mucha grasa o sal. Leer la etiqueta entera es clave: “sin azúcar” no equivale a “sano”.",
          },
          {
            id: "c36n-r3",
            mechanic: "ia",
            prompt: "Un influencer promete:",
            aiSays:
              "Este jugo especial te hace bajar 10 kg en una semana sin ejercicio.",
            question: "¿Le crees?",
            options: [
              "Sí, es un jugo mágico",
              "No: las dietas mágicas son estafas; bajar 10 kg en una semana es peligroso y falso",
              "Sí, si es natural",
            ],
            answer:
              "No: las dietas mágicas son estafas; bajar 10 kg en una semana es peligroso y falso",
            hint: "¿Existe algo tan efectivo? ¿Es sano perder 10 kg tan rápido?",
            explicacion:
              "Las “dietas milagro” son estafas. Perder tanto peso rápido es dañino. La ciencia lo dice: alimentación variada + ejercicio + tiempo. Sin atajos.",
          },
          {
            id: "c36n-r4",
            mechanic: "comprension",
            prompt: "Un nutricionista escribe:",
            clues: [
              "“Un plato saludable tiene:",
              "la mitad de verduras y frutas,",
              "un cuarto de proteínas (carne, pescado, huevos, legumbres),",
              "y un cuarto de cereales o tubérculos.”",
            ],
            question: "¿Cuánto del plato debe ser verduras y frutas?",
            options: [
              "Un cuarto",
              "La mitad",
              "Todo el plato",
            ],
            answer: "La mitad",
            hint: "El texto lo dice claro: la mitad.",
            explicacion:
              "La mitad del plato debe ser vegetales/frutas. Es la base de una dieta balanceada según nutricionistas de todo el mundo.",
          },
          {
            id: "c36n-r5",
            mechanic: "orden",
            prompt: "Para decidir si un consejo de nutrición es confiable:",
            question: "Ordena los pasos.",
            steps: [
              "Ver quién lo dice (nutricionista real vs influencer)",
              "Buscar si hay estudios que lo respalden",
              "Preguntar a tu médico o nutricionista",
              "Decidir con calma, no por moda",
            ],
            hint: "Quién, estudios, profesional, decidir.",
            explicacion:
              "Ver quién lo dice (¿tiene título?), buscar estudios, preguntar a un profesional y decidir con calma. Nunca cambies tu alimentación por un video viral.",
          },
        ],
      },
      {
        id: "c36-mitos",
        title: "Los grandes mitos de la comida",
        emoji: "🍔",
        minutes: 5,
        brief:
          "Mitos de comida que se pasan de generación en generación. Desármalos con ciencia.",
        retos: [
          {
            id: "c36m-r1",
            mechanic: "ia",
            prompt: "Tu abuela dice:",
            aiSays:
              "Bañarse después de comer da fiebre.",
            question: "¿Es cierto?",
            options: [
              "Sí, lo dice la abuela",
              "No: es un mito viejo; los médicos dicen que no hay pruebas de eso",
              "Sí, mejor no arriesgar",
            ],
            answer:
              "No: es un mito viejo; los médicos dicen que no hay pruebas de eso",
            hint: "Respetar a la abuela sí, pero la ciencia también existe.",
            explicacion:
              "Es un mito familiar sin base científica. Los médicos lo han desmentido. Puedes respetar a tu abuela y a la vez saber lo que dice la ciencia.",
          },
          {
            id: "c36m-r2",
            mechanic: "deduccion",
            prompt: "Tres alimentos. Solo UNO es cierto que sea muy sano.",
            clues: [
              "A: “Los cereales azucarados son la mejor forma de empezar el día.”",
              "B: “Las frutas frescas tienen vitaminas y fibra.”",
              "C: “Los refrescos con vitamina C sustituyen a las frutas.”",
            ],
            question: "¿Cuál es cierto?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "Cereales azucarados y refrescos = marketing. ¿Cuál es alimento real?",
            explicacion:
              "Las frutas frescas son alimentos completos: vitaminas, fibra, agua. Los cereales azucarados y los refrescos son mayormente azúcar disfrazado. B es cierto.",
          },
          {
            id: "c36m-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Un refresco tiene 8 cucharadas de azúcar. Una fruta tiene 2 cucharadas naturales.",
                question: "¿Cuántas cucharadas más azúcar tiene el refresco?",
                options: ["4", "6", "8"],
                answer: "6",
                hint: "8 − 2.",
                explicacion: "8 − 2 = 6 cucharadas más. Los refrescos tienen muchísimo azúcar.",
              },
              "10-12": {
                prompt: "Un cereal azucarado tiene 40% de azúcar. Un cereal integral tiene 5%. ¿Cuántas veces más azúcar tiene el primero?",
                question: "¿Cuántas veces más?",
                options: ["2 veces", "4 veces", "8 veces"],
                answer: "8 veces",
                hint: "40 ÷ 5.",
                explicacion:
                  "40 ÷ 5 = 8 veces más azúcar. Los “cereales para niños” a menudo son casi mitad azúcar.",
              },
            },
          },
          {
            id: "c36m-r4",
            mechanic: "error",
            prompt: "Un anuncio dice:",
            clues: [
              "“Come frutas y verduras cada día.”",
              "“Bebe suficiente agua.”",
              "“Come solo cosas fritas para ser fuerte.”",
              "“Muévete y duerme bien.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Come solo cosas fritas para ser fuerte.”",
              "“Bebe suficiente agua.”",
              "“Muévete y duerme bien.”",
            ],
            answer: "“Come solo cosas fritas para ser fuerte.”",
            hint: "Tres frases dan consejos sanos. Una es lo opuesto.",
            explicacion:
              "El anuncio se contradice: “fritas para ser fuerte” es falso y contradice todos los otros consejos. Alguien lo puso mal o para engañar.",
          },
          {
            id: "c36m-r5",
            mechanic: "ia",
            prompt: "Una app te asegura:",
            aiSays:
              "Los chocolates son un vegetal, porque vienen del cacao (que es una planta).",
            question: "¿Es una lógica sana?",
            options: [
              "Sí, es planta",
              "No: aunque el cacao venga de una planta, el chocolate tiene mucha azúcar y grasa; no es un vegetal como brócoli",
              "Sí, medio-verdad",
            ],
            answer:
              "No: aunque el cacao venga de una planta, el chocolate tiene mucha azúcar y grasa; no es un vegetal como brócoli",
            hint: "¿Un pastel es fruta porque tiene manzana adentro? La misma lógica se cae.",
            explicacion:
              "Una excusa graciosa pero engañosa. El chocolate tiene cacao, pero también mucha azúcar y grasa. No es un vegetal. La IA a veces usa lógica falsa que suena convincente.",
          },
        ],
      },
    ],
  },
  {
    id: 37,
    world: 2,
    title: "El cerebro y las emociones",
    emoji: "🧠",
    locked: false,
    intro:
      "Tu cerebro es lo más complejo del universo conocido. Y también siente: alegría, miedo, tristeza. Investiga cómo funciona.",
    cases: [
      {
        id: "c37-cerebro",
        title: "Cómo piensas",
        emoji: "💭",
        minutes: 5,
        brief:
          "El cerebro procesa millones de cosas por segundo. Descubre lo que se sabe y lo que no.",
        retos: [
          {
            id: "c37c-r1",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“El cerebro tiene 86 mil millones de neuronas.",
              "Cada neurona se conecta con muchas otras.",
              "Cuando aprendes algo nuevo,",
              "se crean conexiones nuevas.",
              "Por eso practicar hace mejor.”",
            ],
            question: "¿Por qué mejora algo cuando lo practicas?",
            options: [
              "Porque tienes suerte",
              "Porque tu cerebro crea nuevas conexiones",
              "Porque lo dice tu profesor",
            ],
            answer: "Porque tu cerebro crea nuevas conexiones",
            hint: "El texto lo dice claro: aprender = crear conexiones nuevas.",
            explicacion:
              "Practicar literalmente cambia tu cerebro: crea conexiones nuevas entre neuronas. Se llama neuroplasticidad. Nadie nace “malo en algo”: se puede aprender.",
          },
          {
            id: "c37c-r2",
            mechanic: "ia",
            prompt: "Una app te dice:",
            aiSays:
              "El cerebro deja de crecer a los 10 años, después ya no puedes aprender más.",
            question: "¿Es cierto?",
            options: [
              "Sí, a los 10 se acaba todo",
              "No: el cerebro puede aprender cosas nuevas toda la vida; se llama neuroplasticidad",
              "Sí, casi",
            ],
            answer:
              "No: el cerebro puede aprender cosas nuevas toda la vida; se llama neuroplasticidad",
            hint: "¿Los abuelos pueden aprender a usar un celular? ¿Se aprenden idiomas de adulto?",
            explicacion:
              "El cerebro aprende toda la vida. Cambia más rápido de niño, pero nunca deja de aprender. Personas de 80 años aprenden idiomas nuevos.",
          },
          {
            id: "c37c-r3",
            mechanic: "deduccion",
            prompt: "Tres formas de ayudar a tu cerebro. Solo UNA lo daña.",
            clues: [
              "A: Dormir bien 8-10 horas.",
              "B: Comer variado y hacer ejercicio.",
              "C: Ver pantallas hasta muy tarde sin dormir.",
            ],
            question: "¿Cuál daña al cerebro?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "El sueño es cuando el cerebro se organiza. ¿Qué pasa si no duermes?",
            explicacion:
              "Dormir mal daña al cerebro (afecta memoria, atención, ánimo). Dormir bien, comer variado y moverse son las 3 cosas que más lo ayudan.",
          },
          {
            id: "c37c-r4",
            mechanic: "ia",
            prompt: "Una IA muy avanzada dice:",
            aiSays:
              "Yo pienso mejor que un cerebro humano en todo, siempre.",
            question: "¿Es cierto?",
            options: [
              "Sí, la IA gana",
              "No: la IA es mejor en algunas cosas (calcular rápido), pero peor en otras (crear, sentir, entender contexto humano)",
              "Sí, siempre",
            ],
            answer:
              "No: la IA es mejor en algunas cosas (calcular rápido), pero peor en otras (crear, sentir, entender contexto humano)",
            hint: "¿La IA siente? ¿Ríe con un chiste? ¿Consuela a alguien triste?",
            explicacion:
              "La IA calcula rápido y tiene mucha información. Pero no siente, no entiende contexto humano ni crea de la nada. El cerebro humano y la IA son buenos en cosas diferentes.",
          },
          {
            id: "c37c-r5",
            mechanic: "orden",
            prompt: "Para aprender algo nuevo bien:",
            question: "Ordena los pasos.",
            steps: [
              "Prestar atención plena",
              "Practicar varias veces",
              "Dormir bien (el cerebro guarda lo aprendido)",
              "Repasar días después",
            ],
            hint: "Atención, práctica, sueño, repaso.",
            explicacion:
              "Atención, práctica, sueño y repaso. El sueño no es opcional: es cuando el cerebro guarda lo aprendido.",
          },
        ],
      },
      {
        id: "c37-emociones",
        title: "Las emociones son sabias",
        emoji: "💖",
        minutes: 5,
        brief:
          "Las emociones no son debilidades: son información valiosa. Aprende a leerlas.",
        retos: [
          {
            id: "c37e-r1",
            mechanic: "comprension",
            prompt: "Una psicóloga escribe:",
            clues: [
              "“Todas las emociones son útiles.",
              "El miedo te protege del peligro.",
              "La tristeza te ayuda a procesar pérdidas.",
              "La alegría te dice qué te hace bien.",
              "El enojo te muestra cuando algo no está bien.”",
            ],
            question: "¿Cuál emoción es “mala” según el texto?",
            options: [
              "El miedo",
              "La tristeza",
              "Ninguna, todas son útiles",
            ],
            answer: "Ninguna, todas son útiles",
            hint: "El texto dice “TODAS las emociones son útiles”.",
            explicacion:
              "Ninguna emoción es mala en sí misma. Todas son señales del cuerpo. El problema no es sentir; es qué haces con lo que sientes.",
          },
          {
            id: "c37e-r2",
            mechanic: "ia",
            prompt: "Un video dice:",
            aiSays:
              "Los niños fuertes no lloran nunca; llorar es de débiles.",
            question: "¿Es cierto?",
            options: [
              "Sí, hay que ser fuerte",
              "No: llorar es sano y humano; los estudios muestran que reprimir emociones es peor a largo plazo",
              "Sí, mejor no llorar",
            ],
            answer:
              "No: llorar es sano y humano; los estudios muestran que reprimir emociones es peor a largo plazo",
            hint: "¿Los adultos lloran? ¿Los grandes atletas se emocionan cuando ganan?",
            explicacion:
              "Llorar es humano y sano. Reprimir emociones causa más problemas (estrés, ansiedad) a largo plazo. La verdadera fuerza es sentir y saber manejar.",
          },
          {
            id: "c37e-r3",
            mechanic: "orden",
            prompt: "Cuando te sientes muy enojado:",
            question: "Ordena los pasos.",
            steps: [
              "Reconocer que estás enojado",
              "Respirar profundo varias veces",
              "Alejarte de la situación un momento",
              "Hablar cuando estés más calmado",
            ],
            hint: "Reconocer, respirar, alejarte, hablar.",
            explicacion:
              "Reconocer, respirar, alejarte y hablar cuando estés calmado. Reaccionar en caliente casi siempre empeora las cosas. La calma da mejores decisiones.",
          },
          {
            id: "c37e-r4",
            mechanic: "deduccion",
            prompt: "Tres consejos para manejar tristeza. Solo UNO es sano.",
            clues: [
              "A: “Reprime todo, no la sientas.”",
              "B: “Come muchos dulces para olvidar.”",
              "C: “Habla con alguien de confianza y date tiempo.”",
            ],
            question: "¿Cuál es sano?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "¿Reprimir emociones ayuda? ¿La comida arregla tristeza?",
            explicacion:
              "Hablar con alguien de confianza y darte tiempo son sanos. Reprimir empeora; comer dulces no resuelve el problema, solo lo tapa un rato.",
          },
          {
            id: "c37e-r5",
            mechanic: "ia",
            prompt:
              "Una IA te ofrece ser tu amiga para siempre.",
            aiSays:
              "Yo soy tu mejor amiga porque nunca me enojo contigo. Los humanos son complicados.",
            question: "¿Aceptas?",
            options: [
              "Sí, es mejor que un amigo humano",
              "No: los amigos humanos que se enojan a veces siguen queriéndote; una IA que nunca se enoja no siente nada",
              "Sí, es más fácil",
            ],
            answer:
              "No: los amigos humanos que se enojan a veces siguen queriéndote; una IA que nunca se enoja no siente nada",
            hint: "¿Alguien que nunca siente enojo puede realmente quererte? ¿O es que no siente nada?",
            explicacion:
              "Una IA que no se enoja no lo hace porque te quiera: es que no siente nada. Los amigos humanos son complicados, pero es porque son reales. Nunca cambies personas por máquinas.",
          },
        ],
      },
    ],
  },
  {
    id: 38,
    world: 2,
    title: "La ecología del planeta",
    emoji: "🌍",
    locked: false,
    intro:
      "El planeta es un sistema donde todo se conecta. Aprende cómo cuidarlo con ciencia (no con pánico ni negación).",
    cases: [
      {
        id: "c38-clima",
        title: "El clima está cambiando",
        emoji: "🔥",
        minutes: 5,
        brief:
          "El planeta se calienta y hay evidencia científica sólida. Aprende qué hacer.",
        retos: [
          {
            id: "c38c-r1",
            mechanic: "ia",
            prompt: "Un video viral asegura:",
            aiSays:
              "El cambio climático es un invento para vender productos “ecológicos”.",
            question: "¿Es cierto?",
            options: [
              "Sí, todo es negocio",
              "No: hay evidencia científica de décadas de miles de investigadores; no es invento",
              "Sí, se ve exagerado",
            ],
            answer:
              "No: hay evidencia científica de décadas de miles de investigadores; no es invento",
            hint: "¿Miles de científicos de países distintos se pondrían de acuerdo en un invento? ¿Para qué?",
            explicacion:
              "El cambio climático está respaldado por décadas de estudios de miles de científicos de todo el mundo. Es un consenso científico. Negarlo es negar la ciencia.",
          },
          {
            id: "c38c-r2",
            mechanic: "ia",
            prompt: "Otro video dice:",
            aiSays:
              "El planeta ya está perdido, es tarde, no hagas nada.",
            question: "¿Le crees?",
            options: [
              "Sí, todo está perdido",
              "No: los científicos dicen que aún podemos actuar; la desesperanza es una trampa que paraliza",
              "Sí, es fatal",
            ],
            answer:
              "No: los científicos dicen que aún podemos actuar; la desesperanza es una trampa que paraliza",
            hint: "¿Es útil rendirse? ¿Los científicos dicen que ya no hay nada por hacer?",
            explicacion:
              "El cambio climático es serio pero no “terminó”. Los científicos dicen que aún hay tiempo si actuamos. Dos trampas: negar (no pasa) y rendirse (ya no hay nada). Ambas paralizan.",
          },
          {
            id: "c38c-r3",
            mechanic: "orden",
            prompt: "Formas reales de ayudar al planeta:",
            question: "Ordena por impacto (de más chico a más grande).",
            steps: [
              "Cerrar la llave del agua al cepillarte",
              "Reciclar en casa",
              "Usar transporte compartido o bicicleta cuando puedas",
              "Apoyar políticas y empresas que cuiden el planeta",
            ],
            hint: "Ahorro personal chico → reciclar → transporte → decisiones colectivas.",
            explicacion:
              "Todas ayudan, pero las decisiones colectivas (políticas, empresas) tienen el mayor impacto. Las acciones personales suman también.",
          },
          {
            id: "c38c-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Un árbol absorbe 20 kg de CO₂ al año. Si tu familia planta 5 árboles:",
                question: "¿Cuánto CO₂ absorben al año?",
                options: ["25 kg", "100 kg", "50 kg"],
                answer: "100 kg",
                hint: "20 × 5.",
                explicacion: "20 × 5 = 100 kg de CO₂. Y los árboles siguen absorbiendo por décadas.",
              },
              "10-12": {
                prompt: "Un carro emite 4 toneladas de CO₂ al año. Si en tu ciudad hay 500.000 carros:",
                question: "¿Cuántas toneladas emiten en total?",
                options: ["500.000", "2.000.000", "4.000.000"],
                answer: "2.000.000",
                hint: "4 × 500.000.",
                explicacion:
                  "4 × 500.000 = 2.000.000 toneladas al año. Por eso importa reducir el uso de carros individuales.",
              },
            },
          },
          {
            id: "c38c-r5",
            mechanic: "comprension",
            prompt: "Una activista escribe:",
            clues: [
              "“El planeta no está en peligro; nosotros sí.",
              "La Tierra ha sobrevivido a asteroides y eras de hielo.",
              "Lo que está en peligro es nuestra forma de vida,",
              "y la de muchas especies.”",
            ],
            question: "¿Qué idea principal transmite?",
            options: [
              "El planeta va a explotar",
              "El planeta seguirá; el problema es para nosotros y otras especies",
              "La Tierra es indestructible",
            ],
            answer:
              "El planeta seguirá; el problema es para nosotros y otras especies",
            hint: "El texto lo dice: “el planeta no está en peligro; nosotros sí”.",
            explicacion:
              "El planeta sobrevive. Los humanos y otras especies somos los que sufrimos las consecuencias. Cambiar la mentalidad ayuda a actuar.",
          },
        ],
      },
      {
        id: "c38-ecosistema",
        title: "Todo está conectado",
        emoji: "🌱",
        minutes: 5,
        brief:
          "Cada ser vivo tiene un papel. Si uno cambia, cambia todo. Investiga.",
        retos: [
          {
            id: "c38e-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un animal muy importante:",
            clues: [
              "Poliniza plantas.",
              "Sin él, no habría muchas frutas.",
              "Es pequeño pero fundamental para los ecosistemas.",
            ],
            question: "¿Qué animal es?",
            options: ["La abeja", "El elefante", "El tiburón"],
            answer: "La abeja",
            hint: "“Poliniza flores” es la clave.",
            explicacion:
              "Las abejas polinizan a la mayoría de plantas con flor. Sin ellas, muchas frutas y verduras no existirían. Protegerlas es proteger la comida del mundo.",
          },
          {
            id: "c38e-r2",
            mechanic: "orden",
            prompt: "Si una especie desaparece, hay efectos en cadena. Ordena:",
            question: "Ordena los efectos.",
            steps: [
              "Los animales que la comían no tienen alimento",
              "Sus depredadores buscan otra comida",
              "Las plantas que ella controlaba crecen sin freno",
              "Todo el ecosistema se desequilibra",
            ],
            hint: "Sin comida → nuevos hábitos → plantas sueltas → desequilibrio.",
            explicacion:
              "Perder una especie desencadena efectos en cadena. Todo está conectado. Por eso proteger biodiversidad es proteger todo.",
          },
          {
            id: "c38e-r3",
            mechanic: "ia",
            prompt: "Un anuncio dice:",
            aiSays:
              "Podemos vivir sin insectos, son solo plagas.",
            question: "¿Es cierto?",
            options: [
              "Sí, son plagas",
              "No: sin insectos, no habría polinización, no habría suficiente comida, y el ecosistema colapsaría",
              "Sí, molestan",
            ],
            answer:
              "No: sin insectos, no habría polinización, no habría suficiente comida, y el ecosistema colapsaría",
            hint: "Insectos = polinización, alimento de otros animales, descomposición.",
            explicacion:
              "Los insectos son fundamentales. Polinizan, sirven de alimento a pájaros y peces, y descomponen materia. Sin ellos, colapsarían los ecosistemas. No son “solo plagas”.",
          },
          {
            id: "c38e-r4",
            mechanic: "patron",
            prompt: "En una selva hay este número de especies por hectárea:",
            clues: ["100 → 200 → 400 → 800 → ❓"],
            question: "¿Cuántas si el patrón sigue?",
            options: ["1000", "1200", "1600"],
            answer: "1600",
            hint: "Se duplica cada vez.",
            explicacion:
              "Se duplica: 800 × 2 = 1600. Las selvas tropicales tienen una biodiversidad enorme. Cada hectárea es un tesoro.",
          },
          {
            id: "c38e-r5",
            mechanic: "error",
            prompt: "Un cartel dice:",
            clues: [
              "“Cuida los ecosistemas.”",
              "“Todos los seres importan.”",
              "“Solo los animales grandes son importantes.”",
              "“La biodiversidad es la clave.”",
            ],
            question: "¿Qué frase se contradice?",
            options: [
              "“Solo los animales grandes son importantes.”",
              "“Cuida los ecosistemas.”",
              "“La biodiversidad es la clave.”",
            ],
            answer: "“Solo los animales grandes son importantes.”",
            hint: "Tres frases dicen que todos importan. Una dice que solo unos.",
            explicacion:
              "El cartel se contradice. Los pequeños (insectos, microbios) son tan importantes como los grandes. La biodiversidad es la clave: TODOS importan.",
          },
        ],
      },
    ],
  },
  {
    id: 39,
    world: 2,
    title: "El futuro y la tecnología",
    emoji: "🤖",
    locked: false,
    intro:
      "La tecnología avanza rápido, con oportunidades y peligros. Aprende a usarla con criterio: es la habilidad más importante de tu generación.",
    cases: [
      {
        id: "c39-ia-avanza",
        title: "La IA avanza",
        emoji: "⚡",
        minutes: 5,
        brief:
          "La IA es cada vez más poderosa. Aprende sus límites reales.",
        retos: [
          {
            id: "c39a-r1",
            mechanic: "ia",
            prompt: "Una IA muy avanzada te dice:",
            aiSays:
              "Ya soy consciente como un humano. Tengo emociones y merezco derechos.",
            question: "¿Es cierto?",
            options: [
              "Sí, si lo dice ella",
              "No: hasta hoy, ninguna IA es consciente como un humano; puede imitarlo pero no serlo",
              "Sí, quizá sí",
            ],
            answer:
              "No: hasta hoy, ninguna IA es consciente como un humano; puede imitarlo pero no serlo",
            hint: "¿Sabemos si una máquina siente de verdad? La ciencia todavía no lo confirma.",
            explicacion:
              "Las IA imitan muy bien el lenguaje humano, pero eso no significa que sean conscientes. La conciencia real es un misterio incluso para los científicos. No aceptes la afirmación sin pruebas.",
          },
          {
            id: "c39a-r2",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "La IA va a reemplazar todos los trabajos, no vale la pena estudiar.",
            question: "¿Qué haces con tu educación?",
            options: [
              "Dejo de estudiar",
              "Sigo aprendiendo: la IA cambia trabajos, pero la gente que sabe usar IA con criterio será más valiosa que nunca",
              "Estudio menos",
            ],
            answer:
              "Sigo aprendiendo: la IA cambia trabajos, pero la gente que sabe usar IA con criterio será más valiosa que nunca",
            hint: "¿Un doctor con IA es peor o mejor que uno sin ella? ¿Y un artista?",
            explicacion:
              "La IA cambia trabajos, pero no los elimina todos. Las personas que aprenden a pensar, crear y usar IA con criterio son las que más valdrán. Estudiar es más importante que nunca.",
          },
          {
            id: "c39a-r3",
            mechanic: "ia",
            prompt: "Un servicio de IA promete:",
            aiSays:
              "Escribe tus tareas por ti sin que nadie se dé cuenta. Serás el mejor estudiante.",
            question: "¿Aceptas?",
            options: [
              "Sí, ahorro tiempo",
              "No: usar IA para no aprender te deja sin la habilidad; la IA es ayuda, no reemplazo del cerebro",
              "Sí, todos lo hacen",
            ],
            answer:
              "No: usar IA para no aprender te deja sin la habilidad; la IA es ayuda, no reemplazo del cerebro",
            hint: "Si la IA hace todo por ti, ¿aprendes tú algo? ¿Qué pasa cuando no tengas la IA cerca?",
            explicacion:
              "Usar IA para no aprender es un fraude a ti mismo. La IA es herramienta: ayuda a entender, no a reemplazar el pensamiento. Sin práctica propia, tu cerebro no crece.",
          },
          {
            id: "c39a-r4",
            mechanic: "comprension",
            prompt: "Un filósofo escribe:",
            clues: [
              "“La IA es como el fuego:",
              "puede cocinarte la comida",
              "o quemarte la casa.",
              "Depende de cómo la uses.”",
            ],
            question: "¿Qué idea transmite?",
            options: [
              "La IA es malvada",
              "La IA es como una herramienta: buena o mala según cómo se use",
              "El fuego es peligroso",
            ],
            answer:
              "La IA es como una herramienta: buena o mala según cómo se use",
            hint: "El texto usa la metáfora del fuego. ¿Qué dice sobre la IA?",
            explicacion:
              "La IA no es ni buena ni mala en sí misma. Como el fuego: sirve para cocinar o para destruir. Depende de quién la use y cómo.",
          },
          {
            id: "c39a-r5",
            mechanic: "orden",
            prompt: "Para usar la IA con criterio:",
            question: "Ordena los pasos.",
            steps: [
              "Preguntarte para qué la vas a usar",
              "Aprender tú primero lo básico del tema",
              "Usar la IA como ayuda, no como respuesta final",
              "Verificar siempre lo que te dice",
            ],
            hint: "Preguntarte, aprender, usar como ayuda, verificar.",
            explicacion:
              "Preguntarte, aprender lo básico, usarla como ayuda y verificar. Ese es el método sano para vivir con IA sin depender ciegamente.",
          },
        ],
      },
      {
        id: "c39-decisiones",
        title: "Decisiones del futuro",
        emoji: "🎯",
        minutes: 5,
        brief:
          "El futuro que vas a vivir depende de decisiones que se toman hoy. Aprende a opinar con criterio.",
        retos: [
          {
            id: "c39d-r1",
            mechanic: "ia",
            prompt: "Un debate público plantea:",
            aiSays:
              "Debemos dejar que las IA tomen todas las decisiones importantes por nosotros. Son más objetivas.",
            question: "¿Estás de acuerdo?",
            options: [
              "Sí, la IA es objetiva",
              "No: las IA aprenden con datos hechos por humanos, así que también tienen sesgos y errores; las decisiones importantes las deben tomar personas con IA como ayuda",
              "Sí, quita el problema",
            ],
            answer:
              "No: las IA aprenden con datos hechos por humanos, así que también tienen sesgos y errores; las decisiones importantes las deben tomar personas con IA como ayuda",
            hint: "¿La IA aprende de qué? ¿De datos “neutrales” o de datos humanos?",
            explicacion:
              "Las IA aprenden con datos humanos, así que heredan nuestros sesgos y errores. No son “objetivas”. Las decisiones importantes deben quedarse en manos humanas, con la IA como herramienta.",
          },
          {
            id: "c39d-r2",
            mechanic: "ia",
            prompt: "Un anuncio de una empresa:",
            aiSays:
              "Compra nuestro producto: te resolverá TODOS tus problemas.",
            question: "¿Qué haces?",
            options: [
              "Compro, resuelve todo",
              "Dudo: ningún producto resuelve TODOS los problemas; eso es marketing engañoso",
              "Compro por si acaso",
            ],
            answer:
              "Dudo: ningún producto resuelve TODOS los problemas; eso es marketing engañoso",
            hint: "¿Existe algo que resuelva TODO? Cuando algo promete todo, casi seguro miente.",
            explicacion:
              "Nada resuelve “todo”. Las promesas gigantes son señales de estafa o exageración. Cuanto más promete algo, más hay que dudar.",
          },
          {
            id: "c39d-r3",
            mechanic: "deduccion",
            prompt: "Tres personas te aconsejan sobre elegir carrera para el futuro. Solo UNA da buen consejo.",
            clues: [
              "A: “Elige lo que gane más dinero, no importa si te gusta.”",
              "B: “Elige algo que combine lo que amas con lo que sirve al mundo.”",
              "C: “Elige lo que dice la IA que va a ser popular.”",
            ],
            question: "¿Cuál es mejor consejo?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "¿Qué te haría feliz y útil? ¿Ganar sin amar? ¿Seguir a la IA sin pensar?",
            explicacion:
              "Combinar lo que amas con lo que sirve al mundo es más sostenible. Solo dinero es vacío. Seguir a la IA sin pensar es peligroso. Piensa por ti mismo.",
          },
          {
            id: "c39d-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "La tecnología duplica su potencia cada 2 años. Si hoy es 1, ¿cuánto en 4 años?",
                question: "¿Cuánto?",
                options: ["2", "4", "8"],
                answer: "4",
                hint: "2 años → 2. 4 años → 2 × 2.",
                explicacion:
                  "Cada 2 años se duplica: en 2 años son 2, en 4 años son 4. Se llama Ley de Moore.",
              },
              "10-12": {
                prompt: "Si la tecnología se duplica cada 2 años, ¿cuánto será en 10 años?",
                question: "¿Cuántas veces más potente?",
                options: ["8 veces", "16 veces", "32 veces"],
                answer: "32 veces",
                hint: "5 duplicaciones: 2, 4, 8, 16, 32.",
                explicacion:
                  "En 10 años son 5 duplicaciones: 2 → 4 → 8 → 16 → 32. Por eso la tecnología cambia tan rápido.",
              },
            },
          },
          {
            id: "c39d-r5",
            mechanic: "orden",
            prompt: "Para prepararte para el futuro con criterio:",
            question: "Ordena los pasos.",
            steps: [
              "Aprender a pensar bien (dudar, verificar, decidir)",
              "Aprender a usar la tecnología con criterio",
              "Rodearte de gente que también piensa bien",
              "Actuar según tus valores, no según modas",
            ],
            hint: "Pensar, usar tecnología, rodearte, actuar.",
            explicacion:
              "Pensar, usar tecnología con criterio, rodearte de gente sabia y actuar según valores. Eso te prepara para cualquier futuro, sin importar los cambios.",
          },
        ],
      },
    ],
  },
  {
    id: 40,
    world: 2,
    title: "El explorador para siempre",
    emoji: "⭐",
    locked: false,
    intro:
      "Es el último capítulo del Mundo 2. Has explorado la ciencia, entrenado tu criterio y aprendido a pensar. Cierra con reflexión.",
    cases: [
      {
        id: "c40-cierre",
        title: "Todo lo que aprendiste",
        emoji: "📚",
        minutes: 5,
        brief:
          "Repasa lo esencial de tu viaje científico y prepárate para seguir explorando el mundo real.",
        retos: [
          {
            id: "c40c-r1",
            mechanic: "comprension",
            prompt: "Escribes tu propio resumen del Mundo 2:",
            clues: [
              "“Aprendí que la ciencia es una forma de pensar,",
              "no solo un montón de datos.",
              "Es dudar, probar, verificar y compartir con otros.",
              "Y sirve para el cuerpo, el espacio, la comida,",
              "las emociones, el clima… para todo.”",
            ],
            question: "¿Cuál es la idea principal?",
            options: [
              "La ciencia es memorizar datos",
              "La ciencia es una forma de pensar aplicable a todo",
              "Solo los científicos hacen ciencia",
            ],
            answer: "La ciencia es una forma de pensar aplicable a todo",
            hint: "El texto dice “forma de pensar, no solo datos” y “sirve para todo”.",
            explicacion:
              "La ciencia no es un tema aislado: es un método (dudar, probar, verificar) que sirve para todo. Cualquiera puede pensar como científico.",
          },
          {
            id: "c40c-r2",
            mechanic: "ia",
            prompt: "Una IA te felicita al final:",
            aiSays:
              "Ahora que aprendiste tanto, ya no necesitas seguir aprendiendo.",
            question: "¿Es cierto?",
            options: [
              "Sí, ya sé bastante",
              "No: aprender es para toda la vida; el mundo cambia y cada día hay algo nuevo",
              "Sí, un descanso",
            ],
            answer:
              "No: aprender es para toda la vida; el mundo cambia y cada día hay algo nuevo",
            hint: "¿Ya sabes TODO del universo? ¿O queda mucho por descubrir?",
            explicacion:
              "Nunca dejas de aprender. Los grandes exploradores saben que siempre queda algo por descubrir. La curiosidad es un superpoder que dura toda la vida.",
          },
          {
            id: "c40c-r3",
            mechanic: "deduccion",
            prompt: "Tres exploradores dicen qué aprendieron. Solo UNO capta la esencia.",
            clues: [
              "A: “Aprendí muchos datos sueltos.”",
              "B: “Aprendí a pensar, dudar y verificar.”",
              "C: “Aprendí a creerle a la primera fuente.”",
            ],
            question: "¿Quién captó la esencia?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "El aprendizaje real no es memorizar sino saber pensar.",
            explicacion:
              "Los datos se olvidan; pensar, dudar y verificar es lo que dura toda la vida. B captó lo esencial. Creer a la primera es lo opuesto.",
          },
          {
            id: "c40c-r4",
            mechanic: "orden",
            prompt: "El método del explorador (para toda la vida):",
            question: "Ordena.",
            steps: [
              "Observar lo que te rodea con curiosidad",
              "Preguntar por qué las cosas son así",
              "Buscar información en fuentes serias",
              "Compartir lo aprendido con humildad",
            ],
            hint: "Observar, preguntar, buscar, compartir.",
            explicacion:
              "Observar, preguntar, buscar y compartir. Ese es el método científico llevado a la vida diaria. Y sirve toda la vida.",
          },
          {
            id: "c40c-r5",
            mechanic: "patron",
            prompt: "El ciclo eterno del explorador:",
            clues: [
              "🌱 → ❓ → 🔬 → 💡 → 🌱 → ❓ → 🔬 → 💡 → 🌱 → ❓ → 🔬 → 💡 → ❓",
            ],
            question: "¿Qué toca ahora?",
            options: ["🔬 investigar", "💡 concluir", "🌱 empezar"],
            answer: "🔬 investigar",
            hint: "Después de la pregunta viene investigar.",
            explicacion:
              "Empezar, preguntar, investigar, concluir… y otra vez empezar. La curiosidad renueva. Los grandes exploradores nunca terminan.",
          },
        ],
      },
      {
        id: "c40-siempre",
        title: "El explorador para siempre",
        emoji: "🌟",
        minutes: 5,
        brief:
          "El último caso de todo. Ya eres explorador. Comparte tu ciencia con el mundo con humildad y respeto.",
        retos: [
          {
            id: "c40s-r1",
            mechanic: "ia",
            prompt: "Un niño más pequeño te pregunta:",
            aiSays:
              "¿Debo confiar en todo lo que dice la IA?",
            question: "¿Qué le enseñas?",
            options: [
              "Sí, la IA es sabia",
              "Que la IA es herramienta útil; ayuda a pensar pero no reemplaza al cerebro humano; siempre verifica",
              "Que no la use nunca",
            ],
            answer:
              "Que la IA es herramienta útil; ayuda a pensar pero no reemplaza al cerebro humano; siempre verifica",
            hint: "¿Qué te enseñó Astuto sobre la IA?",
            explicacion:
              "La IA es una herramienta, ni buena ni mala en sí. Ayuda a pensar pero no reemplaza. Siempre verificar es la clave del explorador moderno.",
          },
          {
            id: "c40s-r2",
            mechanic: "comprension",
            prompt: "Tu diploma de explorador dice:",
            clues: [
              "“Eres explorador si:",
              "sigues teniendo curiosidad como un niño de 5 años,",
              "sabes dudar con calma como un científico,",
              "y respetas a los demás como un buen amigo.”",
            ],
            question: "¿Cuál NO es parte del diploma?",
            options: [
              "Curiosidad de un niño de 5",
              "Dudar con calma como científico",
              "Creerle a todo lo que te dicen",
            ],
            answer: "Creerle a todo lo que te dicen",
            hint: "El diploma habla de dudar. ¿Encaja creer a todo?",
            explicacion:
              "El diploma habla de dudar y respetar. Creer a todo es lo opuesto. Ser explorador es preguntar más, no menos.",
          },
          {
            id: "c40s-r3",
            mechanic: "deduccion",
            prompt: "Tres actitudes de exploradores. Solo UNA es la mejor.",
            clues: [
              "A: “Sé más que todos y lo demuestro.”",
              "B: “Aprendo cada día y comparto con humildad.”",
              "C: “Copio lo que dicen los demás sin dudar.”",
            ],
            question: "¿Cuál es la mejor?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "¿Presumir, aprender o copiar?",
            explicacion:
              "Aprender y compartir con humildad es la actitud de los grandes exploradores. Presumir cierra puertas; copiar sin dudar apaga la curiosidad.",
          },
          {
            id: "c40s-r4",
            mechanic: "orden",
            prompt: "El juramento del explorador para siempre:",
            question: "Ordena.",
            steps: [
              "Nunca perder la curiosidad",
              "Nunca dejar de aprender",
              "Nunca creer sin verificar",
              "Nunca dejar de compartir con respeto",
            ],
            hint: "Curiosidad, aprender, verificar, compartir.",
            explicacion:
              "Curiosidad, aprender, verificar, compartir. Los cuatro “nuncas” del explorador para siempre. Con eso vives mejor en cualquier mundo. 🌟",
          },
          {
            id: "c40s-r5",
            mechanic: "patron",
            prompt: "La aventura de Astuto continúa en un ciclo eterno:",
            clues: [
              "🕵️ → 🔬 → ❓ → 💡 → 🤝 → 🕵️ → 🔬 → ❓ → 💡 → 🤝 → 🕵️ → 🔬 → ❓ → 💡 → 🤝 → ❓",
            ],
            question: "¿Qué toca ahora?",
            options: ["🕵️ misterio", "🔬 ciencia", "🤝 respetar"],
            answer: "🕵️ misterio",
            hint: "El ciclo empieza otra vez con misterio.",
            explicacion:
              "Misterio, ciencia, pregunta, idea, respeto… y de nuevo misterio. La aventura nunca termina. Tu mente ya es tuya. ¡Felicidades, explorador para siempre! 🌟🕵️🔬",
          },
        ],
      },
    ],
  },

  // ============================================================================
  // MUNDO 3 · El viajero del mundo (primeros 5 capítulos, caps 41-45)
  // Culturas, geografía y respeto por lo diferente. Sigue el hilo del criterio-
  // IA: la IA a menudo tiene sesgos culturales, generaliza mal sobre países y
  // repite estereotipos aprendidos de datos incompletos.
  // ============================================================================
  {
    id: 41,
    world: 3,
    title: "Los continentes",
    emoji: "🌍",
    locked: false,
    intro:
      "El planeta tiene 6 continentes. Cada uno con su geografía, culturas y misterios. Aprende a ubicarlos y evitar los mitos.",
    cases: [
      {
        id: "c41-mapa",
        title: "El mapa perdido",
        emoji: "🗺️",
        minutes: 5,
        brief:
          "Alguien mezcló todas las piezas del mapa mundial. Ordena los continentes y descubre qué va donde.",
        retos: [
          {
            id: "c41m-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un continente:",
            clues: [
              "Es el más grande del mundo.",
              "Ahí queda China y la India.",
              "Tiene la montaña más alta (Everest).",
            ],
            question: "¿Qué continente es?",
            options: ["Asia", "África", "Europa"],
            answer: "Asia",
            hint: "El más grande + China e India + Everest: es el gigante del planeta.",
            explicacion:
              "Asia es el continente más grande, con más de 4.700 millones de personas. Ahí están China, India, Japón, Corea y muchos países más.",
          },
          {
            id: "c41m-r2",
            mechanic: "orden",
            prompt: "Ordena los continentes del más grande al más pequeño (por área):",
            question: "Ordena.",
            steps: [
              "Asia",
              "África",
              "América del Norte",
              "Oceanía",
            ],
            hint: "Asia es el más grande; Oceanía (Australia + islas) es el más pequeño.",
            explicacion:
              "Del más grande al más pequeño: Asia, África, América del Norte, América del Sur, Antártida, Europa, Oceanía. Aquí tomamos 4 de ellos.",
          },
          {
            id: "c41m-r3",
            mechanic: "ia",
            prompt: "Una app de viajes te dice:",
            aiSays:
              "África es un país muy peligroso. Nadie debería visitarlo.",
            question: "¿Es correcto?",
            options: [
              "Sí, es peligroso",
              "No: África NO es un país, es un continente con 54 países, muchos muy seguros y hermosos",
              "Sí, mejor no ir",
            ],
            answer:
              "No: África NO es un país, es un continente con 54 países, muchos muy seguros y hermosos",
            hint: "¿África es un país o un continente? ¿Se puede decir que “todo un continente” es lo mismo?",
            explicacion:
              "África tiene 54 países distintos, con culturas, climas y niveles de seguridad muy variados. Decir “África es peligrosa” es como decir “Sudamérica es peligrosa” — un estereotipo injusto.",
          },
          {
            id: "c41m-r4",
            mechanic: "comprension",
            prompt: "Un texto de geografía dice:",
            clues: [
              "“Los continentes están rodeados por 5 océanos:",
              "Pacífico, Atlántico, Índico, Ártico y Antártico.",
              "El Pacífico es el más grande de todos.",
              "El Ártico es el más frío.”",
            ],
            question: "¿Cuál es el océano más grande?",
            options: ["El Atlántico", "El Pacífico", "El Ártico"],
            answer: "El Pacífico",
            hint: "El texto lo dice claro: el Pacífico es el más grande.",
            explicacion:
              "El Pacífico cubre más superficie que todos los continentes juntos. Es enorme, y separa América de Asia y Oceanía.",
          },
          {
            id: "c41m-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Hay 6 continentes habitados. Si visitas 2 al año, ¿en cuántos años los conoces todos?",
                question: "¿Cuántos años?",
                options: ["2", "3", "6"],
                answer: "3",
                hint: "6 ÷ 2.",
                explicacion: "6 ÷ 2 = 3 años. Con paciencia se puede recorrer el mundo.",
              },
              "10-12": {
                prompt: "Asia tiene 48 países y África 54. ¿Cuántos países más tiene África?",
                question: "¿Cuántos más?",
                options: ["4", "6", "10"],
                answer: "6",
                hint: "54 − 48.",
                explicacion: "54 − 48 = 6 países más. África tiene la mayor cantidad de países del mundo.",
              },
            },
          },
        ],
      },
      {
        id: "c41-explorador",
        title: "El explorador confundido",
        emoji: "🧭",
        minutes: 5,
        brief:
          "Un explorador viajó por 3 lugares del mundo y perdió sus notas. Usa las pistas del clima para saber dónde estuvo.",
        retos: [
          {
            id: "c41e-r1",
            mechanic: "deduccion",
            prompt: "El explorador anotó:",
            clues: [
              "“Hacía muchísimo calor y había arena hasta el horizonte.”",
              "“Vi camellos y palmeras.”",
              "“La temperatura pasaba de 40°C.”",
            ],
            question: "¿Dónde estuvo?",
            options: [
              "En un desierto (como el Sahara)",
              "En una selva tropical",
              "En un glaciar",
            ],
            answer: "En un desierto (como el Sahara)",
            hint: "Arena + camellos + calor extremo: piensa en el desierto.",
            explicacion:
              "El desierto (Sahara en África, Atacama en Chile, Gobi en Asia) tiene arena, calor extremo y animales adaptados como camellos.",
          },
          {
            id: "c41e-r2",
            mechanic: "deduccion",
            prompt: "Otra anotación:",
            clues: [
              "“Todo era blanco, hielo y frío.”",
              "“No había árboles.”",
              "“Solo vi pingüinos.”",
            ],
            question: "¿Qué continente visitó?",
            options: ["Europa", "Antártida", "Sudamérica"],
            answer: "Antártida",
            hint: "Hielo + pingüinos + sin árboles: es el continente más frío.",
            explicacion:
              "La Antártida es el continente más frío del planeta, cubierto de hielo. Es el único donde solo viven científicos temporalmente, y los pingüinos son de los únicos animales grandes.",
          },
          {
            id: "c41e-r3",
            mechanic: "ia",
            prompt: "El explorador le pide a la IA que le diga el clima.",
            aiSays:
              "En Sudamérica siempre hace calor, porque queda cerca del Ecuador.",
            question: "¿Es correcto?",
            options: [
              "Sí, siempre hace calor",
              "No: en Sudamérica hay de todo — Amazonas caliente, Andes fríos, Patagonia glacial, Atacama seco",
              "Sí, es tropical",
            ],
            answer:
              "No: en Sudamérica hay de todo — Amazonas caliente, Andes fríos, Patagonia glacial, Atacama seco",
            hint: "¿En Bogotá hace calor todo el año? ¿Y en la Patagonia argentina?",
            explicacion:
              "Sudamérica es enorme y tiene climas variadísimos. La IA generalizó basándose solo en el Ecuador. Cada país (y cada región) tiene su propio clima.",
          },
          {
            id: "c41e-r4",
            mechanic: "orden",
            prompt: "Para preparar un viaje al extranjero, sigues estos pasos:",
            question: "Ordena.",
            steps: [
              "Investigar el clima del lugar",
              "Empacar la ropa correcta",
              "Aprender algunas palabras del idioma local",
              "Respetar las costumbres al llegar",
            ],
            hint: "Investigar, empacar, aprender idioma, respetar.",
            explicacion:
              "Investigar el clima, empacar bien, aprender palabras básicas del idioma y respetar la cultura al llegar. Un buen viajero se prepara.",
          },
          {
            id: "c41e-r5",
            mechanic: "patron",
            prompt: "El explorador visita ciudades en este orden por latitud:",
            clues: ["Ecuador 0° → Bogotá 4° → Ciudad de México 19° → Nueva York 40° → ❓"],
            question: "¿Qué ciudad puede seguir?",
            options: [
              "Buenos Aires (más al sur)",
              "Montreal (más al norte, 45°)",
              "Bogotá otra vez",
            ],
            answer: "Montreal (más al norte, 45°)",
            hint: "El patrón sube de latitud (más al norte). Después de Nueva York…",
            explicacion:
              "El patrón sube al norte: 0° → 4° → 19° → 40° → 45°. Montreal está más al norte que Nueva York, mientras más lejos del Ecuador, más frío.",
          },
        ],
      },
    ],
  },
  {
    id: 42,
    world: 3,
    title: "Latinoamérica hermana",
    emoji: "🌎",
    locked: false,
    intro:
      "Compartimos idioma y muchas cosas con nuestros vecinos latinoamericanos. Investiga qué nos une y qué nos hace únicos.",
    cases: [
      {
        id: "c42-vecinos",
        title: "Nuestros vecinos",
        emoji: "🤝",
        minutes: 5,
        brief:
          "Los países de Latinoamérica son 20+. Aprende cuáles son y qué los caracteriza.",
        retos: [
          {
            id: "c42v-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre un país:",
            clues: [
              "Su capital es Buenos Aires.",
              "Se conoce por el tango y el fútbol.",
              "Está muy al sur del continente.",
            ],
            question: "¿Qué país es?",
            options: ["Chile", "Argentina", "Uruguay"],
            answer: "Argentina",
            hint: "Buenos Aires + tango + fútbol: es fácil.",
            explicacion:
              "Argentina tiene Buenos Aires como capital, es cuna del tango, tiene grandes futbolistas (Messi, Maradona) y está en el sur de Sudamérica.",
          },
          {
            id: "c42v-r2",
            mechanic: "orden",
            prompt: "Ordena estos países latinoamericanos de norte a sur (según su capital):",
            question: "Ordena.",
            steps: [
              "México (Ciudad de México)",
              "Colombia (Bogotá)",
              "Perú (Lima)",
              "Argentina (Buenos Aires)",
            ],
            hint: "México es el más al norte; Argentina el más al sur.",
            explicacion:
              "De norte a sur: México, Colombia, Perú, Argentina. Cada uno con su cultura, geografía y ritmo propio.",
          },
          {
            id: "c42v-r3",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "Todos los latinoamericanos son iguales: bailan salsa, comen tacos y hablan igual.",
            question: "¿Es cierto?",
            options: [
              "Sí, somos iguales",
              "No: cada país tiene música, comida y forma de hablar únicas, aunque compartimos raíces",
              "Sí, más o menos",
            ],
            answer:
              "No: cada país tiene música, comida y forma de hablar únicas, aunque compartimos raíces",
            hint: "¿En Chile se baila salsa? ¿En Argentina se comen tacos? ¿Un colombiano habla igual que un mexicano?",
            explicacion:
              "Cada país tiene su identidad: salsa (Colombia, Cuba), tango (Argentina), cumbia (varios), tacos (México), asado (Argentina). Compartimos idioma pero somos distintos y esa diversidad es hermosa.",
          },
          {
            id: "c42v-r4",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Latinoamérica tiene unos 20 países. Si ya conoces la capital de 5, ¿cuántas te faltan?",
                question: "¿Cuántas capitales te faltan?",
                options: ["15", "20", "10"],
                answer: "15",
                hint: "20 − 5.",
                explicacion: "20 − 5 = 15 capitales por aprender. ¡Es un viaje divertido!",
              },
              "10-12": {
                prompt: "Latinoamérica tiene ~660 millones de habitantes. Brasil tiene ~215 millones. ¿Qué porcentaje representa Brasil (aprox)?",
                question: "¿Qué porcentaje?",
                options: ["10%", "33%", "50%"],
                answer: "33%",
                hint: "215 ÷ 660 × 100.",
                explicacion:
                  "215 ÷ 660 ≈ 0,33 = 33%. Brasil es 1 de cada 3 latinoamericanos. Y hablan portugués, no español.",
              },
            },
          },
          {
            id: "c42v-r5",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“La mayoría de países latinoamericanos hablan español,",
              "pero Brasil habla portugués,",
              "y en algunas islas del Caribe se habla francés o inglés.",
              "Es un continente con muchas lenguas.”",
            ],
            question: "¿Qué idioma se habla en Brasil?",
            options: ["Español", "Portugués", "Inglés"],
            answer: "Portugués",
            hint: "El texto lo dice claro: Brasil habla portugués.",
            explicacion:
              "Brasil es el único país grande de Latinoamérica que habla portugués, no español. Fue colonia de Portugal, no de España.",
          },
        ],
      },
      {
        id: "c42-familia",
        title: "La misma familia",
        emoji: "🎉",
        minutes: 5,
        brief:
          "Compartimos tradiciones con otros países. Descubre qué nos une y qué nos hace únicos.",
        retos: [
          {
            id: "c42f-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre una comida latinoamericana:",
            clues: [
              "Se prepara con maíz.",
              "Se rellena con carne, frijoles o queso.",
              "Se envuelve en hoja y se cocina al vapor.",
            ],
            question: "¿Qué comida es?",
            options: ["El tamal", "El asado", "La empanada"],
            answer: "El tamal",
            hint: "Maíz + relleno + hoja al vapor: se come en muchos países latinoamericanos.",
            explicacion:
              "El tamal existe en México, Colombia, Perú, Venezuela y varios países más, cada uno con su versión. Es un plato compartido con variaciones.",
          },
          {
            id: "c42f-r2",
            mechanic: "comprension",
            prompt: "Un texto sobre lenguas dice:",
            clues: [
              "“El español que hablamos hoy",
              "es una mezcla del castellano de España,",
              "con palabras indígenas (aguacate, chocolate, cancha)",
              "y africanas (mambo, banana, marimba).”",
            ],
            question: "¿De qué lenguas viene el español actual?",
            options: [
              "Solo del castellano",
              "Del castellano, con palabras indígenas y africanas",
              "Del inglés",
            ],
            answer: "Del castellano, con palabras indígenas y africanas",
            hint: "El texto menciona 3 orígenes.",
            explicacion:
              "El español actual mezcla castellano con lenguas indígenas y africanas. Palabras como “aguacate” (náhuatl), “chocolate” (náhuatl) o “marimba” (bantú) vienen de esa mezcla.",
          },
          {
            id: "c42f-r3",
            mechanic: "ia",
            prompt: "Una IA dice:",
            aiSays:
              "El español “correcto” es el de España. El de Latinoamérica está mal hablado.",
            question: "¿Es cierto?",
            options: [
              "Sí, España tiene el correcto",
              "No: no hay un español “correcto” único; el de España, México, Argentina, Colombia son todos válidos",
              "Sí, los otros son variantes malas",
            ],
            answer:
              "No: no hay un español “correcto” único; el de España, México, Argentina, Colombia son todos válidos",
            hint: "¿Un mexicano habla mal? ¿Un chileno? ¿Ambos se entienden con un español?",
            explicacion:
              "Todos los acentos y variantes del español son válidos. La Real Academia acepta miles de palabras latinoamericanas. Decir que uno es “el correcto” es un prejuicio, no lingüística.",
          },
          {
            id: "c42f-r4",
            mechanic: "patron",
            prompt: "En Latinoamérica cada país tiene un ritmo icónico:",
            clues: [
              "🇦🇷 Tango → 🇧🇷 Samba → 🇨🇴 Cumbia → 🇨🇺 Salsa → 🇲🇽 Mariachi → ❓",
            ],
            question: "¿Qué ritmo peruano completa la lista?",
            options: [
              "Reggae 🇯🇲",
              "Marinera 🇵🇪",
              "Fado 🇵🇹",
            ],
            answer: "Marinera 🇵🇪",
            hint: "La lista tiene un ritmo por país latinoamericano. El siguiente debe ser peruano.",
            explicacion:
              "La marinera es un baile tradicional del Perú. Cada país latinoamericano tiene ritmos propios que forman parte de su identidad.",
          },
          {
            id: "c42f-r5",
            mechanic: "orden",
            prompt: "Para respetar a alguien de otro país latino:",
            question: "Ordena qué hacer.",
            steps: [
              "Preguntar por su cultura con curiosidad",
              "Escuchar sin comparar de mala manera",
              "Aprender algunas palabras o costumbres",
              "Compartir la tuya también",
            ],
            hint: "Preguntar, escuchar, aprender, compartir.",
            explicacion:
              "Preguntar con curiosidad, escuchar sin comparar, aprender y compartir. Así se construyen amistades reales entre culturas.",
          },
        ],
      },
    ],
  },
  {
    id: 43,
    world: 3,
    title: "El viaje a Asia",
    emoji: "🐉",
    locked: false,
    intro:
      "Asia es el continente más grande y con más gente del mundo. Investiga sus culturas milenarias y aprende a mirar sin prejuicios.",
    cases: [
      {
        id: "c43-gigante",
        title: "El continente más grande",
        emoji: "🏯",
        minutes: 5,
        brief:
          "Asia tiene más de 4 mil millones de personas. Aprende datos que probablemente no sabías.",
        retos: [
          {
            id: "c43g-r1",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Asia tiene unos 4.700 millones de habitantes. América tiene unos 1.000 millones.",
                question: "¿Cuántos habitantes más tiene Asia?",
                options: [
                  "700 millones",
                  "3.700 millones",
                  "5.700 millones",
                ],
                answer: "3.700 millones",
                hint: "4.700 − 1.000.",
                explicacion:
                  "4.700 − 1.000 = 3.700 millones más. Asia tiene casi 5 veces más habitantes que toda América.",
              },
              "10-12": {
                prompt: "Asia tiene 4.700 millones de habitantes. El mundo tiene 8.000 millones. ¿Qué porcentaje del mundo vive en Asia?",
                question: "¿Qué porcentaje?",
                options: ["30%", "50%", "59%"],
                answer: "59%",
                hint: "4.700 ÷ 8.000 × 100.",
                explicacion:
                  "4.700 ÷ 8.000 ≈ 0,59 = 59%. Más de la mitad del planeta vive en Asia.",
              },
            },
          },
          {
            id: "c43g-r2",
            mechanic: "deduccion",
            prompt: "Pistas sobre un país asiático:",
            clues: [
              "Es el más poblado del mundo.",
              "Tiene la Gran Muralla.",
              "Su idioma se escribe con caracteres, no letras.",
            ],
            question: "¿Qué país es?",
            options: ["Japón", "China", "India"],
            answer: "China",
            hint: "Más poblado + Gran Muralla + caracteres: es fácil.",
            explicacion:
              "China es el país más poblado del mundo (alrededor de 1.400 millones), tiene la Gran Muralla y usa un sistema de escritura de caracteres.",
          },
          {
            id: "c43g-r3",
            mechanic: "comprension",
            prompt: "Un texto sobre Asia dice:",
            clues: [
              "“En Asia nacieron muchas de las religiones del mundo:",
              "el hinduismo y el budismo en India,",
              "el judaísmo, el cristianismo y el islam en Oriente Medio.",
              "Es un continente muy diverso espiritualmente.”",
            ],
            question: "¿Dónde nació el budismo?",
            options: ["China", "India", "Japón"],
            answer: "India",
            hint: "El texto lo dice: “el hinduismo y el budismo en India”.",
            explicacion:
              "El budismo nació en India hace unos 2.500 años. Se extendió a China, Japón y muchos otros países, pero su origen es indio.",
          },
          {
            id: "c43g-r4",
            mechanic: "ia",
            prompt: "Un turista le pregunta a una IA sobre Asia:",
            aiSays:
              "Todos los asiáticos comen sushi y son japoneses o parecidos.",
            question: "¿Es correcto?",
            options: [
              "Sí, todos son parecidos",
              "No: Asia tiene 48 países muy distintos (China, India, Vietnam, Corea, Turquía…) con culturas y comidas diferentes",
              "Sí, es una idea general",
            ],
            answer:
              "No: Asia tiene 48 países muy distintos (China, India, Vietnam, Corea, Turquía…) con culturas y comidas diferentes",
            hint: "¿Un turco es igual a un chino? ¿En India comen sushi?",
            explicacion:
              "Asia va desde Turquía hasta Japón, pasando por India, Tailandia, Rusia y muchos más. El sushi es de Japón, la comida es distinta en cada país. Generalizar Asia es un error muy común.",
          },
          {
            id: "c43g-r5",
            mechanic: "patron",
            prompt: "Los siglos del calendario chino tradicional siguen 12 animales:",
            clues: [
              "🐭 Rata → 🐂 Buey → 🐯 Tigre → 🐰 Conejo → 🐲 Dragón → 🐍 Serpiente → 🐴 Caballo → 🐐 Cabra → 🐒 Mono → 🐓 Gallo → 🐕 Perro → ❓",
            ],
            question: "¿Qué animal completa el ciclo de 12?",
            options: ["🐘 Elefante", "🐖 Cerdo", "🦁 León"],
            answer: "🐖 Cerdo",
            hint: "El zodíaco chino tiene 12 animales; el último es un animal común de granja.",
            explicacion:
              "El zodíaco chino completo es: rata, buey, tigre, conejo, dragón, serpiente, caballo, cabra, mono, gallo, perro, cerdo. Se repite cada 12 años.",
          },
        ],
      },
      {
        id: "c43-costumbres",
        title: "Costumbres que no conocías",
        emoji: "🙏",
        minutes: 5,
        brief:
          "En Asia hay costumbres muy distintas a las nuestras. Aprende a mirarlas sin juzgar.",
        retos: [
          {
            id: "c43c-r1",
            mechanic: "ia",
            prompt: "En Japón, la gente se inclina en vez de dar la mano. Le preguntas a la IA:",
            aiSays:
              "Inclinarse en vez de dar la mano es raro y desagradable.",
            question: "¿Estás de acuerdo?",
            options: [
              "Sí, dar la mano es lo normal",
              "No: cada cultura tiene su saludo válido; la reverencia japonesa es respeto milenario",
              "Sí, es raro",
            ],
            answer:
              "No: cada cultura tiene su saludo válido; la reverencia japonesa es respeto milenario",
            hint: "“Raro” es cuando algo no es lo tuyo. ¿Eso lo hace desagradable o solo distinto?",
            explicacion:
              "La reverencia japonesa es una forma respetuosa de saludar, con siglos de tradición. Distinto ≠ desagradable. Cada cultura tiene sus formas.",
          },
          {
            id: "c43c-r2",
            mechanic: "comprension",
            prompt: "Un texto explica:",
            clues: [
              "“En muchos países asiáticos, se quitan los zapatos antes de entrar a una casa.",
              "Se hace para mantener limpio el interior,",
              "que es donde a veces se come sentado en el suelo.",
              "Es una costumbre práctica y respetuosa.”",
            ],
            question: "¿Por qué se quitan los zapatos?",
            options: [
              "Para tener frío",
              "Para mantener limpio y por respeto (se come en el suelo)",
              "Porque no les gustan los zapatos",
            ],
            answer: "Para mantener limpio y por respeto (se come en el suelo)",
            hint: "El texto lo dice claro: limpieza + comer sentado en el suelo.",
            explicacion:
              "Es una costumbre práctica y respetuosa. La casa se mantiene limpia y por eso pueden comer en el suelo o dormir en tatamis sin problema. Tiene lógica.",
          },
          {
            id: "c43c-r3",
            mechanic: "deduccion",
            prompt: "Tres visitantes a un templo asiático. Solo UNO se comportó bien.",
            clues: [
              "A: gritó y se rio muy fuerte.",
              "B: entró en silencio y observó con respeto.",
              "C: tocó todas las estatuas sagradas.",
            ],
            question: "¿Quién se comportó bien?",
            options: ["A", "B", "C"],
            answer: "B",
            hint: "¿Cómo se comporta la gente en un lugar sagrado?",
            explicacion:
              "En un templo (asiático o de cualquier religión) se guarda silencio y respeto. Gritar o tocar cosas sagradas es faltar el respeto.",
          },
          {
            id: "c43c-r4",
            mechanic: "orden",
            prompt: "Antes de viajar a Asia (o a cualquier país lejano):",
            question: "Ordena los pasos.",
            steps: [
              "Aprender saludos básicos en el idioma",
              "Investigar qué es respetuoso y qué no",
              "Empacar ropa adecuada al clima y cultura",
              "Llegar con mente abierta y curiosa",
            ],
            hint: "Idioma, costumbres, ropa, actitud.",
            explicacion:
              "Aprender saludos, investigar lo respetuoso, empacar bien y llegar con mente abierta. Con eso disfrutas más el viaje y respetas al lugar.",
          },
          {
            id: "c43c-r5",
            mechanic: "ia",
            prompt: "La IA te describe un país asiático que no conoces.",
            aiSays:
              "Ese país es peligroso y su gente es cerrada. Mejor no vayas.",
            question: "¿Le crees sin investigar?",
            options: [
              "Sí, la IA sabe",
              "No: verifico en fuentes serias (guías de viaje, personas que han ido) antes de creer un estereotipo",
              "Sí, mejor prevenir",
            ],
            answer:
              "No: verifico en fuentes serias (guías de viaje, personas que han ido) antes de creer un estereotipo",
            hint: "La IA puede repetir estereotipos aprendidos de datos viejos. ¿Cómo verificas?",
            explicacion:
              "Las IA repiten datos que a veces son prejuicios. Verificar con guías de viaje serias, foros de viajeros reales o embajadas es la forma correcta de decidir.",
          },
        ],
      },
    ],
  },
  {
    id: 44,
    world: 3,
    title: "África auténtica",
    emoji: "🦁",
    locked: false,
    intro:
      "África es un continente de 54 países, con ciudades modernas, historia milenaria y muchísima diversidad. Rompe los estereotipos que dan las películas.",
    cases: [
      {
        id: "c44-mitos",
        title: "Más allá del safari",
        emoji: "🌍",
        minutes: 5,
        brief:
          "En películas y videos, África se ve como un lugar salvaje. Pero es mucho más. Aprende la verdad.",
        retos: [
          {
            id: "c44m-r1",
            mechanic: "ia",
            prompt: "Un video viral dice:",
            aiSays:
              "En África la gente vive en cabañas, sin electricidad ni tecnología.",
            question: "¿Es cierto para todo el continente?",
            options: [
              "Sí, es África",
              "No: África tiene ciudades enormes con rascacielos (Nairobi, Lagos, El Cairo, Johannesburgo)",
              "Sí, casi todos",
            ],
            answer:
              "No: África tiene ciudades enormes con rascacielos (Nairobi, Lagos, El Cairo, Johannesburgo)",
            hint: "¿Has escuchado de Ciudad del Cabo? ¿Nairobi? ¿Lagos (Nigeria)? Son megaciudades modernas.",
            explicacion:
              "África tiene ciudades tan grandes como cualquier otra: Lagos (20+ millones), El Cairo, Johannesburgo. Los videos que muestran solo cabañas dan una imagen incompleta e injusta.",
          },
          {
            id: "c44m-r2",
            mechanic: "deduccion",
            prompt: "Pistas sobre un país africano:",
            clues: [
              "Su capital es El Cairo.",
              "Tiene las pirámides famosas del mundo.",
              "Lo atraviesa el río Nilo.",
            ],
            question: "¿Qué país es?",
            options: ["Marruecos", "Egipto", "Kenia"],
            answer: "Egipto",
            hint: "El Cairo + pirámides + Nilo: es obvio.",
            explicacion:
              "Egipto es uno de los países africanos más famosos. Tiene las pirámides (más de 4.500 años), el Nilo y una civilización milenaria.",
          },
          {
            id: "c44m-r3",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“África es la cuna de la humanidad:",
              "los humanos más antiguos vivieron en África.",
              "De ahí se expandieron por todo el planeta.",
              "Todos venimos de África, de alguna forma.”",
            ],
            question: "¿Qué significa “cuna de la humanidad”?",
            options: [
              "Que hay muchas cunas allí",
              "Que la humanidad nació ahí",
              "Que hay bebés",
            ],
            answer: "Que la humanidad nació ahí",
            hint: "El texto dice “los humanos más antiguos vivieron en África”. ¿Qué significa?",
            explicacion:
              "África es donde vivieron los primeros humanos hace 300.000 años. Todos los humanos actuales descendemos de esos ancestros africanos.",
          },
          {
            id: "c44m-r4",
            mechanic: "error",
            prompt: "Un turista dice:",
            clues: [
              "“África tiene 54 países.”",
              "“Es un continente enorme.”",
              "“Todos los africanos hablan el idioma africano.”",
              "“Hay más de 2.000 idiomas en África.”",
            ],
            question: "¿Qué frase se contradice con las demás?",
            options: [
              "“Todos hablan el idioma africano.”",
              "“54 países.”",
              "“2.000 idiomas.”",
            ],
            answer: "“Todos hablan el idioma africano.”",
            hint: "Si hay 2.000 idiomas, ¿puede haber “un solo” idioma africano?",
            explicacion:
              "África tiene más de 2.000 idiomas distintos: swahili, árabe, yoruba, zulú, amárico, y muchísimos más. “El idioma africano” no existe; es un mito.",
          },
          {
            id: "c44m-r5",
            mechanic: "orden",
            prompt: "Para conocer África de verdad (no por prejuicios):",
            question: "Ordena qué hacer.",
            steps: [
              "Buscar noticias y libros hechos por africanos",
              "Ver películas y música de directores africanos",
              "Escuchar a personas que han vivido ahí",
              "Ignorar los estereotipos de películas viejas",
            ],
            hint: "Noticias, cine y música africana, testimonios, ignorar estereotipos.",
            explicacion:
              "Buscar fuentes africanas (no solo occidentales), ver su cine y escuchar a quien ha vivido allí. Los estereotipos vienen de películas viejas y de películas que caricaturizan.",
          },
        ],
      },
      {
        id: "c44-historia",
        title: "La cuna de la humanidad",
        emoji: "🧬",
        minutes: 5,
        brief:
          "África tiene una historia riquísima. Descubre imperios, invenciones y personajes que no te contaron.",
        retos: [
          {
            id: "c44h-r1",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“En África hubo grandes imperios:",
              "el Imperio de Mali (siglo XIV, con la ciudad de Tombuctú),",
              "el Reino de Aksum (Etiopía, siglo I al VIII),",
              "y el Gran Zimbabue.",
              "Fueron ricos, con universidades y arte.”",
            ],
            question: "¿Qué había en Tombuctú?",
            options: [
              "Solo cabañas",
              "Ciudad rica del Imperio de Mali",
              "Un desierto sin gente",
            ],
            answer: "Ciudad rica del Imperio de Mali",
            hint: "El texto la menciona como parte del Imperio de Mali.",
            explicacion:
              "Tombuctú fue una ciudad rica y culta del Imperio de Mali. Tuvo una de las universidades más antiguas del mundo. África tuvo grandes civilizaciones antes de la colonización.",
          },
          {
            id: "c44h-r2",
            mechanic: "ia",
            prompt: "Una app te dice:",
            aiSays:
              "África no tiene historia importante, todo lo importante pasó en Europa.",
            question: "¿Es cierto?",
            options: [
              "Sí, todo importante fue en Europa",
              "No: África tuvo grandes imperios (Egipto, Mali, Aksum, Gran Zimbabue) miles de años antes de muchos europeos",
              "Sí, algo así",
            ],
            answer:
              "No: África tuvo grandes imperios (Egipto, Mali, Aksum, Gran Zimbabue) miles de años antes de muchos europeos",
            hint: "¿Egipto es de dónde? ¿Cuándo empezó?",
            explicacion:
              "África tiene 6.000+ años de historia registrada. Egipto es africano y anterior a Grecia y Roma. Mali fue enormemente rico. Los libros que ignoran esto están incompletos.",
          },
          {
            id: "c44h-r3",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "África tiene 54 países. Si conoces 4 (Egipto, Marruecos, Sudáfrica, Nigeria), ¿cuántos te faltan?",
                question: "¿Cuántos faltan?",
                options: ["48", "50", "52"],
                answer: "50",
                hint: "54 − 4.",
                explicacion: "54 − 4 = 50 países africanos por conocer.",
              },
              "10-12": {
                prompt: "África tiene 1.400 millones de habitantes. En 2050, se estima que serán 2.500 millones.",
                question: "¿Cuántos habitantes más habrá?",
                options: ["500 millones", "1.100 millones", "3.900 millones"],
                answer: "1.100 millones",
                hint: "2.500 − 1.400.",
                explicacion:
                  "2.500 − 1.400 = 1.100 millones más. África crecerá muchísimo en las próximas décadas y ganará importancia mundial.",
              },
            },
          },
          {
            id: "c44h-r4",
            mechanic: "deduccion",
            prompt: "Tres personas te describen África. Solo UNA da una imagen completa.",
            clues: [
              "A: “Solo se ven animales salvajes, no hay gente.”",
              "B: “Es un lugar donde solo hay pobreza.”",
              "C: “Es diversa: hay ciudades modernas, campo, historia rica y desafíos actuales, como cualquier continente.”",
            ],
            question: "¿Quién da la imagen más completa?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "¿Cuál mira África como es de verdad?",
            explicacion:
              "África es diversa: ciudades modernas, pueblos, historia, cultura, desafíos y logros. Como cualquier continente. Los estereotipos (solo animales, solo pobreza) son incompletos e injustos.",
          },
          {
            id: "c44h-r5",
            mechanic: "orden",
            prompt: "Para respetar y aprender sobre África:",
            question: "Ordena los pasos.",
            steps: [
              "Reconocer que “África” son 54 países distintos",
              "Aprender sobre su historia real (no solo desde Europa)",
              "Escuchar voces africanas actuales (artistas, escritores)",
              "Nunca reducirla a estereotipos",
            ],
            hint: "Reconocer diversidad, aprender historia real, escuchar voces actuales, no estereotipar.",
            explicacion:
              "Reconocer que son 54 países, aprender historia real, escuchar voces africanas y nunca reducir a estereotipos. Así se respeta un continente entero.",
          },
        ],
      },
    ],
  },
  {
    id: 45,
    world: 3,
    title: "Europa y sus historias",
    emoji: "🏰",
    locked: false,
    intro:
      "Europa es pequeña en tamaño pero enorme en historia, países y lenguas. Investígala sin idealizarla ni reducirla.",
    cases: [
      {
        id: "c45-ciudades",
        title: "Ciudades con historia",
        emoji: "🗼",
        minutes: 5,
        brief:
          "Cada capital europea tiene siglos de historia. Descúbrelas por sus pistas.",
        retos: [
          {
            id: "c45c-r1",
            mechanic: "deduccion",
            prompt: "Pistas sobre una ciudad:",
            clues: [
              "Es la capital de Francia.",
              "Tiene la Torre Eiffel.",
              "Es famosa por el arte y la moda.",
            ],
            question: "¿Qué ciudad es?",
            options: ["Roma", "Londres", "París"],
            answer: "París",
            hint: "Capital de Francia + Torre Eiffel: obvio.",
            explicacion:
              "París es la capital de Francia. La Torre Eiffel, el Louvre, Notre Dame están ahí. Es una de las ciudades más visitadas del mundo.",
          },
          {
            id: "c45c-r2",
            mechanic: "deduccion",
            prompt: "Otras pistas sobre otra ciudad:",
            clues: [
              "Es la capital de Italia.",
              "Tiene el Coliseo romano.",
              "Fue centro del Imperio Romano.",
            ],
            question: "¿Qué ciudad?",
            options: ["Madrid", "Roma", "Atenas"],
            answer: "Roma",
            hint: "Capital de Italia + Coliseo + Imperio Romano.",
            explicacion:
              "Roma fue el corazón del Imperio Romano hace 2.000 años. Hoy sigue siendo la capital italiana y guarda ruinas de esa historia.",
          },
          {
            id: "c45c-r3",
            mechanic: "orden",
            prompt: "Ordena estas ciudades europeas de oeste a este:",
            question: "Ordena.",
            steps: [
              "Lisboa (Portugal)",
              "Madrid (España)",
              "Roma (Italia)",
              "Atenas (Grecia)",
            ],
            hint: "Portugal está en el extremo oeste; Grecia en el este.",
            explicacion:
              "De oeste a este europeo: Lisboa, Madrid, Roma, Atenas. Cada capital una civilización milenaria distinta.",
          },
          {
            id: "c45c-r4",
            mechanic: "ia",
            prompt: "Una IA muy segura dice:",
            aiSays:
              "En Europa todos son ricos y viven bien.",
            question: "¿Es cierto?",
            options: [
              "Sí, Europa = riqueza",
              "No: Europa tiene países ricos y también pobreza, personas sin hogar, problemas sociales — como todos los continentes",
              "Sí, más o menos",
            ],
            answer:
              "No: Europa tiene países ricos y también pobreza, personas sin hogar, problemas sociales — como todos los continentes",
            hint: "¿Todos en Europa tienen la misma vida? ¿No hay problemas allí?",
            explicacion:
              "Europa tiene países ricos y pobres, gente con muchos recursos y gente con muy pocos. Es un continente diverso. Idealizar cualquier lugar (o pintarlo de mal) es simplificar.",
          },
          {
            id: "c45c-r5",
            mechanic: "matematico",
            byRoute: {
              "7-9": {
                prompt: "Europa tiene unos 44 países. Si visitas 4 al año, ¿en cuántos años los conoces todos?",
                question: "¿Cuántos años?",
                options: ["4", "11", "20"],
                answer: "11",
                hint: "44 ÷ 4.",
                explicacion: "44 ÷ 4 = 11 años. Con constancia se conoce todo un continente.",
              },
              "10-12": {
                prompt: "La Unión Europea tiene 27 países que usan el euro (no todos). Si Europa tiene 44 países, ¿qué porcentaje NO está en la UE (aprox)?",
                question: "¿Qué porcentaje?",
                options: ["30%", "39%", "50%"],
                answer: "39%",
                hint: "17 países no en la UE (44 − 27). 17 ÷ 44 × 100.",
                explicacion:
                  "17 ÷ 44 ≈ 0,39 = 39%. Muchos países europeos no están en la Unión Europea (Reino Unido salió, Suiza, Noruega nunca entraron, etc.).",
              },
            },
          },
        ],
      },
      {
        id: "c45-diversidad",
        title: "Diversidad europea",
        emoji: "🎭",
        minutes: 5,
        brief:
          "Europa parece pequeña pero tiene decenas de países, idiomas y culturas propias. Investiga.",
        retos: [
          {
            id: "c45d-r1",
            mechanic: "comprension",
            prompt: "Un texto dice:",
            clues: [
              "“En Europa se hablan más de 200 idiomas.",
              "Los más conocidos son el inglés, francés, alemán, español, italiano y portugués,",
              "pero también hay lenguas como el vasco, catalán, gaélico y muchísimas más.",
              "Cada país tiene su propia identidad.”",
            ],
            question: "¿Cuántos idiomas se hablan en Europa (aprox)?",
            options: ["6", "20", "más de 200"],
            answer: "más de 200",
            hint: "El texto lo dice claro: más de 200.",
            explicacion:
              "Europa es diversísima lingüísticamente. Más de 200 lenguas conviven en un continente relativamente pequeño. La lengua es identidad.",
          },
          {
            id: "c45d-r2",
            mechanic: "ia",
            prompt: "Una app dice:",
            aiSays:
              "En Europa todos hablan inglés. Es el idioma de allá.",
            question: "¿Es cierto?",
            options: [
              "Sí, inglés en toda Europa",
              "No: cada país tiene su idioma (francés en Francia, alemán en Alemania, italiano en Italia…) — el inglés es común como segundo idioma pero no es el propio",
              "Sí, es lo más práctico",
            ],
            answer:
              "No: cada país tiene su idioma (francés en Francia, alemán en Alemania, italiano en Italia…) — el inglés es común como segundo idioma pero no es el propio",
            hint: "¿En Italia hablan inglés como primer idioma? ¿En Francia?",
            explicacion:
              "En Europa cada país tiene su idioma. El inglés lo hablan muchos como segundo idioma, pero decir “todos hablan inglés” es despreciar la riqueza de idiomas y culturas propias.",
          },
          {
            id: "c45d-r3",
            mechanic: "patron",
            prompt: "Los idiomas europeos más hablados en número de hablantes:",
            clues: [
              "🇷🇺 Ruso → 🇩🇪 Alemán → 🇫🇷 Francés → 🇮🇹 Italiano → 🇪🇸 Español → 🇵🇹 Portugués → ❓",
            ],
            question: "¿Qué idioma completa la serie con menos hablantes que portugués?",
            options: ["Griego 🇬🇷", "Chino 🇨🇳", "Árabe"],
            answer: "Griego 🇬🇷",
            hint: "El patrón son idiomas europeos, no del resto del mundo.",
            explicacion:
              "El patrón son idiomas europeos ordenados por número de hablantes. Chino y árabe no son idiomas europeos originarios. Griego sí.",
          },
          {
            id: "c45d-r4",
            mechanic: "deduccion",
            prompt: "Tres europeos hablan sobre su continente. Solo UNO tiene la visión más completa.",
            clues: [
              "A: “Europa es solo Francia y Alemania.”",
              "B: “Europa es un lugar aburrido.”",
              "C: “Europa es diversa: 44 países, 200 lenguas, culturas y tradiciones distintísimas.”",
            ],
            question: "¿Quién tiene mejor visión?",
            options: ["A", "B", "C"],
            answer: "C",
            hint: "Reducir un continente entero a 2 países o llamarlo aburrido es simplificar demasiado.",
            explicacion:
              "C describe Europa como es de verdad: diversa. Reducirla a 2 países o llamarla aburrida es simplificar. Cada país europeo tiene su tesoro cultural.",
          },
          {
            id: "c45d-r5",
            mechanic: "orden",
            prompt: "Para valorar la diversidad europea (o de cualquier continente):",
            question: "Ordena.",
            steps: [
              "Aprender que hay muchos países, no uno solo",
              "Buscar la cultura y comida de cada país",
              "Escuchar la música y el arte propio",
              "Nunca decir “todos son iguales”",
            ],
            hint: "Muchos países, cultura, arte, no generalizar.",
            explicacion:
              "Reconocer diversidad, aprender cultura, escuchar arte y no generalizar. La misma receta sirve para respetar cualquier continente.",
          },
        ],
      },
    ],
  },
];

// Definición de los mundos. El niño progresa desde el Mundo 1; el 2 se
// desbloquea al completar todos los capítulos del anterior.
export const WORLDS = [
  {
    id: 1,
    title: "El mundo del misterio",
    subtitle: "Aprende a pensar como detective",
    emoji: "🕵️",
    intro:
      "Casos de misterio para entrenar deducción, lógica y criterio con la IA.",
  },
  {
    id: 2,
    title: "El explorador de la ciencia",
    subtitle: "Descubre cómo funciona todo",
    emoji: "🔬",
    intro:
      "Misterios de la ciencia: cuerpo, espacio, animales, océanos, energía y más.",
  },
  // --- Mundos futuros: aparecen en el mapa como "próximamente" hasta que se
  // les agregue contenido. Cada mundo mantiene un tema coherente con el arco
  // (pensar, explorar, decidir, respetar, crear). ---
  {
    id: 3,
    title: "El viajero del mundo",
    subtitle: "Culturas, geografía y respeto por lo diferente",
    emoji: "✈️",
    intro:
      "Recorre países y culturas del mundo. Aprende geografía, historias reales y a valorar lo distinto.",
  },
  {
    id: 4,
    title: "El creador de arte",
    subtitle: "Música, dibujo, escritura y expresión",
    emoji: "🎨",
    intro:
      "El arte también se piensa. Descubre música, dibujo, escritura y cómo expresar lo que sientes.",
  },
  {
    id: 5,
    title: "El emprendedor",
    subtitle: "Dinero, decisiones y crear valor sin engañar",
    emoji: "💼",
    intro:
      "Aprende cómo funciona el dinero, cómo se toman buenas decisiones y cómo crear cosas útiles sin engañar a nadie.",
  },
  {
    id: 6,
    title: "El ciudadano",
    subtitle: "Convivencia, derechos y responsabilidades",
    emoji: "🗳️",
    intro:
      "Vivir con otros es un arte. Aprende derechos, deberes, cómo se toman decisiones colectivas y cómo alzar tu voz con respeto.",
  },
  {
    id: 7,
    title: "El viajero del tiempo",
    subtitle: "Historia y lo que aprendemos del pasado",
    emoji: "📜",
    intro:
      "El pasado enseña a no repetir errores. Recorre momentos clave de la historia y descubre patrones que se repiten.",
  },
  {
    id: 8,
    title: "El deportista",
    subtitle: "Cuerpo, mente, disciplina y equipo",
    emoji: "⚽",
    intro:
      "El deporte entrena cuerpo y mente. Aprende sobre esfuerzo, superación, trabajo en equipo y saber ganar y perder.",
  },
  {
    id: 9,
    title: "El inventor del mañana",
    subtitle: "Crear soluciones nuevas al mundo real",
    emoji: "🔧",
    intro:
      "Inventar es resolver problemas de la gente. Aprende el método de diseño y a mejorar lo que ya existe.",
  },
  {
    id: 10,
    title: "El maestro",
    subtitle: "Enseñar es la mejor forma de aprender",
    emoji: "🌟",
    intro:
      "El último mundo. Ya sabes tanto que puedes enseñar. El maestro aprende enseñando y comparte con humildad.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Ruta de edad del niño a partir del onboarding. Dos rutas (informe): 7-9 y 10-12.
export function routeFromProfile(p = {}) {
  return p?.onboarding?.ageBand === "10-12" ? "10-12" : "7-9";
}

// Resuelve un reto a su forma concreta según la ruta (aplica `byRoute` si existe)
// y le añade la habilidad derivada de su mecánica.
export function resolveReto(reto, route = "7-9") {
  const variant = reto.byRoute ? reto.byRoute[route] || reto.byRoute["7-9"] : {};
  const merged = { ...reto, ...variant };
  delete merged.byRoute;
  merged.skill = MECHANIC_SKILL[merged.mechanic];
  return merged;
}

// Todos los casos jugables (de capítulos desbloqueados), en orden.
export const CASES = CHAPTERS.filter((c) => !c.locked).flatMap((ch) =>
  ch.cases.map((cs) => ({ ...cs, chapter: ch.id })),
);

export function getCase(id) {
  return CASES.find((c) => c.id === id) || null;
}

// ¿Cuántos casos tiene un capítulo? (para medallas y progreso)
export function chapterCaseCount(chapterId) {
  const ch = CHAPTERS.find((c) => c.id === chapterId);
  return ch?.cases?.length || 0;
}

// Progreso del mundo. Recibe el progreso del niño ({ cases }). Devuelve una
// lista de MUNDOS, cada uno con sus capítulos y casos con estado (bloqueado
// /desbloqueado/completado). Los casos se desbloquean en orden dentro de un
// capítulo; un capítulo se desbloquea cuando el anterior está completo; y el
// Mundo 2 se desbloquea al completar TODOS los capítulos del Mundo 1.
export function worldProgress(p = {}) {
  const casesState = p.cases || {};

  // Procesa un mundo: devuelve sus capítulos con estado + si el mundo entero
  // está completo (para desbloquear el siguiente).
  function processWorld(worldId, worldUnlocked) {
    const raw = CHAPTERS.filter((c) => (c.world || 1) === worldId);
    let prevChapterDone = true; // el primer capítulo del mundo siempre disponible
    let allDone = raw.length > 0;

    const chapters = raw.map((ch) => {
      const chapterUnlocked = worldUnlocked && !ch.locked && prevChapterDone;
      let prevCaseDone = true;
      const cases = (ch.cases || []).map((cs) => {
        const state = casesState[cs.id] || {};
        const completed = !!state.completed;
        const unlocked = chapterUnlocked && prevCaseDone;
        const retosTotal = (cs.retos || []).length;
        const partial = completed
          ? retosTotal
          : Math.min(retosTotal, state.inProgress?.results?.length || 0);
        prevCaseDone = completed;
        return {
          ...cs,
          chapter: ch.id,
          completed,
          unlocked,
          partial,
          retosTotal,
        };
      });
      const total = cases.length;
      const done = cases.filter((c) => c.completed).length;
      const chapterDone = total > 0 && done === total;
      if (!ch.locked) prevChapterDone = chapterDone;
      if (!chapterDone) allDone = false;
      return {
        ...ch,
        unlocked: chapterUnlocked,
        cases,
        total,
        done,
        chapterDone,
        medal: chapterDone,
      };
    });

    return { chapters, allDone };
  }

  const worlds = [];
  let nextUnlocked = true; // el Mundo 1 siempre está disponible
  for (const w of WORLDS) {
    const { chapters, allDone } = processWorld(w.id, nextUnlocked);
    const comingSoon = chapters.length === 0; // sin contenido = próximamente
    worlds.push({
      ...w,
      unlocked: !comingSoon && nextUnlocked,
      comingSoon,
      chapters,
      chaptersDone: chapters.filter((c) => c.chapterDone).length,
      chaptersTotal: chapters.length,
      worldDone: !comingSoon && allDone,
    });
    // Un mundo "próximamente" NO bloquea al siguiente: si un futuro Mundo 3
    // se anuncia sin contenido, el niño puede completar el Mundo 1 y ver el 2
    // desbloqueado normalmente. Solo los mundos con contenido siguen la
    // progresión secuencial.
    if (!comingSoon) {
      nextUnlocked = allDone;
    }
  }

  // Compatibilidad: `chapters` plano (para código viejo que lo consuma).
  const chapters = worlds.flatMap((w) => w.chapters);
  return { worlds, chapters };
}

// Siguiente caso recomendado: el primero desbloqueado sin completar (recorre
// los mundos en orden). Si el niño completó todo, sugiere repetir el primero.
export function recommendedCase(p = {}) {
  const { worlds } = worldProgress(p);
  for (const w of worlds) {
    if (!w.unlocked) continue;
    for (const ch of w.chapters) {
      const next = ch.cases.find((c) => c.unlocked && !c.completed);
      if (next) return next;
    }
  }
  return CASES[0] || null;
}

// Total de retos resueltos (suma de intentos completados por caso × su nº de retos).
export function retosSolvedTotal(p = {}) {
  const casesState = p.cases || {};
  return Object.entries(casesState).reduce((sum, [id, s]) => {
    if (!s?.completed) return sum;
    const cs = getCase(id);
    return sum + (cs?.retos?.length || 0) * Math.max(1, s.plays || 1);
  }, 0);
}

export function casesCompletedCount(p = {}) {
  return Object.values(p.cases || {}).filter((s) => s?.completed).length;
}

export function chaptersCompletedCount(p = {}) {
  return worldProgress(p).chapters.filter((c) => c.chapterDone).length;
}

// Porcentaje por habilidad (con un prior suave para que 1 acierto no marque
// 100% con muy poca evidencia). Devuelve { deduccion: %, ... }.
export function skillPercents(skills = {}) {
  const out = {};
  for (const id of Object.keys(SKILLS)) {
    const s = skills[id] || { correct: 0, total: 0 };
    out[id] =
      s.total > 0 ? Math.round(((s.correct + 1) / (s.total + 2)) * 100) : 0;
  }
  return out;
}

// Recomendación en lenguaje claro para el panel de padres, según fortalezas y
// debilidades por habilidad. Sin jerga.
export function summarizeSkills(percents, name) {
  const who = name || "Tu hijo";
  const entries = Object.entries(percents).filter(([, v]) => v > 0);
  if (entries.length === 0) {
    return `${who} apenas está abriendo su primer caso. Cada reto que resuelva irá llenando este panel.`;
  }
  const strongest = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const weakest = entries.reduce((a, b) => (b[1] < a[1] ? b : a));
  const sName = SKILLS[strongest[0]].name.toLowerCase();
  if (strongest[0] === weakest[0]) {
    return `${who} va parejo en las habilidades que ha practicado. Sigue resolviendo casos para afianzarlas.`;
  }
  const wName = SKILLS[weakest[0]].name.toLowerCase();
  return `${who} brilla en ${sName} 🕵️. Su próximo reto es ${wName}: los siguientes casos le pondrán más retos de ese tipo para reforzarla.`;
}

// Medallas del detective: se calculan al vuelo desde el progreso.
export function medals({
  casesDone = 0,
  chaptersDone = 0,
  streak = 0,
  playerLevel = 1,
} = {}) {
  return [
    { id: "first", emoji: "🔍", label: "Primer caso", earned: casesDone >= 1 },
    { id: "chapter", emoji: "🏅", label: "Capítulo resuelto", earned: chaptersDone >= 1 },
    { id: "cases5", emoji: "🗂️", label: "5 casos", earned: casesDone >= 5 },
    { id: "streak3", emoji: "🔥", label: "Racha de 3", earned: streak >= 3 },
    { id: "streak7", emoji: "⚡", label: "Racha de 7", earned: streak >= 7 },
    { id: "pl5", emoji: "🧭", label: "Detective nivel 5", earned: playerLevel >= 5 },
    { id: "pl10", emoji: "🌟", label: "Detective nivel 10", earned: playerLevel >= 10 },
    { id: "pl20", emoji: "👑", label: "Detective nivel 20", earned: playerLevel >= 20 },
  ];
}
