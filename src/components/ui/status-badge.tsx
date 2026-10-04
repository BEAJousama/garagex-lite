"use client";
import {
  AlertTriangle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  Clock3,
  PackageCheck,
  ShieldAlert,
  Wrench,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  statusLabel,
  workOrderStatuses,
  appointmentStatuses,
  inspectionStatuses,
  estimateStatuses,
  invoiceStatuses,
  inventoryStatuses,
  conditionMeta,
} from "@/domain/status";
const icons: Record<string, typeof Wrench> = {
  "in-progress": Wrench,
  "waiting-parts": Clock3,
  "awaiting-approval": Clock3,
  "quality-check": ShieldAlert,
  ready: PackageCheck,
  completed: CircleCheck,
  cancelled: XCircle,
  urgent: ShieldAlert,
  attention: AlertTriangle,
  good: CircleCheck,
  "not-checked": CircleDashed,
  approved: CircleCheck,
  paid: CircleCheck,
  overdue: AlertTriangle,
  "low-stock": AlertTriangle,
  "out-of-stock": XCircle,
  "on-order": Clock3,
};
export function StatusBadge({
  status,
  tiny = false,
}: {
  status: string;
  tiny?: boolean;
}) {
  const tone =
    [
      ...workOrderStatuses,
      ...appointmentStatuses,
      ...inspectionStatuses,
      ...estimateStatuses,
      ...invoiceStatuses,
      ...inventoryStatuses,
      ...conditionMeta,
    ].find((s) => s.value === status)?.tone || "slate";
  const Icon = icons[status] || CircleDot;
  return (
    <span
      className={cn("status-badge", `status-${tone}`, tiny && "badge-tiny")}
    >
      <Icon size={tiny ? 11 : 12} strokeWidth={1.9} />
      <span>{statusLabel(status)}</span>
    </span>
  );
}
