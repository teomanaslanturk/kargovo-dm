import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { InboxClient } from "@/components/inbox/inbox-client";
import { demoConversations } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "DM Gelen Kutusu — Kargovo DM Asistanı",
};

export default function InboxPage() {
  // Not: Gerçek Meta/Instagram bağlantısı ve veritabanı yapılandırıldığında
  // bu veriler src/lib/data/conversations.ts (Prisma) üzerinden çekilecektir.
  return (
    <div className="flex h-full flex-col gap-4">
      <PageHeader
        title="DM Gelen Kutusu"
        description="Instagram konuşmalarınızı görüntüleyin, yanıtlayın ve AI önerilerinden yararlanın."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <InboxClient initialConversations={demoConversations} />
    </div>
  );
}
