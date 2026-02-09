# 강사 데이터 설정 가이드

## 문제 상황
Instructors 테이블에 데이터를 추가하려고 할 때 스키마 캐시 오류가 발생합니다.

## 해결 방법

### 1. Supabase 대시보드 접속
1. https://wcjeytljpqvwfyspewlz.supabase.co 접속
2. 로그인
3. 좌측 메뉴에서 **SQL Editor** 클릭

### 2. SQL 스크립트 실행
`setup-instructors-table.sql` 파일의 내용을 복사하여 SQL Editor에 붙여넣고 실행하세요.

이 스크립트는:
- Instructors 테이블 생성 (없을 경우)
- RLS 정책 재설정
- 샘플 강사 데이터 1개 추가
- 필요한 인덱스 생성

### 3. 실행 후 확인
스크립트 실행 후 다음 명령으로 확인:

```bash
node check-db.js
```

강사 데이터가 1개 이상 표시되면 성공입니다.

### 4. Admin 페이지에서 강사 추가
1. 웹사이트의 `/admin` 페이지 접속
2. 로그인
3. "강사 관리" 메뉴
4. "새 강사 추가" 버튼 클릭
5. 정보 입력 후 저장

## 대안: 수동으로 Supabase 대시보드에서 추가

SQL Editor 대신 Table Editor를 사용할 수도 있습니다:

1. Supabase 대시보드 > **Table Editor**
2. **instructors** 테이블 선택
3. **Insert** > **Insert row** 클릭
4. 각 필드 입력:
   - `name`: 강사 이름 (필수)
   - `service_ids`: `{1}` (서비스 ID 배열, 중괄호로 감싸기)
   - `role`: 역할/직책
   - `description`: 소개
   - `specialties`: `{"스피치","프레젠테이션"}` (배열)
   - `certifications`: `{"자격증1","자격증2"}` (배열)
   - `career`: 경력
   - `lecture_history`: 강의 이력
   - `sort_order`: 1 (정렬 순서)

## 문제가 계속되면

RLS 정책을 수동으로 확인하세요:

1. Supabase 대시보드 > **Authentication** > **Policies**
2. `instructors` 테이블 선택
3. SELECT, INSERT, UPDATE, DELETE 정책이 모두 `USING (true)` 또는 `WITH CHECK (true)`로 설정되어 있는지 확인
