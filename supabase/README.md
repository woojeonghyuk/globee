# Globee Supabase

Supabase PostgreSQL, RLS 정책, Storage 정책, Edge Functions를 관리하는 폴더입니다.

## Folders

```text
sql/        SQL 마이그레이션과 정책 파일
functions/  Supabase Edge Functions
```

## Important Tables

- `profiles`: 사용자 역할과 보호자 정보
- `children`: 보호자별 아이 정보
- `classes`: 운영진이 개설한 문화교류 일정
- `applications`: 아이별 신청 상태
- `completed_classes`: 완료문화 기록과 선생님 코멘트
- `completed_class_photos`: 완료문화 사진 메타데이터
- `stamp_countries`: 스탬프 국가 목록

## Important Functions

- `apply_to_class(p_child_id, p_class_id)`: 학부모 앱의 신청 RPC
- `admin_confirm_application(p_application_id)`: 운영진 신청 승인 RPC
- `admin_cancel_pending_application(p_application_id)`: 운영진 확인중 신청 취소 RPC
- `admin_cancel_class(p_class_id)`: 운영진 수업 취소 RPC
- `admin_delete_class(p_class_id)`: 운영진 테스트 수업 완전 삭제 RPC
- `is_phone_registered(p_phone)`: 회원가입 중 전화번호 중복 확인
- `get_active_application_count(p_class_id)`: 자리 수 계산용 신청 수 조회

## Application Status Flow

- `applied`: 학부모가 신청했고 운영진 확인을 기다리는 상태입니다. 자리 수에는 포함됩니다.
- `confirmed`: 운영진이 승인한 신청 완료 상태입니다. 완료문화 등록 대상입니다.
- `waiting`: 향후 대기/결제 흐름을 위해 남겨둔 상태입니다.
- `completed`: 완료문화와 스탬프에 반영된 상태입니다.
- `no_show`: 미참여 상태입니다.
- `canceled`: 신청 취소 상태입니다.

## Edge Functions

- `delete-account`: 학부모 계정 탈퇴 처리

배포:

```bash
npx supabase functions deploy delete-account --project-ref emuvubzjxdfdonjrabaw --no-verify-jwt
```

## Security Notes

- service role key는 Edge Function 환경변수로만 사용합니다.
- 프론트엔드에는 service role key를 넣지 않습니다.
- 새 SQL을 추가하면 Supabase SQL Editor에서 실행한 뒤 앱/관리자웹 주요 흐름을 다시 테스트합니다.
- Storage 사진 파일은 private bucket에 저장하고, RLS로 해당 보호자와 운영진만 접근하게 합니다.
