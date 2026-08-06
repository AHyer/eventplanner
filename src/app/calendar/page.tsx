// calendar/page.tsx
"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const CalendarAny = Calendar as React.ComponentType<any>;

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="calendar-background flex flex-col items-center justify-center p-12 min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <h1 className="text-3xl font-aboreto mb-6 text-zinc-800 dark:text-zinc-100">
        Pick a Date
      </h1>
      
      <CalendarAny
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
      
      {date && (
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Selected Day: {date.toLocaleDateString()}
        </p>
      )}
    </main>
  );
}
