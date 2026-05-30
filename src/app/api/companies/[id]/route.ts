import { NextResponse } from "next/server";
import { requireTenant } from "@/lib/tenant/require-tenant";
import { companiesService } from "@/modules/companies/service";
import { updateCompanySchema } from "@/modules/companies/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const { id } = await params;

  const tenantId =
    await requireTenant();

  const company =
    await companiesService.getCompanyById(
      tenantId,
      id
    );

  return NextResponse.json(company);
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
    updateCompanySchema.parse(body);

  const company =
    await companiesService.updateCompany(
      tenantId,
      id,
      validated
    );

  return NextResponse.json(company);
}