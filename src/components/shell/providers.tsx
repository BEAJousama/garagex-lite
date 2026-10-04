"use client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { GarageProvider } from "@/hooks/use-garage";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="garagex-theme"
      disableTransitionOnChange
    >
      <GarageProvider>
        {children}
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{ style: { fontSize: 13.5, borderRadius: 10 } }}
        />
      </GarageProvider>
    </ThemeProvider>
  );
}
