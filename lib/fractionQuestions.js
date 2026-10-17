const family = (id, label, short) => ({ id, label, short });

export const FRACTION_SKILL_DEFINITIONS = [
  { id: "FR01", title: "Significado de las fracciones", short: "Significado", symbol: "½", description: "Conecta partes, repartos, conjuntos y puntos de la recta.", families: [family("part-whole", "Partes de un todo", "Parte–todo"), family("unit", "Fracciones unitarias", "Unitarias"), family("fraction-line", "Fracciones en la recta", "Recta"), family("quotient", "Fracción como reparto", "Repartos"), family("fraction-set", "Fracción de un conjunto", "Conjuntos"), family("mixed", "Impropias y números mixtos", "Mixtos")] },
  { id: "FR02", title: "Equivalencia y comparación", short: "Equivalencia", symbol: "≡", description: "Reconoce el mismo valor con particiones distintas y compara con evidencia.", families: [family("equivalent", "Fracciones equivalentes", "Equivalentes"), family("simplify", "Simplificación", "Simplificar"), family("compare", "Comparación de dos fracciones", "Comparar"), family("order", "Orden de fracciones", "Ordenar"), family("benchmark", "Referentes 0, 1/2 y 1", "Referentes"), family("missing", "Término desconocido", "Valor faltante")] },
  { id: "FR03", title: "Suma y resta de fracciones", short: "Suma y resta", symbol: "+/−", description: "Reúne o separa partes del mismo tamaño y justifica el denominador común.", families: [family("same-den", "Igual denominador", "Mismo denominador"), family("unlike-add", "Suma con denominadores distintos", "Sumar distintos"), family("unlike-subtract", "Resta con denominadores distintos", "Restar distintos"), family("mixed-add", "Operaciones con números mixtos", "Números mixtos"), family("missing-addend", "Término faltante", "Valor faltante"), family("fraction-problem", "Problemas de suma y resta", "Problemas")] },
  { id: "FR04", title: "Multiplicación de fracciones", short: "Multiplicación", symbol: "×", description: "Interpreta una fracción de otra cantidad mediante escala, área y contexto.", families: [family("whole-times", "Entero por fracción", "Entero × fracción"), family("fraction-of", "Fracción de una cantidad", "Fracción de"), family("fraction-times", "Fracción por fracción", "Fracción × fracción"), family("area-model", "Modelo de área", "Área"), family("product-simplify", "Simplificar productos", "Simplificar"), family("fraction-product-problem", "Problemas multiplicativos", "Problemas")] },
  { id: "FR05", title: "División de fracciones", short: "División", symbol: "÷", description: "Decide cuántos grupos caben o cuánto recibe cada grupo.", families: [family("whole-by-fraction", "Entero entre fracción", "Entero ÷ fracción"), family("fraction-by-whole", "Fracción entre entero", "Fracción ÷ entero"), family("fraction-by-fraction", "Fracción entre fracción", "Fracción ÷ fracción"), family("groups", "Medición por grupos", "Cuántos caben"), family("share", "Reparto en partes iguales", "Repartir"), family("division-check", "Comprobación y errores", "Comprobar")] },
  { id: "FR06", title: "Fracciones y decimales", short: "Fracción–decimal", symbol: "0,5", description: "Cambia de representación sin cambiar el valor ni la magnitud.", families: [family("to-decimal", "Fracción a decimal", "A decimal"), family("to-fraction", "Decimal a fracción", "A fracción"), family("decimal-compare", "Comparar representaciones", "Comparar"), family("decimal-order", "Orden mixto", "Ordenar"), family("decimal-line", "Ubicación en la recta", "Recta"), family("decimal-context", "Dinero y medición", "Contextos")] },
];

// Texto de los pasos 2 y 3 de cada habilidad: qué idea relaciona los datos y cómo comprobar.
const STEP_GUIDE = {
  FR01: { relate: "El denominador dice en cuántas partes iguales se divide la unidad; el numerador, cuántas se toman.", check: "Comprueba con el modelo que la fracción describa la misma cantidad que ves." },
  FR02: { relate: "Multiplica o divide numerador y denominador por el mismo número: cambia la partición, no la cantidad.", check: "Comprueba con productos cruzados o con un denominador común." },
  FR03: { relate: "Solo se suman o restan partes del mismo tamaño: primero iguala los denominadores.", check: "Estima antes de aceptar: el resultado debe ser razonable frente a las fracciones de partida." },
  FR04: { relate: "Multiplica numerador con numerador y denominador con denominador; simplifica si puedes.", check: "Comprueba el tamaño: tomar una fracción menor que 1 de algo da menos que ese algo." },
  FR05: { relate: "Dividir entre una fracción es multiplicar por su recíproco; solo se invierte el divisor.", check: "Comprueba multiplicando: el resultado por el divisor debe devolver el dividendo." },
  FR06: { relate: "Una fracción es una división: numerador entre denominador. Las cifras decimales indican décimas, centésimas o milésimas.", check: "Comprueba que las dos formas marquen el mismo punto en la recta." },
};

const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a, b) => (a * b) / gcd(a, b);
const simp = (n, d) => { const g = gcd(n, d); return [n / g, d / g]; };
const frac = (n, d, simplify = true) => { const [a, b] = simplify ? simp(n, d) : [n, d]; return b === 1 ? `${a}` : `${a}/${b}`; };
const decimal = (value) => Number(value.toFixed(4)).toString().replace(".", ",");
const mixed = (n, d) => { const whole = Math.floor(n / d); const rest = n % d; if (!whole) return frac(rest, d); return rest ? `${whole} ${frac(rest, d)}` : `${whole}`; };
// Muestra la simplificación solo cuando cambia algo: "6/8 = 3/4".
const reduced = (n, d) => { const raw = `${n}/${d}`; const short = frac(n, d); return short === raw ? raw : `${raw} = ${short}`; };
const PLACES = ["", "décimas", "centésimas", "milésimas", "diezmilésimas"];
// "0,75" → "75 centésimas".
const placeValue = (text) => { const digits = text.split(",")[1] || ""; return `${Number(digits)} ${PLACES[digits.length]}`; };
// Cada distractor lleva la idea equivocada concreta que produce ese valor.
const wrong = (value, why) => ({ value, why });

function makeQuestion(skillId, number, familyId, level, title, prompt, hint, answer, distractors, visual, models) {
  const definition = FRACTION_SKILL_DEFINITIONS.find((item) => item.id === skillId);
  const guide = STEP_GUIDE[skillId];
  // Un distractor puede ser una lista de alternativas: se usa la primera que no repite la respuesta ni otra opción.
  const used = new Set([answer]);
  const wrongs = [];
  for (const entry of distractors) {
    const choice = (Array.isArray(entry) ? entry : [entry]).find((candidate) => !used.has(candidate.value));
    if (!choice) continue;
    used.add(choice.value);
    wrongs.push(choice);
  }
  const choices = [{ value: answer, why: null }, ...wrongs];
  const shift = number % choices.length;
  const ordered = [...choices.slice(shift), ...choices.slice(0, shift)];
  return {
    id: `${skillId}-N${level}-${String(number).padStart(2, "0")}`,
    number, skillId, skillLabel: definition.title, family: familyId,
    familyLabel: definition.families.find((item) => item.id === familyId)?.label,
    level, title, prompt, hint, answer, visual,
    options: ordered.map(({ value, why }) => ({ value, feedback: why })),
    success: `${models[2]}. La representación y el cálculo expresan la misma cantidad.`,
    steps: models.map((equation, index) => ({
      eyebrow: `Paso ${index + 1} · ${index === 0 ? "representa" : index === 1 ? "relaciona" : "comprueba"}`,
      title: index === 0 ? "Haz visible la unidad" : index === 1 ? "Opera cantidades comparables" : "Conserva el valor",
      equation,
      text: index === 0 ? hint : index === 1 ? guide.relate : `${guide.check} Resultado: ${answer}.`,
    })),
  };
}

