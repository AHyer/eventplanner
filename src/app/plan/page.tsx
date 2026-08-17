//eventplanner/src/app/plan/page.tsx
//questionnaire goes here

import QuestionnaireForm from "../../components/ui/questionnaireform";


export default function PlanPage() {  // function = component ;  returns UI elements
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
