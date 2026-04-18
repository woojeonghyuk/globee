create or replace function public.has_pending_review_applications_for_class(
  p_class_id uuid,
  p_excluded_application_id uuid default null
)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.applications a
    where a.class_id = p_class_id
      and a.status::text = 'applied'
      and (
        p_excluded_application_id is null
        or a.id <> p_excluded_application_id
      )
  );
$$;

grant execute on function public.has_pending_review_applications_for_class(uuid, uuid)
to authenticated;

create or replace function public.ensure_application_can_finalize()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status::text not in ('completed', 'no_show') then
    return new;
  end if;

  if old.status::text not in ('confirmed', 'completed', 'no_show') then
    raise exception '신청 완료 상태만 완료문화 또는 미참여로 처리할 수 있어요.';
  end if;

  if public.has_pending_review_applications_for_class(new.class_id, new.id) then
    raise exception '같은 문화교류에 확인중인 신청이 남아 있어요. 먼저 승인 또는 신청 취소를 완료해 주세요.';
  end if;

  return new;
end;
$$;

drop trigger if exists before_application_finalized_guard
on public.applications;

create trigger before_application_finalized_guard
before update of status
on public.applications
for each row
when (old.status is distinct from new.status)
execute function public.ensure_application_can_finalize();

create or replace function public.ensure_completed_class_application_ready()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_application public.applications%rowtype;
begin
  select *
  into target_application
  from public.applications
  where id = new.application_id
  for update;

  if not found then
    raise exception '완료문화로 등록할 신청을 찾을 수 없어요.';
  end if;

  if target_application.status::text not in ('confirmed', 'completed', 'no_show') then
    raise exception '신청 완료 상태만 완료문화로 등록할 수 있어요.';
  end if;

  if public.has_pending_review_applications_for_class(
    target_application.class_id,
    target_application.id
  ) then
    raise exception '같은 문화교류에 확인중인 신청이 남아 있어요. 먼저 승인 또는 신청 취소를 완료해 주세요.';
  end if;

  return new;
end;
$$;

drop trigger if exists before_completed_class_application_guard
on public.completed_classes;

create trigger before_completed_class_application_guard
before insert or update of application_id
on public.completed_classes
for each row
execute function public.ensure_completed_class_application_ready();

create or replace function public.delete_completion_when_marked_no_show()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status::text = 'no_show' then
    delete from public.completed_classes
    where application_id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists on_application_no_show_delete_completion
on public.applications;

create trigger on_application_no_show_delete_completion
after update of status
on public.applications
for each row
when (old.status is distinct from new.status)
execute function public.delete_completion_when_marked_no_show();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.completed_classes'::regclass
      and conname = 'completed_classes_diary_required'
  ) then
    alter table public.completed_classes
    add constraint completed_classes_diary_required
    check (diary is not null and btrim(diary) <> '')
    not valid;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.completed_classes'::regclass
      and conname = 'completed_classes_teacher_comment_required'
  ) then
    alter table public.completed_classes
    add constraint completed_classes_teacher_comment_required
    check (teacher_comment is not null and btrim(teacher_comment) <> '')
    not valid;
  end if;
end;
$$;
