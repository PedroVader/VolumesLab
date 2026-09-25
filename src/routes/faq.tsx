import { createFileRoute } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { CONTACT } from "@/data/site";
import { faqPage } from "@/data/pages";
import { BookBand } from "@/components/site/BookBand";
import { Eyebrow, FaqList } from "@/components/site/blocks";
import { cmsFaqGroups } from "@/lib/cms";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";

export const Route = createFileRoute("/faq")({
  beforeLoad: pageGate("faq"),
  component: FaqPage,
  // FAQ content is editable in the CMS; fetched per request with fallback.
  loader: () => cmsFaqGroups().then((faqGroups) => ({ faqGroups })),
  head: () => ({
    meta: metaTags("faq"),
    links: [canonical("/faq")],
  }),
});

function FaqPage() {
  const { faqGroups } = Route.useLoaderData();
  const hasHeader = faqPage.eyebrow || faqPage.headline || faqPage.intro;
  return (
    <SiteChrome>
      {hasHeader && (
        <section className="border-b border-border px-page py-24">
          <div className="mx-auto max-w-4xl">
            {faqPage.eyebrow && <Eyebrow>{faqPage.eyebrow}</Eyebrow>}
            {faqPage.headline && (
              <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
                {faqPage.headline}
              </h1>
            )}
            {faqPage.intro && (
              <p className="mt-6 max-w-2xl text-lg text-muted">
                <IntroWithEmail text={faqPage.intro} />
              </p>
            )}
          </div>
        </section>
      )}

      {faqGroups.map((group) => (
        <section key={group.title} className="border-b border-border px-page py-16">
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

      {faqPage.band && <BookBand text={faqPage.band} />}
    </SiteChrome>
  );
}

// The intro is edited as one sentence in the CMS; {email} marks where the
// contact address goes, rendered as a mailto link.
function IntroWithEmail({ text }: { text: string }) {
  const [before, ...rest] = text.split("{email}");
  if (!rest.length) return <>{text}</>;
  return (
    <>
      {before}
      <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-foreground">
        {CONTACT.email}
      </a>
      {rest.join(CONTACT.email)}
    </>
  );
}
