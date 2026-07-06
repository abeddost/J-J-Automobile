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
    title: dict.meta.datenschutz.title,
    description: dict.meta.datenschutz.description,
    alternates: { canonical: `/${locale}/datenschutz` },
  };
}

export default async function DatenschutzPage({
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
          Datenschutzerklärung
        </h1>

        {locale !== "de" && (
          <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-muted">
            {dict.legal.germanOnlyNote}
          </p>
        )}

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              1. Verantwortlicher
            </h2>
            <p className="mt-2">
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              <br />
              {BUSINESS.legalName}
              <br />
              {BUSINESS.address.street}, {BUSINESS.address.zip} {BUSINESS.address.city}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-gold-dark hover:underline">
                {BUSINESS.email}
              </a>
              <br />
              Telefon: {BUSINESS.phones.map((p) => p.display).join(" · ")}
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              2. Hosting und Server-Logfiles
            </h2>
            <p className="mt-2">
              Diese Website wird bei einem professionellen Hosting-Anbieter betrieben. Beim
              Aufruf dieser Website erfasst unser Hosting-Anbieter automatisch Informationen in
              sogenannten Server-Logfiles, die Ihr Browser übermittelt (z. B. IP-Adresse, Datum
              und Uhrzeit der Anfrage, Browsertyp, Referrer-URL). Diese Daten sind nicht
              bestimmten Personen zuordenbar und werden ausschließlich zur Gewährleistung eines
              störungsfreien Betriebs der Website sowie zur Verbesserung unseres Angebots
              ausgewertet (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              3. Kontaktformular
            </h2>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre
              Angaben (Name, E-Mail-Adresse, optional Telefonnummer, Nachricht) zum Zwecke der
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Rechtsgrundlage für diese Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Anfrage) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
              an der Beantwortung Ihrer Anfrage).
            </p>
            <p className="mt-2">
              Zum Versand der E-Mail-Benachrichtigung nutzen wir den Dienst Resend. Dabei können
              Daten an Server des Anbieters außerhalb der EU (USA) übermittelt werden; der
              Anbieter hat sich vertraglich zur Einhaltung geeigneter Garantien (z. B.
              EU-Standardvertragsklauseln) verpflichtet. Ihre Angaben werden nur so lange
              gespeichert, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, und
              anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">4. Cookies</h2>
            <p className="mt-2">
              Diese Website verwendet ein technisch notwendiges Cookie (
              <code className="rounded bg-surface px-1.5 py-0.5 text-xs">NEXT_LOCALE</code>), um
              Ihre gewählte Sprache (Deutsch/Englisch) zu speichern. Dieses Cookie ist für die
              Funktion der Website erforderlich und wird auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO gesetzt. Es werden derzeit keine Analyse- oder Marketing-Cookies eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              5. Ihre Rechte
            </h2>
            <p className="mt-2">
              Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen
              Daten, deren Berichtigung, Löschung oder Einschränkung der Verarbeitung, ein Recht
              auf Widerspruch gegen die Verarbeitung sowie ein Recht auf Datenübertragbarkeit.
              Zudem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
              Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Wenden Sie sich hierzu
              gerne an die oben genannte Kontaktadresse.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
