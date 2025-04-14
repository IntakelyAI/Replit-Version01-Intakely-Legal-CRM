import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  jobTitle: text("job_title"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tasks table definition
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  status: text("status").notNull().default("pending"),
  priority: text("priority").notNull().default("medium"),
  assignedTo: integer("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Clients table definition
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Cases table definition
export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  caseNumber: text("case_number").notNull(),
  clientId: integer("client_id").references(() => clients.id),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Case assignments junction table
export const caseAssignments = pgTable("case_assignments", {
  id: serial("id").primaryKey(),
  caseId: integer("case_id").references(() => cases.id),
  userId: integer("user_id").references(() => users.id),
});

// Calls table definition
export const calls = pgTable("calls", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  scheduledTime: timestamp("scheduled_time").notNull(),
  duration: integer("duration"), // in minutes
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Call participants junction table
export const callParticipants = pgTable("call_participants", {
  id: serial("id").primaryKey(),
  callId: integer("call_id").references(() => calls.id),
  userId: integer("user_id").references(() => users.id),
});

// Notifications table definition
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  read: boolean("read").notNull().default(false),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Stats table for dashboard metrics
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  activeClients: integer("active_clients").notNull().default(0),
  ongoingCases: integer("ongoing_cases").notNull().default(0),
  aiCalls: integer("ai_calls").notNull().default(0),
  activeClientsChange: integer("active_clients_change").notNull().default(0),
  ongoingCasesChange: integer("ongoing_cases_change").notNull().default(0),
  aiCallsChange: integer("ai_calls_change").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create insert schemas for each table
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  jobTitle: true,
  avatar: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  dueDate: true,
  status: true,
  priority: true,
  assignedTo: true,
});

export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  company: true,
  email: true,
  phone: true,
  status: true,
});

export const insertCaseSchema = createInsertSchema(cases).pick({
  title: true,
  caseNumber: true,
  clientId: true,
  status: true,
});

export const insertCallSchema = createInsertSchema(calls).pick({
  company: true,
  scheduledTime: true,
  duration: true,
  notes: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  title: true,
  description: true,
  type: true,
  userId: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Case = typeof cases.$inferSelect;
export type InsertCase = z.infer<typeof insertCaseSchema>;

export type Call = typeof calls.$inferSelect;
export type InsertCall = z.infer<typeof insertCallSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type Stats = typeof stats.$inferSelect;
