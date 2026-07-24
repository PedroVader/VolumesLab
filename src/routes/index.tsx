import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { memberships, assessments, tests, type Product } from "@/data/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteChrome>
      {/* Intro */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-3xl font-mono text-2xl font-bold uppercase leading-tight tracking-wide md:text-4xl">
            Madrid's first boutique Human Health &amp; Performance Lab
          </h1>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted md:text-xs">
            <a
              href="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground hover:decoration-foreground"
            >
              Calle Churruca 5, Centro (28004)
            </a>
          </p>
          <div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/85">
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
              className="inline-flex items-center border border-foreground bg-foreground px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <iframe
            title="Volumes Lab, Calle Churruca 5, Madrid"
            src="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain&output=embed"
            className="h-[420px] w-full grayscale md:h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
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
            <OfferColumn title="Memberships" items={memberships} />
            <OfferColumn title="Assessments" items={assessments} />
            <OfferColumn title="Tests" items={tests} />
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

function OfferColumn({ title, items }: { title: string; items: Product[] }) {
  return (
    <div className="flex flex-col">
      <p className="border-b border-foreground pb-4 font-mono text-[11px] font-bold uppercase tracking-widest">
        {title}
      </p>
      <ul className="flex-1 divide-y divide-border">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              to={offerPath(p)}
              className="block py-3 text-base text-foreground/85 underline-offset-4 hover:text-foreground hover:underline"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/book"
        className="mt-8 inline-flex w-fit items-center border border-foreground bg-foreground px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
      >
        Book Now
      </Link>
    </div>
  );
}
