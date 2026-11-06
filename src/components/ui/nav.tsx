// components/nav.tsx
//nav bar shows at top of all pages
import Link from "next/link";
import { auth } from "@/auth"; //auth.ts exports auth() function that returns session object

//export function Nav() { //prior to auth implementataion
const Nav = async () => {
  const session = await auth();
  return (
    <header className="border-b px-10 py-4 flex flex-wrap gap-4 md:gap-18 text-2xl font-bold font-aboreto justify-center items-center">
     
      <Link href="/plan">Plan</Link>
      <Link href="/events">Events</Link>
      <Link href="/calendar">Schedule</Link>
      <Link href="/invitations">Invite</Link>
      <Link href="/guests">Guests</Link>
      <Link href="/todo">To Do</Link>
      <Link href="/vendors">Vendors</Link>
      <Link href="/inspo">Inspire</Link>
      <Link href="/food">Eat</Link>
      <Link href="/drinks">Drink</Link>
      <Link href="/deco">Decorate</Link>
      {/* <Link href="/login">Login</Link> */}
      {session ? (<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>) : (<Link href="/login">Login</Link>)} 
      {/* if there is a session, logout available, otherwise go to login */}
    </header>
    
  );
};

export default Nav;

//nav bar links stack on mobile
//TODO make Logout button