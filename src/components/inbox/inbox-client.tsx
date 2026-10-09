"use client";

import { useMemo, useState } from "react";
import { ConversationList } from "@/components/inbox/conversation-list";
import { ConversationThread } from "@/components/inbox/conversation-thread";
import { EmptyState } from "@/components/shared/empty-state";
import { MessageCircle } from "lucide-react";
import type { Conversation, ConversationStatus, Message } from "@/types";

interface InboxClientProps {
  initialConversations: Conversation[];
}

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function InboxClient({ initialConversations }: InboxClientProps) {
  const [conversations, setConversations] = useState<Conversation[]>(
    initialConversations,
  );
  const [activeId, setActiveId] = useState<string | null>(
    initialConversations[0]?.id ?? null,
  );
  const [aiError, setAiError] = useState<string | null>(null);

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId],
  );

  function selectConversation(id: string) {
    setActiveId(id);
    setAiError(null);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isUnread: false } : c)),
    );
  }

  function updateStatus(id: string, status: ConversationStatus) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  }

  function toggleAutoReply(id: string, enabled: boolean) {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, autoReplyEnabled: enabled } : c)),
    );
  }

  function sendMessage(id: string, content: string, wasAiAssisted: boolean) {
    const now = new Date().toISOString();
    const newMessage: Message = {
      id: createMessageId(),
      conversationId: id,
      sender: wasAiAssisted ? "AI" : "AGENT",
      content,
      isAiGenerated: wasAiAssisted,
      isDemo: true,
      createdAt: now,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessageAt: now,
              lastMessagePreview: content,
              status: c.status === "IMPORTANT" ? "IMPORTANT" : "REPLIED",
            }
          : c,
      ),
    );
  }

  async function requestAiDraft(id: string): Promise<string | null> {
    setAiError(null);
    const conversation = conversations.find((c) => c.id === id);
    if (!conversation) return null;

    const lastCustomerMessage = [...conversation.messages]
      .reverse()
      .find((m) => m.sender === "CUSTOMER");

    if (!lastCustomerMessage) {
      setAiError("Yanıt önerisi oluşturmak için önce müşteriden bir mesaj gelmesi gerekiyor.");
      return null;
    }

    try {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastCustomerMessage.content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAiError(data?.error ?? "AI yanıtı oluşturulamadı.");
        return null;
      }

      if (data.requiresHuman) {
        setAiError(
          "AI bu konuda düşük güvenle yanıt üretti. Göndermeden önce lütfen dikkatlice gözden geçirin.",
        );
      }

      return data.reply as string;
    } catch {
      setAiError("AI servisine bağlanılamadı. Lütfen manuel yanıt yazın.");
      return null;
    }
  }

  if (conversations.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="Henüz konuşma yok"
        description="Instagram hesabınızı bağladığınızda gelen mesajlar burada görünecek."
      />
    );
  }

  return (
    <div className="flex h-[calc(100vh-7.5rem)] overflow-hidden rounded-xl border border-border bg-card">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={selectConversation}
      />

      {activeConversation ? (
        <div className="flex flex-1 flex-col">
          {aiError ? (
            <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700">
              {aiError}
            </div>
          ) : null}
          <ConversationThread
            conversation={activeConversation}
            onStatusChange={(status) => updateStatus(activeConversation.id, status)}
            onToggleAutoReply={(enabled) =>
              toggleAutoReply(activeConversation.id, enabled)
            }
            onSend={(content, wasAiAssisted) =>
              sendMessage(activeConversation.id, content, wasAiAssisted)
            }
            onRequestAiDraft={() => requestAiDraft(activeConversation.id)}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            icon={MessageCircle}
            title="Bir konuşma seçin"
            description="Soldaki listeden bir konuşma seçerek mesajları görüntüleyin."
          />
        </div>
      )}
    </div>
  );
}
