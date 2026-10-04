"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { LegacyColumnDef } from "@tanstack/react-table/legacy";
import { toast } from "sonner";
import {
  CalendarDays,
  Car,
  Download,
  Filter,
  Package,
  Plus,
  Search,
  Wrench,
} from "lucide-react";
import {
  Button,
  Card,
  EntityAvatar,
  FilterSelect,
  MetricCard,
  Modal,
  PageHeader,
  StatusBadge,
} from "@/components/ui/primitives";
import { DataTable } from "@/components/ui/data-table";
import { useGarage } from "@/hooks/use-garage";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Customer } from "@/types/domain";

export function CustomersList() {
  const g = useGarage();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [create, setCreate] = useState(false);
  const lifetime = (id: string) =>
    g.invoices
      .filter((i) => i.customerId === id)
      .reduce(
        (s, i) => s + i.items.reduce((x, it) => x + it.quantity * it.unitPrice, 0),
        0,
      );
  const customers = g.customers.filter(
    (c) =>
      `${c.name} ${c.email} ${c.phone} ${c.company || ""} ${g.vehicles
        .filter((v) => v.customerId === c.id)
        .map((v) => `${v.make} ${v.model} ${v.plate}`)}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "all" || c.status === status),
  );
  const columns = useMemo<LegacyColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
          <Link className="entity-link" href={`/customers/${row.original.id}`}>
            <EntityAvatar name={row.original.name} size="sm" />
            <span>
              <strong>{row.original.name}</strong>
              <small>{row.original.company || row.original.email}</small>
            </span>
          </Link>
        ),
      },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "email", header: "Email" },
      {
        id: "vehicles",
        header: "Vehicles",
        accessorFn: (r) => g.vehicles.filter((v) => v.customerId === r.id).length,
      },
      {
        id: "last",
        header: "Last visit",
        accessorFn: (r) =>
          g.workOrders.find((w) => w.customerId === r.id)?.createdAt || "",
        cell: ({ getValue }) => formatDate(String(getValue())),
      },
      {
        id: "spend",
        header: "Lifetime value",
        accessorFn: (r) => lifetime(r.id),
        cell: ({ getValue }) => formatCurrency(Number(getValue())),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [g.vehicles, g.workOrders, g.invoices],
  );
  const metrics: [string, string | number][] = [
    ["Total customers", g.customers.length],
    ["Active", g.customers.filter((c) => c.status === "active").length],
    ["New this month", 12],
    ["Lifetime value", formatCurrency(128420)],
  ];
  const icons = [Car, Wrench, CalendarDays, Package];
  return (
    <>
      <PageHeader
        title="Customers"
        description="Customer relationships, vehicles and service history."
        eyebrow="GARAGEX WORKSPACE"
        actions={
          <>
            <Button
              variant="quiet"
              onClick={() =>
                toast.success("CSV export ready for the filtered records.")
              }
            >
              <Download size={14} />
              Export
            </Button>
            <Button variant="primary" onClick={() => setCreate(true)}>
              <Plus size={15} />
              Add customer
            </Button>
          </>
        }
      />
      <div className="metrics-grid cols-4">
        {metrics.map(([label, value], i) => {
          const Icon = icons[i];
          return (
            <MetricCard
              key={label}
              label={label}
              value={String(value)}
              icon={<Icon size={16} />}
              accent={["orange", "blue", "green", "amber"][i]}
            />
          );
        })}
      </div>
      <Card className="record-list-card">
        <div className="record-toolbar">
          <div className="search-control">
            <Search size={15} />
            <input
              aria-label="Search customers"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FilterSelect
            label="Filter status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "All statuses" },
              { value: "active", label: "Active" },
              { value: "new", label: "New" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <Button variant="quiet" size="sm">
            <Filter size={14} />
            Filters
          </Button>
          <span className="records-count">{customers.length} records</span>
        </div>
        <DataTable
          data={customers}
          columns={columns}
          searchValue={search}
          globalFilter={false}
          filename="garagex-customers"
        />
      </Card>
      {create && <AddCustomer onClose={() => setCreate(false)} />}
    </>
  );
}

function AddCustomer({ onClose }: { onClose: () => void }) {
  const g = useGarage();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  return (
    <Modal
      open
      onClose={onClose}
      title="Add customer"
      description="Add a record to the GarageX demo workspace."
    >
      <form
        className="modal-padding"
        onSubmit={(e) => {
          e.preventDefault();
          g.dispatch({
            type: "add-customer",
            record: {
              id: g.id("CUS"),
              name,
              type: "individual",
              phone: contact,
              email: `${name.toLowerCase().replaceAll(" ", ".")}@example.com`,
              address: "San Francisco, CA",
              since: new Date().toISOString().slice(0, 10),
              preferredContact: "Email",
              tags: ["New Customer"],
              status: "new",
            },
          });
          toast.success("Customer saved.");
          onClose();
        }}
      >
        <label className="field-label">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
          />
        </label>
        <label className="field-label">
          Contact detail
          <input
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone number"
          />
        </label>
        <p className="form-hint">
          Demo data is stored in this browser only. No external service is
          contacted.
        </p>
        <div className="modal-actions">
          <Button variant="quiet" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save record
          </Button>
        </div>
      </form>
    </Modal>
  );
}
