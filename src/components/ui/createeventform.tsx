// eventplanner/src/components/ui/createeventform.tsx

'use client';

import { useActionState } from 'react';
import {createEvent} from './createevent';
import { EnumSelect } from './enum-select';
import {
  dietaryRestrictionOptions,
  inviteMethodOptions
} from './enum-options';

const initialState = { success: false, message: '' };

export default function CreateEventForm({
  defaultDate, //"YYYY-MM-DD" when the user got here by clicking a day on /calendar
}: {
  defaultDate?: string;
}) {
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
            className="form-box"
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventdate" style={{ display: 'block', marginBottom: '5px' }}>Event Date:</label>
          <input
            type="date" //automagically renders date picker
            id="eventdate"
            name="eventdate"
            defaultValue={defaultDate ?? ''} //pre-filled from /calendar, still editable
            className="form-box"
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventvenue" style={{ display: 'block', marginBottom: '5px' }}>Event Venue Name:</label>
          <input
            type="text"
            id="eventvenue"
            name="eventvenue"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuestreetaddress" style={{ display: 'block', marginBottom: '5px' }}>Venue Street Address:</label>
          <input
            type="text"
            id="venuestreetaddress"
            name="venuestreetaddress"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuecity" style={{ display: 'block', marginBottom: '5px' }}>Venue City:</label>
          <input
            type="text"
            id="venuecity"
            name="venuecity"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuestate" style={{ display: 'block', marginBottom: '5px' }}>Venue State:</label>
          <input
            type="text"
            id="venuestate"
            name="venuestate"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuecountry" style={{ display: 'block', marginBottom: '5px' }}>Venue Country:</label>
          <input
            type="text"
            id="venuecountry"
            name="venuecountry"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuezipcode" style={{ display: 'block', marginBottom: '5px' }}>Venue Zip Code:</label>
          <input
            type="text"
            id="venuezipcode"
            name="venuezipcode"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venewebsite" style={{ display: 'block', marginBottom: '5px' }}>Venue Website:</label>
          <input
            type="text"
            id="venewebsite"
            name="venewebsite"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuecontactphone" style={{ display: 'block', marginBottom: '5px' }}>Venue Contact Phone:</label>
          <input
            type="text"
            id="venuecontactphone"
            name="venuecontactphone"
            className="form-box"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venuecontactemail" style={{ display: 'block', marginBottom: '5px' }}>Venue Contact Email:</label>
          <input    
            type="text"
            id="venuecontactemail"
            name="venuecontactemail"
            className="form-box"
          />
        </div>
        
        

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventvibe" style={{ display: 'block', marginBottom: '5px' }}>Event Vibe:</label>
          <input
            type="text"
            id="eventvibe"
            name="eventvibe"
            className="form-box"
            placeholder='describe the general vibe you would like for your event'
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="numguests" style={{ display: 'block', marginBottom: '5px' }}>Number of guests invited:</label>
          <input
            type="text"
            id="numguests"
            name="numguests"
            className="form-box"
          />
        </div>

         <div style={{ marginBottom: '15px' }}>
          <label htmlFor="outside" style={{ display: 'block', marginBottom: '5px' }}>Will your event be held outside?</label>
          <input
            type="radio"
            id="outside"
            name="outside"
            value="true"
            className="radio-button"
          />Yes
           <input
            type="radio"
            id="outside"
            name="outside"
            value="false"
            className="radio-button"
          />No
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="alcoholserved" style={{ display: 'block', marginBottom: '5px' }}>Will alcohol be served at your event?</label>
          <input
            type="radio"
            id="alcoholserved"
            name="alcoholserved"
            value="true"
            className="radio-button"
          />Yes
           <input
            type="radio"
            id="alcoholserved"
            name="alcoholserved"
            value="false"
            className="radio-button"
          />No
        </div>

        <EnumSelect
                  name="invite_method"
                  label="In general, how would you like to invite guests to your event?"
                  options={inviteMethodOptions}
                />

        <EnumSelect
                  name="guestsdietaryrestrictions"
                  label="Do your guests have any dietary restrictions?"
                  options={dietaryRestrictionOptions}
                />

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="guestlistvisibletoguests" style={{ display: 'block', marginBottom: '5px' }}>Would you like the guest list to be visible to all guests?</label>
          <input
            type="radio"
            id="guestlistvisibletoguests"
            name="guestlistvisibletoguests"
            value="true"
            className="radio-button"
          />Yes
           <input
            type="radio"
            id="guestlistvisibletoguests"
            name="guestlistvisibletoguests"
            value="false"
            className="radio-button"
          />No
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="framed-button"
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