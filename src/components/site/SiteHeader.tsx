// Header per the client's homepage architecture (07/08/2026).
//
// The homepage is the whole funnel, so the section links are anchors into it
// rather than separate index pages. The only outbound link is "Book Services",
// which goes straight to the Momence landing page — there is nothing
// transactional left on this site.

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BOOKING_HOME } from "@/lib/momence";
import { track } from "@/lib/analytics";
import { PAGES } from "@/data/site";
import { sectionLabel, visibleSections } from "@/lib/sections";

type NavItem = { label: string; hash?: string; to?: string };

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  // Built per render: the CMS can switch pages and sections off, rename and
  // reorder the sections between requests.
  const navItems: NavItem[] = [
    ...visibleSections().map((s) => ({ label: sectionLabel(s.key), hash: s.key })),
    // Team hidden temporarily (client request, 24/08) until people and photos exist.
    ...(PAGES.lab ? [{ label: "The Lab", to: "/about/lab" }] : []),
  ];

  return (
    <nav className="relative z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link to="/" onClick={closeMobile} className="flex items-center gap-2.5 leading-none">
          <img src="/volumes-icon.png" alt="" className="h-8 w-8" />
          <span className="font-brand text-[15px] font-semibold uppercase tracking-normal">Volumes Lab</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-x-5 font-mono text-[11px] font-bold uppercase tracking-widest lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          <BookServicesButton />
        </div>

        {/* Mobile burger */}
        <button
          className="border border-border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close −" : "Menu +"}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-border px-4 py-8 lg:hidden">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink item={item} onNavigate={closeMobile} mobile />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <BookServicesButton onNavigate={closeMobile} className="w-full justify-center" />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  item,
  onNavigate,
  mobile = false,
}: {
  item: NavItem;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const className = mobile
    ? "block py-2 font-display text-2xl font-bold uppercase tracking-tight"
    : "py-2 text-foreground/80 transition-colors hover:text-primary";

  return (
    <Link
      to={item.to ?? "/"}
      hash={item.hash}
      onClick={onNavigate}
      className={className}
    >
      {item.label}
    </Link>
  );
}

/**
 * The site's single global conversion CTA. Opens the Momence booking page.
 */
function BookServicesButton({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_HOME}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        track("book_cta_click", { product: "all", destination: "momence", source_page: "header" });
        onNavigate?.();
      }}
      className={`group inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong ${className}`}
    >
      Book Services
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
