import { NextResponse } from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { assetsService }
  from "@/modules/assets/service";

import { updateAssetSchema }
  from "@/modules/assets/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const asset =
    await assetsService.getAssetById(
      tenantId,
      id
    );

  return NextResponse.json(asset);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const body =
    await request.json();

  const validated =
    updateAssetSchema.parse(body);

  const asset =
    await assetsService.updateAsset(
      tenantId,
      id,
      validated
    );

  return NextResponse.json(asset);
}