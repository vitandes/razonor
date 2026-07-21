"use client";

// Pantalla COMPLETA de selección de perfil para los niños (estilo Netflix).
// Se muestra al entrar a /aprendo cuando la cuenta es plan Familiar.
//
// - Tocar un perfil (modo normal) entra a SU pantalla de aprendizaje.
// - "Agregar" / "Administrar" abren un formulario para elegir nombre, emoji y
//   color. Al crear o guardar, NOS QUEDAMOS en esta pantalla (para configurar
//   varios niños); solo se entra a la app cuando se ELIGE un perfil.

import { useState } from "react";
import Detective from "@/components/Detective";
import { useProgress } from "@/lib/progress";
import { AVATARS, COLORS, avatarFor, colorFor } from "@/lib/avatars";

export default function KidProfileGate({ onEnter }) {
  const {
    profiles,
    canAddProfile,
    maxProfiles,
    switchProfile,
    addProfile,
    updateProfile,
    removeProfile,
  } = useProgress();

  const [managing, setManaging] = useState(false);
  // form = null | { mode: "add" | "edit", id?, name, avatar, color }
  const [form, setForm] = useState(null);

  function openAdd() {
    setForm({
      mode: "add",
      name: "",
      avatar: AVATARS[profiles.length % AVATARS.length],
      color: COLORS[profiles.length % COLORS.length],
    });
  }
  function openEdit(prof, i) {
    setForm({
      mode: "edit",
      id: prof.id,
      name: prof.name || "",
      avatar: avatarFor(prof, i),
      color: colorFor(prof, i),
    });
  }
  function closeForm() {
    setForm(null);
  }

  function submitForm(e) {
    e.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    if (form.mode === "add") {
      addProfile(name, { avatar: form.avatar, color: form.color });
    } else {
      updateProfile(form.id, { name, avatar: form.avatar, color: form.color });
    }
    setForm(null); // nos quedamos en la pantalla de selección
  }

  function onTile(prof, i) {
    if (managing) openEdit(prof, i);
    else {
      switchProfile(prof.id);
      onEnter();
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 py-10">
      <Detective size={60} className="animate-floaty" />
      <h1 className="mt-4 text-center font-display text-3xl font-bold text-ink sm:text-4xl">
        ¿Quién va a investigar?
      </h1>
      <p className="mt-2 text-center text-muted">
        {managing ? "Toca un perfil para editarlo." : "Elige tu perfil de detective para empezar."}
      </p>

      <div className="mt-10 flex max-w-3xl flex-wrap items-start justify-center gap-5 sm:gap-7">
        {profiles.map((prof, i) => (
          <div key={prof.id} className="relative">
            <button
              type="button"
              onClick={() => onTile(prof, i)}
              className="group flex w-24 flex-col items-center gap-3 sm:w-28"
            >
              <span
                className={`grid h-24 w-24 place-items-center rounded-3xl text-5xl shadow-card transition group-hover:-translate-y-1 group-hover:shadow-soft group-hover:ring-4 group-hover:ring-honey sm:h-28 sm:w-28 sm:text-6xl ${colorFor(
                  prof,
                  i,
                )}`}
              >
                {avatarFor(prof, i)}
              </span>
              <span className="flex items-center gap-1 font-display text-lg font-semibold text-ink">
                {prof.name || "Sin nombre"}
                {managing && <span aria-hidden="true">✏️</span>}
              </span>
            </button>
            {managing && !prof.isPrimary && (
              <button
                type="button"
                onClick={() => removeProfile(prof.id)}
                aria-label={`Eliminar ${prof.name || "perfil"}`}
                className="absolute right-1 top-1 grid h-7 w-7 place-items-center rounded-full bg-coral text-sm text-white shadow-card transition hover:scale-110"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* agregar niño */}
        {canAddProfile && (
          <button
            type="button"
            onClick={openAdd}
            className="flex w-24 flex-col items-center gap-3 text-muted transition hover:text-ink sm:w-28"
          >
            <span className="grid h-24 w-24 place-items-center rounded-3xl border-2 border-dashed border-ink/25 text-5xl sm:h-28 sm:w-28">
              +
            </span>
            <span className="font-display text-lg font-semibold">Agregar</span>
          </button>
        )}
      </div>

      {/* formulario de crear / editar */}
      {form && (
        <ProfileForm
          form={form}
          setForm={setForm}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {profiles.length > 1 && !form && (
        <button
          type="button"
          onClick={() => setManaging((m) => !m)}
          className="mt-10 rounded-full border border-ink/15 bg-white px-6 py-2.5 text-sm font-semibold text-muted transition hover:text-ink"
        >
          {managing ? "Listo" : "Administrar perfiles"}
        </button>
      )}
    </main>
  );
}

function ProfileForm({ form, setForm, onSubmit, onCancel }) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 w-full max-w-md rounded-4xl bg-white p-5 shadow-soft sm:p-6"
    >
      <h2 className="font-display text-lg font-semibold text-ink">
        {form.mode === "add" ? "Nuevo perfil" : "Editar perfil"}
      </h2>

      {/* vista previa + nombre */}
      <div className="mt-4 flex items-center gap-4">
        <span
          className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-4xl shadow-card ${form.color}`}
        >
          {form.avatar}
        </span>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          maxLength={24}
          autoFocus
          placeholder="Nombre del niño o niña"
          aria-label="Nombre del niño o niña"
          className="flex-1 rounded-full border-2 border-ink/10 bg-cream px-4 py-2.5 text-ink outline-none transition focus:border-honey"
        />
      </div>

      {/* color */}
      <p className="mt-5 text-sm font-medium text-muted">Color</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setForm((f) => ({ ...f, color: c }))}
            aria-label={`Color ${c}`}
            className={`h-9 w-9 rounded-full ${c} transition ${
              form.color === c ? "ring-4 ring-ink/20" : "hover:scale-110"
            }`}
          />
        ))}
      </div>

      {/* emoji */}
      <p className="mt-5 text-sm font-medium text-muted">Emoji</p>
      <div className="mt-2 grid grid-cols-8 gap-1">
        {AVATARS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setForm((f) => ({ ...f, avatar: a }))}
            aria-label={`Emoji ${a}`}
            className={`grid aspect-square place-items-center rounded-xl text-lg transition ${
              form.avatar === a ? "bg-honey-soft ring-2 ring-honey" : "hover:bg-cream"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="submit"
          disabled={!form.name.trim()}
          className="flex-1 rounded-full bg-honey px-5 py-3 font-display font-semibold text-ink transition enabled:hover:bg-honey-deep enabled:hover:text-white disabled:opacity-40"
        >
          {form.mode === "add" ? "Crear perfil" : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-muted transition hover:text-ink"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
