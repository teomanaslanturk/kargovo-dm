"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Loader2, Save } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SettingsClientProps {
  isDemoUser: boolean;
  userName: string;
  userEmail: string;
}

export function SettingsClient({
  isDemoUser,
  userName,
  userEmail,
}: SettingsClientProps) {
  const [businessName, setBusinessName] = useState("Kargovo");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const [notifyNewMessage, setNotifyNewMessage] = useState(true);
  const [notifyOrderUpdate, setNotifyOrderUpdate] = useState(true);
  const [notifyWeeklyReport, setNotifyWeeklyReport] = useState(false);

  function handleSave() {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 500);
  }

  return (
    <Tabs defaultValue="general">
      <TabsList>
        <TabsTrigger value="general">Genel</TabsTrigger>
        <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
        <TabsTrigger value="account">Hesap</TabsTrigger>
        <TabsTrigger value="security">Güvenlik</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="mt-4 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">İşletme Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="business-name">İşletme Adı</Label>
              <Input
                id="business-name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium text-foreground">Bağlantılar</p>
              <Link
                href="/integrations"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                Instagram & Meta bağlantı ayarları
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/integrations"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                Yapay zekâ sağlayıcı ayarları
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saveState === "saving"}>
                {saveState === "saving" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : saveState === "saved" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saveState === "saved" ? "Kaydedildi" : "Kaydet"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-4 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Bildirim Tercihleri</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <NotificationRow
              label="Yeni mesaj bildirimleri"
              checked={notifyNewMessage}
              onCheckedChange={setNotifyNewMessage}
            />
            <Separator />
            <NotificationRow
              label="Sipariş durumu güncellemeleri"
              checked={notifyOrderUpdate}
              onCheckedChange={setNotifyOrderUpdate}
            />
            <Separator />
            <NotificationRow
              label="Haftalık özet raporu"
              checked={notifyWeeklyReport}
              onCheckedChange={setNotifyWeeklyReport}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="mt-4 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kullanıcı Hesabı</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Ad Soyad</Label>
              <Input value={userName} disabled />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>E-posta</Label>
              <Input value={userEmail} disabled />
            </div>
            {isDemoUser ? (
              <p className="rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Şu anda demo kullanıcı olarak giriş yaptınız. Gerçek kullanıcı
                hesapları veritabanı yapılandırıldıktan sonra{" "}
                <code className="rounded bg-background px-1 py-0.5">
                  Kullanıcılar
                </code>{" "}
                tablosundan yönetilecektir.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="mt-4 max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Güvenlik ve Oturum</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>
              Oturumlar güvenli, imzalı ve httpOnly çerezlerde (JWT) saklanır.
              Parolalar bcrypt ile hashlenir, hiçbir zaman düz metin olarak
              tutulmaz veya loglanmaz.
            </p>
            <p>
              Tüm kritik işlemler (giriş, ayar değişikliği, sipariş güncellemesi)
              <code className="mx-1 rounded bg-muted px-1 py-0.5">AuditLog</code>
              tablosuna kaydedilir.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function NotificationRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-foreground">{label}</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
