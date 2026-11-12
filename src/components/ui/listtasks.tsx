
import { db } from '@/db/index';
import { events, tasks } from '@/db/schema';
import { asc, eq } from 'drizzle-orm';

export default async function ListTasks({ userId }: { userId: number }) {

    const rows = await db
    .select({
      taskId: tasks.id,
      taskName: tasks.taskName,
      taskStatus: tasks.taskStatus,
      eventId: events.id,
      eventName: events.eventName,
      eventDate: events.eventDate,
    })
    .from(tasks)
    .innerJoin(events, eq(tasks.eventId, events.id))
    .where(eq(events.userId, userId))
    .orderBy(asc(events.eventDate), asc(tasks.taskName)); //soonest event first

  if (rows.length === 0) {
    return (
      <section className="p-6">
        <h1 className="text-3xl font-bold mb-4">Task List</h1>
        <p className="font-arapey text-lg">
          No tasks yet. Add one with the form to start tracking your to-dos.
        </p>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <ul className="space-y-4">
        {rows.map((row) => (
          <li key={row.taskId} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{row.taskName}</h2>
            <p className="text-sm text-gray-500">
              Event: {row.eventName} on {row.eventDate ? new Date(row.eventDate).toLocaleDateString() : 'Date not set'}
            </p>
            <p className={`text-sm ${row.taskStatus === 'done' ? 'text-green-600' : 'text-red-600'}`}>
              Status: {row.taskStatus}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );    


}