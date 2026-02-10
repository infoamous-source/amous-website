-- ========================================
-- AMOUS 웹사이트 - Supabase 스키마 확인 및 수정
-- 작성일: 2026.02.10
-- ========================================

-- ========================================
-- STEP 1: 모든 테이블 스키마 확인
-- ========================================

-- 1-1. Affiliates 테이블 컬럼 확인
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name='affiliates'
ORDER BY ordinal_position;

-- 1-2. Instructors 테이블 컬럼 확인
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name='instructors'
ORDER BY ordinal_position;

-- 1-3. Services 테이블 컬럼 확인
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name='services'
ORDER BY ordinal_position;

-- 1-4. Cases 테이블 컬럼 확인
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name='cases'
ORDER BY ordinal_position;

-- ========================================
-- STEP 2: 누락된 컬럼 추가
-- (위 결과를 보고 필요한 것만 실행)
-- ========================================

-- 2-1. Affiliates 테이블
-- images 컬럼이 없으면 추가
ALTER TABLE affiliates
ADD COLUMN IF NOT EXISTS images TEXT[];

-- 2-2. Instructors 테이블
-- certifications 컬럼이 없으면 추가
ALTER TABLE instructors
ADD COLUMN IF NOT EXISTS certifications TEXT[];

-- career 컬럼이 없으면 추가
ALTER TABLE instructors
ADD COLUMN IF NOT EXISTS career TEXT;

-- lecture_history 컬럼이 없으면 추가
ALTER TABLE instructors
ADD COLUMN IF NOT EXISTS lecture_history TEXT;

-- image_url 컬럼이 없으면 추가
ALTER TABLE instructors
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2-3. Services 테이블
-- image_url 컬럼이 없으면 추가 (이미 있을 가능성 높음)
ALTER TABLE services
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- 2-4. Cases 테이블
-- image_url 컬럼이 없으면 추가 (이미 있을 가능성 높음)
ALTER TABLE cases
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- ========================================
-- STEP 3: PostgREST 스키마 캐시 갱신 (필수!)
-- ========================================
NOTIFY pgrst, 'reload schema';

-- ========================================
-- STEP 4: 데이터 확인
-- ========================================

-- 4-1. Affiliates 데이터 확인
SELECT id, name, images
FROM affiliates
LIMIT 5;

-- 4-2. Instructors 데이터 확인
SELECT id, name, image_url, certifications, career
FROM instructors
LIMIT 5;

-- 4-3. Services 데이터 확인
SELECT id, title, image_url
FROM services
LIMIT 5;

-- 4-4. Cases 데이터 확인
SELECT id, title, image_url
FROM cases
LIMIT 5;

-- ========================================
-- STEP 5: 검증 (최종 확인)
-- ========================================

-- 5-1. 모든 테이블의 이미지 관련 컬럼 확인
SELECT
  'affiliates' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name='affiliates' AND column_name='images'

UNION ALL

SELECT
  'instructors' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name='instructors' AND column_name='image_url'

UNION ALL

SELECT
  'services' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name='services' AND column_name='image_url'

UNION ALL

SELECT
  'cases' as table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name='cases' AND column_name='image_url';

-- ========================================
-- 실행 순서:
-- 1. STEP 1의 쿼리들을 하나씩 실행하여 각 테이블 스키마 확인
-- 2. 누락된 컬럼이 있으면 STEP 2의 해당 ALTER TABLE 실행
-- 3. STEP 3의 NOTIFY 반드시 실행
-- 4. 10초 대기
-- 5. STEP 4로 데이터 확인
-- 6. STEP 5로 최종 검증
-- ========================================
