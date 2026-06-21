"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  ChevronDown,
} from "lucide-react";

interface SCActionBarProps {
  call: ServiceCall;
  onAssign: () => void;
  onStatusChange: (
    newStatus: ServiceCallStatus,
    remarks?: string
  ) => void;
}

// Coordinator outcome options shown after engineer checks out
const OUTCOME_OPTIONS: {
  value: ServiceCallStatus;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "RESOLVED",
    label: "Mark Resolved",
    description: "Work is complete. Pending final closure.",
    color: "text-green-700",
  },
  {
    value: "PARTS_REQUIRED",
    label: "Parts Required",
    description: "Need to order parts before next visit.",
    color: "text-orange-600",
  },
  {
    value: "IN_PROGRESS",
    label: "Revisit Required",
    description: "Engineer needs to return for another visit.",
    color: "text-blue-600",
  },
];

export function SCActionBar({
  call,
  onAssign,
  onStatusChange,
}: SCActionBarProps) {
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] =
    useState<ServiceCallStatus | null>(null);
  const [remarks, setRemarks] = useState("");

  const isAssignable =
    call.status === "LOGGED" ||
    call.status === "ASSIGNED" ||
    call.status === "IN_PROGRESS" ||
    call.status === "PARTS_REQUIRED";

  const showOutcomeButton =
    call.status === "IN_PROGRESS" ||
    call.status === "PARTS_REQUIRED";

  const showResolveClose =
    call.status === "RESOLVED";

  const showClose =
    call.status === "COMPLETED";

  function handleOutcomeConfirm() {
    if (!selectedOutcome) return;
    onStatusChange(selectedOutcome, remarks);
    setOutcomeOpen(false);
    setSelectedOutcome(null);
    setRemarks("");
  }

  return (
    <>
      <div className="bg-white border border-zinc-200 rounded-lg px-6 py-3 flex items-center gap-3 flex-wrap">

        {/* Assign / Reassign */}
        {isAssignable && (
          <Button
            onClick={onAssign}
            variant={call.assignedEngineerId ? "outline" : "default"}
            size="sm"
            className="gap-2"
          >
            <UserPlus size={15} />
            {call.assignedEngineerId
              ? "Reassign Engineer"
              : "Assign Engineer"}
          </Button>
        )}

        {/* Start Progress — only when ASSIGNED */}
        {call.status === "ASSIGNED" && (
          <Button
            onClick={() => onStatusChange("IN_PROGRESS")}
            variant="default"
            size="sm"
            className="gap-2"
          >
            <Play size={15} />
            Start Progress
          </Button>
        )}

        {/* Outcome dropdown — when IN_PROGRESS or PARTS_REQUIRED */}
        {showOutcomeButton && (
          <Button
            onClick={() => setOutcomeOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <ChevronDown size={15} />
            Update Outcome
          </Button>
        )}

        {/* Close Call — when RESOLVED */}
        {showResolveClose && (
          <Button
            onClick={() => {
              setSelectedOutcome("CLOSED");
              setOutcomeOpen(true);
            }}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <XCircle size={15} />
            Close Call
          </Button>
        )}

        {/* Close Call — when COMPLETED */}
        {showClose && (
          <Button
            onClick={() => onStatusChange("CLOSED")}
            variant="secondary"
            size="sm"
            className="gap-2"
          >
            <XCircle size={15} />
            Close Call
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

      {/* Outcome Dialog */}
      <Dialog open={outcomeOpen} onOpenChange={setOutcomeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedOutcome === "CLOSED"
                ? "Close Service Call"
                : "Update Call Outcome"}
            </DialogTitle>
          </DialogHeader>

          {selectedOutcome !== "CLOSED" && (
            <div className="space-y-2 mt-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-3">
                Select Outcome
              </p>
              {OUTCOME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedOutcome(option.value)}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                    selectedOutcome === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  <p className={`text-sm font-medium ${option.color}`}>
                    {option.label}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>
          )}

          <div className="mt-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-1.5">
              {selectedOutcome === "CLOSED"
                ? "Closing Remarks"
                : "Remarks (optional)"}
            </p>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={
                selectedOutcome === "CLOSED"
                  ? "Add closing remarks..."
                  : "Add context for this outcome..."
              }
              rows={3}
              className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <DialogFooter className="mt-2">
            <Button
              variant="outline"
              onClick={() => {
                setOutcomeOpen(false);
                setSelectedOutcome(null);
                setRemarks("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleOutcomeConfirm}
              disabled={
                selectedOutcome !== "CLOSED" &&
                !selectedOutcome
              }
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}