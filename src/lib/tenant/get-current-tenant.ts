import { auth } from "@/auth/auth";

export async function getCurrentTenantId() {
  const session = await auth();

  return session?.user?.tenantId;
}