import { auth } from "@/auth/auth";

import { companiesService }
  from "@/modules/companies/service";

import { sitesService }
  from "@/modules/sites/service";

import { assetsService }
  from "@/modules/assets/service";

import { ServiceCallForm }
  from "@/components/service-calls/service-call-form";

import {
  engineersService,
} from "@/modules/engineers/service";

export default async function NewServiceCallPage() {
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

  const assets =
    await assetsService.getAssets(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );
  
  const engineers =
    await engineersService.getEngineers(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Create Service Call
      </h1>

      <ServiceCallForm
        companies={
          companies.companies
        }
        sites={sites.sites}
        assets={assets.assets}
        engineers={engineers.engineers}
      />
    </div>
  );
}