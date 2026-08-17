import { relations } from "drizzle-orm/relations";
import { events, notes, tasks } from "../src/db/schema";

export const notesRelations = relations(notes, ({one}) => ({
	event: one(events, {
		fields: [notes.eventId],
		references: [events.id]
	}),
	// task: one(tasks, {
	// 	fields: [notes.taskId],
	// 	references: [tasks.id]
	// }),
}));

export const eventsRelations = relations(events, ({many}) => ({
	notes: many(notes),
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({one, many}) => ({
	notes: many(notes),
	event: one(events, {
		fields: [tasks.eventId],
		references: [events.id]
	}),
}));