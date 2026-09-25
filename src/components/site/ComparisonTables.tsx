// Comparison tables (brief sections 5.4 and 6.3).
//
// These used to live on the /assessments and /memberships index pages. Those
// pages are gone — the homepage is now the index — so the comparisons live
// inside each SKU's landing page instead, with the page you are on highlighted.
// That keeps the "which one do I pick?" question answerable at the exact moment
// it gets asked, rather than on a separate page nobody visits.
//
// Both tables are built from relational catalogue data, so they cannot drift
// out of sync with prices, durations or the tests an assessment contains.

import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { assessments, memberships, tests, type Product } from "@/data/catalog";
import { track } from "@/lib/analytics";
import { BookCta } from "./cards";
import { Eyebrow, SectionTitle } from "./blocks";



/* ---------------- Shared shell ---------------- */

function ComparisonSection({
  kind,
  title,
  intro,
  sourcePage,
  children,
}: {
  kind: string;
  title: string;
  intro?: string;
  sourcePage: string;
  children: React.ReactNode;
}) {
  const scrolled = useRef(false);

  useEffect(() => {
    track("comparison_view", { comparison_type: kind, page: sourcePage });
  }, [kind, sourcePage]);

  return (
    <section id="compare" className="scroll-mt-20 border-b border-border px-page py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>Compare</Eyebrow>
        <SectionTitle className="mt-6 max-w-3xl">{title}</SectionTitle>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
        <div
          className="mt-10 overflow-x-auto"
          role="region"
          aria-label={`${kind} comparison`}
          tabIndex={0}
          onScroll={() => {
            if (scrolled.current) return;
            scrolled.current = true;
            track("table_horizontal_scroll", { table_type: kind, page: sourcePage });
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/** Column header: links to the other options, plain text for the current one. */
function ColumnHead({
  p,
  to,
  isCurrent,
}: {
  p: Product;
  to: string;
  isCurrent: boolean;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-4 text-center align-bottom ${isCurrent ? "border-t-2 border-primary bg-card" : ""}`}
    >
      {isCurrent ? (
        <>
          <span className="font-display text-lg font-extrabold uppercase tracking-tight text-primary">
            {p.name}
          </span>
          <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-muted">
            You are here
          </span>
        </>
      ) : (
        <Link
          to={to}
          params={{ slug: p.slug }}
          className="font-display text-lg font-extrabold uppercase tracking-tight hover:text-primary"
        >
          {p.name}
        </Link>
      )}
    </th>
  );
}

function RowLabel({ children, tight = false }: { children: React.ReactNode; tight?: boolean }) {
  return (
    <th
      scope="row"
      className={
        tight
          ? "py-3 pr-6 text-left text-sm font-normal text-foreground/85"
          : "py-4 pr-6 text-left font-mono text-[10px] uppercase tracking-widest text-muted"
      }
    >
      {children}
    </th>
  );
}

/* ---------------- Assessments ---------------- */

export function AssessmentComparison({ currentSlug }: { currentSlug?: string }) {
  const orderedAssessments = [...assessments].sort(
    (a, b) => (a.comparisonOrder ?? 0) - (b.comparisonOrder ?? 0),
  );
  return (
    <ComparisonSection
      kind="assessments"
      title="What each assessment includes"
      intro="Every assessment is a coordinated group of tests run in a single visit. Each step up adds to the one before it."
      sourcePage={currentSlug ? `/${currentSlug}` : "/assessments"}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-4 pr-6 font-mono text-[10px] uppercase tracking-widest text-muted">
              Test
            </th>
            {orderedAssessments.map((a) => (
              <ColumnHead key={a.slug} p={a} to="/$slug" isCurrent={a.slug === currentSlug} />
            ))}
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t.slug} className="border-b border-border">
              <RowLabel tight>
                <Link to="/$slug" params={{ slug: t.slug }} className="hover:text-primary">
                  {t.name}
                </Link>
              </RowLabel>
              {orderedAssessments.map((a) => {
                const included = a.includedTests?.includes(t.slug);
                return (
                  <td
                    key={a.slug}
                    className={`px-4 py-3 text-center ${a.slug === currentSlug ? "bg-card" : ""}`}
                  >
                    {included ? (
                      <span className="text-primary" aria-label={`Included in ${a.name}`}>
                        ✓
                      </span>
                    ) : (
                      <span className="text-transparent" aria-label={`Not in ${a.name}`}>
                        –
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-b border-border">
            <RowLabel>Price</RowLabel>
            {orderedAssessments.map((a) => (
              <td
                key={a.slug}
                className={`px-4 py-4 text-center font-display text-lg font-bold ${a.slug === currentSlug ? "bg-card" : ""}`}
              >
                {a.price === 0 && a.priceTbd ? "Price on booking" : `€${a.price}`}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <RowLabel>Duration</RowLabel>
            {orderedAssessments.map((a) => (
              <td
                key={a.slug}
                className={`px-4 py-4 text-center text-sm ${a.slug === currentSlug ? "bg-card" : ""}`}
              >
                {a.duration}
              </td>
            ))}
          </tr>
          <tr>
            <RowLabel>Book</RowLabel>
            {orderedAssessments.map((a) => (
              <td
                key={a.slug}
                className={`px-4 py-6 text-center ${a.slug === currentSlug ? "bg-card" : ""}`}
              >
                <BookCta
                  product={a}
                  sourcePage={currentSlug ? `/${currentSlug}` : "/assessments"}
                  className="px-4 py-2"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </ComparisonSection>
  );
}

/* ---------------- Memberships ---------------- */

// Rows are pulled from each membership's structured detail, so adding a field
// in the catalogue is enough to add a row here.
const membershipRows: { label: string; value: (m: Product) => React.ReactNode }[] = [
  { label: "Goal", value: (m) => m.membership?.goal },
  {
    label: "Initial assessment",
    value: (m) => {
      const slug = m.membership?.initialAssessment;
      if (!slug) return null;
      const a = assessments.find((x) => x.slug === slug);
      if (!a) return null;
      return (
        <Link to="/$slug" params={{ slug: a.slug }} className="hover:text-primary">
          {a.name}
        </Link>
      );
    },
  },
  { label: "Training", value: (m) => m.membership?.trainingFrequency },
  { label: "Doctor involvement", value: (m) => m.membership?.doctorInvolvement },
  { label: "Retesting", value: (m) => m.membership?.retesting },
  { label: "Bloodwork", value: (m) => m.membership?.bloodworkNote },
  { label: "Medication", value: (m) => m.membership?.medicationNote },
  { label: "Commitment", value: (m) => m.membership?.commitment },
  { label: "Price", value: (m) => m.price === 0 && m.priceTbd ? "Price on booking" : `€${m.price} per month` },
];

export function MembershipComparison({ currentSlug }: { currentSlug?: string }) {
  const sourcePage = currentSlug ? `/${currentSlug}` : "/memberships";
  // Skip rows where neither membership has anything to say.
  const rows = membershipRows.filter((row) => memberships.some((m) => row.value(m)));

  return (
    <ComparisonSection
      kind="memberships"
      title="The two memberships, side by side"
      intro="Both combine objective measurement with ongoing support. They differ in what they are optimising for."
      sourcePage={sourcePage}
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-4 pr-6 font-mono text-[10px] uppercase tracking-widest text-muted">
              &nbsp;
            </th>
            {memberships.map((m) => (
              <ColumnHead key={m.slug} p={m} to="/$slug" isCurrent={m.slug === currentSlug} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border align-top">
              <RowLabel>{row.label}</RowLabel>
              {memberships.map((m) => (
                <td
                  key={m.slug}
                  className={`px-4 py-4 text-sm leading-relaxed text-foreground/85 ${m.slug === currentSlug ? "bg-card" : ""}`}
                >
                  {row.value(m) ?? <span className="text-muted">—</span>}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <RowLabel>Book</RowLabel>
            {memberships.map((m) => (
              <td key={m.slug} className={`px-4 py-6 ${m.slug === currentSlug ? "bg-card" : ""}`}>
                <BookCta product={m} sourcePage={sourcePage} className="px-4 py-2" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </ComparisonSection>
  );
}
