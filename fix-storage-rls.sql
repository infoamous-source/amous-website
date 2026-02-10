-- Supabase Storage RLS 정책 수정
-- 이미지가 Admin에서는 보이지만 홈페이지에서는 안 보이는 문제 해결

-- ========================================
-- 1. 현재 Storage 정책 확인
-- ========================================
SELECT * FROM storage.buckets WHERE name = 'images';

-- ========================================
-- 2. images 버킷을 PUBLIC으로 변경
-- ========================================
UPDATE storage.buckets
SET public = true
WHERE name = 'images';

-- ========================================
-- 3. Storage Objects 정책 확인
-- ========================================
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'storage'
AND tablename = 'objects';

-- ========================================
-- 4. 공개 읽기 정책 생성 (없으면)
-- ========================================
-- images 버킷의 모든 파일에 대한 공개 읽기 허용
CREATE POLICY IF NOT EXISTS "Public Access for images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- ========================================
-- 5. 검증: 테스트 쿼리
-- ========================================
-- 실제 저장된 이미지 URL 확인
SELECT id, title, image_url
FROM cases
WHERE image_url IS NOT NULL
LIMIT 5;

-- ========================================
-- 추가 참고사항
-- ========================================
-- Supabase Dashboard에서도 확인 가능:
-- 1. Storage → images 버킷 클릭
-- 2. Configuration 탭
-- 3. "Public bucket" 토글 ON

-- 또는 기존 정책 삭제 후 재생성:
-- DROP POLICY IF EXISTS "Public Access for images" ON storage.objects;
