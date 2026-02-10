const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAPI() {
  console.log('=== Direct Supabase Query (same as API) ===\n');

  const { data, error } = await supabase.from("site_content").select("*");

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Returned ${data.length} rows:\n`);

  const result = {};
  data?.forEach((item) => {
    result[item.id] = item.value;
    console.log(`- ${item.id}: ${item.value?.substring(0, 50)}...`);
  });

  console.log('\n=== Final API result object ===\n');
  console.log(JSON.stringify(result, null, 2));
}

testAPI();
