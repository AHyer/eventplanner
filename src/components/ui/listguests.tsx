// src/components/ui/listguests.tsx
// The host's full guest list with each guest's RSVP status, grouped by event.

import { db } from '@/db/index';
import { events, guests } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import Link from 'next/link';

const CURRENT_USER_ID = 1; //TODO debug (until auth is implemented)

type GuestStatus = typeof guests.guestStatus.enumValues[number];

// Short badge wording — the longer phrasing in guestStatusOptions is for the dropdown.
const statusDisplay: Record<GuestStatus, { label: string; className: string }> = {
  invited: { label: 'Awaiting reply', className: 'bg-amber-100 text-amber-900' },
  accepted: { label: 'Accepted', className: 'bg-green-100 text-green-900' },
  declined: { label: 'Declined', className: 'bg-rose-100 text-rose-900' },
};

const noStatus = { label: 'Not invited yet', className: 'bg-slate-100 text-slate-700' };

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
  const byEvent = new Map<number, { eventName: string | null; eventDate: string | null; guests: typeof rows }>();
  for (const row of rows) {
    const group = byEvent.get(row.eventId);
    if (group) {
      group.guests.push(row);
    } else {
      byEvent.set(row.eventId, { eventName: row.eventName, eventDate: row.eventDate, guests: [row] });
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

      <p className="mb-6 text-sm">
        {rows.length} guests · {accepted} accepted · {declined} declined · {waiting} awaiting reply
      </p>

      {[...byEvent.entries()].map(([eventId, group]) => (
        <div key={eventId} className="mb-8">
          <Link href={`/events/${eventId}`}>
            <h2 className="text-2xl font-bold text-gray-500">{group.eventName ?? 'Untitled event'}</h2>
          </Link>
          <p className="mb-3 text-sm">
            {group.eventDate
              ? new Date(group.eventDate).toLocaleDateString('en-US', { //match the formatting used on the events list
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Date TBD'}
            {' · '}
            {group.guests.filter((guest) => guest.guestStatus === 'accepted').length} of {group.guests.length} attending
          </p>

          <ul className="space-y-2">
            {group.guests.map((guest) => {
              const status = guest.guestStatus ? statusDisplay[guest.guestStatus] : noStatus;
              return (
                <li key={guest.guestId} className="p-3 border rounded shadow-sm flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{guest.guestName ?? 'Unnamed guest'}</p>
                    <p className="text-sm text-gray-500">{guest.guestEmail ?? guest.guestPhone ?? 'No contact info'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${status.className}`}>{status.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}

//TODO let the host change a guest's status from this page instead of only at creation
//TODO send/resend invitations to everyone still awaiting a reply