function buildFR01() {
  const result = [];
  const parts = [[3,4],[2,5],[5,6],[3,8]];
  parts.forEach(([n,d], j) => result.push(makeQuestion("FR01", j+1, "part-whole", j<2?1:2, "Leer una parte sombreada", `Una unidad se divide en ${d} partes iguales y se sombrean ${n}. ¿Qué fracción está sombreada?`, "El denominador cuenta todas las partes iguales; el numerador, las seleccionadas.", frac(n,d,false), [
    wrong(frac(d-n,d,false), `Esa es la parte sin sombrear. El numerador cuenta las partes sombreadas: ${n} de ${d}.`),
    wrong(frac(d,n,false), `Invertiste la fracción. Abajo va el total de partes (${d}) y arriba las sombreadas (${n}).`),
    wrong(frac(n,d+1,false), `Contaste una parte de más: la unidad tiene ${d} partes iguales, no ${d+1}. Ese es el denominador.`),
  ], {type:"bar", numerator:n, denominator:d}, [`total de partes = ${d}`, `partes sombreadas = ${n}`, `fracción = ${n}/${d}`])));
  [3,4,6,8].forEach((d,j)=>result.push(makeQuestion("FR01",j+5,"unit",1,"El tamaño de una parte",`Si una unidad se reparte en ${d} partes iguales, ¿qué fracción representa cada parte?`,"Una fracción unitaria tiene numerador uno.",`1/${d}`,[
    wrong(`${d}/1`, `${d}/1 son ${d} unidades completas, no una parte. Cada parte es 1 de ${d}: 1/${d}.`),
    wrong(`1/${d+1}`, `La unidad tiene ${d} partes, no ${d+1}. El denominador dice en cuántas partes iguales se dividió.`),
    wrong(`${d-1}/${d}`, `${d-1}/${d} son todas las partes menos una. Te piden el tamaño de una sola parte.`),
  ],{type:"bar",numerator:1,denominator:d},[`una unidad completa`,`se forman ${d} partes iguales`,`cada parte = 1/${d}`])));
  [[1,4],[3,5],[5,8],[7,6]].forEach(([n,d],j)=>result.push(makeQuestion("FR01",j+9,"fraction-line",j===3?3:2,"Ubicar una fracción",`¿Qué número representa el punto situado en la marca ${n} cuando cada unidad se divide en ${d} partes iguales?`,"Cuenta desde cero usando intervalos del mismo tamaño.",frac(n,d,false),[
    wrong(frac(n+1,d,false), `Contaste también la marca del 0. Cuenta saltos: desde 0 hasta el punto hay ${n===1?"1 salto":`${n} saltos`} de 1/${d}.`),
    wrong(frac(n,d+1,false), `Contaste ${d+1} marcas en la unidad, pero hay ${d} espacios iguales. El denominador cuenta espacios, no marcas.`),
    wrong(frac(d,n,false), `Invertiste los números. Arriba van los saltos desde 0 (${n}) y abajo las partes de cada unidad (${d}).`),
  ],{type:"line",numerator:n,denominator:d},[`cada salto = 1/${d}`,`${n} saltos desde 0`,`coordenada = ${n}/${d}`])));
  [[1,3],[2,5],[3,4],[5,2]].forEach(([items,people],j)=>{const whole=Math.floor(items/people);result.push(makeQuestion("FR01",j+13,"quotient",j<2?1:2,"Repartir sin perder la unidad",`${items} ${items===1?"pizza se reparte":"pizzas se reparten"} por igual entre ${people} personas. ¿Qué cantidad recibe cada una?`,"La fracción también representa una división.",frac(items,people),[
    wrong(frac(people,items), `Dividiste al revés. Lo que se reparte (${items}) va arriba y entre cuántas personas (${people}) va abajo.`),
    wrong(frac(items,items+people), `Sumaste pizzas y personas en el denominador. Solo se divide entre las ${people} personas: ${items} ÷ ${people}.`),
    wrong(`${whole}`, whole ? `Repartiste solo pizzas enteras y sobró ${items%people}. Lo que sobra también se reparte: ${items} ÷ ${people} = ${items}/${people}.` : `Nadie recibe una pizza entera, pero sí una parte: ${items} ÷ ${people} = ${items}/${people} de pizza.`),
  ],{type:"operation",expression:`${items} ÷ ${people}`,stages:[`${items}/${people}`,frac(items,people)]},[`${items} unidades entre ${people}`,`${items} ÷ ${people} = ${items}/${people}`,`cada persona recibe ${frac(items,people)}`]))});
  [[3,8],[5,10],[4,12],[9,15]].forEach(([selected,total],j)=>{const answer=frac(selected,total),rest=total-selected;result.push(makeQuestion("FR01",j+17,"fraction-set",j<2?1:2,"Fracción de un conjunto",`De ${total} fichas, ${selected} son moradas. ¿Qué fracción del conjunto es morada?`,"El conjunto completo es la unidad.",answer,[
    [wrong(frac(rest,total), `Esa es la fracción de fichas que no son moradas. Las moradas son ${selected} de ${total}: ${reduced(selected,total)}.`),
     wrong(`${selected}`, `${selected} es cuántas fichas son moradas. La fracción compara esas ${selected} con el total: ${reduced(selected,total)}.`)],
    wrong(frac(total,selected), `Invertiste la fracción. Arriba van las fichas moradas (${selected}) y abajo el total (${total}).`),
    wrong(frac(selected,rest), `Comparaste moradas con no moradas (${selected} con ${rest}). La fracción compara con el total de ${total} fichas.`),
  ],{type:"set",selected,total},[`total = ${total} fichas`,`seleccionadas = ${selected}`,`${selected}/${total} = ${answer}`]));});
  [[7,3],[9,4],[11,5],[14,6]].forEach(([n,d],j)=>{const whole=Math.floor(n/d),rest=n%d;result.push(makeQuestion("FR01",j+21,"mixed",j<2?2:3,"De impropia a mixta",`Convierte ${n}/${d} en número mixto.`,"Busca cuántas unidades completas contiene la fracción.",mixed(n,d),[
    wrong(`${whole} ${rest}/${n}`, `Pusiste ${n} como denominador del resto. Las partes siguen siendo de 1/${d}: el resto es ${reduced(rest,d)}.`),
    wrong(`${n-d}/${d}`, `Quitaste solo un entero (${d}/${d}). En ${n}/${d} caben ${whole} enteros y el resto es ${rest}/${d}.`),
    wrong(`${whole}`, `Te faltó el resto: ${n} ÷ ${d} da ${whole} enteros y ${rest===1?"sobra 1, que es":`sobran ${rest}, que son`} ${rest}/${d}.`),
  ],{type:"operation",expression:`${n} ÷ ${d}`,stages:[`${whole} enteros`,`residuo ${rest}`]},[`${n} ÷ ${d} = ${whole} y sobra ${rest}`,`resto = ${rest}/${d}`,`${n}/${d} = ${mixed(n,d)}`]))});
  return result;
}

