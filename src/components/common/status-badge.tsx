import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: string;
}

const statusStyles = {
  LOGGED:
    "bg-slate-100 text-slate-700 border-slate-200",

  ASSIGNED:
    "bg-blue-100 text-blue-700 border-blue-200",

  IN_PROGRESS:
    "bg-amber-100 text-amber-700 border-amber-200",

  RESOLVED:
    "bg-green-100 text-green-700 border-green-200",

  CLOSED:
    "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export function StatusBadge({
  status,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={cn(
        statusStyles[
          status as keyof typeof statusStyles
        ]
      )}
    >
      {status}
    </Badge>
  );
}