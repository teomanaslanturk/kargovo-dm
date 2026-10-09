import { MessageCircle } from "lucide-react";

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
        <MessageCircle className="h-5 w-5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-white">Kargovo</span>
        <span className="text-xs text-sidebar-foreground/60">DM Asistanı</span>
      </div>
    </div>
  );
}
