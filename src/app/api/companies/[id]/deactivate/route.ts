import { NextResponse } from "next/server";
import { requireTenant } from "@/lib/tenant/require-tenant";
import { companiesService } from "@/modules/companies/service";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const company =
    await companiesService.deactivateCompany(
      tenantId,
      id
    );

  return NextResponse.json(company);
}