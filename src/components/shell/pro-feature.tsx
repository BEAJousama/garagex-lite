import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Card, PageHeader } from "@/components/ui/primitives";
import { DEMO_URL, PRO_URL, proFeatures } from "@/lib/pro";

/** Shown in place of screens that ship only with GarageX Pro. */
export function ProFeature({ path }: { path: string[] }) {
  const feature = proFeatures[path[0]];
  const demoHref = `${DEMO_URL}/${path.join("/")}`;
  return (
    <>
      <PageHeader
        eyebrow="GARAGEX PRO"
        title={feature.title}
        description={feature.description}
        actions={
          <>
            <a className="btn" href={demoHref}>
              Open in live demo <ArrowUpRight size={15} />
            </a>
            <a className="btn btn-primary" href={PRO_URL}>
              Get GarageX Pro
            </a>
          </>
        }
      />
      <Card className="pro-feature">
        <ul className="pro-highlights">
          {feature.highlights.map((h) => (
            <li key={h}>
              <Check size={15} /> {h}
            </li>
          ))}
        </ul>
        <a href={demoHref} className="pro-preview" aria-label="Open in live demo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={feature.image} alt={`${feature.title} in GarageX Pro`} />
        </a>
        <p className="muted small">
          This screen is part of GarageX Pro. GarageX Lite includes the
          dashboard, customer directory and app shell.{" "}
          <Link href="/dashboard">Back to dashboard</Link>
        </p>
      </Card>
    </>
  );
}
