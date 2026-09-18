// src/components/ui/addguest.tsx
// Adds one guest to an event so the RSVP list on /guests has something to show.

'use server';

import { db } from '@/db';
import { guests, events } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const CURRENT_USER_ID = 1; //TODO debug (until auth is implemented)

interface AddGuestResult {
  success: boolean;
  message: string;
}

export async function addGuest(
  prevState: unknown,
  formData: FormData
): Promise<AddGuestResult> {
  const eventId = Number(formData.get('event_id'));
  const guestName = formData.get('guest_name') as string | null;
  const guestEmail = formData.get('guest_email') as string | null;
  const guestPhone = formData.get('guest_phone') as string | null;
  const guestStatus = formData.get('guest_status') as string | null;
  const dietaryRestrictions = formData.get('dietary_restrictions') as string | null;

  if (!guestName) {
    return { success: false, message: 'Guest name field required.' };
  }
  if (!eventId) {
    return { success: false, message: 'Pick the event this guest is invited to.' };
  }

  try {
    // Only let the host add guests to their own events — the page filters by
    // host too, so without this a guest could be attached to someone else's event
    // and then never show up in the list.
    const [event] = await db
      .select({ id: events.id })
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.userId, CURRENT_USER_ID)));

    if (!event) {
      return { success: false, message: 'That event was not found.' };
    }

    await db.insert(guests).values({
      eventId,
      guestName,
      guestEmail: guestEmail || undefined,
      guestPhone: guestPhone || undefined,
      guestStatus: (guestStatus || undefined) as typeof guests.guestStatus.enumValues[number] | undefined,
      guestDietaryRestrictions: (dietaryRestrictions || undefined) as typeof guests.guestDietaryRestrictions.enumValues[number] | undefined,
    });

    revalidatePath('/guests'); //prevents stale version from being served
    return { success: true, message: `${guestName} added to the guest list!` };
  } catch (error) {
    console.error('Add guest error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}
