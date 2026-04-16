create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.classes enable row level security;
alter table public.applications enable row level security;
alter table public.completed_classes enable row level security;
alter table public.stamp_countries enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (id = auth.uid() and role = 'parent');
create policy "profiles_update_own_or_admin"
on public.profiles for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (public.is_admin() or (id = auth.uid() and role = 'parent'));

drop policy if exists "children_parent_all" on public.children;
drop policy if exists "children_admin_select" on public.children;
create policy "children_parent_all"
on public.children for all
to authenticated
using (parent_id = auth.uid())
with check (parent_id = auth.uid());
create policy "children_admin_select"
on public.children for select
to authenticated
using (public.is_admin());

drop policy if exists "classes_select_authenticated" on public.classes;
drop policy if exists "classes_admin_all" on public.classes;
create policy "classes_select_authenticated"
on public.classes for select
to authenticated
using (true);
create policy "classes_admin_all"
on public.classes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "applications_parent_select" on public.applications;
drop policy if exists "applications_parent_cancel" on public.applications;
drop policy if exists "applications_admin_all" on public.applications;
create policy "applications_parent_select"
on public.applications for select
to authenticated
using (parent_id = auth.uid());
create policy "applications_parent_cancel"
on public.applications for update
to authenticated
using (parent_id = auth.uid())
with check (parent_id = auth.uid() and status::text = 'canceled');
create policy "applications_admin_all"
on public.applications for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "completed_classes_parent_select" on public.completed_classes;
drop policy if exists "completed_classes_admin_all" on public.completed_classes;
create policy "completed_classes_parent_select"
on public.completed_classes for select
to authenticated
using (
  exists (
    select 1
    from public.applications a
    where a.id = completed_classes.application_id
      and a.parent_id = auth.uid()
  )
);
create policy "completed_classes_admin_all"
on public.completed_classes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "stamp_countries_select_authenticated" on public.stamp_countries;
drop policy if exists "stamp_countries_admin_all" on public.stamp_countries;
create policy "stamp_countries_select_authenticated"
on public.stamp_countries for select
to authenticated
using (true);
create policy "stamp_countries_admin_all"
on public.stamp_countries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
