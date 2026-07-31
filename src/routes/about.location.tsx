import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { HandDrawnMap } from "@/components/site/HandDrawnMap";

export const Route = createFileRoute("/about/location")({
  component: LocationPage,
  head: () => ({
    meta: [
      { title: "Location, Volumes Lab Madrid" },
      {
        name: "description",
        content: "Volumes Lab, Churruca 5, Justicia, Madrid. Map, access, transport and opening hours.",
      },
    ],
  }),
});

// [Confirm] items from the brief (section 10.4) — placeholders until approved.
const info: { label: string; value: string }[] = [
  { label: "Address", value: "Churruca 5, Justicia, 28004 Madrid" },
  { label: "Opening hours", value: "Mon–Fri 07:00–20:00 · Sat–Sun 09:00–18:00 [confirm]" },
  { label: "Getting here", value: "Metro Alonso Martínez (L4, L5, L10), 4 min walk [confirm]" },
  { label: "Contact", value: "hello@volumeslab.com · +34 910 000 000 [confirm]" },
];

function LocationPage() {
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Location</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">Churruca 5, Justicia, Madrid</SectionTitle>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div className="border border-border bg-card">
            <HandDrawnMap />
          </div>
          <dl className="divide-y divide-border border-y border-border">
            {info.map((row) => (
              <div key={row.label} className="py-5">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{row.label}</dt>
                <dd className="mt-1 text-base text-foreground/85">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mx-auto mt-12 max-w-7xl">
          <Link
            to="/book"
            className="inline-flex items-center bg-primary px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-strong"
          >
            Book Now
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
