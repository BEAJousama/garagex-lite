"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import type {
  Appointment,
  Customer,
  Estimate,
  Expense,
  GarageDocument,
  Inspection,
  Invoice,
  Mechanic,
  Message,
  Notification,
  Part,
  Payment,
  PurchaseOrder,
  WorkOrder,
} from "@/types/domain";
import {
  appointments as seedAppointments,
  customers as seedCustomers,
  documents as seedDocuments,
  estimates as seedEstimates,
  expenses as seedExpenses,
  inspections as seedInspections,
  invoices as seedInvoices,
  locations,
  mechanics as seedMechanics,
  notifications as seedNotifications,
  parts as seedParts,
  payments as seedPayments,
  purchaseOrders as seedPurchaseOrders,
  services as seedServices,
  suppliers as seedSuppliers,
  threads as seedThreads,
  vehicles as seedVehicles,
  workOrders as seedWorkOrders,
} from "@/data/demo";
interface DemoState {
  customers: Customer[];
  vehicles: typeof seedVehicles;
  workOrders: WorkOrder[];
  appointments: Appointment[];
  inspections: Inspection[];
  mechanics: Mechanic[];
  parts: Part[];
  suppliers: typeof seedSuppliers;
  purchaseOrders: PurchaseOrder[];
  services: typeof seedServices;
  estimates: Estimate[];
  invoices: Invoice[];
  payments: Payment[];
  expenses: Expense[];
  threads: typeof seedThreads;
  notifications: Notification[];
  documents: typeof seedDocuments;
  locationId: string;
  settings: Record<string, string | number | boolean>;
  timeLogs: Record<string, number>;
  activeTimers: Record<string, number>;
}
type StateAction =
  | { type: "hydrate"; payload: Partial<DemoState> }
  | { type: "location"; id: string }
  | { type: "setting"; key: string; value: string | number | boolean }
  | { type: "add-customer"; record: Customer }
  | { type: "update-customer"; id: string; patch: Partial<Customer> }
  | { type: "add-vehicle"; record: DemoState["vehicles"][number] }
  | { type: "add-work-order"; record: WorkOrder }
  | { type: "update-work-order"; id: string; patch: Partial<WorkOrder> }
  | { type: "add-appointment"; record: Appointment }
  | { type: "update-appointment"; id: string; patch: Partial<Appointment> }
  | { type: "check-in"; id: string; patch: Partial<Appointment> }
  | { type: "update-inspection"; id: string; patch: Partial<Inspection> }
  | {
      type: "update-inspection-item";
      inspectionId: string;
      sectionId: string;
      itemId: string;
      patch: Partial<Inspection["sections"][number]["items"][number]>;
    }
  | { type: "add-part"; record: Part }
  | { type: "adjust-stock"; id: string; delta: number }
  | { type: "add-purchase-order"; record: PurchaseOrder }
  | {
      type: "receive-purchase-order";
      id: string;
      received: Record<string, number>;
    }
  | { type: "update-estimate"; id: string; patch: Partial<Estimate> }
  | { type: "add-estimate"; record: Estimate }
  | { type: "add-invoice"; record: Invoice }
  | { type: "payment"; invoiceId: string; payment: Payment }
  | { type: "add-expense"; record: Expense }
  | { type: "add-message"; threadId: string; message: Message }
  | { type: "mark-thread-read"; threadId: string }
  | { type: "send-message"; thread: (typeof seedThreads)[number] }
  | { type: "read-notification"; id: string }
  | { type: "read-all" }
  | { type: "add-notification"; record: Notification }
  | { type: "add-mechanic"; record: Mechanic }
  | { type: "update-mechanic"; id: string; patch: Partial<Mechanic> }
  | { type: "add-timer"; workOrderId: string; seconds: number }
  | { type: "start-timer"; workOrderId: string; timestamp: number }
  | { type: "stop-timer"; workOrderId: string; seconds: number }
  | { type: "add-document"; record: GarageDocument };
