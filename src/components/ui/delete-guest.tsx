// src/components/ui/delete-guest.tsx

'use server';
import { db } from '@/db';
import { events, guests } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteGuest(id: number) {
  await db.delete(guests).where(eq(guests.id, id));
  revalidatePath('/guests');
  redirect('/guests');
}