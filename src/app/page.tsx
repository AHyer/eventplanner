//HOMEPAGE -- eventplanner/src/app/page.tsx

//TODO check mobile rendering -- 

import Image from "next/image";

function Header({ title }: { title: string }) {
  console.log("console log title =", title); 
  return <h1>{title}</h1>;
}

// 'export default' distinguishes which component to render as the main component of the page
export default function Home() {  // function = component ;  returns UI elements
  return (
    <div>
      <main className="hero-background flex flex-1 w-full flex-col items-center justify-between px-4 py-6 md:px-16 md:py-66  bg-white dark:bg-black ">
       
        <div className="flex flex-col items-center gap-6 text-center  sm:text-center">
          
          <h1 className="text-6xl md:text-8xl font-aboreto tracking-tight text-zinc-800 dark:text-zinc-100">
            PLAN. CREATE. CELEBRATE.
          </h1>
          <p className=" text-2xl font-aboreto font-bold leading-8 text-zinc-800 dark:text-zinc-500">
            Next-level event planning for the DIY pro </p>
            <p className=" text-2xl font-aboreto leading-8 text-zinc-800 dark:text-zinc-500">
            {" "}
            <a
              href="/inspo"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              get inspired
            </a>{" "}
            or {" "}
            <a
              href="/login"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              create an account
            </a>{" "}
            
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
        </div>
      </main>
    </div>
  );
}

//TODO implement revolving tagline
//TODO move login to this page?
//'event planning for micromanagers'