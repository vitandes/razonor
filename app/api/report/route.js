// Reporte semanal PERSONALIZADO para los papás, generado con Gemini.
//
// Se llama como mucho una vez por semana (la cadencia la controla el cliente /
// la base de datos), para no gastar tokens. Sin GEMINI_API_KEY responde 503 y
// el cliente muestra un resumen local.

export const runtime = "nodejs";

const DEFAULT_MODEL = "gemini-2.5-flash";

const SYSTEM = `Eres Leo, un león que es tutor de comprensión lectora para niños.
Escribe un reporte semanal para los papás sobre el progreso de su hijo, usando SOLO los datos que te doy (no inventes cifras ni hechos).
Estructura, en 2 o 3 párrafos cortos:
1) Cómo va en general y qué está dominando.
2) En qué nivel de comprensión conviene enfocarse y UN consejo concreto y sencillo para hacer en casa.
3) Una frase de ánimo.
Tono cálido, claro y honesto. Tutea a los papás. Español neutro de Latinoamérica. Sin tecnicismos. No uses títulos ni viñetas; solo párrafos.`;

function userText(summary = {}) {
  const c = summary.comp || {};
  const lines = [
    `Nombre: ${summary.name || "el niño/a"}`,
    `Nivel de lectura: ${summary.readingLevel || "Fácil"}`,
    `Comprensión (0-100): literal ${c.literal ?? 0}, inferencial ${c.inferencial ?? 0}, crítica ${c.critico ?? 0}`,
    `Cuentos leídos en total: ${summary.storiesRead ?? 0}`,
    `Minutos de lectura esta semana: ${summary.weekMinutes ?? 0}`,
    `Días activos esta semana: ${summary.daysActive ?? 0}`,
    `Racha actual: ${summary.streak ?? 0} días`,
    `Nivel de jugador: ${summary.playerLevel ?? 1}`,
  ];
  if (summary.recentTopics?.length) {
    lines.push(`Temas recientes: ${summary.recentTopics.join(", ")}`);
  }
  return `Datos de la semana:\n${lines.join("\n")}\n\nEscribe el reporte para los papás.`;
}

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: userText(body.summary) }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 600,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!r.ok) return Response.json({ error: "upstream" }, { status: 502 });

    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text)
      .filter(Boolean)
      .join(" ")
      .trim();

    if (!text) return Response.json({ error: "empty" }, { status: 502 });
    return Response.json({ text });
  } catch {
    return Response.json({ error: "network" }, { status: 502 });
  }
}
