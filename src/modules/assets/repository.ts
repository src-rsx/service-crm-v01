import { db } from "@/db";
import {
    assets,
} from "@/db/schema";

import {
    and,
    eq,
    desc,
    ilike,
    or,
    count,
} from "drizzle-orm";

import { UpdateAssetInput } from "./types";

interface FindAssetsOptions {
    page?: number;
    pageSize?: number;
    search?: string;
}

export const assetsRepository = {
    async findAllByTenant(
        tenantId: string,
        options?: FindAssetsOptions
    ) {
        const page = options?.page ?? 1;
        const pageSize = options?.pageSize ?? 20;
        const offset = (page - 1) * pageSize;

        const filters = [
            eq(assets.tenantId, tenantId),
            eq(assets.isActive, true),
        ];

        if (options?.search?.trim()) {
            filters.push(
                or(
                    ilike(
                        assets.assetCode,
                        `%${options.search}%`
                    ),
                    ilike(
                        assets.assetName,
                        `%${options.search}%`
                    ),
                    ilike(
                        assets.serialNumber,
                        `%${options.search}%`
                    ),
                    ilike(
                        assets.model,
                        `%${options.search}%`
                    ),
                    ilike(
                        assets.equipmentType,
                        `%${options.search}%`
                    )
                )!
            );
        }

        return db.query.assets.findMany({
            where: and(...filters),

            orderBy: (assets, { desc }) => [
                desc(assets.createdAt),
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
            eq(assets.tenantId, tenantId),
            eq(assets.isActive, true),
        ];

        if (search?.trim()) {
            filters.push(
                or(
                    ilike(
                        assets.assetCode,
                        `%${search}%`
                    ),
                    ilike(
                        assets.assetName,
                        `%${search}%`
                    ),
                    ilike(
                        assets.serialNumber,
                        `%${search}%`
                    ),
                    ilike(
                        assets.model,
                        `%${search}%`
                    ),
                    ilike(
                        assets.equipmentType,
                        `%${search}%`
                    )
                )!
            );
        }

        const result = await db
            .select({
                count: count(),
            })
            .from(assets)
            .where(and(...filters));

        return Number(result[0]?.count ?? 0);
    },

    async create(
        data: typeof assets.$inferInsert
    ) {
        const result = await db
            .insert(assets)
            .values(data)
            .returning();

        return result[0];
    },

    async findById(
        tenantId: string,
        assetId: string
    ) {
        return db.query.assets.findFirst({
            where: and(
                eq(assets.id, assetId),
                eq(assets.tenantId, tenantId)
            ),
        });
    },

    async update(
        tenantId: string,
        assetId: string,
        data: UpdateAssetInput
    ) {
        const [asset] = await db
            .update(assets)
            .set({
                ...data,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(assets.id, assetId),
                    eq(assets.tenantId, tenantId)
                )
            )
            .returning();

        return asset;
    },

    async deactivate(
        tenantId: string,
        assetId: string
    ) {
        const [asset] = await db
            .update(assets)
            .set({
                isActive: false,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(assets.id, assetId),
                    eq(assets.tenantId, tenantId)
                )
            )
            .returning();

        return asset;
    },

    async findBySerialNumber(
        tenantId: string,
        serialNumber: string
    ) {
        const result =
            await db.query.assets.findMany({
                where: and(
                    eq(assets.tenantId, tenantId),
                    eq(
                        assets.serialNumber,
                        serialNumber
                    )
                ),
                limit: 1,
            });

        return result[0];
    },

    async findAllIncludingInactive(
        tenantId: string
    ) {
        return db.query.assets.findMany({
            where: eq(
                assets.tenantId,
                tenantId
            ),

            orderBy: (assets, { desc }) => [
                desc(assets.createdAt),
            ],
        });
    },
};