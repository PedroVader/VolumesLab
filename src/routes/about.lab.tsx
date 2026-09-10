import { createFileRoute, Link } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { PAGES } from "@/data/site";
import { SiteChrome } from "@/components/site/SiteChrome";
import { metaTags } from "@/data/meta";
import { labPage } from "@/data/pages";
import { BookServicesLink } from "@/components/site/cards";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";

export const Route = createFileRoute("/about/lab")({
  beforeLoad: pageGate("lab"),
  component: LabPage,
  head: () => ({
    meta: metaTags("lab"),
  }),
});

function LabPage() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The lab</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">
            Testing, medical expertise and training in one location
          </SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            An integrated model, not a generic gym. Each area of the space connects to a specific
            part of your program. Authentic photography to be added once available.
          </p>
        </div>
      </section>
      {labPage.areas.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            {labPage.areas.map((a) => (
              <div key={a.title} className="border border-border bg-card p-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                  {a.title}
                </h2>
                {a.body && <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4">
          {PAGES.location && (
            <Link
              to="/about/location"
              className="inline-flex items-center border border-foreground px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-primary-foreground"
            >
              Location
            </Link>
          )}
          <BookServicesLink sourcePage="/about/lab" className="px-5 py-2.5" />
        </div>
      </section>
    </SiteChrome>
  );
}
