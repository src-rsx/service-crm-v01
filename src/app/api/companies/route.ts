import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/api/handler";
import { requireTenant } from "@/lib/tenant/require-tenant";
import { companiesService } from "@/modules/companies/service";
import { createCompanySchema } from "@/modules/companies/schemas";

export async function GET() {
  return apiHandler(async () => {
    const tenantId =
      await requireTenant();

    const companies =
      await companiesService.getCompanies(
        tenantId
      );

    return NextResponse.json({
      success: true,
      data: companies,
    });
  });
}

export async function POST(
  request: Request
) {
  return apiHandler(async () => {
    const tenantId =
      await requireTenant();

    const body =
      await request.json();

    const data =
      createCompanySchema.parse(body);

    const company =
      await companiesService.createCompany(
        tenantId,
        data
      );

    return NextResponse.json({
      success: true,
      data: company,
    });
  });
}