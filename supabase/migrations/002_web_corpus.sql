-- Allow dynamic web corpus alongside static documents and past analyses
alter table public.chunks drop constraint if exists chunks_source_type_check;
alter table public.chunks
  add constraint chunks_source_type_check
  check (source_type in ('document', 'analysis', 'web'));

-- Optional origin URL for web-ingested docs
alter table public.documents
  add column if not exists source_kind text not null default 'upload'
    check (source_kind in ('upload', 'web'));
alter table public.documents
  add column if not exists source_url text;
