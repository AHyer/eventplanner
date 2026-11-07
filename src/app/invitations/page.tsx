import { db } from '@/db';
import { events } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';
//import AddGuestForm from '@/components/ui/addguestform';
//import ListGuests from '@/components/ui/listguests';
import SignInGoogle from '@/components/ui/signin-google';
import { getCurrentUser } from '@/lib/dal';

export default async function InvitePage() {  // function = component ;  returns UI elements
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <main className="invite-background font-aboreto font-bold flex flex-1 w-full flex-col items-center gap-6 py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
        
        <p className="font-arapey mt:px-10 text-lg text-zinc-800 dark:text-zinc-100">
          Sign in to see your invitation options
        </p>
        <SignInGoogle />
      </main>
    );
  }

  return (
    <div>
      <main className="invite-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black "> </main>
    </div>
  );
}

//goals: scrape user-chosen invitation images from web and/or Pinterest
//incorporate AI to suggest decor suggest invitations, places to buy them, or create an invite based on user-supplied data about the events and it's guests