function buildFR02() {
  const result=[];
  [[1,2,3],[2,3,4],[3,5,2],[4,7,3]].forEach(([n,d,k],j)=>result.push(makeQuestion("FR02",j+1,"equivalent",j<2?1:2,"Ampliar sin cambiar",`¿Cuál fracción es equivalente a ${n}/${d} al multiplicar numerador y denominador por ${k}?`,"Multiplica ambas partes por el mismo factor.",`${n*k}/${d*k}`,[
    wrong(`${n*k}/${d}`, `Multiplicaste solo el numerador por ${k}. Para no cambiar el valor, multiplica arriba y abajo por el mismo número.`),
    wrong(`${n}/${d*k}`, `Multiplicaste solo el denominador: las partes se achican y la fracción cambia. Multiplica los dos por ${k}.`),
    wrong(`${n+k}/${d+k}`, `Sumaste ${k} arriba y abajo. Sumar cambia el valor; para una fracción equivalente hay que multiplicar ambos por ${k}.`),
  ],{type:"compare-bars",fractions:[[n,d],[n*k,d*k]]},[`${n}/${d} × ${k}/${k}`,`${n*k}/${d*k}`,`ambas representan ${n}/${d}`])));
  [[6,8],[12,18],[15,25],[21,28]].forEach(([n,d],j)=>{const answer=frac(n,d);const g=gcd(n,d);result.push(makeQuestion("FR02",j+5,"simplify",j<2?1:2,"Reducir a términos mínimos",`Simplifica ${n}/${d}.`,"Divide numerador y denominador por su máximo factor común.",answer,[
    wrong(`${n/g}/${d}`, `Dividiste solo el numerador entre ${g}. Para no cambiar el valor, divide arriba y abajo por el mismo número.`),
    wrong(`${n}/${d/g}`, `Dividiste solo el denominador entre ${g}. Simplificar es dividir numerador y denominador por el mismo número.`),
    wrong(`${n-g}/${d-g}`, `Restaste ${g} arriba y abajo. Restar cambia el valor; simplificar es dividir ambos entre ${g}.`),
  ],{type:"operation",expression:`${n}/${d} ÷ ${g}/${g}`,stages:[`${n/g}/${d/g}`,answer]},[`factor común = ${g}`,`${n} ÷ ${g} y ${d} ÷ ${g}`,`${n}/${d} = ${answer}`]));});
  [
    [[3,4],[2,3],"A 3/4 le falta 1/4 para el entero y a 2/3 le falta 1/3, que es más. Por eso 3/4 es mayor."],
    [[5,8],[3,4],"Tener números más grandes no hace mayor a la fracción. 3/4 = 6/8, y 6/8 es más que 5/8."],
    [[7,10],[2,5],"Los décimos son más pequeños que los quintos, pero aquí hay 7. Como 2/5 = 4/10, 7/10 es mayor."],
    [[5,6],[8,9],"A 5/6 le falta 1/6 para el entero y a 8/9 solo 1/9, que es menos. Por eso 8/9 es mayor."],
  ].forEach(([a,b,flipWhy],j)=>{const av=a[0]/a[1],bv=b[0]/b[1],answer=av>bv?`${frac(...a)} > ${frac(...b)}`:`${frac(...a)} < ${frac(...b)}`;const left=a[0]*b[1],right=b[0]*a[1];result.push(makeQuestion("FR02",j+9,"compare",j<2?2:3,"Comparar dos fracciones",`Completa correctamente la comparación entre ${frac(...a)} y ${frac(...b)}.`,"Usa productos cruzados o un denominador común.",answer,[
    wrong(answer.replace(">","TEMP").replace("<",">").replace("TEMP","<"), flipWhy),
    wrong(`${frac(...a)} = ${frac(...b)}`, `No son iguales: ${a[0]} × ${b[1]} = ${left} y ${b[0]} × ${a[1]} = ${right}. Si fueran equivalentes, esos productos coincidirían.`),
    wrong("No se puede comparar", `Sí se pueden comparar aunque los denominadores sean distintos: escríbelas con denominador ${lcm(a[1],b[1])} o usa productos cruzados.`),
  ],{type:"compare-bars",fractions:[a,b]},[`${a[0]} × ${b[1]} = ${left}`,`${b[0]} × ${a[1]} = ${right}`,answer]))});
  [[[1,2],[2,3],[3,4]],[[1,3],[3,5],[5,6]],[[2,5],[3,4],[7,10]],[[5,8],[4,5],[2,3]]].forEach((list,j)=>{const sorted=[...list].sort((a,b)=>a[0]/a[1]-b[0]/b[1]);const names=sorted.map(x=>frac(...x));const ordered=names.join(", ");
    const over=(x,l)=>x[1]===l?frac(...x):`${frac(...x)} = ${x[0]*l/x[1]}/${l}`;
    const swap=(i)=>{const p=sorted[i],q=sorted[i+1],l=lcm(p[1],q[1]),swapped=[...names];[swapped[i],swapped[i+1]]=[swapped[i+1],swapped[i]];return wrong(swapped.join(", "),`Ubicaste ${frac(...q)} antes que ${frac(...p)}. Con denominador ${l}: ${over(p,l)} y ${over(q,l)}, así que ${frac(...p)} va primero.`)};
    result.push(makeQuestion("FR02",j+13,"order",j<2?2:3,"Orden ascendente",`Ordena de menor a mayor: ${list.map(x=>frac(...x)).join(", ")}.`,"Compara todas respecto de la misma unidad.",ordered,[
      wrong([...names].reverse().join(", "), `Ordenaste de mayor a menor. De menor a mayor, la más pequeña es ${names[0]} y la más grande, ${names[2]}.`),
      swap(0),
      swap(1),
    ],{type:"multi-bars",fractions:list},["construye valores comparables","ubica de izquierda a derecha",`orden: ${ordered}`]))});
  [[3,8,"menor"],[5,8,"mayor"],[7,12,"mayor"],[4,10,"menor"]].forEach(([n,d,relation],j)=>result.push(makeQuestion("FR02",j+17,"benchmark",j<2?1:2,"Comparar con un medio",`¿${frac(n,d,false)} es mayor o menor que 1/2?`,"Compara el numerador con la mitad del denominador.",`${relation} que 1/2`,[
    wrong(`${relation==="mayor"?"menor":"mayor"} que 1/2`, `La mitad de ${d} es ${d/2}. Como ${n} es ${n>d/2?"mayor":"menor"} que ${d/2}, ${n}/${d} es ${relation} que 1/2.`),
    wrong(`igual a 1/2`, `Para ser igual a 1/2, el numerador tendría que ser la mitad de ${d}, o sea ${d/2}. Aquí es ${n}.`),
    wrong(`mayor que 1`, `Una fracción es mayor que 1 solo si el numerador supera al denominador, y aquí ${n} es menor que ${d}.`),
  ],{type:"compare-bars",fractions:[[n,d],[1,2]]},[`mitad de ${d} = ${d/2}`,`${n} ${n>d/2?">":"<"} ${d/2}`,`${n}/${d} es ${relation} que 1/2`])));
  [[1,3,4],[2,5,3],[3,4,5],[5,6,2]].forEach(([n,d,k],j)=>result.push(makeQuestion("FR02",j+21,"missing",j<2?2:3,"Numerador desconocido",`Completa: ${n}/${d} = ?/${d*k}.`,"El denominador se multiplicó; aplica el mismo factor arriba.",`${n*k}`,[
    wrong(`${n+k}`, `Sumaste ${k} al numerador. El denominador se multiplicó por ${k}, así que el numerador también: ${n} × ${k}.`),
    wrong(`${d*k}`, `Copiaste el denominador. Arriba va ${n} multiplicado por el mismo factor que abajo, ${k}.`),
    wrong(`${n}`, `Dejaste el numerador igual. Si el denominador se multiplica por ${k}, el numerador también debe multiplicarse por ${k}.`),
  ],{type:"operation",expression:`${n}/${d} = ?/${d*k}`,stages:[`factor ${k}`,`${n} × ${k}`]},[`${d} × ${k} = ${d*k}`,`${n} × ${k} = ${n*k}`,`valor faltante = ${n*k}`])));
  return result;
}

