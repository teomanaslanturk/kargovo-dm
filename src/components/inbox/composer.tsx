"use client";

import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ComposerProps {
  disabled?: boolean;
  disabledReason?: string;
  onSend: (content: string, wasAiAssisted: boolean) => void;
  onRequestAiDraft: () => Promise<string | null>;
}

export function Composer({
  disabled,
  disabledReason,
  onSend,
  onRequestAiDraft,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const [isAiOrigin, setIsAiOrigin] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleAiDraft() {
    setIsGenerating(true);
    try {
      const draft = await onRequestAiDraft();
      if (draft) {
        setValue(draft);
        setIsAiOrigin(true);
      }
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed, isAiOrigin);
    setValue("");
    setIsAiOrigin(false);
  }

  return (
    <div className="flex flex-col gap-2 border-t border-border p-3">
      {disabled && disabledReason ? (
        <p className="rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-700">
          {disabledReason}
        </p>
      ) : null}
      <Textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (isAiOrigin) setIsAiOrigin(false);
        }}
        placeholder="Mesajınızı yazın..."
        className="min-h-20 resize-none"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || isGenerating}
          onClick={handleAiDraft}
        >
          {isGenerating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
          AI Yanıt Öner
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={disabled || !value.trim()}
          onClick={handleSend}
        >
          <Send className="h-3.5 w-3.5" />
          Gönder
        </Button>
      </div>
    </div>
  );
}
