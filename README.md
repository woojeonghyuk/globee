# Globee

Globee는 아이들이 가까운 유학생 선생님과 나라별 문화, 음식, 놀이, 언어를 자연스럽게 경험하고 가족이 그 기록을 모아가는 학부모 앱과 운영진 웹입니다.

## Project Structure

```text
mobile/      Expo + React Native 학부모 앱
admin-web/   Vite + React 운영진 웹
web/         공개 웹사이트, 개인정보처리방침, 이용약관, 계정 삭제 안내
supabase/    SQL 마이그레이션, RLS 정책, Edge Functions
```

## Main Stack

- Mobile: Expo, React Native, Expo Router
- Admin Web: React, Vite, TypeScript
- Backend: Supabase Auth, PostgreSQL, Storage, Realtime, RPC, Edge Functions
- SMS OTP: Supabase Phone Auth + Twilio
- Public/Admin Web Deploy: Vercel
- Mobile Build: EAS Build

## Important URLs

- Public site: `https://globee-st.vercel.app/`
- Admin web: `https://globee-admin.vercel.app/`
- Supabase project: `https://emuvubzjxdfdonjrabaw.supabase.co`

## Security Notes

- Do not commit `.env`, `.env.local`, service role keys, or secret keys.
- Mobile and admin web may only use Supabase URL and anon/publishable key.
- Supabase service role key is used only inside Edge Functions through Supabase environment variables.
- Admin web session persistence is disabled, so operators must log in again after closing or refreshing the page.
- Test OTP entries in Supabase Auth should stay empty before production release.

## Common Checks

```bash
cd mobile
npx.cmd tsc --noEmit
npm.cmd run lint
```

```bash
cd admin-web
npm.cmd run build
```

## Launch Flow

1. Apply new SQL files in `supabase/sql` through Supabase SQL Editor.
2. Deploy changed Edge Functions.
3. Push code to GitHub so Vercel redeploys `web` and `admin-web`.
4. Build Android preview APK with EAS and test on a real Android device.
5. Build production AAB and submit through Google Play Console.
