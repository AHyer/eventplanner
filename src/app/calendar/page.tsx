// eventplanner/src/app/calendar/page.tsx
// Month view of the host's dated events.

import { db } from '@/db';
import { events } from '@/db/schema';
import { and, asc, eq, isNotNull } from 'drizzle-orm';
import EventCalendar, { type CalendarEvent } from '@/components/ui/event-calendar';

const CURRENT_USER_ID = 1; //TODO debug (until auth is implemented)

export default async function CalendarPage() {
  const dated = await db
    .select({ id: events.id, eventName: events.eventName, eventDate: events.eventDate })
    .from(events)
    .where(and(eq(events.userId, CURRENT_USER_ID), isNotNull(events.eventDate)))
    .orderBy(asc(events.eventDate));

  //isNotNull already filtered the nulls; this narrows the type for the client component
  const calendarEvents: CalendarEvent[] = dated.map((event) => ({
    id: event.id,
    eventName: event.eventName,
    eventDate: event.eventDate as string,
  }));

  return (
    <main className="calendar-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
      <h1 className="text-3xl font-aboreto mb-2 text-zinc-800 dark:text-zinc-100">
        Schedule
      </h1>
      <p className="mb-6 font-arapey text-lg text-zinc-800 dark:text-zinc-100">
        Click an event to edit it, or any empty day to plan something new.
      </p>

      <EventCalendar events={calendarEvents} />
    </main>
  );
}

//TODO show events that only have a date range (event_date_min/max) as a span
