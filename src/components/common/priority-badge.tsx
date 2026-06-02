import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  priority: string;
}

const priorityStyles = {
  LOW:
    "bg-slate-100 text-slate-700 border-slate-200",

  MEDIUM:
    "bg-blue-100 text-blue-700 border-blue-200",

  HIGH:
    "bg-orange-100 text-orange-700 border-orange-200",

  CRITICAL:
    "bg-red-100 text-red-700 border-red-200",
};

export function PriorityBadge({
  priority,
}: Props) {
  return (
    <Badge
      variant="outline"
      className={cn(
        priorityStyles[
          priority as keyof typeof priorityStyles
        ]
      )}
    >
      {priority}
    </Badge>
  );
}