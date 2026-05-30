import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/api/handler";
import { requireTenant } from "@/lib/tenant/require-tenant";
import { companiesService } from "@/modules/companies/service";
import { createCompanySchema } from "@/modules/companies/schemas";

export async function GET(
  request: Request
) {
  return apiHandler(async () => {
    const tenantId =
      await requireTenant();

    const { searchParams } =
      new URL(request.url);

    const page = Number(
      searchParams.get("page") ?? "1"
    );

    const pageSize = Math.min(
      Number(
        searchParams.get("pageSize") ?? "20"
      ),
      100
    );

    const search =
      searchParams.get("search") ?? "";

    const result =
      await companiesService.getCompanies(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    return NextResponse.json({
      success: true,
      data: result.companies,
      pagination:
        result.pagination,
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