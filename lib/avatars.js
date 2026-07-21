// Avatares (emoji) y colores de fondo para los perfiles de niños.
// Los colores son strings de clases COMPLETAS para que Tailwind las detecte
// (no se pueden construir dinámicamente tipo `bg-${x}` o no se generan).

export const AVATARS = [
  "🦊", "🦉", "🐱", "🐼", "🐧", "🐸",
  "🐯", "🐶", "🐵", "🐰", "🐨", "🦄",
  "🐢", "🐙", "🐝", "🦁",
];

export const COLORS = [
  "bg-honey",
  "bg-grape",
  "bg-teal",
  "bg-coral",
  "bg-sky-500",
  "bg-pink-500",
  "bg-emerald-500",
  "bg-amber-500",
];

// Avatar/color del perfil, con respaldo por orden si aún no eligió uno.
export function avatarFor(profile, index = 0) {
  return (profile && profile.avatar) || AVATARS[index % AVATARS.length];
}
export function colorFor(profile, index = 0) {
  return (profile && profile.color) || COLORS[index % COLORS.length];
}
