const fam=(id,label,short)=>({id,label,short});
export const RATIO_SKILL_DEFINITIONS=[
  {id:"RP01",title:"Razones y tasas unitarias",short:"Razones y tasas",symbol:"a:b",description:"Compara cantidades en el orden correcto y encuentra cuánto corresponde a una unidad.",families:[fam("ratio-read","Significado y escritura de razones","Leer razones"),fam("unit-rate","Tasa por una unidad","Tasa unitaria"),fam("ratio-table","Tablas de razones","Tablas"),fam("compare-rate","Comparación de tasas","Comparar tasas"),fam("ratio-scale","Escalar una situación","Escalar"),fam("rate-context","Velocidad, precio y rendimiento","Contextos")]},
  {id:"RP02",title:"Razones equivalentes",short:"Equivalencia",symbol:"=",description:"Escala ambos términos por el mismo factor y completa relaciones equivalentes.",families:[fam("scale-up","Ampliar razones","Ampliar"),fam("scale-down","Reducir razones","Reducir"),fam("missing-ratio","Término faltante","Valor faltante"),fam("equivalent-table","Tablas equivalentes","Tablas"),fam("double-line","Rectas numéricas dobles","Recta doble"),fam("equivalent-check","Comprobación de equivalencia","Comprobar")]},
  {id:"RP03",title:"Relaciones proporcionales",short:"Proporcionalidad",symbol:"k",description:"Reconoce una constante, conecta tabla, ecuación y gráfica, y descarta relaciones no proporcionales.",families:[fam("constant","Constante de proporcionalidad","Constante k"),fam("proportional-table","Tablas proporcionales","Tablas"),fam("proportional-equation","Ecuaciones y = kx","Ecuaciones"),fam("proportional-value","Valores desconocidos","Valores"),fam("proportional-graph","Lectura de gráficas","Gráficas"),fam("not-proportional","Relaciones no proporcionales","No proporcional")]},
  {id:"RP04",title:"Fracción, decimal y porcentaje",short:"Tres representaciones",symbol:"%",description:"Cambia entre fracción, decimal y porcentaje sin alterar el valor.",families:[fam("percent-from-fraction","Fracción a porcentaje","Fracción → %"),fam("percent-from-decimal","Decimal a porcentaje","Decimal → %"),fam("percent-to-fraction","Porcentaje a fracción","% → fracción"),fam("percent-compare","Comparar representaciones","Comparar"),fam("percent-order","Orden mixto","Ordenar"),fam("percent-grid","Cuadrículas de cien","Modelo de 100")]},
  {id:"RP05",title:"Aplicaciones de porcentajes",short:"Aplicar porcentajes",symbol:"% de",description:"Calcula partes, porcentajes, totales y cambios porcentuales en situaciones reales.",families:[fam("percent-of","Porcentaje de una cantidad","Calcular parte"),fam("find-percent","Qué porcentaje representa","Encontrar %"),fam("find-whole","Encontrar el total","Encontrar total"),fam("percent-change","Aumentos y disminuciones","Cambios"),fam("discount-tax","Descuentos e impuestos","Precio final"),fam("percent-error","Estimación y análisis de errores","Comprobar")]},
];

// Texto de los pasos 2 y 3 y cierre del acierto para cada habilidad.
const STEP_GUIDE={
  RP01:{relate:"Divide para llegar a una unidad o multiplica las dos cantidades por el mismo número.",check:"Lee el resultado con sus unidades y revisa que tenga sentido en la situación.",success:"Cada número conserva su lugar y su unidad."},
  RP02:{relate:"Multiplica o divide los dos términos por el mismo factor; sumar el mismo número cambia la razón.",check:"Comprueba con productos cruzados que la razón se conserve.",success:"El mismo factor o los productos cruzados lo confirman."},
  RP03:{relate:"En una relación proporcional y/x da siempre la misma constante k y la gráfica pasa por (0,0).",check:"Comprueba que y/x sea constante y que con x = 0 resulte y = 0.",success:"La constante y/x y el origen confirman la conclusión."},
  RP04:{relate:"Fracción, decimal y porcentaje nombran el mismo valor; porcentaje significa «de cada 100».",check:"Comprueba que cada forma represente la misma parte de una cuadrícula de 100.",success:"Pasar todo a la misma forma deja ver el valor real."},
  RP05:{relate:"Identifica la parte, el porcentaje y el total antes de operar.",check:"Estima: el 50% es la mitad y el 10% es dividir entre 10.",success:"La parte, el porcentaje y el total quedaron en su lugar."},
};

const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const frac=(n,d)=>{const g=gcd(n,d);return d/g===1?`${n/g}`:`${n/g}/${d/g}`};
const dec=v=>Number(v.toFixed(4)).toString().replace(".",",");
// Cada distractor lleva la idea equivocada concreta que produce ese valor.
const wrong=(value,why)=>({value,why});
function q(skillId,number,familyId,level,title,prompt,hint,answer,distractors,visual,models){const skill=RATIO_SKILL_DEFINITIONS.find(s=>s.id===skillId);const guide=STEP_GUIDE[skillId];
  // Un distractor puede ser una lista de alternativas: se usa la primera que no repite la respuesta ni otra opción.
  const used=new Set([answer]),wrongs=[];for(const entry of distractors){const choice=(Array.isArray(entry)?entry:[entry]).find(c=>!used.has(c.value));if(!choice)continue;used.add(choice.value);wrongs.push(choice)}
  const choices=[{value:answer,why:null},...wrongs];const shift=number%4;const ordered=[...choices.slice(shift),...choices.slice(0,shift)];
  return{id:`${skillId}-N${level}-${String(number).padStart(2,"0")}`,number,skillId,skillLabel:skill.title,family:familyId,familyLabel:skill.families.find(f=>f.id===familyId)?.label,level,title,prompt,hint,answer,visual,options:ordered.map(({value,why})=>({value,feedback:why})),success:`${models[2]}. ${guide.success}`,steps:models.map((equation,index)=>({eyebrow:`Paso ${index+1} · ${index===0?"identifica":index===1?"relaciona":"comprueba"}`,title:index===0?"Distingue las dos cantidades":index===1?"Conserva la razón":"Interpreta el resultado",equation,text:index===0?hint:index===1?guide.relate:`${guide.check} Resultado: ${answer}.`}))}}

