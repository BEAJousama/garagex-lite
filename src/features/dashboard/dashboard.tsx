"use client";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  DollarSign,
  ExternalLink,
  Package,
  Plus,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  Button,
  MetricCard,
  EntityAvatar,
  StatusBadge,
  Modal,
  FilterSelect,
  EmptyState,
} from "@/components/ui/primitives";
import { useGarage, updateStatus } from "@/hooks/use-garage";
import { formatCurrency, formatShortDate, formatTime } from "@/lib/utils";
import { workOrderStatuses } from "@/domain/status";
import { activity, revenueByMonth } from "@/data/demo";
export function Dashboard() {
  const g = useGarage();
  const [range, setRange] = useState("30 days");
  const [detail, setDetail] = useState<string | null>(null);
  const order = g.workOrders.find((w) => w.id === detail);
  const active = g.workOrders.filter(
    (w) => !["completed", "cancelled"].includes(w.status),
  );
  const appointments = g.appointments
    .filter((a) => a.date === "2026-10-05")
    .slice(0, 6);
  const chart = useMemo(
    () =>
      revenueByMonth.map((r) => ({
        month: r.name,
        revenue:
          range === "7 days"
            ? Math.round(r.revenue / 5)
            : range === "90 days"
              ? Math.round(r.revenue * 2.5)
              : range === "12 months"
                ? r.revenue
                : Math.round(r.revenue * 0.88),
        parts: Math.round(r.revenue * 0.39),
        labor: Math.round(r.revenue * 0.61),
      })),
    [range],
  );
  const statusOrder = [
    "waiting",
    "inspection",
    "awaiting-approval",
    "approved",
    "in-progress",
    "waiting-parts",
    "quality-check",
    "ready",
  ];
  const distribution = statusOrder.map((s) => ({
    status: s,
    label: workOrderStatuses.find((x) => x.value === s)?.label || s,
    count: g.workOrders.filter((w) => w.status === s).length,
  }));
  const total = distribution.reduce((n, x) => n + x.count, 0);
  const getCustomer = (id: string) => g.customers.find((c) => c.id === id);
  const getVehicle = (id: string) => g.vehicles.find((v) => v.id === id);
  const getMechanic = (id: string) => g.mechanics.find((m) => m.id === id);
  return (
    <>
      <div className="page-heading">
        <div className="page-heading-row">
          <div>
            <span className="eyebrow">MONDAY · OCTOBER 5, 2026</span>
            <h1>Good morning, Alex</h1>
            <p>Here&apos;s what&apos;s happening at {g.locationLabel} today.</p>
          </div>
          <div className="page-actions">
            <Link className="btn btn-quiet btn-md" href="/appointments">
              <CalendarDays size={15} />
              Book appointment
            </Link>
            <Link className="btn btn-primary btn-md" href="/work-orders/new">
              <Plus size={15} />
              New work order
            </Link>
          </div>
        </div>
      </div>
      <div className="metrics-grid cols-6">
        <MetricCard
          label="Vehicles in workshop"
          value="14"
          change="2 more"
          comparison="up"
          caption="than yesterday"
          icon={<Car size={16} />}
          accent="orange"
          href="/work-orders"
        />
        <MetricCard
          label="Today's appointments"
          value="8"
          change="3 remaining"
          comparison="neutral"
          caption="until close"
          icon={<CalendarDays size={16} />}
          accent="blue"
          href="/appointments"
        />
        <MetricCard
          label="Active work orders"
          value="21"
          change="4 due today"
          comparison="neutral"
          caption="across all bays"
          icon={<Wrench size={16} />}
          accent="violet"
          href="/work-orders"
        />
        <MetricCard
          label="Waiting for parts"
          value="4"
          change="2 low stock"
          comparison="down"
          caption="need attention"
          icon={<Package size={16} />}
          accent="amber"
          href="/inventory"
        />
        <MetricCard
          label="Today's revenue"
          value="$4,280"
          change="12.5%"
          comparison="up"
          caption="vs. last Monday"
          icon={<DollarSign size={16} />}
          accent="green"
          href="/payments"
        />
        <MetricCard
          label="Pending payments"
          value="$7,950"
          caption="12 open invoices"
          icon={<Clock3 size={16} />}
          accent="slate"
          href="/invoices"
        />
      </div>
      <div className="dashboard-primary-grid">
        <Card
          title="Revenue overview"
          subtitle="Collected revenue across your workshop"
          className="revenue-card"
          action={
            <FilterSelect
              label="Chart period"
              value={range}
              onChange={setRange}
              options={["7 days", "30 days", "90 days", "12 months"]}
            />
          }
        >
          <div className="chart-summary">
            <strong>{formatCurrency(51240)}</strong>
            <span className="trend-positive">
              ↗ 8.2% <small>vs prior period</small>
            </span>
            <span className="chart-legend">
              <i />
              Revenue
            </span>
          </div>
          <div className="revenue-chart">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={180}
            >
              <AreaChart
                data={chart}
                margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-fg)", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={42}
                  tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                  tick={{ fill: "var(--muted-fg)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 9,
                    color: "var(--fg)",
                    fontSize: 13,
                  }}
                  formatter={(v) => formatCurrency(Number(v))}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="var(--accent)"
                  strokeWidth={2.3}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card
          title="Workshop status"
          subtitle={`${total} jobs across the service floor`}
          action={
            <Link className="text-action" href="/work-orders">
              All work orders <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="status-total">
            <strong>{total}</strong>
            <span>active jobs</span>
          </div>
          <div className="status-stack">
            {distribution
              .filter((x) => x.count)
              .map((x) => (
                <Link
                  key={x.status}
                  href={`/work-orders?status=${x.status}`}
                  className="status-row"
                >
                  <span className={`status-dot status-${x.status}`} />
                  <span>{x.label}</span>
                  <strong>{x.count}</strong>
                  <i>
                    <b
                      style={{
                        width: `${(x.count / Math.max(total, 1)) * 100}%`,
                      }}
                    />
                  </i>
                </Link>
              ))}
          </div>
        </Card>
      </div>
      <div className="dashboard-secondary-grid">
        <Card
          title="Today's arrivals"
          subtitle="Monday, October 5"
          action={
            <Link href="/appointments" className="text-action">
              Schedule <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="arrival-list">
            {appointments.map((a) => {
              const v = getVehicle(a.vehicleId);
              const c = getCustomer(a.customerId);
              const m = getMechanic(a.technicianId);
              return (
                <div className="arrival-row" key={a.id}>
                  <time>{formatTime(a.start)}</time>
                  <EntityAvatar
                    name={v ? `${v.make} ${v.model}` : "Vehicle"}
                    kind="vehicle"
                    size="sm"
                  />
                  <div className="arrival-main">
                    <Link href={`/vehicles/${a.vehicleId}`}>
                      <strong>
                        {v?.make} {v?.model}
                      </strong>
                    </Link>
                    <span>
                      {c?.name} ·{" "}
                      {a.serviceIds
                        .map((id) => g.services.find((s) => s.id === id)?.name)
                        .filter(Boolean)
                        .slice(0, 2)
                        .join(" + ")}
                    </span>
                    <small>
                      <Wrench size={11} />
                      {m?.name}
                    </small>
                  </div>
                  <StatusBadge status={a.status} />
                  <button
                    className="icon-btn"
                    aria-label="View appointment"
                    onClick={() =>
                      setDetail(a.workOrderId || g.workOrders[0]?.id || null)
                    }
                  >
                    <ExternalLink size={14} />
                  </button>
                </div>
              );
            })}
            {!appointments.length && (
              <EmptyState
                title="No arrivals today"
                description="Your next scheduled vehicles will appear here."
              />
            )}
          </div>
        </Card>
        <Card
          title="Active work orders"
          subtitle="Jobs currently moving through the shop"
          action={
            <Link href="/work-orders" className="text-action">
              View all <ArrowRight size={13} />
            </Link>
          }
          flush
        >
          <div className="compact-orders">
            {active.slice(0, 5).map((w) => {
              const v = getVehicle(w.vehicleId),
                c = getCustomer(w.customerId),
                m = getMechanic(w.technicianId);
              const progress = Math.min(
                95,
                Math.max(
                  12,
                  (workOrderStatuses.find((s) => s.value === w.status)?.step ||
                    1) * 14,
                ),
              );
              return (
                <button
                  className="compact-order"
                  key={w.id}
                  onClick={() => setDetail(w.id)}
                >
                  <span className="mono order-number">
                    {w.id.replace("WO-2026-", "WO-")}
                  </span>
                  <span className="order-vehicle">
                    <strong>
                      {v?.make} {v?.model}
                    </strong>
                    <small>{c?.name}</small>
                  </span>
                  <span className="order-tech">
                    <EntityAvatar name={m?.name || "Tech"} size="xs" />
                    <small>{m?.name.split(" ")[0]}</small>
                  </span>
                  <span className="order-progress">
                    <i>
                      <b style={{ width: `${progress}%` }} />
                    </i>
                    <small>{progress}%</small>
                  </span>
                  <StatusBadge tiny status={w.status} />
                </button>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="dashboard-tertiary-grid">
        <Card
          title="Technician workload"
          subtitle="Hours booked today"
          action={
            <Link href="/mechanics" className="text-action">
              Team <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="workload-list">
            {g.mechanics.slice(0, 5).map((m) => (
              <div className="workload-row" key={m.id}>
                <EntityAvatar name={m.name} size="sm" color={m.color} />
                <span className="workload-name">
                  <strong>{m.name}</strong>
                  <small>{m.activeJobs} active jobs</small>
                </span>
                <div className="workload-hours">
                  <strong>
                    {m.bookedHours}
                    <small> / {m.bookedHours + m.availableHours}h</small>
                  </strong>
                  <i>
                    <b
                      style={{
                        width: `${Math.min(100, (m.bookedHours / (m.bookedHours + m.availableHours)) * 100)}%`,
                      }}
                    />
                  </i>
                </div>
                <span className="workload-percent">
                  {Math.round(
                    (m.bookedHours / (m.bookedHours + m.availableHours)) * 100,
                  )}
                  %
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card
          title="Parts to watch"
          subtitle="Reorder before jobs stall"
          action={
            <Link href="/inventory" className="text-action">
              Inventory <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="low-stock-list">
            {g.parts
              .filter((p) => p.onHand - p.reserved <= p.minimum)
              .slice(0, 4)
              .map((p) => (
                <div className="stock-row" key={p.id}>
                  <span className="stock-icon">
                    <Package size={16} />
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <small>
                      {p.sku} · Min. {p.minimum}
                    </small>
                  </span>
                  <em
                    className={p.onHand - p.reserved === 0 ? "out-stock" : ""}
                  >
                    {p.onHand - p.reserved} left
                  </em>
                </div>
              ))}
          </div>
          <Link className="stock-cta" href="/purchase-orders">
            <Plus size={14} />
            Create purchase order
          </Link>
        </Card>
        <Card
          title="Shop floor"
          subtitle="Service bays · Downtown"
          action={
            <Link href="/calendar" className="text-action">
              Schedule <ArrowRight size={13} />
            </Link>
          }
        >
          <div className="bay-grid">
            {[
              "BMW M4",
              "Audi Q5",
              "Available",
              "Toyota RAV4",
              "Open",
              "Available",
            ].map((b, i) => (
              <div
                className={`bay-tile ${b === "Available" || b === "Open" ? "bay-free" : "bay-busy"}`}
                key={`${b}-${i}`}
              >
                <span>Bay {i + 1}</span>
                <strong>{b === "Available" || b === "Open" ? b : b}</strong>
                <small>
                  {b === "Available" || b === "Open"
                    ? "Ready for assignment"
                    : i === 0
                      ? "Brake service · 65%"
                      : i === 1
                        ? "Diagnostics · 30%"
                        : "Annual service · 82%"}
                </small>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card
        className="activity-card"
        title="Recent activity"
        subtitle="A live view of the workshop"
        action={
          <Link className="text-action" href="/work-orders">
            Activity log <ArrowRight size={13} />
          </Link>
        }
      >
        <div className="activity-strip">
          {activity.slice(0, 5).map((a, i) => (
            <div className="activity-item" key={a.id}>
              <span className={`activity-icon activity-${a.kind}`}>
                {i === 0 ? (
                  <Wrench size={15} />
                ) : i === 1 ? (
                  <CheckCircle2 size={15} />
                ) : i === 2 ? (
                  <DollarSign size={15} />
                ) : i === 3 ? (
                  <ClipboardCheck size={15} />
                ) : (
                  <Car size={15} />
                )}
              </span>
              <span>
                <strong>{a.title}</strong>
                <small>{a.description}</small>
              </span>
              <time>{a.date}</time>
            </div>
          ))}
        </div>
      </Card>
      {order && (
        <Modal
          open={!!order}
          onClose={() => setDetail(null)}
          title={`${order.id} · ${getVehicle(order.vehicleId)?.make} ${getVehicle(order.vehicleId)?.model}`}
          description={`${getCustomer(order.customerId)?.name} · ${order.complaint}`}
          drawer
        >
          <div className="modal-padding">
            <div className="detail-total">
              <span>Current estimate</span>
              <strong>{formatCurrency(orderTotal(order))}</strong>
            </div>
            <div className="detail-field-grid">
              <div>
                <small>Assigned technician</small>
                <strong>{getMechanic(order.technicianId)?.name}</strong>
              </div>
              <div>
                <small>Promised by</small>
                <strong>{formatShortDate(order.dueAt)}</strong>
              </div>
              <div>
                <small>Mileage in</small>
                <strong>{order.mileageIn.toLocaleString()} km</strong>
              </div>
              <div>
                <small>Service bay</small>
                <strong>Bay 2</strong>
              </div>
            </div>
            <label className="field-label">
              Update status
              <FilterSelect
                label="Work order status"
                value={order.status}
                onChange={(v) =>
                  updateStatus(
                    g.dispatch,
                    order.id,
                    v as typeof order.status,
                    order,
                  )
                }
                options={workOrderStatuses.map((s) => ({
                  value: s.value,
                  label: s.label,
                }))}
              />
            </label>
            <div className="modal-actions">
              <Link
                className="btn btn-primary btn-md"
                href={`/work-orders/${order.id}`}
              >
                Open work order <ArrowRight size={14} />
              </Link>
              <Button variant="quiet" onClick={() => setDetail(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
function orderTotal(w: {
  labor: number;
  shopSupplies: number;
  taxRate: number;
  discount: number;
  parts: { price: number; quantity: number }[];
}) {
  const sub =
    w.labor +
    w.shopSupplies +
    w.parts.reduce((n, p) => n + p.price * p.quantity, 0);
  return sub * (1 + w.taxRate) - w.discount;
}
