# Globee Admin Web

Vite + React + TypeScript로 만든 운영진 웹입니다. 운영진은 문화교류를 개설하고, 신청 현황을 확인하며, 완료문화 기록과 사진을 등록합니다.

## Main Features

- 운영진 로그인
- 전체 현황과 사용자별 현황 확인
- 학부모 신청 확인, 승인, 취소
- 문화교류 개설, 취소, 테스트 데이터 완전 삭제
- 완료문화 등록, 수정, 미참여 처리, 신청완료 상태로 되돌리기
- 완료문화 사진 업로드와 삭제
- Supabase Realtime + polling 기반 자동 갱신

## Environment

`admin-web/.env.local`에 아래 값이 필요합니다.

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

service role key는 관리자웹에 넣지 않습니다.

## Development

```bash
npm install
npm run dev
```

`npm run dev`는 로컬 개발용 서버입니다. 운영진이 실제로 사용하는 주소는 Vercel에 배포된 admin URL입니다.

## Build

```bash
npm.cmd run build
```

## Deployment

GitHub에 push하면 Vercel 프로젝트가 자동으로 다시 배포됩니다.

관리자웹은 세션 저장을 꺼두었으므로, 새로 접속하거나 새로고침하면 다시 로그인해야 합니다.

## Security Notes

- 관리자 URL과 비밀번호는 팀 외부에 공유하지 않습니다.
- 운영용 계정은 `profiles.role = admin`이어야 합니다.
- 수업 취소와 삭제는 Supabase RPC로 처리되어 중간 실패로 인한 반쪽 상태를 줄입니다.
