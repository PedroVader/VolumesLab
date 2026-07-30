import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { HandDrawnMap } from "@/components/site/HandDrawnMap";
import { Eyebrow, SectionTitle, FaqList } from "@/components/site/blocks";
import {
  ServiceChoiceCard,
  MembershipCard,
  ProductCard,
  PrimaryLink,
  SecondaryLink,
} from "@/components/site/cards";
import { memberships, assessments, findProduct } from "@/data/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

const featuredTestSlugs = ["vo2max", "3d-body-composition", "bone-mineral-density", "metabolic-assessment"];

const howItWorks = [
  { title: "Test", body: "Measure body composition, bone density, metabolism, cardiovascular fitness, strength and movement." },
  { title: "Understand", body: "Review the results with the Volumes Lab medical and performance team." },
  { title: "Treat or train", body: "Follow a personalised training program or, where clinically appropriate, a medically supervised treatment plan." },
  { title: "Retest", body: "Measure progress and adjust the program using objective data." },
];

const homeFaqs = [
  { q: "Which assessment should I choose?", a: "Foundational sets your baseline. Longevity adds cardiovascular fitness and full strength testing. Performance is the complete picture, adding mobility and gait. Compare them side by side on the Assessments page." },
  { q: "What should I wear?", a: "Comfortable clothing you can move and train in. For body scans we provide guidance on arrival." },
  { q: "Do I need to fast before testing?", a: "Some tests, like the metabolic assessment, require fasted arrival. We send exact preparation instructions after you book." },
  { q: "How long does an assessment take?", a: "From 90 minutes for the Foundational Assessment up to around 3.5 hours for the Performance Assessment." },
  { q: "When will I receive my results?", a: "Results are reviewed with you in person by the medical and performance team, with a written report to follow." },
  { q: "Can I train at Volumes Lab without becoming a member?", a: "Yes. You can book standalone personal training sessions or a package without joining a membership." },
];

