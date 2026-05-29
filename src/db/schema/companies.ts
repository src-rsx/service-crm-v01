import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer
} from "drizzle-orm/pg-core";
import { tenants } from "./tenants";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),

  customerCode: varchar("customer_code", {
    length: 50,
  }).notNull(),

  companyName: varchar("company_name", {
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

  gstNumber: varchar("gst_number", {
    length: 50,
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

  remarks: text("remarks"),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),

  tenantId: integer("tenant_id")
  .references(() => tenants.id)
  .notNull(),
});