'use server';

import { db } from '@/db';
import { users } from '@/db/schema';

interface CreateUserInputs {
  name: string;
  email: string;
  role: string | null;
}

interface CreateUserResult {
  success: boolean;
  message: string;
}

export async function createUser(prevState: unknown, formData: FormData): Promise<CreateUserResult> {
  const name = formData.get('name') as string | null;
  const email = formData.get('email') as string | null;
  const role = formData.get('role') as string | null;

  const inputs: CreateUserInputs = {
    name: name ?? '',
    email: email ?? '',
    role
  };

  // Basic validation
  if (!inputs.name || !inputs.email) {
    return { success: false, message: 'All fields are required.' };
  }

  try {
    // Type-safe insert query using Drizzle ORM
    await db.insert(users).values({
      username: inputs.name,
      email: inputs.email,
      role: inputs.role
    });
    
    return { success: true, message: 'User successfully saved via Drizzle!' };
  } catch (error: any) {
    console.error('Drizzle execution error:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error?.code === '23505') {
      return { success: false, message: 'This email is already registered.' };
    }
    console.error('internal error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}
 