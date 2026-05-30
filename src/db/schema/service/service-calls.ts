import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { tenants } from "../core/tenants";
import { companies } from "../crm/companies";
import { sites } from "./sites";
import { assets } from "./assets";
import { engineers } from "./engineers";
import { users } from "../auth/users";

export const serviceCalls = pgTable("service_calls", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  tenantId: uuid("tenant_id")
    .references(() => tenants.id)
    .notNull(),

  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),

  siteId: uuid("site_id")
    .references(() => sites.id)
    .notNull(),

  assetId: uuid("asset_id")
    .references(() => assets.id),

  callNumber: varchar("call_number", {
    length: 50,
  })
    .notNull()
    .unique(),

  customerReferenceNumber: varchar(
    "customer_reference_number",
    {
      length: 100,
    }
  ),

  callType: varchar("call_type", {
    length: 30,
  })
    .default("BREAKDOWN")
    .notNull(),

  source: varchar("source", {
    length: 30,
  })
    .default("PHONE")
    .notNull(),

  subject: varchar("subject", {
    length: 500,
  }).notNull(),

  description: text("description"),

  priority: varchar("priority", {
    length: 20,
  })
    .default("MEDIUM")
    .notNull(),

  status: varchar("status", {
    length: 30,
  })
    .default("OPEN")
    .notNull(),

  reportedBy: varchar("reported_by", {
    length: 255,
  }),

  reportedMobile: varchar(
    "reported_mobile",
    {
      length: 20,
    }
  ),

  reportedByUserId: uuid(
    "reported_by_user_id"
  ).references(() => users.id),

  assignedEngineerId: uuid(
    "assigned_engineer_id"
  ).references(() => engineers.id),

  resolutionRemarks: text(
    "resolution_remarks"
  ),

  openedAt: timestamp("opened_at")
    .defaultNow()
    .notNull(),

  closedAt: timestamp("closed_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});