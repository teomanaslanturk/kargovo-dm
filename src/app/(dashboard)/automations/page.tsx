import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { AutomationSettingsForm } from "@/components/automations/automation-settings-form";
import { demoAutomationSettings } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "Otomasyonlar — Kargovo DM Asistanı",
};

export default function AutomationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Otomasyonlar"
        description="AI asistanı ve otomatik yanıt davranışlarını yapılandırın."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <div className="max-w-2xl">
        <AutomationSettingsForm initialSettings={demoAutomationSettings} />
      </div>
    </div>
  );
}
