import { auth } from "@/auth/auth";

import { serviceCallsService }
  from "@/modules/service-calls/service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  StatusBadge,
} from "@/components/common/status-badge";

import {
  PriorityBadge,
} from "@/components/common/priority-badge";

import {
  Search,
  Plus,
  X,
} from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export default async function ServiceCallsPage({
  searchParams,
}: Props) {
  const session = await auth();

  const params =
    await searchParams;

  const search =
    params.search ?? "";

  const page =
    Number(params.page ?? "1");

  if (!session?.user?.tenantId) {
    throw new Error("Tenant not found");
  }

  const result =
    await serviceCallsService.getServiceCalls(
      session.user.tenantId,
      {
        page: 1,
        pageSize: 20,
        search,
      }
    );

  const stats =
    await serviceCallsService.getStats(
      session.user.tenantId
    );

  return (
    <div className="space-y-1">

      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex gap-3 text-sm flex-wrap">
            <div>
              <span className="
inline-flex
items-center
rounded-full
bg-sky-100
text-sky-700
px-4
py-2
text-sm
font-bold
">
                Logged
                {" "}
                {stats.open}
              </span>

            </div>

            <div>
              <span className="
inline-flex
items-center
rounded-full
bg-amber-100
text-amber-700
px-4
py-2
text-sm
font-bold
">
                Assigned
                {" "}
                {stats.assigned}
              </span>
            </div>

            <div>
              <span className="
inline-flex
items-center
rounded-full
bg-violet-100
text-violet-700
px-4
py-2
text-sm
font-bold
">
                In Progress
                {" "}
                {stats.inProgress}
              </span>
            </div>

            <div>
              <span className="
inline-flex
items-center
rounded-full
bg-emerald-100
text-emerald-700
px-4
py-2
text-sm
font-bold
">
                Resolved
                {" "}
                {stats.resolved}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <form
              method="GET"
              className="flex gap-2"
            >
              <input
                type="hidden"
                name="page"
                value="1"
              />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search call no, company, mobile, issue..."
                className="
      w-96
      rounded-md
      border
      px-3
      py-2
    "
              />

              <Button type="submit">

                <Search className="h-4 w-4 mr-2" />

                Search

              </Button>

              {search && (
                <Button
                  variant="outline"
                  asChild
                >
                  <Link href="/service-calls">
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Link>
                </Button>
              )}
            </form>

            <Button
              asChild
              className=""
              size="default"
            >
              <Link href="/service-calls/new">

                <Plus className="h-4 w-4 mr-2" />

                New Call

              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {search && (
        <div className="text-sm text-muted-foreground">
          Showing results for:
          <span className="ml-1 font-medium text-foreground">
            "{search}"
          </span>
        </div>
      )}

      <Card>
        <CardContent className="p-0 hover:bg-muted/30">
          <table className="w-full border">
            <thead className="sticky top-0 bg-slate-200 border-b-2">
              <tr>
                <th className="text-left p-2 font-semibold">
                  Call No
                </th>

                <th className="text-left p-2 font-semibold">
                  Company
                </th>

                <th className="text-left p-2 font-semibold">
                  Site
                </th>

                <th className="text-left p-2 font-semibold">
                  Asset
                </th>

                <th className="text-left p-2 font-semibold">
                  Issue
                </th>

                <th className="text-left p-2 font-semibold">
                  Priority
                </th>

                <th className="text-left p-2 font-semibold">
                  Status
                </th>

                <th className="text-left p-2 font-semibold">
                  Engineer
                </th>

                <th className="text-left p-2 font-semibold">
                  Created
                </th>

                <th className="text-left p-2 font-semibold">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>
              {result.serviceCalls.map(
                (call: any, index) => (
                  <tr
                    key={call.id}
                    className={`
 border-t
 transition-colors

 ${index % 2 === 0
                        ? "bg-white"
                        : "bg-slate-50"
                      }

 hover:bg-blue-100
`}
                  >
                    <td className="p-2">
                      {call.callNumber}
                    </td>

                    <td className="p-2">
                      {call.companyName ?? "-"}
                    </td>

                    <td className="p-2">
                      {call.siteName ?? "-"}
                    </td>

                    <td className="p-2">
                      {call.assetSerialNumber ?? "-"}
                    </td>

                    <td
                      className="
 p-2
 max-w-[250px]
 truncate
 "
                    >
                      {call.subject}
                    </td>

                    <td className="p-2">
                      <PriorityBadge
                        priority={call.priority}
                      />
                    </td>

                    <td className="p-2">
                      <StatusBadge
                        status={call.status}
                      />
                    </td>

                    <td className="p-2">
                      {call.engineerName ?? "-"}
                    </td>

                    <td className="p-2">
                      {new Date(
                        call.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-2">
                      <a
                        href={`/service-calls/${call.id}`}
                        className="
    text-blue-600
    hover:text-blue-800
    hover:underline
    font-medium
  "
                      >
                        Open →
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {page > 1 && (
            <a
              href={`/service-calls?page=${page - 1
                }${search
                  ? `&search=${encodeURIComponent(search)}`
                  : ""
                }`}
              className="
          rounded-md
          border
          px-4
          py-2
          text-sm
        "
            >
              Previous
            </a>
          )}

          <div className="text-sm text-muted-foreground">
            Page {page} of{" "}
            {result.pagination.totalPages}
          </div>

          {page <
            result.pagination.totalPages && (
              <a
                href={`/service-calls?page=${page + 1
                  }${search
                    ? `&search=${encodeURIComponent(search)}`
                    : ""
                  }`}
                className="
          rounded-md
          border
          px-4
          py-2
          text-sm
        "
              >
                Next
              </a>
            )}

        </div>

      </div>

      <div className="text-sm text-muted-foreground">

        {result.pagination.total === 0
          ? "No records found"
          : `Showing ${(page - 1) *
          result.pagination.pageSize +
          1
          } - ${Math.min(
            page *
            result.pagination.pageSize,
            result.pagination.total
          )} of ${result.pagination.total
          }`}

      </div>
    </div>
  );
}