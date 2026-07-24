import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { memberships, assessments, tests } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";

type MenuKey = "memberships" | "assessments" | "tests" | null;

export function SiteHeader() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <nav
      className="relative z-50 border-b border-border bg-background/95 backdrop-blur-md"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 leading-none"
        >
          <img src="/volumes-icon.png" alt="" className="h-8 w-8" />
          <span className="font-mono text-[13px] font-bold uppercase tracking-widest">
            Volumes Lab
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-x-6 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground md:flex">
          <MenuTrigger label="Memberships" active={open === "memberships"} onOpen={() => setOpen("memberships")} />
          <MenuTrigger label="Assessments" active={open === "assessments"} onOpen={() => setOpen("assessments")} />
          <MenuTrigger label="Tests" active={open === "tests"} onOpen={() => setOpen("tests")} />
          <button
            onClick={() => setCartOpen(true)}
            className="relative border border-border px-3 py-2 tracking-widest hover:border-foreground"
          >
            Cart{count > 0 && <span className="ml-2 text-foreground">[{count}]</span>}
          </button>
          <Link
            to="/book"
            className="bg-foreground px-4 py-2 tracking-widest text-primary-foreground hover:opacity-80"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="border border-border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "Close −" : "Menu +"}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-border px-4 py-8 md:hidden">
          <div className="space-y-8">
            <MobileGroup
              label="Memberships"
              items={memberships.map((m) => ({ to: `/memberships/${m.slug}`, name: m.name }))}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileGroup
              label="Assessments"
              items={assessments.map((a) => ({ to: `/assessments/${a.slug}`, name: a.name }))}
              onNavigate={() => setMobileOpen(false)}
            />
            <MobileGroup
              label="Tests"
              items={tests.map((t) => ({ to: `/tests/${t.slug}`, name: t.name }))}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
          <div className="mt-10 flex gap-3 font-mono text-[11px] font-bold uppercase tracking-widest">
            <button
              onClick={() => {
                setMobileOpen(false);
                setCartOpen(true);
              }}
              className="flex-1 border border-border px-3 py-3"
            >
              Cart{count > 0 && <span className="ml-2">[{count}]</span>}
            </button>
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="flex-1 bg-foreground px-4 py-3 text-center text-primary-foreground"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}

      {/* Desktop mega menu */}
      {open && (
        <div className="absolute left-0 top-full hidden w-full border-b border-border bg-background shadow-lg md:block">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-10 md:grid-cols-3">
            {open === "memberships" && (
              <MenuColumn label="Memberships" items={memberships.map((m) => ({ to: `/memberships/${m.slug}`, name: m.name, sub: m.tagline }))} />
            )}
            {open === "assessments" && (
              <MenuColumn label="Complete Assessments" items={assessments.map((a) => ({ to: `/assessments/${a.slug}`, name: a.name, sub: a.tagline }))} />
            )}
            {open === "tests" && (
              <>
                <MenuColumn label="Individual Tests" items={tests.slice(0, 4).map((t) => ({ to: `/tests/${t.slug}`, name: t.name, sub: t.tagline }))} />
                <MenuColumn label=" " items={tests.slice(4).map((t) => ({ to: `/tests/${t.slug}`, name: t.name, sub: t.tagline }))} />
              </>
            )}
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </nav>
  );
}

function MenuTrigger({ label, active, onOpen }: { label: string; active: boolean; onOpen: () => void }) {
  return (
    <button
      onMouseEnter={onOpen}
      onFocus={onOpen}
      className={`py-2 transition-opacity ${active ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
    >
      {label}
    </button>
  );
}

function MenuColumn({
  label,
  items,
}: {
  label: string;
  items: { to: string; name: string; sub: string }[];
}) {
  return (
    <div>
      <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-foreground">{label}</p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="group block">
              <p className="font-display text-lg font-bold uppercase group-hover:opacity-70">{i.name}</p>
              <p className="mt-1 text-xs text-muted">{i.sub}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: { to: string; name: string }[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              onClick={onNavigate}
              className="block py-1 font-display text-xl font-bold uppercase tracking-tight"
            >
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
