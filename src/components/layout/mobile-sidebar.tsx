"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarLogo } from "@/components/layout/sidebar-logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";

interface MobileSidebarProps {
  unreadCount?: number;
}

export function MobileSidebar({ unreadCount = 0 }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-72 bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetTitle className="sr-only">Gezinme Menüsü</SheetTitle>
        <SidebarLogo />
        <SidebarNav unreadCount={unreadCount} onNavigate={() => setOpen(false)} />
      </SheetContent>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Menüyü aç"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </Sheet>
  );
}
