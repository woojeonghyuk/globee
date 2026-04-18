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
- Operator Alerts: KakaoWork Incoming Webhook through Supabase Edge Functions
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
- KakaoWork webhook URLs are stored only as Supabase Secrets.
- Admin web session persistence is disabled, so operators must log in again after closing or refreshing the page.
- Test OTP entries in Supabase Auth should stay empty before production release.

## Common Checks

GitHub에 push하거나 PR을 만들면 GitHub Actions `CI`가 아래 검사를 자동으로 실행합니다.

- 추적되면 안 되는 파일 검사: `.env`, `node_modules`, `.vercel`, `.eas`, `dist`, `build`
- 모바일 앱: TypeScript 타입체크, ESLint
- 운영진 웹: production build
- 공개 웹사이트: 로컬 링크와 이미지 참조 확인

로컬에서 직접 확인할 때는 아래 명령을 사용합니다.

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
4. Confirm GitHub Actions `CI` passed on GitHub.
5. Build Android preview APK with EAS and test on a real Android device.
6. Build production AAB and submit through Google Play Console.

## Release Discipline

- 운영진 웹과 공개 웹사이트는 GitHub `main`에 push하면 Vercel이 자동 배포합니다.
- 모바일 앱은 Google Play에 올라가는 릴리즈이므로 자동 배포하지 않고, EAS production build를 수동으로 실행합니다.
- 출시된 모바일 앱의 문구, 디자인, JavaScript 수정은 EAS Update의 `preview` 채널에서 먼저 확인한 뒤 `production` 채널로 배포합니다.
- Supabase SQL과 Edge Functions는 자동 적용하지 않습니다. DB 변경은 SQL Editor에서 실행하고, 함수 변경은 Supabase CLI로 배포한 뒤 테스트합니다.
- 새 기능을 넣을 때는 `mobile`, `admin-web`, `supabase`, `web` 중 영향을 받는 폴더의 README도 함께 갱신합니다.
