/**
 * DEMO VERİ KATMANI
 * ---------------------------------------------------------------------------
 * Bu dosyadaki tüm veriler gerçek bir müşteriye veya siparişe ait DEĞİLDİR.
 * Gerçek Meta/Instagram bağlantısı ve veritabanı yapılandırılana kadar
 * arayüzü anlamlı ve gerçekçi şekilde göstermek için kullanılır.
 *
 * Her kayıtta `isDemo: true` işareti bulunur. Gerçek veriler veritabanından
 * geldiğinde bu değer `false` olacak ve arayüzde "DEMO" etiketi gösterilmeyecektir.
 * ---------------------------------------------------------------------------
 */

import type {
  AIResponseLogEntry,
  AutomationSettings,
  Conversation,
  Customer,
  DashboardStats,
  FAQItem,
  KnowledgeBaseEntry,
  Order,
  RecentActivityItem,
} from "@/types";

const demoCustomers: Customer[] = [
  {
    id: "demo-cust-1",
    igUsername: "ayse.yilmaz34",
    name: "Ayşe Yılmaz",
    avatarUrl: null,
    phone: "+90 532 111 22 33",
    email: "ayse.yilmaz@example.com",
    isDemo: true,
  },
  {
    id: "demo-cust-2",
    igUsername: "mehmet_kara",
    name: "Mehmet Kara",
    avatarUrl: null,
    phone: "+90 541 222 33 44",
    email: null,
    isDemo: true,
  },
  {
    id: "demo-cust-3",
    igUsername: "zeynep.k",
    name: "Zeynep Kaya",
    avatarUrl: null,
    phone: "+90 505 333 44 55",
    email: "zeynep.kaya@example.com",
    isDemo: true,
  },
  {
    id: "demo-cust-4",
    igUsername: "burakdemir",
    name: "Burak Demir",
    avatarUrl: null,
    phone: null,
    email: null,
    isDemo: true,
  },
  {
    id: "demo-cust-5",
    igUsername: "elif_su",
    name: "Elif Su",
    avatarUrl: null,
    phone: "+90 533 444 55 66",
    email: "elif.su@example.com",
    isDemo: true,
  },
];

function minutesAgo(min: number): string {
  return new Date(Date.now() - min * 60_000).toISOString();
}

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60_000).toISOString();
}

function daysAgo(d: number): string {
  return new Date(Date.now() - d * 24 * 60 * 60_000).toISOString();
}

