"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/companies": "Companies",
  "/sites": "Sites",
  "/assets": "Assets",
  "/engineers": "Engineers",
  "/service-calls": "Service Calls",
  "/settings": "Settings",
};

export function PageTitle() {
  const pathname = usePathname();

  return (
    <h2 className="text-lg font-semibold">
      {titles[pathname] ?? "CRM"}
    </h2>
  );
}