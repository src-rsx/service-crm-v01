import { getCurrentTenantId } from "./get-current-tenant";

export async function requireTenant() {
  const tenantId = await getCurrentTenantId();

  if (!tenantId) {
    throw new Error("Tenant not found");
  }

  return tenantId;
}