function buildRP01(){const r=[];
  [[3,5,"rojas","azules"],[4,7,"niñas","niños"],[2,9,"círculos","triángulos"],[6,11,"libros","revistas"]].forEach(([a,b,x,y],j)=>r.push(q("RP01",j+1,"ratio-read",j<2?1:2,"Escribir en el orden pedido",`Hay ${a} ${x} y ${b} ${y}. ¿Cuál es la razón de ${x} a ${y}?`,"El orden de las palabras decide el orden de los números.",`${a}:${b}`,[
    wrong(`${b}:${a}`,`Escribiste las cantidades al revés. La razón de ${x} a ${y} empieza por ${x}: ${a}:${b}.`),
    wrong(`${a}:${a+b}`,`Comparaste ${x} con el total (${a+b}). La pregunta compara ${x} con ${y}: ${a}:${b}.`),
    wrong(`${a+b}:${b}`,`El primer término es la cantidad de ${x}, ${a}, no el total ${a+b}.`),
  ],{type:"ratio",left:{value:a,label:x},right:{value:b,label:y}},[`primera cantidad = ${a}`,`segunda cantidad = ${b}`,`razón = ${a}:${b}`])));
  [[12,3,"cuadernos","cajas"],[20,5,"kilómetros","horas"],[42,6,"dólares","entradas"],[96,8,"páginas","minutos"]].forEach(([total,units,x,y],j)=>{const one=y.slice(0,-1),per=` ${x} por ${one}`,ans=`${total/units}${per}`;r.push(q("RP01",j+5,"unit-rate",j<2?1:2,"Reducir a una unidad",`${total} ${x} corresponden a ${units} ${y}. ¿Cuál es la tasa por 1 ${one}?`,"Divide ambas cantidades entre el número de unidades.",ans,[
    wrong(`${frac(units,total)}${per}`,`Dividiste ${units} entre ${total}. Para saber cuánto corresponde a 1 ${one}, divide ${total} ÷ ${units}.`),
    wrong(`${total-units}${per}`,`Restaste ${total} − ${units}. Para repartir entre ${units} ${y} se divide: ${total} ÷ ${units}.`),
    wrong(`${total*units}${per}`,`Multiplicaste ${total} × ${units}. En 1 ${one} corresponde menos que en ${units} ${y}: ${total} ÷ ${units}.`),
  ],{type:"operation",expression:`${total} ÷ ${units}`,stages:[`${total/units} por 1`,ans]},[`${units} → 1`,`divide entre ${units}`,`tasa = ${ans}`]))});
  [[2,6,5,15],[3,12,7,28],[4,10,10,25],[5,35,8,56]].forEach(([x1,y1,x2,y2],j)=>r.push(q("RP01",j+9,"ratio-table",j<2?2:3,"Leer una tabla de razón",`La tabla contiene (${x1}, ${y1}) y (${x2}, ${y2}). ¿Cuál es la tasa y por cada x?`,"Divide y entre x en cualquier fila.",dec(y1/x1),[
    wrong(frac(x1,y1),`Dividiste x entre y. La tasa de y por cada x es y ÷ x: ${y1} ÷ ${x1}.`),
    wrong(`${y2-y1}`,`Restaste los valores de y de las dos filas. La tasa sale de una sola fila: ${y1} ÷ ${x1}.`),
    wrong(`${y1-x1}`,`Restaste ${y1} − ${x1}. La tasa dice por cuánto se multiplica x para obtener y: ${y1} ÷ ${x1}.`),
  ],{type:"table",headers:["x","y"],rows:[[x1,y1],[x2,y2]]},[`${y1} ÷ ${x1}`,`${y2} ÷ ${x2}`,`tasa unitaria = ${dec(y1/x1)}`])));
  [[[180,3],[250,5]],[[84,4],[150,6]],[[56,7],[72,8]],[[144,12],[105,7]]].forEach(([a,b],j)=>{const ra=a[0]/a[1],rb=b[0]/b[1],ans=ra>rb?"La primera":"La segunda";const totalsMislead=(a[0]>b[0])!==(ra>rb);r.push(q("RP01",j+13,"compare-rate",j<2?2:3,"Comparar tasas justamente",`Una opción produce ${a[0]} unidades en ${a[1]} horas y otra ${b[0]} en ${b[1]} horas. ¿Cuál tiene mayor tasa por hora?`,"Compara unidades por una hora, no los totales.",ans,[
    wrong(ans==="La primera"?"La segunda":"La primera",totalsMislead?`Tiene más unidades en total, pero también más horas. Por hora: la primera ${ra} y la segunda ${rb}.`:`Por hora, la primera produce ${a[0]} ÷ ${a[1]} = ${ra} y la segunda ${b[0]} ÷ ${b[1]} = ${rb}.`),
    wrong("Son iguales",`No son iguales: por hora, la primera produce ${ra} y la segunda ${rb}.`),
    wrong("No se puede saber",`Sí se puede: divide cada total entre sus horas y compara las unidades por hora (${ra} y ${rb}).`),
  ],{type:"compare-rates",rates:[a,b]},[`${a[0]} ÷ ${a[1]} = ${ra}`,`${b[0]} ÷ ${b[1]} = ${rb}`,`${ans} tiene mayor tasa`]))});
  [[2,3,4],[3,5,3],[4,7,5],[5,8,6]].forEach(([a,b,k],j)=>r.push(q("RP01",j+17,"ratio-scale",j<2?1:2,"Escalar una mezcla",`Una mezcla usa ${a} tazas de concentrado por ${b} de agua. ¿Cuánta agua corresponde a ${a*k} tazas de concentrado?`,"Si una cantidad se multiplica, la otra debe cambiar por el mismo factor.",`${b*k} tazas`,[
    wrong(`${b+k} tazas`,`Sumaste ${k} al agua. El concentrado se multiplicó por ${k} (${a} → ${a*k}), así que el agua también: ${b} × ${k}.`),
    wrong(`${b+a*k-a} tazas`,`El concentrado aumentó ${a*k-a} tazas y sumaste lo mismo al agua. En una mezcla se multiplica: ${b} × ${k}.`),
    wrong(`${b} tazas`,`Dejaste el agua igual. Si el concentrado se multiplica por ${k}, el agua también, para que la mezcla sepa igual.`),
  ],{type:"double-line",top:[a,a*k],bottom:[b,b*k],labels:["concentrado","agua"]},[`${a} × ${k} = ${a*k}`,`${b} × ${k} = ${b*k}`,`agua = ${b*k} tazas`])));
  [[150,3,"km","h"],[24,6,"dólares","kg"],[360,8,"páginas","días"],[18,4,"L","min"]].forEach(([a,b,u,v],j)=>{const rate=a/b,one=v.replace(/s$/,'');r.push(q("RP01",j+21,"rate-context",j<2?2:3,"Interpretar una tasa",`Una relación muestra ${a} ${u} en ${b} ${v}. ¿Qué valor corresponde a 1 ${one}?`,"Una tasa unitaria siempre expresa cuánto corresponde a uno.",`${dec(rate)} ${u}`,[
    wrong(`${a-b} ${u}`,`Restaste ${a} − ${b}. Para saber cuánto corresponde a 1 ${one}, divide ${a} entre ${b}.`),
    wrong(`${a*b} ${u}`,`Multiplicaste ${a} × ${b}. En 1 ${one} corresponde menos que en ${b} ${v}: ${a} ÷ ${b}.`),
    wrong(`${frac(b,a)} ${u}`,`Dividiste al revés (${b} ÷ ${a}). Hay que repartir ${a} ${u} entre ${b} ${v}: ${a} ÷ ${b}.`),
  ],{type:"ratio",left:{value:a,label:u},right:{value:b,label:v}},[`${a} ÷ ${b}`,`${b} ${v} → 1`, `tasa = ${dec(rate)} ${u}`]))});return r}

