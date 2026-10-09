import {
  MessageSquare,
  Package,
  Settings2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoBadge } from "@/components/shared/demo-badge";
import { formatRelativeTime } from "@/lib/format";
import type { RecentActivityItem } from "@/types";

const typeIcon: Record<RecentActivityItem["type"], LucideIcon> = {
  message: MessageSquare,
  order: Package,
  automation: Zap,
  system: Settings2,
};

const typeStyle: Record<RecentActivityItem["type"], string> = {
  message: "bg-sky-50 text-sky-600",
  order: "bg-indigo-50 text-indigo-600",
  automation: "bg-emerald-50 text-emerald-600",
  system: "bg-slate-100 text-slate-600",
};

interface RecentActivityProps {
  items: RecentActivityItem[];
}

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Son Müşteri Aktiviteleri</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = typeIcon[item.type];
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${typeStyle[item.type]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {item.isDemo ? <DemoBadge /> : null}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
