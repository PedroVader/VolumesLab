import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow, SectionTitle } from "@/components/site/blocks";
import { MembershipCard } from "@/components/site/cards";
import { canonical } from "@/lib/seo";
import { memberships } from "@/data/catalog";

export const Route = createFileRoute("/memberships/")({
  component: MembershipsLanding,
  head: () => ({
    meta: [
      { title: "Memberships, Volumes Lab Madrid" },
      {
        name: "description",
        content:
          "Two ongoing programs combining objective testing with support: the Health & Performance Membership and the GLP-1 Medical Membership.",
      },
    ],
    links: [canonical("/memberships")],
  }),
});

function MembershipsLanding() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Ongoing programs</Eyebrow>
          <SectionTitle as="h1" className="mt-6 max-w-3xl">Find the right membership</SectionTitle>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Both memberships combine objective testing with ongoing support. Health & Performance is
            built around comprehensive training and physical performance. GLP-1 Medical is designed
            for medically supervised weight management while protecting strength, lean mass and
            metabolic health.
          </p>
        </div>
      </section>

      {/* Two membership cards */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {memberships.map((m) => (
            <MembershipCard key={m.slug} m={m} />
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
