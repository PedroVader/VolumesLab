// SKU page template, to the structure the client set (10/08/2026):
//
//   HERO → WHAT IT IS → HOW IT WORKS → [CATEGORY MODULE] → FAQ → CTA
//
// Six blocks, identical on every page except the category module. The brief
// was "lo más más más sencillo posible", so the sample report, the metric
// glossary and the "not for you if" list are gone; preparation notes were kept
// but folded into How it works, since people need them before they buy.

import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/catalog";
import { assessments, findProduct, getTests, productPath, training } from "@/data/catalog";
import { getProductContent } from "@/data/productContent";
import { productLabels as L } from "@/data/pages";
import { bookingHref, bookingLabel, trackBooking } from "@/lib/booking";
import { productReachable } from "@/lib/sections";
import { BookCta, IncludedBadge } from "./cards";
import { Eyebrow, SectionTitle, FaqList, StickyBookBar } from "./blocks";

export function ProductDetail({ product }: { product: Product }) {
  const content = getProductContent(product.slug);
  const path = productPath(product);
  const isMembership = product.category === "membership";

  return (
    <div className="bg-background pb-20 md:pb-0">
      {/* ─────────────── 1 · HERO ─────────────── */}
      <section className="border-b border-border px-6 py-14 md:py-20">
        {/* No breadcrumb trail above the title: the client asked for the
            "HOME / SECTION" path gone (17/09/2026). The menu is the way back. */}
        <div className="mx-auto max-w-7xl">
          <div>
            <div className="max-w-3xl">
              <Eyebrow>{product.categoryLabel}</Eyebrow>
              <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance md:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed text-muted text-pretty">
                {product.shortDescription ?? product.tagline}
              </p>

              {product.badges && product.badges.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.badges.map((b) => (
                    <IncludedBadge key={b}>{b}</IncludedBadge>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
                <span className="font-display text-3xl font-bold">
                  {product.price === 0 && product.priceTbd ? "Price on booking" : `€${product.price}`}
                  {isMembership && product.price > 0 && <span className="ml-1 text-base font-normal text-muted">/mo</span>}
                </span>
                {product.duration && (
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {product.duration}
                  </span>
                )}
                {product.membership?.commitment && (
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    {product.membership.commitment}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <BookCta product={product} sourcePage={path} className="px-8 py-4 text-xs" />
              </div>
              {product.priceTbd && L.priceTbdNote && (
                <p className="mt-4 max-w-md text-xs leading-relaxed text-muted">
                  {L.priceTbdNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 2 · WHAT IT IS ─────────────── */}
      {content && content.outcomes.length > 0 && (
        <section className="border-b border-border px-6 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            {L.whatItIs && <SectionTitle>{L.whatItIs}</SectionTitle>}
            <ul className="mt-8 max-w-3xl space-y-4">
              {content.outcomes.map((o) => (
                <li key={o} className="flex gap-4 whitespace-pre-line text-base leading-relaxed text-foreground/85">
                  <span aria-hidden className="mt-1 font-mono text-[11px] text-primary">
                    ·
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─────────────── 3 · HOW IT WORKS ─────────────── */}
      {content && content.experience.length > 0 && (
        <section className="border-b border-border px-6 py-14 md:py-20">
          <div className="mx-auto max-w-7xl">
            {L.howItWorks && <SectionTitle>{L.howItWorks}</SectionTitle>}
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {content.experience.map((step, i) => (
                <li key={step.title} className="border-t-2 border-primary pt-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-extrabold uppercase tracking-tight">
                    {step.title}
                  </h3>
                  {step.body && <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{step.body}</p>}
                </li>
              ))}
            </ol>
            {content.prep.length > 0 && (
              <p className="mt-10 max-w-2xl border-t border-border pt-6 text-sm leading-relaxed text-muted">
                {L.prepPrefix && (
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
                    {L.prepPrefix}{" "}
                  </span>
                )}
                {content.prep.join(" ")}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─────────────── 4 · CATEGORY MODULE ─────────────── */}
      <CategoryModule product={product} />

      {/* ─────────────── 5 · FAQ ─────────────── */}
      {content && content.faqs.length > 0 && (
        <section className="border-b border-border px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            {L.questions && <SectionTitle>{L.questions}</SectionTitle>}
            <div className="mt-8">
              <FaqList items={content.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* ─────────────── 6 · FINAL CTA ─────────────── */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle className="max-w-2xl">{finalCtaTitle(product)}</SectionTitle>
          <div className="mt-8">
            <BookCta product={product} sourcePage={path} className="px-8 py-4 text-xs" />
          </div>
        </div>
      </section>

      <StickyBookBar
        price={product.price === 0 && product.priceTbd ? undefined : product.price}
        duration={product.duration}
        href={bookingHref(product)}
        onClick={() => trackBooking(product, path)}
        ctaLabel={bookingLabel(product)}
      />
    </div>
  );
}

// Short and category-appropriate. Interpolating the product name produced
// things like "Ready to book your Personal Training, 5 sessions?".
function finalCtaTitle(product: Product): string {
  switch (product.category) {
    case "membership":
      return L.finalCta.membership;
    case "training":
      return L.finalCta.training;
    case "medical":
      return L.finalCta.medical;
    default:
      return L.finalCta.default;
  }
}

/* ───────────────────────── Category modules ─────────────────────────
   The only part of the page that changes between categories. Each one
   answers the question that category's buyer actually asks. */

function CategoryModule({ product }: { product: Product }) {
  switch (product.category) {
    case "test":
      return <TestModule product={product} />;
    case "assessment":
      return <AssessmentModule product={product} />;
    case "training":
      return <TrainingModule product={product} />;
    case "membership":
      return <MembershipModule product={product} />;
    case "medical":
      return <MedicalModule />;
    default:
      return null;
  }
}

function ModuleSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-border px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        {title && <SectionTitle>{title}</SectionTitle>}
        <div className={title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

/**
 * A linked tile. Used for every module so the boxes read as one system.
 * `current` marks this page; `plain` is for a target whose section the CMS
 * switched off, so there is nowhere to link.
 */
function Tile({
  to,
  params,
  children,
  current = false,
  plain = false,
}: {
  to: string;
  params?: Record<string, string>;
  children: React.ReactNode;
  current?: boolean;
  plain?: boolean;
}) {
  const className = `flex h-full items-center justify-between gap-3 border px-4 py-4 font-mono text-[10px] font-bold uppercase leading-snug tracking-widest transition-colors ${
    current
      ? "border-primary bg-card text-primary"
      : "border-border text-muted hover:border-foreground hover:text-foreground"
  }`;
  if (current || plain) return <span className={className}>{children}</span>;
  return (
    <Link to={to} params={params} className={className}>
      {children}
      <span aria-hidden>→</span>
    </Link>
  );
}

/** Test: which assessments already contain this test. */
function TestModule({ product }: { product: Product }) {
  const inside = assessments.filter((a) => a.includedTests?.includes(product.slug));
  if (inside.length === 0) return null;
  return (
    <ModuleSection title={L.modules.testIncludedIn}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {inside.map((a) => (
          <li key={a.slug}>
            <Tile to="/$slug" params={{ slug: a.slug }} plain={!productReachable(a)}>
              {a.name} Assessment
            </Tile>
          </li>
        ))}
      </ul>
      {L.modules.testNote && <p className="mt-6 text-sm text-muted">{L.modules.testNote}</p>}
    </ModuleSection>
  );
}

/** Assessment: every test it contains, each linking to its own page. */
function AssessmentModule({ product }: { product: Product }) {
  const tests = getTests(product.includedTests ?? []);
  if (tests.length === 0) return null;
  const membership = product.includedInMembership ? findProduct(product.includedInMembership) : undefined;
  return (
    <ModuleSection title={L.modules.assessmentIncludes}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tests.map((t) => (
          <li key={t.slug}>
            <Tile to="/$slug" params={{ slug: t.slug }} plain={!productReachable(t)}>
              {t.name}
            </Tile>
          </li>
        ))}
      </ul>
      {membership && productReachable(membership) && (
        <p className="mt-6 text-sm text-muted">
          Included in the{" "}
          <Link
            to="/$slug"
            params={{ slug: membership.slug }}
            className="underline decoration-primary underline-offset-4 hover:text-primary"
          >
            {membership.name} Membership
          </Link>
          .
        </p>
      )}
    </ModuleSection>
  );
}

/** Training: every other live training option, with this one marked. */
function TrainingModule({ product }: { product: Product }) {
  if (training.length < 2) return null;
  return (
    <ModuleSection title={L.modules.trainingOtherOptions}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {training.map((p) => (
          <li key={p.slug}>
            <Tile to="/$slug" params={{ slug: p.slug }} current={p.slug === product.slug}>
              {p.training?.sessionCount === 1
                ? "1 session"
                : p.training?.sessionCount
                  ? `${p.training.sessionCount} sessions`
                  : p.name}
              {p.slug !== product.slug && p.price > 0 && <span className="sr-only"> at €{p.price}</span>}
            </Tile>
          </li>
        ))}
      </ul>
      {L.modules.trainingNote && <p className="mt-6 text-sm text-muted">{L.modules.trainingNote}</p>}
    </ModuleSection>
  );
}

/** Membership: what you get, then how joining actually goes. */
function MembershipModule({ product }: { product: Product }) {
  return (
    <ModuleSection title={L.modules.membershipIncluded}>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {product.measures.map((m) => (
          <li
            key={m}
            className="flex h-full items-center border border-border px-4 py-4 font-mono text-[10px] font-bold uppercase leading-snug tracking-widest text-muted"
          >
            {m}
          </li>
        ))}
      </ul>

      <div className="mt-12">
        {L.modules.membershipHowToJoin && (
          <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">{L.modules.membershipHowToJoin}</h3>
        )}
        {L.modules.membershipSteps.length > 0 && <Flow steps={[...L.modules.membershipSteps]} />}
        {product.membership?.bloodworkNote && (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            {product.membership.bloodworkNote}
          </p>
        )}
        {product.membership?.medicationNote && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {product.membership.medicationNote}
          </p>
        )}
      </div>
    </ModuleSection>
  );
}

/** Medical: the consultation, and what happens after it. */
function MedicalModule() {
  return (
    <ModuleSection title={L.modules.medicalTitle}>
      {L.modules.medicalIntro && (
        <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 whitespace-pre-line">
          {L.modules.medicalIntro}
        </p>
      )}
      {L.modules.medicalSteps.length > 0 && <Flow steps={[...L.modules.medicalSteps]} />}
      {L.modules.medicalNote && (
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted whitespace-pre-line">
          {L.modules.medicalNote}
        </p>
      )}
    </ModuleSection>
  );
}

/** Small left-to-right step flow, used by the membership and medical modules. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span className="border border-border px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span aria-hidden className="font-mono text-primary">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
