import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/api/handler";
import { requireTenant } from "@/lib/tenant/require-tenant";

import { assetsService }
  from "@/modules/assets/service";

import { createAssetSchema }
  from "@/modules/assets/schemas";

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
      await assetsService.getAssets(
        tenantId,
        {
          page,
          pageSize,
          search,
        }
      );

    return NextResponse.json({
      success: true,
      data: result.assets,
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
      createAssetSchema.parse(body);

    const asset =
      await assetsService.createAsset(
        tenantId,
        data
      );

    return NextResponse.json({
      success: true,
      data: asset,
    });
  });
}