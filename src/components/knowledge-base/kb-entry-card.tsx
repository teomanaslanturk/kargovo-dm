"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { DemoBadge } from "@/components/shared/demo-badge";
import { knowledgeBaseCategoryLabels } from "@/lib/labels";
import { formatDate } from "@/lib/format";
import type { KnowledgeBaseEntry } from "@/types";

interface KbEntryCardProps {
  entry: KnowledgeBaseEntry;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: (active: boolean) => void;
}

export function KbEntryCard({
  entry,
  onEdit,
  onDelete,
  onToggleActive,
}: KbEntryCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusBadge
              label={knowledgeBaseCategoryLabels[entry.category]}
              className="border-sky-200 bg-sky-50 text-sky-700"
            />
            {entry.isDemo ? <DemoBadge /> : null}
          </div>
          <Switch checked={entry.isActive} onCheckedChange={onToggleActive} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">{entry.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
            {entry.content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            Güncellendi: {formatDate(entry.updatedAt)}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Düzenle">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              aria-label="Sil"
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
