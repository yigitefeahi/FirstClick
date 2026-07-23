-- Ensure API roles can use tables (service_role bypasses RLS but still needs GRANTs)
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on table public.profiles to anon, authenticated, service_role;
grant all on table public.products to anon, authenticated, service_role;
grant all on table public.documents to anon, authenticated, service_role;
grant all on table public.analyses to anon, authenticated, service_role;
grant all on table public.chunks to anon, authenticated, service_role;

grant all on all sequences in schema public to anon, authenticated, service_role;

grant execute on function public.match_chunks to anon, authenticated, service_role;
grant execute on function public.handle_new_user to postgres, service_role;