const freshState = (): DemoState => ({
  customers: seedCustomers,
  vehicles: seedVehicles,
  workOrders: seedWorkOrders,
  appointments: seedAppointments,
  inspections: seedInspections,
  mechanics: seedMechanics,
  parts: seedParts,
  suppliers: seedSuppliers,
  purchaseOrders: seedPurchaseOrders,
  services: seedServices,
  estimates: seedEstimates,
  invoices: seedInvoices,
  payments: seedPayments,
  expenses: seedExpenses,
  threads: seedThreads,
  notifications: seedNotifications,
  documents: seedDocuments,
  locationId: "LOC-01",
  settings: {
    "Garage name": "GarageX Auto Services",
    Address: "123 Industrial Ave, San Francisco, CA 94103",
    Phone: "(415) 555-0100",
    Email: "hello@garagex.example.com",
    Website: "garagex.example.com",
    Currency: "USD",
    "Distance unit": "km",
    Timezone: "America/Los_Angeles",
    "Tax rate": 8,
    "Default labor rate": 90,
    "Cancellation window": "24 hours",
    "Opening time": "08:00",
    "Closing time": "18:00",
  },
  timeLogs: {},
  activeTimers: {},
});
function reducer(state: DemoState, action: StateAction): DemoState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        ...Object.fromEntries(
          Object.entries(action.payload).filter(
            ([, v]) =>
              Array.isArray(v) || (v !== null && typeof v === "object"),
          ),
        ),
      };
    case "location":
      return { ...state, locationId: action.id };
    case "setting":
      return {
        ...state,
        settings: { ...state.settings, [action.key]: action.value },
      };
    case "add-customer":
      return { ...state, customers: [action.record, ...state.customers] };
    case "update-customer":
      return {
        ...state,
        customers: state.customers.map((x) =>
          x.id === action.id ? { ...x, ...action.patch } : x,
        ),
      };
    case "add-vehicle":
      return { ...state, vehicles: [action.record, ...state.vehicles] };
    case "add-work-order":
      return { ...state, workOrders: [action.record, ...state.workOrders] };
    case "update-work-order":
      return {
        ...state,
        workOrders: state.workOrders.map((w) =>
          w.id === action.id ? { ...w, ...action.patch } : w,
        ),
      };
    case "add-appointment":
      return { ...state, appointments: [action.record, ...state.appointments] };
    case "update-appointment":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.id ? { ...a, ...action.patch } : a,
        ),
      };
    case "check-in":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.id
            ? { ...a, status: "checked-in", ...action.patch }
            : a,
        ),
      };
    case "update-inspection":
      return {
        ...state,
        inspections: state.inspections.map((i) =>
          i.id === action.id ? { ...i, ...action.patch } : i,
        ),
      };
    case "update-inspection-item":
      return {
        ...state,
        inspections: state.inspections.map((i) =>
          i.id !== action.inspectionId
            ? i
            : {
                ...i,
                sections: i.sections.map((s) =>
                  s.id !== action.sectionId
                    ? s
                    : {
                        ...s,
                        items: s.items.map((x) =>
                          x.id === action.itemId
                            ? { ...x, ...action.patch }
                            : x,
                        ),
                      },
                ),
              },
        ),
      };
    case "add-part":
      return { ...state, parts: [action.record, ...state.parts] };
    case "adjust-stock":
      return {
        ...state,
        parts: state.parts.map((p) =>
          p.id === action.id
            ? { ...p, onHand: Math.max(0, p.onHand + action.delta) }
            : p,
        ),
      };
    case "add-purchase-order":
      return {
        ...state,
        purchaseOrders: [action.record, ...state.purchaseOrders],
      };
    case "receive-purchase-order": {
      const po = state.purchaseOrders.find((x) => x.id === action.id);
      if (!po) return state;
      return {
        ...state,
        purchaseOrders: state.purchaseOrders.map((o) =>
          o.id === action.id
            ? {
                ...o,
                status: o.items.every(
                  (i) =>
                    i.received + (action.received[i.id] || 0) >= i.quantity,
                )
                  ? "received"
                  : "partially-received",
                items: o.items.map((i) => ({
                  ...i,
                  received: i.received + (action.received[i.id] || 0),
                })),
              }
            : o,
        ),
        parts: state.parts.map((p) => ({
          ...p,
          onHand:
            p.onHand +
            po.items
              .filter((i) => i.partId === p.id)
              .reduce((s, i) => s + (action.received[i.id] || 0), 0),
        })),
      };
    }
    case "update-estimate":
      return {
        ...state,
        estimates: state.estimates.map((e) =>
          e.id === action.id ? { ...e, ...action.patch } : e,
        ),
      };
    case "add-estimate":
      return { ...state, estimates: [action.record, ...state.estimates] };
    case "add-invoice":
      return { ...state, invoices: [action.record, ...state.invoices] };
    case "payment":
      return {
        ...state,
        invoices: state.invoices.map((i) => {
          if (i.id !== action.invoiceId) return i;
          const amount =
            i.items.reduce((s, x) => s + x.quantity * x.unitPrice, 0) *
              (1 + i.taxRate) -
            i.discount -
            i.paid -
            action.payment.amount;
          return {
            ...i,
            paid: i.paid + action.payment.amount,
            status: amount <= 0.01 ? "paid" : "partially-paid",
          };
        }),
        payments: [action.payment, ...state.payments],
      };
    case "add-expense":
      return { ...state, expenses: [action.record, ...state.expenses] };
    case "add-message":
      return {
        ...state,
        threads: state.threads.map((t) =>
          t.id === action.threadId
            ? {
                ...t,
                messages: [...t.messages, action.message],
                updatedAt: action.message.sentAt,
                unread: 0,
              }
            : t,
        ),
      };
    case "mark-thread-read":
      return {
        ...state,
        threads: state.threads.map((t) =>
          t.id === action.threadId ? { ...t, unread: 0 } : t,
        ),
      };
    case "send-message":
      return { ...state, threads: [action.thread, ...state.threads] };
    case "read-notification":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n,
        ),
      };
    case "read-all":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    case "add-notification":
      return {
        ...state,
        notifications: [action.record, ...state.notifications],
      };
    case "add-mechanic":
      return { ...state, mechanics: [action.record, ...state.mechanics] };
    case "update-mechanic":
      return {
        ...state,
        mechanics: state.mechanics.map((m) =>
          m.id === action.id ? { ...m, ...action.patch } : m,
        ),
      };
    case "add-timer":
      return {
        ...state,
        timeLogs: {
          ...state.timeLogs,
          [action.workOrderId]:
            (state.timeLogs[action.workOrderId] || 0) + action.seconds,
        },
      };
    case "start-timer":
      return {
        ...state,
        activeTimers: {
          ...state.activeTimers,
          [action.workOrderId]: action.timestamp,
        },
      };
    case "stop-timer": {
      const timers = { ...state.activeTimers };
      delete timers[action.workOrderId];
      return {
        ...state,
        activeTimers: timers,
        timeLogs: {
          ...state.timeLogs,
          [action.workOrderId]:
            (state.timeLogs[action.workOrderId] || 0) + action.seconds,
        },
      };
    }
    case "add-document":
      return { ...state, documents: [action.record, ...state.documents] };
    default:
      return state;
  }
}
interface GarageContext extends DemoState {
  locations: typeof locations;
  dispatch: (action: StateAction) => void;
  workOrdersForCustomer: (id: string) => WorkOrder[];
  vehiclesForCustomer: (id: string) => typeof seedVehicles;
  invoiceBalance: (id: string) => number;
  locationLabel: string;
  resetDemo: () => void;
  id: (prefix: string) => string;
}
const GarageCtx = createContext<GarageContext | null>(null);
export function GarageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, freshState);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("garagex-demo-v2");
      if (saved) dispatch({ type: "hydrate", payload: JSON.parse(saved) });
    } catch {
      toast.error(
        "Saved demo data could not be restored. Fresh demo data has been loaded.",
      );
      localStorage.removeItem("garagex-demo-v2");
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("garagex-demo-v2", JSON.stringify(state));
    } catch {}
  }, [state]);
  const locationLabel =
    locations.find((x) => x.id === state.locationId)?.name || "All Locations";
  const workOrdersForCustomer = useCallback(
    (id: string) => state.workOrders.filter((w) => w.customerId === id),
    [state.workOrders],
  );
  const vehiclesForCustomer = useCallback(
    (id: string) => state.vehicles.filter((w) => w.customerId === id),
    [state.vehicles],
  );
  const invoiceBalance = useCallback(
    (id: string) => {
      const i = state.invoices.find((x) => x.id === id);
      return i
        ? Math.max(
            0,
            i.items.reduce((s, x) => s + x.quantity * x.unitPrice, 0) *
              (1 + i.taxRate) -
              i.discount -
              i.paid,
          )
        : 0;
    },
    [state.invoices],
  );
  const resetDemo = useCallback(() => {
    localStorage.removeItem("garagex-demo-v2");
    window.location.reload();
  }, []);
  const context = useMemo(
    () => ({
      ...state,
      locations,
      dispatch,
      locationLabel,
      workOrdersForCustomer,
      vehiclesForCustomer,
      invoiceBalance,
      resetDemo,
      id: (prefix: string) =>
        `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    }),
    [
      state,
      locationLabel,
      workOrdersForCustomer,
      vehiclesForCustomer,
      invoiceBalance,
      resetDemo,
    ],
  );
  return <GarageCtx.Provider value={context}>{children}</GarageCtx.Provider>;
}
export function useGarage() {
  const c = useContext(GarageCtx);
  if (!c) throw new Error("useGarage requires GarageProvider");
  return c;
}
export function updateStatus(
  dispatch: GarageContext["dispatch"],
  workOrderId: string,
  status: WorkOrder["status"],
  current: WorkOrder,
) {
  dispatch({
    type: "update-work-order",
    id: workOrderId,
    patch: {
      status,
      ...(status === "in-progress" && !current.startedAt
        ? { startedAt: new Date().toISOString() }
        : {}),
      ...(status === "completed"
        ? {
            completedAt: new Date().toISOString(),
            mileageOut: current.mileageIn + 17,
          }
        : {}),
    },
  });
  toast.success(`Work order moved to ${status.replaceAll("-", " ")}`);
}
