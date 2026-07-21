"use client";

// Lee el cuento en voz alta y va RESALTANDO lo que suena: el párrafo activo y
// la palabra (estilo karaoke). Apoyo para niños que aún decodifican con
// esfuerzo y repaso guiado para cualquier lector.
//
// Sincronización por plataforma:
//   - Escritorio (Chrome/Edge): onboundary reales -> karaoke exacto.
//   - Android (sin onboundary): el cuento se parte en FRASES y se encolan
//     todas; el onstart real de cada frase RE-ANCLA el resaltado (el desfase
//     nunca pasa de una frase) y con la duración medida de cada frase se
//     CALIBRA la velocidad estimada al TTS del dispositivo.
//   - iOS: su cola se atasca tras el primer utterance e ignora speak() desde
//     callbacks -> un solo utterance con todo el cuento + simulador continuo
//     (sin re-anclas: es lo máximo que iOS permite).
// Otras mañas cubiertas: GC de Chrome mata utterances sin referencia (ref
// vivo) y Chrome escritorio pausa a los ~15s (resume() periódico).

import { useEffect, useRef, useState } from "react";

function pickSpanishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return (
    voices.find((v) => /es[-_](US|MX|419|CO)/i.test(v.lang || "")) ||
    voices.find((v) => (v.lang || "").toLowerCase().startsWith("es")) ||
    null
  );
}

function isIos() {
  const ua = navigator.userAgent || "";
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS moderno se hace pasar por Mac
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

const RATE = 0.92; // un poco más lento: acompaña la lectura
const MIN_WORD_MS = 170;

// Palabras de un texto con posición relativa a un offset dado.
function wordsOf(text, offset = 0) {
  const out = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text))) {
    out.push({ ps: offset + m.index, pe: offset + m.index + m[0].length });
  }
  return out;
}

// Frases de cada párrafo, en orden: [{ text, para, words: [{ps,pe}] }].
// Las posiciones son relativas al PÁRRAFO (para pintar el resaltado).
function buildSentences(paragraphs, fromPara) {
  const chunks = [];
  for (let p = fromPara; p < paragraphs.length; p++) {
    const para = paragraphs[p];
    const re = /[^.!?…]+[.!?…]*\s*/g;
    let m;
    let any = false;
    while ((m = re.exec(para))) {
      const text = m[0].trim();
      if (!text) continue;
      any = true;
      chunks.push({ text, para: p, words: wordsOf(m[0], m.index) });
    }
    if (!any) chunks.push({ text: para, para: p, words: wordsOf(para) });
  }
  return chunks;
}

