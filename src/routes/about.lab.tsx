import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";

export const Route = createFileRoute("/about/lab")({
  component: LabPage,
  head: () => ({
    meta: [
      { title: "The Lab, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Testing, medical expertise and training in one location. The integrated Volumes Lab model.",
      },
    ],
  }),
});

const areas = [
  { title: "Testing areas", body: "Lab-grade equipment for body composition, bone density, metabolism, cardiovascular fitness, strength and movement." },
  { title: "Medical room", body: "Private consultation and review with the medical team." },
  { title: "3D body scanning", body: "Fast, repeatable body-composition scans to track change over time." },
  { title: "Training floor", body: "A dedicated space for private personal training sessions." },
];

function LabPage() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>The lab</Eyebrow>
          <SectionTitle className="mt-6 max-w-3xl">
            Testing, medical expertise and training in one location
          </SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            An integrated model, not a generic gym. Each area of the space connects to a specific
            part of your program. Authentic photography to be added once available.
          </p>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {areas.map((a) => (
            <div key={a.title} className="border border-border bg-card p-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">{a.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4">
          <Link
            to="/about/location"
            className="inline-flex items-center border border-foreground px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-primary-foreground"
          >
            Location
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center bg-primary px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            Book Now
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
