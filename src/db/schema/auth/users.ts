import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  integer
} from "drizzle-orm/pg-core";
import { tenants } from "../core/tenants";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  
  passwordHash: varchar("password_hash", {
    length: 255,
  }).notNull(),

  lastLoginAt: timestamp("last_login_at"),

  role: varchar("role", { length: 50 }).notNull(),

  isActive: boolean("is_active").default(true),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),

  tenantId: uuid("tenant_id")
  .references(() => tenants.id)
  .notNull(),
});