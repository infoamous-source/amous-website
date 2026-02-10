const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addSampleInstructors() {
  // 먼저 services 목록 확인
  const { data: services } = await supabase
    .from('services')
    .select('id, title, slug');

  console.log('=== Available Services ===');
  services?.forEach(s => {
    console.log(`ID ${s.id}: ${s.title} (${s.slug})`);
  });
  console.log('');

  if (!services || services.length === 0) {
    console.log('No services found. Please add services first.');
    return;
  }

  // 샘플 강사 데이터
  const sampleInstructors = [
    {
      service_ids: [services[0].id], // 첫 번째 서비스에 할당
      name: '대표 강사',
      role: '대표 / 현직 아나운서',
      description: '현직 아나운서로서 정부기관 및 기업 공식행사를 진행하며, 15년간의 현장 경험을 바탕으로 실전 커뮤니케이션 교육을 제공합니다.',
      specialties: ['스피치', '프레젠테이션', '면접 코칭', '아나운서 양성'],
      certifications: ['아나운서 자격증', '스피치 전문 강사', 'NCS 직업기초능력 강사'],
      career: '현직 아나운서 (2010~현재)\n정부기관 및 기업 공식행사 MC\n교육 경력 15년',
      lecture_history: '정부기관 및 공공기관 임직원 대상 스피치 교육\n기업 신입사원 프레젠테이션 교육\n면접 합격자 1,000명 이상 배출',
      image_url: null,
      sort_order: 1
    }
  ];

  // 기존 강사 확인
  const { data: existing } = await supabase
    .from('instructors')
    .select('id, name');

  if (existing && existing.length > 0) {
    console.log('=== Existing Instructors ===');
    existing.forEach(i => {
      console.log(`ID ${i.id}: ${i.name}`);
    });
    console.log('\nSkipping sample data insertion (instructors already exist)');
    return;
  }

  // 샘플 데이터 삽입
  console.log('=== Inserting Sample Instructors ===');

  for (const instructor of sampleInstructors) {
    const { data, error } = await supabase
      .from('instructors')
      .insert(instructor)
      .select();

    if (error) {
      console.error('Error inserting instructor:', error);
    } else {
      console.log(`✓ Added: ${instructor.name}`);
    }
  }

  // 결과 확인
  const { data: result } = await supabase
    .from('instructors')
    .select('*');

  console.log(`\n=== Total Instructors: ${result?.length || 0} ===`);
}

addSampleInstructors();
