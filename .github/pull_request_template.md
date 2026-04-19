## Summary

- 

## Changed Areas

- [ ] `mobile`
- [ ] `admin-web`
- [ ] `supabase`
- [ ] `web`
- [ ] docs / GitHub / config

## Safety Checklist

- [ ] No service role key, webhook URL, password, or secret value is committed.
- [ ] Frontend/mobile/admin/public web only use publishable Supabase URL/anon key names.
- [ ] Application status flow still keeps `applied` as "신청 확인중" and `confirmed` as "신청 완료".
- [ ] Completion/no-show flow still blocks while the same class has remaining `applied` applications.
- [ ] Class delete remains limited to test or wrongly-created culture exchange data.
- [ ] App icon, splash, permissions, native libraries, or Expo SDK changes are called out as requiring a new APK/AAB build.

## Verification

- [ ] `mobile`: `npx.cmd tsc --noEmit`
- [ ] `mobile`: `npm.cmd run lint`
- [ ] `admin-web`: `npx.cmd tsc --noEmit`
- [ ] `admin-web`: build only when intentionally checking release output
- [ ] `web`: local links/assets checked
- [ ] SQL/Edge Function changes reviewed for RLS and secret handling

## Release Notes

- SQL files to run:
- Edge Functions to deploy:
- EAS build/update needed:
