import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const enableRealtime = async () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.error("DATABASE_URL not found in .env");
        process.exit(1);
    }

    const client = new Client({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log("Connected to Supabase PostgreSQL");

        const tables = [
            'analytics',
            'chatbot_history',
            'courses',
            'lessons',
            'profiles',
            'progress',
            'recommendations'
        ];

        console.log("Enabling Realtime for tables...");
        
        // Ensure the publication exists
        await client.query("CREATE PUBLICATION supabase_realtime FOR ALL TABLES;").catch(() => {
            console.log("Publication already exists or skipping...");
        });

        for (const table of tables) {
            await client.query(`ALTER TABLE public.${table} REPLICA IDENTITY FULL;`);
            console.log(`Realtime enabled for ${table}`);
        }

    } catch (err) {
        console.error("Error enabling Realtime:", err);
    } finally {
        await client.end();
    }
};

enableRealtime();
