import { aiProvider } from "@/lib/config";
import { mockAIProvider } from "@/lib/ai/providers/mock-provider";
import { openaiProvider } from "@/lib/ai/providers/openai-provider";
import type { AIProvider } from "@/lib/ai/types";

export type { AIDraftInput, AIDraftResult, AIProvider } from "@/lib/ai/types";

/**
 * Aktif yapay zekâ sağlayıcısını döndüren fabrika.
 *
 * AI_PROVIDER="openai" ve OPENAI_API_KEY tanımlıysa OpenAI sağlayıcısı,
 * aksi halde (anahtar yoksa veya AI_PROVIDER="mock" ise) yerleşik kural
 * tabanlı mock sağlayıcı kullanılır. Bu sayede uygulama hiçbir zaman
 * eksik yapılandırmayla çökmez.
 */
export function getAIProvider(): AIProvider {
  if (aiProvider === "openai" && process.env.OPENAI_API_KEY) {
    return openaiProvider;
  }
  return mockAIProvider;
}

export const isUsingRealAiProvider = () => getAIProvider().id !== "mock";
