import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { BookBand } from "@/components/site/BookBand";
import { Eyebrow, FaqList } from "@/components/site/blocks";
import { faqGroups } from "@/data/faq";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQ, Volumes Lab Madrid" },
      { name: "description", content: "Answers to common questions about testing, preparation, results, memberships and gift cards at Volumes Lab, Madrid." },
      { property: "og:title", content: "FAQ, Volumes Lab Madrid" },
      { property: "og:description", content: "Preparation, cancellations, gift cards and more." },
    ],
  }),
});

function FaqPage() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Frequently asked</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            Questions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Everything people ask before their first visit. Something missing?
            Call <a href="tel:+34910000000" className="underline underline-offset-4 hover:text-foreground">+34 910 000 000</a> and
            ask a human.
          </p>
        </div>
      </section>

      {faqGroups.map((group) => (
        <section key={group.title} className="border-b border-border px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
              {group.title}
            </h2>
            <div className="mt-8">
              <FaqList items={group.items} />
            </div>
          </div>
        </section>
      ))}

      <BookBand text="Still curious? Come see the lab." />
    </SiteChrome>
  );
}
