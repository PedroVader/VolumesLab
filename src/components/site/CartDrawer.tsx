import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <p className="font-mono text-xs uppercase tracking-widest">Your cart</p>
          <button onClick={() => onOpenChange(false)} className="font-mono text-xs">
            Close ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.slug + i.giftCard} className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <p className="font-display font-bold">{i.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {i.giftCard ? "Gift card" : "Booking"} · Qty {i.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">€{i.price * i.qty}</p>
                    <button
                      onClick={() => remove(i.slug, i.giftCard)}
                      className="mt-1 font-mono text-[10px] uppercase text-primary hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest">Total</span>
            <span className="font-display text-2xl font-bold">€{total}</span>
          </div>
          <Link
            to="/book/checkout"
            onClick={() => onOpenChange(false)}
            className="block bg-foreground py-3 text-center font-mono text-xs uppercase tracking-widest text-white hover:bg-primary"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
