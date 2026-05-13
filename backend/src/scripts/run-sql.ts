import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const runSql = async () => {
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

        const schemaPath = path.join(__dirname, '../../../supabase/schema.sql');
        const seedPath = path.join(__dirname, '../../../supabase/seed.sql');

        console.log("Applying schema...");
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schemaSql);
        console.log("Schema applied successfully.");

        console.log("Applying seed data...");
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await client.query(seedSql);
        console.log("Seed data applied successfully.");

    } catch (err) {
        console.error("Error executing SQL:", err);
    } finally {
        await client.end();
    }
};

runSql();
