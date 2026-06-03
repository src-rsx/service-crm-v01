import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ServiceCall,
  STATUS_CONFIG,
  PRIORITY_CONFIG,
} from "./sc-types";
import {
  Building2,
  MapPin,
  Package,
  Clock,
  Hash,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface SCHeroProps {
  call: ServiceCall;
}

export function SCHero({ call }: SCHeroProps) {
const status = STATUS_CONFIG[call.status] ?? {
  label: call.status,
  color: "text-zinc-600",
  bg: "bg-zinc-100",
};
const priority = PRIORITY_CONFIG[call.priority] ?? {
  label: call.priority ?? "Unknown",
  color: "text-zinc-600",
  bg: "bg-zinc-100",
};

  const age = formatDistanceToNow(
    new Date(call.openedAt),
    { addSuffix: false }
  );

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6">
      {/* Top row: call number + badges */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Hash size={16} />
            <span className="text-sm font-mono font-medium text-zinc-500">
              {call.callNumber}
            </span>
          </div>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}
          >
            {status.label}
          </span>

          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${priority.bg} ${priority.color}`}
          >
            {priority.label}
          </span>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600">
            {call.callType}
          </span>
        </div>

        {/* Age */}
        <div className="flex items-center gap-1.5 text-zinc-400 text-sm shrink-0">
          <Clock size={14} />
          <span>Open for {age}</span>
        </div>
      </div>

      {/* Subject */}
      <h1 className="mt-3 text-xl font-semibold text-zinc-900 leading-snug">
        {call.subject}
      </h1>

      {/* Description */}
      {call.description && (
        <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
          {call.description}
        </p>
      )}

      <Separator className="my-4" />

      {/* Context row: company / site / asset / engineer */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        {call.company && (
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Building2
              size={14}
              className="text-zinc-400"
            />
            <span className="font-medium">
              {call.company.companyName}
            </span>
          </div>
        )}

        {call.site && (
          <div className="flex items-center gap-1.5 text-zinc-600">
            <MapPin
              size={14}
              className="text-zinc-400"
            />
            <span>{call.site.siteName}</span>
            {call.site.city && (
              <span className="text-zinc-400">
                · {call.site.city}
              </span>
            )}
          </div>
        )}

        {call.asset && (
          <div className="flex items-center gap-1.5 text-zinc-600">
            <Package
              size={14}
              className="text-zinc-400"
            />
            <span>{call.asset.assetName}</span>
            {call.asset.serialNumber && (
              <span className="text-zinc-400 font-mono text-xs">
                · {call.asset.serialNumber}
              </span>
            )}
          </div>
        )}

        {call.assignedEngineer && (
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-700 text-xs font-bold">
                {call.assignedEngineer.name
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </div>
            <span className="text-zinc-600">
              {call.assignedEngineer.name}
            </span>
          </div>
        )}

        {!call.assignedEngineer && (
          <div className="flex items-center gap-1.5 text-amber-600">
            <span className="text-xs font-medium">
              ⚠ Unassigned
            </span>
          </div>
        )}
      </div>
    </div>
  );
}