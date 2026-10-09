# Kargovo DM Asistanı

Instagram DM mesajlarını tek panelden yönetmeyi, yapay zekâ destekli yanıtlar
hazırlamayı ve sipariş/kargo süreçlerini kolaylaştırmayı amaçlayan modern bir
yönetim paneli.

> **Önemli:** Bu proje, henüz gerçek bir Instagram/Meta bağlantısı ve
> veritabanı yapılandırılmadan da **Demo Modu**'nda tam işlevsel olarak
> çalışır. Aşağıdaki adımları takip ederek gerçek verilerle çalışır hale
> getirebilirsiniz.

---

## 1. Teknoloji Altyapısı

| Katman | Teknoloji |
| --- | --- |
| Frontend | Next.js 16 (App Router) + TypeScript |
| Arayüz | Tailwind CSS v4 + shadcn/ui (Base UI) |
| Veritabanı | PostgreSQL |
| ORM | Prisma 6 |
| Backend | Next.js Route Handlers |
| Kimlik doğrulama | Auth.js (NextAuth v5) — JWT tabanlı güvenli oturum |
| Yapay zekâ | Sağlayıcıdan bağımsız servis katmanı (`mock` / `openai`) |
| Instagram entegrasyonu | Meta Instagram Messaging API (webhook) |
| Form doğrulama | Zod |
| İkonlar | Lucide React |

---

## 2. Hızlı Başlangıç (Demo Modu)

Veritabanı veya Meta anahtarı olmadan panelin tüm arayüzünü görmek için:

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine gidin. `/login` sayfasında
**demo giriş bilgileri otomatik doldurulur**:

- E-posta: `demo@kargovo.com`
- Parola: `demo1234`

Bu modda:
- Sol menüde ve sayfa başlıklarında **"Demo Modu" / "DEMO"** rozetleri görünür.
- Gelen kutusu, siparişler, bilgi bankası vb. gerçekçi ama **gerçek olmayan**
  örnek verilerle doldurulur (`src/lib/demo-data.ts`).
- AI Asistanı, yerleşik kural tabanlı bir "mock" sağlayıcı ile çalışır.

---

## 3. Gerçek Ortam Kurulumu

### 3.1 Ortam Değişkenleri

```bash
cp .env.example .env
```

`.env` dosyasını açıp aşağıdaki bölümleri doldurun (ayrıntılı açıklamalar
dosyanın içinde yorum olarak yer alır):

- **`DATABASE_URL`** — PostgreSQL bağlantı adresi.
- **`AUTH_SECRET`** — `openssl rand -base64 32` ile üretilen güçlü bir anahtar.
- **`META_APP_ID` / `META_APP_SECRET` / `META_PAGE_ACCESS_TOKEN` /
  `META_WEBHOOK_VERIFY_TOKEN`** — Instagram bağlantısı için (bkz. 3.3).
- **`AI_PROVIDER` / `OPENAI_API_KEY`** — Yapay zekâ sağlayıcısı için (bkz. 3.4).
- **`NEXT_PUBLIC_FORCE_DEMO_MODE`** — `"false"` yapıldığında, veritabanı
  yapılandırılmışsa uygulama gerçek verilerle çalışmaya başlar.

> `.env` dosyası `.gitignore` ile hariç tutulmuştur, asla commit etmeyin.
> Hiçbir gizli anahtarı kaynak koduna yazmayın.

### 3.2 Veritabanı

```bash
npm run db:migrate     # Prisma migration'ları oluşturur/uygular
npm run db:seed        # Bir yönetici kullanıcı + varsayılan ayarları ekler
```

Seed betiği varsayılan olarak `admin@kargovo.com` / `ChangeMe123!` ile bir
yönetici hesabı oluşturur (ilk girişten sonra parolayı değiştirin). Farklı bir
hesap için `.env` içine `SEED_ADMIN_EMAIL` ve `SEED_ADMIN_PASSWORD`
ekleyebilirsiniz.

Veritabanı şemasını görsel olarak incelemek için:

```bash
npm run db:studio
```

### 3.3 Instagram / Meta Messaging API Bağlantısı

