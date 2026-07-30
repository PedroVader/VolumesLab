import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { memberships } from "@/data/catalog";

export const Route = createFileRoute("/memberships/")({
  component: MembershipsLanding,
  head: () => ({
    meta: [
      { title: "Memberships, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Two ongoing programs combining objective testing with support: the Health & Performance Membership and the GLP-1 Medical Membership.",
      },
    ],
  }),
});

function MembershipsLanding() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Ongoing programs</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Find the right membership</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Both memberships combine objective testing with ongoing support. Health & Performance is
            built around comprehensive training and physical performance. GLP-1 Medical is designed
            for medically supervised weight management while protecting strength, lean mass and
            metabolic health.
          </p>
        </div>
      </section>

      {/* Two membership cards */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {memberships.map((m) => (
            <article key={m.slug} className="flex flex-col border border-border bg-card p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {m.membership?.goal}
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight">{m.name}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{m.shortDescription}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-foreground/85">
                {m.measures.slice(0, 5).map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="text-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              {m.membership?.commitment && (
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {m.membership.commitment}
                </p>
              )}
              <Link
                to="/memberships/$slug"
                params={{ slug: m.slug }}
                className="mt-6 inline-flex w-fit items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
              >
                {m.ctaLabel ?? "Explore Membership"}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
