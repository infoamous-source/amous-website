-- Instructors 테이블 생성 및 RLS 설정
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. 테이블이 없으면 생성
CREATE TABLE IF NOT EXISTS instructors (
  id SERIAL PRIMARY KEY,
  service_ids INT[],
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  specialties TEXT[],
  certifications TEXT[],
  career TEXT,
  lecture_history TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS 활성화
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

-- 3. 기존 정책 삭제 (있을 경우)
DROP POLICY IF EXISTS "instructors_select" ON instructors;
DROP POLICY IF EXISTS "instructors_insert" ON instructors;
DROP POLICY IF EXISTS "instructors_update" ON instructors;
DROP POLICY IF EXISTS "instructors_delete" ON instructors;

-- 4. 모든 사용자가 읽기 가능
CREATE POLICY "instructors_select" ON instructors
  FOR SELECT
  USING (true);

-- 5. 모든 사용자가 삽입 가능
CREATE POLICY "instructors_insert" ON instructors
  FOR INSERT
  WITH CHECK (true);

-- 6. 모든 사용자가 업데이트 가능
CREATE POLICY "instructors_update" ON instructors
  FOR UPDATE
  USING (true);

-- 7. 모든 사용자가 삭제 가능
CREATE POLICY "instructors_delete" ON instructors
  FOR DELETE
  USING (true);

-- 8. 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_instructors_service_ids ON instructors USING GIN (service_ids);
CREATE INDEX IF NOT EXISTS idx_instructors_sort_order ON instructors (sort_order);

-- 9. 샘플 데이터 삽입 (테이블이 비어있을 경우에만)
INSERT INTO instructors (service_ids, name, role, description, specialties, certifications, career, lecture_history, sort_order)
SELECT
  ARRAY[1],
  '대표 강사',
  '대표 / 현직 아나운서',
  '현직 아나운서로서 정부기관 및 기업 공식행사를 진행하며, 15년간의 현장 경험을 바탕으로 실전 커뮤니케이션 교육을 제공합니다.',
  ARRAY['스피치', '프레젠테이션', '면접 코칭', '아나운서 양성'],
  ARRAY['아나운서 자격증', '스피치 전문 강사', 'NCS 직업기초능력 강사'],
  '현직 아나운서 (2010~현재)
정부기관 및 기업 공식행사 MC
교육 경력 15년',
  '정부기관 및 공공기관 임직원 대상 스피치 교육
기업 신입사원 프레젠테이션 교육
면접 합격자 1,000명 이상 배출',
  1
WHERE NOT EXISTS (SELECT 1 FROM instructors LIMIT 1);

-- 10. 확인
SELECT COUNT(*) as instructor_count FROM instructors;
SELECT * FROM instructors ORDER BY sort_order;
