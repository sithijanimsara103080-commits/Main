// Supabase Configuration
// You can reference this file in your new dashboard to connect easily.

const SUPABASE_URL = "https://uilteigoegctfcbkgfbf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_SylQ5c0hxFtYHCN6Y2Oz1g_FpMaS9FY";

// Initialize the client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts
window.supabaseClient = supabase;

console.log("🌌 Supabase Config Loaded & Ready.");
