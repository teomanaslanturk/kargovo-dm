import { Camera, Database, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { IntegrationStatusCard } from "@/components/integrations/integration-status-card";
import {
  isDatabaseConfigured,
  isMetaConfigured,
  isAppInDemoMode,
} from "@/lib/config";
import { getAIProvider } from "@/lib/ai";

export const metadata = {
  title: "Entegrasyonlar — Kargovo DM Asistanı",
};

export default function IntegrationsPage() {
  const provider = getAIProvider();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Entegrasyonlar"
        description="Instagram, veritabanı ve yapay zekâ sağlayıcısı bağlantı durumlarınız."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO MODU" /> : undefined}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IntegrationStatusCard
          icon={Camera}
          title="Instagram / Meta Messaging API"
          description="Instagram DM mesajlarını almak ve yanıtlamak için gereklidir."
          isConfigured={isMetaConfigured}
          configuredLabel="Bağlı"
          notConfiguredLabel="Demo Modu"
        >
          <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            {isMetaConfigured ? (
              <p>
                Meta uygulaması ve webhook ayarları yapılandırıldı. Gerçek mesajlar
                <code className="mx-1 rounded bg-background px-1 py-0.5">
                  /api/webhooks/instagram
                </code>
                üzerinden işlenecektir.
              </p>
            ) : (
              <div className="space-y-1.5">
                <p>
                  Meta App ID, App Secret, sayfa erişim token&apos;ı ve webhook
                  doğrulama anahtarı tanımlı değil. Bağlamak için:
                </p>
                <ol className="list-decimal space-y-1 pl-4">
                  <li>
                    <a
                      href="https://developers.facebook.com/apps"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Meta for Developers
                    </a>{" "}
                    üzerinden bir uygulama oluşturun.
                  </li>
                  <li>Instagram Messaging API ürününü ekleyin.</li>
                  <li>
                    <code className="rounded bg-background px-1 py-0.5">.env</code>{" "}
                    dosyasına <code className="rounded bg-background px-1 py-0.5">META_APP_ID</code>,{" "}
                    <code className="rounded bg-background px-1 py-0.5">META_APP_SECRET</code>,{" "}
                    <code className="rounded bg-background px-1 py-0.5">META_PAGE_ACCESS_TOKEN</code>,{" "}
                    <code className="rounded bg-background px-1 py-0.5">META_WEBHOOK_VERIFY_TOKEN</code> değerlerini girin.
                  </li>
                  <li>
                    Webhook URL&apos;sini{" "}
                    <code className="rounded bg-background px-1 py-0.5">
                      https://alanadiniz.com/api/webhooks/instagram
                    </code>{" "}
                    olarak Meta panelinde tanımlayın.
                  </li>
                </ol>
              </div>
            )}
          </div>
        </IntegrationStatusCard>

        <IntegrationStatusCard
          icon={Database}
          title="Veritabanı (PostgreSQL)"
          description="Konuşma, sipariş ve kullanıcı verilerinin kalıcı olarak saklandığı yer."
          isConfigured={isDatabaseConfigured}
          configuredLabel="Bağlı"
          notConfiguredLabel="Yapılandırılmadı"
        >
          <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            {isDatabaseConfigured ? (
              <p>Prisma, DATABASE_URL üzerinden PostgreSQL&apos;e bağlı.</p>
            ) : (
              <p>
                <code className="rounded bg-background px-1 py-0.5">.env</code>{" "}
                içinde <code className="rounded bg-background px-1 py-0.5">DATABASE_URL</code>{" "}
                tanımlayıp{" "}
                <code className="rounded bg-background px-1 py-0.5">
                  npx prisma migrate dev
                </code>{" "}
                çalıştırana kadar uygulama demo verileriyle çalışır.
              </p>
            )}
          </div>
        </IntegrationStatusCard>

        <IntegrationStatusCard
          icon={Sparkles}
          title="Yapay Zekâ Sağlayıcısı"
          description="Müşteri mesajlarını analiz edip yanıt öneren servis."
          isConfigured={provider.id === "openai"}
          configuredLabel={`Aktif: ${provider.displayName}`}
          notConfiguredLabel={`Aktif: ${provider.displayName}`}
        >
          <div className="rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            <p>
              <code className="rounded bg-background px-1 py-0.5">AI_PROVIDER</code>{" "}
              ve{" "}
              <code className="rounded bg-background px-1 py-0.5">OPENAI_API_KEY</code>{" "}
              ortam değişkenleriyle sağlayıcı değiştirilebilir. Anahtar tanımlı
              değilse sistem otomatik olarak yerleşik kural tabanlı sağlayıcıya
              döner, hiçbir zaman hata vermez.
            </p>
          </div>
        </IntegrationStatusCard>
      </div>
    </div>
  );
}
