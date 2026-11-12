
'use server';

import { db } from '@/db';
import { events, tasks } from '@/db/schema';
import { getCurrentUser } from '@/lib/dal';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface AddTaskResult {
  success: boolean;
  message: string;
}

export async function addTask(
  prevState: unknown,
  formData: FormData
): Promise<AddTaskResult> {
  const eventId = Number(formData.get('event_id'));
  const taskName = formData.get('task_name') as string | null;
  const dueDate = formData.get('due_date') as string | null;
  const taskStatus = formData.get('task_status') as string | null;
  const taskCategory = formData.get('task_category') as string | null;
  const taskTags = formData.get('task_tags') as string | null;
  const taskContext = formData.get('task_context') as string | null;
  const taskPriority = formData.get('task_priority') as string | null;
  const assignedTaskRole = formData.get('assigned_task_role') as string | null;

  if (!taskName) {
    return { success: false, message: 'Task name field required.' };
  }
  if (!eventId) {
    return { success: false, message: 'Pick the event this task is for.' };
  }

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: 'You must be signed in to add a task.' };
    }
    const [event] = await db
      .select({ id: events.id })
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.userId, currentUser.id)));

    if (!event) {
      return { success: false, message: 'That event was not found.' };
    }

    await db.insert(tasks).values({
      eventId,
      taskName,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      //TODO validate due date (not in past, etc.)
      taskStatus: (taskStatus || undefined) as typeof tasks.taskStatus.enumValues[number] | undefined,
      taskCategory: (taskCategory || undefined) as typeof tasks.taskCategory.enumValues[number] | undefined,
      taskTags: taskTags || undefined,
      taskContext: (taskContext || undefined) as typeof tasks.taskContext.enumValues[number] | undefined,
      taskPriority: (taskPriority || undefined) as typeof tasks.taskPriority.enumValues[number] | undefined,
      assignedTaskRole: (assignedTaskRole || undefined) as typeof tasks.assignedTaskRole.enumValues[number] | undefined,
      taskVisibility: 'host_only', //default to host only, can be changed later
    });

    revalidatePath('/tasks');
    return { success: true, message: 'Task added successfully.' };
  } catch (error) {
    console.error('Error adding task:', error);
    return { success: false, message: 'An error occurred while adding the task.' };
  }
}   