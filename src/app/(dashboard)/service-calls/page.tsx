import { auth } from "@/auth/auth";

import { serviceCallsService }
  from "@/modules/service-calls/service";

export default async function ServiceCallsPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await serviceCallsService.getServiceCalls(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 20,
      }
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Service Calls
        </h1>

        <div className="text-sm text-muted-foreground">
          Total: {result.pagination.total}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          placeholder="Search service calls..."
          className="w-96 rounded-md border px-3 py-2"
        />

        <a
          href="/service-calls/new"
          className="rounded-md border px-4 py-2"
        >
          New Service Call
        </a>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2">
              Call No
            </th>

            <th className="text-left p-2">
              Subject
            </th>

            <th className="text-left p-2">
              Priority
            </th>

            <th className="text-left p-2">
              Status
            </th>

            <th className="text-left p-2">
              Engineer
            </th>

            <th className="text-left p-2">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {result.serviceCalls.map(
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
                  {call.priority}
                </td>

                <td className="p-2">
                  <span className="rounded-md border px-2 py-1 text-xs">
                    {call.status}
                  </span>
                </td>

                <td className="p-2">
                  {call.engineerName ??
                    "-"}
                </td>

                <td className="p-2 space-x-3">

                  <a
                    href={`/service-calls/${call.id}`}
                    className="text-blue-600 underline"
                  >
                    View
                  </a>

                  {call.status === "OPEN" && (
                    <a
                      href={`/service-calls/${call.id}/assign`}
                      className="text-green-600 underline"
                    >
                      Assign
                    </a>
                  )}

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}