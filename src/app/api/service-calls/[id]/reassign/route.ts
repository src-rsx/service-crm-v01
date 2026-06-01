import { NextResponse } from "next/server";
import { z } from "zod";

import { requireTenant }
    from "@/lib/tenant/require-tenant";

import {
    serviceCallsService,
} from "@/modules/service-calls/service";


const schema = z.object({
  engineerId: z.string().uuid(),
  remarks: z.string().optional(),
});

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

    const body =
        await request.json();

    const data =
        schema.parse(body);

    await serviceCallsService.reassignEngineer(
        tenantId,
        id,
        data.engineerId,
        data.remarks
    );

    return NextResponse.json({
        success: true,
    });
}