import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { ADDRESS, CONTACT, HOURS } from "@/data/site";
import { BookServicesLink } from "@/components/site/cards";
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

// Address, hours and contact are confirmed and come from @/data/site.
// "Getting here" is still a [Confirm] item from the brief (section 10.4).
const info: { label: string; value: string }[] = [
  { label: "Address", value: `${ADDRESS.street}, ${ADDRESS.district}, ${ADDRESS.postalCode} ${ADDRESS.city}` },
  { label: "Opening hours", value: `${HOURS.short} · ${HOURS.walkIns}` },
  { label: "Getting here", value: "Metro Alonso Martínez (L4, L5, L10), 4 min walk [confirm]" },
  { label: "Contact", value: `${CONTACT.email} · ${CONTACT.phone}` },
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
          <BookServicesLink sourcePage="/about/location" />
        </div>
      </section>
    </SiteChrome>
  );
}
