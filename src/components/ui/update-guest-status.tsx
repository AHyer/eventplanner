// src/components/ui/update-guest-status.tsx
// Flips one guest's RSVP status from the guest list — the host answering on
// their behalf after a text/phone call reply.

'use server';
import { db } from '@/db';
import { guests } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateGuestStatus(id: number, status: string) {
  await db
    .update(guests)
    .set({
      //an empty string means "not invited yet", which is null in the column
      guestStatus: (status || null) as typeof guests.guestStatus.enumValues[number] | null,
    })
    .where(eq(guests.id, id));

  revalidatePath('/guests'); //prevents stale version from being served
}
