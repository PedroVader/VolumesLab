// Brief-aligned product detail template (sections 5.2/5.3, 6.2, 7.3).
// Branches by category (membership / assessment / test), pulling commercial and
// relational data from catalog.ts and marketing copy from productContent.ts.

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/data/catalog";
import { assessments, findProduct, getTests, productPath } from "@/data/catalog";
import { getProductContent } from "@/data/productContent";
import { bookingTarget } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { ProductIllustration } from "./illustrations";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SecondaryLink } from "./cards";

const categoryCrumb: Record<string, Crumb> = {
  membership: { name: "Memberships", to: "/memberships" },
  assessment: { name: "Assessments", to: "/assessments" },
  test: { name: "Individual Tests", to: "/tests" },
};
import {
  Eyebrow,
  SectionTitle,
  OutcomeList,
  VisitSteps,
  SampleReport,
  FaqList,
  PrepList,
  StickyBookBar,
} from "./blocks";

export function ProductDetail({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [gift, setGift] = useState(false);
  const content = getProductContent(product.slug);
  const isMembership = product.category === "membership";

  const addToCart = () => {
    track("book_cta_click", {
      product: product.slug,
      product_category: product.category,
      source_page: productPath(product),
    });
    if (product.slug === "glp-1") track("glp1_consultation_click", { source_page: productPath(product) });
    const target = bookingTarget(product);
    if (target.kind === "momence") {
      window.open(target.href, "_blank", "noreferrer");
      return;
    }
    add({ slug: product.slug, name: product.name, price: product.price, giftCard: gift });
    toast.success(`${product.name} added to cart`);
  };

  const includedTests = getTests(product.includedTests ?? []);
  const containingAssessments =
    product.category === "test"
      ? assessments.filter((a) => a.includedTests?.includes(product.slug))
      : [];
  const linkedMembership = product.includedInMembership
    ? findProduct(product.includedInMembership)
    : undefined;

  return (
    <div className="bg-background pb-20 md:pb-0">
      {/* ---------- HERO + BUY BOX ---------- */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            items={[
              { name: "Home", to: "/" },
              categoryCrumb[product.category] ?? { name: product.categoryLabel },
              { name: product.name },
            ]}
          />
          <div className="mt-8">
            <Eyebrow>{product.categoryLabel}</Eyebrow>
          </div>
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted text-pretty">{product.tagline}</p>

              {product.badges?.map((b) => (
                <p key={b} className="mt-6 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                  [ {b} ]
                </p>
              ))}

              {content && (
                <figure className="mt-10 border border-border bg-card p-4">
                  <ProductIllustration k={content.illustration} className="h-auto w-full" />
                  <figcaption className="mt-3 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-widest text-muted">
                    Fig. 01, measured on lab-grade equipment at Calle Churruca 5
                  </figcaption>
                </figure>
              )}
            </div>

            {/* Buy box */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-20">
                <div className="border border-border p-6">
                  <div className="flex items-baseline justify-between border-b border-border pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Price</span>
                    <span className="font-display text-3xl font-bold">
                      €{product.price}
                      {isMembership && <span className="ml-1 text-base font-normal text-muted">/mo</span>}
                    </span>
                  </div>
                  {product.duration && (
                    <div className="flex items-center justify-between border-b border-border py-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Duration</span>
                      <span className="text-sm">{product.duration}</span>
                    </div>
                  )}
                  {product.membership?.commitment && (
                    <div className="flex items-center justify-between border-b border-border py-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Commitment</span>
                      <span className="text-sm">{product.membership.commitment}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-border py-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Location</span>
                    <span className="text-sm">Calle Churruca 5, Madrid</span>
                  </div>

                  {product.giftable && !isMembership && (
                    <label className="mt-4 flex cursor-pointer items-center gap-3 py-2 font-mono text-[11px] uppercase tracking-widest">
                      <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} className="accent-primary" />
                      Purchase as gift card
                    </label>
                  )}

                  <button
                    onClick={addToCart}
                    className="mt-4 block w-full bg-primary py-4 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
                  >
                    {product.ctaLabel ?? (gift ? "Add gift card" : "Book")}
                  </button>
                  <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-muted">
                    Confirmed personally within 24 hours
                  </p>
                </div>
                {product.priceTbd && (
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    Price shown is indicative and pending confirmation.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ASSESSMENT: what is included (canonical test links) ---------- */}
      {includedTests.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>What is included</Eyebrow>
            <SectionTitle className="mt-6 max-w-3xl">The tests in this assessment</SectionTitle>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {includedTests.map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/tests/$slug"
                    params={{ slug: t.slug }}
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="font-display text-xl font-bold uppercase tracking-tight group-hover:text-primary">
                      {t.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-primary">
                      View test →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- MEMBERSHIP: medical / bloodwork / medication callouts ---------- */}
      {isMembership && product.membership && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>What is included</Eyebrow>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {product.measures.map((m) => (
                <li key={m} className="flex gap-4 py-4">
                  <span aria-hidden className="mt-0.5 font-mono text-[11px] text-primary">✓</span>
                  <span className="text-base leading-relaxed text-foreground/85">{m}</span>
                </li>
              ))}
            </ul>
            {(product.membership.bloodworkNote || product.membership.medicationNote) && (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {product.membership.bloodworkNote && (
                  <Callout title="Required before treatment">{product.membership.bloodworkNote}</Callout>
                )}
                {product.membership.medicationNote && (
                  <Callout title="Medication cost">{product.membership.medicationNote}</Callout>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- WHAT YOU LEARN / WHY IT MATTERS ---------- */}
      {content && content.outcomes.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>{product.category === "test" ? "Why it matters" : "What you will learn"}</Eyebrow>
            <div className="mt-10">
              <OutcomeList items={content.outcomes} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- WHAT HAPPENS / THE VISIT ---------- */}
      {content && content.experience.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>{isMembership ? "The member journey" : "What happens on the day"}</Eyebrow>
            <div className="mt-12">
              <VisitSteps steps={content.experience} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- YOUR RESULTS ---------- */}
      {content && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Your results</Eyebrow>
              <SectionTitle className="mt-6">Reviewed with you, in person.</SectionTitle>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Every result is benchmarked against your age group and reviewed with the team.
              </p>
            </div>
            <div className="lg:col-span-8">
              <SampleReport
                title={content.sampleReport.title}
                metrics={content.sampleReport.metrics}
                footnote={content.sampleReport.footnote}
              />
            </div>
          </div>
        </section>
      )}

      {/* ---------- HOW TO PREPARE ---------- */}
      {content && content.prep.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>How to prepare</Eyebrow>
            <div className="mt-8">
              <PrepList items={content.prep} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- TEST: part of an assessment ---------- */}
      {containingAssessments.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Part of an assessment</Eyebrow>
            <SectionTitle className="mt-6 max-w-3xl">This test is included in</SectionTitle>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {containingAssessments.map((a) => (
                <Link
                  key={a.slug}
                  to="/assessments/$slug"
                  params={{ slug: a.slug }}
                  className="group flex flex-col border border-border p-6 transition-colors hover:border-primary"
                >
                  <span className="font-display text-xl font-bold uppercase tracking-tight group-hover:text-primary">
                    {a.name}
                  </span>
                  <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-primary">
                    View assessment →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- MEMBERSHIP CONNECTION (assessment) ---------- */}
      {linkedMembership && (
        <section className="border-b border-border px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Membership connection</Eyebrow>
            <p className="mt-6 max-w-2xl text-lg text-foreground/85">
              This assessment is included in the{" "}
              <Link
                to="/memberships/$slug"
                params={{ slug: linkedMembership.slug }}
                className="underline decoration-primary underline-offset-4 hover:text-primary"
              >
                {linkedMembership.name} Membership
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      {content && content.faqs.length > 0 && (
        <section className="border-b border-border px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-10">
              <FaqList items={content.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- FINAL CTA ---------- */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4">
          <button
            onClick={addToCart}
            className="inline-flex items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            {product.ctaLabel ?? "Book"}
          </button>
          {product.category === "assessment" ? (
            <SecondaryLink to="/assessments">Compare Assessments</SecondaryLink>
          ) : product.category === "test" ? (
            <SecondaryLink to="/tests">View All Tests</SecondaryLink>
          ) : (
            <SecondaryLink to="/memberships">Compare Memberships</SecondaryLink>
          )}
        </div>
      </section>

      <StickyBookBar
        price={product.price}
        duration={product.duration}
        onAdd={addToCart}
        ctaLabel={product.ctaLabel ?? "Book"}
      />
    </div>
  );
}

function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border bg-card p-6">
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">{title}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{children}</p>
    </div>
  );
}
