do $$
begin
  if exists (
    select 1
    from pg_type
    where typnamespace = 'public'::regnamespace
      and typname = 'application_status'
  ) then
    alter type public.application_status add value if not exists 'no_show';
  end if;
end
$$;
