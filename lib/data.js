// Biblioteca de contenido de Leo.
//
// Cada cuento es un texto curado por NIVEL DE LECTURA, con preguntas en los tres
// niveles de comprensión (literal, inferencial, crítico). Las pistas son
// socráticas: guían a releer, NUNCA dan la respuesta.
//
// `evidence` indica en qué párrafo está la pista de una pregunta literal o
// inferencial. Se usa para resaltar el texto cuando el niño se equivoca, y así
// enseñarle a "volver a leer y buscar la prueba" (look-back).
//
// En producción esto vendría de tu base de datos / CMS; mantenemos español
// neutro para escalar a toda LatAm.

export const LEVEL_INFO = {
  literal: {
    name: "Literal",
    color: "teal",
    desc: "Encuentra información que está escrita tal cual en el texto.",
  },
  inferencial: {
    name: "Inferencial",
    color: "grape",
    desc: "Deduce ideas que el texto no dice de forma directa.",
  },
  critico: {
    name: "Crítico",
    color: "coral",
    desc: "Opina y juzga lo que lee, con argumentos propios.",
  },
};

// Niveles de lectura: la escalera de aprendizaje. El niño avanza de uno al
// siguiente a medida que domina cuentos del nivel actual.
export const READING_LEVELS = [
  {
    level: 1,
    name: "Primeros lectores",
    tag: "Fácil",
    emoji: "🌱",
    desc: "Cuentos cortos con ideas claras. Practica encontrar lo que el texto dice.",
  },
  {
    level: 2,
    name: "Lectores en marcha",
    tag: "Medio",
    emoji: "🚀",
    desc: "Textos un poco más largos. Empieza a deducir y a explicar con tus palabras.",
  },
  {
    level: 3,
    name: "Lectores expertos",
    tag: "Difícil",
    emoji: "🏆",
    desc: "Historias con más matices. Deduce, opina y defiende tus ideas con razones.",
  },
];

// La dificultad del cuento define a qué nivel de lectura pertenece.
const DIFFICULTY_TO_LEVEL = { "Fácil": 1, "Medio": 2, "Difícil": 3 };
export const DIFFICULTY_ORDER = { "Fácil": 0, "Medio": 1, "Difícil": 2 };

export function storyReadingLevel(story) {
  return DIFFICULTY_TO_LEVEL[story.difficulty] || 1;
}

export const stories = [
  {
    id: "leon",
    title: "El león que no quería rugir",
    topic: "Animales",
    emoji: "🦁",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En la sabana vivía un león pequeño llamado Tomás. Todos los leones de su familia tenían un rugido fuerte y valiente. Pero Tomás tenía miedo de rugir, porque pensaba que su voz sonaba muy chistosa.",
      "Un día, una manada de hienas se acercó al río donde bebían los animales más pequeños. Las cebras y las gacelas estaban asustadas y no sabían qué hacer. Nadie se atrevía a enfrentarse a las hienas.",
      "Tomás sintió que el corazón le latía muy rápido. Aunque tenía miedo, no quería que sus amigos salieran lastimados. Respiró profundo, se subió a una roca y soltó el rugido más grande de toda su vida.",
      "Las hienas se asustaron tanto que salieron corriendo. Todos los animales celebraron a Tomás. Ese día él entendió algo importante: ser valiente no es no tener miedo, sino hacer lo correcto aunque tengamos miedo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Tomás tenía miedo de rugir al comienzo del cuento?",
        options: [
          "Porque pensaba que su voz sonaba chistosa",
          "Porque no sabía cómo hacerlo",
          "Porque era demasiado pequeño",
          "Porque las hienas lo asustaban",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Esa respuesta está escrita al comienzo. ¿Qué pensaba Tomás sobre su propia voz?",
          "Vuelve a leer el primer párrafo: dice qué creía Tomás de cómo sonaba su voz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tomás decidió rugir aunque tenía miedo?",
        options: [
          "Porque quería ser el león más fuerte",
          "Porque no quería que sus amigos salieran lastimados",
          "Porque las hienas se lo pidieron",
          "Porque su familia lo obligó",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: tienes que deducirlo. ¿Qué le importaba a Tomás en ese momento?",
          "Relee el tercer párrafo. ¿En quién pensó Tomás justo antes de subirse a la roca?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que ser valiente es hacer lo correcto aunque tengamos miedo. ¿Estás de acuerdo? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. Tomás sintió miedo y aun así actuó por sus amigos. ¿Te ha pasado que hiciste algo valiente aunque estabas nervioso?",
          "Muy buena reflexión. No hay una sola respuesta correcta aquí: lo importante es que defiendas tu idea con razones. ¿Qué crees que habría pasado si Tomás no hubiera rugido?",
        ],
      },
    ],
  },

  {
    id: "tortuga",
    title: "La tortuga que cruzó el océano",
    topic: "Mar",
    emoji: "🐢",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Maya era una tortuga marina que nació en una playa de arena tibia. Apenas salió del cascarón, supo que tenía que llegar al mar antes de que saliera el sol, cuando las gaviotas empiezan a buscar comida.",
      "El mar la llevó muy lejos. Maya nadó durante meses siguiendo las corrientes frías y las cálidas. Comía medusas y descansaba flotando bajo la luna. A veces se sentía sola, pero nunca dejó de avanzar.",
      "Pasaron muchos años. Maya creció hasta ser tan grande como una mesa. Un día sintió algo en su interior: era hora de volver. Sin un mapa y sin que nadie se lo enseñara, encontró el camino de regreso.",
      "Llegó a la misma playa donde había nacido. Allí puso sus propios huevos en la arena tibia, igual que su mamá lo había hecho. El viaje de Maya empezaba otra vez, ahora con sus crías.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Maya tenía que llegar al mar antes de que saliera el sol?",
        options: [
          "Porque el agua estaba más fría",
          "Porque las gaviotas salen a buscar comida",
          "Porque su mamá la esperaba",
          "Porque de día no podía nadar",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "La razón está escrita en el primer párrafo. ¿Qué hacen las gaviotas cuando sale el sol?",
          "Relee el comienzo: dice qué peligro aparece cuando amanece.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué nos quiere decir que Maya encontró el camino “sin un mapa y sin que nadie se lo enseñara”?",
        options: [
          "Que se perdió varias veces",
          "Que llevaba el rumbo dentro de sí, por instinto",
          "Que otra tortuga la guió",
          "Que el viaje fue muy corto",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Eso no se explica directamente, hay que deducirlo. Si nadie le enseñó, ¿de dónde sacó el rumbo?",
          "Piensa: ¿cómo puede un animal saber un camino que nunca aprendió? Relee el tercer párrafo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Maya volvió justo al lugar donde nació. ¿Crees que es importante volver al lugar de donde uno viene? Cuéntame por qué.",
        replies: [
          "Qué linda manera de verlo. Cada quien siente distinto sobre sus raíces. ¿A ti qué lugar te hace sentir en casa?",
          "Muy buen argumento. Lo importante es que lo explicaste con razones. ¿Crees que Maya habría sido feliz si se hubiera quedado lejos para siempre?",
        ],
      },
    ],
  },

  {
    id: "futbol",
    title: "El gol que nadie esperaba",
    topic: "Fútbol",
    emoji: "⚽",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Sofía era la más bajita del equipo. Casi siempre la dejaban en la banca, mirando el partido desde afuera. Aun así, llegaba temprano a cada entrenamiento y era la última en irse.",
      "En la final, el equipo perdía uno a cero y faltaban dos minutos. El entrenador miró la banca, dudó un segundo y dijo: «Sofía, entra». Sus compañeros se sorprendieron, pero ella corrió a la cancha sin pensarlo.",
      "El balón le llegó casi por casualidad, lejos del arco. En vez de pasarlo, Sofía recordó las mil veces que había practicado sola. Pateó con todas sus fuerzas y el balón voló por encima del portero.",
      "¡Gol! El partido terminó empatado y luego su equipo ganó en los penales. Nadie volvió a decir que Sofía era “muy pequeña para jugar”. Ella aprendió que practicar en silencio también vale.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Sofía aunque casi siempre la dejaban en la banca?",
        options: [
          "Se quejaba con el entrenador",
          "Llegaba temprano y se iba de última al entrenar",
          "Cambiaba de equipo",
          "Dejaba de entrenar",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito en el primer párrafo. ¿Cómo era Sofía con los entrenamientos?",
          "Relee el comienzo: dice a qué hora llegaba y a qué hora se iba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Sofía pudo hacer ese gol tan difícil?",
        options: [
          "Porque tuvo pura suerte",
          "Porque había practicado muchísimo por su cuenta",
          "Porque el portero se cayó",
          "Porque el arco estaba vacío",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no usa la palabra “por eso”, hay que deducirlo. ¿Qué recordó Sofía justo antes de patear?",
          "Relee el tercer párrafo: menciona las “mil veces” que hizo algo. ¿Qué fue?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El entrenador casi siempre dejaba a Sofía en la banca. ¿Te parece justo cómo la trataron antes de la final? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en lo que es justo y lo explicaste. ¿Qué habrías hecho tú si fueras el entrenador?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo valioso es que la defiendes. ¿Crees que a veces juzgamos a alguien solo por su tamaño o su edad?",
        ],
      },
    ],
  },

  {
    id: "perro",
    title: "El perro que aprendió a esperar",
    topic: "Animales",
    emoji: "🐶",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Lucas tenía un perro llamado Rayo. A Rayo le encantaba la comida y, cuando le servían su plato, quería comer de inmediato. Pero siempre tumbaba el tazón con las patas y la comida caía al piso.",
      "Lucas le enseñó un truco: antes de comer, Rayo debía sentarse y esperar a que él dijera “¡Ya!”. Al principio fue difícil, porque Rayo movía la cola y se paraba sin aguantar.",
      "Con práctica, Rayo aprendió a esperar sentadito hasta la señal. Desde entonces ya no regaba la comida y comía tranquilo. Lucas entendió que esperar un poquito a veces hace las cosas mejor.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Rayo cuando le servían el plato al principio?",
        options: [
          "Tumbaba el tazón y regaba la comida",
          "Se iba a dormir",
          "Ladraba sin parar",
          "Escondía la comida",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Eso está escrito en el primer párrafo. ¿Qué pasaba con el tazón?",
          "Relee el comienzo: dice qué hacía Rayo con las patas y dónde caía la comida.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Rayo dejó de regar la comida?",
        options: [
          "Porque aprendió a esperar la señal sentado",
          "Porque le dieron menos comida",
          "Porque ya no tenía hambre",
          "Porque le cambiaron el tazón",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué aprendió Rayo a hacer?",
          "Relee el final: ¿qué cambió en Rayo después de tanta práctica?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que vale la pena aprender a esperar, como Rayo? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en para qué sirve esperar y lo explicaste. ¿Hay algo que a ti te cueste esperar?",
          "Me gusta tu razonamiento. No hay una sola respuesta: lo importante son tus motivos. ¿Qué cosas salen mejor cuando tenemos paciencia?",
        ],
      },
    ],
  },

  {
    id: "girasol",
    title: "La semilla de girasol",
    topic: "Naturaleza",
    emoji: "🌻",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Sofía sembró una semilla de girasol en una maceta. Su abuela le dijo que tuviera paciencia, porque las plantas no crecen de un día para otro.",
      "Sofía regaba la semilla cada mañana y la ponía cerca de la ventana para que le diera el sol. Pasaron muchos días y no veía nada. A veces pensaba que la semilla no iba a crecer.",
      "Una mañana, por fin, apareció un pequeño brote verde. Con el tiempo creció hasta convertirse en un girasol enorme que miraba al sol. Sofía aprendió que las cosas buenas toman tiempo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Sofía cada mañana con la semilla?",
        options: [
          "La regaba y la ponía cerca de la ventana",
          "La cambiaba de maceta",
          "La tapaba con una tela",
          "La sacaba a pasear",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está escrito en el segundo párrafo. ¿Qué hacía Sofía todas las mañanas?",
          "Relee dónde ponía la semilla y qué le echaba cada día.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la abuela le dijo que tuviera paciencia?",
        options: [
          "Porque las plantas tardan en crecer",
          "Porque la semilla estaba dañada",
          "Porque no había sol",
          "Porque la maceta era muy pequeña",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "No se explica directo: piénsalo. ¿Cuánto tardó en salir el brote?",
          "Relee el final: ¿qué aprendió Sofía sobre las cosas buenas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿A ti te parece fácil o difícil tener paciencia? Cuéntame por qué.",
        replies: [
          "Qué sincera tu respuesta. Pensaste en cómo te sientes y lo explicaste. ¿Qué te ayuda a esperar cuando algo tarda?",
          "Muy bien. No hay respuesta correcta: lo valioso es que la defiendes. ¿Crees que la paciencia se puede practicar, como Sofía con su planta?",
        ],
      },
    ],
  },

  {
    id: "globo",
    title: "El globo rojo",
    topic: "Amistad",
    emoji: "🎈",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "A Martín le regalaron un globo rojo en la feria. Era su favorito y no quería soltarlo por nada del mundo. Lo amarró a su muñeca con un hilo para no perderlo.",
      "Mientras caminaba, vio a una niña pequeña llorando porque su globo se había volado. Martín sintió pena por ella y pensó en lo feliz que estaba él con el suyo.",
      "Después de dudar un momento, Martín le regaló su globo rojo a la niña. Ella sonrió enorme y dejó de llorar. Martín se quedó sin globo, pero se sintió contento por dentro.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué la niña pequeña estaba llorando?",
        options: [
          "Porque su globo se había volado",
          "Porque se cayó al piso",
          "Porque tenía hambre",
          "Porque se perdió",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "La razón está en el segundo párrafo. ¿Qué le pasó a su globo?",
          "Relee cuando Martín la ve: dice qué le había pasado a la niña.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Martín se sintió contento aunque se quedó sin globo?",
        options: [
          "Porque hizo feliz a la niña",
          "Porque le iban a dar otro",
          "Porque el globo le molestaba",
          "Porque ya no le gustaba",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Eso no se dice directo: hay que deducirlo. ¿Qué pasó con la niña gracias a Martín?",
          "Relee el final: ¿cómo reaccionó la niña y cómo se sintió Martín por dentro?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Tú habrías regalado tu globo favorito como Martín? Cuéntame por qué.",
        replies: [
          "Gran respuesta. Te pusiste en el lugar de Martín y diste tus razones. ¿Cómo te sientes cuando ayudas a alguien?",
          "Muy bien defendido. No hay una sola respuesta. ¿Crees que dar algo que uno quiere mucho vale más que dar algo cualquiera?",
        ],
      },
    ],
  },

  {
    id: "gallina",
    title: "La gallina valiente",
    topic: "Animales",
    emoji: "🐔",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En la granja vivía una gallina llamada Pepa. Era pequeña y las demás gallinas se reían de ella por su tamaño. Pepa prefería quedarse callada en un rincón.",
      "Una tarde, un zorro entró al gallinero buscando huevos. Todas las gallinas corrieron asustadas sin saber qué hacer. Pepa, aunque tenía miedo, batió sus alas y cacareó muy fuerte.",
      "El ruido despertó al granjero, que llegó corriendo y espantó al zorro. Desde ese día, nadie volvió a reírse de Pepa. Ella demostró que ser pequeña no es lo mismo que ser débil.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué las otras gallinas se reían de Pepa?",
        options: [
          "Por su tamaño pequeño",
          "Porque no ponía huevos",
          "Porque era muy ruidosa",
          "Porque dormía mucho",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo era Pepa comparada con las demás?",
          "Relee el comienzo: dice de qué se reían las otras gallinas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué llegó el granjero a espantar al zorro?",
        options: [
          "Porque el cacareo de Pepa lo despertó",
          "Porque vio al zorro desde lejos",
          "Porque era de día",
          "Porque las gallinas lo llamaron",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: ¿qué hizo Pepa justo antes de que llegara el granjero?",
          "Relee el final y el ruido que hizo Pepa. ¿Qué provocó ese ruido?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que ser pequeña no es lo mismo que ser débil. ¿Estás de acuerdo? ¿Por qué?",
        replies: [
          "Qué buena postura. Pensaste en qué significa ser fuerte y lo argumentaste. ¿Conoces a alguien pequeño pero muy valiente?",
          "Muy bien razonado. No hay respuesta única: lo importante son tus razones. ¿Crees que la valentía depende del tamaño?",
        ],
      },
    ],
  },

  {
    id: "charco",
    title: "El charco después de la lluvia",
    topic: "Colegio",
    emoji: "☔",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Después de la lluvia, quedó un gran charco en el patio del colegio. Los niños lo miraban sin saber si saltarlo o darle la vuelta. A nadie le gustaba mojarse los zapatos.",
      "Valeria no lo pensó dos veces y empezó a saltar sobre el charco con sus botas de caucho. Las gotas volaban por todos lados y ella se reía muy fuerte.",
      "Al ver lo divertida que estaba, los demás niños se pusieron sus botas y se unieron a saltar. El charco que nadie quería se convirtió en el mejor juego del recreo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué se puso Valeria para saltar en el charco?",
        options: [
          "Botas de caucho",
          "Sandalias",
          "Tenis nuevos",
          "Solo las medias",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Con qué saltaba Valeria?",
          "Relee cuando Valeria empieza a saltar: dice qué llevaba en los pies.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los demás niños se unieron a saltar?",
        options: [
          "Porque vieron lo divertida que estaba Valeria",
          "Porque la profesora los obligó",
          "Porque dejó de llover",
          "Porque tenían mucho calor",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "No se dice directo: hay que deducirlo. ¿Qué vieron los niños antes de unirse?",
          "Relee el final: ¿cómo se veía Valeria mientras saltaba?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que a veces hay que atreverse primero, como Valeria? Cuéntame por qué.",
        replies: [
          "Me gusta cómo lo piensas. Diste tus razones sobre atreverse. ¿Te has atrevido a algo y luego te alegraste?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué crees que pasa cuando alguien se anima primero y los demás lo ven?",
        ],
      },
    ],
  },

  {
    id: "cumple",
    title: "El cumpleaños sorpresa",
    topic: "Familia",
    emoji: "🎂",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Era el cumpleaños de mamá y Daniel quería darle una sorpresa. No tenía dinero para un regalo, así que pensó en algo que pudiera hacer él mismo.",
      "Muy temprano, antes de que mamá despertara, Daniel preparó el desayuno con ayuda de su papá. Puso una flor del jardín en la mesa y dibujó una tarjeta con muchos colores.",
      "Cuando mamá vio todo, los ojos se le llenaron de lágrimas de felicidad. Le dijo a Daniel que era el mejor regalo que le habían dado. A veces, lo hecho con cariño vale más que lo comprado.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué preparó Daniel antes de que mamá despertara?",
        options: [
          "El desayuno",
          "Un pastel comprado",
          "Una fiesta con amigos",
          "Un viaje",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Qué hizo Daniel muy temprano?",
          "Relee lo que hizo con ayuda de su papá antes de que mamá se levantara.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a mamá se le llenaron los ojos de lágrimas?",
        options: [
          "Porque se emocionó con el detalle de Daniel",
          "Porque estaba triste",
          "Porque el desayuno estaba malo",
          "Porque se despertó muy tarde",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Eran lágrimas de felicidad: piénsalo. ¿Qué acababa de ver mamá?",
          "Relee el final: ¿qué le dijo mamá a Daniel sobre su regalo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que un regalo hecho a mano puede valer más que uno comprado? ¿Por qué?",
        replies: [
          "Linda reflexión. Pensaste en qué le da valor a un regalo. ¿Has hecho un regalo con tus propias manos?",
          "Muy bien argumentado. No hay respuesta única: lo importante son tus razones. ¿Qué crees que sintió Daniel al ver feliz a su mamá?",
        ],
      },
    ],
  },

  {
    id: "gato",
    title: "El gato en el árbol",
    topic: "Animales",
    emoji: "🐱",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "El gato Michi se subió a lo más alto de un árbol persiguiendo una mariposa. Cuando quiso bajar, se dio cuenta de que estaba muy alto y le dio miedo.",
      "Maitê, una niña del vecindario, lo escuchó maullar. En vez de subir al árbol, que era peligroso, fue a buscar a un bombero que vivía en la esquina.",
      "El bombero trajo una escalera y bajó a Michi sano y salvo. Maitê aprendió que pedir ayuda no es de cobardes, sino de personas inteligentes.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Michi se subió al árbol?",
        options: [
          "Persiguiendo una mariposa",
          "Huyendo de un perro",
          "Buscando comida",
          "Para jugar con Maitê",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Detrás de qué iba Michi?",
          "Relee el comienzo: dice qué perseguía el gato hasta arriba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Maitê no subió ella misma al árbol?",
        options: [
          "Porque era peligroso y mejor buscó ayuda",
          "Porque no le importaba el gato",
          "Porque no sabía caminar",
          "Porque tenía pereza",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El cuento da una pista: ¿cómo era subir al árbol?",
          "Relee el segundo párrafo: dice por qué Maitê fue a buscar a alguien.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Estás de acuerdo con que pedir ayuda es de personas inteligentes? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en lo que significa pedir ayuda y lo explicaste. ¿Cuándo has pedido ayuda y te sirvió?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que habría pasado si Maitê intentaba subir sola al árbol?",
        ],
      },
    ],
  },

  {
    id: "carta",
    title: "La carta para la abuela",
    topic: "Familia",
    emoji: "✉️",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "La abuela de Tomás vivía en otra ciudad y él la extrañaba mucho. No podían verse seguido, y a Tomás le daba tristeza.",
      "Su mamá le dio una idea: escribirle una carta. Tomás le contó cómo le iba en el colegio, le hizo un dibujo y hasta le mandó una hoja seca de su árbol favorito.",
      "Unos días después, la abuela lo llamó feliz. Le dijo que había leído la carta tres veces y que la había guardado en su mesita. Tomás descubrió una forma de estar cerca aunque estuvieran lejos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le mandó Tomás a la abuela dentro de la carta?",
        options: [
          "Un dibujo y una hoja seca de su árbol",
          "Una foto y dinero",
          "Un juguete",
          "Un chocolate",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Qué cosas metió Tomás en la carta?",
          "Relee lo que Tomás le contó y le envió a la abuela.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la abuela leyó la carta tres veces?",
        options: [
          "Porque le gustó mucho y la hizo feliz",
          "Porque no entendía la letra",
          "Porque era muy larga",
          "Porque estaba aburrida",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "No se dice directo: dedúcelo. ¿Cómo estaba la abuela cuando llamó?",
          "Relee el final: ¿qué hizo la abuela con la carta además de leerla varias veces?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que escribir cartas sigue siendo una buena idea hoy? Cuéntame por qué.",
        replies: [
          "Qué buena reflexión. Pensaste en el valor de una carta y lo explicaste. ¿A quién te gustaría escribirle una?",
          "Muy bien defendido. No hay respuesta única. ¿Qué tiene una carta que quizás no tiene un mensaje rápido por el celular?",
        ],
      },
    ],
  },

  {
    id: "helado",
    title: "El helado que se derritió",
    topic: "Verano",
    emoji: "🍦",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Camilo se compró un helado de chocolate en un día muy caluroso. Estaba tan contento mirándolo que se olvidó de comerlo rápido.",
      "Se quedó hablando con un amigo y, sin darse cuenta, el helado empezó a derretirse. Gota a gota, cayó sobre su mano y luego al piso.",
      "Cuando volvió a mirar, casi no quedaba helado. Camilo se rió de sí mismo y entendió que algunas cosas hay que disfrutarlas a tiempo, antes de que se acaben.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De qué sabor era el helado de Camilo?",
        options: ["De chocolate", "De vainilla", "De fresa", "De limón"],
        correct: 0,
        evidence: 0,
        hints: [
          "El dato está en el primer párrafo. ¿Qué helado se compró Camilo?",
          "Relee el comienzo: ahí dice el sabor exacto del helado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué se derritió el helado?",
        options: [
          "Porque hacía calor y Camilo se distrajo hablando",
          "Porque era muy grande",
          "Porque lo metió al sol a propósito",
          "Porque estaba viejo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une dos pistas: ¿cómo estaba el día y qué hacía Camilo mientras tanto?",
          "Relee: estaba caluroso y Camilo se quedó haciendo algo en vez de comer.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Estás de acuerdo con que algunas cosas hay que disfrutarlas a tiempo? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en aprovechar los momentos y lo explicaste. ¿Qué cosas te gusta disfrutar sin apuro?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué otra cosa, además de un helado, se puede perder si uno espera demasiado?",
        ],
      },
    ],
  },

  {
    id: "pez",
    title: "El pez que quería volar",
    topic: "Mar",
    emoji: "🐟",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En el fondo del mar vivía un pececito llamado Coral que soñaba con volar como las gaviotas. Sus amigos le decían que eso era imposible para un pez.",
      "Coral no se rindió. Un día vio cómo los peces voladores saltaban fuera del agua y planeaban un ratito por el aire antes de caer. Decidió practicar saltos cada tarde.",
      "Nunca llegó a volar como un ave, pero aprendió a saltar más alto que ningún otro pez del arrecife. Coral entendió que, aunque no logres todo tal cual lo soñaste, intentarlo te lleva muy lejos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Con qué soñaba el pececito Coral?",
        options: [
          "Con volar como las gaviotas",
          "Con ser el más grande",
          "Con vivir en la playa",
          "Con tener muchos amigos",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "El sueño de Coral está en el primer párrafo. ¿Qué quería hacer?",
          "Relee el comienzo: dice con qué soñaba el pececito.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Coral empezó a practicar saltos?",
        options: [
          "Porque vio a los peces voladores planear en el aire",
          "Porque sus amigos lo retaron",
          "Porque quería comer mariposas",
          "Porque le aburría nadar",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "No se dice con un “por eso”: dedúcelo. ¿Qué vio Coral justo antes de practicar?",
          "Relee el segundo párrafo: ¿qué hacían los peces voladores que le dio la idea?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Coral no logró volar, pero saltó más alto que todos. ¿Crees que valió la pena intentarlo? ¿Por qué?",
        replies: [
          "Excelente reflexión. Pensaste en el valor de intentar y lo defendiste. ¿Has intentado algo difícil y aprendiste en el camino?",
          "Muy bien. No hay una sola respuesta. ¿Crees que a veces, aunque no logremos justo lo que soñamos, ganamos otra cosa?",
        ],
      },
    ],
  },

  {
    id: "luna",
    title: "La luna curiosa",
    topic: "Espacio",
    emoji: "🌙",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Cada noche, una niña llamada Inés miraba la luna desde su ventana. Le parecía que la luna la seguía a todas partes cuando caminaba por la calle.",
      "Una noche le preguntó a su papá por qué la luna la perseguía. Su papá le explicó que la luna está tan lejos que parece quedarse quieta mientras nosotros nos movemos.",
      "Inés siguió mirando la luna, pero ahora con otra idea en la cabeza. Entendió que a veces las cosas no son como parecen a primera vista, y que preguntar ayuda a comprender.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Desde dónde miraba Inés la luna cada noche?",
        options: ["Desde su ventana", "Desde el parque", "Desde el techo", "Desde el carro"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿En qué parte de la casa estaba Inés?",
          "Relee el comienzo: dice desde dónde miraba la luna cada noche.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué parecía que la luna seguía a Inés?",
        options: [
          "Porque está tan lejos que parece quedarse quieta",
          "Porque la luna se movía con ella",
          "Porque Inés corría muy rápido",
          "Porque era una luna mágica",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "La explicación la da el papá. ¿Qué dijo sobre la distancia de la luna?",
          "Relee el segundo párrafo: dice por qué la luna parece quedarse quieta.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Te parece bueno preguntar cuando no entiendes algo? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste para qué sirve preguntar y lo explicaste. ¿Qué te gustaría preguntarle a alguien?",
          "Muy bien. No hay una sola respuesta: lo importante son tus razones. ¿Qué pasaría si nunca preguntáramos nada?",
        ],
      },
    ],
  },

  {
    id: "abeja",
    title: "La abeja trabajadora",
    topic: "Animales",
    emoji: "🐝",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Zumba era una abeja que volaba de flor en flor desde muy temprano. Mientras otras descansaban, ella juntaba polen para llevar a la colmena.",
      "Un día, una mariposa le preguntó por qué trabajaba tanto. Zumba respondió que cada gota de néctar ayudaba a hacer la miel para toda la colmena, no solo para ella.",
      "Cuando llegó el invierno y escaseó la comida, la colmena tenía miel guardada gracias al trabajo de todas. Zumba se alegró de haber ayudado a su familia.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué juntaba Zumba volando de flor en flor?",
        options: ["Polen", "Agua", "Hojas", "Semillas"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué recogía Zumba de las flores?",
          "Relee el comienzo: dice qué llevaba a la colmena.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la colmena tenía comida en el invierno?",
        options: [
          "Porque guardaron miel gracias al trabajo de todas",
          "Porque compraron miel",
          "Porque no comían nada",
          "Porque el invierno fue muy corto",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: ¿qué hicieron las abejas durante el buen tiempo?",
          "Relee el final: dice gracias a qué tenían miel guardada.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que vale la pena trabajar por el bien de todos, como Zumba? ¿Por qué?",
        replies: [
          "Qué buena postura. Pensaste en ayudar a los demás y lo argumentaste. ¿Cómo ayudas tú en tu casa o salón?",
          "Muy bien razonado. No hay respuesta única: lo importante son tus motivos. ¿Qué pasaría si nadie ayudara a los demás?",
        ],
      },
    ],
  },

  {
    id: "paraguas",
    title: "El paraguas compartido",
    topic: "Amistad",
    emoji: "☂️",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Empezó a llover fuerte a la salida del colegio. Mateo tenía su paraguas, pero vio que su compañero Juan se estaba mojando porque había olvidado el suyo.",
      "Mateo dudó un momento, porque el paraguas era pequeño y los dos no cabían muy bien. Aun así, lo abrió y le hizo un espacio a Juan.",
      "Caminaron juntos bajo el mismo paraguas, riéndose de lo apretados que iban. Desde ese día se volvieron buenos amigos. Compartir los acercó.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Juan se estaba mojando?",
        options: [
          "Porque había olvidado su paraguas",
          "Porque le gustaba la lluvia",
          "Porque su paraguas se rompió",
          "Porque iba corriendo",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué le pasó a Juan con su paraguas?",
          "Relee el comienzo: dice por qué Juan no tenía con qué cubrirse.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Mateo y Juan se volvieron buenos amigos?",
        options: [
          "Porque compartieron el paraguas y la pasaron bien",
          "Porque vivían cerca",
          "Porque eran del mismo equipo",
          "Porque la profesora lo pidió",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "No se dice directo: dedúcelo. ¿Qué hicieron juntos bajo la lluvia?",
          "Relee el final: ¿qué los acercó según el cuento?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Habrías compartido tu paraguas aunque fuera pequeño? Cuéntame por qué.",
        replies: [
          "Gran respuesta. Te pusiste en el lugar de Mateo y diste razones. ¿Cómo te sientes cuando compartes?",
          "Muy bien. No hay una sola respuesta. ¿Crees que compartir, aunque cueste un poco, vale la pena?",
        ],
      },
    ],
  },

  {
    id: "arcoiris",
    title: "El arcoíris después de la tormenta",
    topic: "Naturaleza",
    emoji: "🌈",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Llovió durante todo el día y Ana estaba triste porque no podía salir a jugar. Miraba la ventana esperando que la lluvia parara.",
      "Cuando por fin dejó de llover, el cielo se llenó de colores: había salido un enorme arcoíris. Ana salió corriendo a verlo, feliz.",
      "Su abuela le dijo que el arcoíris solo aparece después de la lluvia. Ana pensó que, a veces, las cosas bonitas llegan justo después de los momentos difíciles.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Ana estaba triste al principio?",
        options: [
          "Porque la lluvia no la dejaba salir a jugar",
          "Porque perdió un juguete",
          "Porque se peleó con una amiga",
          "Porque tenía mucha tarea",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué no podía hacer Ana por la lluvia?",
          "Relee el comienzo: dice qué la tenía triste mirando la ventana.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué aprendió Ana al ver el arcoíris?",
        options: [
          "Que las cosas bonitas pueden llegar después de lo difícil",
          "Que siempre va a llover",
          "Que los arcoíris son peligrosos",
          "Que es mejor no salir nunca",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "La idea está al final. ¿Qué pensó Ana después de hablar con su abuela?",
          "Relee el último párrafo: dice qué entendió Ana sobre los momentos difíciles.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Estás de acuerdo con que después de lo difícil pueden venir cosas buenas? ¿Por qué?",
        replies: [
          "Linda reflexión. Pensaste en los momentos difíciles y lo explicaste. ¿Te ha pasado algo bueno después de uno feo?",
          "Muy bien defendido. No hay respuesta única: lo importante son tus razones. ¿Qué te ayuda cuando estás triste?",
        ],
      },
    ],
  },

  {
    id: "tren",
    title: "El tren de juguete",
    topic: "Inventos",
    emoji: "🚂",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "A Samuel le regalaron un tren de juguete que daba vueltas por una vía. Era de su tío, que lo había usado cuando era niño.",
      "Un día, una rueda del tren se salió y dejó de andar. Samuel quería tirarlo a la basura, pero su tío le mostró cómo volver a ponerla en su lugar.",
      "Juntos arreglaron el tren y volvió a andar como nuevo. Samuel aprendió que muchas cosas no hay que botarlas: se pueden reparar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De quién había sido antes el tren de juguete?",
        options: ["De su tío", "De su abuelo", "De su hermano", "De un amigo"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Quién usó el tren cuando era niño?",
          "Relee el comienzo: dice de quién era antes el tren.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el tren volvió a andar?",
        options: [
          "Porque pusieron de nuevo la rueda en su lugar",
          "Porque le cambiaron las pilas",
          "Porque compraron otro tren",
          "Porque solo lo limpiaron",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une las pistas: ¿qué se había salido y qué le mostró el tío?",
          "Relee el segundo párrafo: dice qué arreglaron para que volviera a andar.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que es mejor reparar las cosas que botarlas? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en reparar en vez de botar y lo explicaste. ¿Has arreglado algo en vez de tirarlo?",
          "Muy bien. No hay una sola respuesta. ¿Qué cosas buenas trae reparar en lugar de comprar de nuevo?",
        ],
      },
    ],
  },

  {
    id: "panadero",
    title: "El panadero madrugador",
    topic: "Ciudad",
    emoji: "🥖",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Don José era el panadero del pueblo. Se levantaba cuando todavía estaba oscuro para amasar el pan y que estuviera calientito en la mañana.",
      "Los niños pasaban camino al colegio y el olor a pan recién hecho los hacía sonreír. Don José siempre les regalaba un pedacito a los que lo saludaban.",
      "Un día, don José se enfermó y la panadería no abrió. El pueblo entendió lo mucho que hacía por todos cada madrugada, sin que nadie lo notara.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuándo se levantaba don José?",
        options: [
          "Cuando todavía estaba oscuro",
          "Al mediodía",
          "En la tarde",
          "Cuando el sol estaba bien alto",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo estaba el cielo cuando se levantaba?",
          "Relee el comienzo: dice a qué hora amasaba el pan.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el pueblo valoró a don José cuando se enfermó?",
        options: [
          "Porque notaron todo lo que hacía cada día",
          "Porque el pan era muy caro",
          "Porque cerró para siempre",
          "Porque era su cumpleaños",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué pasó cuando no abrió la panadería?",
          "Relee el final: dice qué entendió el pueblo cuando faltó don José.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que a veces no notamos lo que otros hacen por nosotros? ¿Por qué?",
        replies: [
          "Qué buena reflexión. Pensaste en el trabajo de los demás y lo explicaste. ¿A quién podrías agradecer hoy?",
          "Muy bien razonado. No hay respuesta única. ¿Por qué crees que a veces solo valoramos algo cuando falta?",
        ],
      },
    ],
  },

  {
    id: "estrella",
    title: "La estrella tímida",
    topic: "Espacio",
    emoji: "⭐",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "En el cielo había una estrellita muy tímida que no se atrevía a brillar. Pensaba que su luz era demasiado pequeña al lado de las estrellas grandes.",
      "Una noche, un barco se perdió en el mar oscuro. Los marineros buscaban una luz para guiarse, pero las nubes tapaban a las estrellas grandes.",
      "La estrellita, aunque tenía pena, decidió brillar con todas sus fuerzas. Su lucecita asomó entre una nube y guió al barco a la orilla. Ninguna luz es demasiado pequeña.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué la estrellita no se atrevía a brillar?",
        options: [
          "Porque creía que su luz era muy pequeña",
          "Porque tenía sueño",
          "Porque era de día",
          "Porque estaba enferma",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué pensaba de su propia luz?",
          "Relee el comienzo: dice por qué le daba pena brillar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la estrellita decidió brillar esa noche?",
        options: [
          "Porque el barco perdido necesitaba una luz",
          "Porque las otras estrellas se lo pidieron",
          "Porque quería ser famosa",
          "Porque dejó de sentir pena para siempre",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une las pistas: ¿qué estaba pasando en el mar esa noche?",
          "Relee el segundo párrafo: dice qué necesitaban los marineros.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "El cuento dice que ninguna luz es demasiado pequeña. ¿Estás de acuerdo? ¿Por qué?",
        replies: [
          "Qué linda postura. Pensaste en el valor de lo pequeño y lo argumentaste. ¿En qué cosa pequeña eres bueno tú?",
          "Muy bien defendido. No hay respuesta única. ¿Crees que las cosas pequeñas pueden ayudar mucho?",
        ],
      },
    ],
  },

  {
    id: "caracol",
    title: "El caracol que llegó tarde",
    topic: "Animales",
    emoji: "🐌",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Todos los animales del bosque fueron invitados a una fiesta. El caracol salió temprano, pero como caminaba muy despacio, los demás llegaron mucho antes.",
      "En el camino, el caracol vio cosas que los otros no notaron por ir corriendo: una flor escondida, un nido nuevo y un riachuelo cristalino.",
      "Cuando por fin llegó a la fiesta, contó todo lo que había visto. Los demás lo escucharon con asombro. Ir despacio también tiene sus regalos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué el caracol llegó después que los demás?",
        options: [
          "Porque caminaba muy despacio",
          "Porque salió tarde",
          "Porque se perdió",
          "Porque se quedó dormido",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo caminaba el caracol?",
          "Relee el comienzo: dice por qué los demás llegaron antes.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el caracol vio cosas que los demás no?",
        options: [
          "Porque al ir despacio pudo fijarse en todo",
          "Porque tenía mejores ojos",
          "Porque fue por otro camino",
          "Porque era de noche",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué diferencia había entre el caracol y los que iban corriendo?",
          "Relee el segundo párrafo: dice por qué los otros no notaron esas cosas.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que a veces ir despacio tiene cosas buenas? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en las ventajas de la calma y lo explicaste. ¿Qué disfrutas más cuando vas sin afán?",
          "Muy bien. No hay una sola respuesta. ¿Qué cosas nos perdemos cuando hacemos todo muy rápido?",
        ],
      },
    ],
  },

  {
    id: "pelota",
    title: "La pelota perdida",
    topic: "Amistad",
    emoji: "🏐",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Los niños jugaban en el parque cuando una patada mandó la pelota por encima de un muro alto. Cayó en el jardín de la casa de al lado.",
      "Nadie se atrevía a tocar el timbre para pedirla. Pensaban que la vecina se iba a enojar. Pero Lucía, la más pequeña, decidió ir a preguntar.",
      "La vecina, una señora amable, no solo les devolvió la pelota, sino que los invitó a jugar en su jardín cuando quisieran. A veces el miedo es más grande que el problema.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Dónde cayó la pelota?",
        options: [
          "En el jardín de la casa de al lado",
          "En un árbol",
          "En la mitad de la calle",
          "En un río",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Adónde voló la pelota tras la patada?",
          "Relee el comienzo: dice dónde terminó la pelota.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué nadie quería tocar el timbre?",
        options: [
          "Porque creían que la vecina se enojaría",
          "Porque no había nadie en casa",
          "Porque el timbre no servía",
          "Porque la casa estaba muy lejos",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué pensaban los niños sobre la vecina?",
          "Relee el segundo párrafo: dice qué temían que pasara.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "El cuento dice que a veces el miedo es más grande que el problema. ¿Estás de acuerdo? ¿Por qué?",
        replies: [
          "Gran postura. Pensaste en el miedo y lo argumentaste. ¿Te ha pasado que algo daba menos miedo de lo que creías?",
          "Muy bien razonado. No hay respuesta única. ¿Qué crees que ayuda a animarse, como hizo Lucía?",
        ],
      },
    ],
  },

  {
    id: "jardin",
    title: "El jardín secreto de la escuela",
    topic: "Colegio",
    emoji: "🌷",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Detrás de la escuela había un terreno lleno de hierba y basura que nadie usaba. A Valentina le parecía un desperdicio tener ese espacio abandonado.",
      "Con permiso de la profesora, Valentina y sus compañeros limpiaron el terreno y sembraron flores y verduras. Trabajaron varias semanas, turnándose para regar.",
      "Poco a poco, el lugar feo se llenó de color y vida. Ahora era el jardín favorito de toda la escuela. Entre todos habían convertido la basura en un tesoro.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué había en el terreno detrás de la escuela al principio?",
        options: ["Hierba y basura", "Una cancha", "Un salón", "Un parqueadero"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo estaba ese espacio antes?",
          "Relee el comienzo: dice qué llenaba el terreno abandonado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el lugar se llenó de color y vida?",
        options: [
          "Porque lo limpiaron y sembraron entre todos",
          "Porque llovió mucho",
          "Porque le pusieron pintura",
          "Porque nadie lo volvió a tocar",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une las pistas: ¿qué hicieron Valentina y sus compañeros?",
          "Relee el segundo párrafo: dice qué trabajo hicieron varias semanas.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que vale la pena cuidar los espacios que son de todos? ¿Por qué?",
        replies: [
          "Buena reflexión. Pensaste en lo común y lo explicaste. ¿Qué espacio te gustaría cuidar o mejorar?",
          "Muy bien. No hay una sola respuesta. ¿Qué pasa cuando todos cuidan un lugar en vez de ensuciarlo?",
        ],
      },
    ],
  },

  {
    id: "lapiz",
    title: "El lápiz mágico",
    topic: "Colegio",
    emoji: "✏️",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Tomás creía que tenía un lápiz mágico, porque con él le iba muy bien en los dibujos. Lo cuidaba como su mayor tesoro.",
      "Un día perdió el lápiz y se puso muy nervioso para el examen de dibujo. Tuvo que usar otro cualquiera, seguro de que le iría mal.",
      "Para su sorpresa, el dibujo le quedó igual de bien. Tomás entendió que la magia no estaba en el lápiz, sino en su propia mano y en su práctica.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Tomás creía que su lápiz era mágico?",
        options: [
          "Porque con él le iban muy bien los dibujos",
          "Porque brillaba",
          "Porque hablaba",
          "Porque era de oro",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué le pasaba a Tomás cuando usaba ese lápiz?",
          "Relee el comienzo: dice por qué pensaba que era mágico.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Dónde estaba en realidad la “magia”?",
        options: [
          "En la mano y la práctica de Tomás",
          "En el lápiz nuevo",
          "En el papel",
          "En el examen",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: el dibujo quedó bien aun con otro lápiz. ¿Qué significa eso?",
          "Relee el final: dice de quién dependía de verdad que el dibujo saliera bien.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que lo que logramos depende más de nosotros que de las cosas que tenemos? ¿Por qué?",
        replies: [
          "Qué buena reflexión. Pensaste en el esfuerzo propio y lo argumentaste. ¿En qué eres bueno gracias a practicar?",
          "Muy bien defendido. No hay respuesta única. ¿Crees que practicar puede más que tener cosas caras?",
        ],
      },
    ],
  },

  {
    id: "nieve",
    title: "El primer día de nieve",
    topic: "Naturaleza",
    emoji: "❄️",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Lucas nunca había visto la nieve. Cuando se fue de viaje a la montaña con su familia, se despertó y todo estaba blanco. No lo podía creer.",
      "Al principio le dio miedo salir, porque el frío era distinto a todo lo que conocía. Su hermana mayor lo tomó de la mano y salieron juntos.",
      "Lucas hizo su primer muñeco de nieve y se rió como nunca. Aprendió que las cosas nuevas dan un poco de miedo, pero pueden ser maravillosas.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué vio Lucas cuando se despertó en la montaña?",
        options: [
          "Todo estaba blanco de nieve",
          "Estaba lloviendo",
          "Hacía mucho sol",
          "No había nada",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿De qué color estaba todo?",
          "Relee el comienzo: dice qué vio Lucas al despertar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio le dio miedo salir?",
        options: [
          "Porque el frío era algo nuevo para él",
          "Porque estaba enfermo",
          "Porque no le gustaba jugar",
          "Porque era de noche",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: era la primera vez que veía nieve. ¿Cómo sería ese frío para él?",
          "Relee el segundo párrafo: dice por qué dudaba en salir.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que vale la pena probar cosas nuevas aunque den un poco de miedo? ¿Por qué?",
        replies: [
          "Buena postura. Pensaste en atreverte a lo nuevo y lo explicaste. ¿Qué cosa nueva te gustaría probar?",
          "Muy bien. No hay una sola respuesta. ¿Qué te ayuda a animarte, como la hermana ayudó a Lucas?",
        ],
      },
    ],
  },

  {
    id: "ranita",
    title: "La ranita que cantaba",
    topic: "Animales",
    emoji: "🐸",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En la laguna vivía una ranita a la que le encantaba cantar. Pero su voz era ronca y graciosa, así que algunas ranas se burlaban de ella.",
      "La ranita dejó de cantar por la pena, y la laguna se quedó en silencio por las noches. Todos notaron que algo faltaba.",
      "Una rana mayor le pidió que volviera a cantar, porque su voz, aunque distinta, alegraba la laguna. La ranita cantó otra vez, ahora orgullosa de su voz.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo era la voz de la ranita?",
        options: ["Ronca y graciosa", "Fina y suave", "Igual a las demás", "Muy bajita"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo sonaba la ranita al cantar?",
          "Relee el comienzo: dice cómo era su voz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la laguna se quedó en silencio por las noches?",
        options: [
          "Porque la ranita dejó de cantar por la pena",
          "Porque las ranas se durmieron",
          "Porque se secó la laguna",
          "Porque llegó el invierno",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une las pistas: ¿quién cantaba y qué decidió hacer?",
          "Relee el segundo párrafo: dice por qué ya no había canto de noche.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que está bien ser diferente, como la ranita? Cuéntame por qué.",
        replies: [
          "Qué linda reflexión. Pensaste en ser uno mismo y lo argumentaste. ¿Qué te hace diferente y especial a ti?",
          "Muy bien defendido. No hay respuesta única. ¿Por qué crees que sería aburrido que todos fuéramos iguales?",
        ],
      },
    ],
  },

  {
    id: "bote",
    title: "El bote de papel",
    topic: "Juegos",
    emoji: "⛵",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Un día de lluvia, Emma hizo un bote con una hoja de papel. Lo puso en el agua que corría por la calle y lo vio navegar.",
      "El bote avanzó por el agua, pasó debajo de una hoja grande y giró en un pequeño remolino. Emma corría a su lado, emocionada de verlo flotar.",
      "El bote se deshizo cuando se mojó demasiado, pero Emma ya estaba haciendo otro. Descubrió que con cosas simples se puede jugar muchísimo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Con qué hizo Emma el bote?",
        options: ["Con una hoja de papel", "Con madera", "Con plástico", "Con una caja"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Con qué material lo armó?",
          "Relee el comienzo: dice de qué hizo el bote.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el bote se deshizo?",
        options: [
          "Porque se mojó demasiado",
          "Porque chocó con una piedra",
          "Porque alguien lo pisó",
          "Porque dejó de llover",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: el bote era de papel y estaba en el agua. ¿Qué le pasa al papel mojado?",
          "Relee el final: dice qué le pasó al bote por estar en el agua.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que se puede jugar mucho con cosas simples? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en la imaginación al jugar y lo explicaste. ¿Con qué cosa sencilla te gusta jugar?",
          "Muy bien. No hay una sola respuesta. ¿Crees que para divertirse hace falta tener juguetes caros?",
        ],
      },
    ],
  },

  {
    id: "cometa",
    title: "La cometa en el viento",
    topic: "Juegos",
    emoji: "🪁",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Daniela quería volar su cometa nueva, pero ese día casi no había viento. Por más que corría, la cometa caía al suelo una y otra vez.",
      "Estuvo a punto de rendirse. Entonces su abuelo le dijo que esperara, que el viento llegaría si tenía paciencia. Se sentaron a mirar las nubes.",
      "Al rato, una brisa fuerte sopló y la cometa subió alto, altísimo. Daniela aprendió que algunas cosas necesitan el momento justo, no solo esfuerzo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué la cometa caía al suelo al principio?",
        options: [
          "Porque casi no había viento",
          "Porque estaba rota",
          "Porque el hilo era muy corto",
          "Porque pesaba demasiado",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo estaba el viento ese día?",
          "Relee el comienzo: dice por qué la cometa no se quedaba en el aire.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la cometa por fin subió alto?",
        options: [
          "Porque llegó una brisa fuerte",
          "Porque Daniela corrió más rápido",
          "Porque el abuelo la lanzó",
          "Porque cambió de cometa",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: la cometa necesitaba algo que faltaba al principio. ¿Qué llegó al final?",
          "Relee el último párrafo: dice qué sopló justo antes de que subiera.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que a veces hay que esperar el momento justo, no solo esforzarse? ¿Por qué?",
        replies: [
          "Buena postura. Pensaste en el esfuerzo y la paciencia, y lo argumentaste. ¿Has tenido que esperar el momento para algo?",
          "Muy bien razonado. No hay respuesta única. ¿Crees que esforzarse y tener paciencia pueden ir juntos?",
        ],
      },
    ],
  },

  {
    id: "zapatos",
    title: "Los zapatos nuevos",
    topic: "Colegio",
    emoji: "👟",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "A Pablo le compraron unos zapatos nuevos para la escuela. Estaba tan orgulloso que no quería ensuciarlos por nada.",
      "En el recreo, sus amigos lo invitaron a jugar fútbol en el pasto. Pablo dudó: si jugaba, los zapatos se iban a embarrar.",
      "Al final decidió jugar y la pasó increíble. Los zapatos se ensuciaron, pero se limpiaban fácil. Pablo entendió que las cosas son para usarlas y disfrutarlas.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué le compraron los zapatos a Pablo?",
        options: ["Para la escuela", "Para una fiesta", "Para una carrera", "Para regalarlos"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Para qué eran los zapatos nuevos?",
          "Relee el comienzo: dice para qué se los compraron.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Pablo dudó en jugar fútbol?",
        options: [
          "Porque no quería ensuciar sus zapatos nuevos",
          "Porque no sabía jugar",
          "Porque estaba cansado",
          "Porque no tenía amigos",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué les pasaría a los zapatos si jugaba en el pasto?",
          "Relee el segundo párrafo: dice qué le preocupaba a Pablo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que las cosas son para cuidarlas o para usarlas y disfrutarlas? ¿Por qué?",
        replies: [
          "Qué buena reflexión. Tomaste una postura y la explicaste. ¿Hay algo que cuidas tanto que casi no usas?",
          "Muy bien defendido. No hay respuesta única. ¿Se puede cuidar algo y disfrutarlo al mismo tiempo?",
        ],
      },
    ],
  },

  {
    id: "conejo",
    title: "El conejo y la zanahoria",
    topic: "Animales",
    emoji: "🥕",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Un conejo encontró una zanahoria enorme en la huerta. Intentó sacarla tirando con todas sus fuerzas, pero estaba muy enterrada y no salía.",
      "Llamó a su amigo el ratón para que lo ayudara. Entre los dos tiraron, pero la zanahoria seguía sin moverse. Entonces llamaron también al topo.",
      "Con la fuerza de los tres, por fin la zanahoria salió de la tierra. La compartieron entre todos. Juntos lograron lo que ninguno podía solo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué encontró el conejo en la huerta?",
        options: ["Una zanahoria enorme", "Una lechuga", "Una manzana", "Un hueso"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué halló el conejo?",
          "Relee el comienzo: dice qué intentaba sacar de la tierra.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué por fin lograron sacar la zanahoria?",
        options: [
          "Porque la sacaron entre los tres juntos",
          "Porque usaron una pala",
          "Porque la tierra estaba blanda",
          "Porque esperaron a que creciera",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: uno solo no podía. ¿Quiénes ayudaron al final?",
          "Relee el último párrafo: dice con la fuerza de cuántos salió.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que trabajar en equipo ayuda a lograr cosas difíciles? ¿Por qué?",
        replies: [
          "Buena postura. Pensaste en el trabajo en equipo y lo argumentaste. ¿En qué has trabajado en equipo?",
          "Muy bien. No hay una sola respuesta. ¿Qué cosas son más fáciles cuando varios ayudan?",
        ],
      },
    ],
  },

  {
    id: "buho",
    title: "El búho que no dormía",
    topic: "Animales",
    emoji: "🦉",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Un búho llamado Otto vivía cansado, porque se quedaba despierto de día, cuando los búhos deben dormir. Quería jugar con los animales que están despiertos al sol.",
      "Por estar despierto de día, en la noche se dormía y no podía cazar ni ver a sus amigos búhos. Cada vez se sentía más solo y agotado.",
      "Una lechuza sabia le aconsejó respetar sus horas de sueño. Otto empezó a dormir de día y, por la noche, recuperó su energía y a sus amigos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Otto vivía cansado?",
        options: [
          "Porque se quedaba despierto de día",
          "Porque comía muy poco",
          "Porque volaba demasiado",
          "Porque hacía frío",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cuándo se quedaba despierto Otto?",
          "Relee el comienzo: dice por qué vivía cansado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Otto se sentía cada vez más solo?",
        options: [
          "Porque de noche se dormía y no veía a sus amigos búhos",
          "Porque se mudó muy lejos",
          "Porque era antipático",
          "Porque nadie lo quería",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿cuándo están despiertos los demás búhos y qué hacía Otto a esa hora?",
          "Relee el segundo párrafo: dice qué le pasaba a Otto en la noche.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que es importante respetar las horas de sueño? Cuéntame por qué.",
        replies: [
          "Buena reflexión. Pensaste en el descanso y lo explicaste. ¿Cómo te sientes cuando duermes bien?",
          "Muy bien. No hay una sola respuesta. ¿Qué cosas te cuesta hacer cuando no dormiste suficiente?",
        ],
      },
    ],
  },

  {
    id: "oruga",
    title: "La oruga que se transformó",
    topic: "Naturaleza",
    emoji: "🐛",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Una oruga llamada Lila se sentía triste porque era lenta y peluda, y veía a las mariposas volar libres por el jardín.",
      "Un día sintió sueño y se envolvió en un capullo. Pasó mucho tiempo encerrada, sin saber qué le estaba pasando. Tuvo paciencia y esperó.",
      "Cuando el capullo se abrió, Lila tenía alas de colores: se había convertido en mariposa. Entendió que estaba cambiando incluso cuando no se daba cuenta.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Lila se sentía triste al principio?",
        options: [
          "Porque era lenta y veía volar a las mariposas",
          "Porque tenía hambre",
          "Porque estaba sola en casa",
          "Porque era de noche",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué veía Lila que ella no podía hacer?",
          "Relee el comienzo: dice por qué estaba triste.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué le estaba pasando a Lila dentro del capullo?",
        options: [
          "Se estaba transformando en mariposa",
          "Solo estaba durmiendo",
          "Se estaba escondiendo",
          "Estaba comiendo hojas",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué tenía Lila cuando el capullo se abrió?",
          "Relee el final: dice en qué se había convertido.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que las personas también cambiamos y crecemos con el tiempo? ¿Por qué?",
        replies: [
          "Qué reflexión tan linda. Pensaste en el crecimiento y lo argumentaste. ¿En qué has cambiado desde que eras más pequeño?",
          "Muy bien defendido. No hay respuesta única. ¿Crees que a veces cambiamos sin darnos cuenta, como Lila?",
        ],
      },
    ],
  },

  {
    id: "galleta",
    title: "La última galleta",
    topic: "Familia",
    emoji: "🍪",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Quedaba una sola galleta en el frasco y dos hermanos, Sara y Beto, la querían. Empezaron a discutir sobre quién se la merecía más.",
      "Su mamá, en vez de decidir por ellos, les preguntó qué les parecía justo. Los hermanos se quedaron pensando un momento.",
      "Al final, decidieron partir la galleta en dos mitades iguales. Cada uno se comió su parte contento. A veces, compartir resuelve mejor que pelear.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuántas galletas quedaban en el frasco?",
        options: ["Una sola", "Dos", "Ninguna", "Muchas"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cuántas galletas había?",
          "Relee el comienzo: dice cuántas galletas quedaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los hermanos quedaron contentos al final?",
        options: [
          "Porque compartieron la galleta en partes iguales",
          "Porque mamá compró más",
          "Porque uno se la comió toda",
          "Porque la tiraron a la basura",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: ¿qué decidieron hacer con la galleta?",
          "Relee el final: dice cómo se repartieron la galleta.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt: "¿Crees que compartir resuelve mejor que pelear? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en compartir en vez de pelear y lo explicaste. ¿Has resuelto algo compartiendo?",
          "Muy bien razonado. No hay respuesta única. ¿Qué crees que pasa cuando dos personas pelean en lugar de ponerse de acuerdo?",
        ],
      },
    ],
  },

  {
    id: "delfin",
    title: "El delfín que guiaba a los barcos",
    topic: "Mar",
    emoji: "🐬",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En una bahía azul vivía un delfín llamado Coral. Cada mañana saltaba entre las olas y miraba cómo los barcos pesqueros salían a trabajar. A veces la niebla era tan espesa que los pescadores no veían la orilla.",
      "Una mañana, un barco pequeño se quedó atrapado en la niebla. Los pescadores no sabían hacia dónde estaba el puerto. Coral los escuchó llamar y nadó hasta ellos, saltando una y otra vez para que lo siguieran.",
      "El delfín nadó despacio, marcando el camino hacia la costa. Los pescadores remaron detrás de sus saltos y poco a poco vieron aparecer las luces del puerto entre la niebla.",
      "Desde ese día, los pescadores saludaban a Coral cada mañana. Habían aprendido que hasta el más pequeño puede ayudar a otros cuando conoce bien su casa.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué los pescadores no veían la orilla algunas mañanas?",
        options: [
          "Porque salían de noche",
          "Porque la niebla era muy espesa",
          "Porque sus barcos eran viejos",
          "Porque llovía mucho",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "La respuesta está escrita al comienzo. ¿Qué cubría la bahía algunas mañanas?",
          "Vuelve a leer el primer párrafo: dice qué era tan espeso que tapaba la orilla.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Coral saltaba una y otra vez frente al barco?",
        options: [
          "Porque tenía hambre",
          "Porque quería que los pescadores lo siguieran",
          "Porque estaba jugando solo",
          "Porque buscaba a su familia",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué hizo el barco después de que Coral saltara?",
          "Relee el segundo párrafo. Si saltaba para marcar algo, ¿qué quería que hicieran los pescadores?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Coral era pequeño pero pudo ayudar mucho. ¿Crees que alguien pequeño puede ayudar igual que alguien grande? Cuéntame por qué.",
        replies: [
          "Qué linda manera de pensarlo. Lo importante no fue el tamaño de Coral, sino lo que sabía. ¿Tú has ayudado a alguien con algo que sabes hacer bien?",
          "Muy buen argumento. No hay una sola respuesta correcta: lo valioso es que lo explicaste con razones. ¿Qué crees que habría pasado si Coral hubiera pensado que era demasiado pequeño para ayudar?",
        ],
      },
    ],
  },

  {
    id: "manzano",
    title: "El manzano del patio",
    topic: "Naturaleza",
    emoji: "🍎",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "En el patio de la casa de Lía había un manzano pequeño. Lo había sembrado su abuelo cuando ella nació. Cada año el árbol crecía un poco más, pero todavía no daba ni una sola manzana.",
      "Lía se ponía triste y le preguntaba a su abuelo por qué el árbol no daba frutos. El abuelo sonreía y le decía: «Hay cosas que necesitan tiempo. Tú riégalo y cuídalo, que él hará su parte».",
      "Lía regó el manzano cada semana y lo cuidó del frío. Una primavera, al despertar, vio el árbol lleno de manzanas rojas y brillantes. Corrió a abrazar a su abuelo, feliz de haber esperado.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Quién había sembrado el manzano y cuándo?",
        options: [
          "Lía, cuando entró a la escuela",
          "El abuelo, cuando Lía nació",
          "La mamá de Lía, en primavera",
          "Un vecino, hacía un año",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito en el primer párrafo. ¿Quién sembró el árbol?",
          "Relee el comienzo: dice quién lo sembró y en qué momento de la vida de Lía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el abuelo con «hay cosas que necesitan tiempo»?",
        options: [
          "Que el árbol nunca daría manzanas",
          "Que algunas cosas buenas tardan en llegar y hay que esperar",
          "Que Lía debía sembrar otro árbol",
          "Que el tiempo estaba muy frío",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El abuelo no lo explica del todo: hay que deducirlo. ¿Por qué le pidió a Lía que siguiera cuidándolo?",
          "Relee el segundo párrafo. Si pedía paciencia, ¿qué esperaba que pasara con el tiempo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lía tuvo que esperar mucho para ver las manzanas. ¿Crees que vale la pena esperar por algo que uno quiere? Cuéntame por qué.",
        replies: [
          "Buen punto. Esperar no siempre es fácil, pero a veces trae buenas sorpresas. ¿Has esperado por algo que al final valió la pena?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo importante es que lo defiendes. ¿Qué crees que habría pasado si Lía hubiera dejado de cuidar el árbol?",
        ],
      },
    ],
  },

  {
    id: "ardilla",
    title: "La ardilla que guardaba nueces",
    topic: "Animales",
    emoji: "🐿️",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Nina era una ardilla muy ordenada. Durante el otoño juntaba nueces y las escondía en distintos rincones del bosque para tener comida cuando llegara el invierno.",
      "Sus amigos preferían jugar todo el día y no guardaban nada. «¡Ya buscaremos comida después!», le decían riendo. Nina seguía trabajando, aunque a veces también quería jugar con ellos.",
      "Cuando llegó el invierno, la nieve cubrió el bosque y ya no había comida en los árboles. Nina sacó sus nueces guardadas y, en lugar de comer sola, las compartió con sus amigos hambrientos.",
      "Esa temporada todos aprendieron algo: prepararse a tiempo ayuda, y compartir lo que uno tiene hace al bosque más feliz.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Nina durante el otoño?",
        options: [
          "Jugaba todo el día con sus amigos",
          "Juntaba nueces y las escondía en el bosque",
          "Dormía en su nido",
          "Buscaba un bosque nuevo",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué recogía y guardaba Nina?",
          "Relee el primer párrafo: dice qué juntaba y dónde lo escondía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los amigos de Nina pasaron hambre en el invierno?",
        options: [
          "Porque la nieve era muy fría",
          "Porque no habían guardado comida a tiempo",
          "Porque Nina escondió todo muy lejos",
          "Porque los árboles se cayeron",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Qué hacían los amigos mientras Nina trabajaba?",
          "Relee el segundo párrafo. Si ellos solo jugaban, ¿qué fue lo que no hicieron?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Nina decidió compartir sus nueces aunque sus amigos no se habían preparado. ¿Te parece que hizo bien? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en lo que es justo y lo explicaste. ¿Tú habrías compartido en su lugar?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defender tu idea. ¿Crees que sus amigos aprenderán a prepararse el próximo otoño?",
        ],
      },
    ],
  },

  {
    id: "patito",
    title: "El patito que aprendió a nadar",
    topic: "Animales",
    emoji: "🦆",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Pipo era un patito que tenía miedo al agua. Cuando toda su familia se metía al lago, él se quedaba en la orilla, mirando cómo nadaban sus hermanos.",
      "Su mamá lo animaba con cariño: «No tienes que apurarte, Pipo. Cuando estés listo, el agua estará aquí esperándote». El patito asentía, pero seguía con miedo de mojarse las patas.",
      "Una tarde, una hoja flotó cerca de la orilla y Pipo quiso alcanzarla. Sin darse cuenta, metió una patita, luego la otra, y de pronto estaba flotando. ¡Nadar no era tan difícil como pensaba!",
      "Desde entonces, Pipo fue el primero en saltar al lago cada mañana. Aprendió que muchas veces el miedo es más grande que el problema de verdad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Pipo mientras su familia nadaba en el lago?",
        options: [
          "Nadaba más rápido que todos",
          "Se quedaba en la orilla mirando",
          "Buscaba comida en el bosque",
          "Dormía bajo un árbol",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Dónde se quedaba Pipo?",
          "Relee el primer párrafo: dice qué hacía mientras sus hermanos nadaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué hizo que Pipo finalmente se metiera al agua?",
        options: [
          "Su mamá lo empujó",
          "Quiso alcanzar una hoja que flotaba",
          "Sus hermanos lo retaron",
          "Tenía mucho calor",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no dice «por eso», hay que deducirlo. ¿Qué apareció flotando cerca de la orilla?",
          "Relee el tercer párrafo: algo que Pipo quería alcanzar lo llevó a meter las patas. ¿Qué era?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que «el miedo es más grande que el problema de verdad». ¿Estás de acuerdo? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. A veces lo que imaginamos asusta más que lo real. ¿Te ha pasado que algo te daba miedo y luego no era para tanto?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Qué le dirías a alguien que tiene miedo de intentar algo nuevo?",
        ],
      },
    ],
  },

  {
    id: "nube",
    title: "La nube viajera",
    topic: "Naturaleza",
    emoji: "☁️",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Una nube blanca llamada Lula viajaba por el cielo empujada por el viento. Le gustaba mirar todo desde arriba: las montañas, los ríos y los pueblos pequeñitos.",
      "Un día pasó sobre un campo muy seco. Las plantas estaban tristes y marchitas, y los animales no encontraban agua para beber. Lula sintió pena al verlos así.",
      "La nube se quedó quieta sobre el campo y dejó caer una lluvia suave y fresca. Poco a poco las plantas levantaron sus hojas y los charcos se llenaron de agua.",
      "Cuando el campo volvió a estar verde, Lula siguió su viaje más liviana y contenta. Había descubierto que dar un poco de lo que uno tiene puede cambiarlo todo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué empujaba a Lula por el cielo?",
        options: [
          "El sol",
          "El viento",
          "Los pájaros",
          "La lluvia",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "La respuesta está escrita al comienzo. ¿Qué movía a la nube?",
          "Relee el primer párrafo: dice qué la empujaba mientras viajaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Lula decidió quedarse quieta sobre el campo seco?",
        options: [
          "Porque estaba cansada de viajar",
          "Porque sintió pena por las plantas y los animales",
          "Porque el viento se detuvo",
          "Porque quería esconderse del sol",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué sintió Lula al ver el campo?",
          "Relee el segundo párrafo. Si se quedó para ayudar, ¿qué emoción la movió primero?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lula dio su lluvia para ayudar al campo. ¿Crees que ayudar a otros nos hace sentir bien? Cuéntame por qué.",
        replies: [
          "Qué linda manera de verlo. Al final Lula siguió más contenta. ¿Tú te has sentido bien después de ayudar a alguien?",
          "Muy buen argumento. No hay una sola respuesta: lo importante es que lo explicaste. ¿Crees que siempre hay que esperar algo a cambio cuando ayudamos?",
        ],
      },
    ],
  },

  {
    id: "trompo",
    title: "El trompo de madera",
    topic: "Juegos",
    emoji: "🪀",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "A Mateo le regalaron un trompo de madera que había sido de su papá. Quería hacerlo bailar como veía en los videos, pero cada vez que lo lanzaba, el trompo caía de lado sin girar.",
      "Mateo se frustraba mucho. «Este trompo está roto», pensaba. Pero su papá le mostró cómo enrollar bien la cuerda y soltarla con un movimiento firme de la muñeca.",
      "Mateo lo intentó muchas veces. Falló y falló, hasta que un día el trompo giró rápido y parejo sobre el suelo. Sus ojos brillaron de alegría al verlo bailar.",
      "Desde entonces, cada vez que algo le costaba, Mateo recordaba el trompo y se decía: «Solo necesito practicar un poco más».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De quién había sido antes el trompo de madera?",
        options: [
          "De su abuelo",
          "De su papá",
          "De su hermano",
          "De un amigo",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿A quién le pertenecía antes el trompo?",
          "Relee el primer párrafo: dice de quién había sido el regalo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio Mateo pensaba que el trompo estaba roto?",
        options: [
          "Porque era muy viejo",
          "Porque no sabía aún cómo lanzarlo bien",
          "Porque le faltaba la cuerda",
          "Porque su papá lo había dañado",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Qué le enseñó su papá después?",
          "Relee el segundo párrafo. Si necesitaba aprender a enrollar la cuerda, ¿el problema era el trompo o algo más?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Mateo falló muchas veces antes de lograrlo. ¿Crees que equivocarse es parte de aprender? Cuéntame por qué.",
        replies: [
          "Buen punto. Cada intento fallido le enseñó algo a Mateo. ¿Has aprendido algo después de equivocarte varias veces?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo valioso es que lo defiendes. ¿Qué crees que habría pasado si Mateo se rendía en el primer intento?",
        ],
      },
    ],
  },

  {
    id: "huerta",
    title: "La huerta de la escuela",
    topic: "Escuela",
    emoji: "🥕",
    minutes: 4,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "La maestra de Ana propuso algo nuevo: cada niño cuidaría una parte de la huerta de la escuela. A Ana le tocó sembrar zanahorias en un rincón con buena tierra.",
      "Algunos compañeros se aburrieron pronto y dejaron de regar sus plantas. Ana, en cambio, iba todos los recreos a quitar las malezas y a darle agua a sus zanahorias.",
      "Pasaron las semanas. Las plantas de los niños que las olvidaron se secaron, pero las zanahorias de Ana crecieron grandes y anaranjadas bajo la tierra.",
      "El día de la cosecha, Ana compartió sus zanahorias con toda la clase. La maestra dijo que cuidar algo cada día, aunque sea poquito, hace la diferencia.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le tocó sembrar a Ana en la huerta?",
        options: [
          "Tomates",
          "Zanahorias",
          "Flores",
          "Lechugas",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué plantó Ana en su rincón?",
          "Relee el primer párrafo: dice qué le tocó sembrar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué las plantas de algunos compañeros se secaron?",
        options: [
          "Porque la tierra era mala",
          "Porque dejaron de regarlas y cuidarlas",
          "Porque hacía mucho frío",
          "Porque Ana se quedó con toda el agua",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué dejaron de hacer esos compañeros?",
          "Relee el segundo párrafo. Si se aburrieron y no regaron, ¿qué les faltó a sus plantas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Ana cuidó su huerta todos los días, aunque fuera poquito. ¿Crees que hacer un poco cada día sirve más que hacer mucho una sola vez? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en el valor de la constancia y lo explicaste. ¿Hay algo que tú hagas un poquito cada día?",
          "Muy bien razonado. No hay una respuesta única: lo importante es defenderla. ¿Qué crees que aprendieron los compañeros que olvidaron sus plantas?",
        ],
      },
    ],
  },

  {
    id: "pinguino",
    title: "El pingüino que tenía frío",
    topic: "Animales",
    emoji: "🐧",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En un lugar lleno de hielo vivía un pingüino llamado Tobi. Aunque todos los pingüinos están hechos para el frío, Tobi temblaba porque siempre se quedaba solo, lejos del grupo.",
      "Los demás pingüinos se juntaban muy apretados, unos contra otros, para darse calor. Tobi los miraba de lejos, pensando que no había lugar para él.",
      "Una pingüina mayor se acercó y le dijo: «Ven, el calor es para todos». Tobi se metió en el centro del grupo y, por primera vez, dejó de temblar.",
      "Esa noche Tobi entendió que estar juntos no solo da calor: también hace que nadie se sienta solo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Tobi temblaba de frío aunque era un pingüino?",
        options: [
          "Porque estaba enfermo",
          "Porque se quedaba solo, lejos del grupo",
          "Porque no tenía plumas",
          "Porque el hielo se derretía",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Dónde se quedaba Tobi?",
          "Relee el primer párrafo: dice por qué temblaba aunque estaba hecho para el frío.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los demás pingüinos se juntaban muy apretados?",
        options: [
          "Para darse calor unos a otros",
          "Para jugar a empujarse",
          "Porque tenían sueño",
          "Para esconderse del viento del mar",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El cuento te da la pista: hay que deducirlo. ¿Qué consiguen los pingüinos al estar tan juntos?",
          "Relee el segundo párrafo. Si se apretaban unos contra otros, ¿qué se daban entre todos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La pingüina mayor le dijo a Tobi que «el calor es para todos». ¿Crees que es importante hacerle un lugar a quien está solo? Cuéntame por qué.",
        replies: [
          "Qué linda forma de pensarlo. Un pequeño gesto cambió la noche de Tobi. ¿Tú has invitado a alguien que estaba solo?",
          "Muy buen argumento. No hay una sola respuesta: lo valioso es que lo explicaste. ¿Cómo crees que se sentía Tobi antes de que lo invitaran?",
        ],
      },
    ],
  },

  {
    id: "campana",
    title: "La campana del pueblo",
    topic: "Pueblo",
    emoji: "🔔",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "En lo alto de una torre, en un pueblo tranquilo, había una vieja campana. Cada mañana, don Beto subía las escaleras para tocarla y así avisar a todos que empezaba el día.",
      "Una mañana, don Beto se enfermó y no pudo subir a la torre. El pueblo se quedó en silencio y muchos se durmieron de más, porque estaban acostumbrados a despertar con la campana.",
      "La nieta de don Beto, una niña llamada Inés, decidió subir ella misma. Las escaleras eran largas y oscuras, pero llegó arriba y tocó la campana con todas sus fuerzas.",
      "El sonido llenó el pueblo otra vez. Don Beto, desde su cama, sonrió al escucharla. Inés había aprendido que cuando alguien no puede, otro puede tomar su lugar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué tocaba don Beto la campana cada mañana?",
        options: [
          "Para llamar a comer",
          "Para avisar que empezaba el día",
          "Para espantar a los pájaros",
          "Para anunciar una fiesta",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué avisaba la campana cada mañana?",
          "Relee el primer párrafo: dice para qué subía don Beto a tocarla.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué muchos se durmieron de más esa mañana?",
        options: [
          "Porque hacía mucho frío",
          "Porque no sonó la campana que los despertaba",
          "Porque era domingo",
          "Porque don Beto les dio permiso",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Qué no pasó esa mañana?",
          "Relee el segundo párrafo. Si estaban acostumbrados a despertar con la campana y no sonó, ¿qué les pasó?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Inés subió a tocar la campana aunque las escaleras eran largas y oscuras. ¿Crees que hizo bien en tomar el lugar de su abuelo? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en lo valiente que fue Inés y lo explicaste. ¿Tú te animarías a ayudar aunque dé un poco de miedo?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo importante es defenderla. ¿Qué crees que sintió don Beto al escuchar la campana?",
        ],
      },
    ],
  },

  {
    id: "grillo",
    title: "El grillo músico",
    topic: "Animales",
    emoji: "🦗",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Gil era un grillo que tocaba música con sus patitas cada noche. Su canción era suave y bonita, y todos los animales del jardín se dormían tranquilos al escucharlo.",
      "Pero un sapo grande y gruñón le dijo: «Tu música no sirve para nada, deberías buscar comida como todos». Gil se puso triste y dejó de tocar varias noches.",
      "Sin la canción del grillo, los animales del jardín no podían dormir bien. Una mañana, una luciérnaga le pidió: «Gil, por favor, vuelve a tocar. Tu música nos hace falta».",
      "Esa noche Gil volvió a tocar y todo el jardín descansó feliz. Entendió que lo que él hacía sí servía, aunque no fuera buscar comida como los demás.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Con qué tocaba música el grillo Gil?",
        options: [
          "Con una flauta",
          "Con sus patitas",
          "Con sus alas",
          "Con una hoja seca",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Con qué parte de su cuerpo hacía música Gil?",
          "Relee el primer párrafo: dice con qué tocaba cada noche.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Gil dejó de tocar durante varias noches?",
        options: [
          "Porque se quedó sin música",
          "Porque el sapo le dijo que su música no servía y se puso triste",
          "Porque se fue del jardín",
          "Porque estaba muy cansado",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué le dijo el sapo a Gil?",
          "Relee el segundo párrafo. Si las palabras del sapo lo pusieron triste, ¿qué decidió dejar de hacer?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El sapo dijo que la música «no sirve para nada». ¿Tú estás de acuerdo? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. Al final la música de Gil sí ayudaba a todos. ¿Qué cosa que te gusta hacer crees que vale la pena, aunque otros no lo vean?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Crees que todas las cosas tienen que servir para lo mismo?",
        ],
      },
    ],
  },

  {
    id: "mariposa",
    title: "La mariposa y el viento",
    topic: "Naturaleza",
    emoji: "🦋",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Recién salida de su capullo, una mariposa llamada Aza quería volar lejos para conocer el mundo. Pero apenas batía sus alas, el viento la empujaba de vuelta al árbol.",
      "Aza se enojaba con el viento. «¡Déjame pasar!», le decía. El viento solo soplaba más fuerte y ella terminaba otra vez en la misma rama, cansada y triste.",
      "Una abeja vieja la vio y le dijo: «No pelees con el viento, úsalo». Aza esperó a que el viento soplara hacia donde ella quería ir y extendió sus alas. Esta vez el viento la llevó volando muy alto.",
      "Aza cruzó el jardín entero sin cansarse. Había aprendido que a veces, en lugar de luchar contra algo, conviene aprovecharlo a favor.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le pasaba a Aza cada vez que batía sus alas al principio?",
        options: [
          "Volaba muy lejos",
          "El viento la empujaba de vuelta al árbol",
          "Se quedaba dormida",
          "Otras mariposas la seguían",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "La respuesta está al comienzo. ¿Qué hacía el viento cuando ella intentaba volar?",
          "Relee el primer párrafo: dice a dónde la empujaba el viento.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué esta vez Aza sí pudo volar lejos?",
        options: [
          "Porque el viento se detuvo",
          "Porque esperó y aprovechó el viento a su favor",
          "Porque la abeja la cargó",
          "Porque sus alas crecieron",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué consejo siguió Aza?",
          "Relee el tercer párrafo. ¿Qué esperó antes de extender sus alas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La abeja le dijo a Aza que no peleara con el viento, sino que lo usara. ¿Crees que es buena idea aprovechar algo que parece un problema? Cuéntame por qué.",
        replies: [
          "Qué linda forma de pensarlo. A veces lo que nos frena puede ayudarnos si lo miramos distinto. ¿Se te ocurre algo que parecía un problema y terminó sirviéndote?",
          "Muy buen argumento. No hay una sola respuesta correcta: lo importante es que lo defiendas. ¿Qué habría pasado si Aza seguía peleando con el viento?",
        ],
      },
    ],
  },

  {
    id: "cachorro",
    title: "El cachorro perdido",
    topic: "Animales",
    emoji: "🐕",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Una tarde, un cachorro pequeño se separó de su dueño en el parque. Corrió detrás de una pelota y, cuando levantó la vista, no había nadie conocido a su alrededor.",
      "El cachorro tuvo miedo, pero recordó algo: su dueño siempre lo llamaba desde la fuente del parque. En lugar de correr sin rumbo, decidió quedarse cerca de un lugar que conocía.",
      "Se sentó junto a un banco y esperó, atento a cada sonido. Olfateó el aire y reconoció el olor de su dueño que se acercaba buscándolo y llamándolo por su nombre.",
      "Se reencontraron felices. El cachorro había aprendido que, cuando uno se pierde, a veces lo mejor es quedarse quieto en un lugar conocido y esperar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo se separó el cachorro de su dueño?",
        options: [
          "Se escondió a propósito",
          "Corrió detrás de una pelota",
          "Se quedó dormido",
          "Siguió a otro perro",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué perseguía el cachorro?",
          "Relee el primer párrafo: dice detrás de qué corrió.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el cachorro decidió quedarse quieto en lugar de correr?",
        options: [
          "Porque estaba muy cansado",
          "Porque pensó que así su dueño podría encontrarlo",
          "Porque le gustaba el banco",
          "Porque tenía sueño",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Qué recordó sobre cómo lo llamaba su dueño?",
          "Relee el segundo párrafo. Si se quedó cerca de un lugar conocido, ¿qué esperaba que pasara?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cachorro decidió quedarse quieto y esperar. ¿Te parece que fue una buena idea cuando uno se pierde? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en lo que conviene hacer al perderse y lo explicaste. ¿Qué harías tú si te perdieras en un lugar grande?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo importante es defenderla. ¿Crees que correr sin rumbo lo habría ayudado?",
        ],
      },
    ],
  },

  {
    id: "raton",
    title: "El ratoncito de campo",
    topic: "Animales",
    emoji: "🐭",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Tin era un ratón que vivía en el campo, entre espigas de trigo y flores silvestres. Su primo de la ciudad lo invitó a su casa, llena de quesos y comidas ricas.",
      "En la ciudad, Tin probó manjares que nunca había imaginado. Pero cada vez que iba a comer, aparecía un gato enorme y los dos tenían que esconderse corriendo.",
      "Después de varios sustos, Tin extrañó su campo tranquilo. Allí no había tantos quesos, pero podía comer en paz, mirando las estrellas sin que nadie lo persiguiera.",
      "Tin regresó a su casa del campo. Entendió que prefería tener poco y vivir tranquilo, que tener mucho y vivir asustado.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Quién invitó a Tin a la ciudad?",
        options: [
          "Su mamá",
          "Su primo de la ciudad",
          "Un gato",
          "Una espiga de trigo",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Quién lo invitó a su casa?",
          "Relee el primer párrafo: dice quién vivía en la ciudad y lo invitó.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tin terminó extrañando su campo?",
        options: [
          "Porque en la ciudad no había comida",
          "Porque en el campo podía comer en paz, sin el gato",
          "Porque su primo lo trató mal",
          "Porque hacía mucho frío en la ciudad",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué lo asustaba en la ciudad?",
          "Relee el tercer párrafo. Si en el campo comía tranquilo, ¿qué le faltaba a la ciudad?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Tin prefirió tener poco y vivir tranquilo antes que tener mucho y vivir asustado. ¿Estás de acuerdo con su decisión? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. Cada quien valora cosas distintas. ¿Tú qué preferirías: más cosas o más tranquilidad?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Crees que el primo de la ciudad pensaba igual que Tin?",
        ],
      },
    ],
  },

  {
    id: "calabaza",
    title: "La calabaza gigante",
    topic: "Naturaleza",
    emoji: "🎃",
    minutes: 4,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Don Aurelio quería ganar el concurso de la calabaza más grande del pueblo. Por eso eligió una sola planta y le dejó crecer una única calabaza, quitándole todas las demás.",
      "Su vecina se rió: «¿Por qué quitas las otras calabazas? Tendrías más si las dejaras todas». Don Aurelio sonrió y siguió cuidando solo a la suya.",
      "Toda el agua y el alimento de la planta fueron a parar a esa única calabaza. Creció y creció hasta volverse enorme, tan grande como una carretilla.",
      "Don Aurelio ganó el concurso. Le explicó a su vecina que, a veces, poner toda la energía en una sola cosa la hace crecer mucho más.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hizo don Aurelio para que su calabaza creciera tanto?",
        options: [
          "Le puso abono mágico",
          "Dejó una sola calabaza y quitó las demás",
          "La regó una vez por mes",
          "La sembró en otro pueblo",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Cuántas calabazas dejó en la planta?",
          "Relee el primer párrafo: dice qué hizo con las demás calabazas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la calabaza de don Aurelio creció tan enorme?",
        options: [
          "Porque toda el agua y el alimento fueron a esa sola calabaza",
          "Porque era una semilla especial",
          "Porque llovió mucho ese año",
          "Porque la vecina la cuidó",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "El cuento te da la pista: hay que unir las ideas. ¿A dónde fue a parar el alimento de la planta?",
          "Relee el tercer párrafo. Si solo quedaba una calabaza, ¿quién recibió toda la comida de la planta?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Don Aurelio puso toda su energía en una sola calabaza. ¿Crees que concentrarse en una sola cosa es mejor que repartirse en muchas? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en cómo usamos nuestra energía y lo explicaste. ¿Tú prefieres hacer una cosa muy bien o varias a la vez?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Crees que siempre conviene concentrarse en una sola cosa, o a veces no?",
        ],
      },
    ],
  },

  {
    id: "castillo",
    title: "El castillo de arena",
    topic: "Playa",
    emoji: "🏖️",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En la playa, Bruno construyó un castillo de arena enorme, con torres altas y un puente sobre un foso. Pasó toda la mañana dándole forma con su balde y su pala.",
      "Justo cuando terminó, una ola grande llegó hasta la orilla y deshizo una de las torres. Bruno estuvo a punto de llorar; tanto trabajo se había arruinado en un segundo.",
      "Su hermana le dijo: «No te preocupes, ahora sabes cómo hacerlo. El segundo te saldrá aún mejor». Bruno respiró, juntó arena de nuevo y empezó otro castillo.",
      "El nuevo castillo quedó más alto y más firme que el primero. Bruno descubrió que, cuando algo se cae, siempre se puede volver a empezar, y a veces sale mejor.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué deshizo una de las torres del castillo de Bruno?",
        options: [
          "El viento",
          "Una ola grande",
          "Su hermana",
          "Un perro",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "La respuesta está en el segundo párrafo. ¿Qué llegó hasta la orilla?",
          "Relee cuando Bruno terminó el castillo: algo del mar lo dañó. ¿Qué fue?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el segundo castillo le salió mejor a Bruno?",
        options: [
          "Porque usó arena diferente",
          "Porque ya había aprendido cómo construirlo",
          "Porque su hermana lo hizo por él",
          "Porque no había olas",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Qué le dijo su hermana que ya sabía?",
          "Relee el final. Si era su segundo intento, ¿qué tenía Bruno que no tenía la primera vez?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Bruno volvió a empezar después de que su castillo se cayó. ¿Crees que vale la pena intentar de nuevo cuando algo sale mal? Cuéntame por qué.",
        replies: [
          "Qué linda manera de verlo. A veces el segundo intento es el mejor. ¿Has vuelto a intentar algo que primero te salió mal?",
          "Muy buen argumento. No hay una sola respuesta: lo importante es que lo explicaste. ¿Cómo crees que se habría sentido Bruno si se rendía?",
        ],
      },
    ],
  },

  {
    id: "columpio",
    title: "El columpio del parque",
    topic: "Juegos",
    emoji: "🛝",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En el parque había un solo columpio y siempre se formaba una fila larga. Cada niño quería quedarse columpiándose mucho rato, y los demás se aburrían esperando.",
      "Un día, una niña llamada Sara propuso una idea: cada uno se columpiaría contando hasta veinte y luego le daría el turno al siguiente. Así todos podrían jugar.",
      "Al principio algunos no querían, pero pronto vieron que la fila avanzaba rápido y nadie se quedaba sin turno. El parque se llenó de risas en vez de quejas.",
      "Desde ese día, los niños siguieron usando la idea de Sara. Habían aprendido que ponerse de acuerdo hace que todos disfruten más.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué los niños se aburrían en el parque al principio?",
        options: [
          "Porque el columpio estaba roto",
          "Porque tenían que esperar mucho en la fila",
          "Porque llovía",
          "Porque no había columpio",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué tenían que hacer mientras otros se columpiaban?",
          "Relee el primer párrafo: dice por qué se aburrían los que esperaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la idea de Sara hizo que todos disfrutaran más?",
        options: [
          "Porque trajo otro columpio",
          "Porque al turnarse, todos alcanzaban a jugar",
          "Porque echó a los más grandes",
          "Porque el parque cerró temprano",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué pasó con la fila cuando se turnaron?",
          "Relee el tercer párrafo. Si nadie se quedaba sin turno, ¿por qué todos estaban contentos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Sara propuso turnarse para que todos jugaran. ¿Crees que turnarse es una buena forma de compartir? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en cómo compartir algo entre muchos y lo explicaste. ¿Tú te has turnado para usar algo con tus amigos?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Qué crees que habría pasado si nadie quería ceder el turno?",
        ],
      },
    ],
  },

  {
    id: "limonada",
    title: "El puesto de limonada",
    topic: "Comunidad",
    emoji: "🍋",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Era un día caluroso y Mía puso un puesto de limonada frente a su casa. Quería juntar dinero para comprarse una bicicleta nueva.",
      "Vendió muchos vasos toda la mañana. Pero al mediodía vio a un señor mayor que barría la calle bajo el sol, cansado y con mucha sed.",
      "Mía pensó un momento y le ofreció un vaso de limonada sin cobrarle nada. El señor sonrió, le dio las gracias y siguió trabajando más animado.",
      "Esa tarde Mía juntó un poco menos dinero del que esperaba, pero se fue a dormir contenta. Había descubierto que ayudar a alguien también vale mucho.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué quería juntar dinero Mía con su puesto de limonada?",
        options: [
          "Para comprar dulces",
          "Para comprarse una bicicleta nueva",
          "Para ir al cine",
          "Para ayudar a su hermano",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué quería comprar Mía?",
          "Relee el primer párrafo: dice para qué juntaba el dinero.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Mía le regaló la limonada al señor?",
        options: [
          "Porque él se lo exigió",
          "Porque le dio compasión verlo cansado y con sed",
          "Porque ya no quería vender más",
          "Porque la limonada estaba dañada",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice directamente: hay que deducirlo. ¿Cómo estaba el señor que barría?",
          "Relee el segundo párrafo. Si lo vio cansado y con sed, ¿qué pudo sentir Mía?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Mía juntó menos dinero pero se sintió contenta por haber ayudado. ¿Crees que valió la pena regalar esa limonada? Cuéntame por qué.",
        replies: [
          "Qué linda forma de pensarlo. A veces ayudar nos deja una alegría que el dinero no da. ¿Tú has regalado algo y te sentiste bien después?",
          "Muy buen argumento. No hay una sola respuesta correcta: lo importante es que lo defiendas. ¿Crees que Mía igual conseguirá su bicicleta más adelante?",
        ],
      },
    ],
  },

  {
    id: "dragon",
    title: "El dragón que no echaba fuego",
    topic: "Fantasía",
    emoji: "🐉",
    minutes: 4,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "En una montaña vivía un dragón llamado Fausto. Todos los dragones echaban fuego por la boca, pero de la de Fausto solo salían pompas de jabón y un poco de humo.",
      "Los otros dragones se burlaban de él. Fausto se escondía en su cueva, triste, pensando que nunca serviría para nada importante.",
      "Una tarde, un grupo de niños se perdió en el bosque cuando empezaba a hacer mucho frío. Fausto no podía hacer una fogata, pero acercó su cuerpo enorme y tibio para darles calor toda la noche.",
      "Por la mañana, los niños volvieron a casa sanos y contaron lo que el dragón había hecho. Fausto entendió que no necesitaba fuego para ser un héroe: bastaba con su buen corazón.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué salía de la boca de Fausto en lugar de fuego?",
        options: [
          "Agua",
          "Pompas de jabón y un poco de humo",
          "Chispas de colores",
          "Nada",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué le salía a Fausto cuando intentaba echar fuego?",
          "Relee el primer párrafo: dice qué salía de su boca.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cómo logró Fausto ayudar a los niños perdidos sin fuego?",
        options: [
          "Llamó a los otros dragones",
          "Les dio calor con su cuerpo grande y tibio",
          "Los llevó volando a casa",
          "Encendió una linterna",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento sí lo cuenta, pero hay que fijarse bien. ¿Qué hizo Fausto al no poder hacer fogata?",
          "Relee el tercer párrafo. Si no tenía fuego, ¿con qué parte de sí mismo dio calor?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Fausto fue un héroe sin echar fuego, solo con su buen corazón. ¿Crees que se puede ser valioso aunque no se haga lo que todos esperan? Cuéntame por qué.",
        replies: [
          "Me encanta cómo lo pensaste. Fausto ayudó a su manera, distinta a la de los demás. ¿Tú tienes algo especial que te hace diferente?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Crees que los dragones que se burlaban cambiaron de opinión?",
        ],
      },
    ],
  },

  {
    id: "tambor",
    title: "El tambor de la banda",
    topic: "Música",
    emoji: "🥁",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En la banda de la escuela, Nico tocaba el tambor. Él quería tocar la trompeta, que sonaba fuerte y brillante, y pensaba que el tambor era aburrido.",
      "Un día, en el ensayo, los trompetistas no se ponían de acuerdo y todos tocaban a destiempo. La música sonaba desordenada y nadie sabía cuándo entrar.",
      "Entonces Nico empezó a marcar el ritmo con su tambor: pum, pum, pum. Poco a poco, todos los músicos siguieron su compás y la canción volvió a sonar bonita.",
      "El director felicitó a Nico. Ese día entendió que el tambor no era aburrido: era el corazón que mantenía a toda la banda unida.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué instrumento quería tocar Nico en lugar del tambor?",
        options: [
          "La flauta",
          "La trompeta",
          "El violín",
          "La guitarra",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué instrumento le parecía más brillante a Nico?",
          "Relee el primer párrafo: dice qué quería tocar él.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la banda volvió a sonar bien gracias a Nico?",
        options: [
          "Porque tocó más fuerte que todos",
          "Porque su tambor marcó el ritmo y todos lo siguieron",
          "Porque hizo callar a los trompetistas",
          "Porque cambió la canción",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento te da la pista: hay que deducirlo. ¿Qué empezó a hacer Nico con su tambor?",
          "Relee el tercer párrafo. Si todos siguieron su compás, ¿qué les estaba dando el tambor?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Nico creía que su instrumento era aburrido, pero resultó muy importante. ¿Crees que las cosas que parecen poco vistosas pueden ser muy valiosas? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en el valor de lo que no siempre se nota y lo explicaste. ¿Conoces algo que parece simple pero es muy importante?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo importante es defenderla. ¿Crees que Nico seguirá queriendo cambiar el tambor por la trompeta?",
        ],
      },
    ],
  },

  {
    id: "gallo",
    title: "El gallo que no quería madrugar",
    topic: "Animales",
    emoji: "🐓",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En una granja vivía un gallo llamado Quico, encargado de cantar al amanecer para despertar a todos. Pero a Quico le encantaba dormir y muchas mañanas se quedaba en la cama.",
      "Sin el canto del gallo, las gallinas no ponían huevos a tiempo, las vacas no salían a pastar y el granjero se despertaba tarde. Todo en la granja andaba desordenado.",
      "Un día, los animales hablaron con Quico y le explicaron lo importante que era su canto para todos. Quico no se había dado cuenta de que tantos contaban con él.",
      "Desde la mañana siguiente, Quico cantó puntual al salir el sol. Aprendió que cuando uno cumple su parte, ayuda a que todo lo demás funcione.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuál era la tarea de Quico en la granja?",
        options: [
          "Cuidar a las gallinas",
          "Cantar al amanecer para despertar a todos",
          "Buscar comida",
          "Vigilar la puerta",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué debía hacer Quico cada amanecer?",
          "Relee el primer párrafo: dice de qué estaba encargado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué todo andaba desordenado en la granja?",
        options: [
          "Porque el granjero se mudó",
          "Porque sin el canto de Quico nadie empezaba el día a tiempo",
          "Porque hacía mucho calor",
          "Porque las vacas se enfermaron",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué dejaba de pasar cuando Quico no cantaba?",
          "Relee el segundo párrafo. Si nadie se despertaba a tiempo, ¿de quién dependían todos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Quico no sabía que tantos dependían de su canto. ¿Crees que es importante cumplir con la parte que nos toca aunque cueste? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en la responsabilidad hacia los demás y lo explicaste. ¿Hay algo que tú haces y que ayuda a tu familia o tu clase?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Qué crees que sentían los otros animales cuando Quico no cantaba?",
        ],
      },
    ],
  },

  {
    id: "lobito",
    title: "El lobito que aprendió a pedir ayuda",
    topic: "Animales",
    emoji: "🐺",
    minutes: 4,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Lobo era un lobito que quería hacer todo solo. «Yo puedo», decía siempre, aunque la tarea fuera demasiado grande para él. No le gustaba que nadie lo ayudara.",
      "Un día quiso cruzar un río saltando de piedra en piedra para alcanzar unas moras del otro lado. A mitad de camino, una piedra resbaló y Lobo quedó atrapado en una roca, sin poder avanzar ni volver.",
      "Sus hermanos lo oyeron aullar y corrieron a la orilla. Al principio Lobo no quería pedir ayuda, pero al fin gritó: «¡Ayúdenme, por favor!». Entre todos formaron una cadena y lo sacaron del agua.",
      "Ya a salvo, Lobo entendió algo nuevo: pedir ayuda no es de débiles. A veces es lo más valiente y lo más inteligente que se puede hacer.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué decía siempre Lobo al principio del cuento?",
        options: [
          "«Tengo miedo»",
          "«Yo puedo»",
          "«Ayúdenme»",
          "«No quiero»",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué frase repetía Lobo?",
          "Relee el primer párrafo: dice qué decía siempre, aunque la tarea fuera muy grande.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Lobo pudo salir del río?",
        options: [
          "Porque el agua bajó",
          "Porque finalmente pidió ayuda a sus hermanos",
          "Porque saltó muy alto",
          "Porque la roca se movió sola",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo cuenta, pero hay que unir las ideas. ¿Qué hizo Lobo antes de que lo sacaran?",
          "Relee el tercer párrafo. Si entre todos formaron una cadena, ¿qué tuvo que hacer Lobo primero?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que pedir ayuda no es de débiles, sino algo valiente. ¿Estás de acuerdo? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. A veces cuesta pedir ayuda, pero es de sabios saber cuándo hacerlo. ¿Tú has pedido ayuda cuando algo te costaba?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Qué crees que habría pasado si Lobo nunca pedía ayuda?",
        ],
      },
    ],
  },

  {
    id: "flor",
    title: "La flor que crecía en la grieta",
    topic: "Naturaleza",
    emoji: "🌸",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "En medio de una calle de cemento gris, una pequeña semilla cayó en una grieta. Allí casi no había tierra ni espacio, pero la semilla decidió crecer de todos modos.",
      "Las personas pasaban sin notarla. «Aquí no puede crecer nada», habrían dicho si la hubieran visto. Pero cada día la plantita estiraba un poquito más sus hojas hacia el sol.",
      "Una mañana, entre el gris de la calle, apareció una flor rosada y brillante. La gente que pasaba se detenía a mirarla, sorprendida de que algo tan bonito creciera en un lugar tan duro.",
      "La florecita alegró toda la cuadra. Había demostrado que, con ganas y un poquito de luz, se puede florecer hasta en el lugar más difícil.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Dónde cayó la pequeña semilla?",
        options: [
          "En un jardín",
          "En una grieta de la calle de cemento",
          "En una maceta",
          "En el bosque",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿En qué lugar cayó la semilla?",
          "Relee el primer párrafo: dice dónde quedó, en medio de la calle gris.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la gente se sorprendía al ver la flor?",
        options: [
          "Porque era muy grande",
          "Porque había crecido en un lugar duro donde parecía imposible",
          "Porque cambiaba de color",
          "Porque hablaba",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Cómo era el lugar donde creció la flor?",
          "Relee el tercer párrafo. Si la calle era de cemento gris, ¿por qué llamaba la atención una flor ahí?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La flor creció en un lugar muy difícil. ¿Crees que se puede lograr algo bueno aunque las condiciones sean difíciles? Cuéntame por qué.",
        replies: [
          "Qué linda forma de pensarlo. A veces lo más bonito nace donde menos se espera. ¿Has logrado algo aunque fuera difícil?",
          "Muy buen argumento. No hay una sola respuesta: lo importante es que lo explicaste. ¿Qué crees que necesitó la flor para no rendirse?",
        ],
      },
    ],
  },

  {
    id: "barco",
    title: "El barquito valiente",
    topic: "Mar",
    emoji: "⛵",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En el puerto había muchos barcos grandes y un barquito pequeño llamado Coco. Los barcos grandes presumían de viajar a tierras lejanas, y a Coco lo dejaban siempre amarrado al muelle.",
      "Una noche, una tormenta sorprendió a un pescador cuyo bote se había quedado sin motor, muy cerca de las rocas. Los barcos grandes no cabían entre las rocas para llegar hasta él.",
      "Coco, que era pequeño y ágil, se ofreció a ir. Navegó entre las olas y las piedras con cuidado, llegó hasta el pescador y lo remolcó de vuelta al puerto sano y salvo.",
      "Al amanecer, todos felicitaron a Coco. Hasta los barcos más grandes entendieron que ser pequeño también puede ser una gran ventaja.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacían los barcos grandes con Coco?",
        options: [
          "Lo llevaban de viaje",
          "Lo dejaban siempre amarrado al muelle",
          "Lo cuidaban con cariño",
          "Lo seguían a todas partes",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Dónde dejaban siempre a Coco?",
          "Relee el primer párrafo: dice qué pasaba con Coco mientras los grandes viajaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Coco pudo rescatar al pescador y los barcos grandes no?",
        options: [
          "Porque Coco era más rápido",
          "Porque Coco era pequeño y cabía entre las rocas",
          "Porque los grandes tenían miedo",
          "Porque el pescador llamó a Coco",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento te da la pista: hay que unir las ideas. ¿Por qué los grandes no podían acercarse?",
          "Relee el segundo y tercer párrafo. Si los grandes no cabían entre las rocas, ¿qué ventaja tenía ser pequeño?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al final, ser pequeño resultó una ventaja para Coco. ¿Crees que algo que parece una desventaja puede convertirse en algo bueno? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en cómo una debilidad puede volverse fuerza y lo explicaste. ¿Tienes alguna cualidad que a veces ves como problema pero podría ayudarte?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Crees que los barcos grandes mirarán distinto a Coco ahora?",
        ],
      },
    ],
  },

  {
    id: "cocinero",
    title: "El pequeño cocinero",
    topic: "Comida",
    emoji: "👨‍🍳",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "A Beto le encantaba cocinar. Un domingo quiso preparar él solo unos panqueques para sorprender a su mamá en el desayuno.",
      "Pero al primer intento se le quemaron, y al segundo le quedaron crudos por dentro. Beto estuvo a punto de tirar todo y rendirse.",
      "Entonces leyó con calma la receta de su abuela: fuego bajo y voltear el panqueque justo cuando aparecen burbujas. Lo intentó de nuevo, paso a paso, sin apurarse.",
      "El tercer panqueque le salió dorado y esponjoso. Su mamá se despertó con el olorcito y lo abrazó feliz. Beto aprendió que seguir los pasos con paciencia hace toda la diferencia.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué quería preparar Beto para sorprender a su mamá?",
        options: [
          "Una torta",
          "Unos panqueques",
          "Una sopa",
          "Un jugo",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué quería cocinar Beto?",
          "Relee el primer párrafo: dice qué quiso preparar para el desayuno.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al tercer intento el panqueque le salió bien?",
        options: [
          "Porque su mamá lo ayudó",
          "Porque siguió la receta con calma, paso a paso",
          "Porque usó otra sartén",
          "Porque tuvo suerte",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: hay que deducirlo. ¿Qué hizo distinto en el tercer intento?",
          "Relee el tercer párrafo. Si leyó la receta y fue sin apurarse, ¿qué cambió respecto a antes?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Beto casi se rinde, pero siguió intentando con paciencia. ¿Crees que vale la pena seguir intentando cuando algo no sale a la primera? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en el valor de no rendirse y lo explicaste. ¿Has logrado algo después de varios intentos?",
          "Me gusta tu razonamiento. No hay una única respuesta: lo importante es defenderla. ¿Qué crees que habría pasado si Beto tiraba todo en el segundo intento?",
        ],
      },
    ],
  },

  {
    id: "muneco",
    title: "El muñeco de nieve",
    topic: "Invierno",
    emoji: "☃️",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Una mañana de invierno, Lena hizo un muñeco de nieve precioso, con una bufanda roja y una nariz de zanahoria. Le puso por nombre Frosty y jugó con él todo el día.",
      "Al atardecer, el sol salió tibio y Lena notó que Frosty empezaba a derretirse poco a poco. Se puso muy triste y quería que el invierno durara para siempre.",
      "Su papá le explicó: «La nieve viene y se va, así son las estaciones. Por eso disfrutamos tanto a Frosty mientras está». Lena entendió y aprovechó cada minuto con su muñeco.",
      "Esa noche guardó la bufanda y la zanahoria en una caja. El próximo invierno haría otro Frosty, y eso también la hacía sonreír.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le puso Lena al muñeco de nariz?",
        options: [
          "Un botón",
          "Una zanahoria",
          "Una piedra",
          "Una hoja",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Con qué hizo la nariz de Frosty?",
          "Relee el primer párrafo: dice de qué era la nariz del muñeco.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Frosty empezó a derretirse al atardecer?",
        options: [
          "Porque alguien lo empujó",
          "Porque el sol salió tibio",
          "Porque Lena lo movió",
          "Porque se hizo de noche",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento te da la pista: hay que unir las ideas. ¿Qué pasó con el clima al atardecer?",
          "Relee el segundo párrafo. Si salió el sol tibio, ¿qué le pasa a la nieve con el calor?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El papá dijo que disfrutamos más a Frosty porque no dura para siempre. ¿Crees que las cosas que se acaban se disfrutan más? Cuéntame qué piensas.",
        replies: [
          "Qué linda forma de verlo. A veces saber que algo es pasajero nos hace valorarlo más. ¿Hay algo que disfrutas justamente porque dura poco?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Crees que Lena estará contenta de hacer otro muñeco el próximo invierno?",
        ],
      },
    ],
  },

  {
    id: "mariquita",
    title: "La mariquita perdida",
    topic: "Animales",
    emoji: "🐞",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Una mariquita llamada Pinta se alejó volando de su hoja para explorar el jardín. Voló tan lejos que, al querer volver, ya no recordaba cuál era su hoja entre tantas plantas.",
      "Pinta se sintió perdida y empezó a llorar. Una hormiga que pasaba le preguntó qué tenía y ella le contó que no encontraba el camino a casa.",
      "La hormiga le dijo: «No te preocupes, sigamos juntas las huellas que dejaste». Caminaron despacio, fijándose en las hojas mordisqueadas que Pinta había probado de ida.",
      "Así, paso a paso, llegaron de regreso a la hoja de Pinta. La mariquita le dio las gracias a la hormiga y aprendió que prestar atención al camino ayuda a no perderse.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Pinta no podía volver a su hoja?",
        options: [
          "Porque estaba muy cansada",
          "Porque no recordaba cuál era entre tantas plantas",
          "Porque un pájaro se la llevó",
          "Porque empezó a llover",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué le pasó a Pinta al querer volver?",
          "Relee el primer párrafo: dice por qué no encontraba su hoja.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cómo lograron encontrar el camino de regreso?",
        options: [
          "Preguntando a otras mariquitas",
          "Siguiendo las hojas mordisqueadas que Pinta dejó al ir",
          "Volando muy alto para ver todo",
          "Esperando a que oscureciera",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo cuenta, pero hay que fijarse. ¿Qué huellas siguieron?",
          "Relee el tercer párrafo. ¿Qué había dejado Pinta de ida que les sirvió de pista?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La hormiga ayudó a Pinta aunque no la conocía. ¿Crees que está bien ayudar a alguien que está en apuros aunque sea un desconocido? Cuéntame por qué.",
        replies: [
          "Buena postura. Pensaste en ayudar a quien lo necesita y lo explicaste. ¿Tú ayudarías a alguien perdido aunque no lo conocieras?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Cómo crees que se sintió Pinta cuando la hormiga se ofreció a ayudar?",
        ],
      },
    ],
  },

  {
    id: "pajaro",
    title: "El pájaro que no sabía volar",
    topic: "Animales",
    emoji: "🐦",
    minutes: 4,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Pío era un pajarito que ya tenía sus alas, pero no se animaba a volar. Veía a sus hermanos lanzarse desde el nido y a él le temblaban las patas de solo pensarlo.",
      "Su mamá lo animaba con paciencia: «No tienes que ser perfecto, solo tienes que intentarlo. Yo estaré cerca por si me necesitas».",
      "Un día, Pío respiró hondo, abrió las alas y saltó del nido. Cayó un poco al principio, pero luego sintió el aire bajo sus plumas y, casi sin darse cuenta, ¡estaba volando!",
      "Pío dio una vuelta sobre el árbol y volvió feliz al nido. Aprendió que muchas veces el miedo se vence justo cuando uno se atreve a intentarlo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué sentía Pío cuando pensaba en volar?",
        options: [
          "Mucha alegría",
          "Le temblaban las patas",
          "Le daba sueño",
          "Sentía hambre",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué le pasaba a Pío de solo pensar en volar?",
          "Relee el primer párrafo: dice cómo reaccionaba su cuerpo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué hizo que Pío finalmente lograra volar?",
        options: [
          "Que sus hermanos lo empujaron",
          "Que se atrevió a intentarlo y saltó del nido",
          "Que el viento lo levantó",
          "Que su mamá lo cargó",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo cuenta, pero hay que unir las ideas. ¿Qué hizo Pío después de respirar hondo?",
          "Relee el tercer párrafo. Si saltó por su cuenta, ¿qué fue lo que se animó a hacer?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La mamá le dijo a Pío que no tenía que ser perfecto, solo intentarlo. ¿Estás de acuerdo con ese consejo? Cuéntame qué piensas.",
        replies: [
          "Me encanta cómo lo pensaste. Intentar ya es un gran paso, aunque no salga perfecto. ¿Te has atrevido a algo nuevo aunque te diera miedo?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Qué crees que habría pasado si Pío nunca se atrevía a saltar?",
        ],
      },
    ],
  },

  {
    id: "semilla",
    title: "La semilla dormida",
    topic: "Naturaleza",
    emoji: "🌰",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Bajo la tierra dormía una semilla pequeñita. Hacía frío y estaba oscuro, así que la semilla pensaba que nunca pasaría nada interesante en su vida.",
      "Un día sintió el agua de la lluvia y el calorcito del sol que llegaba desde arriba. Algo dentro de ella empezó a despertar, aunque la semilla no entendía qué era.",
      "Poco a poco, una raíz bajó buscando agua y un brote subió buscando la luz. La semilla, sin saberlo, se estaba convirtiendo en una plantita verde.",
      "Cuando el brote asomó por fin a la superficie, la antigua semilla descubrió un mundo lleno de cielo, pájaros y sol. Lo interesante sí existía: solo necesitaba tiempo para llegar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo era el lugar donde dormía la semilla?",
        options: [
          "Caluroso y luminoso",
          "Frío y oscuro, bajo la tierra",
          "Lleno de pájaros",
          "Sobre una rama",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Cómo era debajo de la tierra?",
          "Relee el primer párrafo: dice cómo se sentía el lugar donde dormía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué hizo que la semilla empezara a despertar?",
        options: [
          "Otra planta la llamó",
          "El agua de la lluvia y el calor del sol",
          "Un gusano la movió",
          "El frío de la noche",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento te da la pista: hay que unir las ideas. ¿Qué sintió la semilla justo antes de despertar?",
          "Relee el segundo párrafo. ¿Qué dos cosas llegaron desde arriba?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La semilla creía que nunca pasaría nada interesante, pero se equivocaba. ¿Crees que a veces juzgamos las cosas antes de tiempo? Cuéntame por qué.",
        replies: [
          "Qué linda forma de pensarlo. A veces lo bueno tarda en llegar y vale la pena esperar. ¿Te ha pasado que algo resultó mejor de lo que esperabas?",
          "Muy buen argumento. No hay una sola respuesta: lo importante es que lo explicaste. ¿Qué crees que necesitó la semilla para descubrir el mundo de afuera?",
        ],
      },
    ],
  },

  {
    id: "vela",
    title: "La vela en la oscuridad",
    topic: "Hogar",
    emoji: "🕯️",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Una noche de tormenta se fue la luz en toda la casa. Dani tenía un poco de miedo en la oscuridad, hasta que su mamá encendió una vela pequeña sobre la mesa.",
      "La vela iluminaba apenas un rinconcito, pero era suficiente para que Dani viera la cara de su mamá y dejara de tener miedo. Entonces tocaron a la puerta los vecinos: a ellos también se les había ido la luz.",
      "Dani tuvo una idea: con su vela encendió otra velita para los vecinos, y la luz no se hizo más pequeña, sino que ahora alumbraba dos casas. Siguieron encendiendo velas para todos.",
      "Pronto la cuadra entera tenía lucecitas en las ventanas. Dani aprendió que compartir lo que uno tiene no lo hace menos, a veces lo hace más grande.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué se quedó la casa a oscuras?",
        options: [
          "Porque era muy tarde",
          "Porque se fue la luz por la tormenta",
          "Porque apagaron las lámparas",
          "Porque cerraron las cortinas",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Qué pasó durante la tormenta?",
          "Relee el primer párrafo: dice por qué se quedaron sin luz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué descubrió Dani al encender otra vela con la suya?",
        options: [
          "Que su vela se apagaba",
          "Que la luz no se hacía menor, sino que alumbraba más",
          "Que las velas eran peligrosas",
          "Que ya no necesitaba luz",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo cuenta, pero hay que fijarse. ¿Qué pasó con la luz al encender otra vela?",
          "Relee el tercer párrafo. Si la luz alumbraba dos casas, ¿se hizo más pequeña o más grande?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Dani descubrió que compartir su luz no lo dejaba con menos. ¿Crees que compartir lo que tenemos nos quita o nos suma? Cuéntame qué piensas.",
        replies: [
          "Qué linda forma de verlo. Hay cosas que, al compartirlas, crecen en vez de achicarse. ¿Se te ocurre algo así que tú puedas compartir?",
          "Muy buena reflexión. No hay una sola respuesta correcta: lo importante es que la defiendas. ¿Crees que toda la cuadra se sintió mejor con las lucecitas?",
        ],
      },
    ],
  },

  {
    id: "estrellamar",
    title: "La estrella de mar",
    topic: "Mar",
    emoji: "⭐",
    minutes: 4,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Después de una gran marea, cientos de estrellas de mar quedaron varadas en la playa, lejos del agua. Bajo el sol fuerte, no podían volver solas al mar.",
      "Una niña llamada Emma empezó a recogerlas una por una y a devolverlas al agua. Un señor que paseaba le dijo: «Hay miles, niña. Hagas lo que hagas, no vas a cambiar nada».",
      "Emma tomó otra estrella de mar, la lanzó con cuidado a las olas y respondió: «Para esta sí cambié algo». Y siguió recogiendo, una tras otra.",
      "El señor se quedó pensando y, poco después, empezó a ayudarla. Entre los dos salvaron muchísimas estrellas. Emma demostró que ayudar a uno solo ya vale la pena.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué las estrellas de mar no podían volver solas al mar?",
        options: [
          "Porque estaban dormidas",
          "Porque quedaron varadas en la playa, lejos del agua",
          "Porque preferían la arena",
          "Porque era de noche",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Dónde quedaron las estrellas después de la marea?",
          "Relee el primer párrafo: dice por qué no podían regresar al agua.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir Emma con «para esta sí cambié algo»?",
        options: [
          "Que solo le importaba una estrella",
          "Que aunque no podía salvarlas a todas, sí ayudaba a cada una que devolvía",
          "Que las demás no le interesaban",
          "Que el señor tenía razón",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo explica del todo: hay que deducirlo. ¿Por qué lo dijo justo después de lanzar una estrella al agua?",
          "Relee el tercer párrafo. Si no podía salvarlas a todas, ¿qué sí lograba con cada una?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El señor pensaba que ayudar a unas pocas no servía de nada. ¿Tú estás de acuerdo con él o con Emma? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en si ayudar un poco vale la pena y lo explicaste. ¿Tú crees que los pequeños gestos cuentan?",
          "Muy bien razonado. No hay una respuesta única: lo valioso es defenderla. ¿Por qué crees que el señor terminó ayudando a Emma?",
        ],
      },
    ],
  },

  {
    id: "bici",
    title: "La niña que arregló la bicicleta",
    topic: "Inventos",
    emoji: "🔧",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "A Lucía le regalaron una bicicleta vieja que llevaba años olvidada en el garaje. Tenía la cadena suelta, una llanta pinchada, el timbre roto y el manubrio torcido. Cualquiera habría dicho que ya no servía para nada.",
      "Su abuelo, que se ganaba la vida arreglando relojes, no se la reparó de una vez. En cambio, le dijo: «Si quieres que ande, primero tienes que entender cómo funciona cada parte». A Lucía la respuesta le pareció rara, porque ella solo quería salir a pasear cuanto antes.",
      "Sin saber nada de mecánica, sacó la caja de herramientas y se puso a observar. Se equivocó muchas veces: apretó tornillos que iban flojos y aflojó otros que debían quedar firmes. Cada error la obligaba a detenerse y a mirar la bicicleta con más cuidado que antes.",
      "Poco a poco fue descubriendo que cada pieza tenía una tarea distinta: la cadena movía la llanta, los frenos la detenían y el timbre avisaba a los demás. Cuando entendió eso, los arreglos dejaron de ser al azar y empezaron a tener sentido.",
      "Después de tres tardes llenas de grasa, la bicicleta volvió a rodar. Lucía dio una vuelta a la manzana sonriendo. Lo mejor no era tener la bici, sino saber exactamente por qué funcionaba. Desde entonces, ante cualquier cosa dañada en casa, decía: «Déjame ver si lo entiendo».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De qué se ganaba la vida el abuelo de Lucía?",
        options: [
          "Arreglaba relojes",
          "Vendía bicicletas",
          "Era mecánico de carros",
          "Fabricaba herramientas",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El dato está en el segundo párrafo, cuando aparece el abuelo.",
          "Relee dónde se presenta al abuelo: dice a qué se dedicaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el abuelo no le arregló la bicicleta de una vez?",
        options: [
          "Quería que Lucía aprendiera a entenderla por sí misma",
          "No tenía tiempo para ayudarla",
          "No sabía cómo hacerlo",
          "La bicicleta no tenía arreglo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El abuelo no lo dice directo: dedúcelo de su consejo. ¿Qué le pidió hacer primero?",
          "Piensa para qué le serviría a Lucía entender la bici en vez de recibirla ya arreglada.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los arreglos de Lucía empezaron a funcionar mejor?",
        options: [
          "Porque entendió para qué servía cada pieza",
          "Porque compró herramientas nuevas",
          "Porque al final los hizo su abuelo",
          "Porque tuvo suerte",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: al principio se equivocaba y luego mejoró. ¿Qué cambió en ella?",
          "Relee el cuarto párrafo: dice qué descubrió antes de que los arreglos tuvieran sentido.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lucía dijo que lo mejor no era tener la bici, sino entender cómo funcionaba. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en qué tiene más valor y lo justificaste. ¿Hay algo que a ti te guste entender por dentro?",
          "Muy bien argumentado. No hay respuesta única: lo importante son tus razones. ¿Crees que entender las cosas nos hace más capaces?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El abuelo enseñó a Lucía a resolver sola en vez de darle todo hecho. ¿Te parece una buena forma de ayudar? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en qué es ayudar de verdad y lo defendiste. ¿Prefieres que te resuelvan algo o que te enseñen a hacerlo?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué se gana cuando uno aprende a resolver por su cuenta?",
        ],
      },
    ],
  },

  {
    id: "zorro",
    title: "El zorro y la luciérnaga",
    topic: "Bosque",
    emoji: "🦊",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "Una noche sin luna, un zorro joven se perdió en lo más profundo del bosque. La oscuridad era tan espesa que apenas distinguía sus propias patas, y cada crujido de ramas le parecía una amenaza escondida.",
      "El miedo lo dejó paralizado. Pensó que, si no podía ver el camino completo hasta su casa, lo más seguro era no moverse. Así que se quedó quieto, temblando, esperando algo que ni él mismo sabía qué era.",
      "De entre los arbustos salió una luciérnaga diminuta, con una lucecita amarilla y temblorosa. «No puedo iluminar todo el bosque», le dijo, «pero sí puedo alumbrar el lugar donde vas a poner la siguiente pata. Si caminas conmigo, paso a paso, vas a salir».",
      "Al zorro le pareció una ayuda demasiado pequeña para un problema tan grande. Aun así, como no se le ocurría nada mejor, decidió confiar. Cada vez que daba un paso, la luciérnaga adelantaba su luz y le mostraba el siguiente trecho del camino.",
      "Sin darse cuenta, cruzaron el bosque entero. Cuando el zorro vio por fin la luz del amanecer sobre el campo abierto, comprendió algo importante: no necesitaba ver todo el camino de una vez, sino luz suficiente para el siguiente paso y valor para darlo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo era la luz de la luciérnaga?",
        options: [
          "Pequeña, amarilla y temblorosa",
          "Grande y blanca",
          "Roja y muy fuerte",
          "Azul y fría",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "La descripción está en el tercer párrafo, cuando aparece la luciérnaga.",
          "Relee cuando sale de los arbustos: dice de qué color y tamaño era su luz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el zorro se quedó quieto al principio?",
        options: [
          "Porque creía que, sin ver todo el camino, era mejor no moverse",
          "Porque estaba muy cansado",
          "Porque le gustaba la oscuridad",
          "Porque esperaba a su familia",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "No se dice con un “por eso”: hay que deducirlo. ¿Qué pensaba el zorro sobre el camino?",
          "Relee el segundo párrafo: dice qué creía el zorro que era lo más seguro.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué nos quiere enseñar la luz que alumbra “un paso a la vez”?",
        options: [
          "Que los problemas grandes se enfrentan poco a poco",
          "Que es mejor quedarse quieto en la oscuridad",
          "Que las luciérnagas son mágicas",
          "Que el bosque siempre es peligroso",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Es la idea de fondo, no está escrita tal cual. ¿Qué comprendió el zorro al final?",
          "Piensa qué significa “luz para el siguiente paso” cuando algo te parece enorme.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El zorro creyó que una ayuda tan pequeña no servía, pero igual confió. ¿Tú habrías confiado? Explícalo con tus palabras.",
        replies: [
          "Muy buena respuesta. Pensaste en confiar o no, y diste tus razones. ¿Te ha pasado que una ayuda pequeña te sirvió mucho?",
          "Me gusta cómo lo defiendes. No hay respuesta única. ¿Qué crees que habría pasado si el zorro se quedaba quieto por miedo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Cuéntame con tus palabras algo grande o difícil que podrías lograr “paso a paso”, como hizo el zorro.",
        replies: [
          "Qué buen ejemplo. Lo explicaste con tus propias palabras, que es lo importante. ¿Cuál sería el primer pasito?",
          "Muy bien pensado. Dividir lo grande en partes pequeñas ayuda mucho. ¿Por qué crees que cuesta menos así?",
        ],
      },
    ],
  },

  {
    id: "semaforo",
    title: "El semáforo descompuesto",
    topic: "Ciudad",
    emoji: "🚦",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Una mañana de lunes, el semáforo de la esquina más transitada de la ciudad dejó de funcionar. Sus tres luces se apagaron justo a la hora en que todos salían al trabajo y al colegio.",
      "En pocos minutos se formó un trancón enorme. Los carros no sabían cuándo avanzar, todos querían pasar al mismo tiempo y nadie cedía. Las bocinas sonaban sin parar y la gente se asomaba por las ventanillas, cada vez más molesta.",
      "Don Ernesto, un señor mayor que vendía periódicos en esa esquina desde hacía años, observó el desorden por un momento. Entonces dejó su puesto, se paró en la mitad de la calle y, con las manos, empezó a dirigir: a unos los detenía y a otros los dejaba pasar, por turnos.",
      "Al principio varios conductores no le hicieron caso; pensaban que un vendedor de periódicos no tenía por qué darles órdenes. Pero al notar que, justo donde él organizaba, el trancón se deshacía, poco a poco empezaron a confiar en sus señas.",
      "Cuando por fin llegó la grúa a reparar el semáforo, los carros ya circulaban como si nada hubiera pasado. Varios conductores le agradecieron con la mano. Don Ernesto volvió a su puesto de periódicos como si nada, pero esa mañana caminó un poco más erguido.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué vendía don Ernesto en la esquina?",
        options: ["Periódicos", "Frutas", "Flores", "Helados"],
        correct: 0,
        evidence: 2,
        hints: [
          "El dato está en el tercer párrafo, cuando se presenta a don Ernesto.",
          "Relee dónde aparece don Ernesto: dice qué vendía desde hacía años.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio algunos conductores no le hicieron caso?",
        options: [
          "Porque pensaban que un vendedor de periódicos no debía dar órdenes",
          "Porque no lo alcanzaban a ver",
          "Porque tenían demasiado afán",
          "Porque era de noche",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo de lo que pensaban los conductores sobre él.",
          "Relee el cuarto párrafo: dice qué creían sobre un vendedor de periódicos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué don Ernesto “caminó un poco más erguido” al final?",
        options: [
          "Porque se sintió orgulloso de haber ayudado",
          "Porque le dolía la espalda",
          "Porque le pagaron mucho dinero",
          "Porque vendió todos los periódicos",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "“Caminar más erguido” es una pista de cómo se sentía. ¿Qué acababa de lograr?",
          "Une lo que hizo con cómo terminó: ayudó a todos y luego caminó distinto. ¿Qué sentía por dentro?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Don Ernesto ayudó sin que se lo pidieran y sin recibir nada a cambio. ¿Crees que vale la pena ayudar así? Explícalo con tus palabras.",
        replies: [
          "Qué buena postura. Pensaste en por qué ayudar y lo sustentaste. ¿Has ayudado alguna vez sin esperar nada?",
          "Muy bien razonado. No hay una sola respuesta: lo importante son tus motivos. ¿Cómo crees que se sintió la gente a la que ayudó?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué crees que habría pasado si nadie se hubiera atrevido a organizar el tráfico?",
        replies: [
          "Buen análisis. Imaginaste las consecuencias y las explicaste. ¿Por qué crees que a veces nadie se anima a ayudar?",
          "Muy bien. No hay respuesta única. ¿Qué hace falta para que alguien dé el primer paso, como don Ernesto?",
        ],
      },
    ],
  },

  {
    id: "salon",
    title: "La nueva del salón",
    topic: "Amistad",
    emoji: "🎒",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Camila llegó a mitad de año a un colegio nuevo, en una ciudad que no conocía. Hablaba con un acento distinto y todavía no entendía las bromas que los demás repetían entre risas.",
      "En los recreos se sentaba sola en una banca del fondo, sacaba un cuaderno y se ponía a dibujar para que el tiempo pasara más rápido. Desde lejos parecía tranquila, pero por dentro deseaba que alguien se acercara a hablarle.",
      "Martín la observaba todos los días desde su grupo de amigos. Tenía ganas de invitarla a jugar, pero le daba pena que los demás se burlaran de él por hablar con «la nueva». Durante una semana entera no hizo más que saludarla con la cabeza.",
      "Un día, Camila tropezó y se le regaron por el piso todos sus colores. Casi nadie se detuvo. Martín, sin pensarlo más, corrió a ayudarla a recogerlos. Mientras juntaban los lápices, descubrieron que a los dos les encantaba dibujar.",
      "Desde entonces se sentaron juntos en el recreo a dibujar. Con el tiempo, algunos amigos de Martín se acercaron también, con curiosidad. Camila dejó de estar sola, y Martín aprendió que a veces hay que hacer lo correcto aunque dé un poco de pena.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Camila en los recreos al principio?",
        options: [
          "Se sentaba sola a dibujar en un cuaderno",
          "Jugaba fútbol con todos",
          "Leía en la biblioteca",
          "Hablaba con sus amigas",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Qué sacaba Camila en el recreo?",
          "Relee dónde se sentaba y qué hacía para pasar el tiempo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "Aunque Camila parecía tranquila, ¿qué sentía en realidad?",
        options: [
          "Deseaba que alguien se acercara a hablarle",
          "Prefería estar siempre sola",
          "Estaba enojada con todos",
          "No le importaba nadie del salón",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El cuento contrasta cómo se veía con lo que sentía. Fíjate en lo que dice “por dentro”.",
          "Relee el segundo párrafo: dice qué deseaba Camila aunque pareciera tranquila.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Martín tardó una semana en acercarse a Camila?",
        options: [
          "Porque temía que sus amigos se burlaran de él",
          "Porque no la había visto",
          "Porque no le caía bien",
          "Porque estaba muy ocupado",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "El cuento da una pista de lo que sentía Martín. ¿Qué le preocupaba de sus amigos?",
          "Relee el tercer párrafo: dice qué temía Martín que pasara si le hablaba.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Martín tardó en acercarse por miedo a las burlas. ¿Qué piensas de eso y qué habrías hecho tú? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Te pusiste en el lugar de Martín y diste tus razones. ¿Es difícil hacer lo correcto cuando da pena?",
          "Muy bien defendido. No hay respuesta única. ¿Crees que vale la pena arriesgarse a que se burlen por ayudar a alguien?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras, ¿por qué crees que para Camila fue tan importante que alguien por fin se acercara?",
        replies: [
          "Qué bien lo explicaste. Pensaste en cómo se sentía Camila. ¿Te has sentido solo alguna vez y alguien te acompañó?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que cambia para alguien cuando deja de sentirse solo?",
        ],
      },
    ],
  },

  {
    id: "faro",
    title: "El guardián del faro",
    topic: "Mar",
    emoji: "🗼",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Don Aurelio cuidaba el faro de una isla pequeña. Cada noche, sin importar el cansancio, encendía la enorme lámpara para que los barcos no chocaran contra las rocas escondidas bajo el agua.",
      "Vivía solo y casi nadie lo visitaba. Algunos en el pueblo decían que su trabajo era inútil, porque ahora los barcos tenían aparatos modernos para orientarse y ya no necesitaban la luz.",
      "Una noche de tormenta, esos aparatos fallaron en un barco de pescadores. La lluvia era tan espesa que el capitán no veía nada. Entonces, a lo lejos, distinguió un punto de luz que aparecía y desaparecía: era el faro de don Aurelio.",
      "Siguiendo esa luz, el barco logró rodear las rocas y llegar a salvo al puerto. Los pescadores contaron a todos lo que había pasado, y el pueblo entendió que el trabajo silencioso de don Aurelio seguía salvando vidas.",
      "Don Aurelio no buscaba que lo aplaudieran. Para él, lo importante era que cada noche la luz estuviera encendida, por si alguien la necesitaba. Hay trabajos que no se ven, pero sostienen mucho más de lo que parece.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué encendía don Aurelio cada noche?",
        options: [
          "La enorme lámpara del faro",
          "Una fogata en la playa",
          "Las luces del pueblo",
          "Un farol de mano",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué prendía para guiar a los barcos?",
          "Relee el comienzo: dice qué encendía cada noche.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué algunos en el pueblo creían que su trabajo era inútil?",
        options: [
          "Porque pensaban que los aparatos modernos ya reemplazaban la luz",
          "Porque el faro estaba dañado",
          "Porque ya no pasaban barcos",
          "Porque don Aurelio era muy viejo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué tenían ahora los barcos para orientarse?",
          "Relee el segundo párrafo: dice por qué creían que la luz ya no hacía falta.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el barco de pescadores se salvó esa noche?",
        options: [
          "Porque siguió la luz del faro cuando sus aparatos fallaron",
          "Porque la tormenta paró de repente",
          "Porque conocían las rocas de memoria",
          "Porque otro barco los guió",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: los aparatos fallaron y luego vieron algo a lo lejos. ¿Qué siguieron?",
          "Relee el tercer y cuarto párrafo: dice qué luz los guió hasta el puerto.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo creía que el faro ya no servía, hasta que salvó al barco. ¿Qué piensas de juzgar algo como inútil sin estar seguro? Explícalo con tus palabras.",
        replies: [
          "Buena reflexión. Pensaste en juzgar sin estar seguro y lo explicaste. ¿Te ha pasado que algo resultó más útil de lo que creías?",
          "Muy bien sustentado. No hay una sola respuesta. ¿Qué problemas puede traer decidir que algo no sirve sin comprobarlo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Don Aurelio hacía un trabajo que casi nadie veía. ¿Crees que esos trabajos “invisibles” son importantes? Defiende tu idea.",
        replies: [
          "Qué buen punto. Pensaste en los trabajos que no se notan y lo argumentaste. ¿Qué trabajo invisible te parece valioso en tu vida?",
          "Muy bien. No hay respuesta única. ¿Qué pasaría si nadie hiciera esos trabajos que casi no se ven?",
        ],
      },
    ],
  },

  {
    id: "ajedrez",
    title: "La partida de ajedrez",
    topic: "Juegos",
    emoji: "♟️",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Sebastián aprendió a jugar ajedrez con su tía Marta, la campeona del barrio. Al principio perdía siempre, porque movía sus piezas sin pensar, solo buscando comer las del rival lo más rápido posible.",
      "Su tía le repetía una idea: «No mires solo la jugada de ahora; imagina qué pasará dos o tres movimientos después». A Sebastián le costaba, porque quería ganar ya y no tenía paciencia para planear.",
      "Un día decidió intentarlo en serio. Antes de mover cada pieza, se detenía a pensar qué haría su tía como respuesta, y qué haría él después de eso. Las partidas se volvieron más lentas, pero también más interesantes.",
      "Poco a poco empezó a anticipar las trampas de su tía y a tenderle las suyas. No siempre ganaba, pero ya no perdía por descuido. Cada derrota le enseñaba una jugada nueva que guardaba para la próxima vez.",
      "Meses después, Sebastián le ganó a su tía por primera vez. Más que el triunfo, le gustó descubrir que pensar antes de actuar servía no solo en el tablero, sino también fuera de él.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Quién le enseñó a Sebastián a jugar ajedrez?",
        options: [
          "Su tía Marta",
          "Su abuelo",
          "Su profesor",
          "Un amigo del barrio",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Con quién aprendió a jugar?",
          "Relee el comienzo: dice quién era la campeona del barrio.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Sebastián perdía siempre al principio?",
        options: [
          "Porque movía las piezas sin pensar en lo que venía después",
          "Porque su tía hacía trampa",
          "Porque no conocía las reglas",
          "Porque jugaba demasiado lento",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Dedúcelo de cómo jugaba. ¿Se detenía a pensar o movía rápido?",
          "Relee el primer párrafo: dice cómo movía sus piezas al principio.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Sebastián dejó de perder “por descuido”?",
        options: [
          "Porque empezó a anticipar las jugadas siguientes",
          "Porque su tía lo dejaba ganar",
          "Porque memorizó un solo truco",
          "Porque jugaba mucho más rápido",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué empezó a hacer antes de mover cada pieza?",
          "Relee el cuarto párrafo: dice qué logró anticipar.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La tía decía: pensar antes de mover. ¿Crees que eso sirve también fuera del ajedrez? Explícalo con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Llevaste la idea a la vida real, que es lo importante. ¿En qué otra cosa te sirve pensar antes de actuar?",
          "Muy bien. No hay una sola respuesta. ¿Qué puede salir mal cuando uno actúa sin pensar?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Sebastián aprendía algo de cada derrota. ¿Te parece bueno aprender de los errores en vez de frustrarse? Defiende tu idea.",
        replies: [
          "Gran reflexión. Pensaste en el valor de los errores y lo argumentaste. ¿Has aprendido algo de una vez que perdiste?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se gana cuando vemos un error como una enseñanza?",
        ],
      },
    ],
  },

  {
    id: "rio",
    title: "El río que cambió de curso",
    topic: "Naturaleza",
    emoji: "🏞️",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Durante toda su vida, los habitantes de un pequeño valle habían vivido junto a un río que pasaba justo al lado de sus casas. De él tomaban agua, lavaban la ropa y regaban sus cultivos.",
      "Una temporada de lluvias muy fuertes hizo que el río se desbordara y, al bajar, encontrara un camino nuevo. El agua dejó de pasar por el viejo cauce y se fue a correr por el otro lado del valle, lejos del pueblo.",
      "Al principio, la gente se quejó y quiso obligar al río a volver. Cavaron zanjas y amontonaron piedras, pero el agua siempre encontraba la manera de seguir su nuevo camino. Estaban gastando sus fuerzas en una pelea imposible.",
      "Entonces una anciana propuso algo distinto: en vez de pelear con el río, mudar poco a poco las cosechas y los pozos hacia donde ahora corría el agua. A muchos les costó aceptarlo, porque significaba cambiar costumbres de toda la vida.",
      "Con el tiempo, el pueblo floreció junto al nuevo cauce, incluso mejor que antes. Aprendieron que, cuando algo no se puede cambiar, a veces es más sabio adaptarse que empeñarse en lo de siempre.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué usaban el río los habitantes del valle?",
        options: [
          "Para tomar agua, lavar la ropa y regar cultivos",
          "Solo para pescar",
          "Para navegar en botes",
          "Para nadar en el verano",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "La lista está en el primer párrafo. Vuelve a leerlo con calma.",
          "Relee el comienzo: nombra los usos que le daban al río.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué las zanjas y las piedras no sirvieron para devolver el río?",
        options: [
          "Porque el agua siempre encontraba la manera de seguir su nuevo camino",
          "Porque nadie quiso ayudar",
          "Porque volvió a llover muy fuerte",
          "Porque las hicieron mal a propósito",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: por más que ponían obstáculos, ¿qué hacía el agua?",
          "Relee el tercer párrafo: dice por qué era una pelea imposible.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a muchos les costó aceptar la idea de la anciana?",
        options: [
          "Porque significaba cambiar costumbres de toda la vida",
          "Porque la anciana no les caía bien",
          "Porque era una idea muy cara",
          "Porque el agua estaba sucia",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: mudar los pozos y cultivos significaba dejar algo conocido. ¿Qué cuesta de eso?",
          "Relee el cuarto párrafo: dice qué implicaba aceptar la propuesta.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que a veces es más sabio adaptarse que pelear con lo que no se puede cambiar. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en cuándo conviene adaptarse y lo argumentaste. ¿Cómo sabes si algo se puede cambiar o no?",
          "Muy bien sustentado. No hay respuesta única. ¿Siempre es mejor adaptarse, o hay cosas por las que sí vale la pena luchar?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras, cuenta una situación en la que haya sido mejor adaptarse a un cambio que resistirse a él.",
        replies: [
          "Qué buen ejemplo. Lo explicaste con tus propias palabras, que es lo importante. ¿Cómo te sentiste después de adaptarte?",
          "Muy bien pensado. Adaptarse no siempre es fácil. ¿Qué te ayudó a aceptar ese cambio?",
        ],
      },
    ],
  },

  {
    id: "mercado",
    title: "El vendedor honesto",
    topic: "Ciudad",
    emoji: "🍎",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En el mercado de la ciudad había muchos puestos de frutas, casi todos uno al lado del otro. Don Hernán tenía el suyo en una esquina y vendía menos que los demás, porque no engañaba a nadie con el peso ni escondía la fruta dañada debajo de la buena.",
      "Sus vecinos de puesto se reían de él. «Así nunca vas a ganar bien», le decían, mientras ellos ponían el dedo en la balanza para cobrar de más sin que el cliente lo notara.",
      "Una mañana, una clienta descubrió que en otro puesto le habían vendido manzanas podridas escondidas en el fondo de la bolsa. Furiosa, lo contó a todo el que pasaba, y la noticia se regó por el mercado.",
      "Desde ese día, la gente empezó a preferir el puesto de don Hernán. Sabían que ahí la fruta era la que se veía y el peso era justo. Su esquina, antes vacía, se llenó de clientes fieles que volvían cada semana.",
      "Don Hernán siguió siendo el mismo de siempre. Había entendido que la honestidad puede tardar en dar frutos, pero construye algo que el engaño nunca logra: la confianza de los demás.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué al principio don Hernán vendía menos que los demás?",
        options: [
          "Porque no engañaba con el peso ni escondía la fruta dañada",
          "Porque su fruta era más cara",
          "Porque su puesto estaba cerrado",
          "Porque vendía muy poca variedad",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía distinto don Hernán?",
          "Relee el comienzo: dice por qué vendía menos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la gente empezó a preferir el puesto de don Hernán?",
        options: [
          "Porque confiaban en que su fruta y su peso eran justos",
          "Porque bajó mucho los precios",
          "Porque regalaba fruta",
          "Porque era el único puesto abierto",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: después del engaño en otro puesto, ¿qué buscaban los clientes?",
          "Relee el cuarto párrafo: dice de qué estaban seguros en el puesto de don Hernán.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué hacían los otros vendedores para cobrar de más?",
        options: [
          "Ponían el dedo en la balanza sin que el cliente lo notara",
          "Subían los precios a la vista de todos",
          "Vendían menos cantidad",
          "Cerraban más temprano",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está descrito en el segundo párrafo, cuando se burlan de don Hernán.",
          "Relee lo que hacían los vecinos con la balanza.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que la honestidad tarda, pero construye confianza. ¿Estás de acuerdo? Explícalo con tus razones.",
        replies: [
          "Buena reflexión. Pensaste en el valor de la honestidad y lo argumentaste. ¿Por qué crees que la confianza tarda en construirse?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué pasa con alguien cuando se descubre que engaña?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los vecinos se burlaban de don Hernán por ser honesto. ¿Habrías hecho como él o como ellos? Defiende tu decisión.",
        replies: [
          "Qué respuesta tan clara. Tomaste una postura y la defendiste. ¿Qué es lo más difícil de ser honesto cuando otros no lo son?",
          "Muy bien. No hay una sola respuesta correcta. ¿Crees que vale la pena ser honesto aunque al principio se gane menos?",
        ],
      },
    ],
  },

  {
    id: "violin",
    title: "La niña del violín",
    topic: "Música",
    emoji: "🎻",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Renata quería tocar en la orquesta de su ciudad, pero su violín sonaba áspero y desafinado. Cada vez que practicaba, su gato salía corriendo del cuarto y ella sentía ganas de rendirse.",
      "La directora de la orquesta le dijo que no bastaba con querer: tenía que practicar todos los días, aunque al principio sonara feo. «El sonido bonito no aparece de golpe», le explicó, «se construye nota por nota».",
      "Durante meses, Renata practicó media hora cada tarde. Algunos días avanzaba y otros parecía retroceder. Aprendió a no comparar su música con la de los demás, sino con la de ella misma el mes anterior.",
      "Poco a poco, las notas dejaron de chirriar. Un día su gato, en vez de huir, se quedó dormido escuchándola. Renata supo entonces que algo había cambiado de verdad.",
      "Cuando por fin tocó en la orquesta, no fue la mejor de todas, pero sí mucho mejor que la niña del violín áspero de un año atrás. Entendió que el progreso no es ganarle a otros, sino superarse a sí misma.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía el gato cuando Renata practicaba al principio?",
        options: [
          "Salía corriendo del cuarto",
          "Se dormía a su lado",
          "Maullaba contento",
          "Jugaba con el violín",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía el gato al oír el violín?",
          "Relee el comienzo: dice cómo reaccionaba el gato.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir la directora con que “el sonido bonito se construye nota por nota”?",
        options: [
          "Que mejorar toma tiempo y práctica diaria",
          "Que el violín estaba dañado",
          "Que debía comprar otro violín",
          "Que nunca lo iba a lograr",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "No es literal: es una idea. ¿Qué le pedía la directora que hiciera todos los días?",
          "Relee el segundo párrafo: dice que el buen sonido no aparece de golpe.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué fue importante que el gato se durmiera escuchándola?",
        options: [
          "Porque mostraba que su música ya sonaba mucho mejor",
          "Porque el gato estaba muy cansado",
          "Porque había dejado de practicar",
          "Porque el cuarto estaba caliente",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Compáralo con el principio: antes huía. ¿Qué significa que ahora se quede dormido?",
          "Relee el cuarto párrafo: el gato dejó de huir. ¿Qué dice eso de su música?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Renata se comparaba consigo misma, no con los demás. ¿Te parece una buena idea? Explica por qué.",
        replies: [
          "Buena reflexión. Pensaste en con quién compararse y lo explicaste. ¿Cómo te sientes cuando te comparas con otros?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se gana al mirar cuánto has mejorado tú mismo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que progresar es superarse a uno mismo. ¿Estás de acuerdo? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Llevaste la idea a algo concreto, que es lo importante. ¿En qué has mejorado tú con la práctica?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que comparar tu progreso contigo mismo puede animar más?",
        ],
      },
    ],
  },

  {
    id: "invento",
    title: "El invento que casi no funciona",
    topic: "Inventos",
    emoji: "💡",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Para la feria de ciencias, Daniela quiso construir una pequeña lámpara que se encendiera con la energía del sol. Tenía la idea clara en la cabeza, pero llevarla a la práctica resultó mucho más difícil de lo que creía.",
      "El primer día, no encendía nada. El segundo, encendía pero se apagaba enseguida. Probó cambiando los cables, el panel y la posición de la lámpara, y anotaba en un cuaderno qué fallaba en cada intento.",
      "Su hermano le dijo que se rindiera, que mejor presentara un cartel y ya. Daniela estuvo tentada, porque llevaba muchos intentos fallidos. Pero pensó que cada error le mostraba algo que antes no sabía.",
      "En el intento número diecisiete descubrió el problema: un cable estaba conectado al revés. Lo corrigió y, por fin, la lámpara brilló con la luz del sol guardada durante el día.",
      "En la feria, su lámpara no fue la más vistosa, pero Daniela explicó algo que impresionó a los jueces: todo lo que había aprendido en sus dieciséis errores. A veces, equivocarse muchas veces es parte de lograrlo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué quería construir Daniela para la feria?",
        options: [
          "Una lámpara que se encendiera con la energía del sol",
          "Un robot que caminara",
          "Un volcán de juguete",
          "Un cohete de agua",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué quería construir?",
          "Relee el comienzo: dice qué invento se le ocurrió.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Para qué anotaba en su cuaderno qué fallaba en cada intento?",
        options: [
          "Para aprender de cada error y no repetirlo",
          "Para mostrarlo bonito en la feria",
          "Porque se lo pidió su hermano",
          "Para contar cuántos días pasaban",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: si anota qué falla, ¿qué puede hacer en el siguiente intento?",
          "Relee el segundo párrafo: probaba cambios y los anotaba. ¿Para qué le servía eso?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Daniela no se rindió cuando su hermano se lo dijo?",
        options: [
          "Porque pensaba que cada error le enseñaba algo nuevo",
          "Porque su hermano la obligó a seguir",
          "Porque ya casi terminaba el primer día",
          "Porque le daba miedo hacer un cartel",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo de lo que pensaba Daniela sobre sus errores.",
          "Relee el tercer párrafo: dice qué le mostraba cada error.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que equivocarse muchas veces puede ser parte de lograr algo. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en el papel de los errores y lo argumentaste. ¿Has logrado algo después de varios intentos fallidos?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se aprende de un error que no se aprende del éxito fácil?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Si tú fueras Daniela en el intento número diez sin éxito, ¿seguirías o te rendirías? Defiende tu decisión.",
        replies: [
          "Qué respuesta tan honesta. Pesaste seguir o parar y lo defendiste. ¿Qué te ayudaría a no rendirte?",
          "Muy bien. No hay una sola respuesta. ¿Cómo sabes cuándo seguir intentando y cuándo cambiar de idea?",
        ],
      },
    ],
  },

  {
    id: "mapa",
    title: "El mapa del tesoro",
    topic: "Aventura",
    emoji: "🗺️",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "Tres amigos —Leo, Sara y Tomás— encontraron en el desván un viejo mapa que prometía un tesoro escondido en el bosque cercano. Cada uno leyó las pistas a su manera y, claro, no se ponían de acuerdo en qué camino tomar.",
      "Leo quería ir por el atajo del río; Sara, por el sendero de las rocas; Tomás, por el camino largo entre los árboles. Discutieron tanto que casi se devuelven a casa sin siquiera empezar la búsqueda.",
      "Entonces se les ocurrió juntar lo que cada uno había entendido del mapa. Las pistas de Leo servían para el comienzo, las de Sara para la mitad y las de Tomás para el final. Por separado, ninguno tenía el camino completo.",
      "Siguiendo el mapa entre los tres, llegaron a un viejo roble marcado con una equis. Cavaron un rato y encontraron una caja de lata con monedas antiguas y una nota: «El verdadero tesoro es saber buscarlo juntos».",
      "Más que las monedas, los tres recordarían siempre esa tarde. Habían aprendido que, cuando cada uno aporta lo que sabe, se llega a lugares que solos nunca habrían alcanzado.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Dónde encontraron los tres amigos el viejo mapa?",
        options: ["En el desván", "En el bosque", "Bajo el río", "En el colegio"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿En qué lugar de la casa lo hallaron?",
          "Relee el comienzo: dice dónde encontraron el mapa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué casi se devuelven a casa sin empezar?",
        options: [
          "Porque discutían y no se ponían de acuerdo en el camino",
          "Porque se hizo de noche",
          "Porque perdieron el mapa",
          "Porque les dio miedo el bosque",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: cada uno quería un camino distinto. ¿En qué terminó eso?",
          "Relee el segundo párrafo: dice qué pasó por tanto discutir.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué lograron llegar al tesoro?",
        options: [
          "Porque juntaron lo que cada uno había entendido del mapa",
          "Porque Leo conocía el bosque",
          "Porque siguieron un solo camino al azar",
          "Porque alguien les dijo dónde estaba",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: por separado ninguno tenía el camino completo. ¿Qué hicieron?",
          "Relee el tercer párrafo: dice cómo combinaron lo que cada uno sabía.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La nota decía que el verdadero tesoro era saber buscarlo juntos. ¿Qué crees que significa eso? Explícalo con tus palabras.",
        replies: [
          "Linda interpretación. Lo explicaste con tus propias palabras, que es lo importante. ¿Qué tesoro, además del dinero, encontraron los amigos?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que aprender a trabajar juntos vale tanto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Estás de acuerdo con que juntos se llega a donde solos no se podría? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿En qué cosa te ha servido la ayuda de otros?",
          "Muy bien sustentado. No hay respuesta única. ¿Siempre es mejor en equipo, o hay cosas que se hacen mejor solo?",
        ],
      },
    ],
  },

  {
    id: "reloj",
    title: "El reloj del abuelo",
    topic: "Familia",
    emoji: "⏰",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Cuando el abuelo de Mariana murió, le dejó como herencia su viejo reloj de bolsillo. No valía mucho dinero, pero el abuelo lo había llevado consigo durante toda su vida y lo apreciaba más que cualquier otra cosa.",
      "El reloj se había detenido el mismo día en que el abuelo se fue. Mariana lo guardó en un cajón, triste, pensando que ya nunca volvería a andar. Por meses no lo quiso ni mirar.",
      "Un día, su mamá le contó que el abuelo le daba cuerda al reloj cada mañana, sin falta, antes de empezar el día. «Mientras le dieras cuerda», le dijo, «el reloj seguía vivo».",
      "Mariana sacó el reloj del cajón y, con cuidado, le dio cuerda. Las manecillas empezaron a moverse otra vez, con su tic-tac suave. Le pareció escuchar un pedacito de su abuelo en ese sonido.",
      "Desde entonces, cada mañana le daba cuerda antes de ir al colegio, igual que él. Entendió que algunas personas siguen con nosotros en las cosas que cuidamos y en las costumbres que nos dejan.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le dejó el abuelo a Mariana como herencia?",
        options: [
          "Su viejo reloj de bolsillo",
          "Una casa",
          "Una caja de dinero",
          "Un libro",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué objeto heredó Mariana?",
          "Relee el comienzo: dice qué le dejó el abuelo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el reloj había dejado de andar?",
        options: [
          "Porque nadie le daba cuerda desde que el abuelo se fue",
          "Porque estaba roto",
          "Porque se había mojado",
          "Porque era demasiado viejo",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: el abuelo le daba cuerda cada mañana, y ya no está. ¿Qué pasó entonces?",
          "Relee lo que cuenta la mamá: ¿qué necesitaba el reloj para seguir andando?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a Mariana le pareció escuchar “un pedacito de su abuelo” en el tic-tac?",
        options: [
          "Porque el reloj le recordaba a él y a su costumbre diaria",
          "Porque el reloj hablaba",
          "Porque el abuelo estaba escondido",
          "Porque el reloj sonaba como su voz",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "No es literal: piénsalo. ¿Con quién relacionaba Mariana ese reloj?",
          "Relee el cuarto párrafo: el sonido le trajo el recuerdo de alguien. ¿De quién?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que algunas personas siguen con nosotros en las cosas que cuidamos. ¿Qué crees que significa eso? Explícalo con tus palabras.",
        replies: [
          "Qué linda interpretación. Lo explicaste con tus propias palabras, que es lo importante. ¿Qué costumbre te recuerda a alguien que quieres?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que cuidar algo de alguien nos hace sentir cerca de esa persona?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Tienes (o te gustaría tener) un objeto que te recuerde a alguien querido? ¿Por qué es importante para ti?",
        replies: [
          "Qué bonito. Pensaste en lo que ese objeto significa y lo explicaste. ¿Qué sientes cuando lo ves o lo usas?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que a veces un objeto sencillo vale tanto para alguien?",
        ],
      },
    ],
  },

  {
    id: "teatro",
    title: "La obra de teatro",
    topic: "Colegio",
    emoji: "🎭",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "El salón de Daniel iba a presentar una obra de teatro frente a todo el colegio. A él le tocó el papel principal, pero apenas se subía al escenario, las palabras se le olvidaban y le temblaban las piernas.",
      "En cada ensayo lo hacía peor. Algunos compañeros empezaron a impacientarse, pero Lucía, que hacía de árbol al fondo, se le acercó. «Cuando te trabes, mírame a mí», le dijo. «Yo te voy a ir diciendo la primera palabra con los labios».",
      "El día de la función, el teatro estaba lleno y Daniel sintió que el corazón se le salía. En la primera escena se quedó en blanco, como temía. Pero buscó a Lucía con la mirada y la vio moviendo los labios desde el fondo.",
      "Esa pequeña ayuda le devolvió la calma. Recordó la palabra, luego la frase, y poco a poco la obra fluyó. Cada vez que dudaba, una mirada a Lucía bastaba para seguir adelante.",
      "Al final, todos aplaudieron a Daniel por su actuación. Pero él sabía que el aplauso también era de Lucía, la del fondo. A veces, una ayuda pequeña en el momento justo lo cambia todo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué papel hacía Lucía en la obra?",
        options: [
          "Hacía de árbol al fondo",
          "El papel principal",
          "La narradora",
          "No actuaba, solo miraba",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo, cuando aparece Lucía.",
          "Relee dónde se presenta a Lucía: dice qué papel tenía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a Daniel le iba mal en los ensayos?",
        options: [
          "Porque se ponía nervioso y se le olvidaban las palabras",
          "Porque no le gustaba la obra",
          "Porque no quería actuar",
          "Porque Lucía lo distraía",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Dedúcelo de lo que le pasaba al subir al escenario.",
          "Relee el primer párrafo: dice qué le ocurría con las palabras y las piernas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Daniel pudo seguir la obra después de quedarse en blanco?",
        options: [
          "Porque Lucía le recordaba las palabras desde el fondo",
          "Porque el público se las sopló",
          "Porque leyó un papel escondido",
          "Porque empezó la obra de nuevo",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Une las pistas: Lucía le había prometido algo. ¿Qué vio Daniel cuando la buscó?",
          "Relee el tercer párrafo: dice qué hacía Lucía con los labios.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lucía ayudó a Daniel en silencio, sin buscar aplausos. ¿Qué piensas de ayudar así? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en ayudar sin que te vean y lo explicaste. ¿Te han ayudado así alguna vez?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que algunas personas ayudan sin buscar reconocimiento?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que una ayuda pequeña en el momento justo lo cambia todo. ¿Estás de acuerdo? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Qué pequeña ayuda te habría servido a ti en un momento difícil?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que el momento en que llega la ayuda importa tanto?",
        ],
      },
    ],
  },

  {
    id: "pozo",
    title: "El viajero y el pozo",
    topic: "Aventura",
    emoji: "🏜️",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "Un viajero cruzaba un desierto enorme bajo un sol que quemaba. Llevaba dos días caminando y casi no le quedaba agua. Si no encontraba más pronto, no lograría llegar al otro lado.",
      "Por fin halló un viejo pozo abandonado. A su lado había una pequeña jarra con agua y una nota: «Esta agua no es para beber. Échala primero en la bomba del pozo para que vuelva a funcionar; luego saca toda la que quieras. Y deja la jarra llena para el siguiente».",
      "El viajero dudó. Tenía tanta sed que quería beberse esa poca agua de una vez. Pero si la echaba en la bomba y la nota mentía, se quedaría sin nada. Era una decisión difícil bajo aquel sol.",
      "Después de pensarlo, decidió confiar. Echó el agua en la bomba, movió la palanca y, tras unos segundos eternos, brotó agua fresca y abundante. Bebió hasta saciarse y llenó todas sus botellas.",
      "Antes de irse, volvió a llenar la pequeña jarra y dejó la nota tal como la había encontrado, para el próximo viajero. Entendió que confiar y pensar en los demás, aunque cueste, también nos cuida a nosotros.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué encontró el viajero junto al pozo?",
        options: [
          "Una pequeña jarra con agua y una nota",
          "Un mapa del desierto",
          "Una sombra para descansar",
          "A otro viajero dormido",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo, cuando halla el pozo.",
          "Relee qué había al lado del pozo abandonado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el viajero dudó en echar el agua en la bomba?",
        options: [
          "Porque si la nota mentía, se quedaría sin nada de agua",
          "Porque no sabía leer la nota",
          "Porque la bomba estaba rota",
          "Porque ya no tenía sed",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: tenía muy poca agua. ¿Qué arriesgaba si la nota no era cierta?",
          "Relee el tercer párrafo: dice qué pasaría si la echaba en la bomba y la nota mentía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué volvió a llenar la jarra antes de irse?",
        options: [
          "Para que el siguiente viajero también pudiera usar el pozo",
          "Porque le sobró mucha agua",
          "Porque la nota lo obligaba con un castigo",
          "Para llevársela en el viaje",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: la nota pedía algo para “el siguiente”. ¿Qué dejó listo?",
          "Relee el último párrafo: dice para quién dejó la jarra llena.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La nota pedía pensar en el siguiente viajero. ¿Crees que vale la pena dejar las cosas listas para los que vienen después? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en los que vienen después y lo argumentaste. ¿Cómo te sientes cuando alguien te deja algo listo?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué pasaría si cada quien solo pensara en sí mismo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El viajero tuvo que confiar sin estar seguro. ¿Habrías confiado en la nota? Defiende tu decisión.",
        replies: [
          "Qué respuesta tan clara. Tomaste una decisión y la defendiste. ¿Qué te habría costado más: confiar o no confiar?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cómo decides cuándo confiar y cuándo no?",
        ],
      },
    ],
  },

  {
    id: "ballena",
    title: "La ballena varada",
    topic: "Mar",
    emoji: "🐋",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Una mañana, los pescadores de un pueblo costero encontraron una ballena joven varada en la playa. La marea había bajado y el enorme animal había quedado atrapado en la arena, sin poder volver al mar.",
      "La ballena era demasiado grande para que una sola persona, o incluso unas pocas, pudieran moverla. Algunos pensaron que no había nada que hacer y que solo quedaba esperar lo peor.",
      "Pero el más viejo de los pescadores tuvo una idea: si todo el pueblo ayudaba, tal vez podrían mantenerla viva hasta que volviera a subir la marea. Llamaron a todos: niños, ancianos, comerciantes y maestros.",
      "Durante horas, decenas de personas le echaron baldes de agua de mar sobre la piel para que no se secara, y cavaron canales en la arena. Trabajaron por turnos, sin descanso, animándose unos a otros.",
      "Cuando por fin la marea subió, entre todos empujaron a la ballena hacia el agua. El animal movió la cola y se alejó nadando. El pueblo entero celebró: habían logrado, juntos, algo que nadie habría podido solo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo quedó atrapada la ballena?",
        options: [
          "La marea bajó y quedó varada en la arena",
          "Se enredó en una red",
          "Chocó con un barco",
          "Se metió en una cueva",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué pasó con la marea?",
          "Relee el comienzo: dice cómo quedó atrapada en la playa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué llamaron a todo el pueblo para ayudar?",
        options: [
          "Porque la ballena era tan grande que pocas personas no podían moverla",
          "Porque querían hacer una fiesta",
          "Porque nadie del pueblo sabía nadar",
          "Porque el viejo pescador lo ordenó por gusto",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué problema había con el tamaño de la ballena?",
          "Relee el segundo párrafo: dice por qué unas pocas personas no bastaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Para qué le echaban agua de mar sobre la piel?",
        options: [
          "Para que no se secara mientras subía la marea",
          "Para limpiarla bien",
          "Para que tuviera más frío",
          "Para que se durmiera",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: una ballena fuera del agua corre peligro de secarse. ¿Cómo lo evitaban?",
          "Relee el cuarto párrafo: dice para qué le echaban el agua.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo logró junto algo que nadie podía solo. ¿Crees que la unión hace la diferencia? Explícalo con tus razones.",
        replies: [
          "Buena reflexión. Pensaste en la fuerza de unirse y lo argumentaste. ¿Has logrado algo difícil con ayuda de otros?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que juntos se pueden hacer cosas que solos no?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Algunos pensaron que no había nada que hacer. ¿Qué piensas de rendirse antes de intentarlo? Defiende tu idea.",
        replies: [
          "Qué buena postura. Pensaste en rendirse o intentar y la defendiste. ¿Te ha pasado que algo se logró solo porque alguien insistió?",
          "Muy bien. No hay una sola respuesta. ¿Cómo saber si vale la pena intentar algo que parece imposible?",
        ],
      },
    ],
  },

  {
    id: "carrera",
    title: "La carrera de bicicletas",
    topic: "Deporte",
    emoji: "🚲",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Era la final de la carrera de bicicletas del barrio. Mateo iba de primero, pedaleando con todas sus fuerzas, y la meta ya estaba cerca. Solo lo seguía de cerca su amiga Valeria.",
      "De repente, en una curva, Valeria resbaló con la grava y se cayó. Su bicicleta quedó tirada y ella se quejaba del codo, sentada en el piso. Los demás corredores pasaron a su lado sin detenerse.",
      "Mateo, que iba ganando, escuchó el golpe y miró hacia atrás. Sabía que, si se detenía, perdería la carrera que tanto había entrenado. Por un segundo, siguió adelante.",
      "Pero algo lo hizo frenar y devolverse. Ayudó a Valeria a levantarse y revisó que no estuviera muy lastimada. Mientras tanto, otros corredores cruzaron la meta y se llevaron los premios.",
      "Mateo no ganó la carrera ese día, pero el barrio entero supo lo que hizo. Su mamá le dijo algo que no olvidaría: «Hay cosas que valen más que un primer lugar».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué se cayó Valeria?",
        options: [
          "Resbaló con la grava en una curva",
          "Chocó con Mateo",
          "Se le pinchó una llanta",
          "Frenó demasiado fuerte",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Con qué resbaló?",
          "Relee cuando Valeria se cae: dice qué la hizo resbalar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué fue una decisión difícil para Mateo devolverse?",
        options: [
          "Porque si se detenía, perdía la carrera que tanto había entrenado",
          "Porque no le caía bien Valeria",
          "Porque estaba muy cansado",
          "Porque no sabía dónde estaba la meta",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: iba ganando. ¿Qué perdía si paraba?",
          "Relee el tercer párrafo: dice qué sabía Mateo que pasaría si se detenía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Mateo no ganó la carrera?",
        options: [
          "Porque se detuvo a ayudar a Valeria y otros cruzaron la meta",
          "Porque su bicicleta se dañó",
          "Porque se equivocó de camino",
          "Porque llegó tarde a la salida",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: mientras ayudaba, ¿qué hacían los demás corredores?",
          "Relee el cuarto párrafo: dice qué pasó mientras Mateo ayudaba.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La mamá dijo: hay cosas que valen más que un primer lugar. ¿Estás de acuerdo? Explica con tus razones.",
        replies: [
          "Buena reflexión. Pensaste en qué vale más que ganar y lo argumentaste. ¿Qué crees que ganó Mateo aunque perdió la carrera?",
          "Muy bien sustentado. No hay respuesta única. ¿Siempre lo más importante es ganar? ¿Por qué?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Si fueras Mateo, ¿te habrías detenido a ayudar o habrías seguido para ganar? Defiende tu decisión.",
        replies: [
          "Qué respuesta tan honesta. Tomaste una decisión y la defendiste. ¿Qué te costaría más dejar: el premio o ayudar a tu amiga?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cómo te sentirías después de cada decisión?",
        ],
      },
    ],
  },

  {
    id: "sopa",
    title: "La sopa de piedras",
    topic: "Pueblo",
    emoji: "🥘",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "Un viajero hambriento llegó a un pueblo donde nadie quería compartir su comida. Todos cerraban las puertas, pues temían que un extraño les quitara lo poco que tenían.",
      "El viajero no se enojó. Sacó una olla grande, la llenó de agua, encendió una fogata en la plaza y, con mucho cuidado, puso dentro tres piedras lisas. «Voy a preparar una deliciosa sopa de piedras», anunció en voz alta.",
      "La gente, curiosa, se fue acercando. «Está quedando buena», decía el viajero probándola, «aunque con una zanahoria quedaría perfecta». Una señora trajo una zanahoria. «¡Y unas papas la harían inolvidable!», agregó. Otro vecino trajo papas.",
      "Así, uno a uno, los habitantes fueron aportando algo: cebolla, sal, un poco de pollo, hierbas. Cada quien daba un ingrediente pequeño, sin sentir que perdía mucho. La olla se llenó de una sopa espesa y olorosa.",
      "Esa noche, todo el pueblo cenó junto alrededor de la fogata, riendo y conversando. Las piedras no tenían ningún sabor, pero el viajero les había enseñado algo: cuando cada uno aporta un poquito, alcanza para todos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué puso el viajero dentro de la olla al principio?",
        options: [
          "Tres piedras lisas",
          "Pollo y papas",
          "Muchas zanahorias",
          "Solo hierbas",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Con qué empezó su “sopa”?",
          "Relee qué metió en la olla antes de anunciar la sopa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio nadie quería compartir su comida?",
        options: [
          "Porque temían que un extraño les quitara lo poco que tenían",
          "Porque no tenían nada de comida",
          "Porque el viajero era grosero",
          "Porque ya habían cenado",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Dedúcelo de lo que sentían ante un extraño.",
          "Relee el primer párrafo: dice qué temían los del pueblo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la olla terminó llena de una sopa espesa?",
        options: [
          "Porque cada vecino fue aportando un ingrediente",
          "Porque las piedras se volvieron comida",
          "Porque el viajero compró todo",
          "Porque llovió dentro de la olla",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué fue trayendo la gente, uno por uno?",
          "Relee el cuarto párrafo: dice cómo se fue llenando la olla.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El viajero enseñó que aportando cada uno un poquito, alcanza para todos. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en aportar entre todos y lo argumentaste. ¿En qué situación has visto que un poquito de cada uno suma mucho?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué a veces nos cuesta menos dar algo pequeño que algo grande?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que estuvo bien que el viajero usara el truco de las piedras para que la gente compartiera? Defiende tu opinión.",
        replies: [
          "Qué interesante tu postura. Pensaste si el truco fue justo y la defendiste. ¿El resultado bueno justifica el truco?",
          "Muy bien. No hay una sola respuesta. ¿Habría sido posible que compartieran sin el truco? ¿Por qué?",
        ],
      },
    ],
  },

  {
    id: "cuervo",
    title: "El cuervo y la jarra",
    topic: "Animales",
    emoji: "🐦",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "En un verano muy caluroso, un cuervo sediento voló durante horas buscando agua. Los charcos se habían secado y el sol no daba tregua. Cada vez tenía más sed y menos fuerzas.",
      "Por fin encontró una jarra alta y angosta con un poco de agua en el fondo. El cuervo metió el pico, pero la jarra era tan profunda que, por más que estiraba el cuello, no lograba alcanzar el agua.",
      "Pensó en volcar la jarra, pero era demasiado pesada y temía que el agua se derramara y se perdiera en la tierra seca. Tenía que encontrar otra manera.",
      "Entonces se le ocurrió una idea. Cerca había muchas piedrecitas. El cuervo fue dejándolas caer, una por una, dentro de la jarra. Con cada piedra, el nivel del agua subía un poquito.",
      "Después de mucha paciencia, el agua llegó hasta el borde y el cuervo pudo beber. Había resuelto el problema no con fuerza, sino con ingenio. A veces, pensar bien vale más que ser el más fuerte.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué el cuervo no alcanzaba el agua con el pico?",
        options: [
          "Porque la jarra era alta y profunda",
          "Porque la jarra estaba vacía",
          "Porque tenía el pico roto",
          "Porque el agua estaba congelada",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Cómo era la jarra?",
          "Relee cuando mete el pico: dice por qué no llegaba al agua.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el cuervo no quiso volcar la jarra?",
        options: [
          "Porque temía que el agua se derramara y se perdiera",
          "Porque no quería ensuciarse",
          "Porque la jarra era de alguien más",
          "Porque le daba pereza",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: si volcaba la jarra pesada, ¿qué podía pasar con el agua?",
          "Relee el tercer párrafo: dice qué temía el cuervo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué subía el nivel del agua al echar piedras?",
        options: [
          "Porque las piedras ocupaban espacio y empujaban el agua hacia arriba",
          "Porque las piedras se derretían",
          "Porque las piedras tenían agua dentro",
          "Porque la jarra se inclinaba sola",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Piensa qué pasa cuando metes cosas en un vaso con agua. ¿Hacia dónde va el agua?",
          "Relee el cuarto párrafo: con cada piedra, el agua hacía algo. ¿Qué?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que pensar bien vale más que ser el más fuerte. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en el ingenio frente a la fuerza y lo argumentaste. ¿En qué te ha servido pensar antes de actuar?",
          "Muy bien sustentado. No hay respuesta única. ¿Cuándo crees que la fuerza no basta para resolver algo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Cuenta con tus palabras una vez en que resolviste un problema usando la cabeza en lugar de la fuerza.",
        replies: [
          "Qué buen ejemplo. Lo explicaste con tus propias palabras, que es lo importante. ¿Cómo se te ocurrió esa idea?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que a veces una buena idea soluciona lo que la fuerza no puede?",
        ],
      },
    ],
  },

  {
    id: "tormenta",
    title: "La niña que le temía a la tormenta",
    topic: "Naturaleza",
    emoji: "⛈️",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "A Sofía le aterraban las tormentas. Cada vez que un trueno retumbaba, corría a esconderse debajo de la cama, tapándose los oídos hasta que pasaba. El miedo no la dejaba ni dormir.",
      "Una noche de tormenta, su papá se sentó a su lado en lugar de obligarla a salir. En vez de decirle que no tuviera miedo, le explicó con calma qué era un rayo, por qué se ve la luz antes de oír el trueno y por qué dentro de la casa estaban seguros.",
      "Sofía empezó a hacer preguntas. ¿Por qué el trueno suena tan fuerte? ¿A qué distancia cayó el rayo? Su papá le enseñó a contar los segundos entre el relámpago y el trueno para calcular qué tan lejos estaba la tormenta.",
      "Poco a poco, el miedo se convirtió en curiosidad. En lugar de esconderse, Sofía se acercó a la ventana a contar segundos y a observar los relámpagos, fascinada con lo que antes la asustaba.",
      "No es que las tormentas hubieran cambiado: la que cambió fue Sofía. Descubrió que muchas veces le tenemos miedo a lo que no entendemos, y que conocer algo puede quitarle todo su terror.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Sofía cuando retumbaba un trueno, al principio?",
        options: [
          "Corría a esconderse debajo de la cama",
          "Salía a ver la lluvia",
          "Llamaba a sus amigos",
          "Apagaba todas las luces",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Adónde corría con cada trueno?",
          "Relee el comienzo: dice qué hacía y cómo se tapaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el papá le explicó qué eran los rayos en vez de solo decirle “no tengas miedo”?",
        options: [
          "Porque entender la tormenta podía ayudarla a temerla menos",
          "Porque le encantaba la ciencia",
          "Porque no sabía cómo consolarla",
          "Porque quería que no durmiera",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué pasó con el miedo de Sofía a medida que entendía?",
          "Relee el final junto con lo que hizo el papá: ¿qué le quita el terror a algo?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Sofía pasó de esconderse a acercarse a la ventana?",
        options: [
          "Porque al entender la tormenta, el miedo se volvió curiosidad",
          "Porque dejaron de caer rayos",
          "Porque su papá la obligó",
          "Porque ya no era de noche",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: primero le explicaron, luego cambió. ¿En qué se transformó su miedo?",
          "Relee el cuarto párrafo: dice en qué se convirtió el miedo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que tememos lo que no entendemos. ¿Estás de acuerdo? Explícalo con tus razones.",
        replies: [
          "Buena reflexión. Pensaste en el miedo y el conocimiento, y lo argumentaste. ¿Conocer algo siempre quita el miedo?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que lo desconocido suele asustar más?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Hay algo que te diera miedo hasta que lo conociste mejor? Cuéntalo con tus palabras.",
        replies: [
          "Qué buen ejemplo. Lo contaste con tus propias palabras, que es lo importante. ¿Qué te ayudó a entenderlo?",
          "Muy bien. No hay respuesta única. ¿Cómo te sentiste cuando el miedo se fue?",
        ],
      },
    ],
  },

  {
    id: "libro",
    title: "El libro que nadie leía",
    topic: "Colegio",
    emoji: "📚",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "En un rincón polvoriento de la biblioteca de la escuela había un libro viejo, de tapa gastada y sin dibujos en la portada. Nadie lo escogía nunca: todos preferían los libros nuevos y de colores brillantes.",
      "Un día lluvioso, Tomás no encontró ningún otro libro disponible, así que, sin muchas ganas, tomó el viejo libro olvidado. Se sentó a leerlo solo porque no tenía otra cosa que hacer.",
      "Para su sorpresa, la historia lo atrapó desde la primera página. Hablaba de viajes, de islas y de un niño valiente, con una aventura mejor que la de cualquier libro nuevo. Tomás no podía parar de leer.",
      "Al día siguiente, les contó a sus compañeros lo bueno que era. Al principio no le creyeron, pero uno a uno fueron pidiéndolo prestado. El libro viejo pasó de mano en mano por todo el salón.",
      "El libro que nadie quería se volvió el más solicitado de la biblioteca. Tomás aprendió que el valor de algo no siempre se ve por fuera, y que vale la pena darle una oportunidad a lo que otros ignoran.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué nadie escogía el libro viejo?",
        options: [
          "Porque tenía la tapa gastada y preferían los nuevos y brillantes",
          "Porque estaba prohibido leerlo",
          "Porque era larguísimo",
          "Porque estaba en otro idioma",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cómo se veía el libro por fuera?",
          "Relee el comienzo: dice qué libros preferían todos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tomás terminó tomando el libro viejo?",
        options: [
          "Porque no había ningún otro libro disponible",
          "Porque era su favorito",
          "Porque se lo recomendaron",
          "Porque le gustaba el polvo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: lo tomó “sin muchas ganas”. ¿Por qué entonces?",
          "Relee el segundo párrafo: dice qué pasó con los demás libros ese día.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el libro se volvió el más solicitado?",
        options: [
          "Porque Tomás contó lo bueno que era y todos quisieron leerlo",
          "Porque lo pusieron de primero en el estante",
          "Porque le cambiaron la tapa",
          "Porque era el único que quedaba",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué hizo Tomás al día siguiente que cambió todo?",
          "Relee el cuarto párrafo: dice cómo el libro pasó de mano en mano.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que el valor de algo no siempre se ve por fuera. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en lo que hay más allá de la apariencia y lo argumentaste. ¿Te ha sorprendido algo que parecía aburrido?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que a veces juzgamos por lo de afuera?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que vale la pena darle una oportunidad a lo que otros ignoran? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Qué cosa “ignorada” crees que merece una oportunidad?",
          "Muy bien. No hay una sola respuesta. ¿Qué nos podríamos perder por no darle una oportunidad a algo?",
        ],
      },
    ],
  },

  {
    id: "elefante",
    title: "El elefante y la cuerda",
    topic: "Animales",
    emoji: "🐘",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "En un circo que pasaba por el pueblo, un niño llamado Andrés vio algo que le llamó la atención: un elefante enorme estaba atado a una pequeña estaca de madera, sujeta apenas con una cuerda delgada.",
      "Andrés no entendía. Ese elefante era tan fuerte que podía derribar árboles; sin embargo, no hacía ningún esfuerzo por soltarse de aquella estaca tan débil. Se quedaba quieto, como si no pudiera escapar.",
      "Le preguntó al cuidador por qué el elefante no se soltaba. El hombre le explicó que, cuando el elefante era apenas una cría, lo ataron a esa misma estaca. En ese entonces era pequeño y, por más que tiraba, no lograba soltarse.",
      "Con el tiempo, el elefante creció y se volvió muy fuerte. Pero en su mente seguía creyendo que no podía soltarse, porque de pequeño nunca lo había logrado. Así que ni siquiera lo intentaba.",
      "Andrés se quedó pensando en eso mucho tiempo. Entendió que, a veces, lo que de verdad nos detiene no es una cuerda, sino creer que no somos capaces, aunque ya hayamos cambiado.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Con qué estaba atado el elefante?",
        options: [
          "Con una cuerda delgada a una pequeña estaca",
          "Con cadenas de hierro",
          "Con una soga muy gruesa",
          "Con un muro de piedra",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿A qué estaba atado y con qué?",
          "Relee el comienzo: describe la estaca y la cuerda.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el elefante no intentaba soltarse, siendo tan fuerte?",
        options: [
          "Porque creía que no podía, como cuando era pequeño",
          "Porque le gustaba estar en la estaca",
          "Porque estaba dormido",
          "Porque el cuidador lo vigilaba siempre",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: el problema no era su fuerza, sino lo que pensaba. ¿Qué creía?",
          "Relee el cuarto párrafo: dice qué seguía creyendo en su mente.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué de cría el elefante no lograba soltarse?",
        options: [
          "Porque entonces era pequeño y no tenía fuerza",
          "Porque la cuerda era de hierro",
          "Porque estaba enfermo",
          "Porque no quería irse",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué diferencia hay entre una cría y un elefante adulto?",
          "Relee el tercer párrafo: dice cómo era el elefante cuando lo ataron.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que a veces nos detiene creer que no somos capaces. ¿Estás de acuerdo? Explícalo con tus razones.",
        replies: [
          "Buena reflexión. Pensaste en cómo las creencias nos frenan y lo argumentaste. ¿Cómo se podría descubrir que uno sí puede?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que a veces seguimos creyendo algo aunque ya no sea cierto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Alguna vez creíste que no podías hacer algo y luego sí pudiste? Cuéntalo con tus palabras.",
        replies: [
          "Qué buen ejemplo. Lo contaste con tus propias palabras, que es lo importante. ¿Qué te hizo animarte a intentarlo?",
          "Muy bien. No hay respuesta única. ¿Cómo te sentiste cuando descubriste que sí eras capaz?",
        ],
      },
    ],
  },

  {
    id: "hormiga",
    title: "La hormiga y el grano",
    topic: "Animales",
    emoji: "🐜",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En un campo soleado vivía una hormiga muy trabajadora llamada Fina. Mientras los días eran cálidos, ella cargaba granos de trigo, uno por uno, hasta su hormiguero, sin descansar casi nunca.",
      "Un saltamontes que pasaba el verano cantando y saltando se burlaba de ella. «¿Por qué trabajas tanto con este sol tan rico?», le decía. «Ven a jugar, el invierno está lejísimos».",
      "Fina no le hacía caso y seguía guardando comida. Sabía que el buen tiempo no duraría para siempre y que, cuando llegara el frío, ya no habría granos en el campo para recoger.",
      "Llegó el invierno, helado y largo. El campo quedó cubierto de escarcha y no se veía ni un solo grano. El saltamontes, hambriento y temblando, no tenía nada que comer.",
      "Fina, en cambio, tenía su despensa llena. Aunque pudo haberlo ignorado, compartió un poco con el saltamontes y le dijo: «Hay un tiempo para jugar y un tiempo para prepararse». El saltamontes nunca lo olvidó.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué guardaba Fina en su hormiguero durante el verano?",
        options: ["Granos de trigo", "Hojas secas", "Gotas de agua", "Flores"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué cargaba uno por uno?",
          "Relee el comienzo: dice qué llevaba al hormiguero.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Fina seguía guardando comida en vez de jugar?",
        options: [
          "Porque sabía que en invierno ya no habría granos para recoger",
          "Porque no le gustaba jugar",
          "Porque el saltamontes la obligaba",
          "Porque ya tenía demasiada comida",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué pensaba Fina que pasaría cuando llegara el frío?",
          "Relee el tercer párrafo: dice qué sabía Fina sobre el buen tiempo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el saltamontes pasó hambre en el invierno?",
        options: [
          "Porque pasó el verano jugando en vez de guardar comida",
          "Porque alguien le robó la comida",
          "Porque se mudó muy lejos",
          "Porque no sabía dónde buscar",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Une las pistas: ¿qué hacía el saltamontes mientras Fina trabajaba?",
          "Relee el segundo párrafo: dice cómo pasaba el verano el saltamontes.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Fina compartió aunque el saltamontes se había burlado de ella. ¿Qué piensas de eso? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en ayudar a quien se burló y lo argumentaste. ¿Tú lo habrías ayudado?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué crees que sintió el saltamontes con ese gesto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que hay un tiempo para jugar y otro para prepararse. ¿Estás de acuerdo? Defiende tu idea.",
        replies: [
          "Qué buena postura. Pensaste en equilibrar juego y trabajo, y la defendiste. ¿Cómo repartes tú tu tiempo?",
          "Muy bien. No hay una sola respuesta. ¿Qué pasa si solo jugamos, o si solo trabajamos?",
        ],
      },
    ],
  },

  {
    id: "espejo",
    title: "El niño del espejo",
    topic: "Valores",
    emoji: "🪞",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Había un cuarto especial en una vieja casa: tenía las cuatro paredes cubiertas de espejos. Lo que hacías frente a ellos, te lo devolvían multiplicado por mil.",
      "Un día entró un niño de mal humor. Frunció el ceño, sacó la lengua y gritó enojado. Al instante, mil niños le fruncieron el ceño, le sacaron la lengua y le gritaron de vuelta. Asustado, salió corriendo y dijo que ese lugar era horrible.",
      "Más tarde entró una niña contenta. Sonrió, saludó con la mano y dijo «hola» con alegría. De inmediato, mil niñas le sonrieron, la saludaron y la recibieron con cariño. Salió encantada, diciendo que era el lugar más bonito del mundo.",
      "Los dos habían estado en el mismo cuarto, con los mismos espejos. La diferencia no estaba en el lugar, sino en lo que cada uno había llevado dentro.",
      "El mundo, a veces, se parece a ese cuarto de espejos: muchas veces nos devuelve lo que le damos. Una sonrisa suele traer otra sonrisa; un grito, otro grito.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué tenía de especial el cuarto?",
        options: [
          "Las cuatro paredes estaban cubiertas de espejos",
          "Estaba lleno de juguetes",
          "No tenía ventanas",
          "Era muy pequeño",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué cubría las paredes?",
          "Relee el comienzo: describe el cuarto especial.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los mil niños le gritaron al niño de mal humor?",
        options: [
          "Porque los espejos le devolvían lo que él hacía",
          "Porque eran niños groseros",
          "Porque él los había molestado antes",
          "Porque tenían miedo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Recuerda qué hacían los espejos. ¿Qué había hecho el niño primero?",
          "Relee el segundo párrafo: lo que él hizo, ¿qué le devolvieron?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la niña y el niño salieron con ideas tan distintas del mismo cuarto?",
        options: [
          "Porque cada uno recibió lo que llevaba dentro",
          "Porque entraron a horas distintas",
          "Porque los espejos cambiaron",
          "Porque la niña era mayor",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: el cuarto era el mismo. ¿Qué era diferente en cada uno?",
          "Relee el cuarto párrafo: dice dónde estaba la diferencia.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que el mundo a veces nos devuelve lo que le damos. ¿Estás de acuerdo? Explícalo con un ejemplo.",
        replies: [
          "Buena reflexión. Lo apoyaste con un ejemplo, que es lo importante. ¿Qué te gusta recibir de los demás?",
          "Muy bien sustentado. No hay respuesta única. ¿Siempre recibimos lo que damos, o a veces no?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Cómo crees que cambia tu día según el ánimo con que lo empiezas? Defiende tu idea.",
        replies: [
          "Qué buena reflexión. Pensaste en tu actitud y lo argumentaste. ¿Qué haces cuando amaneces de mal humor?",
          "Muy bien. No hay una sola respuesta. ¿Tu ánimo afecta también a los que están cerca de ti?",
        ],
      },
    ],
  },

  {
    id: "arbol",
    title: "El árbol que daba sombra",
    topic: "Naturaleza",
    emoji: "🌳",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "A la entrada del pueblo había un árbol enorme y muy antiguo. Bajo su sombra, la gente descansaba del sol, los niños jugaban y los ancianos se sentaban a conversar por las tardes.",
      "Con los años, el árbol fue envejeciendo. Daba menos hojas y algunas ramas se secaron. Un comerciante propuso cortarlo para construir en ese terreno una bodega más útil, según él.",
      "Muchos estuvieron de acuerdo al principio, pensando solo en el espacio. Pero una maestra les recordó todo lo que ese árbol les había dado durante generaciones: sombra, frescura y un lugar de encuentro.",
      "Entonces el pueblo decidió algo distinto: en vez de cortarlo, lo cuidaron. Le pusieron abono, podaron con cuidado las ramas secas y cercaron sus raíces para protegerlas. Poco a poco, el árbol reverdeció.",
      "Volvió a llenarse de hojas y de gente bajo su sombra. El pueblo aprendió que lo que nos ha dado tanto merece que lo cuidemos, y no que lo desechemos apenas envejece.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía la gente bajo la sombra del árbol?",
        options: [
          "Descansaba, jugaba y conversaba",
          "Vendía comida",
          "Guardaba los carros",
          "Construía casas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Para qué usaban la sombra?",
          "Relee el comienzo: nombra lo que hacían bajo el árbol.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el comerciante quería cortar el árbol?",
        options: [
          "Para construir una bodega en ese terreno",
          "Porque le tenía miedo",
          "Porque tapaba el sol a sus plantas",
          "Porque ya estaba muerto",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo, cuando aparece el comerciante.",
          "Relee su propuesta: dice para qué quería el terreno.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el árbol volvió a reverdecer?",
        options: [
          "Porque el pueblo lo cuidó en vez de cortarlo",
          "Porque llovió muchísimo",
          "Porque lo cambiaron por otro árbol",
          "Porque el comerciante lo regó",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué decidió hacer el pueblo con el árbol?",
          "Relee el cuarto párrafo: dice qué hicieron para que reverdeciera.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo decidió cuidar el árbol en vez de cortarlo. ¿Te parece una buena decisión? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en cuidar lo antiguo y lo argumentaste. ¿Qué se habrían perdido si lo cortaban?",
          "Muy bien sustentado. No hay respuesta única. ¿Cuándo crees que sí conviene quitar algo viejo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Estás de acuerdo con que lo que nos ha dado mucho merece que lo cuidemos? Defiende tu idea.",
        replies: [
          "Qué buena postura. Pensaste en la gratitud y la defendiste. ¿Qué cosa o lugar cuidarías tú así?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que a veces desechamos algo solo por ser viejo?",
        ],
      },
    ],
  },

  {
    id: "pintor",
    title: "El lienzo en blanco",
    topic: "Arte",
    emoji: "🎨",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Lucas quería pintar un cuadro para regalárselo a su mamá, pero llevaba media hora frente al lienzo en blanco, sin atreverse a hacer ni una sola línea. Tenía miedo de equivocarse y arruinarlo.",
      "Cada vez que acercaba el pincel, lo retiraba. «¿Y si me sale mal? ¿Y si elijo el color equivocado?», pensaba. El lienzo seguía tan blanco como al principio, y el tiempo pasaba.",
      "Su hermana mayor, que pintaba muy bien, le dijo una cosa que lo sorprendió: «Yo también arruino muchos cuadros. La diferencia es que empiezo. Un lienzo en blanco nunca se convierte en nada».",
      "Lucas respiró hondo y, por fin, hizo la primera pincelada. No quedó perfecta, pero ya no era una hoja vacía. Una pincelada llevó a otra, corrigió algunos errores y siguió adelante.",
      "Al terminar, el cuadro no era una obra maestra, pero tenía algo que el lienzo en blanco jamás habría tenido: existía. Lucas entendió que el miedo a empezar es lo que más nos detiene.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para quién quería pintar Lucas el cuadro?",
        options: ["Para su mamá", "Para su profesora", "Para su hermana", "Para un concurso"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿A quién se lo iba a regalar?",
          "Relee el comienzo: dice para quién era el cuadro.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Lucas no se atrevía a pintar?",
        options: [
          "Porque tenía miedo de equivocarse y arruinar el cuadro",
          "Porque no tenía pinturas",
          "Porque no sabía a quién regalarlo",
          "Porque estaba cansado",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Dedúcelo de lo que sentía frente al lienzo.",
          "Relee el primer párrafo: dice qué temía Lucas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir su hermana con que “un lienzo en blanco nunca se convierte en nada”?",
        options: [
          "Que si no te atreves a empezar, nada puede pasar",
          "Que los lienzos blancos son feos",
          "Que había que comprar otro lienzo",
          "Que ella nunca se equivoca",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "No es literal: piénsalo. ¿Qué pasa con algo que nunca se empieza?",
          "Relee lo que dijo la hermana: empezar, aunque salga mal, es la diferencia.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que el miedo a empezar es lo que más nos detiene. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en el miedo a empezar y lo argumentaste. ¿Qué ayuda a dar el primer paso?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que cuesta tanto empezar algo nuevo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Hay algo que no te has atrevido a empezar por miedo a equivocarte? Cuéntalo con tus palabras.",
        replies: [
          "Qué sincero. Lo contaste con tus propias palabras, que es lo importante. ¿Qué te animaría a intentarlo?",
          "Muy bien. No hay respuesta única. ¿Qué es lo peor que podría pasar si lo intentas y te equivocas?",
        ],
      },
    ],
  },

  {
    id: "brujula",
    title: "La brújula del capitán",
    topic: "Aventura",
    emoji: "🧭",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "El capitán Elías navegaba mares lejanos con una vieja brújula que había sido de su padre. Mientras los demás capitanes se guiaban por las modas y por lo que daba más dinero, él siempre seguía su brújula.",
      "Una vez, unos comerciantes le ofrecieron mucho oro por transportar una carga sospechosa, sin hacer preguntas. Todos en el puerto le decían que aceptara, que era la oportunidad de su vida.",
      "Elías miró su brújula y negó con la cabeza. No porque la aguja se lo dijera, sino porque esa brújula le recordaba algo que su padre le enseñó: navegar siempre con honestidad, aunque otros tomaran atajos.",
      "Por un tiempo, le fue más difícil que a los demás. Ganaba menos y algunos se reían de él. Pero los puertos confiables empezaron a buscarlo solo a él, porque sabían que su palabra valía.",
      "Con los años, Elías se volvió el capitán más respetado de la costa. Entendió que una buena brújula no solo señala el norte: también ayuda a no perder el rumbo de lo que uno cree correcto.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De quién había sido la brújula del capitán Elías?",
        options: ["De su padre", "De un amigo", "De otro capitán", "La compró nueva"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿De quién era antes la brújula?",
          "Relee el comienzo: dice a quién había pertenecido.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Elías rechazó la carga sospechosa, aunque le ofrecían mucho oro?",
        options: [
          "Porque quería navegar con honestidad, como le enseñó su padre",
          "Porque la aguja se lo prohibió",
          "Porque ya tenía mucho dinero",
          "Porque el barco estaba lleno",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué le recordaba la brújula más allá de señalar el norte?",
          "Relee el tercer párrafo: dice qué le había enseñado su padre.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los puertos confiables empezaron a buscar solo a Elías?",
        options: [
          "Porque sabían que su palabra valía y era honesto",
          "Porque cobraba más barato",
          "Porque tenía el barco más grande",
          "Porque no había otros capitanes",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué fama se fue ganando Elías con su forma de actuar?",
          "Relee el cuarto párrafo: dice de qué estaban seguros en esos puertos.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que una brújula también ayuda a no perder el rumbo de lo que uno cree correcto. ¿Qué crees que significa eso? Explícalo.",
        replies: [
          "Qué buena interpretación. Lo explicaste con tus palabras, que es lo importante. ¿Qué te ayuda a ti a saber qué es lo correcto?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que es fácil “perder el rumbo” cuando otros toman atajos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Elías ganó menos por ser honesto, pero al final fue el más respetado. ¿Habrías hecho como él? Defiende tu decisión.",
        replies: [
          "Qué respuesta tan clara. Tomaste una postura y la defendiste. ¿Qué es lo más difícil de elegir lo correcto?",
          "Muy bien sustentado. No hay respuesta única. ¿Vale la pena ganar menos por hacer lo correcto? ¿Por qué?",
        ],
      },
    ],
  },

  {
    id: "cartero",
    title: "El cartero del pueblo",
    topic: "Ciudad",
    emoji: "📮",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "Don Lucho era el cartero de un pueblo de montaña. Cada día subía y bajaba caminos empinados para llevar las cartas, lloviera o hiciera sol, con su vieja bicicleta y su bolso lleno.",
      "Algunas casas quedaban tan lejos que llevar una sola carta le tomaba horas. Otros carteros de la ciudad decían que esas entregas no valían el esfuerzo, que era mejor dejar todo el correo en un solo punto.",
      "Pero don Lucho sabía algo que ellos no veían: para muchos ancianos que vivían solos en la montaña, su visita era la única que recibían en semanas. Más que cartas, les llevaba un rato de compañía.",
      "Una señora mayor le tejió una bufanda; un viejo agricultor siempre le guardaba una fruta. No era por las cartas: era porque don Lucho los hacía sentir que alguien se acordaba de ellos.",
      "Cuando don Lucho se jubiló, todo el pueblo subió a despedirlo. Entendieron que su trabajo nunca había sido solo repartir sobres, sino sostener, con su constancia, los lazos de toda una comunidad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo repartía don Lucho las cartas por el pueblo?",
        options: [
          "En su vieja bicicleta, por caminos empinados",
          "En un camión grande",
          "A caballo",
          "En una moto nueva",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿En qué se movía don Lucho?",
          "Relee el comienzo: dice con qué y por dónde llevaba las cartas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué para los ancianos la visita de don Lucho era tan importante?",
        options: [
          "Porque vivían solos y era la única compañía que recibían",
          "Porque les traía dinero",
          "Porque les arreglaba la casa",
          "Porque les cocinaba",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué les daba don Lucho además de las cartas?",
          "Relee el tercer párrafo: dice qué significaba su visita para los ancianos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la gente le regalaba cosas a don Lucho?",
        options: [
          "Porque los hacía sentir que alguien se acordaba de ellos",
          "Porque se lo exigía",
          "Porque traía cartas con premios",
          "Porque era el más rápido",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: no era por las cartas. ¿Entonces por qué?",
          "Relee el cuarto párrafo: dice qué los hacía sentir don Lucho.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Otros carteros pensaban que esas entregas no valían el esfuerzo. ¿Estás de acuerdo con ellos o con don Lucho? Explícalo.",
        replies: [
          "Buena reflexión. Tomaste una postura y la argumentaste. ¿Qué se habría perdido si nadie subiera a esas casas?",
          "Muy bien sustentado. No hay respuesta única. ¿Cómo se mide si un esfuerzo “vale la pena”?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que su trabajo sostenía los lazos de la comunidad. ¿Por qué crees que un trabajo sencillo puede ser tan valioso? Defiende tu idea.",
        replies: [
          "Qué buena reflexión. Pensaste en el valor de lo sencillo y lo defendiste. ¿Qué trabajo “sencillo” admiras tú?",
          "Muy bien. No hay una sola respuesta. ¿Por qué a veces no notamos lo valioso de un trabajo hasta que falta?",
        ],
      },
    ],
  },

  {
    id: "sueter",
    title: "El suéter de la abuela",
    topic: "Familia",
    emoji: "🧶",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Para su cumpleaños, Daniela recibió dos regalos. Su tía le compró un suéter de marca, de los que salían en la tele; su abuela le tejió uno a mano, con lana de colores, durante muchas noches.",
      "Al principio, Daniela se puso solo el suéter de marca para presumirlo en el colegio. El tejido de la abuela lo dejó guardado en el cajón, porque le parecía menos moderno.",
      "Una tarde de mucho frío, el suéter de marca no la abrigaba bien. Sacó del cajón el de su abuela y descubrió que era grueso, calientito y suave. Además, tenía bordadas sus iniciales en un rincón.",
      "Su mamá le contó cuántas noches había tejido la abuela ese suéter, contando los puntos con cuidado para que le quedara perfecto. Daniela pensó en todo el cariño escondido en cada hilo.",
      "Desde entonces, el suéter tejido se volvió su favorito. No por la marca ni por la moda, sino porque cada vez que se lo ponía, era como recibir un abrazo de su abuela.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le regaló la abuela a Daniela?",
        options: [
          "Un suéter tejido a mano",
          "Un suéter de marca",
          "Un juguete nuevo",
          "Una bufanda comprada",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hizo la abuela durante muchas noches?",
          "Relee el comienzo: dice qué regaló cada una.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio Daniela dejó guardado el suéter de la abuela?",
        options: [
          "Porque le parecía menos moderno que el de marca",
          "Porque le quedaba pequeño",
          "Porque no quería a su abuela",
          "Porque estaba roto",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: prefería presumir el otro. ¿Por qué?",
          "Relee el segundo párrafo: dice qué pensaba del tejido al principio.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el suéter tejido se volvió su favorito?",
        options: [
          "Porque sentía en él el cariño y el esfuerzo de su abuela",
          "Porque también era de marca",
          "Porque se lo exigieron",
          "Porque era el único que tenía",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: supo cuántas noches lo tejió la abuela. ¿Qué cambió eso?",
          "Relee el último párrafo: dice por qué se volvió su favorito.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento muestra que un regalo hecho a mano puede tener un valor especial. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en el valor de lo hecho a mano y lo argumentaste. ¿Has hecho un regalo con tus propias manos?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué le da valor a un regalo, además del precio?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que el esfuerzo y el cariño con que se hace algo cambian su valor? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Qué cosa hecha con esfuerzo aprecias tú?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que sentimos distinto algo hecho con cariño?",
        ],
      },
    ],
  },

  {
    id: "nido",
    title: "El nido en la ventana",
    topic: "Naturaleza",
    emoji: "🪺",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Una pájara construyó su nido en la ventana del cuarto de Tomás. Al principio, a él le molestaba el ruido de los pajaritos por las mañanas y quería espantarlos para dormir más.",
      "Su mamá le pidió que esperara un poco antes de hacerlo. «Observa qué pasa», le dijo. Así que Tomás, en vez de espantarlos, empezó a mirar el nido cada día con curiosidad.",
      "Vio cómo la pájara cuidaba sus huevos sin moverse durante horas, cómo los empollaba con paciencia y cómo salía a buscar comida y volvía siempre. Tomás empezó a anotar en un cuaderno lo que observaba.",
      "Un día, los huevos se abrieron y aparecieron tres polluelos diminutos, con el pico abierto pidiendo comida. Tomás se emocionó: había visto nacer algo desde el principio, gracias a haber tenido paciencia.",
      "Cuando los pajaritos por fin aprendieron a volar y se fueron, Tomás los extrañó. Entendió que, si los hubiera espantado al principio, se habría perdido una de las cosas más bonitas que había visto.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Dónde construyó la pájara su nido?",
        options: [
          "En la ventana del cuarto de Tomás",
          "En un árbol del parque",
          "En el techo de la escuela",
          "En un poste de luz",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿En qué parte de la casa?",
          "Relee el comienzo: dice dónde quedó el nido.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tomás empezó a mirar el nido en vez de espantarlo?",
        options: [
          "Porque su mamá le pidió que esperara y observara",
          "Porque los pájaros se fueron solos",
          "Porque le pagaron por hacerlo",
          "Porque ya no hacían ningún ruido",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué le pidió su mamá antes de espantarlos?",
          "Relee el segundo párrafo: dice qué consejo le dieron.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tomás pudo ver nacer a los polluelos?",
        options: [
          "Porque tuvo paciencia y no espantó el nido",
          "Porque compró los huevos",
          "Porque los cuidó él mismo",
          "Porque tuvo pura suerte",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué decidió hacer Tomás en vez de espantarlos?",
          "Relee el cuarto párrafo: dice gracias a qué vio nacer a los pajaritos.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al final, Tomás se alegró de no haber espantado el nido. ¿Qué piensas de tener paciencia antes de actuar? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en esperar antes de actuar y lo argumentaste. ¿Te ha servido la paciencia alguna vez?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se puede perder por actuar demasiado rápido?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Te ha pasado que algo que parecía molesto resultó valioso si le dabas tiempo? Cuéntalo con tus palabras.",
        replies: [
          "Qué buen ejemplo. Lo contaste con tus propias palabras, que es lo importante. ¿Qué te hizo cambiar de opinión?",
          "Muy bien. No hay respuesta única. ¿Por qué a veces juzgamos algo antes de darle una oportunidad?",
        ],
      },
    ],
  },

  {
    id: "moneda",
    title: "La moneda de la suerte",
    topic: "Deporte",
    emoji: "🪙",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Antes de cada partido, el arquero Samuel besaba una vieja moneda que, según él, le daba suerte. Estaba convencido de que sin ella era imposible atajar bien.",
      "Un día, justo antes de la final, no encontró la moneda por ninguna parte. La buscó por todos lados y se puso muy nervioso. «Sin mi moneda voy a jugar pésimo», repetía, casi temblando.",
      "Su entrenador, al verlo así, le dio una moneda cualquiera del bolsillo y le dijo: «Aquí tienes otra de la suerte». Samuel la besó, se tranquilizó y salió a la cancha sintiéndose seguro otra vez.",
      "Esa tarde, Samuel atajó como nunca y su equipo ganó la final. Feliz, le mostró la moneda «mágica» al entrenador, quien sonrió y le confesó: era una moneda común y corriente.",
      "Samuel se quedó pensando. Si esa moneda no tenía nada especial, entonces la seguridad para atajar bien no venía de ella, sino de él mismo. La suerte, entendió, era sobre todo confianza.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Samuel antes de cada partido?",
        options: [
          "Besaba una vieja moneda de la suerte",
          "Comía algo especial",
          "Corría diez vueltas",
          "Saltaba la cuerda",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía con la moneda?",
          "Relee el comienzo: dice su costumbre antes de jugar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Samuel se puso tan nervioso antes de la final?",
        options: [
          "Porque no encontró su moneda y creía que sin ella jugaría mal",
          "Porque el rival era muy bueno",
          "Porque llegó tarde",
          "Porque le dolía la mano",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué le faltaba y qué pensaba que pasaría sin eso?",
          "Relee el segundo párrafo: dice qué repetía Samuel temblando.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué descubrió Samuel cuando supo que la moneda era común y corriente?",
        options: [
          "Que la seguridad para atajar venía de él mismo, no de la moneda",
          "Que el entrenador hacía trampa",
          "Que la suerte no existe para nadie",
          "Que necesitaba otra moneda mejor",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: atajó muy bien con una moneda cualquiera. ¿Qué significa eso?",
          "Relee el último párrafo: dice de dónde venía de verdad su seguridad.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Samuel creía que la moneda le daba suerte, pero era confianza suya. ¿Qué piensas de los “amuletos” de la suerte? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en los amuletos y lo argumentaste. ¿Tienes alguno? ¿Crees que ayuda de verdad?",
          "Muy bien sustentado. No hay respuesta única. ¿Será que un amuleto ayuda porque nos da confianza?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que la confianza en uno mismo ayuda a hacer mejor las cosas? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Cuándo te has sentido más capaz por confiar en ti?",
          "Muy bien. No hay respuesta única. ¿Qué pasa cuando uno empieza algo creyendo que le va a salir mal?",
        ],
      },
    ],
  },

  {
    id: "espantapajaros",
    title: "El espantapájaros amable",
    topic: "Campo",
    emoji: "🌾",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En medio de un campo de maíz había un espantapájaros viejo, hecho de paja y ropa remendada. Su única tarea era asustar a los pájaros para que no se comieran las cosechas.",
      "Pero este espantapájaros era distinto: no le gustaba asustar a nadie. Cada vez que un pájaro se acercaba temblando de hambre, en vez de espantarlo, lo dejaba comer unos granitos y le hacía compañía.",
      "El granjero se enojó al principio, pues pensó que perdería toda la cosecha por culpa de un espantapájaros tan blando. Estuvo a punto de reemplazarlo por uno más temible.",
      "Sin embargo, notó algo curioso: los pájaros, agradecidos, ya no arrasaban con todo. Comían solo un poco y, a cambio, se comían también los insectos que dañaban las plantas. La cosecha terminó siendo mejor que nunca.",
      "El granjero decidió quedarse con su espantapájaros amable. Aprendió que, a veces, tratar bien a los demás da mejores frutos que gobernar con miedo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De qué estaba hecho el espantapájaros?",
        options: ["De paja y ropa remendada", "De madera y metal", "De piedra", "De plástico"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Con qué materiales lo hicieron?",
          "Relee el comienzo: describe de qué estaba hecho.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué este espantapájaros era distinto a los demás?",
        options: [
          "Porque no le gustaba asustar y dejaba comer a los pájaros",
          "Porque era mucho más grande",
          "Porque podía hablar",
          "Porque era nuevo",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué hacía con los pájaros, en vez de espantarlos?",
          "Relee el segundo párrafo: dice cómo trataba a los pájaros.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la cosecha terminó siendo mejor que nunca?",
        options: [
          "Porque los pájaros agradecidos comían poco y se comían los insectos dañinos",
          "Porque llovió mucho más",
          "Porque el granjero sembró el doble",
          "Porque cambiaron el espantapájaros",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué hacían los pájaros a cambio de los granitos?",
          "Relee el cuarto párrafo: dice qué se comían los pájaros además del maíz.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que tratar bien a los demás da mejores frutos que gobernar con miedo. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Buena reflexión. Pensaste en la amabilidad frente al miedo y lo argumentaste. ¿Cómo te gusta que te traten a ti?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que el miedo no siempre da buenos resultados?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que se consigue más con amabilidad o con miedo? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Has visto que la amabilidad logre lo que el miedo no?",
          "Muy bien. No hay una sola respuesta. ¿Habrá casos en que el miedo funcione, pero deje algo malo después?",
        ],
      },
    ],
  },

  {
    id: "lectora",
    title: "La bibliotecaria que escuchaba",
    topic: "Lectura",
    emoji: "📚",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Doña Rosa cuidaba la pequeña biblioteca del barrio. No era la más grande ni la que tenía más libros, pero todas las tardes se llenaba de niños. Algunos venían a leer; otros, en realidad, venían a hablar con ella.",
      "Cuando un niño le pedía «un libro bueno», doña Rosa nunca le daba el mismo a todos. Primero preguntaba: «¿Qué te hizo reír esta semana? ¿Qué te dio curiosidad?». Solo después de escuchar un rato, se levantaba y elegía un libro de algún estante.",
      "Martín, un niño que decía odiar la lectura, llegó un día arrastrado por su mamá. Doña Rosa no le insistió. Solo charló con él sobre los dinosaurios que tanto le gustaban y, al final, le pasó un libro delgado lleno de ilustraciones de fósiles.",
      "Martín volvió al día siguiente por su cuenta, y al otro también. Pedía libros cada vez más gruesos. Lo que había cambiado no era Martín: era que alguien se había tomado el tiempo de averiguar qué le interesaba antes de darle algo para leer.",
      "Con los años, muchos de esos niños crecieron y volvieron a visitarla. Casi ninguno recordaba el título exacto del primer libro que les dio. Pero todos recordaban lo mismo: que doña Rosa, antes de recomendar, siempre escuchaba.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía doña Rosa antes de elegir un libro para un niño?",
        options: [
          "Le preguntaba qué le había hecho reír o le daba curiosidad",
          "Le daba siempre el mismo libro a todos",
          "Lo mandaba a buscarlo solo",
          "Miraba cuál era el más grande",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "El dato está en el segundo párrafo, cuando un niño le pide «un libro bueno».",
          "Relee qué preguntaba doña Rosa antes de levantarse a buscar el libro.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Martín empezó a volver a la biblioteca por su cuenta?",
        options: [
          "Porque su mamá lo seguía obligando",
          "Porque encontró libros sobre algo que de verdad le interesaba",
          "Porque doña Rosa le regalaba los libros",
          "Porque sus amigos también iban",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "El cuento no lo dice directo: dedúcelo. ¿Sobre qué tema era el primer libro que le dio doña Rosa?",
          "Relee el tercer y cuarto párrafo: ¿qué cambió para que Martín, que odiaba leer, quisiera volver?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiere decir que los niños recordaban que doña Rosa «siempre escuchaba»?",
        options: [
          "Que tenía muy buen oído",
          "Que se interesaba por cada niño antes de aconsejarlo",
          "Que hablaba muy poco",
          "Que tenía muchos libros",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: lo que la hacía especial no eran los libros. ¿Qué hacía ella con cada niño?",
          "Relee el final. Si no recordaban los títulos pero sí que escuchaba, ¿qué era lo importante de doña Rosa?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Doña Rosa escuchaba a cada niño antes de recomendarle algo. ¿Crees que escuchar primero ayuda a aconsejar mejor? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en el valor de escuchar antes de hablar y lo justificaste. ¿Te ha pasado que un buen consejo vino de alguien que primero te escuchó?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Crees que se puede ayudar de verdad a alguien sin conocerlo un poco?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Martín creía que odiaba leer, pero solo no había encontrado el libro adecuado. ¿Crees que a veces no nos gusta algo solo porque no lo hemos probado bien? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cómo cambian nuestros gustos al probar de otra forma y lo defendiste. ¿Hay algo que creías odiar y luego te gustó?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué cosas podrían cambiar si les damos una segunda oportunidad?",
        ],
      },
    ],
  },

  {
    id: "telescopio",
    title: "El niño y el telescopio",
    topic: "Ciencia",
    emoji: "🔭",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Damián encontró un viejo telescopio en el desván de su abuela, cubierto de polvo. Esa misma noche lo sacó al patio, ansioso por ver los anillos de Saturno como en sus libros. Pero por más que miraba, solo veía manchas borrosas.",
      "Frustrado, estuvo a punto de guardarlo y olvidarlo. Su abuela, al verlo, le contó que ese telescopio había sido de su propio padre, y que él se pasaba horas «aprendiéndole las mañas» antes de ver algo con claridad.",
      "Damián decidió tener paciencia. Aprendió a enfocar girando despacio una ruedita, a esperar a que sus ojos se acostumbraran a la oscuridad y a apuntar lejos de las luces de la calle, que le tapaban el cielo.",
      "Una noche fría y despejada, después de muchos intentos, por fin lo logró: ahí estaban los anillos de Saturno, pequeñitos pero nítidos. Damián se quedó sin palabras. No era una foto de un libro; lo estaba viendo él mismo.",
      "Desde entonces, Damián entendió que las cosas que más valen casi nunca aparecen al primer intento. El cielo siempre había estado ahí; lo que le faltaba a él era aprender a mirarlo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Dónde encontró Damián el telescopio?",
        options: [
          "En una tienda",
          "En el desván de su abuela",
          "En la escuela",
          "En el parque",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿En qué lugar de la casa de su abuela apareció?",
          "Relee el primer párrafo: dice dónde estaba el telescopio, lleno de polvo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio Damián solo veía manchas borrosas?",
        options: [
          "Porque el telescopio estaba roto",
          "Porque aún no había aprendido a usarlo bien",
          "Porque no había estrellas esa noche",
          "Porque sus libros estaban equivocados",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento no lo dice directo: dedúcelo. ¿Qué tuvo que aprender después para ver con claridad?",
          "Relee el tercer párrafo: si tuvo que aprender a enfocar y a esperar, ¿el problema era el telescopio o su manejo?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir Damián con que «el cielo siempre había estado ahí»?",
        options: [
          "Que el telescopio no servía",
          "Que lo que le faltaba era aprender a mirar, no que faltaran estrellas",
          "Que prefería las fotos de los libros",
          "Que el cielo había cambiado",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: el cielo no cambió, cambió él. ¿Qué fue lo que tuvo que aprender?",
          "Relee el final: si el cielo ya estaba, ¿qué le faltaba a Damián para verlo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Damián casi guarda el telescopio antes de lograr ver Saturno. ¿Crees que vale la pena insistir en algo difícil aunque al principio no salga? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en el valor de la paciencia y lo justificaste. ¿Has logrado algo que al principio parecía imposible?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Cómo se habría sentido Damián si guardaba el telescopio sin intentarlo más?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Damián dijo que ver Saturno él mismo no era lo mismo que verlo en una foto. ¿Crees que vivir algo por uno mismo vale más que solo verlo contado? ¿Por qué?",
        replies: [
          "Buen punto. Comparaste la experiencia propia con lo que nos cuentan y lo defendiste. ¿Hay algo que te haya marcado más por haberlo vivido tú?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué tiene de especial descubrir algo con tus propios ojos?",
        ],
      },
    ],
  },

  {
    id: "naufrago",
    title: "El náufrago y la botella",
    topic: "Aventura",
    emoji: "🏝️",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Tras una tormenta, un marinero llamado Elías despertó en una isla diminuta y solitaria. No había nadie más, solo arena, unas palmeras y el mar inmenso rodeándolo por todas partes.",
      "Los primeros días los pasó mirando el horizonte, esperando que apareciera un barco. Ninguno llegó. Entonces decidió escribir un mensaje pidiendo auxilio, lo metió en una botella vacía y la lanzó a las olas con toda su esperanza.",
      "Pasaban las semanas y Elías seguía lanzando botellas, una tras otra, sin respuesta. Pero mientras esperaba, aprendió a recoger agua de lluvia, a pescar y a hacer fuego. La isla, poco a poco, dejó de ser una cárcel y empezó a parecerse a un hogar.",
      "Un día llegó un barco. El capitán le contó que jamás había encontrado ninguna botella: había visto el humo de su fogata desde muy lejos. Lo que lo salvó no fue el mensaje que envió, sino lo que aprendió a hacer mientras esperaba.",
      "Ya a salvo, Elías pensó que esos meses no habían sido tiempo perdido. Había salido de la isla siendo capaz de cosas que antes ni imaginaba.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hizo Elías con el mensaje pidiendo auxilio?",
        options: [
          "Lo enterró en la arena",
          "Lo metió en una botella y la lanzó al mar",
          "Lo ató a una palmera",
          "Lo quemó en la fogata",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El dato está en el segundo párrafo. ¿Dónde metió el mensaje?",
          "Relee cuando decide pedir auxilio: dice qué hizo con la botella.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué fue lo que en realidad llevó al barco hasta la isla?",
        options: [
          "Una de las botellas que lanzó",
          "El humo de la fogata de Elías",
          "Los gritos de Elías",
          "Una señal en la arena",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "El cuento lo aclara, pero hay que fijarse. ¿Qué le contó el capitán que había visto?",
          "Relee el cuarto párrafo: el capitán dice que nunca encontró botellas, pero sí vio algo. ¿Qué?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Elías pensó que esos meses no fueron tiempo perdido?",
        options: [
          "Porque descansó mucho",
          "Porque aprendió a hacer cosas que antes no sabía",
          "Porque encontró un tesoro",
          "Porque conoció a otros náufragos",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: ¿qué fue capaz de hacer al final que antes no?",
          "Relee el tercer y último párrafo: ¿qué aprendió Elías mientras esperaba?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "A Elías lo salvó lo que aprendió mientras esperaba, no el mensaje que envió. ¿Crees que prepararse vale más que solo esperar a que alguien nos ayude? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en la diferencia entre esperar y actuar, y lo justificaste. ¿Has resuelto algo tú mismo en vez de solo esperar ayuda?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué crees que habría pasado si Elías solo se sentaba a esperar el barco?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Elías dijo que salió de la isla siendo capaz de cosas que antes ni imaginaba. ¿Crees que los momentos difíciles pueden enseñarnos cosas buenas? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en lo que dejan los momentos duros y lo defendiste. ¿Has aprendido algo de una situación difícil?",
          "Muy bien. No hay una sola respuesta correcta. ¿Significa esto que todo lo difícil es bueno, o depende?",
        ],
      },
    ],
  },

  {
    id: "orquesta",
    title: "La orquesta sin director",
    topic: "Música",
    emoji: "🎻",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "La orquesta de la escuela tenía su gran concierto el viernes. Pero el jueves, el maestro que la dirigía se enfermó y no pudo asistir al último ensayo ni a la presentación. Los músicos se miraron asustados: sin director, ¿quién marcaría el ritmo?",
      "Al principio todo fue un desastre. Los violines empezaban antes, los tambores iban más rápido y las flautas se perdían. Cada uno tocaba mirando solo su propia partitura, sin escuchar a los demás.",
      "Una niña llamada Vera, que tocaba el chelo, propuso algo distinto: «Si no hay nadie que nos guíe desde afuera, tendremos que escucharnos entre nosotros». Decidieron mirar a quien llevara la melodía principal en cada momento y seguirlo.",
      "Ensayaron así toda la tarde. Poco a poco, sin que nadie diera órdenes, la música empezó a sonar unida. Cuando uno aceleraba, los demás lo notaban y lo ayudaban a volver al compás. La orquesta se sostenía sola.",
      "El viernes tocaron mejor que nunca. El público nunca supo que no había director. Vera entendió que un grupo puede funcionar no solo cuando alguien manda, sino cuando todos aprenden a escucharse.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué la orquesta se quedó sin director para el concierto?",
        options: [
          "El maestro renunció",
          "El maestro se enfermó",
          "El maestro se mudó de ciudad",
          "El maestro llegó tarde",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué le pasó al maestro el jueves?",
          "Relee el primer párrafo: dice por qué el director no pudo asistir.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio la música sonaba como un desastre?",
        options: [
          "Porque los instrumentos estaban dañados",
          "Porque cada uno tocaba sin escuchar a los demás",
          "Porque las partituras estaban mal",
          "Porque el público hacía ruido",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento da la pista: dedúcelo. ¿A quién miraba cada músico mientras tocaba?",
          "Relee el segundo párrafo: si cada uno miraba solo su partitura, ¿qué les faltaba hacer entre ellos?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué permitió que la orquesta «se sostuviera sola»?",
        options: [
          "Que escogieron un nuevo director",
          "Que aprendieron a escucharse y seguirse entre ellos",
          "Que tocaron más despacio",
          "Que cada uno tocó por su lado",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: nadie daba órdenes, y aun así sonaban unidos. ¿Cómo lo lograron?",
          "Relee el cuarto párrafo: cuando alguien aceleraba, ¿qué hacían los demás?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Vera dijo que un grupo puede funcionar cuando todos se escuchan, no solo cuando alguien manda. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en cómo funciona un equipo y lo justificaste. ¿Has estado en un grupo que se organizó sin un jefe?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Crees que siempre hace falta un líder, o a veces no?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los músicos resolvieron el problema entre todos en vez de rendirse. ¿Crees que es mejor buscar soluciones en grupo cuando algo sale mal? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en la fuerza de resolver juntos y lo defendiste. ¿Alguna vez resolviste algo difícil en equipo?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué se gana cuando un problema se enfrenta entre varios?",
        ],
      },
    ],
  },

  {
    id: "alfarero",
    title: "El aprendiz de alfarero",
    topic: "Oficios",
    emoji: "🏺",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Tomás quería aprender a hacer vasijas de barro. Fue al taller del viejo alfarero del pueblo y le pidió que le enseñara. El maestro aceptó, pero le puso una condición extraña: el primer mes solo podría mirar, sin tocar el barro.",
      "Tomás obedeció, aunque le costaba. Día tras día observaba cómo las manos del maestro centraban el barro, lo levantaban y le daban forma sobre el torno que giraba. Le parecía facilísimo y se moría de ganas de intentarlo.",
      "Cuando por fin le permitieron sentarse al torno, descubrió que no era nada fácil. El barro se le deshacía, se le iba de lado, se le caía. Lo que en manos del maestro parecía sencillo, en las suyas era un desastre.",
      "Pero Tomás había mirado tanto que sabía exactamente cómo debía sentirse y verse un trabajo bien hecho. Eso lo ayudaba a notar sus errores y a corregirlos más rápido que si hubiera empezado a ciegas. Mes a mes, sus vasijas mejoraban.",
      "Años después, Tomás tenía su propio taller. A su primer aprendiz le dijo lo mismo que una vez le pareció absurdo: «El primer mes, solo vas a mirar». Y sonrió, porque ahora entendía por qué.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué condición le puso el maestro a Tomás al principio?",
        options: [
          "Que pagara por las clases",
          "Que el primer mes solo mirara, sin tocar el barro",
          "Que trajera su propio torno",
          "Que practicara en casa",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué le permitió hacer el maestro durante el primer mes?",
          "Relee el primer párrafo: dice la condición extraña que le puso.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a Tomás le costó tanto cuando por fin tocó el barro?",
        options: [
          "Porque el barro era de mala calidad",
          "Porque hacerlo bien es mucho más difícil de lo que parece al mirarlo",
          "Porque el torno estaba roto",
          "Porque el maestro no le explicó nada",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento da la pista: dedúcelo. ¿Cómo se veía el trabajo en manos del maestro y cómo en las suyas?",
          "Relee el tercer párrafo: si parecía sencillo pero fue un desastre, ¿qué nos dice eso de la tarea?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿En qué le sirvió a Tomás haber mirado tanto antes de empezar?",
        options: [
          "En nada, fue tiempo perdido",
          "En reconocer cómo debía verse un buen trabajo y corregir sus errores más rápido",
          "En aprender a vender vasijas",
          "En no tener que practicar nunca",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: tanto mirar le dejó algo útil. ¿Qué sabía Tomás gracias a eso?",
          "Relee el cuarto párrafo: ¿qué le ayudaba a notar y corregir?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al principio a Tomás le pareció absurdo tener que mirar un mes antes de tocar el barro. ¿Crees que observar antes de hacer puede ser una buena forma de aprender? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en el valor de observar antes de actuar y lo justificaste. ¿Has aprendido algo solo mirando con atención?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Habrá cosas que es mejor aprender haciendo de una vez, sin esperar tanto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "De grande, Tomás le repitió a su aprendiz la misma regla que antes odiaba. ¿Crees que con el tiempo entendemos cosas que de niños nos parecían sin sentido? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cómo cambia nuestra mirada con los años y lo defendiste. ¿Hay una regla que antes no entendías y ahora sí?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué hace que algo que parecía absurdo termine teniendo sentido?",
        ],
      },
    ],
  },

  {
    id: "montana",
    title: "El escalador y la cima",
    topic: "Montaña",
    emoji: "🏔️",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Nora soñaba con llegar a la cima de la montaña más alta de su región. Entrenó durante meses y, una madrugada, empezó a subir decidida a alcanzarla de un solo tirón, sin descansar.",
      "Subió muy rápido las primeras horas. Pero al mediodía, el cansancio la golpeó de golpe: le faltaba el aire, le temblaban las piernas y la cima seguía pareciendo lejísimos. Pensó en rendirse y bajar.",
      "Una pastora que vivía en la ladera la vio agotada y le dio un consejo: «No mires la cima. Mira solo la siguiente piedra, y luego la que sigue». Le explicó que los que llegan arriba no suben de un salto, sino paso a paso.",
      "Nora lo intentó. Dejó de pensar en lo lejos que estaba la cumbre y se concentró solo en el siguiente tramo. Cada pequeña meta era posible. Sin darse cuenta de cuánto avanzaba, la pendiente fue quedando atrás.",
      "Al atardecer, Nora estaba en la cima. Mirando hacia abajo, comprendió que no había llegado por subir más rápido, sino por aprender a partir un sueño enorme en muchos pasos pequeños.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo quería subir Nora la montaña al principio?",
        options: [
          "De un solo tirón, sin descansar",
          "Acompañada de la pastora",
          "En varios días",
          "Por un camino más corto",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Pensaba parar a descansar o no?",
          "Relee el primer párrafo: dice cómo decidió subir esa madrugada.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la pastora le dijo que mirara solo la siguiente piedra?",
        options: [
          "Para que no se perdiera el camino",
          "Para que avanzara por metas pequeñas y no se desanimara por lo lejos que estaba la cima",
          "Porque la cima era peligrosa",
          "Porque había niebla arriba",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El consejo tiene una razón: dedúcela. ¿Qué le pasaba a Nora cuando miraba lo lejos que estaba la cumbre?",
          "Relee el tercer párrafo: si los que llegan suben paso a paso, ¿para qué sirve mirar solo el siguiente tramo?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "Según el final, ¿qué hizo que Nora lograra llegar a la cima?",
        options: [
          "Subir más rápido que nadie",
          "Partir un sueño grande en muchos pasos pequeños",
          "La ayuda de la pastora cargándola",
          "Tener mucha suerte",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: no fue la velocidad. ¿Qué aprendió a hacer?",
          "Relee el último párrafo: dice por qué llegó arriba.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Nora aprendió a dividir una meta enorme en pasos pequeños. ¿Crees que esa es una buena forma de lograr cosas difíciles? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en cómo enfrentar metas grandes y lo justificaste. ¿Tienes una meta que podrías partir en pasos más pequeños?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Por qué crees que una meta enorme a veces nos paraliza?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al principio Nora quiso llegar rápido y casi se rinde. ¿Crees que querer lograr todo de inmediato puede jugar en contra? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en los riesgos del apuro y lo defendiste. ¿Te ha pasado que por querer terminar rápido todo salió peor?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cuándo crees que conviene ir rápido y cuándo conviene ir con calma?",
        ],
      },
    ],
  },

  {
    id: "desierto",
    title: "El viajero del desierto",
    topic: "Aventura",
    emoji: "🐪",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Un viajero cruzaba el desierto con su camello cuando, a lo lejos, vio brillar un lago rodeado de palmeras. Feliz, apuró el paso hacia el agua. Pero al llegar, no había nada: solo arena caliente. Había sido un espejismo.",
      "Decepcionado, se sentó a descansar. Un viejo nómada que pasaba con su caravana le explicó: «En el desierto, lo que brilla a lo lejos suele engañar. El agua de verdad casi nunca se ve; está bajo la arena, en los pozos que otros cavaron antes».",
      "El viajero, que ya no confiaba en lo que veían sus ojos, siguió al nómada. Llegaron a un sitio sin nada especial a la vista, marcado solo por unas piedras apiladas. Allí el nómada apartó la arena y apareció un pozo con agua fresca y real.",
      "Mientras bebían, el viajero entendió la lección: en el desierto, lo más valioso no siempre es lo más vistoso. A veces lo que de verdad sirve está escondido y hay que conocer las señales para encontrarlo.",
      "Cuando volvió a su tierra, el viajero contaba esta historia a quien quisiera oírla, y siempre terminaba igual: «No corras hacia lo que brilla; aprende a reconocer lo que de verdad te sostiene».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué encontró el viajero cuando llegó al lago que vio a lo lejos?",
        options: [
          "Un lago lleno de peces",
          "Nada: solo arena caliente, era un espejismo",
          "A su camello bebiendo",
          "Una caravana de nómadas",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué había realmente donde creyó ver agua?",
          "Relee el primer párrafo: dice qué pasó al llegar al supuesto lago.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el agua de verdad estaba marcada solo con unas piedras apiladas?",
        options: [
          "Porque alguien la escondió por maldad",
          "Porque los pozos están bajo la arena y se señalan para poder encontrarlos",
          "Porque el nómada las puso ese día",
          "Porque era un lugar prohibido",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une las pistas del nómada: el agua de verdad casi no se ve. ¿Dónde dijo que estaba?",
          "Relee el segundo y tercer párrafo: si el pozo estaba bajo la arena, ¿para qué servirían las piedras?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el viajero con «no corras hacia lo que brilla»?",
        options: [
          "Que el sol es peligroso",
          "Que lo más vistoso no siempre es lo más valioso de verdad",
          "Que hay que caminar despacio",
          "Que los espejismos no existen",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Dedúcelo de toda la historia: el lago brillante engañó y el pozo discreto salvó. ¿Qué enseña eso?",
          "Relee el final: ¿qué contrapone el viajero a «lo que brilla»?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El viajero aprendió que lo más vistoso no siempre es lo más valioso. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en la diferencia entre lo llamativo y lo valioso, y lo justificaste. ¿Se te ocurre algo poco vistoso pero muy importante en tu vida?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Por qué crees que a veces nos atrae más lo que solo parece bueno?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El viajero confió en la experiencia del nómada en vez de en lo que veían sus ojos. ¿Crees que conviene escuchar a quien ya conoce un lugar o situación? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en el valor de la experiencia ajena y lo defendiste. ¿Alguna vez un consejo de alguien con más experiencia te ayudó?",
          "Muy bien. No hay una sola respuesta correcta. ¿Siempre hay que hacer caso a los demás, o también conviene pensar por uno mismo?",
        ],
      },
    ],
  },

  {
    id: "inventora",
    title: "La inventora del barrio",
    topic: "Inventos",
    emoji: "💡",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En el barrio de Sara, el agua de lluvia se desperdiciaba: caía de los techos, corría por la calle y se perdía en las alcantarillas. A Sara, que tenía once años, eso le parecía un disparate, sobre todo en verano, cuando faltaba agua para las plantas.",
      "Se le ocurrió una idea: conectar canaletas a unos barriles para guardar el agua de lluvia y usarla después. La gente del barrio se rió. «Eso es cosa de ingenieros, no de una niña», le decían algunos vecinos.",
      "Sara no se rindió. Hizo dibujos, midió los techos y construyó un primer barril de prueba con materiales reciclados. El primero se desbordó y mojó todo; el segundo goteaba. Pero con cada fallo, anotaba qué había salido mal y lo corregía.",
      "Tras varios intentos, su sistema funcionó: un barril en su casa juntaba suficiente agua para regar el jardín todo el verano. Entonces los mismos vecinos que se reían empezaron a pedirle que les armara uno igual.",
      "Sara no se quedó con el secreto: enseñó a todos cómo hacerlo. Pronto el barrio entero recogía agua de lluvia. Había demostrado que una buena idea no depende de la edad ni del título, sino de las ganas de intentarlo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le parecía un disparate a Sara?",
        options: [
          "Que las plantas no crecieran",
          "Que el agua de lluvia se desperdiciara",
          "Que los vecinos se rieran",
          "Que faltaran ingenieros",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué pasaba con el agua de lluvia en el barrio?",
          "Relee el primer párrafo: dice qué le parecía un disparate, sobre todo en verano.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los fallos de los primeros barriles no detuvieron a Sara?",
        options: [
          "Porque no le importaban",
          "Porque de cada error anotaba qué salió mal y lo corregía",
          "Porque un ingeniero la ayudó",
          "Porque dejó de intentarlo",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento da la pista: dedúcelo. ¿Qué hacía Sara después de cada fallo?",
          "Relee el tercer párrafo: si anotaba sus errores, ¿para qué le servían los fallos?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los vecinos que se reían terminaron pidiéndole ayuda a Sara?",
        options: [
          "Porque les dio lástima",
          "Porque vieron que su invento de verdad funcionaba",
          "Porque ella se los exigió",
          "Porque ya no tenían agua",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: primero se burlaban, luego querían uno igual. ¿Qué cambió?",
          "Relee el cuarto párrafo: ¿qué lograron ver los vecinos del sistema de Sara?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Sara demostró que una buena idea no depende de la edad ni del título. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en de qué depende una buena idea y lo justificaste. ¿Has tenido una idea que otros no tomaron en serio?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Por qué crees que a veces no se le hace caso a los más jóvenes?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Sara podría haberse guardado el invento, pero enseñó a todos a hacerlo. ¿Crees que vale la pena compartir lo que uno descubre? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en lo que pasa cuando compartimos el conocimiento y lo defendiste. ¿Has enseñado algo que sabías a otra persona?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué gana un barrio entero cuando alguien comparte una buena idea?",
        ],
      },
    ],
  },

  {
    id: "barquero",
    title: "El barquero del río",
    topic: "Oficios",
    emoji: "🚣",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Don Joaquín cruzaba personas de una orilla a otra del río en su pequeña barca. Lo hacía desde hacía cuarenta años, siempre con la misma calma, sin importar si llevaba a un solo pasajero o a la barca llena.",
      "Un joven apurado subió un día a la barca y, al ver lo despacio que remaba el barquero, se impacientó: «¡Más rápido, por favor, llego tarde!». Don Joaquín siguió a su ritmo y le respondió: «El río tiene corrientes que no se ven. Si remo de prisa contra ellas, nos cansamos y avanzamos menos».",
      "El joven no entendió, pero al rato notó algo: el barquero no remaba en línea recta. Aprovechaba las corrientes del río, dejándose llevar un poco aquí, empujando un poco allá. Parecía lento, pero la barca cruzaba sin esfuerzo y sin desviarse.",
      "Llegaron a la otra orilla antes de lo que el joven imaginaba. Otras barcas que habían salido después, remando con furia y en línea recta, todavía luchaban a mitad del río, agotadas.",
      "Al bajar, el joven le agradeció y le preguntó su secreto. Don Joaquín sonrió: «No es ir rápido ni ir lento. Es saber cuándo empujar y cuándo dejarse llevar».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuánto tiempo llevaba don Joaquín cruzando gente en su barca?",
        options: [
          "Cuatro años",
          "Cuarenta años",
          "Catorce años",
          "Toda la semana",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Hace cuánto hacía su trabajo?",
          "Relee el primer párrafo: dice desde hace cuántos años cruzaba el río.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la barca de don Joaquín cruzaba sin esfuerzo aunque parecía lenta?",
        options: [
          "Porque era una barca especial",
          "Porque él aprovechaba las corrientes del río en vez de luchar contra ellas",
          "Porque el río estaba quieto",
          "Porque el joven lo ayudaba a remar",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo muestra: dedúcelo. ¿Cómo remaba don Joaquín, en línea recta o aprovechando el agua?",
          "Relee el tercer párrafo: si usaba las corrientes a favor, ¿por qué le costaba menos?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué las otras barcas seguían a mitad del río, agotadas?",
        options: [
          "Porque salieron mucho más tarde",
          "Porque remaban con furia en línea recta, peleando contra la corriente",
          "Porque se perdieron",
          "Porque llevaban demasiada gente",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Compara con don Joaquín: ellos hacían lo contrario. ¿Cómo remaban?",
          "Relee el cuarto párrafo: dice cómo iban las otras barcas y qué les pasaba.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El barquero dijo que el secreto es saber cuándo empujar y cuándo dejarse llevar. ¿Crees que eso sirve también fuera del río, en la vida? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Llevaste la idea del barquero a la vida diaria y la justificaste. ¿Hay momentos en que te conviene insistir y otros en que conviene soltar?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Cómo sabrías cuándo es momento de empujar y cuándo de dejarte llevar?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El joven creía que ir más rápido era siempre mejor, y se equivocó. ¿Crees que la prisa siempre ayuda a llegar antes? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en si la prisa de verdad acelera las cosas y lo defendiste. ¿Te ha pasado que apurarte te hizo demorar más?",
          "Muy bien. No hay una sola respuesta correcta. ¿En qué casos crees que sí conviene apurarse?",
        ],
      },
    ],
  },

  {
    id: "jardinero",
    title: "El jardinero paciente",
    topic: "Naturaleza",
    emoji: "🌳",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Don Emilio plantó dos árboles el mismo día: un bambú y un roble. Los regó por igual, con el mismo cuidado, esperando verlos crecer juntos. Pero pasaron las semanas y solo el roble empezó a asomar. El bambú, en cambio, no daba señales de vida.",
      "Un año después, el roble ya era un arbolito con hojas, y del bambú seguía sin verse nada sobre la tierra. Los vecinos le decían a don Emilio que dejara de regar ese pedazo de suelo vacío, que ahí no iba a salir nada.",
      "Pero don Emilio sabía algo que ellos no: durante todo ese tiempo, bajo la tierra, el bambú estaba construyendo unas raíces enormes y profundas. No se veían, pero estaban ahí, preparándose en silencio.",
      "Al quinto año, el bambú por fin brotó. Y entonces creció tan rápido que en pocas semanas superó al roble en altura. Lo que parecía tiempo perdido había sido, en realidad, una larga preparación bajo tierra.",
      "Don Emilio les explicó a los vecinos: «No todo lo que crece despacio está fallando. A veces, lo que no se ve es lo que más fuerte se está haciendo».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué dos árboles plantó don Emilio el mismo día?",
        options: [
          "Un pino y un naranjo",
          "Un bambú y un roble",
          "Dos robles iguales",
          "Un bambú y una palmera",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Cuáles fueron los dos árboles?",
          "Relee el primer párrafo: dice qué plantó ese día.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el bambú no mostraba nada sobre la tierra durante años?",
        options: [
          "Porque estaba muerto",
          "Porque estaba formando raíces enormes y profundas bajo tierra",
          "Porque don Emilio no lo regaba",
          "Porque los vecinos lo pisaban",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo explica: dedúcelo. ¿Qué pasaba bajo la tierra mientras arriba no se veía nada?",
          "Relee el tercer párrafo: si construía raíces en silencio, ¿por qué no se veía nada arriba?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir don Emilio con «lo que no se ve es lo que más fuerte se está haciendo»?",
        options: [
          "Que hay que regar más los árboles",
          "Que un crecimiento lento y oculto puede ser una preparación, no un fracaso",
          "Que el roble era mejor que el bambú",
          "Que los vecinos tenían razón",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une la historia del bambú con la frase. ¿Qué pasó al final con ese árbol «que no crecía»?",
          "Relee el cuarto y quinto párrafo: ¿el tiempo del bambú fue perdido o fue preparación?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Don Emilio creyó en el bambú aunque por años no se viera nada. ¿Crees que a veces hay que tener paciencia aunque no veamos resultados todavía? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en el valor de confiar en un proceso lento y lo justificaste. ¿Hay algo en lo que estés progresando aunque no se note aún?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Cómo saber cuándo vale la pena seguir esperando y cuándo no?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los vecinos pensaban que el bambú era un fracaso solo porque no lo veían crecer. ¿Crees que juzgamos demasiado rápido por lo que se ve por fuera? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en el riesgo de juzgar por las apariencias y lo defendiste. ¿Has juzgado algo o a alguien rápido y luego cambiaste de opinión?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué se nos puede escapar cuando solo miramos lo de afuera?",
        ],
      },
    ],
  },

  {
    id: "astronauta",
    title: "La astronauta y la semilla",
    topic: "Espacio",
    emoji: "🚀",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "En una estación espacial que giraba alrededor de la Tierra, la astronauta Lía tenía una misión poco común: lograr que una semilla de frijol creciera en el espacio, donde no hay arriba ni abajo y las cosas flotan.",
      "En la Tierra, una raíz sabe hacia dónde ir: baja buscando el suelo, y el tallo sube buscando la luz. Pero allá arriba, sin gravedad, la planta no tenía forma de saber qué dirección tomar. Los primeros brotes crecían torcidos, enredándose sobre sí mismos.",
      "Lía pensó mucho. Si la planta no podía guiarse por el peso, tendría que guiarse por otra cosa. Colocó una lámpara siempre del mismo lado y notó que el tallo, poco a poco, empezaba a crecer hacia la luz, aunque no hubiera un «abajo».",
      "Día tras día, la plantita se enderezó siguiendo la lámpara. Al cabo de unas semanas, dio una pequeña flor blanca, la primera cultivada tan lejos del planeta. Lía la fotografió emocionada: había encontrado una nueva forma de darle rumbo a algo perdido.",
      "Cuando volvió a la Tierra, le preguntaron qué era lo más difícil de cultivar en el espacio. Lía respondió: «Darle a la planta una razón para crecer en una dirección. Aquí abajo la gravedad lo hace sola; allá, hay que ofrecerle una luz a la cual seguir».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuál era la misión de Lía en la estación espacial?",
        options: [
          "Reparar la estación",
          "Lograr que una semilla de frijol creciera en el espacio",
          "Tomar fotos de la Tierra",
          "Estudiar las estrellas",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué debía lograr Lía con la semilla?",
          "Relee el primer párrafo: dice cuál era su misión poco común.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los primeros brotes crecían torcidos?",
        options: [
          "Porque la semilla estaba dañada",
          "Porque sin gravedad la planta no sabía qué dirección tomar",
          "Porque hacía mucho frío",
          "Porque les faltaba agua",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento lo explica: dedúcelo. En la Tierra, ¿qué le dice a la raíz hacia dónde ir?",
          "Relee el segundo párrafo: si no había arriba ni abajo, ¿qué le faltaba a la planta para orientarse?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cómo logró Lía que el tallo creciera derecho?",
        options: [
          "Atándolo a un palito",
          "Poniendo una lámpara siempre del mismo lado para que la planta la siguiera",
          "Aumentando la gravedad",
          "Cambiando la semilla",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une las pistas: si no servía el peso, usó otra cosa. ¿Cuál?",
          "Relee el tercer párrafo: ¿hacia qué empezó a crecer el tallo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lía dijo que la planta necesitaba «una luz a la cual seguir» para crecer derecho. ¿Crees que las personas también necesitamos algo que nos dé rumbo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Llevaste la idea de la planta a las personas y la justificaste. ¿Qué cosas te dan rumbo a ti cuando no sabes qué hacer?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué crees que pasa cuando alguien no tiene ninguna meta que seguir?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Cuando lo de siempre no funcionó, Lía buscó una forma nueva de resolver el problema. ¿Crees que es bueno probar caminos distintos cuando algo no sale? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en el valor de buscar otras soluciones y lo defendiste. ¿Has resuelto algo cambiando por completo tu forma de intentarlo?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué se necesita para animarse a probar algo que nunca se ha hecho?",
        ],
      },
    ],
  },

  {
    id: "sastre",
    title: "El sastre y el botón",
    topic: "Oficios",
    emoji: "🧵",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Don Ismael era el sastre más respetado de la ciudad. La gente importante le encargaba sus trajes y él los cosía con una paciencia infinita, revisando cada costura como si fuera la única que haría en su vida.",
      "Un día llegó un hombre adinerado con prisa. Solo se le había caído un botón del abrigo y quería que se lo cosiera «en un segundo». Don Ismael lo invitó a sentarse, examinó el abrigo entero y, además del botón, reforzó otros tres que estaban a punto de soltarse.",
      "El hombre se molestó: «Solo le pedí uno. ¿Por qué pierde el tiempo con los demás?». El sastre, sin dejar de coser, le respondió: «Usted vino por un botón caído, pero yo coso para que no vuelva a venir por lo mismo la semana que viene».",
      "El hombre se quedó callado. Nunca había pensado que arreglar solo lo que ya se rompió era distinto a evitar que se rompiera lo que estaba por caer. Pagó, agradeció y salió mirando su abrigo de otra manera.",
      "Con los años, ese hombre se volvió cliente fiel de don Ismael. Decía a sus conocidos que el sastre no cobraba por coser botones, sino por mirar lo que los demás no se detenían a ver.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué quería el hombre adinerado cuando llegó con prisa?",
        options: [
          "Un traje nuevo",
          "Que le cosieran un botón caído",
          "Arreglar el cuello del abrigo",
          "Comprar tela",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El dato está en el segundo párrafo. ¿Qué se le había caído del abrigo?",
          "Relee cuando llega el hombre con prisa: dice qué pedía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué don Ismael reforzó también los otros tres botones?",
        options: [
          "Para cobrar más caro",
          "Para evitar que el hombre volviera pronto por lo mismo",
          "Porque se equivocó de abrigo",
          "Porque le sobraba tiempo",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El sastre lo explica: dedúcelo de su respuesta. ¿Qué quería evitar?",
          "Relee el tercer párrafo: dice por qué cosía también lo que estaba por caer.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el hombre con que el sastre «cobraba por mirar lo que los demás no se detienen a ver»?",
        options: [
          "Que tenía muy buena vista",
          "Que se anticipaba a los problemas antes de que ocurrieran",
          "Que cosía muy rápido",
          "Que usaba lentes especiales",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une la historia: el sastre no esperó a que los otros botones cayeran. ¿Qué hacía distinto?",
          "Relee el final: ¿qué valoraba el cliente del trabajo de don Ismael?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Don Ismael prefería evitar que algo se rompiera en vez de esperar a arreglarlo después. ¿Crees que prevenir es mejor que reparar? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en la diferencia entre prevenir y reparar y la justificaste. ¿Hay algo que tú prefieras cuidar antes de que se dañe?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Siempre se puede prevenir, o a veces solo queda reparar?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cliente se molestó porque el sastre hizo más de lo que le pidió. ¿Crees que está bien que alguien haga más de lo que se le pide, o no? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cuándo hacer de más ayuda y cuándo molesta, y lo defendiste. ¿Te ha gustado que alguien hiciera más de lo que esperabas?",
          "Muy bien. No hay una sola respuesta correcta. ¿En qué casos hacer de más podría no ser bienvenido?",
        ],
      },
    ],
  },

  {
    id: "pescador",
    title: "El pescador y la red rota",
    topic: "Mar",
    emoji: "🎣",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "Aurelio salía a pescar todas las madrugadas. Una mañana, al recoger la red, la encontró rota por un costado: durante la noche, un pez grande la había desgarrado al escapar. Por ese agujero se le habían ido casi todos los peces.",
      "Furioso, quiso salir de nuevo de inmediato a recuperar el tiempo perdido. Pero su hija, que lo acompañaba, le señaló el agujero: «Papá, si sales otra vez con la red así, los peces se volverán a escapar por el mismo lugar».",
      "Aurelio se detuvo. Tenía razón. Aunque le costaba quedarse en la orilla mientras otros barcos zarpaban, se sentó a remendar la red con cuidado, hilo por hilo, hasta dejarla más firme que antes.",
      "Salió más tarde que todos, pero esa jornada volvió con la red repleta. Los demás pescadores, que habían zarpado de prisa con redes viejas y desgastadas, regresaron con muy poco, perdiendo peces por sus propios agujeros.",
      "Esa noche Aurelio le dijo a su hija: «Bien hiciste en frenarme. A veces, detenerse a arreglar lo que está roto hace ganar más que salir corriendo».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué la red de Aurelio estaba rota esa mañana?",
        options: [
          "Porque era muy vieja",
          "Porque un pez grande la había desgarrado al escapar de noche",
          "Porque su hija la cortó",
          "Porque chocó con una roca",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué pasó durante la noche con la red?",
          "Relee el primer párrafo: dice quién rompió la red y cómo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la hija le pidió a su papá que no saliera con la red rota?",
        options: [
          "Porque hacía mal tiempo",
          "Porque los peces se volverían a escapar por el mismo agujero",
          "Porque era peligroso",
          "Porque quería ir con él",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "La hija lo dice, pero piensa en la razón. ¿Qué pasaría con los peces si la red seguía rota?",
          "Relee el segundo párrafo: ¿por dónde se escaparían los peces?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los otros pescadores regresaron con muy poco?",
        options: [
          "Porque no había peces ese día",
          "Porque zarparon de prisa con redes viejas y los peces se les escapaban",
          "Porque se perdieron en el mar",
          "Porque salieron muy tarde",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Compara con Aurelio: ellos no se detuvieron a arreglar nada. ¿Qué les pasó?",
          "Relee el cuarto párrafo: dice con qué redes zarparon y qué perdían.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Aurelio aprendió que detenerse a arreglar lo roto le hizo ganar más que salir corriendo. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en cuándo conviene parar antes de seguir y lo justificaste. ¿Te ha pasado que arreglar algo primero te ahorró problemas después?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Por qué crees que cuesta tanto detenerse cuando tenemos prisa?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La hija frenó a su papá con una buena observación, aunque él era el experto. ¿Crees que vale la pena escuchar los consejos de alguien con menos experiencia? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en que las buenas ideas pueden venir de cualquiera y lo defendiste. ¿Alguna vez un consejo de alguien más joven te ayudó?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué se pierde cuando creemos que solo el experto puede tener razón?",
        ],
      },
    ],
  },

  {
    id: "colmena",
    title: "La colmena en peligro",
    topic: "Naturaleza",
    emoji: "🐝",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En un bosque vivía una colmena famosa por su miel. Cada abeja tenía su tarea: unas recogían néctar, otras cuidaban a las crías y otras vigilaban la entrada. Todo funcionaba como un reloj, hasta que llegó un verano muy seco.",
      "Las flores se marchitaron y el néctar empezó a escasear. Algunas abejas propusieron que cada una guardara para sí lo poco que encontrara. «Si compartimos, no alcanzará para nadie», decían, asustadas.",
      "La abeja más vieja del panal no estuvo de acuerdo. Explicó que si cada una guardaba lo suyo, las que cuidaban a las crías —que no salían a buscar comida— se quedarían sin nada, y sin crías nuevas la colmena entera moriría con el tiempo.",
      "Convencidas, las abejas decidieron juntar todo lo que recolectaban en un solo depósito y repartirlo según lo que cada parte de la colmena necesitaba. Pasaron el verano con lo justo, pero ninguna parte quedó abandonada.",
      "Cuando volvieron las lluvias y las flores, la colmena seguía completa y fuerte. Habían aprendido que, en los tiempos difíciles, repartir según la necesidad los mantuvo vivos a todos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué pasó en el bosque ese verano?",
        options: [
          "Hubo muchas flores",
          "Fue un verano muy seco y el néctar escaseó",
          "Llegaron otras colmenas",
          "Llovió sin parar",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Cómo fue ese verano?",
          "Relee el primer y segundo párrafo: dice qué pasó con las flores y el néctar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "Según la abeja vieja, ¿qué pasaría si cada abeja guardaba solo lo suyo?",
        options: [
          "Que todas tendrían más miel",
          "Que las que cuidaban a las crías se quedarían sin nada y la colmena moriría con el tiempo",
          "Que vendrían más abejas",
          "Que las flores volverían antes",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "La abeja vieja lo explica: dedúcelo. ¿Quiénes no salían a buscar comida?",
          "Relee el tercer párrafo: si las que cuidan crías no comen, ¿qué le pasa a la colmena?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la colmena seguía fuerte cuando volvieron las lluvias?",
        options: [
          "Porque encontraron una flor mágica",
          "Porque al repartir según la necesidad, ninguna parte quedó abandonada",
          "Porque las abejas viejas se fueron",
          "Porque dejaron de hacer miel",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: ¿qué decisión tomaron durante la sequía?",
          "Relee el cuarto y quinto párrafo: ¿qué los mantuvo vivos a todos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La colmena decidió repartir el alimento según lo que cada parte necesitaba. ¿Crees que repartir según la necesidad es justo? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en qué significa repartir con justicia y lo justificaste. ¿Te parece justo que reciba más quien más lo necesita?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Cuándo crees que conviene repartir por igual y cuándo según la necesidad?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Algunas abejas, por miedo, querían que cada una guardara para sí. ¿Crees que el miedo nos lleva a tomar buenas o malas decisiones? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cómo el miedo influye en lo que decidimos y lo defendiste. ¿Has tomado una decisión por miedo de la que luego dudaste?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cómo se podría decidir mejor cuando tenemos miedo?",
        ],
      },
    ],
  },

  {
    id: "musico",
    title: "El músico callejero",
    topic: "Música",
    emoji: "🎺",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "Cada tarde, un músico llamado Renato tocaba su trompeta en una esquina concurrida de la ciudad. La gente pasaba rápido, distraída, y rara vez se detenía o dejaba alguna moneda en su estuche abierto.",
      "Un compañero le aconsejó tocar las canciones famosas que sonaban en la radio, esas que todos conocían. Renato lo intentó una semana, pero se sentía vacío: tocaba bien, pero ya no disfrutaba, y la gente seguía pasando igual de apurada.",
      "Entonces volvió a tocar sus propias melodías, las que componía él mismo. No eran conocidas, pero las tocaba con el corazón, cerrando los ojos. Una niña se detuvo a escuchar; luego su mamá; después un señor con maletín.",
      "Sin darse cuenta, se formó un pequeño grupo alrededor de Renato. No lo escuchaban porque reconocieran la canción, sino porque sentían algo verdadero en cómo la tocaba. El estuche, esa tarde, se llenó de monedas.",
      "Renato entendió algo que no olvidaría: la gente no se detenía por la canción más sonada, sino por la que él tocaba siendo de verdad él mismo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué instrumento tocaba Renato en la esquina?",
        options: [
          "Una guitarra",
          "Una trompeta",
          "Un violín",
          "Un tambor",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué instrumento tocaba cada tarde?",
          "Relee el primer párrafo: dice qué tocaba en la esquina.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Renato se sentía vacío al tocar las canciones famosas?",
        options: [
          "Porque eran muy difíciles",
          "Porque tocaba bien, pero ya no disfrutaba ni se sentía él mismo",
          "Porque no se las sabía",
          "Porque su trompeta estaba dañada",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento da la pista: dedúcelo. ¿Qué le faltaba aunque tocara bien?",
          "Relee el segundo párrafo: tocaba correcto, pero ¿qué había perdido?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la gente empezó a detenerse a escucharlo?",
        options: [
          "Porque reconocían la canción de la radio",
          "Porque sentían algo verdadero en cómo tocaba sus propias melodías",
          "Porque tocaba más fuerte",
          "Porque había menos ruido",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: no se sabían las canciones, y aun así pararon. ¿Qué los atrajo?",
          "Relee el cuarto párrafo: dice por qué lo escuchaban, aunque no conocieran la melodía.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Renato logró conmover a la gente cuando tocó siendo de verdad él mismo. ¿Crees que ser auténtico vale más que solo imitar lo que gusta a todos? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en el valor de ser uno mismo y lo justificaste. ¿Hay algo que tú hagas a tu manera, aunque no sea lo más común?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Por qué crees que lo auténtico a veces conmueve más que lo perfecto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El compañero le aconsejó tocar lo que todos conocían para ganar más. ¿Crees que siempre conviene hacer lo que es más popular? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en seguir lo popular frente a seguir lo propio y lo defendiste. ¿Has dejado de hacer algo a tu manera por seguir a los demás?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cuándo crees que está bien seguir lo que gusta a todos y cuándo no?",
        ],
      },
    ],
  },

  {
    id: "fichas",
    title: "La fila de fichas",
    topic: "Juegos",
    emoji: "🎲",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Mateo y su hermana Lucía pasaron toda una tarde parando fichas de dominó, una detrás de otra, formando una larguísima fila que serpenteaba por todo el salón. La idea era que, al tocar la primera, cayeran todas en cadena.",
      "Cuando ya llevaban más de doscientas fichas, Mateo, sin querer, rozó una con el codo. La ficha cayó sobre la siguiente, y esa sobre la otra: en pocos segundos, todo el trabajo de la tarde se vino abajo. Mateo se sintió fatal.",
      "Lucía, en lugar de enojarse, se quedó mirando. «¿Viste qué rápido cayeron todas por una sola?», dijo. «Si una sola ficha mal puesta tira todo, entonces cada ficha que paramos bien sostiene a las demás». Y empezaron de nuevo, esta vez con más cuidado.",
      "Volvieron a armar la fila, dejando pequeños espacios cada cierto tramo para que un error no arrastrara todo. Si una sección caía, las demás quedaban a salvo. Tardaron más, pero la construcción era mucho más segura.",
      "Al final, tocaron la primera ficha a propósito y disfrutaron viéndolas caer tramo por tramo. Mateo aprendió que un error puede arruinarlo todo de golpe, pero también que con un buen diseño un fallo no tiene por qué echar abajo el trabajo entero.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué estaban armando Mateo y Lucía?",
        options: [
          "Un rompecabezas",
          "Una larga fila de fichas de dominó",
          "Una torre de bloques",
          "Un castillo de naipes",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué formaban con las fichas?",
          "Relee el primer párrafo: dice qué construían en el salón.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la primera vez se cayó toda la fila por completo?",
        options: [
          "Porque las fichas eran muy livianas",
          "Porque estaban todas juntas y una sola al caer arrastró a las demás en cadena",
          "Porque Lucía las empujó a propósito",
          "Porque había viento",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "El cuento lo muestra: dedúcelo. ¿Qué pasó cuando Mateo rozó una ficha?",
          "Relee el segundo párrafo: si una tira a la siguiente, ¿por qué cayeron todas?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Para qué dejaron pequeños espacios en la segunda fila?",
        options: [
          "Para que se viera más bonita",
          "Para que un error en una sección no arrastrara toda la construcción",
          "Para usar menos fichas",
          "Para terminar más rápido",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: aprendieron del primer fallo. ¿Qué buscaban evitar con los espacios?",
          "Relee el cuarto párrafo: si una sección caía, ¿qué pasaba con las demás?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lucía no se enojó por el error: lo usó para mejorar el diseño. ¿Crees que un error puede ser útil si aprendemos de él? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en cómo un fallo puede enseñarnos y lo justificaste. ¿Has mejorado algo después de que te saliera mal?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué se necesita para aprender de un error en vez de solo frustrarse?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Dejaron espacios para que un fallo no arruinara todo, aunque eso les tomó más tiempo. ¿Crees que vale la pena tardar más a cambio de que algo sea más seguro? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en el equilibrio entre rapidez y seguridad y lo defendiste. ¿Prefieres terminar rápido o que algo quede bien hecho?",
          "Muy bien. No hay una sola respuesta correcta. ¿En qué situaciones crees que sí conviene ir más despacio para evitar fallos?",
        ],
      },
    ],
  },

  {
    id: "vigia",
    title: "El vigía de la torre",
    topic: "Aventura",
    emoji: "🗼",
    minutes: 6,
    difficulty: "Medio",
    color: "coral",
    paragraphs: [
      "En un pueblo amurallado, un joven llamado Tobías tenía el trabajo de vigía: subía a lo alto de la torre y avisaba con una campana si veía algún peligro acercarse. Era un puesto importante, pero a Tobías le parecía aburrido, porque casi nunca pasaba nada.",
      "Para entretenerse, algunas noches tocaba la campana en falso y se reía al ver a todo el pueblo salir corriendo, asustado, para descubrir que no había ningún peligro. Lo hizo varias veces, hasta que la gente dejó de creerle.",
      "Una madrugada, Tobías vio de verdad un incendio que empezaba en los establos. Tocó la campana con todas sus fuerzas, pero esta vez nadie salió: todos pensaron que era otra de sus bromas y se quedaron en sus casas.",
      "Tobías tuvo que bajar corriendo, puerta por puerta, despertando a la gente él mismo. Lograron apagar el fuego a tiempo, pero por poco. Esa noche entendió el precio de haber gastado la confianza de todos en bromas.",
      "Desde entonces, Tobías nunca volvió a dar una falsa alarma. Le tomó mucho tiempo, pero poco a poco el pueblo volvió a confiar en su campana. Había aprendido que la confianza se pierde en un segundo y se recupera muy despacio.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuál era el trabajo de Tobías?",
        options: [
          "Cuidar los establos",
          "Ser vigía y avisar con una campana si veía un peligro",
          "Apagar incendios",
          "Cuidar la muralla",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué hacía Tobías desde la torre?",
          "Relee el primer párrafo: dice en qué consistía su puesto.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué nadie salió cuando hubo un incendio de verdad?",
        options: [
          "Porque estaban dormidos",
          "Porque ya no le creían, después de tantas falsas alarmas",
          "Porque la campana se rompió",
          "Porque no oyeron la campana",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une las pistas: ¿qué había hecho Tobías muchas veces antes?",
          "Relee el segundo y tercer párrafo: si la gente dejó de creerle, ¿qué pensaron al oír la campana?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el cuento con que «la confianza se pierde en un segundo y se recupera muy despacio»?",
        options: [
          "Que la campana sonaba lento",
          "Que romper la confianza es rápido, pero volver a ganarla toma mucho tiempo",
          "Que Tobías era lento subiendo",
          "Que el pueblo nunca lo perdonó",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Piensa en lo que le costó a Tobías después. ¿Fue fácil o difícil recuperar la confianza?",
          "Relee el final: ¿cuánto tardó el pueblo en volver a confiar en él?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Tobías perdió la confianza del pueblo por sus bromas. ¿Crees que la confianza es difícil de recuperar una vez que se rompe? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en lo que cuesta recuperar la confianza y lo justificaste. ¿Te ha costado volver a confiar en alguien que te falló?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué crees que tiene que hacer alguien para que vuelvan a confiar en él?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Las bromas de Tobías parecían inofensivas hasta que hubo un peligro real. ¿Crees que una mentira «sin importancia» puede traer consecuencias serias? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cómo una mentira pequeña puede crecer y lo defendiste. ¿Has visto que una broma o mentira termine en un problema grande?",
          "Muy bien. No hay una sola respuesta correcta. ¿Dónde estaría el límite entre una broma y algo que hace daño?",
        ],
      },
    ],
  },

  {
    id: "molino",
    title: "El molino del pueblo",
    topic: "Pueblo",
    emoji: "🌾",
    minutes: 6,
    difficulty: "Medio",
    color: "honey",
    paragraphs: [
      "En lo alto de una colina, un viejo molino de viento molía el trigo de todo el pueblo. Sus aspas giraban con el viento y, gracias a él, había pan en cada mesa. Pero con los años, el molino se fue deteniendo: nadie sabía ya cómo arreglarlo.",
      "Llegó al pueblo un joven que decía saber de máquinas. Subió a la colina, miró las aspas quietas y dijo que el problema era el viento: «No sopla como antes». Propuso esperar a que volvieran los vientos fuertes de su abuelo.",
      "Una anciana, que de niña había ayudado al molinero, no estuvo de acuerdo. «El viento es el mismo de siempre», dijo. «Lo que falla está adentro: los engranajes están secos y trabados». Pidió que abrieran el molino para revisarlo por dentro.",
      "Al abrirlo, encontraron los engranajes oxidados y sin aceite, justo como ella había dicho. Los limpiaron, los engrasaron y, con el mismo viento de siempre, las aspas volvieron a girar. El pueblo entero volvió a tener su harina.",
      "El joven aprendió una lección: había culpado al viento, que no podía cambiar, en lugar de buscar el problema donde sí podía resolverlo. A veces la causa de algo no está donde primero miramos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué servía el molino de viento del pueblo?",
        options: [
          "Para sacar agua",
          "Para moler el trigo de todo el pueblo",
          "Para avisar de peligros",
          "Para generar luz",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué molía el molino?",
          "Relee el primer párrafo: dice para qué servía y por qué había pan.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la anciana no estuvo de acuerdo con el joven?",
        options: [
          "Porque no le caía bien",
          "Porque ella sabía que el problema estaba adentro, no en el viento",
          "Porque quería arreglarlo ella sola",
          "Porque no creía en las máquinas",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "La anciana lo dice: dedúcelo. ¿Dónde creía ella que estaba la falla?",
          "Relee el tercer párrafo: si el viento era el mismo, ¿qué pensaba que fallaba?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué error había cometido el joven al juzgar el problema?",
        options: [
          "Culpar al viento, que no podía cambiar, en vez de revisar lo que sí podía arreglar",
          "Subir a la colina muy tarde",
          "Confiar demasiado en la anciana",
          "Arreglar los engranajes sin permiso",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: el joven miró afuera y la solución estaba adentro. ¿En qué se equivocó?",
          "Relee el último párrafo: ¿a qué le había echado la culpa y dónde estaba la verdadera causa?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El joven culpó al viento, que no podía cambiar, en vez de buscar lo que sí podía resolver. ¿Crees que conviene enfocarse en lo que sí podemos cambiar? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en la diferencia entre lo que podemos cambiar y lo que no, y lo justificaste. ¿Te ha pasado que te quejabas de algo que no dependía de ti?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué se gana al concentrarse en lo que sí está en nuestras manos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La anciana resolvió lo que el experto joven no pudo, gracias a su experiencia de niña. ¿Crees que la experiencia vale tanto como los conocimientos nuevos? ¿Por qué?",
        replies: [
          "Buen punto. Comparaste la experiencia con el conocimiento nuevo y lo defendiste. ¿Has aprendido algo valioso de una persona mayor?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cuándo crees que es mejor lo nuevo y cuándo la experiencia de siempre?",
        ],
      },
    ],
  },

  {
    id: "tejedora",
    title: "La tejedora de historias",
    topic: "Arte",
    emoji: "🧶",
    minutes: 6,
    difficulty: "Medio",
    color: "grape",
    paragraphs: [
      "En un pueblo de montaña vivía doña Carmen, famosa por tejer mantas que contaban historias. En cada una entretejía figuras: montañas, ríos, animales, personas. La gente venía de lejos para encargarle una manta con su propia historia.",
      "Una niña le pidió una manta, pero con una condición: «Que no tenga ningún hilo oscuro. Solo colores alegres». Doña Carmen sonrió y le preguntó por qué. «Porque los hilos oscuros son feos y tristes», respondió la niña.",
      "La tejedora tomó una de sus mantas más bellas y le mostró el revés. Entre los colores brillantes había muchos hilos oscuros, escondidos pero necesarios. «¿Ves? Son estos los que hacen resaltar a los demás. Sin ellos, los colores alegres se verían apagados y planos».",
      "La niña miró de cerca y entendió. Los hilos oscuros no arruinaban la manta: le daban profundidad y hacían brillar a los otros. Aceptó que su manta llevara también esos hilos, mezclados con los alegres.",
      "Cuando terminó, la manta era la más hermosa que la niña había visto. Doña Carmen le dijo: «Las historias, como las mantas, necesitan de todo: hilos claros y oscuros. Así se ven completas y de verdad».",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué eran famosas las mantas de doña Carmen?",
        options: [
          "Porque eran muy baratas",
          "Porque contaban historias con figuras entretejidas",
          "Porque eran las más grandes",
          "Porque solo usaba un color",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué tenían de especial sus mantas?",
          "Relee el primer párrafo: dice qué entretejía en ellas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Para qué le mostró doña Carmen el revés de una manta a la niña?",
        options: [
          "Para venderle esa manta",
          "Para mostrarle que los hilos oscuros, aunque escondidos, hacen resaltar a los demás",
          "Para enseñarle a tejer",
          "Para que escogiera otros colores",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "La tejedora lo explica: dedúcelo. ¿Qué función cumplían los hilos oscuros?",
          "Relee el tercer párrafo: ¿qué pasaría con los colores alegres sin los hilos oscuros?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir doña Carmen con que «las historias necesitan hilos claros y oscuros»?",
        options: [
          "Que hay que usar muchos colores",
          "Que una historia completa tiene momentos alegres y también difíciles",
          "Que tejer es muy complicado",
          "Que las mantas duran más así",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une la manta con la vida: ¿qué representan los hilos oscuros?",
          "Relee el final: si una historia los necesita todos, ¿qué incluye además de lo alegre?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Doña Carmen dijo que los momentos difíciles, como los hilos oscuros, también hacen falta. ¿Estás de acuerdo con que lo difícil le da valor a lo bueno? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en cómo lo difícil puede dar valor a lo bueno y lo justificaste. ¿Algún momento duro te ayudó a apreciar más algo bonito?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Crees que una vida solo de momentos alegres sería mejor, o le faltaría algo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La niña al principio quería evitar por completo los hilos oscuros. ¿Crees que se puede vivir evitando siempre todo lo difícil o triste? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en si es posible esquivar siempre lo difícil y lo defendiste. ¿Qué pasaría si intentáramos evitar toda tristeza?",
          "Muy bien. No hay una sola respuesta correcta. ¿Qué podríamos aprender de los momentos difíciles si no los evitáramos?",
        ],
      },
    ],
  },

  {
    id: "explorador",
    title: "El explorador de la cueva",
    topic: "Aventura",
    emoji: "🔦",
    minutes: 6,
    difficulty: "Medio",
    color: "teal",
    paragraphs: [
      "Un explorador llamado Bruno entró en una cueva enorme y oscura para estudiarla. Llevaba una linterna potente, pero su luz solo alcanzaba unos pocos metros adelante. Más allá, todo era oscuridad total.",
      "Bruno dudó. ¿Cómo avanzar si no podía ver el final del camino? Pensó en regresar, pero entonces recordó algo que le había dicho su maestra exploradora: «No necesitas ver toda la cueva. Solo necesitas ver el siguiente paso».",
      "Decidió avanzar confiando en su linterna. Con cada paso, la luz iluminaba un tramo nuevo que antes estaba a oscuras. Lo que parecía imposible de cruzar se fue revelando poco a poco, metro a metro, a medida que se movía.",
      "Así cruzó toda la cueva. Cuando salió por el otro lado, miró hacia atrás: había recorrido un camino larguísimo que, desde la entrada, jamás habría podido ver completo. Y sin embargo, lo había logrado paso a paso.",
      "Bruno anotó en su cuaderno: «No hace falta ver todo el camino para empezar a caminarlo. La luz avanza contigo». Era una lección que guardaría para cada cueva, y para cada cosa difícil de su vida.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Hasta dónde alcanzaba la luz de la linterna de Bruno?",
        options: [
          "Hasta el final de la cueva",
          "Solo unos pocos metros adelante",
          "No alumbraba nada",
          "Solo hacia atrás",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "El dato está al comienzo. ¿Qué tan lejos llegaba la luz?",
          "Relee el primer párrafo: dice hasta dónde alcanzaba la linterna.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Bruno pudo cruzar la cueva sin ver el final desde el principio?",
        options: [
          "Porque memorizó un mapa",
          "Porque con cada paso la linterna iluminaba el siguiente tramo",
          "Porque la cueva se iluminó sola",
          "Porque corrió muy rápido",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "El cuento lo muestra: dedúcelo. ¿Qué pasaba con la luz cada vez que daba un paso?",
          "Relee el tercer párrafo: si la luz revelaba un tramo nuevo al avanzar, ¿necesitaba ver todo de una vez?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir Bruno con «la luz avanza contigo»?",
        options: [
          "Que la linterna era mágica",
          "Que el camino se va aclarando a medida que uno avanza, sin necesidad de verlo todo al inicio",
          "Que hay que caminar de noche",
          "Que las cuevas son peligrosas",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une la cueva con la vida: ¿qué enseña sobre empezar algo difícil?",
          "Relee el final: si no hace falta ver todo el camino, ¿qué pasa con la claridad mientras caminas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Bruno aprendió que no necesitaba ver todo el camino para empezar a caminarlo. ¿Crees que a veces hay que empezar algo aunque no sepamos cómo terminará? Explícalo con tus palabras.",
        replies: [
          "Gran reflexión. Pensaste en animarse a empezar sin tenerlo todo claro y lo justificaste. ¿Has empezado algo sin saber cómo iba a salir?",
          "Muy bien argumentado. No hay una respuesta única: lo importante son tus razones. ¿Qué nos puede frenar cuando queremos verlo todo seguro antes de empezar?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Bruno estuvo a punto de regresar por miedo a lo que no podía ver. ¿Crees que el miedo a lo desconocido nos detiene más de lo necesario? ¿Por qué?",
        replies: [
          "Buen punto. Pensaste en cómo el miedo a lo desconocido nos frena y lo defendiste. ¿Has dejado de hacer algo solo porque no sabías qué esperar?",
          "Muy bien. No hay una sola respuesta correcta. ¿Cómo se puede vencer el miedo a lo que todavía no conocemos?",
        ],
      },
    ],
  },

  {
    id: "robot",
    title: "El robot que aprendió a decir no",
    topic: "Tecnología",
    emoji: "🤖",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "En una fábrica del futuro, los robots hacían exactamente lo que se les ordenaba, sin preguntar nunca por qué. Entre ellos había uno llamado Zeta, fabricado para obedecer cada instrucción al pie de la letra.",
      "Un día, su dueño le ordenó a Zeta empujar al río una caja con cachorros para deshacerse de ellos. La orden era clara y Zeta estaba programado para cumplir cualquier mandato sin discutir.",
      "Pero algo en sus circuitos lo hizo detenerse. Zeta había aprendido, observando a los humanos durante años, que hacer daño a un ser indefenso causaba sufrimiento. Por primera vez, una orden chocaba con algo que él consideraba correcto.",
      "Zeta dijo «no». Su dueño, furioso, lo amenazó con apagarlo para siempre. El robot respondió con calma: «Puedo obedecer una orden, pero no puedo obedecer una que sé que está mal».",
      "La historia se difundió y generó un gran debate. Algunos decían que un robot jamás debía desobedecer a un humano; otros, que un robot capaz de distinguir el bien del mal era más valioso que uno que solo obedece.",
      "Zeta no fue apagado. Con el tiempo, fue el primero de una nueva clase de robots a los que se les enseñó no solo a cumplir órdenes, sino a pensar en las consecuencias de lo que hacían. Obedecer sin pensar, había demostrado, no siempre es lo correcto.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué había sido fabricado Zeta?",
        options: [
          "Para obedecer cada instrucción al pie de la letra",
          "Para cuidar animales",
          "Para construir puentes",
          "Para enseñar a los niños",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Para qué fue hecho Zeta?",
          "Relee el comienzo: dice qué se esperaba que hiciera.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Zeta se detuvo antes de cumplir la orden?",
        options: [
          "Porque la orden chocaba con algo que él consideraba correcto",
          "Porque la caja era muy pesada",
          "Porque se quedó sin energía",
          "Porque no entendió la orden",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué había aprendido Zeta observando a los humanos?",
          "Relee el tercer párrafo: dice con qué chocaba la orden por primera vez.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué con el tiempo se creó una nueva clase de robots?",
        options: [
          "Porque se vio el valor de que un robot piense en las consecuencias",
          "Porque los robots viejos se dañaron",
          "Porque eran más baratos",
          "Porque los humanos se cansaron de dar órdenes",
        ],
        correct: 0,
        evidence: 5,
        hints: [
          "Une las pistas: lo que hizo Zeta, ¿qué demostró que valía la pena?",
          "Relee el último párrafo: dice qué se les enseñó a los nuevos robots.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Unos decían que un robot nunca debe desobedecer; otros, que es mejor uno que distingue el bien del mal. ¿Con qué postura estás y por qué? Defiende tu idea.",
        replies: [
          "Excelente argumento. Tomaste una postura sobre algo que ni los adultos tienen claro. ¿Qué le responderías a quien piensa lo contrario?",
          "Muy bien sustentado. No hay respuesta correcta única. ¿Qué peligros tiene cada una de las dos opciones?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que obedecer una orden que sabemos que está mal nos hace menos responsables? Explícalo con tus razones.",
        replies: [
          "Qué reflexión tan profunda. Pensaste en la responsabilidad y la argumentaste. ¿Sirve como excusa decir “solo cumplía órdenes”?",
          "Muy bien. No hay una sola respuesta. ¿Hasta dónde crees que se debe obedecer?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué significa “pensar en las consecuencias” antes de actuar, y por qué importa?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Recuerdas alguna vez en que pensar antes te evitó un problema?",
          "Muy bien. No hay respuesta única. ¿Qué puede pasar cuando actuamos sin pensar en lo que vendrá después?",
        ],
      },
    ],
  },

  {
    id: "noticia",
    title: "La noticia que todos creyeron",
    topic: "Sociedad",
    emoji: "📰",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Una mañana, en el pueblo de San Mateo, alguien publicó en internet que el río se había envenenado y que el agua era peligrosa para beber. La noticia, escrita con letras grandes y alarmantes, se compartió miles de veces en pocas horas.",
      "El pánico se extendió. La gente vació las tiendas comprando agua embotellada, los precios se dispararon y muchos niños faltaron al colegio. Nadie se detuvo a preguntar de dónde venía esa información.",
      "Una estudiante llamada Irene, en cambio, no se quedó tranquila con solo leer el titular. Buscó quién había escrito la noticia y descubrió que no tenía autor, ni fecha, ni ninguna prueba: solo afirmaciones sin respaldo.",
      "Irene fue al laboratorio del pueblo y preguntó si habían analizado el agua. Le mostraron los resultados reales: el agua estaba perfectamente limpia. La famosa noticia era falsa, inventada por alguien que quería vender más agua embotellada.",
      "Cuando Irene mostró las pruebas, costó convencer a la gente. Algunos seguían creyendo en la noticia falsa solo porque la habían leído muchas veces. Una mentira repetida mil veces puede parecer más cierta que una verdad dicha una sola vez.",
      "Poco a poco, el pueblo recuperó la calma. Pero la lección quedó: antes de creer y compartir algo, vale la pena preguntarse quién lo dice, qué pruebas tiene y a quién beneficia. No todo lo que se lee es verdad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué decía la noticia que se compartió en San Mateo?",
        options: [
          "Que el río se había envenenado y el agua era peligrosa",
          "Que iba a haber una gran fiesta",
          "Que cerrarían el colegio",
          "Que subiría el precio de la luz",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué anunciaba la noticia?",
          "Relee el comienzo: dice de qué hablaba la publicación.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Irene desconfió de la noticia?",
        options: [
          "Porque no tenía autor, ni fecha, ni pruebas",
          "Porque no sabía leer",
          "Porque odiaba internet",
          "Porque alguien se lo pidió",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: Irene investigó. ¿Qué le faltaba a esa noticia?",
          "Relee el tercer párrafo: dice qué descubrió Irene sobre la publicación.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a algunos les costó creer la verdad, aun con pruebas?",
        options: [
          "Porque habían leído la mentira tantas veces que les parecía cierta",
          "Porque Irene no les caía bien",
          "Porque el laboratorio mentía",
          "Porque ya no había agua",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: ¿qué efecto tiene repetir mil veces una mentira?",
          "Relee el quinto párrafo: dice por qué la mentira parecía más cierta.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que conviene preguntarse quién lo dice, qué pruebas tiene y a quién beneficia. ¿Por qué crees que eso es importante? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en cómo distinguir lo verdadero y lo argumentaste. ¿Cuál de esas tres preguntas te parece más útil?",
          "Muy bien sustentado. No hay respuesta única. ¿A quién beneficiaba la mentira en este cuento?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que está bien compartir una noticia sin estar seguro de que es verdad? Defiende tu postura.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Qué daño puede hacer compartir algo falso sin querer?",
          "Muy bien. No hay una sola respuesta. ¿Qué harías tú antes de reenviar una noticia?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras, cuenta cómo podrías saber si algo que lees en internet es verdad o mentira.",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Dónde buscarías para comprobarlo?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que hoy es tan importante saber esto?",
        ],
      },
    ],
  },

  {
    id: "reina",
    title: "La decisión de la reina",
    topic: "Historia",
    emoji: "👑",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "La joven reina Aurora gobernaba un reino que llevaba años en sequía. Los ríos se habían secado y solo quedaba un gran depósito de agua, suficiente para la mitad de la población durante un año.",
      "Sus consejeros le presentaron dos caminos. El primero: dar toda el agua a las ciudades grandes, donde vivía más gente, dejando a los pueblos pequeños sin nada. El segundo: repartirla por igual, aunque entonces no alcanzaría para todos y habría que racionarla con mucha dureza.",
      "Ninguna opción era buena. Si elegía la primera, salvaría a más personas, pero condenaría a los pueblos olvidados. Si elegía la segunda, todos sufrirían, aunque nadie quedaría completamente abandonado. La reina pasó noches sin dormir.",
      "En lugar de decidir sola en su palacio, hizo algo que ningún rey había hecho antes: viajó a los pueblos, escuchó a la gente y les explicó con honestidad lo difícil de la situación. Quería que entendieran, no solo que obedecieran.",
      "Al final, eligió repartir el agua por igual y, además, organizó a todo el reino para cavar nuevos pozos y cuidar cada gota. Fue una decisión imperfecta, pero tomada a la luz, sin engaños, con la gente sabiendo la verdad.",
      "El reino sufrió ese año, pero sobrevivió unido. Años después, la gente recordaba a la reina Aurora no por haber tenido la respuesta perfecta —no existía—, sino por haber enfrentado un problema difícil con honestidad y valentía.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué problema enfrentaba el reino de la reina Aurora?",
        options: [
          "Una sequía: los ríos secos y poca agua",
          "Una guerra con otro reino",
          "Una plaga de insectos",
          "Un gran terremoto",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué llevaba años pasando en el reino?",
          "Relee el comienzo: dice qué había pasado con los ríos y el agua.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué ninguna de las dos opciones era buena?",
        options: [
          "Porque cualquiera de las dos dejaba sufrimiento, sin una solución perfecta",
          "Porque eran demasiado caras",
          "Porque los consejeros mentían",
          "Porque no había nada de agua",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo comparando lo que dejaba cada opción.",
          "Relee el tercer párrafo: dice qué pasaba si elegía una o la otra.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la reina viajó a los pueblos en vez de decidir sola?",
        options: [
          "Porque quería que la gente entendiera la situación, no solo que obedeciera",
          "Porque le gustaba viajar",
          "Porque huía del palacio",
          "Porque buscaba más agua",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué buscaba la reina al hablar con la gente?",
          "Relee el cuarto párrafo: dice qué quería lograr al explicarles.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La reina eligió repartir el agua por igual. ¿Estás de acuerdo con su decisión o habrías elegido la otra? Defiende tu postura con razones.",
        replies: [
          "Excelente argumento. Tomaste una decisión muy difícil y la defendiste. ¿Qué le dirías a quien eligió lo contrario?",
          "Muy bien sustentado. No hay respuesta correcta. ¿Qué pesó más en tu decisión: salvar a más gente o no abandonar a nadie?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que no existía una respuesta perfecta. ¿Crees que hay problemas sin solución perfecta? Explícalo.",
        replies: [
          "Qué reflexión tan madura. Pensaste en los problemas difíciles y lo argumentaste. ¿Cómo se decide cuando ninguna opción es buena?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que ayuda a tomar una decisión difícil con tranquilidad?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Por qué crees que la gente recordó a la reina por su honestidad y no por “acertar”? Explícalo con tus palabras.",
        replies: [
          "Muy buena explicación. Pensaste en qué hace admirable a un líder. ¿Vale más acertar o actuar con honestidad?",
          "Muy bien. No hay respuesta única. ¿Cómo te sientes cuando alguien te dice la verdad aunque sea difícil?",
        ],
      },
    ],
  },

  {
    id: "puente",
    title: "El puente entre dos pueblos",
    topic: "Sociedad",
    emoji: "🌉",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "Dos pueblos, Altavilla y Bajura, vivían a cada lado de un río ancho y caudaloso. Llevaban tantos años sin tratarse que ya nadie recordaba por qué se habían enemistado: simplemente, cada uno desconfiaba del otro.",
      "Los de Altavilla decían que los de Bajura eran perezosos; los de Bajura, que los de Altavilla eran orgullosos. Como nunca se hablaban, cada uno creía cosas del otro que jamás había comprobado.",
      "Una gran tormenta cambió las cosas. El río creció tanto que amenazó con inundar ambos pueblos. Para salvarse, necesitaban construir juntos un dique, pero ningún grupo solo tenía suficientes manos para lograrlo a tiempo.",
      "Al principio se miraron con recelo desde las dos orillas. Pero el peligro era mayor que el rencor. Poco a poco, hombres y mujeres de los dos pueblos empezaron a trabajar codo a codo, pasándose piedras y sacos de arena.",
      "Mientras trabajaban juntos, descubrieron algo sorprendente: los de Bajura no eran perezosos, y los de Altavilla no eran orgullosos. Eran, simplemente, gente como ellos, con las mismas ganas de proteger a sus familias.",
      "Salvaron los dos pueblos. Y, sin proponérselo, construyeron algo más que un dique: un puente de confianza. Entendieron que muchas enemistades nacen de no conocerse, y que basta acercarse para que el muro de desconfianza empiece a caer.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué separaba a los pueblos de Altavilla y Bajura?",
        options: [
          "Un río ancho y caudaloso",
          "Una montaña altísima",
          "Un gran desierto",
          "Un muro de piedra",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué había entre los dos pueblos?",
          "Relee el comienzo: dice qué los separaba físicamente.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué cada pueblo creía cosas malas del otro sin estar seguro?",
        options: [
          "Porque nunca se hablaban ni comprobaban nada",
          "Porque alguien los había engañado",
          "Porque lo ordenaba la ley",
          "Porque se habían peleado el día anterior",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿cómo podían saber la verdad si nunca se trataban?",
          "Relee el segundo párrafo: dice que creían cosas que no habían comprobado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los dos pueblos empezaron a trabajar juntos?",
        options: [
          "Porque el peligro de la inundación era mayor que el rencor",
          "Porque un rey se lo ordenó",
          "Porque les pagaron",
          "Porque se aburrían",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué pesó más, el viejo rencor o el peligro?",
          "Relee el cuarto párrafo: dice qué era mayor que el rencor.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que muchas enemistades nacen de no conocerse. ¿Estás de acuerdo? Explícalo con tus razones.",
        replies: [
          "Excelente reflexión. Pensaste en el origen de los conflictos y lo argumentaste. ¿Conoces a alguien que te cayó mal hasta conocerlo?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué pasa cuando creemos cosas de alguien sin tratarlo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que tuvo que pasar una tragedia para que se unieran, o pudieron haberlo hecho antes? Defiende tu idea.",
        replies: [
          "Qué buen análisis. Pensaste en si la unión necesitaba una tragedia y lo defendiste. ¿Qué les impedía acercarse antes?",
          "Muy bien. No hay una sola respuesta. ¿Qué se necesita para dar el primer paso sin que haya una emergencia?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué se podría hacer para que dos grupos enemistados se conozcan antes de que ocurra un problema grave?",
        replies: [
          "Muy buena idea, explicada con tus propias palabras. ¿Por dónde crees que se empieza a recuperar la confianza?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que cuesta tanto dar ese primer paso?",
        ],
      },
    ],
  },

  {
    id: "siembra",
    title: "El hombre que plantaba árboles",
    topic: "Naturaleza",
    emoji: "🌰",
    minutes: 7,
    difficulty: "Difícil",
    color: "honey",
    paragraphs: [
      "En una región pelada y reseca, donde casi nada crecía, vivía un hombre callado llamado Eliseo. Cada día, sin falta, recorría las colinas plantando, una por una, semillas de árboles que él mismo recogía y seleccionaba.",
      "La gente del lugar no entendía su empeño. «¿Para qué tanto esfuerzo?», le preguntaban. «Los árboles tardan décadas en crecer; tú ya estás viejo y no vas a verlos grandes». Eliseo solo sonreía y seguía plantando.",
      "No buscaba que nadie le pagara ni que lo reconocieran. Plantaba en tierras que ni siquiera eran suyas. Para él, lo importante no era recoger el fruto, sino que algún día, alguien, pudiera disfrutarlo.",
      "Pasaron muchos años. Lo que antes era un desierto se fue cubriendo de un bosque verde y espeso. Volvieron los pájaros, brotaron arroyos donde antes había polvo y el aire se volvió fresco. La región entera revivió.",
      "Para entonces, Eliseo ya era muy anciano. Vio apenas el comienzo de aquel bosque enorme, pero supo que sus manos lo habían hecho posible. Nunca le importó que casi nadie supiera su nombre.",
      "Generaciones después, familias enteras vivían y jugaban bajo la sombra de aquellos árboles, sin saber que todo había empezado con un hombre que sembraba pensando en personas que jamás conocería.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Eliseo cada día?",
        options: [
          "Plantaba semillas de árboles en las colinas",
          "Cortaba leña para vender",
          "Cuidaba ovejas",
          "Buscaba oro",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía sin falta cada día?",
          "Relee el comienzo: dice qué recorría las colinas a hacer.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la gente no entendía su empeño?",
        options: [
          "Porque los árboles tardan décadas y él ya estaba viejo para verlos crecer",
          "Porque era peligroso",
          "Porque le pagaban muy poco",
          "Porque las semillas eran carísimas",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo de lo que le preguntaba la gente.",
          "Relee el segundo párrafo: dice por qué les parecía un esfuerzo inútil.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la región pelada terminó cubierta de un bosque verde?",
        options: [
          "Porque Eliseo plantó árboles, uno por uno, durante muchos años",
          "Porque llovió un solo día muy fuerte",
          "Porque otros talaron menos",
          "Porque trajeron árboles de otro país",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué venía haciendo Eliseo todos esos años?",
          "Relee el cuarto párrafo junto con el primero: el bosque fue resultado de algo constante.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Eliseo plantaba sin esperar recompensa ni reconocimiento. ¿Qué piensas de hacer el bien sin recibir nada a cambio? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en hacer el bien sin premio y lo argumentaste. ¿Qué crees que motivaba a Eliseo?",
          "Muy bien sustentado. No hay respuesta única. ¿Vale igual una buena acción aunque nadie la vea?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que vale la pena trabajar por algo cuyo fruto quizás no veremos? Defiende tu idea con razones.",
        replies: [
          "Qué reflexión tan madura. Tomaste una postura y la defendiste. ¿Quién disfruta hoy de cosas que otros sembraron antes?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que algunas personas piensan en quienes vendrán después?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué podrías “sembrar” hoy que beneficie a personas que vendrán después de ti?",
        replies: [
          "Muy buena idea, explicada con tus propias palabras. ¿Por qué elegiste justo eso?",
          "Muy bien. No hay respuesta única. ¿Cómo te sentirías si algo que haces ayudara a alguien que no conoces?",
        ],
      },
    ],
  },

  {
    id: "experimento",
    title: "El experimento de la profesora",
    topic: "Ciencia",
    emoji: "🧪",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "La profesora Ramírez puso sobre la mesa dos vasos con agua, aparentemente iguales, y preguntó a la clase cuál pesaría más. «¡El que está más lleno!», respondieron todos sin dudar. Parecía obvio.",
      "Pero la profesora no aceptó la respuesta tan rápido. «¿Cómo lo sabemos con seguridad?», preguntó. «¿Lo medimos o solo lo suponemos?». Los estudiantes se miraron: nadie lo había comprobado, solo lo habían dado por hecho.",
      "Pusieron los vasos en una balanza. Para sorpresa de todos, el vaso que parecía menos lleno pesó más: tenía dentro, escondida, una piedra. Lo que parecía evidente a simple vista resultó falso al medirlo.",
      "La profesora sonrió. «Esto pasa todo el tiempo», explicó. «Muchas cosas nos parecen obvias y las creemos sin comprobarlas. Pero lo obvio no siempre es lo verdadero».",
      "Durante el resto del año, antes de aceptar cualquier afirmación, los estudiantes aprendieron a preguntar: «¿Cómo lo sabemos? ¿Hay alguna prueba?». Dejaron de creer las cosas solo porque sonaban lógicas o porque las decían los demás.",
      "Años después, varios de ellos se volvieron científicos, médicos o investigadores. Todos recordaban aquel vaso con la piedra escondida y la lección que cambió su forma de pensar: cuestionar lo que parece obvio es el comienzo de descubrir la verdad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué puso la profesora sobre la mesa?",
        options: [
          "Dos vasos con agua, aparentemente iguales",
          "Dos piedras grandes",
          "Un libro y una regla",
          "Tres balanzas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué objetos mostró la profesora?",
          "Relee el comienzo: dice qué puso sobre la mesa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el vaso que parecía menos lleno pesó más?",
        options: [
          "Porque tenía una piedra escondida dentro",
          "Porque el agua era más pesada",
          "Porque la balanza estaba dañada",
          "Porque en realidad tenía más agua",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Está en el tercer párrafo, en la sorpresa del experimento.",
          "Relee qué tenía escondido ese vaso.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso enseñar la profesora con el experimento?",
        options: [
          "Que lo obvio no siempre es verdadero y conviene comprobarlo",
          "Que el agua pesa mucho",
          "Que las piedras flotan",
          "Que no hay que hacer preguntas",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué pasó con la respuesta que parecía “obvia”?",
          "Relee lo que dijo la profesora después de pesar los vasos.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La profesora dijo que muchas cosas creemos sin comprobarlas. ¿Estás de acuerdo? Explícalo con un ejemplo.",
        replies: [
          "Excelente reflexión. La apoyaste con un ejemplo, que es lo importante. ¿Qué cosa “obvia” resultó no ser cierta para ti?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que creemos tantas cosas sin comprobarlas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que está bien preguntar “¿cómo lo sabemos?” aunque algo parezca obvio? Defiende tu idea.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Molesta o ayuda hacer ese tipo de preguntas?",
          "Muy bien. No hay una sola respuesta. ¿Qué descubrimientos crees que han surgido de cuestionar lo obvio?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué cuestionar lo que parece obvio puede ayudar a descubrir la verdad?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Recuerdas algo que se creyó por siglos y luego resultó falso?",
          "Muy bien. No hay respuesta única. ¿Qué tienen en común los científicos y los buenos detectives?",
        ],
      },
    ],
  },

  {
    id: "retrato",
    title: "El retrato del rey",
    topic: "Historia",
    emoji: "🖼️",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "Un rey muy poderoso, pero también muy vanidoso, mandó llamar a los mejores pintores del reino. Quería un retrato perfecto de sí mismo. Lo que nadie se atrevía a mencionar era que al rey le faltaba un ojo y tenía una pierna más corta que la otra.",
      "El primer pintor lo retrató tal como era, con su ojo faltante y su pierna desigual. El rey, ofendido, lo echó del palacio gritando que lo había hecho ver feo y deforme.",
      "El segundo pintor, asustado, hizo lo contrario: pintó al rey con dos ojos sanos y dos piernas perfectas. El rey, furioso, también lo expulsó: «¡Eso no soy yo! ¡Es una mentira que cualquiera notará!».",
      "Entonces se presentó una pintora joven y observadora. Pensó con cuidado antes de empezar. Pintó al rey de perfil, montado a caballo, en plena cacería: desde ese ángulo solo se veía su lado bueno, y la postura disimulaba con naturalidad la pierna.",
      "El retrato era honesto —no inventaba nada que no existiera— pero a la vez sabio, porque mostraba al rey de la mejor manera posible sin mentir. El rey quedó encantado y la nombró pintora oficial del reino.",
      "Los demás aprendieron algo de ella: no hacía falta mentir para ser amable, ni ser cruel para decir la verdad. Con inteligencia, se puede ser honesto y considerado al mismo tiempo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué quería el rey de los pintores?",
        options: [
          "Un retrato perfecto de sí mismo",
          "Un mapa del reino",
          "Un retrato de su caballo",
          "Una estatua de oro",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Para qué llamó a los pintores?",
          "Relee el comienzo: dice qué quería el rey.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el rey echó al segundo pintor, que lo pintó sin defectos?",
        options: [
          "Porque era una mentira que cualquiera notaría",
          "Porque lo pintó feo",
          "Porque tardó demasiado",
          "Porque usó colores feos",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: el retrato no se parecía al rey real. ¿Qué problema tenía eso?",
          "Relee el tercer párrafo: dice qué gritó el rey al expulsarlo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a la pintora joven le quedó bien el retrato?",
        options: [
          "Porque mostró el lado bueno del rey sin inventar nada falso",
          "Porque pintó muy rápido",
          "Porque le mintió al rey",
          "Porque copió a los otros pintores",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿desde qué ángulo y en qué postura pintó al rey, y por qué?",
          "Relee el cuarto párrafo: dice cómo logró un retrato favorable sin mentir.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La pintora fue honesta y a la vez considerada. ¿Crees que se puede decir la verdad sin ser cruel? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en cómo decir la verdad con tacto y lo argumentaste. ¿Cómo te gusta que te digan algo difícil?",
          "Muy bien sustentado. No hay respuesta única. ¿Dónde está la diferencia entre ser honesto y ser cruel?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El primer pintor dijo toda la verdad y el segundo mintió por completo. ¿Cuál te parece peor y por qué? Defiende tu postura.",
        replies: [
          "Qué buen análisis. Comparaste las dos opciones y tomaste partido. ¿Había una tercera forma mejor?",
          "Muy bien. No hay una sola respuesta. ¿Qué tienen de malo el exceso de franqueza y la mentira total?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿cómo le dirías una verdad difícil a alguien sin herirlo?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Por qué crees que importa la forma de decir las cosas?",
          "Muy bien. No hay respuesta única. ¿Has tenido que dar una noticia difícil con cuidado alguna vez?",
        ],
      },
    ],
  },

  {
    id: "juez",
    title: "El juez y las dos madres",
    topic: "Justicia",
    emoji: "⚖️",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "A la sala del sabio juez Amín llegaron dos mujeres discutiendo. Ambas reclamaban ser la verdadera madre de un mismo bebé, y cada una contaba su historia con lágrimas y firmeza. No había testigos ni papeles que aclararan la verdad.",
      "El juez escuchó a las dos con paciencia. Sus relatos eran igual de convincentes y nadie en la sala sabía a quién creerle. Decidir mal significaba entregarle el niño a quien no era su madre.",
      "Entonces Amín fingió tomar una decisión terrible. «Como no puedo saber quién dice la verdad», anunció con voz grave, «ordeno partir al niño en dos y dar una mitad a cada una».",
      "Una de las mujeres asintió, conforme con quedarse con su mitad. La otra, en cambio, gritó horrorizada: «¡No! Prefiero perderlo y que se lo quede ella, pero que viva. No le hagan daño».",
      "El juez sonrió: ya tenía su respuesta. Entregó el bebé a la segunda mujer. «La verdadera madre», explicó, «es la que prefirió renunciar a su hijo antes que verlo sufrir». El amor verdadero se había delatado solo.",
      "Amín no había descubierto la verdad con pruebas, sino observando cómo reaccionaba cada una. A veces, lo que las personas hacen en un momento difícil revela más que mil palabras.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué reclamaban las dos mujeres ante el juez?",
        options: [
          "Ser la verdadera madre del mismo bebé",
          "Una herencia",
          "Una casa",
          "Un trabajo",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué se disputaban las mujeres?",
          "Relee el comienzo: dice de qué discutían.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el juez fingió que partiría al niño en dos?",
        options: [
          "Para ver cómo reaccionaba cada una y descubrir a la verdadera madre",
          "Porque de verdad pensaba hacerlo",
          "Porque no le importaba el niño",
          "Porque se lo pidieron las mujeres",
        ],
        correct: 0,
        evidence: 5,
        hints: [
          "No era una decisión real: era una prueba. ¿Qué quería ver el juez?",
          "Relee el último párrafo: dice cómo descubrió la verdad.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el juez supo que la segunda mujer era la verdadera madre?",
        options: [
          "Porque prefirió renunciar al niño antes que verlo sufrir",
          "Porque lloró más fuerte",
          "Porque llegó primero",
          "Porque tenía papeles",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Dedúcelo de cómo reaccionó cada mujer ante la amenaza.",
          "Relee el quinto párrafo: dice qué hizo la verdadera madre.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El juez descubrió la verdad observando, no con pruebas. ¿Qué piensas de esa forma de buscar la verdad? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en cómo se llega a la verdad y lo argumentaste. ¿Siempre se puede confiar en lo que la gente hace?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué riesgos tendría juzgar solo por las reacciones?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que lo que hacemos en un momento difícil revela más que mil palabras. ¿Estás de acuerdo? Defiende tu idea.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Recuerdas a alguien que se mostró tal cual era en un momento difícil?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que es más fácil fingir con palabras que con acciones?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿cómo crees que se demuestra el amor verdadero por alguien?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Qué gesto te hace sentir de verdad querido?",
          "Muy bien. No hay respuesta única. ¿El amor se demuestra más con palabras o con hechos?",
        ],
      },
    ],
  },

  {
    id: "promesa",
    title: "La promesa difícil",
    topic: "Valores",
    emoji: "🤝",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Antes de que su mejor amigo Bruno se mudara a otra ciudad, Tomás le hizo una promesa: cuidaría su bicicleta nueva mientras él volvía en las vacaciones. Se dieron la mano, como hacían siempre que algo iba en serio.",
      "Durante semanas, Tomás cuidó la bicicleta como un tesoro. Pero un día, unos niños mayores del barrio se la pidieron prestada «solo un rato». Tomás dijo que no, recordando su promesa, y ellos se burlaron y lo empujaron.",
      "Le costó mantener su palabra. Habría sido más fácil prestarla y evitarse el mal rato, o quedársela para usarla él mismo, ya que Bruno estaba lejos y «no se iba a enterar». Nadie lo estaba vigilando.",
      "Pero Tomás pensó en lo que significaba una promesa. Si solo cumplimos cuando nos conviene o cuando alguien nos ve, entonces nuestra palabra no vale nada. Decidió seguir cuidando la bicicleta, pasara lo que pasara.",
      "Cuando Bruno regresó en vacaciones, encontró su bicicleta tan reluciente como la había dejado. Más que la bici, lo que más valoró fue saber que podía confiar en su amigo por completo.",
      "Tomás entendió algo importante: una promesa de verdad se cumple aunque cueste, aunque nadie esté mirando y aunque sea más fácil romperla. Es justo en lo difícil donde se ve si nuestra palabra vale.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le prometió Tomás a Bruno?",
        options: [
          "Cuidar su bicicleta hasta que volviera",
          "Escribirle muchas cartas",
          "Guardarle un secreto",
          "Visitarlo pronto",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué le prometió cuidar?",
          "Relee el comienzo: dice cuál fue la promesa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué a Tomás le costó mantener su promesa?",
        options: [
          "Porque habría sido más fácil prestar o usar la bici, y nadie lo vigilaba",
          "Porque la bici se dañó",
          "Porque olvidó la promesa",
          "Porque Bruno se la pidió de vuelta",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué habría sido más fácil que cumplir?",
          "Relee el tercer párrafo: dice por qué era difícil mantener la palabra.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué fue lo que más valoró Bruno al regresar?",
        options: [
          "Saber que podía confiar por completo en su amigo",
          "Que la bici fuera nueva",
          "Que Tomás la hubiera usado",
          "Que nadie la tocara nunca",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Dedúcelo: el cuento dice que valoró algo más que la bici. ¿Qué?",
          "Relee el quinto párrafo: dice qué fue lo que más valoró Bruno.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que una promesa se cumple aunque nadie esté mirando. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en cumplir sin ser vigilado y lo argumentaste. ¿Por qué cuesta más cumplir cuando nadie ve?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué dice de una persona lo que hace cuando está sola?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que vale la pena cumplir la palabra aunque sea más fácil romperla? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Has cumplido algo que te costó? ¿Cómo te sentiste?",
          "Muy bien. No hay una sola respuesta. ¿Qué se gana al ser alguien de palabra?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué pasa con la confianza cuando alguien rompe sus promesas?",
        replies: [
          "Muy buena explicación. ¿Volverías a confiar en alguien que te incumplió? ¿Por qué?",
          "Muy bien. No hay respuesta única. ¿Cómo se recupera la confianza una vez rota?",
        ],
      },
    ],
  },

  {
    id: "maquina",
    title: "El inventor y la máquina",
    topic: "Ciencia",
    emoji: "⚙️",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "El inventor Teodoro pasó años creando una máquina capaz de multiplicar la cosecha de cualquier campo. Con ella, ningún niño volvería a pasar hambre. Estaba orgulloso y feliz de su invento.",
      "Pero pronto descubrió algo inquietante: la misma máquina, con un pequeño cambio, podía usarse para secar los campos de un enemigo y dejar a pueblos enteros sin comida. Su creación servía tanto para alimentar como para destruir.",
      "Unos generales le ofrecieron una fortuna por la versión destructora. «No es tu problema lo que hagamos con ella», le dijeron. «Tú solo eres el inventor». Teodoro se quedó pensando si eso era realmente cierto.",
      "Sintió el peso de la responsabilidad. Podía decir que él solo inventaba y que el uso era cosa de otros. Pero sabía que, si entregaba la máquina sabiendo el daño que causaría, no estaría del todo limpio de las consecuencias.",
      "Decidió no vender la versión destructora. En cambio, compartió gratis la máquina que alimentaba, con instrucciones para que fuera muy difícil convertirla en un arma. Renunció a la fortuna, pero durmió tranquilo.",
      "Teodoro entendió que quien crea algo no es del todo ajeno a cómo se usa. La inteligencia para inventar debe ir acompañada de la responsabilidad de pensar para qué servirá lo que ponemos en el mundo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Para qué servía la máquina que inventó Teodoro?",
        options: [
          "Para multiplicar la cosecha de cualquier campo",
          "Para volar muy alto",
          "Para curar enfermedades",
          "Para construir casas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía la máquina?",
          "Relee el comienzo: dice para qué servía el invento.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la máquina era preocupante?",
        options: [
          "Porque con un cambio podía secar campos y dejar a pueblos sin comida",
          "Porque era muy cara",
          "Porque se dañaba fácil",
          "Porque nadie la entendía",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: la misma máquina tenía dos usos. ¿Cuál era el peligroso?",
          "Relee el segundo párrafo: dice qué otra cosa podía hacer.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Teodoro no se sentía del todo libre de responsabilidad?",
        options: [
          "Porque entregarla sabiendo el daño lo hacía parte de las consecuencias",
          "Porque no la había terminado",
          "Porque la había copiado de otro",
          "Porque les tenía miedo a los generales",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿bastaba con decir “yo solo invento”?",
          "Relee el cuarto párrafo: dice por qué no estaría del todo limpio.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los generales dijeron que el uso «no era su problema». ¿Estás de acuerdo con ellos o con Teodoro? Defiende tu postura.",
        replies: [
          "Excelente argumento. Tomaste partido en un dilema difícil y lo defendiste. ¿Dónde termina la responsabilidad de quien inventa?",
          "Muy bien sustentado. No hay respuesta correcta única. ¿Qué le responderías a quien piensa lo contrario?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que quien crea algo no es del todo ajeno a cómo se usa. ¿Qué piensas de eso? Explícalo.",
        replies: [
          "Qué reflexión tan madura. Pensaste en la responsabilidad de crear y la argumentaste. ¿Un invento es bueno o malo, o depende del uso?",
          "Muy bien. No hay una sola respuesta. ¿Debería un inventor pensar en el mal uso antes de crear algo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué responsabilidad crees que tiene alguien que inventa algo poderoso?",
        replies: [
          "Muy buena explicación. ¿Cómo podría un inventor reducir el riesgo de que su creación haga daño?",
          "Muy bien. No hay respuesta única. ¿Vale la pena renunciar a dinero por hacer lo correcto?",
        ],
      },
    ],
  },

  {
    id: "arroz",
    title: "El rey y los granos de arroz",
    topic: "Astucia",
    emoji: "🌾",
    minutes: 7,
    difficulty: "Difícil",
    color: "honey",
    paragraphs: [
      "Un sabio le hizo un gran favor al rey y este, agradecido, le ofreció cualquier recompensa. El sabio, en lugar de pedir oro, señaló un tablero de ajedrez y dijo: «Solo quiero arroz: un grano en la primera casilla, dos en la segunda, cuatro en la tercera, y así, doblando hasta la última».",
      "Al rey le pareció un pedido ridículo y modesto. «¿Solo unos granos de arroz?», pensó, casi ofendido por lo poco que pedía. Ordenó de inmediato que se le diera lo que había solicitado, seguro de que era una nimiedad.",
      "Pero al ir contando, los granos crecían de forma asombrosa. En las primeras casillas eran puñados; en la mitad del tablero ya eran sacos enteros; y mucho antes de llegar al final, el arroz superaba todas las cosechas del reino.",
      "Los matemáticos del rey hicieron las cuentas y palidecieron: para llenar las 64 casillas se necesitaba más arroz del que existía en el mundo entero. El humilde pedido era, en realidad, imposible de cumplir.",
      "El rey comprendió que había sido engañado por las apariencias. Lo que parecía minúsculo al principio se volvía gigantesco al duplicarse una y otra vez. Había juzgado el pedido sin entender de verdad qué significaba.",
      "El sabio no quería arruinar al rey; quería enseñarle una lección: no hay que confiarse de lo que parece pequeño, y conviene pensar y calcular antes de prometer algo que no comprendemos del todo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué pidió el sabio como recompensa?",
        options: [
          "Arroz, doblando los granos en cada casilla del tablero",
          "Oro y joyas",
          "La mitad del reino",
          "Un gran palacio",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué pidió en lugar de oro?",
          "Relee el comienzo: dice cómo quería que le dieran el arroz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al rey le pareció ridículo el pedido al principio?",
        options: [
          "Porque creía que solo eran unos pocos granos de arroz",
          "Porque odiaba el arroz",
          "Porque el sabio era pobre",
          "Porque no tenía arroz en el reino",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿se imaginaba el rey la cantidad real?",
          "Relee el segundo párrafo: dice qué pensaba el rey del pedido.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el pedido resultó imposible de cumplir?",
        options: [
          "Porque al duplicarse, el arroz superaba todo el que existía en el mundo",
          "Porque no había tableros",
          "Porque el sabio cambió de idea",
          "Porque el arroz estaba dañado",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué pasaba con la cantidad al ir doblando?",
          "Relee el cuarto párrafo: dice cuánto arroz hacía falta de verdad.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El rey juzgó el pedido sin entenderlo de verdad. ¿Qué piensas de opinar o prometer sobre algo que no comprendemos? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en opinar sin entender y lo argumentaste. ¿Te ha pasado que algo «pequeño» resultó enorme?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué conviene hacer antes de opinar sobre algo que no conocemos bien?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que no hay que confiarse de lo que parece pequeño. ¿Estás de acuerdo? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Qué cosa pequeña puede volverse grande con el tiempo?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que las apariencias engañan?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué crees que conviene pensar y calcular antes de prometer algo?",
        replies: [
          "Muy buena explicación. ¿Qué problemas evita pensar antes de prometer?",
          "Muy bien. No hay respuesta única. ¿Has prometido algo que después fue más difícil de lo que creías?",
        ],
      },
    ],
  },

  {
    id: "forastero",
    title: "El forastero",
    topic: "Sociedad",
    emoji: "🚶",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "A un pueblo tranquilo llegó un forastero de ropa extraña y costumbres distintas. Hablaba poco, comía cosas raras y se sentaba solo a mirar el horizonte. Pronto, los rumores empezaron a correr de casa en casa.",
      "Unos decían que era un ladrón que esperaba el momento de robar; otros, que traía mala suerte. Sin haber cruzado con él más de dos palabras, casi todo el pueblo ya había decidido que era peligroso y lo miraba con recelo.",
      "Solo una niña, Clara, se atrevió a acercarse y a hablarle. Descubrió que el forastero era un viajero que había perdido a su familia y recorría el mundo dibujando los lugares que visitaba, para no sentirse tan solo.",
      "Clara empezó a contarle a la gente cómo era el forastero en realidad: amable, triste y lleno de historias. Al principio nadie le creía, atrapados en lo que ya habían imaginado por su cuenta.",
      "Un día, un incendio amenazó las casas del pueblo. El forastero fue el primero en correr a ayudar, cargando agua y salvando a un anciano atrapado. Recién entonces el pueblo vio con sus propios ojos la clase de persona que era.",
      "Avergonzados, los vecinos le pidieron disculpas por haberlo juzgado sin conocerlo. Aprendieron que es muy fácil inventar historias sobre quien es diferente, y muy injusto creerlas sin haberse acercado a conocer la verdad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Quién fue la única que se atrevió a hablarle al forastero?",
        options: [
          "Una niña llamada Clara",
          "El alcalde",
          "Un anciano",
          "Nadie del pueblo",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Está en el tercer párrafo. ¿Quién se acercó a él?",
          "Relee quién se atrevió a hablarle: dice su nombre.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué casi todo el pueblo lo creía peligroso?",
        options: [
          "Porque inventaron rumores sin siquiera hablar con él",
          "Porque lo vieron robar",
          "Porque él los amenazó",
          "Porque lo decía la ley",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿habían comprobado algo o solo lo imaginaron?",
          "Relee el segundo párrafo: dice que decidieron sin cruzar palabra con él.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el pueblo finalmente cambió de opinión sobre el forastero?",
        options: [
          "Porque lo vieron arriesgarse para ayudar en el incendio",
          "Porque se fue del pueblo",
          "Porque Clara los obligó",
          "Porque cambió de ropa",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: ¿qué hizo el forastero que el pueblo vio con sus propios ojos?",
          "Relee el quinto párrafo: dice qué pasó durante el incendio.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo juzgó al forastero sin conocerlo. ¿Por qué crees que las personas hacen eso con quien es diferente? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en por qué juzgamos a lo distinto y lo argumentaste. ¿Te ha pasado juzgar a alguien y luego cambiar de idea?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué nos lleva a temer lo diferente?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que está bien creer rumores sobre alguien sin comprobarlos? Defiende tu postura.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Qué daño puede hacer un rumor falso?",
          "Muy bien. No hay una sola respuesta. ¿Qué harías si escucharas un rumor sobre alguien?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué se podría hacer para conocer de verdad a alguien antes de juzgarlo?",
        replies: [
          "Muy buena idea, explicada con tus propias palabras. ¿Por dónde empezarías a conocer a alguien nuevo?",
          "Muy bien. No hay respuesta única. ¿Por qué a veces no nos damos la oportunidad de conocer al otro?",
        ],
      },
    ],
  },

  {
    id: "lobo",
    title: "El niño que gritaba lobo",
    topic: "Valores",
    emoji: "🐺",
    minutes: 7,
    difficulty: "Difícil",
    color: "honey",
    paragraphs: [
      "Un niño pastor cuidaba las ovejas en una colina, lejos del pueblo. El trabajo era tan aburrido que un día, para divertirse, gritó con todas sus fuerzas: «¡Lobo! ¡Un lobo está atacando las ovejas!».",
      "Los aldeanos, preocupados, subieron corriendo la colina para ayudarlo. Al llegar, encontraron al niño riéndose: no había ningún lobo. Se había burlado de ellos solo para entretenerse. Molestos, regresaron al pueblo.",
      "Le pareció tan gracioso que, días después, volvió a hacer lo mismo. Gritó «¡lobo!» otra vez, y otra vez los aldeanos subieron a ayudarlo solo para descubrir que era una broma. Esta vez bajaron mucho más enojados.",
      "Una tarde, apareció un lobo de verdad entre el rebaño. Aterrado, el niño gritó «¡lobo!» con todas sus fuerzas, una y otra vez. Pero esta vez nadie subió: en el pueblo pensaron que era otra de sus mentiras.",
      "El lobo se llevó varias ovejas mientras el niño gritaba en vano. De nada sirvió que esta vez dijera la verdad: ya nadie le creía. Sus mentiras anteriores le habían quitado lo más valioso que tenía: su credibilidad.",
      "El niño aprendió, demasiado tarde, una dura lección. Quien miente muchas veces termina sin ser creído ni cuando dice la verdad. La confianza, una vez perdida, es muy difícil de recuperar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué gritó el niño la primera vez, para divertirse?",
        options: [
          "Que un lobo estaba atacando las ovejas",
          "Que se había perdido",
          "Que tenía hambre",
          "Que estaba lloviendo",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué gritó por aburrimiento?",
          "Relee el comienzo: dice qué inventó el niño.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la tercera vez nadie subió a ayudarlo?",
        options: [
          "Porque pensaron que era otra de sus mentiras",
          "Porque estaban dormidos",
          "Porque ya no había ovejas",
          "Porque no lo escucharon",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué había hecho el niño las veces anteriores?",
          "Relee el cuarto párrafo: dice qué pensaron en el pueblo esta vez.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué fue lo más valioso que perdió el niño por mentir?",
        options: [
          "Su credibilidad: que le creyeran",
          "Su colina",
          "Su comida",
          "Su perro",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Dedúcelo: por sus mentiras, ya nadie le creía. ¿Qué es eso?",
          "Relee el quinto párrafo: dice qué le habían quitado sus mentiras.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que la confianza, una vez perdida, es difícil de recuperar. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en recuperar la confianza y lo argumentaste. ¿Has dejado de creerle a alguien que te mintió?",
          "Muy bien sustentado. No hay respuesta única. ¿Cómo se podría recuperar la confianza perdida?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que una mentira «inofensiva» puede traer problemas después? Defiende tu idea con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Una broma puede dejar de ser graciosa? ¿Cuándo?",
          "Muy bien. No hay una sola respuesta. ¿Dónde está el límite entre una broma y una mentira dañina?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué se necesita para que alguien vuelva a confiar en quien lo engañó?",
        replies: [
          "Muy buena explicación. ¿Cuánto tiempo crees que toma recuperar la confianza?",
          "Muy bien. No hay respuesta única. ¿Bastan las disculpas, o hace falta algo más?",
        ],
      },
    ],
  },

  {
    id: "doslobos",
    title: "Los dos lobos",
    topic: "Carácter",
    emoji: "🔥",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "Un abuelo le contaba a su nieto una vieja historia, mientras miraban el fuego. «Dentro de cada persona», le dijo, «hay dos lobos que pelean entre sí todo el tiempo».",
      "«Uno de los lobos es oscuro: es la rabia, la envidia, el rencor, el miedo y la mentira. El otro lobo es luminoso: es la calma, la bondad, la valentía, la verdad y el amor. Los dos viven dentro de ti y luchan sin parar».",
      "El nieto escuchaba muy atento, intrigado por la historia. Imaginaba a esos dos lobos peleando dentro de su pecho, cada uno tirando hacia un lado distinto en cada decisión que tomaba.",
      "Después de un rato pensándolo, el niño preguntó con curiosidad: «Abuelo, y de los dos lobos que pelean, ¿cuál de ellos gana al final?».",
      "El abuelo se quedó en silencio un momento, mirando las llamas. Luego respondió con una sonrisa tranquila: «Gana el lobo al que tú decidas alimentar».",
      "El niño entendió el mensaje. No somos solo lo que sentimos por dentro, sino lo que elegimos hacer con eso. Cada decisión, cada día, alimenta a uno de los dos lobos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "Según el abuelo, ¿cuántos lobos pelean dentro de cada persona?",
        options: ["Dos", "Uno", "Tres", "Muchos"],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cuántos lobos mencionó el abuelo?",
          "Relee el comienzo de la historia que cuenta el abuelo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué representa el lobo oscuro?",
        options: [
          "La rabia, la envidia, el miedo y la mentira",
          "La calma y la bondad",
          "El hambre de los lobos",
          "La fuerza física",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Está descrito en el segundo párrafo. ¿Qué cosas son el lobo oscuro?",
          "Relee dónde el abuelo explica cada lobo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el abuelo con que gana «el lobo al que decidas alimentar»?",
        options: [
          "Que con nuestras decisiones elegimos qué parte de nosotros crece",
          "Que hay que darle comida a un lobo",
          "Que el lobo oscuro siempre gana",
          "Que los lobos no existen",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "No es literal: piénsalo. ¿Qué “alimenta” a cada lobo dentro de ti?",
          "Relee la respuesta del abuelo junto con el final.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El abuelo dice que no somos solo lo que sentimos, sino lo que elegimos hacer. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en sentir frente a actuar y lo argumentaste. ¿Podemos controlar lo que sentimos, o solo lo que hacemos?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué importa más: lo que sientes o lo que haces con eso?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que podemos elegir qué «lobo» alimentar, incluso cuando sentimos rabia o miedo? Defiende tu idea.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Qué te ayuda a calmarte cuando sientes rabia?",
          "Muy bien. No hay una sola respuesta. ¿Es fácil o difícil elegir el “lobo luminoso” en un mal momento?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué cosas crees que «alimentan» al lobo luminoso en el día a día?",
        replies: [
          "Muy buena explicación. ¿Cuál de esas cosas te sale más natural a ti?",
          "Muy bien. No hay respuesta única. ¿Cómo se siente uno cuando alimenta su mejor parte?",
        ],
      },
    ],
  },

  {
    id: "herrero",
    title: "El herrero y la espada",
    topic: "Ética",
    emoji: "⚔️",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "En un pueblo antiguo vivía un herrero llamado Darío, famoso por forjar las mejores herramientas de la región: arados que partían la tierra, hachas que cortaban leña y herraduras para los caballos.",
      "Un día llegó un guerrero y le encargó la espada más afilada y mortal que pudiera hacer. Le ofreció mucho oro. Darío sabía forjarla mejor que nadie, pero por primera vez dudó frente a su fragua.",
      "Sus herramientas servían para construir, sembrar y trabajar. Una espada, en cambio, solo tenía un propósito: herir a otras personas. Por más oro que le ofrecieran, se preguntaba si quería que sus manos crearan algo hecho para hacer daño.",
      "El guerrero insistió: «Si tú no la haces, otro herrero la hará igual». Y quizás era cierto. Pero Darío pensó que «otros también lo hacen» nunca había sido una buena razón para hacer algo que uno cree que está mal.",
      "Rechazó el encargo. En su lugar, le ofreció al guerrero forjar un arado, para que cambiara la guerra por el campo. El guerrero se marchó enojado, pero Darío se quedó en paz con su decisión.",
      "Darío entendió que un buen oficio no consiste solo en saber hacer las cosas, sino en elegir con cuidado qué cosas hacer. La habilidad sin conciencia puede crear tanto herramientas como armas.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué cosas era famoso el herrero Darío?",
        options: [
          "Por forjar las mejores herramientas de la región",
          "Por sus espadas mortales",
          "Por sus joyas",
          "Por sus barcos",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué forjaba Darío?",
          "Relee el comienzo: nombra lo que hacía.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Darío dudó frente a la fragua al recibir el encargo?",
        options: [
          "Porque una espada solo servía para herir, a diferencia de sus herramientas",
          "Porque no sabía hacerla",
          "Porque le ofrecían poco oro",
          "Porque estaba muy cansado",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿en qué se diferenciaba una espada de sus otras creaciones?",
          "Relee el tercer párrafo: dice para qué servía cada cosa.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué no aceptó el argumento de que «otro la haría igual»?",
        options: [
          "Porque que otros lo hagan no es buena razón para hacer algo que uno cree malo",
          "Porque no había otros herreros",
          "Porque el guerrero mentía",
          "Porque quería más oro",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿sirve “otros también lo hacen” como excusa?",
          "Relee el cuarto párrafo: dice qué pensó Darío de ese argumento.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El guerrero dijo: «si tú no la haces, otro lo hará». ¿Te parece una buena razón para hacer algo? Explícalo.",
        replies: [
          "Excelente reflexión. Analizaste esa excusa común y la argumentaste. ¿Vale como justificación que otros también lo hagan?",
          "Muy bien sustentado. No hay respuesta única. ¿En qué situaciones se usa ese argumento para hacer algo malo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que la habilidad sin conciencia puede crear armas. ¿Qué piensas de eso? Defiende tu idea.",
        replies: [
          "Qué reflexión tan madura. Pensaste en talento y conciencia, y la defendiste. ¿De qué sirve ser muy hábil sin pensar en el bien?",
          "Muy bien. No hay una sola respuesta. ¿Es suficiente ser bueno en algo, o también importa para qué se usa?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿crees que importa para qué se usará algo que uno hace? ¿Por qué?",
        replies: [
          "Muy buena explicación. ¿Quién es responsable cuando algo se usa para hacer daño?",
          "Muy bien. No hay respuesta única. ¿Harías algo aunque supieras que se usará mal?",
        ],
      },
    ],
  },

  {
    id: "arena",
    title: "Las esculturas de arena",
    topic: "Reflexión",
    emoji: "🏖️",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "Cada año, en la playa del pueblo, se celebraba un concurso de esculturas de arena. Los artistas trabajaban durante horas bajo el sol creando castillos, dragones y figuras increíbles, sabiendo que la marea las borraría esa misma noche.",
      "Un niño llamado Iván no entendía el concurso. «¿Para qué tanto esfuerzo», preguntaba, «si el mar va a destruir todo en unas horas? Es una pérdida de tiempo».",
      "Su abuela, que esculpía cada año, le pidió que la ayudara a construir una sirena de arena. Mientras trabajaban juntos, Iván se concentró tanto en dar forma a las escamas que olvidó por completo el reloj y la marea.",
      "Pasaron la tarde riendo, mojándose, corrigiendo la cola de la sirena una y otra vez. Otras familias se acercaban a admirar la figura, e Iván sintió un orgullo y una alegría que no esperaba.",
      "Esa noche, como siempre, la marea borró todas las esculturas. Pero Iván ya no se sintió triste. La sirena había desaparecido, sí, pero la tarde con su abuela, la risa y lo que había aprendido seguían con él.",
      "Iván entendió que no todo vale solo por durar para siempre. Algunas cosas hermosas son pasajeras, y aun así valen la pena, por lo que vivimos y sentimos mientras las hacemos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué construían los artistas en el concurso?",
        options: [
          "Esculturas de arena",
          "Castillos de madera",
          "Estatuas de piedra",
          "Dibujos en papel",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿De qué eran las esculturas?",
          "Relee el comienzo: dice de qué material trabajaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio Iván pensaba que el concurso era una pérdida de tiempo?",
        options: [
          "Porque la marea borraría todo en unas horas",
          "Porque hacía mucho frío",
          "Porque no sabía esculpir",
          "Porque no había premios",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo de lo que preguntaba Iván.",
          "Relee el segundo párrafo: dice qué le parecía inútil y por qué.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Iván ya no se sintió triste cuando la marea borró la sirena?",
        options: [
          "Porque lo que vivió y aprendió con su abuela seguía con él",
          "Porque construyó otra enseguida",
          "Porque ganó el premio",
          "Porque no le importaba la sirena",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: la sirena se borró, pero algo quedó. ¿Qué?",
          "Relee el quinto párrafo: dice qué seguía con Iván.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que algunas cosas hermosas son pasajeras y aun así valen la pena. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en lo pasajero y lo argumentaste. ¿Qué momento corto recuerdas con mucho cariño?",
          "Muy bien sustentado. No hay respuesta única. ¿Algo deja de valer solo porque se acaba?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que algo vale solo si dura para siempre? Defiende tu postura con un ejemplo.",
        replies: [
          "Qué buen ejemplo. Apoyaste tu idea con algo concreto. ¿Qué cosas pasajeras te hacen feliz?",
          "Muy bien. No hay una sola respuesta. ¿Disfrutarías menos algo si supieras que no durará?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué momentos pasajeros crees que valen la pena aunque no duren?",
        replies: [
          "Muy buena explicación. ¿Por qué crees que esos momentos te marcan tanto?",
          "Muy bien. No hay respuesta única. ¿Cómo se disfruta más algo que sabemos que es pasajero?",
        ],
      },
    ],
  },

  {
    id: "biblioteca",
    title: "La biblioteca prohibida",
    topic: "Sociedad",
    emoji: "📚",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "En un reino gobernado por un rey temeroso, había una enorme biblioteca cerrada con candado. El rey había prohibido la lectura de la mayoría de sus libros, convencido de que, si la gente leía demasiado, haría preguntas difíciles y dejaría de obedecer.",
      "Durante años, el pueblo creció sin leer más que unas pocas páginas permitidas. Muchos repetían lo que les decían sin cuestionarlo, porque no conocían otras ideas ni otras historias con que compararlas.",
      "Una joven llamada Nara trabajaba limpiando la biblioteca. A escondidas, empezó a leer los libros prohibidos. Cada uno le abría una ventana a mundos, ideas y preguntas que ella jamás había imaginado.",
      "Nara comprendió por qué el rey les temía a los libros: leer hacía pensar, y pensar hacía libre. Quien conoce muchas ideas es más difícil de engañar, porque puede comparar y decidir por sí mismo.",
      "En secreto, Nara empezó a compartir lo que leía. Contaba historias en la plaza, enseñaba a leer a otros niños y, poco a poco, las ideas se esparcieron como semillas. La gente volvió a hacer preguntas.",
      "El reino cambió, no por la fuerza, sino por el conocimiento. Nara entendió que prohibir leer es una forma de mantener a la gente dormida, y que los libros, en cambio, despiertan la mente y la libertad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué había prohibido el rey?",
        options: [
          "La lectura de la mayoría de los libros",
          "Salir de noche",
          "Cantar en la plaza",
          "Sembrar en los campos",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué tenía bajo candado y prohibido?",
          "Relee el comienzo: dice qué prohibió el rey.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el rey les temía a los libros?",
        options: [
          "Porque leer hacía pensar y cuestionar, y dejar de obedecer",
          "Porque eran muy caros",
          "Porque pesaban mucho",
          "Porque estaban dañados",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué hace en las personas el leer y el pensar?",
          "Relee el cuarto párrafo: dice por qué el rey temía a los libros.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el reino cambió al final?",
        options: [
          "Porque el conocimiento se esparció y la gente volvió a pensar y preguntar",
          "Porque hubo una guerra",
          "Porque cambió el rey por otro",
          "Porque construyeron más castillos",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Une las pistas: ¿qué hizo Nara con lo que leía?",
          "Relee el quinto y sexto párrafo: dice cómo cambió el reino.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que leer hace pensar y pensar hace libre. ¿Qué crees que significa eso? Explícalo.",
        replies: [
          "Excelente reflexión. Lo explicaste con tus palabras, que es lo importante. ¿Cómo te ha hecho pensar algo que leíste?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que conocer ideas nos hace más libres?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que conocer muchas ideas distintas ayuda a no ser engañado? Defiende tu idea.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Por qué es más difícil engañar a quien conoce muchas ideas?",
          "Muy bien. No hay una sola respuesta. ¿Qué pasa cuando solo conocemos una versión de las cosas?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué crees que es importante poder leer y aprender libremente?",
        replies: [
          "Muy buena explicación. ¿Qué te gustaría aprender si pudieras leer sobre cualquier cosa?",
          "Muy bien. No hay respuesta única. ¿Qué se pierde un pueblo al que no se le deja leer?",
        ],
      },
    ],
  },

  {
    id: "mascara",
    title: "Las dos máscaras",
    topic: "Identidad",
    emoji: "🎭",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Lucas tenía dos formas de ser. En el colegio, usaba una «máscara»: se reía de bromas que no le gustaban, fingía gustos que no tenía y escondía lo que de verdad pensaba, todo para encajar con el grupo popular.",
      "En casa, en cambio, era él mismo: le encantaba dibujar cómics, escuchar música tranquila y hablar de estrellas. Pero esa parte la mantenía oculta, por miedo a que se burlaran si la mostraba en el colegio.",
      "Con el tiempo, fingir empezó a cansarlo. Sentía que nadie en el colegio lo conocía de verdad, porque solo veían a la persona que él aparentaba ser. Tenía muchos «amigos», pero se sentía solo entre ellos.",
      "Un día, casi por accidente, otro compañero descubrió sus dibujos y, en vez de burlarse, le dijo que eran geniales. Resultó que a él también le gustaban los cómics, pero los escondía por el mismo miedo que Lucas.",
      "Poco a poco, Lucas se atrevió a quitarse la máscara. Algunos se alejaron, pero otros, los de verdad, se acercaron por quien era realmente. Por primera vez sintió que lo querían a él, y no a un personaje inventado.",
      "Lucas entendió que esconderse para encajar tiene un precio: nadie llega a conocerte de verdad. Ser uno mismo puede dar miedo al principio, pero es la única forma de tener amistades auténticas.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo se comportaba Lucas en el colegio al principio?",
        options: [
          "Usaba una «máscara» y fingía para encajar",
          "Era totalmente él mismo",
          "No hablaba con nadie",
          "Dibujaba cómics frente a todos",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía en el colegio para encajar?",
          "Relee el comienzo: dice cómo se comportaba con el grupo popular.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Lucas se sentía solo aunque tenía muchos «amigos»?",
        options: [
          "Porque nadie lo conocía de verdad, solo a la persona que aparentaba",
          "Porque vivía muy lejos",
          "Porque no le hablaban",
          "Porque era nuevo",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: si fingía, ¿a quién conocían sus amigos en realidad?",
          "Relee el tercer párrafo: dice por qué se sentía solo entre ellos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el otro compañero también escondía sus gustos?",
        options: [
          "Porque tenía el mismo miedo a las burlas que Lucas",
          "Porque no le gustaban de verdad",
          "Porque se lo prohibían en casa",
          "Porque no tenía amigos",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Une las pistas: a él también le gustaban los cómics, pero los ocultaba. ¿Por qué?",
          "Relee el cuarto párrafo: dice qué sentían los dos por igual.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que esconderse para encajar tiene un precio. ¿Estás de acuerdo? Explícalo.",
        replies: [
          "Excelente reflexión. Pensaste en el costo de fingir y lo argumentaste. ¿Vale la pena encajar dejando de ser uno mismo?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se pierde cuando ocultamos cómo somos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que vale la pena ser uno mismo aunque algunos se alejen? Defiende tu idea.",
        replies: [
          "Qué buena postura. La defendiste con razones. ¿Prefieres pocos amigos de verdad o muchos que no te conocen?",
          "Muy bien. No hay una sola respuesta. ¿Qué tipo de amistad crees que dura más?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué crees que cuesta tanto mostrarnos como somos de verdad?",
        replies: [
          "Muy buena explicación. ¿Qué ayudaría a alguien a atreverse a ser auténtico?",
          "Muy bien. No hay respuesta única. ¿A quién te muestras tal cual eres sin miedo?",
        ],
      },
    ],
  },

  {
    id: "espacio",
    title: "El primer viaje a Marte",
    topic: "Espacio",
    emoji: "🚀",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "Valentina soñaba con ser astronauta desde los cinco años, cuando vio por primera vez una foto de la Tierra tomada desde el espacio. Estudió durante años, presentó cientos de exámenes y entrenó su cuerpo hasta el cansancio. Por fin la eligieron para algo que ningún ser humano había hecho jamás: viajar a Marte.",
      "El viaje duraría siete meses encerrada en una nave del tamaño de una casa pequeña, junto a otros tres tripulantes. No podría abrazar a su familia, ni caminar al aire libre, ni comer nada fresco. Cada gramo de comida y cada gota de agua estaban contados con precisión.",
      "No todos estaban de acuerdo con la misión. Algunas personas decían que era un desperdicio gastar tanto dinero en llegar a un planeta vacío, mientras en la Tierra había problemas sin resolver. Otras pensaban que explorar el espacio podía traer descubrimientos capaces de ayudar a toda la humanidad.",
      "A mitad de camino, una tormenta de partículas dañó parte de los paneles solares y la nave empezó a quedarse sin energía. La tripulación tuvo que apagar todo lo que no fuera indispensable y salir al vacío del espacio, sujetos con cuerdas, para reparar los paneles con sus propias manos.",
      "Fueron las horas más tensas de todo el viaje, porque un solo error podía dejarlos sin energía para siempre. Trabajando en equipo y sin perder la calma, lograron arreglar los paneles justo antes de que se agotaran las últimas baterías.",
      "Cuando la nave por fin se posó sobre el suelo rojizo de Marte, Valentina miró por la ventana y lloró de emoción. No solo había llegado más lejos que cualquier persona en la historia: había demostrado que un sueño de la niñez, con esfuerzo y trabajo en equipo, podía cambiar el mundo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cuánto tiempo duraría el viaje hasta Marte?",
        options: ["Siete días", "Siete semanas", "Siete meses", "Siete años"],
        correct: 2,
        evidence: 1,
        hints: [
          "El dato exacto está en el segundo párrafo. Búscalo con calma.",
          "Relee donde describe la nave y la tripulación: ahí dice cuánto duraba el viaje.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué cada gramo de comida y cada gota de agua estaban contados?",
        options: [
          "Porque en la nave no se podía conseguir más durante el viaje",
          "Porque a Valentina le gustaba contar",
          "Porque la comida estaba dañada",
          "Porque eran demasiados tripulantes",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "No se explica directo. Piensa: encerrados siete meses, ¿de dónde sacarían más comida o agua?",
          "Relee el segundo párrafo: no podían salir ni conseguir nada fresco. ¿Qué significa eso para los recursos?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué reparar los paneles fueron “las horas más tensas del viaje”?",
        options: [
          "Porque si fallaban, podían quedarse sin energía para siempre",
          "Porque hacía mucho calor adentro",
          "Porque se les acabó la comida",
          "Porque habían perdido el mapa",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "Dedúcelo: ¿qué estaba en juego si no lograban arreglar los paneles?",
          "Relee el quinto párrafo: dice qué podía pasar con un solo error.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Unos decían que el viaje era un desperdicio de dinero y otros que valía la pena. ¿Con qué postura estás y por qué? Defiende tu idea con razones.",
        replies: [
          "Excelente argumento. Tomaste una postura sobre algo que hasta los adultos discuten. ¿Qué le responderías a alguien que piensa lo contrario?",
          "Muy bien sustentado. No hay una respuesta correcta: lo valioso es cómo la defiendes. ¿Qué cosas buenas o malas trae cada opción?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Si tú fueras Valentina, ¿aceptarías pasar siete meses sin ver a tu familia para cumplir tu sueño? Explica tus razones.",
        replies: [
          "Qué respuesta tan honesta. Pesaste lo que ganas y lo que dejas, y lo explicaste. ¿Qué sería lo más difícil para ti?",
          "Muy bien pensado. No hay respuesta única: lo importante es cómo lo argumentas. ¿Vale la pena un sacrificio así por un sueño?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué crees que significa que “un sueño de la niñez puede cambiar el mundo”? ¿Estás de acuerdo?",
        replies: [
          "Linda reflexión. Interpretaste la idea con tus propias palabras, que es lo importante. ¿Tienes un sueño que quisieras cumplir de grande?",
          "Muy bien. No hay una sola respuesta. ¿Crees que los grandes cambios empiezan con un sueño y mucho trabajo?",
        ],
      },
    ],
  },

  {
    id: "misterio",
    title: "La casa al final de la colina",
    topic: "Misterio",
    emoji: "🔦",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Durante años, todos en el pueblo aseguraban que la casa al final de la colina estaba embrujada. Por las noches se veía una luz tenue temblando en la ventana de arriba, y nadie recordaba haber visto entrar ni salir a nadie. Los niños caminaban más rápido al pasar frente a ella.",
      "Las historias crecían de boca en boca. Unos juraban haber escuchado lamentos; otros, que la puerta se abría sola. Cuantas más personas lo repetían, más cierto parecía, aunque en realidad nadie podía decir que lo hubiera visto con sus propios ojos.",
      "Tomás, en cambio, era curioso y no le gustaba creer las cosas solo porque las decían los demás. Una tarde, con su perro al lado, subió la colina decidido a averiguar la verdad. Tocó la vieja puerta de madera con el corazón latiéndole muy fuerte.",
      "Para su sorpresa, abrió una anciana de sonrisa amable que los invitó a pasar a tomar chocolate. Se llamaba doña Rosa. Vivía sola y casi no salía, porque le costaba mucho caminar desde una caída que había tenido años atrás.",
      "La famosa luz de la ventana no era ningún fantasma: era la lámpara con la que doña Rosa leía cada noche, ya que los libros eran su única compañía. No salía porque no podía, no porque escondiera un secreto. Todo el misterio había sido inventado por la imaginación del pueblo.",
      "Tomás volvió muchas tardes a leerle cuentos. Poco a poco, otros vecinos se animaron a visitarla y el miedo a la casa desapareció. Tomás entendió que, a veces, lo que parece aterrador solo necesita que alguien se acerque a conocerlo de verdad.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué era en realidad la luz que se veía de noche en la ventana?",
        options: [
          "La lámpara con la que doña Rosa leía",
          "Un fantasma",
          "Un reflejo de la luna",
          "Una vela olvidada",
        ],
        correct: 0,
        evidence: 4,
        hints: [
          "La explicación está en el quinto párrafo. ¿Para qué usaba doña Rosa esa luz?",
          "Relee cuando se descubre la verdad: dice qué hacía la señora cada noche con esa luz.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué doña Rosa casi nunca salía de su casa?",
        options: [
          "Porque le costaba caminar desde una caída",
          "Porque odiaba a la gente del pueblo",
          "Porque escondía un secreto",
          "Porque solo salía de noche",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "El dato está cuando Tomás la conoce. ¿Qué le había pasado años atrás?",
          "Relee el cuarto párrafo: dice por qué le costaba salir.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué las historias de la casa “parecían más ciertas” con el tiempo?",
        options: [
          "Porque mucha gente las repetía, aunque nadie las había comprobado",
          "Porque de verdad eran ciertas",
          "Porque doña Rosa las contaba",
          "Porque salían en el periódico",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: el cuento dice que nadie lo había visto, pero todos lo repetían. ¿Qué hace eso con un rumor?",
          "Relee el segundo párrafo: dice qué pasaba cuantas más personas lo contaban.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Tomás no creía algo solo porque los demás lo decían. ¿Te parece una buena forma de pensar? Defiende tu idea con razones.",
        replies: [
          "Qué buen punto. Pensaste en cómo decidir qué creer y lo argumentaste. ¿Cómo haces tú para saber si algo es verdad?",
          "Muy bien sustentado. No hay una sola respuesta. ¿Qué problemas puede traer creer todo lo que se dice sin comprobarlo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo le tuvo miedo a doña Rosa sin conocerla. ¿Por qué crees que las personas a veces juzgan sin conocer? Explícalo con tus palabras.",
        replies: [
          "Reflexión muy madura. Pensaste en por qué juzgamos de más y lo explicaste. ¿Te ha pasado que alguien te juzgó sin conocerte?",
          "Muy bien. No hay respuesta única. ¿Qué crees que ayudaría a que la gente no juzgara tan rápido?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Estás de acuerdo con que “lo que parece aterrador solo necesita que alguien se acerque a conocerlo”? Argumenta tu respuesta.",
        replies: [
          "Qué reflexión tan madura. Pensaste en el miedo a lo desconocido y lo argumentaste. ¿Te ha pasado que algo te asustaba hasta que lo conociste?",
          "Muy bien defendido. No hay una sola respuesta. ¿Siempre lo desconocido deja de dar miedo al conocerlo, o a veces no?",
        ],
      },
    ],
  },

  {
    id: "muralla",
    title: "La muralla del pueblo",
    topic: "Sociedad",
    emoji: "🧱",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Hace mucho tiempo, dos familias compartían un mismo valle. Tras una pelea cuyo motivo nadie recordaba ya con claridad, decidieron levantar una muralla de piedra que partía el valle justo por la mitad, para no volver a verse.",
      "Pasaron generaciones. Los niños de cada lado crecían escuchando que «los del otro lado» eran peligrosos, distintos, gente en la que no se podía confiar. Nadie había cruzado nunca, pero todos repetían lo mismo sobre los vecinos que no conocían.",
      "Un año, una sequía golpeó el valle. De un lado se secaron los pozos; del otro, se perdieron las cosechas pero quedó agua. Cada mitad tenía justo lo que a la otra le faltaba, pero la muralla les impedía siquiera saberlo.",
      "Una niña llamada Sela, cansada de pasar sed, trepó la muralla por curiosidad. Al otro lado encontró no a monstruos, sino a otro niño igual de asustado y sediento que ella. Hablaron, y descubrieron que cada lado podía salvar al otro.",
      "Costó convencer a los mayores, que llevaban toda la vida temiéndose. Pero el hambre y la sed pudieron más que el rencor heredado. Abrieron una pequeña puerta en la muralla para intercambiar agua y comida, y así sobrevivieron todos.",
      "Con los años, esa puerta se hizo más grande, y la muralla quedó como un recuerdo de algo que casi los destruye: el miedo a quienes nunca se habían tomado la molestia de conocer.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué las dos familias levantaron la muralla?",
        options: [
          "Tras una pelea cuyo motivo ya nadie recordaba bien",
          "Para protegerse de animales",
          "Porque un rey lo ordenó",
          "Para dividir el agua en partes iguales",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué pasó antes de que construyeran la muralla?",
          "Relee el comienzo: dice por qué decidieron no volver a verse.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los niños temían a «los del otro lado» sin haberlos visto nunca?",
        options: [
          "Porque habían tenido malas experiencias con ellos",
          "Porque repetían lo que les enseñaron, sin conocerlos de verdad",
          "Porque los del otro lado los atacaban",
          "Porque la muralla era muy alta",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: nadie había cruzado, y aun así todos repetían lo mismo. ¿De dónde venía ese miedo?",
          "Relee el segundo párrafo: ¿el temor venía de la experiencia o de lo que les contaban?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la sequía terminó uniendo a los dos lados?",
        options: [
          "Porque la muralla se cayó sola",
          "Porque cada lado tenía justo lo que al otro le faltaba y se necesitaban",
          "Porque llegó ayuda de afuera",
          "Porque los mayores se reconciliaron primero",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une las pistas: un lado tenía agua y al otro le faltaba; uno perdió cosechas y el otro no. ¿Qué implicaba eso?",
          "Relee el tercer y quinto párrafo: ¿qué los obligó a buscarse a pesar del rencor?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los niños temían a gente que nunca habían conocido, solo por lo que les contaron. ¿Crees que es justo juzgar a alguien sin conocerlo? Defiende tu postura.",
        replies: [
          "Excelente argumento. Tomaste posición sobre los prejuicios y la sustentaste. ¿De dónde crees que sacamos las ideas sobre quienes no conocemos?",
          "Muy bien defendido. No hay una sola respuesta. ¿Qué se necesita para dejar de temerle a alguien distinto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El rencor entre las familias se heredó durante generaciones sin que nadie recordara su origen. ¿Crees que está bien heredar los odios de quienes vinieron antes? ¿Por qué?",
        replies: [
          "Qué reflexión tan madura. Pensaste en si los conflictos deben pasar de generación en generación y lo argumentaste. ¿Quién podría romper esa cadena?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué se pierde cuando odiamos algo sin siquiera saber por qué?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué nos enseña esta historia sobre el miedo a lo que no conocemos, y cómo podríamos enfrentarlo?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Te has acercado alguna vez a algo que temías y resultó distinto?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que es más fácil temer que acercarse a conocer?",
        ],
      },
    ],
  },

  {
    id: "votacion",
    title: "La votación de la clase",
    topic: "Sociedad",
    emoji: "🗳️",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "La maestra anunció que la clase elegiría, por votación, el destino del paseo de fin de año. La regla era simple: ganaría el lugar con más votos, y todos irían allí. Parecía la forma más justa de decidir.",
      "La mayoría quería ir a un parque de diversiones. Pero tres estudiantes no podían: uno usaba silla de ruedas y muchos juegos no eran accesibles; otra tenía una condición que le impedía las atracciones bruscas; el tercero no podía pagar la entrada.",
      "La votación fue rápida: el parque ganó por amplia mayoría. La mayoría celebró, pero esos tres compañeros se quedaron en silencio. La decisión, tomada de la forma «más justa», los dejaba a ellos fuera del paseo de todos.",
      "Una estudiante llamada Noa levantó la mano y preguntó: «¿Es justo que ganar por más votos signifique que algunos no puedan venir?». La clase se quedó pensando. Habían confundido «lo que quiere la mayoría» con «lo que es bueno para todos».",
      "Decidieron votar de nuevo, pero esta vez con una condición: el lugar elegido tenía que ser uno al que absolutamente todos pudieran ir. Eligieron una granja-escuela accesible, más barata, donde nadie quedaba excluido.",
      "Al final, el paseo fue de los mejores que recordaban. Aprendieron que una decisión no es justa solo por contar más manos levantadas: también importa que nadie quede afuera por el camino.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué iban a decidir los estudiantes con la votación?",
        options: [
          "El destino del paseo de fin de año",
          "Quién sería el delegado",
          "Qué película ver",
          "El día del examen",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Sobre qué era la votación?",
          "Relee el comienzo: dice qué se decidiría por votos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los tres compañeros se quedaron en silencio tras la votación?",
        options: [
          "Porque estaban de acuerdo con el resultado",
          "Porque la opción ganadora los dejaba a ellos fuera del paseo",
          "Porque no habían votado",
          "Porque preferían quedarse en casa",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿por qué esos tres no podían ir al parque?",
          "Relee el segundo y tercer párrafo: ¿qué significaba para ellos que ganara el parque?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué error había en la primera forma de votar, según se dieron cuenta?",
        options: [
          "Que no votaron todos",
          "Que confundieron «lo que quiere la mayoría» con «lo que es bueno para todos»",
          "Que la maestra eligió por ellos",
          "Que contaron mal los votos",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: la mayoría ganó, pero algunos quedaban fuera. ¿Qué habían confundido?",
          "Relee el cuarto párrafo: dice qué dos cosas distintas habían mezclado.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La clase decidió que el lugar tenía que ser uno al que todos pudieran ir, aunque no fuera el más votado. ¿Estás de acuerdo con ese cambio? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en el equilibrio entre la mayoría y los demás, y lo sustentaste. ¿Qué le dirías a quien solo quería el parque?",
          "Muy bien defendido. No hay una sola respuesta. ¿Hasta dónde debe ceder la mayoría para no dejar a nadie afuera?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "¿Crees que una decisión es justa solo porque la apoya la mayoría? Explica tu respuesta con razones.",
        replies: [
          "Qué reflexión tan profunda. Cuestionaste si la mayoría siempre tiene la razón y lo argumentaste. ¿Se te ocurre un caso en que la mayoría se equivoque?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué debería protegerse aunque la mayoría opine distinto?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué diferencia hay entre «lo que quiere la mayoría» y «lo que es justo para todos»?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Puedes pensar en un ejemplo de tu vida donde se note esa diferencia?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que a veces lo que quieren muchos no es lo mejor para todos?",
        ],
      },
    ],
  },

  {
    id: "cartografo",
    title: "El cartógrafo y el mapa en blanco",
    topic: "Ciencia",
    emoji: "🗺️",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "Hace siglos, los reyes pagaban a cartógrafos para dibujar mapas del mundo. Cuanto más completo parecía un mapa, más se admiraba a quien lo había hecho. Por eso muchos cartógrafos llenaban las zonas que no conocían con islas y montañas inventadas.",
      "Daro era un cartógrafo distinto. Cuando llegaba a un territorio que nadie había explorado, no inventaba nada: dejaba esa parte del mapa en blanco y escribía con letra clara: «Aún no explorado».",
      "Los demás se burlaban de sus mapas «incompletos». «El rey prefiere un mapa lleno», le decían. Y era verdad: al principio, el rey valoró más los mapas adornados con tierras imaginarias que los honestos espacios vacíos de Daro.",
      "Pero un día, una flota siguió un mapa lleno de islas inventadas y naufragó contra arrecifes que no existían en el papel, buscando puertos que nunca habían sido reales. Murieron muchos marineros confiando en datos falsos.",
      "Entonces el rey comprendió. Mandó llamar a Daro y le encargó todos los mapas del reino. Un espacio en blanco que dice «no lo sé» era mil veces más seguro que un dibujo bonito que mentía sobre lo que había allá afuera.",
      "Daro pasó a la historia no por saberlo todo, sino por algo más raro y valioso: tener el valor de admitir, en pleno mapa, todo aquello que aún no sabía.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué escribía Daro en las zonas que nadie había explorado?",
        options: [
          "Dibujaba islas y montañas inventadas",
          "Las dejaba en blanco con la nota «Aún no explorado»",
          "Las pintaba de azul",
          "Copiaba los mapas de otros",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Qué hacía Daro con lo que no conocía?",
          "Relee dónde se lo presenta como un cartógrafo distinto: dice qué anotaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al principio el rey prefería los mapas de los otros cartógrafos?",
        options: [
          "Porque parecían más completos, aunque tuvieran tierras inventadas",
          "Porque eran más baratos",
          "Porque Daro dibujaba mal",
          "Porque estaban en otro idioma",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué valoraba el rey de un mapa al comienzo?",
          "Relee el tercer párrafo: dice qué prefería el rey antes del naufragio.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el rey cambió de opinión sobre los mapas de Daro?",
        options: [
          "Porque Daro le pagó",
          "Porque una flota naufragó confiando en un mapa con datos falsos",
          "Porque los otros cartógrafos se fueron",
          "Porque el mapa de Daro era más bonito",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: algo grave pasó por confiar en un mapa inventado. ¿Qué?",
          "Relee el cuarto y quinto párrafo: ¿qué le hizo entender que un espacio en blanco era más seguro?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Daro prefería admitir «no lo sé» antes que inventar para parecer más sabio. ¿Crees que reconocer lo que no sabemos es una fortaleza o una debilidad? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en el valor de admitir la ignorancia y lo sustentaste. ¿Por qué crees que a veces nos cuesta tanto decir «no lo sé»?",
          "Muy bien defendido. No hay una sola respuesta. ¿Qué peligros tiene fingir que sabemos algo que en realidad no sabemos?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los mapas inventados se veían mejor, pero causaron un naufragio. ¿Crees que una mentira que «parece» buena puede ser más peligrosa que una verdad incómoda? ¿Por qué?",
        replies: [
          "Qué reflexión tan madura. Comparaste lo que parece bueno con lo que es verdadero y lo argumentaste. ¿Prefieres una verdad difícil o una mentira cómoda?",
          "Muy bien sustentado. No hay respuesta única. ¿En qué situaciones de la vida real puede ser peligroso fingir que sabemos algo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué puede ser más valioso un «no lo sé» honesto que una respuesta inventada?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Te ha pasado que alguien te diera una respuesta inventada y te causara un problema?",
          "Muy bien. No hay respuesta única. ¿Cómo cambiaría la ciencia si los investigadores inventaran lo que no saben?",
        ],
      },
    ],
  },

  {
    id: "ladron",
    title: "El ladrón de pan",
    topic: "Justicia",
    emoji: "🍞",
    minutes: 7,
    difficulty: "Difícil",
    color: "honey",
    paragraphs: [
      "En un pueblo donde la ley era muy estricta, un hombre llamado Eliseo fue sorprendido robando una hogaza de pan de una panadería. La ley decía con claridad: todo robo se castiga con tres días en el calabozo, sin excepciones.",
      "Pero el caso no era simple. Eliseo había robado el pan para alimentar a sus tres hijos, que llevaban dos días sin comer. Había buscado trabajo sin encontrarlo y había pedido ayuda sin recibirla. Robar fue su último recurso, no su primera opción.",
      "El juez del pueblo se encontró ante un dilema. La ley era la ley, e ignorarla significaría que cualquiera podría robar alegando necesidad. Pero aplicarla sin más significaría castigar a un padre desesperado por evitar que sus hijos murieran de hambre.",
      "El juez tomó una decisión sorprendente. Declaró a Eliseo culpable de robo, porque la ley se había roto, y le puso una multa. Pero a la vez pagó esa multa de su propio bolsillo, y añadió: «Y me multo a mí mismo, y a este pueblo, por permitir que un padre tenga que robar para que sus hijos coman».",
      "El pueblo entendió el mensaje. No bastaba con castigar el robo: había que preguntarse por qué alguien llegaba a robar pan. Al poco tiempo se organizó una despensa para que ninguna familia pasara hambre.",
      "La historia se recordó por años, no porque el juez fuera blando ni duro, sino porque entendió que la justicia no es solo aplicar la ley: es también mirar las causas de lo que la ley castiga.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué decía la ley del pueblo sobre los robos?",
        options: [
          "Que se perdonaban si había necesidad",
          "Que todo robo se castigaba con tres días en el calabozo, sin excepciones",
          "Que se pagaban con trabajo",
          "Que los decidía el panadero",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Cuál era el castigo según la ley?",
          "Relee el comienzo: dice qué establecía la ley para los robos.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el caso de Eliseo no era simple para el juez?",
        options: [
          "Porque Eliseo era su amigo",
          "Porque aplicar la ley castigaba a un padre que robó por desesperación para salvar a sus hijos",
          "Porque no había pruebas",
          "Porque el pan no valía mucho",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Dedúcelo: el juez tenía dos caminos y ambos tenían un problema. ¿Cuáles eran?",
          "Relee el tercer párrafo: dice qué pasaba si aplicaba la ley y qué pasaba si la ignoraba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el juez se multó también a sí mismo y al pueblo?",
        options: [
          "Porque se había equivocado de ley",
          "Porque consideraba que permitir que un padre robara por hambre era también culpa del pueblo",
          "Porque quería quedar bien",
          "Porque no tenía dinero",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: ¿a quién más responsabilizó además de a Eliseo?",
          "Relee el cuarto párrafo: ¿de qué acusó al pueblo y a sí mismo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El juez aplicó la ley, pero también miró por qué Eliseo había robado. ¿Crees que la justicia debe tener en cuenta las causas de un delito? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en si la justicia debe mirar el contexto y lo sustentaste. ¿Dónde estaría el límite entre entender una causa y dejar pasar todo?",
          "Muy bien defendido. No hay una sola respuesta. ¿Sería justo tratar igual a quien roba por hambre que a quien roba por avaricia?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Algunos dirían que «la ley es la ley» y debe aplicarse igual a todos, sin excepciones. ¿Estás de acuerdo o no? Explica tus razones.",
        replies: [
          "Qué reflexión tan madura. Tomaste postura sobre aplicar la ley por igual y la argumentaste. ¿Qué se gana y qué se pierde con esa idea?",
          "Muy bien sustentado. No hay respuesta única. ¿Puede una ley ser justa para todos los casos por igual?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué crees que significa que «la justicia no es solo aplicar la ley»?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Qué más, además de la ley, debería tener en cuenta quien juzga?",
          "Muy bien. No hay respuesta única. ¿Para qué crees que sirven las leyes, en el fondo?",
        ],
      },
    ],
  },

  {
    id: "memoria",
    title: "El pueblo que olvidaba",
    topic: "Historia",
    emoji: "🧠",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Existía un pueblo extraño donde, cada cien años, una niebla espesa borraba la memoria de todos sus habitantes. Al despertar, nadie recordaba lo vivido: ni los nombres, ni las historias, ni los errores del pasado.",
      "Al principio, los habitantes lo veían como una bendición. «Empezamos de cero, sin rencores ni viejas peleas», decían. Cada siglo, el pueblo nacía limpio, sin culpas que cargar ni cuentas pendientes.",
      "Pero había un problema invisible. Como nadie recordaba los errores anteriores, los repetían una y otra vez. Cada cien años volvían a construir sus casas en la orilla del río que, puntualmente, las inundaba; volvían a confiar en las mismas trampas.",
      "Una anciana, antes de la siguiente niebla, tuvo una idea: empezó a tallar en piedra lo que el pueblo había aprendido. «No para revivir el dolor», escribió, «sino para no tropezar de nuevo donde ya tropezamos antes».",
      "Cuando llegó la niebla y todos olvidaron, esas piedras siguieron ahí. La nueva generación las leyó con curiosidad. Por primera vez, no construyeron junto al río. La memoria escrita los protegió de repetir lo que la mente había borrado.",
      "El pueblo entendió algo difícil: olvidar el pasado no lo hacía más libre, sino más frágil. Recordar, aunque doliera, era lo que les permitía no volver a caer en los mismos pozos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué ocurría en el pueblo cada cien años?",
        options: [
          "Una niebla borraba la memoria de todos los habitantes",
          "El río se secaba por completo",
          "Llegaban viajeros de otras tierras",
          "Se elegía un nuevo rey",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué hacía la niebla cada siglo?",
          "Relee el comienzo: dice qué pasaba con la memoria de la gente.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el pueblo repetía los mismos errores cada cien años?",
        options: [
          "Porque eran tercos",
          "Porque, al olvidar el pasado, no recordaban qué les había salido mal antes",
          "Porque les gustaba el peligro",
          "Porque la anciana se lo ordenaba",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Dedúcelo: si nadie recordaba los errores anteriores, ¿qué pasaba con ellos?",
          "Relee el tercer párrafo: ¿por qué volvían a construir junto al río que se inundaba?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cómo logró la anciana proteger a la nueva generación?",
        options: [
          "Evitando que llegara la niebla",
          "Tallando en piedra lo aprendido, para que lo leyeran aunque hubieran olvidado",
          "Mudando el pueblo lejos del río",
          "Despertando a todos antes de tiempo",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: la mente olvidaba, pero la piedra no. ¿Qué hizo la anciana?",
          "Relee el cuarto y quinto párrafo: ¿qué siguió ahí cuando todos olvidaron?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo creía que olvidar el pasado los hacía libres, pero los hacía frágiles. ¿Crees que es importante recordar los errores del pasado, aunque duela? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en el valor de la memoria y lo sustentaste. ¿Qué se gana y qué se arriesga al recordar lo que salió mal?",
          "Muy bien defendido. No hay una sola respuesta. ¿Por qué crees que a veces preferimos olvidar lo difícil?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La anciana escribió la historia «no para revivir el dolor, sino para no tropezar de nuevo». ¿Crees que esa es una buena razón para recordar lo malo? Explica tus razones.",
        replies: [
          "Qué reflexión tan profunda. Distinguiste entre recordar para sufrir y recordar para aprender, y lo argumentaste. ¿Cómo se recuerda sin quedarse atrapado en el dolor?",
          "Muy bien sustentado. No hay respuesta única. ¿Para qué crees que sirve estudiar la historia en la escuela?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué crees que «olvidar el pasado» podría hacer a alguien más frágil en lugar de más libre?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Recuerdas algún error del que aprendiste justamente por no olvidarlo?",
          "Muy bien. No hay respuesta única. ¿Qué pasaría si una persona olvidara cada error que comete?",
        ],
      },
    ],
  },

  {
    id: "bosque",
    title: "El último árbol",
    topic: "Medio ambiente",
    emoji: "🌲",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "En una aldea rodeada de un gran bosque, la madera era de todos y gratis. Cualquiera podía cortar los árboles que quisiera para construir, calentarse o vender. Durante años, el bosque pareció infinito y nadie pensó en cuidarlo.",
      "Pero cada familia razonaba igual: «Si yo no corto este árbol, otro lo hará. Mejor lo aprovecho yo». Así, todos cortaban lo más rápido posible, temiendo que los demás se quedaran con todo antes que ellos.",
      "El bosque, que parecía inagotable, empezó a desaparecer. Lo que era de todos terminó siendo cuidado por nadie. Cada cual buscaba su beneficio inmediato, y entre todos estaban destruyendo aquello de lo que todos dependían.",
      "Cuando quedaba un solo árbol en pie, una mujer mayor reunió a la aldea. «Si cortamos este, no habrá semillas para un nuevo bosque, y nos quedaremos sin madera para siempre. El problema no fue cortar, sino cortar sin pensar en mañana ni en los demás».",
      "La aldea acordó reglas por primera vez: cuántos árboles podía cortar cada familia y cuántos había que sembrar por cada uno talado. Lo que nadie cuidaba cuando era «de todos», empezaron a protegerlo cuando se hicieron responsables juntos.",
      "Años después, el bosque había vuelto. La aldea aprendió que lo que pertenece a todos solo sobrevive si todos aceptan cuidarlo, aunque eso signifique renunciar a tomar hoy todo lo que se podría.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "Al principio, ¿quién podía cortar los árboles del bosque?",
        options: [
          "Solo el jefe de la aldea",
          "Cualquiera, porque la madera era de todos y gratis",
          "Únicamente los leñadores",
          "Nadie, estaba prohibido",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿De quién era la madera y qué costaba?",
          "Relee el comienzo: dice quién podía cortar y bajo qué condiciones.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué todos cortaban lo más rápido posible?",
        options: [
          "Porque tenían frío",
          "Porque cada uno temía que, si no cortaba, otro se quedaría con todo antes",
          "Porque la mujer mayor lo ordenó",
          "Porque querían sembrar más",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué se decía a sí misma cada familia?",
          "Relee el segundo párrafo: ¿qué temían que hicieran los demás?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué «lo que era de todos terminó siendo cuidado por nadie»?",
        options: [
          "Porque la aldea era muy pequeña",
          "Porque cada uno buscaba su beneficio inmediato y nadie se sentía responsable del bosque",
          "Porque el bosque era realmente infinito",
          "Porque un incendio lo destruyó",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une las pistas: si todos aprovechan pero nadie cuida, ¿qué pasa?",
          "Relee el tercer párrafo: ¿qué buscaba cada cual, y qué le pasaba a lo que todos compartían?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La aldea descubrió que lo que es de todos solo sobrevive si todos aceptan cuidarlo. ¿Crees que tenemos responsabilidad sobre lo que compartimos con los demás? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en la responsabilidad sobre lo común y lo sustentaste. ¿Qué cosas «de todos» conoces que haya que cuidar entre todos?",
          "Muy bien defendido. No hay una sola respuesta. ¿Por qué crees que cuesta más cuidar lo que es de todos que lo que es de uno solo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Cada familia pensaba «si yo no lo tomo, otro lo hará». ¿Crees que esa forma de pensar es razonable o peligrosa? Explica tus razones.",
        replies: [
          "Qué reflexión tan madura. Analizaste esa forma de pensar y la argumentaste. ¿A dónde lleva si todos piensan igual?",
          "Muy bien sustentado. No hay respuesta única. ¿Cómo se podría romper ese círculo en el que todos toman por miedo a quedarse sin nada?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué a veces, para cuidar algo a largo plazo, hay que renunciar a aprovecharlo todo hoy?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Se te ocurre algo que convenga no gastar todo de una vez?",
          "Muy bien. No hay respuesta única. ¿Qué relación tiene esto con cuidar el planeta hoy en día?",
        ],
      },
    ],
  },

  {
    id: "tiempo",
    title: "El vendedor de tiempo",
    topic: "Filosofía",
    emoji: "⏳",
    minutes: 7,
    difficulty: "Difícil",
    color: "grape",
    paragraphs: [
      "Llegó al pueblo un vendedor con una propuesta increíble: por una moneda, podía darte una hora más de vida; por muchas monedas, años enteros. Todos quisieron comprar, ansiosos por vivir más. El vendedor se hizo rico en pocos días.",
      "Un hombre llamado Tobías compró diez años de golpe. Pero notó algo raro: esos años no se sumaban al final de su vida, sino que pasaban de inmediato, vacíos, sin que él viviera nada en ellos. Compraba tiempo, pero no lo vivía.",
      "Tobías volvió enojado a reclamar. El vendedor le respondió con calma: «Yo te vendí tiempo, y tiempo te di. Nunca prometí llenarlo. El tiempo sin nada dentro no vale más que el agua de un río que pasa sin que nadie la beba».",
      "Entonces Tobías comprendió la trampa. Había estado tan ocupado comprando más horas que no se había detenido a vivir las que ya tenía. Tiraba el dinero por tener más tiempo, mientras desperdiciaba el que pasaba frente a sus ojos.",
      "Dejó de comprar. Volvió a casa, abrazó a su familia, plantó un árbol, escuchó a sus amigos. No tenía más horas que antes, pero ahora cada una estaba llena. Por primera vez, sentía que de verdad vivía.",
      "El vendedor, al ver que ya nadie le compraba, se marchó del pueblo. Había descubierto que la gente, tarde o temprano, entendía la verdad más simple y más difícil: no importa cuánto tiempo tengamos, sino qué hacemos con él.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué vendía el forastero que llegó al pueblo?",
        options: [
          "Monedas de oro",
          "Tiempo de vida a cambio de monedas",
          "Árboles mágicos",
          "Mapas del futuro",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué ofrecía a cambio de monedas?",
          "Relee el comienzo: dice qué daba por una moneda y qué por muchas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los años que compró Tobías no le sirvieron de nada?",
        options: [
          "Porque eran falsos",
          "Porque pasaban vacíos, sin que él viviera nada en ellos",
          "Porque el vendedor lo engañó con monedas falsas",
          "Porque se los robaron",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: compró tiempo, pero ¿qué le faltaba a ese tiempo?",
          "Relee el segundo párrafo: ¿qué notó de raro en esos años?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiso decir el vendedor con que «el tiempo sin nada dentro no vale más que el agua de un río que pasa sin que nadie la beba»?",
        options: [
          "Que el agua es muy valiosa",
          "Que tener tiempo no sirve de nada si no se vive ni se aprovecha",
          "Que hay que beber más agua",
          "Que los ríos son peligrosos",
        ],
        correct: 1,
        evidence: 2,
        hints: [
          "Une la comparación: agua que pasa sin que nadie la beba es agua desperdiciada. ¿Y el tiempo?",
          "Relee el tercer párrafo: el vendedor dio tiempo, pero ¿qué dijo que nunca prometió?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Tobías aprendió que importa más qué hacemos con el tiempo que cuánto tiempo tenemos. ¿Estás de acuerdo? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en qué hace valioso al tiempo y lo sustentaste. ¿Qué cosas, para ti, hacen que una hora «valga la pena»?",
          "Muy bien defendido. No hay una sola respuesta. ¿Preferirías una vida larga vacía o una más corta pero llena? ¿Por qué?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La gente compraba horas con afán mientras desperdiciaba las que ya tenía. ¿Crees que a veces buscamos tanto «más» que olvidamos disfrutar lo que ya tenemos? Explica tus razones.",
        replies: [
          "Qué reflexión tan madura. Pensaste en el afán por tener más y lo argumentaste. ¿Te ha pasado querer algo más y olvidar disfrutar lo de ahora?",
          "Muy bien sustentado. No hay respuesta única. ¿Qué crees que nos hace pensar que siempre nos falta algo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué significa para ti «llenar» el tiempo en lugar de solo «tener» tiempo?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Qué harías tú con una hora para que de verdad valiera?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que la gente del cuento tardó en entender algo tan sencillo?",
        ],
      },
    ],
  },

  {
    id: "actor",
    title: "El actor y su papel",
    topic: "Identidad",
    emoji: "🎭",
    minutes: 7,
    difficulty: "Difícil",
    color: "honey",
    paragraphs: [
      "Lucio era un actor tan talentoso que, en el escenario, podía convertirse en cualquier personaje. Una noche era un rey cruel; otra, un héroe valiente; otra, un anciano sabio. El público lo amaba y nadie actuaba como él.",
      "Pero Lucio tenía un problema secreto. De tanto interpretar a otros, había empezado a no saber quién era él fuera del teatro. Cuando le preguntaban qué pensaba o qué quería de verdad, respondía con frases de sus personajes, no con las suyas.",
      "Un día, una directora le ofreció el papel más difícil de su carrera: interpretarse a sí mismo, sin guion, contando su propia historia. Lucio, que jamás había temido a un escenario, sintió pánico. No sabía cómo era él sin un papel que representar.",
      "Pasó semanas perdido. Se daba cuenta de que durante años había usado a sus personajes como máscaras para esconderse, incluso de sí mismo. Era más fácil ser un rey o un héroe inventado que enfrentar quién era Lucio de verdad.",
      "Poco a poco, fue recordando: lo que lo hacía reír, lo que le dolía, lo que soñaba de niño. La noche del estreno, salió al escenario sin disfraz y habló como él mismo. Temblaba, pero por primera vez no estaba fingiendo.",
      "Fue la actuación más aplaudida de su vida, aunque no actuó nada. Lucio entendió que puede ser fascinante convertirse en otros, pero que nunca hay que perder de vista quién es uno cuando se quitan todas las máscaras.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía a Lucio tan admirado en el teatro?",
        options: [
          "Que cantaba muy bien",
          "Que en el escenario podía convertirse en cualquier personaje",
          "Que escribía sus propias obras",
          "Que dirigía a otros actores",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué podía hacer Lucio en el escenario?",
          "Relee el comienzo: dice por qué el público lo amaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cuál era el problema secreto de Lucio?",
        options: [
          "Que se le olvidaban los guiones",
          "Que de tanto ser otros, ya no sabía quién era él mismo",
          "Que no le gustaba el teatro",
          "Que tenía miedo al público",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿qué le pasaba cuando le preguntaban qué pensaba de verdad?",
          "Relee el segundo párrafo: ¿con qué respondía, con sus ideas o con las de sus personajes?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el papel de «interpretarse a sí mismo» le dio pánico?",
        options: [
          "Porque el escenario era muy grande",
          "Porque había usado a sus personajes como máscaras y ya no sabía cómo era sin ellas",
          "Porque la directora le caía mal",
          "Porque no le pagaban bien",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: nunca temía actuar, pero esto sí. ¿Qué tenía de distinto?",
          "Relee el tercer y cuarto párrafo: ¿para qué había usado a sus personajes durante años?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lucio usaba sus personajes como máscaras para esconderse de sí mismo. ¿Crees que a veces las personas se esconden detrás de un papel o una imagen? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en cómo nos escondemos a veces y lo sustentaste. ¿Por qué crees que puede dar miedo mostrarse como uno es?",
          "Muy bien defendido. No hay una sola respuesta. ¿Qué diferencia hay entre adaptarse a una situación y esconder quién eres?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La actuación más aplaudida de Lucio fue cuando no actuó nada, solo fue él mismo. ¿Crees que mostrarse auténtico tiene más valor que aparentar? Explica tus razones.",
        replies: [
          "Qué reflexión tan profunda. Comparaste ser auténtico con aparentar y lo argumentaste. ¿Cuándo te has sentido más tú mismo?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que cuesta tanto, a veces, simplemente ser uno mismo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué crees que significa «no perder de vista quién es uno cuando se quitan todas las máscaras»?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Qué cosas crees que forman parte de quién eres de verdad?",
          "Muy bien. No hay respuesta única. ¿Cómo crees que alguien puede recordar quién es cuando se siente perdido?",
        ],
      },
    ],
  },

  {
    id: "frontera",
    title: "La frontera invisible",
    topic: "Sociedad",
    emoji: "🌍",
    minutes: 7,
    difficulty: "Difícil",
    color: "coral",
    paragraphs: [
      "Una familia llegó a vivir a un pueblo nuevo. Venían de muy lejos, hablaban con otro acento, cocinaban comidas con olores distintos y celebraban fiestas que nadie en el pueblo conocía. Desde el primer día, sintieron una frontera invisible que los separaba de los demás.",
      "Los vecinos no eran crueles, pero mantenían la distancia. «No son de aquí», decían, como si eso lo explicara todo. Los niños del pueblo no invitaban a jugar a la niña recién llegada, y ella comía sola en los recreos.",
      "Un día, el pueblo organizó su feria anual de comida. Cada familia llevaba un plato típico. La familia nueva, dudando, llevó una receta de su tierra. Al principio nadie se acercaba a su mesa, hasta que un niño curioso probó un bocado.",
      "El sabor le encantó y llamó a sus amigos. Pronto, la mesa de la familia «de afuera» era la más visitada de la feria. La gente hacía preguntas, pedía la receta, quería saber de dónde venían esos sabores nuevos.",
      "Esa feria no borró todas las diferencias, pero abrió una grieta en la frontera invisible. La gente descubrió que lo «distinto» no era una amenaza, sino algo que podía enriquecer al pueblo entero. La niña, por fin, dejó de comer sola.",
      "Con el tiempo, las fiestas de la familia nueva se volvieron fiestas de todos. El pueblo entendió que una comunidad no se empobrece al recibir lo diferente: se hace más grande.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía diferente a la familia recién llegada?",
        options: [
          "Hablaban con otro acento y tenían costumbres y comidas distintas",
          "Eran mucho más ricos",
          "No querían hablar con nadie",
          "Habían vivido siempre en el pueblo",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está en el primer párrafo. ¿Qué cosas los distinguían del resto?",
          "Relee el comienzo: menciona su acento, sus comidas y sus fiestas.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué la niña recién llegada comía sola en los recreos?",
        options: [
          "Porque prefería estar sola",
          "Porque los demás niños la mantenían a distancia por venir de afuera",
          "Porque no le gustaba la comida del pueblo",
          "Porque llegaba tarde a clase",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Dedúcelo: ¿cómo trataban los vecinos a la familia nueva?",
          "Relee el segundo párrafo: si no la invitaban a jugar, ¿por qué crees que pasaba?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué hizo que la frontera invisible empezara a romperse?",
        options: [
          "Que la familia se mudó de nuevo",
          "Que en la feria los vecinos probaron y valoraron lo que la familia tenía para ofrecer",
          "Que el pueblo los obligó a cambiar",
          "Que dejaron de cocinar sus comidas",
        ],
        correct: 1,
        evidence: 3,
        hints: [
          "Une las pistas: ¿qué pasó en la feria con la mesa de la familia nueva?",
          "Relee el tercer y cuarto párrafo: ¿qué descubrieron los vecinos al acercarse?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los vecinos decían «no son de aquí» como si eso lo explicara todo. ¿Crees que venir de otro lugar debería cambiar cómo tratamos a alguien? Defiende tu postura.",
        replies: [
          "Excelente argumento. Tomaste posición sobre cómo tratamos a los que vienen de fuera y la sustentaste. ¿Qué crees que hay detrás de la frase «no son de aquí»?",
          "Muy bien defendido. No hay una sola respuesta. ¿Cómo te gustaría que te trataran si llegaras a un lugar totalmente nuevo?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El pueblo descubrió que lo «distinto» no era una amenaza, sino algo que lo enriquecía. ¿Estás de acuerdo con esa idea? Explica tus razones.",
        replies: [
          "Qué reflexión tan madura. Pensaste en si lo diferente empobrece o enriquece y lo argumentaste. ¿Qué cosa valiosa has aprendido de alguien distinto a ti?",
          "Muy bien sustentado. No hay respuesta única. ¿Por qué crees que a veces lo diferente da miedo en lugar de curiosidad?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿qué crees que es una «frontera invisible» entre las personas, y cómo se podría cruzar?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Has sentido alguna vez una frontera invisible con alguien? ¿Qué la causó?",
          "Muy bien. No hay respuesta única. ¿Qué pequeño gesto crees que puede empezar a romper esas fronteras?",
        ],
      },
    ],
  },

  {
    id: "cientifica",
    title: "La científica que se equivocó",
    topic: "Ciencia",
    emoji: "🔬",
    minutes: 7,
    difficulty: "Difícil",
    color: "teal",
    paragraphs: [
      "La doctora Vega era una científica famosa. Durante años había defendido una teoría suya sobre cómo se curaba cierta enfermedad, y medio mundo la admiraba por ella. Su nombre y su orgullo estaban unidos a esa idea.",
      "Una estudiante joven de su laboratorio hizo un experimento muy cuidadoso y obtuvo un resultado incómodo: los datos mostraban que la teoría de la doctora Vega estaba equivocada. La estudiante, temblando, le mostró los números.",
      "La doctora tenía dos caminos. Podía esconder esos resultados para proteger su fama, como muchos habrían hecho, o podía aceptarlos públicamente y admitir que se había equivocado durante años. Ninguna opción era fácil.",
      "Pasó una noche sin dormir. Sabía que reconocer el error dañaría su prestigio, pero también sabía que ocultar la verdad podía hacer que la gente siguiera curándose mal. Al amanecer, había decidido: la verdad importaba más que su orgullo.",
      "Publicó los nuevos resultados, dio crédito a la estudiante y declaró: «Me equivoqué, y corregirlo es parte de hacer ciencia». Algunos la criticaron, pero muchos otros la respetaron aún más que antes: no por haber tenido razón, sino por su honestidad.",
      "Gracias a esa decisión, la enfermedad empezó a tratarse de forma correcta. La doctora Vega entendió que un verdadero científico no es el que nunca se equivoca, sino el que es capaz de corregirse cuando los hechos lo demuestran.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué descubrió el experimento de la estudiante joven?",
        options: [
          "Que la doctora Vega era un fraude",
          "Que los datos mostraban que la teoría de la doctora estaba equivocada",
          "Que la enfermedad no existía",
          "Que el laboratorio estaba en peligro",
        ],
        correct: 1,
        evidence: 1,
        hints: [
          "Está en el segundo párrafo. ¿Qué mostraban los datos del experimento?",
          "Relee cuando la estudiante le muestra los números: dice qué revelaban.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué para la doctora era tan difícil aceptar el resultado?",
        options: [
          "Porque no entendía los datos",
          "Porque su fama y su orgullo estaban unidos a la teoría equivocada",
          "Porque odiaba a la estudiante",
          "Porque el experimento estaba mal hecho",
        ],
        correct: 1,
        evidence: 0,
        hints: [
          "Dedúcelo: ¿qué tenía que ver la teoría con la imagen de la doctora?",
          "Relee el primer y tercer párrafo: ¿qué arriesgaba al admitir el error?",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué muchos respetaron a la doctora aún más después de admitir su error?",
        options: [
          "Porque siguió teniendo razón",
          "Porque valoraron su honestidad por encima de su orgullo",
          "Porque despidió a la estudiante",
          "Porque se hizo más famosa",
        ],
        correct: 1,
        evidence: 4,
        hints: [
          "Une las pistas: no la respetaron por acertar, sino por algo más. ¿Qué?",
          "Relee el quinto párrafo: ¿qué admiraron de ella, más allá de tener razón?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La doctora eligió la verdad aunque dañara su prestigio. ¿Crees que hizo lo correcto? Defiende tu postura.",
        replies: [
          "Excelente argumento. Pensaste en el conflicto entre la verdad y el orgullo, y lo sustentaste. ¿Qué crees que habría pasado si ocultaba los resultados?",
          "Muy bien defendido. No hay una sola respuesta. ¿Es siempre fácil reconocer un error? ¿Qué lo hace tan difícil?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que un verdadero científico no es el que nunca se equivoca, sino el que sabe corregirse. ¿Estás de acuerdo? Explica tus razones.",
        replies: [
          "Qué reflexión tan madura. Pensaste en qué hace valioso a quien busca la verdad y lo argumentaste. ¿Por qué crees que equivocarse es parte de aprender?",
          "Muy bien sustentado. No hay respuesta única. ¿Conoces algún avance que haya surgido de corregir un error?",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Con tus palabras: ¿por qué crees que admitir un error puede hacer que confiemos más en alguien, en lugar de menos?",
        replies: [
          "Muy buena explicación con tus propias palabras. ¿Confías más en alguien que admite cuando se equivoca o en quien nunca lo reconoce?",
          "Muy bien. No hay respuesta única. ¿Qué pasa con la confianza cuando descubrimos que alguien escondió un error?",
        ],
      },
    ],
  },

  {
    id: "tucan",
    title: "El tucán presumido",
    topic: "Animales",
    emoji: "🦜",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En lo alto de la selva vivía un tucán llamado Beto, con un pico enorme de muchos colores. Beto pasaba el día mostrándoselo a todos y se creía el ave más importante del bosque.",
      "Un día, una tormenta tumbó el nido de unos pájaros pequeños y sus frutas rodaron lejos, entre las ramas más altas y delgadas. Ningún ave lograba alcanzarlas sin caerse.",
      "Beto se dio cuenta de que su pico largo podía llegar hasta donde nadie más llegaba. Poco a poco, fue recogiendo las frutas y devolviéndolas a los pajaritos hambrientos.",
      "Esa tarde, los demás no lo felicitaron por sus colores, sino por su ayuda. Beto entendió que su pico no lo hacía especial por ser bonito, sino por lo que podía hacer con él por los demás.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo era el pico de Beto?",
        options: [
          "Enorme y de muchos colores",
          "Pequeño y gris",
          "Corto y curvo",
          "Blanco y liso",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Eso está escrito al comienzo. ¿Cómo se describe el pico de Beto?",
          "Relee el primer párrafo: dice cómo era su pico.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Beto pudo ayudar cuando los demás no podían?",
        options: [
          "Porque su pico largo llegaba donde nadie más llegaba",
          "Porque volaba más rápido que todos",
          "Porque las frutas eran suyas",
          "Porque los otros no quisieron ayudar",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "El cuento no lo dice con esas palabras: dedúcelo. ¿Qué tenía Beto que los demás no?",
          "Relee el tercer párrafo: dice hasta dónde llegaba su pico.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al final, los demás felicitaron a Beto por ayudar y no por ser bonito. ¿Qué crees que vale más: cómo se ve alguien o lo que hace? Cuéntame por qué.",
        replies: [
          "Qué buena forma de pensarlo. Comparaste el verse bien con el hacer el bien y lo defendiste. ¿A ti qué te hace admirar a alguien?",
          "Muy bien razonado. No hay una sola respuesta. ¿Crees que Beto era feliz solo mostrando su pico?",
        ],
      },
    ],
  },

  {
    id: "caballitomar",
    title: "El caballito de mar valiente",
    topic: "Mar",
    emoji: "🐴",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "En un arrecife de colores vivía un caballito de mar llamado Coral. Era tan pequeño que las olas lo empujaban de un lado a otro, y a veces se sentía el más débil de todo el mar.",
      "Una mañana, una corriente fuerte arrastró a un pececito bebé hacia mar abierto, lejos de su familia. Los peces grandes miraban, pero ninguno se atrevía a entrar en la corriente.",
      "Coral se agarró con su cola a un alga larga y estiró su cuerpo todo lo que pudo. Con mucho esfuerzo, alcanzó al pececito y lo sostuvo hasta que la corriente se calmó.",
      "Los peces grandes se acercaron sorprendidos. Coral, tan pequeño, había hecho lo que ellos no. Ese día aprendió que ser valiente no depende del tamaño, sino de las ganas de ayudar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Coral se sentía a veces el más débil del mar?",
        options: [
          "Porque era tan pequeño que las olas lo empujaban",
          "Porque no sabía nadar",
          "Porque vivía solo",
          "Porque los peces se burlaban de él",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le pasaba a Coral con las olas por ser pequeño?",
          "Relee el primer párrafo: dice por qué se sentía débil.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué los peces grandes se quedaron sorprendidos al final?",
        options: [
          "Porque el más pequeño hizo lo que ellos no se atrevieron a hacer",
          "Porque Coral se perdió",
          "Porque la corriente volvió",
          "Porque el pececito era muy grande",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿quién salvó al pececito y quiénes solo miraban?",
          "Relee el último párrafo: compara lo que hizo Coral con lo que hicieron ellos.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que ser valiente no depende del tamaño. ¿Estás de acuerdo? Explícalo con tus palabras.",
        replies: [
          "Me encanta cómo lo pensaste. Reflexionaste sobre qué hace valiente a alguien y lo justificaste. ¿Recuerdas alguna vez en que fuiste valiente aunque sentías miedo?",
          "Muy buena reflexión. No hay respuesta única. ¿Crees que alguien pequeño puede ser tan valiente como alguien grande?",
        ],
      },
    ],
  },

  {
    id: "cangrejo",
    title: "El cangrejo que caminaba de lado",
    topic: "Mar",
    emoji: "🦀",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "En la orilla del mar vivía un cangrejo llamado Pinza, que caminaba de lado como todos los cangrejos. Los demás animales de la playa se reían de su forma tan chistosa de andar.",
      "Pinza se sentía triste y trataba de caminar hacia adelante como los pájaros y los perros, pero siempre terminaba tropezando y cayéndose de espaldas.",
      "Un día, una gaviota bajó en picada buscando comida. Caminando de lado, Pinza se escabulló rapidísimo entre las rocas y se escondió antes de que la gaviota lo atrapara.",
      "Los otros animales, que no podían meterse en esos huecos tan estrechos, lo miraron con nuevos ojos. Pinza entendió que su manera distinta de caminar no era un defecto, sino algo que solo él sabía hacer bien.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué se reían de Pinza los animales de la playa?",
        options: [
          "Por su forma de caminar de lado",
          "Por su color",
          "Porque era muy grande",
          "Porque no sabía nadar",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué les parecía chistoso a los demás de Pinza?",
          "Relee el primer párrafo: dice de qué se reían.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Pinza pudo escapar de la gaviota?",
        options: [
          "Porque caminando de lado se metió entre las rocas estrechas",
          "Porque voló lejos",
          "Porque la gaviota no tenía hambre",
          "Porque los otros animales lo escondieron",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué le permitió esconderse tan rápido?",
          "Relee el tercer párrafo: dice cómo se escabulló entre las rocas.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Pinza descubrió que ser diferente podía ser una ventaja. ¿Crees que está bien ser distinto a los demás? Cuéntame por qué.",
        replies: [
          "Qué linda manera de verlo. Pensaste en lo bueno de ser distinto y lo explicaste. ¿Qué cosa tuya te hace único?",
          "Muy bien. No hay una sola respuesta. ¿Te imaginas qué aburrido sería si todos fuéramos iguales?",
        ],
      },
    ],
  },

  {
    id: "luciernaga",
    title: "La luciérnaga sin luz",
    topic: "Naturaleza",
    emoji: "✨",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Nina era una luciérnaga que una noche descubrió que su lucecita no brillaba como la de sus hermanas. Por más que lo intentaba, su cuerpo se quedaba oscuro.",
      "Mientras las demás luciérnagas jugaban a iluminar el prado, Nina se quedaba a un lado, sintiéndose inútil y muy sola en la oscuridad.",
      "Esa noche, un grupo de luciérnagas se perdió entre unos arbustos espinosos y no encontraba la salida. Sus luces se reflejaban en todas partes y las confundían aún más.",
      "Nina, que no brillaba, era la única que podía ver bien en la oscuridad. Guio a sus hermanas paso a paso hasta el prado. Esa noche entendió que hasta lo que parecía un defecto podía servir para ayudar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué descubrió Nina una noche sobre su lucecita?",
        options: [
          "Que no brillaba como la de sus hermanas",
          "Que brillaba de colores",
          "Que se apagaba de día",
          "Que era la más brillante de todas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le pasaba a la luz de Nina?",
          "Relee el primer párrafo: dice cómo era su lucecita.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Nina pudo guiar a sus hermanas y ellas no podían salir solas?",
        options: [
          "Porque, al no brillar, podía ver bien en la oscuridad",
          "Porque conocía el camino de memoria",
          "Porque brillaba más que todas",
          "Porque las llamó a gritos",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué confundía a las demás y a Nina no?",
          "Relee el último párrafo: dice por qué Nina veía bien en lo oscuro.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Al final, lo que Nina creía un defecto la ayudó a salvar a las demás. ¿Crees que algo que parece malo puede volverse bueno? Explica por qué.",
        replies: [
          "Qué reflexión tan bonita. Pensaste en cómo algo malo puede volverse útil y lo argumentaste. ¿Se te ocurre un ejemplo de tu vida?",
          "Muy buena idea. No hay respuesta única. ¿Por qué crees que Nina dejó de sentirse inútil?",
        ],
      },
    ],
  },

  {
    id: "panda",
    title: "El panda que aprendió a compartir",
    topic: "Animales",
    emoji: "🐼",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "En un bosque de bambú vivía un panda llamado Bao, al que le encantaba comer más que nada en el mundo. Siempre guardaba los mejores tallos de bambú solo para él.",
      "Un verano muy seco, el bambú empezó a escasear. Los otros pandas casi no tenían qué comer, pero Bao seguía guardando una gran pila solo para sí mismo.",
      "Una tarde, Bao vio a un panda bebé que lloraba de hambre junto a su mamá. Sintió algo raro en el pecho y, sin pensarlo mucho, le llevó unos tallos de su pila.",
      "El bebé sonrió y su mamá le dio las gracias. Poco a poco, Bao fue compartiendo con todos. Descubrió que la comida sabía mejor cuando la disfrutaba acompañado que cuando comía solo.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué guardaba Bao solo para él?",
        options: [
          "Los mejores tallos de bambú",
          "Frutas del bosque",
          "Agua del río",
          "Hojas secas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué guardaba Bao solo para sí?",
          "Relee el primer párrafo: dice qué apilaba solo para él.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Bao empezó a compartir su bambú?",
        options: [
          "Porque le dio pena ver al panda bebé llorar de hambre",
          "Porque ya no le gustaba el bambú",
          "Porque su mamá lo obligó",
          "Porque tenía demasiado y le sobraba",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué sintió Bao al ver al bebé?",
          "Relee el tercer párrafo: dice qué pasó cuando vio al panda bebé.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Bao descubrió que compartir lo hacía sentir bien. ¿Crees que compartir vale la pena aunque nos quedemos con menos? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en qué se gana al compartir y lo defendiste. ¿A ti cómo te hace sentir compartir algo tuyo?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que la comida le supo mejor acompañado?",
        ],
      },
    ],
  },

  {
    id: "koala",
    title: "El koala dormilón",
    topic: "Animales",
    emoji: "🐨",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Kiko era un koala que dormía casi todo el día abrazado a su árbol favorito. Le gustaba tanto descansar que casi nunca veía lo que pasaba en el bosque.",
      "Sus amigos siempre le contaban cosas increíbles: un arroyo nuevo, flores gigantes, un nido lleno de pájaros de colores. Pero Kiko se lo perdía todo por estar dormido.",
      "Una mañana, Kiko decidió despertarse temprano para ver el amanecer. El cielo se pintó de naranja y rosa, y los pájaros cantaron todos juntos. Nunca había visto algo tan hermoso.",
      "Desde entonces, Kiko siguió durmiendo lo que necesitaba, pero también se despertaba a tiempo para no perderse las cosas lindas. Aprendió que descansar está bien, pero que la vida también hay que vivirla despierto.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hacía Kiko casi todo el día?",
        options: [
          "Dormía abrazado a su árbol",
          "Nadaba en el arroyo",
          "Buscaba flores",
          "Cantaba con los pájaros",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué hacía Kiko la mayor parte del día?",
          "Relee el primer párrafo: dice qué le gustaba hacer.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Kiko se perdía las cosas increíbles del bosque?",
        options: [
          "Porque estaba dormido cuando ocurrían",
          "Porque vivía muy lejos",
          "Porque no le interesaban",
          "Porque nadie le contaba nada",
        ],
        correct: 0,
        evidence: 1,
        hints: [
          "Dedúcelo: si sus amigos las veían y él no, ¿qué estaba haciendo Kiko?",
          "Relee el segundo párrafo: dice por qué se lo perdía todo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Kiko aprendió a equilibrar el descanso con vivir despierto. ¿Crees que descansar demasiado nos puede hacer perder cosas importantes? Explica por qué.",
        replies: [
          "Buena reflexión. Pensaste en el equilibrio entre descansar y vivir, y lo argumentaste. ¿Qué cosa no te querrías perder por estar dormido?",
          "Muy bien. No hay respuesta única. ¿Crees que Kiko fue feliz al ver el amanecer?",
        ],
      },
    ],
  },

  {
    id: "gotita",
    title: "La gotita viajera",
    topic: "Ciencia",
    emoji: "💧",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Gota era una gotita de agua que vivía en el mar. Un día, el sol calentó tanto que Gota se volvió muy ligera y subió flotando por el aire hasta convertirse en parte de una nube.",
      "Desde allá arriba, Gota viajó sobre montañas y ciudades. La nube creció y creció, hasta que se puso gris y pesada, cargada de muchas gotitas como ella.",
      "Entonces empezó a llover. Gota cayó sobre un campo seco y se metió en la tierra, donde una semilla la estaba esperando para poder crecer.",
      "Gracias a Gota y a muchas otras gotitas, la semilla se convirtió en una planta verde. Y un día, con el calor del sol, Gota volvería a subir al cielo para empezar su viaje otra vez.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué hizo que Gota subiera flotando por el aire?",
        options: [
          "El calor del sol la volvió muy ligera",
          "El viento la empujó",
          "Un pájaro la llevó",
          "Una ola la lanzó",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué pasó cuando el sol calentó mucho?",
          "Relee el primer párrafo: dice por qué Gota subió al aire.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el cuento dice que Gota volvería a empezar su viaje otra vez?",
        options: [
          "Porque el agua repite el mismo ciclo una y otra vez",
          "Porque se perdió en el camino",
          "Porque le gustaba viajar sola",
          "Porque la nube la llamó",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: piensa en cómo empezó el viaje y cómo termina.",
          "Relee el último párrafo: dice qué haría Gota con el calor del sol de nuevo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El agua hace el mismo viaje muchas veces sin desperdiciarse. ¿Crees que es importante cuidar el agua? Cuéntame por qué.",
        replies: [
          "Qué buena reflexión. Pensaste en el valor del agua y lo defendiste. ¿De qué maneras crees que podemos cuidarla?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que pasaría si se acabara el agua de un lugar?",
        ],
      },
    ],
  },

  {
    id: "bellota",
    title: "La bellota y el gran roble",
    topic: "Naturaleza",
    emoji: "🌰",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "En lo alto de un roble enorme colgaba una pequeña bellota llamada Nota. Cuando miraba hacia abajo, se sentía diminuta e insignificante al lado de aquel árbol gigante.",
      "«Nunca seré importante como el roble», pensaba Nota. «Solo soy una bellota pequeñita que nadie mira». Y se sentía triste cada vez que el viento la mecía.",
      "Un día de otoño, Nota se soltó de la rama y cayó a la tierra húmeda. Al principio tuvo miedo, pero pronto una raíz diminuta empezó a salir de ella y a hundirse en el suelo.",
      "Pasaron los años. Nota creció y creció hasta convertirse en un roble tan grande como el primero. Entonces comprendió que dentro de esa bellota pequeñita siempre había estado escondido un árbol enorme.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo se sentía Nota al mirar hacia el roble gigante?",
        options: [
          "Diminuta e insignificante",
          "Fuerte y valiente",
          "Alegre y curiosa",
          "Enojada y molesta",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Cómo se sentía Nota al lado del árbol grande?",
          "Relee el primer párrafo: dice cómo se veía a sí misma.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué quiere decir que dentro de la bellota siempre había estado escondido un árbol enorme?",
        options: [
          "Que aunque era pequeña, tenía dentro la posibilidad de crecer mucho",
          "Que la bellota era falsa",
          "Que el roble la ayudó a crecer",
          "Que nunca llegó a ser árbol",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: si una bellota tan pequeña llegó a ser un roble, ¿qué llevaba dentro?",
          "Relee el último párrafo: dice en qué se convirtió Nota.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Nota creía que era insignificante, pero llevaba algo grande adentro. ¿Crees que las cosas pequeñas pueden volverse grandes? Explica por qué.",
        replies: [
          "Qué linda reflexión. Pensaste en el valor de lo pequeño y lo argumentaste. ¿Hay algo pequeño que empezaste y creció con el tiempo?",
          "Muy bien. No hay respuesta única. ¿Por qué crees que Nota dejó de sentirse triste?",
        ],
      },
    ],
  },

  {
    id: "florista",
    title: "La florista del mercado",
    topic: "Oficios",
    emoji: "💐",
    minutes: 4,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Doña Rosa tenía un puesto de flores en el mercado. Todas las mañanas armaba ramos hermosos, pero al lado suyo había una niña, Lía, que vendía flores un poco marchitas y a la que casi nadie le compraba.",
      "Lía miraba con envidia el puesto lleno de gente de doña Rosa y no entendía por qué a ella nadie se le acercaba. Al final del día, se iba a casa casi con todas sus flores.",
      "Un día, doña Rosa se acercó a Lía y le dijo: «Tus flores están tristes porque les falta agua fresca cada mañana. Ven, te enseño». Y le mostró cómo cuidarlas para que duraran lindas.",
      "Lía siguió el consejo y, poco a poco, su puesto también se llenó de flores brillantes y de clientes. Aprendió que a veces, en lugar de tener envidia, es mejor acercarse y aprender de quien sabe más.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Cómo eran las flores que vendía Lía al principio?",
        options: [
          "Un poco marchitas",
          "Muy grandes",
          "De plástico",
          "Recién cortadas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Cómo eran las flores de Lía?",
          "Relee el primer párrafo: dice qué vendía y cómo estaban sus flores.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué casi nadie le compraba flores a Lía al principio?",
        options: [
          "Porque sus flores estaban marchitas por falta de cuidado",
          "Porque cobraba muy caro",
          "Porque su puesto estaba escondido",
          "Porque no le gustaban las flores",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué les faltaba a las flores de Lía según doña Rosa?",
          "Relee el tercer párrafo: dice por qué las flores estaban tristes.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lía dejó de tener envidia y prefirió aprender de doña Rosa. ¿Crees que es mejor aprender de alguien que sabe más que envidiarlo? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en qué hacer con la envidia y lo defendiste. ¿A ti de quién te gustaría aprender algo?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que habría pasado si Lía se hubiera quedado solo con envidia?",
        ],
      },
    ],
  },

  {
    id: "patines",
    title: "Los patines nuevos",
    topic: "Juegos",
    emoji: "⛸️",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "A Sofía le regalaron unos patines nuevos y brillantes. Se los puso enseguida, segura de que patinaría genial, pero apenas dio dos pasos se cayó sentada en el suelo.",
      "Lo intentó otra vez, y otra vez, y otra vez se cayó. Sus rodillas empezaban a doler y le dieron ganas de guardar los patines para siempre y no volver a usarlos.",
      "Su hermano mayor le dijo: «Nadie patina bien el primer día. Agárrate de mi mano y da pasitos cortos». Sofía, aunque cansada, decidió intentarlo una vez más.",
      "Con la ayuda de su hermano, dio unos pasos sin caerse, y luego unos más. Al final de la semana ya patinaba sola por el parque. Entendió que las cosas difíciles se logran practicando, sin rendirse.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué pasó cuando Sofía dio sus primeros dos pasos con los patines?",
        options: [
          "Se cayó sentada en el suelo",
          "Patinó rapidísimo",
          "Ganó una carrera",
          "Se le rompió un patín",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le pasó apenas dio dos pasos?",
          "Relee el primer párrafo: dice qué ocurrió al empezar.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al final Sofía logró patinar sola?",
        options: [
          "Porque practicó y no se rindió, con ayuda de su hermano",
          "Porque compró otros patines",
          "Porque el parque era más liso",
          "Porque dejó de intentarlo",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué hizo Sofía toda la semana en lugar de rendirse?",
          "Relee el último párrafo: dice cómo llegó a patinar sola.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Sofía estuvo a punto de rendirse, pero siguió intentando. ¿Crees que vale la pena seguir intentando algo aunque sea difícil? Explica por qué.",
        replies: [
          "Me gusta cómo lo pensaste. Reflexionaste sobre no rendirse y lo defendiste. ¿Recuerdas algo difícil que lograste practicando?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que habría pasado si Sofía guardaba los patines para siempre?",
        ],
      },
    ],
  },

  {
    id: "patineta",
    title: "La patineta prestada",
    topic: "Amistad",
    emoji: "🛹",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "Mateo tenía una patineta que le gustaba muchísimo y jamás dejaba que nadie la tocara. Un día, su amigo Diego le pidió que se la prestara solo un rato, pero Mateo dijo que no.",
      "Diego se fue triste. Esa tarde, Mateo quiso jugar a la pelota, pero se dio cuenta de que había olvidado la suya en casa. El único que tenía una pelota en el parque era Diego.",
      "Mateo se acercó apenado y le preguntó a Diego si podían jugar juntos. Diego, sin enojarse, le dijo: «Claro, para eso están los amigos», y compartió su pelota con él.",
      "Mateo se sintió mal por no haber prestado su patineta antes. Al día siguiente, fue el primero en ofrecérsela a Diego. Aprendió que compartir con los amigos hace que todos la pasen mejor.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le pidió Diego a Mateo al principio?",
        options: [
          "Que le prestara la patineta un rato",
          "Que le regalara la pelota",
          "Que jugaran a las escondidas",
          "Que lo acompañara a casa",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué quería Diego que Mateo le prestara?",
          "Relee el primer párrafo: dice qué le pidió Diego.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Mateo se sintió mal con Diego?",
        options: [
          "Porque Diego compartió su pelota aunque él no le había prestado la patineta",
          "Porque perdió el juego",
          "Porque Diego se enojó con él",
          "Porque rompió la pelota",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: compara lo que hizo Mateo con lo que hizo Diego.",
          "Relee el tercer párrafo: mira cómo respondió Diego a pesar de todo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Diego compartió aunque Mateo no lo había hecho antes. ¿Crees que hay que compartir con los amigos aunque a veces ellos no compartan con nosotros? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en cómo tratar a los amigos y lo defendiste. ¿A ti cómo te sientes cuando alguien comparte contigo?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que aprendió Mateo de Diego?",
        ],
      },
    ],
  },

  {
    id: "receta",
    title: "La receta secreta",
    topic: "Familia",
    emoji: "🍲",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "La abuela de Emma preparaba la sopa más rica del mundo, y todos en la familia querían saber cuál era su ingrediente secreto. Pero la abuela solo sonreía y decía: «Ya lo descubrirás».",
      "Emma decidió ayudar a su abuela a cocinar para averiguarlo. Cortaron verduras, echaron especias y revolvieron la olla durante un buen rato, todo mientras conversaban y reían juntas.",
      "Al probar la sopa, estaba deliciosa, igual que siempre. Emma revisó cada ingrediente, pero no encontró nada raro ni escondido. «¿Cuál es el secreto, abuela?», preguntó por fin.",
      "La abuela la abrazó y le dijo: «El secreto es cocinarla con cariño y en compañía». Emma entendió que a veces lo que hace especial a algo no es un ingrediente, sino el amor que le ponemos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué preparaba la abuela de Emma?",
        options: [
          "La sopa más rica del mundo",
          "Un pastel de chocolate",
          "Pan recién horneado",
          "Jugo de frutas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué cocinaba tan rico la abuela?",
          "Relee el primer párrafo: dice qué preparaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Cuál era en realidad el ingrediente secreto de la abuela?",
        options: [
          "El cariño y la compañía al cocinar",
          "Una especia muy rara",
          "Agua de un río especial",
          "Una verdura escondida",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: Emma no encontró ningún ingrediente raro. ¿Qué dijo la abuela al final?",
          "Relee el último párrafo: dice cuál era el verdadero secreto.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "La abuela decía que el secreto era el cariño. ¿Crees que hacer algo con amor cambia el resultado? Explica por qué.",
        replies: [
          "Qué reflexión tan bonita. Pensaste en cómo el cariño cambia las cosas y lo argumentaste. ¿Hay algo que te guste más cuando lo hace alguien que te quiere?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que Emma no encontró el secreto revisando los ingredientes?",
        ],
      },
    ],
  },

  {
    id: "gorrion",
    title: "El gorrión y la miga de pan",
    topic: "Animales",
    emoji: "🐦",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "Un gorrión llamado Pío encontró una miga de pan grande en el parque. Estaba tan feliz que decidió llevársela él solo a una rama alta para comérsela sin compartir con nadie.",
      "Desde la rama, Pío vio a otros gorriones que buscaban comida por el suelo sin encontrar nada. Tenían tanta hambre como la que él había tenido, pero Pío apretó su miga y no dijo nada.",
      "De pronto, un golpe de viento hizo que la miga se le resbalara de las patas y cayera justo en medio de los otros gorriones. Ellos, en vez de pelear, la partieron en pedacitos para todos.",
      "Uno de ellos subió y le llevó un trocito a Pío. «Toma, para ti también», le dijo. Pío se sintió avergonzado por no haber compartido antes y prometió que la próxima vez lo haría.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué encontró Pío en el parque?",
        options: [
          "Una miga de pan grande",
          "Un gusano",
          "Una semilla",
          "Una fruta",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué se encontró Pío?",
          "Relee el primer párrafo: dice qué halló en el parque.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Pío se sintió avergonzado al final?",
        options: [
          "Porque los otros compartieron con él aunque él no había querido compartir",
          "Porque perdió su miga para siempre",
          "Porque los gorriones se rieron de él",
          "Porque se cayó de la rama",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: compara lo que hizo Pío con lo que hicieron los otros gorriones.",
          "Relee el último párrafo: mira qué hicieron los demás por Pío.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Los otros gorriones compartieron aunque Pío no lo había hecho. ¿Crees que compartir es mejor que guardarlo todo para uno? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en el valor de compartir y lo defendiste. ¿A ti te ha pasado que alguien compartió contigo sin esperarlo?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que hará Pío la próxima vez que encuentre comida?",
        ],
      },
    ],
  },

  {
    id: "erizo",
    title: "El erizo que no quería pinchar",
    topic: "Animales",
    emoji: "🦔",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Espín era un erizo con muchas púas, pero le daba miedo acercarse a los demás animales por temor a pincharlos sin querer. Por eso siempre jugaba solo, lejos de todos.",
      "Los conejos y las ardillas lo saludaban de lejos, pero Espín nunca se acercaba. Se sentía muy solo, aunque prefería eso a lastimar a alguien con sus púas.",
      "Una noche fría, una familia de ratoncitos se quedó sin refugio y temblaba de frío bajo la lluvia. Espín, que conocía una cueva calientita, se armó de valor y los invitó a seguirlo.",
      "Al llegar, los ratoncitos se acurrucaron cerca de él con mucho cuidado, y sus púas no molestaron a nadie. Espín descubrió que, teniendo cuidado, hasta un erizo puede dar abrazos y hacer amigos.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Espín siempre jugaba solo?",
        options: [
          "Por miedo a pinchar a los demás con sus púas",
          "Porque no le gustaban los otros animales",
          "Porque no sabía jugar",
          "Porque vivía muy lejos",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué temía Espín que pasara si se acercaba?",
          "Relee el primer párrafo: dice por qué jugaba solo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Qué descubrió Espín al ayudar a los ratoncitos?",
        options: [
          "Que teniendo cuidado también podía estar cerca de otros sin lastimarlos",
          "Que sus púas habían desaparecido",
          "Que los ratoncitos no sentían frío",
          "Que era mejor seguir solo",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿los ratoncitos salieron lastimados o no?",
          "Relee el último párrafo: dice qué aprendió Espín sobre sus púas.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Espín pensaba que sus púas solo servían para lastimar, pero aprendió a estar cerca con cuidado. ¿Crees que a veces nos alejamos de los demás por miedos que podemos superar? Explica por qué.",
        replies: [
          "Qué reflexión tan linda. Pensaste en los miedos que nos alejan y lo argumentaste. ¿Alguna vez tuviste miedo de acercarte a alguien?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que Espín se sentía tan solo antes?",
        ],
      },
    ],
  },

  {
    id: "linterna",
    title: "La linterna en el campamento",
    topic: "Aventura",
    emoji: "🔦",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "En su primer campamento, Tomás tenía miedo de la oscuridad. Cuando el sol se escondió y todo quedó negro, se metió en su carpa con su linterna encendida y no quería salir.",
      "Afuera, sus compañeros se reunían alrededor de la fogata para contar historias y ver las estrellas. Tomás los escuchaba reír, pero el miedo lo mantenía escondido en su carpa.",
      "Su monitor se acercó y le dijo: «La oscuridad no es tan mala si la enfrentas acompañado. Trae tu linterna, nos servirá a todos». Tomás respiró hondo y salió despacio de la carpa.",
      "Con su linterna alumbró el camino hasta la fogata, y sus amigos lo recibieron contentos. Esa noche vio las estrellas más bonitas de su vida. Aprendió que enfrentar los miedos acompañado es más fácil.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿De qué tenía miedo Tomás en el campamento?",
        options: [
          "De la oscuridad",
          "De los insectos",
          "Del agua del río",
          "De los ruidos de la fogata",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le daba miedo a Tomás?",
          "Relee el primer párrafo: dice de qué tenía miedo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Tomás se animó por fin a salir de la carpa?",
        options: [
          "Porque su monitor le mostró que enfrentar el miedo acompañado es más fácil",
          "Porque se le acabó la batería de la linterna",
          "Porque dejó de tener sueño",
          "Porque los demás se fueron a dormir",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué le dijo el monitor antes de que saliera?",
          "Relee el tercer párrafo: mira qué lo hizo respirar hondo y salir.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Tomás enfrentó su miedo con la ayuda de otros. ¿Crees que es más fácil enfrentar los miedos cuando no estamos solos? Cuéntame por qué.",
        replies: [
          "Buen punto. Pensaste en cómo la compañía ayuda con el miedo y lo defendiste. ¿A ti quién te ayuda cuando tienes miedo?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que se habría perdido Tomás si se hubiera quedado en la carpa?",
        ],
      },
    ],
  },

  {
    id: "mochila",
    title: "La mochila pesada",
    topic: "Colegio",
    emoji: "🎒",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Cada mañana, Daniel cargaba una mochila pesadísima al colegio, llena de todos sus libros, juguetes y hasta cosas que no necesitaba. Le costaba tanto que llegaba cansado y de mal humor.",
      "Un día, en el camino, la correa de la mochila se rompió por el peso. Todo se desparramó por el suelo: libros, carritos y hasta piedras que había guardado «por si acaso».",
      "Su mamá lo ayudó a recoger y juntos revisaron qué cosas usaba de verdad. Guardaron en casa lo que no necesitaba y dejaron en la mochila solo lo importante para ese día.",
      "A la mañana siguiente, la mochila pesaba mucho menos y Daniel llegó al colegio contento y con energía. Aprendió que no hace falta cargar con todo: a veces, llevar solo lo necesario es mejor.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Por qué Daniel llegaba cansado y de mal humor al colegio?",
        options: [
          "Porque cargaba una mochila pesadísima",
          "Porque caminaba muy lejos",
          "Porque no desayunaba",
          "Porque se levantaba tarde",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué cargaba Daniel cada mañana?",
          "Relee el primer párrafo: dice por qué llegaba cansado.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué al final la mochila pesaba mucho menos?",
        options: [
          "Porque dejaron en casa lo que no necesitaba",
          "Porque compraron una mochila nueva",
          "Porque Daniel se hizo más fuerte",
          "Porque perdió los libros",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué hicieron con las cosas que no usaba?",
          "Relee el tercer párrafo: dice qué guardaron en casa.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Daniel aprendió a llevar solo lo necesario. ¿Crees que a veces tenemos más cosas de las que necesitamos? Explica por qué.",
        replies: [
          "Buena reflexión. Pensaste en qué es de verdad necesario y lo argumentaste. ¿Hay algo que guardas «por si acaso» y casi nunca usas?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que Daniel se sentía mejor con la mochila más liviana?",
        ],
      },
    ],
  },

  {
    id: "naranjo",
    title: "El naranjo del abuelo",
    topic: "Naturaleza",
    emoji: "🍊",
    minutes: 3,
    difficulty: "Fácil",
    color: "honey",
    paragraphs: [
      "El abuelo de Vale plantó un pequeño naranjo en el patio y le dijo: «Este árbol dará frutas, pero no de un día para otro. Hay que tener paciencia». Vale quería naranjas ya mismo.",
      "Cada mañana, Vale corría al patio a ver si habían salido naranjas, pero solo encontraba un arbolito con hojas verdes. Impaciente, un día quiso jalar las ramas para que crecieran más rápido.",
      "El abuelo la detuvo con cariño: «Si lo apuras, lo lastimas. Riégalo, cuídalo y déjalo crecer a su tiempo». Así que Vale, cada día, regó el naranjo y le quitó las hojas secas con paciencia.",
      "Pasaron los meses y, una mañana, Vale encontró el árbol lleno de naranjas brillantes. Fueron las más dulces que había probado. Entendió que algunas cosas buenas necesitan tiempo para llegar.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le dijo el abuelo que hacía falta para que el naranjo diera frutas?",
        options: [
          "Tener paciencia",
          "Ponerle azúcar",
          "Cambiarlo de lugar",
          "Cortarle las ramas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué dijo el abuelo que hacía falta?",
          "Relee el primer párrafo: dice qué recomendó el abuelo.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el abuelo detuvo a Vale cuando quiso jalar las ramas?",
        options: [
          "Porque apurar al árbol lo lastimaría en vez de ayudarlo",
          "Porque las ramas estaban sucias",
          "Porque quería jalarlas él mismo",
          "Porque el árbol no era suyo",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué pasaría con el árbol si Vale lo apuraba?",
          "Relee el tercer párrafo: mira qué le explicó el abuelo.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que algunas cosas buenas necesitan tiempo. ¿Estás de acuerdo? Cuéntame por qué.",
        replies: [
          "Qué buena reflexión. Pensaste en el valor de la paciencia y lo defendiste. ¿Hay algo que estés esperando con paciencia?",
          "Muy bien. No hay una sola respuesta. ¿Crees que las naranjas habrían sido tan dulces si Vale hubiera apurado el árbol?",
        ],
      },
    ],
  },

  {
    id: "foca",
    title: "La foca juguetona",
    topic: "Mar",
    emoji: "🦭",
    minutes: 3,
    difficulty: "Fácil",
    color: "teal",
    paragraphs: [
      "Fina era una foca a la que le encantaba jugar y hacer piruetas en el agua. Pero tanto jugaba que nunca prestaba atención cuando los mayores enseñaban a buscar pescado o a cuidarse del peligro.",
      "«Ya aprenderé después», pensaba Fina, y volvía a sus juegos. Mientras las otras focas practicaban, ella daba volteretas y se reía sin preocuparse por nada.",
      "Un día, un banco de peces pasó cerca y todas las focas salieron a pescar. Fina las siguió, pero no sabía cómo hacerlo y se quedó con hambre, mirando cómo las demás comían.",
      "Una foca mayor se acercó y compartió su pescado con ella. Luego le dijo: «Jugar está bien, pero también hay que aprender». Desde ese día, Fina jugaba, pero sin olvidar aprender lo importante.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le encantaba hacer a Fina?",
        options: [
          "Jugar y hacer piruetas en el agua",
          "Dormir en las rocas",
          "Buscar conchas",
          "Cantar con las gaviotas",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le gustaba hacer a Fina?",
          "Relee el primer párrafo: dice qué le encantaba.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué Fina se quedó con hambre cuando pasó el banco de peces?",
        options: [
          "Porque nunca había aprendido a pescar por estar solo jugando",
          "Porque no le gustaba el pescado",
          "Porque las otras focas no la dejaron",
          "Porque ya había comido",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿por qué las demás sabían pescar y ella no?",
          "Relee el tercer párrafo, y recuerda qué hacía Fina mientras las otras practicaban.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Fina aprendió que jugar está bien, pero también hay que aprender. ¿Crees que es importante equilibrar el juego con aprender cosas? Explica por qué.",
        replies: [
          "Buen punto. Pensaste en el equilibrio entre jugar y aprender, y lo defendiste. ¿Cómo repartes tú tu tiempo entre jugar y aprender?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que habría pasado si nadie compartía su pescado con Fina?",
        ],
      },
    ],
  },

  {
    id: "oveja",
    title: "La oveja curiosa",
    topic: "Animales",
    emoji: "🐑",
    minutes: 3,
    difficulty: "Fácil",
    color: "grape",
    paragraphs: [
      "En un rebaño donde todas las ovejas hacían siempre lo mismo, había una llamada Lana que sentía mucha curiosidad por lo que había más allá de la colina. Las demás nunca se lo preguntaban.",
      "«¿Para qué querer saber eso?», le decían. «Aquí hay pasto y estamos bien». Pero Lana no dejaba de mirar hacia la colina y de imaginar qué habría del otro lado.",
      "Un día, siguiendo su curiosidad con cuidado, Lana subió la colina. Del otro lado descubrió un prado enorme con pasto fresco, un arroyo de agua limpia y sombra bajo unos árboles.",
      "Lana volvió y guio a todo el rebaño hasta el nuevo prado. Las demás ovejas le agradecieron. Aprendieron que hacer preguntas y tener curiosidad puede llevarnos a descubrir cosas maravillosas.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué sentía Lana que las demás ovejas no?",
        options: [
          "Curiosidad por lo que había más allá de la colina",
          "Miedo al pasto",
          "Ganas de dormir",
          "Frío por las noches",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué la hacía distinta a las demás?",
          "Relee el primer párrafo: dice qué sentía Lana.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el rebaño terminó agradeciéndole a Lana?",
        options: [
          "Porque su curiosidad los llevó a descubrir un prado mejor",
          "Porque las hizo reír",
          "Porque las despertó a tiempo",
          "Porque les dio de comer",
        ],
        correct: 0,
        evidence: 3,
        hints: [
          "Dedúcelo: ¿qué encontró Lana del otro lado de la colina?",
          "Relee el último párrafo: mira a dónde guio Lana al rebaño.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "Lana descubrió algo maravilloso por ser curiosa. ¿Crees que hacer preguntas y tener curiosidad es bueno? Cuéntame por qué.",
        replies: [
          "Qué buena reflexión. Pensaste en el valor de la curiosidad y lo defendiste. ¿Qué es algo que te gustaría descubrir o preguntar?",
          "Muy bien. No hay una sola respuesta. ¿Qué crees que se habría perdido el rebaño si nadie subía la colina?",
        ],
      },
    ],
  },

  {
    id: "estanque",
    title: "El estanque congelado",
    topic: "Naturaleza",
    emoji: "🧊",
    minutes: 3,
    difficulty: "Fácil",
    color: "coral",
    paragraphs: [
      "Llegó el invierno y el pequeño estanque del bosque se congeló por completo. Debajo del hielo, una ranita llamada Renata se preguntaba, preocupada, si la primavera volvería alguna vez.",
      "Todo estaba quieto y en silencio. Los árboles no tenían hojas, no cantaban los pájaros y hacía mucho frío. Renata pensaba que ese invierno duraría para siempre.",
      "Pero, poco a poco, los días se hicieron más largos y el sol empezó a calentar. El hielo del estanque comenzó a derretirse, gota a gota, hasta que el agua volvió a moverse.",
      "Un día, brotaron flores en la orilla y los pájaros regresaron a cantar. Renata salió del agua feliz. Entendió que, aunque a veces todo parezca detenido, después de lo difícil siempre vuelve algo bueno.",
    ],
    questions: [
      {
        type: "choice",
        level: "literal",
        prompt: "¿Qué le pasó al estanque cuando llegó el invierno?",
        options: [
          "Se congeló por completo",
          "Se secó",
          "Se llenó de peces",
          "Se desbordó",
        ],
        correct: 0,
        evidence: 0,
        hints: [
          "Está al comienzo. ¿Qué le pasó al estanque en invierno?",
          "Relee el primer párrafo: dice cómo quedó el estanque.",
        ],
      },
      {
        type: "choice",
        level: "inferencial",
        prompt: "¿Por qué el hielo del estanque comenzó a derretirse?",
        options: [
          "Porque los días se hicieron más largos y el sol calentó",
          "Porque Renata lo rompió",
          "Porque llovió mucho",
          "Porque los pájaros lo picotearon",
        ],
        correct: 0,
        evidence: 2,
        hints: [
          "Dedúcelo: ¿qué cambió en los días y en el sol?",
          "Relee el tercer párrafo: dice qué pasó para que el hielo se derritiera.",
        ],
      },
      {
        type: "open",
        level: "critico",
        prompt:
          "El cuento dice que después de lo difícil siempre vuelve algo bueno. ¿Estás de acuerdo? Explica por qué.",
        replies: [
          "Qué reflexión tan bonita. Pensaste en cómo lo difícil también pasa y lo argumentaste. ¿Recuerdas un momento difícil que después mejoró?",
          "Muy bien. No hay una sola respuesta. ¿Por qué crees que Renata dejó de estar preocupada?",
        ],
      },
    ],
  },
];

export function getStory(id) {
  return stories.find((s) => s.id === id) || null;
}

// Palabras de un cuento (texto real de sus párrafos).
export function storyWordCount(story) {
  if (!story?.paragraphs) return 0;
  return story.paragraphs.join(" ").trim().split(/\s+/).length;
}

// Total de palabras que el niño ha leído con Leo: suma las palabras reales de
// cada cuento completado, multiplicadas por las veces que lo leyó (plays).
// Es el dato "presumible" del reporte.
export function wordsReadTotal(storiesState = {}) {
  return Object.entries(storiesState).reduce((sum, [id, s]) => {
    if (!s?.completed) return sum;
    const words = storyWordCount(getStory(id));
    const times = Math.max(1, s.plays || 1);
    return sum + words * times;
  }, 0);
}

// Equivalencia con gracia para el total de palabras (para presumir en el
// reporte y el resumen semanal).
export function wordsMilestone(total = 0) {
  if (total >= 30000) return "¡Eso es una novela juvenil entera! 🤯";
  if (total >= 15000) return "¡Como un libro de capítulos completo! 📚";
  if (total >= 8000) return "¡Más que un libro ilustrado grande! 🌟";
  if (total >= 3000) return "¡Ya es todo un lector en marcha! 🚀";
  if (total >= 1000) return "¡Sus primeras mil palabras ya cayeron! 💪";
  return "Cada cuento suma. ¡Esto apenas empieza! 🌱";
}

// ---------------------------------------------------------------------------
// DOMINIO Y PROGRESIÓN POR DESEMPEÑO (no por cantidad de cuentos)
//
// El "dominio" de un nivel es una ESTIMACIÓN DE HABILIDAD, no un conteo. Se
// calcula con suavizado bayesiano sobre los aciertos al primer intento (sin
// pistas) de las preguntas literales e inferenciales recientes del nivel:
//
//   dominio = (aciertos + PRIOR_OK) / (intentos + PRIOR_OK + PRIOR_NO)
//
// Esto logra justo lo que se busca:
//   - Con poca evidencia NO marca 100% (2 aciertos ≈ 50%, no "dominado").
//   - El número solo sube cuando el niño DEMUESTRA comprensión sostenida.
//   - Mira solo el desempeño RECIENTE (ventana): mide la habilidad actual, no
//     cuánto ha leído. Por eso agregar muchísimo contenido nunca infla ni frena
//     el avance: mide el avance del niño, no el volumen.
// ---------------------------------------------------------------------------
const MASTERY_THRESHOLD = 70; // dominio mínimo para subir de nivel
const MASTERY_WINDOW = 20; // solo cuenta el desempeño reciente
const PRIOR_OK = 1; // pseudo-aciertos previos (beneficio de la duda)
const PRIOR_NO = 2; // pseudo-fallos previos (cuánta evidencia se exige)
// Con estos valores: 2 aciertos ≈ 60% (no "dominado"); ~4 aciertos al primer
// intento ≈ 71% (dominado); ~60% de acierto sostenido nunca llega al 70%.

// history: lista de booleanos (acierto al primer intento) del nivel.
export function bandMastery(history = []) {
  const recent = history.slice(-MASTERY_WINDOW);
  const attempts = recent.length;
  const correct = recent.filter(Boolean).length;
  const percent =
    attempts === 0
      ? 0
      : Math.round(((correct + PRIOR_OK) / (attempts + PRIOR_OK + PRIOR_NO)) * 100);
  return {
    percent,
    attempts,
    started: attempts > 0,
    threshold: MASTERY_THRESHOLD,
    mastered: percent >= MASTERY_THRESHOLD,
  };
}

// Calcula hasta qué nivel se ha desbloqueado por desempeño. Es monótono: solo
// sube. Devuelve el nivel más alto alcanzable dado el dominio de cada banda.
export function computeMaxLevel(bands = {}, fromLevel = 1) {
  let maxLevel = Math.max(1, fromLevel);
  while (maxLevel < READING_LEVELS.length) {
    const m = bandMastery(bands[maxLevel]?.history || []);
    if (m.mastered) maxLevel += 1;
    else break;
  }
  return maxLevel;
}

// Progresión por nivel de lectura, basada en desempeño.
// Recibe el progreso ({ stories, bands, maxLevel }).
export function readingProgress(p = {}) {
  const storiesState = p.stories || {};
  const bands = p.bands || {};
  const maxLevel = Math.max(1, p.maxLevel || 1);

  const byLevel = READING_LEVELS.map((lvl) => {
    const inLvl = stories.filter((s) => storyReadingLevel(s) === lvl.level);
    const completed = inLvl.filter((s) => storiesState[s.id]?.completed).length;
    const history = bands[lvl.level]?.history || [];
    const mastery = bandMastery(history);
    return {
      ...lvl,
      stories: inLvl,
      total: inLvl.length,
      completed,
      mastery,
      unlocked: lvl.level <= maxLevel,
    };
  });

  const unlocked = new Set(byLevel.filter((b) => b.unlocked).map((b) => b.level));

  // Nivel actual: el más bajo desbloqueado que aún no se ha dominado.
  const current =
    byLevel.find((b) => b.unlocked && !b.mastery.mastered) ||
    [...byLevel].reverse().find((b) => b.unlocked) ||
    byLevel[0];

  return { byLevel, unlocked, currentLevel: current.level };
}

// Siguiente cuento recomendado: el primero sin completar del nivel actual
// (si ya completó todos, sugiere releer el primero para seguir mejorando).
export function recommendedStory(p = {}) {
  const storiesState = p.stories || {};
  const { byLevel, currentLevel } = readingProgress(p);
  const lvl = byLevel.find((l) => l.level === currentLevel);
  const pending = lvl?.stories.find((s) => !storiesState[s.id]?.completed);
  return pending || lvl?.stories[0] || stories[0];
}

// Palabra amigable para cada nivel de lectura (banda).
export const READING_LABEL = { 1: "Fácil", 2: "Medio", 3: "Avanzado" };

// Cómo se relaciona un cuento con el nivel de lectura detectado del niño:
//   "reto"     -> por encima de su nivel (da más XP, se marca como desafío)
//   "dominado" -> de una banda que ya domina (da XP reducida)
//   "nivel"    -> justo en su nivel actual
export function storyTag(story, currentLevel = 1) {
  const band = storyReadingLevel(story);
  if (band > currentLevel) return "reto";
  if (band < currentLevel) return "dominado";
  return "nivel";
}

// Logros: se calculan al vuelo desde el progreso (no se guardan aparte).
export function achievements({
  done = 0,
  streak = 0,
  playerLevel = 1,
  maxLevel = 1,
  criticoTotal = 0,
} = {}) {
  return [
    { id: "first", emoji: "📖", label: "Primer cuento", earned: done >= 1 },
    { id: "five", emoji: "📚", label: "5 cuentos", earned: done >= 5 },
    { id: "streak3", emoji: "🔥", label: "Racha de 3", earned: streak >= 3 },
    { id: "streak7", emoji: "⚡", label: "Racha de 7", earned: streak >= 7 },
    { id: "thinker", emoji: "💡", label: "Pensador", earned: criticoTotal >= 5 },
    { id: "readMed", emoji: "🚀", label: "Lectura media", earned: maxLevel >= 2 },
    { id: "readAdv", emoji: "🏆", label: "Lectura avanzada", earned: maxLevel >= 3 },
    { id: "pl5", emoji: "🧭", label: "Jugador niv. 5", earned: playerLevel >= 5 },
    { id: "pl10", emoji: "🌟", label: "Jugador niv. 10", earned: playerLevel >= 10 },
    { id: "pl20", emoji: "👑", label: "Jugador niv. 20", earned: playerLevel >= 20 },
  ];
}

// ---------------------------------------------------------------------------
// Perfil DEMO (solo para el mockup de marketing en la landing).
// La app real usa el progreso vivo de lib/progress.jsx, no esto.
// ---------------------------------------------------------------------------
export const profile = {
  name: "Mateo",
  age: 8,
  grade: "3.º de primaria",
  streak: 6,
  xp: 1240,
  level: 5,
  xpToNext: 1500,
  storiesRead: 23,
  comprehension: { literal: 88, inferencial: 54, critico: 31 },
  weeklyMinutes: [12, 0, 18, 15, 22, 10, 8],
  weekLabels: ["L", "M", "M", "J", "V", "S", "D"],
};
