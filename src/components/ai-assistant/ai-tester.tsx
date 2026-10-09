"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { aiIntentLabels } from "@/lib/labels";
import type { AIIntent } from "@/types";

interface DraftResponse {
  intent: AIIntent;
  confidence: number;
  reply: string;
  requiresHuman: boolean;
  provider: string;
}

export function AiTester() {
  const [message, setMessage] = useState(
    "Merhaba, siparişim ne zaman kargoya verilecek?",
  );
  const [result, setResult] = useState<DraftResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleTest() {
    if (!message.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Bir hata oluştu.");
        return;
      }

      setResult(data as DraftResponse);
    } catch {
      setError("AI servisine bağlanılamadı.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">AI Asistanını Test Et</CardTitle>
        <p className="text-sm text-muted-foreground">
          Örnek bir müşteri mesajı yazın; AI&apos;nın niyeti nasıl sınıflandırdığını ve
          hangi yanıtı önerdiğini görün. Bu panel yanıtı göndermez, sadece önizler.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Müşteri mesajını buraya yazın..."
          className="min-h-24"
        />
        <div>
          <Button onClick={handleTest} disabled={isLoading || !message.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            Analiz Et
          </Button>
        </div>

        {error ? (
          <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                label={`Niyet: ${aiIntentLabels[result.intent]}`}
                className="border-indigo-200 bg-indigo-50 text-indigo-700"
              />
              <StatusBadge
                label={`Güven: %${Math.round(result.confidence * 100)}`}
                className="border-slate-200 bg-slate-50 text-slate-700"
              />
              <StatusBadge
                label={`Sağlayıcı: ${result.provider === "mock" ? "Yerleşik (Mock)" : result.provider}`}
                className="border-sky-200 bg-sky-50 text-sky-700"
              />
              {result.requiresHuman ? (
                <StatusBadge
                  label="İnsan onayı önerilir"
                  className="border-amber-200 bg-amber-50 text-amber-700"
                />
              ) : null}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Önerilen Yanıt
              </p>
              <p className="mt-1 text-sm text-foreground">{result.reply}</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
