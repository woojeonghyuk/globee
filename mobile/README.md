# Globee Mobile

Expo + React Native로 만든 학부모용 모바일 앱입니다. 보호자는 전화번호 인증으로 가입하고, 아이를 등록한 뒤 문화교류 일정을 신청하고 완료 기록과 나라 스탬프를 확인합니다.

## Main Features

- 전화번호 OTP 회원가입, 로그인, 비밀번호 재설정
- 아이 등록, 수정, 삭제
- 캠퍼스별 문화교류 목록 확인
- 아이별 문화교류 신청, 확인중 상태 확인, 승인된 신청 취소
- 완료문화 기록, 활동 사진 보기와 공유/저장
- 아이별 나라 스탬프 확인
- 로그아웃과 계정 탈퇴

## Environment

`mobile/.env.local`에 아래 값이 필요합니다.

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

service role key는 모바일 앱에 넣지 않습니다.

## Development

```bash
npm install
npm start
```

## Checks

```bash
npx.cmd tsc --noEmit
npm.cmd run lint
```

## EAS Build

EAS 프로젝트는 `@woojeonghyuk/globee`로 연결되어 있습니다.

테스트용 Android APK:

```bash
npx eas-cli@latest build --platform android --profile preview
```

Play Store 제출용 Android AAB:

```bash
npx eas-cli@latest build --platform android --profile production
```

EAS 환경변수에는 `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`만 등록합니다.
