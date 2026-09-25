import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ADDRESS,
  BRANDING,
  COMPANY,
  CONTACT,
  MAP_LINK,
  PAGES,
  instagramHandle,
  instagramUrl,
} from "@/data/site";

// The footer is one line (client, 14/09/2026): the link columns (Services,
// About, Visit, Contact) are gone because the site is small enough to
// navigate from the top menu. Everything that must stay reachable from every
// page sits in the line, in the order the client wrote it:
//
//   FAQ // Blog // Team // Legal & Privacy // email // phone // Instagram //
//   registered name - tax ID // Nº Registro … // address (→ Google Maps)
//
// An item with no value (no phone yet, no registration number yet, a page
// switched off) simply does not appear. The company identity and the Legal
// link satisfy the LSSI: they are on every page, directly reachable.
//
// The line is a wrapping flex row, one cell per item: on a phone it breaks
// between items and never widens the page. (The first version was one <p> of
// adjacent nowrap spans with nothing breakable between them, which forced a
// 1000px-wide page on every phone, 17/09/2026.)

export function SiteFooter() {
  const items = footerItems();
  return (
    <footer className="border-t border-border px-page py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <img src={BRANDING.mark} alt="Volumes Lab" className="w-24 shrink-0 opacity-90" />
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted">
          {items.map((item, i) => (
            <span key={item.key} className="contents">
              {i > 0 && <span aria-hidden className="text-muted/60">//</span>}
              <span className="whitespace-nowrap">{item.node}</span>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

type FooterItem = { key: string; node: ReactNode };

/** The items of the line, in order, skipping whatever has no value today. */
function footerItems(): FooterItem[] {
  const items: FooterItem[] = [];
  // Every item looks the same, Legal & Privacy included (client, 17/09/2026:
  // no underline singling it out).
  const link = "hover:text-primary";

  if (PAGES.faq) items.push({ key: "faq", node: <Link to="/faq" className={link}>FAQ</Link> });
  if (PAGES.blog) items.push({ key: "blog", node: <Link to="/blog" className={link}>Blog</Link> });
  if (PAGES.team) items.push({ key: "team", node: <Link to="/about/team" className={link}>Team</Link> });
  if (PAGES.legal) {
    items.push({
      key: "legal",
      node: (
        <Link to="/legal" className={link}>
          Legal &amp; Privacy
        </Link>
      ),
    });
  }
  if (CONTACT.email) {
    items.push({
      key: "email",
      node: (
        <a href={`mailto:${CONTACT.email}`} className={link}>
          {CONTACT.email}
        </a>
      ),
    });
  }
  if (CONTACT.phone) {
    items.push({
      key: "phone",
      node: (
        <a href={CONTACT.phoneHref} className={link}>
          {CONTACT.phone}
        </a>
      ),
    });
  }
  const handle = instagramHandle();
  if (handle) {
    items.push({
      key: "instagram",
      node: (
        <>
          Instagram:{" "}
          <a href={instagramUrl()} target="_blank" rel="noreferrer" className={link}>
            {handle}
          </a>
        </>
      ),
    });
  }
  const identity = companyIdentity();
  if (identity) items.push({ key: "company", node: <span className="text-foreground/80">{identity}</span> });
  if (COMPANY.registrationNumber) {
    items.push({
      key: "registration",
      node: <span className="text-foreground/80">Nº Registro {COMPANY.registrationNumber}</span>,
    });
  }
  if (ADDRESS.short) {
    items.push({
      key: "address",
      node: (
        <a href={MAP_LINK} target="_blank" rel="noreferrer" className={link}>
          {ADDRESS.short}
        </a>
      ),
    });
  }
  return items;
}

/** "Volumes Vision S.L. - B26934380". The ID is not repeated if it was typed into the name. */
function companyIdentity(): string {
  const name = COMPANY.legalName || COMPANY.tradingName || "Volumes Lab";
  const id = COMPANY.taxId?.trim();
  return id && !name.includes(id) ? `${name} - ${id}` : name;
}