function buildRP02(){const r=[];
  [[2,3,4],[3,5,3],[4,7,2],[5,8,5]].forEach(([a,b,k],j)=>r.push(q("RP02",j+1,"scale-up",j<2?1:2,"Multiplicar ambos términos",`Amplía la razón ${a}:${b} por un factor de ${k}.`,"Multiplica los dos términos por el mismo número.",`${a*k}:${b*k}`,[
    wrong(`${a*k}:${b}`,`Multiplicaste solo el primer término. Para ampliar una razón se multiplican los dos por ${k}.`),
    wrong(`${a}:${b*k}`,`Multiplicaste solo el segundo término. Los dos términos deben multiplicarse por ${k}.`),
    wrong(`${a+k}:${b+k}`,`Sumaste ${k} a cada término. Sumar cambia la relación; ampliar es multiplicar ambos por ${k}.`),
  ],{type:"double-line",top:[a,a*k],bottom:[b,b*k],labels:["primera","segunda"]},[`${a} × ${k}`,`${b} × ${k}`,`${a*k}:${b*k}`])));
  [[12,18,6],[20,30,10],[24,36,12],[35,49,7]].forEach(([a,b,k],j)=>r.push(q("RP02",j+5,"scale-down",j<2?1:2,"Reducir sin cambiar",`Reduce la razón ${a}:${b} dividiendo ambos términos entre ${k}.`,"La misma división conserva la relación.",`${a/k}:${b/k}`,[
    wrong(`${a/k}:${b}`,`Dividiste solo el primer término. Para reducir sin cambiar la razón, divide los dos entre ${k}.`),
    wrong(`${a}:${b/k}`,`Dividiste solo el segundo término. Para que la razón no cambie, divide ambos entre ${k}.`),
    wrong(`${a-k}:${b-k}`,`Restaste ${k} a cada término. Restar cambia la relación; reducir es dividir ambos entre ${k}.`),
  ],{type:"operation",expression:`${a}:${b} ÷ ${k}`,stages:[`${a/k}:${b/k}`]},[`${a} ÷ ${k}`,`${b} ÷ ${k}`,`razón reducida = ${a/k}:${b/k}`])));
  [[2,5,15],[3,4,20],[5,8,24],[7,9,45]].forEach(([a,b,target],j)=>{const k=target/b,ans=dec(a*k);r.push(q("RP02",j+9,"missing-ratio",j<2?2:3,"Completar una proporción",`Completa ${a}/${b} = ?/${target}.`,"Encuentra el factor que transforma el denominador.",ans,[
    wrong(`${a+k}`,`Sumaste el factor ${k} en lugar de multiplicar. ${b} × ${k} = ${target}, así que arriba también: ${a} × ${k}.`),
    wrong(`${a+target-b}`,`El denominador aumentó ${target-b} y sumaste lo mismo arriba. Pero ${b} se multiplicó por ${k}: arriba también, ${a} × ${k}.`),
    wrong(`${a*target}`,`Multiplicaste ${a} × ${target} y faltó dividir entre ${b}: ? = ${a} × ${target} ÷ ${b}.`),
  ],{type:"operation",expression:`${a}/${b} = ?/${target}`,stages:[`factor ${k}`,`${a} × ${k}`,ans]},[`${b} × ${k} = ${target}`,`${a} × ${k} = ${ans}`,`valor faltante = ${ans}`]))});
  [[2,6,5,15],[3,9,5,16],[4,10,12,30],[5,8,20,30]].forEach(([a,b,c,d],j)=>{const same=b*c===d*a;r.push(q("RP02",j+13,"equivalent-table",j<2?2:3,"Dos filas equivalentes",`¿La tabla con pares (${a}, ${b}) y (${c}, ${d}) conserva la misma razón?`,"Divide la segunda cantidad entre la primera en ambas filas.",same?"Sí":"No",same?[
    wrong("No",`Las diferencias cambian, pero lo que importa es el cociente: ${b} ÷ ${a} = ${dec(b/a)} y ${d} ÷ ${c} = ${dec(d/c)}.`),
    wrong("Solo la primera fila",`Las dos filas tienen la misma razón: ${b} ÷ ${a} y ${d} ÷ ${c} dan ${dec(b/a)}.`),
    wrong("No hay información suficiente",`Con dos pares basta: divide y entre x en cada fila y compara. Ambas dan ${dec(b/a)}.`),
  ]:[
    wrong("Sí",`Los cocientes no coinciden: ${b} ÷ ${a} = ${dec(b/a)} y ${d} ÷ ${c} = ${dec(d/c)}. Si la razón se conservara, darían lo mismo.`),
    wrong("Sí, porque ambas aumentan",`Que ambas cantidades aumenten no basta: y ÷ x debe dar lo mismo en las dos filas, y aquí da ${dec(b/a)} y ${dec(d/c)}.`),
    wrong("No hay información suficiente",`Con dos pares basta: divide y entre x en cada fila. Dan ${dec(b/a)} y ${dec(d/c)}, que son distintos.`),
  ],{type:"table",headers:["x","y"],rows:[[a,b],[c,d]]},[`${b}/${a} = ${dec(b/a)}`,`${d}/${c} = ${dec(d/c)}`,same?"las tasas son iguales":"las tasas son distintas"]))});
  [[1,4,5],[2,6,4],[3,12,5],[5,15,6]].forEach(([a,b,k],j)=>r.push(q("RP02",j+17,"double-line",j<2?2:3,"Leer dos escalas",`En una recta doble, ${a} ${a===1?"unidad corresponde":"unidades corresponden"} a ${b}. ¿Qué corresponde a ${a*k} unidades?`,"Ambas líneas avanzan con el mismo factor.",`${b*k}`,[
    wrong(`${b+k}`,`Sumaste ${k} abajo. Arriba se multiplicó por ${k} (${a} → ${a*k}), así que abajo también: ${b} × ${k}.`),
    wrong(`${b+a*k-a}`,`Arriba aumentó ${a*k-a} y sumaste lo mismo abajo. En una recta doble ambas escalas se multiplican por ${k}.`),
    wrong(`${b}`,`${b} es lo que corresponde a ${a}. Para ${a*k}, que es ${k} veces más, abajo también hay ${k} veces más.`),
  ],{type:"double-line",top:[a,a*k],bottom:[b,b*k],labels:["cantidad A","cantidad B"]},[`${a} → ${a*k} es ×${k}`,`${b} × ${k}`,`corresponden ${b*k}`])));
  [[[2,3],[8,12]],[[3,5],[9,15]],[[4,7],[12,20]],[[5,6],[20,24]]].forEach(([a,b],j)=>{const eq=a[0]*b[1]===a[1]*b[0],ans=eq?"Son equivalentes":"No son equivalentes";const p1=a[0]*b[1],p2=a[1]*b[0],f=b[0]/a[0];r.push(q("RP02",j+21,"equivalent-check",j<2?2:3,"Producto cruzado",`Compara las razones ${a[0]}:${a[1]} y ${b[0]}:${b[1]}.`,"Los productos cruzados deben coincidir.",ans,[
    wrong(eq?"No son equivalentes":"Son equivalentes",eq?`Los productos cruzados coinciden: ${a[0]} × ${b[1]} = ${p1} y ${a[1]} × ${b[0]} = ${p2}. Por eso son equivalentes.`:`Los productos cruzados no coinciden (${p1} y ${p2}).${Number.isInteger(f)?` Multiplicar ${a[0]}:${a[1]} por ${f} da ${b[0]}:${a[1]*f}, no ${b[0]}:${b[1]}.`:""}`),
    wrong("La primera siempre es mayor",`Tener números más pequeños no la hace mayor ni menor. Los productos cruzados (${p1} y ${p2}) dicen si son equivalentes.`),
    wrong("No se puede saber",`Sí se puede: multiplica en cruz. ${a[0]} × ${b[1]} = ${p1} y ${a[1]} × ${b[0]} = ${p2}.`),
  ],{type:"compare-ratios",ratios:[a,b]},[`${a[0]} × ${b[1]} = ${p1}`,`${a[1]} × ${b[0]} = ${p2}`,ans]))});return r}

