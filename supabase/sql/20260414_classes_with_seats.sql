update public.classes
set seats_total = 6
where seats_total is distinct from 6;

create or replace view public.classes_with_seats as
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
  count(a.id)::integer as active_application_count
from public.classes c
left join public.applications a
  on a.class_id = c.id
  and a.status::text in ('applied', 'waiting', 'confirmed')
group by c.id;

grant select on public.classes_with_seats to authenticated;
