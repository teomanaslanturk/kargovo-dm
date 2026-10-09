"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  unreadCount?: number;
  onNavigate?: () => void;
}

export function SidebarNav({ unreadCount = 0, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-white"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
            )}
          >
            <Icon
              className={cn(
                "h-4.5 w-4.5 shrink-0",
                isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-primary",
              )}
            />
            <span className="flex-1">{item.title}</span>
            {item.badgeKey === "unread" && unreadCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1 text-[11px] font-semibold text-sidebar-primary-foreground">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
