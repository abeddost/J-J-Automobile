import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { LOCALES, DEFAULT_LOCALE, BUSINESS, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialRail } from "@/components/layout/SocialRail";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.home.title,
      template: `%s · ${BUSINESS.name}`,
    },
    description: dict.meta.home.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
    openGraph: {
      title: dict.meta.home.title,
      description: dict.meta.home.description,
      url: `${SITE_URL}/${locale}`,
      siteName: BUSINESS.name,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: BUSINESS.name,
    image: `${SITE_URL}/logo.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phones[0].display,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      postalCode: BUSINESS.address.zip,
      addressLocality: BUSINESS.address.city,
      addressCountry: "DE",
    },
    url: `${SITE_URL}/${locale}`,
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgressBar />
        <Header locale={locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
        <SocialRail />
        <WhatsAppButton />
      </body>
    </html>
  );
}