export default function ReadAloud({ paragraphs }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [para, setPara] = useState(-1); // párrafo que está sonando
  const [range, setRange] = useState(null); // [inicio, fin] dentro del párrafo

  const idxRef = useRef(0); // párrafo donde retomar tras pausar
  const playingRef = useRef(false);
  const uttersRef = useRef([]); // anti-GC (Chrome)
  const keepAliveRef = useRef(null); // anti-pausa ~15s (Chrome escritorio)
  const simRef = useRef(null); // timer del karaoke simulado
  const realBoundariesRef = useRef(false); // ¿el navegador da onboundary?
  // Velocidad estimada del TTS del dispositivo (caracteres por segundo). Se
  // calibra con la duración real de cada frase en Android.
  const charsPerSecRef = useRef(11);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    try {
      window.speechSynthesis?.getVoices?.(); // precarga (llegan async)
    } catch {
      /* sin soporte */
    }
    return () => {
      clearInterval(keepAliveRef.current);
      clearTimeout(simRef.current);
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* nada */
      }
    };
  }, []);

  function stopSimulator() {
    clearTimeout(simRef.current);
    simRef.current = null;
  }

  // Recorre una lista de palabras con duración estimada por su largo.
  function simulateWords(words) {
    stopSimulator();
    let i = 0;
    const step = () => {
      if (!playingRef.current || realBoundariesRef.current || i >= words.length) return;
      const w = words[i];
      setRange([w.ps, w.pe]);
      const dur = Math.max(MIN_WORD_MS, ((w.pe - w.ps + 1) * 1000) / charsPerSecRef.current);
      i += 1;
      simRef.current = setTimeout(step, dur);
    };
    step();
  }

  function finish() {
    playingRef.current = false;
    setPlaying(false);
    setPara(-1);
    setRange(null);
    idxRef.current = 0;
    uttersRef.current = [];
    clearInterval(keepAliveRef.current);
    stopSimulator();
  }

  function startKeepAlive() {
    clearInterval(keepAliveRef.current);
    keepAliveRef.current = setInterval(() => {
      if (playingRef.current) {
        try {
          window.speechSynthesis.resume();
        } catch {
          /* nada */
        }
      }
    }, 10000);
  }

  function baseUtterance(text, voice) {
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "es-US";
    u.rate = RATE;
    return u;
  }

  // ---- Camino Android/escritorio: una frase por utterance, todas en cola ----
  function playChunked(from, voice) {
    const chunks = buildSentences(paragraphs, from);
    const last = chunks.length - 1;
    const utters = chunks.map((chunk, ci) => {
      const u = baseUtterance(chunk.text, voice);
      let startedAt = 0;
      u.onstart = () => {
        startedAt = Date.now();
        idxRef.current = chunk.para;
        setPara(chunk.para);
        // re-ancla el karaoke al inicio REAL de la frase
        if (!realBoundariesRef.current) simulateWords(chunk.words);
      };
      u.onboundary = (e) => {
        if (e.name && e.name !== "word") return;
        realBoundariesRef.current = true; // datos reales: fuera simulador
        stopSimulator();
        // charIndex viene relativo a la frase; las palabras están en
        // coordenadas del párrafo -> se resta el inicio de la frase.
        const ci2 = e.charIndex ?? 0;
        const base = chunk.words[0]?.ps ?? 0;
        const w = chunk.words.find((x) => ci2 < x.pe - base);
        if (w) setRange([w.ps, w.pe]);
      };
      u.onend = () => {
        stopSimulator();
        // calibración: cuánto tardó de verdad esta frase -> ajusta la velocidad
        if (startedAt && !realBoundariesRef.current) {
          const secs = (Date.now() - startedAt) / 1000;
          if (secs > 0.3) {
            const measured = chunk.text.length / secs;
            const blended = charsPerSecRef.current * 0.6 + measured * 0.4;
            charsPerSecRef.current = Math.min(22, Math.max(5, blended));
          }
        }
        if (ci === last && playingRef.current) finish();
      };
      u.onerror = () => {
        stopSimulator();
        if (ci === last && playingRef.current) finish();
      };
      return u;
    });

    uttersRef.current = utters; // vivos mientras suenan (anti-GC)
    utters.forEach((u) => window.speechSynthesis.speak(u));
  }

  // ---- Camino iOS: un solo utterance con todo + simulador continuo ----
  function playSingle(from, voice) {
    let text = "";
    const words = [];
    for (let p = from; p < paragraphs.length; p++) {
      for (const w of wordsOf(paragraphs[p])) words.push({ ...w, para: p });
      text += paragraphs[p] + (p < paragraphs.length - 1 ? "\n\n" : "");
    }
    const u = baseUtterance(text, voice);
    u.onstart = () => {
      let i = 0;
      const step = () => {
        if (!playingRef.current || i >= words.length) return;
        const w = words[i];
        idxRef.current = w.para;
        setPara(w.para);
        setRange([w.ps, w.pe]);
        let dur = Math.max(MIN_WORD_MS, ((w.pe - w.ps + 1) * 1000) / charsPerSecRef.current);
        const next = words[i + 1];
        if (next && next.para !== w.para) dur += 350; // respiro entre párrafos
        i += 1;
        simRef.current = setTimeout(step, dur);
      };
      step();
    };
    u.onend = () => {
      if (playingRef.current) finish();
    };
    u.onerror = () => {
      if (playingRef.current) finish();
    };
    uttersRef.current = [u];
    window.speechSynthesis.speak(u);
  }

  function play() {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel(); // limpia cualquier cola previa
    } catch {
      /* nada */
    }
    playingRef.current = true;
    setPlaying(true);
    startKeepAlive();

    const from = idxRef.current >= paragraphs.length ? 0 : idxRef.current;
    setPara(from);
    setRange(null);
    const voice = pickSpanishVoice();

    if (isIos()) playSingle(from, voice);
    else playChunked(from, voice);
  }

  // Pausa = cancelar recordando el párrafo actual; "Seguir" habla desde ahí.
  function pause() {
    playingRef.current = false;
    setPlaying(false);
    setRange(null);
    clearInterval(keepAliveRef.current);
    stopSimulator();
    uttersRef.current = [];
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* nada */
    }
  }

  return (
    <>
      {supported && (
        <button
          type="button"
          onClick={playing ? pause : play}
          className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            playing
              ? "bg-grape text-white hover:opacity-90"
              : "bg-grape-soft text-grape hover:bg-grape hover:text-white"
          }`}
        >
          {playing ? "⏸ Pausar" : idxRef.current > 0 ? "🔊 Seguir escuchando" : "🔊 Escuchar el cuento"}
        </button>
      )}

      <div className="mt-5 space-y-4 text-[18px] leading-relaxed text-ink/90">
        {paragraphs.map((p, i) => {
          const active = playing && i === para;
          if (!active) {
            return (
              <p key={i} className="rounded-2xl px-1 transition-colors">
                {p}
              </p>
            );
          }
          const [s, e] = range || [-1, -1];
          return (
            <p key={i} className="rounded-2xl bg-honey-soft/60 px-3 py-2 ring-2 ring-honey transition-colors">
              {s >= 0 ? (
                <>
                  {p.slice(0, s)}
                  <mark className="rounded-md bg-honey px-0.5 text-ink">{p.slice(s, e)}</mark>
                  {p.slice(e)}
                </>
              ) : (
                p
              )}
            </p>
          );
        })}
      </div>
    </>
  );
}
