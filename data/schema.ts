import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real, uniqueIndex } from "drizzle-orm/sqlite-core";

export const categoryTable = sqliteTable("category_table", {
  _id: text().notNull().primaryKey(),
  title: text().notNull(),
  type: text().notNull(),
  color: text().notNull(),
  icon: text().notNull(),
  description: text().default(""),
  isFavorite: integer({mode: "boolean"}).default(false),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
});

export const transactionTable = sqliteTable("transaction_table", {
  _id: text().notNull().primaryKey(),
  note: text().default(""),
  date: integer({ mode: 'timestamp' }).notNull(),
  amount: real().notNull(),
  currency: text().notNull(),
  category: text().notNull(),
  conversionRate: real().default(1),
  conversionCurrency: text().default(""),
  group: text(),
  subscriptionId: text(),
  scheduledFor: integer({ mode: "timestamp" }),
  image: text(), //for future use
  createdAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
}, (table) => ({
  subscriptionOccurrence: uniqueIndex("transaction_subscription_occurrence_unique").on(
    table.subscriptionId,
    table.scheduledFor
  ),
}));

export const groupTable = sqliteTable("group_table", {
  _id: text().notNull().primaryKey(),
  title: text().notNull(),
  color: text().notNull(),
  icon: text().notNull(),
  description: text().default(""),
  isFavorite: integer({mode: "boolean"}).default(false),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
});

export const subscriptionTable = sqliteTable("subscription_table", {
  _id: text().notNull().primaryKey(),
  title: text().notNull(),
  note: text().default(""),
  amount: real().notNull(),
  currency: text().notNull(),
  category: text().notNull(),
  conversionRate: real().default(1),
  conversionCurrency: text().default(""),
  group: text(),
  startDate: integer({ mode: "timestamp" }).notNull(),
  intervalUnit: text().notNull(),
  intervalCount: integer().notNull().default(1),
  occurrenceIndex: integer().notNull().default(0),
  nextRunAt: integer({ mode: "timestamp" }),
  endDate: integer({ mode: "timestamp" }),
  isActive: integer({ mode: "boolean" }).notNull().default(true),
  createdAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_DATE)`),
  updatedAt: integer({ mode: "timestamp" }).default(sql`(CURRENT_DATE)`),
});
