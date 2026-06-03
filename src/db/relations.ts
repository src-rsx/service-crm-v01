import { relations } from "drizzle-orm";

import { users } from "./schema/auth/users";
import { tenants } from "./schema/core/tenants";
import { companies } from "./schema/crm/companies";
import { serviceCallVisits }
  from "./schema/service/service-call-visits";
import { serviceCalls }
  from "./schema/service/service-calls";

import { engineers }
  from "./schema/service/engineers";

import { sites }
  from "./schema/service/sites";

import { assets }
  from "./schema/service/assets";

/**
 * Tenant Relations
 */
export const tenantsRelations = relations(
  tenants,
  ({ many }) => ({
    users: many(users),
    companies: many(companies),
  })
);

/**
 * User Relations
 */
export const usersRelations = relations(
  users,
  ({ one }) => ({
    tenant: one(tenants, {
      fields: [users.tenantId],
      references: [tenants.id],
    }),
  })
);

/**
 * Company Relations
 */
export const companiesRelations = relations(
  companies,
  ({ one }) => ({
    tenant: one(tenants, {
      fields: [companies.tenantId],
      references: [tenants.id],
    }),
  })
);

export const serviceCallsRelations =
  relations(
    serviceCalls,
    ({ many, one }) => ({

      visits: many(
        serviceCallVisits
      ),

      assignedEngineer: one(
        engineers,
        {
          fields: [
            serviceCalls.assignedEngineerId,
          ],
          references: [
            engineers.id,
          ],
        }
      ),

      company: one(
        companies,
        {
          fields: [
            serviceCalls.companyId,
          ],
          references: [
            companies.id,
          ],
        }
      ),

      site: one(
        sites,
        {
          fields: [
            serviceCalls.siteId,
          ],
          references: [
            sites.id,
          ],
        }
      ),

      asset: one(
        assets,
        {
          fields: [
            serviceCalls.assetId,
          ],
          references: [
            assets.id,
          ],
        }
      ),

    })
  );

export const serviceCallVisitsRelations =
  relations(
    serviceCallVisits,
    ({ one }) => ({
      serviceCall: one(
        serviceCalls,
        {
          fields: [
            serviceCallVisits.serviceCallId,
          ],
          references: [
            serviceCalls.id,
          ],
        }
      ),

      engineer: one(
        engineers,
        {
          fields: [
            serviceCallVisits.engineerId,
          ],
          references: [
            engineers.id,
          ],
        }
      ),
    })
  );