function buildRP03(){const r=[];
  [[2,8],[3,15],[4,14],[6,9]].forEach(([x,y],j)=>r.push(q("RP03",j+1,"constant",j<2?1:2,"Encontrar k",`Si y = kx y el par es (${x}, ${y}), ¿cuánto vale k?`,"Divide y entre x.",dec(y/x),[
    wrong(frac(x,y),`Dividiste x entre y. En y = kx, la constante es k = y ÷ x = ${y} ÷ ${x}.`),
    wrong(`${y-x}`,`Restaste ${y} − ${x}. En y = kx, x se multiplica por k; para hallarla, divide ${y} ÷ ${x}.`),
    wrong(`${x*y}`,`Multiplicaste ${x} × ${y}. Si ${y} = k · ${x}, entonces k = ${y} ÷ ${x}.`),
  ],{type:"equation",expression:"y = kx",values:`${y} = k · ${x}`},[`k = y/x`,`k = ${y}/${x}`,`k = ${dec(y/x)}`])));
  [[[1,3],[2,6],[4,12]],[[2,5],[4,10],[6,15]],[[1,4],[2,9],[3,12]],[[3,8],[6,16],[9,24]]].forEach((rows,j)=>{const rates=rows.map(([x,y])=>y/x),ok=rates.every(v=>v===rates[0]),ans=ok?"Sí, es proporcional":"No es proporcional";const k=frac(rows[0][1],rows[0][0]),ratios=rows.map(([x,y])=>`${y}/${x} = ${dec(y/x)}`).join("; ");r.push(q("RP03",j+5,"proportional-table",j<2?2:3,"Auditar una tabla",`¿La tabla ${rows.map(p=>`(${p[0]}, ${p[1]})`).join(", ")} representa una relación proporcional?`,"La razón y/x debe ser constante.",ans,[
    wrong(ok?"No es proporcional":"Sí, es proporcional",ok?`Cada fila da y/x = ${k}. Como la razón es constante, la relación sí es proporcional.`:`Las razones no son iguales: ${ratios}. Basta una fila distinta para que no sea proporcional.`),
    wrong("Solo aumenta",ok?`Que ambas aumenten no basta, pero aquí además y/x es siempre ${k}: por eso es proporcional.`:`Que ambas aumenten no basta: y/x debe ser igual en todas las filas, y aquí cambia.`),
    wrong("No se puede saber",`Sí se puede: divide y entre x en cada fila y revisa si siempre da lo mismo.`),
  ],{type:"table",headers:["x","y"],rows},[`tasas: ${rows.map(([x,y])=>frac(y,x)).join("; ")}`,"compara todas las tasas",ans]))});
  [[3,12],[5,20],[7,14],[9,27]].forEach(([k,target],j)=>{const x=target/k;r.push(q("RP03",j+9,"proportional-equation",j<2?1:2,"Usar y = kx",`La relación es y = ${k}x. ¿Cuánto vale y cuando x = ${x}?`,"Sustituye x y conserva la multiplicación por k.",`${target}`,[
    wrong(`${x+k}`,`Sumaste ${k} + ${x}. En y = ${k}x, el ${k} multiplica a x: ${k} × ${x}.`),
    wrong(`${x}`,`Ese es el valor de x. Falta multiplicarlo por ${k} para obtener y.`),
    wrong(`${k}${x}`,`${k}x significa ${k} por x, no escribir ${k} junto a ${x}. y = ${k} × ${x} = ${target}.`),
  ],{type:"equation",expression:`y = ${k}x`,values:`x = ${x}`},[`x = ${x}`,`y = ${k} × ${x}`,`y = ${target}`]))});
  // Parámetros elegidos para que k y el resultado sean decimales exactos.
  [[4,7,9],[6,9,10],[4,11,10],[8,4,15]].forEach(([x1,y1,x2],j)=>{const k=y1/x1,ans=dec(k*x2);r.push(q("RP03",j+13,"proportional-value",j<2?2:3,"Predecir otro valor",`En una relación proporcional, x = ${x1} corresponde a y = ${y1}. ¿Qué y corresponde a x = ${x2}?`,"Primero encuentra la constante y/x.",ans,[
    wrong(`${y1*x2}`,`Multiplicaste ${y1} × ${x2} y faltó dividir entre ${x1}: y = ${y1} × ${x2} ÷ ${x1}.`),
    wrong(dec(y1+x2-x1),`x aumentó ${x2-x1} y le sumaste lo mismo a y. En una relación proporcional se multiplica: y = ${y1}/${x1} × ${x2}.`),
    wrong(dec(k+x2),`Sumaste k + ${x2}. En y = kx la constante multiplica: ${y1}/${x1} × ${x2}.`),
  ],{type:"double-line",top:[x1,x2],bottom:[y1,ans],labels:["x","y"]},[`k = ${y1}/${x1} = ${dec(k)}`,`y = ${dec(k)} × ${x2}`,`y = ${ans}`]))});
  [
    [2,"pasa por el origen","Pasar por (0,0) es una condición de la proporcionalidad, así que no se puede descartar. Falta confirmar que sea una recta."],
    [4,"forma una línea recta que pasa por el origen","Una recta que pasa por el origen cumple justo las condiciones de una relación proporcional."],
    [3,"no pasa por el origen","Si no pasa por (0,0), con x = 0 hay un valor distinto de 0. Eso descarta la proporcionalidad."],
    [5,"tiene una curva","Una curva no mantiene la misma razón y/x. La gráfica de una relación proporcional siempre es una recta."],
  ].forEach(([k,desc,flipWhy],j)=>{const ok=desc.includes("origen")&&!desc.startsWith("no"),ans=ok?"Puede ser proporcional":"No es proporcional";r.push(q("RP03",j+17,"proportional-graph",j<2?2:3,"Reconocer una gráfica proporcional",`Una gráfica ${desc}. ¿Qué conclusión es correcta?`,"Una relación proporcional forma una recta que atraviesa (0,0).",ans,[
    wrong(ok?"No es proporcional":"Puede ser proporcional",flipWhy),
    wrong("Toda gráfica creciente es proporcional","Crecer no basta: la recta debe pasar por (0,0). Por ejemplo, y = x + 2 crece y no es proporcional."),
    wrong("No se puede analizar","La descripción sí alcanza: una gráfica proporcional es una recta que pasa por (0,0). Revisa esas dos condiciones."),
  ],{type:"graph",proportional:ok,k},["busca una recta","verifica el origen (0,0)",ans]))});
  [["y = 3x + 2","No es proporcional"],["y = 5x","Es proporcional"],["costo = 4x + 10","No es proporcional"],["distancia = 7x","Es proporcional"]].forEach(([expr,ans],j)=>{const fixed=expr.match(/\+ (\d+)/)?.[1],k=Number(expr.match(/= (\d+)x/)[1]);r.push(q("RP03",j+21,"not-proportional",j<2?2:3,"Detectar una cantidad fija",`La relación es ${expr}. ¿Es proporcional?`,"Una cantidad sumada impide que la gráfica pase por el origen.",ans,fixed?[
    wrong("Es proporcional",`El +${fixed} es una cantidad fija: con x = 0 da ${fixed}, no 0. Una relación proporcional tiene la forma y = kx.`),
    wrong("Depende de x",`No depende del valor de x: se decide con la fórmula completa. El +${fixed} hace que no sea proporcional.`),
    wrong("Siempre es proporcional",`No toda fórmula con x es proporcional. Si se suma una cantidad fija, como +${fixed}, deja de serlo.`),
  ]:[
    wrong("No es proporcional",`${expr} tiene la forma y = kx con k = ${k}: no hay cantidad fija y con x = 0 da 0.`),
    wrong("Depende de x",`No depende del valor de x: se decide con la fórmula completa, y ${expr} tiene la forma y = kx.`),
    wrong("Solo si x es un número entero",`Funciona con cualquier x. Si x = 0,5, el resultado es ${dec(k*0.5)} y la razón sigue siendo ${k}.`),
  ],{type:"equation",expression:expr,values:"revisa el término fijo"},["compara con y = kx","busca suma o costo inicial",ans]))});return r}

