import { Crown } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4 py-5">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: "var(--kargovo-gold-soft)" }}
      >
        <Crown className="h-5 w-5" style={{ color: "var(--kargovo-gold)" }} />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-extrabold tracking-wide text-foreground">
          KARGOVO
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          DM Asistanı
        </span>
      </div>
    </div>
  );
}
