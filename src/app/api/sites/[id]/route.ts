import { NextResponse } from "next/server";

import { requireTenant } from "@/lib/tenant/require-tenant";

import { sitesService } from "@/modules/sites/service";

import { updateSiteSchema }
  from "@/modules/sites/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const site =
    await sitesService.getSiteById(
      tenantId,
      id
    );

  return NextResponse.json(site);
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
    updateSiteSchema.parse(body);

  const site =
    await sitesService.updateSite(
      tenantId,
      id,
      validated
    );

  return NextResponse.json(site);
}