function buildRP04(){const r=[];
  [[1,2],[1,4],[3,5],[7,10]].forEach(([n,d],j)=>{const ans=`${dec(n*100/d)}%`;r.push(q("RP04",j+1,"percent-from-fraction",j<2?1:2,"De fracción a cien",`Convierte ${n}/${d} en porcentaje.`,"Busca cuántas centésimas representa.",ans,[
    wrong(`${dec(n/d)}%`,`${n}/${d} = ${dec(n/d)}, pero falta multiplicar por 100: ${dec(n/d)} × 100 = ${ans}.`),
    wrong(`${n}%`,`${n}% es ${n} de cada 100, pero ${n}/${d} es ${n} de cada ${d}. Sobre 100 queda ${n*100/d}/100 = ${ans}.`),
    [wrong(`${100/d}%`,`Calculaste 1/${d} = ${100/d}%. Son ${n} partes: ${n} × ${100/d}% = ${ans}.`),
     wrong(`${d*100/n}%`,`Dividiste ${d} entre ${n}. ${n}/${d} es menos que un entero, así que es menos de 100%.`)],
  ],{type:"percent-grid",percent:n/d*100},[`${n} ÷ ${d} = ${dec(n/d)}`,`${dec(n/d)} × 100`,`${n}/${d} = ${ans}`]))});
  [.35,.08,.625,1.2].forEach((v,j)=>{const ans=`${dec(v*100)}%`;r.push(q("RP04",j+5,"percent-from-decimal",j<2?1:2,"Decimal a porcentaje",`Convierte ${dec(v)} en porcentaje.`,"Multiplica el decimal por cien.",ans,[
    wrong(`${dec(v)}%`,`Te faltó multiplicar por 100. Porcentaje es «de cada 100»: ${dec(v)} × 100 = ${ans}.`),
    wrong(`${dec(v*10)}%`,`Multiplicaste por 10. Para pasar a porcentaje se multiplica por 100: ${dec(v)} × 100 = ${ans}.`),
    wrong(`${dec(v*1000)}%`,`Moviste la coma tres lugares, o sea, multiplicaste por 1.000. Para porcentaje son dos lugares: ${dec(v)} × 100 = ${ans}.`),
  ],{type:"percent-grid",percent:Math.min(v*100,100)},[`${dec(v)} × 100`,`${dec(v*100)} de cada 100`,ans]))});
  [25,40,60,75].forEach((p,j)=>{const ans=frac(p,100);r.push(q("RP04",j+9,"percent-to-fraction",j<2?1:2,"Porcentaje a fracción",`Simplifica ${p}% como fracción.`,"Escribe el porcentaje sobre cien y reduce.",ans,[
    wrong(frac(p,10),`Porcentaje significa «de cada 100», no de cada 10: ${p}% = ${p}/100 = ${ans}.`),
    wrong(frac(100,p),`Invertiste la fracción: ${p}% es ${p} sobre 100, no 100 sobre ${p}.`),
    wrong(`1/${p}`,`${p}% significa ${p} de cada 100, no 1 de cada ${p}: ${p}/100 = ${ans}.`),
  ],{type:"percent-grid",percent:p},[`${p}% = ${p}/100`,"simplifica factores comunes",`fracción = ${ans}`]))});
  [[[1,2],45],[[3,4],80],[[2,5],35],[[7,8],82]].forEach(([f,p],j)=>{const fp=f[0]/f[1]*100,sign=fp>p?">":"<",name=frac(...f),ans=`${name} ${sign} ${p}%`;r.push(q("RP04",j+13,"percent-compare",j<2?2:3,"Comparar dos formatos",`Completa la comparación entre ${name} y ${p}%.`,"Convierte ambos a porcentaje.",ans,[
    wrong(ans.replace(">","TEMP").replace("<",">").replace("TEMP","<"),`Convierte primero ${name} a porcentaje: ${name} = ${dec(fp)}%. Como ${dec(fp)}% ${sign} ${p}%, entonces ${ans}.`),
    wrong(`${name} = ${p}%`,`No son iguales: ${name} = ${dec(fp)}%, que no es lo mismo que ${p}%.`),
    wrong(`No se puede comparar`,`Sí se puede: escribe ${name} como porcentaje (${dec(fp)}%) y compáralo con ${p}%.`),
  ],{type:"compare-values",values:[name,`${p}%`]},[`${name} = ${dec(fp)}%`,`${dec(fp)}% ${sign} ${p}%`,ans]))});
  [[[1,4],.4,60],[[1,2],.75,80],[[2,5],.3,50],[[3,4],.7,90]].forEach(([f,d,p],j)=>{const vals=[{s:frac(...f),v:f[0]/f[1]},{s:dec(d),v:d},{s:`${p}%`,v:p/100}].sort((a,b)=>a.v-b.v);
    // Punto y coma entre elementos: la coma ya es el separador decimal.
    const ans=vals.map(v=>v.s).join("; ");
    const label=x=>x.s.endsWith("%")?x.s:`${x.s} = ${dec(x.v*100)}%`;
    const swap=i=>{const lo=vals[i],hi=vals[i+1],names=vals.map(x=>x.s);[names[i],names[i+1]]=[names[i+1],names[i]];return wrong(names.join("; "),`Ubicaste ${hi.s} antes que ${lo.s}, pero ${label(lo)} es menor que ${label(hi)}.`)};
    r.push(q("RP04",j+17,"percent-order",j<2?2:3,"Ordenar tres formatos",`Ordena de menor a mayor: ${frac(...f)}; ${dec(d)}; ${p}%.`,"Convierte temporalmente a decimales o porcentajes.",ans,[
      wrong(ans.split("; ").reverse().join("; "),`Ordenaste de mayor a menor. De menor a mayor va primero ${vals[0].s} y al final ${vals[2].s}.`),
      swap(0),
      swap(1),
    ],{type:"compare-values",values:[frac(...f),dec(d),`${p}%`]},["convierte las tres cantidades","compara su magnitud",`orden = ${ans}`]))});
  [18,32,67,85].forEach((p,j)=>r.push(q("RP04",j+21,"percent-grid",j<2?1:2,"Leer una cuadrícula",`En una cuadrícula de 100 casillas hay ${p} sombreadas. ¿Qué porcentaje representa?`,"Cada casilla equivale a uno por ciento.",`${p}%`,[
    wrong(`${100-p}%`,`Contaste las casillas sin sombrear. Las sombreadas son ${p} de 100: ${p}%.`),
    wrong(`${dec(p/10)}%`,`Cada casilla vale 1%, no 0,1%. ${p} casillas de 100 son ${p}%.`),
    wrong(`0,${p}%`,`0,${p} es la forma decimal. Como porcentaje se multiplica por 100: ${p} casillas de 100 son ${p}%.`),
  ],{type:"percent-grid",percent:p},[`total = 100`,`sombreadas = ${p}`,`porcentaje = ${p}%`])));return r}

