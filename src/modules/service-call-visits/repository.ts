import { db } from "@/db";

import {
  serviceCallVisits,
} from "@/db/schema/service/service-call-visits";

import {
  eq,
  and,
  desc,
} from "drizzle-orm";

import {
  CreateVisitInput,
  UpdateVisitInput,
} from "./types";

export const
  serviceCallVisitsRepository =
{
  async create(
    data: CreateVisitInput
  ) {
    const [visit] =
      await db
        .insert(
          serviceCallVisits
        )
        .values({
          ...data,
          status:
            data.status ??
            "ASSIGNED",
        })
        .returning();

    return visit;
  },

  async findLatestByCall(
    tenantId: string,
    serviceCallId: string
  ) {
    const [visit] =
      await db
        .select()
        .from(
          serviceCallVisits
        )
        .where(
          and(
            eq(
              serviceCallVisits.tenantId,
              tenantId
            ),
            eq(
              serviceCallVisits.serviceCallId,
              serviceCallId
            )
          )
        )
        .orderBy(
          desc(
            serviceCallVisits.createdAt
          )
        )
        .limit(1);

    return visit;
  },

  async findById(
  visitId: string
) {
  const [visit] =
    await db
      .select()
      .from(
        serviceCallVisits
      )
      .where(
        eq(
          serviceCallVisits.id,
          visitId
        )
      )
      .limit(1);

  return visit;
},

  async update(
    visitId: string,
    data: UpdateVisitInput
  ) {
    const [visit] =
      await db
        .update(
          serviceCallVisits
        )
        .set({
          ...data,
          updatedAt:
            new Date(),
        })
        .where(
          eq(
            serviceCallVisits.id,
            visitId
          )
        )
        .returning();

    return visit;
  },

async findByServiceCall(
  tenantId: string,
  serviceCallId: string
) {
  const [visit] =
    await db
      .select()
      .from(serviceCallVisits)
      .where(
        and(
          eq(
            serviceCallVisits.tenantId,
            tenantId
          ),
          eq(
            serviceCallVisits.serviceCallId,
            serviceCallId
          )
        )
      )
      .orderBy(
        desc(
          serviceCallVisits.createdAt
        )
      )
      .limit(1);

  return visit;
},

async findByServiceCallHistory(
  tenantId: string,
  serviceCallId: string
) {
  return db.query.serviceCallVisits.findMany({
    where: and(
      eq(
        serviceCallVisits.tenantId,
        tenantId
      ),
      eq(
        serviceCallVisits.serviceCallId,
        serviceCallId
      )
    ),

    with: {
      engineer: true,
    },

    orderBy: (
      visits,
      { desc }
    ) => [
      desc(
        visits.createdAt
      ),
    ],
  });
},
};