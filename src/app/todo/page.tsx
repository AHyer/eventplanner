
import { db } from '@/db';
import { events } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
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

  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div>
      <main className="todo-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black "> </main>
    <h1 className="text-3xl font-aboreto text-zinc-800 dark:text-zinc-100">
          TASK LIST
        </h1>
    </div>
  );
}


//incorporate AI to suggest tasks based on user-supplied data about the events and it's guests