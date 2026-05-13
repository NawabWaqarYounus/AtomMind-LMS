import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const testUsers = [
  {
    email: 'student@atommind.com',
    password: 'Password123!',
    data: { full_name: 'Alex Johnson', role: 'student' },
    id: 'd3e3b3e3-3333-3333-3333-333333333333'
  },
  {
    email: 'instructor@atommind.com',
    password: 'Password123!',
    data: { full_name: 'Dr. Sarah Chen', role: 'instructor' },
    id: 'd1e1b1e1-1111-1111-1111-111111111111'
  },
  {
    email: 'admin@atommind.com',
    password: 'Password123!',
    data: { full_name: 'Platform Admin', role: 'admin' },
    id: 'd6e6b6e6-6666-6666-6666-666666666666'
  }
];

async function createUsers() {
  console.log("Creating test users...");

  for (const user of testUsers) {
    const { data, error } = await supabase.auth.admin.createUser({
      id: user.id,
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: user.data
    });

    if (error) {
      if (error.message.includes("already exists")) {
        console.log(`User ${user.email} already exists.`);
      } else {
        console.error(`Error creating ${user.email}:`, error.message);
      }
    } else {
      console.log(`Successfully created ${user.email}`);
    }
  }

  console.log("\nDone! Use these credentials to login:");
  testUsers.forEach(u => console.log(`- Email: ${u.email} | Password: ${u.password} | Role: ${u.data.role}`));
}

createUsers();
