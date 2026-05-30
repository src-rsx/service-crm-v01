import { NextResponse } from "next/server";

import { requireTenant } from "@/lib/tenant/require-tenant";

import { sitesService } from "@/modules/sites/service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const site =
    await sitesService.deactivateSite(
      tenantId,
      id
    );

  return NextResponse.json(site);
}