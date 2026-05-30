import { db } from "@/db";

import {
    engineers,
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
    UpdateEngineerInput,
} from "./types";

interface FindEngineersOptions {
    page?: number;
    pageSize?: number;
    search?: string;
}

export const engineersRepository = {
    async findAllByTenant(
        tenantId: string,
        options?: FindEngineersOptions
    ) {
        const page = options?.page ?? 1;

        const pageSize =
            options?.pageSize ?? 20;

        const offset =
            (page - 1) * pageSize;

        const filters = [
            eq(engineers.tenantId, tenantId),
            eq(engineers.isActive, true),
        ];

        if (options?.search?.trim()) {
            filters.push(
                or(
                    ilike(
                        engineers.employeeCode,
                        `%${options.search}%`
                    ),
                    ilike(
                        engineers.name,
                        `%${options.search}%`
                    ),
                    ilike(
                        engineers.mobile,
                        `%${options.search}%`
                    ),
                    ilike(
                        engineers.email,
                        `%${options.search}%`
                    ),
                    ilike(
                        engineers.designation,
                        `%${options.search}%`
                    )
                )!
            );
        }

        return db.query.engineers.findMany({
            where: and(...filters),

            orderBy: (
                engineers,
                { desc }
            ) => [
                    desc(engineers.createdAt),
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
            eq(engineers.tenantId, tenantId),
            eq(engineers.isActive, true),
        ];

        if (search?.trim()) {
            filters.push(
                or(
                    ilike(
                        engineers.employeeCode,
                        `%${search}%`
                    ),
                    ilike(
                        engineers.name,
                        `%${search}%`
                    ),
                    ilike(
                        engineers.mobile,
                        `%${search}%`
                    ),
                    ilike(
                        engineers.email,
                        `%${search}%`
                    ),
                    ilike(
                        engineers.designation,
                        `%${search}%`
                    )
                )!
            );
        }

        const result = await db
            .select({
                count: count(),
            })
            .from(engineers)
            .where(and(...filters));

        return Number(
            result[0]?.count ?? 0
        );
    },

    async create(
        data:
            typeof engineers.$inferInsert
    ) {
        const result = await db
            .insert(engineers)
            .values(data)
            .returning();

        return result[0];
    },

    async findById(
        tenantId: string,
        engineerId: string
    ) {
        return db.query.engineers.findFirst({
            where: and(
                eq(
                    engineers.id,
                    engineerId
                ),
                eq(
                    engineers.tenantId,
                    tenantId
                )
            ),
        });
    },

    async findByEmployeeCode(
        tenantId: string,
        employeeCode: string
    ) {
        const result =
            await db.query.engineers.findMany({
                where: and(
                    eq(
                        engineers.tenantId,
                        tenantId
                    ),
                    eq(
                        engineers.employeeCode,
                        employeeCode
                    )
                ),

                limit: 1,
            });

        return result[0];
    },

    async update(
        tenantId: string,
        engineerId: string,
        data: UpdateEngineerInput
    ) {
        const [engineer] =
            await db
                .update(engineers)
                .set({
                    ...data,
                    updatedAt:
                        new Date(),
                })
                .where(
                    and(
                        eq(
                            engineers.id,
                            engineerId
                        ),
                        eq(
                            engineers.tenantId,
                            tenantId
                        )
                    )
                )
                .returning();

        return engineer;
    },

    async deactivate(
        tenantId: string,
        engineerId: string
    ) {
        const [engineer] =
            await db
                .update(engineers)
                .set({
                    isActive: false,
                    updatedAt:
                        new Date(),
                })
                .where(
                    and(
                        eq(
                            engineers.id,
                            engineerId
                        ),
                        eq(
                            engineers.tenantId,
                            tenantId
                        )
                    )
                )
                .returning();

        return engineer;
    },

    async getLatestGeneratedEmployeeCode(
        tenantId: string
    ) {
        const result =
            await db.query.engineers.findFirst({
                where: and(
                    eq(engineers.tenantId, tenantId),
                    ilike(
                        engineers.employeeCode,
                        "ENG-%"
                    )
                ),

                orderBy: (
                    engineers,
                    { desc }
                ) => [
                        desc(engineers.employeeCode),
                    ],
            });

        return result?.employeeCode;
    },
};