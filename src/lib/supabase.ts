import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseUrl = 'https://eexkxxprxiaijfelrtyn.supabase.co';
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVleGt4eHByeGlhaWpmZWxydHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwNTg5MjgsImV4cCI6MjA1MzYzNDkyOH0.R4u_9q4WoWj8Zs17X9_GdnLlzgp7kq4XDttaAtXLXTQ';
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);