//eventplanner/src/components/ui/createevent.tsx

//collects event info from user form to be inserted to DB

'use server';

import { db } from '@/db';
import { events, event_guests_profile } from '@/db/schema';
import { auth } from '@/auth';
import { getCurrentUser } from '@/lib/dal';

//const CURRENT_USER_ID = 1;  //debug (prior to auth implementation)

//TODO should create event and edit event pages be merged into one?

interface CreateEventInputs {
  eventName: string;
  eventDate: string;
  eventVenue: string;
  venueStreetAddress: string;
  venueCity: string;
  venueState: string;
  venueCountry: string;
  venueZipCode: string;
  venueWebsite: string;
  venueContactPhone: string;
  venueContactEmail: string;
  eventVibe: string;
  numGuests: string;
  inviteMethod: string;
  outside: boolean;
  alcoholServed: boolean;
  guestsDietaryRestrictions:  string;
  guestsSpecAccom:  string;
  guestListVisibleToGuests: boolean;
}

interface CreateEventResult {
  success: boolean;
  message: string;
}

export async function createEvent(prevState: unknown, formData: FormData): Promise<CreateEventResult> {
  // const session = await auth();
  // if (!session?.user?.id) {
  //   return { success: false, message: 'You must be signed in to create an event.' };
  // }
  const currentUser = await getCurrentUser();
  if (!currentUser) { 
    return { success: false, message: 'You must be signed in to create an event.' };
  }
  const eventname = formData.get('eventname') as string | null;
  const eventdate = formData.get('eventdate') as string | null;
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
  const numguests = formData.get('numguests') as string | null;
  const outside = formData.get('outside') as boolean | null;
  const alcoholserved = formData.get('alcoholserved') as boolean | null;
  const guestsdietaryrestrictions = formData.get('guestsdietaryrestrictions') as string | null;
  const invitemethod = formData.get('invitemethod') as string | null;
  const guestlistvisibletoguests = formData.get('guestlistvisibletoguests') as boolean | null;
  const guestsspecaccom = formData.get('guestsspecaccom') as string | null;

  const inputs: CreateEventInputs = {
    eventName: eventname ?? '',
    eventDate: eventdate ?? '',
    eventVenue: eventvenue ?? '',
    venueStreetAddress: venuestreetaddress ?? '',
    venueCity: venuecity ?? '',
    venueState: venuestate ?? '',
    venueCountry: venuecountry ?? '',
    venueZipCode: venuezipcode ?? '',
    venueWebsite: venewebsite ?? '',
    venueContactPhone: venuecontactphone ?? '',
    venueContactEmail: venuecontactemail ?? '',
    eventVibe: eventvibe ?? '',
    numGuests: numguests ?? '',
    inviteMethod: invitemethod ?? '',
    //TODO alias bools as yes/no
    outside: outside === true || outside === false,
    alcoholServed: alcoholserved === true || alcoholserved === false,
    guestsDietaryRestrictions: guestsdietaryrestrictions ?? '',
    guestsSpecAccom: guestsspecaccom ?? '',
    guestListVisibleToGuests: guestlistvisibletoguests === true || guestlistvisibletoguests === false,
  };

  // Basic validation
  if (!inputs.eventName) {
    return { success: false, message: 'Event name field required.' };
  }

  try {
    // Type-safe insert query using Drizzle ORM
    const inviteMethod = inputs.inviteMethod as 'other' | 'email' | 'text' | 'paper' | null | undefined;

    await db.insert(events).values({
      //userId: Number(session.user.id),
      userId: currentUser.id,  //auth() returns session object with user id, getCurrentUser() returns user row with id
      eventName: inputs.eventName,  //required for submission (others can be added later)
      eventDate: inputs.eventDate,
      eventVenue: inputs.eventVenue || undefined,
      eventVibe: inputs.eventVibe || undefined,
      numGuests: Number(inputs.numGuests),
      outside: Boolean(inputs.outside),
      alcoholServed: Boolean(inputs.alcoholServed),
      venueStreetAddress: inputs.venueStreetAddress || undefined,
      venueCity: inputs.venueCity || undefined,
      venueState: inputs.venueState || undefined,
      venueCountry: inputs.venueCountry || undefined,
      venueZipCode: inputs.venueZipCode || undefined,
      venueWebsite: inputs.venueWebsite || undefined,
      venueContactPhone: inputs.venueContactPhone || undefined,
      venueContactEmail: inputs.venueContactEmail || undefined,
      guestsDietaryRestrictions: inputs.guestsDietaryRestrictions as typeof events.guestsDietaryRestrictions.enumValues[number] || undefined,
      guestsSpecAccom: inputs.guestsSpecAccom || undefined,
      inviteMethod: inputs.inviteMethod as typeof events.inviteMethod.enumValues[number] || undefined,
      guestListVisibleToGuests: Boolean(inputs.guestListVisibleToGuests),
    });

    return { success: true, message: 'Event successfully saved!' };
  } catch (error: any) {
    console.error('Drizzle execution error:', error);
    
    console.error('internal error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}