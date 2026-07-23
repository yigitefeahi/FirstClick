-- Workspaces & team roles
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('owner', 'editor', 'viewer')),
  status text not null default 'active' check (status in ('pending', 'active')),
  created_at timestamptz not null default now(),
  unique (workspace_id, email)
);

create index if not exists workspace_members_user_idx on public.workspace_members (user_id);
create index if not exists workspace_members_ws_idx on public.workspace_members (workspace_id);

-- Shareable analysis links (viewer / editor)
create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.analyses(id) on delete cascade,
  token text not null unique,
  role text not null default 'viewer' check (role in ('viewer', 'editor')),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

create index if not exists share_links_token_idx on public.share_links (token);
create index if not exists share_links_analysis_idx on public.share_links (analysis_id);

-- Product retest tracking
alter table public.products
  add column if not exists workspace_id uuid references public.workspaces(id) on delete set null,
  add column if not exists last_tested_at timestamptz,
  add column if not exists pitch_fingerprint text;

-- In-app notifications (retest reminders / weekly summary)
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null default 'retest',
  title text not null,
  body text not null default '',
  href text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- RLS
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.share_links enable row level security;
alter table public.notifications enable row level security;

create policy "Workspace owners manage"
  on public.workspaces for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Members read workspaces"
  on public.workspaces for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1 from public.workspace_members m
      where m.workspace_id = workspaces.id and m.user_id = auth.uid() and m.status = 'active'
    )
  );

create policy "Members manage membership rows"
  on public.workspace_members for all
  using (
    exists (
      select 1 from public.workspaces w
      where w.id = workspace_members.workspace_id and w.owner_id = auth.uid()
    )
    or user_id = auth.uid()
  )
  with check (
    exists (
      select 1 from public.workspaces w
      where w.id = workspace_members.workspace_id and w.owner_id = auth.uid()
    )
    or user_id = auth.uid()
  );

create policy "Share links by creator"
  on public.share_links for all
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy "Users own notifications"
  on public.notifications for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

grant select, insert, update, delete on public.workspaces to anon, authenticated, service_role;
grant select, insert, update, delete on public.workspace_members to anon, authenticated, service_role;
grant select, insert, update, delete on public.share_links to anon, authenticated, service_role;
grant select, insert, update, delete on public.notifications to anon, authenticated, service_role;
