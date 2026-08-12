import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { metaTags } from "@/data/meta";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { teamCredentials } from "@/data/productContent";

export const Route = createFileRoute("/about/team")({
  component: TeamPage,
  head: () => ({
    meta: metaTags("team"),
  }),
});

function TeamPage() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The team</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">Medical and performance expertise</SectionTitle>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl border border-border">
          <ul className="divide-y divide-border">
            {teamCredentials.map((t) => (
              <li key={t.role} className="px-6 py-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">{t.name}</p>
                <p className="mt-1 font-display text-xl font-bold uppercase tracking-tight">{t.role}</p>
                <p className="mt-1 text-sm text-muted">{t.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
