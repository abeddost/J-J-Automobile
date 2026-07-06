import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { DEFAULT_LOCALE, BUSINESS } from "@/lib/constants";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <div className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={dict.contactPage.eyebrow} title={dict.contactPage.title} />
          <p className="mt-6 max-w-xl text-base text-muted">{dict.contactPage.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <Reveal delay={0.1} className="lg:col-span-3">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {dict.contactPage.formTitle}
            </h2>
            <div className="mt-6">
              <ContactForm dict={dict} />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {dict.contactPage.addressTitle}
              </h2>
              <div className="mt-4 space-y-4 text-sm text-muted">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold-dark" />
                  <span>
                    {BUSINESS.address.street}
                    <br />
                    {BUSINESS.address.zip} {BUSINESS.address.city}
                  </span>
                </div>
                {BUSINESS.phones.map((phone) => (
                  <div key={phone.href} className="flex items-center gap-3">
                    <Phone size={18} className="shrink-0 text-gold-dark" />
                    <a href={phone.href} className="hover:text-gold-dark">
                      {phone.display}
                    </a>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-gold-dark" />
                  <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold-dark">
                    {BUSINESS.email}
                  </a>
                </div>
              </div>

              <p className="mt-5 text-xs uppercase tracking-wide text-muted">
                {dict.contactPage.hoursNote}
              </p>
            </div>

            <MapEmbed directionsLabel={dict.contactPage.directionsCta} className="mt-6" />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
