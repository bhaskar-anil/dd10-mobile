import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (make sure env vars are set)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Fact = {
  id: string;
  date: string;      // stored as ISO date (YYYY-MM-DD)
  content: string;   // text of the fact/news item
};

// Fetch news for a given date and optional language
export async function fetchFacts(date: string, lang: 'en' | 'hi' = 'en'): Promise<Fact[]> {
  console.log('SUPABASE URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log('SUPABASE ANON KEY:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
  console.log('🔍 fetching facts for:', date, lang);
  const { data, error } = await supabase
    .from('news_items')
    .select('id, date, content')
    .eq('date', date)
    .eq('lang', lang)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching facts:', error);
    return [];
  }

  console.log('✅ got facts:', data);
  // Normalize and map to the Fact type
  return (data || []).map(item => ({
    id: item.id,
    date: item.date,
    content: item.content ?? '', // fallback to empty string
  }));
}
