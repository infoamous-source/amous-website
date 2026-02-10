# Supabase SQL 실행 가이드

아래 SQL을 Supabase Dashboard > SQL Editor에서 순서대로 실행하세요.

---

## 1. Storage 버킷 공개 설정 (홈페이지 이미지 미표시 해결)

```sql
-- images 버킷을 public으로 변경
UPDATE storage.buckets SET public = true WHERE name = 'images';

-- 누구나 이미지를 읽을 수 있는 정책 추가
CREATE POLICY "Public read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');
```

> 이 SQL 실행 후, 홈페이지에서 Supabase Storage의 이미지가 정상 표시됩니다.

---

## 2. RLS 정책 강화 (데이터 보안)

현재 모든 테이블이 `USING (true) WITH CHECK (true)` 상태여서 anon key로 누구나 데이터를 수정/삭제할 수 있습니다.
아래 SQL로 **읽기만 공개**, **쓰기는 차단**하도록 변경합니다.

> 참고: 쓰기 작업은 이미 API 라우트에서 JWT 토큰 검증 후 수행되므로,
> service_role key 없이도 현재 anon key 기반 클라이언트로는 프론트엔드에서 직접 쓰기가 차단됩니다.

```sql
-- ========================================
-- 기존 정책 모두 삭제 후 재생성
-- ========================================

-- site_content 테이블
DROP POLICY IF EXISTS "Enable read access for all users" ON site_content;
DROP POLICY IF EXISTS "Enable insert access for all users" ON site_content;
DROP POLICY IF EXISTS "Enable update access for all users" ON site_content;
DROP POLICY IF EXISTS "Enable delete access for all users" ON site_content;
DROP POLICY IF EXISTS "Public read site_content" ON site_content;
DROP POLICY IF EXISTS "Service role write site_content" ON site_content;

CREATE POLICY "Public read site_content"
  ON site_content FOR SELECT
  USING (true);

CREATE POLICY "Service role write site_content"
  ON site_content FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- services 테이블
DROP POLICY IF EXISTS "Enable read access for all users" ON services;
DROP POLICY IF EXISTS "Enable insert access for all users" ON services;
DROP POLICY IF EXISTS "Enable update access for all users" ON services;
DROP POLICY IF EXISTS "Enable delete access for all users" ON services;
DROP POLICY IF EXISTS "Public read services" ON services;
DROP POLICY IF EXISTS "Service role write services" ON services;

CREATE POLICY "Public read services"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Service role write services"
  ON services FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- instructors 테이블
DROP POLICY IF EXISTS "Enable read access for all users" ON instructors;
DROP POLICY IF EXISTS "Enable insert access for all users" ON instructors;
DROP POLICY IF EXISTS "Enable update access for all users" ON instructors;
DROP POLICY IF EXISTS "Enable delete access for all users" ON instructors;
DROP POLICY IF EXISTS "Public read instructors" ON instructors;
DROP POLICY IF EXISTS "Service role write instructors" ON instructors;

CREATE POLICY "Public read instructors"
  ON instructors FOR SELECT
  USING (true);

CREATE POLICY "Service role write instructors"
  ON instructors FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- cases 테이블
DROP POLICY IF EXISTS "Enable read access for all users" ON cases;
DROP POLICY IF EXISTS "Enable insert access for all users" ON cases;
DROP POLICY IF EXISTS "Enable update access for all users" ON cases;
DROP POLICY IF EXISTS "Enable delete access for all users" ON cases;
DROP POLICY IF EXISTS "Public read cases" ON cases;
DROP POLICY IF EXISTS "Service role write cases" ON cases;

CREATE POLICY "Public read cases"
  ON cases FOR SELECT
  USING (true);

CREATE POLICY "Service role write cases"
  ON cases FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- affiliates 테이블
DROP POLICY IF EXISTS "Enable read access for all users" ON affiliates;
DROP POLICY IF EXISTS "Enable insert access for all users" ON affiliates;
DROP POLICY IF EXISTS "Enable update access for all users" ON affiliates;
DROP POLICY IF EXISTS "Enable delete access for all users" ON affiliates;
DROP POLICY IF EXISTS "Public read affiliates" ON affiliates;
DROP POLICY IF EXISTS "Service role write affiliates" ON affiliates;

CREATE POLICY "Public read affiliates"
  ON affiliates FOR SELECT
  USING (true);

CREATE POLICY "Service role write affiliates"
  ON affiliates FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

---

## 3. service_role key 설정 (코드 수정 완료됨)

API 라우트에서 `supabaseAdmin` (service_role 클라이언트)를 사용하도록 코드가 이미 수정되었습니다.

### 남은 작업

1. **Supabase Dashboard > Settings > API** 에서 `service_role` key (secret) 복사
2. `.env.local`의 `SUPABASE_SERVICE_ROLE_KEY=여기에_서비스롤키_붙여넣기` 부분에 실제 키 입력
3. **Vercel 환경변수**에도 `SUPABASE_SERVICE_ROLE_KEY` 추가

---

## 실행 순서 요약

1. **Section 1** (Storage) — 완료
2. **Section 2** (RLS 강화) — SQL Editor에서 실행
3. **Section 3** (service_role key) — `.env.local` + Vercel 환경변수에 키 추가
4. 관리자 페이지 테스트 → 쓰기 동작 확인
