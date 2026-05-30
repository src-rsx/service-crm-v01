import { NextResponse } from "next/server";

import { apiHandler } from "@/lib/api/handler";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import { createServiceCallSchema }
  from "@/modules/service-calls/schemas";

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
      await serviceCallsService.getServiceCalls(
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
        result.serviceCalls,
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
      createServiceCallSchema.parse(
        body
      );

    const serviceCall =
      await serviceCallsService.createServiceCall(
        tenantId,
        data
      );

    return NextResponse.json({
      success: true,
      data: serviceCall,
    });
  });
}