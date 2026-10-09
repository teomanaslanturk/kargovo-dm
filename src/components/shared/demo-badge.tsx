import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoBadgeProps {
  className?: string;
  label?: string;
}

/**
 * Demo verisi veya demo modunda çalışan bir özelliği belirgin şekilde işaretler.
 * Gerçek veri/entegrasyonlarla asla karışmaması için her yerde tutarlı kullanılır.
 */
export function DemoBadge({ className, label = "DEMO" }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700",
        className,
      )}
      title="Bu veri/özellik demo amaçlıdır, gerçek müşteri verisi değildir."
    >
      <FlaskConical className="h-3 w-3" />
      {label}
    </span>
  );
}
