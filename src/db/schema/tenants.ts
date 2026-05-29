import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
  id: serial("id").primaryKey(),

  tenantCode: varchar("tenant_code", {
    length: 50,
  })
    .notNull()
    .unique(),

  companyName: varchar("company_name", {
    length: 255,
  }).notNull(),

  contactPerson: varchar("contact_person", {
    length: 255,
  }),

  email: varchar("email", {
    length: 255,
  }),

  mobile: varchar("mobile", {
    length: 20,
  }),

  subscriptionPlan: varchar("subscription_plan", {
    length: 50,
  }).default("TRIAL"),

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