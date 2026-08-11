import { pgTable, serial, text, integer, varchar, timestamp, boolean, decimal, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "users_id_identity_seq" }), 
  username: varchar("username"),
  email: varchar("email"),
  role: text("role"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const events = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "events_id_identity_seq" }), 
  user_id: integer("user_id").notNull().references(() => users.id),
  eventName: varchar("eventName"),
  eventDate: text("eventDate"),
  eventVenue: varchar("eventVenue"),
  venueAddress: varchar("venueAddress"),
  eventVibe: text("eventVibe"),
  numGuests: integer("numGuests"),
  status: text("status"),
  createdAt: timestamp("createdAt").defaultNow().notNull(), 
});

export const event_guest_profile = pgTable("event_guest_profile", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "g_profile_id_identity_seq" }), 
  event_id: integer("event_id").notNull().references(() => events.id),
  profile_gender: varchar("profile_gender"),
  profile_education: varchar("profile_education"),
  profile_age: integer("profile_age"),
  profile_income_min: text("profile_income_min"),
  profile_income_max: text("profile_income_max"),
});

export const vendors = pgTable("vendors", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "vendor_id_identity_seq" }), 
  vendor_name: varchar("vendor_name"),
  vendor_phone: text("vendor_phone"),
  vendor_email: text("vendor_email"),
  event_id: integer("event_id").notNull(),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const guests = pgTable("guests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "guests_id_identity_seq" }), 
  event_id: integer("event_id").notNull().references(() => events.id),
  guest_name: varchar("guest_name"),
  guest_phone: text("guest_phone"),
  guest__email: text("guest__email"),
  guest_address: text("guest_address"),
  status: text("status"),
  total_cost_per_guest: decimal("total_cost_per_guest", { precision: 10, scale: 2 }),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const tasks = pgTable("tasks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "tasks_id_identity_seq" }), 
  eventId: integer("eventId").notNull().references(() => events.id),
  eventName: varchar("name").notNull(),
  dueDate: timestamp("dueDate"),
  status: text("status"),
  assignedRole: varchar("assignedRole"),
  createdAt: timestamp("createdAt").defaultNow().notNull(), 
});

export const notes = pgTable("notes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "notes_id_identity_seq" }), 
  eventId: integer("eventId").notNull().references(() => events.id),
  name: varchar("name").notNull(),
  body: text("body"),
  status: varchar("status"),
  authorRole: varchar("authorRole").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), 
});

export const menu = pgTable("menu", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "menu_id_identity_seq" }), 
  vendor_id: varchar("vendor_id"),
  event_id: integer("event_id").notNull().references(() => events.id),
  menu_descr: varchar("menu_descr"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const deco = pgTable("deco", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "deco_id_identity_seq" }), 
  vendor_id: varchar("vendor_id"),
  event_id: integer("event_id").notNull().references(() => events.id),
  deco_descr: varchar("deco_descr"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const drink_menu = pgTable("drink_menu", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "drink_menu_id_identity_seq" }), 
  vendor_id: varchar("vendor_id"),
  menu_id: integer("menu_id").notNull().notNull().references(() => menu.id),
  drink_menu_descr: varchar("drink_menu_descr"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const drink_recipe = pgTable("drink_recipe", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "drink_recipe_id_identity_seq" }), 
  drink_menu_id: integer("drink_menu_id").notNull().notNull().notNull().references(() => drink_menu.id),
  drink_recipe_descr: varchar("drink_recipe_descr"),
  drink_ingerdients: text("drink_ingerdients"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const main_dish = pgTable("main_dish", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "main_dish_id_identity_seq" }), 
  menu_id: integer("menu_id").notNull().notNull().references(() => menu.id),
  m_d_recipe_descr: varchar("m_d_recipe_descr"),
  m_d_ingredients: text("m_d_ingredients"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const side_dish = pgTable("side_dish", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "side_dish_id_identity_seq" }), 
  menu_id: integer("menu_id").notNull().notNull().references(() => menu.id),
  s_d_recipe_descr: varchar("s_d_recipe_descr"),
  s_d_ingredients: text("s_d_ingredients"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const dessert = pgTable("dessert", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "dessert_id_identity_seq" }), 
  menu_id: integer("menu_id").notNull().notNull().references(() => menu.id),
  dessert_recipe_descr: varchar("dessert_recipe_descr"),
  dessert_ingredients: text("dessert_ingredients"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

export const deco_group = pgTable("deco_group", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "deco_group_id_identity_seq" }), 
  deco_id: integer("deco_id").notNull().notNull().references(() => deco.id),
  deco_group_descr: varchar("deco_group_descr"),
  deco_group_area: varchar("deco_group_area"),
  status: varchar("status"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});