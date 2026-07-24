import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HandDrawnMap } from "@/components/site/HandDrawnMap";
import { CategoryIcon, type CategoryKey } from "@/components/site/illustrations";
import { memberships, assessments, tests, type Product } from "@/data/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteChrome>
      {/* Intro */}
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <img
              src="/volumes-mark.png"
              alt="Volumes Lab"
              className="w-40 shrink-0 md:w-52"
            />
            <div>
              <h1 className="font-brand text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
                Madrid's{" "}
                <span className="relative inline-block whitespace-nowrap">
                  first boutique
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-full -mt-1 h-[0.35em] w-full text-primary"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="animate-draw"
                      d="M2 8 C 52 3 92 10 142 6 C 202 1 252 10 298 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>{" "}
                Human Health &amp; Performance Lab
              </h1>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted md:text-xs">
                <a
                  href="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground hover:decoration-foreground"
                >
                  Calle Churruca 5, Centro (28004)
                </a>
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
            <p>
              Volumes' medical and performance team measures VO2max, strength, mobility, metabolism
              and body composition, then turns the results into a clear, personalised plan.
            </p>
            <p>
              Our medical team can also prescribe and oversee clinical treatments, including GLP-1
              agonists and other peptide therapies.
            </p>
            <p>
              Our performance team helps clients improve strength, cardio, conditioning and mobility
              in our dedicated training area.
            </p>
          </div>
          <div className="mt-10">
            <Link
              to="/book"
              className="inline-flex items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl border border-border bg-card">
            <HandDrawnMap />
          </div>
          <OpeningHours />
        </div>
      </section>

      {/* What we offer */}
      <section className="border-t border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest">
            What we offer
          </h2>

          <div className="mt-10 grid gap-12 md:grid-cols-3">
            <OfferColumn title="Memberships" items={memberships} icon="membership" />
            <OfferColumn title="Assessments" items={assessments} icon="assessment" />
            <OfferColumn title="Tests" items={tests} icon="test" />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

function OpeningHours() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 Sun … 6 Sat
    const h = now.getHours() + now.getMinutes() / 60;
    const isWeekday = day >= 1 && day <= 5;
    setOpen(isWeekday ? h >= 7 && h < 20 : h >= 9 && h < 18);
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
          [ Opening hours ]
        </p>
        {open !== null && (
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest">
            <span
              className={`h-1.5 w-1.5 rounded-full ${open ? "animate-pulse bg-primary" : "bg-muted"}`}
            />
            <span className={open ? "text-foreground" : "text-muted"}>
              {open ? "Open now" : "Closed"}
            </span>
          </span>
        )}
      </div>
      <dl className="flex flex-wrap gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-widest">
        <div className="flex items-baseline gap-3">
          <dt className="text-muted">Mon–Fri</dt>
          <dd className="tabular-nums text-foreground">07:00 – 20:00</dd>
        </div>
        <div className="flex items-baseline gap-3">
          <dt className="text-muted">Sat–Sun</dt>
          <dd className="tabular-nums text-foreground">09:00 – 18:00</dd>
        </div>
      </dl>
    </div>
  );
}

function offerPath(p: Product): string {
  if (p.category === "membership") return `/memberships/${p.slug}`;
  if (p.category === "assessment") return `/assessments/${p.slug}`;
  return `/tests/${p.slug}`;
}

function OfferColumn({ title, items, icon }: { title: string; items: Product[]; icon: CategoryKey }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b-2 border-primary pb-4">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest">{title}</p>
        <CategoryIcon k={icon} className="h-8 w-8" />
      </div>
      <ul className="flex-1 divide-y divide-border">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              to={offerPath(p)}
              className="block py-3 text-base text-foreground/85 underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/book"
        className="mt-8 inline-flex w-fit items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
      >
        Book Now
      </Link>
    </div>
  );
}
