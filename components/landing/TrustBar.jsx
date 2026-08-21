const SIGNALS = [
  { value: "15–18", label: "preguntas adaptativas" },
  { value: "1", label: "prioridad inicial clara" },
  { value: "10–15 min", label: "de práctica por sesión" },
  { value: "30", label: "habilidades conectadas" },
];

export default function TrustBar() {
  return (
    <section className="border-b border-ink/5 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-7 sm:grid-cols-4">
        {SIGNALS.map((signal) => (
          <div key={signal.label} className="text-center">
            <div className="font-display text-2xl font-bold text-ink sm:text-3xl">{signal.value}</div>
            <div className="mt-1 text-sm text-muted">{signal.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
