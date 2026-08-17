///home/ahyer/eventplanner/eventplanner/src/db/schema.ts

import { pgTable, serial, text, integer, varchar, timestamp, boolean, decimal, json, date, pgEnum } from "drizzle-orm/pg-core";
//TODO make dropdowns for all enums on pages
export const userRoleEnum = pgEnum("role", ["host", "vendor", "guest"]);
//status enums:
export const eventStatusEnum = pgEnum("event_status", ["future", "active", "archived"]);
export const vendorStatusEnum = pgEnum("vendor_status", ["considering", "estimate", "hired"]);
export const guestStatusEnum = pgEnum("guest_status", ["invited", "accepted", "declined"]);
export const taskStatusEnum = pgEnum("task_status", ["not_started", "in_progress", "done"]);
export const noteStatusEnum = pgEnum("note_status", ["future", "active", "archived"]);
export const menuStatusEnum = pgEnum("menu_status", ["considering", "using", "archived"]);
export const decoStatusEnum = pgEnum("deco_status", ["considering", "using", "archived"]);
export const drinkMenuStatusEnum = pgEnum("drink_menu_status", ["considering", "using", "archived"]);
export const drinkRecipeStatusEnum = pgEnum("drink_recipe_status", ["considering", "using", "archived"]);
export const mainDishStatusEnum = pgEnum("main_dish_status", ["considering", "using", "archived"]);
export const sideDishStatusEnum = pgEnum("side_dish_status", ["considering", "using", "archived"]);
export const dessertStatusEnum = pgEnum("dessert_status", ["considering", "using", "archived"]);
export const decoGroupStatusEnum = pgEnum("deco_group_status", ["considering", "using", "archived"]);

