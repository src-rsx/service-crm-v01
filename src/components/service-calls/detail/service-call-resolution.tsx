import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServiceCallResolution({
  visit,
}: any) {
  return (
  <div className="space-y-6">

    <h2 className="text-xl font-semibold">
      Resolution Details
    </h2>

    <div className="grid gap-4 md:grid-cols-2">

      <Card>
        <CardContent className="p-4">
          <p className="font-medium">
            Observation
          </p>

          <p className="text-muted-foreground">
            {visit?.observation ??
              "Not recorded"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-medium">
            Action Taken
          </p>

          <p className="text-muted-foreground">
            {visit?.actionTaken ??
              "Not recorded"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-medium">
            Root Cause
          </p>

          <p className="text-muted-foreground">
            {visit?.rootCause ??
              "Not recorded"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-medium">
            Parts Used
          </p>

          <p className="text-muted-foreground">
            {visit?.partsUsed ??
              "Not recorded"}
          </p>
        </CardContent>
      </Card>

    </div>

    <Card className="mt-4">
      <CardContent className="p-4">
        <p className="font-medium">
          Customer Remarks
        </p>

        <p className="text-muted-foreground">
          {visit?.customerRemarks ??
            "Not recorded"}
        </p>
      </CardContent>
    </Card>

  </div>
);
}