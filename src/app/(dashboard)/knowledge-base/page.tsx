import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { KnowledgeBaseClient } from "@/components/knowledge-base/knowledge-base-client";
import { demoKnowledgeBase, demoFaqs } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "Bilgi Bankası — Kargovo DM Asistanı",
};

export default function KnowledgeBasePage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bilgi Bankası"
        description="AI asistanının müşterilere doğru yanıt verebilmesi için işletme bilgilerinizi yönetin."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <KnowledgeBaseClient initialEntries={demoKnowledgeBase} initialFaqs={demoFaqs} />
    </div>
  );
}
