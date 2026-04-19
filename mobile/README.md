# Globee Mobile

Expo + React Native로 만든 학부모용 모바일 앱입니다. 보호자는 전화번호 인증으로 가입하고, 아이를 등록한 뒤 문화교류 일정을 신청하고 완료 기록과 나라 스탬프를 확인합니다.

## Main Features

- 전화번호 OTP 회원가입, 로그인, 비밀번호 재설정
- 아이 등록, 수정, 삭제
- 캠퍼스별 문화교류 목록 확인
- 아이별 문화교류 신청, 확인중 상태 확인, 승인된 신청 취소
- 완료문화 기록, 활동 사진 보기와 갤러리 저장
- 아이별 나라 스탬프 확인
- 로그아웃과 계정 탈퇴

## Environment

`mobile/.env.local`에 아래 값이 필요합니다.

```text
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

`mobile/.env.example`은 필요한 키 이름만 보여주는 예시 파일입니다.
service role key와 webhook URL은 모바일 앱에 넣지 않습니다.

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
npx.cmd eas-cli@latest build --platform android --profile preview
```

Play Store 제출용 Android AAB:

```bash
npx.cmd eas-cli@latest build --platform android --profile production
```

EAS 환경변수에는 `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`만 등록합니다.

## EAS Update

출시된 앱의 문구, 레이아웃, 색상, 대부분의 JavaScript 로직은 EAS Update로 빠르게 배포할 수 있습니다.

테스트용 OTA 업데이트:

```bash
npx.cmd eas-cli@latest update --platform android --channel preview --message "Fix signup layout"
```

실사용자용 OTA 업데이트:

```bash
npx.cmd eas-cli@latest update --platform android --channel production --message "Fix signup layout"
```

운영 원칙:

- 먼저 `preview` 채널에 업데이트를 보내고 팀원 폰에서 확인합니다.
- 문제가 없을 때만 `production` 채널에 보냅니다.
- Android만 테스트할 때는 `--platform android`를 꼭 붙입니다. 생략하면 web export까지 실행되며 AsyncStorage/window 관련 오류가 날 수 있습니다.
- native 라이브러리 추가, 권한 변경, 앱 아이콘/스플래시 변경, Expo SDK 업그레이드는 EAS Update로 해결할 수 없고 새 앱 빌드가 필요합니다.
- `app.json`의 `version`을 올리면 `runtimeVersion`도 함께 바뀌므로, 새 앱 버전과 OTA 업데이트 호환 범위가 분리됩니다.
