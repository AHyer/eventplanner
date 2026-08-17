// src/app/events/[id]/page.tsx
//edit a specific event chosen from the event list by event id

import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { EditEventForm } from '@/components/ui/edit-event-form';
import { DeleteEventButton } from '@/components/ui/edit-event-form';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>; // Next.js 15+ — params is async
}) {
  const { id } = await params;
  const [event] = await db.select().from(events).where(eq(events.id, Number(id)));

  if (!event) {
    notFound();
  }

  return (
    <main className="p-6 font-aboreto font-bold">
      <h1 className="text-2xl font-aboreto font-bold text-zinc-600 dark:text-zinc-400 mb-4">Edit Event</h1>
      <EditEventForm event={event} />
      <DeleteEventButton id={event.id} />
    </main>
  );
}