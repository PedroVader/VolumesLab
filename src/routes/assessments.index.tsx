import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { ProductCard } from "@/components/site/cards";
import { assessments, tests } from "@/data/catalog";

export const Route = createFileRoute("/assessments/")({
  component: AssessmentsLanding,
  head: () => ({
    meta: [
      { title: "Complete Assessments, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Each Volumes Lab assessment combines several tests into one coordinated evaluation. Compare Foundational, Longevity and Performance.",
      },
    ],
  }),
});

// Comparison table is built from relational data (single source of truth):
// each assessment lists the test slugs it includes.
const orderedAssessments = [...assessments].sort(
  (a, b) => (a.comparisonOrder ?? 0) - (b.comparisonOrder ?? 0),
);

function AssessmentsLanding() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Comprehensive assessments</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Choose the right assessment</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Each Volumes Lab assessment combines several tests into one coordinated evaluation.
            Choose the depth that matches your goals.
          </p>
        </div>
      </section>

      {/* Summary cards */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {orderedAssessments.map((a) => (
            <ProductCard key={a.slug} p={a} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section id="compare" className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Compare</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">What each assessment includes</SectionTitle>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-6 font-mono text-[10px] uppercase tracking-widest text-muted">Test</th>
                  {orderedAssessments.map((a) => (
                    <th key={a.slug} className="px-4 py-4 text-center">
                      <Link
                        to="/assessments/$slug"
                        params={{ slug: a.slug }}
                        className="font-display text-lg font-extrabold uppercase tracking-tight hover:text-primary"
                      >
                        {a.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tests.map((t) => (
                  <tr key={t.slug} className="border-b border-border">
                    <th scope="row" className="py-3 pr-6 text-left text-sm font-normal text-foreground/85">
                      {t.name}
                    </th>
                    {orderedAssessments.map((a) => {
                      const included = a.includedTests?.includes(t.slug);
                      return (
                        <td key={a.slug} className="px-4 py-3 text-center">
                          {included ? (
                            <span className="text-primary" aria-label={`Included in ${a.name}`}>✓</span>
                          ) : (
                            <span className="text-transparent" aria-label={`Not in ${a.name}`}>–</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-b border-border">
                  <th scope="row" className="py-4 pr-6 text-left font-mono text-[10px] uppercase tracking-widest text-muted">
                    Price
                  </th>
                  {orderedAssessments.map((a) => (
                    <td key={a.slug} className="px-4 py-4 text-center font-display text-lg font-bold">
                      €{a.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-6 text-left font-mono text-[10px] uppercase tracking-widest text-muted">
                    Duration
                  </th>
                  {orderedAssessments.map((a) => (
                    <td key={a.slug} className="px-4 py-4 text-center text-sm">
                      {a.duration}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
