/** Where Lite sends people for the full product. Update PRO_URL once your store page is live. */
export const DEMO_URL = "https://garagex-psi.vercel.app";
export const PRO_URL = "https://garagex-psi.vercel.app";

type ProFeature = {
  title: string;
  description: string;
  image: string;
  highlights: string[];
};

/** Routes that only exist in GarageX Pro, keyed by their first path segment. */
export const proFeatures: Record<string, ProFeature> = {
  "work-orders": {
    title: "Work order board & repair orders",
    description:
      "A drag-and-drop Kanban board from check-in to pickup, a sortable list with CSV export, a guided vehicle check-in wizard and a detailed repair order workspace.",
    image: "/pro/work-orders.jpg",
    highlights: [
      "Drag-and-drop status board",
      "Vehicle check-in wizard",
      "Services, parts, approvals and timeline",
    ],
  },
  inspections: {
    title: "Digital vehicle inspections",
    description:
      "Inspection reports with condition checks by system, measurements, technician notes, a vehicle condition map and recommendations that turn into an estimate.",
    image: "/pro/inspections.jpg",
    highlights: [
      "Good / attention / urgent findings",
      "Vehicle condition map",
      "Recommendations to estimate",
    ],
  },
  appointments: {
    title: "Appointment planner",
    description:
      "Book, filter and check in vehicles from a workshop calendar with technician and status filters.",
    image: "/pro/calendar.jpg",
    highlights: ["Booking dialog", "One-click check-in", "Service bay availability"],
  },
  calendar: {
    title: "Workshop calendar",
    description:
      "Day, week and month views with overlapping appointments laid out side by side, technician and status filters and an appointment drawer.",
    image: "/pro/calendar.jpg",
    highlights: ["Day / week / month views", "Side-by-side lanes", "Bay availability"],
  },
  customers: {
    title: "Customer profiles",
    description:
      "A complete customer record with vehicles, repair history, balances, appointments, invoices, documents and notes.",
    image: "/pro/customer-profile.jpg",
    highlights: ["Linked vehicles and history", "Outstanding balances", "Contact preferences"],
  },
  vehicles: {
    title: "Vehicle records",
    description:
      "Vehicle directory and profiles with service history, maintenance reminders, mileage and linked work orders.",
    image: "/pro/vehicles.jpg",
    highlights: ["Service history", "Maintenance reminders", "Mileage tracking"],
  },
  mechanics: {
    title: "Technicians",
    description:
      "Technician directory and profiles with today's schedule, specialties, efficiency, booked hours and assigned jobs.",
    image: "/pro/technicians.jpg",
    highlights: ["Schedule timeline", "Efficiency and revenue", "Assigned work orders"],
  },
  team: {
    title: "Team schedule",
    description:
      "See every technician's appointments and bay assignments for the week.",
    image: "/pro/calendar.jpg",
    highlights: ["Weekly overview", "Technician filter", "Bay assignments"],
  },
  inventory: {
    title: "Parts inventory",
    description:
      "Stock levels, reorder points, costs and retail prices with low-stock and out-of-stock alerts.",
    image: "/pro/inventory.jpg",
    highlights: ["Stock status", "Reorder points", "CSV export"],
  },
  suppliers: {
    title: "Suppliers",
    description:
      "Supplier directory with contacts, lead times, open orders and outstanding balances.",
    image: "/pro/suppliers.jpg",
    highlights: ["Lead times", "Open orders", "Balances"],
  },
  "purchase-orders": {
    title: "Purchase orders",
    description: "Track parts orders from supplier to service bay.",
    image: "/pro/purchase-orders.jpg",
    highlights: ["Order status", "Expected dates", "Totals"],
  },
  services: {
    title: "Services catalog",
    description:
      "Labour operations with categories, durations, labour rates, base prices and tax settings.",
    image: "/pro/services.jpg",
    highlights: ["Durations and rates", "Categories", "Taxable flag"],
  },
  estimates: {
    title: "Estimates & approvals",
    description:
      "Estimates with per-line approve or decline, approval history and a one-click conversion to a work order.",
    image: "/pro/estimates.jpg",
    highlights: ["Per-line approval", "Approval history", "Convert to work order"],
  },
  invoices: {
    title: "Invoices",
    description:
      "Print-ready invoices with save as PDF, payment recording and balances that update everywhere.",
    image: "/pro/invoices.jpg",
    highlights: ["Print / save as PDF", "Partial payments", "Linked records"],
  },
  payments: {
    title: "Payments",
    description: "Every payment with method, invoice and status.",
    image: "/pro/payments.jpg",
    highlights: ["Payment methods", "Invoice links", "CSV export"],
  },
  expenses: {
    title: "Expenses",
    description: "The costs that keep the workshop running, by category and vendor.",
    image: "/pro/expenses.jpg",
    highlights: ["Categories", "Vendors", "Payment status"],
  },
  reports: {
    title: "Business reports",
    description:
      "Revenue over time, revenue mix, an operational snapshot and top service categories.",
    image: "/pro/reports.jpg",
    highlights: ["Revenue analytics", "Operational KPIs", "Top services"],
  },
  messages: {
    title: "Customer messages",
    description:
      "SMS and email-style conversations with customer and vehicle context in one inbox.",
    image: "/pro/messages.jpg",
    highlights: ["Unread filters", "Customer context", "Internal notes"],
  },
  notifications: {
    title: "Notifications centre",
    description: "Approvals, stock alerts and workshop updates with read and unread state.",
    image: "/pro/notifications.jpg",
    highlights: ["Read / unread", "Linked records", "Mark all as read"],
  },
  documents: {
    title: "Documents",
    description: "Find workshop, vehicle, inspection and customer documents in one place.",
    image: "/pro/documents.jpg",
    highlights: ["Categories", "Related records", "Search"],
  },
  settings: {
    title: "Workshop settings",
    description:
      "Business profile, locations, team and roles, workshop defaults and opening hours, invoices and tax, notifications and appearance.",
    image: "/pro/settings.jpg",
    highlights: ["Opening hours", "Roles and permissions", "Invoice and tax defaults"],
  },
};
