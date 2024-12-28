import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real  } from "drizzle-orm/sqlite-core";

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
  conversionRate: real().default(1),  //for future use
  group: text(), // for future use
  image: text().default(null), //for future use
  createdAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
  updatedAt: integer({ mode: 'timestamp' }).default(sql`(CURRENT_DATE)`),
});

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