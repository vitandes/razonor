// Endpoint de servidor de Leo para las PREGUNTAS ABIERTAS (pensamiento crítico).
// Llama a Gemini 2.5 Flash con un prompt socrático. Las pistas de las preguntas
// de selección NO pasan por aquí (son guionizadas) para no gastar tokens.
//
// Activación: define GEMINI_API_KEY en .env.local (nunca en el cliente).
// Sin la clave, responde 503 y el cliente usa las respuestas guionizadas del
// cuento. Opcional: GEMINI_MODEL para cambiar el modelo.

export const runtime = "nodejs";

const DEFAULT_MODEL = "gemini-2.5-flash";

const SYSTEM_CRITIC = `Eres Leo, un león que es tutor de lectura para niños de primaria.
Conversas con el niño sobre una pregunta de pensamiento crítico de un cuento.
Reglas estrictas:
- No hay respuesta correcta: valida que el niño piense y se exprese; nunca lo regañes.
- Como buen tutor, complementa su idea: reconoce lo que dijo y, si hace falta, ayúdalo a afinarla o a verla desde otro ángulo, siempre con calidez.
- Tono cálido. Español neutro de Latinoamérica. Máximo 2 frases. Sin tecnicismos.`;

function storyText(story) {
  if (!story?.paragraphs?.length) return "";
  return `Cuento: "${story.title}"\n${story.paragraphs.join("\n")}`;
}

// Instrucción de sistema para la conversación crítica, con el cuento, la
// pregunta y si es el cierre (último turno).
function criticSystem(body) {
  const ctx = storyText(body.story);
  const closing = body.final
    ? "Este es el CIERRE de la conversación: felicita y valora su idea con calidez en 1-2 frases. NO hagas más preguntas."
    : "Valida y complementa lo que dijo y hazle UNA sola pregunta breve para que profundice o defienda mejor su idea.";
  return `${SYSTEM_CRITIC}\n\nContexto:\n${ctx}\nPregunta crítica: ${body.question?.prompt}\n\n${closing}`;
}

// Convierte el hilo del cliente ([{role:"kid"|"leo", text}]) al formato de Gemini.
function criticContents(messages = []) {
  return messages
    .filter((m) => m?.text)
    .map((m) => ({
      role: m.role === "leo" ? "model" : "user",
      parts: [{ text: m.text }],
    }));
}

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    // Sin clave: el cliente usará el respaldo guionizado.
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Solo atendemos las preguntas abiertas (pensamiento crítico). Las pistas de
  // las preguntas de selección son guionizadas en el cliente (no gastan tokens).
  if (body.mode !== "critic") {
    return Response.json({ error: "unsupported_mode" }, { status: 400 });
  }

  const system = criticSystem(body);
  let contents = criticContents(body.messages);
  if (contents.length === 0) {
    // compatibilidad: si no llegó el hilo, usamos la respuesta suelta
    contents = [{ role: "user", parts: [{ text: body.answer || "" }] }];
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
        system_instruction: { parts: [{ text: system }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          // respuestas cortas para niños: desactivamos el "pensamiento" del 2.5
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });

    if (!r.ok) {
      return Response.json({ error: "upstream" }, { status: 502 });
    }

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
