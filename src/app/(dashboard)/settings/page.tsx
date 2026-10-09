import { PageHeader } from "@/components/shared/page-header";
import { SettingsClient } from "@/components/settings/settings-client";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Ayarlar — Kargovo DM Asistanı",
};

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Ayarlar"
        description="İşletme bilgilerinizi, bildirim tercihlerinizi ve hesap güvenliğinizi yönetin."
      />
      <SettingsClient
        isDemoUser={Boolean(session?.user?.isDemoUser)}
        userName={session?.user?.name ?? "—"}
        userEmail={session?.user?.email ?? "—"}
      />
    </div>
  );
}
