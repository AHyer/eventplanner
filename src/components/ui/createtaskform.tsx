
'use client';

import { useActionState } from 'react';
import { addTask } from './createtask';
import { EnumSelect } from './enum-select';
import { taskCategoryOptions, taskContextOptions, taskPriorityOptions, assignedTaskRoleOptions } from './enum-options';

const initialState = { success: false, message: '' };

export default function CreateTaskForm({
  events, //the current host's events, loaded on the server so the dropdown has real ids
}: {
  events: { id: number; eventName: string | null }[];
}) {
  const [state, formAction, isPending] = useActionState(addTask, initialState);

  return (
    <div className="w-full max-w-4xl">
      {events.length === 0 ? (
        <p className="mt-4 font-arapey text-lg">
          Create an event first — tasks are tracked per event.
        </p>
      ) : (
        <form action={formAction}>
          <div className="mb-4">
            <h2>Add A Task</h2>
            <label htmlFor="event_id" className="block mb-1  text-slate-100">Which event?</label>
            <select
              id="event_id"
              name="event_id"
              className="w-full px-4 py-3 bg-white border-slate-300 rounded-md shadow-sm"
              required
            >
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.eventName ?? `Event #${event.id}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="task_name" className="block mb-1  text-slate-100">Task Name:</label>
            <input
              type="text"
              id="task_name"
              name="task_name"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="due_date" className="block mb-1  text-slate-100">Due Date:</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              className="w-full px-4 py-3 bg-white border border-slate-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <EnumSelect
              name="task_status"
              label="Task Status:"
              options={[
                { value: 'not_started', label: 'Not Started' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
              ]}
            />
          </div>

          <div className="mb-4">
            <EnumSelect
              name="task_category"
              label="Task Category:"
              options={taskCategoryOptions}
            />
          </div>

          <div className="mb-4">
            <EnumSelect
              name="task_context"
              label="Task Context:"
              options={taskContextOptions}
            />
          </div>

          <div className="mb-4">
            <EnumSelect
              name="task_priority"
              label="Task Priority:"
              options={taskPriorityOptions}
            />
          </div>

          <div className="mb-4">
            <EnumSelect
              name="assigned_task_role"
              label="Assigned Task Role:"
              options={assignedTaskRoleOptions}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="framed-button"
            
          >
            {isPending ? 'Adding...' : 'Add Task'}
          </button>

          {state.message && (
            <p className={`mt-2 ${state.success ? 'text-pink-600' : 'text-magenta-600'}`}>
              {state.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}