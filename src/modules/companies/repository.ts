import { db } from "@/db";
import { companies } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { UpdateCompanyInput } from "./schemas";

export const companiesRepository = {
  async findAllByTenant(
    tenantId: string
  ) {
    return db.query.companies.findMany({
      where: (companies, { and, eq }) =>
        and(
          eq(companies.tenantId, tenantId),
          eq(companies.isActive, true),
        ),
    });
  },

  async findAllIncludingInactive(
  tenantId: string
  ) {
    return db.query.companies.findMany({
      where: eq(
        companies.tenantId,
        tenantId
      ),
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
    const result = await db.query.companies.findMany({
        where: (companies, { and, eq }) =>
        and(
            eq(companies.tenantId, tenantId),
            eq(companies.customerCode, customerCode)
        ),
        limit: 1,
    });

    return result[0];
    },

    async findById(
      tenantId: string,
      companyId: string
    ) {
      const company = await db.query.companies.findFirst({
        where: 
        and(
            eq(companies.id, companyId),
            eq(companies.tenantId, tenantId)
        ),
      });

      return company;
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
    }
};