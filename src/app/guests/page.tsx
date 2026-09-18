// src/app/guests/page.tsx
// The host's guest list: every guest across their events, with RSVP status.

import { db } from '@/db';
import { events } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import AddGuestForm from '@/components/ui/addguestform';
import ListGuests from '@/components/ui/listguests';

const CURRENT_USER_ID = 1; //TODO debug (until auth is implemented)

export default async function GuestsPage() {
  const hostEvents = await db
    .select({ id: events.id, eventName: events.eventName })
    .from(events)
    .where(eq(events.userId, CURRENT_USER_ID))
    .orderBy(asc(events.eventDate));

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <main className="guests-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-16 md:py-66 px-16 bg-white dark:bg-black">
        <AddGuestForm events={hostEvents} />
      </main>
      <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
        <ListGuests />
      </aside>
    </div>
  );
}

//guest list moves below the add-guest form on mobile
