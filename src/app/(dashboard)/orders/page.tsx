import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { OrdersTable } from "@/components/orders/orders-table";
import { demoOrders } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "Siparişler — Kargovo DM Asistanı",
};

export default function OrdersPage() {
  // Not: Gerçek veritabanı bağlandığında bu liste Prisma `order.findMany()`
  // sorgusuyla (müşteri ve kargo ilişkileri dahil) doldurulacaktır.
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Siparişler"
        description="Tüm siparişlerinizi görüntüleyin, durumlarını takip edin."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <OrdersTable orders={demoOrders} />
    </div>
  );
}
