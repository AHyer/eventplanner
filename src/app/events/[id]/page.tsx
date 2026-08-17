import { db } from '@/db';
import { events } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { EditEventForm } from '@/components/ui/edit-event-form';

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>; // Next.js 15+ — params is async; drop the Promise/await if you're on 14
}) {
  const { id } = await params;
  const [event] = await db.select().from(events).where(eq(events.id, Number(id)));

  if (!event) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
      <EditEventForm event={event} />
    </main>
  );
}