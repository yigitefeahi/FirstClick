-- Custom personas per user
create table if not exists public.custom_personas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  traits text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists custom_personas_user_id_idx on public.custom_personas (user_id);

alter table public.custom_personas enable row level security;

create policy "Users manage own custom personas"
  on public.custom_personas
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant select, insert, update, delete on public.custom_personas to anon, authenticated, service_role;

-- Allow screenshot source kind on documents
alter table public.documents drop constraint if exists documents_source_kind_check;
alter table public.documents
  add constraint documents_source_kind_check
  check (source_kind in ('upload', 'web', 'screenshot'));
