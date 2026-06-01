import { auth } from "@/auth/auth";
import { sitesService } from "@/modules/sites/service";

export default async function SitesPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await sitesService.getSites(
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
          Sites
        </h1>

        <div className="text-sm text-muted-foreground">
          Total: {result.pagination.total}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          placeholder="Search sites..."
          className="w-96 rounded-md border px-3 py-2"
        />

        <a
          href="/sites/new"
          className="rounded-md border px-4 py-2"
        >
          New Site
        </a>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2">
              Code
            </th>

            <th className="text-left p-2">
              Name
            </th>

            <th className="text-left p-2">
              City
            </th>

            <th className="text-left p-2">
              State
            </th>
          </tr>
        </thead>

        <tbody>
          {result.sites.map(
            (site) => (
              <tr
                key={site.id}
                className="border-t"
              >
                <td className="p-2">
                  {site.siteCode}
                </td>

                <td className="p-2">
                  {site.siteName}
                </td>

                <td className="p-2">
                  {site.city}
                </td>

                <td className="p-2">
                  {site.state}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}