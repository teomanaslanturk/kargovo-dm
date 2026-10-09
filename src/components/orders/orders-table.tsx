"use client";

import { useMemo, useState } from "react";
import { Search, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/status-badge";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency, formatDate } from "@/lib/format";
import { orderStatusLabels, orderStatusStyles } from "@/lib/labels";
import type { Order, OrderStatus } from "@/types";

interface OrdersTableProps {
  orders: Order[];
}

const statusFilters: Array<{ value: OrderStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "Tüm Durumlar" },
  { value: "PREPARING", label: "Hazırlanıyor" },
  { value: "SHIPPED", label: "Kargoya Verildi" },
  { value: "IN_TRANSIT", label: "Dağıtımda" },
  { value: "DELIVERED", label: "Teslim Edildi" },
  { value: "CANCELLED", label: "İptal Edildi" },
];

export function OrdersTable({ orders }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<OrderStatus | "ALL">("ALL");

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("tr-TR");
    return orders.filter((order) => {
      const matchesStatus = status === "ALL" || order.status === status;
      const matchesSearch =
        !query ||
        order.orderNumber.toLocaleLowerCase("tr-TR").includes(query) ||
        order.customer.name?.toLocaleLowerCase("tr-TR").includes(query) ||
        order.productInfo.toLocaleLowerCase("tr-TR").includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sipariş no, müşteri veya ürün ara..."
            className="h-9 pl-9"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus | "ALL")}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Durum seçin" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Truck}
          title="Sipariş bulunamadı"
          description="Arama veya filtre kriterlerinize uygun sipariş yok."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">Sipariş No</th>
                <th className="px-4 py-3">Müşteri</th>
                <th className="px-4 py-3">Ürün</th>
                <th className="px-4 py-3">Tutar</th>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">Kargo</th>
                <th className="px-4 py-3">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div className="flex items-center gap-1.5">
                      {order.orderNumber}
                      {order.isDemo ? <DemoBadge /> : null}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-foreground">{order.customer.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.customer.phone ?? "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.productInfo}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={orderStatusLabels[order.status]}
                      className={orderStatusStyles[order.status]}
                    />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.shipment ? (
                      <div className="flex flex-col">
                        <span>{order.shipment.cargoCompany}</span>
                        {order.shipment.trackingNumber ? (
                          <span className="text-xs">
                            {order.shipment.trackingNumber}
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {formatDate(order.orderDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
