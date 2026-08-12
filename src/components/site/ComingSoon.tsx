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
      {/* The triangle mark the client supplied (12/08), keyed to transparency
          so it sits on the page colour rather than in a white box. */}
      <img
        src="/volumes-triangle.png"
        alt=""
        className="w-64 max-w-[70vw] md:w-96"
      />

      <h1 className="mt-10 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
        Volumes Lab
      </h1>

      <p className="mt-8 font-mono text-[12px] uppercase tracking-widest text-foreground/85 md:text-sm">
        Opening soon · Churruca 5 (28004, Madrid)
      </p>

      <p className="mt-4 font-mono text-[12px] lowercase tracking-widest text-foreground/85 md:text-sm">
        {CONTACT.email}
      </p>
    </main>
  );
}
