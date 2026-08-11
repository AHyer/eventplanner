import { pgTable, serial, varchar, timestamp, foreignKey, integer, text, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const eventStatus = pgEnum("event_status", ['planning', 'confirmed', 'in_progress', 'done'])
export const guestStatus = pgEnum("guest_status", ['invited', 'confirmed', 'declined'])
export const taskStatus = pgEnum("task_status", ['todo', 'in_progress', 'done'])


export const events = pgTable("events", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	eventDate: timestamp("event_date", { mode: 'string' }).notNull(),
	location: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const notes = pgTable("notes", {
	id: serial().primaryKey().notNull(),
	eventId: integer("event_id"),
	taskId: integer("task_id"),
	body: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "notes_event_id_events_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.taskId],
			foreignColumns: [tasks.id],
			name: "notes_task_id_tasks_id_fk"
		}).onDelete("cascade"),
]);

export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	eventId: integer("event_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	dueDate: timestamp("due_date", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "tasks_event_id_events_id_fk"
		}).onDelete("cascade"),
]);
