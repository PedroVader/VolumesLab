import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { BookBand } from "@/components/site/BookBand";
import {
  Eyebrow,
  SectionTitle,
  TestimonialBand,
  FaqList,
} from "@/components/site/blocks";
import { testimonials } from "@/data/productContent";
import { memberships, assessments, tests, packages, type Product } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  component: BookIndex,
  head: () => ({
    meta: [
      { title: "Book Appointment, Volumes Lab Madrid" },
      { name: "description", content: "Book memberships, complete assessments, individual tests and packages at Volumes Lab, Calle Churruca 5, Madrid." },
      { property: "og:title", content: "Book Appointment, Volumes Lab Madrid" },
      { property: "og:description", content: "Add memberships, assessments, tests and packages to your cart." },
    ],
  }),
});

const POPULAR = new Set(["foundations", "vo2max", "health-performance"]);

const bookFaqs = [
  {
    q: "What happens after I book?",
    a: "Our team confirms your appointment personally by email within 24 hours, with full preparation instructions for your test.",
  },
  {
    q: "Can I change my appointment?",
    a: "Yes, cancel or reschedule free of charge up to 48 hours before. Within 48 hours, a 50% fee applies.",
  },
  {
    q: "How do gift cards work?",
    a: "Every test, assessment and package can be purchased as a gift card. We email you a redeemable code, and the recipient books whenever suits them.",
  },
];

