insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'completed-class-photos',
  'completed-class-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.completed_class_photos (
  id uuid primary key default gen_random_uuid(),
  completed_class_id uuid not null references public.completed_classes(id) on delete cascade,
  storage_path text not null unique,
  file_name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create index if not exists completed_class_photos_completed_class_id_idx
on public.completed_class_photos (completed_class_id, sort_order, created_at);

alter table public.completed_class_photos enable row level security;

drop policy if exists "completed_class_photos_parent_select" on public.completed_class_photos;
drop policy if exists "completed_class_photos_admin_all" on public.completed_class_photos;

create policy "completed_class_photos_parent_select"
on public.completed_class_photos for select
to authenticated
using (
  exists (
    select 1
    from public.completed_classes cc
    join public.applications a on a.id = cc.application_id
    where cc.id = completed_class_photos.completed_class_id
      and a.parent_id = auth.uid()
  )
);

create policy "completed_class_photos_admin_all"
on public.completed_class_photos for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "completed_class_photos_storage_parent_select" on storage.objects;
drop policy if exists "completed_class_photos_storage_admin_select" on storage.objects;
drop policy if exists "completed_class_photos_storage_admin_insert" on storage.objects;
drop policy if exists "completed_class_photos_storage_admin_update" on storage.objects;
drop policy if exists "completed_class_photos_storage_admin_delete" on storage.objects;

create policy "completed_class_photos_storage_parent_select"
on storage.objects for select
to authenticated
using (
  bucket_id = 'completed-class-photos'
  and exists (
    select 1
    from public.completed_class_photos p
    join public.completed_classes cc on cc.id = p.completed_class_id
    join public.applications a on a.id = cc.application_id
    where p.storage_path = storage.objects.name
      and a.parent_id = auth.uid()
  )
);

create policy "completed_class_photos_storage_admin_select"
on storage.objects for select
to authenticated
using (
  bucket_id = 'completed-class-photos'
  and public.is_admin()
);

create policy "completed_class_photos_storage_admin_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'completed-class-photos'
  and public.is_admin()
);

create policy "completed_class_photos_storage_admin_update"
on storage.objects for update
to authenticated
using (
  bucket_id = 'completed-class-photos'
  and public.is_admin()
)
with check (
  bucket_id = 'completed-class-photos'
  and public.is_admin()
);

create policy "completed_class_photos_storage_admin_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'completed-class-photos'
  and public.is_admin()
);
