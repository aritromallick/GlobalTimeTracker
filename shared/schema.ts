import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// The schema is minimal as we're not storing any user data
// This is just a placeholder to satisfy the architecture requirements

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  capital: text("capital").notNull(),
  timezoneOffset: text("timezone_offset").notNull(),
  timezoneAbbr: text("timezone_abbr").notNull(),
});

export const insertCountrySchema = createInsertSchema(countries).pick({
  code: true,
  name: true,
  capital: true,
  timezoneOffset: true,
  timezoneAbbr: true,
});

export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type Country = typeof countries.$inferSelect;