function BookIndex() {
  return (
    <SiteChrome>
      {/* ---------- HERO ---------- */}
      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Book appointment</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
            Book Now.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Every item can be booked for yourself or purchased as a gift card. Your cart is saved
            automatically, and our team confirms every booking personally within 24 hours.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            <li>✓ Free reschedule up to 48h before</li>
            <li>✓ Physician-led lab in Chamberí</li>
            <li>✓ Reports reviewed in person</li>
          </ul>
        </div>
      </section>

      {/* ---------- START HERE ---------- */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Start here</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Not sure where to begin? Three doors in.</SectionTitle>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link
              to="/assessments/$slug"
              params={{ slug: "foundations" }}
              className="group flex flex-col border border-foreground p-8 transition-colors hover:bg-foreground hover:text-primary-foreground"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">Most popular</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
                The Foundational assessment
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed opacity-80">
                90 minutes, four pillars, body composition, strength, mobility, metabolism, and a
                clinical debrief with your action plan. The baseline everything else builds on.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest">€490, View →</p>
            </Link>
            <Link
              to="/contact"
              className="group flex flex-col border border-border p-8 transition-colors hover:border-foreground"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Talk to a human</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
                A free 15-minute call
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                Tell us what you're trying to change and we'll tell you honestly which test fits ·
                and which ones you don't need.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted group-hover:text-foreground">
                Contact us →
              </p>
            </Link>
            <a
              href="#gift-cards"
              className="group flex flex-col border border-border p-8 transition-colors hover:border-foreground"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">For someone else</p>
              <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight">
                Give data, not stuff
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                Every test, assessment and package is available as a gift card, from €40 grip tests
                to the full Longevity workup.
              </p>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted group-hover:text-foreground">
                Gift cards →
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- MEMBERSHIPS ---------- */}
      <CatalogSection title="Memberships" items={memberships} note="Billed monthly · Medical oversight included" />

      {/* ---------- ASSESSMENTS + COMPARISON ---------- */}
      <CatalogSection title="Complete Assessments" items={assessments} note="The full picture in a single visit" />
      <ComparisonTable />

      {/* ---------- TESTS ---------- */}
      <CatalogSection title="Individual Tests" items={tests} note="One number, measured properly" />

      {/* ---------- PACKAGES ---------- */}
      <CatalogSection title="Buy Packages" items={packages} note="Coached sessions & retest bundles" />

      {/* ---------- GIFT CARDS ---------- */}
      <section id="gift-cards" className="border-b border-border px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Gift cards</Eyebrow>
            <SectionTitle className="mt-6">The gift of knowing.</SectionTitle>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted">
              Most gifts get forgotten by February. A VO2max test, a body composition scan or a full
              assessment gets talked about for years. Choose "Gift card" on any product and we'll
              email you a code the recipient can redeem whenever suits them.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[11px] uppercase tracking-widest text-muted">
              <li>· Valid 12 months</li>
              <li>· Delivered by email, instantly</li>
              <li>· Recipient books their own date</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- SOCIAL PROOF ---------- */}
      <TestimonialBand items={testimonials} />

      {/* ---------- MINI FAQ ---------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Before you book</Eyebrow>
          <div className="mt-10">
            <FaqList items={bookFaqs} />
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted">
            More questions? <Link to="/faq" className="text-foreground underline underline-offset-4">Read the full FAQ →</Link>
          </p>
        </div>
      </section>

      <BookBand text="Book appointment" />
    </SiteChrome>
  );
}

/* ---------------- Comparison table for the 3 assessments ---------------- */

function ComparisonTable() {
  const rows: { label: string; values: React.ReactNode[] }[] = [
    { label: "Price", values: ["€490", "€890", "€1,190"] },
    { label: "Duration", values: ["90 min", "3 hours", "3.5 hours"] },
    {
      label: "Builds on",
      values: [
        "The baseline",
        "Foundational + VO2max & bone density",
        "Foundational + lactate, gait & force plates",
      ],
    },
    {
      label: "Best for",
      values: [
        "First visit, everyone",
        "Healthspan & prevention",
        "Athletes chasing numbers",
      ],
    },
  ];
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Compare</Eyebrow>
        <SectionTitle className="mt-6 max-w-3xl">Which assessment is yours?</SectionTitle>
        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-4 border-b border-border pb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Assessment</p>
              {assessments.map((a) => (
                <p key={a.slug} className="font-display text-xl font-extrabold uppercase tracking-tight">
                  {a.name}
                  {a.slug === "foundations" && (
                    <span className="ml-3 align-middle font-mono text-[9px] uppercase tracking-widest text-muted">
                      [ Most popular ]
                    </span>
                  )}
                </p>
              ))}
            </div>
            {rows.map((r) => (
              <div key={r.label} className="grid grid-cols-4 border-b border-border py-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{r.label}</p>
                {r.values.map((v, i) => (
                  <p key={i} className="pr-6 text-sm leading-relaxed text-foreground/85">{v}</p>
                ))}
              </div>
            ))}
            <div className="grid grid-cols-4 pt-6">
              <p />
              {assessments.map((a) => (
                <Link
                  key={a.slug}
                  to="/assessments/$slug"
                  params={{ slug: a.slug }}
                  className="font-mono text-[11px] uppercase tracking-widest text-foreground underline underline-offset-4 hover:opacity-70"
                >
                  View {a.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Catalog section + cards ---------------- */

function CatalogSection({ title, items, note }: { title: string; items: Product[]; note?: string }) {
  return (
    <section className="border-b border-border px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {items.length} {items.length === 1 ? "item" : "items"}
            {note ? `, ${note}` : ""}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function detailPath(p: Product): string {
  if (p.category === "membership") return `/memberships/${p.slug}`;
  if (p.category === "assessment") return `/assessments/${p.slug}`;
  if (p.category === "test") return `/tests/${p.slug}`;
  return "/book";
}

function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const popular = POPULAR.has(product.slug);
  return (
    <article
      className={`relative flex flex-col border bg-card p-6 transition-colors ${
        popular ? "border-foreground" : "border-border hover:border-foreground"
      }`}
    >
      {popular && (
        <p className="absolute -top-2.5 left-6 bg-background px-2 font-mono text-[9px] uppercase tracking-widest text-foreground">
          [ Most popular ]
        </p>
      )}
      <div className="flex-1">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">
          {product.categoryLabel}
        </p>
        <h3 className="font-display text-2xl font-bold leading-tight">{product.name}</h3>
        <p className="mt-3 text-sm text-muted">{product.tagline}</p>
      </div>
      <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-display text-2xl font-bold">€{product.price}</span>
        {product.duration && <span className="font-mono text-[10px] uppercase text-muted">{product.duration}</span>}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            add({ slug: product.slug, name: product.name, price: product.price, giftCard: false });
            toast.success(`${product.name} added to cart`);
          }}
          className="bg-foreground py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground hover:opacity-80"
        >
          Book · €{product.price}
        </button>
        {product.giftable ? (
          <button
            onClick={() => {
              add({ slug: product.slug, name: `${product.name} (Gift)`, price: product.price, giftCard: true });
              toast.success(`${product.name} gift card added`);
            }}
            className="border border-border py-2 font-mono text-[10px] uppercase tracking-widest hover:border-foreground"
          >
            Gift card
          </button>
        ) : (
          <Link
            to={detailPath(product)}
            className="border border-border py-2 text-center font-mono text-[10px] uppercase tracking-widest hover:border-foreground"
          >
            View details
          </Link>
        )}
      </div>
      {product.category !== "package" && (
        <Link
          to={detailPath(product)}
          className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-foreground"
        >
          What's included →
        </Link>
      )}
    </article>
  );
}
