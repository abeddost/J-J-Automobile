"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { BUSINESS, MOBILE_DE_URL, type Locale } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="animate-float-orb pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gold/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-float-orb-slow pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-teal/25 blur-3xl"
      />

      <Container className="relative max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light"
        >
          {dict.finalCta.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight text-white sm:text-5xl"
        >
          {dict.finalCta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-balance text-white/70"
        >
          {dict.finalCta.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={MOBILE_DE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-full bg-gold px-8 text-base font-medium text-ink shadow-lg shadow-gold/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-light"
          >
            {dict.hero.ctaInventory}
          </a>
          <a
            href={BUSINESS.phones[0].href}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-8 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-light hover:text-teal-light"
          >
            <Phone size={18} />
            {BUSINESS.phones[0].display}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-block text-sm text-white/60 underline decoration-white/30 underline-offset-4 transition-colors hover:text-teal-light"
          >
            {dict.hero.ctaSecondary}
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
