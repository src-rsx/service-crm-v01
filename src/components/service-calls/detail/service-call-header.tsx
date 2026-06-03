import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    PriorityBadge,
} from "@/components/common/priority-badge";

import {
    StatusBadge,
} from "@/components/common/status-badge";

export function ServiceCallHeader({
    call,
}: any) {
    return (
        <Card className="shadow-sm">

            <CardContent className="p-8">

                <div className="space-y-4">

                    <div className="flex items-start justify-between">

                        <div>

                            <p
                                className="
    text-sm
    font-medium
    text-muted-foreground
  "
                            >
                                {call.callNumber}
                            </p>

                            <h1
                                className="
    text-4xl
    font-bold
    mt-2
    tracking-tight
  "
                            >
                                {call.subject}
                            </h1>

                        </div>

                        <div
                            className="
              flex
              gap-2
            "
                        >

                            <PriorityBadge
                                priority={call.priority}
                            />

                            <StatusBadge
                                status={call.status}
                            />

                        </div>

                    </div>
                    <div
                        className="
    grid
    grid-cols-3
    gap-6
    pt-6
    border-t
  "
                    >

                        <div>

                            <p
                                className="
        text-xs
        uppercase
        tracking-wide
        text-muted-foreground
      "
                            >
                                Company
                            </p>

                            <p className="font-medium mt-1">
                                {call.company?.companyName ?? "-"}
                            </p>

                        </div>

                        <div>

                            <p
                                className="
        text-xs
        uppercase
        tracking-wide
        text-muted-foreground
      "
                            >
                                Site
                            </p>

                            <p className="font-medium mt-1">
                                {call.site?.siteName ?? "-"}
                            </p>

                        </div>

                        <div>

                            <p
                                className="
        text-xs
        uppercase
        tracking-wide
        text-muted-foreground
      "
                            >
                                Asset
                            </p>

                            <p className="font-medium mt-1">
                                {call.asset?.serialNumber ?? "-"}
                            </p>

                        </div>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}