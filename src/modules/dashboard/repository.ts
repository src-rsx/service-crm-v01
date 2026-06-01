import { db } from "@/db";

import {
  companies,
} from "@/db/schema/crm/companies";

import {
  sites,
} from "@/db/schema/service/sites";

import {
  assets,
} from "@/db/schema/service/assets";

import {
  engineers,
} from "@/db/schema/service/engineers";

import {
  serviceCalls,
} from "@/db/schema/service/service-calls";

import { eq } from "drizzle-orm";

export const dashboardRepository = {
  async getOverviewCounts(
    tenantId: string
  ) {
    const [
      companiesCount,
      sitesCount,
      assetsCount,
      engineersCount,
    ] = await Promise.all([
      db.$count(
        companies,
        eq(
          companies.tenantId,
          tenantId
        )
      ),

      db.$count(
        sites,
        eq(
          sites.tenantId,
          tenantId
        )
      ),

      db.$count(
        assets,
        eq(
          assets.tenantId,
          tenantId
        )
      ),

      db.$count(
        engineers,
        eq(
          engineers.tenantId,
          tenantId
        )
      ),
    ]);

    return {
      companies:
        companiesCount,

      sites:
        sitesCount,

      assets:
        assetsCount,

      engineers:
        engineersCount,
    };
  },
};