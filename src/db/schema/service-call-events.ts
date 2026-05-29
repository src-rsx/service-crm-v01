import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { serviceCalls } from "./service-calls";
import { users } from "./users";

export const serviceCallEvents = pgTable(
  "service_call_events",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    serviceCallId: uuid("service_call_id")
      .references(() => serviceCalls.id)
      .notNull(),

    eventType: varchar("event_type", {
      length: 50,
    }).notNull(),

    remarks: text("remarks"),

    oldStatus: varchar("old_status", {
      length: 30,
    }),

    newStatus: varchar("new_status", {
      length: 30,
    }),

    performedByUserId: uuid(
      "performed_by_user_id"
    ).references(() => users.id),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);