function buildFR03(){
  const result=[];
  [[2,5,1],[3,8,2],[5,9,1],[7,12,3]].forEach(([a,d,b],j)=>{const ans=frac(a+b,d);result.push(makeQuestion("FR03",j+1,"same-den",j<2?1:2,"Reunir partes iguales",`Calcula ${a}/${d} + ${b}/${d}.`,"Las partes ya tienen el mismo tamaño.",ans,[
    wrong(frac(a+b,d*2), `Sumaste también los denominadores: ${reduced(a+b,d*2)}. El denominador indica el tamaño de las partes y no cambia: ${reduced(a+b,d)}.`),
    wrong(frac(a*b,d), `Multiplicaste los numeradores (${a} × ${b}). Para reunir partes del mismo tamaño se suman: ${a} + ${b} = ${a+b}.`),
    wrong(frac(a+b,d*d), `Multiplicaste los denominadores (${d} × ${d}). Si las partes ya son del mismo tamaño, el denominador se queda en ${d}.`),
  ],{type:"operation",expression:`${a}/${d} + ${b}/${d}`,stages:[`${a+b}/${d}`,ans]},[`denominador común = ${d}`,`${a} + ${b} = ${a+b}`,`resultado = ${ans}`]))});
  [[1,2,1,3],[2,3,1,4],[3,5,1,2],[5,6,2,9]].forEach(([a,b,c,d],j)=>{const ans=frac(a*d+c*b,b*d);result.push(makeQuestion("FR03",j+5,"unlike-add",j<2?2:3,"Sumar partes distintas",`Calcula ${a}/${b} + ${c}/${d}.`,"Construye un denominador común antes de sumar.",ans,[
    wrong(frac(a+c,b+d), `Sumaste numeradores y denominadores por separado. Las partes son de distinto tamaño: primero escribe ambas con denominador ${b*d}.`),
    wrong(frac(a+c,b*d), `Usaste el denominador ${b*d}, pero no ajustaste los numeradores: ${a}/${b} = ${a*d}/${b*d} y ${c}/${d} = ${c*b}/${b*d}.`),
    wrong(frac(a*d+c*b,b+d), `Los numeradores están bien (${a*d} + ${c*b}), pero el denominador común es ${b*d}, no ${b} + ${d}.`),
  ],{type:"operation",expression:`${a}/${b} + ${c}/${d}`,stages:[`denominador ${b*d}`,`${a*d}/${b*d} + ${c*b}/${b*d}`,ans]},[`denominador común = ${b*d}`,`${a*d} + ${c*b} = ${a*d+c*b}`,`resultado = ${ans}`]))});
  [[3,4,1,6],[5,6,1,4],[7,8,2,3],[11,12,3,8]].forEach(([a,b,c,d],j)=>{const ans=frac(a*d-c*b,b*d);result.push(makeQuestion("FR03",j+9,"unlike-subtract",j<2?2:3,"Restar con denominador común",`Calcula ${a}/${b} − ${c}/${d}.`,"Transforma ambas fracciones en partes del mismo tamaño.",ans,[
    wrong(frac(Math.abs(a-c),Math.abs(b-d)), `Restaste numeradores y denominadores por separado. Con partes de distinto tamaño, primero escribe ambas con denominador ${b*d}.`),
    wrong(frac(a*d-c*b,b+d), `Los numeradores están bien (${a*d} − ${c*b}), pero el denominador común es ${b*d}, no ${b} + ${d}.`),
    [wrong(frac(a-c,b*d), `Usaste el denominador ${b*d}, pero no ajustaste los numeradores: ${a}/${b} = ${a*d}/${b*d} y ${c}/${d} = ${c*b}/${b*d}.`),
     wrong(frac(a*d-c,b*d), `Ajustaste ${a}/${b} a ${a*d}/${b*d}, pero no ${c}/${d}: también hay que escribirla como ${c*b}/${b*d}.`)],
  ],{type:"operation",expression:`${a}/${b} − ${c}/${d}`,stages:[`denominador ${b*d}`,`${a*d}/${b*d} − ${c*b}/${b*d}`,ans]},[`denominador común = ${b*d}`,`${a*d} − ${c*b} = ${a*d-c*b}`,`resultado = ${ans}`]))});
  [[1,1,2,2,1,4],[2,1,3,1,2,3],[3,3,4,1,5,8],[4,1,6,2,2,3]].forEach(([w1,n1,d1,w2,n2,d2],j)=>{const total1=w1+n1/d1,total2=w2+n2/d2,ans=frac(Math.round((total1+total2)*d1*d2),d1*d2);const slip=(w1+n1)*d2+(w2+n2)*d1;result.push(makeQuestion("FR03",j+13,"mixed-add",j<2?2:3,"Sumar números mixtos",`Calcula ${w1} ${n1}/${d1} + ${w2} ${n2}/${d2}.`,"Convierte a impropias o suma enteros y fracciones por separado.",mixed(Math.round((total1+total2)*d1*d2),d1*d2),[
    wrong(`${w1+w2} ${frac(n1+n2,d1+d2)}`, `Sumaste numeradores y denominadores de las fracciones. Para sumar ${n1}/${d1} + ${n2}/${d2} necesitas un denominador común.`),
    wrong(mixed(slip,d1*d2), `Para pasar a impropia, cada entero vale ${d1}/${d1}: ${w1} ${n1}/${d1} = ${w1*d1+n1}/${d1}, no ${w1+n1}/${d1}.`),
    wrong(`${w1+w2}`, `Sumaste solo los enteros. Faltan las fracciones: ${n1}/${d1} + ${n2}/${d2} también forman parte del total.`),
  ],{type:"operation",expression:`${w1} ${n1}/${d1} + ${w2} ${n2}/${d2}`,stages:[frac(w1*d1+n1,d1),frac(w2*d2+n2,d2),ans]},["convierte cada mixto","suma las impropias",`resultado = ${mixed(Math.round((total1+total2)*d1*d2),d1*d2)}`]))});
  [[1,4,3,4],[2,5,4,5],[1,3,5,6],[3,8,7,8]].forEach(([a,b,c,d],j)=>{const target=c/d,start=a/b,ans=frac(Math.round((target-start)*b*d),b*d);result.push(makeQuestion("FR03",j+17,"missing-addend",j<2?2:3,"Sumando desconocido",`Completa: ${a}/${b} + ? = ${c}/${d}.`,"Resta la parte conocida al total.",ans,[
    wrong(frac(a*d+c*b,b*d), `Sumaste ${a}/${b} al total. Para hallar lo que falta, resta la parte conocida: ${c}/${d} − ${a}/${b}.`),
    wrong(frac(c,d), `${c}/${d} es el resultado de la suma, no lo que falta. Lo que falta es ${c}/${d} − ${a}/${b}.`),
    [wrong(frac(c-a,d), `Restaste ${c} − ${a} sin igualar denominadores. Primero escribe ${a}/${b} con denominador ${lcm(b,d)}.`),
     wrong(frac(c-a,b+d), `Restaste bien los numeradores, pero sumaste los denominadores. Las partes siguen siendo de 1/${d}: ${reduced(c-a,d)}.`)],
  ],{type:"operation",expression:`? = ${c}/${d} − ${a}/${b}`,stages:["denominador común",ans,`${a}/${b} + ${ans}`]},[`? = total − parte conocida`,`calcula ${c}/${d} − ${a}/${b}`,`valor faltante = ${ans}`]))});
  [
    { prompt:"De una cinta de 3/4 de metro se cortan 1/6 de metro. ¿Cuánta cinta queda?", a:3,b:4,c:1,d:6,op:"−" },
    { prompt:"En la mañana se recorre 2/5 de una ruta y en la tarde 1/4. ¿Qué fracción de la ruta se recorre en total?", a:2,b:5,c:1,d:4,op:"+" },
    { prompt:"Una jarra contiene 5/6 de litro y se sirven 1/3 de litro. ¿Cuánto queda en la jarra?", a:5,b:6,c:1,d:3,op:"−" },
    { prompt:"El lunes se lee 3/8 de un libro y el martes 5/12. ¿Qué fracción se lee entre los dos días?", a:3,b:8,c:5,d:12,op:"+" },
  ].forEach(({prompt,a,b,c,d,op},j)=>{const subtract=op==="−",ans=subtract?frac(a*d-c*b,b*d):frac(a*d+c*b,b*d);result.push(makeQuestion("FR03",j+21,"fraction-problem",j<2?2:3,"Elegir la operación",prompt,"Decide si la situación reúne cantidades o encuentra lo restante.",ans,[
    wrong(frac(a+c,b+d), `Juntaste numeradores (${a} + ${c}) y denominadores (${b} + ${d}). Así no se opera con fracciones: primero iguala denominadores.`),
    subtract
      ? wrong(frac(a*d+c*b,b*d), `La situación pregunta cuánto queda, así que se resta: ${a}/${b} − ${c}/${d}. Sumar daría más de lo que había.`)
      : wrong(frac(Math.abs(a*d-c*b),b*d), `Calculaste la diferencia, pero la situación junta dos partes: hay que sumar ${a}/${b} + ${c}/${d}.`),
    wrong(frac(subtract?a*d-c*b:a*d+c*b,b+d), `Elegiste bien la operación, pero el denominador común es ${b*d}, no ${b} + ${d}.`),
  ],{type:"operation",expression:`${a}/${b} ${op} ${c}/${d}`,stages:[`operación: ${op}`,"denominador común",ans]},[`traduce con ${op}`,"iguala denominadores",`resultado = ${ans}`]))});
  return result;
}

