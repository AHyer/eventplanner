//eventplanner/src/components/ui/questionnaireform.tsx

'use client';

import { useActionState } from 'react';
import {questionnaire} from './questionnaire';
import { EnumSelect } from './enum-select';
import {
  budgetAmountOptions,
  hostLaborPortionOptions,
  ageBracketOptions,
  educationLevelOptions,
  dietaryRestrictionOptions,
  hireOutTasksOptions,
} from './enum-options';

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

        {/* every field below writes to an enum column, so they are all dropdowns —
            the blank option means "not answered" and leaves the column null */}
        <EnumSelect
          name="total_budget_min"
          label="At a minimum, what do you expect to spend on your event?"
          options={budgetAmountOptions}
        />

        <EnumSelect
          name="total_budget_max"
          label="What is the most you are willing to spend?"
          options={budgetAmountOptions}
        />

        <EnumSelect
          name="host_labor_portion"
          label="How much of the work do you want to do yourself?"
          options={hostLaborPortionOptions}
        />

        <EnumSelect
          name="hire_out_tasks"
          label="Which event tasks would you like to hire out?"
          options={hireOutTasksOptions}
        />

        <h3 className="text-xl font-aboreto font-bold leading-8 text-zinc-600 dark:text-zinc-400" style={{ marginTop: '25px', marginBottom: '10px' }}>
          ...and about your guests
        </h3>

        <EnumSelect
          name="profile_min_age"
          label="What is the youngest age group you expect among your guests?"
          options={ageBracketOptions}
        />

        <EnumSelect
          name="profile_max_age"
          label="And the oldest age group?"
          options={ageBracketOptions}
        />

        <EnumSelect
          name="profile_education_min"
          label="What is the least amount of schooling your guests are likely to have?"
          options={educationLevelOptions}
        />

        <EnumSelect
          name="profile_education_max"
          label="And the most?"
          options={educationLevelOptions}
        />

        <EnumSelect
          name="profile_guests_dietary_restrictions"
          label="Do your guests have a dietary restriction to plan around?"
          options={dietaryRestrictionOptions}
        />

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