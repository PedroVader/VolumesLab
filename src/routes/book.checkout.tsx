import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow } from "@/components/site/blocks";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/book/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Checkout, Volumes Lab Madrid" },
      { name: "description", content: "Review your booking and complete your appointment at Volumes Lab." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const nextSteps = [
  { title: "You submit the request", body: "No payment is taken today. This simply reserves your preferred items." },
  { title: "We confirm within 24h", body: "Our team emails you personally to agree a date and answer any questions." },
  { title: "You arrive prepared", body: "We send exact preparation instructions for your tests, fasting, clothing, timing." },
];

function Checkout() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);
  const hasGift = items.some((i) => i.giftCard);

  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-6xl">Your cart.</h1>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {items.length === 0 ? (
            <div className="border border-border p-12 text-center">
              <p className="text-lg text-muted">Your cart is empty.</p>
              <p className="mt-2 text-sm text-muted">
                Not sure where to start? The Foundational assessment is our most popular first visit.
              </p>
              <Link
                to="/book"
                className="mt-6 inline-block bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:opacity-80"
              >
                Browse the catalog
              </Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((i) => (
                  <li key={i.slug + i.giftCard} className="flex items-center justify-between gap-6 py-6">
                    <div>
                      <p className="font-display text-xl font-bold">{i.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                        {i.giftCard ? "Gift card" : "Booking"} · Qty {i.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-display text-xl font-bold">€{i.price * i.qty}</span>
                      <button
                        onClick={() => remove(i.slug, i.giftCard)}
                        className="font-mono text-[10px] uppercase text-muted hover:text-foreground hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline justify-between border-b border-border pb-6">
                <span className="font-mono text-xs uppercase tracking-widest">Total</span>
                <span className="font-display text-4xl font-extrabold">€{total}</span>
              </div>

              {hasGift && (
                <div className="mt-8">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted" htmlFor="gift-note">
                    Gift message (optional)
                  </label>
                  <textarea
                    id="gift-note"
                    name="gift-note"
                    rows={3}
                    placeholder="We'll include this note with your gift card email."
                    className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-foreground focus:outline-none"
                  />
                </div>
              )}

              {/* What happens next */}
              <div className="mt-10 border border-border">
                <p className="border-b border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-foreground">
                  [ What happens next ]
                </p>
                <ol className="grid md:grid-cols-3">
                  {nextSteps.map((s, i) => (
                    <li key={i} className="border-border p-6 max-md:border-b md:[&:not(:last-child)]:border-r">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-3 font-display text-lg font-bold uppercase tracking-tight">{s.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Reassurance */}
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                <li>✓ No payment taken today</li>
                <li>✓ Free reschedule up to 48h before</li>
                <li>✓ Confirmed personally, never automated</li>
              </ul>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => {
                    toast.success("Booking request received. We'll email you within 24 hours.");
                    clear();
                  }}
                  className="flex-1 bg-foreground py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:opacity-80"
                >
                  Submit booking request · €{total}
                </button>
                <Link
                  to="/book"
                  className="border border-border px-6 py-4 text-center font-mono text-xs uppercase tracking-widest hover:border-foreground"
                >
                  Continue browsing
                </Link>
              </div>

              <p className="mt-6 text-center text-xs text-muted">
                Prefer to book with a human? Call{" "}
                <a href="tel:+34910000000" className="underline underline-offset-2 hover:text-foreground">
                  +34 910 000 000
                </a>{" "}
                or WhatsApp us.
              </p>
            </>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}
