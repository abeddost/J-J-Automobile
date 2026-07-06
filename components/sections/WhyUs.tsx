"use client";

import { motion } from "framer-motion";
import { BadgeCheck, HandCoins, Heart, Users } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [HandCoins, BadgeCheck, Users, Heart];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.whyUs.eyebrow} title={dict.whyUs.title} align="center" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.whyUs.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-light/40 text-gold-dark">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
