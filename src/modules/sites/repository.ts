import { db } from "@/db";
import { sites, companies } from "@/db/schema";

import {
  and,
  eq,
  desc,
  ilike,
  or,
  count,
} from "drizzle-orm";

import {
  CreateSiteInput,
  SiteFilters,
  UpdateSiteInput,
} from "./types";

interface FindSitesOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const sitesRepository = {
    async findAllByTenant(
    tenantId: string,
    options?: FindSitesOptions
    ) {
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const filters = [
        eq(sites.tenantId, tenantId),
        eq(sites.isActive, true),
    ];

    if (options?.search?.trim()) {
        filters.push(
        or(
            ilike(
            sites.siteName,
            `%${options.search}%`
            ),
            ilike(
            sites.siteCode,
            `%${options.search}%`
            ),
            ilike(
            sites.contactPerson,
            `%${options.search}%`
            ),
            ilike(
            sites.mobile,
            `%${options.search}%`
            ),
            ilike(
            sites.city,
            `%${options.search}%`
            )
        )!
        );
    }

    return db.query.sites.findMany({
        where: and(...filters),

        orderBy: (sites, { desc }) => [
        desc(sites.createdAt),
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
    eq(sites.tenantId, tenantId),
    eq(sites.isActive, true),
  ];

  if (search?.trim()) {
    filters.push(
      or(
        ilike(
          sites.siteName,
          `%${search}%`
        ),
        ilike(
          sites.siteCode,
          `%${search}%`
        ),
        ilike(
          sites.contactPerson,
          `%${search}%`
        ),
        ilike(
          sites.mobile,
          `%${search}%`
        ),
        ilike(
          sites.city,
          `%${search}%`
        )
      )!
    );
  }

  const result = await db
    .select({
      count: count(),
    })
    .from(sites)
    .where(and(...filters));

  return Number(result[0]?.count ?? 0);
},

async findById(
  tenantId: string,
  siteId: string
) {
  return db.query.sites.findFirst({
    where: and(
      eq(sites.id, siteId),
      eq(sites.tenantId, tenantId)
    ),
  });
},

async create(
  data: typeof sites.$inferInsert
) {
  const result = await db
    .insert(sites)
    .values(data)
    .returning();

  return result[0];
},

async update(
  tenantId: string,
  siteId: string,
  data: UpdateSiteInput
) {
  const [site] = await db
    .update(sites)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(sites.id, siteId),
        eq(sites.tenantId, tenantId)
      )
    )
    .returning();

  return site;
},

async deactivate(
  tenantId: string,
  siteId: string
) {
  const [site] = await db
    .update(sites)
    .set({
      isActive: false,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(sites.id, siteId),
        eq(sites.tenantId, tenantId)
      )
    )
    .returning();

  return site;
}
};