/**
 * Veritabanı tohumlama (seed) betiği.
 *
 * Bu betik GERÇEK veritabanınıza yalnızca başlangıç için gerekli temel
 * kayıtları (bir yönetici kullanıcısı ve varsayılan otomasyon ayarları)
 * ekler. Instagram konuşmaları, siparişler gibi "demo" veriler buraya
 * KASITLI OLARAK eklenmez — gerçek veritabanı her zaman gerçek verilerle
 * başlamalıdır. Arayüzdeki demo veriler `src/lib/demo-data.ts` içinde
 * ayrı tutulur ve veritabanı bağlanana kadar kullanılır.
 *
 * Çalıştırmak için:
 *   npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@kargovo.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "Yönetici",
        role: "ADMIN",
        passwordHash,
      },
    });
    console.log(`✓ Yönetici kullanıcı oluşturuldu: ${adminEmail}`);
    console.log(
      "  Lütfen ilk girişten sonra parolanızı değiştirin (SEED_ADMIN_PASSWORD ile geçici parola belirlenmiştir).",
    );
  } else {
    console.log(`• Yönetici kullanıcı zaten mevcut: ${adminEmail}`);
  }

  const existingSettings = await prisma.automationSettings.findFirst();
  if (!existingSettings) {
    await prisma.automationSettings.create({
      data: {
        aiAssistantEnabled: true,
        autoReplyEnabled: false,
        requireApprovalBeforeSend: true,
        workingHoursStart: "09:00",
        workingHoursEnd: "18:00",
        welcomeMessage: "Merhaba! Size nasıl yardımcı olabiliriz?",
        aiTone: "profesyonel",
      },
    });
    console.log("✓ Varsayılan otomasyon ayarları oluşturuldu.");
  } else {
    console.log("• Otomasyon ayarları zaten mevcut.");
  }
}

main()
  .catch((error) => {
    console.error("Seed işlemi başarısız oldu:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
