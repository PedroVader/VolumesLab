import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  giftCard: boolean;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (slug: string, giftCard: boolean) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.slug === item.slug && i.giftCard === item.giftCard);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i === existing ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, qty: 1 }] };
        }),
      remove: (slug, giftCard) =>
        set((s) => ({ items: s.items.filter((i) => !(i.slug === slug && i.giftCard === giftCard)) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      total: () => get().items.reduce((n, i) => n + i.qty * i.price, 0),
    }),
    { name: "volumes-cart" },
  ),
);
