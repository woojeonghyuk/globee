create or replace function public.close_class_after_finalized_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status::text not in ('completed', 'no_show') then
    return new;
  end if;

  update public.classes
  set is_open = false,
      updated_at = now()
  where id = new.class_id;

  return new;
end;
$$;

drop trigger if exists on_application_finalized_close_class
on public.applications;

create trigger on_application_finalized_close_class
after update of status
on public.applications
for each row
when (old.status is distinct from new.status)
execute function public.close_class_after_finalized_application();
