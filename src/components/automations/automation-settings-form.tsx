"use client";

import { useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { AutomationSettings } from "@/types";

interface AutomationSettingsFormProps {
  initialSettings: AutomationSettings;
}

type SaveState = "idle" | "saving" | "saved";

export function AutomationSettingsForm({
  initialSettings,
}: AutomationSettingsFormProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  function update<K extends keyof AutomationSettings>(
    key: K,
    value: AutomationSettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaveState("idle");
  }

  function handleSave() {
    // Not: Gerçek veritabanı bağlandığında bu değerler
    // `AutomationSettings` tablosuna yazılacaktır (tek satır, upsert).
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 500);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Otomasyon Anahtarları</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ToggleRow
            label="AI Asistanı"
            description="Gelen mesajları analiz edip yanıt önerileri üretir."
            checked={settings.aiAssistantEnabled}
            onCheckedChange={(v) => update("aiAssistantEnabled", v)}
          />
          <Separator />
          <ToggleRow
            label="Otomatik Yanıt"
            description="AI tarafından üretilen yanıtlar, onay beklemeden doğrudan gönderilir."
            checked={settings.autoReplyEnabled}
            onCheckedChange={(v) => update("autoReplyEnabled", v)}
          />
          <Separator />
          <ToggleRow
            label="Göndermeden Önce Operatör Onayı"
            description="Açıksa, AI yanıtları her zaman bir operatör tarafından gözden geçirilip onaylanmadan gönderilmez."
            checked={settings.requireApprovalBeforeSend}
            onCheckedChange={(v) => update("requireApprovalBeforeSend", v)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Çalışma Saatleri</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="working-start">Başlangıç</Label>
            <Input
              id="working-start"
              type="time"
              value={settings.workingHoursStart}
              onChange={(e) => update("workingHoursStart", e.target.value)}
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="working-end">Bitiş</Label>
            <Input
              id="working-end"
              type="time"
              value={settings.workingHoursEnd}
              onChange={(e) => update("workingHoursEnd", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Mesaj İçerikleri</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="welcome-message">Karşılama Mesajı</Label>
            <Textarea
              id="welcome-message"
              value={settings.welcomeMessage}
              onChange={(e) => update("welcomeMessage", e.target.value)}
              className="min-h-20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="handoff-rules">İnsan Operatöre Aktarma Kuralları</Label>
            <Textarea
              id="handoff-rules"
              value={settings.handoffRules}
              onChange={(e) => update("handoffRules", e.target.value)}
              className="min-h-20"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ai-tone">AI Yanıt Tonu</Label>
            <Select
              value={settings.aiTone}
              onValueChange={(v) =>
                update("aiTone", v as AutomationSettings["aiTone"])
              }
            >
              <SelectTrigger id="ai-tone" className="w-full sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profesyonel">Profesyonel</SelectItem>
                <SelectItem value="samimi">Samimi</SelectItem>
                <SelectItem value="resmi">Resmi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-2">
        <Button onClick={handleSave} disabled={saveState === "saving"}>
          {saveState === "saving" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saveState === "saved" ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saveState === "saved" ? "Kaydedildi" : "Ayarları Kaydet"}
        </Button>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
