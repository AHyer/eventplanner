//eventplanner/src/app/plan/page.tsx
//questionnaire goes here

import QuestionnaireForm from "../../components/ui/questionnaireform";
import { getCurrentUser } from '@/lib/dal';
import SignInGoogle from '@/components/ui/signin-google';


export default async function PlanPage() {  // function = component ;  returns UI elements
   const currentUser = await getCurrentUser();
    if (!currentUser) {
      return (
        <main className="calendar-background font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-8 px-2 sm:py-12 sm:px-6 lg:px-10 bg-white dark:bg-black">
         
    
  
          <div className="mt-20 flex justify-center">
            <p className="font-arapey text-lg text-zinc-800 dark:text-zinc-100">
            Sign in to start planning
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
      <QuestionnaireForm/>
       </main>
    </div>
  );
}

//goals: scrape user-chosen event images from web and/or Pinterest
//incorporate AI to suggest decor suggest event ideas and/or places to buy them based on user-supplied data about the events and it's guests
