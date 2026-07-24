import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 font-mono text-[10px] font-bold uppercase tracking-widest sm:grid-cols-2 md:grid-cols-3">
          <ul className="space-y-3">
            <FooterLink to="/book">Book Now</FooterLink>
            <FooterLink to="/memberships/health-performance">Memberships</FooterLink>
            <FooterLink to="/assessments/foundations">Assessments</FooterLink>
            <FooterLink to="/tests/vo2max">Individual Tests</FooterLink>
          </ul>
          <ul className="space-y-3">
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/faq">Privacy</FooterLink>
            <FooterLink to="/faq">Terms</FooterLink>
          </ul>
          <ul className="space-y-3">
            <li>
              <a href="mailto:hello@volumeslab.com" className="hover:opacity-70">
                hello@volumeslab.com
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-70">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-70">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12 grid items-center gap-6 border-t border-border pt-8 md:grid-cols-3">
          <img
            src="/volumes-mark.png"
            alt="Volumes Lab"
            className="w-28 opacity-90 justify-self-start"
          />
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-center md:text-center">
            Volumes Lab © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted md:justify-self-end">
            Calle Churruca 5 Madrid
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:opacity-70">
        {children}
      </Link>
    </li>
  );
}
