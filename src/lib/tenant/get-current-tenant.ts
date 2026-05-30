import { auth } from "@/auth/auth";

export async function getCurrentTenantId() {
  const session = await auth();
  console.log("SESSION:", session);

  return session?.user?.tenantId;
}