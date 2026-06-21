import { ServiceCall, ServiceCallStatus, STATUS_CONFIG } from "./sc-types";
import { Check } from "lucide-react";

const PROGRESS_STEPS: ServiceCallStatus[] = [
  "LOGGED",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];
const STEP_LABELS: Record<string, string> = {
  LOGGED: "Logged",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  PARTS_REQUIRED: "Parts Required",
  COMPLETED: "Completed",
  CLOSED: "Closed",
};

interface SCProgressTrackerProps {
  call: ServiceCall;
}

export function SCProgressTracker({
  call,
}: SCProgressTrackerProps) {
  const steps =
    call.status === "PARTS_REQUIRED"
      ? [
          "LOGGED",
          "ASSIGNED",
          "IN_PROGRESS",
          "PARTS_REQUIRED",
          "COMPLETED",
          "CLOSED",
        ]
      : PROGRESS_STEPS;

  const currentIndex = steps.indexOf(
    call.status
  );

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-6">
        Service Progress
      </p>

      <div className="flex items-center">
        {steps.map((step, index) => {
          const isDone =
            index < currentIndex;
          const isCurrent =
            index === currentIndex;
          const isPending =
            index > currentIndex;

          const isPartsStep =
            step === "PARTS_REQUIRED";

          return (
            <div
              key={step}
              className="flex items-center flex-1 last:flex-none"
            >
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    border-2 transition-all
                    ${
                      isDone
                        ? "bg-blue-600 border-blue-600"
                        : isCurrent
                          ? isPartsStep
                            ? "bg-orange-500 border-orange-500"
                            : "bg-blue-600 border-blue-600"
                          : "bg-white border-zinc-200"
                    }
                  `}
                >
                  {isDone ? (
                    <Check
                      size={14}
                      className="text-white"
                    />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-zinc-300" />
                  )}
                </div>

                <span
                  className={`text-xs font-medium text-center leading-tight max-w-16 ${
                    isDone
                      ? "text-blue-600"
                      : isCurrent
                        ? isPartsStep
                          ? "text-orange-600"
                          : "text-blue-700"
                        : "text-zinc-400"
                  }`}
                >
                  {STEP_LABELS[step]}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mb-5 ${
                    index < currentIndex
                      ? "bg-blue-600"
                      : "bg-zinc-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}