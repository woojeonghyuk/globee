create or replace function public.get_active_application_count(p_class_id uuid)
returns integer
language sql
security definer
set search_path = public
stable
as $$
  select count(*)::integer
  from public.applications a
  where a.class_id = p_class_id
    and a.status::text in ('applied', 'waiting', 'confirmed');
$$;

grant execute on function public.get_active_application_count(uuid) to authenticated;

create or replace view public.classes_with_seats
with (security_invoker = true)
as
select
  c.id,
  c.title,
  c.country,
  c.flag,
  c.campus,
  c.category,
  c.teacher_name,
  c.target_age,
  c.starts_at,
  c.location,
  c.seats_total,
  c.price,
  c.badge,
  c.image_color,
  c.description,
  c.is_open,
  public.get_active_application_count(c.id) as active_application_count
from public.classes c;

grant select on public.classes_with_seats to authenticated;
