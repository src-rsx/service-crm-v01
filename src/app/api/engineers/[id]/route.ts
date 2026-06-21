import { NextResponse }
  from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { engineersService }
  from "@/modules/engineers/service";

import { updateEngineerSchema }
  from "@/modules/engineers/schemas";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
): Promise<Response> {
  const { id } =
    await params;

  const tenantId =
    await requireTenant();

  const engineer =
    await engineersService.getEngineerById(
      tenantId,
      id
    );

  return NextResponse.json(
    engineer
  );
}

export async function PUT(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
): Promise<Response> {
  const { id } =
    await params;

  const tenantId =
    await requireTenant();

  const body =
    await request.json();

  const validated =
    updateEngineerSchema.parse(
      body
    );

  const engineer =
    await engineersService.updateEngineer(
      tenantId,
      id,
      validated
    );

  return NextResponse.json(
    engineer
  );
}