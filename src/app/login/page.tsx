
import ListUsers from "../../components/ui/listusers";
import SignInGoogle from "../../components/ui/signin-google";
import { auth } from "@/auth";


//eventplanner/src/components/ui/listusers.tsx

export default async function LoginPage() {  // function = component ;  returns UI elements
  const session = await auth();

  return (

    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <main className="events-background font-aboreto font-bold flex flex-1 w-full flex-col   items-stretch justify-start py-4 px-6 md:py-66 md:px-16 bg-white dark:bg-black " >
       {session?.user ? (
         <p className="font-arapey text-lg">
           Signed in as {session.user.email}
         </p>
       ) : (
         <SignInGoogle />
       )}
      </main>
        
        <aside className="w-full md:block md:w-140 font-aboreto font-bold md:shrink-0 border-l border-slate-200 p-6">
          <ListUsers/>
        </aside>
    </div>
  );
}

//TODO hide user list sidebar from guests & vendors