function buildFR04(){
  const result=[];
  [[3,2,5],[4,3,7],[6,5,8],[9,2,3]].forEach(([whole,n,d],j)=>{const ans=frac(whole*n,d);result.push(makeQuestion("FR04",j+1,"whole-times",j<2?1:2,"Varios grupos fraccionarios",`Calcula ${whole} × ${n}/${d}.`,"Multiplica el entero por el numerador.",ans,[
    wrong(frac(whole+n,d), `Sumaste ${whole} + ${n}. Son ${whole} grupos de ${n}/${d}: se multiplica ${whole} × ${n} y el denominador se mantiene.`),
    wrong(frac(whole*n,d*whole), `Multiplicar arriba y abajo por ${whole} deja la misma fracción, ${n}/${d}. Solo se multiplica el numerador.`),
    wrong(frac(n,d*whole), `Multiplicaste el denominador: así las partes se achican. ${whole} veces ${n}/${d} es más, no menos.`),
  ],{type:"operation",expression:`${whole} × ${n}/${d}`,stages:[`${whole*n}/${d}`,ans]},[`${whole} grupos de ${n}/${d}`,`${whole} × ${n} = ${whole*n}`,`resultado = ${ans}`]))});
  [[1,2,18],[2,3,24],[3,5,40],[5,8,64]].forEach(([n,d,total],j)=>{const ans=`${total*n/d}`,unit=total/d;result.push(makeQuestion("FR04",j+5,"fraction-of",j<2?1:2,"Una fracción de una cantidad",`¿Cuánto es ${n}/${d} de ${total}?`,"Divide la cantidad en tantas partes como indica el denominador.",ans,n===1?[
    wrong(`${total*d}`, `Multiplicaste por ${d} en vez de dividir. 1/${d} de ${total} es repartir ${total} en ${d} partes iguales: ${unit}.`),
    wrong(`${total}`, `${total} es la cantidad completa. 1/${d} de ${total} es solo una de ${d} partes iguales.`),
    wrong(`${total-d}`, `Restaste ${d}. 1/${d} de ${total} no es quitarle ${d}, sino dividirlo en ${d} partes: ${total} ÷ ${d}.`),
  ]:[
    wrong(`${unit}`, `Eso es 1/${d} de ${total}. Te faltó tomar ${n} de esas partes: ${unit} × ${n}.`),
    wrong(`${total*n}`, `Multiplicaste por ${n} pero no dividiste entre ${d}. ${n}/${d} de ${total} es menos que ${total}.`),
    wrong(`${unit+n}`, `Encontraste 1/${d} (${unit}) y luego sumaste ${n}. Hay que tomar ${n} partes: ${unit} × ${n}.`),
  ],{type:"set",selected:total*n/d,total},[`${total} ÷ ${d} = ${unit}`,`${unit} × ${n}`,`${n}/${d} de ${total} = ${ans}`]))});
  [[1,2,3,4],[2,3,3,5],[4,7,7,8],[5,6,9,10]].forEach(([a,b,c,d],j)=>{const ans=frac(a*c,b*d),l=lcm(b,d);result.push(makeQuestion("FR04",j+9,"fraction-times",j<2?2:3,"Una parte de otra parte",`Calcula ${a}/${b} × ${c}/${d}.`,"Multiplica numeradores y denominadores; después simplifica.",ans,[
    wrong(frac(a+c,b+d), `Sumaste numeradores y denominadores. Para multiplicar: ${a} × ${c} arriba y ${b} × ${d} abajo.`),
    [wrong(frac(a*d,b*c), `Multiplicaste en cruz, como en la división. Al multiplicar fracciones va arriba con arriba y abajo con abajo.`),
     wrong(frac((a*l/b)*(c*l/d),l), `Buscaste denominador común como en la suma y lo dejaste igual. Al multiplicar no hace falta: ${a} × ${c} arriba y ${b} × ${d} abajo.`)],
    wrong(frac(a*c,b+d), `Multiplicaste los numeradores, pero sumaste los denominadores. Abajo también se multiplica: ${b} × ${d} = ${b*d}.`),
  ],{type:"area",fractions:[[a,b],[c,d]]},[`${a} × ${c} = ${a*c}`,`${b} × ${d} = ${b*d}`,`${a*c}/${b*d} = ${ans}`]))});
  [[1,3,2,5],[3,4,2,3],[5,6,3,5],[7,8,4,7]].forEach(([a,b,c,d],j)=>{const ans=frac(a*c,b*d);result.push(makeQuestion("FR04",j+13,"area-model",j<2?2:3,"Superposición de áreas",`Un rectángulo sombrea ${a}/${b} en una dirección y ${c}/${d} en la otra. ¿Qué fracción queda superpuesta?`,"La intersección representa el producto.",ans,[
    wrong(frac(a+c,b+d), `Sumaste las dos fracciones término a término. La zona superpuesta es una parte de otra parte: ${a}/${b} × ${c}/${d}.`),
    wrong(frac(a*c,b+d), `Contaste bien las casillas superpuestas (${a*c}), pero el rectángulo tiene ${b} × ${d} = ${b*d} casillas, no ${b+d}.`),
    wrong(frac(a+c,b*d), `Sumaste filas y columnas sombreadas (${a} + ${c}). Las casillas que se cruzan forman un rectángulo de ${a} × ${c} = ${a*c}.`),
  ],{type:"area",fractions:[[a,b],[c,d]]},[`${b} × ${d} partes pequeñas`,`${a} × ${c} superpuestas`, `área = ${ans}`]))});
  [[6,8,2,3],[9,10,5,6],[14,15,3,7],[8,21,7,16]].forEach(([a,b,c,d],j)=>{const ans=frac(a*c,b*d);result.push(makeQuestion("FR04",j+17,"product-simplify",j<2?2:3,"Simplificar antes de multiplicar",`Calcula y simplifica ${a}/${b} × ${c}/${d}.`,"Busca factores que se cancelen entre numeradores y denominadores.",ans,[
    wrong(frac(a*c,b+d), `Los numeradores se multiplicaron bien, pero sumaste los denominadores. Abajo también se multiplica: ${b} × ${d}.`),
    wrong(frac(a+c,b*d), `Sumaste los numeradores (${a} + ${c}). Al multiplicar fracciones, arriba también se multiplica: ${a} × ${c}.`),
    wrong(frac(a*d,b*c), `Multiplicaste en cruz, como si fuera una división. Al multiplicar va arriba con arriba y abajo con abajo.`),
  ],{type:"operation",expression:`${a}/${b} × ${c}/${d}`,stages:["cancela factores comunes",`${a*c}/${b*d}`,ans]},["simplifica en cruz",`producto = ${a*c}/${b*d}`,`forma mínima = ${ans}`]))});
  [["Una receta",3,4,2],["Un terreno",2,5,3],["Una botella",5,6,4],["Un camino",7,8,3]].forEach(([context,n,d,factor],j)=>{const ans=frac(n*factor,d);result.push(makeQuestion("FR04",j+21,"fraction-product-problem",j<2?2:3,"Escalar una cantidad",`${context} usa ${n}/${d} de unidad por grupo. ¿Cuánto se usa en ${factor} grupos?`,"La misma cantidad se repite varias veces.",ans,[
    wrong(frac(n+factor,d), `Sumaste ${factor} al numerador. Son ${factor} grupos iguales de ${n}/${d}: se multiplica ${factor} × ${n}/${d}.`),
    wrong(frac(n,d*factor), `Dividiste entre ${factor}, como si repartieras. Con ${factor} grupos se usa más, no menos: ${factor} × ${n}/${d}.`),
    wrong(frac(n*factor,d*factor), `Multiplicar arriba y abajo por ${factor} deja ${n}/${d}, que es lo de un solo grupo. Solo se multiplica el numerador.`),
  ],{type:"operation",expression:`${factor} × ${n}/${d}`,stages:[`${factor} grupos`,`${factor*n}/${d}`,ans]},[`modelo = ${factor} × ${n}/${d}`,"multiplica y simplifica",`total = ${ans}`]))});
  return result;
}

