// Single legal page, per the client's instruction (10/08/2026): one small page,
// noindex, reachable from the footer of every page, where the LSSI (Ley
// 34/2002, art. 10) wants the company identity "permanently, easily and
// directly accessible". The structured company rows were dropped on 12/09/2026
// at the client's request: the page is the title plus plain paragraphs from
// the CMS, and the registered name and tax ID sit in the footer next to the link.
//
// {company} and {email} in the paragraphs are filled from @/data/site, so the
// legal entity and contact address are never typed twice.

import { createFileRoute, Link } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";
import { COMPANY, CONTACT } from "@/data/site";
import { legalPage as L } from "@/data/pages";

export const Route = createFileRoute("/legal/")({
  beforeLoad: pageGate("legal"),
  component: LegalPage,
  head: () => ({
    meta: metaTags("legal"),
    links: [canonical("/legal")],
  }),
});

function LegalPage() {
  return (
    <SiteChrome>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          {L.title && (
            <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
              {L.title}
            </h1>
          )}

          {(L.privacyHeading || L.privacy.length > 0) && (
            <div className="mt-12">
              {L.privacyHeading && (
                <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  {L.privacyHeading}
                </h2>
              )}
              <div className="mt-5 space-y-5 text-base leading-relaxed text-foreground/85">
                {L.privacy.map((p) => (
                  <p key={p.lead}>
                    <strong className="font-semibold">{p.lead}</strong>{" "}
                    {p.body
                      .replace("{company}", COMPANY.legalName)
                      .replace("{email}", CONTACT.email)}
                  </p>
                ))}
              </div>
            </div>
          )}

          <p className="mt-14 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            <Link to="/" className="hover:text-primary">
              ← {L.backLink || "Home"}
            </Link>
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
