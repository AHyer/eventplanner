// src/components/ui/listevents.tsx
import {db} from '@/db/index'
import { events } from '@/db/schema';
import { asc } from 'drizzle-orm';

export default async function ListEvents() {
  
  // Execute type-safe query directly inside the component
  //const allEvents = await db.query.events.findMany();
  
  const allEvents = await db //sort at DB level with query rather than in JS
    .select()
    .from(events)
    .orderBy(asc(events.eventDate)) //display soonest event first
    .limit(10);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Upcoming Events</h1>
      <ul className="space-y-2">
        {allEvents
        .map((event) => (
          <li key={event.id} className="p-3 border rounded shadow-sm">
            <p className="text-2xl font-bold text-gray-500">{event.eventName}</p>
            <p className="font-semibold">{event.eventDate
                ? new Date(event.eventDate).toLocaleDateString('en-US', { //convert date to nicer formatting & handle null date with TBD
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Date TBD'}</p>
            
            <p className="text-sm text-gray-500">{event.eventVenue}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

//TODO format date to be more readable--convert to date type and use {date.toLocaleDateString()}
//TODO make upcoming events clickable for editing/deleting (opens event for editing)
//TODO set up sync with Google/Outlook calendars