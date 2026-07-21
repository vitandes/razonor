# Leo — MVP de comprensión lectora

Entrenador de lectura para niños. Leo (un león) acompaña al niño a leer y
**enseña a pensar con preguntas socráticas — nunca da la respuesta** — y genera
un reporte de progreso compartible para los papás.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

> Nota: usa `next/font/google` (Fredoka + Inter), así que la primera build
> necesita conexión a internet para descargar las fuentes.

## Recorrido de la demo

- `/` — pantalla de inicio: elegir modo niño o papás
- `/aprendo` — mundo del niño: racha, nivel, anillos de comprensión, biblioteca
- `/aprendo/lectura/leon` — **el bucle central**: leer → preguntas → Leo guía
  cuando te equivocas → recompensa
- `/padres` — el reporte compartible (lo que el papá presume en WhatsApp)
- `/planes` — precios (toggle mensual/anual, 50% off en anual)

## Qué está simulado (y dónde conectar lo real)

- **IA socrática** → `lib/ai.js`. Hoy devuelve pistas guionizadas desde
  `lib/data.js`. Reemplaza el cuerpo de `getSocraticHint` / `getCriticReply`
  por una llamada a tu backend (`/api/leo`) que invoque a Claude con un system
  prompt tipo: *"Eres Leo. NUNCA des la respuesta. Haz UNA pregunta que lleve al
  niño a releer el texto."* La key del modelo va en el servidor, nunca en el cliente.
- **Contenido** → `lib/data.js`. Solo el cuento "leon" tiene texto y preguntas;
  los demás aparecen como "Próximamente". Reemplázalo por tu biblioteca curada
  por nivel de grado.
- **Perfil / progreso** → `lib/data.js` (`profile`). Cámbialo por datos reales
  del usuario.
- **Medición del nivel lector** → cada pregunta lleva su nivel
  (`literal` / `inferencial` / `critico`); la app agrega el desempeño por nivel.
  Esa es la base del reporte al papá.
- **Pagos** → los botones son demo. Conecta Nequi / Daviplata / PSE / tienda.

## Stack

Next.js 14 (App Router) · React 18 · Tailwind CSS 3 · sin dependencias pesadas.

## Diseño

- Marca "Leo": león lector (`leo` = *yo leo*).
- Paleta cálida de sabana: miel `#FF9A2E`, uva `#7B5BE0`, turquesa `#2BB3C0`,
  coral `#FF6B6B`, sobre crema (niño) y un tono frío (papás).
- Motivo distintivo: los **anillos de comprensión** (los 3 niveles), que
  aparecen como insignia del niño y como corazón del reporte.
- Tipografía: Fredoka (display) + Inter (cuerpo).
