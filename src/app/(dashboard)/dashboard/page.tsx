import { auth } from "@/auth/auth";

import { companiesService }
  from "@/modules/companies/service";

import { sitesService }
  from "@/modules/sites/service";

import { assetsService }
  from "@/modules/assets/service";

import { engineersService }
  from "@/modules/engineers/service";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import {
  Building2,
  MapPinned,
  Wrench,
  Users,
  ClipboardList,
  ClipboardCheck,
  UserCheck,
  UserX,
  Activity,
  CircleDashed,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const session =
    await auth();

  if (
    !session?.user?.tenantId
  ) {
    throw new Error(
      "Tenant not found"
    );
  }

  const tenantId =
    session.user.tenantId;

  const companies =
    await companiesService.getCompanies(
      tenantId,
      {
        page: 1,
        pageSize: 1,
      }
    );

  const sites =
    await sitesService.getSites(
      tenantId,
      {
        page: 1,
        pageSize: 1,
      }
    );

  const assets =
    await assetsService.getAssets(
      tenantId,
      {
        page: 1,
        pageSize: 1,
      }
    );

  const engineers =
    await engineersService.getEngineers(
      tenantId,
      {
        page: 1,
        pageSize: 1,
      }
    );

  const serviceCalls =
    await serviceCallsService.getServiceCalls(
      tenantId,
      {
        page: 1,
        pageSize: 100,
      }
    );

  const openCalls =
    serviceCalls.serviceCalls.filter(
      (call: any) =>
        call.status === "OPEN"
    ).length;

  const assignedCalls =
    serviceCalls.serviceCalls.filter(
      (call: any) =>
        call.status ===
        "ASSIGNED"
    ).length;

    const busyEngineers =
      new Set(
        serviceCalls.serviceCalls
          .filter(
            (call: any) =>
              call.assignedEngineerId
          )
          .map(
            (call: any) =>
              call.assignedEngineerId
          )
      ).size;

      const engineerWorkload =
        Object.values(
          serviceCalls.serviceCalls.reduce(
            (
              acc: any,
              call: any
            ) => {
              if (
                !call.assignedEngineerId
              ) {
                return acc;
              }

              const key =
                call.assignedEngineerId;

              if (!acc[key]) {
                acc[key] = {
                  engineerName:
                    call.engineerName ??
                    "Unknown",

                  activeCalls: 0,
                };
              }

              acc[key].activeCalls++;

              return acc;
            },
            {}
          )
        )
          .sort(
            (
              a: any,
              b: any
            ) =>
              b.activeCalls -
              a.activeCalls
          )
          .slice(0, 10);

const availableEngineers =
  engineers.pagination.total -
  busyEngineers;

  const inProgressCalls =
  serviceCalls.serviceCalls.filter(
    (call: any) =>
      call.status ===
      "IN_PROGRESS"
  ).length;

const closedCalls =
  serviceCalls.serviceCalls.filter(
    (call: any) =>
      call.status ===
      "CLOSED"
  ).length;

const avgLoad =
  busyEngineers > 0
    ? (
        assignedCalls /
        busyEngineers
      ).toFixed(1)
    : "0";

  const cards = [
    {
      title: "Companies",
      value:
        companies.pagination
          .total,
    },
    {
      title: "Sites",
      value:
        sites.pagination.total,
    },
    {
      title: "Assets",
      value:
        assets.pagination.total,
    },
    {
      title: "Engineers",
      value:
        engineers.pagination
          .total,
    },
    {
      title: "Open Calls",
      value: openCalls,
    },
    {
      title:
        "Assigned Calls",
      value:
        assignedCalls,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name}
        </h1>

        <p className="text-muted-foreground">
          Monitor companies, sites, assets,
          engineers and service calls.
        </p>
      </div>

      <div className="flex gap-4">
        <select className="border rounded-md px-3 py-2">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Companies
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {companies.pagination.total}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinned className="h-5 w-5" />
            Sites
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {sites.pagination.total}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Assets
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {assets.pagination.total}
          </div>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Engineers
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {engineers.pagination.total}
          </div>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Open Calls
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {openCalls}
          </div>
        </CardContent>
      </Card> */}

      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Assigned Calls
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="text-3xl font-bold">
            {assignedCalls}
          </div>
        </CardContent>
      </Card> */}

    </div>

    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Engineer Utilization
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Engineers
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {engineers.pagination.total}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Busy Engineers
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {busyEngineers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Available Engineers
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {availableEngineers}
            </div>
          </CardContent>
        </Card>

      </div>

    </div>

    <div className="space-y-4">

      <h2 className="text-xl font-semibold">
        Call Status Distribution
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Open
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {openCalls}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Assigned
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {assignedCalls}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              In Progress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {inProgressCalls}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Closed
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">
              {closedCalls}
            </div>
          </CardContent>
        </Card>

      </div>

    </div>

    <Card>
      <CardHeader>
        <CardTitle>
          Recent Service Calls
        </CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                Call No
              </th>

              <th className="text-left p-2">
                Subject
              </th>

              <th className="text-left p-2">
                Status
              </th>

              <th className="text-left p-2">
                Engineer
              </th>
            </tr>
          </thead>

          <tbody>
            {serviceCalls.serviceCalls
              .slice(0, 5)
              .map(
                (call: any) => (
                  <tr
                    key={call.id}
                    className="border-b"
                  >
                    <td className="p-2">
                      {
                        call.callNumber
                      }
                    </td>

                    <td className="p-2">
                      {
                        call.subject
                      }
                    </td>

                    <td className="p-2">
                      {
                        call.status
                      }
                    </td>

                    <td className="p-2">
                      {call.engineerName ??
                        "-"}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>
          Engineer Workload
        </CardTitle>
      </CardHeader>

      <CardContent>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                Engineer
              </th>

              <th className="text-left p-2">
                Active Calls
              </th>
            </tr>
          </thead>

          <tbody>
            {engineerWorkload.map(
              (
                engineer: any,
                index
              ) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-2">
                    {
                      engineer.engineerName
                    }
                  </td>

                  <td className="p-2">
                    {
                      engineer.activeCalls
                    }
                  </td>
                </tr>
              )
            )}

            {engineerWorkload.length ===
              0 && (
              <tr>
                <td
                  colSpan={2}
                  className="p-4 text-center text-muted-foreground"
                >
                  No engineer assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
  );
}