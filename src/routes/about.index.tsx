import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { aboutPage } from "@/data/pages";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";

export const Route = createFileRoute("/about/")({
  component: AboutLanding,
  head: () => ({
    meta: metaTags("about"),
    links: [canonical("/about")],
  }),
});

const links: { label: string; to: "/about/team" | "/about/lab" | "/about/location" | "/faq" }[] = [
  { label: "The team", to: "/about/team" },
  { label: "The lab", to: "/about/lab" },
  { label: "Location", to: "/about/location" },
  { label: "FAQ", to: "/faq" },
];

function AboutLanding() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>About Volumes Lab</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">One team, one location and one clear plan</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Volumes Lab brings advanced testing, medical expertise and personal training together so
            every part of the program can work from the same data.
          </p>
        </div>
      </section>

      {/* Test, Understand, Treat or Train, Retest */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>How Volumes Lab works</Eyebrow>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {aboutPage.steps.map((s, i) => (
              <div key={s.title} className="border-t-2 border-primary pt-6">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section links */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between border border-border p-6 transition-colors hover:border-primary"
            >
              <span className="font-display text-lg font-bold uppercase tracking-tight group-hover:text-primary">
                {l.label}
              </span>
              <span aria-hidden className="text-muted group-hover:text-primary">→</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
