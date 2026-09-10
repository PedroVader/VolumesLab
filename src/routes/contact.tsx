import { createFileRoute } from "@tanstack/react-router";
import { pageGate } from "@/lib/pages";
import { SiteChrome } from "@/components/site/SiteChrome";
import { metaTags } from "@/data/meta";
import { CONTACT, HOURS, MAP_EMBED } from "@/data/site";
import { Eyebrow } from "@/components/site/blocks";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  beforeLoad: pageGate("contact"),
  component: Contact,
  head: () => ({
    meta: metaTags("contact"),
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteChrome>
      <section className="border-b border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            Come see the lab.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Fifteen minutes from anywhere in central Madrid. Drop in for a look around ·
            the coffee is on us and there is no sales pitch, we promise.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <div className="space-y-10">
            <InfoRow label="Address" value={<>Calle Churruca 5<br />28004 Madrid, Spain</>} />
            <InfoRow
              label="Getting here"
              value={
                <>
                  Metro: Alonso Martínez (L4, L5, L10) · 4 min walk<br />
                  Bus: lines 3, 21, 37, 149<br />
                  Parking: Barceló &amp; Villa de París · 5 min walk
                </>
              }
            />
            <InfoRow label="Email" value={<a className="hover:opacity-70" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>} />
{/* Phone and WhatsApp removed site-wide (30/08) until a real number exists. */}
            {(HOURS.weekdays.value || HOURS.weekend.value || HOURS.walkIns) && (
              <InfoRow
                label="Hours"
                value={
                  <>
                    {HOURS.weekdays.value && <>Mon–Fri · {HOURS.weekdays.value}<br /></>}
                    {HOURS.weekend.value && <>Sat–Sun · {HOURS.weekend.value}<br /></>}
                    {HOURS.walkIns}
                  </>
                }
              />
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Message sent. We'll be in touch shortly.");
                (e.target as HTMLFormElement).reset();
              }}
              className="space-y-4 border-t border-border pt-10"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-foreground">[ Send a message ]</p>
              <p className="text-sm text-muted">
                We reply within one working day, usually much faster.
              </p>
              <input required name="name" placeholder="Your name" className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
              <input required name="email" type="email" placeholder="Email" className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
              <textarea required name="message" placeholder="Tell us what you're trying to change, we'll point you to the right test" rows={5} className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
              <button className="bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground hover:opacity-80">
                {sent ? "Sent ✓" : "Send message"}
              </button>
            </form>
          </div>

          <div className="space-y-10">
            <div className="min-h-[420px]">
              <iframe
                title="Volumes Lab map"
                src={MAP_EMBED}
                className="h-full min-h-[420px] w-full grayscale-[.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

{/* "Who you'll meet" hidden with the team view (client request, 24/08).
                Restore from git history when the team content is real. */}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-6">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
      <p className="text-lg leading-relaxed">{value}</p>
    </div>
  );
}
