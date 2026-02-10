-- RLS(Row Level Security) 정책 확인 쿼리
-- Supabase Dashboard → SQL Editor에서 실행하세요

-- 1. cases 테이블의 RLS 활성화 여부 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('cases', 'services', 'affiliates');

-- 2. cases 테이블의 RLS 정책 확인
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('cases', 'services', 'affiliates')
ORDER BY tablename, policyname;

-- 3. 임시로 RLS 비활성화 (테스트용)
-- ALTER TABLE cases DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE services DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE affiliates DISABLE ROW LEVEL SECURITY;

-- 4. 테스트: 직접 데이터 INSERT 시도
-- INSERT INTO cases (category, company, title, content, result, image_url, is_published)
-- VALUES ('immigrant', 'Test Company', 'Test Case', 'Test content', 'Test result', 'https://test.com/image.jpg', true)
-- RETURNING *;

-- 5. 최근 저장된 데이터 확인
SELECT id, title, image_url, created_at
FROM cases
ORDER BY created_at DESC
LIMIT 5;

SELECT id, title, image_url, created_at
FROM services
ORDER BY created_at DESC
LIMIT 5;

SELECT id, name, images, updated_at
FROM affiliates
ORDER BY updated_at DESC
LIMIT 5;
