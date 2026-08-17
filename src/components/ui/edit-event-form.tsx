// src/components/ui/edit-event-form.tsx
//edit or delete a specific event chosen from the event list by event id

'use client';
import { useActionState } from 'react';
import { updateEvent } from '@/components/ui/update-event';
import { deleteEvent } from '@/components/ui/delete-event';
import type { events } from '@/db/schema';

type Event = typeof events.$inferSelect;

export function EditEventForm({ event }: { event: Event }) {
  const [state, formAction, isPending] = useActionState(updateEvent, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction} className="max-w-xl">
      <input type="hidden" name="id" value={event.id} />

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="event_name" style={{ display: 'block', marginBottom: '5px' }}>
          Event Name:
        </label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          defaultValue={event.eventName ?? ''} //defaultValue pre-fills the field while still letting the user type over it normally; value alone (without onChange) would make it read-only/frozen
          className="w-full border border-slate-300 rounded-md px-4 py-3"
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="event_date" style={{ display: 'block', marginBottom: '5px' }}>
          Event Date:
        </label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          defaultValue={event.eventDate ?? ''}
          className="w-full border border-slate-300 rounded-md px-4 py-3"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="event_venue" style={{ display: 'block', marginBottom: '5px' }}>
          Event Venue:
        </label>
        <input
          type="text"
          id="event_venue"
          name="event_venue"
          defaultValue={event.eventVenue ?? ''}
          className="w-full border border-slate-300 rounded-md px-4 py-3"
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="total_budget_min" style={{ display: 'block', marginBottom: '5px' }}>
            Budget Min:
          </label>
          <input
            type="number"
            step="0.01"
            id="total_budget_min"
            name="total_budget_min"
            defaultValue={event.totalBudgetMin ?? ''}
            className="w-full border border-slate-300 rounded-md px-4 py-3"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="total_budget_max" style={{ display: 'block', marginBottom: '5px' }}>
            Budget Max:
          </label>
          <input
            type="number"
            step="0.01"
            id="total_budget_max"
            name="total_budget_max"
            defaultValue={event.totalBudgetMax ?? ''}
            className="w-full border border-slate-300 rounded-md px-4 py-3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        style={{
          padding: '15px',
          backgroundColor: '#bd83b0',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '10px',
        }}
      >
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>

      {state.message && (
        <p className={state.success ? 'text-green-600' : 'text-red-600'} style={{ marginTop: '10px' }}>
          {state.message}
        </p>
      )}
    </form>
  );
}

export function DeleteEventButton({ id }: { id: number }) {
  return (
    <button
      onClick={() => {
        if (confirm('Delete this event? This cannot be undone.')) {
          deleteEvent(id);
        }
      }}
      style={{
        padding: '15px 20px',
        backgroundColor: '#aa126d',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        //marginLeft: '0px',
      }}
    >
      Delete Event
    </button>
  );
}