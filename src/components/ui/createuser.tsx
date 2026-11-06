'use server';

import { db } from '@/db';
import { users } from '@/db/schema';

type UserRole = 'host' | 'vendor' | 'guest';

interface CreateUserInputs {
  name: string;
  email: string;
  role: UserRole | null;
}

interface CreateUserResult {
  success: boolean;
  message: string;
}

export async function createUser(prevState: unknown, formData: FormData): Promise<CreateUserResult> {
  const name = formData.get('name') as string | null;
  const email = formData.get('email') as string | null;
  const role = formData.get('role') as UserRole | null; 


  const inputs: CreateUserInputs = {
    name: name ?? '',
    email: email ?? '',
    role,
  };

  // Basic validation that all fields are filled
  if (!inputs.name || !inputs.email || !inputs.role) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    // Type-safe insert query to DB using Drizzle ORM
    await db.insert(users).values({
      username: inputs.name,
      email: inputs.email,
      role: inputs.role ?? undefined
    });
    
    return { success: true, message: 'User successfully saved!' };
  } catch (error: unknown) {
    // Drizzle wraps driver errors in DrizzleQueryError, so the pg error code is
    // on .cause, not on the error itself.
    const cause = (error as { cause?: { code?: string; constraint?: string } })?.cause;

    // Handle unique constraint violation (duplicate email or username)
    if (cause?.code === '23505') {
      if (cause.constraint === 'users_email_unique') {
        return { success: false, message: 'This email is already registered.' };
      }
      if (cause.constraint === 'users_username_unique') {
        return { success: false, message: 'That username is taken.' };
      }
      return { success: false, message: 'That value is already in use.' };
    }

    console.error('internal error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}

//TODO sign in vs. create new user
//TODO validate email format
//TODO validate role--lock host after primary (first) host created, but allow primary host to designate additional host(s)

//TODO validate guest roles against 'invited guest' list for event
//TODO validate vendor roles against 'approved vendor' list for event

 