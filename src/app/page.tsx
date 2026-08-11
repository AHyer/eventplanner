//TODO check mobile rendering

import Image from "next/image";

function Header({ title }: { title: string }) {
  console.log("console log title =", title); // { title: "Test title" }
  return <h1>{title}</h1>;
}

// 'export default' distinguishes which component to render as the main component of the page
export default function Home() {  // function = component ;  returns UI elements
  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    <div>
      <main className="hero-background flex flex-1 w-full flex-col items-center justify-between py-66 px-16 bg-white dark:bg-black ">
       
        <div className="flex flex-col items-center gap-6 text-center  sm:text-center">
          
          <h1 className="text-8xl font-aboreto tracking-tight text-black dark:text-zinc-200">
            PLAN. CREATE. CELEBRATE.
          </h1>
          <p className=" text-2xl font-aboreto leading-8 text-zinc-600 dark:text-zinc-400">
            Horrifyingly detailed event planning. 
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
            .
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-center text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/plan"
            target="_blank"
            rel="noopener noreferrer"
          >

            START PLANNING
          </a>
         
        </div>
      </main>
    </div>
  );
}

//TODO START PLANNING button links to questionnaire
//TODO implement relolving tagline