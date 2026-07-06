"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { BUSINESS, MAPS_DIRECTIONS_URL } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ContactTeaser({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-surface p-8 sm:p-12"
        >
          <SectionHeading eyebrow={dict.contactTeaser.eyebrow} title={dict.contactTeaser.title} />

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3 text-sm text-muted">
              <MapPin size={20} className="mt-0.5 shrink-0 text-gold-dark" />
              <span>
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.zip} {BUSINESS.address.city}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href={MAPS_DIRECTIONS_URL} external variant="secondary">
                <MapPin size={16} />
                {dict.contactTeaser.directions}
              </Button>
              <Button href={BUSINESS.phones[0].href} variant="secondary">
                <Phone size={16} />
                {dict.contactTeaser.callUs}
              </Button>
              <Button href={`mailto:${BUSINESS.email}`} variant="primary">
                <Mail size={16} />
                {dict.contactTeaser.emailUs}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
