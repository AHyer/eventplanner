//eventplanner/src/components/ui/questionnaire.tsx

//detailed questions for host to gather as much relevant data as possible and rough out the plan--many of these will populate the DB (but of course can be overwritten)
//this is a less formal way to gather info about the event (as opposed to the 'create event' page), as when user has not fleshed out al the details yet
'use server';

import { db } from '@/db';
import { events } from '@/db/schema';
import { event_guest_profile } from '@/db/schema';
// import { guests } from '@/db/schema';
// import { tasks } from '@/db/schema';
// import { notes } from '@/db/schema';
// import { deco } from '@/db/schema';

const CURRENT_USER_ID = 1;  //debug (until auth is implemented)

interface QuestionnaireInputs {
    eventName: string;    //eventName is the only required field; everything else is optional

    eventDateMax?: string;
    eventDateMin?: string;
    outside?: string;
    alcoholServed?:  string;
    venueZipCode?: string;
    eventVibe?:  string;
    totalBudgetMax?:  string;
    totalBudgetMin?:  string;
    guestsMaxNum?:  string;
    guestsMinNum?:  string;
    hostLaborPortion?:  string;
    hostHelpers?:  string;
    hireOutTasks?:  string;
    idealEventDesc?: string;
    profileEducationMin?:  string;
    profileEducationMax?:  string;
    profileMaxAge?:  string;
    profileMinAge?:  string;
    guestFoodAllergies?:  string;
    guestProfileDesc?:   string;
}

interface QuestionnaireResult {
  success: boolean;
  message: string;
}

export async function questionnaire(prevState: unknown, formData: FormData
): Promise<QuestionnaireResult> {
  
const inputs: QuestionnaireInputs = {         //everything the user enters for this form (all strings)
    eventName: (formData.get('eventname') as string) ?? '',

    eventDateMax: (formData.get('event_date_max') as string) || undefined,
    eventDateMin: (formData.get('event_date_min') as string) || undefined,
    outside: (formData.get('outside') as string) || undefined,
    alcoholServed:  (formData.get('alcohol_served') as string) || undefined,
    venueZipCode: (formData.get('venue_zip') as string) || undefined,
    eventVibe:  (formData.get('event_vibe') as string) || undefined,
    totalBudgetMax:  (formData.get('total_budget_max') as string) || undefined,
    totalBudgetMin:  (formData.get('total_budget_min') as string) || undefined,
    guestsMaxNum:  (formData.get('max_num_guests') as string) || undefined,
    guestsMinNum:  (formData.get('min_num_guests') as string) || undefined,
    hostLaborPortion:  (formData.get('host_labor_portion') as string) || undefined,
    hostHelpers:  (formData.get('host_helpers') as string) || undefined,
    hireOutTasks:  (formData.get('hire_out_tasks') as string) || undefined,
    idealEventDesc: (formData.get('ideal_event_desc') as string) || undefined,
    profileEducationMin:  (formData.get('profile_education_min') as string) || undefined,
    profileEducationMax:  (formData.get('profile_education_max') as string) || undefined,
    profileMaxAge:  (formData.get('profile_max_age') as string) || undefined,
    profileMinAge:  (formData.get('profile_min_age') as string) || undefined,
    guestFoodAllergies:  (formData.get('guest_food_allergies') as string) || undefined,
    guestProfileDesc:   (formData.get('guest_profile_desc') as string) || undefined,
};

if (!inputs.eventName) {
    return { success: false, message: 'Event name field required.' };
  }


  try {
    await db.transaction(async (tx) => {
      // events row always gets created — it's the anchor everything else hangs off
      const [newEvent] = await tx
        .insert(events) //insert to events table
        .values({
          userId: CURRENT_USER_ID,
          eventName: inputs.eventName,
          // only set a field if it was actually answered — otherwise leave it
          // undefined so Drizzle uses the column's default/null instead of
          // writing an empty string
          

          eventDateMax: inputs.eventDateMax || undefined,
          eventDateMin: inputs.eventDateMin || undefined,
          outside: inputs.outside ? inputs.outside === 'true' : undefined,
          alcoholServed: inputs.alcoholServed ? inputs.alcoholServed === 'true' : undefined,
          venueZipCode: inputs.venueZipCode || undefined,
          eventVibe:  inputs.eventVibe || undefined,
          totalBudgetMax: inputs.totalBudgetMax|| undefined,
          totalBudgetMin: inputs.totalBudgetMin || undefined,
          guestsMaxNum: inputs.guestsMaxNum ? Number(inputs.guestsMaxNum) : undefined,
          guestsMinNum: inputs.guestsMinNum ? Number(inputs.guestsMinNum) : undefined,
          hostLaborPortion:  inputs.hostLaborPortion || undefined,
          hostHelpers: inputs.hostHelpers ? Number(inputs.hostHelpers) : undefined,
          hireOutTasks: inputs.hireOutTasks as typeof events.hireOutTasks.enumValues[number] | undefined,
          idealEventDesc: inputs.idealEventDesc || undefined,
          
        })
        .returning({ id: events.id });

      // Guest profile: only insert if the host answered at least one
      // guest-profile question — otherwise skip it entirely
      const hasGuestProfileData = 
        inputs.profileEducationMin ||
        inputs.profileEducationMax ||
        inputs.profileMaxAge ||
        inputs.profileMinAge ||
        inputs.guestFoodAllergies ||
        inputs.guestProfileDesc;

      if (hasGuestProfileData) {
        await tx.insert(event_guest_profile).values({
          eventId: newEvent.id,
          profileEducationMin: inputs.profileEducationMin || undefined,
          profileEducationMax: inputs.profileEducationMax || undefined,
          profileMaxAge: inputs.profileMaxAge ? Number(inputs.profileMaxAge) : undefined,
          profileMinAge: inputs.profileMinAge ? Number(inputs.profileMinAge) : undefined,
          guestFoodAllergies: inputs.guestFoodAllergies || undefined,
          guestProfileDesc: inputs.guestProfileDesc || undefined,
        });
      }

      // Same conditional pattern for guests, tasks, notes, deco —
      // check "did the host answer anything relevant to this table"
      // before inserting, using newEvent.id as the foreign key
    });

    return { success: true, message: 'Got it — you can fill in more details anytime.' };
  } catch (error) {
    console.error('Drizzle execution error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}

//total_budget_max
//total_budget_min
//event_date_max
//event_date_min
//outside yes/no
//guests_max_num
//guests_min_num
//guests_max_age
//guests_min_age
//alcohol yes/no
//guest_food_allergies
//at_home yes/no
//zip_code
//labor_percent
//helpers (how many)
//hire out
//ideal_event_desc
//guest_profile_desc

//what would you like to name your event?
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
//Will you have help from friends or family? If so, how many poeple?
//TODO delegation: list of tasks to share--sync with Google/Outlook (or import)
//I would like to pay someone else to: //dropdown
//  cater/clean up afterward/clean up beforehand/set up/serve drinks/serve food/deliver and arrange flowers/plan event/
//describe your ideal version of your event in as much detail as possible //text (for AI)
//describe your guests as a group for your event in as much detail as possible //text (for AI)

//TODO generate grocery list