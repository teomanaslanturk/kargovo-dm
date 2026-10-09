import { createHmac, timingSafeEqual } from "crypto";

/**
 * Meta webhook isteklerinin "X-Hub-Signature-256" imzasını doğrular.
 *
 * Meta, her webhook isteğinde gövdenin HMAC-SHA256 imzasını
 * `X-Hub-Signature-256: sha256=<hex>` başlığıyla gönderir. İmza, uygulamanızın
 * App Secret'ı ile hesaplanmalı ve eşleşmelidir. Bu kontrol, webhook
 * endpoint'inizin yalnızca Meta tarafından (veya secret'ı bilen biri
 * tarafından) tetiklenebilmesini sağlar.
 */
export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string,
): boolean {
  if (!signatureHeader) return false;

  const [algo, signature] = signatureHeader.split("=");
  if (algo !== "sha256" || !signature) return false;

  const expected = createHmac("sha256", appSecret).update(rawBody).digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const actualBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== actualBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export interface InstagramWebhookMessage {
  senderIgId: string;
  recipientIgId: string;
  igMessageId: string;
  text: string;
  timestamp: number;
}

interface MetaWebhookEntry {
  id: string;
  messaging?: Array<{
    sender?: { id?: string };
    recipient?: { id?: string };
    timestamp?: number;
    message?: { mid?: string; text?: string };
  }>;
}

interface MetaWebhookPayload {
  object?: string;
  entry?: MetaWebhookEntry[];
}

/**
 * Meta'nın gönderdiği webhook gövdesinden mesaj olaylarını güvenli şekilde çıkarır.
 * Beklenmeyen/boş alanlar olduğunda hata fırlatmaz, ilgili olayı atlar.
 */
export function parseInstagramMessages(
  payload: MetaWebhookPayload,
): InstagramWebhookMessage[] {
  const messages: InstagramWebhookMessage[] = [];

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderIgId = event.sender?.id;
      const recipientIgId = event.recipient?.id;
      const igMessageId = event.message?.mid;
      const text = event.message?.text;

      if (!senderIgId || !recipientIgId || !igMessageId || !text) {
        continue;
      }

      messages.push({
        senderIgId,
        recipientIgId,
        igMessageId,
        text,
        timestamp: event.timestamp ?? Date.now(),
      });
    }
  }

  return messages;
}
