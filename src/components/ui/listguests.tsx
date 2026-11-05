// src/components/ui/listguests.tsx
// The host's guest list with each guest's RSVP status, grouped by event.
// Selection/removal lives in guest-checklist.tsx — this half only queries.

import { db } from '@/db/index';
import { events, guests } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import GuestChecklist, { type GuestGroup } from './guest-checklist';

const CURRENT_USER_ID = 1; //TODO debug (until auth is implemented)

export default async function ListGuests() {
  // One join instead of a query per event — guests are only reachable through
  // the events this host owns, since there is no auth to filter on.
  const rows = await db
    .select({
      guestId: guests.id,
      guestName: guests.guestName,
      guestEmail: guests.guestEmail,
      guestPhone: guests.guestPhone,
      guestStatus: guests.guestStatus,
      eventId: events.id,
      eventName: events.eventName,
      eventDate: events.eventDate,
    })
    .from(guests)
    .innerJoin(events, eq(guests.eventId, events.id))
    .where(eq(events.userId, CURRENT_USER_ID))
    .orderBy(asc(events.eventDate), asc(guests.guestName)); //soonest event first

  // Group in JS rather than SQL — the rows are already sorted, so this just
  // splits them into one block per event without a second round trip.
  const groups: GuestGroup[] = [];
  for (const row of rows) {
    const group = groups.find((candidate) => candidate.eventId === row.eventId);
    const guest = {
      guestId: row.guestId,
      guestName: row.guestName,
      guestEmail: row.guestEmail,
      guestPhone: row.guestPhone,
      guestStatus: row.guestStatus,
    };
    if (group) {
      group.guests.push(guest);
    } else {
      groups.push({
        eventId: row.eventId,
        eventName: row.eventName,
        eventDate: row.eventDate,
        guests: [guest],
      });
    }
  }

  const accepted = rows.filter((row) => row.guestStatus === 'accepted').length;
  const declined = rows.filter((row) => row.guestStatus === 'declined').length;
  const waiting = rows.filter((row) => row.guestStatus === 'invited').length;

  if (rows.length === 0) {
    return (
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-4">Guest Responses</h1>
        <p className="font-arapey text-lg">
          No guests yet. Add one with the form to start tracking RSVPs.
        </p>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-2">Guest Responses</h1>

      <p className="mb-4 text-sm">
        {rows.length} guests · {accepted} accepted · {declined} declined · {waiting} awaiting reply
      </p>

      <GuestChecklist groups={groups} />
    </section>
  );
}

//TODO let the host change a guest's status from this page instead of only at creation
//TODO send/resend invitations to everyone still awaiting a reply
