export default function HeroReto() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-4xl bg-white shadow-soft">
      <div className="bg-night px-6 py-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-honey">Resultado inicial</p><h3 className="mt-1 font-display text-xl font-bold">Tu ruta matemática</h3></div>
          <span className="rounded-full bg-teal/20 px-3 py-1 text-xs font-bold text-teal-soft">18 preguntas</span>
        </div>
      </div>
      <div className="p-6">
        <div className="rounded-3xl bg-honey-soft p-5">
          <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-night font-display text-xl font-bold text-honey">½</span><div><p className="text-xs font-bold uppercase tracking-wide text-honey-deep">Primera oportunidad</p><p className="font-display text-lg font-bold text-ink">Equivalencia de fracciones</p></div></div>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">Esta base aparece antes de proporciones, porcentajes y parte del álgebra.</p>
        </div>
        <div className="mt-5 space-y-4">
          <SkillBar symbol="N₁" label="Operaciones" value={78} />
          <SkillBar symbol="½" label="Fracciones" value={42} />
          <SkillBar symbol="x" label="Ecuaciones" value={64} />
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-ink/10 bg-cream p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-honey font-display font-bold text-night">1</span>
          <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wide text-muted">Empieza aquí</p><p className="truncate font-bold text-ink">Reparar el prerrequisito</p></div>
          <span className="ml-auto text-muted" aria-hidden="true">→</span>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ symbol, label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm"><span className="flex items-center gap-2 font-bold text-ink"><span className="grid h-7 w-7 place-items-center rounded-lg bg-night font-display text-xs text-honey">{symbol}</span>{label}</span><span className="font-display font-bold text-muted">{value}</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-cloud"><div className="h-full rounded-full bg-grape" style={{ width: `${value}%` }} /></div>
    </div>
  );
}
