create or replace function public.admin_delete_class(p_class_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_class_id uuid;
begin
  if not public.is_admin() then
    raise exception '운영진 계정만 수업을 삭제할 수 있어요.';
  end if;

  select id
  into target_class_id
  from public.classes
  where id = p_class_id
  for update;

  if target_class_id is null then
    raise exception '수업을 찾을 수 없어요.';
  end if;

  delete from public.completed_class_photos p
  using public.completed_classes cc, public.applications a
  where p.completed_class_id = cc.id
    and cc.application_id = a.id
    and a.class_id = p_class_id;

  delete from public.completed_classes cc
  using public.applications a
  where cc.application_id = a.id
    and a.class_id = p_class_id;

  delete from public.applications
  where class_id = p_class_id;

  delete from public.classes
  where id = p_class_id;
end;
$$;

grant execute on function public.admin_delete_class(uuid) to authenticated;
