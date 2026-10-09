import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Inbox,
  LayoutDashboard,
  Package,
  Plug,
  Settings,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Opsiyonel rozet sayısı (örn. okunmamış mesaj sayısı) */
  badgeKey?: "unread";
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "DM Gelen Kutusu", href: "/inbox", icon: Inbox, badgeKey: "unread" },
  { title: "AI Asistanı", href: "/ai-assistant", icon: Sparkles },
  { title: "Otomasyonlar", href: "/automations", icon: Zap },
  { title: "Siparişler", href: "/orders", icon: Package },
  { title: "Kargo Takibi", href: "/shipments", icon: Truck },
  { title: "Bilgi Bankası", href: "/knowledge-base", icon: BookOpen },
  { title: "Entegrasyonlar", href: "/integrations", icon: Plug },
  { title: "Ayarlar", href: "/settings", icon: Settings },
];
