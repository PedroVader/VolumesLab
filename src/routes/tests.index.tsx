import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { ProductCard } from "@/components/site/cards";
import { testGroups, getTests } from "@/data/catalog";

export const Route = createFileRoute("/tests/")({
  component: TestsLanding,
  head: () => ({
    meta: [
      { title: "Individual Tests, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Book a single test on its own: VO2max, 3D body composition, bone density, metabolism, strength, mobility and more.",
      },
    ],
  }),
});

function TestsLanding() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Individual testing</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Measure one specific area</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Book a single test on its own, or compare our comprehensive assessments if you want a
            coordinated view across multiple areas.
          </p>
          <Link
            to="/assessments"
            className="mt-8 inline-flex w-fit items-center border border-foreground px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-primary-foreground"
          >
            Compare Assessments
          </Link>
        </div>
      </section>

      {/* Grouped tests */}
      {testGroups.map((group) => (
        <section key={group.key} className="border-t border-border px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              {group.label}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {getTests(group.testSlugs).map((t) => (
                <ProductCard key={t.slug} p={t} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </SiteChrome>
  );
}