function buildFR05(){
  const result=[];
  [[2,1,2],[3,1,3],[4,2,5],[5,5,8]].forEach(([whole,n,d],j)=>{const ans=frac(whole*d,n);result.push(makeQuestion("FR05",j+1,"whole-by-fraction",j<2?1:2,"Cuántas fracciones caben",`¿Cuánto es ${whole} ÷ ${n}/${d}?`,"Pregunta cuántos grupos de esa fracción caben en el entero.",ans,[
    wrong(frac(whole*n,d), `Multiplicaste ${whole} × ${n}/${d}. Dividir pregunta cuántos ${n}/${d} caben en ${whole}: ${whole} × ${d}/${n}.`),
    wrong(frac(n,whole*d), `Dividiste al revés: ${n}/${d} ÷ ${whole}. Como ${n}/${d} es menor que 1, en ${whole} caben más de ${whole}.`),
    [wrong(`${whole*d}`, `Contaste cuántos 1/${d} caben (${whole*d}), pero cada grupo tiene ${n} de esas partes: ${whole*d} ÷ ${n}.`),
     wrong(`${d}`, `En un entero caben ${d} grupos de 1/${d}, pero hay ${whole} enteros: ${whole} × ${d}.`)],
  ],{type:"operation",expression:`${whole} ÷ ${n}/${d}`,stages:[`recíproco ${d}/${n}`,`${whole} × ${d}/${n}`,ans]},["convierte la división en medición","multiplica por el recíproco",`resultado = ${ans}`]))});
  [[3,4,2],[5,6,3],[7,8,4],[9,10,5]].forEach(([n,d,whole],j)=>{const ans=frac(n,d*whole);result.push(makeQuestion("FR05",j+5,"fraction-by-whole",j<2?1:2,"Repartir una fracción",`Calcula ${n}/${d} ÷ ${whole}.`,"Repartir en más grupos produce partes más pequeñas.",ans,[
    wrong(frac(n*whole,d), `Multiplicaste por ${whole} en vez de dividir. Repartir ${n}/${d} en ${whole} partes da algo menor que ${n}/${d}.`),
    wrong(frac(n,d+whole), `Sumaste ${whole} al denominador. Repartir entre ${whole} multiplica el denominador: ${d} × ${whole} = ${d*whole}.`),
    wrong(frac(whole*n,d*whole), `Multiplicaste arriba y abajo por ${whole}: eso deja ${n}/${d} igual. Para repartir, multiplica solo el denominador.`),
  ],{type:"operation",expression:`${n}/${d} ÷ ${whole}`,stages:[`${n}/${d} × 1/${whole}`,`${n}/${d*whole}`,ans]},["cada grupo recibe una parte","multiplica por 1 sobre el entero",`resultado = ${ans}`]))});
  [[3,4,1,2],[2,3,4,5],[5,6,5,12],[7,8,14,15]].forEach(([a,b,c,d],j)=>{const ans=frac(a*d,b*c);result.push(makeQuestion("FR05",j+9,"fraction-by-fraction",j<2?2:3,"Dividir dos fracciones",`Calcula ${a}/${b} ÷ ${c}/${d}.`,"Conserva la primera fracción y multiplica por el recíproco de la segunda.",ans,[
    wrong(frac(a*c,b*d), `Multiplicaste sin invertir. Para dividir, multiplica ${a}/${b} por el recíproco de ${c}/${d}, que es ${d}/${c}.`),
    wrong(frac(a*d,b+c), `El numerador va bien (${a} × ${d}), pero abajo se multiplica: ${b} × ${c} = ${b*c}, no ${b} + ${c}.`),
    wrong(frac(c*b,d*a), `Invertiste la primera fracción en lugar de la segunda. Solo se invierte el divisor: ${a}/${b} × ${d}/${c}.`),
  ],{type:"operation",expression:`${a}/${b} ÷ ${c}/${d}`,stages:[`recíproco ${d}/${c}`,`${a}/${b} × ${d}/${c}`,ans]},["invierte solo el divisor","multiplica numeradores y denominadores",`resultado = ${ans}`]))});
  [[2,1,4],[3,3,8],[4,2,3],[5,5,6]].forEach(([total,n,d],j)=>{const ans=frac(total*d,n);result.push(makeQuestion("FR05",j+13,"groups",j<2?2:3,"Medir cuántos grupos",`Hay ${total} unidades. ¿Cuántos grupos de ${n}/${d} caben?`,"La pregunta busca cantidad de grupos, no tamaño de cada grupo.",ans,[
    wrong(frac(total*n,d), `Calculaste ${n}/${d} de ${total}. La pregunta es cuántos grupos de ${n}/${d} caben: ${total} ÷ ${n}/${d}.`),
    wrong(frac(n,total*d), `Dividiste al revés: ${n}/${d} ÷ ${total}. Se divide el total entre el tamaño de cada grupo.`),
    [wrong(`${total*d}`, `Contaste cuántos 1/${d} caben (${total*d}), pero cada grupo tiene ${n} de esas partes: ${total*d} ÷ ${n}.`),
     wrong(`${d}`, `En una unidad caben ${d} grupos de 1/${d}, pero hay ${total} unidades: ${total} × ${d}.`)],
  ],{type:"operation",expression:`${total} ÷ ${n}/${d}`,stages:[`tamaño de grupo ${n}/${d}`,`multiplica por ${d}/${n}`,ans]},["identifica el tamaño de cada grupo","divide el total por ese tamaño",`caben ${ans} grupos`]))});
  [[3,4,2],[5,6,4],[7,8,3],[11,12,5]].forEach(([n,d,people],j)=>{const ans=frac(n,d*people);result.push(makeQuestion("FR05",j+17,"share",j<2?2:3,"Repartir entre personas",`${n}/${d} de litro se reparte por igual entre ${people} personas. ¿Cuánto recibe cada una?`,"Divide la cantidad total entre el número de personas.",ans,[
    wrong(frac(n*people,d), `Multiplicaste por ${people}. Al repartir entre ${people} personas, cada una recibe menos de ${n}/${d}.`),
    wrong(frac(n,d+people), `Sumaste ${people} al denominador. Repartir entre ${people} multiplica el denominador: ${d} × ${people} = ${d*people}.`),
    wrong(frac(n,d), `${n}/${d} de litro es el total. Repartido entre ${people}, cada persona recibe una parte más pequeña.`),
  ],{type:"operation",expression:`${n}/${d} ÷ ${people}`,stages:[`× 1/${people}`,`${n}/${d*people}`,ans]},["total entre personas","multiplica por la fracción unitaria",`cada una recibe ${ans}`]))});
  [
    ["2 ÷ 1/4 = 1/2","8",[
      ["1/2","Eso es 2 × 1/4. Dividir entre 1/4 pregunta cuántos cuartos caben en 2: 4 en cada entero, 8 en total."],
      ["1/8","Calculaste 1/4 ÷ 2. La pregunta es cuántos 1/4 caben en 2, y caben más de 2."],
      ["4","En un entero caben 4 cuartos, pero aquí hay 2 enteros: 2 × 4 = 8."],
    ]],
    ["3/5 ÷ 2 = 6/5","3/10",[
      ["6/5","Eso es 3/5 × 2. Repartir 3/5 en 2 partes da menos que 3/5: 3/5 × 1/2 = 3/10."],
      ["3/7","Sumaste 2 al denominador. Dividir entre 2 multiplica el denominador: 5 × 2 = 10."],
      ["10/3","Calculaste 2 ÷ 3/5. El orden importa: aquí 3/5 se reparte en 2 partes iguales."],
    ]],
    ["2/3 ÷ 4/5 = 8/15","5/6",[
      ["8/15","Eso es 2/3 × 4/5. Para dividir se invierte el divisor: 2/3 × 5/4 = 10/12 = 5/6."],
      ["6/5","Invertiste la primera fracción. Solo se invierte el divisor, 4/5: 2/3 × 5/4."],
      ["15/8","Invertiste las dos fracciones. Solo se invierte el divisor: 2/3 × 5/4."],
    ]],
    ["5/6 ÷ 5/12 = 25/72","2",[
      ["25/72","Eso es 5/6 × 5/12. Dividir es multiplicar por el recíproco: 5/6 × 12/5 = 60/30 = 2."],
      ["1/2","Dividiste al revés: 5/12 ÷ 5/6. La pregunta es cuántas veces cabe 5/12 en 5/6: 2 veces."],
      ["1","Dividiste solo los numeradores (5 ÷ 5). Como 5/6 = 10/12, la fracción 5/12 cabe 2 veces."],
    ]],
  ].forEach(([claim,answer,errors],j)=>result.push(makeQuestion("FR05",j+21,"division-check",j<2?2:3,"Detectar una división incorrecta",`Se afirmó que ${claim}. ¿Cuál es el resultado correcto?`,"Comprueba multiplicando el cociente por el divisor.",answer,errors.map(([value,why])=>wrong(value,why)),{type:"error",claim,check:"multiplica por el recíproco y verifica"},["identifica el divisor","usa su recíproco",`resultado correcto = ${answer}`])));
  return result;
}

