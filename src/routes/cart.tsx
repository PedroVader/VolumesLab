import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { toast } from "sonner";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { useCart } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Cart, Volumes Lab Madrid" },
      { name: "description", content: "Review your selected Volumes Lab services and check out." },
      { name: "robots", content: "noindex" },
    ],
    links: [canonical("/cart")],
  }),
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  const checkout = () => {
    track("booking_started", { value: total, item_count: items.length, source_page: "/cart" });
    // Payment/booking is handled by Momence once wired. Until then this records
    // the request and confirms manually within 24h.
    track("booking_completed", { value: total, item_count: items.length });
    toast.success("Request received. Our team will confirm your booking within 24 hours.");
    clear();
  };

  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Cart</Eyebrow>
          <SectionTitle as="h1" className="mt-6">Your cart</SectionTitle>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {items.length === 0 ? (
            <div className="border border-border p-12 text-center">
              <p className="text-lg text-muted">Your cart is empty.</p>
              <Link
                to="/book"
                className="mt-6 inline-flex items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((i) => (
                  <li key={i.slug + i.giftCard} className="flex items-center justify-between gap-4 py-5">
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold leading-tight">{i.name}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                        {i.giftCard ? "Gift card" : "Booking"} · Qty {i.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-lg font-bold">€{i.price * i.qty}</span>
                      <button
                        onClick={() => remove(i.slug, i.giftCard)}
                        aria-label={`Remove ${i.name}`}
                        className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-baseline justify-between border-b border-border pb-6">
                <span className="font-mono text-xs uppercase tracking-widest">Total</span>
                <span className="font-display text-4xl font-extrabold">€{total}</span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={checkout}
                  className="flex-1 bg-primary py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
                >
                  Continue to checkout · €{total}
                </button>
                <Link
                  to="/book"
                  className="border border-border px-6 py-4 text-center font-mono text-xs uppercase tracking-widest hover:border-foreground"
                >
                  Keep browsing
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-muted">
                <li>✓ No payment taken yet</li>
                <li>✓ Confirmed personally within 24h</li>
                <li>✓ Free reschedule up to 48h before</li>
              </ul>
            </>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}
