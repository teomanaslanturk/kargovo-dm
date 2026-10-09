import type { LucideIcon } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IntegrationStatusCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isConfigured: boolean;
  configuredLabel?: string;
  notConfiguredLabel?: string;
  children?: React.ReactNode;
}

export function IntegrationStatusCard({
  icon: Icon,
  title,
  description,
  isConfigured,
  configuredLabel = "Yapılandırıldı",
  notConfiguredLabel = "Yapılandırılmadı",
  children,
}: IntegrationStatusCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <span
            className={cn(
              "flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
              isConfigured
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            )}
          >
            {isConfigured ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <XCircle className="h-3.5 w-3.5" />
            )}
            {isConfigured ? configuredLabel : notConfiguredLabel}
          </span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
