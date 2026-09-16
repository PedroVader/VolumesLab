// The people page. Hidden since 24/08/2026 because there was nobody to show;
// since 14/09/2026 it is a page again behind "Pages on / off → Team" (off by
// default) so the client switches it on once the Team collection has people.
// While on, Team sits in the top menu and the footer line.
import { createFileRoute } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { metaTags } from "@/data/meta";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { BookServicesLink } from "@/components/site/cards";
import { cmsTeam } from "@/lib/cms";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/about/team")({
  beforeLoad: pageGate("team"),
  component: TeamPage,
  // People come from the CMS at request time (30s cache), so adding someone
  // in Payload shows up here without a deploy.
  loader: () => cmsTeam().then((people) => ({ people })),
  head: () => ({
    meta: metaTags("team"),
    links: [canonical("/about/team")],
  }),
});

function TeamPage() {
  const { people } = Route.useLoaderData();
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The team</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">
            Medical and performance expertise
          </SectionTitle>
        </div>
      </section>
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          {people.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((p) => (
                <li key={p.id} className="border border-border bg-card">
                  {p.photo && (
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="aspect-[4/5] w-full object-cover grayscale"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    {p.name && (
                      <p className="font-display text-xl font-bold uppercase tracking-tight">{p.name}</p>
                    )}
                    {p.role && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">{p.role}</p>
                    )}
                    {p.credentials && <p className="mt-2 text-sm text-muted">{p.credentials}</p>}
                    {p.bio && (
                      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/85">{p.bio}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-2xl text-base text-muted">
              The team is being introduced. Come back soon.
            </p>
          )}
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <BookServicesLink sourcePage="/about/team" />
        </div>
      </section>
    </SiteChrome>
  );
}
