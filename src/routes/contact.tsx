import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/site/SiteChrome";
import { Eyebrow } from "@/components/site/blocks";
import { teamCredentials } from "@/data/productContent";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact, Volumes Lab Madrid" },
      { name: "description", content: "Visit Volumes Lab at Calle Churruca 5, Chamberí, Madrid. Email, phone, WhatsApp, metro and parking." },
      { property: "og:title", content: "Contact, Volumes Lab Madrid" },
      { property: "og:description", content: "Calle Churruca 5, Madrid. Reach the team." },
    ],
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
            <InfoRow label="Email" value={<a className="hover:opacity-70" href="mailto:hello@volumeslab.com">hello@volumeslab.com</a>} />
            <InfoRow label="Phone" value={<a className="hover:opacity-70" href="tel:+34910000000">+34 910 000 000</a>} />
            <InfoRow
              label="WhatsApp"
              value={
                <a
                  className="inline-flex items-center gap-2 border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-foreground hover:text-primary-foreground"
                  href="https://wa.me/34910000000"
                  target="_blank"
                  rel="noreferrer"
                >
                  Message us →
                </a>
              }
            />
            <InfoRow label="Hours" value={<>Mon–Fri · 07:00–20:00<br />Sat–Sun · 09:00–18:00</>} />

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
                src="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain&output=embed"
                className="h-full min-h-[420px] w-full grayscale-[.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="border border-border">
              <p className="border-b border-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-foreground">
                [ Who you'll meet ]
              </p>
              <ul className="divide-y divide-border">
                {teamCredentials.map((t) => (
                  <li key={t.role} className="px-6 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-warm">{t.name}</p>
                    <p className="mt-1 font-display text-lg font-bold uppercase tracking-tight">{t.role}</p>
                    <p className="mt-1 text-sm text-muted">{t.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
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
