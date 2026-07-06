"use client";

import { motion } from "framer-motion";
import { Car, HandCoins } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import { MOBILE_DE_URL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function BuySell({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.buySell.eyebrow} title={dict.buySell.title} align="center" />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-2xl border border-border bg-white p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light/40 text-gold-dark">
              <Car size={22} />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
              {dict.buySell.inventoryTitle}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">{dict.buySell.inventoryDesc}</p>
            <div className="mt-6">
              <Button href={MOBILE_DE_URL} external variant="primary">
                {dict.buySell.inventoryCta}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col rounded-2xl border border-border bg-white p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-silver-light/50 text-silver-dark">
              <HandCoins size={22} />
            </div>
            <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
              {dict.buySell.sellTitle}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">{dict.buySell.sellDesc}</p>
            <div className="mt-6">
              <Button href={`/${locale}/contact`} variant="secondary">
                {dict.buySell.sellCta}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
