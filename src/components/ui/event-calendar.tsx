// src/components/ui/event-calendar.tsx
// Month grid for /calendar: one box per day listing that day's event titles.
// Clicking a title opens that event for editing; clicking anywhere else in the
// box opens the create form with the date already filled in.

'use client';

import Link from 'next/link';
import { Calendar } from './calendar';
import type { DayProps } from 'react-day-picker';

export type CalendarEvent = {
  id: number;
  eventName: string | null;
  eventDate: string; //"YYYY-MM-DD" straight out of the date column
};

// eventDate is a date column, so it arrives as a plain "YYYY-MM-DD" string.
// Building the key from the local parts of the calendar's Date (instead of
// new Date(eventDate)) keeps events off the wrong day for anyone west of UTC.
function dateKey(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export default function EventCalendar({ events }: { events: CalendarEvent[] }) {
  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const key = event.eventDate.slice(0, 10); //ignore any time part
    eventsByDate.set(key, [...(eventsByDate.get(key) ?? []), event]);
  }

  function DayCell({ day, modifiers, children, className, ...tdProps }: DayProps) {
    const key = dateKey(day.date);
    const dayEvents = eventsByDate.get(key) ?? [];

    return (
      <td {...tdProps} className={`${className ?? ''} align-top p-0`}>
        <div
          //the box scales with the viewport: tall on a desktop, short in landscape on a phone
          className={`flex h-full w-full flex-col gap-1 rounded-md border border-slate-300 p-1 text-left min-h-[clamp(3.5rem,11vh,7.5rem)] ${
            modifiers.today ? 'border-2 border-pink-600' : ''
          } ${modifiers.outside ? 'opacity-50' : 'bg-white/70'}`}
        >
          <Link
            href={`/events?date=${key}`}
            title="Add an event on this day"
            className="self-end text-sm text-slate-700 hover:underline"
          >
            {day.date.getDate()}
          </Link>

          {dayEvents.length > 0 && (
            <ul className="flex flex-col gap-1">
              {dayEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    href={`/events/${event.id}`}
                    title="Edit this event"
                    className="block truncate rounded bg-pink-200 px-1 text-xs sm:text-sm text-slate-900 hover:bg-pink-300"
                  >
                    {event.eventName ?? 'Untitled event'}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* the leftover space is itself the "new event on this day" target */}
          <Link
            href={`/events?date=${key}`}
            aria-label={`Add an event on ${day.date.toLocaleDateString()}`}
            className="min-h-6 flex-1 rounded hover:bg-pink-100"
          />
        </div>
      </td>
    );
  }

  return (
    //.event-calendar in globals.css is what stretches the grid edge to edge
    <div className="event-calendar w-full">
      <Calendar
        showOutsideDays
        components={{ Day: DayCell }}
        //the shared Calendar sizes days for a date picker; in a month view the
        //columns divide the available width instead
        style={{
          '--rdp-day-width': 'auto',
          '--rdp-day-height': 'auto',
        } as React.CSSProperties}
        classNames={{
          weekday: 'p-2 text-sm sm:text-base font-normal',
        }}
        className="w-full text-sm sm:text-base"
      />
    </div>
  );
}
