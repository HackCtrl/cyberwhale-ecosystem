
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Try to get values from environment variables, otherwise use placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Still log a warning but don't cause a crash
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Authentication features will not work properly.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
