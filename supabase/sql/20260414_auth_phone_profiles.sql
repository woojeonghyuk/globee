create or replace function public.handle_new_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    role,
    full_name,
    phone
  )
  values (
    new.id,
    'parent',
    coalesce(new.raw_user_meta_data->>'full_name', '학부모'),
    coalesce(new.phone, new.raw_user_meta_data->>'phone')
  )
  on conflict (id) do update
  set
    full_name = coalesce(public.profiles.full_name, excluded.full_name),
    phone = coalesce(excluded.phone, public.profiles.phone);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
after insert on auth.users
for each row execute function public.handle_new_auth_user_profile();
