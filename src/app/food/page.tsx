import { db } from '@/db';
import { events } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
//import AddGuestForm from '@/components/ui/addguestform';
//import ListGuests from '@/components/ui/listguests';
import SignInGoogle from '@/components/ui/signin-google';
import { getCurrentUser } from '@/lib/dal';

export default async function FoodPage() {  // function = component ;  returns UI elements
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <main className="food-background font-aboreto font-bold flex flex-1 w-full flex-col items-center gap-6 py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
        
        <p className="font-arapey mt:px-10 text-lg text-zinc-800 dark:text-zinc-100">
          Sign in to see your event menus
        </p>
        <SignInGoogle />
      </main>
    );
  }

  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div>
      <main className="food-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black "> </main>
    </div>
  );
}

//goal: scrape user-chosen recipes & images from web and/or recipe saving sites
//incorporate AI to suggest recipes/menus based on user-supplied data about the events and it's guests