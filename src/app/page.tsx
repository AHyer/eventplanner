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
      {/* <main className="hero-background"> */}
        {/* <Image
          className="dark:invert"
          //src="/next.svg"
          src="/alexander-grey-62vi3TG5EDg-unsplash.png"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        /> */}
       {/* <div>
         <Header title="Effortless event planning, elevated." />
       </div> */}
       
        <div className="flex flex-col items-center gap-6 text-center  sm:text-center">
          
          <h1 className="text-8xl font-aboreto tracking-tight text-black dark:text-zinc-200">
            PLAN. CREATE. CELEBRATE.
          </h1>
          <p className=" text-lg font-aboreto leading-8 text-zinc-600 dark:text-zinc-400">
            Fabulous event planning, simpified. 
            Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              this link
            </a>{" "}
            or {" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              that link
            </a>{" "}
            .
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-center text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/events"
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
