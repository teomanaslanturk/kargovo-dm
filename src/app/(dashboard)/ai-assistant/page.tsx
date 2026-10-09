import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { AiTester } from "@/components/ai-assistant/ai-tester";
import { AiLogTable } from "@/components/ai-assistant/ai-log-table";
import { demoAiResponseLogs } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";
import { getAIProvider } from "@/lib/ai";

export const metadata = {
  title: "AI Asistanı — Kargovo DM Asistanı",
};

export default function AiAssistantPage() {
  const provider = getAIProvider();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="AI Asistanı"
        description={`Aktif sağlayıcı: ${provider.displayName}`}
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AiTester />
        <AiLogTable logs={demoAiResponseLogs} />
      </div>
    </div>
  );
}