export const demoConversations: Conversation[] = [
  {
    id: "demo-conv-1",
    customer: demoCustomers[0],
    status: "WAITING",
    isUnread: true,
    autoReplyEnabled: true,
    lastMessageAt: minutesAgo(4),
    lastMessagePreview: "Siparişim ne zaman kargoya verilecek acaba?",
    isDemo: true,
    messages: [
      {
        id: "demo-msg-1-1",
        conversationId: "demo-conv-1",
        sender: "CUSTOMER",
        content: "Merhaba, 2 gün önce sipariş verdim ama hâlâ kargoya verilmedi gibi görünüyor.",
        isAiGenerated: false,
        isDemo: true,
        createdAt: minutesAgo(12),
      },
      {
        id: "demo-msg-1-2",
        conversationId: "demo-conv-1",
        sender: "AI",
        content:
          "Merhaba Ayşe Hanım! Siparişinizi kontrol ediyorum, sipariş numaranızı paylaşabilir misiniz? 📦",
        isAiGenerated: true,
        isDemo: true,
        createdAt: minutesAgo(10),
      },
      {
        id: "demo-msg-1-3",
        conversationId: "demo-conv-1",
        sender: "CUSTOMER",
        content: "Siparişim ne zaman kargoya verilecek acaba?",
        isAiGenerated: false,
        isDemo: true,
        createdAt: minutesAgo(4),
      },
    ],
  },
  {
    id: "demo-conv-2",
    customer: demoCustomers[1],
    status: "REPLIED",
    isUnread: false,
    autoReplyEnabled: true,
    lastMessageAt: minutesAgo(32),
    lastMessagePreview: "Teşekkürler, takip numarasıyla kontrol ettim 🙏",
    isDemo: true,
    messages: [
      {
        id: "demo-msg-2-1",
        conversationId: "demo-conv-2",
        sender: "CUSTOMER",
        content: "Kargo takip numaram var ama hangi firma gönderdi bilmiyorum.",
        isAiGenerated: false,
        isDemo: true,
        createdAt: minutesAgo(40),
      },
      {
        id: "demo-msg-2-2",
        conversationId: "demo-conv-2",
        sender: "AI",
        content:
          "Merhaba Mehmet Bey, siparişiniz Aras Kargo ile gönderildi. Takip numaranız: TR294817263. Takip bağlantısından anlık durumu görebilirsiniz.",
        isAiGenerated: true,
        isDemo: true,
        createdAt: minutesAgo(35),
      },
      {
        id: "demo-msg-2-3",
        conversationId: "demo-conv-2",
        sender: "CUSTOMER",
        content: "Teşekkürler, takip numarasıyla kontrol ettim 🙏",
        isAiGenerated: false,
        isDemo: true,
        createdAt: minutesAgo(32),
      },
    ],
  },
  {
    id: "demo-conv-3",
    customer: demoCustomers[2],
    status: "IMPORTANT",
    isUnread: true,
    autoReplyEnabled: false,
    lastMessageAt: hoursAgo(1),
    lastMessagePreview: "Ürün hasarlı geldi, iade etmek istiyorum.",
    isDemo: true,
    messages: [
      {
        id: "demo-msg-3-1",
        conversationId: "demo-conv-3",
        sender: "CUSTOMER",
        content: "Ürün hasarlı geldi, iade etmek istiyorum.",
        isAiGenerated: false,
        isDemo: true,
        createdAt: hoursAgo(1),
      },
      {
        id: "demo-msg-3-2",
        conversationId: "demo-conv-3",
        sender: "SYSTEM",
        content:
          "Bu konuşma hasarlı ürün / iade talebi içerdiği için otomatik yanıt duraklatıldı ve bir operatöre atandı.",
        isAiGenerated: false,
        isDemo: true,
        createdAt: hoursAgo(1),
      },
    ],
  },
  {
    id: "demo-conv-4",
    customer: demoCustomers[3],
    status: "WAITING",
    isUnread: true,
    autoReplyEnabled: true,
    lastMessageAt: hoursAgo(3),
    lastMessagePreview: "Bu ürün başka renkte de var mı?",
    isDemo: true,
    messages: [
      {
        id: "demo-msg-4-1",
        conversationId: "demo-conv-4",
        sender: "CUSTOMER",
        content: "Bu ürün başka renkte de var mı?",
        isAiGenerated: false,
        isDemo: true,
        createdAt: hoursAgo(3),
      },
    ],
  },
  {
    id: "demo-conv-5",
    customer: demoCustomers[4],
    status: "REPLIED",
    isUnread: false,
    autoReplyEnabled: true,
    lastMessageAt: daysAgo(1),
    lastMessagePreview: "Harika, ilginiz için çok teşekkür ederim!",
    isDemo: true,
    messages: [
      {
        id: "demo-msg-5-1",
        conversationId: "demo-conv-5",
        sender: "CUSTOMER",
        content: "Kapıda nakit ödeme seçeneğiniz var mı?",
        isAiGenerated: false,
        isDemo: true,
        createdAt: daysAgo(1),
      },
      {
        id: "demo-msg-5-2",
        conversationId: "demo-conv-5",
        sender: "AI",
        content:
          "Merhaba Elif Hanım! Evet, kapıda nakit ve kredi kartı ile ödeme seçeneklerimiz mevcut. Ayrıca online ödeme ile %5 indirim kazanabilirsiniz 😊",
        isAiGenerated: true,
        isDemo: true,
        createdAt: daysAgo(1),
      },
      {
        id: "demo-msg-5-3",
        conversationId: "demo-conv-5",
        sender: "CUSTOMER",
        content: "Harika, ilginiz için çok teşekkür ederim!",
        isAiGenerated: false,
        isDemo: true,
        createdAt: daysAgo(1),
      },
    ],
  },
];

