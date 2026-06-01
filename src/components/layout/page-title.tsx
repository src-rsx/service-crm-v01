"use client";

import { usePathname } from "next/navigation";

import { pageMeta } from "@/constants/page-meta";

export function PageTitle() {
  const pathname = usePathname();

  const page =
    pageMeta[pathname];

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        {page?.title ?? "CRM"}
      </h1>

      <p className="text-sm text-muted-foreground">
        {page?.description}
      </p>
    </div>
  );
}