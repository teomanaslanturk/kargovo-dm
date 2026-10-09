import { Circle } from "lucide-react";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";

interface SidebarProps {
  unreadCount?: number;
  isDemoMode?: boolean;
}

export function Sidebar({ unreadCount = 0, isDemoMode = true }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[0_0_8px_rgba(0,0,0,0.04)] lg:flex">
      <SidebarLogo />
      <SidebarNav unreadCount={unreadCount} />
      <div className="mx-3 mb-4 mt-2 rounded-xl border border-sidebar-border bg-secondary px-3 py-2.5">
        <div className="flex items-center gap-2 text-xs">
          <Circle
            className={
              isDemoMode
                ? "h-2 w-2 fill-amber-500 text-amber-500"
                : "h-2 w-2 fill-emerald-500 text-emerald-500"
            }
          />
          <span className="font-semibold text-foreground">
            {isDemoMode ? "Demo Modu Aktif" : "Canlı Bağlantı"}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {isDemoMode
            ? "Instagram & veritabanı bağlı değil. Örnek verilerle gösterim yapılıyor."
            : "Instagram hesabı ve veritabanı bağlantısı etkin."}
        </p>
      </div>
    </aside>
  );
}
