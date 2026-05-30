import { NextResponse } from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { assetsService }
  from "@/modules/assets/service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const asset =
    await assetsService.deactivateAsset(
      tenantId,
      id
    );

  return NextResponse.json(asset);
}