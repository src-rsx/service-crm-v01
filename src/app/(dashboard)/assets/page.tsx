import { auth } from "@/auth/auth";

import { assetsService } from "@/modules/assets/service";

export default async function AssetsPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await assetsService.getAssets(
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
          Assets
        </h1>

        <div className="text-sm text-muted-foreground">
          Total: {result.pagination.total}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <input
          placeholder="Search assets..."
          className="w-96 rounded-md border px-3 py-2"
        />

        <a
          href="/assets/new"
          className="rounded-md border px-4 py-2"
        >
          New Asset
        </a>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2">
              Asset Code
            </th>

            <th className="text-left p-2">
              Asset Name
            </th>

            <th className="text-left p-2">
              Equipment Type
            </th>

            <th className="text-left p-2">
              Model
            </th>

            <th className="text-left p-2">
              Serial Number
            </th>
          </tr>
        </thead>

        <tbody>
          {result.assets.map(
            (asset: any) => (
              <tr
                key={asset.id}
                className="border-t"
              >
                <td className="p-2">
                  {asset.assetCode}
                </td>

                <td className="p-2">
                  {asset.assetName}
                </td>

                <td className="p-2">
                  {asset.equipmentType}
                </td>

                <td className="p-2">
                  {asset.model}
                </td>

                <td className="p-2">
                  {asset.serialNumber}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}