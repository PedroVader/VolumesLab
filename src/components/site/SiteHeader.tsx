import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { memberships, assessments, testGroups, getTests } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { CategoryIcon, HandArrow, type CategoryKey } from "./illustrations";

type MenuKey = "memberships" | "assessments" | "tests" | "about" | null;

type MenuItem = { to: string; name: string; sub?: string };

const aboutItems: MenuItem[] = [
  { to: "/about", name: "What We Do", sub: "The integrated Volumes Lab model" },
  { to: "/about/team", name: "Team", sub: "Medical and performance experts" },
  { to: "/about/lab", name: "The Lab", sub: "Testing, medicine and training in one place" },
  { to: "/about/location", name: "Location", sub: "Churruca 5, Justicia, Madrid" },
  { to: "/faq", name: "FAQ", sub: "Practical and program questions" },
];

export function SiteHeader() {
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="relative z-50 border-b border-border bg-background/95 backdrop-blur-md"
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link to="/" onClick={closeMobile} className="flex items-center gap-2.5 leading-none">
            <img src="/volumes-icon.png" alt="" className="h-8 w-8" />
            <span className="font-brand text-[15px] font-semibold uppercase tracking-normal">
              Volumes Lab
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-x-5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground lg:flex">
            <MenuTrigger label="Memberships" icon="membership" active={open === "memberships"} onOpen={() => setOpen("memberships")} />
            <MenuTrigger label="Assessments" icon="assessment" active={open === "assessments"} onOpen={() => setOpen("assessments")} />
            <MenuTrigger label="Individual Tests" icon="test" active={open === "tests"} onOpen={() => setOpen("tests")} />
            <Link
              to="/training"
              onMouseEnter={() => setOpen(null)}
              className="py-2 text-foreground/80 transition-colors hover:text-primary"
            >
              Training
            </Link>
            <MenuTrigger label="About" active={open === "about"} onOpen={() => setOpen("about")} />
            <button
              onClick={() => setCartOpen(true)}
              onMouseEnter={() => setOpen(null)}
              className="relative border border-border px-3 py-2 tracking-widest hover:border-foreground"
            >
              Cart{count > 0 && <span className="ml-2 text-primary">[{count}]</span>}
            </button>
            <Link
              to="/book"
              onMouseEnter={() => setOpen(null)}
              className="group inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-[12px] tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
            >
              Book Now
              <HandArrow className="h-3.5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="border border-border px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "Close −" : "Menu +"}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="border-t border-border px-4 py-8 lg:hidden">
            <div className="space-y-8">
              <MobileGroup
                label="Memberships"
                items={[
                  { to: "/memberships", name: "Compare Memberships" },
                  ...memberships.map((m) => ({ to: `/memberships/${m.slug}`, name: m.name })),
                ]}
                onNavigate={closeMobile}
              />
              <MobileGroup
                label="Assessments"
                items={[
                  { to: "/assessments", name: "Compare Assessments" },
                  ...assessments.map((a) => ({ to: `/assessments/${a.slug}`, name: a.name })),
                ]}
                onNavigate={closeMobile}
              />
              <MobileGroup
                label="Individual Tests"
                items={[
                  { to: "/tests", name: "All Individual Tests" },
                  ...getTests(testGroups.flatMap((g) => g.testSlugs)).map((t) => ({
                    to: `/tests/${t.slug}`,
                    name: t.name,
                  })),
                ]}
                onNavigate={closeMobile}
              />
              <MobileGroup label="Training" items={[{ to: "/training", name: "Personal Training" }]} onNavigate={closeMobile} />
              <MobileGroup label="About" items={aboutItems} onNavigate={closeMobile} />
            </div>
            <div className="mt-10 flex gap-3 font-mono text-[11px] font-bold uppercase tracking-widest">
              <button
                onClick={() => {
                  closeMobile();
                  setCartOpen(true);
                }}
                className="flex-1 border border-border px-3 py-3"
              >
                Cart{count > 0 && <span className="ml-2">[{count}]</span>}
              </button>
              <Link
                to="/book"
                onClick={closeMobile}
                className="flex-1 bg-primary px-4 py-3 text-center text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}

        {/* Desktop mega menu */}
        {open && (
          <div className="absolute left-0 top-full hidden w-full border-b border-border bg-background shadow-lg lg:block">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-10 md:grid-cols-3">
              {open === "memberships" && (
                <MenuColumn
                  label="Memberships"
                  items={[
                    { to: "/memberships", name: "Compare Memberships", sub: "See both programs side by side" },
                    ...memberships.map((m) => ({ to: `/memberships/${m.slug}`, name: m.name, sub: m.shortDescription })),
                  ]}
                />
              )}
              {open === "assessments" && (
                <MenuColumn
                  label="Complete Assessments"
                  items={[
                    { to: "/assessments", name: "Compare Assessments", sub: "All three, side by side" },
                    ...assessments.map((a) => ({ to: `/assessments/${a.slug}`, name: a.name, sub: a.shortDescription })),
                  ]}
                />
              )}
              {open === "tests" &&
                testGroups.map((group) => (
                  <MenuColumn
                    key={group.key}
                    label={group.label}
                    items={getTests(group.testSlugs).map((t) => ({ to: `/tests/${t.slug}`, name: t.name }))}
                  />
                ))}
              {open === "about" && <MenuColumn label="About" items={aboutItems} />}
            </div>
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}

function MenuTrigger({
  label,
  icon,
  active,
  onOpen,
}: {
  label: string;
  icon?: CategoryKey;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onMouseEnter={onOpen}
      onFocus={onOpen}
      className={`inline-flex items-center gap-2 py-2 transition-colors ${
        active ? "text-primary" : "text-foreground/80 hover:text-primary"
      }`}
    >
      {icon && <CategoryIcon k={icon} className="h-4 w-4 shrink-0" />}
      {label}
    </button>
  );
}

function MenuColumn({ label, items }: { label: string; items: MenuItem[] }) {
  return (
    <div>
      <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-primary">{label}</p>
      <ul className="space-y-4">
        {items.map((i) => (
          <li key={i.to + i.name}>
            <Link to={i.to} className="group block">
              <p className="font-display text-lg font-bold uppercase transition-colors group-hover:text-primary">
                {i.name}
              </p>
              {i.sub && <p className="mt-1 text-xs text-muted">{i.sub}</p>}
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
  items: MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{label}</p>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.to + i.name}>
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
