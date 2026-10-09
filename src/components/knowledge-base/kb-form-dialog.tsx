"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { knowledgeBaseCategoryLabels } from "@/lib/labels";
import type { KnowledgeBaseCategory, KnowledgeBaseEntry } from "@/types";

const kbEntrySchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı").max(120),
  category: z.enum([
    "PRODUCT",
    "SHIPPING",
    "RETURNS",
    "PAYMENT",
    "HOURS",
    "CONTACT",
    "OTHER",
  ]),
  content: z.string().min(5, "İçerik en az 5 karakter olmalı").max(2000),
});

interface KbFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: KnowledgeBaseEntry | null;
  onSubmit: (values: {
    title: string;
    category: KnowledgeBaseCategory;
    content: string;
  }) => void;
}

const categories = Object.entries(knowledgeBaseCategoryLabels) as [
  KnowledgeBaseCategory,
  string,
][];

export function KbFormDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: KbFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* `key`, formun her açılışında (ve farklı bir kayıt düzenlendiğinde)
            state'in temiz bir şekilde yeniden başlatılmasını sağlar; bu sayede
            `useEffect` içinde setState çağırmaya gerek kalmaz. */}
        <KbForm
          key={open ? initialValue?.id ?? "new" : "closed"}
          initialValue={initialValue}
          onCancel={() => onOpenChange(false)}
          onSubmit={(values) => {
            onSubmit(values);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function KbForm({
  initialValue,
  onCancel,
  onSubmit,
}: {
  initialValue?: KnowledgeBaseEntry | null;
  onCancel: () => void;
  onSubmit: (values: {
    title: string;
    category: KnowledgeBaseCategory;
    content: string;
  }) => void;
}) {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [category, setCategory] = useState<KnowledgeBaseCategory>(
    initialValue?.category ?? "PRODUCT",
  );
  const [content, setContent] = useState(initialValue?.content ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit() {
    const result = kbEntrySchema.safeParse({ title, category, content });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {initialValue ? "İçeriği Düzenle" : "Yeni Bilgi Bankası İçeriği"}
        </DialogTitle>
        <DialogDescription>
          AI asistanı yalnızca burada tanımlı ve aktif içerikleri kullanarak yanıt üretir.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="kb-title">Başlık</Label>
          <Input
            id="kb-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn. Kargo Süreleri"
          />
          {errors.title ? (
            <p className="text-xs text-destructive">{errors.title}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="kb-category">Kategori</Label>
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as KnowledgeBaseCategory)}
          >
            <SelectTrigger id="kb-category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="kb-content">İçerik</Label>
          <Textarea
            id="kb-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Müşterilere iletilecek doğru ve güncel bilgiyi yazın..."
            className="min-h-28"
          />
          {errors.content ? (
            <p className="text-xs text-destructive">{errors.content}</p>
          ) : null}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Vazgeç
        </Button>
        <Button onClick={handleSubmit}>{initialValue ? "Kaydet" : "Ekle"}</Button>
      </DialogFooter>
    </>
  );
}
