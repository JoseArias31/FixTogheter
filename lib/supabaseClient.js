import { createClient } from '@supabase/supabase-js';

// Log all environment variables for debugging (excluding sensitive ones)
console.log('Environment variables available:', Object.keys(process.env).filter(key => !key.includes('KEY')));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL type:', typeof supabaseUrl, 'Value exists:', !!supabaseUrl);
console.log('Supabase Key type:', typeof supabaseKey, 'Value exists:', !!supabaseKey);

if (!supabaseUrl) {
  console.error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseKey) {
  console.error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

let supabase = null;

try {
  // Only create the client if both URL and key are available
  if (supabaseUrl && supabaseKey) {
    console.log('Creating Supabase client with valid credentials');
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    console.error('Cannot create Supabase client: missing credentials');
  }
} catch (error) {
  console.error('Error creating Supabase client:', error.message);
}

export { supabase };