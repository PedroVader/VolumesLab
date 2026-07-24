import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Warm ambient edge glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{
          boxShadow:
            "inset 0 0 4px hsl(9 74% 48% / 0.45), inset 0 0 80px hsl(9 74% 48% / 0.16), inset 0 0 160px hsl(9 74% 48% / 0.08)",
        }}
      />
      {/* Vertical margin lines */}
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-4 z-40 w-px bg-border md:left-6" />
      <div aria-hidden className="pointer-events-none fixed inset-y-0 right-4 z-40 w-px bg-border md:right-6" />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
