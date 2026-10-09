import type { AIIntent } from "@/types";
import type { AIDraftInput, AIDraftResult, AIProvider } from "@/lib/ai/types";

/**
 * OPENAI SAĞLAYICISI
 * ---------------------------------------------------------------------------
 * OPENAI_API_KEY ortam değişkeni tanımlandığında kullanılan gerçek yapay zekâ
 * sağlayıcısı. Model, yalnızca Bilgi Bankası'ndaki içerikleri kullanarak yanıt
 * vermesi ve bilmediği konularda insana yönlendirmesi için açık talimatlarla
 * (system prompt) sınırlandırılır.
 *
 * Bu dosya OPENAI_API_KEY tanımlı olmadan ÇAĞRILMAMALIDIR; `getAIProvider()`
 * fabrikası bunu garanti eder (bkz. src/lib/ai/index.ts).
 * ---------------------------------------------------------------------------
 */

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const RESPONSE_SCHEMA_HINT = `Yanıtını SADECE şu JSON biçiminde ver, başka hiçbir metin ekleme:
{"intent": "SHIPPING|DELIVERY|RETURN|PRODUCT|PAYMENT|ORDER_STATUS|OTHER|UNKNOWN", "confidence": 0.0-1.0 arası sayı, "reply": "Türkçe yanıt metni", "requiresHuman": true|false}`;

function buildSystemPrompt(input: AIDraftInput): string {
  const kbText = input.knowledgeBase
    .filter((e) => e.isActive)
    .map((e) => `- [${e.category}] ${e.title}: ${e.content}`)
    .join("\n");

  const tone = input.tone ?? "profesyonel";

  return [
    "Sen Kargovo adlı bir e-ticaret işletmesinin Instagram DM müşteri hizmetleri asistanısın.",
    `Yanıtların kısa, doğal ve ${tone} bir Türkçe ile yazılmalı.`,
    "Yalnızca aşağıdaki doğrulanmış işletme bilgilerini kullanarak yanıt ver. Bu bilgilerin dışında KESİNLİKLE bilgi uydurma.",
    "Eğer sorunun cevabı bu bilgiler arasında yoksa veya konu hassas/belirsizse requiresHuman alanını true yap ve kısa, nazik bir yönlendirme mesajı yaz.",
    "--- DOĞRULANMIŞ İŞLETME BİLGİLERİ (BİLGİ BANKASI) ---",
    kbText || "(Bilgi bankası boş)",
    "--- SON ---",
    RESPONSE_SCHEMA_HINT,
  ].join("\n\n");
}

function safeParseIntent(value: unknown): AIIntent {
  const valid: AIIntent[] = [
    "SHIPPING",
    "DELIVERY",
    "RETURN",
    "PRODUCT",
    "PAYMENT",
    "ORDER_STATUS",
    "OTHER",
    "UNKNOWN",
  ];
  return valid.includes(value as AIIntent) ? (value as AIIntent) : "UNKNOWN";
}

export const openaiProvider: AIProvider = {
  id: "openai",
  displayName: "OpenAI",

  async generateDraft(input: AIDraftInput): Promise<AIDraftResult> {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY tanımlı değil. OpenAI sağlayıcısını kullanmak için .env dosyasına ekleyin.",
      );
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: buildSystemPrompt(input) },
          { role: "user", content: input.message },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      throw new Error(
        `OpenAI isteği başarısız oldu (HTTP ${response.status}): ${errorBody.slice(0, 300)}`,
      );
    }

    const data = await response.json();
    const content: string = data?.choices?.[0]?.message?.content ?? "{}";

    let parsed: {
      intent?: string;
      confidence?: number;
      reply?: string;
      requiresHuman?: boolean;
    };

    try {
      parsed = JSON.parse(content);
    } catch {
      // Model beklenen JSON biçimini döndürmediyse güvenli tarafta kal.
      return {
        intent: "UNKNOWN",
        confidence: 0.3,
        reply:
          "Talebinizi aldım, en doğru yanıtı verebilmemiz için bir operatörümüz kısa süre içinde sizinle ilgilenecek.",
        requiresHuman: true,
      };
    }

    return {
      intent: safeParseIntent(parsed.intent),
      confidence:
        typeof parsed.confidence === "number"
          ? Math.max(0, Math.min(1, parsed.confidence))
          : 0.5,
      reply: parsed.reply?.trim() || "Mesajınızı aldık, en kısa sürede dönüş yapacağız.",
      requiresHuman: Boolean(parsed.requiresHuman),
    };
  },
};
