import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  className?: string;
}

/**
 * Genel amaçlı, renk kodlu durum rozeti. Sipariş durumu, konuşma durumu vb.
 * için `src/lib/labels.ts` içindeki stil haritalarıyla birlikte kullanılır.
 */
export function StatusBadge({ label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
    >
      {label}
    </span>
  );
}
