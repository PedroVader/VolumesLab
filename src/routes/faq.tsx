import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { CONTACT } from "@/data/site";
import { BookBand } from "@/components/site/BookBand";
import { Eyebrow, FaqList } from "@/components/site/blocks";
import { faqGroups } from "@/data/faq";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    meta: metaTags("faq"),
    links: [canonical("/faq")],
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
            Call <a href={CONTACT.phoneHref} className="underline underline-offset-4 hover:text-foreground">{CONTACT.phone}</a> and
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
