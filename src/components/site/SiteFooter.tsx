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
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted md:flex-row md:items-center md:justify-between">
          <p>Volumes Lab © {new Date().getFullYear()}</p>
          <p>Calle Churruca 5 Madrid</p>
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
