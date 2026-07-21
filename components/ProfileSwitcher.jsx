"use client";

// Selector de perfiles tipo Netflix. Solo se muestra en plan Familiar.
// Permite cambiar de niño, agregar (hasta 3) y eliminar (menos el primario).
// Cada niño tiene su propio progreso; al cambiar aquí, toda la app (aprendo y
// reporte de padres) pasa a mostrar el progreso de ese niño.

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { avatarFor, colorFor } from "@/lib/avatars";

export default function ProfileSwitcher({ label = "¿Quién está leyendo?" }) {
  const {
    isFamiliar,
    profiles,
    activeProfileId,
    canAddProfile,
    maxProfiles,
    switchProfile,
    addProfile,
    removeProfile,
  } = useProgress();

  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [managing, setManaging] = useState(false);

  // Solo el plan Familiar maneja varios perfiles.
  if (!isFamiliar) return null;

  function submitAdd(e) {
    e.preventDefault();
    const n = newName.trim();
    if (!n) return;
    addProfile(n);
    setNewName("");
    setAdding(false);
  }

  return (
    <section className="mt-4 rounded-4xl bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-ink">{label}</p>
        {profiles.length > 1 && (
          <button
            type="button"
            onClick={() => setManaging((m) => !m)}
            className="text-xs font-medium text-muted transition hover:text-ink"
          >
            {managing ? "Listo" : "Administrar"}
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-start gap-2 sm:gap-3">
        {profiles.map((prof, i) => {
          const active = prof.id === activeProfileId;
          return (
            <div key={prof.id} className="relative">
              <button
                type="button"
                onClick={() => switchProfile(prof.id)}
                className={`flex w-20 flex-col items-center gap-1.5 rounded-2xl p-2 transition ${
                  active ? "bg-cream ring-2 ring-honey" : "hover:bg-cream"
                }`}
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl text-3xl shadow-card ${colorFor(
                    prof,
                    i,
                  )}`}
                >
                  {avatarFor(prof, i)}
                </span>
                <span className="w-full truncate text-center text-xs font-semibold text-ink">
                  {prof.name || "Sin nombre"}
                </span>
              </button>
              {managing && !prof.isPrimary && (
                <button
                  type="button"
                  onClick={() => removeProfile(prof.id)}
                  aria-label={`Eliminar ${prof.name || "perfil"}`}
                  className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-coral text-xs text-white shadow-card transition hover:scale-110"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}

        {/* agregar niño */}
        {canAddProfile && !adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex w-20 flex-col items-center gap-1.5 rounded-2xl p-2 text-muted transition hover:bg-cream hover:text-ink"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-ink/20 text-2xl">
              +
            </span>
            <span className="text-xs font-semibold">Agregar</span>
          </button>
        )}
      </div>

      {adding && (
        <form onSubmit={submitAdd} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            maxLength={24}
            autoFocus
            placeholder="Nombre del niño o niña"
            aria-label="Nombre del nuevo niño o niña"
            className="flex-1 rounded-full border-2 border-ink/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-honey"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!newName.trim()}
              className="shrink-0 rounded-full bg-honey px-5 py-2.5 font-semibold text-ink transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => {
                setAdding(false);
                setNewName("");
              }}
              className="shrink-0 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-muted transition hover:text-ink"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {profiles.length >= maxProfiles && (
        <p className="mt-2 text-xs text-muted">
          Plan Familiar: hasta {maxProfiles} niños.
        </p>
      )}
    </section>
  );
}
