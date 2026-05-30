import { db } from "@/db";
import { companies } from "@/db/schema";

export const companiesRepository = {
  async findAllByTenant(
    tenantId: string
  ) {
    return db.query.companies.findMany({
      where: (companies, { eq }) =>
        eq(companies.tenantId, tenantId),
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
};