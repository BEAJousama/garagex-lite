import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { addMinutes, format, parseISO } from "date-fns";
import type { Invoice, Part, WorkOrder } from "@/types/domain";
export const cn = (...values: ClassValue[]) => twMerge(clsx(values));
export const formatCurrency = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
export const formatShortCurrency = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
export const formatDate = (value: string, pattern = "MMM d, yyyy") =>
  value ? format(parseISO(value.slice(0, 10)), pattern) : "—";
export const formatDateTime = (value: string, pattern = "MMM d · h:mm a") =>
  value ? format(parseISO(value), pattern) : "—";
export const formatTimeRange = (
  date: string,
  start: string,
  duration: number,
) =>
  `${start} – ${format(addMinutes(parseISO(`${date}T${start}:00`), duration), "h:mm a")}`;
export const formatId = (value: string) =>
  value
    .replace("WO-2026-", "WO-")
    .replace("INV-2026-", "INV-")
    .replace("EST-2026-", "EST-")
    .replace("PO-2026-", "PO-");
export const initials = (value: string) =>
  value
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
export const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export interface FinancialSummary {
  labor: number;
  parts: number;
  supplies: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paid: number;
  balance: number;
}
export function workOrderTotals(work: WorkOrder): FinancialSummary {
  const labor = work.services.reduce((sum, item) => sum + item.amount, 0);
  const parts = work.parts.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );
  const supplies = work.shopSupplies;
  const subtotal = labor + parts + supplies;
  const tax = Math.round(subtotal * work.taxRate * 100) / 100;
  const total = Math.max(0, subtotal + tax - work.discount);
  return {
    labor,
    parts,
    supplies,
    subtotal,
    tax,
    discount: work.discount,
    total,
    paid: work.paid,
    balance: Math.max(0, total - work.paid),
  };
}
export function invoiceTotals(invoice: Invoice): FinancialSummary {
  const sum = invoice.items.reduce(
    (s, item) => s + item.quantity * item.unitPrice,
    0,
  );
  const labor = invoice.items
    .filter((i) => i.kind === "labor" || i.kind === "service")
    .reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const parts = invoice.items
    .filter((i) => i.kind === "part")
    .reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const supplies = invoice.items
    .filter((i) => i.kind === "supply")
    .reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const tax = Math.round(sum * invoice.taxRate * 100) / 100;
  const total = Math.max(0, sum + tax - invoice.discount);
  return {
    labor,
    parts,
    supplies,
    subtotal: sum,
    tax,
    discount: invoice.discount,
    total,
    paid: invoice.paid,
    balance: Math.max(0, total - invoice.paid),
  };
}
export function inventoryState(part: Part) {
  const available = part.onHand - part.reserved;
  return {
    available,
    status:
      part.onHand === 0
        ? ("out-of-stock" as const)
        : part.onHand <= part.minimum
          ? ("low-stock" as const)
          : ("in-stock" as const),
  };
}
export function downloadCSV<T extends object>(filename: string, rows: T[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0] as object);
  const safe = (value: unknown) => {
    let v = String(value ?? "");
    if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
    return `"${v.replaceAll('"', '""')}"`;
  };
  const csv = [
    headers.map(safe).join(","),
    ...rows.map((r) =>
      headers.map((h) => safe((r as Record<string, unknown>)[h])).join(","),
    ),
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function isUniqueVin(
  vin: string,
  vehicles: { vin: string; id?: string }[],
  exceptId?: string,
) {
  const normalized = vin.replaceAll(" ", "").toUpperCase();
  return !vehicles.some(
    (v) =>
      v.id !== exceptId &&
      v.vin.replaceAll(" ", "").toUpperCase() === normalized,
  );
}
export function isValidVin(vin: string) {
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
}
export function getAppointmentConflict(input: {
  date: string;
  start: string;
  duration: number;
  technicianId: string;
  bay: string;
  appointments: {
    id?: string;
    date: string;
    start: string;
    duration: number;
    technicianId: string;
    bay: string;
    status: string;
  }[];
  exceptId?: string;
  allowDoubleBookings?: boolean;
}) {
  if (input.allowDoubleBookings) return null;
  const start =
    Number(input.start.slice(0, 2)) * 60 + Number(input.start.slice(3, 5));
  return (
    input.appointments.find((a) => {
      if (
        a.date !== input.date ||
        a.status === "cancelled" ||
        a.status === "no-show"
      )
        return false;
      if (a.id === input.exceptId) return false;
      const other =
        Number(a.start.slice(0, 2)) * 60 + Number(a.start.slice(3, 5));
      const overlaps =
        start < other + a.duration && start + input.duration > other;
      return (
        overlaps &&
        (a.technicianId === input.technicianId || a.bay === input.bay)
      );
    }) || null
  );
}

export const formatShortDate = (value: string) => formatDate(value, "MMM d");
export const formatTime = (value: string) => {
  if (!value) return "—";
  const normalized = /^\d{2}:\d{2}$/.test(value)
    ? `2026-10-05T${value}:00`
    : value.slice(0, 16);
  const parsed = parseISO(normalized);
  return Number.isNaN(parsed.getTime()) ? "—" : format(parsed, "h:mm a");
};
