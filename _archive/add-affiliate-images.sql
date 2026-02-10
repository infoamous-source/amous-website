-- Affiliates 테이블에 images 컬럼 추가
-- Supabase 대시보드 > SQL Editor에서 실행하세요

-- 1. images 컬럼 추가 (TEXT 배열, 최대 5개)
ALTER TABLE affiliates
ADD COLUMN IF NOT EXISTS images TEXT[];

-- 2. 스키마 캐시 리프레시
NOTIFY pgrst, 'reload schema';

-- 3. 확인
SELECT id, name, images FROM affiliates;
