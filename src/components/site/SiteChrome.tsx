import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Vertical margin lines */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-4 z-40 w-px bg-border md:left-6" />
      <div aria-hidden className="pointer-events-none fixed inset-y-0 right-4 z-40 w-px bg-border md:right-6" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
