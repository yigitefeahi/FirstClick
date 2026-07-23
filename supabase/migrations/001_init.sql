-- FirstClick: Auth profiles, products, documents, RAG chunks, analyses
-- Run in Supabase SQL Editor (or via CLI). Also create Storage bucket: product-docs (private).

create extension if not exists vector;
create extension if not exists pg_trgm;

-- Profiles (mirrors auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_user_id_idx on public.products (user_id);

-- Documents metadata
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  title text not null,
  storage_path text not null,
  mime_type text,
  byte_size integer,
  created_at timestamptz not null default now()
);

create index if not exists documents_product_id_idx on public.documents (product_id);
create index if not exists documents_user_id_idx on public.documents (user_id);

-- Analyses (history)
create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  form_data jsonb not null,
  result jsonb not null,
  source text not null default 'mock',
  rag_sources jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analyses_user_id_idx on public.analyses (user_id);
create index if not exists analyses_product_id_idx on public.analyses (product_id);
create index if not exists analyses_created_at_idx on public.analyses (created_at desc);

-- RAG chunks (document + past analysis)
create table if not exists public.chunks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  product_id uuid references public.products (id) on delete cascade,
  document_id uuid references public.documents (id) on delete cascade,
  analysis_id uuid references public.analyses (id) on delete cascade,
  source_type text not null check (source_type in ('document', 'analysis')),
  content text not null,
  content_tsv tsvector generated always as (to_tsvector('simple', coalesce(content, ''))) stored,
  embedding vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists chunks_user_id_idx on public.chunks (user_id);
create index if not exists chunks_product_id_idx on public.chunks (product_id);
create index if not exists chunks_source_type_idx on public.chunks (source_type);
create index if not exists chunks_content_tsv_idx on public.chunks using gin (content_tsv);
create index if not exists chunks_embedding_hnsw_idx
  on public.chunks using hnsw (embedding vector_cosine_ops);

-- Hybrid search: vector + keyword, filtered by user/product, fused via RRF in app
create or replace function public.match_chunks(
  query_embedding vector(1536),
  query_text text,
  match_user_id uuid,
  match_product_id uuid default null,
  match_source_type text default null,
  match_count int default 8
)
returns table (
  id uuid,
  content text,
  source_type text,
  product_id uuid,
  document_id uuid,
  analysis_id uuid,
  metadata jsonb,
  vector_score float,
  text_score float
)
language sql
stable
as $$
  with vector_hits as (
    select
      c.id,
      c.content,
      c.source_type,
      c.product_id,
      c.document_id,
      c.analysis_id,
      c.metadata,
      (1 - (c.embedding <=> query_embedding))::float as vector_score,
      0::float as text_score
    from public.chunks c
    where c.user_id = match_user_id
      and c.embedding is not null
      and (match_product_id is null or c.product_id = match_product_id)
      and (match_source_type is null or c.source_type = match_source_type)
    order by c.embedding <=> query_embedding
    limit greatest(match_count * 3, 12)
  ),
  text_hits as (
    select
      c.id,
      c.content,
      c.source_type,
      c.product_id,
      c.document_id,
      c.analysis_id,
      c.metadata,
      0::float as vector_score,
      ts_rank_cd(c.content_tsv, websearch_to_tsquery('simple', query_text))::float as text_score
    from public.chunks c
    where c.user_id = match_user_id
      and (match_product_id is null or c.product_id = match_product_id)
      and (match_source_type is null or c.source_type = match_source_type)
      and query_text is not null
      and length(trim(query_text)) > 0
      and c.content_tsv @@ websearch_to_tsquery('simple', query_text)
    order by text_score desc
    limit greatest(match_count * 3, 12)
  )
  select * from vector_hits
  union all
  select * from text_hits;
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.documents enable row level security;
alter table public.analyses enable row level security;
alter table public.chunks enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "products_all_own" on public.products
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "documents_all_own" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "analyses_all_own" on public.analyses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "chunks_all_own" on public.chunks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Storage bucket instructions (run in dashboard or):
-- insert into storage.buckets (id, name, public) values ('product-docs', 'product-docs', false)
-- on conflict do nothing;
