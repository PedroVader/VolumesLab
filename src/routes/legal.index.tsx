// Single legal page, per the client's instruction (10/08/2026): one small page,
// noindex, holding the company identity the LSSI (Ley 34/2002, art. 10)
// requires to be "permanently, easily and directly accessible", plus a compact
// privacy notice for what this site itself does. Hence the persistent footer
// link rather than a page buried in a menu.
//
// All copy lives in @/data/pages so it can be edited rather than deployed. The
// {company} and {email} placeholders are filled from @/data/site, so the legal
// entity and contact address are never typed twice.
//
// PENDING: tax ID and registered address are legally required and still empty.
// They render as [ pending ] rather than being invented.

import { createFileRoute, Link } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";
import { ADDRESS, COMPANY, CONTACT } from "@/data/site";
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

          <div className="mt-12">
            {L.companyHeading && (
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                {L.companyHeading}
              </h2>
            )}
            <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
              <Row label={L.labels.legalName}>{COMPANY.legalName}</Row>
              <Row label={L.labels.tradingName}>{COMPANY.tradingName}</Row>
              <Row label={L.labels.taxId}>{COMPANY.taxId ?? <Pending />}</Row>
              <Row label={L.labels.registeredAddress}>
                {COMPANY.registeredAddress ?? <Pending />}
              </Row>
              <Row label={L.labels.premises}>{ADDRESS.full}</Row>
              <Row label={L.labels.email}>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </Row>
              {/* Phone row removed site-wide (30/08) until a real number exists. */}
            </dl>
          </div>

          {(L.privacyHeading || L.privacy.length > 0) && (
            <div className="mt-14">
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

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-52 sm:shrink-0">
        {label}
      </dt>
      <dd className="text-foreground/85">{children}</dd>
    </div>
  );
}

function Pending() {
  return (
    <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
      [ {L.labels.pending} ]
    </span>
  );
}
