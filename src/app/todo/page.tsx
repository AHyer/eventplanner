
import { db } from '@/db';
import { events, tasks } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
import CreateTaskForm from '@/components/ui/createtaskform';
import ListTasks from '@/components/ui/listtasks';
import SignInGoogle from '@/components/ui/signin-google';
import { getCurrentUser } from '@/lib/dal';



export default async function TodoPage() {  // function = component ;  returns UI elements
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <main className="todo-background font-aboreto font-bold flex flex-1 w-full flex-col items-center mt:px-10 gap-6 py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
        
        <p className="font-arapey mt:px-10 text-lg text-zinc-800 dark:text-zinc-800">
          Sign in to see your task list
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
       <main className="todo-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-16 md:py-66 px-16 bg-white dark:bg-black">
         <CreateTaskForm events={hostEvents} />
       </main>
       <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
         <ListTasks userId={currentUser.id} />
       </aside>
     </div>
   );
 }


//incorporate AI to suggest tasks based on user-supplied data about the events and it's guests