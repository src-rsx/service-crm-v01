import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceCall } from "./sc-types";
import { FileText } from "lucide-react";

interface SCResolutionCardProps {
  call: ServiceCall;
}

export function SCResolutionCard({
  call,
}: SCResolutionCardProps) {
  const hasResolution =
    call.resolutionRemarks;

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
          <div className="space-y-4">
            <div className="bg-zinc-50 rounded-md p-4 border border-zinc-100">
              <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1.5">
                Resolution Remarks
              </p>
              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                {call.resolutionRemarks}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-3">
            <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
              <FileText
                size={14}
                className="text-zinc-400"
              />
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