1. [Meta for Developers](https://developers.facebook.com/apps) üzerinden bir
   uygulama oluşturun ve **Instagram Messaging API** ürününü ekleyin.
2. Instagram hesabınızın **Professional/Business** hesabı olması ve bir
   Facebook Sayfası'na bağlı olması gerekir.
3. Uygulama panelinden `App ID`, `App Secret` ve sayfa erişim token'ını alıp
   `.env` dosyasına yazın.
4. Webhook URL'si olarak şunu tanımlayın:
   ```
   https://alan-adiniz.com/api/webhooks/instagram
   ```
   Doğrulama (verify) token'ı olarak `.env` içindeki
   `META_WEBHOOK_VERIFY_TOKEN` değerini kullanın.
5. `messages` ve `messaging_postbacks` webhook alanlarına abone olun.

Bu değerler tanımlanana kadar sistem otomatik olarak **Demo Modu**'nda kalır
ve gerçek bir bağlantı varmış gibi davranmaz — bu durum panelde ve
**Entegrasyonlar** sayfasında açıkça gösterilir.

### 3.4 Yapay Zekâ Sağlayıcısı

Varsayılan sağlayıcı `mock`'tur (anahtar gerektirmez, kural tabanlı çalışır).
OpenAI kullanmak için:

```env
AI_PROVIDER="openai"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

Yeni bir sağlayıcı eklemek isterseniz `src/lib/ai/types.ts` içindeki
`AIProvider` arayüzünü uygulayıp `src/lib/ai/index.ts` içindeki fabrikaya
ekleyin — uygulamanın geri kalanı sağlayıcıdan bağımsız çalışır.

---

## 4. Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesi oluşturur |
| `npm run start` | Üretim derlemesini çalıştırır |
| `npm run lint` | ESLint kontrolü |
| `npm run typecheck` | TypeScript tip kontrolü |
| `npm run db:migrate` | Prisma migration oluşturur/uygular |
| `npm run db:seed` | Veritabanını temel verilerle tohumlar |
| `npm run db:studio` | Prisma Studio'yu açar |

---

## 5. Proje Yapısı

```
src/
  app/
    (auth)/login/        → Giriş ekranı
    (dashboard)/          → Oturum gerektiren tüm panel sayfaları
      dashboard/          → Genel bakış
      inbox/               → DM Gelen Kutusu
      ai-assistant/        → AI Asistanı test paneli
      automations/         → Otomasyon ayarları
      orders/              → Siparişler
      shipments/           → Kargo Takibi
      knowledge-base/      → Bilgi Bankası & SSS
      integrations/        → Entegrasyon durumları
      settings/            → Ayarlar
    api/
      auth/[...nextauth]/  → Auth.js route handler
      ai/draft/            → AI yanıt taslağı üretimi
      webhooks/instagram/  → Meta webhook alıcısı
  components/              → UI bileşenleri (ui/, layout/, inbox/, ...)
  lib/
    ai/                    → Sağlayıcıdan bağımsız AI servis katmanı
    instagram/              → Webhook imza doğrulama & ayrıştırma
    demo-data.ts            → Açıkça işaretlenmiş örnek veriler
    config.ts                → Demo modu / entegrasyon durumu tespiti
    db.ts                     → Prisma Client (DB yoksa null döner)
    auth.ts                   → NextAuth yapılandırması
  types/                    → Paylaşılan TypeScript tipleri
prisma/
  schema.prisma             → Veritabanı şeması
  seed.ts                    → Temel veri tohumlama betiği
```

---

## 6. Güvenlik Notları

- API anahtarları ve erişim token'ları yalnızca sunucu tarafında
  (`process.env`) okunur, istemciye hiçbir zaman gönderilmez.
- Parolalar `bcryptjs` ile hashlenir; düz metin olarak saklanmaz veya loglanmaz.
- Oturumlar imzalı, httpOnly JWT çerezlerinde tutulur (`AUTH_SECRET`).
- Instagram webhook istekleri `X-Hub-Signature-256` imzası ile doğrulanır;
  imza geçersizse istek reddedilir.
- Webhook mesajları `igMessageId` üzerinden tekilleştirilir (idempotency) —
  Meta'nın tekrar gönderdiği olaylar birden fazla kez işlenmez.
- Kritik işlemler (giriş, ayar/sipariş güncelleme) için `AuditLog` modeli
  hazırdır.
- AI tarafından üretilen yanıtlar **hiçbir zaman** otomatik olarak
  gönderilmez; her zaman bir operatör tarafından gözden geçirilmesi/onaylanması
  gerekir (bkz. Otomasyonlar → "Göndermeden önce operatör onayı").
- `middleware.ts`, tüm `(dashboard)` rotalarını oturum kontrolünden geçirir;
  oturumu olmayan istekler `/login`'e yönlendirilir.

---

## 7. Bilinen Sınırlamalar / Yapılacaklar

- Next.js 16, `middleware.ts` dosya adını deprecated olarak işaretliyor ve
  `proxy.ts` adını öneriyor; işlevsel bir sorun yoktur ancak ileride
  `npx @next/codemod@canary middleware-to-proxy .` ile taşınabilir.
- Sipariş/kargo ve bilgi bankası sayfaları şu an demo veriler üzerinde
  çalışıyor; veritabanı bağlandığında `src/lib/demo-data.ts` yerine Prisma
  sorgularını kullanan bir veri erişim katmanı (`src/lib/data/*`) eklenmesi
  önerilir.
- Sipariş/kargo/müşteri verileri için ayrıntılı CRUD API route'ları henüz
  eklenmedi (şu an UI, demo veriler üzerinde yerel state ile çalışıyor).
