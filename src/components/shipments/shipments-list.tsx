"use client";

import { useState } from "react";
import { ExternalLink, PackageX, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate } from "@/lib/format";
import { orderStatusLabels, orderStatusStyles } from "@/lib/labels";
import type { Order } from "@/types";

interface ShipmentsListProps {
  orders: Order[];
}

export function ShipmentsList({ orders }: ShipmentsListProps) {
  const [search, setSearch] = useState("");

  const shipped = orders.filter((o) => o.shipment);
  const query = search.trim().toLocaleLowerCase("tr-TR");
  const filtered = shipped.filter(
    (o) =>
      !query ||
      o.shipment?.trackingNumber?.toLocaleLowerCase("tr-TR").includes(query) ||
      o.orderNumber.toLocaleLowerCase("tr-TR").includes(query) ||
      o.customer.name?.toLocaleLowerCase("tr-TR").includes(query),
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Takip numarası, sipariş no veya müşteri ara..."
        className="h-9 sm:max-w-sm"
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={PackageX}
          title="Kargo kaydı bulunamadı"
          description="Arama kriterinize uygun kargoya verilmiş sipariş yok."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((order) => (
            <Card key={order.id}>
              <CardContent className="flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    {order.shipment?.cargoCompany}
                  </div>
                  {order.isDemo ? <DemoBadge /> : null}
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-foreground">{order.customer.name}</p>
                  <p className="text-muted-foreground">{order.orderNumber}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {order.shipment?.trackingNumber ?? "Takip no bekleniyor"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <StatusBadge
                    label={orderStatusLabels[order.status]}
                    className={orderStatusStyles[order.status]}
                  />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(order.orderDate)}
                  </span>
                </div>

                {order.shipment?.trackingUrl ? (
                  <a
                    href={order.shipment.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    Takip bağlantısını aç
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
