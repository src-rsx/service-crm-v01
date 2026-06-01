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
  Plus,
  Wrench,
  Users,
  ClipboardList,
  ClipboardCheck,
  UserCheck,
  MapPinned,
  UserX,
  Activity,
  CircleDashed,
  CheckCircle2,
  UserRoundCheck,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActionCard } from "@/components/dashboard/action-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { WorkloadList }
  from "@/components/dashboard/workload-list";


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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {session.user.name}
        </h1>

        <p className="text-muted-foreground text-base mt-2">
          Track service calls, engineer activity,
          assets and customer sites from a single dashboard.
        </p>
      </div>

      <div className="flex gap-4">
        <select className="border rounded-md px-3 py-2">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
        </select>
      </div>

      {/* HERO KPI ROW */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Open Calls"
          value={openCalls}
          icon={ClipboardList}
          accent="border-l-amber-500"
          description="Requires attention"
        />

        <MetricCard
          title="Assigned Calls"
          value={assignedCalls}
          icon={UserCheck}
          accent="border-l-blue-500"
          description="Allocated to engineers"
        />

        <MetricCard
          title="Engineers"
          value={engineers.pagination.total}
          icon={Users}
          accent="border-l-emerald-500"
          description="Available workforce"
        />

        <MetricCard
          title="Assets"
          value={assets.pagination.total}
          icon={Wrench}
          accent="border-l-violet-500"
          description="Installed equipment"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Quick Actions
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <ActionCard
              title="Create Service Call"
              description="Create and assign a new service request"
              href="/service-calls/new"
              icon={ClipboardList}
            />

            <ActionCard
              title="Add Asset"
              description="Register customer equipment"
              href="/assets/new"
              icon={Wrench}
            />

            <ActionCard
              title="Add Site"
              description="Create a new customer location"
              href="/sites/new"
              icon={MapPinned}
            />

            <ActionCard
              title="Add Engineer"
              description="Onboard field engineers"
              href="/engineers/new"
              icon={Users}
            />

          </div>
        </CardContent>
      </Card>

      {/* TABLES */}

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>
              Recent Service Calls
            </CardTitle>
          </CardHeader>

          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="
border-b
hover:bg-muted/50
transition-colors
">
                  <th className="p-2 text-left">
                    Call No
                  </th>

                  <th className="p-2 text-left">
                    Subject
                  </th>

                  <th className="p-2 text-left">
                    Status
                  </th>

                  <th className="p-2 text-left">
                    Engineer
                  </th>
                </tr>
              </thead>

              <tbody>
                {serviceCalls.serviceCalls
                  .slice(0, 5)
                  .map((call: any) => (
                    <tr
                      key={call.id}
                      className="
border-b
hover:bg-muted/50
transition-colors
"
                    >
                      <td className="p-2">
                        {call.callNumber}
                      </td>

                      <td className="p-2">
                        {call.subject}
                      </td>

                      <td className="p-2">
                        <StatusBadge
                          status={call.status}
                        />
                      </td>

                      <td className="p-2">
                        {call.engineerName ?? "-"}
                      </td>
                    </tr>
                  ))}
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
            <WorkloadList
              engineers={
                engineerWorkload as any[]
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}