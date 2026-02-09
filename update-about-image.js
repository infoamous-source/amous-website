const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wcjeytljpqvwfyspewlz.supabase.co';
const supabaseKey = 'sb_publishable_jfy6TQbOhmCYvJWnJ0stZQ_8sZ-oZs6';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateAboutImage() {
  // hero_images에서 이미지 URL을 가져와서 about_images에도 추가
  const { data: heroData } = await supabase
    .from('site_content')
    .select('value')
    .eq('id', 'hero_images')
    .single();

  if (heroData && heroData.value) {
    const heroImages = JSON.parse(heroData.value);
    if (heroImages.length > 0) {
      console.log('Using hero image for about_images:', heroImages[0]);

      const { data, error } = await supabase
        .from('site_content')
        .update({
          value: JSON.stringify([heroImages[0]]),
          updated_at: new Date().toISOString()
        })
        .eq('id', 'about_images');

      if (error) {
        console.error('Error:', error);
      } else {
        console.log('✓ Updated about_images successfully');
      }
    }
  }

  // 확인
  const { data: result } = await supabase
    .from('site_content')
    .select('*')
    .in('id', ['hero_images', 'about_images']);

  console.log('\n=== Current state ===');
  result?.forEach(row => {
    console.log(`${row.id}: ${row.value}`);
  });
}

updateAboutImage();
