// Reusable card + CTA components for the Volumes Lab site (brief section 3.2).
// One implementation reused across the homepage, landings and Book Now so names,
// prices and CTAs stay consistent with the catalogue (single source of truth).

import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/catalog";
import { productPath } from "@/data/catalog";
import { cn } from "@/lib/utils";

/* ---------------- CTAs ---------------- */

export function PrimaryLink({
  to,
  params,
  search,
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      search={search}
      className={cn(
        "inline-flex w-fit items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-md",
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
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      className={cn(
        "inline-flex w-fit items-center border border-foreground px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-150 hover:-translate-y-0.5 hover:bg-foreground hover:text-primary-foreground hover:shadow-md",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function IncludedBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">[ {children} ]</p>
  );
}

/* ---------------- Service choice card (homepage "choose how to start") ---------------- */

export function ServiceChoiceCard({
  title,
  body,
  ctaLabel,
  to,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  to: string;
}) {
  return (
    <Link to={to} className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary">
      <h3 className="font-display text-xl font-extrabold uppercase tracking-tight group-hover:text-primary">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <span className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-muted group-hover:text-primary">
        {ctaLabel} →
      </span>
    </Link>
  );
}

/* ---------------- Membership card ---------------- */

export function MembershipCard({ m }: { m: Product }) {
  return (
    <article className="flex flex-col border border-border bg-card p-8">
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{m.membership?.goal}</p>
      <h3 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight">{m.name}</h3>
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
      <PrimaryLink to="/memberships/$slug" params={{ slug: m.slug }} className="mt-6">
        {m.ctaLabel ?? "Explore Membership"}
      </PrimaryLink>
    </article>
  );
}

/* ---------------- Product card (assessments / tests / training) ---------------- */

export function ProductCard({ p }: { p: Product }) {
  const detail = productPath(p);
  return (
    <article className="flex flex-col border border-border bg-card p-6">
      <h3 className="font-display text-xl font-bold uppercase leading-tight">{p.name}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{p.shortDescription ?? p.tagline}</p>
      {p.badges?.map((b) => (
        <div key={b} className="mt-4">
          <IncludedBadge>{b}</IncludedBadge>
        </div>
      ))}
      <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-display text-lg font-bold">€{p.price}</span>
        {p.duration && <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{p.duration}</span>}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <PrimaryLink to="/book" search={{ add: p.slug }} className="px-5 py-2.5">
          Book
        </PrimaryLink>
        <Link to={detail} className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-primary">
          View details →
        </Link>
      </div>
    </article>
  );
}
