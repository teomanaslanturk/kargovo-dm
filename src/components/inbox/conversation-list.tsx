"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyState } from "@/components/shared/empty-state";
import { Inbox } from "lucide-react";
import { ConversationListItem } from "@/components/inbox/conversation-list-item";
import type { Conversation, ConversationStatus } from "@/types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

type FilterValue = "ALL" | ConversationStatus;

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("ALL");

  const filtered = conversations.filter((c) => {
    const matchesFilter = filter === "ALL" || c.status === filter;
    const query = search.trim().toLocaleLowerCase("tr-TR");
    const matchesSearch =
      !query ||
      c.customer.name?.toLocaleLowerCase("tr-TR").includes(query) ||
      c.customer.igUsername?.toLocaleLowerCase("tr-TR").includes(query) ||
      c.lastMessagePreview.toLocaleLowerCase("tr-TR").includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-full w-full flex-col border-r border-border lg:w-[340px] lg:shrink-0">
      <div className="flex flex-col gap-3 border-b border-border p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Müşteri veya mesaj ara..."
            className="h-9 pl-9"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
          <TabsList className="w-full">
            <TabsTrigger value="ALL" className="flex-1">
              Tümü
            </TabsTrigger>
            <TabsTrigger value="WAITING" className="flex-1">
              Bekliyor
            </TabsTrigger>
            <TabsTrigger value="REPLIED" className="flex-1">
              Yanıtlandı
            </TabsTrigger>
            <TabsTrigger value="IMPORTANT" className="flex-1">
              Önemli
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={Inbox}
              title="Sonuç bulunamadı"
              description="Arama veya filtre kriterlerinize uygun konuşma yok."
            />
          </div>
        ) : (
          filtered.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeId}
              onSelect={() => onSelect(conversation.id)}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
}
