// Shared conversion blocks for Volumes Lab pages.
// All follow the site design system: hairline borders, mono eyebrows,
// condensed uppercase display type, cream/ink palette.

import { Link } from "@tanstack/react-router";
import type { SampleMetric } from "@/data/productContent";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">
      [ {children} ]
    </p>
  );
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance md:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

/* ---------------- TrustStrip: 4 micro-credentials ---------------- */

export function TrustStrip({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-2 border border-border md:grid-cols-4">
      {items.map((t, i) => (
        <li
          key={i}
          className="flex items-center gap-3 border-border px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted [&:not(:last-child)]:border-r max-md:[&:nth-child(-n+2)]:border-b max-md:[&:nth-child(2)]:border-r-0"
        >
          <span aria-hidden className="text-foreground">✓</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Testimonials ---------------- */

export function TestimonialBand({ items }: { items: { quote: string; name: string; detail: string }[] }) {
  const doubled = [...items, ...items];
  return (
    <section className="overflow-hidden border-y border-border py-10" aria-label="Testimonials">
      <div className="animate-marquee flex w-max gap-16 px-8">
        {doubled.map((t, i) => (
          <figure key={i} className="w-[22rem] shrink-0">
            <blockquote className="text-base leading-relaxed text-foreground/85">“{t.quote}”</blockquote>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted">
              {t.name}, {t.detail}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function TestimonialCard({ quote, name, detail }: { quote: string; name: string; detail: string }) {
  return (
    <figure className="border border-border p-8">
      <p aria-hidden className="font-display text-5xl font-extrabold leading-none text-foreground/20">”</p>
      <blockquote className="mt-2 text-lg leading-relaxed text-foreground/85">“{quote}”</blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-widest text-muted">
        {name}, {detail}
      </figcaption>
    </figure>
  );
}

/* ---------------- Visit experience steps ---------------- */

export function VisitSteps({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="grid gap-10 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={i} className="border-t border-border pt-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">{s.title}</h3>
          <p className="mt-4 text-base leading-relaxed text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Sample report ---------------- */

function PercentileBar({ percentile }: { percentile: number }) {
  return (
    <div className="relative h-1 w-full bg-foreground/10">
      <div className="absolute inset-y-0 left-0 bg-foreground" style={{ width: `${Math.min(100, Math.max(0, percentile))}%` }} />
    </div>
  );
}

export function SampleReport({
  title,
  metrics,
  footnote,
}: {
  title: string;
  metrics: SampleMetric[];
  footnote: string;
}) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-foreground">[ Sample report ]</p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{title}</p>
      </div>
      <ul className="divide-y divide-border">
        {metrics.map((m, i) => (
          <li key={i} className="grid grid-cols-12 items-center gap-4 px-6 py-4">
            <div className="col-span-6 md:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                {m.label}
                {m.note ? ` · ${m.note}` : ""}
              </p>
              <p className="mt-1 font-display text-xl font-bold">{m.value}</p>
            </div>
            <div className="col-span-5 md:col-span-6">
              <PercentileBar percentile={m.percentile} />
            </div>
            <p className="col-span-1 text-right font-mono text-[10px] text-muted">P{m.percentile}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-6 py-4 text-xs leading-relaxed text-muted">{footnote}</p>
    </div>
  );
}

/* ---------------- FAQ accordion (matches /faq style) ---------------- */

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((f, i) => (
        <li key={i}>
          <details className="group py-6">
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-8">
              <span className="font-display text-xl font-bold group-hover:opacity-70">{f.q}</span>
              <span className="shrink-0 font-mono text-xs uppercase text-muted group-open:hidden">Open +</span>
              <span className="hidden shrink-0 font-mono text-xs uppercase text-foreground group-open:inline">Close −</span>
            </summary>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Outcomes (what you walk away with) ---------------- */

export function OutcomeList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-0 divide-y divide-border border-y border-border">
      {items.map((o, i) => (
        <li key={i} className="flex gap-6 py-6">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-lg leading-relaxed text-foreground/85">{o}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Sticky mobile book bar ---------------- */

export function StickyBookBar({ price, duration, onAdd, ctaLabel }: { price: number; duration?: string; onAdd: () => void; ctaLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="leading-tight">
        <p className="font-display text-xl font-bold">€{price}</p>
        {duration && <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{duration}</p>}
      </div>
      <button
        onClick={onAdd}
        className="flex-1 bg-foreground py-3 text-center font-mono text-[11px] uppercase tracking-widest text-primary-foreground"
      >
        {ctaLabel}
      </button>
    </div>
  );
}

/* ---------------- Prep checklist ---------------- */

export function PrepList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((p, i) => (
        <li key={i} className="flex gap-3 text-base text-muted">
          <span aria-hidden className="mt-0.5 font-mono text-[10px] text-foreground">· </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Related products ---------------- */

export function RelatedProducts({
  items,
}: {
  items: { slug: string; name: string; tagline: string; price: number; path: string }[];
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((p) => (
        <li key={p.slug}>
          <Link to={p.path} className="group flex h-full flex-col border border-border p-6 transition-colors hover:border-foreground">
            <h3 className="font-display text-xl font-bold uppercase leading-tight group-hover:opacity-70">{p.name}</h3>
            <p className="mt-3 flex-1 text-sm text-muted">{p.tagline}</p>
            <p className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
              <span className="font-display text-lg font-bold">€{p.price}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-foreground">
                View →
              </span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
