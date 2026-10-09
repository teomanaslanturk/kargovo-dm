"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FAQItem } from "@/types";

const faqSchema = z.object({
  question: z.string().min(5, "Soru en az 5 karakter olmalı").max(200),
  answer: z.string().min(5, "Cevap en az 5 karakter olmalı").max(1000),
});

interface FaqFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: FAQItem | null;
  onSubmit: (values: { question: string; answer: string }) => void;
}

export function FaqFormDialog({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
}: FaqFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {/* `key`, formun her açılışında state'in temiz başlatılmasını sağlar. */}
        <FaqForm
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

function FaqForm({
  initialValue,
  onCancel,
  onSubmit,
}: {
  initialValue?: FAQItem | null;
  onCancel: () => void;
  onSubmit: (values: { question: string; answer: string }) => void;
}) {
  const [question, setQuestion] = useState(initialValue?.question ?? "");
  const [answer, setAnswer] = useState(initialValue?.answer ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit() {
    const result = faqSchema.safeParse({ question, answer });
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
          {initialValue ? "Soruyu Düzenle" : "Yeni Sık Sorulan Soru"}
        </DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="faq-question">Soru</Label>
          <Input
            id="faq-question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Örn. Kargo süresi ne kadar?"
          />
          {errors.question ? (
            <p className="text-xs text-destructive">{errors.question}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="faq-answer">Cevap</Label>
          <Textarea
            id="faq-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="min-h-24"
          />
          {errors.answer ? (
            <p className="text-xs text-destructive">{errors.answer}</p>
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
