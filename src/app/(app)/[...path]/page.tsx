import { notFound } from "next/navigation";
import { ProFeature } from "@/components/shell/pro-feature";
import { proFeatures } from "@/lib/pro";
import {
  customers,
  estimates,
  inspections,
  invoices,
  mechanics,
  vehicles,
  workOrders,
} from "@/data/demo";

// Only these Pro preview URLs exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  const settings = [
    "business",
    "locations",
    "team",
    "workshop",
    "billing",
    "notifications",
    "appearance",
  ];
  return [
    ...Object.keys(proFeatures)
      .filter((key) => key !== "customers" && key !== "team")
      .map((key) => [key]),
    ["work-orders", "new"],
    ["estimates", "new"],
    ["team", "schedule"],
    ...workOrders.map((x) => ["work-orders", x.id]),
    ...customers.map((x) => ["customers", x.id]),
    ...vehicles.map((x) => ["vehicles", x.id]),
    ...mechanics.map((x) => ["mechanics", x.id]),
    ...inspections.map((x) => ["inspections", x.id]),
    ...estimates.map((x) => ["estimates", x.id]),
    ...invoices.map((x) => ["invoices", x.id]),
    ...settings.map((s) => ["settings", s]),
  ].map((path) => ({ path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  return { title: proFeatures[path[0]]?.title ?? "Not found" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  // "customers" alone is the Lite directory, so only customers/<id> lands here.
  if (!proFeatures[path[0]]) notFound();
  return <ProFeature path={path} />;
}
