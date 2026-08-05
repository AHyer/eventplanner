// src/db/schema.ts
import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  text,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---- Enums ----
// Keeping these as Postgres enums (not just TS string unions) so the
// database itself enforces valid values, not just the app layer.

export const eventStatusEnum = pgEnum("event_status", [
  "planning",
  "confirmed",
  "in_progress",
  "done",
]);

export const taskStatusEnum = pgEnum("task_status", [
  "todo",
  "in_progress",
  "done",
]);

export const roleEnum = pgEnum("role", ["host", "vendor"]);

// Guests and vendors share a shape (name, contact status, cost) closely
// enough that one table with a `type` column avoids duplicating columns
// across two near-identical tables. Split into separate tables later if
// their fields diverge more than this.
export const participantTypeEnum = pgEnum("participant_type", [
  "guest",
  "vendor",
]);

export const participantStatusEnum = pgEnum("participant_status", [
  "invited", // guest: invited / vendor: contacted
  "confirmed", // guest: RSVP'd yes / vendor: booked
  "declined", // guest: RSVP'd no / vendor: fell through
]);

// ---- Tables ----

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: varchar("location", { length: 255 }),
  status: eventStatusEnum("status").notNull().default("planning"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  dueDate: timestamp("due_date"),
  status: taskStatusEnum("status").notNull().default("todo"),
  assignedRole: roleEnum("assigned_role").notNull().default("host"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: participantTypeEnum("type").notNull(),
  status: participantStatusEnum("status").notNull().default("invited"),
  // numeric (not integer/float) for money — avoids floating point
  // rounding issues on cost totals
  cost: numeric("cost", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Notes can belong to either an Event directly or a specific Task —
// both foreign keys are nullable, and exactly one should be set per row.
// (Enforce that "exactly one" rule at the app/server-action layer;
// Drizzle doesn't give you a clean CHECK-constraint helper for this yet.)
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id, {
    onDelete: "cascade",
  }),
  taskId: integer("task_id").references(() => tasks.id, {
    onDelete: "cascade",
  }),
  body: text("body").notNull(),
  authorRole: roleEnum("author_role").notNull().default("host"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---- Relations ----
// These power Drizzle's relational query API (db.query.events.findMany({
// with: { tasks: true, participants: true } })) so you can fetch an
// event with its related rows in one call instead of hand-joining.

export const eventsRelations = relations(events, ({ many }) => ({
  tasks: many(tasks),
  participants: many(participants),
  notes: many(notes),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  event: one(events, {
    fields: [tasks.eventId],
    references: [events.id],
  }),
  notes: many(notes),
}));

export const participantsRelations = relations(participants, ({ one }) => ({
  event: one(events, {
    fields: [participants.eventId],
    references: [events.id],
  }),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  event: one(events, {
    fields: [notes.eventId],
    references: [events.id],
  }),
  task: one(tasks, {
    fields: [notes.taskId],
    references: [tasks.id],
  }),
}));