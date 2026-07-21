// Capa de "IA" de Leo.
//
// Para ahorrar tokens, la IA (Gemini 2.5 Flash) se usa SOLO en las preguntas
// abiertas (pensamiento crítico) y en el reporte semanal de papás. Las pistas
// de las preguntas de selección usan las pistas guionizadas de cada cuento, sin
// llamar a la IA.
//
// La regla de oro nunca cambia: Leo guía con preguntas, NUNCA da la respuesta.

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function callLeo(payload) {
  try {
    const res = await fetch("/api/leo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = (data?.text || "").trim();
    return text || null;
  } catch {
    return null;
  }
}

// Pista para preguntas de selección: SIEMPRE guionizada (no usa IA).
// El pequeño retardo es solo para que se sienta que Leo "piensa" un momento.
export async function getSocraticHint({ question, attempt = 0 }) {
  await wait(350);
  const hints = question?.hints || [];
  if (hints.length === 0) {
    return "Vuelve a leer con calma: la respuesta está escondida en el texto.";
  }
  return hints[Math.min(attempt, hints.length - 1)];
}

// Reporte semanal personalizado (server -> Gemini). Devuelve el texto o null
// si no hay clave / falla (el cliente muestra entonces un resumen local).
export async function getWeeklyReport(summary) {
  try {
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.text || "").trim() || null;
  } catch {
    return null;
  }
}

export async function getCriticReply({
  story,
  question,
  messages = [],
  final = false,
}) {
  const live = await callLeo({
    mode: "critic",
    story: story ? { title: story.title, paragraphs: story.paragraphs } : null,
    question: { prompt: question?.prompt, level: question?.level },
    messages, // [{ role: "kid"|"leo", text }]
    final,
  });
  if (live) return live;

  // ---- respaldo guionizado ----
  await wait(450);
  const replies = question?.replies || [
    "Buena reflexión. Lo importante es que defiendas tu idea con razones.",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
