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
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const body =
    await request.json();

  const visit =
    await serviceCallVisitsService.saveWorkNotes(
      id,
      body.observation ?? "",
      body.actionTaken ?? ""
    );

  return NextResponse.json(
    visit
  );
}