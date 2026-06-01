import { auth } from "@/auth/auth";

import {
  serviceCallsService,
} from "@/modules/service-calls/service";

import {
  serviceCallVisitsService,
} from "@/modules/service-call-visits/service";
import { CloseCallButton } from "@/components/service-calls/close-call-button";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceCallDetailPage(
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
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          {call.callNumber}
        </h1>

        <p className="text-muted-foreground">
          {call.subject}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Call Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

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
              Reported By:
            </strong>{" "}
            {call.reportedBy ?? "-"}
          </div>

          <div>
            <strong>
              Mobile:
            </strong>{" "}
            {call.reportedMobile ?? "-"}
          </div>

        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Visit Timeline
        </h2>

        <div className="space-y-2">

          <div>
            Assigned:
            {" "}
            {visit?.createdAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            Travel Started:
            {" "}
            {visit?.travelStartedAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            Check In:
            {" "}
            {visit?.checkInAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

          <div>
            Check Out:
            {" "}
            {visit?.checkOutAt
              ?.toLocaleString?.() ??
              "-"}
          </div>

        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Observation
        </h2>

        <p>
          {visit?.observation ??
            "No observation recorded"}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Action Taken
        </h2>

        <p>
          {visit?.actionTaken ??
            "No action recorded"}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Customer Remarks
        </h2>

        <p>
          {visit?.customerRemarks ??
            "No remarks recorded"}
        </p>
      </div>

      {call.status === "RESOLVED" && (
        <div className="border rounded-lg p-4">

            <h2 className="font-semibold mb-4">
            Service Call Closure
            </h2>

            <p className="text-muted-foreground mb-4">
            Engineer has completed the work.
            Review the details above and
            close the ticket.
            </p>

            <CloseCallButton
              id={call.id}
            />

        </div>
    )}

    {call.status === "CLOSED" && (
        <div className="border rounded-lg p-4">

            <h2 className="font-semibold">
            Ticket Closed
            </h2>

            <p className="text-muted-foreground">
            Closed on:

            {" "}

            {call.closedAt
                ? new Date(
                    call.closedAt
                ).toLocaleString()
                : "-"}
            </p>

        </div>
        )}

    </div>
  );
}