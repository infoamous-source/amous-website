-- ===================================
-- AMOUS 웹사이트 Supabase 테이블 설정
-- Supabase SQL Editor에서 실행하세요
-- ===================================

-- 1. 사이트 전역 콘텐츠 (Hero, About 등 key-value)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. 교육 서비스 (3개 카테고리)
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  icon TEXT,
  color TEXT,
  page_content TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 강사진 (서비스별 연결)
CREATE TABLE IF NOT EXISTS instructors (
  id SERIAL PRIMARY KEY,
  service_id INT REFERENCES services(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  specialties TEXT[] DEFAULT '{}',
  image_url TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. 협업 사례/후기 (게시판형 누적)
CREATE TABLE IF NOT EXISTS cases (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  company TEXT,
  title TEXT NOT NULL,
  content TEXT,
  result TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. 계열사
CREATE TABLE IF NOT EXISTS affiliates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  icon TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ===================================
-- RLS (Row Level Security) 설정
-- anon 키로 읽기만 허용, 쓰기는 service_role 또는 API Route에서 처리
-- ===================================

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;

-- 모든 테이블에 대해 anon 읽기 허용
CREATE POLICY "Allow public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON instructors FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cases FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON affiliates FOR SELECT USING (true);

-- 모든 테이블에 대해 anon 쓰기도 허용 (API Route에서 인증 처리하므로)
CREATE POLICY "Allow public write" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON instructors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON cases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write" ON affiliates FOR ALL USING (true) WITH CHECK (true);

-- ===================================
-- 초기 시드 데이터 삽입
-- ===================================

-- 사이트 전역 콘텐츠
INSERT INTO site_content (id, value) VALUES
  ('hero_title', '당신의 모든 순간을 특별한 이야기로, AMOUS'),
  ('hero_subtitle', '전문가와 데이터가 만드는 격이 다른 교육 솔루션'),
  ('hero_description', '현직 아나운서 대표의 직강과 현직 기업 면접관의 실전 인사이트로 당신의 성장을 함께합니다.'),
  ('about_title', '왜 에이머스인가?'),
  ('about_description', '전문성, 데이터, 그리고 진심이 만드는 교육의 차이. 에이머스는 단순한 교육을 넘어 당신의 성장 파트너가 됩니다.'),
  ('stat_students', '15000'),
  ('stat_partners', '120'),
  ('stat_programs', '50'),
  ('stat_satisfaction', '98')
ON CONFLICT (id) DO NOTHING;

-- 교육 서비스 3개
INSERT INTO services (slug, title, subtitle, description, icon, color, page_content, sort_order) VALUES
  ('immigrant', '이주민·유학생', '한국 정착의 첫걸음', '한국어 교육부터 문화 적응, 취업 준비까지. 이주민과 유학생이 한국 사회에 성공적으로 정착할 수 있도록 맞춤형 교육을 제공합니다.', 'globe', 'from-blue-500 to-cyan-400', '이주민과 유학생을 위한 체계적인 교육 프로그램을 운영합니다. 한국어 능력 향상부터 문화 이해, 취업 준비까지 종합적인 커리큘럼을 제공하여 성공적인 한국 정착을 돕습니다.', 0),
  ('senior', '중장년·시니어', '인생 2막의 시작', '풍부한 경험을 새로운 역량으로. 디지털 리터러시, 재취업 교육, 사회 참여 프로그램을 통해 활기찬 시니어 라이프를 설계합니다.', 'heart', 'from-emerald-500 to-teal-400', '중장년·시니어 세대를 위한 맞춤형 교육 프로그램입니다. 디지털 역량 강화, 재취업 지원, 사회 참여 활동 등 인생 2막을 위한 다양한 프로그램을 운영합니다.', 1),
  ('career', '취업·진로', '꿈을 현실로', '면접·스피치·자기소개서 코칭부터 커리어 설계까지. 현직 아나운서 출신 전문가의 실전 노하우로 취업 성공률을 높입니다.', 'rocket', 'from-violet-500 to-purple-400', '현직 아나운서이자 기업 면접관 출신 대표의 실전 노하우를 바탕으로 한 취업·진로 코칭 프로그램입니다. 면접 준비, 스피치 훈련, 자기소개서 작성법, 커리어 설계까지 종합적으로 지원합니다.', 2)
ON CONFLICT (slug) DO NOTHING;

-- 강사진
INSERT INTO instructors (service_id, name, role, description, specialties, sort_order) VALUES
  (1, '대표 강사', 'AMOUS 대표 / 현직 아나운서 · 면접관', '현직 정부기관·기업 공식행사 아나운서이자 다수 기업 외부 면접관·자문위원. 현장에서 살아 숨쉬는 실전 노하우를 직접 전수합니다.', ARRAY['스피치 코칭', '면접 컨설팅', 'MC · 사회'], 0),
  (1, '다문화 교육 전문', '글로벌 교육 전문', '다문화 사회 전문가로서 이주민과 유학생의 성공적인 한국 정착을 돕는 맞춤형 교육을 설계합니다.', ARRAY['다문화 교육', '한국어 교육', '문화 적응'], 1),
  (2, '대표 강사', 'AMOUS 대표 / 현직 아나운서 · 면접관', '현직 정부기관·기업 공식행사 아나운서이자 다수 기업 외부 면접관·자문위원. 현장에서 살아 숨쉬는 실전 노하우를 직접 전수합니다.', ARRAY['스피치 코칭', '면접 컨설팅', 'MC · 사회'], 0),
  (2, '시니어 교육 전문', '시니어 라이프 설계', '중장년·시니어 세대의 재취업과 사회 참여를 위한 전문 교육을 설계하고 운영합니다.', ARRAY['디지털 리터러시', '재취업 교육', '사회 참여'], 1),
  (3, '대표 강사', 'AMOUS 대표 / 현직 아나운서 · 면접관', '현직 정부기관·기업 공식행사 아나운서이자 다수 기업 외부 면접관·자문위원. 현장에서 살아 숨쉬는 실전 노하우를 직접 전수합니다.', ARRAY['스피치 코칭', '면접 컨설팅', 'MC · 사회'], 0),
  (3, '취업 코칭 전문', '기업교육 전문', '풍부한 기업 교육 경험을 보유한 기업교육 전문가. 조직의 소통 역량을 한 단계 끌어올립니다.', ARRAY['리더십', '조직 커뮤니케이션', '프레젠테이션'], 1);

-- 협업 사례 초기 데이터
INSERT INTO cases (category, company, title, content, result, is_published) VALUES
  ('career', '대기업 A사', '임직원 커뮤니케이션 역량 강화 프로그램', '대기업 A사 임직원 대상 커뮤니케이션 및 프레젠테이션 역량 강화 교육을 진행했습니다.', '교육 만족도 97%, 내부 소통 효율 34% 향상', true),
  ('immigrant', '공공기관 B', '다문화 가정 한국어 · 문화 적응 교육', '공공기관 B와 함께 다문화 가정을 대상으로 한국어 교육 및 문화 적응 프로그램을 운영했습니다.', '수료율 95%, 정착 성공률 89%', true),
  ('career', '대학교 C', '취업 면접 집중 코칭 프로그램', '대학교 C 재학생 대상 취업 면접 집중 코칭 프로그램을 운영했습니다.', '참여 학생 취업률 82%, 역대 최고 기록 달성', true),
  ('senior', '시니어센터 D', '시니어 디지털 역량 강화 교육', '시니어센터 D에서 어르신 대상 디지털 리터러시 교육을 진행했습니다.', '수료율 92%, 디지털 활용 능력 45% 향상', true);

-- 계열사
INSERT INTO affiliates (name, name_en, description, features, icon, sort_order) VALUES
  ('에이머스스튜디오', 'AMOUS Studio', '공간에 생명을 담는 AMOUS STUDIO. 건축과 디자인에 감각적 스토리텔링을 더해, 단순한 도면을 넘어 사람들의 감정과 시간을 담아내는 시각화를 만듭니다.', ARRAY['건축 CG · 3D 투시도', '시네마틱 렌더링', '아이소메트릭 다이어그램', '분양용 투시도 · 광역조감도'], 'building', 0),
  ('에이머스이벤트', 'AMOUS Event', '실전 행사 기획과 운영의 전문가. 기업 세미나, 컨퍼런스, 교육 행사를 기획부터 현장 운영까지 토탈 솔루션을 제공합니다.', ARRAY['기업 세미나/컨퍼런스', '교육 행사 기획', 'MC/사회 진행', '현장 운영 관리'], 'calendar', 1)
ON CONFLICT DO NOTHING;
