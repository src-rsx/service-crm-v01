import { relations } from "drizzle-orm";

import { users } from "./schema/auth/users";
import { tenants } from "./schema/core/tenants";
import { companies } from "./schema/crm/companies";

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