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
    await serviceCallVisitsService.saveCustomerRemarks(
      id,
      body.customerName ?? "",
      body.customerMobile ?? "",
      body.customerRemarks ?? ""
    );

  return NextResponse.json(
    visit
  );
}