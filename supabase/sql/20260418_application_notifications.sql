create table if not exists public.application_notifications (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.applications(id) on delete cascade,
  notification_type text not null,
  status text not null default 'sending'
    check (status in ('sending', 'sent', 'failed')),
  attempts integer not null default 0
    check (attempts >= 0),
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (application_id, notification_type)
);

create index if not exists application_notifications_application_id_idx
on public.application_notifications (application_id);

create index if not exists application_notifications_status_idx
on public.application_notifications (status, updated_at);

alter table public.application_notifications enable row level security;

grant select on public.application_notifications to authenticated;

drop policy if exists "application_notifications_admin_select" on public.application_notifications;
create policy "application_notifications_admin_select"
on public.application_notifications for select
to authenticated
using (public.is_admin());
