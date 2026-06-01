import Link from "next/link";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ActionCard({
  title,
  description,
  href,
  icon: Icon,
}: Props) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1">
        <CardContent className="p-5">
          <div className="mb-4 inline-flex rounded-lg bg-muted p-3">
            <Icon className="h-5 w-5" />
          </div>

          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}