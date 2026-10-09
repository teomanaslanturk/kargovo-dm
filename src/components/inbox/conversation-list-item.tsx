"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { conversationStatusLabels, conversationStatusStyles } from "@/lib/labels";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/types";

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
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

export function ConversationListItem({
  conversation,
  isActive,
  onSelect,
}: ConversationListItemProps) {
  const { customer } = conversation;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors",
        isActive ? "bg-accent" : "hover:bg-muted/60",
      )}
    >
      <Avatar>
        <AvatarFallback className="bg-primary/10 text-primary">
          {initials(customer.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "truncate text-sm",
              conversation.isUnread ? "font-semibold text-foreground" : "font-medium text-foreground/90",
            )}
          >
            {customer.name ?? customer.igUsername}
          </span>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {formatRelativeTime(conversation.lastMessageAt)}
          </span>
        </div>
        <p
          className={cn(
            "mt-0.5 truncate text-xs",
            conversation.isUnread ? "font-medium text-foreground/80" : "text-muted-foreground",
          )}
        >
          {conversation.lastMessagePreview}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <StatusBadge
            label={conversationStatusLabels[conversation.status]}
            className={conversationStatusStyles[conversation.status]}
          />
          {conversation.isUnread ? (
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          ) : null}
        </div>
      </div>
    </button>
  );
}
