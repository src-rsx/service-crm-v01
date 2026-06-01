import { auth } from "@/auth/auth";

import { companiesService } from "@/modules/companies/service";

import { SiteForm } from "@/components/sites/site-form";

export default async function NewSitePage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error(
      "Tenant not found"
    );
  }

  const result =
    await companiesService.getCompanies(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Create Site
      </h1>

      <SiteForm
        companies={
          result.companies
        }
      />
    </div>
  );
}