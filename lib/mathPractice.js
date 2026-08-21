export const PRACTICE_LESSONS = {
  NO01: lesson(
    "Valor posicional y comparación",
    "El valor de una cifra depende de la posición que ocupa. En 42.018, el 4 representa cuarenta mil, mientras que el 2 representa dos mil. Para comparar números, alinea sus posiciones y observa la primera cifra diferente desde la izquierda. Los ceros también importan: pueden reservar una posición aunque no añadan cantidad. Descomponer un número en decenas de millar, unidades de millar, centenas, decenas y unidades permite leerlo, ordenarlo y estimar su tamaño sin depender de una regla memorizada.",
    "Ejemplo: 53.204 = 50.000 + 3.000 + 200 + 4. La cifra 2 vale 200 por estar en las centenas.",
    "Lee cada posición, conserva los ceros necesarios y compara desde la cifra de mayor valor.",
    [],
  ),
  NO02: lesson(
    "Operaciones con números naturales",
    "Antes de calcular, identifica qué representa cada número y qué cambio ocurre. Sumar reúne cantidades; restar compara o quita; multiplicar forma grupos iguales; dividir reparte o determina cuántas veces cabe una cantidad. La operación correcta no depende de una palabra aislada, sino de la relación entre los datos. Después de calcular, estima: si repartes 196 objetos entre 7 grupos, el resultado debe estar cerca de 200 ÷ 10, pero será algo mayor. Esa comparación rápida ayuda a detectar errores de cifra u operación. En problemas de varios pasos, escribe un resultado intermedio y explica qué significa antes de continuar.",
    "Ejemplo: 8 cajas con 24 fichas tienen 8 × 24 = 192 fichas. Si se usan 37, quedan 192 − 37 = 155.",
    "Elige la operación por la relación, calcula por pasos y comprueba la magnitud.",
    [
      pq("NO02-P1", 1, "¿Cuánto es 625 − 278?", ["337", "347", "357", "403"], "347", "625 − 278 = 347."),
      pq("NO02-P2", 2, "Calcula 36 × 7 + 18.", ["234", "252", "270", "396"], "270", "36 × 7 = 252; luego 252 + 18 = 270."),
      pq("NO02-P3", 3, "Hay 9 paquetes de 18 tarjetas. Se reparten por igual entre 6 personas. ¿Cuántas recibe cada una?", ["21", "24", "27", "30"], "27", "9 × 18 = 162 y 162 ÷ 6 = 27."),
    ],
  ),
  NO03: lesson(
    "Operaciones con decimales",
    "Los decimales extienden el sistema posicional hacia décimas, centésimas y milésimas. Para sumar o restar, alinea las comas para reunir cantidades de la misma posición. Al multiplicar, estima primero la magnitud y recupera las posiciones decimales al final. Dividir entre 10, 100 o 1.000 cambia el valor de cada cifra porque la unidad de referencia se hace más pequeña. Un cero a la derecha puede ayudar a alinear cantidades: 3,5 y 3,50 representan el mismo valor.",
    "Ejemplo: 4,75 + 0,8 se escribe 4,75 + 0,80 = 5,55.",
    "Alinea posiciones, estima la magnitud y comprueba que la coma final tenga sentido.",
    [],
  ),
  NO04: lesson(
    "Enteros y recta numérica",
    "Los enteros describen posiciones respecto de un punto de referencia: arriba y abajo, ganancias y deudas, temperaturas o pisos. En una recta numérica, los valores aumentan hacia la derecha y disminuyen hacia la izquierda. Dos números opuestos están a la misma distancia de cero, pero en lados distintos. El valor absoluto mide esa distancia, por eso nunca es negativo. Para comparar enteros negativos no basta mirar cuál cifra parece mayor: −3 es mayor que −8 porque está más a la derecha y más cerca de cero. Cuando una situación habla de distancia, el resultado debe expresar cuántas unidades separan dos puntos, sin signo negativo.",
    "Ejemplo: −5 y 5 son opuestos; ambos tienen valor absoluto 5 y la distancia entre ellos es 10.",
    "Usa cero como referencia, compara posiciones y distingue coordenada de distancia.",
    [
      pq("NO04-P1", 1, "¿Cuál es el opuesto de −7?", ["−7", "0", "7", "14"], "7", "Está a la misma distancia de cero en el lado contrario."),
      pq("NO04-P2", 2, "¿Cuál es mayor: −9 o −4?", ["−9", "−4", "Son iguales", "No se puede saber"], "−4", "−4 está más a la derecha y más cerca de cero."),
      pq("NO04-P3", 3, "¿Qué distancia hay entre −6 y 3?", ["3", "6", "9", "18"], "9", "De −6 a 0 hay 6 unidades y de 0 a 3 hay 3: en total 9."),
    ],
  ),
  NO05: lesson(
    "Operaciones con enteros",
    "Los enteros describen posiciones y cambios alrededor de cero: temperaturas, pisos, deudas o movimientos. Para sumar, piensa en desplazamientos sobre una recta. Un número positivo avanza a la derecha y uno negativo a la izquierda. Restar significa añadir el opuesto; por eso 5 − (−3) se convierte en 5 + 3. En multiplicación y división, signos iguales producen un resultado positivo y signos diferentes, uno negativo. No conviene memorizar todas las reglas como una sola: la suma depende de dirección y distancia, mientras el producto depende de cuántos cambios de sentido aparecen. Siempre revisa si el signo final tiene sentido en el contexto.",
    "Ejemplo: una cuenta está en −$12 y recibe $20. El nuevo saldo es −12 + 20 = $8.",
    "Representa el cambio, distingue la operación y comprueba el signo final.",
    [
      pq("NO05-P1", 1, "Calcula −7 + 12.", ["−19", "−5", "5", "19"], "5", "Desde −7 avanzas 12 unidades y llegas a 5."),
      pq("NO05-P2", 2, "Calcula −4 × 6.", ["−24", "−10", "10", "24"], "−24", "Signos diferentes dan negativo y 4 × 6 = 24."),
      pq("NO05-P3", 3, "Un ascensor está en el piso 3, baja 8 pisos y sube 2. ¿Dónde termina?", ["−7", "−3", "3", "13"], "−3", "3 − 8 + 2 = −3."),
    ],
  ),
  NO06: lesson(
    "Orden de operaciones",
    "Una expresión puede contener varias operaciones, pero no se resuelve escogiendo cualquiera. Primero se calculan las agrupaciones, desde las más internas; luego las potencias; después multiplicaciones y divisiones de izquierda a derecha; por último sumas y restas, también de izquierda a derecha. Multiplicar no tiene prioridad sobre dividir y sumar no tiene prioridad sobre restar: dentro del mismo nivel manda el orden de lectura. Los paréntesis no son decoración, sino una instrucción que convierte varias operaciones en una sola cantidad. Registrar un resultado intermedio evita mezclar pasos y permite detectar dónde nació un error.",
    "Ejemplo: 5 + 3 × (8 − 6) = 5 + 3 × 2 = 5 + 6 = 11.",
    "Resuelve un nivel a la vez y conserva visible la expresión que todavía no cambia.",
    [
      pq("NO06-P1", 1, "¿Cuánto es 4 + 3 × 5?", ["19", "23", "35", "75"], "19", "Primero 3 × 5 = 15; después 4 + 15 = 19."),
      pq("NO06-P2", 2, "Calcula 36 ÷ 6 × 4.", ["1,5", "6", "24", "144"], "24", "División y multiplicación tienen igual prioridad: 36 ÷ 6 = 6 y 6 × 4 = 24."),
      pq("NO06-P3", 3, "¿Cuánto es 2 × [7 − (3 + 1)]?", ["6", "8", "10", "16"], "6", "Primero 3 + 1 = 4; luego 7 − 4 = 3 y finalmente 2 × 3 = 6."),
    ],
  ),
  FR01: lesson(
    "Significado de las fracciones",
    "Una fracción describe una cantidad respecto de una unidad. El denominador indica en cuántas partes iguales se divide esa unidad y el numerador cuántas de esas partes se consideran. La misma idea aparece al sombrear una figura, repartir objetos, seleccionar elementos de un conjunto o ubicar un punto en la recta. Una fracción impropia supera una unidad y puede escribirse como número mixto. Antes de calcular, identifica siempre cuál es la unidad completa: sin ella, expresiones como tres cuartos quedan incompletas.",
    "Ejemplo: 3/4 significa tres partes cuando la unidad fue dividida en cuatro partes iguales.",
    "Identifica la unidad, exige partes iguales y conecta numerador con denominador.",
    [
      pq("FR01-P1",1,"Una barra tiene 5 partes iguales y 2 están sombreadas. ¿Qué fracción representa?",["2/5","3/5","5/2","2/7"],"2/5","Hay 2 partes seleccionadas de 5 partes iguales."),
      pq("FR01-P2",2,"Tres pizzas se reparten entre cuatro personas. ¿Cuánto recibe cada una?",["3/4","4/3","1/4","7/4"],"3/4","La fracción representa la división 3 ÷ 4."),
      pq("FR01-P3",3,"Convierte 11/4 en número mixto.",["2 3/4","3 1/4","4 1/3","7/4"],"2 3/4","11 ÷ 4 forma 2 unidades completas y sobran 3 cuartos."),
    ],
  ),
  FR02: lesson(
    "Equivalencia y comparación de fracciones",
    "Dos fracciones son equivalentes cuando representan la misma cantidad aunque usen particiones diferentes. Multiplicar o dividir numerador y denominador por el mismo número conserva el valor, porque equivale a cambiar el tamaño de las partes sin cambiar el total. Para comparar, no basta mirar cuál denominador o numerador es mayor. Puedes usar un referente como 1/2, construir un denominador común o convertir a decimal. El método debe permitir comparar partes del mismo tamaño. Antes de responder, identifica también cuál es la unidad completa: tres cuartos de una pizza pequeña no representan necesariamente la misma cantidad física que tres cuartos de una pizza grande.",
    "Ejemplo: 4/6 y 2/3 son equivalentes porque al dividir 4 y 6 entre 2 se obtiene 2/3.",
    "Compara cantidades sobre la misma unidad y transforma ambos términos por igual.",
    [
      pq("FR02-P1", 1, "¿Cuál fracción equivale a 2/5?", ["4/7", "4/10", "6/10", "8/15"], "4/10", "Multiplica numerador y denominador por 2."),
      pq("FR02-P2", 2, "¿Cuál es mayor: 3/4 o 5/8?", ["3/4", "5/8", "Son iguales", "No se puede saber"], "3/4", "3/4 = 6/8, que es mayor que 5/8."),
      pq("FR02-P3", 3, "¿Qué orden va de mayor a menor?", ["2/3, 3/5, 1/2", "1/2, 3/5, 2/3", "3/5, 2/3, 1/2", "2/3, 1/2, 3/5"], "2/3, 3/5, 1/2", "Aproximadamente: 0,67; 0,60; 0,50."),
    ],
  ),
  FR03: lesson(
    "Suma y resta de fracciones",
    "Sumar o restar fracciones significa reunir o separar partes de una misma unidad. Solo pueden operarse directamente cuando las partes tienen el mismo tamaño, es decir, el mismo denominador. Si son diferentes, construye fracciones equivalentes con un denominador común; después opera los numeradores y conserva el denominador. Sumar los denominadores produciría una nueva partición que no representa la situación. En números mixtos puedes convertir a impropias o trabajar enteros y partes por separado, siempre comprobando si hay que reagrupar.",
    "Ejemplo: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    "Iguala el tamaño de las partes, opera los numeradores y simplifica.",
    [
      pq("FR03-P1",1,"Calcula 2/7 + 3/7.",["5/7","5/14","6/7","1/7"],"5/7","Las partes ya son séptimos: suma 2 + 3."),
      pq("FR03-P2",2,"Calcula 1/2 + 1/4.",["2/6","2/4","3/4","1/8"],"3/4","1/2 equivale a 2/4; entonces 2/4 + 1/4 = 3/4."),
      pq("FR03-P3",3,"Calcula 5/6 − 1/4.",["4/2","7/12","4/10","1/2"],"7/12","5/6 = 10/12 y 1/4 = 3/12; la diferencia es 7/12."),
    ],
  ),
  FR04: lesson(
    "Multiplicación de fracciones",
    "Multiplicar por una fracción significa tomar una parte de otra cantidad. Para hallar 3/4 de 20, divide 20 en cuatro partes y toma tres. Entre dos fracciones, el producto puede verse como la superposición de dos particiones: los numeradores cuentan la zona común y los denominadores el total de partes pequeñas. Multiplica numeradores y denominadores, pero simplifica antes o después para conservar una forma clara. Si ambos factores están entre cero y uno, el producto debe ser menor que cada factor.",
    "Ejemplo: 2/3 × 3/5 = 6/15 = 2/5.",
    "Interpreta «de» como producto, anticipa la magnitud y simplifica factores.",
    [
      pq("FR04-P1",1,"¿Cuánto es 3/4 de 20?",["5","12","15","16"],"15","20 ÷ 4 = 5 y 5 × 3 = 15."),
      pq("FR04-P2",2,"Calcula 2/3 × 5/8.",["7/11","10/24","5/12","10/11"],"5/12","10/24 se simplifica dividiendo entre 2."),
      pq("FR04-P3",3,"¿Cuál producto debe ser menor que 3/4?",["3/4 × 2","3/4 × 5/4","3/4 × 1/2","3/4 × 3"],"3/4 × 1/2","Tomar la mitad de 3/4 produce 3/8."),
    ],
  ),
  FR05: lesson(
    "División de fracciones",
    "Dividir puede significar repartir una cantidad entre varios grupos o medir cuántos grupos de cierto tamaño caben. Esa distinción explica por qué dividir entre una fracción menor que uno puede producir un resultado mayor: en 3 unidades caben seis medios. El algoritmo de multiplicar por el recíproco conserva esta relación, pero debe aplicarse solo al divisor. Comprueba multiplicando el cociente por el divisor; si no recuperas el dividendo, algún paso o simplificación es incorrecto.",
    "Ejemplo: 3 ÷ 1/2 = 3 × 2/1 = 6 porque en tres unidades caben seis mitades.",
    "Interpreta el tamaño del grupo, usa el recíproco del divisor y comprueba.",
    [
      pq("FR05-P1",1,"¿Cuántos grupos de 1/4 caben en 2?",["1/2","2","6","8"],"8","Cada unidad contiene cuatro cuartos; dos contienen ocho."),
      pq("FR05-P2",2,"Calcula 3/5 ÷ 2.",["3/10","6/5","3/7","2/5"],"3/10","Repartir 3/5 en dos partes equivale a multiplicar por 1/2."),
      pq("FR05-P3",3,"Calcula 4/7 ÷ 2/3.",["8/21","6/7","7/6","12/14"],"6/7","4/7 × 3/2 = 12/14 = 6/7."),
    ],
  ),
  FR06: lesson(
    "Fracciones y decimales",
    "Una fracción y un decimal pueden nombrar exactamente el mismo punto. Para convertir una fracción a decimal, divide numerador entre denominador; para convertir un decimal finito a fracción, escríbelo sobre 10, 100 o 1.000 según sus cifras y simplifica. Cuando compares formatos distintos, conviértelos temporalmente a una misma representación. El cambio de escritura no debe alterar la magnitud: 1/2, 0,5 y 50 centésimas representan la misma cantidad.",
    "Ejemplo: 3/4 = 3 ÷ 4 = 0,75; y 0,75 = 75/100 = 3/4.",
    "Cambia de representación, conserva el valor y comprueba la posición.",
    [
      pq("FR06-P1",1,"¿Qué decimal equivale a 1/4?",["0,14","0,25","0,4","1,4"],"0,25","1 ÷ 4 = 0,25."),
      pq("FR06-P2",2,"Simplifica la fracción que representa 0,6.",["6/100","6/10","3/5","6/5"],"3/5","0,6 = 6/10 y al dividir entre 2 se obtiene 3/5."),
      pq("FR06-P3",3,"¿Cuál es mayor: 5/8 o 0,6?",["5/8","0,6","Son iguales","No se puede saber"],"5/8","5/8 = 0,625, que es mayor que 0,6."),
    ],
  ),
  RP01: lesson("Razones y tasas unitarias","Una razón compara dos cantidades en un orden específico. Una tasa compara cantidades con unidades distintas y una tasa unitaria expresa cuánto corresponde a una unidad. Para hallarla, divide ambas cantidades por el número de unidades. Esto permite comparar precios, velocidades o rendimientos aunque los totales sean diferentes.","Ejemplo: 180 km en 3 horas equivalen a 60 km por hora.","Conserva el orden, reduce a una unidad e interpreta las unidades.",[
    pq("RP01-P1",1,"Hay 3 fichas rojas y 5 azules. ¿Cuál es la razón de rojas a azules?",["3:5","5:3","3:8","8:5"],"3:5","El orden pedido es rojas y luego azules."),
    pq("RP01-P2",2,"$24 corresponden a 6 kg. ¿Cuál es el precio por kg?",["$3","$4","$18","$144"],"$4","24 ÷ 6 = 4 por kilogramo."),
    pq("RP01-P3",3,"¿Qué es más rápido: 180 km en 3 h o 250 km en 5 h?",["La primera","La segunda","Son iguales","No se puede saber"],"La primera","Las tasas son 60 km/h y 50 km/h."),
  ]),
  RP02: lesson("Razones equivalentes","Dos razones son equivalentes cuando una se obtiene multiplicando o dividiendo ambos términos de la otra por el mismo factor. Las tablas y rectas dobles hacen visible ese cambio coordinado. También puedes comprobar equivalencia con productos cruzados: a/b y c/d son equivalentes si a×d=b×c.","Ejemplo: 2:3 = 8:12 porque ambos términos se multiplicaron por 4.","Aplica el mismo factor a cantidades correspondientes y comprueba la razón.",[
    pq("RP02-P1",1,"Amplía 3:5 por un factor de 4.",["7:9","12:20","12:5","3:20"],"12:20","Multiplica ambos términos por cuatro."),
    pq("RP02-P2",2,"Completa 2/5 = ?/20.",["4","8","10","40"],"8","El denominador se multiplicó por 4; también el numerador."),
    pq("RP02-P3",3,"¿Son equivalentes 4:7 y 12:21?",["Sí","No","Solo si se suman","No se puede saber"],"Sí","4×21 y 7×12 producen 84."),
  ]),
  RP03: lesson(
    "Relaciones proporcionales",
    "Una relación es proporcional cuando una cantidad siempre se obtiene multiplicando la otra por la misma constante. Esa constante puede interpretarse como precio por unidad, velocidad o cantidad por cada grupo. En una tabla, las razones correspondientes deben ser equivalentes; en una gráfica, los puntos forman una línea recta que pasa por el origen; en una ecuación, aparece como y = kx. No toda relación que aumenta es proporcional: si existe un costo inicial o una cantidad fija, la razón cambia. Para resolver un valor faltante puedes escalar ambos términos, hallar la tasa unitaria o escribir una ecuación. Elige el método que haga visible la relación.",
    "Ejemplo: si 4 entradas cuestan $28, cada una cuesta $7; entonces 9 cuestan 9 × 7 = $63.",
    "Busca una constante, conserva el orden de las cantidades y verifica la razón.",
    [
      pq("RP03-P1", 1, "Si 5 botellas cuestan $20, ¿cuánto cuestan 2?", ["$4", "$8", "$10", "$15"], "$8", "Cada botella cuesta $4; dos cuestan $8."),
      pq("RP03-P2", 2, "Una bicicleta recorre 18 km en 3 horas a ritmo constante. ¿Cuánto recorre en 5 horas?", ["20 km", "24 km", "30 km", "36 km"], "30 km", "La tasa es 6 km/h; en 5 horas recorre 30 km."),
      pq("RP03-P3", 3, "¿Cuál tabla puede ser proporcional?", ["x: 1,2,3 · y: 4,8,12", "x: 1,2,3 · y: 4,7,10", "x: 1,2,3 · y: 5,8,9", "x: 1,2,3 · y: 2,4,7"], "x: 1,2,3 · y: 4,8,12", "La razón y/x vale 4 en las tres parejas."),
    ],
  ),
  RP04: lesson("Fracción, decimal y porcentaje","Fracciones, decimales y porcentajes pueden representar el mismo valor. Un porcentaje expresa cuántas partes hay de cada cien. Para pasar de decimal a porcentaje multiplica por 100; para pasar de porcentaje a decimal divide entre 100; para convertir una fracción, divide numerador entre denominador y cambia de formato.","Ejemplo: 3/4 = 0,75 = 75%.","Cambia la escritura sin alterar la magnitud y usa cien como referencia.",[
    pq("RP04-P1",1,"Convierte 2/5 en porcentaje.",["20%","40%","50%","80%"],"40%","2 ÷ 5 = 0,4 = 40%."),
    pq("RP04-P2",2,"Simplifica 60% como fracción.",["3/5","6/5","6/10","60/10"],"3/5","60/100 se simplifica a 3/5."),
    pq("RP04-P3",3,"¿Cuál es mayor: 7/8 u 82%?",["7/8","82%","Son iguales","No se puede saber"],"7/8","7/8 = 87,5%, mayor que 82%."),
  ]),
  RP05: lesson("Aplicaciones de porcentajes","En una situación porcentual identifica tres elementos: parte, porcentaje y total. Parte = porcentaje × total; porcentaje = parte ÷ total; total = parte ÷ porcentaje. En descuentos y disminuciones se resta el cambio; en impuestos y aumentos se suma. Calcula primero el cambio, no confundas ese valor con el precio final.","Ejemplo: 20% de 80 es 16; con un descuento del 20%, el precio final es 80−16=64.","Identifica qué se busca, calcula el cambio y decide si se suma o se resta.",[
    pq("RP05-P1",1,"¿Cuánto es 25% de 60?",["10","15","25","35"],"15","0,25 × 60 = 15."),
    pq("RP05-P2",2,"18 representa qué porcentaje de 72?",["20%","25%","30%","40%"],"25%","18 ÷ 72 = 0,25 = 25%."),
    pq("RP05-P3",3,"Un producto de $120 tiene 25% de descuento. ¿Precio final?",["$30","$90","$95","$145"],"$90","El descuento es 30; 120−30=90."),
  ]),
  AL01: lesson(
    "Variables y expresiones",
    "Una variable representa una cantidad que puede cambiar o que todavía no conocemos. Una expresión algebraica combina números, variables y operaciones, pero no afirma una igualdad. Para traducir una situación, define primero qué representa la letra y después conserva el orden de las relaciones: «cinco menos que un número» es x − 5, mientras «cinco menos un número» puede significar 5 − x. Un coeficiente multiplica a la variable y un término constante no depende de ella. Escribir bien la expresión permite razonar sobre muchas cantidades posibles sin tener que conocer una en particular.",
    "Ejemplo: una tarifa de $8 más $3 por viaje se representa como 3v + 8, donde v es la cantidad de viajes.",
    "Define la variable, traduce cada relación y distingue términos, coeficientes y constantes.",
    [
      pq("AL01-P1", 1, "¿Qué expresión representa el doble de un número más 5?", ["2x + 5", "2(x + 5)", "x + 7", "5x + 2"], "2x + 5", "El doble es 2x y luego se suman 5."),
      pq("AL01-P2", 2, "En 7m − 4, ¿cuál es el coeficiente de m?", ["−4", "4", "7", "11"], "7", "El coeficiente es el número que multiplica a la variable."),
      pq("AL01-P3", 3, "Un plan cobra $10 fijos y $6 por clase. ¿Qué expresión representa c clases?", ["10c + 6", "6c + 10", "16c", "6 + 10"], "6c + 10", "La parte variable es 6c y la constante es 10."),
    ],
  ),
  AL02: lesson(
    "Evaluación de expresiones",
    "Evaluar una expresión significa sustituir cada variable por un valor y calcular respetando la estructura original. Es útil escribir el valor entre paréntesis, especialmente cuando es negativo: si x = −3, entonces x² se convierte en (−3)² = 9. Después se sigue el orden de operaciones. En expresiones con varias letras, cada valor debe reemplazar solamente a su variable. Una evaluación correcta puede comprobarse repitiendo el cálculo por pasos y estimando si el signo y la magnitud tienen sentido.",
    "Ejemplo: 2x + 3 cuando x = 4 vale 2(4) + 3 = 11.",
    "Sustituye con paréntesis, conserva las operaciones y calcula por niveles.",
    [
      pq("AL02-P1", 1, "Evalúa 3x + 2 cuando x = 5.", ["10", "15", "17", "25"], "17", "3(5) + 2 = 17."),
      pq("AL02-P2", 2, "Evalúa x² − 4 cuando x = −3.", ["−13", "−5", "5", "13"], "5", "(−3)² = 9 y 9 − 4 = 5."),
      pq("AL02-P3", 3, "Evalúa 2a + 3b si a = 4 y b = 2.", ["10", "12", "14", "20"], "14", "2(4) + 3(2) = 8 + 6 = 14."),
    ],
  ),
  AL03: lesson(
    "Expresiones equivalentes",
    "Dos expresiones son equivalentes cuando producen el mismo valor para cualquier valor permitido de sus variables. Los términos semejantes pueden combinarse porque representan la misma clase de cantidad: 3x + 5x = 8x, pero 3x + 5 no puede convertirse en 8x. La propiedad distributiva multiplica el factor exterior por cada término del paréntesis. Factorizar recorre el camino inverso y extrae un factor común. Puedes comprobar una transformación desarrollando ambas formas o evaluándolas con varios valores, aunque una comprobación numérica aislada no reemplaza una justificación algebraica.",
    "Ejemplo: 4(x + 3) = 4x + 12 y 6x + 9 = 3(2x + 3).",
    "Combina solo términos semejantes y aplica la misma multiplicación a todo el paréntesis.",
    [
      pq("AL03-P1", 1, "Simplifica 4x + 7x.", ["11", "11x", "28x", "11x²"], "11x", "Se suman los coeficientes de términos semejantes."),
      pq("AL03-P2", 2, "Desarrolla 3(x − 5).", ["3x − 5", "3x − 15", "3x + 15", "8x"], "3x − 15", "Tres multiplica tanto a x como a −5."),
      pq("AL03-P3", 3, "¿Cuál expresión equivale a 8x + 12?", ["2(4x + 6)", "4(2x + 3)", "8(x + 12)", "4(8x + 3)"], "4(2x + 3)", "Al distribuir 4 se obtiene 8x + 12."),
    ],
  ),
  AL04: lesson(
    "Ecuaciones de un paso",
    "Una ecuación afirma que dos expresiones tienen el mismo valor. Resolverla significa encontrar el número que mantiene esa igualdad. Imagina una balanza: cualquier operación aplicada a un lado debe aplicarse también al otro. Para aislar la variable, usa la operación inversa: suma deshace resta, resta deshace suma, multiplicación deshace división y división deshace multiplicación. Evita la regla mecánica de “pasar al otro lado”; puede funcionar en ejemplos simples, pero oculta por qué se conserva la igualdad. Al terminar, sustituye el valor encontrado en la ecuación original. Si ambos lados coinciden, la solución está comprobada.",
    "Ejemplo: 5x = 35. Divide ambos lados entre 5 y obtienes x = 7. Comprobación: 5 × 7 = 35.",
    "Mantén el equilibrio, usa una operación inversa y comprueba sustituyendo.",
    [
      pq("AL04-P1", 1, "Resuelve x − 9 = 14.", ["5", "9", "23", "126"], "23", "Suma 9 en ambos lados: x = 23."),
      pq("AL04-P2", 2, "Resuelve x/6 = −4.", ["−24", "−10", "2", "24"], "−24", "Multiplica ambos lados por 6."),
      pq("AL04-P3", 3, "Después de gastar $18 quedan $27. Si x era el dinero inicial, ¿cuánto vale x?", ["$9", "$18", "$27", "$45"], "$45", "x − 18 = 27, por lo tanto x = 45."),
    ],
  ),
  AL05: lesson(
    "Ecuaciones lineales de varios pasos",
    "Resolver una ecuación de varios pasos exige mantener visible qué operación se aplica a ambos lados. Primero elimina paréntesis o denominadores de forma válida y combina términos semejantes. Luego reúne los términos con variable en un lado y las constantes en el otro. Finalmente divide entre el coeficiente. No existe una regla separada de «cambiar de lado»: cada movimiento abrevia una operación aplicada a ambos miembros. La sustitución final permite encontrar errores de signo o distributiva.",
    "Ejemplo: 3x + 5 = 20; resta 5, queda 3x = 15; divide entre 3 y x = 5.",
    "Simplifica, conserva el equilibrio, aísla la variable y comprueba.",
    [
      pq("AL05-P1", 1, "Resuelve 2x + 7 = 19.", ["5", "6", "12", "13"], "6", "2x = 12 y x = 6."),
      pq("AL05-P2", 2, "Resuelve 5x + 3 = 2x + 18.", ["3", "5", "7", "15"], "5", "3x + 3 = 18; 3x = 15; x = 5."),
      pq("AL05-P3", 3, "Resuelve 4(x − 2) = 24.", ["4", "6", "8", "10"], "8", "x − 2 = 6 y x = 8."),
    ],
  ),
  AL06: lesson(
    "Desigualdades de una variable",
    "Una desigualdad describe muchos valores posibles. Los símbolos < y > excluyen el límite; ≤ y ≥ lo incluyen. Resolver se parece a resolver una ecuación, excepto cuando multiplicas o divides por un número negativo: el sentido del orden se invierte. Por ejemplo, si −2x < 8, al dividir entre −2 se obtiene x > −4. En la recta, un círculo abierto excluye el límite, uno cerrado lo incluye y la flecha muestra hacia dónde continúan las soluciones.",
    "Ejemplo: x + 5 ≤ 12 equivale a x ≤ 7.",
    "Aísla la variable, invierte el signo solo con factores negativos y representa el conjunto completo.",
    [
      pq("AL06-P1", 1, "Resuelve x − 4 > 9.", ["x > 5", "x > 13", "x < 13", "x = 13"], "x > 13", "Suma 4 en ambos lados."),
      pq("AL06-P2", 2, "Resuelve 3x ≤ 18.", ["x ≤ 6", "x ≥ 6", "x ≤ 15", "x = 6"], "x ≤ 6", "Divide entre 3, que es positivo."),
      pq("AL06-P3", 3, "Resuelve −2x < 10.", ["x < −5", "x > −5", "x < 5", "x > 5"], "x > −5", "Al dividir entre −2 se invierte el signo."),
    ],
  ),
  AL07: lesson(
    "Relaciones lineales",
    "Una relación lineal cambia a una tasa constante. En y = mx + b, m es la tasa de cambio: cuánto cambia y cuando x aumenta una unidad; b es el valor inicial, es decir, y cuando x = 0. En una tabla, las diferencias de y son constantes para incrementos iguales de x. En una gráfica, la tasa se ve como inclinación y el valor inicial como el punto donde la recta cruza el eje vertical. Dos relaciones pueden tener el mismo valor inicial y tasas distintas, o la misma tasa y valores iniciales diferentes.",
    "Ejemplo: y = 3x + 5 empieza en 5 y aumenta 3 por cada unidad de x.",
    "Separa tasa y valor inicial, conecta representaciones y comprueba con pares ordenados.",
    [
      pq("AL07-P1", 1, "En y = 4x + 2, ¿cuál es la tasa de cambio?", ["2", "4", "6", "8"], "4", "La tasa es el coeficiente de x."),
      pq("AL07-P2", 2, "Una tabla tiene x: 0,1,2 y y: 5,8,11. ¿Cuál es la ecuación?", ["y = 3x + 5", "y = 5x + 3", "y = 3x", "y = 8x − 5"], "y = 3x + 5", "Empieza en 5 y aumenta 3."),
      pq("AL07-P3", 3, "El modelo y = 6x + 10 representa un costo. ¿Cuánto cuesta cuando x = 4?", ["$24", "$34", "$40", "$44"], "$34", "6(4) + 10 = 34."),
    ],
  ),
  GM01: lesson(
    "Unidades, conversiones y escala",
    "Medir significa comparar una cantidad con una unidad. La unidad debe corresponder al atributo: longitud, masa, capacidad, tiempo o superficie. Al convertir dentro del sistema métrico, no se mueve una coma por costumbre; se razona cuántas unidades pequeñas caben en una grande. Una escala relaciona la medida del dibujo con la medida real mediante un mismo factor. Antes de operar, escribe siempre las unidades y comprueba que las cantidades sean comparables.",
    "Ejemplo: 2,4 m equivalen a 240 cm porque cada metro contiene 100 centímetros.",
    "Identifica la magnitud, usa un factor de conversión y conserva visibles las unidades.",
    [],
  ),
  GM02: lesson(
    "Perímetro, área y volumen",
    "El perímetro mide el contorno, el área cubre una superficie y el volumen ocupa espacio. Aunque una figura use las mismas medidas, cada pregunta exige una operación y una unidad diferentes. El área de un rectángulo surge de filas por columnas; el volumen de un prisma añade una tercera dimensión. En figuras compuestas, divide en partes conocidas sin superponerlas y suma sus áreas. Revisa siempre si el resultado debe expresarse en unidades lineales, cuadradas o cúbicas.",
    "Ejemplo: un rectángulo de 8 cm por 3 cm tiene perímetro 22 cm y área 24 cm².",
    "Decide qué se está midiendo, representa la figura y usa la unidad dimensional correcta.",
    [],
  ),
  GM03: lesson(
    "Ángulos y triángulos",
    "Un ángulo mide el giro entre dos rayos, no la longitud de sus lados. Los ángulos agudos son menores de 90°, los rectos miden 90° y los obtusos están entre 90° y 180°. En todo triángulo, los tres ángulos interiores suman 180°. Las marcas de igualdad y paralelismo aportan información que debe leerse antes de calcular. Un dibujo puede no estar a escala, por eso la conclusión debe apoyarse en medidas y relaciones, no solo en la apariencia.",
    "Ejemplo: si dos ángulos de un triángulo miden 50° y 60°, el tercero mide 180° − 110° = 70°.",
    "Lee las marcas, identifica la relación angular y comprueba el total correspondiente.",
    [],
  ),
  DP01: lesson(
    "Lectura de tablas y gráficas",
    "Una gráfica no es solo una imagen: representa una relación entre variables. Antes de calcular, lee el título, los ejes, las unidades y la escala. Una barra que parece el doble de alta no necesariamente representa el doble si el eje empieza en un valor distinto de cero. En tablas, identifica qué significa cada fila y columna antes de comparar. Luego formula una afirmación cuantitativa: cuánto aumenta, qué diferencia existe o qué proporción representa. Distingue también entre el valor total y el cambio entre dos valores. La lectura correcta debe poder justificarse señalando los datos exactos utilizados, no solo una impresión visual.",
    "Ejemplo: si una tabla muestra 14 ventas el lunes y 22 el martes, el aumento es 22 − 14 = 8, no 22.",
    "Lee escala y unidades, identifica los datos y calcula exactamente lo que se pregunta.",
    [
      pq("DP01-P1", 1, "Una tabla muestra 18, 24 y 21 puntos. ¿Cuál es la diferencia entre el mayor y el menor?", ["3", "6", "21", "24"], "6", "24 − 18 = 6."),
      pq("DP01-P2", 2, "Una gráfica usa saltos de 5. Una barra llega a la cuarta marca después de cero. ¿Qué valor representa?", ["4", "9", "20", "25"], "20", "Cuatro saltos de 5 representan 20."),
      pq("DP01-P3", 3, "La tabla muestra 30 usuarios el lunes y 45 el martes. ¿Qué afirmación es correcta?", ["Aumentó 15", "Aumentó 30", "Disminuyó 15", "Se duplicó"], "Aumentó 15", "45 − 30 = 15."),
    ],
  ),
  DP02: lesson(
    "Centro y variabilidad",
    "Las medidas de centro resumen dónde se ubican los datos, pero responden preguntas distintas. La media reparte el total por igual y usa todos los valores; la mediana es el valor central después de ordenar; la moda es el valor más frecuente. La variabilidad describe cuánto se separan los datos. El rango se calcula restando el mínimo al máximo. Un valor atípico puede mover mucho la media sin cambiar tanto la mediana, por eso una descripción responsable compara centro, dispersión y forma del conjunto en lugar de informar una sola cifra.",
    "Ejemplo: en 4, 5 y 30, la media es 13, pero la mediana es 5; el 30 arrastra la media hacia arriba.",
    "Ordena los datos, elige la medida adecuada y describe también cuánto varían.",
    [
      pq("DP02-P1", 1, "¿Cuál es la media de 4, 6, 8 y 10?", ["6", "7", "8", "28"], "7", "La suma es 28 y 28 ÷ 4 = 7."),
      pq("DP02-P2", 2, "¿Cuál es la mediana de 3, 7, 9 y 15?", ["7", "8", "9", "8,5"], "8", "Los valores centrales son 7 y 9; su media es 8."),
      pq("DP02-P3", 3, "¿Qué medida suele resistir mejor un valor extremadamente alto?", ["La media", "La mediana", "El máximo", "El rango"], "La mediana", "La posición central cambia menos que el reparto total."),
    ],
  ),
  DP03: lesson(
    "Probabilidad básica",
    "La probabilidad cuantifica qué tan posible es un evento entre 0 y 1. En situaciones con resultados igualmente probables se calcula como casos favorables entre casos posibles. Un evento y su complemento suman 1. La probabilidad experimental usa resultados observados y puede variar en muestras pequeñas; con más ensayos suele acercarse al modelo teórico. En dos etapas independientes, las probabilidades se multiplican. No confundas una racha reciente con una obligación futura: los lanzamientos independientes no recuerdan lo ocurrido antes.",
    "Ejemplo: en un dado común, P(par) = 3/6 = 1/2 y P(no par) también es 1/2.",
    "Define el espacio muestral, cuenta casos favorables y distingue teoría de evidencia experimental.",
    [
      pq("DP03-P1", 1, "Una bolsa tiene 3 fichas rojas y 7 azules. ¿Cuál es P(roja)?", ["3/7", "3/10", "7/10", "10/3"], "3/10", "Hay 3 casos favorables de 10 posibles."),
      pq("DP03-P2", 2, "Si P(lluvia) = 0,35, ¿cuál es P(no lluvia)?", ["0,35", "0,65", "1,35", "0"], "0,65", "1 − 0,35 = 0,65."),
      pq("DP03-P3", 3, "¿Cuál es la probabilidad de obtener cara dos veces con dos monedas justas?", ["1/2", "1/3", "1/4", "2/4"], "1/4", "1/2 × 1/2 = 1/4."),
    ],
  ),
};

function lesson(title, explanation, example, summary, questions) {
  return { title, explanation, example, summary, questions };
}

function pq(id, level, question, options, correctAnswer, explanation) {
  return { id, level, question, options, correctAnswer, explanation };
}
