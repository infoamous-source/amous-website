const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixInstructors() {
  console.log('=== Checking current instructors table ===\n');

  // 현재 데이터 확인
  const { data: current, error: selectError } = await supabase
    .from('instructors')
    .select('*');

  console.log('Current data count:', current?.length || 0);
  console.log('Select error:', selectError);

  if (current && current.length > 0) {
    console.log('\nExisting columns:', Object.keys(current[0]));
    console.log('\nData:', current);
    return;
  }

  // 테이블이 비어있으면 최소한의 데이터로 INSERT 시도
  console.log('\n=== Attempting to insert minimal data ===\n');

  // 가장 기본적인 필드만 사용
  const minimalData = {
    name: '대표 강사',
    service_ids: [1]
  };

  const { data: inserted, error: insertError } = await supabase
    .from('instructors')
    .insert(minimalData)
    .select();

  if (insertError) {
    console.error('Insert error:', insertError);

    // role 필드 추가 시도
    console.log('\n=== Trying with role field ===\n');
    const withRole = {
      name: '대표 강사',
      role: '대표 / 현직 아나운서',
      service_ids: [1]
    };

    const { data: inserted2, error: insertError2 } = await supabase
      .from('instructors')
      .insert(withRole)
      .select();

    if (insertError2) {
      console.error('Still failed:', insertError2);
    } else {
      console.log('✓ Success with role:', inserted2);
      console.log('Available columns:', Object.keys(inserted2[0]));
    }
  } else {
    console.log('✓ Success:', inserted);
    console.log('Available columns:', Object.keys(inserted[0]));
  }

  // 최종 확인
  const { data: final } = await supabase
    .from('instructors')
    .select('*');

  console.log('\n=== Final count:', final?.length || 0, '===');
  if (final && final.length > 0) {
    console.log('Data:', final);
  }
}

fixInstructors();
