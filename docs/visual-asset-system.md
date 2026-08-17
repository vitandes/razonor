# Sistema visual reutilizable de Razonor

## Objetivo

Los casos se diseñan con un catálogo compartido. Un capítulo nuevo no debe
crear automáticamente una portada, personajes y objetos propios.

## Presupuesto

- Por capítulo: cero imágenes nuevas por defecto.
- Por mundo de veinte capítulos: una portada y hasta tres objetos especiales.
- Los retos de patrones y razonamiento espacial siempre se generan desde datos.
- Una imagen nueva solo se aprueba si comunica información narrativa que ningún
  asset existente puede representar.

## Catálogo

`lib/visualCatalog.js` contiene:

- cinco temas reutilizables;
- la asignación de capítulos a temas;
- el elenco compartido;
- fallbacks para capítulos futuros.

Los temas disponibles son `mystery`, `vault`, `technology`, `coast` y
`journey`. Para cambiar la ambientación de un capítulo se modifica
`CHAPTER_VISUAL_THEME`; no se toca `CaseSession`.

## Visuales deterministas

`components/case-visuals/GeneratedChallengeVisual.jsx` cubre estas variantes:

| Variante | Cuándo se usa | Representación |
| --- | --- | --- |
| `pattern` | Series numéricas, símbolos o emojis | Fichas ordenadas |
| `grid` | Inicio y movimientos | Cuadrícula con ruta exacta |
| `turn` | Dirección inicial y giros | Brújula antes/después |
| `behind` | Posición respecto a un vehículo | Relación visual directa |
| `relations` | Izquierda, derecha o encima | Cuadrícula de objetos |

Los retos de orden incluyen un bloque de dependencias. Cada regla explica qué
paso solo puede ocurrir después de otro, para que el niño razone la secuencia
sin tener que adivinar una costumbre del autor.

El texto completo de las pistas se conserva en `aria-label`, aunque el visual
sustituya las filas repetidas en pantalla.

## Portadas de capítulo

Cada capítulo compone una portada propia con el escenario de su tema, su emoji,
número y título. La composición diferencia los capítulos sin crear un raster
nuevo para cada uno.

## Personajes

Los nombres de una declaración se asignan de forma estable al elenco compartido.
El mismo nombre recibe siempre la misma imagen. Los casos especiales de los
capítulos 1–4 mantienen sus personajes definidos explícitamente.

## Archivos

- Producción: únicamente WebP dentro de `public/assets`.
- Originales PNG y fuentes SVG: `design-assets/raw`.
- Previsualizaciones: `design-assets/asset-previews`.

## Regla editorial

Al escribir un caso nuevo:

1. Elegir una habilidad y mecánica.
2. Reutilizar uno de los cinco ambientes.
3. Usar personajes y evidencias del catálogo.
4. Describir patrones y posiciones en los campos estructurados existentes.
5. Generar una imagen solo si supera el presupuesto visual y aporta información
   indispensable para resolver el caso.
