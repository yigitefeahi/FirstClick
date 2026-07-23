-- Ensure private Storage bucket for product document uploads.
insert into storage.buckets (id, name, public)
values ('product-docs', 'product-docs', false)
on conflict (id) do nothing;

-- Permissive object policies for local/dev uploads (service role + authenticated).
drop policy if exists "product_docs_select" on storage.objects;
drop policy if exists "product_docs_insert" on storage.objects;
drop policy if exists "product_docs_update" on storage.objects;
drop policy if exists "product_docs_delete" on storage.objects;

create policy "product_docs_select"
  on storage.objects for select
  using (bucket_id = 'product-docs');

create policy "product_docs_insert"
  on storage.objects for insert
  with check (bucket_id = 'product-docs');

create policy "product_docs_update"
  on storage.objects for update
  using (bucket_id = 'product-docs')
  with check (bucket_id = 'product-docs');

create policy "product_docs_delete"
  on storage.objects for delete
  using (bucket_id = 'product-docs');
