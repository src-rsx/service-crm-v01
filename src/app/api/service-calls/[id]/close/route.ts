import { NextResponse }
  from "next/server";

import { requireTenant }
  from "@/lib/tenant/require-tenant";

import {
  serviceCallsService,
} from "@/modules/service-calls/service";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const tenantId =
    await requireTenant();

  await serviceCallsService.updateStatus(
    tenantId,
    id,
    "CLOSED"
  );

    return NextResponse.json({
      success: true,
    });
  // return NextResponse.redirect(
  //   new URL(
  //     `/service-calls/${id}`,
  //     request.url
  //   )
  // );
}