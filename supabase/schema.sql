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

-- Eventos propios del embudo. Una fila por hito; nunca guarda nombres,
-- correos ni respuestas del diagnóstico. El service_role es el único acceso.
create table if not exists public.analytics_events (
  id                uuid primary key default gen_random_uuid(),
  event_id          text not null unique,
  event_name        text not null,
  occurred_at       timestamptz not null default now(),
  visitor_id        text,
  session_id        text,
  user_id           text,
  journey           text,
  path              text,
  device_type       text,
  country           text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  utm_content       text,
  utm_term          text,
  fbclid            text,
  user_agent        text,
  product_version   text not null default 'math_v1',
  properties        jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

create index if not exists analytics_events_occurred_idx
  on public.analytics_events (occurred_at desc);
create index if not exists analytics_events_name_occurred_idx
  on public.analytics_events (event_name, occurred_at desc);
create index if not exists analytics_events_visitor_idx
  on public.analytics_events (visitor_id);
create index if not exists analytics_events_user_idx
  on public.analytics_events (user_id);
create index if not exists analytics_events_campaign_idx
  on public.analytics_events (utm_campaign, occurred_at desc);
