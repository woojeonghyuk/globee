create or replace function public.admin_confirm_application(p_application_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception '운영진 계정만 신청을 승인할 수 있어요.';
  end if;

  update public.applications
  set status = 'confirmed',
      updated_at = now()
  where id = p_application_id
    and status::text = 'applied';

  if not found then
    raise exception '확인 중인 신청을 찾을 수 없어요.';
  end if;
end;
$$;

grant execute on function public.admin_confirm_application(uuid) to authenticated;

create or replace function public.admin_cancel_pending_application(p_application_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_class_id uuid;
begin
  if not public.is_admin() then
    raise exception '운영진 계정만 신청을 취소할 수 있어요.';
  end if;

  update public.applications
  set status = 'canceled',
      updated_at = now()
  where id = p_application_id
    and status::text = 'applied'
  returning class_id into target_class_id;

  if not found then
    raise exception '확인 중인 신청을 찾을 수 없어요.';
  end if;

  update public.classes c
  set is_open = false,
      updated_at = now()
  where c.id = target_class_id
    and c.starts_at <= now()
    and not exists (
      select 1
      from public.applications a
      where a.class_id = c.id
        and a.status::text in ('applied', 'waiting', 'confirmed')
    );
end;
$$;

grant execute on function public.admin_cancel_pending_application(uuid) to authenticated;
