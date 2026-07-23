-- Global FirstClick knowledge corpus (our RAG, not user's)
alter table public.chunks
  alter column user_id drop not null;

alter table public.chunks
  add column if not exists scope text not null default 'user'
    check (scope in ('user', 'global'));

alter table public.chunks
  add column if not exists knowledge_slug text;

create index if not exists chunks_scope_idx on public.chunks (scope);
create index if not exists chunks_knowledge_slug_idx on public.chunks (knowledge_slug);

alter table public.chunks drop constraint if exists chunks_source_type_check;
alter table public.chunks
  add constraint chunks_source_type_check
  check (source_type in ('document', 'analysis', 'web', 'knowledge'));

-- Global rows must have null user_id; user rows must have user_id
alter table public.chunks drop constraint if exists chunks_scope_user_chk;
alter table public.chunks
  add constraint chunks_scope_user_chk
  check (
    (scope = 'global' and user_id is null and source_type = 'knowledge')
    or (scope = 'user' and user_id is not null)
  );

-- Replace match_chunks: user corpus OR global knowledge
drop function if exists public.match_chunks(
  vector, text, uuid, uuid, text, int
);

create or replace function public.match_chunks(
  query_embedding vector(1536),
  query_text text,
  match_user_id uuid,
  match_product_id uuid default null,
  match_source_type text default null,
  match_count int default 8,
  match_scope text default 'user'
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
  text_score float,
  scope text
)
language sql
stable
as $$
  with filtered as (
    select c.*
    from public.chunks c
    where c.embedding is not null
      and (
        (match_scope = 'global' and c.scope = 'global')
        or (
          match_scope = 'user'
          and c.scope = 'user'
          and c.user_id = match_user_id
          and (match_product_id is null or c.product_id = match_product_id)
        )
        or (
          match_scope = 'all'
          and (
            c.scope = 'global'
            or (
              c.scope = 'user'
              and c.user_id = match_user_id
              and (match_product_id is null or c.product_id = match_product_id)
            )
          )
        )
      )
      and (match_source_type is null or c.source_type = match_source_type)
  ),
  vector_hits as (
    select
      f.id,
      f.content,
      f.source_type,
      f.product_id,
      f.document_id,
      f.analysis_id,
      f.metadata,
      (1 - (f.embedding <=> query_embedding))::float as vector_score,
      0::float as text_score,
      f.scope
    from filtered f
    order by f.embedding <=> query_embedding
    limit greatest(match_count * 3, 12)
  ),
  text_hits as (
    select
      f.id,
      f.content,
      f.source_type,
      f.product_id,
      f.document_id,
      f.analysis_id,
      f.metadata,
      0::float as vector_score,
      ts_rank_cd(f.content_tsv, websearch_to_tsquery('simple', query_text))::float as text_score,
      f.scope
    from filtered f
    where query_text is not null
      and length(trim(query_text)) > 0
      and f.content_tsv @@ websearch_to_tsquery('simple', query_text)
    order by text_score desc
    limit greatest(match_count * 3, 12)
  )
  select * from vector_hits
  union all
  select * from text_hits;
$$;

grant execute on function public.match_chunks(vector, text, uuid, uuid, text, int, text)
  to anon, authenticated, service_role;

-- RLS: users see own chunks + all global knowledge
drop policy if exists "chunks_all_own" on public.chunks;
create policy "chunks_select_own_or_global" on public.chunks
  for select using (scope = 'global' or auth.uid() = user_id);
create policy "chunks_write_own" on public.chunks
  for all using (scope = 'user' and auth.uid() = user_id)
  with check (scope = 'user' and auth.uid() = user_id);
