const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  // 빈 INSERT를 시도해서 스키마 확인 (실패할 것임)
  const { data, error } = await supabase
    .from('instructors')
    .insert({})
    .select();

  console.log('Error:', error);
  console.log('Message:', error?.message);
  console.log('Hint:', error?.hint);
  console.log('Details:', error?.details);

  // 실제 데이터 조회로 컬럼 확인
  const { data: result, error: selectError } = await supabase
    .from('instructors')
    .select('*')
    .limit(1);

  console.log('\nSelect result:', result);
  console.log('Select error:', selectError);
}

checkSchema();
