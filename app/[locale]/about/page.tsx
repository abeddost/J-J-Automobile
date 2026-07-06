import type { Metadata } from "next";
import Image from "next/image";
import { DEFAULT_LOCALE, BUSINESS } from "@/lib/constants";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <div className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={dict.aboutPage.eyebrow} title={dict.aboutPage.title} />

          <div className="mt-8 flex items-center gap-4">
            <Image src="/logo.png" alt={BUSINESS.name} width={120} height={60} unoptimized className="h-12 w-auto" />
          </div>

          <p className="mt-8 text-lg text-foreground/90">{dict.aboutPage.intro}</p>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
            {dict.aboutPage.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
              {BUSINESS.owners.join(" & ")}
            </p>
            <p className="mt-1 text-sm text-muted">{BUSINESS.legalName}</p>
          </div>
        </Reveal>

        <h2 className="mt-14 font-heading text-2xl font-semibold text-foreground">
          {dict.aboutPage.valuesTitle}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {dict.aboutPage.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
