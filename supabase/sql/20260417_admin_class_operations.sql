create or replace function public.admin_cancel_class(p_class_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception '운영진 계정만 수업을 취소할 수 있어요.';
  end if;

  update public.applications
  set status = 'canceled',
      updated_at = now()
  where class_id = p_class_id
    and status::text in ('applied', 'waiting', 'confirmed');

  update public.classes
  set is_open = false,
      updated_at = now()
  where id = p_class_id;

  if not found then
    raise exception '수업을 찾을 수 없어요.';
  end if;
end;
$$;

grant execute on function public.admin_cancel_class(uuid) to authenticated;

create or replace function public.admin_delete_class(p_class_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception '운영진 계정만 수업을 삭제할 수 있어요.';
  end if;

  delete from public.completed_classes cc
  using public.applications a
  where cc.application_id = a.id
    and a.class_id = p_class_id;

  delete from public.applications
  where class_id = p_class_id;

  delete from public.classes
  where id = p_class_id;

  if not found then
    raise exception '수업을 찾을 수 없어요.';
  end if;
end;
$$;

grant execute on function public.admin_delete_class(uuid) to authenticated;
