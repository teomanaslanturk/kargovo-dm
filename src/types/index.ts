/**
 * Uygulama genelinde kullanılan paylaşılan tipler.
 *
 * Bu tipler Prisma şemasındaki modellerle aynı şekli taşır; böylece demo veri
 * katmanı ile gerçek veritabanı katmanı aynı arayüzü kullanabilir ve bileşenler
 * veri kaynağından bağımsız çalışabilir.
 */

export type ConversationStatus = "WAITING" | "REPLIED" | "IMPORTANT";

export type MessageSender = "CUSTOMER" | "AGENT" | "AI" | "SYSTEM";

export type OrderStatus =
  | "PREPARING"
  | "SHIPPED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELLED";

export type AIIntent =
  | "SHIPPING"
  | "DELIVERY"
  | "RETURN"
  | "PRODUCT"
  | "PAYMENT"
  | "ORDER_STATUS"
  | "OTHER"
  | "UNKNOWN";

export type KnowledgeBaseCategory =
  | "PRODUCT"
  | "SHIPPING"
  | "RETURNS"
  | "PAYMENT"
  | "HOURS"
  | "CONTACT"
  | "OTHER";

export type InstagramConnectionStatus =
  | "DISCONNECTED"
  | "DEMO"
  | "CONNECTED"
  | "ERROR";

export interface Customer {
  id: string;
  igUsername: string | null;
  name: string | null;
  avatarUrl: string | null;
  phone: string | null;
  email: string | null;
  isDemo: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  isAiGenerated: boolean;
  isDemo: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  customer: Customer;
  status: ConversationStatus;
  isUnread: boolean;
  autoReplyEnabled: boolean;
  lastMessageAt: string;
  lastMessagePreview: string;
  isDemo: boolean;
  messages: Message[];
}

export interface Shipment {
  id: string;
  cargoCompany: string;
  trackingNumber: string | null;
  trackingUrl: string | null;
  isDemo: boolean;
  shippedAt: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  productInfo: string;
  totalAmount: number | null;
  status: OrderStatus;
  orderDate: string;
  isDemo: boolean;
  shipment: Shipment | null;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  isDemo: boolean;
}

export interface KnowledgeBaseEntry {
  id: string;
  category: KnowledgeBaseCategory;
  title: string;
  content: string;
  isActive: boolean;
  isDemo: boolean;
  updatedAt: string;
}

export interface AutomationSettings {
  aiAssistantEnabled: boolean;
  autoReplyEnabled: boolean;
  requireApprovalBeforeSend: boolean;
  workingHoursStart: string;
  workingHoursEnd: string;
  welcomeMessage: string;
  handoffRules: string;
  aiTone: "profesyonel" | "samimi" | "resmi";
}

export interface AIResponseLogEntry {
  id: string;
  conversationId: string;
  intent: AIIntent;
  confidence: number;
  suggestedReply: string;
  wasSent: boolean;
  wasEdited: boolean;
  requiresHuman: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalMessages: number;
  unansweredMessages: number;
  todayConversations: number;
  autoRepliedMessages: number;
  pendingOrders: number;
  shippedOrders: number;
}

export interface RecentActivityItem {
  id: string;
  type: "message" | "order" | "automation" | "system";
  title: string;
  description: string;
  timestamp: string;
  isDemo: boolean;
}
