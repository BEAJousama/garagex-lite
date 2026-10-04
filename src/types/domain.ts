export type ID = string;
export type WorkOrderStatus =
  | "waiting"
  | "inspection"
  | "awaiting-approval"
  | "approved"
  | "in-progress"
  | "waiting-parts"
  | "quality-check"
  | "ready"
  | "completed"
  | "cancelled";
export type AppointmentStatus =
  | "requested"
  | "confirmed"
  | "checked-in"
  | "no-show"
  | "cancelled"
  | "completed";
export type InspectionStatus =
  "draft" | "in-progress" | "awaiting-approval" | "completed";
export type Condition = "good" | "attention" | "urgent" | "not-checked";
export type InventoryStatus =
  "in-stock" | "low-stock" | "out-of-stock" | "on-order";
export type EstimateStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "approved"
  | "partially-approved"
  | "declined"
  | "expired";
export type InvoiceStatus =
  | "draft"
  | "sent"
  | "partially-paid"
  | "paid"
  | "overdue"
  | "void"
  | "refunded";
export type PaymentStatus = "completed" | "pending" | "refunded" | "failed";
export interface Location {
  id: ID;
  name: string;
  address: string;
  manager: string;
  phone: string;
  bays: number;
  status: "active" | "inactive";
}
export interface Customer {
  id: ID;
  name: string;
  type: "individual" | "fleet";
  company?: string;
  phone: string;
  email: string;
  address: string;
  since: string;
  preferredContact: "SMS" | "Email" | "Phone";
  tags: string[];
  status: "active" | "new" | "inactive";
}
export interface Vehicle {
  id: ID;
  customerId: ID;
  make: string;
  model: string;
  trim: string;
  year: number;
  plate: string;
  vin: string;
  mileage: number;
  engine: string;
  transmission: string;
  fuel: string;
  drivetrain: string;
  color: string;
  lastService: string;
  nextServiceKm: number;
  status: "active" | "in-service" | "inactive";
  photo: string;
}
export interface Mechanic {
  id: ID;
  name: string;
  role: string;
  specialty: string[];
  certification: string;
  email: string;
  phone: string;
  locationId: ID;
  status: "working" | "available" | "break" | "off";
  activeJobs: number;
  bookedHours: number;
  availableHours: number;
  efficiency: number;
  revenue: number;
  color: string;
}
export interface Service {
  id: ID;
  name: string;
  category: string;
  duration: number;
  laborRate: number;
  basePrice: number;
  taxable: boolean;
  description: string;
}
export interface Part {
  id: ID;
  name: string;
  sku: string;
  category: string;
  manufacturer: string;
  supplierId: ID;
  locationId: ID;
  onHand: number;
  reserved: number;
  minimum: number;
  reorderQty: number;
  cost: number;
  retail: number;
  bin: string;
  compatibleVehicles: string[];
}
export interface WorkOrderService {
  id: ID;
  serviceId: ID;
  technicianId: ID;
  hours: number;
  rate: number;
  amount: number;
  status: "pending" | "in-progress" | "completed";
}
export interface WorkOrderPart {
  id: ID;
  partId: ID;
  quantity: number;
  cost: number;
  price: number;
  status: "reserved" | "on-order" | "installed";
}
export interface WorkOrder {
  id: ID;
  customerId: ID;
  vehicleId: ID;
  technicianId: ID;
  locationId: ID;
  appointmentId?: ID;
  inspectionId?: ID;
  estimateId?: ID;
  invoiceId?: ID;
  complaint: string;
  customerNotes: string;
  internalNotes: string;
  services: WorkOrderService[];
  parts: WorkOrderPart[];
  mileageIn: number;
  mileageOut?: number;
  fuelLevel: number;
  priority: "normal" | "high" | "urgent";
  status: WorkOrderStatus;
  createdAt: string;
  dueAt: string;
  startedAt?: string;
  completedAt?: string;
  labor: number;
  shopSupplies: number;
  taxRate: number;
  discount: number;
  paid: number;
}
export interface Appointment {
  id: ID;
  customerId: ID;
  vehicleId: ID;
  serviceIds: ID[];
  technicianId: ID;
  locationId: ID;
  date: string;
  start: string;
  duration: number;
  bay: string;
  source: "phone" | "online" | "walk-in" | "returning";
  status: AppointmentStatus;
  notes: string;
  workOrderId?: ID;
}
export interface InspectionItem {
  id: ID;
  name: string;
  condition: Condition;
  measurement: string;
  note: string;
  recommendationServiceId?: ID;
  estimatedCost?: number;
  photo?: string;
}
export interface InspectionSection {
  id: ID;
  name: string;
  items: InspectionItem[];
}
export interface Inspection {
  id: ID;
  customerId: ID;
  vehicleId: ID;
  technicianId: ID;
  workOrderId?: ID;
  date: string;
  status: InspectionStatus;
  sections: InspectionSection[];
  customerMessage: string;
}
export interface Supplier {
  id: ID;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  parts: number;
  leadTime: number;
  status: "active" | "inactive";
  openOrders: number;
  balance: number;
}
export interface PurchaseOrderItem {
  id: ID;
  partId: ID;
  quantity: number;
  received: number;
  damaged: number;
  unitCost: number;
}
export interface PurchaseOrder {
  id: ID;
  supplierId: ID;
  locationId: ID;
  createdAt: string;
  expectedAt: string;
  status: "draft" | "ordered" | "partially-received" | "received" | "cancelled";
  items: PurchaseOrderItem[];
  notes: string;
}
export interface EstimateItem {
  id: ID;
  kind: "service" | "part" | "labor" | "custom";
  description: string;
  category: "urgent" | "recommended" | "optional";
  quantity: number;
  unitPrice: number;
  approved: "pending" | "approved" | "declined";
}
export interface Estimate {
  id: ID;
  customerId: ID;
  vehicleId: ID;
  workOrderId?: ID;
  date: string;
  expiresAt: string;
  status: EstimateStatus;
  items: EstimateItem[];
  taxRate: number;
  discount: number;
  notes: string;
  terms: string;
  approvedBy?: string;
  approvedAt?: string;
}
export interface InvoiceItem {
  id: ID;
  description: string;
  quantity: number;
  unitPrice: number;
  kind: "labor" | "part" | "supply" | "service";
}
export interface Invoice {
  id: ID;
  customerId: ID;
  vehicleId: ID;
  workOrderId?: ID;
  date: string;
  dueAt: string;
  items: InvoiceItem[];
  taxRate: number;
  discount: number;
  paid: number;
  status: InvoiceStatus;
  notes: string;
}
export interface Payment {
  id: ID;
  customerId: ID;
  invoiceId: ID;
  amount: number;
  method: "cash" | "card" | "bank-transfer" | "check" | "online" | "other";
  date: string;
  status: PaymentStatus;
  reference?: string;
  notes?: string;
}
export interface Expense {
  id: ID;
  name: string;
  category:
    | "rent"
    | "utilities"
    | "parts"
    | "equipment"
    | "tools"
    | "payroll"
    | "marketing"
    | "insurance"
    | "software"
    | "maintenance"
    | "other";
  vendor: string;
  date: string;
  amount: number;
  method: string;
  status: "paid" | "pending";
}
export interface Message {
  id: ID;
  threadId: ID;
  direction: "in" | "out";
  channel: "SMS" | "Email" | "Internal";
  body: string;
  sentAt: string;
  automated?: boolean;
}
export interface MessageThread {
  id: ID;
  customerId: ID;
  vehicleId?: ID;
  subject: string;
  unread: number;
  updatedAt: string;
  messages: Message[];
}
export interface Notification {
  id: ID;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "approval" | "inventory" | "ready" | "payment" | "appointment";
  href: string;
}
export interface GarageDocument {
  id: ID;
  name: string;
  category:
    | "customer"
    | "vehicle"
    | "inspection-photo"
    | "invoice"
    | "supplier"
    | "staff"
    | "other";
  relatedId: string;
  uploadedBy: string;
  date: string;
  size: string;
}
export interface User {
  id: ID;
  name: string;
  email: string;
  role:
    | "Owner"
    | "Manager"
    | "Service Advisor"
    | "Technician"
    | "Parts Manager"
    | "Accountant"
    | "Reception";
  phone: string;
  locationId: ID;
  color: string;
}
export interface ActivityEvent {
  id: ID;
  title: string;
  description: string;
  date: string;
  kind:
    | "work-order"
    | "approval"
    | "payment"
    | "inspection"
    | "check-in"
    | "inventory"
    | "delivery"
    | "appointment";
  customerId?: ID;
  vehicleId?: ID;
  workOrderId?: ID;
}
