// src/components/ui/edit-event-form.tsx
//edit or delete a specific event chosen from the event list by event id

'use client';
import { useActionState } from 'react';
import { updateEvent } from '@/components/ui/update-event';
import { deleteEvent } from '@/components/ui/delete-event';
import { EnumSelect } from '@/components/ui/enum-select';
import { budgetAmountOptions } from '@/components/ui/enum-options';
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
        <label htmlFor="eventname" style={{ display: 'block', marginBottom: '5px' }}>
          Event Name:
        </label>
        <input
          type="text"
          id="eventname"
          name="eventname"
          defaultValue={event.eventName ?? ''} //defaultValue pre-fills the field while still letting the user type over it normally; value alone (without onChange) would make it read-only/frozen
          className="form-box"
          required
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="eventdate" style={{ display: 'block', marginBottom: '5px' }}>
          Event Date:
        </label>
        <input
          type="date"
          id="eventdate"
          name="eventdate"
          defaultValue={event.eventDate ?? ''}
          className="form-box"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="eventvenue" style={{ display: 'block', marginBottom: '5px' }}>
          Event Venue:
        </label>
        <input
          type="text"
          id="eventvenue"
          name="eventvenue"
          defaultValue={event.eventVenue ?? ''}
          className="form-box"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="venuestreetaddress" style={{ display: 'block', marginBottom: '5px' }}>
          Venue Street Address:
        </label>
        <input
          type="text"
          id="venuestreetaddress"
          name="venuestreetaddress"
          defaultValue={event.eventVenue ?? ''}
          className="form-box"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="venuecity" style={{ display: 'block', marginBottom: '5px' }}>
          Venue City:
        </label>
        <input
          type="text"
          id="venuecity"
          name="venuecity"
          defaultValue={event.eventVenue ?? ''}
          className="form-box"
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="venuestate" style={{ display: 'block', marginBottom: '5px' }}>
          Venue State:
        </label>
        <input
          type="text"
          id="venuestate"
          name="venuestate"
          defaultValue={event.eventVenue ?? ''}
          className="form-box"
        />
      </div>

      {/* TODO add remaining column names */}

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="venuecountry" style={{ display: 'block', marginBottom: '5px' }}>
          Venue Country:
        </label>
        <input
          type="text"
          id="venuecountry"
          name="venuecountry"
          defaultValue={event.eventVenue ?? ''}
          className="form-box"
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <EnumSelect
          name="totalbudgetmin"
          label="Budget Min:"
          options={budgetAmountOptions}
          defaultValue={event.totalBudgetMin}
          className="flex-1"
        />
        <EnumSelect
          name="totalbudgetmax"
          label="Budget Max:"
          options={budgetAmountOptions}
          defaultValue={event.totalBudgetMax}
          className="flex-1"
        />
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