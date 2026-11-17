// src/components/ui/update-event.tsx

//allows editing of a specific event chosen from the event list by event id; updates DB with new values
//includes table cols from both event form and planning questionnaire

'use server';
import { db } from '@/db';
import { events, event_guests_profile } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface UpdateEventResult {
  success: boolean;
  message: string;
}

export async function updateEvent(
  prevState: unknown,
  formData: FormData
): Promise<UpdateEventResult> {
  const id = Number(formData.get('id'));
  const eventname = formData.get('eventname') as string | null;
  const eventdate = formData.get('eventdate') as string | null;
  const eventdatemax = formData.get('event_date_max') as string | null;
  const eventdatemin = formData.get('event_date_min') as string | null;
  const eventvenue = formData.get('eventvenue') as string | null;
  const venuestreetaddress = formData.get('venuestreetaddress') as string | null;
  const venuecity = formData.get('venuecity') as string | null;
  const venuestate = formData.get('venuestate') as string | null;
  const venuecountry = formData.get('venuecountry') as string | null;
  const venuezipcode = formData.get('venuezipcode') as string | null;
  const venewebsite = formData.get('venewebsite') as string | null;
  const venuecontactphone = formData.get('venuecontactphone') as string | null;
  const venuecontactemail = formData.get('venuecontactemail') as string | null;
  const eventvibe = formData.get('eventvibe') as string | null;
  const idealeventdesc = formData.get('ideal_event_desc') as string | null;
  const outside = formData.get('outside') as boolean | null;
  const alcoholserved = formData.get('alcoholserved') as boolean | null;
  const totalbudgetmax = formData.get('totalbudgetmax') as string | null;
  const totalbudgetmin = formData.get('totalbudgetmin') as string | null;
  const hostlaborportion = formData.get('hostlaborportion') as string | null;
  const hosthelpers = formData.get('hosthelpers') as string | null;
  const hireouttasks = formData.get('hireouttasks') as string | null;
  const invitemethod = formData.get('invitemethod') as string | null;
  const numguests = formData.get('numguests') as string | null;
  const guestsmaxnum = formData.get('maxnumguests') as string | null;
  const guestsminnum = formData.get('minnumguests') as string | null;
  const guestsdietaryrestrictions = formData.get('guestsdietaryrestrictions') as string | null;
  const guestsspecaccom = formData.get('guestsspecaccom') as string | null;
  const guestlistvisibletoguests = formData.get('guestlistvisibletoguests') as boolean | null;
  //const profilegender = formData.get('profile_gender') as string | null;
  // const profilegenderfemale = formData.get('profile_gender_female') as string | null;
  // const profilegendermale = formData.get('profile_gender_male') as string | null;
  // const profilegendernonbinary = formData.get('profile_gender_nonbinary') as string | null;
  //const profileeducationmin = formData.get('profileeducationmin') as string | null;
  //const profileeducationmax = formData.get('profileeducationmax') as string | null;
  // const profilemaxage = formData.get('profilemaxage') as string | null;
  // const profileminage = formData.get('profileminage') as string | null;
  // const guestsProfileDesc = formData.get('guestsprofiledesc') as string | null;

  if (!eventname) {
    return { success: false, message: 'Event name field required.' };
  }

  try {
    await db
      .update(events) //server updates DB
      .set({
        eventName: eventname || undefined,
        eventDate: eventdate || undefined,
        eventVenue: eventvenue || undefined,
        eventDateMax: eventdatemax || undefined,
        eventDateMin: eventdatemin || undefined,
        idealEventDesc: idealeventdesc || undefined,
        totalBudgetMax: totalbudgetmax as typeof events.totalBudgetMax.enumValues[number] || undefined,
        totalBudgetMin: totalbudgetmin as typeof events.totalBudgetMin.enumValues[number] || undefined,
        hostLaborPortion:hostlaborportion as typeof events.hostLaborPortion.enumValues[number] || undefined,
        hostHelpers: hosthelpers ? Number(hosthelpers) : undefined,
        hireOutTasks: hireouttasks as typeof events.hireOutTasks.enumValues[number] || undefined,
        //profileGender: profilegender as typeof event_.profileGender.enumValues[number] || undefined,
        // profileGenderFemale: profilegenderfemale || undefined,
        // profileGenderMale: profilegendermale || undefined,
        // profileGenderNonbinary: profilegendernonbinary || undefined,
        // profileEducationMin: profileeducationmin || undefined,
        // profileEducationMax: profileeducationmax || undefined,
        // profileMaxAge: profilemaxage ? Number(profilemaxage) : undefined,
        // profileMinAge: profileminage ? Number(profileminage) : undefined,
        // guestsProfileDesc: guestsProfileDesc || undefined,
        venueStreetAddress: venuestreetaddress || undefined,
        venueCity: venuecity || undefined,
        venueState: venuestate || undefined,
        venueCountry: venuecountry || undefined,
        venueZipCode: venuezipcode || undefined,
        venueWebsite: venewebsite || undefined,
        venueContactPhone: venuecontactphone || undefined,
        venueContactEmail: venuecontactemail || undefined,
        eventVibe: eventvibe || undefined,
        numGuests: numguests ? Number(numguests) : undefined,
        guestsMaxNum: guestsmaxnum ? Number(guestsmaxnum) : undefined,
        guestsMinNum: guestsminnum ? Number(guestsminnum) : undefined,
        outside: outside || undefined,
        alcoholServed: alcoholserved || undefined,
        guestsDietaryRestrictions: guestsdietaryrestrictions as typeof events.guestsDietaryRestrictions.enumValues[number] || undefined,
        guestsSpecAccom: guestsspecaccom || undefined,
        inviteMethod: invitemethod as typeof events.inviteMethod.enumValues[number] || undefined,
        guestListVisibleToGuests: Boolean(guestlistvisibletoguests),
      })
      .where(eq(events.id, id));

    revalidatePath('/events');  //prevents stale version from being served
    return { success: true, message: 'Event updated!' };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}

// Notes
// total_budget_min/total_budget_max are budget_amount enum columns, so the form value has to be one of budgetAmountEnum's breakpoints ("500", "1000", ... "100000_plus") — the number inputs in edit-event-form.tsx still need to become <select>s.
// If clicking through reveals other core fields you want editable (outside/alcoholServed booleans, eventVibe, etc.), the pattern extends the same way: add the input with defaultValue={event.field ?? ''}, add the read in update-event.ts, add it to the .set({...}) object.