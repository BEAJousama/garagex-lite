import test from "node:test";
import assert from "node:assert/strict";
import * as demo from "../src/data/demo.ts";

test("primary workshop records resolve to real demo entities", () => {
  const order = demo.workOrders.find((item) => item.id === "WO-2026-0291");
  assert.ok(order);
  assert.equal(order.customerId, "CUS-0101");
  assert.equal(order.vehicleId, "VEH-0501");
  assert.ok(demo.customers.some((item) => item.id === order.customerId));
  assert.ok(demo.vehicles.some((item) => item.id === order.vehicleId));
  assert.ok(demo.mechanics.some((item) => item.id === order.technicianId));
  assert.ok(demo.inspections.some((item) => item.id === order.inspectionId));
  assert.ok(demo.estimates.some((item) => item.id === order.estimateId));
  assert.ok(demo.invoices.some((item) => item.id === order.invoiceId));
});

test("flagship BMW repair matches the invoice, estimate, and deposit story", () => {
  const order = demo.workOrders[0];
  const invoice = demo.invoices.find((item) => item.id === order.invoiceId);
  const estimate = demo.estimates.find((item) => item.id === order.estimateId);
  const payment = demo.payments.find((item) => item.invoiceId === invoice.id);
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const total = subtotal * (1 + invoice.taxRate) - invoice.discount;
  assert.equal(order.id, "WO-2026-0291");
  assert.equal(estimate.id, "EST-2026-0214");
  assert.equal(invoice.id, "INV-2026-0188");
  assert.equal(Math.round(total * 100) / 100, 660.4);
  assert.equal(invoice.paid, 300);
  assert.equal(payment.amount, 300);
  assert.equal(order.parts[0].partId, demo.parts[0].id);
});

test("all linked work orders point to existing people, cars, staff, and documents", () => {
  const customers = new Set(demo.customers.map((item) => item.id));
  const vehicles = new Set(demo.vehicles.map((item) => item.id));
  const mechanics = new Set(demo.mechanics.map((item) => item.id));
  const inspections = new Set(demo.inspections.map((item) => item.id));
  const estimates = new Set(demo.estimates.map((item) => item.id));
  const invoices = new Set(demo.invoices.map((item) => item.id));
  for (const order of demo.workOrders) {
    assert.ok(customers.has(order.customerId), `${order.id} customer`);
    assert.ok(vehicles.has(order.vehicleId), `${order.id} vehicle`);
    assert.ok(mechanics.has(order.technicianId), `${order.id} technician`);
    if (order.inspectionId)
      assert.ok(inspections.has(order.inspectionId), `${order.id} inspection`);
    if (order.estimateId)
      assert.ok(estimates.has(order.estimateId), `${order.id} estimate`);
    if (order.invoiceId)
      assert.ok(invoices.has(order.invoiceId), `${order.id} invoice`);
  }
});

test("all vehicle/customer ownership and inspection recommendation links are valid", () => {
  const customers = new Set(demo.customers.map((item) => item.id));
  const services = new Set(demo.services.map((item) => item.id));
  for (const vehicle of demo.vehicles)
    assert.ok(customers.has(vehicle.customerId), vehicle.id);
  for (const inspection of demo.inspections) {
    assert.ok(customers.has(inspection.customerId), inspection.id);
    for (const item of inspection.sections.flatMap(
      (section) => section.items,
    )) {
      if (item.recommendationServiceId)
        assert.ok(services.has(item.recommendationServiceId));
    }
  }
});

test("the rest of the demo uses valid foreign keys and 17-character VINs", () => {
  const customers = new Set(demo.customers.map((item) => item.id));
  const vehicles = new Set(demo.vehicles.map((item) => item.id));
  const mechanics = new Set(demo.mechanics.map((item) => item.id));
  const services = new Set(demo.services.map((item) => item.id));
  const parts = new Set(demo.parts.map((item) => item.id));
  const suppliers = new Set(demo.suppliers.map((item) => item.id));
  const invoices = new Set(demo.invoices.map((item) => item.id));
  for (const vehicle of demo.vehicles)
    assert.match(vehicle.vin, /^[A-HJ-NPR-Z0-9]{17}$/);
  assert.equal(
    new Set(demo.vehicles.map((item) => item.vin)).size,
    demo.vehicles.length,
  );
  for (const appointment of demo.appointments) {
    assert.ok(customers.has(appointment.customerId));
    assert.ok(vehicles.has(appointment.vehicleId));
    assert.ok(mechanics.has(appointment.technicianId));
  }
  for (const order of demo.workOrders) {
    for (const item of order.services) assert.ok(services.has(item.serviceId));
    for (const item of order.parts) assert.ok(parts.has(item.partId));
  }
  for (const invoice of demo.invoices) {
    assert.ok(customers.has(invoice.customerId));
    assert.ok(vehicles.has(invoice.vehicleId));
  }
  for (const payment of demo.payments) {
    assert.ok(customers.has(payment.customerId));
    assert.ok(invoices.has(payment.invoiceId));
  }
  for (const po of demo.purchaseOrders) {
    assert.ok(suppliers.has(po.supplierId));
    for (const item of po.items) assert.ok(parts.has(item.partId));
  }
});
