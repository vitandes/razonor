/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Paleta "noche de misterio" de Astuto. Los NOMBRES se conservan del
      // proyecto base para no tocar el producto viejo (/aprendo, /padres):
      // ink = azul medianoche, honey = ámbar linterna, cream = papel frío.
      colors: {
        ink: "#141B36",
        muted: "#5A6180",
        night: { DEFAULT: "#0E1530", soft: "#1C2547" },
        honey: { DEFAULT: "#FFBE3D", soft: "#FFF3D6", deep: "#C98A05" },
        grape: { DEFAULT: "#7C6CF2", soft: "#EAE7FD" },
        teal: { DEFAULT: "#2FB7A6", soft: "#DBF4F0" },
        coral: { DEFAULT: "#FF7A6B", soft: "#FFE5E1" },
        cream: "#F7F5F0",
        cloud: "#EDEFF6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 24px 48px -20px rgba(14,21,48,0.35)",
        card: "0 3px 14px -6px rgba(14,21,48,0.18)",
        glow: "0 0 60px -10px rgba(255,190,61,0.45)",
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "60%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        // --- Resumen semanal (Wrapped): entradas, confeti y barras ---
        slidein: {
          "0%": { transform: "translateY(28px) scale(0.97)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        confetti: {
          "0%": { transform: "translateY(-8vh) rotate(0deg)", opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(108vh) rotate(720deg)", opacity: "0" },
        },
        growup: {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-6deg) scale(1)" },
          "50%": { transform: "rotate(6deg) scale(1.08)" },
        },
        storybar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        shine: {
          "0%,100%": { opacity: "0.65", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        // --- Landing Astuto: micro-interacciones ---
        shake: {
          "10%,90%": { transform: "translateX(-2px)" },
          "20%,80%": { transform: "translateX(3px)" },
          "30%,50%,70%": { transform: "translateX(-5px)" },
          "40%,60%": { transform: "translateX(5px)" },
        },
        twinkle: {
          "0%,100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" },
        },
        glowpulse: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,190,61,0.45)" },
          "50%": { boxShadow: "0 0 0 14px rgba(255,190,61,0)" },
        },
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(36px,-48px) scale(1.18)" },
        },
        rise: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "12%": { opacity: "1" },
          "100%": { transform: "translateY(-88vh)", opacity: "0" },
        },
      },
      animation: {
        pop: "pop 0.35s ease-out both",
        floaty: "floaty 3.5s ease-in-out infinite",
        slidein: "slidein 0.55s cubic-bezier(0.22,1,0.36,1) both",
        confetti: "confetti 3.2s linear both",
        growup: "growup 0.7s cubic-bezier(0.22,1,0.36,1) both",
        storybar: "storybar 5s linear both",
        drift: "drift 7s ease-in-out infinite alternate",
        rise: "rise 3.4s linear infinite",
        wiggle: "wiggle 1.6s ease-in-out infinite",
        shine: "shine 2.4s ease-in-out infinite",
        shake: "shake 0.45s ease both",
        twinkle: "twinkle 2.6s ease-in-out infinite",
        glowpulse: "glowpulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
