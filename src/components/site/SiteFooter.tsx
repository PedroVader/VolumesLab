import { Link } from "@tanstack/react-router";
import { BOOKING_HOME } from "@/lib/momence";
import { ADDRESS, COMPANY, CONTACT, HOURS, MAP_LINK } from "@/data/site";

// Footer structure: Services, About, Visit, Contact. The five legal pages were
// collapsed into one /legal link in the bottom bar at the client's request.
// Service links are homepage anchors; the only outbound link is Book Services.

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <FooterCol title="Services">
            <FooterLink to="/" hash="tests">Tests</FooterLink>
            <FooterLink to="/" hash="assessments">Assessments</FooterLink>
            <FooterLink to="/" hash="medical">Medical Appointment</FooterLink>
            <FooterLink to="/" hash="train">Train</FooterLink>
            <FooterLink to="/" hash="memberships">Memberships</FooterLink>
            <li>
              <a href={BOOKING_HOME} target="_blank" rel="noreferrer" className="hover:text-primary">
                Book Services →
              </a>
            </li>
          </FooterCol>

          <FooterCol title="About">
            <FooterLink to="/about">What We Do</FooterLink>
            <FooterLink to="/about/team">Team</FooterLink>
            <FooterLink to="/about/lab">The Lab</FooterLink>
            <FooterLink to="/about/location">Location</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
          </FooterCol>

          <FooterCol title="Visit">
            <li className="text-muted">{ADDRESS.short}</li>
            <li className="text-muted">
              Mon–Fri {HOURS.weekdays.value}
            </li>
            <li className="text-muted">
              Sat–Sun {HOURS.weekend.value}
            </li>
            <li className="text-muted">{HOURS.walkIns}</li>
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
              <a href={CONTACT.phoneHref} className="hover:text-primary">
                {CONTACT.phone}
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
              accessible, so this link sits in the footer of every page. */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-center md:text-center">
            © {COMPANY.legalName} ·{" "}
            <Link to="/legal" className="underline underline-offset-4 hover:text-primary">
              Legal &amp; Privacy
            </Link>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-end">
            {ADDRESS.short}
          </p>
        </div>
      </div>
    </footer>
  );
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
