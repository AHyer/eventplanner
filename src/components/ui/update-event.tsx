'use server';
import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface UpdateEventResult {
  success: boolean;
  message: string;
}

export async function updateEvent(
  prevState: unknown,
  formData: FormData
): Promise<UpdateEventResult> {
  const id = Number(formData.get('id'));
  const eventName = formData.get('event_name') as string | null;
  const eventDate = formData.get('event_date') as string | null;
  const eventVenue = formData.get('event_venue') as string | null;
  const totalBudgetMin = formData.get('total_budget_min') as string | null;
  const totalBudgetMax = formData.get('total_budget_max') as string | null;

  if (!eventName) {
    return { success: false, message: 'Event name field required.' };
  }

  try {
    await db
      .update(events)
      .set({
        eventName,
        eventDate: eventDate || undefined,
        eventVenue: eventVenue || undefined,
        totalBudgetMin: totalBudgetMin || undefined,
        totalBudgetMax: totalBudgetMax || undefined,
      })
      .where(eq(events.id, id));

    revalidatePath('/events');
    return { success: true, message: 'Event updated!' };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}

// Notes
// total_budget_min/total_budget_max are decimal columns in your schema, so Drizzle expects strings — the raw formData.get() string is passed through as-is, no Number() conversion needed (same as your questionnaire form).
// If clicking through reveals other core fields you want editable (outside/alcoholServed booleans, eventVibe, etc.), the pattern extends the same way: add the input with defaultValue={event.field ?? ''}, add the read in update-event.ts, add it to the .set({...}) object.