import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatRelativeTime } from "@/lib/format";
import { aiIntentLabels } from "@/lib/labels";
import type { AIResponseLogEntry } from "@/types";

interface AiLogTableProps {
  logs: AIResponseLogEntry[];
}

export function AiLogTable({ logs }: AiLogTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Son AI Yanıt Kayıtları</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex flex-col gap-2 rounded-lg border border-border p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge
                label={aiIntentLabels[log.intent]}
                className="border-indigo-200 bg-indigo-50 text-indigo-700"
              />
              <StatusBadge
                label={`Güven: %${Math.round(log.confidence * 100)}`}
                className="border-slate-200 bg-slate-50 text-slate-700"
              />
              {log.wasSent ? (
                <StatusBadge
                  label="Gönderildi"
                  className="border-emerald-200 bg-emerald-50 text-emerald-700"
                />
              ) : log.requiresHuman ? (
                <StatusBadge
                  label="Operatöre Yönlendirildi"
                  className="border-amber-200 bg-amber-50 text-amber-700"
                />
              ) : (
                <StatusBadge
                  label="Beklemede"
                  className="border-slate-200 bg-slate-50 text-slate-700"
                />
              )}
              <span className="ml-auto text-xs text-muted-foreground">
                {formatRelativeTime(log.createdAt)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{log.suggestedReply}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
