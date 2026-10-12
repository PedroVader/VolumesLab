import type { ReactNode } from "react";
import { useMatches } from "@tanstack/react-router";
import { structuredData, serializeStructuredData, type SchemaData } from "@/lib/structured-data";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteChrome({ children }: { children: ReactNode }) {
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const schema =
    match?.status === "success" &&
    !matches.some(
      (item) => item.status !== "success" || ("globalNotFound" in item && item.globalNotFound),
    )
      ? structuredData(match.pathname, (match.loaderData ?? {}) as SchemaData)
      : null;
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* The warm ambient edge glow is gone with the orange accent: it existed
          only to cast that colour around the viewport. The margin lines below
          still carry the framing. */}
      {/* Vertical margin lines */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-4 z-40 w-px bg-border md:left-6"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-4 z-40 w-px bg-border md:right-6"
      />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(schema) }}
        />
      )}
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
