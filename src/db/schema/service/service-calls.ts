import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { tenants } from "../core/tenants";
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

  assetId: uuid("asset_id")
    .references(() => assets.id)
    .notNull(),

  callNumber: varchar("call_number", {
    length: 50,
  }).notNull()
    .unique(),

  customerReferenceNumber: varchar(
    "customer_reference_number",
    {
      length: 100,
    }
  ),

  subject: varchar("subject", {
    length: 500,
  }).notNull(),

  description: text("description"),
  resolutionRemarks: text("resolution_remarks"),

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

  assignedEngineerId: uuid(
    "assigned_engineer_id"
  ).references(() => engineers.id),

  reportedByUserId: uuid(
    "reported_by_user_id"
  ).references(() => users.id),

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