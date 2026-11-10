import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema'; // Links your tables to db.query

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing from environment variables.');
}

// node-postgres over Neon's -pooler endpoint, not drizzle-orm/neon-http.
// The HTTP driver throws "No transactions support in neon-http driver", which
// breaks the db.transaction() in questionnaire.tsx. The pooler already handles
// the connection-count problem that the HTTP driver was meant to solve.
const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });
