import { auth } from "@/auth/auth";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import { serviceCallVisitsService }
  from "@/modules/service-call-visits/service";

import {
  VisitActions,
} from "@/components/service-call-visits/visit-actions";

import {
  WorkNotesForm,
} from "@/components/service-call-visits/work-notes-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EngineerCallPage(
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
    await serviceCallVisitsService.getLatestVisit(
      session.user.tenantId,
      id
    );

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          {call.callNumber}
        </h1>

        <p className="text-muted-foreground">
          {call.subject}
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Visit Status
        </h2>

        <div>
          Current Status:
          <strong>
            {" "}
            {visit?.status}
          </strong>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Timeline
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
          Engineer Actions
        </h2>

        <VisitActions
        visitId={visit?.id ?? ""}
        status={
            visit?.status ??
            "ASSIGNED"
        }
        />
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-4">
          Work Notes
        </h2>

        <WorkNotesForm
          visitId={visit?.id ?? ""}
        />
      </div>

    </div>
  );
}