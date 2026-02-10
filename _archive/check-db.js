const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  console.log('=== Checking site_content table ===\n');

  const { data, error } = await supabase
    .from('site_content')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} rows:\n`);

  data.forEach(row => {
    console.log(`ID: ${row.id}`);
    if (row.id === 'hero_images' || row.id === 'about_images') {
      console.log(`Value (length: ${row.value?.length || 0}):`);
      console.log(row.value);
    } else {
      console.log(`Value: ${row.value?.substring(0, 50) || '(empty)'}...`);
    }
    console.log('---\n');
  });

  console.log('\n=== Checking instructors table ===\n');

  const { data: instructors, error: err2 } = await supabase
    .from('instructors')
    .select('*');

  if (err2) {
    console.error('Error:', err2);
    return;
  }

  console.log(`Found ${instructors.length} instructors\n`);
  instructors.forEach(inst => {
    console.log(`ID: ${inst.id}, Name: ${inst.name}`);
  });
}

checkData();
