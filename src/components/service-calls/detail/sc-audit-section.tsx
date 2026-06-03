"use client";

import { useState } from "react";
import { ServiceCall } from "./sc-types";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SCAuditSectionProps {
  call: ServiceCall;
}

function AuditRow({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-1.5 border-b border-zinc-50 last:border-0">
      <span className="text-xs text-zinc-400">
        {label}
      </span>
      <span className="text-xs text-zinc-600 font-medium">
        {value}
      </span>
    </div>
  );
}

export function SCAuditSection({
  call,
}: SCAuditSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-3 bg-zinc-50 hover:bg-zinc-100 transition-colors"
      >
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Audit Information
        </span>
        {open ? (
          <ChevronUp
            size={14}
            className="text-zinc-400"
          />
        ) : (
          <ChevronDown
            size={14}
            className="text-zinc-400"
          />
        )}
      </button>

      {open && (
        <div className="px-6 py-4 bg-white">
          <AuditRow
            label="Call Number"
            value={call.callNumber}
          />
          <AuditRow
            label="Source"
            value={call.source}
          />
          <AuditRow
            label="Customer Ref"
            value={
              call.customerReferenceNumber
            }
          />
          <AuditRow
            label="Opened At"
            value={format(
              new Date(call.openedAt),
              "dd MMM yyyy · hh:mm a"
            )}
          />
          <AuditRow
            label="Last Updated"
            value={format(
              new Date(call.updatedAt),
              "dd MMM yyyy · hh:mm a"
            )}
          />
          <AuditRow
            label="Closed At"
            value={
              call.closedAt
                ? format(
                    new Date(call.closedAt),
                    "dd MMM yyyy · hh:mm a"
                  )
                : null
            }
          />
        </div>
      )}
    </div>
  );
}