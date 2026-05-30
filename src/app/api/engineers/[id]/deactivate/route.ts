import { NextResponse }
  from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { engineersService }
  from "@/modules/engineers/service";

export async function PATCH(
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
    await engineersService.deactivateEngineer(
      tenantId,
      id
    );

  return NextResponse.json(
    engineer
  );
}