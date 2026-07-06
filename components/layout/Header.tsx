"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { MOBILE_DE_URL, BUSINESS, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div
        className={`mx-auto flex h-32 w-full max-w-6xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 ${
          scrolled ? "md:h-28" : ""
        }`}
      >
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label={BUSINESS.name}>
          <Image
            src="/logo-horizontal.png"
            alt={BUSINESS.name}
            width={246}
            height={100}
            priority
            className={`h-[5.25rem] w-auto transition-all duration-300 sm:h-[6.75rem] ${
              scrolled ? "md:h-[5.25rem]" : ""
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={BUSINESS.phones[0].href}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold-dark"
          >
            <Phone size={16} />
            {dict.nav.call}
          </a>
          <a
            href={MOBILE_DE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
          >
            {dict.nav.inventory}
          </a>
          <LanguageSwitcher locale={locale} />
        </div>

        <MobileNav locale={locale} dict={dict} />
      </div>
    </header>
  );
}
