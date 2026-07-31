import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Cart, Volumes Lab Madrid" },
      { name: "description", content: "Your selected Volumes Lab services." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CartPage() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Cart</Eyebrow>
          <SectionTitle className="mt-6">Your selected services</SectionTitle>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
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
                        className="font-mono text-[10px] uppercase text-muted hover:text-primary hover:underline"
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
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/book/checkout"
                  className="flex-1 bg-primary py-4 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-strong hover:shadow-md"
                >
                  Checkout
                </Link>
                <Link
                  to="/book"
                  className="border border-border px-6 py-4 text-center font-mono text-xs uppercase tracking-widest hover:border-foreground"
                >
                  Back to Book Now
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </SiteChrome>
  );
}
