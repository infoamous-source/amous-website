-- site_content 테이블의 RLS 정책 확인 및 재설정

-- 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "site_content_select" ON site_content;
DROP POLICY IF EXISTS "site_content_insert" ON site_content;
DROP POLICY IF EXISTS "site_content_update" ON site_content;
DROP POLICY IF EXISTS "site_content_delete" ON site_content;

-- 모든 사용자가 읽기 가능
CREATE POLICY "site_content_select" ON site_content
  FOR SELECT
  USING (true);

-- 모든 사용자가 삽입 가능
CREATE POLICY "site_content_insert" ON site_content
  FOR INSERT
  WITH CHECK (true);

-- 모든 사용자가 업데이트 가능
CREATE POLICY "site_content_update" ON site_content
  FOR UPDATE
  USING (true);

-- 모든 사용자가 삭제 가능 (필요시)
CREATE POLICY "site_content_delete" ON site_content
  FOR DELETE
  USING (true);

-- RLS 활성화 확인
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
