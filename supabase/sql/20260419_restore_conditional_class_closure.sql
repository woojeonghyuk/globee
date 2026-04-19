update public.classes c
set is_open = true,
    updated_at = now()
where c.is_open = false
  and exists (
    select 1
    from public.applications a
    where a.class_id = c.id
      and a.status::text in ('applied', 'waiting', 'confirmed')
  );

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

  update public.classes c
  set is_open = false,
      updated_at = now()
  where c.id = new.class_id
    and not exists (
      select 1
      from public.applications a
      where a.class_id = new.class_id
        and a.status::text in ('applied', 'waiting', 'confirmed')
    );

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
