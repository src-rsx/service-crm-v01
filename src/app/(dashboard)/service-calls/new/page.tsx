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
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="space-y-8">
      <div>
<Card>
  <CardContent className="py-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Create Service Call
        </h1>

        <p className="mt-2 text-muted-foreground">
          Capture customer issues, identify equipment,
          and dispatch engineers efficiently.
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-muted-foreground">
          Initial Status
        </p>

        <div className="
          mt-1
          inline-flex
          rounded-full
          border
          px-3
          py-1
          text-sm
          font-medium
        ">
          LOGGED
        </div>
      </div>
    </div>
  </CardContent>
</Card>
      </div>

      <ServiceCallForm
        companies={companies.companies}
        sites={sites.sites}
        assets={assets.assets}
        engineers={engineers.engineers}
      />
    </div>
  );
}