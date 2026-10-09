import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  accent?: "turquoise" | "navy" | "amber" | "emerald";
  hint?: string;
}

const accentStyles: Record<NonNullable<StatCardProps["accent"]>, string> = {
  turquoise: "bg-primary/10 text-primary",
  navy: "bg-[color-mix(in_oklch,var(--navy-800),transparent_85%)] text-[var(--navy-800)]",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  accent = "turquoise",
  hint,
}: StatCardProps) {
  return (
    <Card className="gap-3">
      <CardContent className="flex items-start justify-between gap-3 px-5 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{title}</span>
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </span>
          {hint ? (
            <span className="text-xs text-muted-foreground">{hint}</span>
          ) : null}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            accentStyles[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
