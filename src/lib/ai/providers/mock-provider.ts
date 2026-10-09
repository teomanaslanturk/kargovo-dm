import type { AIIntent, KnowledgeBaseCategory } from "@/types";
import type { AIDraftInput, AIDraftResult, AIProvider } from "@/lib/ai/types";

/**
 * MOCK AI SAĞLAYICISI
 * ---------------------------------------------------------------------------
 * Gerçek bir dil modeli anahtarı (örn. OPENAI_API_KEY) tanımlanmadığında
 * kullanılan, kural tabanlı/anahtar kelime eşlemeli basit bir sağlayıcıdır.
 *
 * Önemli ilke: Bu sağlayıcı yalnızca Bilgi Bankası'ndaki (knowledgeBase)
 * GERÇEK içerikleri kullanarak yanıt üretir. Bilgi bankasında eşleşen bir
 * içerik yoksa yanıt uydurmaz; bunun yerine `requiresHuman: true` döndürüp
 * konuşmayı bir operatöre yönlendirmeyi önerir.
 * ---------------------------------------------------------------------------
 */

const intentKeywords: Record<Exclude<AIIntent, "UNKNOWN" | "OTHER">, string[]> = {
  SHIPPING: ["kargo", "ne zaman gelir", "ne zaman kargoya", "takip", "gönderi"],
  DELIVERY: ["teslim", "teslimat", "elime geç", "ulaş"],
  RETURN: ["iade", "değişim", "geri gönder", "hasarlı", "kırık", "bozuk", "arızalı"],
  PRODUCT: ["ürün", "renk", "beden", "stok", "model", "özellik"],
  PAYMENT: ["ödeme", "kapıda ödeme", "havale", "kredi kartı", "fatura", "taksit"],
  ORDER_STATUS: ["siparişim", "sipariş durumu", "sipariş numar", "nerede"],
};

const intentToCategory: Record<
  Exclude<AIIntent, "UNKNOWN" | "OTHER">,
  KnowledgeBaseCategory
> = {
  SHIPPING: "SHIPPING",
  DELIVERY: "SHIPPING",
  RETURN: "RETURNS",
  PRODUCT: "PRODUCT",
  PAYMENT: "PAYMENT",
  ORDER_STATUS: "SHIPPING",
};

/** Hassas konular — bu kelimeler geçtiğinde her zaman insana yönlendirilir. */
const sensitiveKeywords = ["hasarlı", "kırık", "bozuk", "arızalı", "yasal", "şikayet", "dolandır"];

function detectIntent(message: string): { intent: AIIntent; confidence: number } {
  const normalized = message.toLocaleLowerCase("tr-TR");

  let bestIntent: AIIntent = "UNKNOWN";
  let bestScore = 0;

  for (const [intent, keywords] of Object.entries(intentKeywords) as [
    Exclude<AIIntent, "UNKNOWN" | "OTHER">,
    string[],
  ][]) {
    const matches = keywords.filter((k) => normalized.includes(k)).length;
    if (matches > bestScore) {
      bestScore = matches;
      bestIntent = intent;
    }
  }

  if (bestScore === 0) {
    return { intent: "UNKNOWN", confidence: 0.3 };
  }

  const confidence = Math.min(0.6 + bestScore * 0.15, 0.95);
  return { intent: bestIntent, confidence };
}

function containsSensitiveTopic(message: string): boolean {
  const normalized = message.toLocaleLowerCase("tr-TR");
  return sensitiveKeywords.some((k) => normalized.includes(k));
}

const toneIntros: Record<NonNullable<AIDraftInput["tone"]>, string> = {
  profesyonel: "Merhaba, ilginiz için teşekkür ederiz.",
  samimi: "Merhaba! 😊",
  resmi: "Sayın müşterimiz, talebinizi aldık.",
};

export const mockAIProvider: AIProvider = {
  id: "mock",
  displayName: "Yerleşik Kural Tabanlı Asistan (Mock)",

  async generateDraft(input: AIDraftInput): Promise<AIDraftResult> {
    const { message, knowledgeBase, tone = "profesyonel" } = input;

    const isSensitive = containsSensitiveTopic(message);
    const { intent, confidence } = detectIntent(message);

    if (isSensitive) {
      return {
        intent: intent === "UNKNOWN" ? "RETURN" : intent,
        confidence: 0.5,
        reply:
          "Yaşadığınız sorunu önemsiyoruz. Konunuzu doğrudan bir müşteri temsilcimize yönlendiriyorum, en kısa sürede sizinle iletişime geçecektir.",
        requiresHuman: true,
      };
    }

    if (intent === "UNKNOWN") {
      return {
        intent: "UNKNOWN",
        confidence,
        reply:
          "Mesajınızı aldım, talebinizi daha iyi anlayabilmem için biraz daha detay verebilir misiniz? Gerekirse ekibimizden biri size yardımcı olacaktır.",
        requiresHuman: true,
      };
    }

    const category = intentToCategory[intent as Exclude<AIIntent, "UNKNOWN" | "OTHER">];
    const matchedEntry = knowledgeBase.find(
      (entry) => entry.isActive && entry.category === category,
    );

    if (!matchedEntry) {
      return {
        intent,
        confidence: confidence * 0.6,
        reply:
          "Bu konuyla ilgili elimde güncel/doğrulanmış bir bilgi bulunmuyor. Doğru bilgiyi verebilmek için bir operatörümüze yönlendiriyorum.",
        requiresHuman: true,
      };
    }

    const intro = toneIntros[tone];
    const reply = `${intro} ${matchedEntry.content}`.trim();

    return {
      intent,
      confidence,
      reply,
      requiresHuman: confidence < 0.65,
    };
  },
};
