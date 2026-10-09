"use client";

import { useState } from "react";
import { BookOpen, HelpCircle, Plus, Pencil, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/shared/empty-state";
import { DemoBadge } from "@/components/shared/demo-badge";
import { KbEntryCard } from "@/components/knowledge-base/kb-entry-card";
import { KbFormDialog } from "@/components/knowledge-base/kb-form-dialog";
import { FaqFormDialog } from "@/components/knowledge-base/faq-form-dialog";
import type { FAQItem, KnowledgeBaseCategory, KnowledgeBaseEntry } from "@/types";

interface KnowledgeBaseClientProps {
  initialEntries: KnowledgeBaseEntry[];
  initialFaqs: FAQItem[];
}

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function KnowledgeBaseClient({
  initialEntries,
  initialFaqs,
}: KnowledgeBaseClientProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [faqs, setFaqs] = useState(initialFaqs);

  const [kbDialogOpen, setKbDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeBaseEntry | null>(null);

  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  function handleKbSubmit(values: {
    title: string;
    category: KnowledgeBaseCategory;
    content: string;
  }) {
    if (editingEntry) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingEntry.id
            ? { ...e, ...values, updatedAt: new Date().toISOString() }
            : e,
        ),
      );
    } else {
      setEntries((prev) => [
        {
          id: createId("kb"),
          ...values,
          isActive: true,
          isDemo: false,
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
    setEditingEntry(null);
  }

  function handleFaqSubmit(values: { question: string; answer: string }) {
    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) => (f.id === editingFaq.id ? { ...f, ...values } : f)),
      );
    } else {
      setFaqs((prev) => [
        { id: createId("faq"), ...values, isActive: true, isDemo: false },
        ...prev,
      ]);
    }
    setEditingFaq(null);
  }

  return (
    <Tabs defaultValue="kb">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="kb">
            <BookOpen className="h-4 w-4" />
            Bilgi Bankası
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4" />
            Sık Sorulan Sorular
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="kb" className="mt-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            AI asistanı yanıt üretirken yalnızca{" "}
            <span className="font-medium text-foreground">aktif</span> içerikleri kullanır.
          </p>
          <Button
            size="sm"
            onClick={() => {
              setEditingEntry(null);
              setKbDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Yeni İçerik
          </Button>
        </div>

        {entries.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="Henüz içerik eklenmedi"
            description="AI asistanının doğru yanıt verebilmesi için bilgi bankasına içerik ekleyin."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <KbEntryCard
                key={entry.id}
                entry={entry}
                onEdit={() => {
                  setEditingEntry(entry);
                  setKbDialogOpen(true);
                }}
                onDelete={() =>
                  setEntries((prev) => prev.filter((e) => e.id !== entry.id))
                }
                onToggleActive={(active) =>
                  setEntries((prev) =>
                    prev.map((e) =>
                      e.id === entry.id ? { ...e, isActive: active } : e,
                    ),
                  )
                }
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="faq" className="mt-4">
        <div className="mb-4 flex items-center justify-end">
          <Button
            size="sm"
            onClick={() => {
              setEditingFaq(null);
              setFaqDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Yeni Soru
          </Button>
        </div>

        {faqs.length === 0 ? (
          <EmptyState
            icon={HelpCircle}
            title="Henüz sık sorulan soru eklenmedi"
          />
        ) : (
          <div className="flex flex-col gap-2">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="flex items-start justify-between gap-3 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {faq.question}
                      </p>
                      {faq.isDemo ? <DemoBadge /> : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={faq.isActive}
                      onCheckedChange={(active) =>
                        setFaqs((prev) =>
                          prev.map((f) =>
                            f.id === faq.id ? { ...f, isActive: active } : f,
                          ),
                        )
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        setEditingFaq(faq);
                        setFaqDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() =>
                        setFaqs((prev) => prev.filter((f) => f.id !== faq.id))
                      }
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <KbFormDialog
        open={kbDialogOpen}
        onOpenChange={setKbDialogOpen}
        initialValue={editingEntry}
        onSubmit={handleKbSubmit}
      />
      <FaqFormDialog
        open={faqDialogOpen}
        onOpenChange={setFaqDialogOpen}
        initialValue={editingFaq}
        onSubmit={handleFaqSubmit}
      />
    </Tabs>
  );
}
