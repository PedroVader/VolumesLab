// Homepage = the whole funnel.
//
// Built directly from the client's homepage architecture (07/08/2026): the CMS
// holds no transactional step, it exists to explain the offer and hand the
// visitor to Momence. The diagram's order was:
//
//   contact + map → intro → TESTS → ASSESSMENTS → MEDICAL APPOINTMENT
//   → TRAIN → MEMBERSHIPS → FAQ / Legal / Blog
//
// Since 12/09/2026 the section order, names and on/off are the CMS's
// (Home page → Sections); the diagram is only the bundled default.
//
// Every card carries the same CTA pair: Book (→ the SKU in Momence) and
// More info (→ this CMS).

import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { AssessmentCard, MembershipCard, ProductCard } from "@/components/site/cards";
import { ADDRESS, CONTACT, HOURS, MAP_EMBED, MAP_LINK } from "@/data/site";
import { homePage, type SectionKey } from "@/data/pages";
import { productsInSection, visibleSections } from "@/lib/sections";
import { canonical } from "@/lib/seo";
import { metaTags } from "@/data/meta";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: metaTags("home"),
    links: [canonical("/")],
  }),
});

function Home() {
  return (
    <SiteChrome>
      <ContactBlock />
      <Intro />

      {/* Order, names and on/off come from the CMS (Home page → Sections). */}
      {visibleSections().map((s) => (
        <Section key={s.key} id={s.key} title={s.title} description={s.description}>
          <SectionGrid section={s.key} />
        </Section>
      ))}
    </SiteChrome>
  );
}

/** The cards of one section: each section keeps the card type it always had. */
function SectionGrid({ section }: { section: SectionKey }) {
  const items = productsInSection(section);
  switch (section) {
    case "assessments":
      return (
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((a) => (
            <AssessmentCard key={a.slug} a={a} />
          ))}
        </div>
      );
    case "memberships":
      return (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((m) => (
            <MembershipCard key={m.slug} m={m} />
          ))}
        </div>
      );
    default:
      return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      );
  }
}

/* ---------------- Contact block + map ---------------- */

function ContactBlock() {
  return (
    <section className="border-b border-border px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <img src="/volumes-mark.png" alt="Volumes Lab" className="w-36 md:w-44" />
          {homePage.headline && (
            <h1 className="mt-8 font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-5xl">
              {homePage.headline}
            </h1>
          )}

          <address className="mt-6 space-y-1 text-base not-italic leading-relaxed text-foreground/85">
            <p>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground hover:decoration-foreground"
              >
                {ADDRESS.short}
              </a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                {CONTACT.email}
              </a>
            </p>
          </address>

          <dl className="mt-6 space-y-1 font-mono text-[11px] uppercase tracking-widest text-muted">
            {HOURS.weekdays.value && (
              <div className="flex flex-wrap gap-x-3">
                <dt>Open {HOURS.weekdays.label}</dt>
                <dd className="tabular-nums text-foreground">{HOURS.weekdays.value}</dd>
              </div>
            )}
            {HOURS.weekend.value && (
              <div className="flex flex-wrap gap-x-3">
                <dt>{HOURS.weekend.label}</dt>
                <dd className="tabular-nums text-foreground">{HOURS.weekend.value}</dd>
              </div>
            )}
          </dl>
          {HOURS.walkIns && (
            <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              {HOURS.walkIns}
            </p>
          )}
        </div>

        <div className="border border-border bg-card">
          <iframe
            title={`Volumes Lab, ${ADDRESS.full}`}
            src={MAP_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[300px] w-full md:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Intro ---------------- */

function Intro() {
  if (!homePage.intro) return null;
  return (
    <section className="border-b border-border px-6 py-10 md:py-14">
      <div className="mx-auto max-w-7xl">
        <p className="max-w-4xl whitespace-pre-line text-lg leading-relaxed text-foreground/85 md:text-xl">
          {homePage.intro}
        </p>
      </div>
    </section>
  );
}

/* ---------------- Section shell ---------------- */

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-b border-border px-6 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {title && (
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">{title}</h2>
          )}
          {description && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{description}</p>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
