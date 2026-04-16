create unique index if not exists applications_one_active_per_child_class
on public.applications (child_id, class_id)
where status in ('applied', 'waiting', 'confirmed');

create unique index if not exists completed_classes_one_per_application
on public.completed_classes (application_id);

create or replace function public.apply_to_class(
  p_child_id uuid,
  p_class_id uuid
)
returns public.applications
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  class_record public.classes%rowtype;
  active_count integer;
  new_application public.applications%rowtype;
begin
  if current_user_id is null then
    raise exception '로그인이 필요해요.';
  end if;

  if not exists (
    select 1
    from public.children c
    where c.id = p_child_id
      and c.parent_id = current_user_id
  ) then
    raise exception '등록된 아이 정보를 확인할 수 없어요.';
  end if;

  select *
  into class_record
  from public.classes c
  where c.id = p_class_id
  for update;

  if not found or class_record.is_open is not true then
    raise exception '신청할 수 없는 수업이에요.';
  end if;

  if class_record.starts_at < now() then
    raise exception '이미 지난 수업이에요.';
  end if;

  if exists (
    select 1
    from public.applications a
    where a.child_id = p_child_id
      and a.class_id = p_class_id
      and a.status::text in ('applied', 'waiting', 'confirmed')
  ) then
    raise exception '이미 신청한 수업이에요.';
  end if;

  select count(*)::integer
  into active_count
  from public.applications a
  where a.class_id = p_class_id
    and a.status::text in ('applied', 'waiting', 'confirmed');

  if active_count >= class_record.seats_total then
    raise exception '마감된 수업이에요.';
  end if;

  insert into public.applications (
    parent_id,
    child_id,
    class_id,
    status
  )
  values (
    current_user_id,
    p_child_id,
    p_class_id,
    'applied'
  )
  returning * into new_application;

  return new_application;
end;
$$;

grant execute on function public.apply_to_class(uuid, uuid) to authenticated;