export const hireOutTasksEnum = pgEnum("hire_out_tasks", ["catering", "setup", "pre-cleaning", "post-cleaning"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "users_id_identity_seq" }), 
  username: varchar("username").notNull(),
  email: varchar("email").notNull(),
  role: userRoleEnum("role").notNull().default("guest"), //default will have minimal permissions
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const events = pgTable("events", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "events_id_identity_seq" }), 
  userId: integer("user_id").notNull().references(() => users.id),
  eventName: varchar("event_name"),
  eventDate: date("event_date"),
  eventDateMax: date("event_date_max"),
  eventDateMin: date("event_date_min"),
  outside: boolean("outside").default(false),
  alcoholServed: boolean("alcohol_served").default(false),
  eventVenue: varchar("event_venue"),
  venueAddress: varchar("venue_address"),
  venueZipCode: varchar("venue_zip"), //validate
  eventVibe: text("event_vibe"),
  totalBudgetMax: decimal("total_budget_max", { precision: 10, scale: 2 }),  //TODO make enum
  totalBudgetMin: decimal("total_budget_min", { precision: 10, scale: 2 }),
  numGuests: integer("num_guests"),
  guestsMaxNum: integer("max_num_guests"),  
  guestsMinNum: integer("min_num_guests"),
  hostLaborPortion: decimal("host_labor_portion", { precision: 5, scale: 2 }), //percentage //TODO make enum
  hostHelpers: integer("host_helpers"),
  hireOutTasks: hireOutTasksEnum("hire_out_tasks"),
  idealEventDesc: text("ideal_event_desc"),
  eventStatus: eventStatusEnum("event_status"), 
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const event_guest_profile = pgTable("event_guest_profile", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "g_profile_id_identity_seq" }), 
  eventId: integer("event_id").notNull().references(() => events.id, {onDelete: 'cascade' }), //FK -- delete associated data when evetn is deleted
  profileGender: varchar("profile_gender"), //TODO make enum
  profileEducationMin: varchar("profile_education_min"),  //TODO make enum
  profileEducationMax: varchar("profile_education_max"),  //TODO make enum
  profileMaxAge: integer("profile_max_age"),  //TODO make enum
  profileMinAge: integer("profile_min_age"),  //TODO make enum
  guestFoodAllergies: text("guest_food_allergies"), //TODO make enum
  guestProfileDesc:  text("guest_profile_desc"),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const vendors = pgTable("vendors", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "vendor_id_identity_seq" }), 
  vendorName: varchar("vendor_name"),
  vendorPhone: text("vendor_phone"),
  vendorEmail: text("vendor_email"),
  vendorEstimate: decimal("vendor_estimate", { precision: 10, scale: 2 }),
  eventId: integer("event_id").notNull().references(() => events.id),
  vendorStatus: vendorStatusEnum("vendor_status"), 
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const guests = pgTable("guests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "guests_id_identity_seq" }), 
  eventId: integer("event_id").notNull().references(() => events.id, {onDelete: 'cascade' }),
  guestName: varchar("guest_name"),
  guestPhone: text("guest_phone"),
  guestEmail: text("guest_email"),
  guestAddress: text("guest_address"),
  guestFoodIssues: text("food_issues"), //TODO make enum
  guestStatus: guestStatusEnum("guest_status"), 
  totalCostPerGuest: decimal("total_cost_per_guest", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const tasks = pgTable("tasks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "tasks_id_identity_seq" }), 
  eventId: integer("eventId").notNull().references(() => events.id, {onDelete: 'cascade' }),
  eventName: varchar("name").notNull(),
  dueDate: timestamp("due_date"),
  taskStatus: taskStatusEnum("task_status"), 
  assignedRole: varchar("assigned_role"),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const notes = pgTable("notes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "notes_id_identity_seq" }), 
  eventId: integer("event_id").notNull().references(() => events.id, {onDelete: 'cascade' }),
  name: varchar("name").notNull(),
  body: text("body"),
  noteStatus: noteStatusEnum("note_status"),  
  authorRole: varchar("author_role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const menu = pgTable("menu", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "menu_id_identity_seq" }), 
  vendorId: varchar("vendor_id"),
  eventId: integer("event_id").notNull().references(() => events.id, {onDelete: 'cascade' }),
  menuDescr: varchar("menu_descr"),
  menuStatus: menuStatusEnum("menu_status"),  
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const deco = pgTable("deco", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "deco_id_identity_seq" }), 
  vendorId: varchar("vendor_id"),
  eventId: integer("event_id").notNull().references(() => events.id, {onDelete: 'cascade' }),
  decoDescr: varchar("deco_descr"),
  decoStatus: decoStatusEnum("deco_status"),  
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const drink_menu = pgTable("drink_menu", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "drink_menu_id_identity_seq" }), 
  vendor_id: varchar("vendor_id"),
  menu_id: integer("menu_id").notNull().notNull().references(() => menu.id),
  drink_menu_descr: varchar("drink_menu_descr"),
  drinkMenuStatus: drinkMenuStatusEnum("drink_menu_status"), 
  created_at: timestamp("created_at").defaultNow().notNull(), 
});

//TODO food and drink recipes should persist even if not associated with an event (for re-use)
export const drink_recipe = pgTable("drink_recipe", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "drink_recipe_id_identity_seq" }), 
  drinkMenuId: integer("drink_menu_id").notNull().notNull().notNull().references(() => drink_menu.id),
  drinkRecipeDescr: varchar("drink_recipe_descr"),
  drinkIngredients: text("drink_ingerdients"),
  drinkRecipeStatus: drinkRecipeStatusEnum("drink_recipe_status"), 
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const main_dish = pgTable("main_dish", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "main_dish_id_identity_seq" }), 
  menuId: integer("menu_id").notNull().notNull().references(() => menu.id),
  MDRecipeDescr: varchar("m_d_recipe_descr"),
  MDIngredients: text("m_d_ingredients"),
  mainDishStatus: mainDishStatusEnum("main_dish_status"),  
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const side_dish = pgTable("side_dish", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "side_dish_id_identity_seq" }), 
  menuId: integer("menu_id").notNull().notNull().references(() => menu.id),
  SDRecipeDescr: varchar("s_d_recipe_descr"),
  SDIngredients: text("s_d_ingredients"),
  sideDishStatus: sideDishStatusEnum("side_dish_status"),  
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const dessert = pgTable("dessert", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "dessert_id_identity_seq" }), 
  menuId: integer("menu_id").notNull().notNull().references(() => menu.id),
  dessertRecipeDescr: varchar("dessert_recipe_descr"),
  dessertIngredients: text("dessert_ingredients"),
  dessertStatus: dessertStatusEnum("dessert_status"),  //TODO make enum
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export const deco_group = pgTable("deco_group", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: "deco_group_id_identity_seq" }), 
  decoId: integer("deco_id").notNull().notNull().references(() => deco.id),
  decoGroupDescr: varchar("deco_group_descr"),
  decoGroupArea: varchar("deco_group_area"),
  decoGroupStatus: decoGroupStatusEnum("deco_grooup_status"),  //TODO make enum
  createdAt: timestamp("created_at").defaultNow().notNull(),
});