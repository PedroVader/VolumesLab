import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle, FaqList } from "@/components/site/blocks";
import { memberships, assessments, tests, training, productPath, type Product } from "@/data/catalog";
import { bookingTarget } from "@/lib/booking";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/book")({
  component: BookIndex,
  validateSearch: (search: Record<string, unknown>): { add?: string } => ({
    add: typeof search.add === "string" ? search.add : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Service, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Book a membership, complete assessment, individual test or personal training session at Volumes Lab, Calle Churruca 5, Madrid.",
      },
      { property: "og:title", content: "Book a Service, Volumes Lab Madrid" },
      { property: "og:description", content: "Choose a membership, assessment, test or training option." },
    ],
  }),
});

const trainingSessions = training.filter((t) => t.categoryLabel === "Training Session");
const trainingPackages = training.filter((t) => t.categoryLabel === "Training Package");

const bookFaqs = [
  {
    q: "What happens after I book?",
    a: "Our team confirms your appointment personally by email within 24 hours, with full preparation instructions.",
  },
  {
    q: "Can I change my appointment?",
    a: "Yes, cancel or reschedule free of charge up to 48 hours before. Within 48 hours a fee applies.",
  },
  {
    q: "How do gift cards work?",
    a: "Most tests, assessments and packages can be purchased as a gift card. We email a redeemable code and the recipient books whenever suits them.",
  },
];

function BookIndex() {
  const { add } = Route.useSearch();

  // Deep-link: /book?add=<slug> scrolls to and highlights the matching tile (brief 9.5).
  useEffect(() => {
    if (!add) return;
    const el = document.getElementById(`item-${add}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.setAttribute("data-highlight", "true");
    const t = setTimeout(() => el.removeAttribute("data-highlight"), 2000);
    return () => clearTimeout(t);
  }, [add]);

  return (
    <SiteChrome>
      {/* Direct landing state (brief 9.6) */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Book appointment</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">Book a Volumes Lab service</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Choose a membership, comprehensive assessment, individual test or personal training
            option. Not sure what fits? Compare memberships or assessments before booking.
          </p>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            <li>✓ Confirmed personally within 24h</li>
            <li>✓ Free reschedule up to 48h before</li>
            <li>✓ Physician-led lab in Madrid</li>
          </ul>
        </div>
      </section>

      <BookingCategory title="Memberships" items={memberships} note="Billed monthly · Medical oversight included" />
      <BookingCategory title="Complete Assessments" items={assessments} note="The full picture in a single visit" />
      <BookingCategory title="Individual Tests" items={tests} note="One number, measured properly" />
      <BookingCategory title="Training Sessions" items={trainingSessions} note="Book one private session" />
      <BookingCategory title="Training Packages" items={trainingPackages} note="Train regularly without a membership" />

      {/* Mini FAQ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Before you book</Eyebrow>
          <div className="mt-10">
            <FaqList items={bookFaqs} />
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted">
            More questions?{" "}
            <Link to="/faq" className="text-foreground underline underline-offset-4 hover:text-primary">
              Read the full FAQ →
            </Link>
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}

function BookingCategory({ title, items, note }: { title: string; items: Product[]; note?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="border-b border-border px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{title}</h2>
          {note && <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{note}</p>}
        </div>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <BookingTile key={p.slug} product={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function BookingTile({ product }: { product: Product }) {
  const addItem = useCart((s) => s.add);
  const giftAdded = useRef(false);

  const target = bookingTarget(product);
  const book = () => {
    if (target.kind === "momence") {
      window.open(target.href, "_blank", "noreferrer");
      return;
    }
    addItem({ slug: product.slug, name: product.name, price: product.price, giftCard: false });
    toast.success(`${product.name} added to cart`);
  };
  const addGift = () => {
    addItem({ slug: product.slug, name: `${product.name} (Gift)`, price: product.price, giftCard: true });
    toast.success(`${product.name} gift card added`);
    giftAdded.current = true;
  };

  return (
    <li
      id={`item-${product.slug}`}
      className="flex scroll-mt-28 flex-col border border-border bg-card p-6 transition-shadow data-[highlight]:border-primary data-[highlight]:shadow-[0_0_0_2px_var(--color-primary)]"
    >
      <div className="flex-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{product.categoryLabel}</p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{product.name}</h3>
        <p className="mt-3 text-sm text-muted">{product.shortDescription ?? product.tagline}</p>
        {product.badges?.map((b) => (
          <p key={b} className="mt-3 font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
            [ {b} ]
          </p>
        ))}
      </div>
      <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
        <span className="font-display text-2xl font-bold">
          €{product.price}
          {product.category === "membership" && <span className="ml-1 text-sm font-normal text-muted">/mo</span>}
        </span>
        {product.duration && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{product.duration}</span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={book}
          className="bg-primary py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary-strong"
        >
          {product.ctaLabel ?? "Book"}
        </button>
        {product.giftable ? (
          <button
            onClick={addGift}
            className="border border-border py-2.5 font-mono text-[10px] uppercase tracking-widest hover:border-foreground"
          >
            Gift card
          </button>
        ) : (
          <Link
            to={productPath(product)}
            className="border border-border py-2.5 text-center font-mono text-[10px] uppercase tracking-widest hover:border-foreground"
          >
            Details
          </Link>
        )}
      </div>
      <Link
        to={productPath(product)}
        className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted hover:text-primary"
      >
        Full details →
      </Link>
    </li>
  );
}
