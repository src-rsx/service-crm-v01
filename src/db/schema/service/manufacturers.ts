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

export const manufacturers = pgTable("manufacturers", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 100 })
    .notNull()
    .unique(),

  isActive: boolean("is_active")
    .default(true)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});