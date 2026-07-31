import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow } from "@/components/site/blocks";
import { canonical } from "@/lib/seo";

// Draft legal scaffolds. Copy is placeholder and must be replaced with
// approved legal text before launch (brief section 13, "Legal and medical").

type LegalPage = { title: string; intro: string; sections: { h: string; body: string }[] };

const legalPages: Record<string, LegalPage> = {
  privacy: {
    title: "Privacy Policy",
    intro: "How Volumes Lab collects, uses and protects your personal and health data.",
    sections: [
      { h: "What we collect", body: "Contact details, booking information and, where relevant, health and performance measurements you provide or that are generated during your visit." },
      { h: "How we use it", body: "To deliver and improve your assessments, treatments and training, and to communicate with you about your bookings." },
      { h: "Your rights", body: "You can request access, correction or deletion of your data. Contact hello@volumeslab.com." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "How this website uses cookies and similar technologies.",
    sections: [
      { h: "Essential cookies", body: "Required for the site and booking cart to function." },
      { h: "Analytics", body: "Used to understand how the site is used so we can improve it. You can decline non-essential cookies." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "The terms that apply when you book and use Volumes Lab services.",
    sections: [
      { h: "Bookings", body: "Bookings are confirmed by our team within 24 hours. Prices and availability may change." },
      { h: "Payments", body: "Payment terms are shown at checkout. Memberships are billed monthly with a minimum commitment where stated." },
    ],
  },
  "medical-disclaimer": {
    title: "Medical Disclaimer",
    intro: "Important information about the medical scope of Volumes Lab services.",
    sections: [
      { h: "Not emergency care", body: "Volumes Lab does not provide emergency medical care. In an emergency call your local emergency number." },
      { h: "Prescriptions", body: "Any prescription, including GLP-1 medication, is issued only where clinically appropriate following a doctor's assessment. Prescription is never guaranteed." },
      { h: "External bloodwork", body: "Certain programs require bloodwork completed through an external provider before treatment begins." },
    ],
  },
  cancellation: {
    title: "Cancellation Policy",
    intro: "How to cancel or reschedule, and any applicable fees.",
    sections: [
      { h: "Free changes", body: "Cancel or reschedule free of charge up to 48 hours before your appointment." },
      { h: "Within 48 hours", body: "A fee applies for cancellations or changes made within 48 hours of the appointment." },
    ],
  },
};

export const Route = createFileRoute("/legal/$slug")({
  component: LegalRoute,
  loader: ({ params }) => {
    const page = legalPages[params.slug];
    if (!page) throw notFound();
    return { slug: params.slug, page };
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.page.title}, Volumes Lab Madrid` },
            { name: "description", content: loaderData.page.intro },
          ],
          links: [canonical(`/legal/${loaderData.slug}`)],
        }
      : { meta: [{ title: "Legal, Volumes Lab" }] },
  notFoundComponent: () => (
    <SiteChrome>
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <p className="font-mono text-xs uppercase text-primary">[ 404 ]</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Page not found</h1>
      </div>
    </SiteChrome>
  ),
});

function LegalRoute() {
  const { page } = Route.useLoaderData();
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 text-lg text-muted">{page.intro}</p>
          <p className="mt-6 border border-border bg-card px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            Draft — placeholder text, pending legal review before launch.
          </p>
        </div>
      </section>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {page.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">{s.h}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