function buildRP05(){const r=[];
  [[10,80],[25,60],[30,150],[15,240]].forEach(([p,total],j)=>{const ans=dec(p*total/100);r.push(q("RP05",j+1,"percent-of",j<2?1:2,"Calcular una parte",`¿Cuánto es ${p}% de ${total}?`,"Convierte el porcentaje en decimal y multiplica.",ans,[
    wrong(`${total-p}`,`Restaste ${p} a ${total}. ${p}% no son ${p} unidades: es ${p} de cada 100, o sea ${dec(p/100)} × ${total}.`),
    wrong(`${total*(100-p)/100}`,`Esa es la parte que queda, el ${100-p}%. Te piden el ${p}% de ${total}: ${dec(p/100)} × ${total}.`),
    wrong(`${p*total}`,`Multiplicaste ${p} × ${total} y faltó dividir entre 100, porque ${p}% = ${p}/100.`),
  ],{type:"operation",expression:`${p}% × ${total}`,stages:[`${dec(p/100)} × ${total}`,ans]},[`${p}% = ${dec(p/100)}`,`${dec(p/100)} × ${total}`,`parte = ${ans}`]))});
  [[15,60],[18,45],[35,175],[48,160]].forEach(([part,total],j)=>{const ans=`${dec(part*100/total)}%`;r.push(q("RP05",j+5,"find-percent",j<2?2:3,"Encontrar el porcentaje",`¿Qué porcentaje de ${total} representa ${part}?`,"Divide la parte entre el total y multiplica por cien.",ans,[
    wrong(`${dec(part/total)}%`,`${part} ÷ ${total} = ${dec(part/total)}, pero falta multiplicar por 100 para tener el porcentaje: ${ans}.`),
    wrong(`${total-part}%`,`Restaste ${total} − ${part}. El porcentaje compara la parte con el total: ${part} ÷ ${total} × 100.`),
    wrong(`${part}%`,`${part} es la cantidad, no el porcentaje. Solo coincidirían si el total fuera 100; aquí es ${total}.`),
  ],{type:"operation",expression:`${part} ÷ ${total}`,stages:[dec(part/total),ans]},[`parte/total = ${part}/${total}`,`decimal = ${dec(part/total)}`,`porcentaje = ${ans}`]))});
  [[12,20],[18,30],[45,25],[72,40]].forEach(([part,p],j)=>{const total=part*100/p,ans=dec(total);r.push(q("RP05",j+9,"find-whole",j<2?2:3,"Reconstruir el total",`${part} es el ${p}% de una cantidad. ¿Cuál es el total?`,"Divide la parte entre el porcentaje escrito como decimal.",ans,[
    wrong(dec(part*p/100),`Calculaste el ${p}% de ${part}. Aquí ${part} ya es la parte; el total tiene que ser mayor: ${part} ÷ ${dec(p/100)}.`),
    wrong(dec(part/p),`${dec(part/p)} es el 1% (${part} ÷ ${p}). El total es el 100%: ${dec(part/p)} × 100 = ${ans}.`),
    wrong(`${part*100}`,`Multiplicaste ${part} × 100 y faltó dividir entre ${p}: total = ${part} × 100 ÷ ${p}.`),
  ],{type:"operation",expression:`${part} ÷ ${dec(p/100)}`,stages:[ans,"100%"]},[`${p}% = ${dec(p/100)}`,`${part} ÷ ${dec(p/100)}`,`total = ${ans}`]))});
  [[100,20,"aumenta"],[250,10,"disminuye"],[80,25,"aumenta"],[300,15,"disminuye"]].forEach(([start,p,kind],j)=>{const change=start*p/100,up=kind==="aumenta",final=up?start+change:start-change,ans=`${final}`,factor=up?1+p/100:1-p/100;r.push(q("RP05",j+13,"percent-change",j<2?2:3,"Aplicar un cambio porcentual",`Una cantidad de ${start} ${kind} ${p}%. ¿Cuál es el nuevo valor?`,"Calcula primero el cambio y decide si se suma o se resta.",ans,[
    wrong(`${change}`,`${change} es solo el cambio. Falta ${up?"sumarlo a":"restarlo de"} ${start}: el nuevo valor es ${final}.`),
    wrong(`${up?start-change:start+change}`,`${up?"Restaste":"Sumaste"} el cambio, pero la cantidad ${kind}: ${start} ${up?"+":"−"} ${change} = ${final}.`),
    [wrong(`${up?start+p:start-p}`,`${up?"Sumaste":"Restaste"} ${p} unidades, pero el ${p}% de ${start} es ${change}: ${start} ${up?"+":"−"} ${change} = ${final}.`),
     wrong(dec(factor),`${dec(factor)} es el factor del cambio. Falta multiplicarlo por la cantidad: ${start} × ${dec(factor)} = ${final}.`)],
  ],{type:"change",start,p,kind,final},[`cambio = ${p}% de ${start}`,`cambio = ${change}`,`nuevo valor = ${final}`]))});
  // Precios en miles de pesos para que el contexto sea realista en Colombia.
  const money=x=>`$${dec(x)} mil`;
  [[120,25,"descuento"],[200,19,"impuesto"],[80,15,"descuento"],[350,8,"impuesto"]].forEach(([price,p,kind],j)=>{const change=price*p/100,off=kind==="descuento",final=off?price-change:price+change,ans=money(final);r.push(q("RP05",j+17,"discount-tax",j<2?2:3,"Precio final",`Un producto cuesta ${money(price)} y tiene ${p}% de ${kind}. ¿Cuál es el precio final?`,"Un descuento se resta; un impuesto se suma.",ans,[
    wrong(money(change),`${money(change)} es el ${kind}, no el precio final. Falta ${off?"restarlo de":"sumarlo a"} ${money(price)}.`),
    wrong(money(off?price+change:price-change),`${off?"Sumaste":"Restaste"} el ${kind}, pero un ${kind} se ${off?"resta":"suma"}: ${money(price)} ${off?"−":"+"} ${money(change)} = ${money(final)}.`),
    wrong(money(off?price-p:price+p),`${off?"Restaste":"Sumaste"} ${money(p)}, pero el ${p}% de ${money(price)} es ${money(change)}.`),
  ],{type:"change",start:money(price),p,kind,final:money(final)},[`${p}% de ${money(price)} = ${money(change)}`,`${off?"resta":"suma"} ${money(change)}`,`precio final = ${money(final)}`]))});
  [
    ["20% de 50 = 20","10",[
      ["20","20 es el porcentaje, no el resultado. El 20% de 50 es 0,2 × 50 = 10."],
      ["40","40 es lo que queda, el 80%. El 20% de 50 es 0,2 × 50 = 10."],
      ["2,5","Dividiste 50 entre 20. El 20% es 20 de cada 100: 50 × 20 ÷ 100 = 10."],
    ]],
    ["50% de 30 = 60","15",[
      ["60","60 es el doble de 30. El 50% es la mitad: 30 ÷ 2 = 15."],
      ["50","50 es el porcentaje, no el resultado. El 50% de 30 es la mitad de 30."],
      ["45","Sumaste la mitad a 30, como en un aumento. El 50% de 30 es solo la mitad: 15."],
    ]],
    ["10 es 10% de 50","20%",[
      ["10%","Ese es el porcentaje afirmado. 10 de 50 es 10 ÷ 50 = 0,2, o sea 20%."],
      ["5%","Dividiste 50 entre 10. Se divide la parte entre el total: 10 ÷ 50 = 0,2 = 20%."],
      ["40%","Restaste 50 − 10. El porcentaje compara la parte con el total: 10 ÷ 50 × 100 = 20%."],
    ]],
    ["un descuento de 25% sobre 80 deja 25","60",[
      ["25","25 es el porcentaje, no el precio. El descuento es el 25% de 80, que es 20; quedan 80 − 20 = 60."],
      ["20","20 es el descuento. Lo que queda es 80 − 20 = 60."],
      ["100","Sumaste el descuento. Un descuento se resta: 80 − 20 = 60."],
    ]],
  ].forEach(([claim,answer,errors],j)=>r.push(q("RP05",j+21,"percent-error",j<2?2:3,"Detectar un resultado imposible",`Se afirmó: «${claim}». ¿Cuál es la corrección?`,"Estima: el resultado debe respetar el tamaño del porcentaje.",answer,errors.map(([value,why])=>wrong(value,why)),{type:"error",claim,check:"usa parte = porcentaje × total"},["identifica parte, porcentaje y total","aplica la relación correcta",`corrección = ${answer}`])));return r}

const builders=[buildRP01,buildRP02,buildRP03,buildRP04,buildRP05];
export const RATIO_SKILLS=RATIO_SKILL_DEFINITIONS.map((skill,index)=>({...skill,questions:builders[index]()}));
export const RATIO_QUESTIONS=RATIO_SKILLS.flatMap(skill=>skill.questions);
