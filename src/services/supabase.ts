// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Supabase 프로젝트 URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Supabase 익명 키

export const supabase = createClient(supabaseUrl, supabaseKey);
