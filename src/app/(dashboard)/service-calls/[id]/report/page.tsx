import { auth } from "@/auth/auth";

import {
  serviceCallsService,
} from "@/modules/service-calls/service";

import {
  serviceCallVisitsService,
} from "@/modules/service-call-visits/service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceReportPage(
  { params }: Props
) {
  const { id } =
    await params;

  const session =
    await auth();

  if (
    !session?.user?.tenantId
  ) {
    throw new Error(
      "Tenant not found"
    );
  }

  const call =
    await serviceCallsService.getServiceCallById(
      session.user.tenantId,
      id
    );

  const visit =
    await serviceCallVisitsService.getVisitByServiceCall(
      session.user.tenantId,
      id
    );

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Service Report
        </h1>

        <button
          onClick={() =>
            window.print()
          }
          className="border rounded-md px-4 py-2"
        >
          Print
        </button>
      </div>

      <div className="border rounded-lg p-6">

        <h2 className="font-semibold text-lg mb-4">
          Call Details
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <strong>
              Call Number:
            </strong>{" "}
            {call.callNumber}
          </div>

          <div>
            <strong>
              Status:
            </strong>{" "}
            {call.status}
          </div>

          <div>
            <strong>
              Priority:
            </strong>{" "}
            {call.priority}
          </div>

          <div>
            <strong>
              Subject:
            </strong>{" "}
            {call.subject}
          </div>

        </div>
      </div>

      <div className="border rounded-lg p-6">

        <h2 className="font-semibold text-lg mb-4">
          Visit Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <strong>
              Travel Started:
            </strong>{" "}
            {visit?.travelStartedAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            <strong>
              Check In:
            </strong>{" "}
            {visit?.checkInAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            <strong>
              Check Out:
            </strong>{" "}
            {visit?.checkOutAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            <strong>
              Visit Status:
            </strong>{" "}
            {visit?.status}
          </div>

        </div>

      </div>

      <div className="border rounded-lg p-6">

        <h2 className="font-semibold text-lg mb-4">
          Observation
        </h2>

        <p>
          {visit?.observation ??
            "-"}
        </p>

      </div>

      <div className="border rounded-lg p-6">

        <h2 className="font-semibold text-lg mb-4">
          Action Taken
        </h2>

        <p>
          {visit?.actionTaken ??
            "-"}
        </p>

      </div>

      <div className="border rounded-lg p-6">

        <h2 className="font-semibold text-lg mb-4">
          Customer Feedback
        </h2>

        <div className="space-y-3">

          <div>
            <strong>
              Customer Name:
            </strong>{" "}
            {visit?.customerName ??
              "-"}
          </div>

          <div>
            <strong>
              Customer Mobile:
            </strong>{" "}
            {visit?.customerMobile ??
              "-"}
          </div>

          <div>
            <strong>
              Remarks:
            </strong>{" "}
            {visit?.customerRemarks ??
              "-"}
          </div>

        </div>

      </div>

    </div>
  );
}