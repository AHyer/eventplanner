import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';
import { db } from '@/db';
import { users } from '@/db/schema';

// cache() dedupes this across one render pass, so a page and its nested
// components can each call it without repeating the query.
export const getCurrentUser = cache(async () => {
  const session = await auth();
  const id = Number(session?.user?.id);
  if (!session?.user?.id || Number.isNaN(id)) return null;

  const [row] = await db
    .select({ id: users.id, role: users.role, email: users.email })
    .from(users)
    .where(eq(users.id, id));

  return row ?? null;   // role read fresh from DB, never from the token
});