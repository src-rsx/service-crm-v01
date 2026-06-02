import { db } from "@/db";

import {
  serviceCalls,
} from "@/db/schema";

import {
  and,
  eq,
  desc,
  ilike,
  or,
  count,
} from "drizzle-orm";

import {
  UpdateServiceCallInput,
} from "./types";

import { engineers } from "@/db/schema";

interface FindServiceCallsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const serviceCallsRepository = {
  async findAllByTenant(
    tenantId: string,
    options?: FindServiceCallsOptions
  ) {
    const page =
      options?.page ?? 1;

    const pageSize =
      options?.pageSize ?? 20;

    const offset =
      (page - 1) * pageSize;

    const filters = [
      eq(
        serviceCalls.tenantId,
        tenantId
      ),
    ];

    if (options?.search?.trim()) {
      filters.push(
        or(
          ilike(
            serviceCalls.callNumber,
            `%${options.search}%`
          ),
          ilike(
            serviceCalls.subject,
            `%${options.search}%`
          ),
          ilike(
            serviceCalls.description,
            `%${options.search}%`
          ),
          ilike(
            serviceCalls.reportedBy,
            `%${options.search}%`
          ),

          ilike(
            serviceCalls.customerName,
            `%${options.search}%`
          ),

          ilike(
            serviceCalls.customerMobile,
            `%${options.search}%`
          )
        )!
      );
    }

    return db
      .select({
        id: serviceCalls.id,

        callNumber:
          serviceCalls.callNumber,

        subject:
          serviceCalls.subject,

        priority:
          serviceCalls.priority,

        status:
          serviceCalls.status,

        assignedEngineerId:
          serviceCalls.assignedEngineerId,

        engineerName:
          engineers.name,

        customerName:
          serviceCalls.customerName,

        customerMobile:
          serviceCalls.customerMobile,
      })
      .from(serviceCalls)
      .leftJoin(
        engineers,
        eq(
          serviceCalls.assignedEngineerId,
          engineers.id
        )
      )
      .where(and(...filters))
      .orderBy(
        desc(
          serviceCalls.createdAt
        )
      )
      .limit(pageSize)
      .offset(offset);
  },

  async countByTenant(
    tenantId: string,
    search?: string
  ) {
    const filters = [
      eq(
        serviceCalls.tenantId,
        tenantId
      ),
    ];

    if (search?.trim()) {
      filters.push(
        or(
          ilike(
            serviceCalls.callNumber,
            `%${search}%`
          ),
          ilike(
            serviceCalls.subject,
            `%${search}%`
          ),
          ilike(
            serviceCalls.description,
            `%${search}%`
          ),
          ilike(
            serviceCalls.reportedBy,
            `%${search}%`
          ),
          ilike(
            serviceCalls.customerName,
            `%${search}%`
          ),

          ilike(
            serviceCalls.customerMobile,
            `%${search}%`
          )
        )!
      );
    }

    const result = await db
      .select({
        count: count(),
      })
      .from(serviceCalls)
      .where(and(...filters));

    return Number(
      result[0]?.count ?? 0
    );
  },

  async create(
    data:
      typeof serviceCalls.$inferInsert
  ) {
    const result = await db
      .insert(serviceCalls)
      .values(data)
      .returning();

    return result[0];
  },

  async findById(
    tenantId: string,
    serviceCallId: string
  ) {
    return db.query.serviceCalls.findFirst({
      where: and(
        eq(
          serviceCalls.id,
          serviceCallId
        ),
        eq(
          serviceCalls.tenantId,
          tenantId
        )
      ),

      with: {
        assignedEngineer: true,
      },
    });
  },

  async update(
    tenantId: string,
    serviceCallId: string,
    data: UpdateServiceCallInput
  ) {
    const [serviceCall] =
      await db
        .update(serviceCalls)
        .set({
          ...data,
          updatedAt:
            new Date(),
        })
        .where(
          and(
            eq(
              serviceCalls.id,
              serviceCallId
            ),
            eq(
              serviceCalls.tenantId,
              tenantId
            )
          )
        )
        .returning();

    return serviceCall;
  },

  async assignEngineer(
    tenantId: string,
    serviceCallId: string,
    engineerId: string
  ) {
    const [serviceCall] =
      await db
        .update(serviceCalls)
        .set({
          assignedEngineerId:
            engineerId,

          status: "ASSIGNED",

          updatedAt:
            new Date(),
        })
        .where(
          and(
            eq(
              serviceCalls.id,
              serviceCallId
            ),
            eq(
              serviceCalls.tenantId,
              tenantId
            )
          )
        )
        .returning();

    return serviceCall;
  },

  async updateStatus(
    tenantId: string,
    serviceCallId: string,
    status: string
  ) {
    const [serviceCall] =
      await db
        .update(serviceCalls)
        .set({
          status,

          updatedAt:
            new Date(),

          ...(status === "CLOSED"
            ? {
              closedAt:
                new Date(),
            }
            : {}),
        })
        .where(
          and(
            eq(
              serviceCalls.id,
              serviceCallId
            ),
            eq(
              serviceCalls.tenantId,
              tenantId
            )
          )
        )
        .returning();

    return serviceCall;
  },

  async getLatestCallNumber(
    tenantId: string
  ) {
    const result =
      await db.query.serviceCalls.findFirst({
        where: eq(
          serviceCalls.tenantId,
          tenantId
        ),

        orderBy: (
          serviceCalls,
          { desc }
        ) => [
            desc(
              serviceCalls.createdAt
            ),
          ],
      });

    return result?.callNumber;
  },
};