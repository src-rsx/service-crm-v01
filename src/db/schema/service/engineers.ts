import {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

import { tenants } from "../core/tenants";

export const engineers = pgTable("engineers", {
  id: uuid("id").defaultRandom().primaryKey(),

  tenantId: uuid("tenant_id")
    .references(() => tenants.id)
    .notNull(),

  employeeCode: varchar("employee_code", {
    length: 50,
  }),

  name: varchar("name", {
    length: 255,
  }).notNull(),

  mobile: varchar("mobile", {
    length: 20,
  }),

  email: varchar("email", {
    length: 255,
  }),

  designation: varchar("designation", {
    length: 100,
  }),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});