import {
  pgTable,
  uuid,
  varchar,
  boolean,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { companies } from "./companies";
import { sites } from "./sites";
import { manufacturers } from "./manufacturers";

export const assets = pgTable("assets", {
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

  manufacturerId: uuid("manufacturer_id")
    .references(() => manufacturers.id)
    .notNull(),

  assetCode: varchar("asset_code", {
    length: 50,
  }).notNull(),

  assetName: varchar("asset_name", {
    length: 255,
  }).notNull(),

  equipmentType: varchar("equipment_type", {
    length: 100,
  }),

  model: varchar("model", {
    length: 255,
  }),

  serialNumber: varchar("serial_number", {
    length: 255,
  }),

  purchaseDate: date("purchase_date"),

  installationDate: date("installation_date"),

  warrantyStartDate: date("warranty_start_date"),

  warrantyExpiryDate: date("warranty_expiry_date"),

  location: varchar("location", {
    length: 255,
  }),

  status: varchar("status", {
    length: 30,
  })
    .default("ACTIVE")
    .notNull(),

  remarks: text("remarks"),

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