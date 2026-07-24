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
                Madrid's first boutique Human Health &amp; Performance Lab
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
          <div className="border border-border bg-card">
            <HandDrawnMap />
          </div>
          <p className="border-t border-border pt-4 text-sm text-foreground/85">
            Monday–Friday: 7am–8pm <span className="mx-2 text-muted">/</span> Saturday–Sunday: 9am–6pm
          </p>
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
