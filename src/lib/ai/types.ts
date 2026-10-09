import type { AIIntent, KnowledgeBaseEntry } from "@/types";

export interface AIDraftInput {
  /** Müşteriden gelen son mesaj */
  message: string;
  /** Yanıt önerisi oluştururken kullanılacak aktif bilgi bankası içerikleri */
  knowledgeBase: KnowledgeBaseEntry[];
  /** Otomasyon ayarlarından gelen ton tercihi */
  tone?: "profesyonel" | "samimi" | "resmi";
  /** İşletme karşılama mesajı (ilk mesajsa kullanılabilir) */
  businessContext?: string;
}

export interface AIDraftResult {
  intent: AIIntent;
  /** 0 ile 1 arasında güven skoru */
  confidence: number;
  /** Önerilen yanıt metni */
  reply: string;
  /** Güven skoru düşükse veya hassas bir konu tespit edilirse true olur */
  requiresHuman: boolean;
}

/**
 * Sağlayıcıdan bağımsız yapay zekâ servis arayüzü.
 *
 * Yeni bir sağlayıcı eklemek için bu arayüzü uygulayan bir sınıf/obje yazıp
 * `src/lib/ai/index.ts` içindeki `getAIProvider()` fabrikasına ekleyin.
 * Böylece uygulamanın geri kalanı hangi sağlayıcının kullanıldığını bilmek
 * zorunda kalmaz.
 */
export interface AIProvider {
  readonly id: "mock" | "openai";
  readonly displayName: string;
  generateDraft(input: AIDraftInput): Promise<AIDraftResult>;
}
