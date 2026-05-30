import { db } from "@/db";
import { companies } from "@/db/schema";
import {
  and,
  eq,
  desc,
  ilike,
  or,
  count,
} from "drizzle-orm";

import { UpdateCompanyInput } from "./schemas";

interface FindCompaniesOptions {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const companiesRepository = {
  async findAllByTenant(
    tenantId: string,
    options?: FindCompaniesOptions
  ) {
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? 20;
    const offset = (page - 1) * pageSize;

    const filters = [
      eq(companies.tenantId, tenantId),
      eq(companies.isActive, true),
    ];

    if (options?.search?.trim()) {
      filters.push(
        or(
          ilike(
            companies.companyName,
            `%${options.search}%`
          ),
          ilike(
            companies.customerCode,
            `%${options.search}%`
          ),
          ilike(
            companies.contactPerson,
            `%${options.search}%`
          ),
          ilike(
            companies.mobile,
            `%${options.search}%`
          )
        )!
      );
    }

    return db.query.companies.findMany({
      where: and(...filters),

      orderBy: (companies, { desc }) => [
        desc(companies.createdAt),
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
      eq(companies.tenantId, tenantId),
      eq(companies.isActive, true),
    ];

    if (search?.trim()) {
      filters.push(
        or(
          ilike(
            companies.companyName,
            `%${search}%`
          ),
          ilike(
            companies.customerCode,
            `%${search}%`
          ),
          ilike(
            companies.contactPerson,
            `%${search}%`
          ),
          ilike(
            companies.mobile,
            `%${search}%`
          )
        )!
      );
    }

    const result = await db
      .select({
        count: count(),
      })
      .from(companies)
      .where(and(...filters));

    return Number(result[0]?.count ?? 0);
  },

  async findAllIncludingInactive(
    tenantId: string
  ) {
    return db.query.companies.findMany({
      where: eq(
        companies.tenantId,
        tenantId
      ),

      orderBy: (companies, { desc }) => [
        desc(companies.createdAt),
      ],
    });
  },

  async create(
    data: typeof companies.$inferInsert
  ) {
    const result = await db
      .insert(companies)
      .values(data)
      .returning();

    return result[0];
  },

  async findByCustomerCode(
    tenantId: string,
    customerCode: string
  ) {
    const result =
      await db.query.companies.findMany({
        where: and(
          eq(companies.tenantId, tenantId),
          eq(
            companies.customerCode,
            customerCode
          )
        ),

        limit: 1,
      });

    return result[0];
  },

  async findById(
    tenantId: string,
    companyId: string
  ) {
    return db.query.companies.findFirst({
      where: and(
        eq(companies.id, companyId),
        eq(companies.tenantId, tenantId)
      ),
    });
  },

  async update(
    tenantId: string,
    companyId: string,
    data: UpdateCompanyInput
  ) {
    const [company] = await db
      .update(companies)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(companies.id, companyId),
          eq(companies.tenantId, tenantId)
        )
      )
      .returning();

    return company;
  },

  async deactivate(
    tenantId: string,
    companyId: string
  ) {
    const [company] = await db
      .update(companies)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(companies.id, companyId),
          eq(companies.tenantId, tenantId)
        )
      )
      .returning();

    return company;
  },
};