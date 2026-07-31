import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { training, memberships } from "@/data/catalog";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/training")({
  component: TrainingLanding,
  head: () => ({
    meta: [
      { title: "Personal Training, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Book a standalone personal training session, purchase a package, or train regularly as part of a Volumes Lab membership.",
      },
    ],
    links: [canonical("/training")],
  }),
});

function TrainingLanding() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Personal training</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">
            Training built around your goals and starting point
          </SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Book a standalone session, purchase a package, or train consistently as part of a
            Volumes Lab membership. Sessions may include strength, cardiovascular training,
            intervals, conditioning and mobility, adapted to you rather than sold as separate types.
          </p>
        </div>
      </section>

      {/* Standalone sessions & packages */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {training.map((t) => (
            <article key={t.slug} className="flex flex-col border border-border bg-card p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{t.categoryLabel}</p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{t.name}</h2>
              <p className="mt-3 flex-1 text-sm text-muted">{t.shortDescription}</p>
              <div className="mt-6 flex items-baseline justify-between border-t border-border pt-4">
                <span className="font-display text-xl font-bold">€{t.price}</span>
                {t.duration && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{t.duration}</span>
                )}
              </div>
              <Link
                to="/book"
                className="mt-4 inline-flex w-fit items-center bg-primary px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                {t.ctaLabel ?? "Book a Session"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Membership cross-links */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Train consistently</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Training is included in both memberships</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {memberships.map((m) => (
              <Link
                key={m.slug}
                to="/memberships/$slug"
                params={{ slug: m.slug }}
                className="group flex flex-col border border-border p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-tight group-hover:text-primary">
                  {m.name}
                </h3>
                <p className="mt-3 text-sm text-muted">{m.membership?.trainingFrequency}</p>
                <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-primary">
                  Explore membership →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA (brief 11.2) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
        <Link
          to="/book"
          className="block bg-primary py-3 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-primary-foreground"
        >
          Book a Training Session
        </Link>
      </div>
    </SiteChrome>
  );
}
