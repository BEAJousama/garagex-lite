import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shell/providers";
import { AppShell } from "@/components/shell/app-shell";
export const metadata: Metadata = {
  title: { default: "GarageX Lite — Workshop Management", template: "%s · GarageX" },
  description:
    "A free Next.js auto repair and workshop dashboard by GarageX.",
  // Workshop workspaces stay out of search engines. Set GARAGEX_ALLOW_INDEXING=true
  // only for a public demo you want indexed.
  robots:
    process.env.GARAGEX_ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
