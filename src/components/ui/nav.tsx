// components/nav.tsx
import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b px-10 py-4 flex gap-18 text-2xl font-bold font-aboreto justify-center items-center">
      <Link href="/">Plan</Link>
      <Link href="/events">Events</Link>
      <Link href="/calendar">Schedule</Link>
      <Link href="/invitations">Invite</Link>
      <Link href="/todo">To Do</Link>
      <Link href="/vendors">Vendors</Link>
      <Link href="/inspo">Inspire</Link>
      <Link href="/food">Eat</Link>
      <Link href="/drinks">Drink</Link>
      <Link href="/deco">Decorate</Link>
      <Link href="/login">Login</Link>
    </header>
    
  );
}