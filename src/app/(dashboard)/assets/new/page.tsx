import { auth } from "@/auth/auth";

import { companiesService } from "@/modules/companies/service";
import { sitesService } from "@/modules/sites/service";

import { AssetForm } from "@/components/assets/asset-form";
import { db } from "@/db";
import { manufacturers } from "@/db/schema";

export default async function NewAssetPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error(
      "Tenant not found"
    );
  }

  const companies =
    await companiesService.getCompanies(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

  const sites =
    await sitesService.getSites(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

    const manufacturerList =
  await db
    .select()
    .from(manufacturers);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Create Asset
      </h1>

<AssetForm
  companies={
    companies.companies
  }
  sites={sites.sites}
  manufacturers={
    manufacturerList
  }
/>
    </div>
  );
}