revoke update on table public.applications from authenticated;
grant update (status, updated_at) on table public.applications to authenticated;

drop policy if exists "applications_parent_cancel" on public.applications;
create policy "applications_parent_cancel"
on public.applications for update
to authenticated
using (
  parent_id = auth.uid()
  and status::text in ('applied', 'waiting', 'confirmed')
)
with check (
  parent_id = auth.uid()
  and status::text = 'canceled'
);
