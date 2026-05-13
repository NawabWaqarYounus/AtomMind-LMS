import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkTable() {
  const { data, error } = await supabase.from('chatbot_history').select('*').limit(1);
  if (error) {
    console.error("Error fetching chatbot_history:", error.message);
    if (error.message.includes("relation \"chatbot_history\" does not exist")) {
        console.log("Table 'chatbot_history' is MISSING!");
    }
  } else {
    console.log("Table 'chatbot_history' exists and is reachable.");
  }
}

checkTable();
