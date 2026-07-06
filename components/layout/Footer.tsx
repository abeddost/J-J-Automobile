import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, SOCIAL, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.23 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.23 22 17.08 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.14-1.39V15.5a5.5 5.5 0 1 1-5.5-5.5c.19 0 .38.01.56.04v2.44a2.9 2.9 0 0 0-.56-.05 3.07 3.07 0 1 0 3.07 3.07V2h2.4a4.28 4.28 0 0 0 3.17 4.13v2.31a6.6 6.6 0 0 1-2.4-.45v6a5.06 5.06 0 0 1-.02.4z" />
    </svg>
  );
}

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-horizontal.png"
            alt={BUSINESS.name}
            width={246}
            height={100}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-muted">{dict.footer.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {dict.footer.quickLinksTitle}
          </h3>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-muted hover:text-gold-dark">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {dict.footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-dark" />
              <span>
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.zip} {BUSINESS.address.city}
              </span>
            </li>
            {BUSINESS.phones.map((phone) => (
              <li key={phone.href} className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-gold-dark" />
                <a href={phone.href} className="hover:text-gold-dark">
                  {phone.display}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold-dark" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold-dark">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            {dict.footer.followTitle}
          </h3>
          <div className="mt-4 flex gap-3">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold-dark"
            >
              <FacebookIcon />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold-dark"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-gold hover:text-gold-dark"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            &copy; {year} {BUSINESS.legalName}. {dict.footer.rights}
          </p>
          <div className="flex gap-5">
            <Link href={`/${locale}/impressum`} className="hover:text-gold-dark">
              {dict.footer.legalImpressum}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="hover:text-gold-dark">
              {dict.footer.legalDatenschutz}
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
