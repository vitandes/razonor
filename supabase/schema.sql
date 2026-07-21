-- Esquema de Leo en Supabase.
-- Una fila por usuario de Clerk. Guarda el progreso completo (jsonb) y, aparte,
-- el estado de suscripción en columnas para poder consultarlo y decidir el
-- paywall sin abrir el blob.
--
-- Cómo aplicarlo: Supabase Dashboard -> SQL Editor -> pega esto -> Run.

create table if not exists public.profiles (
  user_id             text primary key,           -- id de usuario de Clerk
  email               text,                       -- correo del usuario en Clerk
  name                text,
  data                jsonb not null default '{}'::jsonb,  -- store de progreso
  subscription_status   text not null default 'none',      -- none|active|canceled
  subscription_plan     text,
  cancel_at_period_end  boolean not null default false,    -- canceló: no renueva, pero conserva acceso
  current_period_end    timestamptz,                       -- hasta cuándo tiene acceso pagado
  country               text,                              -- país del usuario (ISO-2) al hacer checkout
  billing               text,                              -- periodo de cobro: monthly|semestral
  mp_preapproval_id     text,                              -- id de la suscripción en Mercado Pago
  updated_at            timestamptz not null default now()
);

-- Si la tabla ya existía, agrega las columnas que falten:
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists mp_preapproval_id text;
alter table public.profiles add column if not exists cancel_at_period_end boolean not null default false;
alter table public.profiles add column if not exists current_period_end timestamptz;
alter table public.profiles add column if not exists country text;
alter table public.profiles add column if not exists billing text;
alter table public.profiles add column if not exists subscribed_at timestamptz;
alter table public.profiles add column if not exists canceled_at timestamptz;
alter table public.profiles add column if not exists fb_data jsonb;

-- RLS activado SIN políticas: nadie con la llave anónima puede leer/escribir.
-- El acceso ocurre solo desde las rutas API de Next con la service_role
-- (que omite RLS) y siempre filtrando por el user_id de Clerk.
alter table public.profiles enable row level security;

-- Índice para consultar suscripciones activas (reportes, métricas, etc.).
create index if not exists profiles_subscription_status_idx
  on public.profiles (subscription_status);
