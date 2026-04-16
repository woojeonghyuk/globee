create or replace function public.is_phone_registered(p_phone text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from auth.users u
    where u.phone = p_phone
  )
  or exists (
    select 1
    from public.profiles p
    where p.phone = p_phone
  );
$$;

grant execute on function public.is_phone_registered(text) to anon;
grant execute on function public.is_phone_registered(text) to authenticated;
