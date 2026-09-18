// eventplanner/src/components/ui/createeventform.tsx

'use client';

import { useActionState } from 'react';
import {createEvent} from './createevent';

const initialState = { success: false, message: '' };

export default function CreateEventForm() {
  const [state, formAction, isPending] = useActionState(createEvent, initialState);

  return (
    <div className="w-full max-w-4xl '1400px', fontFamily: 'serif', justifyContent: 'left' ">
      <h2 >Create A New Event</h2>
      
      <form action={formAction}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventname" style={{ display: 'block', marginBottom: '5px' }}>Event Name:</label>  
          <input
            type="text"
            id="eventname"
            name="eventname"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"    
            required
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}   //input box
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventdate" style={{ display: 'block', marginBottom: '5px' }}>Event Date:</label>
          <input
            type="date" //automagically renders date picker
            id="eventdate"
            name="eventdate"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventvenue" style={{ display: 'block', marginBottom: '5px' }}>Event Venue Name:</label>
          <input
            type="text"
            id="eventvenue"
            name="eventvenue"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venueaddress" style={{ display: 'block', marginBottom: '5px' }}>Venue Address:</label>
          <input
            type="text"
            id="venueaddress"
            name="venueaddress"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>
        {/* TODO break address up into parts, validate */}

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventvibe" style={{ display: 'block', marginBottom: '5px' }}>Event Vibe:</label>
          <input
            type="text"
            id="eventvibe"
            name="eventvibe"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            placeholder='describe the general vibe you would like for your event'
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="numguests" style={{ display: 'block', marginBottom: '5px' }}>Number of guests to be invited:</label>
          <input
            type="text"
            id="numguests"
            name="numguests"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="outside" style={{ display: 'block', marginBottom: '5px' }}>Will your event be held outside?</label>
          <input
            type="radio"
            id="outside"
            name="outside"
            className="px-8 py-8 bg-white border border-slate-300 rounded-md shadow-sm"
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="alcoholserved" style={{ display: 'block', marginBottom: '5px' }}>Will alcohol be served at your event?</label>
          <input
            type="radio"
            id="alcoholserved"
            name="alcoholserved"
            className="px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            //style={{ width: '100%', padding: '12px', boxSizing: 'border-box', background: '#fff', border: 'rounded-md' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          style={{ padding: '15px 15px', backgroundColor: '#bd83b0', color: '#fff', border: '4mm ridge rgb(20 20 20 / 0.6)', cursor: 'pointer' }}
        >
          {isPending ? 'Saving...' : 'Submit Event'}
        </button>
      </form>

      {state.message && (
        <p style={{ marginTop: '15px', color: state.success ? 'green' : 'red' }}>
          {state.message}
        </p>
      )}
    </div>
  );
}

//TODO allow clearing form