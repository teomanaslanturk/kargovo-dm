import { Bell, Search } from "lucide-react";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  unreadCount?: number;
  user: {
    name: string;
    email: string;
    isDemoUser: boolean;
  };
}

export function Topbar({ unreadCount = 0, user }: TopbarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card px-4 sm:px-6">
      <MobileSidebar unreadCount={unreadCount} />

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Müşteri, sipariş veya mesaj ara..."
          className="h-9 pl-9"
        />
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Bildirimler"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 ? (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
          ) : null}
        </Button>
        <UserMenu
          name={user.name}
          email={user.email}
          isDemoUser={user.isDemoUser}
        />
      </div>
    </header>
  );
}
