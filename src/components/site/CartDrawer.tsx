import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
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
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40"
        onClick={() => onOpenChange(false)}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <p className="font-mono text-xs uppercase tracking-widest">Your cart</p>
          <button
            onClick={() => onOpenChange(false)}
            className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground"
          >
            Close ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className="text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li
                  key={i.slug + i.giftCard}
                  className="flex items-start justify-between gap-3 border-b border-border pb-4"
                >
                  <div className="min-w-0">
                    <p className="font-display font-bold leading-tight">{i.name}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                      {i.giftCard ? "Gift card" : "Booking"} · Qty {i.qty}
                    </p>
                    <p className="mt-1 font-mono text-sm">€{i.price * i.qty}</p>
                  </div>
                  <button
                    onClick={() => remove(i.slug, i.giftCard)}
                    aria-label={`Remove ${i.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
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
            to="/cart"
            onClick={() => onOpenChange(false)}
            className={`block py-3 text-center font-mono text-xs uppercase tracking-widest transition-colors ${
              items.length === 0
                ? "pointer-events-none border border-border text-muted"
                : "bg-primary text-primary-foreground hover:bg-primary-strong"
            }`}
          >
            View cart & checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
