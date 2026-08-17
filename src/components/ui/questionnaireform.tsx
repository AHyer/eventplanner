//eventplanner/src/components/ui/questionnaireform.tsx

'use client';

import { useActionState } from 'react';
import {questionnaire} from './questionnaire';

const initialState = { success: false, message: '' };

export default function QuestionnaireForm() {
  const [state, formAction, isPending] = useActionState(questionnaire, initialState);

  return (
    <div className="w-full max-w-2xl '1200px', fontFamily: 'serif', justifyContent: 'left' ">
      <h2 className=" text-2xl font-aboreto font-bold leading-8 text-zinc-600 dark:text-zinc-400">A few questions about your event...</h2>
      
      <form action={formAction}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventname" style={{ display: 'block', marginBottom: '5px' }}>What would you like to name your event?</label>  
          <input
            type="text"
            id="eventname"
            name="eventname"
            required
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"    
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventDateMin" style={{ display: 'block', marginBottom: '5px' }}>What is the soonest date that you anticipate holding your event?</label>
          <input
            type="date" //automagically renders date picker
            id="event_date_min"
            name="event_date_min"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="eventDateMax" style={{ display: 'block', marginBottom: '5px' }}>What is the latest date that you anticipate holding your event?</label>
          <input
            type="date" 
            id="event_date_max"
            name="event_date_max"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
          />
        </div>

          <div style={{ marginBottom: '15px' }}>
          <label htmlFor="venueZipCode" style={{ display: 'block', marginBottom: '5px' }}>Please enter the zip code for your event:</label>  
          <input
            type="text"
            id="venue_zip"
            name="venue_zip"
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"    
          />
        </div>

        <div>
          <label htmlFor="hire_out_tasks" style={{ paddingRight: '10px', display: 'block', marginBottom: '10px', marginRight: '10px' }}>Which event tasks would you like to hire out? 
          <select
            id="hire_out_tasks"
            name="hire_out_tasks"
            className="px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm" >
            <option value="">— Select —</option>
            <option value="catering">catering</option>
            <option value="setup">setup</option>
            <option value="pre-cleaning">pre-cleaning</option>
            <option value="post-cleaning">post-cleaning</option>
          </select>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          style={{ padding: '15px 15px', backgroundColor: '#bd83b0', color: '#fff', border: '4mm ridge rgb(20 20 20 / 0.6)', cursor: 'pointer' }}
        >
          {isPending ? 'Saving...' : 'Submit Questionnaire'}
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

// 'name' attribute (hire_out_tasks) must match exactly what your formData.get('hire_out_tasks') call


//TODO make drop-downs for single-choice options
//TODO make radio buttons? for multiple choice options
//What is your budget? //hi/lo
//On what date (or range) would you like to hold your event? (season) //hi/lo
//Inside or outside? //dropdown or radio button or bool
//NUmber of guests? (venue size limit) //hi/lo
//guest age range? (whether there needs to be kid activities, safety for kids/older people) //hi lo
//Will alcohol be served (Uber setup, age check for portioning)? //yes/no or bool
//Guest food allergies/sensitivities/preferences? //dropdown?
//At your home or at a venue?  //dropdown or radio button or bool
//zip code (weather, growing season, seasonal foods) //validate
//How much of the work do you want to do yourself? //rounded percentage?
//Will you have help from friends or family?
//TODO delegation list of tasks to share--sync with Google/Outlook (or import)
//I would like to pay someone else to: //dropdown
//  cater/clean up afterward/clean up beforehand/set up/serve drinks/serve food/deliver and arrange flowers/plan event/
//describe your ideal version of your event in as much detail as possible //text (for AI)
//describe your guests as a group for your event in as much detail as possible //text (for AI)