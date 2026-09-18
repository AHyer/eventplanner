// src/components/ui/addguestform.tsx

'use client';

import { useActionState } from 'react';
import { addGuest } from './addguest';
import { EnumSelect } from './enum-select';
import { dietaryRestrictionOptions, guestStatusOptions } from './enum-options';
import { deleteGuest } from './delete-guest';

const initialState = { success: false, message: '' };

export default function AddGuestForm({
  events, //the current host's events, loaded on the server so the dropdown has real ids
}: {
  events: { id: number; eventName: string | null }[];
}) {
  const [state, formAction, isPending] = useActionState(addGuest, initialState);

  return (
    <div className="w-full max-w-4xl">
      <h2>Add A Guest</h2>

      {events.length === 0 ? (
        <p className="mt-4 font-arapey text-lg">
          Create an event first — guests are tracked per event.
        </p>
      ) : (
        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="event_id" className="block mb-1  text-slate-100">Which event?</label>
            <select
              id="event_id"
              name="event_id"
              className="w-full px-4 py-3 bg-white border-slate-300 rounded-md shadow-sm"
              required
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.eventName ?? `Event #${event.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="guest_name" className="block mb-1  text-slate-100">Guest Name:</label>
            <input
              type="text"
              id="guest_name"
              name="guest_name"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="guest_email" className="block mb-1  text-slate-100">Email:</label>
            <input
              type="email"
              id="guest_email"
              name="guest_email"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="guest_phone" className="block mb-1  text-slate-100">Phone:</label>
            <input
              type="tel"
              id="guest_phone"
              name="guest_phone"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            />
          </div>

          <EnumSelect
            name="guest_status"
            label="Response status"
            options={guestStatusOptions}
            defaultValue="invited"
            placeholder="— Not invited yet —"
          />

          <EnumSelect
            name="dietary_restrictions"
            label="Dietary restriction"
            options={dietaryRestrictionOptions}
          />

          <button
            type="submit"
            disabled={isPending}
            style={{ padding: '15px 15px', backgroundColor: '#bd83b0', color: '#fff', border: '4mm ridge rgb(20 20 20 / 0.6)', cursor: 'pointer' }}
          >
            {isPending ? 'Saving...' : 'Add Guest'}
          </button>
        </form>
      )}

      {state.message && (
        <p style={{ marginTop: '15px', color: state.success ? 'pink' : 'magenta' }}>
          {state.message}
        </p>
      )}
    </div>
  );
}

