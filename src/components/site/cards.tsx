// Reusable card + CTA components for the Volumes Lab site.
//
// The rule, from the client's homepage architecture (07/08/2026):
//   · Book / Purchase / Enquire  → leaves the site, goes into Momence
//   · More info                  → stays inside the Volumes CMS
// Every card below is built from that pair, so the funnel behaves identically
// on the homepage and on the SKU landing pages.

import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/catalog";
import { getTests, productPath } from "@/data/catalog";
import { bookingHref, bookingLabel, trackBooking } from "@/lib/booking";
import { BOOKING_HOME } from "@/lib/momence";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/* ---------------- Internal CTAs (navigation inside the CMS) ---------------- */

export function PrimaryLink({
  to,
  params,
  hash,
  children,
  className = "",
  onClick,
}: {
  to: string;
  params?: Record<string, string>;
  hash?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      params={params}
      hash={hash}
      onClick={onClick}
      className={cn(
        "inline-flex w-fit items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  to,
  params,
  hash,
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  hash?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      hash={hash}
      className={cn(
        "inline-flex w-fit items-center border border-foreground px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-primary-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/* ---------------- Transactional CTA (leaves for Momence) ---------------- */

/**
 * The one component that sends a visitor into Momence. A real anchor, so
 * middle-click and "open in new tab" behave normally; analytics fire alongside.
 */
export function BookCta({
  product,
  sourcePage,
  className = "",
  label,
}: {
  product: Product;
  sourcePage: string;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={bookingHref(product)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackBooking(product, sourcePage)}
      className={cn(
        "inline-flex w-fit items-center justify-center bg-primary px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong",
        className,
      )}
    >
      {label ?? bookingLabel(product)}
    </a>
  );
}

/**
 * Generic outbound CTA into the Momence booking page, for places that promote
 * booking in general rather than one specific SKU.
 */
export function BookServicesLink({
  sourcePage,
  children = "Book Services",
  className = "",
}: {
  sourcePage: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={BOOKING_HOME}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("book_cta_click", { product: "all", destination: "momence", source_page: sourcePage })}
      className={cn(
        "inline-flex w-fit items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong",
        className,
      )}
    >
      {children}
    </a>
  );
}

/** "More info" — the CMS half of every card's CTA pair. */
export function MoreInfoLink({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      to={productPath(product)}
      onClick={() => track("more_info_click", { product: product.slug, product_category: product.category })}
      className={cn(
        "inline-flex w-fit items-center justify-center border border-border px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:border-foreground",
        className,
      )}
    >
      More info
    </Link>
  );
}

export function IncludedBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">[ {children} ]</p>
  );
}

/* ---------------- Price line ---------------- */

function PriceLine({ p }: { p: Product }) {
  return (
    <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
      <span className="font-display text-lg font-bold">
        €{p.price}
        {p.category === "membership" && <span className="ml-1 text-sm font-normal text-muted">/mo</span>}
      </span>
      {p.duration && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{p.duration}</span>
      )}
    </div>
  );
}

/* ---------------- Product card (tests / medical / training) ---------------- */

export function ProductCard({ p, sourcePage = "/" }: { p: Product; sourcePage?: string }) {
  return (
    <article className="flex flex-col border border-border bg-card p-6">
      <h3 className="font-display text-lg font-bold uppercase leading-tight">{p.name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.shortDescription ?? p.tagline}</p>
      {p.badges?.map((b) => (
        <div key={b} className="mt-4">
          <IncludedBadge>{b}</IncludedBadge>
        </div>
      ))}
      <PriceLine p={p} />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <BookCta product={p} sourcePage={sourcePage} />
        <MoreInfoLink product={p} />
      </div>
    </article>
  );
}

/* ---------------- Assessment card (shows the tests it contains) ---------------- */

export function AssessmentCard({ a, sourcePage = "/" }: { a: Product; sourcePage?: string }) {
  const included = getTests(a.includedTests ?? []);
  return (
    <article className="flex flex-col border border-border bg-card p-6">
      <h3 className="font-display text-xl font-extrabold uppercase leading-tight">{a.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{a.shortDescription ?? a.tagline}</p>
      {a.badges?.map((b) => (
        <div key={b} className="mt-4">
          <IncludedBadge>{b}</IncludedBadge>
        </div>
      ))}

      {/* The tests inside this assessment, as the architecture diagram shows */}
      <ul className="mt-6 grid flex-1 grid-cols-2 gap-2">
        {included.map((t) => (
          <li key={t.slug}>
            <Link
              to="/tests/$slug"
              params={{ slug: t.slug }}
              className="flex h-full items-center border border-border px-3 py-3 font-mono text-[9px] font-bold uppercase leading-snug tracking-widest text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>

      <PriceLine p={a} />
      <div className="mt-4 grid grid-cols-2 gap-2">
        <BookCta product={a} sourcePage={sourcePage} label="Book" />
        <MoreInfoLink product={a} />
      </div>
    </article>
  );
}

/* ---------------- Membership card (Enquire, never Book) ---------------- */

export function MembershipCard({ m, sourcePage = "/" }: { m: Product; sourcePage?: string }) {
  return (
    <article className="flex flex-col border border-border bg-card p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{m.membership?.goal}</p>
      <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">{m.name}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted">{m.shortDescription ?? m.tagline}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-foreground/85">
        {m.measures.slice(0, 6).map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="text-primary">✓</span>
            {item}
          </li>
        ))}
      </ul>
      {m.membership?.commitment && (
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">{m.membership.commitment}</p>
      )}
      <div className="mt-6 flex flex-wrap gap-2">
        <BookCta product={m} sourcePage={sourcePage} label="Enquire" className="px-6 py-3" />
        <MoreInfoLink product={m} className="px-6 py-3" />
      </div>
    </article>
  );
}

/* ---------------- Service choice card (still pure navigation) ---------------- */

export function ServiceChoiceCard({
  title,
  body,
  ctaLabel,
  to,
  hash,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  to: string;
  hash?: string;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      onClick={() => track("service_card_click", { service: title, source_section: "choose-how-to-start" })}
      className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight group-hover:text-primary">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <span className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-muted group-hover:text-primary">
        {ctaLabel} →
      </span>
    </Link>
  );
}
