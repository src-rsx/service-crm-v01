import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  StatusBadge,
} from "@/components/common/status-badge";

export function ServiceCallSidebar({
  call,
}: any) {
  return (
    <div className="sticky top-6 space-y-4">
      <Card>
        <CardContent className="space-y-6 p-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Assigned Engineer
            </h4>

            <p className="mt-1 font-medium">
              {call.assignedEngineer?.name ?? "-"}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Status
            </h4>

            <div className="mt-1">
              <StatusBadge status={call.status} />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Key Dates
            </h4>

            <div className="mt-2 space-y-1 text-sm">
              <div>
                Opened:
                {" "}
                {call.openedAt?.toLocaleString()}
              </div>

              <div>
                Updated:
                {" "}
                {call.updatedAt?.toLocaleString()}
              </div>

              <div>
                Closed:
                {" "}
                {call.closedAt
                  ? new Date(
                    call.closedAt
                  ).toLocaleString()
                  : "-"
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}