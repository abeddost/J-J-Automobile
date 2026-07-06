"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { MOBILE_DE_URL, BUSINESS, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n";

function subscribeNever() {
  return () => {};
}
function getMountedSnapshot() {
  return true;
}
function getMountedServerSnapshot() {
  return false;
}

export function MobileNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  // True only after hydration commits, so the portal never renders during SSR
  // (document.body isn't available there) without tripping the set-state-in-effect rule.
  const mounted = useSyncExternalStore(subscribeNever, getMountedSnapshot, getMountedServerSnapshot);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-32 z-40 bg-white"
        >
          <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-full flex-col gap-2 px-6 py-8"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-lg font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <a
              href={MOBILE_DE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-white"
            >
              {dict.nav.inventory}
            </a>

            <a
              href={BUSINESS.phones[0].href}
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold px-6 text-base font-medium text-gold-dark"
            >
              <Phone size={18} />
              {dict.nav.call}
            </a>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Portalled to <body> so it isn't clipped by the header's backdrop-filter,
          which otherwise creates a new containing block for position:fixed descendants. */}
      {mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}