export const demoOrders: Order[] = [
  {
    id: "demo-order-1",
    orderNumber: "KRG-100245",
    customer: demoCustomers[0],
    productInfo: "Kadın Deri Çanta — Kahverengi",
    totalAmount: 749.9,
    status: "PREPARING",
    orderDate: hoursAgo(20),
    isDemo: true,
    shipment: null,
  },
  {
    id: "demo-order-2",
    orderNumber: "KRG-100238",
    customer: demoCustomers[1],
    productInfo: "Erkek Spor Ayakkabı — 42 Numara",
    totalAmount: 1249.0,
    status: "SHIPPED",
    orderDate: daysAgo(1),
    isDemo: true,
    shipment: {
      id: "demo-ship-2",
      cargoCompany: "Aras Kargo",
      trackingNumber: "TR294817263",
      trackingUrl: "https://kargotakip.kargovo.com/TR294817263",
      isDemo: true,
      shippedAt: hoursAgo(18),
    },
  },
  {
    id: "demo-order-3",
    orderNumber: "KRG-100219",
    customer: demoCustomers[2],
    productInfo: "Organik Cilt Bakım Seti",
    totalAmount: 389.5,
    status: "CANCELLED",
    orderDate: daysAgo(3),
    isDemo: true,
    shipment: null,
  },
  {
    id: "demo-order-4",
    orderNumber: "KRG-100201",
    customer: demoCustomers[3],
    productInfo: "Akıllı Saat Kordonu — Siyah",
    totalAmount: 199.0,
    status: "IN_TRANSIT",
    orderDate: daysAgo(2),
    isDemo: true,
    shipment: {
      id: "demo-ship-4",
      cargoCompany: "Yurtiçi Kargo",
      trackingNumber: "YK581029384",
      trackingUrl: "https://kargotakip.kargovo.com/YK581029384",
      isDemo: true,
      shippedAt: daysAgo(2),
    },
  },
  {
    id: "demo-order-5",
    orderNumber: "KRG-100188",
    customer: demoCustomers[4],
    productInfo: "Kadın Parfüm 50ml",
    totalAmount: 599.0,
    status: "DELIVERED",
    orderDate: daysAgo(6),
    isDemo: true,
    shipment: {
      id: "demo-ship-5",
      cargoCompany: "MNG Kargo",
      trackingNumber: "MNG102938475",
      trackingUrl: "https://kargotakip.kargovo.com/MNG102938475",
      isDemo: true,
      shippedAt: daysAgo(5),
    },
  },
  {
    id: "demo-order-6",
    orderNumber: "KRG-100176",
    customer: demoCustomers[0],
    productInfo: "Çocuk Oyuncak Seti",
    totalAmount: 329.9,
    status: "DELIVERED",
    orderDate: daysAgo(8),
    isDemo: true,
    shipment: {
      id: "demo-ship-6",
      cargoCompany: "Sürat Kargo",
      trackingNumber: "SK837465192",
      trackingUrl: "https://kargotakip.kargovo.com/SK837465192",
      isDemo: true,
      shippedAt: daysAgo(7),
    },
  },
];

export const demoFaqs: FAQItem[] = [
  {
    id: "demo-faq-1",
    question: "Kargo süresi ne kadar?",
    answer:
      "Siparişleriniz onaylandıktan sonra 1-2 iş günü içinde kargoya verilir. Kargo firmasına bağlı olarak teslimat 1-4 iş günü sürer.",
    isActive: true,
    isDemo: true,
  },
  {
    id: "demo-faq-2",
    question: "İade ve değişim süreci nasıl işliyor?",
    answer:
      "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde, kullanılmamış ve orijinal ambalajında olması koşuluyla iade/değişim yapabilirsiniz.",
    isActive: true,
    isDemo: true,
  },
  {
    id: "demo-faq-3",
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer:
      "Kredi/banka kartı, havale/EFT ve kapıda ödeme (nakit veya kart) seçeneklerimiz mevcuttur.",
    isActive: true,
    isDemo: true,
  },
  {
    id: "demo-faq-4",
    question: "Kapıda ödeme ücreti var mı?",
    answer: "Kapıda ödeme seçeneğinde 19,90 TL hizmet bedeli uygulanmaktadır.",
    isActive: false,
    isDemo: true,
  },
];

export const demoKnowledgeBase: KnowledgeBaseEntry[] = [
  {
    id: "demo-kb-1",
    category: "SHIPPING",
    title: "Kargo Süreleri",
    content:
      "Siparişler 1-2 iş günü içinde kargoya verilir. İstanbul içi teslimatlar genellikle 1 gün, diğer şehirler 2-4 iş günü sürer.",
    isActive: true,
    isDemo: true,
    updatedAt: daysAgo(5),
  },
  {
    id: "demo-kb-2",
    category: "RETURNS",
    title: "İade ve Değişim Politikası",
    content:
      "Ürünler teslim alındıktan sonra 14 gün içinde, kullanılmamış ve etiketleri çıkarılmamış olması koşuluyla iade edilebilir. İade kargo bedeli kampanyaya göre değişebilir.",
    isActive: true,
    isDemo: true,
    updatedAt: daysAgo(5),
  },
  {
    id: "demo-kb-3",
    category: "PAYMENT",
    title: "Ödeme Yöntemleri",
    content: "Kredi/banka kartı, havale/EFT ve kapıda ödeme kabul edilmektedir.",
    isActive: true,
    isDemo: true,
    updatedAt: daysAgo(10),
  },
  {
    id: "demo-kb-4",
    category: "HOURS",
    title: "Çalışma Saatleri",
    content:
      "Müşteri hizmetlerimiz Pazartesi-Cumartesi 09:00-18:00 saatleri arasında aktiftir. Mesai dışı gelen mesajlar en kısa sürede yanıtlanır.",
    isActive: true,
    isDemo: true,
    updatedAt: daysAgo(15),
  },
  {
    id: "demo-kb-5",
    category: "CONTACT",
    title: "İletişim Bilgileri",
    content: "E-posta: destek@kargovo.com — Telefon: 0850 000 00 00",
    isActive: true,
    isDemo: true,
    updatedAt: daysAgo(20),
  },
  {
    id: "demo-kb-6",
    category: "PRODUCT",
    title: "Ürün Garantisi",
    content: "Tüm ürünlerimiz 2 yıl üretici garantisi kapsamındadır.",
    isActive: false,
    isDemo: true,
    updatedAt: daysAgo(30),
  },
];

