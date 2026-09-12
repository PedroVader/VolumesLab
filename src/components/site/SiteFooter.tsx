import { Link } from "@tanstack/react-router";
import { ADDRESS, COMPANY, CONTACT, HOURS, MAP_LINK, PAGES } from "@/data/site";
import { catalogueAnchor, sectionLabel, visibleSections } from "@/lib/sections";

// Footer structure: Services, About, Visit, Contact. The five legal pages were
// collapsed into one /legal link in the bottom bar at the client's request.
// Service links and Book Services are homepage anchors; nothing here links to
// Momence's generic landing (client, 12/09/2026).

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <FooterCol title="Services">
            {visibleSections().map((s) => (
              <FooterLink key={s.key} to="/" hash={s.key}>{sectionLabel(s.key)}</FooterLink>
            ))}
            <FooterLink to="/" hash={catalogueAnchor()}>Book Services →</FooterLink>
          </FooterCol>

          {(PAGES.about || PAGES.lab || PAGES.location || PAGES.faq || PAGES.blog) && (
            <FooterCol title="About">
              {PAGES.about && <FooterLink to="/about">What We Do</FooterLink>}
              {PAGES.lab && <FooterLink to="/about/lab">The Lab</FooterLink>}
              {PAGES.location && <FooterLink to="/about/location">Location</FooterLink>}
              {PAGES.faq && <FooterLink to="/faq">FAQ</FooterLink>}
              {PAGES.blog && <FooterLink to="/blog">Blog</FooterLink>}
            </FooterCol>
          )}

          <FooterCol title="Visit">
            {ADDRESS.short && <li className="text-muted">{ADDRESS.short}</li>}
            {HOURS.weekdays.value && (
              <li className="text-muted">
                Mon–Fri {HOURS.weekdays.value}
              </li>
            )}
            {HOURS.weekend.value && (
              <li className="text-muted">
                Sat–Sun {HOURS.weekend.value}
              </li>
            )}
            {HOURS.walkIns && <li className="text-muted">{HOURS.walkIns}</li>}
            <li>
              <a href={MAP_LINK} target="_blank" rel="noreferrer" className="hover:text-primary">
                Open in Maps →
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-primary">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
            </li>
          </FooterCol>
        </div>

        <div className="mt-12 grid items-center gap-6 border-t border-border pt-8 md:grid-cols-3">
          <img src="/volumes-mark.png" alt="Volumes Lab" className="w-28 opacity-90 justify-self-start" />
          {/* The LSSI requires the company identity to be permanently and directly
              accessible, so the registered name, the tax ID and the one Legal
              link sit here on every page (client, 12/09/2026: only here, not
              in the link columns). */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-center md:text-center">
            {companyIdentity()}
            {PAGES.legal && (
              <>
                {" "}·{" "}
                <Link to="/legal" className="underline underline-offset-4 hover:text-primary">
                  Legal &amp; Privacy
                </Link>
              </>
            )}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-end">
            {ADDRESS.short}
          </p>
        </div>
      </div>
    </footer>
  );
}

/** "Volumes Vision S.L. B26934380". The ID is not repeated if it was typed into the name. */
function companyIdentity(): string {
  const name = COMPANY.legalName || COMPANY.tradingName || "Volumes Lab";
  const id = COMPANY.taxId?.trim();
  return id && !name.includes(id) ? `${name} ${id}` : name;
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">{title}</p>
      <ul className="space-y-3 font-mono text-[10px] uppercase tracking-widest">{children}</ul>
    </div>
  );
}

function FooterLink({ to, hash, children }: { to: string; hash?: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} hash={hash} className="hover:text-primary">
        {children}
      </Link>
    </li>
  );
}
