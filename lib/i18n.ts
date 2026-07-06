import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/constants";
import de from "@/lib/dictionaries/de.json";
import en from "@/lib/dictionaries/en.json";

const dictionaries = { de, en } satisfies Record<Locale, unknown>;

export type Dictionary = typeof de;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: string): Dictionary {
  return isLocale(locale) ? (dictionaries[locale] as Dictionary) : dictionaries[DEFAULT_LOCALE];
}
