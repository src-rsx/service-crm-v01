import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    doublePrecision,
} from "drizzle-orm/pg-core";

import { tenants } from "../core/tenants";
import { serviceCalls } from "./service-calls";
import { engineers } from "./engineers";

export const serviceCallVisits =
    pgTable(
        "service_call_visits",
        {
            id: uuid("id")
                .defaultRandom()
                .primaryKey(),

            tenantId: uuid("tenant_id")
                .references(() => tenants.id)
                .notNull(),

            serviceCallId: uuid(
                "service_call_id"
            )
                .references(
                    () => serviceCalls.id
                )
                .notNull(),

            engineerId: uuid(
                "engineer_id"
            )
                .references(
                    () => engineers.id
                )
                .notNull(),

            status: varchar(
                "status",
                {
                    length: 30,
                }
            )
                .default("ASSIGNED")
                .notNull(),

            travelStartedAt:
                timestamp(
                    "travel_started_at"
                ),

            checkInAt:
                timestamp(
                    "check_in_at"
                ),

            checkOutAt:
                timestamp(
                    "check_out_at"
                ),

            observation:
                text(
                    "observation"
                ),

            actionTaken:
                text(
                    "action_taken"
                ),

            customerName:
                varchar(
                    "customer_name",
                    {
                        length: 255,
                    }
                ),

            customerMobile: varchar(
                "customer_mobile",
                {
                    length: 20,
                }
            ),

            customerRemarks: text(
                "customer_remarks"
            ),

            createdAt:
                timestamp(
                    "created_at"
                )
                    .defaultNow()
                    .notNull(),

            updatedAt:
                timestamp(
                    "updated_at"
                )
                    .defaultNow()
                    .notNull(),


            rootCause:
                text("root_cause"),

            partsUsed:
                text("parts_used"),


            travelLatitude:
                doublePrecision(
                    "travel_latitude"
                ),

            travelLongitude:
                doublePrecision(
                    "travel_longitude"
                ),

            checkInLatitude:
                doublePrecision(
                    "checkin_latitude"
                ),

            checkInLongitude:
                doublePrecision(
                    "checkin_longitude"
                ),

            checkOutLatitude:
                doublePrecision(
                    "checkout_latitude"
                ),

            checkOutLongitude:
                doublePrecision(
                    "checkout_longitude"
                ),

            reassignedAt: timestamp(
                "reassigned_at"
            ),

            reassignmentRemarks: text(
                "reassignment_remarks"
            ),
        }
    );