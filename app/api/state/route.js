// Estado del usuario (progreso + suscripción) en Supabase, atado al usuario de
// Clerk. El cliente (store de progreso) llama:
//   GET  /api/state        -> trae el estado guardado (o null si no hay)
//   PUT  /api/state {data} -> guarda/actualiza el estado
//
// Si Supabase no está configurado (faltan llaves), responde 503 y el cliente
// usa localStorage como respaldo. La suscripción se guarda también en columnas
// para poder decidir el paywall.

import { auth, currentUser } from "@clerk/nextjs/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "unauthenticated" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return Response.json({ error: "not_configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "data, subscription_status, subscription_plan, cancel_at_period_end, current_period_end, name, updated_at",
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (error) return Response.json({ error: "db" }, { status: 502 });

  return Response.json({
    state: data?.data ?? null,
    subscription: data
      ? {
          status: data.subscription_status || "none",
          plan: data.subscription_plan || null,
          cancelAtPeriodEnd: !!data.cancel_at_period_end,
          currentPeriodEnd: data.current_period_end || null,
        }
      : null,
  });
}

export async function PUT(req) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "unauthenticated" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return Response.json({ error: "not_configured" }, { status: 503 });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const state = body?.data;
  if (!state || typeof state !== "object") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Nombre para la columna `name`: el del perfil primario (modelo multiperfil),
  // con respaldo al formato viejo (state.name) por compatibilidad.
  const profilesObj = state.profiles && typeof state.profiles === "object" ? state.profiles : null;
  const primary = profilesObj
    ? Object.values(profilesObj).find((p) => p?.isPrimary) || Object.values(profilesObj)[0]
    : null;
  const primaryName = primary?.name || state.name || null;

  // La SUSCRIPCIÓN nunca se cambia desde esta ruta: solo la fijan los webhooks
  // de pago. Omitir esas columnas en el upsert hace que Postgres conserve sus
  // valores actuales y use sus defaults únicamente al crear un perfil nuevo.
  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) return Response.json({ error: "db" }, { status: 502 });

  // Correo de Clerk: solo lo pedimos la PRIMERA vez (si aún no está guardado),
  // para no llamar a Clerk en cada guardado.
  let email = existingProfile?.email || null;
  if (!email) {
    const user = await currentUser();
    email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      null;
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      email,
      name: primaryName,
      data: state,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );

  if (error) return Response.json({ error: "db" }, { status: 502 });
  return Response.json({ ok: true });
}
