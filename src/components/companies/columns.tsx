"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/types/company";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "customerCode",
    header: "Code",
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "state",
    header: "State",
  },
];