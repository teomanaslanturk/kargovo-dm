import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isDatabaseConfigured, isMetaConfigured } from "@/lib/config";
import { parseInstagramMessages, verifyMetaSignature } from "@/lib/instagram/webhook";

/**
 * GET /api/webhooks/instagram
 *
 * Meta, webhook URL'sini kaydederken bir doğrulama (handshake) isteği gönderir:
 * ?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...
 * `hub.verify_token`, sizin Meta panelinde girdiğiniz METAWEBHOOK_VERIFY_TOKEN
 * ile eşleşirse `hub.challenge` değerini düz metin olarak geri döndürmemiz gerekir.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.META_WEBHOOK_VERIFY_TOKEN;

  if (!expectedToken) {
    return NextResponse.json(
      {
        error:
          "META_WEBHOOK_VERIFY_TOKEN tanımlı değil. Webhook doğrulaması için .env dosyasını yapılandırın.",
      },
      { status: 503 },
    );
  }

  if (mode === "subscribe" && token === expectedToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: "Doğrulama başarısız." }, { status: 403 });
}

/**
 * POST /api/webhooks/instagram
 *
 * Meta'dan gelen gerçek zamanlı mesaj olaylarını işler:
 * 1. İmza doğrulaması (X-Hub-Signature-256) yapılır.
 * 2. Her mesaj için `igMessageId` üzerinden tekilleştirme (idempotency) uygulanır
 *    — aynı webhook olayı birden fazla kez gönderilse bile mesaj tek kez işlenir.
 * 3. Veritabanı yapılandırılmamışsa (demo modu) olay güvenli şekilde loglanır
 *    ve 200 OK döndürülür; Meta'nın yeniden deneme (retry) mekanizmasını
 *    tetiklememek için bu önemlidir.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const appSecret = process.env.META_WEBHOOK_APP_SECRET;
  const signatureHeader = request.headers.get("x-hub-signature-256");

  if (isMetaConfigured && appSecret) {
    const isValid = verifyMetaSignature(rawBody, signatureHeader, appSecret);
    if (!isValid) {
      console.warn("[Instagram Webhook] Geçersiz imza — istek reddedildi.");
      return NextResponse.json({ error: "Geçersiz imza." }, { status: 401 });
    }
  } else {
    // Meta henüz yapılandırılmamış: üretim ortamında asla bu dalın
    // çalışmaması gerekir. Geliştirme/demo ortamında yalnızca loglayıp
    // güvenli şekilde 200 döndürüyoruz.
    console.warn(
      "[Instagram Webhook] META_WEBHOOK_APP_SECRET tanımlı değil — istek doğrulanmadan not edildi (demo modu).",
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON gövdesi." }, { status: 400 });
  }

  const messages = parseInstagramMessages(
    payload as Parameters<typeof parseInstagramMessages>[0],
  );

  if (!isDatabaseConfigured || !db) {
    console.info(
      `[Instagram Webhook] Demo modu: ${messages.length} mesaj alındı ancak veritabanı yapılandırılmadığı için kalıcı hale getirilmedi.`,
    );
    return NextResponse.json({ ok: true, demoMode: true, received: messages.length });
  }

  let processed = 0;
  for (const message of messages) {
    try {
      // igMessageId @unique olduğu için aynı mesaj tekrar gelirse upsert
      // sayesinde yinelenen kayıt oluşmaz (idempotency garantisi).
      const existing = await db.message.findUnique({
        where: { igMessageId: message.igMessageId },
      });
      if (existing) continue;

      const instagramAccount = await db.instagramAccount.findFirst({
        where: { igUserId: message.recipientIgId },
      });
      if (!instagramAccount) {
        console.warn(
          `[Instagram Webhook] Tanımlı Instagram hesabı bulunamadı: ${message.recipientIgId}`,
        );
        continue;
      }

      let customer = await db.customer.findFirst({
        where: { igUsername: message.senderIgId },
      });
      if (!customer) {
        customer = await db.customer.create({
          data: { igUsername: message.senderIgId, isDemo: false },
        });
      }

      const conversation = await db.conversation.upsert({
        where: {
          id: `${instagramAccount.id}-${customer.id}`,
        },
        create: {
          id: `${instagramAccount.id}-${customer.id}`,
          instagramAccountId: instagramAccount.id,
          customerId: customer.id,
          status: "WAITING",
          isUnread: true,
          lastMessageAt: new Date(message.timestamp),
          lastMessagePreview: message.text.slice(0, 160),
          isDemo: false,
        },
        update: {
          status: "WAITING",
          isUnread: true,
          lastMessageAt: new Date(message.timestamp),
          lastMessagePreview: message.text.slice(0, 160),
        },
      });

      await db.message.create({
        data: {
          conversationId: conversation.id,
          sender: "CUSTOMER",
          content: message.text,
          igMessageId: message.igMessageId,
          isDemo: false,
        },
      });

      processed += 1;
    } catch (error) {
      console.error("[Instagram Webhook] Mesaj işlenirken hata:", error);
    }
  }

  return NextResponse.json({ ok: true, demoMode: false, received: messages.length, processed });
}
