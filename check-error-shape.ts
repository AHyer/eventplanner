// TEMP diagnostic — delete after running.
// Reproduces the duplicate-email insert through the real drizzle client and
// dumps the shape of the thrown error, so we can see where the pg code lives.
import 'dotenv/config';
import { db } from './src/db';
import { users } from './src/db/schema';
import { sql } from 'drizzle-orm';

async function main() {
  const idx = await db.execute(
    sql`select indexname, indexdef from pg_indexes where tablename = 'users'`
  );
  console.log('INDEXES on users:');
  for (const r of idx.rows as { indexdef: string }[]) console.log('  ' + r.indexdef);

  const hasUniqueEmail = (idx.rows as { indexdef: string }[]).some(
    (r) => r.indexdef.includes('UNIQUE') && r.indexdef.includes('(email)')
  );
  if (!hasUniqueEmail) {
    console.log('\nNo unique index on email — schema change has not been pushed. Stopping.');
    return;
  }

  const existing = await db.execute(sql`select email from users limit 1`);
  const email = (existing.rows[0] as { email: string } | undefined)?.email;
  if (!email) {
    console.log('\nNo users in table to collide with. Stopping.');
    return;
  }
  console.log(`\nAttempting duplicate insert of <${email}> inside a transaction...`);

  try {
    await db.transaction(async (tx) => {
      await tx.insert(users).values({ username: 'dupe-probe', email, role: 'guest' });
      tx.rollback(); // never reached if the constraint fires
    });
    console.log('!! Insert SUCCEEDED — constraint did not fire (rolled back).');
  } catch (error: unknown) {
    const e = error as { constructor: { name: string }; code?: string; cause?: unknown };
    console.log('\n--- ERROR SHAPE ---');
    console.log('error.constructor.name :', e.constructor?.name);
    console.log('error.code             :', e.code);
    const cause = e.cause as { constructor?: { name: string }; code?: string; constraint?: string; detail?: string } | undefined;
    console.log('error.cause?.name      :', cause?.constructor?.name);
    console.log('error.cause?.code      :', cause?.code);
    console.log('error.cause?.constraint:', cause?.constraint);
    console.log('error.cause?.detail    :', cause?.detail);
    console.log('\nYour check `error?.code === \'23505\'` evaluates to:', e.code === '23505');
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('probe failed:', e);
    process.exit(1);
  });
