"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiGetList, apiPatch } from "@/lib/api/client";
import { Engineer } from "./sc-types";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, AlertCircle } from "lucide-react";

interface AssignEngineerDialogProps {
  open: boolean;
  onClose: () => void;
  serviceCallId: string;
  currentEngineerId: string | null;
  onAssigned: () => void;
}

export function AssignEngineerDialog({
  open,
  onClose,
  serviceCallId,
  currentEngineerId,
  onAssigned,
}: AssignEngineerDialogProps) {
  const isReassign = !!currentEngineerId;

  const [engineers, setEngineers] =
    useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] =
    useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setSelected(null);
    setReason("");
    setError("");
    apiGetList<Engineer>("/api/engineers", {
      pageSize: 100,
    })
      .then((res) => setEngineers(res.data))
      .finally(() => setLoading(false));
  }, [open]);

  function validate() {
    if (!selected) {
      setError("Please select an engineer.");
      return false;
    }
    if (isReassign && !reason.trim()) {
      setError("Reason is required when reassigning.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleConfirm() {
    if (!validate()) return;
    setSaving(true);
    try {
      if (isReassign) {
        await apiPatch(
          `/api/service-calls/${serviceCallId}/reassign`,
          { engineerId: selected, remarks: reason }
        );
      } else {
        await apiPatch(
          `/api/service-calls/${serviceCallId}/assign`,
          { engineerId: selected }
        );
      }
      onAssigned();
      onClose();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to assign engineer"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isReassign
              ? "Reassign Engineer"
              : "Assign Engineer"}
          </DialogTitle>
        </DialogHeader>

        {/* Engineer list */}
        <div className="mt-2 max-h-56 overflow-y-auto space-y-1.5">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))
          ) : engineers.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-6">
              No active engineers found.
            </p>
          ) : (
            engineers
              .filter((e) => e.id !== currentEngineerId)
              .map((eng) => (
                <button
                  key={eng.id}
                  onClick={() => {
                    setSelected(eng.id);
                    setError("");
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md border text-left transition-colors ${
                    selected === eng.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-800">
                      {eng.name}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {eng.designation ?? "Engineer"}
                      {eng.employeeCode &&
                        ` · ${eng.employeeCode}`}
                    </p>
                  </div>
                  {selected === eng.id && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))
          )}
        </div>

        {/* Reason — mandatory for reassign */}
        {isReassign && (
          <div className="mt-3">
            <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-1.5">
              Reason for Reassignment{" "}
              <span className="text-red-500">*</span>
            </p>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
              placeholder="e.g. Engineer on leave, skill mismatch, customer request..."
              rows={3}
              className="w-full border border-zinc-200 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={saving}
          >
            {saving
              ? isReassign
                ? "Reassigning..."
                : "Assigning..."
              : isReassign
                ? "Confirm Reassignment"
                : "Confirm Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}