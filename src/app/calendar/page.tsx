// eventplanner/src/app/calendar/page.tsx

"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";


export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="calendar-background text-3xl font-aboreto font-bold flex flex-1 w-full flex-col items-stretch justify-start py-66 px-16 bg-white dark:bg-black">
      <h1 className="text-3xl font-aboreto mb-6 text-zinc-800 dark:text-zinc-100">
        Pick a Date
      </h1>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="text-3xl py-16 px-16  mt-4 rounded-md border shadow"
      />
      
      {date && (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Selected Day: {date.toLocaleDateString()}
        </p>
      )}
    </main>
  );
}
