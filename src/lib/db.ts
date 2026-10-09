import { PrismaClient } from "@prisma/client";
import { isDatabaseConfigured } from "@/lib/config";

/**
 * Prisma Client tekil örneği (singleton).
 *
 * DATABASE_URL tanımlı değilse istemciyi hiç oluşturmuyoruz; bunun yerine
 * `db` değeri `null` olur ve veri erişim katmanı (`src/lib/data/*`) otomatik
 * olarak demo verilerine döner. Bu, "veritabanı yoksa uygulamayı bozma"
 * kuralını kod seviyesinde garanti eder.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient | null {
  if (!isDatabaseConfigured) {
    return null;
  }

  return (
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    })
  );
}

export const db = createClient();

if (process.env.NODE_ENV !== "production" && db) {
  globalForPrisma.prisma = db;
}
