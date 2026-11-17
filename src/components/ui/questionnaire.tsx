//eventplanner/src/components/ui/questionnaire.tsx

//detailed questions for host to gather as much relevant data as possible and rough out the plan--many of these will populate the DB (but of course can be overwritten)
//this is a less formal way to gather info about the event (as opposed to the 'create event' page), as when user has not fleshed out al the details yet
'use server';

import { db } from '@/db';
import { events } from '@/db/schema';
import { event_guests_profile } from '@/db/schema';
import { getCurrentUser } from '@/lib/dal';
// import { guests } from '@/db/schema';
// import { tasks } from '@/db/schema';
// import { notes } from '@/db/schema';
// import { deco } from '@/db/schema';

//const CURRENT_USER_ID = 1;  //debug (until auth is implemented)

interface QuestionnaireInputs {
    eventName: string;    //eventName is the only required field; everything else is optional

    eventDateMax?: string;
    eventDateMin?: string;
    outside?: string;
    alcoholServed?:  string;
    eventVibe?:  string;
    totalBudgetMax?:  string;
    totalBudgetMin?:  string;
    hostLaborPortion?:  string;
    hostHelpers?:  string;
    hireOutTasks?:  string;
    idealEventDesc?: string;
    guestsMaxNum?:  string;
    guestsMinNum?:  string;
    inviteMethod: string;
    profileGender?: string;
    // profileGenderFemale?:  string;
    // profileGenderMale?:  string;
    // profileGenderNonbinary?:  string;
    guestsDietaryRestrictions?:  string;
    profileEducationMin?:  string;
    profileEducationMax?:  string;
    profileMaxAge?:  string;
    profileMinAge?:  string;
    guestsProfileDesc?:   string;
}

interface QuestionnaireResult {
  success: boolean;
  message: string;
}

export async function questionnaire(prevState: unknown, formData: FormData
): Promise<QuestionnaireResult> {
  
const inputs: QuestionnaireInputs = {         //everything the user enters for this form (all strings)
    eventName: (formData.get('eventname') as string) ?? '',

    eventDateMax: (formData.get('eventdatemax') as string) || undefined, //what we are 'getiing' must match html id & name
    eventDateMin: (formData.get('eventdatemin') as string) || undefined,
    outside: (formData.get('outside') as string) || undefined,
    alcoholServed:  (formData.get('alcoholserved') as string) || undefined,
    eventVibe:  (formData.get('eventvibe') as string) || undefined,
    totalBudgetMax:  (formData.get('totalbudgetmax') as string) || undefined,
    totalBudgetMin:  (formData.get('totalbudgetmin') as string) || undefined,
    guestsMaxNum:  (formData.get('maxnumguests') as string) || undefined,
    guestsMinNum:  (formData.get('minnumguests') as string) || undefined,
    hostLaborPortion:  (formData.get('hostlaborportion') as string) || undefined,
    hostHelpers:  (formData.get('hosthelpers') as string) || undefined,
    hireOutTasks:  (formData.get('hireouttasks') as string) || undefined,
    idealEventDesc: (formData.get('idealeventdesc') as string) || undefined,
    inviteMethod: (formData.get('invitemethod') as string) || '',
    profileGender: (formData.get('profilegender') as string) || undefined,
    // profileGenderFemale:  (formData.get('profile_gender_female') as string) || undefined,
    // profileGenderMale:  (formData.get('profile_gender_male') as string) || undefined,
    // profileGenderNonbinary:  (formData.get('profile_gender_nonbinary') as string) || undefined,
    profileEducationMin:  (formData.get('profileeducationmin') as string) || undefined,
    profileEducationMax:  (formData.get('profileeducationmax') as string) || undefined,
    profileMaxAge:  (formData.get('profilemaxage') as string) || undefined,
    profileMinAge:  (formData.get('profileminage') as string) || undefined,
    guestsProfileDesc:   (formData.get('guestsprofiledesc') as string) || undefined,
};

if (!inputs.eventName) {
    return { success: false, message: 'Event name field required.' };
  }


  try {
    await db.transaction(async (tx) => {
        const currentUser = await getCurrentUser();
        if (!currentUser) { 
          return { success: false, message: 'You must be signed in to create an event.' };
        }
      // events row always gets created — it's the anchor everything else hangs off
      const [newEvent] = await tx
        .insert(events) //insert to events table
        .values({
          userId: currentUser.id,  //auth() returns session object with user id, getCurrentUser() returns user row with id
          eventName: inputs.eventName,
          // only set a field if it was actually answered — otherwise leave it
          // undefined so Drizzle uses the column's default/null instead of writing an empty string
          
          eventDateMax: inputs.eventDateMax || undefined,
          eventDateMin: inputs.eventDateMin || undefined,
          outside: inputs.outside ? inputs.outside === 'true' : undefined,
          alcoholServed: inputs.alcoholServed ? inputs.alcoholServed === 'true' : undefined,
          eventVibe:  inputs.eventVibe || undefined,
          totalBudgetMax: inputs.totalBudgetMax as typeof events.totalBudgetMax.enumValues[number] | undefined,
          totalBudgetMin: inputs.totalBudgetMin as typeof events.totalBudgetMin.enumValues[number] | undefined,
          guestsMaxNum: inputs.guestsMaxNum ? Number(inputs.guestsMaxNum) : undefined,
          guestsMinNum: inputs.guestsMinNum ? Number(inputs.guestsMinNum) : undefined,
          hostLaborPortion:  inputs.hostLaborPortion as typeof events.hostLaborPortion.enumValues[number] | undefined,
          hostHelpers: inputs.hostHelpers ? Number(inputs.hostHelpers) : undefined,
          hireOutTasks: inputs.hireOutTasks as typeof events.hireOutTasks.enumValues[number] | undefined,
          idealEventDesc: inputs.idealEventDesc || undefined,
          
        })
        .returning({ id: events.id });

      // Guest profile: only insert if the host answered at least one guest-profile question — otherwise skip it entirely
      const hasGuestProfileData = 
        inputs.profileEducationMin ||
        inputs.profileEducationMax ||
        inputs.profileMaxAge ||
        inputs.profileMinAge ||
        inputs.guestsDietaryRestrictions ||
        inputs.guestsProfileDesc;

      if (hasGuestProfileData) {
        await tx.insert(event_guests_profile).values({
          eventId: newEvent.id,
          profileEducationMin: inputs.profileEducationMin as typeof event_guests_profile.profileEducationMin.enumValues[number] | undefined,
          profileEducationMax: inputs.profileEducationMax as typeof event_guests_profile.profileEducationMax.enumValues[number] | undefined,
          profileMaxAge: inputs.profileMaxAge as typeof event_guests_profile.profileMaxAge.enumValues[number] | undefined,
          profileMinAge: inputs.profileMinAge as typeof event_guests_profile.profileMinAge.enumValues[number] | undefined,
          profileGender: inputs.profileGender as typeof event_guests_profile.profileGender.enumValues[number] | undefined,
          // profileGenderFemale: inputs.profileGenderFemale as typeof event_guests_profile.profileGenderFemale.enumValues[number] | undefined,
          // profileGenderMale: inputs.profileGenderMale as typeof event_guests_profile.profileGenderMale.enumValues[number] | undefined,
          // profileGenderNonbinary: inputs.profileGenderNonbinary as typeof event_guests_profile.profileGenderNonbinary.enumValues[number] | undefined,
          guestsProfileDesc: inputs.guestsProfileDesc || undefined,
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