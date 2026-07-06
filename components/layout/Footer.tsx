import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, SOCIAL, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";

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
            unoptimized
            className="h-16 w-auto"
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
