import { NextResponse } from "next/server";

import { db } from "@/db";
import { companies } from "@/db/schema";

export async function POST() {
  const tenant =
    await db.query.tenants.findFirst();

  if (!tenant) {
    return NextResponse.json(
      {
        success: false,
        message: "No tenant found",
      },
      { status: 400 }
    );
  }

  const demoCompanies = Array.from(
    { length: 30 },
    (_, index) => ({
      customerCode: `DEMO${String(
        index + 1
      ).padStart(3, "0")}`,

      companyName: `Demo Company ${
        index + 1
      }`,

      contactPerson: `Contact ${
        index + 1
      }`,

      mobile: `98${String(
        10000000 + index
      )}`,

      email: `demo${index + 1}@crm.local`,

      city: [
        "Mumbai",
        "Pune",
        "Delhi",
        "Ahmedabad",
        "Bengaluru",
        "Chennai",
      ][index % 6],

      state: [
        "Maharashtra",
        "Maharashtra",
        "Delhi",
        "Gujarat",
        "Karnataka",
        "Tamil Nadu",
      ][index % 6],

      tenantId: tenant.id,

      isActive: true,
    })
  );

  await db
    .insert(companies)
    .values(demoCompanies);

  return NextResponse.json({
    success: true,
    inserted: demoCompanies.length,
  });
}