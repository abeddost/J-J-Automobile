import type { Metadata } from "next";
import { DEFAULT_LOCALE, BUSINESS } from "@/lib/constants";
import { getDictionary, isLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.impressum.title,
    description: dict.meta.impressum.description,
    alternates: { canonical: `/${locale}/impressum` },
  };
}

export default async function ImpressumPage({
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
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Impressum
        </h1>

        {locale !== "de" && (
          <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            {dict.legal.germanOnlyNote}
          </p>
        )}

        <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Angaben gemäß § 5 TMG
            </h2>
            <p className="mt-2">
              {BUSINESS.legalName}
              <br />
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.zip} {BUSINESS.address.city}
              <br />
              {BUSINESS.address.country}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Vertretungsberechtigte Gesellschafter
            </h2>
            <p className="mt-2">
              {BUSINESS.owners.map((owner) => (
                <span key={owner} className="block">
                  {owner}
                </span>
              ))}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Kontakt</h2>
            <p className="mt-2">
              Telefon: {BUSINESS.phones.map((p) => p.display).join(" · ")}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-gold-dark hover:underline">
                {BUSINESS.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2">
              {BUSINESS.owners[0]}
              <br />
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.zip} {BUSINESS.address.city}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              EU-Streitschlichtung
            </h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-dark hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder
              verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Haftung für Inhalte
            </h2>
            <p className="mt-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
              Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
              als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Haftung für Links
            </h2>
            <p className="mt-2">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
              Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">Urheberrecht</h2>
            <p className="mt-2">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
              gekennzeichnet.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
