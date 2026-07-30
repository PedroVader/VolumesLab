import { Link } from "@tanstack/react-router";

// Footer structure per brief section 2.3: Services, About, Visit, Legal, Contact.
// Legal links point to /faq as placeholders until dedicated legal pages exist.

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <FooterCol title="Services">
            <FooterLink to="/memberships">Memberships</FooterLink>
            <FooterLink to="/assessments">Assessments</FooterLink>
            <FooterLink to="/tests">Individual Tests</FooterLink>
            <FooterLink to="/training">Training</FooterLink>
            <FooterLink to="/book">Book Now</FooterLink>
          </FooterCol>

          <FooterCol title="About">
            <FooterLink to="/about">What We Do</FooterLink>
            <FooterLink to="/about/team">Team</FooterLink>
            <FooterLink to="/about/lab">The Lab</FooterLink>
            <FooterLink to="/about/location">Location</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
          </FooterCol>

          <FooterCol title="Visit">
            <li className="text-muted">Churruca 5, Justicia, Madrid</li>
            <li className="text-muted">Mon–Fri 07:00–20:00</li>
            <li className="text-muted">Sat–Sun 09:00–18:00</li>
            <li>
              <a
                href="https://www.google.com/maps?q=Calle+Churruca+5,+Madrid,+Spain"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary"
              >
                Open in Maps →
              </a>
            </li>
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink to="/faq">Privacy</FooterLink>
            <FooterLink to="/faq">Cookies</FooterLink>
            <FooterLink to="/faq">Terms</FooterLink>
            <FooterLink to="/faq">Medical disclaimer</FooterLink>
            <FooterLink to="/faq">Cancellation policy</FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <a href="mailto:hello@volumeslab.com" className="hover:text-primary">
                hello@volumeslab.com
              </a>
            </li>
            <li>
              <a href="tel:+34910000000" className="hover:text-primary">
                +34 910 000 000
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-center md:text-center">
            Volumes Lab © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-end">
            Churruca 5, Justicia, Madrid
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

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-primary">
        {children}
      </Link>
    </li>
  );
}
