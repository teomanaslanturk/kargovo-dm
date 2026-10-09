import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { getAIProvider } from "@/lib/ai";
import { demoKnowledgeBase } from "@/lib/demo-data";

/**
 * POST /api/ai/draft
 *
 * Verilen müşteri mesajı için niyet sınıflandırması + yanıt taslağı üretir.
 * Yetkisiz istekler reddedilir. Üretilen yanıt HİÇBİR ZAMAN otomatik olarak
 * müşteriye gönderilmez; her zaman önce bir operatör/istemci tarafından
 * gözden geçirilip onaylanması gerekir.
 */

const requestSchema = z.object({
  message: z.string().min(1, "Mesaj boş olamaz").max(4000),
  tone: z.enum(["profesyonel", "samimi", "resmi"]).optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz istek." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Geçersiz istek.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Not: Gerçek veritabanı bağlandığında bilgi bankası Prisma'dan,
  // `isActive: true` filtresiyle sorgulanacaktır. Şimdilik demo içerikler kullanılır.
  const knowledgeBase = demoKnowledgeBase;

  try {
    const provider = getAIProvider();
    const draft = await provider.generateDraft({
      message: parsed.data.message,
      knowledgeBase,
      tone: parsed.data.tone ?? "profesyonel",
    });

    return NextResponse.json({ provider: provider.id, ...draft });
  } catch (error) {
    console.error("[AI Draft] sağlayıcı hatası:", error);
    return NextResponse.json(
      {
        error:
          "Yapay zekâ yanıtı üretilirken bir hata oluştu. Lütfen manuel yanıt yazın.",
      },
      { status: 502 },
    );
  }
}
