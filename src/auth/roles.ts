export const Roles = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT_ADMIN: "TENANT_ADMIN",
  SALES_MANAGER: "SALES_MANAGER",
  SALES_EXECUTIVE: "SALES_EXECUTIVE",
  VIEWER: "VIEWER",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];