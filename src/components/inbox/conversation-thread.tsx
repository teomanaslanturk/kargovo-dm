"use client";

import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { MessageBubble } from "@/components/inbox/message-bubble";
import { Composer } from "@/components/inbox/composer";
import { DemoBadge } from "@/components/shared/demo-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  conversationStatusLabels,
  conversationStatusStyles,
} from "@/lib/labels";
import type { Conversation, ConversationStatus } from "@/types";

interface ConversationThreadProps {
  conversation: Conversation;
  onStatusChange: (status: ConversationStatus) => void;
  onToggleAutoReply: (enabled: boolean) => void;
  onSend: (content: string, wasAiAssisted: boolean) => void;
  onRequestAiDraft: () => Promise<string | null>;
}

function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const statusOptions: ConversationStatus[] = ["WAITING", "REPLIED", "IMPORTANT"];

export function ConversationThread({
  conversation,
  onStatusChange,
  onToggleAutoReply,
  onSend,
  onRequestAiDraft,
}: ConversationThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [conversation.messages.length, conversation.id]);

  const { customer } = conversation;

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground">
                {customer.name ?? customer.igUsername}
              </p>
              {conversation.isDemo ? <DemoBadge /> : null}
            </div>
            <p className="text-xs text-muted-foreground">
              @{customer.igUsername} {customer.phone ? `· ${customer.phone}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <Switch
              id="auto-reply-toggle"
              checked={conversation.autoReplyEnabled}
              onCheckedChange={onToggleAutoReply}
            />
            <Label htmlFor="auto-reply-toggle" className="text-xs text-muted-foreground">
              Otomatik yanıt
            </Label>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
              <StatusBadge
                label={conversationStatusLabels[conversation.status]}
                className={conversationStatusStyles[conversation.status]}
              />
              <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onStatusChange(status)}
                >
                  {conversationStatusLabels[status]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 scrollbar-thin"
      >
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <Composer
        onSend={onSend}
        onRequestAiDraft={onRequestAiDraft}
        disabled={!conversation.autoReplyEnabled && conversation.status === "IMPORTANT"}
        disabledReason={
          !conversation.autoReplyEnabled && conversation.status === "IMPORTANT"
            ? "Bu konuşma bir operatöre atandı. Mesaj yazabilmek için konuşmayı yeniden açın."
            : undefined
        }
      />
    </div>
  );
}
