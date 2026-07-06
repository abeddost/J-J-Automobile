"use client";

import { motion } from "framer-motion";
import { BadgeCheck, HandCoins, Users } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [HandCoins, BadgeCheck, Users];
const iconStyles = [
  "bg-gold-light/40 text-gold-dark",
  "bg-teal-light/50 text-teal-dark",
  "bg-silver-light/50 text-silver-dark",
];

export function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={dict.whyUs.eyebrow} title={dict.whyUs.title} align="center" />

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {dict.whyUs.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${iconStyles[i % iconStyles.length]}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
