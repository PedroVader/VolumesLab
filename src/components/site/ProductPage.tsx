import { useState } from "react";
import type { Product } from "@/data/catalog";
import { findProduct } from "@/data/catalog";
import { getProductContent, getTestimonialFor } from "@/data/productContent";
import { useCart } from "@/lib/cart";
import { BookBand } from "./BookBand";
import { ProductIllustration } from "./illustrations";
import {
  Eyebrow,
  SectionTitle,
  TrustStrip,
  OutcomeList,
  VisitSteps,
  SampleReport,
  FaqList,
  PrepList,
  TestimonialCard,
  RelatedProducts,
  StickyBookBar,
} from "./blocks";
import { toast } from "sonner";

function detailPath(category: Product["category"], slug: string): string {
  if (category === "membership") return `/memberships/${slug}`;
  if (category === "assessment") return `/assessments/${slug}`;
  if (category === "test") return `/tests/${slug}`;
  return "/book";
}

export function ProductPage({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [gift, setGift] = useState(false);
  const content = getProductContent(product.slug);
  const testimonial = getTestimonialFor(product.category);

  const related = (content?.related ?? [])
    .map((slug) => findProduct(slug))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, name: p.name, tagline: p.tagline, price: p.price, path: detailPath(p.category, p.slug) }));

  const addToCart = () => {
    add({ slug: product.slug, name: product.name, price: product.price, giftCard: gift });
    toast.success(`${product.name} added to cart`);
  };

  if (!content) {
    // Fallback for any product without marketing content: simple page.
    return (
      <div className="bg-background">
        <section className="border-b border-border px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>{product.categoryLabel}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl font-extrabold uppercase tracking-tight md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted">{product.tagline}</p>
          </div>
        </section>
        <BookBand text={`Book your ${product.name}.`} />
      </div>
    );
  }

  return (
    <div className="bg-background pb-20 md:pb-0">
      {/* ---------- HERO ---------- */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{product.categoryLabel}</Eyebrow>
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance md:text-7xl">
                {product.name}
              </h1>
              <p className="mt-8 max-w-2xl text-lg text-muted text-pretty">{product.tagline}</p>
              <div className="mt-10">
                <TrustStrip items={content.heroProof} />
              </div>
              <figure className="mt-10 border border-border bg-card p-4">
                <ProductIllustration k={content.illustration} className="h-auto w-full" />
                <figcaption className="mt-3 border-t border-border pt-3 font-mono text-[9px] uppercase tracking-widest text-muted">
                  Fig. 01, measured on lab-grade equipment at Calle Churruca 5
                </figcaption>
              </figure>
            </div>

            {/* Buy box */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-20">
                <div className="border border-border p-6">
                  <div className="flex items-baseline justify-between border-b border-border pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Price</span>
                    <span className="font-display text-3xl font-bold">€{product.price}</span>
                  </div>
                  {product.duration && (
                    <div className="flex items-center justify-between border-b border-border py-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Duration</span>
                      <span className="text-sm">{product.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-border py-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Location</span>
                    <span className="text-sm">Calle Churruca 5, Madrid</span>
                  </div>
                  {product.giftable && (
                    <label className="mt-4 flex cursor-pointer items-center gap-3 py-2 font-mono text-[11px] uppercase tracking-widest">
                      <input
                        type="checkbox"
                        checked={gift}
                        onChange={(e) => setGift(e.target.checked)}
                        className="accent-primary"
                      />
                      Purchase as gift card
                    </label>
                  )}
                  <button
                    onClick={addToCart}
                    className="mt-4 block w-full bg-foreground py-4 text-center font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:opacity-80"
                  >
                    {gift ? `Add gift card · €${product.price}` : `Book ${product.name} · €${product.price}`}
                  </button>
                  <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-muted">
                    Free reschedule up to 48h before
                  </p>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Every booking is confirmed personally by our team within 24 hours. Questions first?
                  Call <a href="tel:+34910000000" className="underline underline-offset-2 hover:text-foreground">+34 910 000 000</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- WHAT YOU WALK AWAY WITH ---------- */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>What you walk away with</Eyebrow>
          <div className="mt-10">
            <OutcomeList items={content.outcomes} />
          </div>
        </div>
      </section>

      {/* ---------- WHAT WE MEASURE & WHY ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>What we measure</Eyebrow>
            <SectionTitle className="mt-6">Every number, explained.</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-muted">
              No report full of acronyms you'll never open. Each metric comes with what it is,
              why it predicts your health, and what to do about it.
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={content.measuresDetail.map((m) => ({ q: m.name, a: m.why }))} />
          </div>
        </div>
      </section>

      {/* ---------- THE EXPERIENCE ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The visit</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Know exactly what happens before you walk in.</SectionTitle>
          <div className="mt-16">
            <VisitSteps steps={content.experience} />
          </div>
        </div>
      </section>

      {/* ---------- SAMPLE REPORT ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>The deliverable</Eyebrow>
            <SectionTitle className="mt-6">This is what "data-led" actually looks like.</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Every result is benchmarked against your age group and reviewed with you in person.
              P50 is the average for your age, we aim well above it.
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

      {/* ---------- GOOD FOR / NOT FOR + PREP ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-3">
          <div>
            <Eyebrow>Good for</Eyebrow>
            <ul className="mt-8 space-y-4">
              {product.goodFor.map((g, i) => (
                <li key={i} className="flex gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[10px] text-foreground">✓</span>
                  <span className="text-sm leading-relaxed text-foreground/85">{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Not for</Eyebrow>
            <ul className="mt-8 space-y-4">
              {content.notFor.map((g, i) => (
                <li key={i} className="flex gap-4 border-t border-border pt-4">
                  <span className="font-mono text-[10px] text-muted">✕</span>
                  <span className="text-sm leading-relaxed text-muted">{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>How to prepare</Eyebrow>
            <div className="mt-8 border-t border-border pt-4">
              <PrepList items={content.prep} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PRODUCT FAQ ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Questions</Eyebrow>
          <div className="mt-10">
            <FaqList items={content.faqs} />
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIAL ---------- */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <TestimonialCard quote={testimonial.quote} name={testimonial.name} detail={testimonial.detail} />
        </div>
      </section>

      {/* ---------- NEXT STEP / RELATED ---------- */}
      {related.length > 0 && (
        <section className="border-t border-border px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>The next step</Eyebrow>
            <SectionTitle className="mt-6 max-w-3xl">Where people go from here.</SectionTitle>
            <div className="mt-12">
              <RelatedProducts items={related} />
            </div>
          </div>
        </section>
      )}

      <BookBand text={`Book your ${product.name}.`} />

      <StickyBookBar
        price={product.price}
        duration={product.duration}
        onAdd={addToCart}
        ctaLabel={`Book · €${product.price}`}
      />
    </div>
  );
}
