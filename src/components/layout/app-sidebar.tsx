"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/constants/navigation";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-background">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          CRM v2
        </h1>

        <p className="text-muted-foreground text-sm">
          Field Service Management
        </p>
      </div>

      <nav className="space-y-1 p-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
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
      </nav>
    </aside>
  );
}