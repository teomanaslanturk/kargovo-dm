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
    <nav className="flex flex-1 flex-col gap-1 px-3 pt-3">
      <p className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-[color:var(--kargovo-gold)]">
        Ana Menü
      </p>
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
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              isActive
                ? "bg-[color:var(--kargovo-magenta)] text-white shadow-sm"
                : "text-sidebar-foreground hover:bg-sidebar-accent",
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                isActive ? "bg-white/20" : "",
              )}
              style={
                !isActive ? { backgroundColor: "var(--kargovo-gold-soft)" } : undefined
              }
            >
              <Icon
                className="h-4 w-4"
                style={!isActive ? { color: "var(--kargovo-gold)" } : undefined}
                color={isActive ? "#ffffff" : undefined}
              />
            </span>
            <span className="flex-1">{item.title}</span>
            {item.badgeKey === "unread" && unreadCount > 0 ? (
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold",
                  isActive
                    ? "bg-white text-[color:var(--kargovo-magenta)]"
                    : "bg-[color:var(--kargovo-magenta)] text-white",
                )}
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
