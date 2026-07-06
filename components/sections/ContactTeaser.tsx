"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { BUSINESS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export function ContactTeaser({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
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

          <div className="mt-10 grid gap-8 rounded-3xl border border-border bg-white p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {dict.contactPage.formTitle}
              </h3>
              <div className="mt-5">
                <ContactForm dict={dict} />
              </div>
            </div>
            <MapEmbed directionsLabel={dict.contactTeaser.directions} />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
