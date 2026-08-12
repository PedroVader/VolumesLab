// Pre-launch placeholder (client request, 10/08/2026): big logo, address,
// "Opening Soon", email, single-colour background. The full site stays built
// underneath; COMING_SOON in src/data/site.ts is the only switch.
//
// This file only defines the component. The gate that decides whether visitors
// see this or the real site lives in __root.tsx.

import { CONTACT } from "@/data/site";

export function ComingSoon() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground selection:bg-primary selection:text-primary-foreground">
      <img
        src="/volumes-mark.png"
        alt="Volumes Lab"
        className="w-64 max-w-[70vw] md:w-80"
      />

      <p className="mt-12 font-mono text-[12px] uppercase tracking-widest text-foreground/85 md:text-sm">
        Churruca 5 (28004, Madrid)
      </p>

      <p className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
        Opening Soon
      </p>

      <a
        href={`mailto:${CONTACT.email}`}
        className="mt-10 font-mono text-[12px] uppercase tracking-widest underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground md:text-sm"
      >
        {CONTACT.email}
      </a>
    </main>
  );
}
