import type {
  AppointmentStatus,
  Condition,
  EstimateStatus,
  InspectionStatus,
  InventoryStatus,
  InvoiceStatus,
  WorkOrderStatus,
} from "@/types/domain";
export const workOrderStatuses: {
  value: WorkOrderStatus;
  label: string;
  tone: string;
  step: number;
}[] = [
  { value: "waiting", label: "Waiting", tone: "slate", step: 0 },
  { value: "inspection", label: "Inspection", tone: "blue", step: 1 },
  {
    value: "awaiting-approval",
    label: "Awaiting Approval",
    tone: "amber",
    step: 2,
  },
  { value: "approved", label: "Approved", tone: "teal", step: 3 },
  { value: "in-progress", label: "In Progress", tone: "orange", step: 4 },
  {
    value: "waiting-parts",
    label: "Waiting for Parts",
    tone: "amber",
    step: 4,
  },
  { value: "quality-check", label: "Quality Check", tone: "violet", step: 5 },
  { value: "ready", label: "Ready for Pickup", tone: "green", step: 6 },
  { value: "completed", label: "Completed", tone: "green", step: 7 },
  { value: "cancelled", label: "Cancelled", tone: "red", step: 8 },
];
export const appointmentStatuses: {
  value: AppointmentStatus;
  label: string;
  tone: string;
}[] = [
  { value: "requested", label: "Requested", tone: "amber" },
  { value: "confirmed", label: "Confirmed", tone: "blue" },
  { value: "checked-in", label: "Checked In", tone: "teal" },
  { value: "no-show", label: "No Show", tone: "red" },
  { value: "cancelled", label: "Cancelled", tone: "slate" },
  { value: "completed", label: "Completed", tone: "green" },
];
export const inspectionStatuses: {
  value: InspectionStatus;
  label: string;
  tone: string;
}[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "in-progress", label: "In Progress", tone: "blue" },
  { value: "awaiting-approval", label: "Awaiting Approval", tone: "amber" },
  { value: "completed", label: "Completed", tone: "green" },
];
export const conditionMeta: {
  value: Condition;
  label: string;
  tone: string;
  icon: string;
}[] = [
  { value: "good", label: "Good", tone: "green", icon: "check" },
  { value: "attention", label: "Attention", tone: "amber", icon: "alert" },
  { value: "urgent", label: "Urgent", tone: "red", icon: "urgent" },
  { value: "not-checked", label: "Not Checked", tone: "slate", icon: "minus" },
];
export const inventoryStatuses: {
  value: InventoryStatus;
  label: string;
  tone: string;
}[] = [
  { value: "in-stock", label: "In Stock", tone: "green" },
  { value: "low-stock", label: "Low Stock", tone: "amber" },
  { value: "out-of-stock", label: "Out of Stock", tone: "red" },
  { value: "on-order", label: "On Order", tone: "blue" },
];
export const estimateStatuses: {
  value: EstimateStatus;
  label: string;
  tone: string;
}[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "sent", label: "Sent", tone: "blue" },
  { value: "viewed", label: "Viewed", tone: "violet" },
  { value: "approved", label: "Approved", tone: "green" },
  { value: "partially-approved", label: "Partially Approved", tone: "amber" },
  { value: "declined", label: "Declined", tone: "red" },
  { value: "expired", label: "Expired", tone: "slate" },
];
export const invoiceStatuses: {
  value: InvoiceStatus;
  label: string;
  tone: string;
}[] = [
  { value: "draft", label: "Draft", tone: "slate" },
  { value: "sent", label: "Sent", tone: "blue" },
  { value: "partially-paid", label: "Partially Paid", tone: "amber" },
  { value: "paid", label: "Paid", tone: "green" },
  { value: "overdue", label: "Overdue", tone: "red" },
  { value: "void", label: "Void", tone: "slate" },
  { value: "refunded", label: "Refunded", tone: "violet" },
];
export const statusLabel = (value: string) =>
  [
    ...workOrderStatuses,
    ...appointmentStatuses,
    ...inspectionStatuses,
    ...inventoryStatuses,
    ...estimateStatuses,
    ...invoiceStatuses,
  ].find((s) => s.value === value)?.label ??
  value.replaceAll("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
