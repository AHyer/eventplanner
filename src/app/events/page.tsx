//eventplanner/src/app/events/page.tsx

import CreateEventForm from "@/components/ui/createeventform";
import ListEvents from "../../components/ui/listevents";
import { getCurrentUser } from '@/lib/dal';
import SignInGoogle from '@/components/ui/signin-google';

export default async function EventsPage({  // function = component ;  returns UI elements
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>; // Next.js 15+ — searchParams is async
}) {
  const { date } = await searchParams; //set when the user clicks a day on /calendar

  const currentUser = await getCurrentUser();
      if (!currentUser) {
        return (
          <main className="calendar-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
           
      
    
            <div className="mt-20 flex justify-center">
              <p className="font-arapey text-lg text-zinc-800 dark:text-zinc-100">
              Sign in to plan your event
            </p>
            </div>
             <div className="mt-6 flex justify-center">
              <SignInGoogle />
            </div>
          </main>
        );
      }


  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <main className="events-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-16 md:py-66 px-16 bg-white dark:bg-black " >
      <CreateEventForm defaultDate={date}/>
       </main>
       <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
        <ListEvents/>
      </aside>
    </div>
  );
}

//event list moves below user login on mobile