//eventplanner/src/app/events/page.tsx

import CreateEventForm from "@/components/ui/createeventform";
import ListEvents from "../../components/ui/listevents";

export default function EventsPage() {  // function = component ;  returns UI elements
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <main className="events-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-16 md:py-66 px-16 bg-white dark:bg-black " >
      <CreateEventForm/>
       </main>
       <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
        <ListEvents/>
      </aside>
    </div>
  );
}

//event list moves below user login on mobile