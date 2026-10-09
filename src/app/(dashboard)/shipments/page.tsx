import { PageHeader } from "@/components/shared/page-header";
import { DemoBadge } from "@/components/shared/demo-badge";
import { ShipmentsList } from "@/components/shipments/shipments-list";
import { demoOrders } from "@/lib/demo-data";
import { isAppInDemoMode } from "@/lib/config";

export const metadata = {
  title: "Kargo Takibi — Kargovo DM Asistanı",
};

export default function ShipmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Kargo Takibi"
        description="Kargoya verilen siparişlerinizi ve takip bilgilerini görüntüleyin."
        actions={isAppInDemoMode ? <DemoBadge label="DEMO VERİLERİ" /> : undefined}
      />
      <ShipmentsList orders={demoOrders} />
    </div>
  );
}
