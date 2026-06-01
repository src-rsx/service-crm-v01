import { auth } from "@/auth/auth";

import { engineersService }
  from "@/modules/engineers/service";

import AssignEngineerForm
  from "./page-client";

export default async function AssignEngineerPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const session =
    await auth();

  if (
    !session?.user?.tenantId
  ) {
    throw new Error(
      "Tenant not found"
    );
  }

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
        Assign Engineer
      </h1>

      <AssignEngineerForm
        serviceCallId={id}
        engineers={
          engineers.engineers
        }
      />
    </div>
  );
}