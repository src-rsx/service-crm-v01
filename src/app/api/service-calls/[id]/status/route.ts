import { NextResponse }
  from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import { updateStatusSchema }
  from "@/modules/service-calls/schemas";

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

  const body =
    await request.json();

  const validated =
    updateStatusSchema.parse(
      body
    );

  const serviceCall =
    await serviceCallsService.updateStatus(
      tenantId,
      id,
      validated.status
    );

  return NextResponse.json(
    serviceCall
  );
}