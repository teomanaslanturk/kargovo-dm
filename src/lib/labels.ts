/**
 * Durum / kategori değerlerinin Türkçe karşılıkları ve rozet (badge) stilleri.
 */
import type {
  AIIntent,
  ConversationStatus,
  KnowledgeBaseCategory,
  OrderStatus,
} from "@/types";

export const conversationStatusLabels: Record<ConversationStatus, string> = {
  WAITING: "Bekliyor",
  REPLIED: "Yanıtlandı",
  IMPORTANT: "Önemli",
};

export const conversationStatusStyles: Record<ConversationStatus, string> = {
  WAITING: "bg-amber-50 text-amber-700 border-amber-200",
  REPLIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  IMPORTANT: "bg-red-50 text-red-700 border-red-200",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  PREPARING: "Hazırlanıyor",
  SHIPPED: "Kargoya Verildi",
  IN_TRANSIT: "Dağıtımda",
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal Edildi",
};

export const orderStatusStyles: Record<OrderStatus, string> = {
  PREPARING: "bg-amber-50 text-amber-700 border-amber-200",
  SHIPPED: "bg-sky-50 text-sky-700 border-sky-200",
  IN_TRANSIT: "bg-indigo-50 text-indigo-700 border-indigo-200",
  DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export const aiIntentLabels: Record<AIIntent, string> = {
  SHIPPING: "Kargo",
  DELIVERY: "Teslimat",
  RETURN: "İade",
  PRODUCT: "Ürün",
  PAYMENT: "Ödeme",
  ORDER_STATUS: "Sipariş Durumu",
  OTHER: "Diğer",
  UNKNOWN: "Belirsiz",
};

export const knowledgeBaseCategoryLabels: Record<KnowledgeBaseCategory, string> = {
  PRODUCT: "Ürün Açıklaması",
  SHIPPING: "Kargo Süreleri",
  RETURNS: "İade / Değişim",
  PAYMENT: "Ödeme Yöntemleri",
  HOURS: "Çalışma Saatleri",
  CONTACT: "İletişim Bilgileri",
  OTHER: "Diğer",
};
