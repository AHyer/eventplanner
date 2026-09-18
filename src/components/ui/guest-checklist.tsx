// src/components/ui/guest-checklist.tsx
// Client half of the guest list: checkboxes + "delete selected".
// The query and grouping stay on the server in listguests.tsx; this only owns
// which rows are checked.

'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { deleteGuest } from './delete-guest';
import { updateGuestStatus } from './update-guest-status';
import { guestStatusOptions } from './enum-options';
import type { guests } from '@/db/schema';

type GuestStatus = typeof guests.$inferSelect['guestStatus'];

export type GuestRow = {
  guestId: number;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  guestStatus: GuestStatus;
};

export type GuestGroup = {
  eventId: number;
  eventName: string | null;
  eventDate: string | null;
  guests: GuestRow[];
};

// Short badge wording — the longer phrasing in guestStatusOptions is for the dropdown.
const statusDisplay: Record<NonNullable<GuestStatus>, { label: string; className: string }> = {
  invited: { label: 'Awaiting reply', className: 'bg-amber-100 text-amber-900' },
  accepted: { label: 'Accepted', className: 'bg-green-100 text-green-900' },
  declined: { label: 'Declined', className: 'bg-rose-100 text-rose-900' },
};

const noStatus = { label: 'Not invited yet', className: 'bg-slate-100 text-slate-700' };

export default function GuestChecklist({ groups }: { groups: GuestGroup[] }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  //the dropdown a row shows until the server revalidation catches up
  const [pickedStatus, setPickedStatus] = useState<Record<number, string>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [, startStatusTransition] = useTransition();

  function toggle(id: number) {
    setSelected((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  }

  function toggleEvent(group: GuestGroup) {
    const ids = group.guests.map((guest) => guest.guestId);
    const allChecked = ids.every((id) => selected.includes(id));
    setSelected((current) =>
      allChecked
        ? current.filter((id) => !ids.includes(id))
        : [...new Set([...current, ...ids])]
    );
  }

  function handleStatusChange(id: number, status: string) {
    setPickedStatus((current) => ({ ...current, [id]: status }));
    setSavingId(id);
    startStatusTransition(async () => {
      await updateGuestStatus(id, status);
      setSavingId(null);
    });
  }

  function handleDelete() {
    if (selected.length === 0) return;
    if (!confirm(`Remove ${selected.length} guest${selected.length === 1 ? '' : 's'}? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      // deleteGuest takes a single id and revalidates /guests itself, so the
      // selection is deleted one row at a time rather than in one statement.
      for (const id of selected) {
        await deleteGuest(id);
      }
      setSelected([]);
    });
  }

  //what the row should show right now: the just-picked value wins until the
  //server sends the updated rows back
  function statusOf(guest: GuestRow) {
    return pickedStatus[guest.guestId] ?? guest.guestStatus ?? '';
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDelete}
        disabled={selected.length === 0 || isPending}
        className="mb-6 px-4 py-2 rounded-md text-white disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#aa126d', cursor: 'pointer' }}
      >
        {isPending ? 'Removing...' : `Remove Selected (${selected.length})`}
      </button>

      {groups.map((group) => (
        <div key={group.eventId} className="mb-8">
          <Link href={`/events/${group.eventId}`}>
            <h2 className="text-2xl font-bold text-gray-500">{group.eventName ?? 'Untitled event'}</h2>
          </Link>

          <p className="mb-2 text-sm">
            {group.eventDate
              ? new Date(group.eventDate).toLocaleDateString('en-US', { //match the formatting used on the events list
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Date TBD'}
            {' · '}
            {group.guests.filter((guest) => statusOf(guest) === 'accepted').length} of {group.guests.length} attending
          </p>

          <button
            type="button"
            onClick={() => toggleEvent(group)}
            className="mb-3 text-sm underline"
            style={{ cursor: 'pointer' }}
          >
            {group.guests.every((guest) => selected.includes(guest.guestId))
              ? 'Clear all for this event'
              : 'Select all for this event'}
          </button>

          <ul className="space-y-2">
            {group.guests.map((guest) => {
              const current = statusOf(guest);
              const status = current ? statusDisplay[current as NonNullable<GuestStatus>] : noStatus;
              return (
                <li key={guest.guestId} className="p-3 border rounded shadow-sm flex flex-wrap items-center justify-between gap-2">
                  <label className="flex items-center gap-3" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selected.includes(guest.guestId)}
                      onChange={() => toggle(guest.guestId)}
                      disabled={isPending}
                      className="size-4"
                    />
                    <span>
                      <span className="block font-semibold">{guest.guestName ?? 'Unnamed guest'}</span>
                      <span className="block text-sm text-gray-500">
                        {guest.guestEmail ?? guest.guestPhone ?? 'No contact info'}
                      </span>
                    </span>
                  </label>
                  {/* the badge is the control — changing it saves the new RSVP right away */}
                  <select
                    aria-label={`RSVP status for ${guest.guestName ?? 'this guest'}`}
                    value={current}
                    onChange={(event) => handleStatusChange(guest.guestId, event.target.value)}
                    disabled={isPending || savingId === guest.guestId}
                    className={`px-3 py-1 rounded-md text-sm border border-slate-300 ${status.className}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">{noStatus.label}</option>
                    {guestStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {statusDisplay[option.value].label}
                      </option>
                    ))}
                  </select>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
