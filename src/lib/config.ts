/**
 * Uygulama genel yapılandırma yardımcıları.
 *
 * Bu modül, hangi entegrasyonların gerçekten yapılandırılmış olduğunu tespit eder.
 * Gerekli ortam değişkenleri (DATABASE_URL, META_* anahtarları, OPENAI_API_KEY vb.)
 * tanımlı değilse ilgili özellik otomatik olarak DEMO MODU'na düşer; uygulama asla
 * "sahte" bir gerçek bağlantı gösterip kullanıcıyı yanıltmaz.
 */

export const forceDemoMode = process.env.NEXT_PUBLIC_FORCE_DEMO_MODE === "true";

export const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0,
);

export const isMetaConfigured = Boolean(
  process.env.META_APP_ID &&
    process.env.META_APP_SECRET &&
    process.env.META_PAGE_ACCESS_TOKEN &&
    process.env.META_WEBHOOK_VERIFY_TOKEN,
);

export const aiProvider = (process.env.AI_PROVIDER ?? "mock") as "mock" | "openai";

export const isAiProviderConfigured = Boolean(
  aiProvider === "openai" ? process.env.OPENAI_API_KEY : true,
);

/**
 * Uygulamanın genel çalışma modu. `forceDemoMode` açıkça true ise veya temel
 * altyapı (veritabanı) yapılandırılmamışsa uygulama demo verileriyle çalışır.
 */
export const isAppInDemoMode = forceDemoMode || !isDatabaseConfigured;

export const authSecret = process.env.AUTH_SECRET;
