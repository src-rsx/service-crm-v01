import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  accent?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  accent = "border-l-slate-500",
}: MetricCardProps) {
  return (
    <Card
      className={`
        border-l-4
        ${accent}
        hover:shadow-md
        hover:-translate-y-1
        transition-all
        duration-200
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {title}
          </span>

          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-4 text-4xl font-bold">
          {value}
        </div>

        {description && (
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}