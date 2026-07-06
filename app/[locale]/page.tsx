import type { Metadata } from "next";
import { DEFAULT_LOCALE, type Locale } from "@/lib/constants";
import { getDictionary, isLocale } from "@/lib/i18n";
import { HeroReveal } from "@/components/hero/HeroReveal";
import { WhyUs } from "@/components/sections/WhyUs";
import { BuySell } from "@/components/sections/BuySell";
import { SellPitch } from "@/components/sections/SellPitch";
import { ContactTeaser } from "@/components/sections/ContactTeaser";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    alternates: { canonical: `/${locale}` },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return (
    <>
      <HeroReveal locale={locale} dict={dict} />
      <WhyUs dict={dict} />
      <BuySell locale={locale} dict={dict} />
      <SellPitch locale={locale} dict={dict} />
      <ContactTeaser dict={dict} />
      <FinalCta locale={locale} dict={dict} />
    </>
  );
}
