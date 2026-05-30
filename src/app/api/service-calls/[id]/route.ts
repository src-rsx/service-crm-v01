import { NextResponse }
  from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import { updateServiceCallSchema }
  from "@/modules/service-calls/schemas";

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

  const serviceCall =
    await serviceCallsService.getServiceCallById(
      tenantId,
      id
    );

  return NextResponse.json(
    serviceCall
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
    updateServiceCallSchema.parse(
      body
    );

  const serviceCall =
    await serviceCallsService.updateServiceCall(
      tenantId,
      id,
      validated
    );

  return NextResponse.json(
    serviceCall
  );
}