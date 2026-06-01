import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case "OPEN":
      return (
        <Badge
          className="bg-amber-100 text-amber-700"
        >
          Open
        </Badge>
      );

    case "ASSIGNED":
      return (
        <Badge
          className="bg-blue-100 text-blue-700"
        >
          Assigned
        </Badge>
      );

    case "IN_PROGRESS":
      return (
        <Badge
          className="bg-purple-100 text-purple-700"
        >
          In Progress
        </Badge>
      );

    case "CLOSED":
      return (
        <Badge
          className="bg-emerald-100 text-emerald-700"
        >
          Closed
        </Badge>
      );

    default:
      return (
        <Badge>
          {status}
        </Badge>
      );
  }
}