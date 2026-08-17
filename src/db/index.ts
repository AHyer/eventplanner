// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// export const db = drizzle(process.env.DATABASE_URL!);

// src/db/index.ts
//import { neon } from '@neondatabase/serverless';
//import { drizzle } from 'drizzle-orm/neon-http';
import { drizzle } from 'drizzle-orm/node-postgres';  //changed 8/12/2026
import { Pool } from 'pg';   //changed 8/12/2026
import * as schema from './schema'; // Links your tables to db.query

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing from environment variables.');
}

// 1. Establish the Neon HTTP connection
//const sql = neon(connectionString);

const pool = new Pool({ connectionString });   //changed 8/12/2026

// 2. Export the Drizzle client with your schema attached
//export const db = drizzle(sql, { schema }); 
export const db = drizzle(pool, { schema });   //changed 8/12/2026