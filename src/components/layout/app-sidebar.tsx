"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 border-r bg-background">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
            SC
          </div>

          <div>
            <div className="font-semibold">
              Service CRM
            </div>

            <div className="text-xs text-muted-foreground">
              Field Service Platform
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl">
          <div className="font-medium">
            CRM Administrator
          </div>

          <div className="text-xs text-muted-foreground">
            TENANT_ADMIN
          </div>
        </div>
      </div>

      <nav className="p-3">
        {navigation.map((group) => (
          <div
            key={group.group}
            className="mb-6"
          >
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.group}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-muted font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}