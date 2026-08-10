// Single legal page, per the client's instruction (10/08/2026): replace the
// five separate legal pages with one small page, noindex, holding the company
// identity the LSSI requires plus a compact privacy notice for what this site
// itself does.
//
// The LSSI (Ley 34/2002, art. 10) requires the identifying details below to be
// "permanently, easily and directly accessible" — hence the persistent footer
// link rather than a page buried in a menu.
//
// PENDING: CIF and registered address are not filled in. They are legally
// required and the page is incomplete until the client supplies them.

import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { canonical } from "@/lib/seo";
import { ADDRESS, COMPANY, CONTACT } from "@/data/site";

export const Route = createFileRoute("/legal/")({
  component: LegalPage,
  head: () => ({
    meta: [
      { title: "Legal & Privacy, Volumes Lab" },
      { name: "robots", content: "noindex, follow" },
      {
        name: "description",
        content: "Company information and privacy notice for volumeslab.com.",
      },
    ],
    links: [canonical("/legal")],
  }),
});

function LegalPage() {
  return (
    <SiteChrome>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Legal &amp; Privacy
          </h1>

          {/* ---- LSSI company identity ---- */}
          <div className="mt-12">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              Company information
            </h2>
            <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
              <Row label="Registered name">{COMPANY.legalName}</Row>
              <Row label="Trading as">{COMPANY.tradingName}</Row>
              <Row label="Tax ID (NIF/CIF)">{COMPANY.taxId ?? <Pending />}</Row>
              <Row label="Registered address">{COMPANY.registeredAddress ?? <Pending />}</Row>
              <Row label="Premises">{ADDRESS.full}</Row>
              <Row label="Email">
                <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-primary">
                  {CONTACT.email}
                </a>
              </Row>
              <Row label="Phone">
                <a href={CONTACT.phoneHref} className="underline underline-offset-4 hover:text-primary">
                  {CONTACT.phone}
                </a>
              </Row>
            </dl>
          </div>

          {/* ---- Privacy notice, scoped to what this website does ---- */}
          <div className="mt-14">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              Privacy notice
            </h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-foreground/85">
              <p>
                <strong className="font-semibold">Who is responsible.</strong> {COMPANY.legalName},
                at the contact details above, is the data controller for the personal data collected
                through this website.
              </p>
              <p>
                <strong className="font-semibold">What this website collects.</strong> This site is
                informational. It does not take bookings or payments and does not require an account.
                If you write to us using the contact form or by email, we receive the name, email
                address and message you send. We use anonymous, aggregated analytics to understand
                how the site is used; these do not identify you individually.
              </p>
              <p>
                <strong className="font-semibold">Why, and on what basis.</strong> We use your
                message solely to reply to it, on the basis of your request. We keep it only as long
                as needed to deal with your enquiry and to meet any legal obligation.
              </p>
              <p>
                <strong className="font-semibold">Booking and payment happen elsewhere.</strong> When
                you choose to book or buy, you leave this website for our booking platform, Momence,
                which acts as processor and handles the appointment and the payment under its own
                terms and privacy policy. Any health or clinical information you give us as a
                patient is handled outside this website, under the information we provide you at the
                clinic.
              </p>
              <p>
                <strong className="font-semibold">Who else sees your data.</strong> Our website
                hosting and analytics providers process data on our behalf under contract. We do not
                sell your personal data or share it for advertising.
              </p>
              <p>
                <strong className="font-semibold">Your rights.</strong> You can ask us for access to
                your data, or to correct, delete, restrict or object to its use, or to receive it in
                a portable form. Write to{" "}
                <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-primary">
                  {CONTACT.email}
                </a>
                . You may also lodge a complaint with the Spanish data protection authority, the
                Agencia Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  aepd.es
                </a>
                ).
              </p>
              <p>
                <strong className="font-semibold">Cookies.</strong> This site sets only the cookies
                and local storage strictly necessary for it to work. It does not use advertising or
                tracking cookies.
              </p>
            </div>
          </div>

          <p className="mt-14 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            <Link to="/" className="hover:text-primary">
              ← Back to Volumes Lab
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
  return <span className="font-mono text-[11px] uppercase tracking-widest text-primary">[ pending ]</span>;
}
