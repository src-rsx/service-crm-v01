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
        const page = options?.page ?? 1;

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
                    )
                )!
            );
        }

        return db.query.serviceCalls.findMany({
            where: and(...filters),

            orderBy: (
                serviceCalls,
                { desc }
            ) => [
                    desc(
                        serviceCalls.createdAt
                    ),
                ],

            limit: pageSize,

            offset,
        });
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