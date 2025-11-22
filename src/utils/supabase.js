import { createClient } from '@supabase/supabase-js'



const SUPABASE_URL = "https://kdzfslqgoqqxjdrjtrzn.supabase.co"
const SUPABASE_KEY = "sb_publishable_1ShOHck5FvxHA8sAaEr3HA_hZ6FxPbO"



export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)