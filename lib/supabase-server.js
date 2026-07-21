// Cliente de Supabase SOLO para el servidor (rutas API).
// Usa la service_role, que nunca debe llegar al cliente. Si faltan las
// variables de entorno, devuelve null y las rutas responden "no configurado"
// para que la app siga funcionando con localStorage como respaldo.

import { createClient } from "@supabase/supabase-js";

let cached = null;

export function getSupabaseAdmin() {
  if (cached) return cached;
  const rawUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !key) return null;
  // Tolera que peguen la URL del endpoint REST o con barra final: nos quedamos
  // con la base https://<ref>.supabase.co
  const url = rawUrl.replace(/\/rest\/v1\/?$/i, "").replace(/\/+$/, "");
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
