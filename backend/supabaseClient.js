// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afgtwqgnfyhlougpumcx.supabase.co'; // remplace avec ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ3R3cWduZnlobG91Z3B1bWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwODU3OTUsImV4cCI6MjA2MjY2MTc5NX0.OPLnFzjKDuaBJd2iFXdUGV5HfdoH9Qrzj3s3pkjqYHQ'; // remplace avec ta clé

export const supabase = createClient(supabaseUrl, supabaseKey);
