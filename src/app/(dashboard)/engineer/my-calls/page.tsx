import { auth } from "@/auth/auth";

import { serviceCallsService }
  from "@/modules/service-calls/service";

export default async function MyCallsPage() {
  const session =
    await auth();

  if (
    !session?.user?.tenantId
  ) {
    throw new Error(
      "Tenant not found"
    );
  }

  const result =
    await serviceCallsService.getServiceCalls(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

  const assignedCalls =
    result.serviceCalls.filter(
      (call: any) =>
        call.assignedEngineerId
    );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          My Calls
        </h1>

        <p className="text-muted-foreground">
          Assigned service calls
        </p>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 text-left">
              Call No
            </th>

            <th className="p-2 text-left">
              Subject
            </th>

            <th className="p-2 text-left">
              Status
            </th>

            <th className="p-2 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {assignedCalls.map(
            (call: any) => (
              <tr
                key={call.id}
                className="border-t"
              >
                <td className="p-2">
                  {call.callNumber}
                </td>

                <td className="p-2">
                  {call.subject}
                </td>

                <td className="p-2">
                  {call.status}
                </td>

                <td className="p-2">
                  <a
                    href={`/engineer/calls/${call.id}`}
                    className="text-blue-600 underline"
                  >
                    Open
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}