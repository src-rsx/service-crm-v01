import { auth } from "@/auth/auth";

import { engineersService } from "@/modules/engineers/service";

export default async function EngineersPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await engineersService.getEngineers(
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
          Engineers
        </h1>

        <div className="text-sm text-muted-foreground">
          Total: {result.pagination.total}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          placeholder="Search engineers..."
          className="w-96 rounded-md border px-3 py-2"
        />

        <a
          href="/engineers/new"
          className="rounded-md border px-4 py-2"
        >
          New Engineer
        </a>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2">
              Employee Code
            </th>

            <th className="text-left p-2">
              Name
            </th>

            <th className="text-left p-2">
              Mobile
            </th>

            <th className="text-left p-2">
              Email
            </th>

            <th className="text-left p-2">
              Designation
            </th>
          </tr>
        </thead>

        <tbody>
          {result.engineers.map(
            (engineer) => (
              <tr
                key={engineer.id}
                className="border-t"
              >
                <td className="p-2">
                  {engineer.employeeCode}
                </td>

                <td className="p-2">
                  {engineer.name}
                </td>

                <td className="p-2">
                  {engineer.mobile}
                </td>

                <td className="p-2">
                  {engineer.email}
                </td>

                <td className="p-2">
                  {engineer.designation}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}