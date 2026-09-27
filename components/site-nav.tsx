import Link from "next/link";
import { LondonTime } from "@/components/london-time";

const navLinks = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
] as const;

export function SiteNav() {
  return (
    <header className="site-nav">
      <div className="site-nav__inner">
        <Link href="/" className="site-nav__logo">
          Your Name
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          <ul className="site-nav__list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="site-nav__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-nav__meta">
          <LondonTime />
        </div>
      </div>
    </header>
  );
}