export const demoAiResponseLogs: AIResponseLogEntry[] = [
  {
    id: "demo-log-1",
    conversationId: "demo-conv-1",
    intent: "ORDER_STATUS",
    confidence: 0.92,
    suggestedReply:
      "Merhaba Ayşe Hanım! Siparişiniz hazırlanıyor, en geç yarın kargoya verilecek. 📦",
    wasSent: false,
    wasEdited: false,
    requiresHuman: false,
    createdAt: minutesAgo(3),
  },
  {
    id: "demo-log-2",
    conversationId: "demo-conv-2",
    intent: "SHIPPING",
    confidence: 0.97,
    suggestedReply:
      "Siparişiniz Aras Kargo ile gönderildi. Takip numaranız: TR294817263.",
    wasSent: true,
    wasEdited: false,
    requiresHuman: false,
    createdAt: minutesAgo(35),
  },
  {
    id: "demo-log-3",
    conversationId: "demo-conv-3",
    intent: "RETURN",
    confidence: 0.65,
    suggestedReply:
      "Ürününüzün hasarlı geldiğini öğrendiğime çok üzüldüm. Hemen bir operatörümüze yönlendiriyorum.",
    wasSent: false,
    wasEdited: false,
    requiresHuman: true,
    createdAt: hoursAgo(1),
  },
];

export const demoRecentActivity: RecentActivityItem[] = [
  {
    id: "demo-act-1",
    type: "message",
    title: "Yeni mesaj",
    description: "Ayşe Yılmaz: \"Siparişim ne zaman kargoya verilecek acaba?\"",
    timestamp: minutesAgo(4),
    isDemo: true,
  },
  {
    id: "demo-act-2",
    type: "order",
    title: "Sipariş durumu güncellendi",
    description: "KRG-100201 → Dağıtımda",
    timestamp: hoursAgo(2),
    isDemo: true,
  },
  {
    id: "demo-act-3",
    type: "automation",
    title: "Otomatik yanıt gönderildi",
    description: "Mehmet Kara'ya kargo takip bilgisi iletildi",
    timestamp: minutesAgo(35),
    isDemo: true,
  },
  {
    id: "demo-act-4",
    type: "message",
    title: "Operatöre yönlendirildi",
    description: "Zeynep Kaya: iade talebi — insan onayı gerekiyor",
    timestamp: hoursAgo(1),
    isDemo: true,
  },
  {
    id: "demo-act-5",
    type: "system",
    title: "Bilgi bankası güncellendi",
    description: "\"Kargo Süreleri\" içeriği düzenlendi",
    timestamp: daysAgo(5),
    isDemo: true,
  },
];

export const demoAutomationSettings: AutomationSettings = {
  aiAssistantEnabled: true,
  autoReplyEnabled: false,
  requireApprovalBeforeSend: true,
  workingHoursStart: "09:00",
  workingHoursEnd: "18:00",
  welcomeMessage:
    "Merhaba! Kargovo'ya hoş geldiniz 👋 Size nasıl yardımcı olabiliriz?",
  handoffRules:
    "Hasarlı/kırık ürün, iade talebi, şikayet veya AI'nın güven skoru %65'in altında olduğu durumlarda konuşma otomatik olarak bir operatöre atanır.",
  aiTone: "profesyonel",
};

export function getDemoDashboardStats(): DashboardStats {
  const totalMessages = demoConversations.reduce(
    (sum, c) => sum + c.messages.length,
    0,
  );
  const unansweredMessages = demoConversations.filter(
    (c) => c.status === "WAITING",
  ).length;
  const todayConversations = demoConversations.filter((c) => {
    const date = new Date(c.lastMessageAt);
    const now = new Date();
    return date.toDateString() === now.toDateString();
  }).length;
  const autoRepliedMessages = demoConversations.reduce(
    (sum, c) => sum + c.messages.filter((m) => m.isAiGenerated).length,
    0,
  );
  const pendingOrders = demoOrders.filter(
    (o) => o.status === "PREPARING",
  ).length;
  const shippedOrders = demoOrders.filter(
    (o) => o.status === "SHIPPED" || o.status === "IN_TRANSIT",
  ).length;

  return {
    totalMessages,
    unansweredMessages,
    todayConversations: todayConversations || demoConversations.length,
    autoRepliedMessages,
    pendingOrders,
    shippedOrders,
  };
}
