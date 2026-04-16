update public.classes c
set is_open = false,
    updated_at = now()
where c.is_open = true
  and exists (
    select 1
    from public.applications a
    where a.class_id = c.id
      and a.status::text in ('completed', 'no_show')
  )
  and not exists (
    select 1
    from public.applications a
    where a.class_id = c.id
      and a.status::text in ('applied', 'waiting', 'confirmed')
  );
