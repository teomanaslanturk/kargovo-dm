import { Circle } from "lucide-react";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";

interface SidebarProps {
  unreadCount?: number;
  isDemoMode?: boolean;
}

export function Sidebar({ unreadCount = 0, isDemoMode = true }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <SidebarLogo />
      <SidebarNav unreadCount={unreadCount} />
      <div className="mx-3 mb-4 mt-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5">
        <div className="flex items-center gap-2 text-xs">
          <Circle
            className={
              isDemoMode
                ? "h-2 w-2 fill-amber-400 text-amber-400"
                : "h-2 w-2 fill-emerald-400 text-emerald-400"
            }
          />
          <span className="font-medium text-sidebar-foreground">
            {isDemoMode ? "Demo Modu Aktif" : "Canlı Bağlantı"}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-snug text-sidebar-foreground/60">
          {isDemoMode
            ? "Instagram & veritabanı bağlı değil. Örnek verilerle gösterim yapılıyor."
            : "Instagram hesabı ve veritabanı bağlantısı etkin."}
        </p>
      </div>
    </aside>
  );
}
