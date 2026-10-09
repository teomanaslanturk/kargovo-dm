import { Bot, Info } from "lucide-react";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  if (message.sender === "SYSTEM") {
    return (
      <div className="flex items-center gap-2 self-center rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground">
        <Info className="h-3.5 w-3.5" />
        {message.content}
      </div>
    );
  }

  const isOutgoing = message.sender === "AGENT" || message.sender === "AI";

  return (
    <div
      className={cn(
        "flex max-w-[80%] flex-col gap-1",
        isOutgoing ? "self-end items-end" : "self-start items-start",
      )}
    >
      <div
        className={cn(
          "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isOutgoing
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
      <div className="flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
        {message.isAiGenerated ? (
          <span className="flex items-center gap-0.5">
            <Bot className="h-3 w-3" /> AI
          </span>
        ) : null}
        <span>{formatTime(message.createdAt)}</span>
      </div>
    </div>
  );
}
