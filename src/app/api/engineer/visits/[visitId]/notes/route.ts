import { NextResponse }
  from "next/server";

import {
  serviceCallVisitsService,
} from "@/modules/service-call-visits/service";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      visitId: string;
    }>;
  }
) {
  const { visitId } =
    await params;

  const body =
    await request.json();

  const visit =
    await serviceCallVisitsService.saveNotes(
      visitId,
      body
    );

  return NextResponse.json(
    visit
  );
}