function buildFR06(){
  const result=[];
  [[1,2],[3,4],[2,5],[7,8]].forEach(([n,d],j)=>{const ans=decimal(n/d),extra=decimal(n/(d*10));result.push(makeQuestion("FR06",j+1,"to-decimal",j<2?1:2,"Convertir a decimal",`¿Qué decimal equivale a ${n}/${d}?`,"Divide el numerador entre el denominador.",ans,[
    wrong(decimal(d/n), `Dividiste ${d} entre ${n}. ${n}/${d} es ${n} ÷ ${d}, y como ${n} es menor que ${d}, da menos de 1.`),
    wrong(`0,${d}`, `0,${d} son ${d} décimas, no ${n}/${d}. Para convertir, divide el numerador entre el denominador: ${n} ÷ ${d}.`),
    wrong(extra, `Agregaste un cero de más. ${n}/${d} son ${placeValue(ans)} (${ans}), no ${placeValue(extra)}.`),
  ],{type:"decimal",value:n/d,label:`${n}/${d}`},[`${n} ÷ ${d}`,`cociente = ${ans}`,`${n}/${d} = ${ans}`]))});
  [
    [0.3,3,10,["1/3","0,3 son 3 décimas: 3/10. La fracción 1/3 es otra cantidad, un poco mayor: 0,333…"]],
    [0.45,45,100,["4/5","Usaste las cifras 4 y 5 como numerador y denominador. 0,45 son 45 centésimas: 45/100 = 9/20."]],
    [0.625,625,1000,["8/5","Invertiste la fracción. 0,625 es menor que 1, así que el numerador debe ser menor que el denominador."]],
    [1.25,125,100,["1/4","1/4 es solo la parte decimal, 0,25. Falta el entero: 1,25 = 125/100 = 5/4."]],
  ].forEach(([value,n,d,[slipValue,slipWhy]],j)=>{const ans=frac(n,d),places=`${d}`.length-1,digits=places===1?"una cifra decimal":`${places} cifras decimales`;result.push(makeQuestion("FR06",j+5,"to-fraction",j<2?1:2,"Escribir decimal como fracción",`Convierte ${decimal(value)} en una fracción simplificada.`,"Usa 10, 100 o 1.000 según la cantidad de cifras decimales.",ans,[
    wrong(frac(n,d*10), `Pusiste un cero de más: ${n}/${d*10}. Con ${digits}, ${decimal(value)} se escribe sobre ${d}: ${n}/${d}.`),
    wrong(frac(n,d/10), `Te faltó un cero: con ${digits}, ${decimal(value)} es ${n}/${d}, no ${n}/${d/10}.`),
    wrong(slipValue, slipWhy),
  ],{type:"decimal",value,label:decimal(value)},[`${decimal(value)} = ${n}/${d}`,"simplifica numerador y denominador",`forma mínima = ${ans}`]))});
  [[[1,2],0.45],[[3,4],0.8],[[2,5],0.35],[[7,8],0.82]].forEach(([f,v],j)=>{const fv=f[0]/f[1],sign=fv>v?">":"<",name=frac(...f),ans=`${name} ${sign} ${decimal(v)}`;result.push(makeQuestion("FR06",j+9,"decimal-compare",j<2?2:3,"Comparar formatos distintos",`Completa la comparación entre ${name} y ${decimal(v)}.`,"Convierte ambos a la misma representación.",ans,[
    wrong(ans.replace(">","TEMP").replace("<",">").replace("TEMP","<"), `${name} = ${decimal(fv)}. Compara cifra por cifra desde las décimas, no por cuántas cifras tiene: ${decimal(fv)} ${sign} ${decimal(v)}.`),
    wrong(`${name} = ${decimal(v)}`, `No son iguales: ${name} = ${decimal(fv)}, que es distinto de ${decimal(v)}.`),
    wrong("No se puede comparar", `Sí se puede: escribe ${name} como decimal (${decimal(fv)}) y compáralo con ${decimal(v)}.`),
  ],{type:"compare-mixed",fraction:f,decimal:v},[`${name} = ${decimal(fv)}`,`${decimal(fv)} ${sign} ${decimal(v)}`,ans]))});
  [[[1,2],0.25,[3,4]],[[2,5],0.6,[4,5]],[[1,8],0.5,[7,8]],[[3,10],0.35,[2,5]]].forEach((list,j)=>{const vals=[{s:frac(...list[0]),v:list[0][0]/list[0][1]},{s:decimal(list[1]),v:list[1]},{s:frac(...list[2]),v:list[2][0]/list[2][1]}];// Punto y coma entre elementos: la coma ya es el separador decimal.
const ans=vals.sort((a,b)=>a.v-b.v).map(x=>x.s).join("; ");
    const label=(x)=>x.s.includes("/")?`${x.s} = ${decimal(x.v)}`:x.s;
    const swap=(i)=>{const p=vals[i],q=vals[i+1],names=vals.map(x=>x.s);[names[i],names[i+1]]=[names[i+1],names[i]];return wrong(names.join("; "),`Ubicaste ${q.s} antes que ${p.s}, pero ${label(p)} es menor que ${label(q)}.`)};
    result.push(makeQuestion("FR06",j+13,"decimal-order",j<2?2:3,"Orden mixto",`Ordena de menor a mayor: ${frac(...list[0])}; ${decimal(list[1])}; ${frac(...list[2])}.`,"Convierte temporalmente a decimales comparables.",ans,[
      wrong(ans.split("; ").reverse().join("; "), `Ordenaste de mayor a menor. De menor a mayor va primero ${vals[0].s} y al final ${vals[2].s}.`),
      swap(0),
      swap(1),
    ],{type:"multi-mixed",values:vals},["convierte cada cantidad","compara de izquierda a derecha",`orden = ${ans}`]))});
  [[1,4],[3,5],[7,10],[9,8]].forEach(([n,d],j)=>{const ans=decimal(n/d);result.push(makeQuestion("FR06",j+17,"decimal-line",j<2?2:3,"Dos nombres para un punto",`¿Qué decimal corresponde al punto ${n}/${d} en la recta?`,"La coordenada no cambia al cambiar de notación.",ans,[
    wrong(decimal((n+1)/d), `Ese decimal es ${n+1}/${d}, una marca más adelante. El punto ${n}/${d} es ${n} ÷ ${d} = ${ans}.`),
    wrong(decimal(n/(d+1)), `Contaste ${d+1} marcas por unidad, pero hay ${d} espacios iguales: ${n} ÷ ${d} = ${ans}.`),
    wrong(decimal(d/n), `Dividiste ${d} entre ${n}. El punto ${n}/${d} se calcula ${n} ÷ ${d} = ${ans}.`),
  ],{type:"line",numerator:n,denominator:d},[`${n}/${d} = ${n} ÷ ${d}`,`cociente = ${ans}`,`misma coordenada = ${ans}`]))});
  [["metro",3,4],["dólar",1,2],["litro",2,5],["kilogramo",7,10]].forEach(([unit,n,d],j)=>{const ans=decimal(n/d),extra=decimal(n/(d*10));result.push(makeQuestion("FR06",j+21,"decimal-context",j<2?1:2,"Cambiar de representación",`Una medida es ${n}/${d} de ${unit}. ¿Cómo se escribe en decimal?`,"Divide para expresar la misma parte con notación decimal.",ans,[
    wrong(`${n},${d}`, `${n}/${d} no se escribe poniendo una coma entre ${n} y ${d}. Significa ${n} ÷ ${d} = ${ans}.`),
    [wrong(decimal(d/n), `Dividiste ${d} entre ${n}. ${n}/${d} de ${unit} es menos de un ${unit}: ${n} ÷ ${d} = ${ans}.`),
     wrong(`0,${d}`, `0,${d} son ${d} décimas de ${unit}, no ${n}/${d}. Divide ${n} ÷ ${d} = ${ans}.`)],
    wrong(extra, `Agregaste un cero de más: ${n}/${d} de ${unit} son ${placeValue(ans)} (${ans}), no ${placeValue(extra)}.`),
  ],{type:"decimal",value:n/d,label:`${n}/${d} de ${unit}`},[`${n} ÷ ${d}`,`decimal = ${ans}`,`medida = ${ans} de ${unit}`]))});
  return result;
}

export const FRACTION_SKILLS = FRACTION_SKILL_DEFINITIONS.map((definition, index) => ({
  ...definition,
  questions: [buildFR01, buildFR02, buildFR03, buildFR04, buildFR05, buildFR06][index](),
}));

export const FRACTION_QUESTIONS = FRACTION_SKILLS.flatMap((skill) => skill.questions);