function Home() {
  return (
    <SiteChrome>
      {/* 1. Hero */}
      <section className="px-6 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <img src="/volumes-mark.png" alt="Volumes Lab" className="w-40 shrink-0 md:w-52" />
            <div>
              <h1 className="font-brand text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
                Madrid's{" "}
                <span className="relative inline-block whitespace-nowrap">
                  first boutique
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-full -mt-1 h-[0.35em] w-full text-primary"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="animate-draw"
                      d="M2 8 C 52 3 92 10 142 6 C 202 1 252 10 298 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </span>{" "}
                Human Health &amp; Performance Lab
              </h1>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted md:text-xs">
                <a
                  href="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-foreground/30 underline-offset-4 hover:text-foreground hover:decoration-foreground"
                >
                  Calle Churruca 5, Centro (28004)
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Volumes Lab combines advanced testing, medical expertise and personal training under
              one roof. Our team measures VO2max, strength, mobility, metabolism and body
              composition, then turns the results into a clear, personalised plan.
            </p>
            <p>
              Our medical team can also prescribe and oversee clinical treatments, including GLP-1
              agonists and other peptide therapies. Our performance team helps clients improve
              strength, cardio, conditioning and mobility in our dedicated training area.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryLink to="/memberships">Explore Memberships</PrimaryLink>
            <SecondaryLink to="/book">Book a Service</SecondaryLink>
          </div>
        </div>
      </section>

      {/* 2. Choose how to start */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Choose how to start</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">
            Join a membership, complete an assessment, book a test or train
          </SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceChoiceCard
              title="Memberships"
              body="Ongoing testing, training and support. Choose between our complete health and performance membership and a medically supervised GLP-1 program."
              ctaLabel="Explore Memberships"
              to="/memberships"
            />
            <ServiceChoiceCard
              title="Assessments"
              body="Get a complete picture of your health and performance through a coordinated group of tests."
              ctaLabel="Compare Assessments"
              to="/assessments"
            />
            <ServiceChoiceCard
              title="Individual Tests"
              body="Measure one specific area, including VO2max, body composition, bone density, metabolism, strength or movement."
              ctaLabel="Explore Tests"
              to="/tests"
            />
            <ServiceChoiceCard
              title="Training"
              body="Book personal training sessions or a package with the Volumes Lab performance team."
              ctaLabel="Explore Training"
              to="/training"
            />
          </div>
        </div>
      </section>

      {/* 3. Memberships */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Memberships</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Two memberships. Two different goals.</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Both programs combine objective measurement with ongoing support.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {memberships.map((m) => (
              <MembershipCard key={m.slug} m={m} />
            ))}
          </div>
          <div className="mt-8">
            <SecondaryLink to="/memberships">Compare Memberships</SecondaryLink>
          </div>
        </div>
      </section>

      {/* 4. How Volumes Lab works */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>How Volumes Lab works</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Test. Understand. Treat or train. Retest.</SectionTitle>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {howItWorks.map((s, i) => (
              <div key={s.title} className="border-t-2 border-primary pt-6">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Assessments preview */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Assessments</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Choose the depth of assessment that fits your goals</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {assessments.map((a) => (
              <ProductCard key={a.slug} p={a} />
            ))}
          </div>
          <div className="mt-8">
            <SecondaryLink to="/assessments">Compare Assessments</SecondaryLink>
          </div>
        </div>
      </section>

      {/* 6. Individual Tests preview */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Individual Tests</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Book one individual test</SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTestSlugs.map((slug) => {
              const t = findProduct(slug);
              return t ? <ProductCard key={slug} p={t} /> : null;
            })}
          </div>
          <div className="mt-8">
            <SecondaryLink to="/tests">View All Individual Tests</SecondaryLink>
          </div>
        </div>
      </section>

      {/* 7. Training */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Personal training at Volumes Lab</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Train around your goals, not a fixed format</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Sessions may include strength, cardiovascular training, intervals, conditioning and
            mobility according to your assessment, ability and goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryLink to="/training">Explore Training</PrimaryLink>
            <SecondaryLink to="/memberships">Explore Memberships</SecondaryLink>
          </div>
        </div>
      </section>

      {/* 8. The Lab and location */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The lab and location</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">Testing, medical expertise and training in one location</SectionTitle>
          <div className="mx-auto mt-10 max-w-4xl border border-border bg-card">
            <HandDrawnMap />
          </div>
          <OpeningHours />
        </div>
      </section>

      {/* 9. FAQ preview */}
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Questions</Eyebrow>
          <div className="mt-10">
            <FaqList items={homeFaqs} />
          </div>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-muted">
            More questions?{" "}
            <a href="/faq" className="text-foreground underline underline-offset-4 hover:text-primary">
              Read the full FAQ →
            </a>
          </p>
        </div>
      </section>

      {/* 10. Final conversion */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle className="max-w-3xl">Not sure where to start?</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Compare our memberships and assessments, or browse every available service on one page.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryLink to="/book">Book Now</PrimaryLink>
            <SecondaryLink to="/memberships">Compare Memberships</SecondaryLink>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

function OpeningHours() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 Sun … 6 Sat
    const h = now.getHours() + now.getMinutes() / 60;
    const isWeekday = day >= 1 && day <= 5;
    setOpen(isWeekday ? h >= 7 && h < 20 : h >= 9 && h < 18);
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">[ Opening hours ]</p>
        {open !== null && (
          <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest">
            <span className={`h-1.5 w-1.5 rounded-full ${open ? "animate-pulse bg-primary" : "bg-muted"}`} />
            <span className={open ? "text-foreground" : "text-muted"}>{open ? "Open now" : "Closed"}</span>
          </span>
        )}
      </div>
      <dl className="flex flex-wrap gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-widest">
        <div className="flex items-baseline gap-3">
          <dt className="text-muted">Mon–Fri</dt>
          <dd className="tabular-nums text-foreground">07:00 – 20:00</dd>
        </div>
        <div className="flex items-baseline gap-3">
          <dt className="text-muted">Sat–Sun</dt>
          <dd className="tabular-nums text-foreground">09:00 – 18:00</dd>
        </div>
      </dl>
    </div>
  );
}
