import { NextResponse } from "next/server";

import { apiHandler }
  from "@/lib/api/handler";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { engineersService }
  from "@/modules/engineers/service";

import { createEngineerSchema }
  from "@/modules/engineers/schemas";

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
      await engineersService.getEngineers(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    return NextResponse.json({
      success: true,
      data:
        result.engineers,
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
      createEngineerSchema.parse(
        body
      );

    const engineer =
      await engineersService.createEngineer(
        tenantId,
        data
      );

    return NextResponse.json({
      success: true,
      data: engineer,
    });
  });
}