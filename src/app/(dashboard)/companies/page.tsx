import { auth } from "@/auth/auth";
import { companiesService } from "@/modules/companies/service";

import { columns } from "@/components/companies/columns";
import { DataTable } from "@/components/data-table/data-table";

import { Card, CardContent } from "@/components/ui/card";

import { CompaniesToolbar } from "@/components/companies/companies-toolbar";
import { CompaniesFooter } from "@/components/companies/companies-footer";

export default async function CompaniesPage() {
  const session = await auth();

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await companiesService.getCompanies(
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
          Companies
        </h1>

        <div className="text-sm text-muted-foreground">
          Total: {result.pagination.total}
        </div>
      </div>

      <CompaniesToolbar />

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={result.companies}
          />
        </CardContent>
      </Card>

      <CompaniesFooter
        total={result.pagination.total}
        page={result.pagination.page}
        pageSize={result.pagination.pageSize}
      />
    </div>
  );
}