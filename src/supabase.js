import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qmksmqrcyoktypuyyhym.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFta3NtcXJjeW9rdHlwdXl5aHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5OTk2NTYsImV4cCI6MjAxNzU3NTY1Nn0.IzZKyi9xNk5_Smi0IH6xwd8b1Tie5AQ2Z2QJbbGJ6yM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})