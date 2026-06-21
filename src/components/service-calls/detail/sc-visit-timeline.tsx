import { ServiceCallEvent } from "./sc-types";
import { format } from "date-fns";
import {
  PhoneCall,
  UserCheck,
  Play,
  Package,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface SCVisitTimelineProps {
  events: ServiceCallEvent[];
}

type EventConfigEntry = { label: string; icon: React.ElementType; color: string; bg: string };
type EventConfigMap = Record<string, EventConfigEntry>;
const EVENT_CONFIG: EventConfigMap = {
  CALL_CREATED: {
    label: "Call Logged",
    icon: PhoneCall,
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  ENGINEER_ASSIGNED: {
    label: "Engineer Assigned",
    icon: UserCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  STATUS_CHANGED: {
    label: "Status Updated",
    icon: RefreshCw,
    color: "text-zinc-600",
    bg: "bg-zinc-100",
  },
  IN_PROGRESS: {
    label: "Work Started",
    icon: Play,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  PARTS_REQUIRED: {
    label: "Parts Required",
    icon: Package,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  COMPLETED: {
    label: "Work Completed",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  CLOSED: {
    label: "Call Closed",
    icon: XCircle,
    color: "text-zinc-500",
    bg: "bg-zinc-100",
  },

  TRAVEL_STARTED: {
    label: "Travel Started",
    icon: Play,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  CHECKED_IN: {
    label: "Checked In",
    icon: UserCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  CHECKED_OUT: {
    label: "Checked Out",
    icon: CheckCircle,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  RESOLVED: {
    label: "Work Resolved",
    icon: CheckCircle,
    color: "text-green-700",
    bg: "bg-green-100",
  },
};

function getEventConfig(eventType: string) {
  return (
    EVENT_CONFIG[eventType] ?? {
      label: eventType
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/^\w/, (c) =>
          c.toUpperCase()
        ),
      icon: AlertCircle,
      color: "text-zinc-500",
      bg: "bg-zinc-100",
    }
  );
}

export function SCVisitTimeline({
  events,
}: SCVisitTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg p-6">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-4">
          Activity Timeline
        </p>
        <div className="flex items-center gap-3 py-2">
          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
            <AlertCircle
              size={14}
              className="text-zinc-400"
            />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">
              No activity recorded yet
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Events will appear here as the call progresses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const sorted = [...events].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-6">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-6">
        Activity Timeline
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-100" />

        <div className="space-y-5">
          {sorted.map((event, index) => {
            const config =
              getEventConfig(event.eventType);
            const Icon = config.icon;

            return (
              <div
                key={event.id}
                className="flex gap-4 relative"
              >
                {/* Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${config.bg}`}
                >
                  <Icon
                    size={14}
                    className={config.color}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className={`text-sm font-medium ${config.color}`}
                    >
                      {config.label}
                    </p>
                    <time className="text-xs text-zinc-400 shrink-0">
                      {format(
                        new Date(
                          event.createdAt
                        ),
                        "dd MMM · hh:mm a"
                      )}
                    </time>
                  </div>

                  {event.oldStatus &&
                    event.newStatus && (
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {event.oldStatus}{" "}
                        →{" "}
                        {event.newStatus}
                      </p>
                    )}

                  {event.remarks && (
                    <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
                      {event.remarks}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}