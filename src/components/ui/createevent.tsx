//eventplanner/src/components/ui/createevent.tsx

//collects event info from user form to be inserted to DB

'use server';

import { db } from '@/db';
import { events } from '@/db/schema';

const CURRENT_USER_ID = 1;  //TODO debug (until auth is implemented)

//TODO should create event and edit event pages be merged into one?

interface CreateEventInputs {
  eventName: string;
  eventDate: string;
  eventVenue: string;
  venueAddress: string;
  eventVibe: string;
  numGuests: string;
  outside: boolean;
  alcoholServed: boolean;
}

interface CreateEventResult {
  success: boolean;
  message: string;
}

export async function createEvent(prevState: unknown, formData: FormData): Promise<CreateEventResult> {
  const eventname = formData.get('eventname') as string | null;
  const eventdate = formData.get('eventdate') as string | null;
  const eventvenue = formData.get('eventvenue') as string | null;
  const venueaddress = formData.get('venueaddress') as string | null;
  const eventvibe = formData.get('eventvibe') as string | null;
  const numguests = formData.get('numguests') as string | null;
  const outside = formData.get('outside') as boolean | null;
  const alcoholserved = formData.get('alcoholserved') as boolean | null;

  const inputs: CreateEventInputs = {
    eventName: eventname ?? '',
    eventDate: eventdate ?? '',
    eventVenue: eventvenue ?? '',
    venueAddress: venueaddress ?? '',
    eventVibe: eventvibe ?? '',
    numGuests: numguests ?? '',
    //TODO alias bools as yes/no
    outside: outside === true || outside === false,
    alcoholServed: alcoholserved === true || alcoholserved === false
  };

  // Basic validation
  if (!inputs.eventName) {
    return { success: false, message: 'Event name field required.' };
  }

  try {
    // Type-safe insert query using Drizzle ORM
    await db.insert(events).values({
      userId: CURRENT_USER_ID,
      eventName: inputs.eventName,  //required for submission (others can be added later)
      eventDate: inputs.eventDate,  
      eventVenue: inputs.eventVenue,  
      venueAddress: inputs.venueAddress,
      eventVibe: inputs.eventVibe,
      numGuests: Number(inputs.numGuests),
      outside: Boolean(inputs.outside),
      alcoholServed: Boolean(inputs.alcoholServed)
    });
    
    return { success: true, message: 'Event successfully saved!' };
  } catch (error: any) {
    console.error('Drizzle execution error:', error);
    
    console.error('internal error:', error);
    return { success: false, message: 'An internal error occurred.' };
  }
}