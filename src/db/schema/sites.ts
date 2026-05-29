import {
  pgTable,
  serial,
  integer,
  varchar,
  boolean,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { companies } from "./companies";

export const sites = pgTable("sites", {
  id: uuid("id").defaultRandom().primaryKey(),

  tenantId: uuid("tenant_id")
    .references(() => tenants.id)
    .notNull(),

  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),

  siteCode: varchar("site_code", {
    length: 50,
  }),

  siteName: varchar("site_name", {
    length: 255,
  }).notNull(),

  contactPerson: varchar("contact_person", {
    length: 255,
  }),

  mobile: varchar("mobile", {
    length: 20,
  }),

  email: varchar("email", {
    length: 255,
  }),

  address: text("address"),

  city: varchar("city", {
    length: 100,
  }),

  state: varchar("state", {
    length: 100,
  }),

  pincode: varchar("pincode", {
    length: 20,
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