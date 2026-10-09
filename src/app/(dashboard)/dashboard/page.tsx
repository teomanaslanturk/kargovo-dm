import {
  CheckCircle2,
  Clock,
  MessageSquare,
  MessagesSquare,
  PackageCheck,
  PackageSearch,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  getDemoDashboardStats,
  demoRecentActivity,
} from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "Dashboard — Kargovo DM Asistanı",
};

export default function DashboardPage() {
  // Not: Gerçek veritabanı/Meta bağlantısı yapılandırıldığında bu veriler
  // src/lib/data/* katmanından (Prisma sorguları) gelecek şekilde değiştirilecektir.
  const stats = getDemoDashboardStats();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Instagram DM trafiğinize ve sipariş süreçlerinize genel bakış."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Toplam Mesaj"
          value={stats.totalMessages}
          icon={MessageSquare}
          accent="turquoise"
        />
        <StatCard
          title="Yanıtlanmamış"
          value={stats.unansweredMessages}
          icon={Clock}
          accent="amber"
        />
        <StatCard
          title="Bugünkü Görüşmeler"
          value={stats.todayConversations}
          icon={MessagesSquare}
          accent="navy"
        />
        <StatCard
          title="Otomatik Yanıtlanan"
          value={stats.autoRepliedMessages}
          icon={CheckCircle2}
          accent="emerald"
        />
        <StatCard
          title="Bekleyen Siparişler"
          value={stats.pendingOrders}
          icon={PackageSearch}
          accent="amber"
        />
        <StatCard
          title="Kargoya Verilenler"
          value={stats.shippedOrders}
          icon={PackageCheck}
          accent="turquoise"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity items={demoRecentActivity} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-base font-semibold text-foreground">Hızlı İpuçları</h3>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li>
              • <span className="font-medium text-foreground">Otomasyonlar</span>{" "}
              sayfasından AI yanıtlarını açıp kapatabilirsiniz.
            </li>
            <li>
              • <span className="font-medium text-foreground">Bilgi Bankası</span>{" "}
              içeriği zenginleştirdikçe AI yanıtları daha isabetli olur.
            </li>
            <li>
              • <span className="font-medium text-foreground">Entegrasyonlar</span>{" "}
              sayfasından Instagram hesabınızı bağlayarak demo modundan çıkabilirsiniz.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
