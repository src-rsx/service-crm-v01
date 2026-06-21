import { NextResponse } from "next/server";
import { requireTenant } from "@/lib/tenant/require-tenant";
import { serviceCallVisitsService } from "@/modules/service-call-visits/service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;
  const tenantId = await requireTenant();

  const visit =
    await serviceCallVisitsService.getLatestVisit(
      tenantId,
      id
    );

  return NextResponse.json({
    success: true,
    data: visit ?? null,
  });
}