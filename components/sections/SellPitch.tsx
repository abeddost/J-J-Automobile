"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function SellPitch({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark"
        >
          {dict.sellPitch.eyebrow}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-balance font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl"
        >
          {dict.sellPitch.title}
        </motion.h2>

        <div className="mt-12 border-t border-border">
          {dict.sellPitch.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col gap-2 border-b border-border py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            >
              <div className="flex items-baseline gap-4 sm:w-1/3">
                <span className="font-heading text-sm text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted sm:w-1/2 sm:text-right">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:justify-start">
          <Button href={`/${locale}/contact`} variant="primary" size="lg">
            {dict.buySell.sellCta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
