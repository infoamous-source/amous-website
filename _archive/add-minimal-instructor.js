const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addMinimalInstructor() {
  // 최소한의 필드만 사용
  const minimalInstructor = {
    name: '대표 강사',
    role: '대표 / 현직 아나운서',
    service_ids: [1],
    specialties: ['스피치', '프레젠테이션', '면접 코칭'],
    sort_order: 1
  };

  console.log('Attempting to insert minimal instructor...');
  console.log(minimalInstructor);

  const { data, error } = await supabase
    .from('instructors')
    .insert(minimalInstructor)
    .select();

  if (error) {
    console.error('Error:', error);
    console.log('\nLet\'s try even simpler...');

    // 더 간단하게: specialties도 빈 배열로
    const simplest = {
      name: '대표 강사',
      service_ids: [1],
      sort_order: 1
    };

    const { data: data2, error: error2 } = await supabase
      .from('instructors')
      .insert(simplest)
      .select();

    if (error2) {
      console.error('Still failed:', error2);
    } else {
      console.log('✓ Success with simplest data:', data2);
    }
  } else {
    console.log('✓ Success:', data);
  }

  // 결과 확인
  const { data: result } = await supabase
    .from('instructors')
    .select('*');

  console.log(`\n=== Total instructors: ${result?.length || 0} ===`);
  if (result && result.length > 0) {
    console.log('Columns:', Object.keys(result[0]));
  }
}

addMinimalInstructor();
