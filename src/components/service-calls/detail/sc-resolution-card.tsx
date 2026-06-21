import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceCall, ServiceCallVisit } from "./sc-types";
import { FileText, Eye, Wrench, User, MessageSquare } from "lucide-react";

interface SCResolutionCardProps {
  call: ServiceCall;
  visit?: ServiceCallVisit | null;
}

function ResolutionField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="bg-zinc-50 rounded-md p-4 border border-zinc-100">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={13} className="text-zinc-400" />
        <p className="text-xs text-zinc-400 uppercase tracking-wide">
          {label}
        </p>
      </div>
      <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
        {value}
      </p>
    </div>
  );
}

export function SCResolutionCard({
  call,
  visit,
}: SCResolutionCardProps) {
  const hasVisitNotes =
    visit?.observation ||
    visit?.actionTaken ||
    visit?.customerRemarks;

  const hasResolution =
    hasVisitNotes || call.resolutionRemarks;

  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-zinc-700 uppercase tracking-wide flex items-center gap-2">
          <FileText size={14} />
          Resolution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasResolution ? (
          <div className="space-y-3">
            <ResolutionField
              icon={Eye}
              label="Observation"
              value={visit?.observation}
            />
            <ResolutionField
              icon={Wrench}
              label="Action Taken"
              value={visit?.actionTaken}
            />
            <ResolutionField
              icon={MessageSquare}
              label="Customer Remarks"
              value={visit?.customerRemarks}
            />
            <ResolutionField
              icon={FileText}
              label="Resolution Remarks"
              value={call.resolutionRemarks}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 py-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <FileText size={14} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">
                No resolution information yet
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Resolution details will appear here once the engineer completes the service visit.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}