"use client";

import { Button } from "@/components/ui/button";
import {
  ServiceCall,
  ServiceCallStatus,
  VALID_TRANSITIONS,
} from "./sc-types";
import {
  UserPlus,
  Play,
  Package,
  CheckCircle,
  XCircle,
  RefreshCw,
  Printer,
} from "lucide-react";

interface SCActionBarProps {
  call: ServiceCall;
  onAssign: () => void;
  onStatusChange: (
    newStatus: ServiceCallStatus
  ) => void;
}

type ActionVariant = "default" | "outline" | "destructive" | "secondary";
type ActionConfigMap = Partial<Record<ServiceCallStatus, { label: string; icon: React.ElementType; variant: ActionVariant }>>;
const ACTION_CONFIG: ActionConfigMap = {
  ASSIGNED: {
    label: "Start Progress",
    icon: Play,
    variant: "default",
  },
  IN_PROGRESS: {
    label: "Mark Completed",
    icon: CheckCircle,
    variant: "default",
  },
  PARTS_REQUIRED: {
    label: "Resume Progress",
    icon: RefreshCw,
    variant: "outline",
  },
  COMPLETED: {
    label: "Close Call",
    icon: XCircle,
    variant: "secondary",
  },
};

export function SCActionBar({
  call,
  onAssign,
  onStatusChange,
}: SCActionBarProps) {
  const nextStatuses =
    VALID_TRANSITIONS[call.status] ?? [];

  const isAssignable =
    call.status === "LOGGED" ||
    call.status === "ASSIGNED";

  const primaryNext =
    nextStatuses.find(
      (s) => s !== "LOGGED"
    ) ?? null;

  return (
    <div className="bg-white border border-zinc-200 rounded-lg px-6 py-3 flex items-center gap-3 flex-wrap">
      {/* Assign / Reassign */}
      {isAssignable && (
        <Button
          onClick={onAssign}
          variant={
            call.assignedEngineerId
              ? "outline"
              : "default"
          }
          size="sm"
          className="gap-2"
        >
          <UserPlus size={15} />
          {call.assignedEngineerId
            ? "Reassign Engineer"
            : "Assign Engineer"}
        </Button>
      )}

      {/* Parts Required */}
      {call.status === "IN_PROGRESS" && (
        <Button
          onClick={() =>
            onStatusChange("PARTS_REQUIRED")
          }
          variant="outline"
          size="sm"
          className="gap-2 text-orange-600 border-orange-200 hover:bg-orange-50"
        >
          <Package size={15} />
          Parts Required
        </Button>
      )}

      {/* Primary next action */}
      {primaryNext &&
        ACTION_CONFIG[primaryNext] && (
          <Button
            onClick={() =>
              onStatusChange(primaryNext)
            }
            variant={
              ACTION_CONFIG[primaryNext]!
                .variant
            }
            size="sm"
            className="gap-2"
          >
            {(() => {
              const Icon =
                ACTION_CONFIG[primaryNext]!
                  .icon;
              return <Icon size={15} />;
            })()}
            {ACTION_CONFIG[primaryNext]!.label}
          </Button>
        )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Print */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-zinc-500"
        onClick={() => window.print()}
      >
        <Printer size={15} />
        Print
      </Button>
    </div>
  );
}