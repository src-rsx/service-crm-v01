import { NextResponse }
  from "next/server";

import {
  serviceCallVisitsService,
} from "@/modules/service-call-visits/service";

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

  const visit =
    await serviceCallVisitsService.checkOut(
      id
    );

  return NextResponse.json(
    visit
  );
}