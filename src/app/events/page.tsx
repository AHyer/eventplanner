import CreateEventForm from "@/components/ui/createeventform";
import ListEvents from "../../components/ui/listevents";

export default function EventsPage() {  // function = component ;  returns UI elements
  return (
    <div className="flex justify-start w-full">
      <main className="events-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-66 px-16 bg-white dark:bg-black " >
      <CreateEventForm/>
       </main>
       <aside className="w-140 font-aboreto font-bold shrink-0 border-l border-slate-200 p-6">
        <ListEvents/>
      </aside>
    </div>
  );
}

//TODO create upcoming events sidebar for aside (list of events from DB)