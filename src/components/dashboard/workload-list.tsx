import { Progress } from "@/components/ui/progress";

interface WorkloadItem {
  engineerName: string;
  activeCalls: number;
}

interface WorkloadListProps {
  engineers: WorkloadItem[];
}

export function WorkloadList({
  engineers,
}: WorkloadListProps) {
  const maxCalls =
    Math.max(
      ...engineers.map(
        (e) => e.activeCalls
      ),
      1
    );

  return (
    <div className="space-y-6">
      {engineers.map(
        (engineer, index) => {
          const percentage =
            (engineer.activeCalls /
              maxCalls) *
            100;

          return (
            <div
              key={index}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {
                      engineer.engineerName
                    }
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {
                      engineer.activeCalls
                    }{" "}
                    active call
                    {engineer.activeCalls !==
                    1
                      ? "s"
                      : ""}
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  {
                    engineer.activeCalls
                  }
                </span>
              </div>

              <Progress
                value={percentage}
              />
            </div>
          );
        }
      )}

      {engineers.length ===
        0 && (
        <div className="text-center text-muted-foreground">
          No engineer assignments found
        </div>
      )}
    </div>
  );
}