"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function CompaniesToolbar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Input
        placeholder="Search companies..."
        className="max-w-sm"
      />

<Button asChild>
  <Link href="/companies/new">
    New Company
  </Link>
</Button>
    </div>
  );
}