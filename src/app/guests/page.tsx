// src/app/guests/page.tsx
// The host's guest list: every guest across each events, with RSVP status.

import { db } from '@/db';
import { events } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import AddGuestForm from '@/components/ui/addguestform';
import ListGuests from '@/components/ui/listguests';
import SignInGoogle from '@/components/ui/signin-google';
import { getCurrentUser } from '@/lib/dal';

export default async function GuestsPage() {
  const currentUser = await getCurrentUser();

  //a page renders UI for the signed-out case; only the server actions return {success, message}
  if (!currentUser) {
    return (
      <main className="guests-background font-aboreto font-bold flex flex-1 w-full flex-col items-center gap-6 py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
       
        <p className="font-arapey mt:px-10 text-lg text-zinc-800 dark:text-zinc-100">
          Sign in to see your guest list
        </p>
        <SignInGoogle />
      </main>
    );
  }

  const hostEvents = await db
    .select({ id: events.id, eventName: events.eventName })
    .from(events)
    .where(eq(events.userId, currentUser.id))
    .orderBy(asc(events.eventDate));

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <main className="guests-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-16 md:py-66 px-16 bg-white dark:bg-black">
        <AddGuestForm events={hostEvents} />
      </main>
      <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
        <ListGuests userId={currentUser.id} />
      </aside>
    </div>
  );
}

//guest list moves below the add-guest form on mobile
